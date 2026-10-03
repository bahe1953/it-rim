import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/conditions">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/conditions", getDictionary(lang).legal.terms);
}

export default async function LegalPage({ params }: PageProps<"/[lang]/conditions">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <section className="sec">
      <div className="wrap grid max-w-3xl gap-6">
        <h1 className="text-[clamp(30px,3.6vw,42px)]">{d.legal.terms}</h1>
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">{d.legal.draft}</p>
        <div className="prose-it">{d.legal.termsBody.map((p) => <p key={p}>{p}</p>)}</div>
      </div>
    </section>
  );
}
