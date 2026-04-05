export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  tags: string[];
}

export const services: Service[] = [
  {
    slug: "gst-filing",
    title: "GST Filing & Registration",
    shortDescription:
      "Complete GST registration, monthly/quarterly GSTR-1, GSTR-3B filing, and annual return services for businesses in Ahmedabad and across Gujarat.",
    longDescription: `Goods and Services Tax compliance is one of the most critical obligations for every business operating in India. Whether you run a small shop in Maninagar, a trading firm in Ashram Road, or a growing startup in SG Highway, Ahmedabad, staying on top of your GST filings is non-negotiable. Komil Koshti provides end-to-end GST filing and registration services that ensure your business remains fully compliant with the latest GST regulations set by the Central Board of Indirect Taxes and Customs (CBIC).

Our GST services cover the entire lifecycle of compliance. We begin with GST registration under the appropriate category — whether you need regular registration, composition scheme enrollment, or registration for e-commerce operators. For businesses already registered, we handle monthly and quarterly filing of GSTR-1 (outward supplies), GSTR-3B (summary return with tax payment), and the annual GSTR-9 return. We ensure your Input Tax Credit (ITC) claims are accurate, reconcile purchase data with GSTR-2A/2B auto-populated returns, and flag any mismatches before the filing deadline.

Late filing of GST returns attracts penalties of Rs. 50 per day (Rs. 20 under composition scheme), and extended non-compliance can result in suspension of your GSTIN. Our proactive approach ensures you never miss the 11th of the month for GSTR-1 or the 20th for GSTR-3B. We also assist businesses in Ahmedabad and Gujarat with GST amendments, cancellation, revocation of cancelled registration, and responding to notices from the GST department. For exporters, we handle Letter of Undertaking (LUT) filings and refund claims for zero-rated supplies.

Whether you are a freelancer crossing the Rs. 20 lakh threshold, a retailer managing multiple HSN codes, or a manufacturer dealing with reverse charge mechanism, our GST filing services are tailored to your specific needs. We leverage cloud-based accounting tools and maintain detailed records so you always have audit-ready documentation. With over 500 returns filed and a 100% compliance track record, Komil Koshti is your trusted GST partner in Ahmedabad, Gujarat.`,
    icon: "FileText",
    features: [
      "New GST registration and composition scheme enrollment",
      "Monthly GSTR-1 and GSTR-3B filing with ITC reconciliation",
      "Annual GSTR-9 return preparation and filing",
      "GST amendment, cancellation, and revocation support",
      "LUT filing and export refund claims for zero-rated supplies",
    ],
    process: [
      {
        step: 1,
        title: "Document Collection",
        description:
          "We gather your sales invoices, purchase bills, bank statements, and previous return data to prepare an accurate filing.",
      },
      {
        step: 2,
        title: "Data Reconciliation",
        description:
          "We reconcile your books with GSTR-2A/2B auto-populated data, verify ITC eligibility, and identify any discrepancies.",
      },
      {
        step: 3,
        title: "Return Preparation & Review",
        description:
          "We prepare GSTR-1 and GSTR-3B with correct HSN codes, tax rates, and place of supply details for your review.",
      },
      {
        step: 4,
        title: "Filing & Confirmation",
        description:
          "After your approval, we file the returns on the GST portal and share the filed return acknowledgment with you.",
      },
    ],
    faqs: [
      {
        question:
          "What is the due date for GSTR-1 and GSTR-3B filing?",
        answer:
          "GSTR-1 is due by the 11th of the following month for monthly filers (or the 13th of the month following the quarter for QRMP scheme filers). GSTR-3B is due by the 20th of the following month. Late filing attracts a penalty of Rs. 50 per day (CGST + SGST), capped at Rs. 10,000 per return.",
      },
      {
        question:
          "Do I need GST registration if my turnover is below Rs. 20 lakh?",
        answer:
          "If your aggregate turnover is below Rs. 20 lakh (Rs. 10 lakh for special category states), GST registration is not mandatory. However, if you sell goods online through e-commerce platforms or make inter-state supplies, registration is compulsory regardless of turnover.",
      },
      {
        question:
          "What documents are required for new GST registration?",
        answer:
          "You need your PAN card, Aadhaar card, photograph, proof of business address (electricity bill, rent agreement, or property tax receipt), bank account details with a cancelled cheque, and the business registration document (partnership deed, incorporation certificate, etc.).",
      },
      {
        question:
          "Can you help with GST notices and compliance issues?",
        answer:
          "Yes, we assist businesses in Ahmedabad and across Gujarat with responding to GST notices, rectifying mismatches in returns, applying for revocation of cancelled registration, and representing you before the GST authorities.",
      },
      {
        question:
          "What is the composition scheme and who is eligible?",
        answer:
          "The composition scheme is a simplified GST compliance option for businesses with aggregate turnover up to Rs. 1.5 crore (Rs. 75 lakh for service providers). You pay tax at a flat rate (1% for manufacturers, 5% for restaurants, 6% for other service providers) and file quarterly returns instead of monthly.",
      },
    ],
    tags: ["GST", "GSTR-1", "GSTR-3B", "Tax Compliance", "Ahmedabad"],
  },
  {
    slug: "income-tax-return",
    title: "Income Tax Return (ITR) Filing",
    shortDescription:
      "Accurate ITR filing for salaried individuals, freelancers, and businesses in Ahmedabad with maximum tax-saving strategies under Section 80C, 80D, and more.",
    longDescription: `Filing your Income Tax Return accurately and on time is not just a legal obligation under the Income Tax Act, 1961 — it is a powerful financial tool that can help you claim refunds, build a strong credit history, and plan your wealth efficiently. Komil Koshti provides comprehensive ITR filing services for salaried professionals, self-employed individuals, freelancers, and businesses across Ahmedabad, Gujarat, and all of India.

We specialize in selecting the correct ITR form for your income profile. Whether you need ITR-1 (Sahaj) for straightforward salary income, ITR-2 for capital gains from mutual funds and property, ITR-3 for business and professional income, or ITR-4 (Sugam) for presumptive taxation under Section 44AD/44ADA, we ensure the right form is used with all schedules filled accurately. Our team reviews your Form 16, Form 26AS, Annual Information Statement (AIS), and Taxpayer Information Summary (TIS) to verify TDS credits and identify any discrepancies before filing.

Maximizing your tax savings is at the heart of our service. We evaluate all eligible deductions under Section 80C (PPF, ELSS, life insurance, tuition fees), Section 80D (health insurance premiums), Section 80E (education loan interest), Section 80G (charitable donations), and the new tax regime benefits introduced in Budget 2024. For homeowners, we help claim deductions on housing loan interest under Section 24(b) and principal repayment under Section 80C. For freelancers and consultants, we ensure proper computation of income under Section 44ADA and advise on advance tax obligations.

The ITR filing deadline for individuals is typically July 31st of the assessment year, with belated returns allowed until December 31st (with penalties). Late filing under Section 234F attracts a fee of Rs. 5,000 (Rs. 1,000 if taxable income is below Rs. 5 lakh). We also handle revised returns for correcting errors in previously filed ITRs and assist with Income Tax notices and assessment proceedings. With meticulous attention to detail and deep knowledge of the Indian tax system, Komil Koshti ensures every rupee of eligible deduction is claimed while maintaining full compliance with the law. Our clients across Ahmedabad trust us for timely, accurate, and hassle-free ITR filing.`,
    icon: "Calculator",
    features: [
      "ITR-1 to ITR-4 filing for individuals and businesses",
      "Form 26AS, AIS, and TIS reconciliation for accurate TDS credit",
      "Tax-saving advisory under Section 80C, 80D, 80E, and 80G",
      "Capital gains computation for mutual funds, stocks, and property",
      "Revised return filing and response to Income Tax notices",
    ],
    process: [
      {
        step: 1,
        title: "Income Assessment",
        description:
          "We review your Form 16, salary slips, bank statements, investment proofs, and other income documents to determine total taxable income.",
      },
      {
        step: 2,
        title: "Deduction Optimization",
        description:
          "We identify all eligible deductions under Sections 80C, 80D, 80E, 80G, 24(b), and other provisions to minimize your tax liability legally.",
      },
      {
        step: 3,
        title: "Return Preparation",
        description:
          "We prepare the correct ITR form with all schedules, reconcile with Form 26AS/AIS, and compute the exact tax payable or refund due.",
      },
      {
        step: 4,
        title: "Filing & E-verification",
        description:
          "We file the return on the Income Tax portal, assist with e-verification via Aadhaar OTP or net banking, and share the ITR-V acknowledgment.",
      },
    ],
    faqs: [
      {
        question: "What is the deadline for ITR filing in India?",
        answer:
          "The standard deadline for individual taxpayers is July 31st of the assessment year. For example, for income earned in FY 2025-26, the ITR must be filed by July 31, 2026. Belated returns can be filed until December 31st with a late fee of Rs. 5,000 under Section 234F.",
      },
      {
        question:
          "Which ITR form should I use as a salaried employee?",
        answer:
          "Most salaried employees with income up to Rs. 50 lakh from salary, one house property, and other sources (interest, etc.) should use ITR-1 (Sahaj). If you have capital gains, foreign income, or multiple house properties, ITR-2 is required.",
      },
      {
        question:
          "Can I switch between the old and new tax regime?",
        answer:
          "Salaried individuals can choose between the old and new tax regime every financial year. The new regime (default from FY 2023-24) offers lower tax rates but fewer deductions. We analyze both regimes and recommend the one that results in lower tax liability for you.",
      },
      {
        question:
          "What happens if I miss the ITR filing deadline?",
        answer:
          "Filing after the deadline results in a late fee of Rs. 5,000 (Rs. 1,000 if income is below Rs. 5 lakh), loss of the ability to carry forward certain losses, and interest under Section 234A on any outstanding tax. Non-filing can also attract penalties and prosecution in severe cases.",
      },
      {
        question:
          "How do I claim a refund for excess TDS deducted?",
        answer:
          "If your employer or bank has deducted more TDS than your actual tax liability, you can claim a refund by filing your ITR. The refund is processed by the Income Tax department and credited directly to your bank account, typically within 30-60 days of e-verification.",
      },
    ],
    tags: ["Income Tax", "ITR Filing", "Section 80C", "Tax Saving", "Ahmedabad"],
  },
  {
    slug: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping",
    shortDescription:
      "Professional bookkeeping, financial statement preparation, and accounting services for small businesses and startups in Ahmedabad, Gujarat.",
    longDescription: `Maintaining accurate books of accounts is the foundation of every financially healthy business. Whether you are a small business owner in CG Road, a startup founder in Ahmedabad's thriving tech ecosystem, or a trader operating across Gujarat, proper accounting and bookkeeping ensures you have clear visibility into your cash flow, profitability, and tax obligations at all times. Komil Koshti offers professional accounting and bookkeeping services designed for Indian SMEs, MSMEs, and growing businesses.

Our bookkeeping services encompass the full spectrum of financial record-keeping required under the Indian Companies Act, 2013, and the Income Tax Act, 1961. We maintain your ledgers, journals, cash books, and bank reconciliation statements with precision. Every transaction is categorized correctly, whether it falls under revenue, expenses, assets, or liabilities. We use industry-standard accounting software like Tally Prime and cloud-based platforms to ensure your financial data is organized, secure, and accessible whenever you need it.

Beyond day-to-day bookkeeping, we prepare comprehensive financial statements including the Profit & Loss Account, Balance Sheet, and Cash Flow Statement in compliance with Indian Accounting Standards (Ind AS) or the applicable framework for your business size. These statements are essential for bank loan applications, investor meetings, GST audits, and Income Tax assessments. For businesses approaching the Rs. 1 crore turnover threshold (Rs. 50 lakh for professionals), we also assist with tax audit preparation under Section 44AB, ensuring your books are audit-ready well before the deadline.

Our approach is proactive rather than reactive. We provide monthly financial summaries so you always know where your business stands. We track accounts receivable and payable, flag overdue invoices, and help you maintain healthy working capital. For businesses in Ahmedabad dealing with multiple GST registrations, inter-state transactions, or TDS compliance, our integrated accounting service ensures that your books align perfectly with your GST returns and Income Tax filings. By outsourcing your accounting to Komil Koshti, you save the cost of a full-time accountant while getting expert-level financial management tailored to your business needs.`,
    icon: "BookOpen",
    features: [
      "Daily transaction recording and ledger maintenance",
      "Monthly bank reconciliation and financial summaries",
      "Profit & Loss, Balance Sheet, and Cash Flow statement preparation",
      "Tax audit preparation under Section 44AB",
      "Accounts receivable and payable tracking with aging reports",
    ],
    process: [
      {
        step: 1,
        title: "Onboarding & Setup",
        description:
          "We review your existing books, set up or migrate to a suitable accounting system, and establish a chart of accounts tailored to your business.",
      },
      {
        step: 2,
        title: "Monthly Bookkeeping",
        description:
          "We record all transactions, categorize expenses, reconcile bank statements, and maintain updated ledgers throughout the month.",
      },
      {
        step: 3,
        title: "Financial Reporting",
        description:
          "We prepare monthly/quarterly financial summaries and annual financial statements compliant with Indian accounting standards.",
      },
      {
        step: 4,
        title: "Review & Advisory",
        description:
          "We review your financial position, highlight areas of concern, and provide actionable insights to improve cash flow and profitability.",
      },
    ],
    faqs: [
      {
        question:
          "What accounting software do you use for bookkeeping?",
        answer:
          "We primarily use Tally Prime and cloud-based accounting platforms like Zoho Books. The choice of software depends on your business size and requirements. We can also work with your existing accounting software if preferred.",
      },
      {
        question:
          "How often will I receive financial reports?",
        answer:
          "We provide monthly financial summaries that include a Profit & Loss statement, bank reconciliation, and key metrics. Detailed quarterly and annual financial statements are prepared as part of our standard service package.",
      },
      {
        question:
          "Is bookkeeping mandatory for small businesses in India?",
        answer:
          "Under the Income Tax Act, businesses with income exceeding Rs. 1.2 lakh or turnover exceeding Rs. 10 lakh in any of the three preceding years must maintain books of accounts. Additionally, the GST Act requires all registered persons to maintain specified records.",
      },
      {
        question:
          "Can you handle bookkeeping for multiple business entities?",
        answer:
          "Yes, we manage books for multiple entities including sole proprietorships, partnership firms, LLPs, and private limited companies. Each entity's accounts are maintained separately with proper inter-entity transaction tracking where applicable.",
      },
    ],
    tags: [
      "Bookkeeping",
      "Financial Statements",
      "Tally",
      "Small Business",
      "Gujarat",
    ],
  },
  {
    slug: "pan-card-correction",
    title: "PAN Card Correction",
    shortDescription:
      "Quick and hassle-free PAN card correction, update, and reprint services for name, date of birth, address, and photograph changes in Ahmedabad.",
    longDescription: `Your Permanent Account Number (PAN) card is one of the most important identity and financial documents in India. Issued by the Income Tax Department through NSDL and UTIITSL, your PAN is linked to every financial transaction — from opening a bank account and filing Income Tax returns to purchasing property and making high-value investments. Any error in your PAN card details can lead to serious complications, including mismatched records with the Income Tax department, failed Aadhaar-PAN linking, and rejected KYC verifications. Komil Koshti provides fast and reliable PAN card correction services for individuals and businesses in Ahmedabad, Gujarat.

We handle all types of PAN card corrections and updates through the official NSDL (Protean) and UTIITSL portals. Whether you need to correct your name spelling, update your surname after marriage, fix your date of birth, change your father's name, update your address, or get a reprint with a new photograph and signature, we manage the entire process from application to delivery. We also assist NRIs and foreign nationals with PAN card applications and corrections, ensuring compliance with Indian tax regulations.

The PAN correction process requires submitting Form 49A (for Indian citizens) or Form 49AA (for foreign citizens) along with supporting documents. For name corrections, you need a gazette notification, marriage certificate, or updated Aadhaar card. For date of birth corrections, a birth certificate, matriculation certificate, or passport is required. We verify all documents, fill the application accurately, upload supporting proof, and track the application until your corrected PAN card is dispatched. The typical processing time is 15-20 working days from the date of application.

PAN-Aadhaar linking is mandatory under Section 139AA of the Income Tax Act, and any mismatch between your PAN and Aadhaar details (name, date of birth, or gender) will prevent successful linking, leading to your PAN becoming inoperative. An inoperative PAN means you cannot file ITR, process refunds, or complete financial transactions requiring PAN. We help residents of Ahmedabad and across India resolve these mismatches quickly so your PAN remains active and fully functional. Our service is affordable, transparent, and designed to save you the time and frustration of navigating government portals on your own.`,
    icon: "CreditCard",
    features: [
      "Name, date of birth, and address corrections on PAN card",
      "PAN card reprint with updated photograph and signature",
      "PAN-Aadhaar mismatch resolution and linking assistance",
      "New PAN card application for individuals and businesses",
      "NRI and foreign national PAN card services",
    ],
    process: [
      {
        step: 1,
        title: "Requirement Assessment",
        description:
          "We understand what correction is needed on your PAN card and advise on the required supporting documents.",
      },
      {
        step: 2,
        title: "Document Collection & Verification",
        description:
          "We collect and verify all required documents — Aadhaar, birth certificate, marriage certificate, gazette notification, etc.",
      },
      {
        step: 3,
        title: "Application Submission",
        description:
          "We fill and submit Form 49A/49AA on the NSDL or UTIITSL portal with accurate details and upload supporting documents.",
      },
      {
        step: 4,
        title: "Tracking & Delivery",
        description:
          "We track the application status and keep you updated until the corrected PAN card is dispatched and delivered to your address.",
      },
    ],
    faqs: [
      {
        question:
          "How long does PAN card correction take?",
        answer:
          "The typical processing time is 15-20 working days from the date of successful application submission. In some cases, it may take longer if additional verification is required by the Income Tax department.",
      },
      {
        question:
          "What documents are needed for a PAN name correction?",
        answer:
          "For name correction, you need any two of the following: updated Aadhaar card, passport, voter ID, marriage certificate (for surname change), gazette notification, or matriculation certificate showing the correct name.",
      },
      {
        question:
          "Will my PAN number change after correction?",
        answer:
          "No, your PAN number remains the same after correction. Only the details printed on the card (name, date of birth, photograph, etc.) are updated. Your PAN number is permanent and does not change.",
      },
      {
        question:
          "What happens if PAN-Aadhaar linking fails due to a mismatch?",
        answer:
          "If your PAN and Aadhaar details do not match, the linking will fail. You need to first correct the details on either your PAN card or Aadhaar card to ensure they match. We can help you correct your PAN card details to resolve the mismatch and complete the linking.",
      },
      {
        question:
          "Can I apply for PAN correction online?",
        answer:
          "Yes, PAN correction can be done entirely online through the NSDL (Protean) or UTIITSL portals. We handle the complete online process on your behalf, including form filling, document upload, and payment, so you do not need to visit any office.",
      },
    ],
    tags: [
      "PAN Card",
      "PAN Correction",
      "Aadhaar Linking",
      "Identity Documents",
      "Ahmedabad",
    ],
  },
  {
    slug: "freelance-accounting",
    title: "Freelance Accounting",
    shortDescription:
      "Specialized accounting, tax planning, and compliance services for freelancers, consultants, and gig workers across Ahmedabad and India.",
    longDescription: `The freelance economy in India is booming, with millions of professionals working independently as consultants, content creators, software developers, graphic designers, and digital marketers. If you are a freelancer based in Ahmedabad or anywhere in India, managing your finances and tax compliance can be overwhelming — especially when you are focused on delivering great work to your clients. Komil Koshti provides specialized accounting services designed specifically for the unique needs of Indian freelancers, consultants, and gig economy workers.

Freelance income in India is taxed under "Income from Business or Profession" and requires careful computation of taxable income after deducting legitimate business expenses. We help you identify and claim all eligible deductions — from home office expenses and internet bills to software subscriptions, coworking space fees, and travel costs. For freelancers with gross receipts up to Rs. 50 lakh, we leverage the presumptive taxation scheme under Section 44ADA, which allows you to declare 50% of gross receipts as taxable income, simplifying your compliance significantly. For those earning above the threshold, we maintain proper books and compute income based on actual expenses.

Advance tax is a critical obligation for freelancers that many overlook. If your tax liability exceeds Rs. 10,000 in a financial year, you are required to pay advance tax in quarterly installments — by June 15, September 15, December 15, and March 15. Failure to pay advance tax results in interest under Sections 234B and 234C. We calculate your estimated tax liability, set up advance tax reminders, and ensure timely payments so you avoid unnecessary interest charges. We also handle TDS certificates (Form 16A) from your clients, reconcile them with Form 26AS, and claim credit when filing your ITR.

For freelancers earning in foreign currency from international clients, we advise on FEMA compliance, foreign income taxation, and the benefits of the Liberalised Remittance Scheme. We also assist with GST registration and filing for freelancers whose aggregate turnover exceeds Rs. 20 lakh (or who provide services to clients outside India and want to claim export benefits). Whether you are just starting your freelance journey from a co-working space in Ahmedabad or are an established consultant serving global clients, Komil Koshti provides the financial backbone your freelance business needs to thrive.`,
    icon: "Laptop",
    features: [
      "Freelance income computation with expense tracking and deductions",
      "Presumptive taxation under Section 44ADA for eligible professionals",
      "Advance tax calculation and quarterly payment reminders",
      "TDS reconciliation with Form 26AS and client TDS certificates",
      "GST registration and filing for freelancers above threshold",
    ],
    process: [
      {
        step: 1,
        title: "Profile & Income Review",
        description:
          "We understand your freelance profile, income sources, client base, and current tax situation to create a tailored compliance plan.",
      },
      {
        step: 2,
        title: "Expense Tracking & Optimization",
        description:
          "We set up expense tracking, identify all deductible business expenses, and advise on the best taxation scheme (actual vs. presumptive).",
      },
      {
        step: 3,
        title: "Tax Planning & Advance Tax",
        description:
          "We estimate your annual tax liability, schedule advance tax payments, and recommend tax-saving investments under Sections 80C and 80D.",
      },
      {
        step: 4,
        title: "ITR Filing & Compliance",
        description:
          "We prepare and file your ITR with accurate income computation, reconciled TDS, and all applicable deductions claimed.",
      },
    ],
    faqs: [
      {
        question:
          "Which ITR form should freelancers use?",
        answer:
          "Freelancers should use ITR-3 if maintaining books of accounts, or ITR-4 (Sugam) if opting for the presumptive taxation scheme under Section 44ADA. The choice depends on your gross receipts and whether you want to declare actual profits or the presumptive 50%.",
      },
      {
        question:
          "What is Section 44ADA and how does it benefit freelancers?",
        answer:
          "Section 44ADA is a presumptive taxation scheme for professionals (including freelancers) with gross receipts up to Rs. 50 lakh. Under this scheme, you can declare 50% of gross receipts as taxable income without maintaining detailed books of accounts, significantly simplifying your tax compliance.",
      },
      {
        question:
          "Do freelancers need to pay GST?",
        answer:
          "Freelancers need to register for GST and file returns if their aggregate turnover exceeds Rs. 20 lakh in a financial year. Freelancers providing services to clients outside India may still benefit from voluntary GST registration to claim input tax credits and file for export refunds.",
      },
      {
        question:
          "What expenses can freelancers claim as deductions?",
        answer:
          "Common deductible expenses include internet and phone bills, software and tool subscriptions, office rent or home office costs, travel expenses for client meetings, professional development courses, marketing costs, and depreciation on equipment like laptops and cameras.",
      },
      {
        question:
          "How is advance tax calculated for freelancers?",
        answer:
          "Advance tax is calculated based on estimated total income for the year minus eligible deductions and TDS already deducted. If the net tax liability exceeds Rs. 10,000, advance tax must be paid in four installments: 15% by June 15, 45% by September 15, 75% by December 15, and 100% by March 15.",
      },
    ],
    tags: [
      "Freelancer Tax",
      "Section 44ADA",
      "Advance Tax",
      "Gig Economy",
      "Ahmedabad",
    ],
  },
  {
    slug: "free-consultation",
    title: "Free Consultation",
    shortDescription:
      "Book a free 30-minute consultation with Komil Koshti to discuss your accounting, tax, or compliance needs. No obligations, just expert guidance.",
    longDescription: `Understanding your financial obligations and finding the right professional support should not cost you anything upfront. That is why Komil Koshti offers a completely free, no-obligation consultation for individuals and businesses in Ahmedabad, Gujarat, and across India. Whether you have questions about GST compliance, Income Tax filing, bookkeeping for your new business, or any other financial matter, our free consultation gives you access to expert advice that helps you make informed decisions.

During the free 30-minute consultation, we take the time to understand your specific situation. Are you a salaried professional unsure whether to choose the old or new tax regime? A business owner confused about GST registration requirements? A freelancer wondering how to handle advance tax payments? A startup founder needing guidance on which accounting structure to set up? Whatever your concern, we listen carefully, ask the right questions, and provide clear, actionable guidance tailored to your circumstances. There is no jargon, no pressure, and no hidden fees.

Many of our long-term clients in Ahmedabad started with a free consultation. They came with a specific question — "Do I need to file ITR if my income is below the taxable limit?" or "How do I correct a mistake in my GST return?" — and discovered that having a trusted accountant on their side made their entire financial life simpler. Our consultation covers an initial assessment of your needs, a high-level overview of the services that would benefit you, and a transparent explanation of our fees if you choose to engage us for ongoing support.

Booking a free consultation is straightforward. Simply reach out via our contact page, WhatsApp, or phone, and we will schedule a convenient time for a call or in-person meeting at our office in Ahmedabad. We believe that every individual and business deserves access to quality financial advice, and our free consultation is our way of demonstrating the value we bring before you commit to any engagement. Take the first step toward financial clarity and compliance — schedule your free consultation with Komil Koshti today.`,
    icon: "MessageCircle",
    features: [
      "30-minute one-on-one session with Komil Koshti",
      "Assessment of your tax, GST, and accounting needs",
      "Personalized recommendations and next steps",
      "No obligations, no hidden charges",
      "Available via phone, WhatsApp, or in-person in Ahmedabad",
    ],
    process: [
      {
        step: 1,
        title: "Book Your Slot",
        description:
          "Reach out via our contact page, WhatsApp, or phone to schedule a convenient time for your free consultation.",
      },
      {
        step: 2,
        title: "Share Your Concerns",
        description:
          "During the session, share your financial questions, compliance concerns, or business accounting needs with us.",
      },
      {
        step: 3,
        title: "Receive Expert Guidance",
        description:
          "We provide clear, actionable advice tailored to your situation, including an overview of relevant services and compliance requirements.",
      },
    ],
    faqs: [
      {
        question: "Is the consultation really free?",
        answer:
          "Yes, the initial 30-minute consultation is completely free with no hidden charges or obligations. It is our way of understanding your needs and demonstrating the value of our services before any engagement.",
      },
      {
        question:
          "What topics can I discuss during the free consultation?",
        answer:
          "You can discuss any financial, tax, or compliance topic — including GST registration and filing, Income Tax return planning, bookkeeping setup, PAN card issues, freelance taxation, business registration, and general financial planning.",
      },
      {
        question:
          "How do I book a free consultation?",
        answer:
          "You can book a consultation through our contact page, by calling +91 8306517999, or by sending a WhatsApp message. We will respond within 24 hours to schedule a time that works for you.",
      },
      {
        question:
          "Can I have the consultation online or does it have to be in person?",
        answer:
          "We offer consultations via phone call, WhatsApp video call, Google Meet, or in-person at our office in Ahmedabad. Choose whatever mode is most convenient for you.",
      },
    ],
    tags: [
      "Free Consultation",
      "Tax Advice",
      "Financial Planning",
      "Ahmedabad",
      "No Obligation",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
