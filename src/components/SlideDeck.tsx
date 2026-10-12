"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Arrow, Download } from "@/components/icons";

type Props = {
  dir: string;
  lang: "fr" | "ar";
  titles: string[];
  pdf: string;
  pptx: string;
  labels: { prev: string; next: string; pdf: string; pptx: string; slide: string };
};

/** Visionneuse de diapositives : image principale, boutons précédent / suivant, vignettes, flèches du clavier. */
export default function SlideDeck({ dir, lang, titles, pdf, pptx, labels }: Props) {
  const n = titles.length;
  const [i, setI] = useState(0);
  const go = useCallback((k: number) => setI((v) => (v + k + n) % n), [n]);
  const rtl = lang === "ar";
  const src = (k: number) => `${dir}/${lang}/${String(k + 1).padStart(2, "0")}.webp`;
  const counter = labels.slide.replace("{i}", String(i + 1)).replace("{n}", String(n));

  return (
    <div
      className="grid gap-4"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(rtl ? -1 : 1);
        if (e.key === "ArrowLeft") go(rtl ? 1 : -1);
      }}
    >
      <figure className="card overflow-hidden p-2" aria-roledescription="carousel">
        <Image
          key={i}
          src={src(i)}
          alt={titles[i]}
          width={1600}
          height={901}
          sizes="(max-width: 1100px) 94vw, 1040px"
          priority={i === 0}
          className="block h-auto w-full rounded-lg bg-white"
        />
        <figcaption className="flex flex-wrap items-center justify-between gap-3 px-2 pt-3 pb-1">
          <span className="text-[15px] font-semibold text-ink">{titles[i]}</span>
          <span className="text-sm text-ink-soft" aria-live="polite">{counter}</span>
        </figcaption>
      </figure>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" onClick={() => go(-1)} className="btn btn-w btn-sm" aria-label={labels.prev}>
          <span className="inline-flex rotate-180"><Arrow /></span>
        </button>
        <button type="button" onClick={() => go(1)} className="btn btn-w btn-sm" aria-label={labels.next}>
          <Arrow />
        </button>
        <span className="grow" />
        <a href={pdf} download className="btn btn-acc btn-sm"><Download size={16} /> {labels.pdf}</a>
        <a href={pptx} download className="btn btn-o"><Download size={16} /> {labels.pptx}</a>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {titles.map((t, k) => (
          <button
            key={k}
            type="button"
            onClick={() => setI(k)}
            aria-label={t}
            aria-current={k === i ? "true" : undefined}
            className={`shrink-0 overflow-hidden rounded-md border-2 transition ${k === i ? "border-[var(--c)]" : "border-transparent opacity-70 hover:opacity-100"}`}
          >
            <Image src={src(k)} alt="" width={160} height={90} sizes="120px" loading="lazy" className="block h-[68px] w-[120px] object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
