import { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";

import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = constructMetadata({
  title: "Pricing",
  description:
    "Transparent and affordable pricing for GST filing, Income Tax Returns, bookkeeping, and other accounting services in Ahmedabad. Get a custom quote today.",
  pathname: "/pricing",
});

const pricingData = [
  {
    service: "GST Registration",
    price: "1,500",
    note: "One-time",
  },
  {
    service: "GST Return Filing (Monthly)",
    price: "750",
    note: "Per return",
  },
  {
    service: "GST Annual Return (GSTR-9)",
    price: "3,000",
    note: "Per year",
  },
  {
    service: "Income Tax Return (Salaried)",
    price: "500",
    note: "Per return",
  },
  {
    service: "Income Tax Return (Business/Professional)",
    price: "1,500",
    note: "Per return",
  },
  {
    service: "TDS Return Filing",
    price: "1,000",
    note: "Per quarter",
  },
  {
    service: "Bookkeeping & Accounting",
    price: "3,000",
    note: "Per month",
  },
  {
    service: "PAN Card Application / Correction",
    price: "500",
    note: "Per application",
  },
  {
    service: "Business Registration",
    price: null,
    note: "Custom Quote",
  },
  {
    service: "Audit & Assurance",
    price: null,
    note: "Custom Quote",
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="pt-8 md:pt-12 pb-0">
        <Breadcrumbs items={[{ label: "Pricing", href: "/pricing" }]} />
      </Section>

      <Section
        eyebrow="Pricing"
        title="Transparent &"
        titleAccent="Affordable Pricing"
        description="We believe in clear, upfront pricing with no hidden charges. All prices shown are starting rates — final pricing depends on the complexity of your specific requirements."
        centered
      >
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-center">Service Price List</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="divide-y">
                {pricingData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.service}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.note}</p>
                    </div>
                    {item.price ? (
                      <Badge variant="secondary" className="shrink-0 text-sm font-semibold">
                        From &#8377;{item.price}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="shrink-0 text-sm">
                        Custom Quote
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            * All prices are exclusive of applicable government fees and taxes.
            Final pricing is determined after understanding the scope and
            complexity of your requirements.
          </p>
        </div>
      </Section>

      <Separator className="mx-auto max-w-6xl" />

      {/* CTA */}
      <Section centered className="pb-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Need a Custom Quote?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every business is different. Get in touch for a personalised quote
            that fits your exact requirements and budget.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              render={<Link href={`tel:${siteConfig.phone}`} />}
            >
              <Phone className="mr-2 size-4" />
              Call Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <MessageCircle className="mr-2 size-4" />
              WhatsApp Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<Link href="/contact" />}
            >
              <ArrowRight className="mr-2 size-4" />
              Contact Form
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
