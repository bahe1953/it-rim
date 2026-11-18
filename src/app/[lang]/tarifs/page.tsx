import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { billing, priceIdOf, sellableProducts } from "@/content/pricing";
import BuyButton from "@/components/BuyButton";
import { Check, ProductIcon, WhatsApp } from "@/components/icons";
import { SectionHead } from "@/components/sections";

export async function generateMetadata({ params }: PageProps<"/[lang]/tarifs">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return pageMetadata(lang, "/tarifs", d.pricing.title, d.pricing.lead);
}

export default async function PricingPage({ params }: PageProps<"/[lang]/tarifs">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const t = d.pricing;

  return (
    <>
      <section className="hero !pb-16">
        <div className="wrap relative z-10">
          <SectionHead as="h1" title={t.title} subtitle={t.lead} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sellableProducts.map((p) => (
            <article key={p.slug} className={`acc-${p.accent} card grid content-start gap-4 p-6`}>
              <div className="flex items-center gap-3">
                <span className="p-icon size-12 rounded-xl"><ProductIcon accent={p.accent} size={24} /></span>
                <div>
                  <h2 className="text-xl">{p.name[lang]}</h2>
                  <p className="text-sm font-semibold text-[var(--c)]">{p.category[lang]}</p>
                </div>
              </div>
              <p className="flex items-baseline gap-2" dir="ltr">
                <span className="text-4xl font-extrabold">{billing.monthlyUsd} $</span>
                <span className="text-sm text-ink-soft" dir="auto">{t.perMonth}</span>
              </p>
              <p className="text-sm text-ink-2">{t.perLicense}</p>
              <ul className="grid gap-2 text-sm">
                {t.included.map((i) => <li key={i} className="flex items-start gap-2"><Check className="mt-0.5 shrink-0 text-[var(--c)]" />{i}</li>)}
              </ul>
              {p.trial.enabled && <p className="text-sm text-ink-soft">{t.trialNote(p.trial.days)}</p>}
              <div className="grid gap-2">
                <BuyButton
                  lang={lang}
                  label={priceIdOf(p.slug) && billing.paddle.clientToken ? t.buy : t.request}
                  priceId={priceIdOf(p.slug)}
                  clientToken={billing.paddle.clientToken}
                  environment={billing.paddle.environment}
                  fallbackHref={`/${lang}/applications/${p.slug}/licence`}
                  className="btn btn-acc w-full justify-center"
                />
                <Link href={`/${lang}/applications/${p.slug}`} className="btn btn-w w-full justify-center">{t.details}</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-canvas py-14">
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
    </>
  );
}
