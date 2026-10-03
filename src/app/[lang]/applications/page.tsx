import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { products } from "@/content/products";
import { pageMetadata } from "@/lib/seo";
import { ContactSection, ProductCard, SectionHead, StrengthsBand } from "@/components/sections";

export async function generateMetadata({ params }: PageProps<"/[lang]/applications">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/applications", d.appsPage.title, d.appsPage.subtitle);
}

export default async function AppsPage({ params }: PageProps<"/[lang]/applications">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <>
      <section className="hero !pb-24">
        <div className="wrap relative z-10">
          <SectionHead as="h1" eyebrow={d.apps.eyebrow} title={d.appsPage.title} subtitle={d.appsPage.subtitle} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((p) => <ProductCard key={p.slug} p={p} lang={lang} />)}
          </div>
        </div>
      </section>
      <StrengthsBand lang={lang} />
      <ContactSection lang={lang} />
    </>
  );
}
