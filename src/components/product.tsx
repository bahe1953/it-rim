import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Product } from "@/content/products";
import { releaseUrl, type Release } from "@/content/releases";
import { site } from "@/content/site";
import type { TrialState } from "@/lib/trial";
import Newsletter from "./Newsletter";
import { Arrow, Check, Clock, Download, Flask, Windows } from "./icons";

const fmtDate = (iso: string, lang: Locale) =>
  new Intl.DateTimeFormat(lang === "ar" ? "ar-MR-u-nu-latn" : "fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(iso));

/** Carte « Essai gratuit » : 4 états (idle, actif, bientôt expiré, expiré) + désactivé. */
export function TrialCard({ p, lang, state }: { p: Product; lang: Locale; state: TrialState }) {
  const d = getDictionary(lang).product;
  const base = `/${lang}/applications/${p.slug}`;
  return (
    <div className={`acc-${p.accent} card grid content-start gap-4 p-6`} id="essai">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{d.trial.label}</p>
        <span className="p-icon size-10 rounded-xl"><Flask size={20} /></span>
      </div>

      {state.kind === "idle" && (
        <>
          <p className="text-[44px] leading-none font-extrabold">{state.days} <span className="text-lg font-bold text-ink-soft">{getDictionary(lang).common.days}</span></p>
          <p className="text-[15px] text-ink-2">{d.trial.included}</p>
          <Link href={`${base}/essai`} className="btn btn-acc">{d.start}<Arrow /></Link>
        </>
      )}

      {state.kind === "active" && (
        <>
          <p className={`flex items-center gap-2 font-bold ${state.ending ? "text-amber-700" : "text-ink"}`}><Clock />{d.trial.active(state.daysLeft)}</p>
          <div className="h-2 overflow-hidden rounded-full bg-[var(--cb)]" role="progressbar" aria-valuemin={0} aria-valuemax={state.days} aria-valuenow={state.daysLeft}>
            <div className={`h-full rounded-full ${state.ending ? "bg-amber-500" : "bg-[var(--c)]"}`} style={{ inlineSize: `${(state.daysLeft / state.days) * 100}%` }} />
          </div>
          <Link href={`${base}/licence`} className="btn btn-acc">{d.trial.license}<Arrow /></Link>
        </>
      )}

      {state.kind === "expired" && (
        <>
          <p className="font-bold">{d.trial.expired}</p>
          <div className="grid gap-2.5">
            <Link href={`${base}/licence`} className="btn btn-acc">{d.trial.license}<Arrow /></Link>
            <Link href={`/${lang}/contact`} className="btn btn-try">{d.trial.contact}</Link>
          </div>
        </>
      )}

      {state.kind === "disabled" && (
        <>
          <p className="font-bold">{d.trial.disabled}</p>
          <Link href={`/${lang}/contact`} className="btn btn-acc">{d.trial.contact}<Arrow /></Link>
        </>
      )}
    </div>
  );
}

/** Carte « Télécharger » : affiche la version publiée, ou un état « bientôt disponible » sans faux lien. */
export function DownloadCard({ p, lang, release }: { p: Product; lang: Locale; release: Release }) {
  const dict = getDictionary(lang);
  const d = dict.product.dl;
  const ph = <span className="placeholder">{dict.common.toComplete}</span>;
  return (
    <div className="card grid content-start gap-4 p-6" id="telechargement">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{d.title}</p>
        <span className="grid size-10 place-items-center rounded-xl bg-mist text-blue"><Download size={20} /></span>
      </div>
      <p className="flex items-center gap-2 font-bold"><Windows className="text-blue" />{p.platforms.join(" / ")}</p>
      <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-[15px]">
        <dt className="text-ink-soft">{d.version}</dt><dd className="ltr font-semibold">{release.version ?? ph}</dd>
        <dt className="text-ink-soft">{d.size}</dt><dd className="font-semibold">{release.sizeMb ? <span className="ltr">{release.sizeMb} MB</span> : ph}</dd>
        <dt className="text-ink-soft">{d.updated}</dt><dd className="font-semibold">{release.date ? <span className="ltr">{fmtDate(release.date, lang)}</span> : ph}</dd>
      </dl>
      {releaseUrl(release, lang) ? (
        <a href={releaseUrl(release, lang)!} className="btn btn-p"><Download />{d.button}</a>
      ) : (
        <div className="grid gap-2.5 rounded-2xl border border-dashed border-line bg-canvas p-4">
          <p className="font-bold">{d.soon}</p>
          <p className="text-sm text-ink-soft">{d.soonText}</p>
          <Newsletter lang={lang} kind="notify" product={p.slug} placeholder={dict.footer.newsletterPlaceholder}
            ok={dict.footer.newsletterOk} notConfigured={dict.contact.form.notConfigured} invalid={dict.contact.form.invalidEmail} submitLabel={d.notify} />
        </div>
      )}
    </div>
  );
}

export function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((f) => (
        <li key={f} className="card flex items-center gap-3 px-4 py-3.5 font-semibold">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--cb)] text-[var(--c)]"><Check /></span>{f}
        </li>
      ))}
    </ul>
  );
}

export const whatsappFor = (name: string) => `${site.whatsappUrl}?text=${encodeURIComponent(name)}`;
