"use client";

import { useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import { site } from "@/content/site";
import { WhatsApp } from "./icons";

export type FormLabels = {
  name: string; company: string; type: string; product: string; message: string;
  send: string; waNote: string; waHello: string; types: string[]; ok: string; required: string;
};

type Props = {
  lang: Locale;
  labels: FormLabels;
  kind?: "project" | "trial" | "license";
  product?: string;
  productName?: string;
  showTypes?: boolean;
  whatsappUrl?: string;
};

/**
 * Formulaire de contact : aucun email n'est envoyé par le site.
 * Le bouton ouvre WhatsApp (application ou WhatsApp Web) avec le message déjà rédigé
 * vers le numéro d'IT-RIM ; le visiteur n'a plus qu'à appuyer sur « Envoyer ».
 */
export default function ContactForm({ lang, labels, kind = "project", productName, showTypes = true }: Props) {
  const [types, setTypes] = useState<string[]>(kind === "license" ? [labels.types[5]] : []);
  const [nameError, setNameError] = useState(false);
  const [opened, setOpened] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    if (!name) { setNameError(true); return; }
    setNameError(false);
    const company = String(f.get("company") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const details = [
      `${labels.name} : ${name}`,
      company && `${labels.company} : ${company}`,
      productName && `${labels.product} : ${productName}`,
      types.length > 0 && `${labels.type} : ${types.join(", ")}`,
    ].filter(Boolean);
    const text = [labels.waHello, details.join("\n"), message].filter(Boolean).join("\n\n");
    window.open(`${site.whatsappUrl}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate lang={lang} className="card grid min-w-0 grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-8">
      <div className="field">
        <label htmlFor="f-name">{labels.name} *</label>
        <input id="f-name" name="name" className="input" autoComplete="name" required aria-invalid={nameError} aria-describedby={nameError ? "e-name" : undefined} />
        {nameError && <span id="e-name" className="err">{labels.required}</span>}
      </div>
      <div className="field">
        <label htmlFor="f-company">{labels.company}</label>
        <input id="f-company" name="company" className="input" autoComplete="organization" />
      </div>

      {productName && (
        <div className="field sm:col-span-2">
          <span className="lab">{labels.product}</span>
          <span className="chip w-fit font-semibold">{productName}</span>
        </div>
      )}

      {showTypes && (
        <fieldset className="field sm:col-span-2">
          <legend className="lab mb-1.5">{labels.type}</legend>
          <div className="flex flex-wrap gap-2">
            {labels.types.map((t) => {
              const on = types.includes(t);
              return (
                <label key={t} className={`cursor-pointer rounded-full border px-3.5 py-2 text-[13.5px] font-semibold transition ${on ? "border-sky bg-mist text-blue" : "border-line bg-white"}`}>
                  <input type="checkbox" value={t} className="sr-only" checked={on}
                    onChange={() => setTypes((s) => (on ? s.filter((x) => x !== t) : [...s, t]))} />
                  {t}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="field sm:col-span-2">
        <label htmlFor="f-message">{labels.message}</label>
        <textarea id="f-message" name="message" className="input" />
      </div>

      {opened && (
        <p role="status" className="rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 sm:col-span-2">{labels.ok}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 sm:col-span-2">
        <p className="text-[13.5px] text-ink-soft">{labels.waNote}</p>
        <button type="submit" className="btn btn-wa"><WhatsApp size={18} />{labels.send}</button>
      </div>
    </form>
  );
}
