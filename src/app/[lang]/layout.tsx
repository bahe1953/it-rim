import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "../globals.css";

import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { dirOf, hasLocale, locales, siteUrl } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#ffffff", width: "device-width", initialScale: 1, viewportFit: "cover" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "");
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);

  const nav = [
    { href: `/${lang}`, label: d.nav.home },
    { href: `/${lang}/applications`, label: d.nav.apps },
    { href: `/${lang}/realisations`, label: d.nav.work },
    { href: `/${lang}/expertise`, label: d.nav.expertise },
    { href: `/${lang}/a-propos`, label: d.nav.about },
    { href: `/${lang}/contact`, label: d.nav.contact },
  ];

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "IT-RIM",
    url: siteUrl,
    email: site.email,
    slogan: "Digital Products & Business Solutions",
    address: { "@type": "PostalAddress", addressLocality: "Nouakchott", addressCountry: "MR" },
    contactPoint: [{ "@type": "ContactPoint", telephone: "+22243459222", contactType: "customer service", availableLanguage: ["fr", "ar"] }],
  };

  return (
    <html lang={lang} dir={dirOf(lang)}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow">{d.common.skip}</a>
        <Header
          lang={lang}
          nav={nav}
          whatsappUrl={site.whatsappUrl}
          labels={{ requestProject: d.common.requestProject, menu: d.common.menu, close: d.common.close, language: d.common.language, tagline: d.common.tagline }}
        />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <WhatsAppFloat url={site.whatsappUrl} label="WhatsApp" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
