import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { billing, priceIdOf, sellableProducts } from "@/content/pricing";
import { storeHome } from "@/content/store";
import BuyButton from "@/components/BuyButton";
import { ComingSoon } from "@/components/Pricing";
import { Check, Clock, Download, Mail, ProductIcon, Shield, WhatsApp, Windows } from "@/components/icons";

/**
 * Accueil de la boutique : chaque logiciel vendu en ligne est présenté en grand
 * (vidéo, fonctions, prix, achat), puis le déroulé de l'achat, le paiement et les questions fréquentes.
 */
export default function StoreHome({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const t = d.pricing;
  const s = storeHome[lang];
  const steps = [
    { icon: <Shield size={22} />, ...s.steps[0] },
    { icon: <Download size={22} />, ...s.steps[1] },
    { icon: <Clock size={22} />, ...s.steps[2] },
  ];

  return (
    <>
      {sellableProducts.map((p, i) => {
        // La démonstration filmée montre l'interface française, la seule vendue en ligne.
        const film = p.slug === "mouhassib" ? "/videos/mouhassib-demo-fr" : null;
        const buy = (
          <BuyButton
            lang={lang}
            label={priceIdOf(p.slug) && billing.paddle.clientToken ? t.buy : t.request}
            priceId={priceIdOf(p.slug)}
            clientToken={billing.paddle.clientToken}
            environment={billing.paddle.environment}
            fallbackHref={`/${lang}/applications/${p.slug}/licence`}
            className="btn btn-acc justify-center px-7"
          />
        );
        return (
          <div key={p.slug} className={`acc-${p.accent}`}>
            <section className={i === 0 ? "hero !pb-20" : "sec"}>
              <div className="wrap relative z-10 grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
                <div className="grid content-start gap-5">
                  <p className="eyebrow">{s.eyebrow}</p>
                  <div className="flex items-center gap-3">
                    <span className="p-icon size-14 rounded-2xl"><ProductIcon accent={p.accent} size={28} /></span>
                    <div>
                      {i === 0 ? <h1 className="text-4xl sm:text-5xl">{p.name[lang]}</h1> : <h2 className="text-4xl">{p.name[lang]}</h2>}
                      <p className="font-semibold text-[var(--c)]">{p.category[lang]}</p>
                    </div>
                  </div>
                  <p className="text-lg text-ink-2">{p.summary[lang]}</p>
                  <p className="flex items-baseline gap-2" dir="ltr">
                    <span className="text-5xl font-extrabold">{billing.monthlyPrice} {billing.currencySymbol}</span>
                    <span className="text-ink-soft" dir="auto">{t.perMonth} · {s.noCommitment}</span>
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {buy}
                    <Link href={`/${lang}/applications/${p.slug}`} className="btn btn-w">{t.details}</Link>
                  </div>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
                    <li className="flex items-center gap-1.5"><Windows size={15} className="text-[var(--c)]" />{p.platforms.join(" · ")}</li>
                    <li className="flex items-center gap-1.5"><Shield size={15} className="text-[var(--c)]" />{s.refund(billing.refundDays)}</li>
                    {p.technologies[lang].slice(1).map((x) => <li key={x} className="flex items-center gap-1.5"><Check size={15} className="text-[var(--c)]" />{x}</li>)}
                  </ul>
                </div>
                <div className="card overflow-hidden p-0 shadow-xl">
                  {film ? (
                    <video className="block aspect-video w-full bg-canvas" controls preload="none" poster={`${film}.jpg`} playsInline>
                      <source src={`${film}.mp4`} type="video/mp4" />
                    </video>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.name[lang]} className="block w-full" />
                  )}
                </div>
              </div>
            </section>

            <section className="pb-16">
              <div className="wrap grid gap-8 lg:grid-cols-[1.4fr_1fr]">
                <div className="card grid content-start gap-4 p-7">
                  <h2 className="text-2xl">{s.featuresTitle}</h2>
                  <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {p.features[lang].map((f) => <li key={f} className="flex items-start gap-2"><Check className="mt-1 shrink-0 text-[var(--c)]" />{f}</li>)}
                  </ul>
                </div>
                <div className="card grid content-start gap-4 p-7">
                  <h2 className="text-2xl">{s.forWhomTitle}</h2>
                  <ul className="flex flex-wrap gap-2">
                    {p.forWhom[lang].map((w) => <li key={w} className="chip">{w}</li>)}
                  </ul>
                  <h3 className="mt-2 text-lg">{s.includedTitle}</h3>
                  <ul className="grid gap-2 text-sm">
                    {t.included.map((x) => <li key={x} className="flex items-start gap-2"><Check className="mt-0.5 shrink-0 text-[var(--c)]" />{x}</li>)}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        );
      })}

      <section className="bg-canvas py-16">
        <div className="wrap grid gap-8">
          <div className="grid gap-2 text-center">
            <h2 className="text-3xl">{s.stepsTitle}</h2>
            <p className="text-ink-2">{s.stepsLead}</p>
          </div>
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map((st, k) => (
              <li key={st.title} className="card grid content-start gap-3 p-6">
                <div className="flex items-center gap-3">
                  <span className="badge-ic">{st.icon}</span>
                  <span className="text-sm font-bold text-blue">{s.step} {k + 1}</span>
                </div>
                <h3 className="text-lg">{st.title}</h3>
                <p className="text-ink-2">{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec">
        <div className="wrap grid gap-5 md:grid-cols-2">
          <div className="card grid content-start gap-3 p-7">
            <h2 className="text-xl">{t.payTitle}</h2>
            <p className="text-ink-2">{t.payText}</p>
            <p className="text-sm text-ink-soft">{t.taxNote}</p>
            <p className="text-sm">
              <Link href={`/${lang}/conditions`} className="font-semibold text-blue hover:underline">{d.legal.terms}</Link>
              {" · "}
              <Link href={`/${lang}/remboursement`} className="font-semibold text-blue hover:underline">{d.legal.refund}</Link>
            </p>
          </div>
          <div className="card grid content-start gap-3 p-7">
            <h2 className="text-xl">{t.localTitle}</h2>
            <p className="text-ink-2">{t.localText}</p>
            <a href={site.whatsappUrl} target="_blank" rel="noopener" className="btn btn-wa w-fit"><WhatsApp size={18} />{t.localCta}</a>
          </div>
        </div>
      </section>

      <ComingSoon lang={lang} links={false} />

      <section className="bg-canvas py-16">
        <div className="wrap grid max-w-3xl gap-6">
          <h2 className="text-center text-3xl">{s.faqTitle}</h2>
          <div className="grid gap-3">
            {s.faq(billing.refundDays).map((q) => (
              <details key={q.q} className="card group p-5">
                <summary className="cursor-pointer list-none font-semibold">{q.q}</summary>
                <p className="mt-3 text-ink-2">{q.a}</p>
              </details>
            ))}
          </div>
          <p className="flex flex-wrap items-center justify-center gap-3 text-ink-2">
            {s.moreQuestions}
            <a href={`mailto:${site.email}`} className="btn btn-w"><Mail size={16} />{site.email}</a>
            <a href={site.whatsappUrl} target="_blank" rel="noopener" className="btn btn-wa"><WhatsApp size={16} />WhatsApp</a>
          </p>
        </div>
      </section>
    </>
  );
}
