"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { ShowItem } from "@/content/showcase";
import { Arrow, Check, Chevron, Close, Download, Play, WhatsApp } from "./icons";

export type Labels = {
  tabs: { all: string; app: string; web: string };
  kind: { app: string; web: string };
  watch: string; minute: string; close: string; prev: string; next: string;
  features: string; forWhom: string; video: string; screens: string; download: string; flow: string; modules: string;
};

type Filter = "all" | "app" | "web";
const noop = () => () => {};

const accentVars = (it: ShowItem) => ({ "--c": it.accent.c, "--cg": it.accent.g, "--cb": it.accent.bg }) as CSSProperties;

/**
 * Vitrine des logiciels et réalisations : une grille de cartes ;
 * un clic ouvre une fiche avec le film de présentation d'une minute, les captures réelles et les actions.
 */
export default function Showcase({ lang, items, labels, tabs = true }: { lang: Locale; items: ShowItem[]; labels: Labels; tabs?: boolean }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const visible = items.filter((it) => filter === "all" || it.kind === filter);
  const counts = { all: items.length, app: items.filter((i) => i.kind === "app").length, web: items.filter((i) => i.kind === "web").length };
  const showTabs = tabs && counts.app > 0 && counts.web > 0;

  return (
    <div className="grid gap-7">
      {showTabs && (
        <div className="flex flex-wrap gap-2" role="group" aria-label={labels.tabs.all}>
          {(["all", "app", "web"] as const).map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
              className={`inline-flex items-center gap-2 rounded-full border px-4.5 py-2.5 text-[14.5px] font-bold transition ${filter === f ? "border-blue bg-blue text-white shadow-[0_10px_20px_-12px_var(--color-blue)]" : "border-line bg-white text-ink-2 hover:border-sky hover:text-blue"}`}>
              {labels.tabs[f]}
              <span className={`grid min-w-6 place-items-center rounded-full px-1.5 text-xs ${filter === f ? "bg-white/25" : "bg-mist text-blue"}`}>{counts[f]}</span>
            </button>
          ))}
        </div>
      )}

      <motion.ul layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((it) => (
            <motion.li key={it.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }} className="min-w-0">
              <Card it={it} labels={labels} onOpen={() => setOpen(items.indexOf(it))} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Viewer lang={lang} items={items} index={open} labels={labels} onClose={() => setOpen(null)} onMove={setOpen} />
    </div>
  );
}

function Card({ it, labels, onOpen }: { it: ShowItem; labels: Labels; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} style={accentVars(it)}
      className="group card lift relative flex h-full w-full flex-col overflow-hidden text-start outline-offset-4">
      <span className="absolute inset-x-0 top-0 z-10 h-1 bg-[linear-gradient(90deg,var(--c),var(--cg))]" />
      <span className="relative block aspect-video overflow-hidden bg-[var(--cb)]">
        <Image src={it.card} alt="" fill sizes="(max-width: 640px) 92vw, (max-width: 1280px) 46vw, 380px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]" />
        <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,28,52,.55))]" />
        <span className="absolute end-3.5 top-3.5 rounded-full bg-white/92 px-2.5 py-1 text-[11.5px] font-extrabold tracking-wide text-[var(--c)] uppercase shadow-sm">
          {labels.kind[it.kind]}
        </span>
        <span className="absolute inset-0 grid place-items-center">
          <span className="relative grid size-16 place-items-center rounded-full bg-white/95 text-[var(--c)] shadow-[0_14px_30px_-10px_rgba(0,0,0,.45)] transition-transform duration-300 group-hover:scale-110">
            <span className="absolute inset-0 rounded-full border-2 border-white/80 motion-safe:animate-[ping_2.2s_ease-out_infinite]" />
            <Play size={22} className="ms-1" />
          </span>
        </span>
        {it.logo && (
          <span className="absolute end-3.5 bottom-3 grid size-14 place-items-center rounded-2xl bg-white p-1.5 shadow-[0_10px_24px_-10px_rgba(0,0,0,.45)]">
            <Image src={it.logo} alt="" width={52} height={50} className="h-auto w-full" />
          </span>
        )}
        <span className="absolute bottom-3 start-3.5 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
          <Play size={10} />{it.video.duration}
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-3 p-5">
        <span className="block">
          <span className="block text-[21px] leading-tight font-extrabold text-ink">{it.name}</span>
          <span className="mt-1 block text-[13.5px] font-bold text-[var(--c)]">{it.category}</span>
          {it.by && <span className="block text-xs font-medium text-ink-soft">{it.by}</span>}
        </span>
        <span className="line-clamp-3 block text-[14.5px] leading-relaxed text-ink-2">{it.summary}</span>
        <span className="flex flex-wrap gap-1.5">
          {it.features.slice(0, 3).map((f) => (
            <span key={f} className="rounded-full bg-[var(--cb)] px-2.5 py-1 text-[12px] font-semibold text-[var(--c)]">{f}</span>
          ))}
        </span>
        <span className="mt-auto inline-flex items-center gap-2 pt-1 text-[14.5px] font-extrabold text-[var(--c)]">
          {labels.watch}<Arrow />
        </span>
      </span>
    </button>
  );
}

function Viewer({ lang, items, index, labels, onClose, onMove }: {
  lang: Locale; items: ShowItem[]; index: number | null; labels: Labels; onClose: () => void; onMove: (i: number) => void;
}) {
  const [media, setMedia] = useState<number>(-1); // -1 = vidéo, sinon index de capture
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const it = index === null ? null : items[index];
  const rtl = lang === "ar";
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  const move = useCallback((delta: number) => {
    if (index === null) return;
    setMedia(-1);
    onMove((index + delta + items.length) % items.length);
  }, [index, items.length, onMove]);

  useEffect(() => {
    if (index === null) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prevOverflow; lastFocus.current?.focus(); };
  }, [index === null]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMedia(-1); onClose(); }
      if (e.key === "ArrowRight") move(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") move(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, move, onClose, rtl]);

  if (!mounted) return null;
  const close = () => { setMedia(-1); onClose(); };

  return createPortal(
    <AnimatePresence>
      {it && (
        <motion.div key="overlay" dir={rtl ? "rtl" : "ltr"} lang={lang}
          className="fixed inset-0 z-[200] grid place-items-center bg-[rgba(6,22,42,.62)] p-0 backdrop-blur-[6px] sm:p-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div role="dialog" aria-modal="true" aria-labelledby="sv-title" style={accentVars(it)}
            className="relative flex h-full w-full max-w-[1180px] flex-col overflow-hidden bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,.6)] sm:h-auto sm:max-h-[94vh] sm:rounded-[28px]"
            initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }} onClick={(e) => e.stopPropagation()}>
            <span className="h-1.5 shrink-0 bg-[linear-gradient(90deg,var(--c),var(--cg))]" />

            <header className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-3 sm:px-6">
              {it.logo ? (
                <Image src={it.logo} alt="" width={40} height={38} className="h-auto w-10 shrink-0" />
              ) : (
                <span className="rounded-full bg-[var(--cb)] px-2.5 py-1 text-[11.5px] font-extrabold tracking-wide text-[var(--c)] uppercase">{labels.kind[it.kind]}</span>
              )}
              <div className="min-w-0 flex-1">
                <h2 id="sv-title" className="truncate text-[19px] font-extrabold sm:text-[22px]">{it.name}</h2>
              </div>
              {items.length > 1 && (
                <div className="flex gap-1.5">
                  <button type="button" onClick={() => move(-1)} aria-label={labels.prev} className="grid size-10 place-items-center rounded-full border border-line text-ink-2 hover:border-sky hover:text-blue"><span className="rotate-180"><Chevron size={18} /></span></button>
                  <button type="button" onClick={() => move(1)} aria-label={labels.next} className="grid size-10 place-items-center rounded-full border border-line text-ink-2 hover:border-sky hover:text-blue"><Chevron size={18} /></button>
                </div>
              )}
              <button ref={closeRef} type="button" onClick={close} aria-label={labels.close} className="grid size-10 place-items-center rounded-full bg-mist text-ink hover:bg-blue hover:text-white"><Close size={18} /></button>
            </header>

            <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto p-4 sm:p-6 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
              {/* Média : film d'une minute ou capture réelle */}
              <div className="grid min-w-0 content-start gap-3">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0b1d33] shadow-[0_30px_60px_-30px_rgba(10,40,80,.6)]">
                  {media < 0 ? (
                    <video key={it.id + lang} src={it.video.src} poster={it.video.poster} controls autoPlay muted={!it.video.sound} playsInline preload="metadata" className="absolute inset-0 size-full object-contain" />
                  ) : (
                    <Image key={it.screens[media].src} src={it.screens[media].src} alt={it.screens[media].caption} fill sizes="(max-width: 1024px) 94vw, 680px" className="bg-white object-contain" />
                  )}
                </div>
                {it.screens.length > 0 && (
                  <div className="grid gap-2">
                    <p className="text-[13px] font-bold text-ink-soft">{labels.screens}</p>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      <button type="button" onClick={() => setMedia(-1)} aria-pressed={media < 0}
                        className={`grid h-16 w-24 shrink-0 place-items-center gap-0.5 rounded-xl border-2 text-[11px] font-bold ${media < 0 ? "border-[var(--c)] bg-[var(--cb)] text-[var(--c)]" : "border-line text-ink-2"}`}>
                        <Play size={14} />{labels.video}
                      </button>
                      {it.screens.map((s, i) => (
                        <button key={s.src} type="button" onClick={() => setMedia(i)} aria-pressed={media === i} title={s.caption}
                          className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 bg-white ${media === i ? "border-[var(--c)]" : "border-line"}`}>
                          <Image src={s.src} alt={s.caption} fill sizes="96px" className="object-cover object-top" />
                        </button>
                      ))}
                    </div>
                    {media >= 0 && <p className="text-sm font-semibold text-ink-2">{it.screens[media].caption}</p>}
                  </div>
                )}
                {it.flow.length > 0 && (
                  <div className="mt-2 grid gap-2.5 rounded-2xl bg-[var(--cb)] p-4">
                    <p className="text-[13px] font-extrabold tracking-wide text-[var(--c)] uppercase">{labels.flow}</p>
                    <ol className="flex flex-wrap items-center gap-1.5">
                      {it.flow.map((st, i) => (
                        <li key={st} className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13.5px] font-bold shadow-sm">
                            <span className="grid size-5 place-items-center rounded-full bg-[var(--c)] text-[11px] text-white">{i + 1}</span>{st}
                          </span>
                          {i < it.flow.length - 1 && <span className="text-[var(--c)]"><Arrow size={14} /></span>}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {it.modules.length > 0 && (
                  <div className="grid gap-2">
                    <p className="text-[13px] font-extrabold tracking-wide text-ink-soft uppercase">{labels.modules}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {it.modules.map((m) => <span key={m} className="rounded-lg border border-line bg-white px-2.5 py-1 text-[12.5px] font-semibold text-ink-2">{m}</span>)}
                    </div>
                  </div>
                )}
              </div>

              {/* Informations */}
              <div className="grid min-w-0 content-start gap-5">
                <div>
                  <p className="text-[15px] font-bold text-[var(--c)]">{it.category}</p>
                  {it.by && <p className="text-[13px] font-medium text-ink-soft">{it.by}</p>}
                  <p className="mt-2.5 text-[15.5px] leading-relaxed text-ink-2">{it.presentation}</p>
                </div>

                {it.features.length > 0 && (
                  <div>
                    <h3 className="mb-2.5 text-[13px] font-extrabold tracking-wide text-ink-soft uppercase">{labels.features}</h3>
                    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {it.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-[14.5px] font-semibold">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[var(--cb)] text-[var(--c)]"><Check size={12} /></span>{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {it.forWhom.length > 0 && (
                  <div>
                    <h3 className="mb-2 text-[13px] font-extrabold tracking-wide text-ink-soft uppercase">{labels.forWhom}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {it.forWhom.map((f) => <span key={f} className="rounded-full border border-line px-3 py-1.5 text-[13px] font-semibold">{f}</span>)}
                    </div>
                  </div>
                )}

                {it.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {it.badges.map((b) => <span key={b} className="rounded-lg bg-[var(--cb)] px-2.5 py-1 text-[12.5px] font-bold text-[var(--c)]">{b}</span>)}
                  </div>
                )}

                <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {it.details.external ? (
                    <a href={it.details.href} target="_blank" rel="noopener" className="btn btn-acc min-h-12">{it.details.label}<Arrow /></a>
                  ) : (
                    <Link href={it.details.href} className="btn btn-acc min-h-12" onClick={close}>{it.details.label}<Arrow /></Link>
                  )}
                  {it.download && <Link href={it.download} className="btn btn-try min-h-12" onClick={close}><Download size={17} />{labels.download}</Link>}
                  <a href={it.whatsapp.href} target="_blank" rel="noopener" className={`btn btn-wa min-h-12 ${it.download ? "sm:col-span-2 lg:col-span-1 xl:col-span-2" : ""}`}><WhatsApp size={18} />{it.whatsapp.label}</a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
