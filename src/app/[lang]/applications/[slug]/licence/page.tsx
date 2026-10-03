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
  locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/applications/[slug]/licence">): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!hasLocale(lang) || !p) return {};
  return { ...pageMetadata(lang, `/applications/${slug}/licence`, getDictionary(lang).product.licensePage.title(p.name[lang])), robots: { index: false } };
}

export default async function LicensePage({ params }: PageProps<"/[lang]/applications/[slug]/licence">) {
  const { lang, slug } = await params;
  const p = getProduct(slug);
  if (!hasLocale(lang) || !p) notFound();
  const d = getDictionary(lang);
  return (
    <section className={`acc-${p.accent} hero`}>
      <div className="wrap relative z-10 grid items-start gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        <div className="grid gap-4">
          <span className="p-icon size-14 rounded-2xl"><ProductIcon accent={p.accent} size={28} /></span>
          <h1 className="text-[clamp(30px,3.6vw,44px)]">{d.product.licensePage.title(p.name[lang])}</h1>
          <p className="sub">{d.product.licensePage.text}</p>
        </div>
        <ContactForm lang={lang} labels={d.contact.form} kind="license" product={p.slug} productName={p.name[lang]} showTypes={false} whatsappUrl={site.whatsappUrl} />
      </div>
    </section>
  );
}
