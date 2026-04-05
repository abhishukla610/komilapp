import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface Faq {
  question: string;
  answer: string;
}

interface CalculatorLayoutProps {
  title: string;
  titleAccent?: string;
  description: string;
  faqs: Faq[];
  /** Pass a breadcrumb label string for auto-generated breadcrumbs, or a ReactNode for custom breadcrumbs */
  breadcrumbLabel?: string;
  breadcrumbs?: React.ReactNode;
  /** Pass educational content as a prop, or as children */
  educationalContent?: React.ReactNode;
  /** The calculator component — use this or put calculator in children via the simpler API */
  calculator?: React.ReactNode;
  children?: React.ReactNode;
}

export function CalculatorLayout({
  title,
  titleAccent,
  description,
  breadcrumbLabel,
  breadcrumbs,
  educationalContent,
  calculator,
  faqs,
  children,
}: CalculatorLayoutProps) {
  // Determine what goes in each slot
  const breadcrumbsNode = breadcrumbs ?? (
    breadcrumbLabel ? (
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: breadcrumbLabel, href: "#" },
        ]}
      />
    ) : null
  );

  // If `calculator` prop is provided, children are educational content.
  // If `educationalContent` prop is provided, children are the calculator.
  const calculatorNode = calculator ?? (educationalContent ? children : null);
  const educationalNode = educationalContent ?? (calculator ? children : null);

  return (
    <>
      <FaqJsonLd faqs={faqs} />

      {breadcrumbsNode && (
        <Section className="pt-8 md:pt-12 pb-0">
          {breadcrumbsNode}
        </Section>
      )}

      <Section
        eyebrow="Free Tool"
        title={title}
        titleAccent={titleAccent}
        description={description}
        centered
        className="pb-8 md:pb-12"
      >
        {calculatorNode}
      </Section>

      {/* Educational Content */}
      {educationalNode && (
        <Section className="pt-0 pb-8 md:pb-12">
          <div className="mx-auto max-w-3xl prose prose-neutral dark:prose-invert prose-headings:font-serif prose-headings:tracking-tight prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
            {educationalNode}
          </div>
        </Section>
      )}

      {/* FAQs */}
      <Section
        eyebrow="FAQ"
        title="Frequently Asked"
        titleAccent="Questions"
        centered
        className="pt-0"
      >
        <div className="mx-auto max-w-3xl">
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* CTA */}
      <Section centered className="pt-0 pb-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Need Professional Help?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Our expert accountants can handle your GST filing, tax returns, and
            compliance needs. Book a free consultation today.
          </p>
          <div className="mt-6">
            <Button size="lg" render={<Link href="/contact" />}>
              Book a Free Consultation
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
