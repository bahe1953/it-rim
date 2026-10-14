import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Showcase from "@/components/Showcase";
import { showcaseItems, showcaseLabels } from "@/content/showcase";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, SectionHead } from "@/components/sections";

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
          <Showcase lang={lang} items={showcaseItems(lang).filter((i) => i.kind === "app")} labels={showcaseLabels(lang)} tabs={false} linkCards />
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}
