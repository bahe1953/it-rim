"use client";

import { useActionState, useState } from "react";
import { submitForm, type FormState } from "@/lib/actions";
import type { Locale } from "@/i18n/config";
import { Arrow, WhatsApp } from "./icons";

export type FormLabels = {
  name: string; company: string; phone: string; email: string; type: string; product: string; message: string;
  send: string; sending: string; types: string[]; ok: string; notConfigured: string; error: string;
  required: string; invalidEmail: string; contactRequired: string;
};

type Props = {
  lang: Locale;
  labels: FormLabels;
  kind?: "project" | "trial" | "license";
  product?: string;
  productName?: string;
  showTypes?: boolean;
  whatsappUrl: string;
};

const initial: FormState = { status: "idle" };

export default function ContactForm({ lang, labels, kind = "project", product, productName, showTypes = true, whatsappUrl }: Props) {
  const [state, action, pending] = useActionState(submitForm, initial);
  const [types, setTypes] = useState<string[]>(kind === "license" ? [labels.types[5]] : []);
  const err = state.status === "invalid" ? state.fields : {};
  const msg = (k: string) =>
    err[k] === "required" ? labels.required : err[k] === "email" ? labels.invalidEmail : err[k] === "contact" ? labels.contactRequired : null;

  if (state.status === "ok") {
    return <p role="status" className="rounded-2xl bg-emerald-50 p-5 font-semibold text-emerald-800">{labels.ok}</p>;
  }

  return (
    <form action={action} noValidate className="card grid min-w-0 grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-8">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="lang" value={lang} />
      {product && <input type="hidden" name="product" value={product} />}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="field">
        <label htmlFor="f-name">{labels.name} *</label>
        <input id="f-name" name="name" className="input" autoComplete="name" required aria-invalid={!!err.name} aria-describedby={err.name ? "e-name" : undefined} />
        {msg("name") && <span id="e-name" className="err">{msg("name")}</span>}
      </div>
      <div className="field">
        <label htmlFor="f-company">{labels.company}</label>
        <input id="f-company" name="company" className="input" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="f-phone">{labels.phone}</label>
        <input id="f-phone" name="phone" type="tel" className="input ltr-field" autoComplete="tel" placeholder="+222" aria-invalid={!!err.phone} aria-describedby={err.phone ? "e-phone" : undefined} />
        {msg("phone") && <span id="e-phone" className="err">{msg("phone")}</span>}
      </div>
      <div className="field">
        <label htmlFor="f-email">{labels.email}</label>
        <input id="f-email" name="email" type="email" className="input ltr-field" autoComplete="email" aria-invalid={!!err.email} aria-describedby={err.email ? "e-email" : undefined} />
        {msg("email") && <span id="e-email" className="err">{msg("email")}</span>}
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
                  <input type="checkbox" name="types" value={t} className="sr-only" checked={on}
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

      {state.status === "not_configured" && (
        <p role="status" className="flex flex-wrap items-center gap-3 rounded-xl bg-amber-50 p-4 text-sm font-semibold text-amber-900 sm:col-span-2">
          {labels.notConfigured}
          <a href={whatsappUrl} target="_blank" rel="noopener" className="btn btn-wa btn-sm"><WhatsApp size={16} />WhatsApp</a>
        </p>
      )}
      {(state.status === "invalid" || state.status === "error") && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800 sm:col-span-2">{labels.error}</p>
      )}

      <div className="flex justify-end sm:col-span-2">
        <button type="submit" className="btn btn-p" disabled={pending}>{pending ? labels.sending : labels.send}<Arrow /></button>
      </div>
    </form>
  );
}
