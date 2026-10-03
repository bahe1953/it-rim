import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/i18n/config";
import { products } from "@/content/products";
import { projects } from "@/content/projects";

const paths = [
  "", "/applications", "/realisations", "/expertise", "/a-propos", "/contact", "/confidentialite", "/conditions",
  ...products.map((p) => `/applications/${p.slug}`),
  ...projects.map((p) => `/realisations/${p.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/applications") ? 0.9 : 0.6,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])) },
    })),
  );
}
