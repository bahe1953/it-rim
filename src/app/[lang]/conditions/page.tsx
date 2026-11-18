import Link from "next/link";
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
        <p className="text-sm text-ink-soft">{d.legal.updated}</p>
        <p className="rounded-xl border border-line bg-canvas px-4 py-3 text-sm font-semibold" dir="ltr" lang="en">{d.legal.paddleClause}</p>
        <div className="prose-it">{d.legal.termsBody.map((p) => <p key={p}>{p}</p>)}</div>
        <p className="text-sm"><Link href={`/${lang}/remboursement`} className="font-semibold text-blue hover:underline">{d.legal.refund}</Link></p>
      </div>
    </section>
  );
}
