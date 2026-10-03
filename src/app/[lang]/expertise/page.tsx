import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { ContactSection, ProcessSection, SectionHead, expertiseIcons } from "@/components/sections";

export async function generateMetadata({ params }: PageProps<"/[lang]/expertise">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/expertise", d.expertisePage.title, d.expertise.subtitle);
}

export default async function ExpertisePage({ params }: PageProps<"/[lang]/expertise">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <>
      <section className="hero">
        <div className="wrap relative z-10">
          <SectionHead as="h1" eyebrow={d.expertise.eyebrow} title={d.expertise.title} subtitle={d.expertise.subtitle} />
          <ol className="grid gap-4">
            {d.expertise.items.map(([t, short, long], i) => (
              <li key={t} id={`domaine-${i + 1}`} className="card grid scroll-mt-28 items-center gap-4 p-6 md:grid-cols-[auto_1fr_1.4fr] md:gap-8">
                <span className="grid size-14 place-items-center rounded-full bg-mist text-blue">{expertiseIcons[i]}</span>
                <div><p className="text-sm font-extrabold text-blue">0{i + 1}</p><h2 className="text-xl">{t}</h2><p className="text-sm text-ink-soft">{short}</p></div>
                <p className="text-ink-2">{long}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-canvas py-12">
        <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-3">
          <h2 className="text-base">{d.tech.title}</h2>
          <ul className="ltr flex flex-wrap gap-x-5 gap-y-2 font-mono text-[15px] text-ink-soft">{site.technologies.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>
      <ProcessSection lang={lang} />
      <ContactSection lang={lang} />
    </>
  );
}
