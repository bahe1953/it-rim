import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "../../globals.css";

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { dirOf, hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { storeText } from "@/content/store";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { pageMetadata } from "@/lib/seo";

/**
 * Boutique (logiciels.it-rim.net) : uniquement les logiciels, les tarifs, les pages légales et un contact.
 * Aucun lien vers les services IT-RIM, que Paddle n'accepte pas.
 */
export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1, viewportFit: "cover" };

export async function generateMetadata({ params }: LayoutProps<"/boutique/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "", storeText[lang].title, storeText[lang].lead);
}

export default async function StoreLayout({ children, params }: LayoutProps<"/boutique/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const s = storeText[lang];

  const nav = [
    { href: `/${lang}`, label: s.nav.home },
    { href: `/${lang}/tarifs`, label: s.nav.pricing },
    { href: `/${lang}/contact`, label: s.nav.contact },
  ];

  return (
    <html lang={lang} dir={dirOf(lang)}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow">{d.common.skip}</a>
        <Header
          lang={lang}
          nav={nav}
          whatsappUrl={site.whatsappUrl}
          cta={{ href: `/${lang}/tarifs`, label: s.cta }}
          labels={{ requestProject: s.cta, menu: d.common.menu, close: d.common.close, language: d.common.language, tagline: d.common.tagline }}
        />
        <main id="main">{children}</main>
        <Footer lang={lang} store />
        <WhatsAppFloat url={site.whatsappUrl} label="WhatsApp" />
      </body>
    </html>
  );
}
