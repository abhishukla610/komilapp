import { Metadata } from "next";

import { constructMetadata } from "@/lib/seo";
import { CalculatorLayout } from "@/components/tools/calculator-layout";
import { ReconciliationTool } from "@/components/tools/reconciliation/reconciliation-tool";

export const metadata: Metadata = constructMetadata({
  title: "Free GST 2B Reconciliation Tool Online | Match Tally with GSTR-2B",
  description:
    "Free online GST 2B reconciliation tool to match your Tally purchase register with GSTR-2B portal data. Find mismatches, missing invoices, and ITC at risk instantly. GSTR 2B matching tool for Indian businesses.",
  pathname: "/tools/gst-reconciliation",
});

const faqs = [
  {
    question: "What is GSTR-2B reconciliation?",
    answer:
      "GSTR-2B reconciliation is the process of comparing your purchase records (from accounting software like Tally) with the auto-generated GSTR-2B statement available on the GST portal. GSTR-2B is a static, system-generated statement that shows the Input Tax Credit (ITC) available to a taxpayer for a given period based on the returns filed by their suppliers. Reconciliation helps you identify invoices that are missing, mismatched, or not reported by your suppliers, ensuring you claim only the eligible ITC and avoid notices from the GST department.",
  },
  {
    question: "Is my data safe with this tool?",
    answer:
      "Yes, 100% safe. This tool processes your files entirely within your web browser using client-side JavaScript. No data is uploaded to any server, and no files leave your device. Your sensitive financial data — including GSTINs, invoice numbers, supplier details, and tax amounts — stays completely private. You can verify this by checking your browser's network tab while using the tool. We believe financial data privacy is non-negotiable.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "The tool accepts Excel files in .xlsx and .xls format. For the Tally Purchase Register, export your purchase data from Tally in Excel format with columns for date, supplier name, GSTIN, invoice number, invoice date, taxable value, CGST, SGST, IGST, and total amounts. For GSTR-2B, download the B2B invoices data in Excel format from the GST portal. The tool automatically maps common column headers from both sources.",
  },
  {
    question: "How do I export the purchase register from Tally?",
    answer:
      "In Tally Prime, go to Gateway of Tally > Display More Reports > Account Books > Purchase Register. Select the desired period, then press Ctrl+E or click the Export button. Choose Excel format, select the columns you need (ensure GSTIN, invoice number, invoice date, taxable value, CGST, SGST, IGST are included), and save the file. In older Tally versions (Tally ERP 9), navigate to Display > Account Books > Purchase Register, press Alt+E to export, and choose Excel. Make sure to include all tax-related columns in your export.",
  },
  {
    question: "How do I download GSTR-2B from the GST portal?",
    answer:
      "Log in to the GST portal (gst.gov.in) with your credentials. Go to Returns > Returns Dashboard, select the financial year and filing period, then click on GSTR-2B. Navigate to the B2B Invoices section and click the 'Download' button to get the data in Excel format. You can also download the JSON file and convert it to Excel. Make sure you download the data for the correct filing period that matches your Tally purchase register period.",
  },
  {
    question: "What should I do if invoices are missing in GSTR-2B?",
    answer:
      "If invoices from your purchase register are missing in GSTR-2B, it typically means your supplier has not filed their GSTR-1 return for that period or has not included that particular invoice. You should: (1) Contact the supplier and request them to file or amend their GSTR-1, (2) Do not claim ITC on those invoices until they appear in your GSTR-2B as per Section 16(2)(aa) of the CGST Act, (3) Keep track of such invoices for follow-up, (4) Check in subsequent months as the supplier may file late returns. Our tool flags these as 'Missing in GSTR-2B' with the ITC at risk amount clearly highlighted.",
  },
  {
    question: "Can I use this tool for multiple months?",
    answer:
      "Yes, you can use this tool for any number of months. Simply run the reconciliation for each month separately by uploading the corresponding Tally purchase register and GSTR-2B download for that specific period. You can export each month's reconciliation report to Excel for your records. For best results, ensure the date ranges of both files match. Some businesses prefer to reconcile monthly, while others do it quarterly — the tool works for any period as long as both files cover the same date range.",
  },
];

function EducationalContent() {
  return (
    <>
      <h2>What is GSTR-2B Reconciliation and Why Does It Matter?</h2>
      <p>
        GSTR-2B reconciliation is one of the most critical compliance activities
        for any GST-registered business in India. GSTR-2B is an auto-generated,
        static statement available on the GST portal that provides details of
        Input Tax Credit (ITC) available to a recipient based on the GSTR-1,
        GSTR-5, and GSTR-6 filed by their suppliers for a given return period.
        Unlike GSTR-2A, which is dynamic and changes as suppliers file their
        returns, GSTR-2B is generated once per month and remains unchanged,
        making it the definitive reference for ITC claims.
      </p>
      <p>
        Reconciliation is the process of matching your purchase register — the
        record of all purchases you have made as recorded in your accounting
        software (such as Tally, Zoho Books, or Busy) — against the GSTR-2B
        data from the GST portal. The objective is to identify discrepancies
        including invoices present in your books but not in GSTR-2B, invoices in
        GSTR-2B that are not in your books, and invoices that exist in both but
        have mismatched values for taxable amount, tax components, or invoice
        details.
      </p>

      <h2>Section 16(2)(aa) of the CGST Act — Why You Cannot Ignore GSTR-2B</h2>
      <p>
        The Finance Act 2021 inserted clause (aa) in Section 16(2) of the CGST
        Act, which states that a registered person shall not be entitled to
        claim ITC unless the details of the invoice or debit note have been
        furnished by the supplier in their GSTR-1 or using the Invoice Furnishing
        Facility (IFF), and such details have been communicated to the recipient
        in GSTR-2B. This provision, effective from 1st January 2022, makes
        GSTR-2B reconciliation mandatory rather than optional. If an invoice
        does not appear in your GSTR-2B, you legally cannot claim ITC on it,
        regardless of whether you have the physical invoice and have made the
        payment. Non-compliance can lead to ITC reversals, interest liability
        under Section 50, and penalties during GST audits.
      </p>

      <h2>Common Discrepancies Found During Reconciliation</h2>
      <p>
        Through our experience handling GST compliance for hundreds of
        businesses, we have observed several recurring types of discrepancies
        during GSTR-2B reconciliation:
      </p>
      <ul>
        <li>
          <strong>Invoice number mismatches:</strong> Different formats used in
          books versus the supplier&apos;s GSTR-1 filing (e.g., INV-001 vs
          INV/001 or leading zeros being dropped).
        </li>
        <li>
          <strong>Date discrepancies:</strong> The invoice date in your books
          differs from what the supplier has reported, often due to data entry
          errors or differences in recording date versus actual invoice date.
        </li>
        <li>
          <strong>Taxable value differences:</strong> Rounding differences,
          inclusion or exclusion of freight or discount, or incorrect tax
          calculations can cause value mismatches.
        </li>
        <li>
          <strong>GSTIN errors:</strong> Supplier filing under a different GSTIN
          (branch vs head office) or typographical errors in the GSTIN.
        </li>
        <li>
          <strong>Missing invoices:</strong> Supplier has not filed their GSTR-1
          for the period, or the invoice was filed in a different tax period.
        </li>
        <li>
          <strong>Duplicate entries:</strong> Same invoice appearing multiple
          times in the purchase register or in GSTR-2B due to amendments.
        </li>
      </ul>

      <h2>How to Export Purchase Register from Tally</h2>
      <p>
        Follow these steps to export your purchase register from Tally Prime for
        reconciliation:
      </p>
      <ol>
        <li>
          Open Tally Prime and load your company data for the relevant financial
          year.
        </li>
        <li>
          Navigate to <strong>Gateway of Tally &gt; Display More Reports &gt;
          Account Books &gt; Purchase Register</strong>.
        </li>
        <li>
          Set the date range to match the GSTR-2B period you want to reconcile
          (e.g., 1st April to 30th April for the April filing period).
        </li>
        <li>
          Press <strong>Ctrl+E</strong> or click the <strong>Export</strong> button
          in the top toolbar.
        </li>
        <li>
          Select <strong>Excel (Spreadsheet)</strong> as the export format.
        </li>
        <li>
          Ensure the export includes the following columns: Date, Supplier Name
          or Party Name, GSTIN/UIN, Voucher Number, Invoice Number, Invoice
          Date, Taxable Value, CGST Amount, SGST Amount, IGST Amount, Total Tax,
          and Gross Total.
        </li>
        <li>
          Choose a file location and save. The resulting .xlsx file is ready for
          upload to this reconciliation tool.
        </li>
      </ol>

      <h2>How to Download GSTR-2B from the GST Portal</h2>
      <p>
        Follow these steps to download your GSTR-2B data from the Government GST
        portal:
      </p>
      <ol>
        <li>
          Visit <strong>gst.gov.in</strong> and log in with your GSTIN username
          and password.
        </li>
        <li>
          Navigate to <strong>Returns &gt; Returns Dashboard</strong>.
        </li>
        <li>
          Select the <strong>Financial Year</strong> and <strong>Return Filing
          Period</strong> (month) for which you want to download the data.
        </li>
        <li>
          Click on <strong>GSTR-2B</strong> tile. If the statement is generated,
          you will see a summary page.
        </li>
        <li>
          Go to the <strong>B2B Invoices</strong> section — this contains all the
          invoices reported by your suppliers.
        </li>
        <li>
          Click the <strong>Download</strong> button and select Excel format. The
          file will be downloaded as a .xlsx file containing supplier GSTIN,
          invoice details, taxable value, and tax breakup.
        </li>
        <li>
          Upload this downloaded file to the GSTR-2B upload zone in our
          reconciliation tool.
        </li>
      </ol>

      <h2>Tips for Clean and Accurate Reconciliation</h2>
      <p>
        To get the most accurate results from your reconciliation process,
        follow these best practices:
      </p>
      <ul>
        <li>
          <strong>Match the period:</strong> Ensure both the Tally export and
          GSTR-2B download cover the exact same tax period. Mismatched periods
          will lead to false &ldquo;missing&rdquo; results.
        </li>
        <li>
          <strong>Standardize invoice numbers:</strong> Work with your suppliers
          to use consistent invoice number formats. Remove special characters,
          leading zeros, and spaces that may cause matching failures.
        </li>
        <li>
          <strong>Reconcile monthly:</strong> Do not wait until the annual return
          to reconcile. Monthly reconciliation helps you catch issues early and
          gives suppliers time to amend their returns.
        </li>
        <li>
          <strong>Follow up promptly:</strong> For invoices missing in GSTR-2B,
          contact suppliers immediately. Under Rule 36(4), your ITC claim is
          directly linked to what appears in GSTR-2B.
        </li>
        <li>
          <strong>Maintain records:</strong> Export and save each month&apos;s
          reconciliation report. These records are invaluable during GST audits
          and assessments.
        </li>
        <li>
          <strong>Check for amendments:</strong> Suppliers may amend invoices in
          subsequent periods. Always check if previously missing invoices have
          appeared in the latest GSTR-2B.
        </li>
      </ul>
    </>
  );
}

export default function GstReconciliationPage() {
  return (
    <CalculatorLayout
      title="GST 2B"
      titleAccent="Reconciliation"
      description="Match your Tally purchase register with GSTR-2B portal data. Instantly find mismatches, missing invoices, and ITC at risk — 100% free and private."
      breadcrumbLabel="GST 2B Reconciliation"
      faqs={faqs}
      calculator={<ReconciliationTool />}
    >
      <EducationalContent />
    </CalculatorLayout>
  );
}
