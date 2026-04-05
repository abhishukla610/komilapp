import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services-data";
import { ServicePageTemplate } from "@/components/services/service-page-template";

const service = getServiceBySlug("gst-filing");

export const metadata = constructMetadata({
  title: service?.title ?? "GST Filing & Registration",
  description: service?.shortDescription,
  pathname: "/services/gst-filing",
});

export default function GstFilingPage() {
  if (!service) return notFound();
  return <ServicePageTemplate service={service} />;
}
