import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/i18n/config";

/** Encadré « Mouhassib ou Mouhassib Pro ? » : mêmes fonctions de gestion, seule l'installation change. */
const T = {
  fr: {
    title: "Mouhassib ou Mouhassib Pro ?",
    lead: "Les mêmes fonctions de gestion. Seule l'installation change.",
    here: "Vous êtes ici",
    see: "Voir la fiche",
    m: { name: "Mouhassib", kind: "Monoposte", text: "Installé sur un seul ordinateur. Idéal quand toute la gestion se fait sur un poste." },
    p: { name: "Mouhassib Pro", kind: "Client-serveur", text: "Un ordinateur serveur et plusieurs postes reliés par le réseau local. Idéal pour plusieurs caisses ou plusieurs dépôts qui travaillent en même temps." },
  },
  ar: {
    title: "محاسب أم محاسب برو؟",
    lead: "نفس وظائف التسيير. الفرق الوحيد في طريقة التثبيت.",
    here: "أنتم هنا",
    see: "عرض الصفحة",
    m: { name: "محاسب", kind: "جهاز واحد", text: "يُثبَّت على حاسوب واحد. مثالي عندما يتم كل التسيير على جهاز واحد." },
    p: { name: "محاسب برو", kind: "خادم وعملاء", text: "حاسوب خادم وعدة أجهزة مرتبطة عبر الشبكة المحلية. مثالي لعدة صناديق أو عدة مستودعات تعمل في الوقت نفسه." },
  },
} as const;

export default function MouhassibCompare({ lang, current }: { lang: Locale; current: "mouhassib" | "mouhassib-pro" }) {
  const t = T[lang];
  const cols = [
    { slug: "mouhassib", logo: null, ...t.m },
    { slug: "mouhassib-pro", logo: "/images/mouhassib-pro-logo.png", ...t.p },
  ] as const;
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-14 md:px-8" aria-labelledby="mp-compare">
      <div className="mb-6 text-center">
        <h2 id="mp-compare" className="text-[clamp(22px,2.6vw,30px)] font-extrabold">{t.title}</h2>
        <p className="mt-2 text-ink-soft">{t.lead}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cols.map((c) => {
          const isHere = c.slug === current;
          return (
            <div key={c.slug} className={`card grid content-start gap-3 p-5 ${isHere ? "ring-2 ring-[#0273b8]" : ""}`}>
              <div className="flex items-center gap-3">
                {c.logo ? <Image src={c.logo} alt="" width={44} height={44} className="size-11 rounded-xl" /> : <span aria-hidden className="grid size-11 place-items-center rounded-xl bg-[#1e7fd8] text-xl font-extrabold text-white">M</span>}
                <div>
                  <p className="text-lg font-extrabold text-ink">{c.name}</p>
                  <p className="text-sm font-bold text-[#0273b8]">{c.kind}</p>
                </div>
                {isHere && <span className="ms-auto rounded-full bg-[#e0f2fe] px-3 py-1 text-xs font-bold text-[#0273b8]">{t.here}</span>}
              </div>
              <p className="text-[15px] leading-relaxed text-ink-2">{c.text}</p>
              {!isHere && (
                <Link href={`/${lang}/applications/${c.slug}`} className="text-sm font-extrabold text-[#0273b8] hover:underline">{t.see} {lang === "ar" ? "←" : "→"}</Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
