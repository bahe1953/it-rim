import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, locales, siteUrl } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProduct, products } from "@/content/products";
import { releaseSha, releaseUrl, releases, requirements } from "@/content/releases";
import MouhassibLanding from "@/components/mouhassib/MouhassibLanding";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { trialState } from "@/lib/trial";
import { Arrow, Download, Flask, ProductIcon, Video, WhatsApp } from "@/components/icons";
import { DownloadCard, FeatureList, TrialCard, whatsappFor } from "@/components/product";

export const dynamicParams = false;
export const generateStaticParams = () => locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/applications/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!hasLocale(lang) || !p) return {};
  return pageMetadata(lang, `/applications/${slug}`, `${p.name[lang]} · ${p.category[lang]}`, p.summary[lang]);
}

export default async function ProductPage({ params }: PageProps<"/[lang]/applications/[slug]">) {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!hasLocale(lang) || !p) notFound();
  const dict = getDictionary(lang);
  const d = dict.product;
  const s = d.sections;
  const release = releases[p.slug];
  const req = requirements[p.slug];
  const faq = d.faq(p.name[lang], p.trial.days);

  // Mouhassib a sa propre page de présentation (reprise de la page « mouhassib-fr »), en FR et en AR.
  if (p.slug === "mouhassib") {
    const other = lang === "fr" ? "ar" : "fr";
    return (
      <>
        <MouhassibLanding
          lang={lang}
          trialDays={p.trial.days}
          download={{ url: releaseUrl(release, lang), otherUrl: releaseUrl(release, other), version: release.version, date: release.date, platforms: p.platforms.join(" / "), sizeMb: release.sizeMb, sha256: releaseSha(release, lang) }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: p.name[lang],
            applicationCategory: "BusinessApplication",
            operatingSystem: p.platforms.join(", "),
            description: p.summary[lang],
            url: `${siteUrl}/${lang}/applications/${p.slug}`,
            publisher: { "@type": "Organization", name: site.name, url: siteUrl },
            ...(release.version ? { softwareVersion: release.version } : {}),
            ...(releaseUrl(release, lang) ? { downloadUrl: releaseUrl(release, lang), fileSize: `${release.sizeMb} MB` } : {}),
          },
        ]) }} />
      </>
    );
  }
  const toc = [
    ["presentation", s.presentation], ["probleme", s.problem], ["fonctionnalites", s.features], ["captures", s.screenshots],
    ["video", s.video], ["configuration", s.requirements], ["telechargement", s.download], ["faq", s.faq],
  ];

  return (
    <div className={`acc-${p.accent}`}>
      {/* Hero produit */}
      <section className="hero !pb-20">
        <div className="wrap relative z-10 grid items-center gap-8 md:grid-cols-[1fr_1.05fr] md:gap-12">
          <div className="grid min-w-0 gap-5">
            <nav aria-label="breadcrumb" className="flex items-center gap-2 text-sm font-semibold text-ink-soft">
              <Link href={`/${lang}/applications`} className="hover:text-blue">{d.breadcrumb}</Link>
              <span aria-hidden="true">/</span><span className="text-ink">{p.name[lang]}</span>
            </nav>
            <div className="flex items-center gap-4">
              <span className="p-icon size-16 rounded-[18px]"><ProductIcon accent={p.accent} size={30} /></span>
              <div>
                <h1 className="text-[clamp(34px,4.4vw,52px)]">{p.name[lang]}</h1>
                <p className="font-semibold text-[var(--c)]">{p.category[lang]}</p>
              </div>
            </div>
            <p className="max-w-[56ch] text-[clamp(16.5px,1.6vw,19px)] text-ink-2">{p.summary[lang]}</p>
            <div className="flex flex-wrap gap-2">
              {p.platforms.map((pl) => <span key={pl} className="chip font-semibold">{pl}</span>)}
              {p.developedBy && <span className="chip font-semibold">{p.developedBy[lang]}</span>}
            </div>
            <div className="flex flex-wrap gap-3">
              {p.trial.enabled && <Link href={`/${lang}/applications/${p.slug}/essai`} className="btn btn-acc max-sm:flex-[1_1_100%]"><Flask />{d.start}<Arrow /></Link>}
              <a href="#telechargement" className="btn btn-w max-sm:flex-[1_1_100%]"><Download />{d.download}</a>
            </div>
            {p.documents && p.documents.length > 0 && (
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {[...p.documents].sort((a) => (a.lang === lang ? -1 : 1)).map((doc) => (
                  <a key={doc.href} href={doc.href} target={doc.href.endsWith(".pptx") ? undefined : "_blank"} rel="noopener"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--c)] underline underline-offset-4">
                    <Download size={16} />{doc.label[lang]}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute -inset-[12%] rounded-full bg-[radial-gradient(closest-side,var(--cb),transparent_70%)]" />
            <div className="laptop relative"><Image src={p.image} alt={p.name[lang]} width={254} height={108} priority sizes="(max-width: 768px) 92vw, 50vw" className="block h-auto w-full rounded-md" /></div>
          </div>
        </div>
      </section>

      {/* Sommaire collant */}
      <nav aria-label={p.name[lang]} className="sticky top-16 z-30 border-y border-line bg-white/90 backdrop-blur lg:top-[74px]">
        <div className="wrap flex gap-6 overflow-x-auto py-3 text-sm font-semibold whitespace-nowrap text-ink-soft [scrollbar-width:none]">
          {toc.map(([id, label]) => <a key={id} href={`#${id}`} className="hover:text-[var(--c)]">{label}</a>)}
        </div>
      </nav>

      {/* Présentation */}
      <section className="sec scroll-mt-32" id="presentation">
        <div className="wrap grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div className="grid content-start gap-4">
            <p className="eyebrow">{s.presentation}</p>
            <p className="text-[clamp(20px,2.2vw,26px)] leading-snug font-bold">{p.presentation[lang]}</p>
          </div>
          <div className="card grid content-start gap-3 p-6">
            <h2 className="text-lg">{s.forWhom}</h2>
            <ul className="grid gap-2">{p.forWhom[lang].map((w) => <li key={w} className="flex items-center gap-2.5"><span className="size-2 rounded-full bg-[var(--c)]" />{w}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* Problème / solution */}
      <section className="scroll-mt-32 bg-canvas py-16 md:py-20" id="probleme">
        <div className="wrap grid gap-5 md:grid-cols-2">
          <div className="card grid content-start gap-3 p-7">
            <p className="text-sm font-bold text-ink-soft">{d.without} {p.name[lang]}</p>
            <h2 className="text-2xl">{s.problem}</h2>
            <p className="text-ink-2">{p.problem[lang]}</p>
          </div>
          <div className="card grid content-start gap-3 border-[var(--c)]/30 bg-[linear-gradient(160deg,#fff,var(--cb))] p-7">
            <p className="text-sm font-bold text-[var(--c)]">{d.with} {p.name[lang]}</p>
            <h2 className="text-2xl">{s.solution}</h2>
            <p className="text-ink-2">{p.solution[lang]}</p>
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="sec scroll-mt-32" id="fonctionnalites">
        <div className="wrap">
          <div className="head"><div><p className="eyebrow">{s.features}</p><h2 className="h2">{p.name[lang]}</h2></div></div>
          <FeatureList items={p.features[lang]} />
        </div>
      </section>

      {/* Captures + vidéo */}
      <section className="scroll-mt-32 bg-canvas py-16 md:py-20" id="captures">
        <div className="wrap grid gap-6 lg:grid-cols-2">
          <div className="grid content-start gap-4">
            <h2 className="text-2xl">{s.screenshots}</h2>
            <div className="laptop"><Image src={p.image} alt={`${s.screenshots} · ${p.name[lang]}`} width={254} height={108} sizes="(max-width: 1024px) 92vw, 600px" className="block h-auto w-full rounded-md" /></div>
            <p className="text-sm text-ink-soft">{d.screenshotsNote}</p>
          </div>
          <div className="grid content-start gap-4 scroll-mt-32" id="video">
            <h2 className="text-2xl">{s.video}</h2>
            {p.demoVideo ? (
              <a href={p.demoVideo} target="_blank" rel="noopener" className="card grid aspect-video place-items-center text-[var(--c)]"><Video size={44} /></a>
            ) : (
              <div className="grid aspect-video place-items-center rounded-[20px] border border-dashed border-line bg-white p-6 text-center">
                <div className="grid justify-items-center gap-3 text-ink-soft"><Video size={40} /><p className="font-semibold">{d.videoSoon}</p></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Technologies + configuration */}
      <section className="sec scroll-mt-32" id="configuration">
        <div className="wrap grid gap-6 lg:grid-cols-2">
          {p.technologies[lang].length > 0 && (
            <div className="grid content-start gap-4">
              <h2 className="text-2xl">{s.technologies}</h2>
              <div className="flex flex-wrap gap-2">{p.technologies[lang].map((t) => <span key={t} className="chip font-semibold">{t}</span>)}</div>
            </div>
          )}
          <div className="grid content-start gap-4">
            <h2 className="text-2xl">{s.requirements}</h2>
            <div className="card overflow-x-auto">
              <table className="w-full text-start text-[15px]">
                <tbody>
                  {(Object.keys(d.req) as (keyof typeof d.req)[]).map((k) => (
                    <tr key={k} className="border-b border-line last:border-0">
                      <th scope="row" className="px-5 py-3 text-start font-semibold text-ink-soft">{d.req[k]}</th>
                      <td className="px-5 py-3 font-semibold">{req[k] ?? <span className="placeholder">{dict.common.toComplete}</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Téléchargement + essai */}
      <section className="scroll-mt-32 bg-canvas py-16 md:py-20">
        <div className="wrap grid gap-5 md:grid-cols-2">
          <DownloadCard p={p} lang={lang} release={release} />
          <TrialCard p={p} lang={lang} state={trialState(p, null)} />
        </div>
      </section>

      {/* FAQ */}
      <section className="sec scroll-mt-32" id="faq">
        <div className="wrap grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <h2 className="h2">{s.faq}</h2>
          <div className="grid gap-3">
            {faq.map(([q, a]) => (
              <details key={q} className="card group p-5 open:shadow-[var(--shadow-lift)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
                  {q}<span className="text-xl text-[var(--c)] transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-ink-2">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="pb-20">
        <div className="wrap">
          <div className="cta-card flex flex-wrap items-center justify-between gap-5 px-7 py-8 md:px-10">
            <h2 className="text-[clamp(22px,2.6vw,30px)]">{d.ctaQuestion(p.name[lang])}</h2>
            <div className="flex flex-wrap gap-3">
              <a href={whatsappFor(p.name[lang])} target="_blank" rel="noopener" className="btn bg-white text-ink"><WhatsApp className="text-wa" />WhatsApp</a>
              <Link href={`/${lang}/contact`} className="btn border border-white/50 text-white">{dict.contact.talk}<Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: p.name[lang],
          applicationCategory: "BusinessApplication",
          operatingSystem: p.platforms.join(", "),
          description: p.summary[lang],
          url: `${siteUrl}/${lang}/applications/${p.slug}`,
          publisher: { "@type": "Organization", name: site.name, url: siteUrl },
          ...(release.version ? { softwareVersion: release.version } : {}),
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        },
      ]) }} />
    </div>
  );
}
