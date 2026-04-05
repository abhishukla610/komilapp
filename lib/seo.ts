import { Metadata } from "next";

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  pathname?: string;
}

const defaultTitle =
  "Komil Koshti | Expert Accounting & Tax Services in Ahmedabad";
const defaultDescription =
  "Professional GST filing, Income Tax Return, Bookkeeping, PAN Card Correction & Freelance Accounting services in Ahmedabad. 500+ returns filed, 100% compliance rate.";
const siteUrl = "https://komilkoshti.com";
const defaultImage = `${siteUrl}/og-image.png`;

export function constructMetadata({
  title,
  description,
  image,
  noIndex = false,
  pathname = "/",
}: MetadataProps = {}): Metadata {
  const resolvedTitle = title
    ? `${title} | Komil Koshti`
    : defaultTitle;
  const resolvedDescription = description || defaultDescription;
  const resolvedImage = image || defaultImage;
  const url = `${siteUrl}${pathname}`;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: "Komil Koshti",
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [resolvedImage],
    },
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
