import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { billing } from "@/content/pricing";
import { storeText } from "@/content/store";
import { pageMetadata } from "@/lib/seo";
import { Mail, Pin, WhatsApp } from "@/components/icons";

export async function generateMetadata({ params }: PageProps<"/boutique/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMetadata(lang, "/contact", storeText[lang].contact.title, storeText[lang].contact.lead);
}

/** Contact de la boutique : email, WhatsApp et adresse, sans formulaire de demande de projet. */
export default async function StoreContact({ params }: PageProps<"/boutique/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = storeText[lang].contact;
  const d = getDictionary(lang);
  return (
    <section className="sec">
      <div className="wrap grid max-w-3xl gap-6">
        <h1 className="text-[clamp(30px,3.6vw,42px)]">{c.title}</h1>
        <p className="text-ink-2">{c.lead}</p>
        <ul className="card grid gap-4 p-7">
          <li className="flex items-center gap-3"><Mail className="text-blue" /><span className="font-semibold">{c.email} :</span>
            <a href={`mailto:${site.email}`} className="ltr font-semibold text-blue hover:underline">{site.email}</a></li>
          <li className="flex items-center gap-3"><WhatsApp size={18} className="text-blue" /><span className="font-semibold">{c.whatsapp} :</span>
            <a href={site.whatsappUrl} target="_blank" rel="noopener" className="ltr font-semibold text-blue hover:underline">{site.whatsappDisplay}</a></li>
          <li className="flex items-center gap-3"><Pin className="text-blue" /><span className="font-semibold">{c.address} :</span>
            <span>{billing.tradeName} – {billing.legalName}, {d.footer.city}</span></li>
        </ul>
      </div>
    </section>
  );
}
