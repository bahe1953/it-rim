import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Product } from "@/content/products";
import { projects, workCategories } from "@/content/projects";
import { releaseUrl, releases } from "@/content/releases";
import { site } from "@/content/site";
import ContactForm from "./ContactForm";
import {
  Arrow, Bulb, Check, Chip, Code, Flask, Globe, Growth, Headset, Layers, Mail, Monitor, Network, ProductIcon, Rocket, Screen, Search, WhatsApp,
} from "./icons";

export function SectionHead({ eyebrow, title, subtitle, action, as = "h2" }: { eyebrow?: string; title: string; subtitle?: string; action?: ReactNode; as?: "h1" | "h2" }) {
  const H = as;
  return (
    <div className="head">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <H className={as === "h1" ? "text-[clamp(32px,4.2vw,48px)]" : "h2"}>{title}</H>
        {subtitle && <p className="sub">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* ---------- Carte application ---------- */
export function ProductCard({ p, lang }: { p: Product; lang: Locale }) {
  const d = getDictionary(lang);
  const href = `/${lang}/applications/${p.slug}`;
  return (
    <article className={`acc-${p.accent} group card lift flex min-w-0 flex-col gap-4 px-[18px] pt-[22px] pb-[18px]`}>
      <div className="flex items-center gap-3">
        <span className="p-icon size-12 rounded-[14px]"><ProductIcon accent={p.accent} /></span>
        <div>
          <h3 className="text-[19px]"><Link href={href} className="hover:text-[var(--c)]">{p.name[lang]}</Link></h3>
          <p className="text-[13px] font-semibold leading-snug text-[var(--c)]">{p.category[lang]}</p>
          {p.developedBy && <p className="text-[11.5px] font-medium text-ink-soft">{p.developedBy[lang]}</p>}
        </div>
      </div>
      <p className="text-[14.5px] text-ink-2 md:min-h-[4.8em]">{p.summary[lang]}</p>
      <div className="relative -mx-1.5 aspect-[254/108] overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,#fff,var(--cb))]">
        <Image src={p.image} alt={p.name[lang]} fill sizes="(max-width: 620px) 90vw, (max-width: 1120px) 45vw, 280px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-[linear-gradient(90deg,transparent,var(--cg),transparent)]" />
      </div>
      <ul className="grid gap-[7px] text-sm">
        {p.features[lang].slice(0, 5).map((f) => (
          <li key={f} className="flex items-center gap-2.5"><Check className="shrink-0 text-[var(--c)]" />{f}</li>
        ))}
      </ul>
      <div className="mt-auto grid gap-2.5">
        <Link href={href} className="btn btn-acc min-h-[46px] rounded-[11px] text-[14.5px]">{d.common.discover} {p.name[lang]}<Arrow /></Link>
        {p.trial.enabled ? (
          <Link href={releaseUrl(releases[p.slug], lang) ? `${href}#telecharger` : `${href}/essai`} className="btn btn-try min-h-11 rounded-[11px] text-sm"><Flask />{d.common.tryFree}</Link>
        ) : (
          <Link href={`/${lang}/contact`} className="btn btn-try min-h-11 rounded-[11px] text-sm">{d.common.requestDemo}</Link>
        )}
      </div>
    </article>
  );
}

/* ---------- Bande d'atouts ---------- */
export function StrengthsBand({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const icons = [<Layers key="a" />, <Flask key="b" size={28} />, <Headset key="c" />, <Growth key="d" />];
  return (
    <section className="band" aria-label={d.strengths.map((s) => s[0]).join(", ")}>
      <div className="wrap relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {d.strengths.map(([t, s], i) => (
          <div key={t} className="flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white text-blue shadow-[var(--shadow-card)]">{icons[i]}</span>
            <div><h3 className="mb-0.5 text-base">{t}</h3><p className="text-[13.5px] leading-normal text-ink-soft">{s}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Réalisation vedette ---------- */
export function WorkShowcase({ lang, withHead = true }: { lang: Locale; withHead?: boolean }) {
  const d = getDictionary(lang);
  const p = projects[0];
  return (
    <section className="sec" id="realisations">
      <div className="wrap">
        {withHead && (
          <SectionHead eyebrow={d.work.eyebrow} title={d.work.title} subtitle={d.work.subtitle}
            action={<Link href={`/${lang}/realisations`} className="btn btn-o">{d.work.all}<Arrow /></Link>} />
        )}
        <div className="grid gap-5 lg:grid-cols-[2.6fr_1fr]">
          <article className="card grid items-center gap-6 p-3.5 md:grid-cols-[1.15fr_1fr] md:gap-8 md:p-5">
            <div className="laptop"><Image src={p.image} alt={p.name[lang]} width={1062} height={664} sizes="(max-width: 860px) 90vw, 460px" className="block h-auto w-full rounded-md" /></div>
            <div className="grid min-w-0 gap-3.5 pe-2">
              <span className="w-fit rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">{p.type[lang]}</span>
              <h3 className="text-[clamp(22px,2.2vw,27px)]">{p.name[lang]}</h3>
              <p className="text-[15px] text-ink-2">{p.summary[lang]}</p>
              <div className="flex flex-wrap gap-x-3.5 gap-y-2 text-[13px] font-semibold text-ink-2">
                <span className="inline-flex items-center gap-1.5"><Globe size={15} className="text-blue" />FR / العربية</span>
                {p.technologies.map((t) => <span key={t} className="inline-flex items-center gap-1.5"><Check size={14} className="text-blue" />{t}</span>)}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener" className="btn btn-p min-h-[46px] text-sm">{d.work.visit}<Arrow /></a>
                ) : (
                  <span className="btn min-h-[46px] cursor-default border border-dashed border-line text-sm font-semibold text-ink-soft">{d.work.urlPending}</span>
                )}
                <Link href={`/${lang}/realisations/${p.slug}`} className="btn btn-o min-h-[46px] rounded-xl">{d.work.details}</Link>
              </div>
            </div>
          </article>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {workCategories.map((c) => (
              <Link key={c.name.fr} href={`/${lang}/realisations`} className="card lift flex items-center gap-3.5 p-3">
                <Image src={c.image} alt="" width={72} height={70} className="h-[70px] w-[72px] shrink-0 rounded-xl bg-mist object-cover" />
                <span><b className="block text-[15px] font-extrabold">{c.name[lang]}</b><small className="block text-[13px] font-semibold text-blue">{c.sub[lang]}</small></span>
                <span className="ms-auto text-blue"><Arrow size={18} /></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Processus + CTA ---------- */
export function ProcessSection({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const icons = [<Search key="1" />, <Bulb key="2" />, <Code key="3" />, <Rocket key="4" />, <Growth key="5" size={26} />];
  return (
    <section className="sec bg-[linear-gradient(180deg,#fff,#f5faff)]" id="processus">
      <div className="wrap">
        <SectionHead eyebrow={d.process.eyebrow} title={d.process.title} subtitle={d.process.subtitle} />
        <div className="grid items-center gap-7 lg:grid-cols-[2.6fr_1fr]">
          <ol className="grid grid-cols-1 gap-[22px] md:grid-cols-5 md:gap-4">
            {d.process.steps.map(([t, s], i) => (
              <li key={t} className="step grid grid-cols-[60px_1fr] content-start gap-x-4 gap-y-1.5 md:grid-cols-1">
                <span className="step-ic row-span-3 md:row-span-1">{icons[i]}</span>
                <span className="mt-1 text-[13px] font-extrabold md:mt-2">0{i + 1}</span>
                <h3 className="text-[16.5px]">{t}</h3>
                <p className="col-start-2 text-[13.5px] leading-normal text-ink-soft md:col-start-1">{s}</p>
              </li>
            ))}
          </ol>
          <aside className="cta-card grid gap-3 px-6.5 py-7.5">
            <h2 className="text-2xl">{d.process.ctaTitle}</h2>
            <p className="text-[15px] text-[#e3f3ff]">{d.process.ctaText}</p>
            <Link href={`/${lang}/contact`} className="btn mt-1.5 w-fit bg-white text-ink">{d.process.ctaButton}<Arrow /></Link>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- Expertise ---------- */
export const expertiseIcons = [<Search key="1" size={22} />, <Monitor key="2" />, <Screen key="3" />, <Network key="4" />, <Chip key="5" />];

export function ExpertiseSection({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  return (
    <section className="sec" id="expertise">
      <div className="wrap">
        <SectionHead eyebrow={d.expertise.eyebrow} title={d.expertise.title} subtitle={d.expertise.subtitle} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {d.expertise.items.map(([t, s], i) => (
            <Link key={t} href={`/${lang}/expertise#domaine-${i + 1}`}
              className="relative grid content-start gap-2.5 rounded-[18px] border border-line bg-[linear-gradient(180deg,#fff,#f7fbff)] px-[18px] py-5 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-sky-l">
              <span className="grid size-[46px] place-items-center rounded-full bg-mist text-blue">{expertiseIcons[i]}</span>
              <h3 className="mt-2 text-base">{t}</h3>
              <p className="pe-5 text-[13.5px] leading-normal text-ink-soft">{s}</p>
              <span className="absolute end-4 bottom-5 text-blue"><Arrow /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
export function ContactSection({ lang, as = "h2" }: { lang: Locale; as?: "h1" | "h2" }) {
  const d = getDictionary(lang);
  const H = as;
  return (
    <section className="sec bg-[linear-gradient(180deg,#fff,#f1f8ff)]" id="contact">
      <div className="wrap grid items-start gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        <div className="grid gap-4.5">
          <p className="eyebrow">{d.contact.eyebrow}</p>
          <H className={as === "h1" ? "text-[clamp(32px,4.2vw,48px)]" : "h2"}>{d.contact.title}</H>
          <p className="sub">{d.contact.subtitle}</p>
          <a href={site.whatsappUrl} target="_blank" rel="noopener" className="btn btn-wa w-fit"><WhatsApp />{d.contact.talk}</a>
          <a href={site.whatsappUrl} target="_blank" rel="noopener" className="card flex items-center gap-3.5 px-4 py-3.5">
            <span className="grid size-[42px] place-items-center rounded-xl bg-green-50 text-wa"><WhatsApp size={20} /></span>
            <span><small className="block text-[13px] text-ink-soft">{d.common.whatsapp}</small><b className="ltr text-[15.5px]">{site.whatsappDisplay}</b></span>
          </a>
          <a href={`mailto:${site.email}`} className="card flex items-center gap-3.5 px-4 py-3.5">
            <span className="grid size-[42px] place-items-center rounded-xl bg-mist text-blue"><Mail size={20} /></span>
            <span><small className="block text-[13px] text-ink-soft">{d.common.email}</small><b className="ltr text-[15.5px]">{site.email}</b></span>
          </a>
        </div>
        <ContactForm lang={lang} labels={d.contact.form} whatsappUrl={site.whatsappUrl} />
      </div>
    </section>
  );
}
