/** Boutique : même page que le site principal, seulement pour les logiciels vendus en ligne. */
import { locales } from "@/i18n/config";
import { sellableProducts } from "@/content/pricing";

export { default, generateMetadata } from "@/app/[lang]/applications/[slug]/page";
export const generateStaticParams = () => locales.flatMap((lang) => sellableProducts.map((p) => ({ lang, slug: p.slug })));
export const dynamicParams = false;
