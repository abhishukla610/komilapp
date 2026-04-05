"use client";

import { useState } from "react";
import { Calculator, IndianRupee, ArrowRightLeft } from "lucide-react";

import { formatINR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GST_RATES = [
  { label: "5%", value: "5" },
  { label: "12%", value: "12" },
  { label: "18%", value: "18" },
  { label: "28%", value: "28" },
];

const CALC_TYPES = [
  { label: "Add GST to Amount", value: "add" },
  { label: "Remove GST from Amount", value: "remove" },
];

interface GstResult {
  originalAmount: number;
  gstAmount: number;
  totalAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  rate: number;
  type: "add" | "remove";
}

export function GstCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [calcType, setCalcType] = useState("add");
  const [supplyType, setSupplyType] = useState<"intrastate" | "interstate">(
    "intrastate"
  );
  const [result, setResult] = useState<GstResult | null>(null);

  function calculate() {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const rate = parseFloat(gstRate);

    let originalAmount: number;
    let gstAmount: number;
    let totalAmount: number;

    if (calcType === "add") {
      originalAmount = numAmount;
      gstAmount = numAmount * (rate / 100);
      totalAmount = numAmount + gstAmount;
    } else {
      totalAmount = numAmount;
      originalAmount = numAmount * (100 / (100 + rate));
      gstAmount = numAmount - originalAmount;
    }

    setResult({
      originalAmount,
      gstAmount,
      totalAmount,
      cgst: gstAmount / 2,
      sgst: gstAmount / 2,
      igst: gstAmount,
      rate,
      type: calcType as "add" | "remove",
    });
  }

  function handleReset() {
    setAmount("");
    setGstRate("18");
    setCalcType("add");
    setResult(null);
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2">
      {/* Input Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="size-5 text-[var(--color-accent-gold)]" />
            GST Calculator
          </CardTitle>
          <CardDescription>
            Calculate GST for any amount with Indian tax rates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                <IndianRupee className="size-4" />
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="h-10 pl-9"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") calculate();
                }}
                min="0"
                step="any"
              />
            </div>
          </div>

          {/* GST Rate */}
          <div className="space-y-2">
            <Label>GST Rate</Label>
            <Select
              value={gstRate}
              onValueChange={(val) => { if (val) setGstRate(val); }}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select GST rate" />
              </SelectTrigger>
              <SelectContent>
                {GST_RATES.map((rate) => (
                  <SelectItem key={rate.value} value={rate.value}>
                    {rate.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Calculation Type */}
          <div className="space-y-2">
            <Label>Calculation Type</Label>
            <Select
              value={calcType}
              onValueChange={(val) => { if (val) setCalcType(val); }}
            >
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent>
                {CALC_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button className="flex-1 h-10" onClick={calculate}>
              <Calculator className="mr-2 size-4" />
              Calculate GST
            </Button>
            <Button variant="outline" className="h-10" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Card */}
      <Card
        className={
          result
            ? "border-[var(--color-accent-gold)]/30"
            : "border-dashed"
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ArrowRightLeft className="size-5 text-[var(--color-accent-gold)]" />
              Results
            </span>
            {result && (
              <Badge variant="secondary">
                {result.rate}% GST
              </Badge>
            )}
          </CardTitle>
          {!result && (
            <CardDescription>
              Enter an amount and click Calculate to see the breakdown
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-5">
              {/* Supply Type Toggle */}
              <div className="flex rounded-lg border border-input overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSupplyType("intrastate")}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    supplyType === "intrastate"
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Intrastate (CGST + SGST)
                </button>
                <button
                  type="button"
                  onClick={() => setSupplyType("interstate")}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    supplyType === "interstate"
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Interstate (IGST)
                </button>
              </div>

              {/* Result Breakdown */}
              <div className="space-y-3">
                <ResultRow
                  label={
                    result.type === "add" ? "Original Amount" : "Base Amount"
                  }
                  value={formatINR(result.originalAmount)}
                />

                <div className="border-t border-dashed pt-3 space-y-3">
                  {supplyType === "intrastate" ? (
                    <>
                      <ResultRow
                        label={`CGST (${result.rate / 2}%)`}
                        value={formatINR(result.cgst)}
                        accent
                      />
                      <ResultRow
                        label={`SGST (${result.rate / 2}%)`}
                        value={formatINR(result.sgst)}
                        accent
                      />
                    </>
                  ) : (
                    <ResultRow
                      label={`IGST (${result.rate}%)`}
                      value={formatINR(result.igst)}
                      accent
                    />
                  )}
                </div>

                <ResultRow
                  label="Total GST"
                  value={formatINR(result.gstAmount)}
                  accent
                />

                <div className="border-t pt-3">
                  <ResultRow
                    label="Total Amount"
                    value={formatINR(result.totalAmount)}
                    bold
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[200px] items-center justify-center text-muted-foreground">
              <p className="text-center text-sm">
                Your GST calculation results will appear here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ResultRow({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-sm ${bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}
      >
        {label}
      </span>
      <span
        className={`font-mono tabular-nums ${
          bold
            ? "text-lg font-bold text-foreground"
            : accent
              ? "text-sm font-medium text-[var(--color-accent-gold)]"
              : "text-sm font-medium text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
