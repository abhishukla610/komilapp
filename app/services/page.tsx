import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { constructMetadata } from "@/lib/seo";
import { services } from "@/lib/services-data";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = constructMetadata({
  title: "Our Services",
  description:
    "Professional GST filing, Income Tax Return, Bookkeeping, PAN Card Correction, Freelance Accounting & Free Consultation services in Ahmedabad, Gujarat by Komil Koshti.",
  pathname: "/services",
});

type IconComponent = React.ComponentType<{ className?: string }>;

function getIcon(iconName: string): IconComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const icons = LucideIcons as any;
  return icons[iconName] || LucideIcons.FileText;
}

export default function ServicesPage() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
      </div>

      <Section
        eyebrow="What We Do"
        title="Our Services"
        description="Comprehensive accounting, tax, and compliance services tailored for individuals, freelancers, and businesses in Ahmedabad, Gujarat."
        centered
        className="pt-8 md:pt-12"
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <Card className="h-full transition-colors hover:border-[var(--color-accent-gold)]/50">
                  <CardHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent-gold)]/10 text-[var(--color-accent-gold)]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-[var(--color-accent-gold)]">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                      {service.shortDescription}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {service.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="inline-flex items-center text-sm font-medium text-[var(--color-accent-gold)] group-hover:underline">
                      Learn More
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
