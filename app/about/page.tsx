import { Metadata } from "next";
import Link from "next/link";
import { Target, Zap, Handshake, ArrowRight } from "lucide-react";

import { constructMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = constructMetadata({
  title: "About",
  description:
    "Learn about Komil Koshti, a dedicated accounting and tax professional based in Ahmedabad, Gujarat. 4+ years of experience in GST, Income Tax, and business advisory.",
  pathname: "/about",
});

const values = [
  {
    icon: Target,
    title: "Precision-First",
    description:
      "Every return, every filing, every calculation is double-checked. We leave no room for errors in your financial records because accuracy is not optional in accounting.",
  },
  {
    icon: Zap,
    title: "Always On Time",
    description:
      "Deadlines in taxation are non-negotiable. We track every due date and ensure your filings are completed well before the cutoff, so you never face penalties.",
  },
  {
    icon: Handshake,
    title: "Direct Personal Service",
    description:
      "When you work with us, you work directly with a qualified professional. No layers of intermediaries, no outsourced teams. Your finances get the focused attention they deserve.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PersonJsonLd />

      <Section className="pt-8 md:pt-12 pb-0">
        <Breadcrumbs items={[{ label: "About", href: "/about" }]} />
      </Section>

      {/* Hero */}
      <Section>
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
          {/* Avatar placeholder */}
          <div className="flex size-32 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-4xl font-bold font-serif md:size-40 md:text-5xl">
            KK
          </div>

          <div className="text-center md:text-left">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--color-accent-gold)]">
              About
            </p>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Komil Koshti
            </h1>
            <p className="mt-2 text-lg font-medium text-primary">
              Accounting & Tax Expert
            </p>
            <p className="mt-1 text-muted-foreground">Ahmedabad, Gujarat, India</p>
          </div>
        </div>
      </Section>

      {/* Bio */}
      <Section className="pt-0">
        <div className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            With over four years of hands-on experience in Indian accounting and
            taxation, I have helped hundreds of individuals, freelancers, and
            small businesses navigate the complexities of GST compliance, income
            tax filing, and financial record-keeping. My practice is built on a
            simple belief: every taxpayer deserves accurate, timely, and
            affordable professional support.
          </p>
          <p>
            After building a strong foundation in commerce and accounting
            principles, I chose to focus on serving clients who are often
            underserved by large firms — salaried professionals filing their
            first ITR, freelancers confused about presumptive taxation, and
            small business owners trying to stay GST-compliant. Over time, this
            focus has allowed me to develop deep expertise in the specific
            challenges these groups face.
          </p>
          <p>
            My approach is straightforward: I take the time to understand each
            client&apos;s unique financial situation, explain everything in clear
            language, and deliver work that meets the highest standards of
            accuracy and compliance. Whether it is a single tax return or
            year-round bookkeeping, I treat every engagement with the same level
            of care and professionalism.
          </p>
        </div>
      </Section>

      {/* Values */}
      <Section
        eyebrow="Our Values"
        title="What Sets Us"
        titleAccent="Apart"
        centered
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <Card key={value.title} className="text-center">
              <CardContent className="flex flex-col items-center gap-4 pt-2">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section centered className="pb-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to Get Your Finances in Order?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Book a free consultation and let us discuss how we can help with your
            accounting and tax needs.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" render={<Link href="/contact" />}>
              Book a Consultation
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
