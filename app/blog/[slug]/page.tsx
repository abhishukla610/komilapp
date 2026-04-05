import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { constructMetadata } from "@/lib/seo";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = constructMetadata({
  title: "Blog Post",
  description:
    "Financial insights and tax tips by Komil Koshti, accounting and tax expert in Ahmedabad.",
  pathname: "/blog",
});

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <Section className="pt-8 md:pt-12 pb-0">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: "Post", href: `/blog/${slug}` },
          ]}
        />
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Post Not Found
          </h1>
          <p className="mt-4 text-muted-foreground">
            The blog post you are looking for does not exist or has not been
            published yet. Our blog is launching soon with financial insights and
            tax tips.
          </p>
          <div className="mt-8">
            <Button size="lg" render={<Link href="/blog" />}>
              <ArrowLeft className="mr-2 size-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
