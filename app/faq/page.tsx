import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { constructMetadata } from "@/lib/seo";
import { faqCategories, allFaqs } from "@/lib/faq-data";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = constructMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about GST filing, Income Tax Returns, accounting services, and pricing. Get answers to common tax and compliance queries.",
  pathname: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd faqs={allFaqs} />

      <Section className="pt-8 md:pt-12 pb-0">
        <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
      </Section>

      <Section
        eyebrow="FAQ"
        title="Frequently Asked"
        titleAccent="Questions"
        description="Find answers to common questions about our accounting and tax services. Cannot find what you are looking for? Contact us directly."
        centered
      >
        <Tabs defaultValue={faqCategories[0].name} className="w-full">
          <TabsList variant="line" className="mb-8 flex-wrap justify-center">
            {faqCategories.map((category) => (
              <TabsTrigger key={category.name} value={category.name}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {faqCategories.map((category) => (
            <TabsContent key={category.name} value={category.name}>
              <div className="mx-auto max-w-3xl">
                <Accordion>
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.name}-${index}`}
                    >
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
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      {/* CTA */}
      <Section centered className="pt-0 pb-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Still Have Questions?
          </h2>
          <p className="mt-3 text-muted-foreground">
            We are happy to help. Get in touch and we will respond within 24
            hours.
          </p>
          <div className="mt-6">
            <Button size="lg" render={<Link href="/contact" />}>
              Contact Us
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
