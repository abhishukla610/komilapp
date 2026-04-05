import { Metadata } from "next";

import { constructMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/constants";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for Komil Koshti accounting and taxation services. Read our terms regarding services, payments, confidentiality, and liability.",
  pathname: "/terms",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <>
      <Section className="pt-8 md:pt-12 pb-0">
        <Breadcrumbs items={[{ label: "Terms of Service", href: "/terms" }]} />
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated: 1 April 2026
          </p>

          <div className="mt-10 space-y-10 text-sm leading-relaxed text-muted-foreground [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
            <section>
              <h2>1. Services</h2>
              <p>
                Komil Koshti (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
                &ldquo;our&rdquo;) provides professional accounting, taxation,
                bookkeeping, and advisory services to individuals and businesses.
                The specific scope of services for each engagement will be agreed
                upon before work begins.
              </p>
              <p className="mt-3">
                We reserve the right to decline any engagement at our discretion.
                The services we provide are based on the information and
                documents you supply. We are not responsible for errors arising
                from incomplete or inaccurate information provided by you.
              </p>
            </section>

            <section>
              <h2>2. Client Obligations</h2>
              <p>As a client, you agree to:</p>
              <ul className="mt-3">
                <li>
                  Provide accurate, complete, and timely information and
                  documents required for the services
                </li>
                <li>
                  Respond to our queries and requests for clarification within a
                  reasonable timeframe
                </li>
                <li>
                  Review and verify all filings, returns, and documents before
                  final submission
                </li>
                <li>
                  Pay fees as agreed upon in the engagement terms
                </li>
              </ul>
            </section>

            <section>
              <h2>3. Payment Terms</h2>
              <p>
                Fees for our services are communicated upfront before the
                commencement of work. Payment is expected as per the agreed
                schedule. For recurring services (such as monthly GST filing or
                bookkeeping), fees are due at the beginning of each billing
                cycle.
              </p>
              <p className="mt-3">
                Late payments may result in suspension of services until
                outstanding amounts are cleared. All fees are non-refundable once
                the service has been rendered, unless otherwise agreed in
                writing.
              </p>
            </section>

            <section>
              <h2>4. Confidentiality</h2>
              <p>
                We treat all client information with strict confidentiality. Your
                personal, financial, and business data will not be disclosed to
                any third party except as required for providing the agreed
                services (such as filing with government authorities) or as
                required by law.
              </p>
              <p className="mt-3">
                This confidentiality obligation survives the termination of our
                engagement and continues indefinitely.
              </p>
            </section>

            <section>
              <h2>5. Limitation of Liability</h2>
              <p>
                Our services are provided on a best-effort basis in accordance
                with applicable laws and professional standards. While we strive
                for accuracy in all work, we shall not be liable for:
              </p>
              <ul className="mt-3">
                <li>
                  Losses arising from inaccurate or incomplete information
                  provided by the client
                </li>
                <li>
                  Changes in tax laws, regulations, or government policies after
                  filings have been submitted
                </li>
                <li>
                  Delays caused by government portals, technical issues, or
                  factors beyond our control
                </li>
                <li>
                  Indirect, consequential, or incidental damages of any kind
                </li>
              </ul>
              <p className="mt-3">
                Our total liability for any claim shall not exceed the fees paid
                by you for the specific service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2>6. Termination</h2>
              <p>
                Either party may terminate the engagement by providing written
                notice. Upon termination, you are responsible for payment of fees
                for services already rendered. We will return all original
                documents provided by you and provide reasonable assistance in
                transitioning to another service provider.
              </p>
            </section>

            <section>
              <h2>7. Governing Law & Jurisdiction</h2>
              <p>
                These Terms of Service are governed by and construed in
                accordance with the laws of India. Any disputes arising out of or
                in connection with these terms shall be subject to the exclusive
                jurisdiction of the courts in Ahmedabad, Gujarat, India.
              </p>
            </section>

            <section>
              <h2>8. Changes to These Terms</h2>
              <p>
                We may update these Terms of Service from time to time. Any
                changes will be posted on this page with an updated revision
                date. Continued use of our services after changes are posted
                constitutes acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2>9. Contact</h2>
              <p>
                If you have any questions about these Terms of Service, please
                contact us:
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
