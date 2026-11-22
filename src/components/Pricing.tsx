import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { products, type Product } from "@/content/products";
import { billing, priceIdOf, sellableProducts } from "@/content/pricing";
import { comingSoonSlugs, storeHome } from "@/content/store";
import BuyButton from "@/components/BuyButton";
import { Check, ProductIcon, Shield, WhatsApp, Windows } from "@/components/icons";
import { SectionHead } from "@/components/sections";

/** Visuel d'un logiciel : la vidéo de démonstration (image d'aperçu) pour Mouhassib, sinon sa capture. */
const visual = (p: Product) => (p.slug === "mouhassib" ? { src: "/videos/mouhassib-demo-fr.jpg", w: 1280, h: 720 } : { src: p.image, w: 1440, h: 860 });

/** Carte de catalogue d'un logiciel vendu en ligne : visuel, présentation courte, fonctions, prix et achat. */
export function CatalogCard({ lang, p }: { lang: Locale; p: Product }) {
  const t = getDictionary(lang).pricing;
  const s = storeHome[lang];
  const v = visual(p);
  return (
    <article className={`acc-${p.accent} card grid overflow-hidden p-0 lg:grid-cols-[1.05fr_1fr]`}>
      <Link href={`/${lang}/applications/${p.slug}`} className="grid place-items-center bg-canvas p-4 sm:p-6">
        <Image src={v.src} alt={p.name[lang]} width={v.w} height={v.h} sizes="(max-width: 1024px) 92vw, 46vw" className="block h-auto w-full rounded-xl" />
      </Link>
      <div className="grid content-start gap-4 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="p-icon size-12 rounded-xl"><ProductIcon accent={p.accent} size={24} /></span>
          <div>
            <h2 className="text-2xl">{p.name[lang]}</h2>
            <p className="text-sm font-semibold text-[var(--c)]">{p.category[lang]}</p>
          </div>
        </div>
        <p className="text-ink-2">{p.summary[lang]}</p>
        <ul className="grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
          {p.features[lang].slice(0, 6).map((f) => <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 shrink-0 text-[var(--c)]" />{f}</li>)}
        </ul>
        <div className="grid gap-4 rounded-2xl border border-line bg-canvas p-4 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="flex items-baseline gap-2" dir="ltr">
              <span className="text-4xl font-extrabold">{billing.monthlyPrice} {billing.currencySymbol}</span>
              <span className="text-sm text-ink-soft" dir="auto">{t.perMonth}</span>
            </p>
            <p className="text-xs text-ink-soft">{s.noCommitment} · {s.refund(billing.refundDays)}</p>
          </div>
          <BuyButton
            lang={lang}
            label={priceIdOf(p.slug) && billing.paddle.clientToken ? t.buy : t.request}
            priceId={priceIdOf(p.slug)}
            clientToken={billing.paddle.clientToken}
            environment={billing.paddle.environment}
            fallbackHref={`/${lang}/applications/${p.slug}/licence`}
            className="btn btn-acc justify-center px-7"
          />
        </div>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-2">
          <span className="flex items-center gap-1.5"><Windows size={15} className="text-[var(--c)]" />{p.platforms.join(" · ")}</span>
          <Link href={`/${lang}/applications/${p.slug}`} className="font-semibold text-blue hover:underline">{t.details} →</Link>
        </p>
      </div>
    </article>
  );
}

/** Logiciels pas encore vendus en ligne : présentation en quelques mots. Lien vers la fiche seulement sur le site principal. */
export function ComingSoon({ lang, links }: { lang: Locale; links: boolean }) {
  const s = storeHome[lang];
  const list = products.filter((p) => comingSoonSlugs.includes(p.slug) && !priceIdOf(p.slug));
  if (!list.length) return null;
  return (
    <section className="sec">
      <div className="wrap grid gap-8">
        <div className="grid gap-2 text-center">
          <h2 className="text-3xl">{s.soonTitle}</h2>
          <p className="text-ink-2">{s.soonLead}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => {
            const body = (
              <>
                <div className="flex items-center justify-between gap-2">
                  <span className="p-icon size-11 rounded-xl"><ProductIcon accent={p.accent} size={22} /></span>
                  <span className="chip text-xs font-semibold">{s.soonBadge}</span>
                </div>
                <div>
                  <h3 className="text-lg">{p.name[lang]}</h3>
                  <p className="text-sm font-semibold text-[var(--c)]">{p.category[lang]}</p>
                </div>
                <p className="text-sm text-ink-2">{p.summary[lang]}</p>
              </>
            );
            return links ? (
              <Link key={p.slug} href={`/${lang}/applications/${p.slug}`} className={`acc-${p.accent} card grid content-start gap-3 p-5 transition hover:-translate-y-0.5`}>{body}</Link>
            ) : (
              <article key={p.slug} className={`acc-${p.accent} card grid content-start gap-3 p-5`}>{body}</article>
            );
          })}
        </div>
        <p className="text-center">
          <a href={site.whatsappUrl} target="_blank" rel="noopener" className="btn btn-wa"><WhatsApp size={18} />{s.soonCta}</a>
        </p>
      </div>
    </section>
  );
}

/** Page Tarifs : catalogue des logiciels vendus en ligne, prix en dollars (USD), paiement Paddle, puis les logiciels à venir. */
export default function PricingContent({ lang, title, subtitle, store = false }: { lang: Locale; title: string; subtitle: string; store?: boolean }) {
  const d = getDictionary(lang);
  const t = d.pricing;

  return (
    <>
      <section className="hero !pb-16">
        <div className="wrap relative z-10">
          <SectionHead as="h1" title={title} subtitle={subtitle} />
        </div>
      </section>

      <section className="pb-14">
        <div className="wrap grid gap-6">
          {sellableProducts.map((p) => <CatalogCard key={p.slug} lang={lang} p={p} />)}
          <ul className="grid gap-3 text-sm text-ink-2 sm:grid-cols-2 lg:grid-cols-4">
            {t.included.map((i) => <li key={i} className="card flex items-start gap-2 p-4"><Shield size={16} className="mt-0.5 shrink-0 text-blue" />{i}</li>)}
          </ul>
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

      <ComingSoon lang={lang} links={!store} />
    </>
  );
}
