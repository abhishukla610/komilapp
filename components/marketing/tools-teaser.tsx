import Link from "next/link";
import { Calculator, Receipt, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";

const tools = [
  {
    icon: Calculator,
    title: "GST Calculator",
    description:
      "Quickly calculate GST amounts for any product or service. Add or remove GST with support for 5%, 12%, 18%, and 28% tax slabs.",
    href: "/tools/gst-calculator",
  },
  {
    icon: Receipt,
    title: "Income Tax Calculator",
    description:
      "Estimate your income tax liability under both the old and new tax regimes. Plan your taxes and maximize savings.",
    href: "/tools/income-tax-calculator",
  },
];

export function ToolsTeaser() {
  return (
    <Section
      eyebrow="Free Tools"
      title="Financial Calculators"
      titleAccent="at Your Fingertips"
      description="Use our free online calculators to make quick financial decisions."
      centered
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.title}
              href={tool.href}
              className="group/link block"
            >
              <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex flex-col gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-[#c9a547]/10">
                    <Icon className="size-6 text-[#c9a547]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {tool.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tool.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#c9a547] transition-colors group-hover/link:underline">
                    Try Now
                    <ArrowRight className="size-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
