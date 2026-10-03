"use client";

import { useActionState } from "react";
import { submitForm, type FormState } from "@/lib/actions";
import type { Locale } from "@/i18n/config";
import { Arrow } from "./icons";

type Props = {
  lang: Locale;
  kind?: "newsletter" | "notify";
  product?: string;
  placeholder: string;
  ok: string;
  notConfigured: string;
  invalid: string;
  submitLabel: string;
};

const initial: FormState = { status: "idle" };

export default function Newsletter({ lang, kind = "newsletter", product, placeholder, ok, notConfigured, invalid, submitLabel }: Props) {
  const [state, action, pending] = useActionState(submitForm, initial);
  if (state.status === "ok") return <p role="status" className="text-sm font-semibold text-emerald-700">{ok}</p>;
  return (
    <div className="grid gap-2">
      <form action={action} noValidate className="flex overflow-hidden rounded-xl border border-line bg-white shadow-[var(--shadow-card)]">
        <input type="hidden" name="kind" value={kind} />
        <input type="hidden" name="lang" value={lang} />
        {product && <input type="hidden" name="product" value={product} />}
        <input type="email" name="email" aria-label={placeholder} placeholder={placeholder} required
          className="ltr-field h-12 min-w-0 flex-1 bg-transparent px-4 text-[15px] outline-none" />
        <button type="submit" disabled={pending} aria-label={submitLabel} className="grid w-13 place-items-center bg-blue px-4 text-white hover:bg-blue-h">
          <Arrow size={18} />
        </button>
      </form>
      {state.status === "not_configured" && <p role="status" className="text-[13px] text-amber-800">{notConfigured}</p>}
      {(state.status === "invalid" || state.status === "error") && <p role="alert" className="text-[13px] text-red-700">{invalid}</p>}
    </div>
  );
}
