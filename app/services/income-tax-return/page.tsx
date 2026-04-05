import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import { getServiceBySlug } from "@/lib/services-data";
import { ServicePageTemplate } from "@/components/services/service-page-template";

const service = getServiceBySlug("income-tax-return");

export const metadata = constructMetadata({
  title: service?.title ?? "Income Tax Return (ITR) Filing",
  description: service?.shortDescription,
  pathname: "/services/income-tax-return",
});

export default function IncomeTaxReturnPage() {
  if (!service) return notFound();
  return <ServicePageTemplate service={service} />;
}
