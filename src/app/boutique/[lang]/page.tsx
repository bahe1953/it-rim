import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { storeText } from "@/content/store";
import { pageMetadata } from "@/lib/seo";
import StoreHome from "@/components/StoreHome";

export async function generateMetadata({ params }: PageProps<"/boutique/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "", storeText[lang].title, storeText[lang].lead);
}

/** Accueil de la boutique : présentation des logiciels vendus en ligne, achat, étapes et questions. */
export default async function StoreHomePage({ params }: PageProps<"/boutique/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <StoreHome lang={lang} />;
}
