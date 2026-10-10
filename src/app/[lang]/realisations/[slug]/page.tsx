import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { Arrow, Check } from "@/components/icons";

export const dynamicParams = false;
export const generateStaticParams = () => locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/realisations/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!hasLocale(lang) || !p) return {};
  return pageMetadata(lang, `/realisations/${slug}`, p.name[lang], p.summary[lang]);
}

export default async function CaseStudy({ params }: PageProps<"/[lang]/realisations/[slug]">) {
  const { lang, slug } = await params;
  const p = getProject(slug);
  if (!hasLocale(lang) || !p) notFound();
  const d = getDictionary(lang);
  const s = d.work.sections;
  const cs = p.caseStudy;
  // Seules les rubriques renseignées sont affichées : aucune valeur d'attente visible.
  const blocks = ([
    [s.context, cs.context && <p>{cs.context[lang]}</p>],
    [s.challenge, cs.challenge && <p>{cs.challenge[lang]}</p>],
    [s.approach, cs.approach && <ol className="grid gap-2">{cs.approach.map((a, i) => <li key={i}>{i + 1}. {a[lang]}</li>)}</ol>],
    [s.design, cs.design && <p>{cs.design[lang]}</p>],
    [s.development, cs.development && <p>{cs.development[lang]}</p>],
    [s.features, cs.features && <ul className="grid gap-2">{cs.features.map((f, i) => <li key={i} className="flex gap-2"><Check className="mt-1 text-blue" />{f[lang]}</li>)}</ul>],
    [s.technologies, p.technologies.length > 0 && <div key="t" className="flex flex-wrap gap-2">{p.technologies.map((t) => <span key={t} className="chip font-semibold">{t}</span>)}</div>],
    [s.result, cs.result && <p>{cs.result[lang]}</p>],
  ] as [string, React.ReactNode][]).filter(([, body]) => Boolean(body));
  return (
    <>
      <section className="hero">
        <div className="wrap relative z-10 grid items-center gap-8 md:grid-cols-[1fr_1.15fr] md:gap-12">
          <div className="grid gap-4">
            <nav aria-label="breadcrumb" className="flex gap-2 text-sm font-semibold text-ink-soft">
              <Link href={`/${lang}/realisations`} className="hover:text-blue">{d.nav.work}</Link><span aria-hidden="true">/</span><span className="text-ink">{d.work.caseStudy}</span>
            </nav>
            <span className="w-fit rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">{p.type[lang]}</span>
            <h1 className="text-[clamp(32px,4.2vw,50px)]">{p.name[lang]}</h1>
            <p className="sub">{p.summary[lang]}</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 text-[15px]">
              <dt className="text-ink-soft">{d.work.facts.type}</dt><dd className="font-semibold">{p.type[lang]}</dd>
              <dt className="text-ink-soft">{d.work.facts.languages}</dt><dd className="font-semibold">{p.languages.join(" · ")}</dd>
              {p.year && <><dt className="text-ink-soft">{d.work.facts.year}</dt><dd className="font-semibold">{p.year}</dd></>}
            </dl>
            {p.url ? <a href={p.url} target="_blank" rel="noopener" className="btn btn-p w-fit">{d.work.visit}<Arrow /></a>
              : <span className="btn w-fit cursor-default border border-dashed border-line text-sm text-ink-soft">{d.work.urlPending}</span>}
          </div>
          <div className="laptop"><Image src={p.image} alt={p.name[lang]} width={1062} height={664} priority sizes="(max-width: 768px) 92vw, 52vw" className="block h-auto w-full rounded-md" /></div>
        </div>
      </section>
      <section className="sec !pt-6">
        <div className="wrap grid gap-4 md:grid-cols-2">
          {blocks.map(([title, body]) => (
            <article key={title} className="card grid content-start gap-3 p-6 text-ink-2">
              <h2 className="text-xl text-ink">{title}</h2>{body}
            </article>
          ))}
        </div>
        <div className="wrap mt-10">
          <Link href={`/${lang}/contact`} className="btn btn-p">{d.work.similar}<Arrow /></Link>
        </div>
      </section>
    </>
  );
}
