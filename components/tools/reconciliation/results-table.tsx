"use client";

import { useState, useMemo, useCallback } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileQuestion,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { cn, formatINR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import type {
  ReconciliationResult,
  MatchStatus,
  Discrepancy,
} from "@/lib/reconciliation";

interface ResultsTableProps {
  results: ReconciliationResult[];
}

const STATUS_CONFIG: Record<
  MatchStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    color: string;
    badgeBg: string;
  }
> = {
  matched: {
    label: "Matched",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    badgeBg: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  mismatched: {
    label: "Mismatched",
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  missing_in_2b: {
    label: "Missing in 2B",
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    badgeBg: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  missing_in_books: {
    label: "Missing in Books",
    icon: FileQuestion,
    color: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
};

type FilterTab = "all" | MatchStatus;
type SortField =
  | "status"
  | "gstin"
  | "supplier"
  | "invoiceNo"
  | "invoiceDate"
  | "tallyAmount"
  | "gstr2bAmount"
  | "difference"
  | "taxDiff";
type SortDir = "asc" | "desc";

function getGstin(r: ReconciliationResult): string {
  return r.tally?.gstin ?? r.gstr2b?.gstin ?? "";
}

function getSupplier(r: ReconciliationResult): string {
  return r.gstr2b?.supplierName ?? r.tally?.supplier ?? "";
}

function getInvoiceNo(r: ReconciliationResult): string {
  return r.tally?.invoiceNo ?? r.gstr2b?.invoiceNo ?? "";
}

function getInvoiceDate(r: ReconciliationResult): string {
  return r.tally?.invoiceDate ?? r.gstr2b?.invoiceDate ?? "";
}

function getTallyAmount(r: ReconciliationResult): number {
  return r.tally?.grossTotal ?? 0;
}

function getGstr2bAmount(r: ReconciliationResult): number {
  return r.gstr2b?.invoiceValue ?? 0;
}

function getDifference(r: ReconciliationResult): number {
  return getTallyAmount(r) - getGstr2bAmount(r);
}

function getTaxDiff(r: ReconciliationResult): number {
  const tallyTax = r.tally?.totalTax ?? 0;
  const gstr2bTax =
    (r.gstr2b?.igst ?? 0) + (r.gstr2b?.cgst ?? 0) + (r.gstr2b?.sgst ?? 0);
  return tallyTax - gstr2bTax;
}

function getSortValue(r: ReconciliationResult, field: SortField): string | number {
  switch (field) {
    case "status":
      return r.status;
    case "gstin":
      return getGstin(r);
    case "supplier":
      return getSupplier(r);
    case "invoiceNo":
      return getInvoiceNo(r);
    case "invoiceDate":
      return getInvoiceDate(r);
    case "tallyAmount":
      return getTallyAmount(r);
    case "gstr2bAmount":
      return getGstr2bAmount(r);
    case "difference":
      return getDifference(r);
    case "taxDiff":
      return getTaxDiff(r);
  }
}

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "matched", label: "Matched" },
  { value: "mismatched", label: "Mismatched" },
  { value: "missing_in_2b", label: "Missing in 2B" },
  { value: "missing_in_books", label: "Missing in Books" },
];

function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (field !== sortField) return <ChevronsUpDown className="ml-1 inline size-3 opacity-40" />;
  return sortDir === "asc" ? (
    <ArrowUp className="ml-1 inline size-3" />
  ) : (
    <ArrowDown className="ml-1 inline size-3" />
  );
}

function DiscrepancyDetails({ discrepancies }: { discrepancies: Discrepancy[] }) {
  return (
    <div className="border-t bg-muted/30 px-4 py-3">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Discrepancy Details
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {discrepancies.map((d, i) => (
          <div
            key={i}
            className="rounded-md border bg-background px-3 py-2 text-xs"
          >
            <span className="font-medium text-foreground">{d.field}</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-muted-foreground">
                Tally: <span className="text-foreground">{d.tallyValue}</span>
              </span>
              <span className="text-muted-foreground">vs</span>
              <span className="text-muted-foreground">
                2B: <span className="text-foreground">{d.gstr2bValue}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultRow({
  index,
  result,
  config,
  Icon,
  isExpanded,
  hasMismatch,
  diff,
  taxDiff,
  onToggle,
}: {
  index: number;
  result: ReconciliationResult;
  config: (typeof STATUS_CONFIG)[MatchStatus];
  Icon: typeof CheckCircle2;
  isExpanded: boolean;
  hasMismatch: boolean;
  diff: number;
  taxDiff: number;
  onToggle: (index: number) => void;
}) {
  return (
    <>
      <tr
        className={cn(
          "border-b transition-colors hover:bg-muted/30",
          hasMismatch && "cursor-pointer"
        )}
        onClick={() => hasMismatch && onToggle(index)}
      >
        <td className="px-2 py-2 text-center">
          {hasMismatch &&
            (isExpanded ? (
              <ChevronUp className="inline size-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="inline size-4 text-muted-foreground" />
            ))}
        </td>
        <td className="px-3 py-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
              config.badgeBg
            )}
          >
            <Icon className="size-3" />
            {config.label}
          </span>
        </td>
        <td className="px-3 py-2 font-mono text-xs">{getGstin(result)}</td>
        <td className="max-w-[200px] truncate px-3 py-2">
          {getSupplier(result)}
        </td>
        <td className="px-3 py-2">{getInvoiceNo(result)}</td>
        <td className="px-3 py-2">{getInvoiceDate(result)}</td>
        <td className="px-3 py-2 text-right tabular-nums">
          {result.tally ? formatINR(getTallyAmount(result)) : "-"}
        </td>
        <td className="px-3 py-2 text-right tabular-nums">
          {result.gstr2b ? formatINR(getGstr2bAmount(result)) : "-"}
        </td>
        <td
          className={cn(
            "px-3 py-2 text-right tabular-nums font-medium",
            diff > 0 && "text-red-600 dark:text-red-400",
            diff < 0 && "text-amber-600 dark:text-amber-400",
            diff === 0 && "text-green-600 dark:text-green-400"
          )}
        >
          {result.tally && result.gstr2b ? formatINR(diff) : "-"}
        </td>
        <td
          className={cn(
            "px-3 py-2 text-right tabular-nums",
            taxDiff !== 0 && "text-red-600 dark:text-red-400 font-medium"
          )}
        >
          {result.tally && result.gstr2b ? formatINR(taxDiff) : "-"}
        </td>
      </tr>
      {hasMismatch && isExpanded && (
        <tr>
          <td colSpan={10}>
            <DiscrepancyDetails discrepancies={result.discrepancies} />
          </td>
        </tr>
      )}
    </>
  );
}

export function ResultsTable({ results }: ResultsTableProps) {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [sortField, setSortField] = useState<SortField>("status");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: results.length };
    for (const r of results) {
      c[r.status] = (c[r.status] ?? 0) + 1;
    }
    return c;
  }, [results]);

  const filteredAndSorted = useMemo(() => {
    let filtered = filter === "all" ? results : results.filter((r) => r.status === filter);
    return [...filtered].sort((a, b) => {
      const aVal = getSortValue(a, sortField);
      const bVal = getSortValue(b, sortField);
      const cmp = typeof aVal === "number" && typeof bVal === "number"
        ? aVal - bVal
        : String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [results, filter, sortField, sortDir]);

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortDir("asc");
      }
    },
    [sortField]
  );

  const toggleRow = useCallback((index: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  const columns: { label: string; field: SortField; className?: string }[] = [
    { label: "Status", field: "status", className: "w-[130px]" },
    { label: "GSTIN", field: "gstin", className: "w-[170px]" },
    { label: "Supplier", field: "supplier", className: "min-w-[160px]" },
    { label: "Invoice No", field: "invoiceNo", className: "w-[130px]" },
    { label: "Invoice Date", field: "invoiceDate", className: "w-[110px]" },
    { label: "Tally Amt", field: "tallyAmount", className: "w-[120px] text-right" },
    { label: "2B Amt", field: "gstr2bAmount", className: "w-[120px] text-right" },
    { label: "Difference", field: "difference", className: "w-[120px] text-right" },
    { label: "Tax Diff", field: "taxDiff", className: "w-[110px] text-right" },
  ];

  return (
    <div className="space-y-4">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map((tab) => (
          <Button
            key={tab.value}
            variant={filter === tab.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(tab.value)}
            className="gap-1.5"
          >
            {tab.label}
            <Badge
              variant="secondary"
              className="ml-1 h-4 min-w-[1.25rem] px-1 text-[10px]"
            >
              {counts[tab.value] ?? 0}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filteredAndSorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileQuestion className="mb-3 size-10 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">
                No results found
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Try changing the filter or uploading different files.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="w-8 px-2 py-2" />
                    {columns.map((col) => (
                      <th
                        key={col.field}
                        className={cn(
                          "cursor-pointer select-none whitespace-nowrap px-3 py-2 text-left text-xs font-medium text-muted-foreground hover:text-foreground",
                          col.className
                        )}
                        onClick={() => handleSort(col.field)}
                      >
                        {col.label}
                        <SortIcon
                          field={col.field}
                          sortField={sortField}
                          sortDir={sortDir}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSorted.map((result, index) => {
                    const config = STATUS_CONFIG[result.status];
                    const Icon = config.icon;
                    const isExpanded = expandedRows.has(index);
                    const hasMismatch =
                      result.status === "mismatched" &&
                      result.discrepancies.length > 0;
                    const diff = getDifference(result);
                    const taxDiff = getTaxDiff(result);

                    return (
                      <ResultRow
                        key={index}
                        index={index}
                        result={result}
                        config={config}
                        Icon={Icon}
                        isExpanded={isExpanded}
                        hasMismatch={hasMismatch}
                        diff={diff}
                        taxDiff={taxDiff}
                        onToggle={toggleRow}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
