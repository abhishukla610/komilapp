"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Calculator,
  IndianRupee,
  TrendingDown,
  ArrowRight,
  Info,
  CheckCircle,
} from "lucide-react";
import {
  calculateTax,
  getSlabBreakdown,
  getOldRegimeSlabs,
  NEW_REGIME_SLABS,
  STANDARD_DEDUCTION_NEW,
  STANDARD_DEDUCTION_OLD,
  REBATE_THRESHOLD_NEW,
  REBATE_THRESHOLD_OLD,
  CESS_RATE,
  SECTION_80C_LIMIT,
  SECTION_80D_LIMIT_GENERAL,
  SECTION_80D_LIMIT_SENIOR,
  type TaxSlab,
} from "@/lib/tax-data";

function formatINR(amount: number): string {
  if (amount === 0) return "\u20B90";
  const isNegative = amount < 0;
  const abs = Math.abs(Math.round(amount));
  const str = abs.toString();
  let result = "";

  if (str.length <= 3) {
    result = str;
  } else {
    result = str.slice(-3);
    let remaining = str.slice(0, -3);
    while (remaining.length > 2) {
      result = remaining.slice(-2) + "," + result;
      remaining = remaining.slice(0, -2);
    }
    if (remaining.length > 0) {
      result = remaining + "," + result;
    }
  }

  return (isNegative ? "-" : "") + "\u20B9" + result;
}

function formatSlabRange(from: number, to: number): string {
  if (to === Infinity || to >= 999999999) {
    return `Above ${formatINR(from)}`;
  }
  return `${formatINR(from)} - ${formatINR(to)}`;
}

interface TaxResult {
  grossIncome: number;
  standardDeduction: number;
  otherDeductions: number;
  taxableIncome: number;
  taxBeforeRebate: number;
  rebate: number;
  taxAfterRebate: number;
  cess: number;
  totalTax: number;
  effectiveRate: number;
  slabBreakdown: {
    from: number;
    to: number;
    rate: number;
    taxableAmount: number;
    tax: number;
  }[];
}

function computeTax(
  grossIncome: number,
  regime: "new" | "old",
  ageGroup: string,
  deductions80C: number,
  deductions80D: number,
  hraExemption: number,
  otherDeductions: number
): TaxResult {
  const standardDeduction =
    regime === "new" ? STANDARD_DEDUCTION_NEW : STANDARD_DEDUCTION_OLD;

  let totalOtherDeductions = 0;
  if (regime === "old") {
    const max80D =
      ageGroup === "general"
        ? SECTION_80D_LIMIT_GENERAL
        : SECTION_80D_LIMIT_SENIOR;
    totalOtherDeductions =
      Math.min(deductions80C, SECTION_80C_LIMIT) +
      Math.min(deductions80D, max80D) +
      hraExemption +
      otherDeductions;
  }

  const taxableIncome = Math.max(
    0,
    grossIncome - standardDeduction - totalOtherDeductions
  );

  const slabs: TaxSlab[] =
    regime === "new" ? NEW_REGIME_SLABS : getOldRegimeSlabs(ageGroup);

  const taxBeforeRebate = calculateTax(taxableIncome, slabs);

  const rebateThreshold =
    regime === "new" ? REBATE_THRESHOLD_NEW : REBATE_THRESHOLD_OLD;
  const rebate =
    taxableIncome <= rebateThreshold ? taxBeforeRebate : 0;

  const taxAfterRebate = taxBeforeRebate - rebate;
  const cess = (taxAfterRebate * CESS_RATE) / 100;
  const totalTax = taxAfterRebate + cess;
  const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;

  const slabBreakdown = getSlabBreakdown(taxableIncome, slabs);

  return {
    grossIncome,
    standardDeduction,
    otherDeductions: totalOtherDeductions,
    taxableIncome,
    taxBeforeRebate,
    rebate,
    taxAfterRebate,
    cess,
    totalTax,
    effectiveRate,
    slabBreakdown,
  };
}

function ResultCard({
  result,
  regime,
  isBetter,
}: {
  result: TaxResult;
  regime: "new" | "old";
  isBetter: boolean;
}) {
  return (
    <Card
      className={
        isBetter ? "border-green-500/50 bg-green-50/30 dark:bg-green-950/10" : ""
      }
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {regime === "new" ? "New Regime" : "Old Regime"}
          </CardTitle>
          {isBetter && (
            <Badge className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-1 h-3 w-3" />
              Saves More
            </Badge>
          )}
        </div>
        <CardDescription>
          {regime === "new" ? "FY 2025-26 Default" : "With Deductions"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gross Income</span>
            <span className="font-medium">{formatINR(result.grossIncome)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Standard Deduction</span>
            <span className="font-medium text-red-600">
              -{formatINR(result.standardDeduction)}
            </span>
          </div>
          {result.otherDeductions > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Other Deductions</span>
              <span className="font-medium text-red-600">
                -{formatINR(result.otherDeductions)}
              </span>
            </div>
          )}
          <div className="flex justify-between border-t pt-2">
            <span className="font-medium">Taxable Income</span>
            <span className="font-semibold">
              {formatINR(result.taxableIncome)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax (before cess)</span>
            <span className="font-medium">
              {formatINR(result.taxBeforeRebate)}
            </span>
          </div>
          {result.rebate > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Section 87A Rebate
              </span>
              <span className="font-medium text-green-600">
                -{formatINR(result.rebate)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Health &amp; Edu. Cess (4%)
            </span>
            <span className="font-medium">{formatINR(result.cess)}</span>
          </div>
          <div className="flex justify-between border-t pt-2">
            <span className="text-base font-semibold">Total Tax</span>
            <span className="text-base font-bold text-primary">
              {formatINR(result.totalTax)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Effective Tax Rate</span>
            <span className="font-medium">
              {result.effectiveRate.toFixed(2)}%
            </span>
          </div>
        </div>

        {result.slabBreakdown.length > 0 && (
          <Accordion>
            <AccordionItem value="slab-breakdown" className="border-none">
              <AccordionTrigger className="py-2 text-sm hover:no-underline">
                Slab-wise Breakdown
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b text-muted-foreground">
                        <th className="pb-2 text-left font-medium">
                          Income Slab
                        </th>
                        <th className="pb-2 text-right font-medium">Rate</th>
                        <th className="pb-2 text-right font-medium">Tax</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.slabBreakdown.map((slab, i) => (
                        <tr key={i} className="border-b last:border-none">
                          <td className="py-1.5">
                            {formatSlabRange(slab.from, slab.to)}
                          </td>
                          <td className="py-1.5 text-right">{slab.rate}%</td>
                          <td className="py-1.5 text-right font-medium">
                            {formatINR(slab.tax)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}

export function IncomeTaxCalculator() {
  const [grossIncome, setGrossIncome] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<string>("general");
  const [activeRegimeTab, setActiveRegimeTab] = useState<string>("new");
  const [deductions80C, setDeductions80C] = useState<string>("");
  const [deductions80D, setDeductions80D] = useState<string>("");
  const [hraExemption, setHraExemption] = useState<string>("");
  const [otherDeductions, setOtherDeductions] = useState<string>("");
  const [hasCalculated, setHasCalculated] = useState(false);

  const parseNum = (val: string) => {
    const n = parseFloat(val.replace(/,/g, ""));
    return isNaN(n) ? 0 : Math.max(0, n);
  };

  const results = useMemo(() => {
    if (!hasCalculated) return null;

    const income = parseNum(grossIncome);
    if (income <= 0) return null;

    const d80C = parseNum(deductions80C);
    const d80D = parseNum(deductions80D);
    const hra = parseNum(hraExemption);
    const others = parseNum(otherDeductions);

    const newResult = computeTax(income, "new", ageGroup, 0, 0, 0, 0);
    const oldResult = computeTax(
      income,
      "old",
      ageGroup,
      d80C,
      d80D,
      hra,
      others
    );

    return { newResult, oldResult };
  }, [
    hasCalculated,
    grossIncome,
    ageGroup,
    deductions80C,
    deductions80D,
    hraExemption,
    otherDeductions,
  ]);

  const handleCalculate = useCallback(() => {
    setHasCalculated(true);
  }, []);

  const handleReset = useCallback(() => {
    setGrossIncome("");
    setAgeGroup("general");
    setActiveRegimeTab("new");
    setDeductions80C("");
    setDeductions80D("");
    setHraExemption("");
    setOtherDeductions("");
    setHasCalculated(false);
  }, []);

  const savings = results
    ? Math.abs(results.newResult.totalTax - results.oldResult.totalTax)
    : 0;
  const betterRegime =
    results && results.newResult.totalTax <= results.oldResult.totalTax
      ? "new"
      : "old";

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Tax Details
          </CardTitle>
          <CardDescription>
            Enter your income details for FY 2025-26 (AY 2026-27)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Inputs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gross-income">
                Annual Gross Income
                <span className="ml-1 text-xs text-muted-foreground">
                  (before deductions)
                </span>
              </Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="gross-income"
                  type="text"
                  inputMode="numeric"
                  placeholder="e.g. 12,00,000"
                  className="pl-9"
                  value={grossIncome}
                  onChange={(e) => {
                    setGrossIncome(e.target.value.replace(/[^0-9,]/g, ""));
                    setHasCalculated(false);
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age-group">Age Group</Label>
              <Select
                value={ageGroup}
                onValueChange={(val) => {
                  if (val) setAgeGroup(val);
                  setHasCalculated(false);
                }}
              >
                <SelectTrigger id="age-group">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">Below 60 years</SelectItem>
                  <SelectItem value="senior">60 - 80 years (Senior)</SelectItem>
                  <SelectItem value="super-senior">
                    80+ years (Super Senior)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Regime-specific Deductions */}
          <Tabs
            value={activeRegimeTab}
            onValueChange={setActiveRegimeTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="new">New Regime (Default)</TabsTrigger>
              <TabsTrigger value="old">Old Regime</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="mt-4">
              <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/20">
                <div className="flex gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <div className="text-sm text-blue-800 dark:text-blue-300">
                    <p className="font-medium">New Tax Regime (Default from FY 2023-24)</p>
                    <p className="mt-1 text-blue-700 dark:text-blue-400">
                      Standard deduction of {formatINR(STANDARD_DEDUCTION_NEW)} is
                      automatically applied. No additional deductions like 80C, 80D,
                      or HRA are available under this regime.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="old" className="mt-4 space-y-4">
              <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
                <div className="flex gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    Standard deduction of {formatINR(STANDARD_DEDUCTION_OLD)} is
                    automatically applied. Enter your additional deductions below.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="d80c">
                    Section 80C
                    <span className="ml-1 text-xs text-muted-foreground">
                      (max {formatINR(SECTION_80C_LIMIT)})
                    </span>
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="d80c"
                      type="text"
                      inputMode="numeric"
                      placeholder="EPF, PPF, ELSS, LIC..."
                      className="pl-9"
                      value={deductions80C}
                      onChange={(e) => {
                        setDeductions80C(
                          e.target.value.replace(/[^0-9,]/g, "")
                        );
                        setHasCalculated(false);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="d80d">
                    Section 80D
                    <span className="ml-1 text-xs text-muted-foreground">
                      (Health Insurance, max{" "}
                      {formatINR(
                        ageGroup === "general"
                          ? SECTION_80D_LIMIT_GENERAL
                          : SECTION_80D_LIMIT_SENIOR
                      )}
                      )
                    </span>
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="d80d"
                      type="text"
                      inputMode="numeric"
                      placeholder="Health insurance premium"
                      className="pl-9"
                      value={deductions80D}
                      onChange={(e) => {
                        setDeductions80D(
                          e.target.value.replace(/[^0-9,]/g, "")
                        );
                        setHasCalculated(false);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hra">HRA Exemption</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="hra"
                      type="text"
                      inputMode="numeric"
                      placeholder="HRA exemption amount"
                      className="pl-9"
                      value={hraExemption}
                      onChange={(e) => {
                        setHraExemption(
                          e.target.value.replace(/[^0-9,]/g, "")
                        );
                        setHasCalculated(false);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="other-deductions">
                    Other Deductions
                    <span className="ml-1 text-xs text-muted-foreground">
                      (80TTA, 80E, 80G, etc.)
                    </span>
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="other-deductions"
                      type="text"
                      inputMode="numeric"
                      placeholder="Other deductions"
                      className="pl-9"
                      value={otherDeductions}
                      onChange={(e) => {
                        setOtherDeductions(
                          e.target.value.replace(/[^0-9,]/g, "")
                        );
                        setHasCalculated(false);
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={handleCalculate} className="flex-1" size="lg">
              <Calculator className="mr-2 h-4 w-4" />
              Calculate Tax
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {results && (
        <div className="space-y-6">
          {/* Savings Summary */}
          {savings > 0 && (
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="flex flex-col items-center gap-2 py-5 text-center sm:flex-row sm:justify-center sm:text-left">
                <TrendingDown className="h-5 w-5 text-green-600" />
                <p className="text-base font-medium">
                  You save{" "}
                  <span className="font-bold text-green-600">
                    {formatINR(savings)}
                  </span>{" "}
                  with the{" "}
                  <span className="font-bold">
                    {betterRegime === "new" ? "New" : "Old"} Regime
                  </span>
                </p>
                <ArrowRight className="hidden h-4 w-4 sm:block" />
                <Badge variant="secondary" className="text-xs">
                  Effective Rate:{" "}
                  {betterRegime === "new"
                    ? results.newResult.effectiveRate.toFixed(2)
                    : results.oldResult.effectiveRate.toFixed(2)}
                  %
                </Badge>
              </CardContent>
            </Card>
          )}

          {/* Side-by-side Comparison */}
          <div className="grid gap-6 md:grid-cols-2">
            <ResultCard
              result={results.newResult}
              regime="new"
              isBetter={betterRegime === "new"}
            />
            <ResultCard
              result={results.oldResult}
              regime="old"
              isBetter={betterRegime === "old"}
            />
          </div>
        </div>
      )}
    </div>
  );
}
