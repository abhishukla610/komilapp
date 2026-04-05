import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services-data";
import { ServicePageTemplate } from "@/components/services/service-page-template";

const service = getServiceBySlug("free-consultation");

export const metadata = constructMetadata({
  title: service?.title ?? "Free Consultation",
  description: service?.shortDescription,
  pathname: "/services/free-consultation",
});

export default function FreeConsultationPage() {
  if (!service) return notFound();
  return <ServicePageTemplate service={service} />;
}
