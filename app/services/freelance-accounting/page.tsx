import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services-data";
import { ServicePageTemplate } from "@/components/services/service-page-template";

const service = getServiceBySlug("freelance-accounting");

export const metadata = constructMetadata({
  title: service?.title ?? "Freelance Accounting",
  description: service?.shortDescription,
  pathname: "/services/freelance-accounting",
});

export default function FreelanceAccountingPage() {
  if (!service) return notFound();
  return <ServicePageTemplate service={service} />;
}
