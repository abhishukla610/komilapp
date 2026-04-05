"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/lib/constants";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const statusRows = [
  { label: "GST Returns", status: "Filed" },
  { label: "ITR Filed", status: "Complete" },
  { label: "Books Balanced", status: "Verified" },
  { label: "PAN Verified", status: "Confirmed" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left column */}
          <div>
            {/* Pill badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Expert Tax &amp; Accounting Services in Ahmedabad
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Smart Accounting Solutions for
              <br />
              <span style={{ color: "#c9a547" }}>Your Business</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              From GST filing to income tax returns, get reliable accounting
              services tailored for small businesses, freelancers, and
              professionals across Ahmedabad and beyond.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                render={<Link href="/contact" />}
                size="lg"
                className="bg-[#c9a547] text-white hover:bg-[#b8943f]"
              >
                Book Free Consultation
              </Button>
              <Button
                render={<Link href="/services" />}
                variant="outline"
                size="lg"
              >
                Explore Services
              </Button>
            </div>

            {/* Stats row */}
            <div className="mt-10 flex gap-8">
              <div>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter target={500} suffix="+" />
                </p>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.stats.returnsLabel}
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter target={4} suffix="+" />
                </p>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.stats.experienceLabel}
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-foreground">
                  <AnimatedCounter target={100} suffix="%" />
                </p>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.stats.complianceLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Right column — desktop only */}
          <div className="hidden md:block">
            <Card className="mx-auto max-w-sm border-0 shadow-lg ring-1 ring-foreground/5">
              <CardContent className="space-y-1">
                <div className="mb-4">
                  <p className="text-base font-semibold text-foreground">
                    Financial Overview
                  </p>
                  <p className="text-sm text-muted-foreground">
                    All systems operational
                  </p>
                </div>
                {statusRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {row.label}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-green-600">
                      <CheckCircle2 className="size-4" />
                      {row.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
