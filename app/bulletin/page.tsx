import { Metadata } from "next";
import Link from "next/link";
import {
  Newspaper,
  ExternalLink,
  ArrowRight,
  Globe,
  FileText,
  Calculator,
  BookOpen,
} from "lucide-react";

import { constructMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BulletinGrid } from "@/components/bulletin/bulletin-grid";

export const revalidate = 1800;

export const metadata: Metadata = constructMetadata({
  title: "Tax Bulletin | Latest GST & Income Tax News India",
  description:
    "Stay updated with the latest Indian tax news, GST updates, income tax changes, and compliance deadlines. Auto-updated every 30 minutes from trusted sources.",
  pathname: "/bulletin",
});

const QUICK_LINKS = [
  {
    label: "GST Portal",
    href: "https://www.gst.gov.in/",
    icon: Globe,
  },
  {
    label: "Income Tax e-Filing",
    href: "https://www.incometax.gov.in/",
    icon: FileText,
  },
  {
    label: "ClearTax",
    href: "https://cleartax.in/",
    icon: Calculator,
  },
  {
    label: "CBDT Circulars",
    href: "https://incometaxindia.gov.in/Pages/communications/circulars.aspx",
    icon: BookOpen,
  },
  {
    label: "TaxGuru",
    href: "https://taxguru.in/",
    icon: Newspaper,
  },
];

function TodayDate() {
  const today = new Date();
  return today.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BulletinPage() {
  return (
    <>
      <Section className="pt-8 pb-0 md:pt-12">
        <Breadcrumbs items={[{ label: "Tax Bulletin", href: "/bulletin" }]} />
      </Section>

      <Section className="pt-6 pb-8 md:pt-8 md:pb-12">
        {/* Newspaper-style header */}
        <div className="mb-8 text-center">
          <div className="mb-3 flex items-center justify-center gap-2 text-[var(--color-accent-gold)]">
            <Newspaper className="size-6" />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Tax Bulletin
          </h1>
          <p className="mt-3 text-base text-muted-foreground sm:text-lg">
            Latest Tax, GST &amp; Compliance Updates — Auto-Updated Every 30
            Minutes
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <Separator className="w-12" />
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <TodayDate />
            </span>
            <Separator className="w-12" />
          </div>
        </div>

        {/* Main content + sidebar */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <BulletinGrid />
          </div>

          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-72">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Quick Links */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="font-serif text-sm font-semibold uppercase tracking-wider">
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-1">
                  {QUICK_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <link.icon className="size-4 shrink-0 text-[var(--color-accent-gold)]" />
                      <span className="flex-1">{link.label}</span>
                      <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-[var(--color-accent-gold)]/5 ring-[var(--color-accent-gold)]/20">
                <CardContent className="flex flex-col items-center gap-3 text-center">
                  <h3 className="font-serif text-base font-semibold text-foreground">
                    Need Help Understanding These Updates?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our experts can help you stay compliant with the latest tax
                    changes.
                  </p>
                  <Button
                    className="w-full"
                    render={<Link href="/contact" />}
                  >
                    Book a Consultation
                    <ArrowRight className="ml-1.5 size-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
