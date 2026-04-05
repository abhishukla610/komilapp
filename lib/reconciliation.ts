import * as XLSX from "xlsx";

// ===== TYPES =====

export interface TallyPurchase {
  date: string;
  supplier: string;
  voucherNo: string;
  invoiceNo: string;
  invoiceDate: string;
  gstin: string;
  taxableValue: number;
  sgst: number;
  cgst: number;
  igst: number;
  totalTax: number;
  grossTotal: number;
}

export interface Gstr2bInvoice {
  gstin: string;
  supplierName: string;
  invoiceNo: string;
  invoiceType: string;
  invoiceDate: string;
  invoiceValue: number;
  taxableValue: number;
  igst: number;
  cgst: number;
  sgst: number;
  cess: number;
  itcAvailable: string;
  filingPeriod: string;
}

export type MatchStatus =
  | "matched"
  | "mismatched"
  | "missing_in_2b"
  | "missing_in_books";

export interface Discrepancy {
  field: string;
  tallyValue: string | number;
  gstr2bValue: string | number;
}

export interface ReconciliationResult {
  status: MatchStatus;
  tally?: TallyPurchase;
  gstr2b?: Gstr2bInvoice;
  discrepancies: Discrepancy[];
}

export interface ReconciliationSummary {
  totalTally: number;
  totalGstr2b: number;
  matched: number;
  mismatched: number;
  missingIn2b: number;
  missingInBooks: number;
  tallyTaxableTotal: number;
  gstr2bTaxableTotal: number;
  matchedTaxableTotal: number;
  itcAtRisk: number;
}

// ===== NORMALIZATION HELPERS =====

/**
 * Normalize invoice number for matching: trim, uppercase, collapse whitespace,
 * remove leading zeros and common separators for fuzzy matching.
 */
export function normalizeInvoiceNo(inv: string | null | undefined): string {
  if (inv == null) return "";
  return String(inv)
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ");
}

/**
 * Normalize GSTIN: trim, uppercase, remove all whitespace.
 */
export function normalizeGstin(gstin: string | null | undefined): string {
  if (gstin == null) return "";
  return String(gstin)
    .trim()
    .toUpperCase()
    .replace(/\s+/g, "");
}

/**
 * Parse an amount value that may be a number, a string with " Dr"/" Cr" suffix,
 * or contain commas. Returns 0 for unparseable values.
 * "Cr" amounts are returned as negative (credit = outflow in purchase context).
 */
export function parseAmount(val: unknown): number {
  if (val == null || val === "") return 0;
  if (typeof val === "number") return isNaN(val) ? 0 : val;

  const str = String(val).trim();
  if (str === "") return 0;

  const isCredit = /\s*Cr\s*$/i.test(str);
  const cleaned = str
    .replace(/\s*(Dr|Cr)\s*$/i, "")
    .replace(/,/g, "")
    .trim();

  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  return isCredit ? -num : num;
}

/**
 * Parse a numeric value that may be a string with commas or whitespace.
 * Unlike parseAmount, does not handle Dr/Cr suffixes.
 */
function parseNumeric(val: unknown): number {
  if (val == null || val === "") return 0;
  if (typeof val === "number") return isNaN(val) ? 0 : val;

  const str = String(val).replace(/,/g, "").trim();
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
}

/**
 * Normalize a date string to DD/MM/YYYY where possible. Handles:
 * - DD/MM/YYYY, DD-MM-YYYY (passthrough / normalize separators)
 * - Excel serial date numbers
 * - ISO strings
 */
function normalizeDate(val: unknown): string {
  if (val == null || val === "") return "";

  // Excel serial date number
  if (typeof val === "number") {
    try {
      const parsed = XLSX.SSF.parse_date_code(val);
      if (parsed) {
        const dd = String(parsed.d).padStart(2, "0");
        const mm = String(parsed.m).padStart(2, "0");
        const yyyy = String(parsed.y);
        return `${dd}/${mm}/${yyyy}`;
      }
    } catch {
      // fall through
    }
    return String(val);
  }

  const str = String(val).trim();

  // Already DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = str.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/);
  if (dmyMatch) {
    const dd = dmyMatch[1].padStart(2, "0");
    const mm = dmyMatch[2].padStart(2, "0");
    return `${dd}/${mm}/${dmyMatch[3]}`;
  }

  // ISO format YYYY-MM-DD
  const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    return `${isoMatch[3]}/${isoMatch[2]}/${isoMatch[1]}`;
  }

  return str;
}

/**
 * Build a reconciliation key from GSTIN and invoice number.
 */
function makeKey(gstin: string, invoiceNo: string): string {
  return `${normalizeGstin(gstin)}|${normalizeInvoiceNo(invoiceNo)}`;
}

// ===== TALLY PARSER =====

/**
 * Column name variants we look for in Tally header rows.
 * Keys are our internal names, values are possible header labels (lowercased for matching).
 */
const TALLY_COLUMN_MAP: Record<string, string[]> = {
  date: ["date"],
  supplier: ["supplier"],
  particulars: ["particulars"],
  voucherType: ["voucher type"],
  voucherNo: ["voucher no.", "voucher no", "vch no.", "vch no"],
  invoiceNo: [
    "supplier invoice no.",
    "supplier invoice no",
    "invoice no.",
    "invoice no",
  ],
  invoiceDate: [
    "supplier invoice date",
    "invoice date",
  ],
  gstin: ["gstin/uin", "gstin", "uin"],
  value: ["value"],
  grossTotal: ["gross total"],
  sgst: ["sgst"],
  cgst: ["cgst"],
  igst: ["igst", "18% igst purchase"],
  gstPurchase: ["18% gst purchase", "gst purchase"],
  roundOff: ["round off"],
  addlCost: ["addl. cost", "addl cost", "additional cost"],
  freight: ["freight (purchase)", "freight"],
};

function findTallyColumnIndex(
  headerRow: unknown[],
  fieldNames: string[]
): number {
  for (let i = 0; i < headerRow.length; i++) {
    const cell = String(headerRow[i] ?? "")
      .trim()
      .toLowerCase();
    for (const name of fieldNames) {
      if (cell === name || cell.includes(name)) {
        return i;
      }
    }
  }
  return -1;
}

/**
 * Parse a Tally Purchase Register Excel file from an ArrayBuffer.
 * Throws on invalid/empty data.
 */
export function parseTallyExcel(data: ArrayBuffer): TallyPurchase[] {
  let workbook: XLSX.WorkBook;
  try {
    workbook = XLSX.read(data, { type: "array" });
  } catch (err) {
    throw new Error(
      `Failed to read Tally Excel file: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error("Tally Excel file has no sheets.");
  }

  const sheet = workbook.Sheets[sheetName];
  const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    blankrows: false,
  });

  if (rows.length === 0) {
    throw new Error("Tally Excel file is empty.");
  }

  // Find header row by scanning for a row containing "GSTIN/UIN"
  let headerRowIndex = -1;
  for (let i = 0; i < Math.min(rows.length, 20); i++) {
    const row = rows[i];
    if (!row) continue;
    const hasGstin = row.some((cell) =>
      String(cell ?? "")
        .toLowerCase()
        .includes("gstin")
    );
    if (hasGstin) {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) {
    throw new Error(
      'Could not find header row in Tally file. Expected a row containing "GSTIN/UIN".'
    );
  }

  const headerRow = rows[headerRowIndex];

  // Map columns
  const col = {
    date: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.date),
    supplier: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.supplier),
    voucherNo: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.voucherNo),
    invoiceNo: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.invoiceNo),
    invoiceDate: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.invoiceDate),
    gstin: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.gstin),
    value: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.value),
    grossTotal: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.grossTotal),
    sgst: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.sgst),
    cgst: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.cgst),
    igst: findTallyColumnIndex(headerRow, TALLY_COLUMN_MAP.igst),
  };

  // Validate that essential columns were found
  if (col.gstin === -1) {
    throw new Error("Could not find GSTIN/UIN column in Tally file.");
  }
  if (col.invoiceNo === -1) {
    throw new Error("Could not find Invoice No column in Tally file.");
  }

  const results: TallyPurchase[] = [];

  for (let i = headerRowIndex + 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    // Skip Grand Total row
    const firstCell = String(row[0] ?? "").trim().toLowerCase();
    const hasGrandTotal = row.some((cell) =>
      String(cell ?? "").toLowerCase().includes("grand total")
    );
    if (hasGrandTotal || firstCell === "grand total") continue;

    // Skip rows without GSTIN (likely sub-headers or empty)
    const gstin = normalizeGstin(String(row[col.gstin] ?? ""));
    if (!gstin || gstin.length < 15) continue;

    const invoiceNo = String(
      row[col.invoiceNo] ?? row[col.voucherNo] ?? ""
    ).trim();
    if (!invoiceNo) continue;

    const taxableValue =
      col.value !== -1 ? parseAmount(row[col.value]) : 0;
    const sgst = col.sgst !== -1 ? parseAmount(row[col.sgst]) : 0;
    const cgst = col.cgst !== -1 ? parseAmount(row[col.cgst]) : 0;
    const igst = col.igst !== -1 ? parseAmount(row[col.igst]) : 0;
    const totalTax = sgst + cgst + igst;
    const grossTotal =
      col.grossTotal !== -1
        ? parseAmount(row[col.grossTotal])
        : taxableValue + totalTax;

    results.push({
      date: normalizeDate(row[col.date] ?? ""),
      supplier:
        col.supplier !== -1 ? String(row[col.supplier] ?? "").trim() : "",
      voucherNo:
        col.voucherNo !== -1 ? String(row[col.voucherNo] ?? "").trim() : "",
      invoiceNo,
      invoiceDate:
        col.invoiceDate !== -1
          ? normalizeDate(row[col.invoiceDate] ?? "")
          : "",
      gstin,
      taxableValue: Math.abs(taxableValue),
      sgst: Math.abs(sgst),
      cgst: Math.abs(cgst),
      igst: Math.abs(igst),
      totalTax: Math.abs(totalTax),
      grossTotal: Math.abs(grossTotal),
    });
  }

  return results;
}

// ===== GSTR-2B PARSER =====

/**
 * Parse a GSTR-2B Excel file from an ArrayBuffer.
 * Looks for the "B2B" sheet (case-insensitive).
 * Throws on invalid/empty data.
 */
export function parseGstr2bExcel(data: ArrayBuffer): Gstr2bInvoice[] {
  let workbook: XLSX.WorkBook;
  try {
    workbook = XLSX.read(data, { type: "array" });
  } catch (err) {
    throw new Error(
      `Failed to read GSTR-2B Excel file: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  // Find the B2B sheet (case-insensitive)
  const b2bSheetName = workbook.SheetNames.find(
    (name) => name.toUpperCase() === "B2B"
  );
  if (!b2bSheetName) {
    throw new Error(
      `Could not find "B2B" sheet in GSTR-2B file. Available sheets: ${workbook.SheetNames.join(", ")}`
    );
  }

  const sheet = workbook.Sheets[b2bSheetName];
  const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
    blankrows: false,
  });

  if (rows.length === 0) {
    throw new Error("B2B sheet in GSTR-2B file is empty.");
  }

  // Find header row containing "GSTIN of supplier" (may be across merged cells)
  let headerRowIndex = -1;
  for (let i = 0; i < Math.min(rows.length, 15); i++) {
    const row = rows[i];
    if (!row) continue;
    const hasGstin = row.some((cell) =>
      String(cell ?? "")
        .toLowerCase()
        .includes("gstin of supplier")
    );
    if (hasGstin) {
      headerRowIndex = i;
      break;
    }
  }

  if (headerRowIndex === -1) {
    throw new Error(
      'Could not find header row in GSTR-2B B2B sheet. Expected "GSTIN of supplier".'
    );
  }

  // The GSTR-2B portal export has two header rows due to merged cells.
  // Row at headerRowIndex has: GSTIN of supplier, Trade/Legal name, Invoice Details (merged), ...
  // Row at headerRowIndex+1 has: (blank), (blank), Invoice number, Invoice type, Invoice Date, Invoice Value, ...
  // We need to detect the actual column layout by examining both rows.

  const headerRow1 = rows[headerRowIndex];
  const headerRow2 =
    headerRowIndex + 1 < rows.length ? rows[headerRowIndex + 1] : [];

  // Build column mapping by scanning both header rows
  // We'll use the second header row primarily for sub-columns under merged headers
  const colMap: Record<string, number> = {};

  // First, find columns from primary header row
  for (let i = 0; i < headerRow1.length; i++) {
    const cell = String(headerRow1[i] ?? "")
      .trim()
      .toLowerCase();

    if (cell.includes("gstin of supplier") || cell === "gstin") {
      colMap.gstin = i;
    } else if (
      cell.includes("trade") ||
      cell.includes("legal name") ||
      cell.includes("trade/legal")
    ) {
      colMap.supplierName = i;
    } else if (cell.includes("place of supply")) {
      colMap.placeOfSupply = i;
    } else if (cell.includes("reverse charge")) {
      colMap.reverseCharge = i;
    } else if (
      cell.includes("filing period") ||
      cell.includes("return period")
    ) {
      colMap.filingPeriod = i;
    } else if (cell.includes("filing date")) {
      colMap.filingDate = i;
    } else if (
      cell.includes("itc avail") ||
      cell.includes("itc availability")
    ) {
      colMap.itcAvailable = i;
    }
  }

  // Now scan the second header row for sub-columns
  for (let i = 0; i < headerRow2.length; i++) {
    const cell = String(headerRow2[i] ?? "")
      .trim()
      .toLowerCase();

    if (cell.includes("invoice number") || cell === "invoice no") {
      colMap.invoiceNo = i;
    } else if (cell.includes("invoice type")) {
      colMap.invoiceType = i;
    } else if (cell.includes("invoice date")) {
      colMap.invoiceDate = i;
    } else if (cell.includes("invoice value")) {
      colMap.invoiceValue = i;
    } else if (cell.includes("taxable value")) {
      colMap.taxableValue = i;
    } else if (cell.includes("integrated tax")) {
      colMap.igst = i;
    } else if (cell.includes("central tax")) {
      colMap.cgst = i;
    } else if (cell.includes("state") || cell.includes("ut tax")) {
      colMap.sgst = i;
    } else if (cell.includes("cess")) {
      colMap.cess = i;
    } else if (
      cell.includes("filing period") ||
      cell.includes("return period")
    ) {
      colMap.filingPeriod = i;
    } else if (cell.includes("filing date")) {
      colMap.filingDate = i;
    } else if (
      cell.includes("itc avail") ||
      cell.includes("itc availability")
    ) {
      colMap.itcAvailable = i;
    }
  }

  // If sub-columns weren't found in row2, fall back to positional mapping
  // based on the known GSTR-2B portal structure
  if (colMap.gstin === undefined) colMap.gstin = 0;
  if (colMap.supplierName === undefined) colMap.supplierName = 1;
  if (colMap.invoiceNo === undefined) colMap.invoiceNo = 2;
  if (colMap.invoiceType === undefined) colMap.invoiceType = 3;
  if (colMap.invoiceDate === undefined) colMap.invoiceDate = 4;
  if (colMap.invoiceValue === undefined) colMap.invoiceValue = 5;
  if (colMap.taxableValue === undefined) colMap.taxableValue = 8;
  if (colMap.igst === undefined) colMap.igst = 9;
  if (colMap.cgst === undefined) colMap.cgst = 10;
  if (colMap.sgst === undefined) colMap.sgst = 11;
  if (colMap.cess === undefined) colMap.cess = 12;
  if (colMap.filingPeriod === undefined) colMap.filingPeriod = 13;
  if (colMap.itcAvailable === undefined) colMap.itcAvailable = 15;

  // Determine where data starts (after the last header row)
  const dataStartRow =
    headerRow2.length > 0 &&
    headerRow2.some(
      (c) =>
        String(c ?? "")
          .trim()
          .toLowerCase()
          .includes("invoice") ||
        String(c ?? "")
          .trim()
          .toLowerCase()
          .includes("tax")
    )
      ? headerRowIndex + 2
      : headerRowIndex + 1;

  const results: Gstr2bInvoice[] = [];

  for (let i = dataStartRow; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;

    const gstin = normalizeGstin(String(row[colMap.gstin] ?? ""));
    // Skip rows without valid GSTIN (15 chars for Indian GSTIN)
    if (!gstin || gstin.length < 15) continue;

    // Skip rows that look like headers or summary
    const firstCell = String(row[0] ?? "")
      .trim()
      .toLowerCase();
    if (firstCell.includes("total") || firstCell.includes("summary")) continue;

    const invoiceNo = String(row[colMap.invoiceNo] ?? "").trim();
    if (!invoiceNo) continue;

    results.push({
      gstin,
      supplierName: String(row[colMap.supplierName] ?? "").trim(),
      invoiceNo,
      invoiceType: String(row[colMap.invoiceType] ?? "").trim(),
      invoiceDate: normalizeDate(row[colMap.invoiceDate] ?? ""),
      invoiceValue: parseNumeric(row[colMap.invoiceValue]),
      taxableValue: parseNumeric(row[colMap.taxableValue]),
      igst: parseNumeric(row[colMap.igst]),
      cgst: parseNumeric(row[colMap.cgst]),
      sgst: parseNumeric(row[colMap.sgst]),
      cess: parseNumeric(row[colMap.cess]),
      itcAvailable: String(row[colMap.itcAvailable] ?? "").trim(),
      filingPeriod: String(row[colMap.filingPeriod] ?? "").trim(),
    });
  }

  return results;
}

// ===== RECONCILIATION ENGINE =====

/** Tolerance in rupees for amount matching (handles rounding differences). */
const AMOUNT_TOLERANCE = 1;

function amountsMatch(a: number, b: number): boolean {
  return Math.abs(a - b) <= AMOUNT_TOLERANCE;
}

/**
 * Reconcile Tally purchases against GSTR-2B invoices.
 * Returns detailed results and a summary.
 */
export function reconcile(
  tally: TallyPurchase[],
  gstr2b: Gstr2bInvoice[]
): { results: ReconciliationResult[]; summary: ReconciliationSummary } {
  // Build keyed maps
  const tallyMap = new Map<string, TallyPurchase>();
  for (const entry of tally) {
    const key = makeKey(entry.gstin, entry.invoiceNo);
    // If duplicate key, keep the first occurrence
    if (!tallyMap.has(key)) {
      tallyMap.set(key, entry);
    }
  }

  const gstr2bMap = new Map<string, Gstr2bInvoice>();
  for (const entry of gstr2b) {
    const key = makeKey(entry.gstin, entry.invoiceNo);
    if (!gstr2bMap.has(key)) {
      gstr2bMap.set(key, entry);
    }
  }

  const results: ReconciliationResult[] = [];
  const matchedTallyKeys = new Set<string>();

  let matchedCount = 0;
  let mismatchedCount = 0;
  let missingInBooksCount = 0;
  let missingIn2bCount = 0;
  let matchedTaxableTotal = 0;
  let itcAtRisk = 0;

  // Iterate GSTR-2B entries and try to match against Tally
  for (const [key, g2b] of gstr2bMap) {
    const tallyEntry = tallyMap.get(key);

    if (tallyEntry) {
      matchedTallyKeys.add(key);

      // Compare amounts and find discrepancies
      const discrepancies: Discrepancy[] = [];

      if (!amountsMatch(tallyEntry.taxableValue, g2b.taxableValue)) {
        discrepancies.push({
          field: "Taxable Value",
          tallyValue: tallyEntry.taxableValue,
          gstr2bValue: g2b.taxableValue,
        });
      }

      if (!amountsMatch(tallyEntry.igst, g2b.igst)) {
        discrepancies.push({
          field: "IGST",
          tallyValue: tallyEntry.igst,
          gstr2bValue: g2b.igst,
        });
      }

      if (!amountsMatch(tallyEntry.cgst, g2b.cgst)) {
        discrepancies.push({
          field: "CGST",
          tallyValue: tallyEntry.cgst,
          gstr2bValue: g2b.cgst,
        });
      }

      if (!amountsMatch(tallyEntry.sgst, g2b.sgst)) {
        discrepancies.push({
          field: "SGST",
          tallyValue: tallyEntry.sgst,
          gstr2bValue: g2b.sgst,
        });
      }

      // Check invoice date mismatch
      if (
        tallyEntry.invoiceDate &&
        g2b.invoiceDate &&
        tallyEntry.invoiceDate !== g2b.invoiceDate
      ) {
        discrepancies.push({
          field: "Invoice Date",
          tallyValue: tallyEntry.invoiceDate,
          gstr2bValue: g2b.invoiceDate,
        });
      }

      const status: MatchStatus =
        discrepancies.length === 0 ? "matched" : "mismatched";

      if (status === "matched") {
        matchedCount++;
        matchedTaxableTotal += g2b.taxableValue;
      } else {
        mismatchedCount++;
      }

      results.push({
        status,
        tally: tallyEntry,
        gstr2b: g2b,
        discrepancies,
      });
    } else {
      // Present in GSTR-2B but not in Tally books
      missingInBooksCount++;
      results.push({
        status: "missing_in_books",
        gstr2b: g2b,
        discrepancies: [],
      });
    }
  }

  // Find Tally entries not matched against any GSTR-2B entry
  for (const [key, tallyEntry] of tallyMap) {
    if (!matchedTallyKeys.has(key)) {
      missingIn2bCount++;
      itcAtRisk += tallyEntry.totalTax;
      results.push({
        status: "missing_in_2b",
        tally: tallyEntry,
        discrepancies: [],
      });
    }
  }

  // Calculate totals
  const tallyTaxableTotal = tally.reduce(
    (sum, t) => sum + t.taxableValue,
    0
  );
  const gstr2bTaxableTotal = gstr2b.reduce(
    (sum, g) => sum + g.taxableValue,
    0
  );

  const summary: ReconciliationSummary = {
    totalTally: tally.length,
    totalGstr2b: gstr2b.length,
    matched: matchedCount,
    mismatched: mismatchedCount,
    missingIn2b: missingIn2bCount,
    missingInBooks: missingInBooksCount,
    tallyTaxableTotal: Math.round(tallyTaxableTotal * 100) / 100,
    gstr2bTaxableTotal: Math.round(gstr2bTaxableTotal * 100) / 100,
    matchedTaxableTotal: Math.round(matchedTaxableTotal * 100) / 100,
    itcAtRisk: Math.round(itcAtRisk * 100) / 100,
  };

  return { results, summary };
}

// ===== EXCEL EXPORT =====

function formatCurrency(val: number): string {
  return val.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Export reconciliation results to an Excel workbook as an ArrayBuffer.
 * Creates 5 sheets: Summary, Matched, Mismatched, Missing in GSTR-2B, Missing in Books.
 */
export function exportToExcel(
  results: ReconciliationResult[],
  summary: ReconciliationSummary
): ArrayBuffer {
  const wb = XLSX.utils.book_new();

  // ----- Sheet 1: Summary -----
  const summaryData = [
    ["GST 2B Reconciliation Summary"],
    [],
    ["Metric", "Count / Amount"],
    ["Total Tally Invoices", summary.totalTally],
    ["Total GSTR-2B Invoices", summary.totalGstr2b],
    [],
    ["Matched", summary.matched],
    ["Mismatched", summary.mismatched],
    ["Missing in GSTR-2B", summary.missingIn2b],
    ["Missing in Books", summary.missingInBooks],
    [],
    ["Tally Taxable Total", summary.tallyTaxableTotal],
    ["GSTR-2B Taxable Total", summary.gstr2bTaxableTotal],
    ["Matched Taxable Total", summary.matchedTaxableTotal],
    [],
    ["ITC at Risk (Missing in 2B)", summary.itcAtRisk],
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  // Set column widths
  summarySheet["!cols"] = [{ wch: 30 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, summarySheet, "Summary");

  // ----- Sheet 2: Matched -----
  const matchedResults = results.filter((r) => r.status === "matched");
  const matchedHeaders = [
    "GSTIN",
    "Supplier",
    "Invoice No",
    "Invoice Date (Tally)",
    "Invoice Date (2B)",
    "Taxable Value (Tally)",
    "Taxable Value (2B)",
    "SGST (Tally)",
    "SGST (2B)",
    "CGST (Tally)",
    "CGST (2B)",
    "IGST (Tally)",
    "IGST (2B)",
    "Gross Total (Tally)",
    "Invoice Value (2B)",
  ];
  const matchedRows = matchedResults.map((r) => [
    r.tally?.gstin ?? r.gstr2b?.gstin ?? "",
    r.tally?.supplier ?? r.gstr2b?.supplierName ?? "",
    r.tally?.invoiceNo ?? r.gstr2b?.invoiceNo ?? "",
    r.tally?.invoiceDate ?? "",
    r.gstr2b?.invoiceDate ?? "",
    r.tally?.taxableValue ?? 0,
    r.gstr2b?.taxableValue ?? 0,
    r.tally?.sgst ?? 0,
    r.gstr2b?.sgst ?? 0,
    r.tally?.cgst ?? 0,
    r.gstr2b?.cgst ?? 0,
    r.tally?.igst ?? 0,
    r.gstr2b?.igst ?? 0,
    r.tally?.grossTotal ?? 0,
    r.gstr2b?.invoiceValue ?? 0,
  ]);
  const matchedSheet = XLSX.utils.aoa_to_sheet([matchedHeaders, ...matchedRows]);
  matchedSheet["!cols"] = matchedHeaders.map(() => ({ wch: 18 }));
  XLSX.utils.book_append_sheet(wb, matchedSheet, "Matched");

  // ----- Sheet 3: Mismatched -----
  const mismatchedResults = results.filter((r) => r.status === "mismatched");
  const mismatchedHeaders = [
    "GSTIN",
    "Supplier",
    "Invoice No",
    "Discrepancy Fields",
    "Taxable Value (Tally)",
    "Taxable Value (2B)",
    "Taxable Diff",
    "SGST (Tally)",
    "SGST (2B)",
    "CGST (Tally)",
    "CGST (2B)",
    "IGST (Tally)",
    "IGST (2B)",
    "Invoice Date (Tally)",
    "Invoice Date (2B)",
  ];
  const mismatchedRows = mismatchedResults.map((r) => {
    const discFields = r.discrepancies.map((d) => d.field).join(", ");
    const tallyTax = r.tally?.taxableValue ?? 0;
    const g2bTax = r.gstr2b?.taxableValue ?? 0;
    return [
      r.tally?.gstin ?? r.gstr2b?.gstin ?? "",
      r.tally?.supplier ?? r.gstr2b?.supplierName ?? "",
      r.tally?.invoiceNo ?? r.gstr2b?.invoiceNo ?? "",
      discFields,
      tallyTax,
      g2bTax,
      Math.round((tallyTax - g2bTax) * 100) / 100,
      r.tally?.sgst ?? 0,
      r.gstr2b?.sgst ?? 0,
      r.tally?.cgst ?? 0,
      r.gstr2b?.cgst ?? 0,
      r.tally?.igst ?? 0,
      r.gstr2b?.igst ?? 0,
      r.tally?.invoiceDate ?? "",
      r.gstr2b?.invoiceDate ?? "",
    ];
  });
  const mismatchedSheet = XLSX.utils.aoa_to_sheet([
    mismatchedHeaders,
    ...mismatchedRows,
  ]);
  mismatchedSheet["!cols"] = mismatchedHeaders.map(() => ({ wch: 18 }));
  XLSX.utils.book_append_sheet(wb, mismatchedSheet, "Mismatched");

  // ----- Sheet 4: Missing in GSTR-2B (ITC at risk) -----
  const missingIn2bResults = results.filter(
    (r) => r.status === "missing_in_2b"
  );
  const missing2bHeaders = [
    "GSTIN",
    "Supplier",
    "Invoice No",
    "Invoice Date",
    "Taxable Value",
    "SGST",
    "CGST",
    "IGST",
    "Total Tax (ITC at Risk)",
    "Gross Total",
  ];
  const missing2bRows = missingIn2bResults.map((r) => [
    r.tally?.gstin ?? "",
    r.tally?.supplier ?? "",
    r.tally?.invoiceNo ?? "",
    r.tally?.invoiceDate ?? "",
    r.tally?.taxableValue ?? 0,
    r.tally?.sgst ?? 0,
    r.tally?.cgst ?? 0,
    r.tally?.igst ?? 0,
    r.tally?.totalTax ?? 0,
    r.tally?.grossTotal ?? 0,
  ]);
  const missing2bSheet = XLSX.utils.aoa_to_sheet([
    missing2bHeaders,
    ...missing2bRows,
  ]);
  missing2bSheet["!cols"] = missing2bHeaders.map(() => ({ wch: 20 }));
  XLSX.utils.book_append_sheet(wb, missing2bSheet, "Missing in GSTR-2B");

  // ----- Sheet 5: Missing in Books -----
  const missingInBooksResults = results.filter(
    (r) => r.status === "missing_in_books"
  );
  const missingBooksHeaders = [
    "GSTIN",
    "Supplier Name",
    "Invoice No",
    "Invoice Type",
    "Invoice Date",
    "Invoice Value",
    "Taxable Value",
    "IGST",
    "CGST",
    "SGST",
    "Cess",
    "ITC Available",
    "Filing Period",
  ];
  const missingBooksRows = missingInBooksResults.map((r) => [
    r.gstr2b?.gstin ?? "",
    r.gstr2b?.supplierName ?? "",
    r.gstr2b?.invoiceNo ?? "",
    r.gstr2b?.invoiceType ?? "",
    r.gstr2b?.invoiceDate ?? "",
    r.gstr2b?.invoiceValue ?? 0,
    r.gstr2b?.taxableValue ?? 0,
    r.gstr2b?.igst ?? 0,
    r.gstr2b?.cgst ?? 0,
    r.gstr2b?.sgst ?? 0,
    r.gstr2b?.cess ?? 0,
    r.gstr2b?.itcAvailable ?? "",
    r.gstr2b?.filingPeriod ?? "",
  ]);
  const missingBooksSheet = XLSX.utils.aoa_to_sheet([
    missingBooksHeaders,
    ...missingBooksRows,
  ]);
  missingBooksSheet["!cols"] = missingBooksHeaders.map(() => ({ wch: 18 }));
  XLSX.utils.book_append_sheet(wb, missingBooksSheet, "Missing in Books");

  // Write to ArrayBuffer
  const wbOut = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  }) as ArrayBuffer;

  return wbOut;
}
