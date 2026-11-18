import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/remboursement">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/remboursement", getDictionary(lang).legal.refund);
}

export default async function RefundPage({ params }: PageProps<"/[lang]/remboursement">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <section className="sec">
      <div className="wrap grid max-w-3xl gap-6">
        <h1 className="text-[clamp(30px,3.6vw,42px)]">{d.legal.refund}</h1>
        <p className="text-sm text-ink-soft">{d.legal.updated}</p>
        <div className="prose-it">{d.legal.refundBody.map((p) => <p key={p}>{p}</p>)}</div>
      </div>
    </section>
  );
}
