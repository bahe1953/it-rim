import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { ContactSection, SectionHead } from "@/components/sections";
import Showcase from "@/components/Showcase";
import { showcaseItems, showcaseLabels } from "@/content/showcase";

export async function generateMetadata({ params }: PageProps<"/[lang]/realisations">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/realisations", d.workPage.title, d.workPage.subtitle);
}

export default async function WorkPage({ params }: PageProps<"/[lang]/realisations">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <>
      <section className="hero !pb-10">
        <div className="wrap relative z-10"><SectionHead as="h1" eyebrow={d.work.eyebrow} title={d.workPage.title} subtitle={d.work.subtitle} /></div>
      </section>
      <section className="sec !pt-4">
        <div className="wrap">
          <Showcase lang={lang} items={showcaseItems(lang).filter((i) => i.kind === "web")} labels={showcaseLabels(lang)} tabs={false} />
        </div>
      </section>
      <ContactSection lang={lang} />
    </>
  );
}
