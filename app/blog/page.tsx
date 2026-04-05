import { Metadata } from "next";
import { BookOpen, ArrowRight } from "lucide-react";

import { constructMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = constructMetadata({
  title: "Blog",
  description:
    "Financial insights, tax tips, and accounting guides for individuals and businesses in India. Stay informed with the latest updates on GST, Income Tax, and more.",
  pathname: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <Section className="pt-8 md:pt-12 pb-0">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
      </Section>

      <Section
        eyebrow="Blog"
        title="Financial Insights &"
        titleAccent="Tax Tips"
        description="Expert articles on GST, Income Tax, accounting best practices, and financial planning for individuals and businesses in India."
        centered
      >
        {/* Coming soon */}
        <div className="mx-auto max-w-lg text-center">
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center gap-4 py-12">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="size-8" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Coming Soon
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                We are working on insightful articles about tax planning, GST
                compliance, and financial tips tailored for Indian taxpayers.
                Stay tuned.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter signup */}
        <div className="mx-auto mt-12 max-w-md text-center">
          <h3 className="text-lg font-semibold text-foreground">
            Get Notified When We Launch
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Subscribe to receive the latest articles and tax tips directly in
            your inbox.
          </p>
          <form
            className="mt-4 flex gap-2"
            action="#"
          >
            <Input
              type="email"
              placeholder="you@example.com"
              className="flex-1"
              required
            />
            <Button type="submit" size="lg">
              Subscribe
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </form>
          <p className="mt-2 text-xs text-muted-foreground">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </Section>
    </>
  );
}
