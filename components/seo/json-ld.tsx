import type { WithContext, LocalBusiness, FAQPage, BreadcrumbList, Person } from "schema-dts";

const siteUrl = "https://komilkoshti.com";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function JsonLdScript({ data }: { data: WithContext<any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "Komil Koshti",
    description:
      "Professional GST filing, Income Tax Return, Bookkeeping, PAN Card Correction & Freelance Accounting services in Ahmedabad.",
    url: siteUrl,
    telephone: "+918306517999",
    email: "komilkoshti@gmail.com",
    priceRange: "₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
    areaServed: {
      "@type": "City",
      name: "Ahmedabad",
    },
    sameAs: [
      "https://www.linkedin.com/in/komilkoshti",
      "https://wa.me/918306517999",
    ],
  };

  return <JsonLdScript data={data} />;
}

interface ProfessionalServiceJsonLdProps {
  name: string;
  description: string;
  url: string;
}

export function ProfessionalServiceJsonLd({
  name,
  description,
  url,
}: ProfessionalServiceJsonLdProps) {
  const data = {
    "@context": "https://schema.org" as const,
    "@type": "ProfessionalService",
    name,
    description,
    url: `${siteUrl}${url}`,
    provider: {
      "@type": "Person",
      name: "Komil Koshti",
    },
  };

  return <JsonLdScript data={data} />;
}

interface FaqJsonLdProps {
  faqs: { question: string; answer: string }[];
}

export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  const data: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  };

  return <JsonLdScript data={data} />;
}

interface BreadcrumbJsonLdProps {
  items: { name: string; href: string }[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return <JsonLdScript data={data} />;
}

export function PersonJsonLd() {
  const data: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Komil Koshti",
    jobTitle: "Accountant",
    url: siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    telephone: "+918306517999",
    email: "komilkoshti@gmail.com",
    sameAs: [
      "https://www.linkedin.com/in/komilkoshti",
      "https://wa.me/918306517999",
    ],
  };

  return <JsonLdScript data={data} />;
}
