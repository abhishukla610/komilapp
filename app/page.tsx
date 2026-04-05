import { constructMetadata } from "@/lib/seo";
import { Hero } from "@/components/marketing/hero";
import { ServicesOverview } from "@/components/marketing/services-overview";
import { StatsSection } from "@/components/marketing/stats-section";
import { WhyChooseUs } from "@/components/marketing/why-choose-us";
import { Testimonials } from "@/components/marketing/testimonials";
import { FaqSection } from "@/components/marketing/faq-section";
import { ToolsTeaser } from "@/components/marketing/tools-teaser";
import { CtaBanner } from "@/components/marketing/cta-banner";

export const metadata = constructMetadata();

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesOverview />
      <StatsSection />
      <WhyChooseUs />
      <Testimonials />
      <FaqSection />
      <ToolsTeaser />
      <CtaBanner />
    </main>
  );
}
