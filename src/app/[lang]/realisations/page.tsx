import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { ContactSection, SectionHead, WorkShowcase } from "@/components/sections";

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
      <WorkShowcase lang={lang} withHead={false} />
      <ContactSection lang={lang} />
    </>
  );
}
