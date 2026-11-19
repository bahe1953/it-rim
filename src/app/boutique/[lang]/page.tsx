import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { storeText } from "@/content/store";
import { pageMetadata } from "@/lib/seo";
import PricingContent from "@/components/Pricing";

export async function generateMetadata({ params }: PageProps<"/boutique/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "", storeText[lang].title, storeText[lang].lead);
}

/** Accueil de la boutique : le catalogue des logiciels avec leur prix. */
export default async function StoreHome({ params }: PageProps<"/boutique/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const s = storeText[lang];
  return <PricingContent lang={lang} title={s.title} subtitle={s.lead} />;
}
