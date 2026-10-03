export const locales = ["fr", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/** Adresse publique du site, utilisée pour les URL absolues (hreflang, sitemap, Open Graph). */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.it-rim.net").replace(/\/$/, "");

/** Remplace le préfixe de langue d'un chemin : /fr/applications -> /ar/applications */
export function swapLocale(pathname: string, target: Locale) {
  const parts = pathname.split("/");
  if (parts.length > 1 && hasLocale(parts[1])) parts[1] = target;
  else parts.splice(1, 0, target);
  return parts.join("/") || `/${target}`;
}
