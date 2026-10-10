import type { Metadata } from "next";
import { locales, siteUrl, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Métadonnées d'une page : titre, description, canonical propre à la langue,
 * hreflang fr / ar / x-default et Open Graph localisé.
 * `path` est le chemin SANS préfixe de langue, ex. "/applications/mouhassib" ("" pour l'accueil).
 */
export function pageMetadata(lang: Locale, path: string, title?: string, description?: string, image?: string): Metadata {
  const d = getDictionary(lang);
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteUrl}/${l}${path}`;
  languages["x-default"] = `${siteUrl}/fr${path}`;
  const fullTitle = title ? `${title} · IT-RIM` : d.meta.title;
  const desc = description ?? d.meta.description;
  // Image de partage 1200 × 630 : celle de la page si fournie, sinon celle de l'accueil dans la langue.
  const ogImage = image ?? `/og/home-${lang}.jpg`;
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
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description: desc, images: [ogImage] },
  };
}
