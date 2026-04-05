import { Metadata } from "next";

import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Komil Koshti accounting services. Learn how we collect, use, and protect your personal information.",
  pathname: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Section className="pt-8 md:pt-12 pb-0">
        <Breadcrumbs
          items={[{ label: "Privacy Policy", href: "/privacy-policy" }]}
        />
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: 1 April 2026
          </p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
            <section>
              <h2>1. Information We Collect</h2>
              <p>
                We collect information that you voluntarily provide when using
                our services or contacting us. This may include:
              </p>
              <ul className="mt-3">
                <li>
                  Personal identification information (name, email address,
                  phone number, PAN, Aadhaar details)
                </li>
                <li>
                  Financial information (income details, bank statements,
                  investment records, tax documents)
                </li>
                <li>
                  Business information (GST details, business registration
                  documents, invoices)
                </li>
                <li>
                  Communication data (messages sent via our contact form, email,
                  or WhatsApp)
                </li>
              </ul>
            </section>

            <section>
              <h2>2. How We Use Your Information</h2>
              <p>The information we collect is used to:</p>
              <ul className="mt-3">
                <li>
                  Provide accounting, taxation, and advisory services as
                  requested
                </li>
                <li>
                  Prepare and file GST returns, Income Tax Returns, and other
                  statutory filings on your behalf
                </li>
                <li>
                  Communicate with you about your account, services, and
                  deadlines
                </li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Improve our services and respond to your feedback</li>
              </ul>
            </section>

            <section>
              <h2>3. Information Sharing & Disclosure</h2>
              <p>
                We do not sell, rent, or share your personal or financial
                information with third parties except in the following
                circumstances:
              </p>
              <ul className="mt-3">
                <li>
                  When required to file returns or documents with government
                  authorities (Income Tax Department, GST Network, etc.) as part
                  of our professional services
                </li>
                <li>
                  When required by law, legal process, or government request
                </li>
                <li>With your explicit written consent</li>
              </ul>
            </section>

            <section>
              <h2>4. Data Security</h2>
              <p>
                We take the security of your information seriously. We implement
                appropriate technical and organisational measures to protect your
                data against unauthorised access, alteration, disclosure, or
                destruction. All sensitive documents are stored securely and
                access is restricted to authorised personnel only.
              </p>
              <p className="mt-3">
                In compliance with the Information Technology Act, 2000 and its
                associated rules, we maintain reasonable security practices and
                procedures to protect sensitive personal data.
              </p>
            </section>

            <section>
              <h2>5. Cookies</h2>
              <p>
                Our website may use essential cookies to ensure proper
                functionality. These cookies do not collect personal information
                and are necessary for the website to operate correctly. We do not
                use tracking or advertising cookies.
              </p>
            </section>

            <section>
              <h2>6. Data Retention</h2>
              <p>
                We retain your personal and financial data for as long as
                necessary to provide our services and comply with legal
                obligations. Tax-related documents are retained for a minimum of
                8 years as required under Indian tax laws. You may request
                deletion of your data (subject to legal retention requirements)
                by contacting us.
              </p>
            </section>

            <section>
              <h2>7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. Any significant
                changes will be communicated via our website. We encourage you to
                review this page periodically.
              </p>
            </section>

            <section>
              <h2>8. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or how we
                handle your data, please contact us:
              </p>
              <ul className="mt-3">
                <li>
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-primary underline underline-offset-3 hover:text-primary/80"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>Phone: +91 83065 17999</li>
                <li>Location: {siteConfig.address}</li>
              </ul>
            </section>
          </div>
        </div>
      </Section>
    </>
  );
}
