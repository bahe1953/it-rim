import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { BrandLogo, Facebook, LinkedIn, Mail, Pin, WhatsApp, YouTube } from "./icons";
import { LangSwitch } from "./Header";

export default function Footer({ lang }: { lang: Locale }) {
  const d = getDictionary(lang);
  const nav = [
    [`/${lang}`, d.nav.home],
    [`/${lang}/applications`, d.nav.apps],
    [`/${lang}/realisations`, d.nav.work],
    [`/${lang}/expertise`, d.nav.expertise],
    [`/${lang}/a-propos`, d.nav.about],
    [`/${lang}/contact`, d.nav.contact],
  ];
  const socials = [
    { url: site.social.linkedin, label: "LinkedIn", Icon: LinkedIn },
    { url: site.social.youtube, label: "YouTube", Icon: YouTube },
    { url: site.social.facebook, label: "Facebook", Icon: Facebook },
    { url: site.whatsappUrl, label: "WhatsApp", Icon: WhatsApp },
  ].filter((s) => s.url);

  return (
    <footer className="footer pt-14 pb-5 lg:pt-18">
      <div className="wrap">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_.8fr_1.2fr_1.3fr]">
          <div className="grid content-start gap-3.5 sm:col-span-2 lg:col-span-1">
            <Link href={`/${lang}`} className="flex w-fit items-center gap-2.5" dir="ltr">
              <BrandLogo size={64} />
              <span className="leading-none">
                <span className="block font-[family-name:var(--font-lat)] text-[21px] font-extrabold text-ink">IT-RIM</span>
                <span className="mt-1 block font-[family-name:var(--font-lat)] text-[10px] font-semibold text-blue">Digital Products &amp; Business Solutions</span>
              </span>
            </Link>
            <p className="max-w-[36ch] text-sm text-ink-2">{d.footer.tagline}</p>
            <div className="flex gap-2">
              {socials.map(({ url, label, Icon }) => (
                <a key={label} href={url!} target="_blank" rel="noopener" aria-label={label} className="grid size-9 place-items-center rounded-[9px] bg-blue text-white hover:bg-blue-h">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3.5 text-[15px] font-extrabold">{d.footer.navigation}</h2>
            <ul className="grid gap-2.5 text-sm text-ink-2">
              {nav.map(([href, label]) => <li key={href}><Link href={href} className="hover:text-blue">{label}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="mb-3.5 text-[15px] font-extrabold">{d.footer.contact}</h2>
            <ul className="grid gap-2.5 text-sm text-ink-2">
              <li className="flex items-center gap-2.5"><Pin className="text-blue" />{d.footer.city}</li>
              <li className="flex items-center gap-2.5"><Mail className="text-blue" /><a href={`mailto:${site.email}`} className="ltr hover:text-blue">{site.email}</a></li>
              <li className="flex items-center gap-2.5"><WhatsApp size={16} className="text-blue" /><a href={site.whatsappUrl} target="_blank" rel="noopener" className="ltr hover:text-blue">{site.whatsappDisplay}</a></li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="mb-2 text-[15px] font-extrabold">{d.footer.newsletter}</h2>
            <p className="mb-3 text-[13.5px] text-ink-soft">{d.footer.newsletterText}</p>
            <a href={`${site.whatsappUrl}?text=${encodeURIComponent(d.footer.newsletterMsg)}`} target="_blank" rel="noopener" className="btn btn-wa"><WhatsApp size={18} />{d.footer.newsletterCta}</a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4.5 text-[13px] text-ink-soft">
          <span>© {new Date().getFullYear()} IT-RIM. {d.footer.rights}</span>
          <nav className="flex flex-wrap gap-4" aria-label={d.legal.privacy}>
            <Link href={`/${lang}/confidentialite`} className="hover:text-blue">{d.legal.privacy}</Link>
            <Link href={`/${lang}/conditions`} className="hover:text-blue">{d.legal.terms}</Link>
          </nav>
          <LangSwitch lang={lang} label={d.common.language} />
        </div>
      </div>
    </footer>
  );
}
