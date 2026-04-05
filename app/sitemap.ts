import { MetadataRoute } from "next";

const baseUrl = "https://komilkoshti.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/services/gst-filing", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/income-tax-return", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/accounting-bookkeeping", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/services/pan-card-correction", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/services/freelance-accounting", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/services/free-consultation", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools/gst-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools/income-tax-calculator", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/tools/gst-reconciliation", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/pricing", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/bulletin", priority: 0.8, changeFrequency: "hourly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
