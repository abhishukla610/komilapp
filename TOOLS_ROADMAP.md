# Komilapp — Free Tools Roadmap & Strategy

**Date:** 2026-04-05
**Status:** GST Calculator + Income Tax Calculator shipped. This doc covers everything else we can build.

---

## Current Tools (Shipped)

| Tool | Route | Status |
|------|-------|--------|
| GST Calculator | `/tools/gst-calculator` | Live |
| Income Tax Calculator | `/tools/income-tax-calculator` | Live |

---

## Tier 1 — Huge Traffic Tools (50K-500K monthly searches India)

| Tool | Target Keywords | Monthly Searches | Effort | Notes |
|------|----------------|-----------------|--------|-------|
| **EMI Calculator** | "emi calculator", "loan calculator", "home loan emi" | 500K+ | Medium | Loan amount, interest rate, tenure, amortization schedule table |
| **SIP Calculator** | "sip calculator", "mutual fund calculator", "sip return calculator" | 200K+ | Medium | Monthly investment, expected return %, years, future value with chart |
| **FD Calculator** | "fd calculator", "fixed deposit calculator", "fd interest calculator" | 80K+ | Easy | Principal, rate, tenure, quarterly/annual compounding |
| **HRA Calculator** | "hra calculator", "hra exemption calculator", "hra tax exemption" | 50K+ | Medium | Basic salary, HRA received, rent paid, metro/non-metro toggle. Directly converts to ITR filing clients. |
| **TDS Calculator** | "tds calculator", "tds rate calculator", "tds on salary" | 30K+ | Medium | Income type select, amount, section-wise TDS rates (194A, 194C, 194J, etc.) |
| **Gratuity Calculator** | "gratuity calculator", "gratuity calculation formula" | 40K+ | Easy | Last drawn salary, years of service. Formula: (15 × salary × years) / 26 |

---

## Tier 2 — Solid Traffic Tools (10K-50K monthly searches)

| Tool | Target Keywords | Monthly Searches | Effort | Notes |
|------|----------------|-----------------|--------|-------|
| **PPF Calculator** | "ppf calculator", "ppf maturity calculator" | 30K+ | Easy | Yearly deposit (max ₹1.5L), 15-year lock-in, current rate 7.1%, partial withdrawal rules |
| **NPS Calculator** | "nps calculator", "national pension scheme calculator" | 20K+ | Medium | Monthly contribution, expected return, retirement age, annuity %, lump sum vs pension split |
| **Salary Calculator** | "in hand salary calculator", "ctc to take home", "salary breakup calculator" | 40K+ | High | CTC → Basic, HRA, Special Allowance, PF (employee + employer), Professional Tax, Income Tax, In-Hand. Most complex but highest conversion. |
| **GST Due Date Calendar** | "gst due date", "gst filing last date", "gstr-3b due date" | 20K+ | Easy | Visual monthly calendar with all GSTR-1, GSTR-3B, GSTR-9 deadlines. Color-coded. Auto-updates by month. |
| **Invoice Generator** | "free invoice generator india", "gst invoice generator", "invoice maker" | 15K+ | High | Generate PDF invoices with GST details, company info, items, HSN codes, CGST/SGST/IGST. Download as PDF. Major lead magnet. |
| **Age Calculator** | "age calculator", "age calculator online" | 50K+ | Easy | DOB input → exact years, months, days. Surprisingly high search volume. Quick build, good for domain authority. |

---

## Tier 3 — Niche but High-Conversion Tools

| Tool | Target Keywords | Why It Converts |
|------|----------------|----------------|
| **ITR Due Date Tracker** | "itr last date", "itr filing deadline" | Shows which ITR form needed + deadline → "File with us" CTA |
| **Old vs New Regime Quick Compare** | "old vs new tax regime" | Standalone simplified version of tax calc → "Confused? Book consultation" |
| **Business Registration Checker** | "which registration do I need", "gst registration required" | Quiz: turnover, type, state → tells you GST/MSME/Shop Act requirements → "We'll handle it" |
| **Late Filing Penalty Calculator** | "gst late fee calculator", "itr penalty calculator" | Calculate penalty for late GST/ITR filing → "Avoid penalties, hire us" |
| **Rent Receipt Generator** | "rent receipt generator", "rent receipt format pdf" | Free PDF rent receipts for HRA claims → "Need help with ITR? Contact us" |

---

## Utility Tools (Beyond Calculators)

| Tool | Description | Traffic Potential |
|------|-------------|------------------|
| **PAN Validator** | Check if PAN format is valid. Decode: 4th char = holder type (P=Person, C=Company), 5th = first letter of surname | 10K+ |
| **IFSC Code Lookup** | Search bank IFSC codes (use RBI open data). Input bank name/branch → get IFSC, MICR, address | 30K+ |
| **GST Number Validator** | Validate 15-digit GSTIN format. Decode: first 2 = state code, next 10 = PAN, 13th = entity number | 15K+ |
| **HSN/SAC Code Finder** | Search HSN codes for goods / SAC codes for services → shows applicable GST rate | 20K+ |
| **Document Checklist Generator** | Select a service (GST registration, ITR filing, etc.) → auto-generated checklist of required documents. Printable. | Low search but high conversion |

---

## Interactive / Engagement Features

| Feature | Description | Value |
|---------|-------------|-------|
| **Tax Savings Quiz** | 5 questions about income, deductions, regime → personalized savings estimate → "Book consultation to save ₹X" | Lead generation |
| **Financial Health Scorecard** | Input income, expenses, savings, debt → health score (0-100) + recommendations → CTA | Engagement + lead gen |
| **Deadline Reminder Signup** | Email/WhatsApp reminders before GST/ITR deadlines. Collect phone + email → drip campaign. | Lead nurturing |
| **Cost Comparison Calculator** | "DIY vs Hire an Accountant" — input time spent, hourly value, risk of errors → cost comparison → "Hire us and save time" | Conversion tool |
| **Tax Savings Opportunity Finder** | Questionnaire: salaried/business, HRA claimed?, 80C maxed?, health insurance? → shows unclaimed deductions → CTA | High conversion |

---

## Build Priority (Recommended Order)

### Wave 1 — Quick Wins (1-2 hours each, highest ROI)
1. EMI Calculator (500K+ searches)
2. SIP Calculator (200K+ searches)
3. HRA Calculator (50K+ searches, converts to ITR clients)
4. Gratuity Calculator (40K+ searches, easy build)
5. GST Due Date Calendar (20K+ searches, recurring visits)

### Wave 2 — Medium Effort, High Value
6. FD Calculator
7. PPF Calculator
8. TDS Calculator
9. Age Calculator
10. PAN Validator + GSTIN Validator (combine as "Verification Tools")

### Wave 3 — High Effort, Killer Features
11. Salary Calculator (CTC to In-Hand) — most complex but highest value
12. Invoice Generator — PDF generation, biggest lead magnet
13. Rent Receipt Generator
14. NPS Calculator

### Wave 4 — Engagement & Conversion
15. Tax Savings Quiz
16. Document Checklist Generator
17. Deadline Reminder Signup
18. Financial Health Scorecard
19. Cost Comparison Calculator

---

## Technical Notes

### Shared Architecture
All tools follow the same pattern:
- `app/tools/[tool-name]/page.tsx` — SEO metadata + CalculatorLayout wrapper
- `components/tools/[tool-name].tsx` — "use client" interactive component
- Educational content (500+ words) for SEO
- 5 FAQ questions with FaqJsonLd schema
- CTA: "Need professional help? Book a consultation"
- Indian number formatting (₹X,XX,XXX) via `formatINR()` in `lib/utils.ts`

### SEO Per Tool
- Unique title + description targeting primary keywords
- JSON-LD: FAQPage schema
- Breadcrumbs with BreadcrumbJsonLd
- 500+ words educational content (how it works, formulas, tips)
- Internal links to related services + other tools

### Data Sources
- Tax slabs: `lib/tax-data.ts` (update annually)
- GST rates/HSN codes: static JSON or API
- IFSC codes: RBI open data API
- Due dates: static calendar data (update quarterly)

### PDF Generation (for Invoice/Receipt generators)
- Option A: `@react-pdf/renderer` — React components → PDF
- Option B: `jspdf` + `html2canvas` — HTML → PDF
- Option C: Server-side with Puppeteer (heavier but more control)
- Recommendation: `@react-pdf/renderer` for client-side, no server cost

---

## Traffic Projection

If all Tier 1 + Tier 2 tools are built:

| Source | Monthly Organic Visits (estimated) |
|--------|-----------------------------------|
| EMI Calculator | 5,000 - 15,000 |
| SIP Calculator | 3,000 - 10,000 |
| Income Tax Calculator | 2,000 - 8,000 |
| GST Calculator | 1,000 - 5,000 |
| HRA Calculator | 1,000 - 3,000 |
| Salary Calculator | 2,000 - 8,000 |
| Other tools combined | 3,000 - 10,000 |
| Blog articles (growing) | 1,000 - 5,000 |
| **Total** | **18,000 - 64,000/month** |

At 2-3% conversion to lead = **360 - 1,920 leads/month** from organic traffic alone.

---

## Competitive Advantage

Most CA/accountant websites in India have:
- Zero free tools
- No calculators
- Basic WordPress sites
- No structured data
- Terrible mobile experience

Komilapp with 15+ free tools + proper SEO would be **the most feature-rich accountant website in Ahmedabad** and likely in Gujarat. This positions Komil as a tech-forward, accessible professional — not just another CA.
