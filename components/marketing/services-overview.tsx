import Link from "next/link";
import {
  BookOpen,
  FileText,
  FileCheck,
  CreditCard,
  Briefcase,
  Phone,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    icon: BookOpen,
    title: "Accounting & Bookkeeping",
    slug: "bookkeeping",
    description:
      "Maintain accurate financial records with professional bookkeeping services tailored for small businesses.",
    tags: ["Ledger Management", "Reconciliation", "MIS Reports"],
  },
  {
    icon: FileText,
    title: "GST Services",
    slug: "gst-filing",
    description:
      "Complete GST registration, monthly/quarterly return filing, and compliance management.",
    tags: ["GST Filing", "GST Registration", "Input Credit"],
    popular: true,
  },
  {
    icon: FileCheck,
    title: "Income Tax Return",
    slug: "income-tax",
    description:
      "Timely and accurate ITR filing for individuals, freelancers, and businesses with maximum refund optimization.",
    tags: ["ITR Filing", "Tax Planning", "Refund Claims"],
  },
  {
    icon: CreditCard,
    title: "PAN Card Correction",
    slug: "pan-card-correction",
    description:
      "Quick and hassle-free PAN card application, correction, and reprinting services.",
    tags: ["New PAN", "Correction", "Reprint"],
  },
  {
    icon: Briefcase,
    title: "Freelance Accounting",
    slug: "freelance-accounting",
    description:
      "Specialized accounting solutions for freelancers and independent professionals in India.",
    tags: ["Freelancer ITR", "Presumptive Tax", "TDS"],
  },
  {
    icon: Phone,
    title: "Free Consultation",
    slug: "free-consultation",
    description:
      "Get a complimentary 30-minute consultation to discuss your accounting and tax needs.",
    tags: ["No Obligation", "Expert Advice", "Quick Response"],
  },
];

export function ServicesOverview() {
  return (
    <Section
      eyebrow="What I Offer"
      title="Comprehensive Accounting"
      titleAccent="Services"
      description="Professional tax and accounting services designed to keep your business compliant and financially healthy."
      centered
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group/link block"
            >
              <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="flex h-full flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#1a365d]/10">
                      <Icon className="size-5 text-[#1a365d]" />
                    </div>
                    {service.popular && (
                      <Badge className="bg-[#c9a547] text-white">
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {service.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#c9a547] transition-colors group-hover/link:underline">
                    Learn More
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
