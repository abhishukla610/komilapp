import { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin, ExternalLink, MessageCircle } from "lucide-react";

import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = constructMetadata({
  title: "Contact",
  description:
    "Get in touch with Komil Koshti for accounting, GST filing, income tax, and bookkeeping services in Ahmedabad. Call, WhatsApp, or fill out our contact form.",
  pathname: "/contact",
});

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 83065 17999",
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Clock,
    label: "Working Hours",
    value: siteConfig.workingHours,
    href: null,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.address,
    href: null,
  },
];

const socialLinks = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: siteConfig.whatsapp,
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    href: siteConfig.linkedin,
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="pt-8 md:pt-12 pb-0">
        <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      </Section>

      <Section
        eyebrow="Get In Touch"
        title="Let's Discuss Your"
        titleAccent="Financial Needs"
        description="Have a question about our services or need help with your taxes? Reach out and we will respond within 24 hours."
      >
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left column: Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-5">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <p className="text-sm font-semibold text-foreground">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Connect with us
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <Button
                    key={link.label}
                    variant="outline"
                    size="icon"
                    render={
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                      />
                    }
                  >
                    <link.icon className="size-4" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Contact form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-2">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Google Maps embed */}
      <Section title="Find Us" centered>
        <div className="overflow-hidden rounded-xl border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235013.74847494!2d72.43965535!3d23.020474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Komil Koshti Office Location - Ahmedabad, Gujarat"
          />
        </div>
      </Section>
    </>
  );
}
