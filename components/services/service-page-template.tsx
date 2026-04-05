import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  ProfessionalServiceJsonLd,
  FaqJsonLd,
} from "@/components/seo/json-ld";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type Service, services } from "@/lib/services-data";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";

type IconComponent = React.ComponentType<{ className?: string }>;

function getIcon(iconName: string): IconComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as any;
  return icons[iconName] || LucideIcons.FileText;
}

interface ServicePageTemplateProps {
  service: Service;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const Icon = getIcon(service.icon);
  const relatedServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <ProfessionalServiceJsonLd
        name={service.title}
        description={service.shortDescription}
        url={`/services/${service.slug}`}
      />
      <FaqJsonLd faqs={service.faqs} />

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: service.title, href: `/services/${service.slug}` },
          ]}
        />
      </div>

      {/* Hero Section */}
      <Section className="pb-8 pt-8 md:pb-12 md:pt-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:gap-8">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]">
            <Icon className="h-10 w-10" />
          </div>
          <div className="flex-1">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
              {service.shortDescription}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Separator className="mx-auto max-w-6xl" />

      {/* Features Section */}
      <Section
        eyebrow="What We Offer"
        title="Key Features"
        className="pb-8 md:pb-12"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
            >
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-accent-gold)]" />
              <span className="text-sm text-card-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Long Description */}
      <Section
        eyebrow="About This Service"
        title="Detailed Overview"
        className="pb-8 md:pb-12"
      >
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {service.longDescription.split("\n\n").map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 text-base leading-relaxed text-muted-foreground"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Separator className="mx-auto max-w-6xl" />

      {/* Process Timeline */}
      <Section
        eyebrow="How It Works"
        title="Our Process"
        className="pb-8 md:pb-12"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {service.process.map((step) => (
            <div key={step.step} className="relative">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent-gold)] font-serif text-xl font-bold text-white">
                {step.step}
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Separator className="mx-auto max-w-6xl" />

      {/* FAQ Section */}
      <Section
        eyebrow="Common Questions"
        title="Frequently Asked Questions"
        className="pb-8 md:pb-12"
      >
        <Accordion className="w-full max-w-3xl">
          {service.faqs.map((faq, index) => (
            <AccordionItem key={index}>
              <AccordionTrigger className="text-left text-base font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Separator className="mx-auto max-w-6xl" />

      {/* Related Services */}
      <Section
        eyebrow="Explore More"
        title="Related Services"
        className="pb-8 md:pb-12"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedServices.map((related) => {
            const RelatedIcon = getIcon(related.icon);
            return (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="group"
              >
                <Card className="h-full transition-colors hover:border-[var(--color-accent-gold)]/50">
                  <CardHeader className="flex flex-row items-center gap-3 pb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]">
                      <RelatedIcon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base font-semibold group-hover:text-[var(--color-accent-gold)]">
                      {related.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {related.shortDescription}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* CTA Section */}
      <Section centered className="pb-16 md:pb-24">
        <div className="rounded-2xl bg-[var(--color-accent-gold)]/5 border border-[var(--color-accent-gold)]/20 px-6 py-12 text-center sm:px-12">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Contact Komil Koshti today to discuss your {service.title.toLowerCase()} needs.
            We provide professional, reliable service with transparent pricing.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" render={<Link href="/contact" />}>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" render={<Link href="tel:+918306517999" />}>
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
