import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Mail } from "lucide-react";

import { constructMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = constructMetadata({
  title: "Blog",
  description:
    "Financial insights, tax tips, and accounting guides for individuals and businesses in India. Stay informed with the latest updates on GST, Income Tax, and more.",
  pathname: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

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
        {/* Blog posts grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readingTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Read More
                    <ArrowRight className="size-3" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="mx-auto mt-16 max-w-md text-center">
          <div className="flex size-12 mx-auto items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <Mail className="size-6" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Stay Updated
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Subscribe to receive the latest articles and tax tips directly in
            your inbox.
          </p>
          <form className="mt-4 flex gap-2" action="#">
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
