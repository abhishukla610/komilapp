"use client";

import { Star } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Rajesh Patel",
    service: "GST Filing",
    quote:
      "Komil made GST filing completely stress-free. My returns are always filed on time and I have never received a single penalty notice.",
  },
  {
    name: "Priya Mehta",
    service: "Income Tax Return",
    quote:
      "Very professional and thorough with ITR filing. He found deductions I didn't even know about and got me a higher refund than expected.",
  },
  {
    name: "Ankit Sharma",
    service: "Bookkeeping",
    quote:
      "My books are always up to date now. The monthly reports help me understand my business finances so much better.",
  },
  {
    name: "Sneha Desai",
    service: "Freelance Accounting",
    quote:
      "As a freelancer, taxes were confusing. Komil simplified everything and handles all my filings. Highly recommend for freelancers.",
  },
  {
    name: "Vikram Joshi",
    service: "Business Registration",
    quote:
      "Got my GST registration done in just a few days. The entire process was handled remotely via WhatsApp. Excellent service.",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-4 fill-[#c9a547] text-[#c9a547]"
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <Card className="w-[320px] flex-shrink-0 border-0 shadow-sm">
      <CardContent className="flex flex-col gap-3">
        <StarRating />
        <p className="text-sm text-muted-foreground leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="mt-auto pt-2">
          <p className="text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {testimonial.service}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  const duplicated = [...testimonials, ...testimonials];

  return (
    <Section
      eyebrow="What Clients Say"
      title="Trusted by Businesses"
      titleAccent="Across Gujarat"
      centered
    >
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

        {/* Scrolling track */}
        <div className="flex gap-6 animate-marquee">
          {duplicated.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Marquee animation via inline style tag */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </Section>
  );
}
