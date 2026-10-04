"use client";

import Image from "next/image";
import Echelle from "./mouhassib/Echelle";
import DashboardMockup from "./mouhassib/DashboardMockup";
import type { Locale } from "@/i18n/config";

type Mini = { src: string; name: string; color: string };

/**
 * Visuel du hero : le tableau de bord de Mouhassib au centre, entouré de fenêtres
 * des autres applications IT-RIM. Remplace l'ancienne photo de bâtiments.
 */
export default function HeroShowcase({ lang, minis }: { lang: Locale; minis: Mini[] }) {
  const pos = ["-top-6 end-[-4%] w-[42%]", "bottom-[-8%] start-[-6%] w-[40%]", "bottom-[-12%] end-[2%] w-[38%]"];
  return (
    <div className="relative mx-4 mt-6 mb-14 md:mx-6">
      <div className="pointer-events-none absolute -inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.25),transparent_70%)]" />
      <div className="relative rounded-[20px] border border-[#cbd5e1] bg-[#e2e8f0] p-2.5 pb-3.5 shadow-[0_60px_120px_-50px_rgba(3,105,161,.45)]">
        <div className="overflow-hidden rounded-[10px] bg-white">
          <Echelle largeur={1040} hauteur={660}><DashboardMockup langue={lang} /></Echelle>
        </div>
      </div>
      {minis.map((m, i) => (
        <figure key={m.name}
          className={`absolute ${pos[i]} hidden overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_48px_-20px_rgba(15,39,66,.35)] sm:block motion-safe:animate-[float_7s_ease-in-out_infinite]`}
          style={{ animationDelay: `${i * 1.2}s` }}>
          <figcaption className="flex items-center gap-1.5 border-b border-line bg-[#fcfeff] px-2.5 py-1.5 text-[11px] font-bold text-ink">
            <span className="size-2 rounded-full" style={{ background: m.color }} />{m.name}
          </figcaption>
          <Image src={m.src} alt={m.name} width={254} height={108} sizes="220px" className="block h-auto w-full" />
        </figure>
      ))}
    </div>
  );
}
