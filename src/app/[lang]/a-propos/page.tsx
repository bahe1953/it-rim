import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { Bulb, Globe, Growth, Pin, Screen } from "@/components/icons";
import { ContactSection, ProcessSection, SectionHead } from "@/components/sections";

export async function generateMetadata({ params }: PageProps<"/[lang]/a-propos">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/a-propos", d.aboutPage.title, d.aboutPage.lead);
}

export default async function AboutPage({ params }: PageProps<"/[lang]/a-propos">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const icons = [<Pin key="1" size={22} />, <Screen key="2" />, <Globe key="3" size={22} />, <Bulb key="4" size={22} />, <Growth key="5" size={22} />];
  return (
    <>
      <section className="hero">
        <div className="wrap relative z-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div className="grid content-start gap-4">
            <p className="eyebrow">{d.why.eyebrow}</p>
            <h1 className="text-[clamp(32px,4.2vw,50px)]">{d.aboutPage.title}</h1>
            <p className="text-[clamp(18px,2vw,22px)] font-bold text-blue">{d.aboutPage.lead}</p>
          </div>
          <div className="prose-it self-end">{d.aboutPage.body.map((b) => <p key={b}>{b}</p>)}</div>
        </div>
      </section>
      <section className="sec !pt-4">
        <div className="wrap">
          <SectionHead title={d.why.title} />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {d.why.items.map(([t, s], i) => (
              <div key={t} className="card grid content-start gap-3 p-6">
                <span className="grid size-11 place-items-center rounded-full bg-mist text-blue">{icons[i]}</span>
                <h3 className="text-lg">{t}</h3><p className="text-ink-soft">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProcessSection lang={lang} />
      <ContactSection lang={lang} />
    </>
  );
}
