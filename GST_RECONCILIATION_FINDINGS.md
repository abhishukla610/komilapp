# GST 2B Reconciliation Tool — Findings & Future Planning

**Date:** 2026-04-05
**Status:** V1 shipped and deployed

---

## What Was Built

### Tool: GST 2B Reconciliation (`/tools/gst-reconciliation`)
A browser-based tool that reconciles Tally Purchase Register exports with GSTR-2B Portal downloads. 100% client-side — no data ever leaves the browser.

### Architecture
- **Excel Parsing:** SheetJS (`xlsx`) — reads both Tally and GSTR-2B Excel formats
- **Matching Engine:** Pure JS Map-based matching on `GSTIN|InvoiceNo` key
- **Amount Tolerance:** ±₹1 for rounding differences
- **Export:** Multi-sheet Excel report (Summary, Matched, Mismatched, Missing in 2B, Missing in Books)

---

## Data Format Findings

### Tally Purchase Register Format
- **Header rows:** 6 rows of company info before column headers
- **Header detection:** Scan for row containing "GSTIN/UIN"
- **Amount quirks:** Values have " Dr"/" Cr" suffix (e.g., "2350.00 Dr")
- **GSTIN format:** 15 chars, standard format (e.g., 24AIYPG7399E1ZM)
- **Invoice numbers:** Supplier Invoice No. column — varies widely (numeric: "294", alphanumeric: "MPPL/25-26/3727", CRN-prefixed: "CRN1781443928")
- **Tax columns:** Separate columns for SGST, CGST (intrastate) and IGST (interstate)
- **Grand Total row:** Last row with aggregated totals — must be skipped

### GSTR-2B Portal Format
- **Multi-sheet workbook:** 26 sheets (Read me, ITC Available, ITC not available, ITC Reversal, ITC Rejected, B2B, B2BA, B2B-CDNR, B2B-CDNRA, ECO, ECOA, ISD, ISDA, IMPG, IMPGA, IMPGSEZ, IMPGSEZA, various Reversal/Rejected sheets)
- **Primary data sheet:** "B2B" — taxable inward supplies from registered persons
- **Dual header rows:** Row 5 = main headers (with merged cells), Row 6 = sub-headers
- **Column mapping (B2B):**
  - Col 0: GSTIN of supplier
  - Col 1: Trade/Legal name
  - Col 2: Invoice number
  - Col 3: Invoice type (Regular, SEZWP, SEZWOP, DE, CBW)
  - Col 4: Invoice Date (DD/MM/YYYY)
  - Col 5: Invoice Value (₹)
  - Col 6: Place of supply
  - Col 7: Reverse Charge (Y/N)
  - Col 8: Taxable Value (₹)
  - Col 9: Integrated Tax (₹)
  - Col 10: Central Tax (₹)
  - Col 11: State/UT Tax (₹)
  - Col 12: Cess (₹)
  - Col 13: Filing Period
  - Col 14: Filing Date
  - Col 15: ITC Availability (Yes/No)
- **Additional data in other sheets:** Credit/debit notes (B2B-CDNR), amendments (B2BA), imports (IMPG), ISD credits, ECO documents

### Matching Challenges Discovered
1. **Invoice number formatting:** Tally may store "3727" while 2B has "MPPL/25-26/3727" — fuzzy matching needed
2. **GSTIN casing:** Usually uppercase but whitespace varies
3. **Rounding differences:** Tally may have ₹3333.33 while 2B has ₹3333 — need tolerance
4. **Date format mismatch:** Tally uses DD-Mon-YY (02-Feb-26), 2B uses DD/MM/YYYY (03/02/2026)
5. **Reverse charge entries:** Porter, Smartshift in 2B have `Reverse Charge = Yes` — these may not appear in Tally purchase register as standard purchases
6. **Multiple invoices same supplier:** Need to handle duplicate GSTIN correctly (match individual invoices, not supplier-level)

---

## Edge Cases Identified

| Edge Case | How Handled | Future Improvement |
|-----------|-------------|-------------------|
| Empty Tally file (no GSTIN header) | Returns empty array, shows 0 results | Show specific error: "Invalid Tally file format" |
| Empty GSTR-2B (no B2B sheet) | Returns empty array | Show error: "B2B sheet not found" |
| Duplicate invoices (same GSTIN + invoice) | First occurrence kept | Show warning for duplicates |
| Reverse charge entries in 2B | Included in matching | Option to exclude RCM entries |
| Credit/debit notes (B2B-CDNR sheet) | NOT parsed in V1 | Parse and include in reconciliation |
| Amended invoices (B2BA sheet) | NOT parsed in V1 | Include amendments |
| Very large files (1000+ invoices) | Pure JS handles it | DuckDB-WASM for 10K+ if needed |
| Non-Excel file uploaded | Rejected by file type filter | Show specific error message |
| Password-protected Excel | xlsx library can't read | Show "remove password" message |

---

## Future Planning: Dynamic Data Sheet

### Phase 2 Features (Next Sprint)

1. **Credit/Debit Note Reconciliation**
   - Parse B2B-CDNR sheet from GSTR-2B
   - Match against Tally debit/credit note entries
   - Separate section in results

2. **Amendment Handling**
   - Parse B2BA sheet for amended invoices
   - Show original vs amended values
   - Flag invoices that were amended after initial match

3. **Multi-Month Reconciliation**
   - Allow uploading multiple months of data
   - Carry forward unmatched entries
   - Track resolution over time

4. **Fuzzy Invoice Matching**
   - Levenshtein distance for invoice numbers
   - "Potential matches" category for near-matches
   - User can manually confirm/reject

5. **Supplier-Wise Summary**
   - Aggregate results by supplier GSTIN
   - Show total ITC at risk per supplier
   - "Contact supplier" action items

### Phase 3 Features (Roadmap)

6. **DuckDB-WASM Integration**
   - For datasets > 500 invoices
   - SQL-based matching with FULL OUTER JOIN
   - Performance benchmark vs pure JS

7. **PDF Report Generation**
   - Professional reconciliation report in PDF
   - Company letterhead template
   - Summary + detailed sections

8. **Tally Integration API**
   - Direct connection to Tally Prime via Tally Developer APIs
   - Auto-fetch purchase register without manual export
   - Requires Tally running on local network

9. **GST Portal API**
   - Direct GSTR-2B fetch via GST portal APIs
   - Requires user authentication (GST credentials)
   - Eliminates manual download step

10. **Saved Reconciliations**
    - Store results in IndexedDB (still client-side)
    - History of past reconciliations
    - Track resolution of discrepancies

11. **Collaborative Mode**
    - Accountant shares reconciliation link with client
    - Client reviews and responds to action items
    - Requires backend (Supabase?)

---

## Demo Test Data Created

| File | Location | Purpose |
|------|----------|---------|
| `demo-tally-purchase.xlsx` | `/public/demo/` | 6 entries: 2 matched, 1 mismatch, 1 missing in 2B, 1 IGST match, 1 rounding match |
| `demo-gstr2b-portal.xlsx` | `/public/demo/` | 7 entries matching above + 2 missing in books |
| `edge-empty-tally.xlsx` | `/public/demo/` | Empty Tally file (no data) |
| `edge-empty-gstr2b.xlsx` | `/public/demo/` | Empty GSTR-2B (headers only) |
| Client's actual files | `/Tally Purchase.xlsx`, `/GST 2B Portal.xlsx` | Real data from Shree Hari Enterprise, Feb 2026 |

### Expected Results with Demo Data:
- **Matched:** 3 (INV-001, INV-005, INV-006 with rounding)
- **Mismatched:** 1 (INV-003 — taxable value differs: 15000 vs 15100)
- **Missing in GSTR-2B:** 1 (INV-004 — supplier LMN Supplies hasn't filed)
- **Missing in Books:** 2 (INV-999, INV-888 — not recorded in Tally)
- **ITC at Risk:** Tax on INV-004 (₹1,440) + tax on INV-003 mismatch

---

## SEO Keywords Targeted

| Keyword | Volume | Competition |
|---------|--------|-------------|
| GST 2B reconciliation | Medium | Low (no accountant sites offer this free) |
| GSTR 2B reconciliation tool online | Medium | Very Low |
| GST ITC reconciliation | Medium | Medium |
| Tally purchase register vs GSTR 2B | Low | Very Low |
| GSTR 2B matching tool free | Low | Very Low |
| GST data discrepancy checker | Low | None |

**Competitive advantage:** No individual accountant or CA firm website in India offers a free browser-based reconciliation tool. This is a first-of-kind differentiator.

---

## Technical Debt / Known Limitations

1. `xlsx` package adds ~300KB to client bundle — consider dynamic import
2. No Web Worker for processing — large files may block UI thread
3. No progress indicator during parsing (instant for small files, may hang for large)
4. Invoice number matching is exact after normalization — no fuzzy matching yet
5. Only B2B sheet is parsed — CDN, amendments, imports are ignored
6. No validation of GSTIN checksum digit
7. Date parsing assumes consistent format — mixed formats may fail
