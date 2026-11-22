import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import PricingContent from "@/components/Pricing";

/** Boutique : même page Tarifs que le site principal, sans liens vers les fiches non vendues en ligne. */
export { generateMetadata } from "@/app/[lang]/tarifs/page";

export default async function StorePricingPage({ params }: PageProps<"/boutique/[lang]/tarifs">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  return <PricingContent lang={lang} title={d.pricing.title} subtitle={d.pricing.lead} store />;
}
