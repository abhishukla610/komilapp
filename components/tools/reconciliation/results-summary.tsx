import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileQuestion,
} from "lucide-react";

import { formatINR } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import type { ReconciliationSummary } from "@/lib/reconciliation";

interface ResultsSummaryProps {
  summary: ReconciliationSummary;
}

const summaryCards = [
  {
    key: "matched" as const,
    label: "Matched",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-900/30",
    countField: "matched" as const,
    amountLabel: "Taxable Value",
  },
  {
    key: "mismatched" as const,
    label: "Mismatched",
    icon: AlertTriangle,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    countField: "mismatched" as const,
    amountLabel: "Needs Review",
  },
  {
    key: "missingIn2b" as const,
    label: "Missing in GSTR-2B",
    icon: XCircle,
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
    countField: "missingIn2b" as const,
    amountLabel: "ITC at Risk",
  },
  {
    key: "missingInBooks" as const,
    label: "Missing in Books",
    icon: FileQuestion,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    countField: "missingInBooks" as const,
    amountLabel: "Unbooked Value",
  },
];

function getAmount(
  summary: ReconciliationSummary,
  key: string
): number {
  switch (key) {
    case "matched":
      return summary.matchedTaxableTotal;
    case "mismatched":
      return Math.abs(summary.tallyTaxableTotal - summary.gstr2bTaxableTotal);
    case "missingIn2b":
      return summary.itcAtRisk;
    case "missingInBooks":
      return summary.gstr2bTaxableTotal - summary.matchedTaxableTotal;
    default:
      return 0;
  }
}

export function ResultsSummary({ summary }: ResultsSummaryProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.key}>
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${card.bg}`}
              >
                <card.icon className={`size-4 ${card.color}`} />
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold tabular-nums text-foreground">
                {summary[card.countField]}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {card.amountLabel}:{" "}
                <span className="font-medium text-foreground">
                  {formatINR(getAmount(summary, card.key))}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="py-3">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-muted-foreground">Total Tally Entries: </span>
                <span className="font-semibold tabular-nums">{summary.totalTally}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div>
                <span className="text-muted-foreground">Total 2B Entries: </span>
                <span className="font-semibold tabular-nums">{summary.totalGstr2b}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-1.5 dark:bg-red-950/20">
              <XCircle className="size-4 text-red-600 dark:text-red-400" />
              <span className="text-muted-foreground">ITC at Risk: </span>
              <span className="font-bold text-red-600 tabular-nums dark:text-red-400">
                {formatINR(summary.itcAtRisk)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
