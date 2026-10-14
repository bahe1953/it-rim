import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, type Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { resellerExamples, resellerPrice, resellers } from "@/content/revendeurs";
import ResellerForm from "@/components/ResellerForm";
import { Arrow, Check, Growth, Headset, Layers, Pin, Rocket, Users, WhatsApp } from "@/components/icons";

export async function generateMetadata({ params }: PageProps<"/[lang]/revendeurs">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = resellers[lang];
  return pageMetadata(lang, "/revendeurs", t.metaTitle, t.metaDesc);
}

const money = (n: number, lang: Locale) =>
  lang === "ar" ? <><span className="ltr">{n}</span> أوقية</> : <span className="whitespace-nowrap">{new Intl.NumberFormat("fr-FR").format(n)} MRU</span>;
const pct = (n: number) => <span className="ltr">{n}%</span>;

export default async function ResellersPage({ params }: PageProps<"/[lang]/revendeurs">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = resellers[lang];
  const ask = `${site.whatsappUrl}?text=${encodeURIComponent(lang === "ar" ? "السلام عليكم IT-RIM، لدي سؤال حول برنامج الموزعين المؤسسين." : "Bonjour IT-RIM, j'ai une question sur le programme Revendeurs fondateurs.")}`;
  const whyIcons = [<Growth key="a" size={22} />, <Layers key="b" size={22} />, <Rocket key="c" size={22} />, <Headset key="d" size={22} />, <Check key="e" size={22} />, <Users key="f" size={22} />];
  const max = resellerExamples[resellerExamples.length - 1] * resellerPrice * 0.3;

  return (
    <>
      {/* En-tête */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0e1b33_0%,#16325c_55%,#1e4a86_100%)] pb-16 pt-14 text-white md:pb-20 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute -end-40 -top-40 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.22),transparent_65%)]" />
        <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="grid content-start gap-5">
            <p className="w-fit rounded-full border border-amber-300/40 bg-amber-300/10 px-3.5 py-1.5 text-[13px] font-bold tracking-wide text-amber-200">{t.eyebrow}</p>
            <h1 className="text-[clamp(32px,4.6vw,56px)] leading-[1.08] text-white">{t.title}</h1>
            <p className="max-w-[58ch] text-[clamp(16.5px,1.6vw,19px)] text-white/80">{t.lead}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href="#candidature" className="btn bg-amber-400 text-[#0e1b33] hover:bg-amber-300 max-sm:flex-[1_1_100%] max-sm:justify-center">{t.apply}<Arrow /></a>
              <a href={ask} target="_blank" rel="noopener" className="btn btn-w max-sm:flex-[1_1_100%] max-sm:justify-center"><WhatsApp size={18} />{t.ask}</a>
            </div>
          </div>

          {/* Les 10 places */}
          <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-sm md:p-8">
            <p className="text-[clamp(26px,3vw,34px)] font-extrabold text-amber-300">{t.seats}</p>
            <div className="mt-5 grid gap-4">
              <div>
                <p className="mb-2 flex items-center gap-2 font-bold"><Pin size={16} />{t.seatsNk}</p>
                <div className="flex gap-2.5">{Array.from({ length: 3 }, (_, i) => <span key={i} className="grid size-11 place-items-center rounded-xl bg-amber-400 text-[15px] font-extrabold text-[#0e1b33] shadow-[0_6px_18px_rgba(245,158,11,0.35)]"><span className="ltr">{i + 1}</span></span>)}</div>
              </div>
              <div>
                <p className="mb-2 flex items-center gap-2 font-bold"><Pin size={16} />{t.seatsOther}</p>
                <div className="flex flex-wrap gap-2.5">{Array.from({ length: 7 }, (_, i) => <span key={i} className="grid size-11 place-items-center rounded-xl border border-white/25 bg-white/10 text-[15px] font-extrabold"><span className="ltr">{i + 4}</span></span>)}</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-white/65">{t.seatsNote}</p>
          </div>
        </div>
      </section>

      {/* Pourquoi */}
      <section className="sec">
        <div className="wrap grid gap-8">
          <h2 className="h2">{t.whyTitle}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.map(([title, text], i) => (
              <div key={title} className="card flex gap-4 p-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mist text-blue">{whyIcons[i]}</span>
                <div><h3 className="text-[17px]">{title}</h3><p className="mt-1 text-[15px] text-ink-soft">{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modèle */}
      <section className="sec bg-canvas">
        <div className="wrap grid gap-8">
          <h2 className="h2">{t.modelTitle}</h2>
          <div className="grid items-start gap-5 lg:grid-cols-[1fr_1fr_1.35fr]">
            <div className="card grid content-start gap-2 p-6">
              <p className="eyebrow">{t.price}</p>
              <p className="text-[clamp(32px,3.4vw,42px)] font-extrabold leading-none text-ink">{money(resellerPrice, lang)}</p>
              <p className="font-bold text-ink-soft">{t.perMonth}</p>
              <p className="mt-3 rounded-xl bg-mist px-3 py-2 text-sm font-semibold text-blue">{t.licence}</p>
            </div>
            <div className="card grid content-start gap-4 p-6">
              <p className="eyebrow">{t.commission}</p>
              <div className="flex items-end gap-3">
                <p className="text-[40px] font-extrabold leading-none text-ink">{pct(25)}</p>
                <p className="pb-1 text-[15px] font-semibold text-ink-soft">{t.first}</p>
              </div>
              <div className="flex items-center gap-2 text-ink-soft"><span className="h-px flex-1 bg-line" /><Arrow /><span className="h-px flex-1 bg-line" /></div>
              <div className="flex items-end gap-3">
                <p className="text-[48px] font-extrabold leading-none text-amber-600">{pct(30)}</p>
                <p className="pb-1.5 text-[15px] font-semibold text-ink-soft">{t.then}</p>
              </div>
            </div>
            <div className="card grid content-start gap-4 p-6">
              <p className="eyebrow">{t.examplesTitle}</p>
              <ul className="grid gap-2.5">
                {resellerExamples.map((n) => {
                  const v = n * resellerPrice * 0.3;
                  return (
                    <li key={n} className="grid grid-cols-[92px_1fr] items-center gap-3 text-sm">
                      <span className="font-semibold text-ink-soft"><span className="ltr">{n}</span> {t.clients}</span>
                      <span className="relative h-8 overflow-hidden rounded-lg bg-mist">
                        <span className="absolute inset-y-0 start-0 rounded-lg bg-[linear-gradient(90deg,#16325c,#2f6db5)]" style={{ inlineSize: `${Math.max(18, (v / max) * 100)}%` }} />
                        <span className={`absolute inset-y-0 grid items-center px-2.5 font-extrabold ${v / max > 0.45 ? "start-0 text-white" : "end-0 text-ink"}`}>{money(v, lang)}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="text-[13px] text-ink-soft">{t.examplesNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que vous recevez + étapes */}
      <section className="sec">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="grid content-start gap-6">
            <h2 className="h2">{t.getTitle}</h2>
            <ul className="grid gap-3">
              {t.get.map((g) => (
                <li key={g} className="flex items-start gap-3 text-[16px] font-semibold text-ink-2">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-700"><Check size={15} /></span>{g}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid content-start gap-6">
            <h2 className="h2">{t.stepsTitle}</h2>
            <ol className="grid gap-0">
              {t.steps.map(([title, text], i) => (
                <li key={title} className="relative grid grid-cols-[44px_1fr] gap-4 pb-6 last:pb-0">
                  {i < t.steps.length - 1 && <span aria-hidden className="absolute start-[21px] top-11 bottom-0 w-0.5 bg-line" />}
                  <span className="grid size-11 place-items-center rounded-full bg-[#16325c] font-extrabold text-white"><span className="ltr">{i + 1}</span></span>
                  <div className="pt-2"><h3 className="text-[17px]">{title}</h3><p className="mt-1 text-[15px] text-ink-soft">{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Candidature */}
      <section className="sec scroll-mt-24 bg-canvas" id="candidature">
        <div className="wrap grid max-w-4xl gap-6">
          <div>
            <p className="eyebrow">{t.seats}</p>
            <h2 className="h2">{t.formTitle}</h2>
            <p className="mt-2 text-ink-soft">{t.formLead}</p>
          </div>
          <ResellerForm lang={lang} t={t.f} />
        </div>
      </section>
    </>
  );
}
