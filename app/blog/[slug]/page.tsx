import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { constructMetadata } from "@/lib/seo";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return constructMetadata({
      title: "Post Not Found",
      description: "The blog post you are looking for does not exist.",
      pathname: `/blog/${slug}`,
    });
  }

  return constructMetadata({
    title: post.title,
    description: post.description,
    pathname: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const formattedDate = new Date(post.date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />

      <Section className="pt-8 md:pt-12 pb-0">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${slug}` },
          ]}
        />
      </Section>

      {/* Article header */}
      <Section className="pb-0">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="size-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="size-3.5" />
              {post.readingTime} read
            </span>
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-muted-foreground">
            {post.description}
          </p>

          <Separator className="my-6" />

          {/* Author info */}
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="size-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {post.author}
              </p>
              <p className="text-xs text-muted-foreground">
                Accountant &amp; Tax Consultant, Ahmedabad
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Article content */}
      <Section className="pt-8">
        <article className="mx-auto max-w-3xl blog-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Back to blog */}
        <div className="mx-auto max-w-3xl mt-12">
          <Separator className="mb-8" />
          <Button variant="outline" size="lg" render={<Link href="/blog" />}>
            <ArrowLeft className="mr-2 size-4" />
            Back to Blog
          </Button>
        </div>
      </Section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <Section
          eyebrow="Keep Reading"
          title="Related"
          titleAccent="Articles"
          centered
        >
          <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group block"
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col gap-3">
                    <Badge variant="secondary" className="w-fit">
                      {related.category}
                    </Badge>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {related.description}
                    </p>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary">
                      Read More
                      <ArrowRight className="size-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="pb-16">
        <div className="mx-auto max-w-2xl text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="flex flex-col items-center gap-4 py-8">
              <h3 className="text-xl font-semibold text-foreground">
                Need Professional Help?
              </h3>
              <p className="text-muted-foreground max-w-md">
                Get expert guidance on tax planning, GST compliance, and
                accounting from Komil Koshti. Book a free consultation today.
              </p>
              <Button size="lg" render={<Link href="/contact" />}>
                Book a Consultation
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
