import type { Metadata } from "next";
import { locales, siteUrl, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Métadonnées d'une page : titre, description, canonical propre à la langue,
 * hreflang fr / ar / x-default et Open Graph localisé.
 * `path` est le chemin SANS préfixe de langue, ex. "/applications/mouhassib" ("" pour l'accueil).
 */
export function pageMetadata(lang: Locale, path: string, title?: string, description?: string): Metadata {
  const d = getDictionary(lang);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteUrl}/${l}${path}`;
  languages["x-default"] = `${siteUrl}/fr${path}`;
  const fullTitle = title ? `${title} · IT-RIM` : d.meta.title;
  const desc = description ?? d.meta.description;
  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description: desc,
    alternates: { canonical: `${siteUrl}/${lang}${path}`, languages },
    openGraph: {
      type: "website",
      siteName: "IT-RIM",
      title: fullTitle,
      description: desc,
      url: `${siteUrl}/${lang}${path}`,
      locale: lang === "ar" ? "ar_MR" : "fr_MR",
      alternateLocale: lang === "ar" ? ["fr_MR"] : ["ar_MR"],
      images: [{ url: "/images/hero-nouakchott.webp" }],
    },
  };
}
