import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProduct, products } from "@/content/products";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import ContactForm from "@/components/ContactForm";
import { ProductIcon } from "@/components/icons";

export const dynamicParams = false;
export const generateStaticParams = () =>
  locales.flatMap((lang) => products.filter((p) => p.trial.enabled).map((p) => ({ lang, slug: p.slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/applications/[slug]/essai">): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!hasLocale(lang) || !p) return {};
  return { ...pageMetadata(lang, `/applications/${slug}/essai`, getDictionary(lang).product.trialPage.title(p.name[lang])), robots: { index: false } };
}

export default async function TrialPage({ params }: PageProps<"/[lang]/applications/[slug]/essai">) {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!hasLocale(lang) || !p || !p.trial.enabled) notFound();
  const d = getDictionary(lang);
  return (
    <section className={`acc-${p.accent} hero`}>
      <div className="wrap relative z-10 grid items-start gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        <div className="grid gap-4">
          <span className="p-icon size-14 rounded-2xl"><ProductIcon accent={p.accent} size={28} /></span>
          <h1 className="text-[clamp(30px,3.6vw,44px)]">{d.product.trialPage.title(p.name[lang])}</h1>
          <p className="sub">{d.product.trialPage.text(p.trial.days)}</p>
          <p className="w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-bold text-amber-800">{d.product.trial.label} · {p.trial.days} {d.common.days}</p>
        </div>
        <ContactForm lang={lang} labels={d.contact.form} kind="trial" product={p.slug} productName={p.name[lang]} showTypes={false} whatsappUrl={site.whatsappUrl} />
      </div>
    </section>
  );
}
