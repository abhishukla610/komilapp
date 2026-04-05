import { Section } from "@/components/layout/section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I provide a comprehensive range of accounting and taxation services including GST registration and filing, income tax return preparation, bookkeeping and accounting, PAN card application and correction, TDS return filing, and business advisory services. All services are available remotely across India.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "My pricing is transparent and customized based on the complexity of your requirements. GST filing starts from as low as INR 500 per month, and ITR filing starts at INR 1,000. I offer a free initial consultation to understand your needs and provide a clear quote with no hidden charges.",
  },
  {
    question: "Do you work with businesses outside Ahmedabad?",
    answer:
      "Absolutely. While I am based in Ahmedabad, I work with clients across Gujarat and all over India. All my services are fully digital and remote-friendly. You can share documents via WhatsApp, email, or any cloud platform, and everything is handled online.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is simple. Book a free 30-minute consultation through the contact page or send me a message on WhatsApp. During the call, we will discuss your requirements, and I will suggest the best service plan for your needs. Once confirmed, I will begin working on your filings right away.",
  },
  {
    question: "What documents do I need for GST filing?",
    answer:
      "For GST filing, you will need your GSTIN, purchase and sales invoices for the filing period, bank statements, and any credit or debit notes. If you are registering for GST for the first time, you will also need your PAN card, Aadhaar card, business address proof, and bank account details.",
  },
  {
    question: "How long does ITR filing take?",
    answer:
      "Once I receive all the required documents, ITR filing is typically completed within 2 to 3 working days. For more complex returns involving capital gains or business income, it may take up to 5 working days. I always ensure filing is done well before the deadline to avoid any last-minute issues.",
  },
  {
    question: "Do you offer free consultations?",
    answer:
      "Yes, I offer a complimentary 30-minute consultation for all new clients. This allows us to discuss your specific accounting and tax needs, understand your business situation, and recommend the most suitable services. There is no obligation to proceed after the consultation.",
  },
];

export function FaqSection() {
  return (
    <Section
      eyebrow="Frequently Asked Questions"
      title="Common Questions"
      titleAccent="Answered"
      description="Everything you need to know about my accounting and tax services."
      centered
    >
      <div className="mx-auto max-w-3xl">
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
