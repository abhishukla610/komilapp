import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services-data";
import { ServicePageTemplate } from "@/components/services/service-page-template";

const service = getServiceBySlug("accounting-bookkeeping");

export const metadata = constructMetadata({
  title: service?.title ?? "Accounting & Bookkeeping",
  description: service?.shortDescription,
  pathname: "/services/accounting-bookkeeping",
});

export default function AccountingBookkeepingPage() {
  if (!service) return notFound();
  return <ServicePageTemplate service={service} />;
}
