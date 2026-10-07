import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale, siteUrl } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { products } from "@/content/products";
import HeroShowcase from "@/components/HeroShowcase";
import Showcase from "@/components/Showcase";
import { showcaseItems, showcaseLabels } from "@/content/showcase";
import { Arrow, Globe, Grid, Play, Shield, Users } from "@/components/icons";
import {
  ContactSection, ExpertiseSection, ProcessSection, StrengthsBand,
} from "@/components/sections";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const badgeIcons = [<Globe key="g" />, <Shield key="s" />, <Users key="u" />];

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap relative z-10 grid items-center gap-6 md:grid-cols-[1.12fr_1fr] md:gap-12">
          <div className="grid min-w-0 gap-5.5">
            <h1 id="hero-title" className="rise text-[clamp(34px,4.2vw,52px)]">
              {d.hero.titleBefore}<span className="hl">{d.hero.titleHl1}</span>{d.hero.titleMid}<span className="hl">{d.hero.titleHl2}</span>
            </h1>
            <p className="rise rise-2 max-w-[60ch] text-[clamp(16.5px,1.6vw,19px)] text-ink-2">{d.hero.subtitle}</p>
            <div className="rise rise-3 flex flex-wrap gap-3">
              <Link href={`/${lang}/applications`} className="btn btn-p max-sm:flex-[1_1_100%]"><Grid />{d.hero.ctaApps}<Arrow /></Link>
              <Link href={`/${lang}/realisations`} className="btn btn-w max-sm:flex-[1_1_100%]">
                <span className="grid size-[26px] place-items-center rounded-full bg-mist text-blue"><Play /></span>{d.hero.ctaWork}
              </Link>
            </div>
            <ul className="rise rise-4 mt-2 flex flex-wrap gap-x-6.5 gap-y-4">
              {d.hero.badges.map((b, i) => (
                <li key={b} className="flex max-w-[180px] items-center gap-2.5 text-[13px] leading-snug font-semibold text-ink-2">
                  <span className="badge-ic">{badgeIcons[i]}</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-w-0 max-md:order-first">
            <HeroShowcase lang={lang} minis={products.filter((p) => ["waqood", "manzeel", "raqib"].includes(p.slug)).map((p) => ({ src: `/images/cards/${p.slug}-${lang}.webp`, name: p.name[lang], color: ({ w: "#EA6A0C", z: "#15924B", r: "#5650D6", m: "#1E7FD8", p: "#0273B8", b: "#B45309", q: "#16325C" } as const)[p.accent] }))} />
          </div>
        </div>
      </section>

      {/* LOGICIELS ET RÉALISATIONS */}
      <section className="sec !pt-6 md:!pt-10" id="applications" aria-labelledby="apps-title">
        <div className="wrap">
          <div className="head">
            <div>
              <p className="eyebrow">{d.showcase.eyebrow}</p>
              <h2 id="apps-title" className="h2">{d.showcase.title}</h2>
              <p className="sub">{d.showcase.subtitle}</p>
            </div>
            <Link href={`/${lang}/applications`} className="btn btn-o">{d.apps.all}<Arrow /></Link>
          </div>
          <Showcase lang={lang} items={showcaseItems(lang)} labels={showcaseLabels(lang)} />
        </div>
      </section>

      <StrengthsBand lang={lang} />
      <ProcessSection lang={lang} />
      <ExpertiseSection lang={lang} />
      <ContactSection lang={lang} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name[lang], url: `${siteUrl}/${lang}/applications/${p.slug}` })),
      }) }} />
    </>
  );
}
