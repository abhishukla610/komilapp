import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services-data";
import { ServicePageTemplate } from "@/components/services/service-page-template";

const service = getServiceBySlug("pan-card-correction");

export const metadata = constructMetadata({
  title: service?.title ?? "PAN Card Correction",
  description: service?.shortDescription,
  pathname: "/services/pan-card-correction",
});

export default function PanCardCorrectionPage() {
  if (!service) return notFound();
  return <ServicePageTemplate service={service} />;
}
