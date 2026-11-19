import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import PricingContent from "@/components/Pricing";

export async function generateMetadata({ params }: PageProps<"/[lang]/tarifs">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/tarifs", d.pricing.title, d.pricing.lead);
}

export default async function PricingPage({ params }: PageProps<"/[lang]/tarifs">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  return <PricingContent lang={lang} title={d.pricing.title} subtitle={d.pricing.lead} />;
}
