export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  name: string;
  faqs: FaqItem[];
}

export const faqCategories: FaqCategory[] = [
  {
    name: "General",
    faqs: [
      {
        question: "What accounting services do you offer?",
        answer:
          "We provide a comprehensive range of accounting and taxation services including GST filing and compliance, Income Tax Return preparation, bookkeeping and accounting, PAN card corrections, TDS returns, business registration, and freelance accounting support. All services are tailored to individual and business needs in India.",
      },
      {
        question: "Do you work with individuals or only businesses?",
        answer:
          "We work with both individuals and businesses. Whether you need help filing your personal Income Tax Return, managing GST compliance for your business, or bookkeeping for a startup, we have you covered.",
      },
      {
        question: "How do I get started with your services?",
        answer:
          "Getting started is simple. You can reach out via phone, WhatsApp, or our contact form. We will schedule a brief consultation to understand your requirements, after which we will provide a clear scope of work and pricing. Most engagements can begin within 1-2 business days.",
      },
      {
        question: "Do you offer services across India or only in Ahmedabad?",
        answer:
          "While we are based in Ahmedabad, Gujarat, we serve clients across India. Since most accounting and tax services can be handled digitally, location is not a barrier. We use secure online tools for document sharing and communication.",
      },
      {
        question: "What documents do I need to provide?",
        answer:
          "The documents required depend on the service. For ITR filing, you will typically need Form 16, bank statements, investment proofs, and PAN/Aadhaar details. For GST registration, you will need PAN, Aadhaar, business address proof, and bank details. We provide a detailed checklist once you engage our services.",
      },
    ],
  },
  {
    name: "GST Services",
    faqs: [
      {
        question: "Who needs to register for GST?",
        answer:
          "GST registration is mandatory if your annual turnover exceeds Rs. 40 lakhs (Rs. 20 lakhs for special category states) for goods, or Rs. 20 lakhs (Rs. 10 lakhs for special category states) for services. It is also required for inter-state suppliers, e-commerce sellers, and certain other categories regardless of turnover.",
      },
      {
        question: "What is the penalty for late GST filing?",
        answer:
          "Late filing of GST returns attracts a late fee of Rs. 50 per day (Rs. 25 CGST + Rs. 25 SGST) for GSTR-3B, subject to a maximum cap. For nil returns, the late fee is Rs. 20 per day. Additionally, interest at 18% per annum is charged on the outstanding tax amount from the due date.",
      },
      {
        question: "How often do GST returns need to be filed?",
        answer:
          "Regular taxpayers must file GSTR-1 (outward supplies) and GSTR-3B (summary return) monthly or quarterly depending on their turnover and scheme opted. Annual returns via GSTR-9 are due by 31st December of the following financial year. We handle all filing deadlines so you never miss one.",
      },
      {
        question: "Can you help with GST registration for a new business?",
        answer:
          "Absolutely. We handle the entire GST registration process end-to-end, from preparing and submitting the application on the GST portal to responding to any queries from the department. The process typically takes 3-7 working days once all documents are submitted.",
      },
    ],
  },
  {
    name: "Income Tax",
    faqs: [
      {
        question: "What is the due date for filing Income Tax Returns?",
        answer:
          "For individuals and HUFs not requiring audit, the due date is 31st July of the assessment year. For businesses requiring audit, it is 31st October. For transfer pricing cases, the deadline extends to 30th November. Belated returns can be filed until 31st December of the assessment year with applicable penalties.",
      },
      {
        question: "Should I choose the old or new tax regime?",
        answer:
          "The choice depends on your income level and eligible deductions. The new regime offers lower tax rates but removes most deductions and exemptions. If you have significant deductions under sections like 80C, 80D, HRA, and home loan interest, the old regime may be more beneficial. We analyse both options and recommend the one that minimises your tax liability.",
      },
      {
        question: "What happens if I miss the ITR filing deadline?",
        answer:
          "Filing after the due date results in a late filing fee of up to Rs. 5,000 under Section 234F (Rs. 1,000 if total income is below Rs. 5 lakhs). You also lose the ability to carry forward certain losses and may face interest under Sections 234A, 234B, and 234C on any outstanding tax.",
      },
      {
        question: "Do freelancers need to file ITR?",
        answer:
          "Yes, freelancers and self-employed professionals must file ITR if their gross total income exceeds the basic exemption limit. Income from freelancing is taxed under 'Profits and Gains of Business or Profession'. We help freelancers claim legitimate deductions under Section 44ADA (presumptive taxation) to reduce their tax burden.",
      },
    ],
  },
  {
    name: "Pricing & Payments",
    faqs: [
      {
        question: "How is your pricing structured?",
        answer:
          "Our pricing is transparent and depends on the complexity of the service. We offer fixed-fee packages for standard services like ITR filing and GST returns, and custom quotes for more involved work like bookkeeping or business advisory. You will always know the cost upfront before we begin.",
      },
      {
        question: "Do you offer any packages or discounts?",
        answer:
          "Yes, we offer bundled packages for clients who need multiple services, such as combined GST + ITR filing. We also provide discounts for annual engagements and referrals. Contact us to discuss a package that fits your needs and budget.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept payments via UPI, bank transfer (NEFT/IMPS), and online payment links. Payment terms are communicated clearly at the start of each engagement, and we provide proper receipts for all transactions.",
      },
    ],
  },
];

export const allFaqs: FaqItem[] = faqCategories.flatMap(
  (category) => category.faqs
);
