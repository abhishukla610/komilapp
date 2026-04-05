import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function CtaBanner() {
  return (
    <section className="bg-[#c9a547] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Get Your Finances in Order?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          Book a free 30-minute consultation and let&apos;s discuss how I can
          help streamline your accounting and tax compliance.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            render={<Link href="/contact" />}
            size="lg"
            className="bg-[#1a365d] text-white hover:bg-[#1a365d]/90"
          >
            Book Free Consultation
          </Button>
          <Button
            render={
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10 hover:text-white"
          >
            WhatsApp Us
          </Button>
        </div>
      </div>
    </section>
  );
}
