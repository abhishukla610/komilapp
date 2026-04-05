import { Metadata } from "next";
import Link from "next/link";
import { Calculator, Receipt, ArrowRight } from "lucide-react";

import { constructMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = constructMetadata({
  title: "Free Financial Tools & Calculators",
  description:
    "Free online financial calculators for GST, Income Tax, and more. Simplify your tax calculations with our easy-to-use tools built for Indian businesses and individuals.",
  pathname: "/tools",
});

const tools = [
  {
    title: "GST Calculator",
    description:
      "Add or remove GST at 5%, 12%, 18%, and 28% rates. Get instant CGST, SGST, and IGST breakdown with Indian number formatting.",
    href: "/tools/gst-calculator",
    icon: Receipt,
  },
  {
    title: "Income Tax Calculator",
    description:
      "Calculate your income tax liability under the old and new tax regimes. Compare deductions, exemptions, and find the best option for you.",
    href: "/tools/income-tax-calculator",
    icon: Calculator,
  },
];

export default function ToolsPage() {
  return (
    <>
      <Section className="pt-8 md:pt-12 pb-0">
        <Breadcrumbs items={[{ label: "Tools", href: "/tools" }]} />
      </Section>

      <Section
        eyebrow="Resources"
        title="Free Financial"
        titleAccent="Tools"
        description="Simplify your tax and financial calculations with our free online tools. Built for Indian businesses and individuals, these calculators help you get accurate results instantly."
        centered
      >
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <Card key={tool.href} className="group relative transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-[var(--color-accent-gold)]/10">
                  <tool.icon className="size-5 text-[var(--color-accent-gold)]" />
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" render={<Link href={tool.href} />}>
                  Open Calculator
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
