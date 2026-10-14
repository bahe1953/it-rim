"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { site } from "@/content/site";
import type { ResellerText } from "@/content/revendeurs";
import { Check, WhatsApp } from "./icons";

/**
 * Candidature « Revendeur fondateur » : rien n'est stocké par le site.
 * Le bouton ouvre WhatsApp avec la candidature déjà rédigée, vers le numéro d'IT-RIM.
 */
export default function ResellerForm({ lang, t }: { lang: Locale; t: ResellerText["f"] }) {
  const [one, setOne] = useState<Record<string, string>>({});
  const [many, setMany] = useState<Record<string, string[]>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [opened, setOpened] = useState(false);

  const pick = (k: string, v: string) => setOne((s) => ({ ...s, [k]: s[k] === v ? "" : v }));
  const toggle = (k: string, v: string) =>
    setMany((s) => {
      const cur = s[k] ?? [];
      return { ...s, [k]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const err = { name: !v("name"), phone: !v("phone"), confirm: f.get("confirm") !== "on" };
    setErrors(err);
    if (err.name || err.phone || err.confirm) {
      document.getElementById(err.name ? "r-name" : err.phone ? "r-phone" : "r-confirm")?.focus();
      return;
    }
    const city = one.city === t.cities[t.cities.length - 1] && v("otherCity") ? `${one.city} (${v("otherCity")})` : one.city;
    const line = (label: string, value?: string | string[]) => {
      const s = Array.isArray(value) ? value.join(", ") : value;
      return s ? `${label} : ${s}` : null;
    };
    const sections: [string, (string | null)[]][] = [
      [t.s1, [line(t.name, v("name")), line(t.company, v("company")), line(t.phone, v("phone")), line(t.email, v("email")), line(t.city, city)]],
      [t.s2, [line(t.activity, v("activity")), line(t.since, one.since), line(t.level, one.level), line(t.tools, many.tools)]],
      [t.s3, [line(t.sold, one.sold), line(t.worked, one.worked), line(t.reach, one.reach), line(t.audience, many.audience)]],
      [t.s4, [line(t.whyJoin, v("whyJoin")), line(t.bring, v("bring")), line(t.useSelf, one.useSelf)]],
    ];
    const blocks = sections
      .map(([, ls]) => ls.filter(Boolean))
      .map((ls, i) => (ls.length ? [`— ${sections[i][0]} —`, ...ls].join("\n") : null))
      .filter(Boolean);
    const text = [t.hello, ...blocks, `✔ ${t.confirm}`].join("\n\n");
    window.open(`${site.whatsappUrl}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setOpened(true);
  }

  const chips = (k: string, opts: string[], multi = false) => (
    <div className="flex flex-wrap gap-2">
      {opts.map((o) => {
        const on = multi ? (many[k] ?? []).includes(o) : one[k] === o;
        return (
          <label key={o} className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13.5px] font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-sky ${on ? "border-sky bg-mist text-blue" : "border-line bg-white hover:border-sky/60"}`}>
            <input type={multi ? "checkbox" : "radio"} name={k} value={o} className="sr-only" checked={on}
              onChange={() => (multi ? toggle(k, o) : pick(k, o))} onClick={() => { if (!multi && on) pick(k, o); }} />
            {on && <Check size={14} />}{o}
          </label>
        );
      })}
    </div>
  );

  const group = (n: number, title: string, children: ReactNode) => (
    <fieldset className="grid grid-cols-1 gap-4 border-t border-line pt-6 first:border-t-0 first:pt-0 sm:grid-cols-2">
      <legend className="contents">
        <span className="flex items-center gap-3 text-lg font-extrabold text-ink sm:col-span-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#16325c] text-sm text-white">{n}</span>{title}
        </span>
      </legend>
      {children}
    </fieldset>
  );

  const q = (label: string, children: ReactNode, full = true) => (
    <div className={`field ${full ? "sm:col-span-2" : ""}`}><span className="lab">{label}</span>{children}</div>
  );

  return (
    <form onSubmit={onSubmit} noValidate lang={lang} className="card grid gap-7 p-5 sm:p-8">
      {group(1, t.s1, <>
        <div className="field">
          <label htmlFor="r-name">{t.name} *</label>
          <input id="r-name" name="name" className="input" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "re-name" : undefined} />
          {errors.name && <span id="re-name" className="err">{t.required}</span>}
        </div>
        <div className="field">
          <label htmlFor="r-company">{t.company}</label>
          <input id="r-company" name="company" className="input" autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="r-phone">{t.phone} *</label>
          <input id="r-phone" name="phone" type="tel" dir="ltr" className="input" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "re-phone" : undefined} />
          {errors.phone && <span id="re-phone" className="err">{t.required}</span>}
        </div>
        <div className="field">
          <label htmlFor="r-email">{t.email}</label>
          <input id="r-email" name="email" type="email" dir="ltr" className="input" autoComplete="email" />
        </div>
        {q(t.city, <>
          {chips("city", t.cities)}
          {one.city === t.cities[t.cities.length - 1] && (
            <input name="otherCity" aria-label={t.otherCity} placeholder={t.otherCity} className="input mt-2 max-w-sm" />
          )}
        </>)}
      </>)}

      {group(2, t.s2, <>
        <div className="field sm:col-span-2">
          <label htmlFor="r-activity">{t.activity}</label>
          <input id="r-activity" name="activity" className="input" />
        </div>
        {q(t.since, <>{chips("since", t.sinceOpts)}</>, false)}
        {q(t.level, <>{chips("level", t.levelOpts)}</>, false)}
        {q(t.tools, <>{chips("tools", t.toolsOpts, true)}</>)}
      </>)}

      {group(3, t.s3, <>
        {q(t.sold, <>{chips("sold", [t.yes, t.no])}</>, false)}
        {q(t.worked, <>{chips("worked", [t.yes, t.no])}</>, false)}
        {q(t.reach, <>{chips("reach", t.reachOpts)}</>)}
        {q(t.audience, <>{chips("audience", t.audienceOpts, true)}</>)}
      </>)}

      {group(4, t.s4, <>
        <div className="field sm:col-span-2">
          <label htmlFor="r-why">{t.whyJoin}</label>
          <textarea id="r-why" name="whyJoin" className="input !min-h-24" />
        </div>
        <div className="field sm:col-span-2">
          <label htmlFor="r-bring">{t.bring}</label>
          <textarea id="r-bring" name="bring" className="input !min-h-24" />
        </div>
        {q(t.useSelf, <>{chips("useSelf", [t.yes, t.no])}</>)}
      </>)}

      <div className="grid gap-4 rounded-2xl bg-canvas p-4 sm:p-5">
        <label className="flex cursor-pointer items-start gap-3 text-[15px] font-semibold text-ink-2">
          <input id="r-confirm" name="confirm" type="checkbox" className="mt-1 size-5 shrink-0 accent-[#16325c]" aria-invalid={!!errors.confirm} aria-describedby={errors.confirm ? "re-confirm" : undefined} />
          {t.confirm}
        </label>
        {errors.confirm && <span id="re-confirm" className="err">{t.confirmRequired}</span>}
      </div>

      {opened && <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">{t.ok}</p>}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-md text-[13.5px] text-ink-soft">{t.note}</p>
        <button type="submit" className="btn btn-wa max-sm:w-full max-sm:justify-center"><WhatsApp size={18} />{t.send}</button>
      </div>
    </form>
  );
}
