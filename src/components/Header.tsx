"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { swapLocale, type Locale } from "@/i18n/config";
import { Arrow, Logo, WhatsApp } from "./icons";

type NavItem = { href: string; label: string };
type Props = {
  lang: Locale;
  nav: NavItem[];
  labels: { requestProject: string; menu: string; close: string; language: string; tagline: string };
  whatsappUrl: string;
};

function rememberLang(l: Locale) {
  document.cookie = `lang=${l}; path=/; max-age=31536000; samesite=lax`;
}

export function LangSwitch({ lang, label, className = "" }: { lang: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${lang}`;
  return (
    <div className={`flex items-center gap-2 text-sm font-semibold text-ink-soft ${className}`} role="group" aria-label={label}>
      <Link href={swapLocale(pathname, "fr")} hrefLang="fr" lang="fr" onClick={() => rememberLang("fr")}
        aria-current={lang === "fr" ? "true" : undefined} className={lang === "fr" ? "font-extrabold text-ink" : "hover:text-ink"}>FR</Link>
      <span className="h-3.5 w-px bg-line" aria-hidden="true" />
      <Link href={swapLocale(pathname, "ar")} hrefLang="ar" lang="ar" onClick={() => rememberLang("ar")}
        aria-current={lang === "ar" ? "true" : undefined} className={`font-[family-name:var(--font-ar)] ${lang === "ar" ? "font-extrabold text-ink" : "hover:text-ink"}`}>العربية</Link>
    </div>
  );
}

export default function Header({ lang, nav, labels, whatsappUrl }: Props) {
  const pathname = usePathname() || `/${lang}`;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const burger = burgerRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      burger?.focus();
    };
  }, [open]);

  const isActive = (href: string) => (href === `/${lang}` ? pathname === href : pathname.startsWith(href));

  return (
    <header className="hdr" data-scrolled={scrolled}>
      <div className="wrap flex h-16 items-center gap-6 lg:h-[74px]">
        <Link href={`/${lang}`} className="flex items-center gap-2.5" dir="ltr" aria-label="IT-RIM">
          <Logo size={40} />
          <span className="leading-none">
            <span className="block font-[family-name:var(--font-lat)] text-[21px] font-extrabold tracking-tight text-ink">IT-RIM</span>
            <span className="mt-1 hidden font-[family-name:var(--font-lat)] text-[10px] font-semibold text-blue sm:block">Digital Products &amp; Business Solutions</span>
          </span>
        </Link>

        <nav className="ms-auto hidden gap-7 xl:flex" aria-label={labels.menu}>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="nav-link" aria-current={isActive(n.href) ? "page" : undefined}>{n.label}</Link>
          ))}
        </nav>
        <LangSwitch lang={lang} label={labels.language} className="hidden xl:flex" />
        <Link href={`/${lang}/contact`} className="btn btn-p btn-sm hidden xl:inline-flex">{labels.requestProject}<Arrow /></Link>

        <button ref={burgerRef} type="button" className="ms-auto grid size-11 place-items-center rounded-xl border border-line xl:hidden"
          aria-label={labels.menu} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
          <span className="block h-0.5 w-[18px] rounded bg-ink shadow-[0_6px_0_var(--color-ink),0_-6px_0_var(--color-ink)]" />
        </button>
      </div>

      {open && createPortal(
        <div dir={lang === "ar" ? "rtl" : "ltr"} className="fixed inset-0 z-[60] bg-ink/30 xl:hidden" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div id="mobile-menu" role="dialog" aria-modal="true" aria-label={labels.menu}
            className="absolute inset-y-0 end-0 flex w-[min(88vw,380px)] flex-col gap-5 overflow-auto bg-white px-5 pt-[calc(18px+env(safe-area-inset-top,0px))] pb-[calc(24px+env(safe-area-inset-bottom,0px))]">
            <div className="flex items-center justify-between">
              <LangSwitch lang={lang} label={labels.language} />
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label={labels.close}
                className="grid size-11 place-items-center rounded-xl border border-line text-2xl leading-none">×</button>
            </div>
            <nav className="grid" aria-label={labels.menu}>
              {nav.map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={isActive(n.href) ? "page" : undefined}
                  className="flex items-center justify-between border-b border-line py-4 text-lg font-semibold aria-[current=page]:text-blue">
                  {n.label}<Arrow size={18} />
                </Link>
              ))}
            </nav>
            <div className="mt-auto grid gap-2.5">
              <Link href={`/${lang}/contact`} onClick={() => setOpen(false)} className="btn btn-p">{labels.requestProject}<Arrow /></Link>
              <a href={whatsappUrl} target="_blank" rel="noopener" className="btn btn-wa"><WhatsApp />WhatsApp</a>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </header>
  );
}
