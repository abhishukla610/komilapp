import { Clock, Lock, MessageCircle, Smartphone } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Card, CardContent } from "@/components/ui/card";

const numberedItems = [
  {
    number: "01",
    title: "Zero Penalty Record",
    description:
      "Every filing is double-checked for accuracy to ensure zero penalties or notices from the tax department.",
  },
  {
    number: "02",
    title: "Custom Pricing",
    description:
      "Transparent, affordable pricing tailored to your business size and needs. No hidden charges.",
  },
  {
    number: "03",
    title: "Direct Expert Access",
    description:
      "Work directly with Komil — no middlemen, no junior staff handling your important financial matters.",
  },
  {
    number: "04",
    title: "Digital-First & Remote-Friendly",
    description:
      "Everything handled online. Share documents via WhatsApp or email from anywhere in India.",
  },
];

const featureTiles = [
  {
    icon: Clock,
    title: "On-Time Guarantee",
    description: "Every deadline met, every single time.",
  },
  {
    icon: Lock,
    title: "100% Confidential",
    description: "Your financial data is always secure.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description: "Quick responses on your preferred platform.",
  },
  {
    icon: Smartphone,
    title: "Fully Remote & Paperless",
    description: "No office visits needed. Everything digital.",
  },
];

export function WhyChooseUs() {
  return (
    <Section>
      <div className="grid gap-12 md:grid-cols-2">
        {/* Left column */}
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#c9a547]">
            Why Choose Me
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built on Trust,
            <br />
            Powered by{" "}
            <span className="text-[#c9a547]">Precision</span>
          </h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            With a commitment to accuracy, transparency, and timely service, I
            help businesses and individuals navigate India&apos;s complex tax
            landscape with confidence.
          </p>

          <div className="mt-8 space-y-6">
            {numberedItems.map((item) => (
              <div key={item.number} className="flex gap-4">
                <span className="flex-shrink-0 font-serif text-2xl font-bold text-[#c9a547]/30">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — 2x2 grid */}
        <div className="grid grid-cols-2 gap-4 self-center">
          {featureTiles.map((tile) => {
            const Icon = tile.icon;
            return (
              <Card key={tile.title} className="border-0 shadow-sm">
                <CardContent className="flex flex-col items-start gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#1a365d]/10">
                    <Icon className="size-5 text-[#1a365d]" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {tile.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
