"use client";

import { useState, useCallback } from "react";
import {
  Shield,
  Loader2,
  Download,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { FileUpload } from "@/components/tools/reconciliation/file-upload";
import { ResultsSummary } from "@/components/tools/reconciliation/results-summary";
import { ResultsTable } from "@/components/tools/reconciliation/results-table";

import {
  parseTallyExcel,
  parseGstr2bExcel,
  reconcile,
  exportToExcel,
} from "@/lib/reconciliation";
import type {
  ReconciliationResult,
  ReconciliationSummary,
} from "@/lib/reconciliation";

export function ReconciliationTool() {
  const [tallyFile, setTallyFile] = useState<File | null>(null);
  const [gstr2bFile, setGstr2bFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ReconciliationResult[] | null>(null);
  const [summary, setSummary] = useState<ReconciliationSummary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleReconcile = useCallback(async () => {
    if (!tallyFile || !gstr2bFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const [tallyBuffer, gstr2bBuffer] = await Promise.all([
        tallyFile.arrayBuffer(),
        gstr2bFile.arrayBuffer(),
      ]);

      const tallyData = parseTallyExcel(tallyBuffer);
      const gstr2bData = parseGstr2bExcel(gstr2bBuffer);

      if (tallyData.length === 0 && gstr2bData.length === 0) {
        throw new Error(
          "Both files appear to be empty. Please check the file format and try again."
        );
      }

      const { results: reconciled, summary: reconciliationSummary } =
        reconcile(tallyData, gstr2bData);

      setResults(reconciled);
      setSummary(reconciliationSummary);
      toast.success(
        `Reconciliation complete. ${reconciliationSummary.matched} matched, ${reconciliationSummary.mismatched} mismatched.`
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  }, [tallyFile, gstr2bFile]);

  const handleExport = useCallback(() => {
    if (!results || !summary) return;

    try {
      const buffer = exportToExcel(results, summary);
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `GST-2B-Reconciliation-${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Report exported successfully.");
    } catch {
      toast.error("Failed to export report. Please try again.");
    }
  }, [results, summary]);

  const handleReset = useCallback(() => {
    setTallyFile(null);
    setGstr2bFile(null);
    setResults(null);
    setSummary(null);
    setError(null);
  }, []);

  const hasResults = results !== null && summary !== null;
  const canReconcile = tallyFile !== null && gstr2bFile !== null && !isProcessing;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Privacy banner */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-900/50 dark:bg-green-950/10">
        <CardContent className="flex items-center gap-3 py-3">
          <Shield className="size-5 shrink-0 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-800 dark:text-green-300">
            <span className="font-semibold">100% Private.</span> Your data never
            leaves your browser. No files are uploaded to any server. All
            processing happens locally on your device.
          </p>
        </CardContent>
      </Card>

      {!hasResults ? (
        <>
          {/* Step 1: File Upload */}
          <FileUpload
            tallyFile={tallyFile}
            gstr2bFile={gstr2bFile}
            onTallyFile={setTallyFile}
            onGstr2bFile={setGstr2bFile}
          />

          {/* Error display */}
          {error && (
            <Card className="border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/10">
              <CardContent className="py-3">
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Reconcile button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleReconcile}
              disabled={!canReconcile}
              className="gap-2 bg-[var(--color-accent-gold)] text-white hover:bg-[var(--color-accent-gold)]/90 disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="size-4" />
                  Reconcile Now
                </>
              )}
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Step 2: Results */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-serif text-lg font-bold text-foreground">
              Reconciliation Results
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5">
                <Download className="size-4" />
                Export to Excel
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
                <RotateCcw className="size-4" />
                Start Over
              </Button>
            </div>
          </div>

          <ResultsSummary summary={summary} />

          <Separator />

          <ResultsTable results={results} />
        </>
      )}
    </div>
  );
}
