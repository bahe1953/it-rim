import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Product } from "@/content/products";
import { releaseUrl, type Release } from "@/content/releases";
import { site } from "@/content/site";
import type { TrialState } from "@/lib/trial";
import { Arrow, Check, Clock, Download, Flask, WhatsApp, Windows } from "./icons";
import TrackedDownload from "./TrackedDownload";

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
  return (
    <div className="card grid content-start gap-4 p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{d.title}</p>
        <span className="grid size-10 place-items-center rounded-xl bg-mist text-blue"><Download size={20} /></span>
      </div>
      <p className="flex items-center gap-2 font-bold"><Windows className="text-blue" />{p.platforms.join(" / ")}</p>
      {/* Seules les informations réellement connues sont affichées : aucune valeur d'attente. */}
      {(release.version || release.sizeMb || release.date) && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 text-[15px]">
          {release.version && <><dt className="text-ink-soft">{d.version}</dt><dd className="ltr font-semibold">{release.version}</dd></>}
          {release.sizeMb && <><dt className="text-ink-soft">{d.size}</dt><dd className="font-semibold"><span className="ltr">{release.sizeMb} MB</span></dd></>}
          {release.date && <><dt className="text-ink-soft">{d.updated}</dt><dd className="font-semibold"><span className="ltr">{fmtDate(release.date, lang)}</span></dd></>}
        </dl>
      )}
      {releaseUrl(release, lang) ? (
        <div className="grid gap-2.5">
          <TrackedDownload href={releaseUrl(release, lang)!} produit={`${p.slug}-${lang}`} className="btn btn-p"><Download />{d.button}</TrackedDownload>
          {(() => {
            const other = lang === "fr" ? "ar" : "fr";
            const u = releaseUrl(release, other);
            return u && u !== releaseUrl(release, lang) ? (
              <TrackedDownload href={u} produit={`${p.slug}-${other}`} className="btn btn-o justify-center"><Download size={16} />{d.otherLang}</TrackedDownload>
            ) : null;
          })()}
        </div>
      ) : (
        <div className="grid gap-2.5 rounded-2xl border border-dashed border-line bg-canvas p-4">
          <p className="font-bold">{d.soon}</p>
          <p className="text-sm text-ink-soft">{d.soonText}</p>
          <a href={whatsappFor(d.notifyMsg(p.name[lang]))} target="_blank" rel="noopener" className="btn btn-wa btn-sm w-fit"><WhatsApp size={16} />{d.notify}</a>
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

/** Carte « Essai gratuit » unique : téléchargement direct si un installateur existe, sinon essai sur demande. */
export function TrialOffer({ p, lang, hasInstaller }: { p: Product; lang: Locale; hasInstaller: boolean }) {
  const d = getDictionary(lang).product;
  const t = d.trial;
  return (
    <div className={`acc-${p.accent} card grid content-start gap-4 p-6`} id="essai">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{p.trial.enabled ? t.label : "IT-RIM"}</p>
        <span className="p-icon size-10 rounded-xl"><Flask size={20} /></span>
      </div>
      {!p.trial.enabled ? (
        <>
          <p className="text-xl font-extrabold">{t.demoTitle}</p>
          <p className="text-[15px] text-ink-2">{t.demoText}</p>
          <a href={whatsappFor(lang === "ar" ? `السلام عليكم IT-RIM، أرغب في عرض توضيحي لـ ${p.name.ar}.` : `Bonjour IT-RIM, je souhaite une démonstration de ${p.name.fr}.`)} target="_blank" rel="noopener" className="btn btn-wa"><WhatsApp size={18} />{t.demoBtn}</a>
        </>
      ) : (
        <>
          <p className="text-xl font-extrabold">{hasInstaller ? t.freeTitle(p.trial.days) : t.requestTitle(p.trial.days)}</p>
          <p className="text-[15px] text-ink-2">{hasInstaller ? t.freeText : t.requestText}</p>
          {!hasInstaller && <Link href={`/${lang}/applications/${p.slug}/essai`} className="btn btn-acc">{d.tryRequest}<Arrow /></Link>}
        </>
      )}
      <a href={whatsappFor(lang === "ar" ? `السلام عليكم IT-RIM، لدي سؤال حول ${p.name.ar}.` : `Bonjour IT-RIM, j'ai une question sur ${p.name.fr}.`)} target="_blank" rel="noopener"
        className="inline-flex items-center gap-2 text-sm font-bold text-[var(--c)] hover:underline"><WhatsApp size={16} />{t.help} {t.ask}</a>
    </div>
  );
}

/** Carte « Guide et documents » : guide utilisateur (quand il existe), présentations et documents du logiciel. */
export function DocsCard({ p, lang, deckPdf }: { p: Product; lang: Locale; deckPdf?: string | null }) {
  const d = getDictionary(lang).product.dl;
  const docs = [...(p.documents ?? [])].sort((a) => (a.lang === lang ? -1 : 1));
  return (
    <div className="card grid content-start gap-4 p-6" id="guide">
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow">{d.docsTitle}</p>
        <span className="grid size-10 place-items-center rounded-xl bg-mist text-blue"><Download size={20} /></span>
      </div>
      <div className="grid gap-2 rounded-2xl border border-dashed border-line bg-canvas p-4">
        <p className="font-bold">{d.guide}</p>
        <p className="text-sm text-ink-soft">{d.guideSoon}</p>
        <a href={whatsappFor(d.guideMsg(p.name[lang]))} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--c)] hover:underline"><WhatsApp size={16} />{d.guideAsk}</a>
      </div>
      {(deckPdf || docs.length > 0) && (
        <ul className="grid gap-2">
          {deckPdf && <li><a href={deckPdf} download className="inline-flex items-center gap-2 font-semibold text-[var(--c)] hover:underline"><Download size={16} />{d.deckPdf}</a></li>}
          {docs.map((doc) => (
            <li key={doc.href}>
              <a href={doc.href} target={doc.href.endsWith(".pptx") ? undefined : "_blank"} rel="noopener" className="inline-flex items-center gap-2 font-semibold text-[var(--c)] hover:underline"><Download size={16} />{doc.label[lang]}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
