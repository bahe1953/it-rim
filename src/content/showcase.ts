import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { products } from "./products";
import { projects } from "./projects";
import { releases, releaseUrl } from "./releases";
import { site } from "./site";
import { decks } from "./decks";

/** Élément de la vitrine (logiciel ou réalisation), prêt à être affiché côté client. */
export type ShowItem = {
  id: string;
  kind: "app" | "web";
  accent: { c: string; g: string; bg: string; /** Variante foncée pour le texte (contraste ≥ 4,5:1). */ t: string };
  name: string;
  category: string;
  by: string | null;
  summary: string;
  presentation: string;
  card: string;
  video: { src: string; poster: string; duration: string; sound: boolean };
  /** Présentation en diapositives : quand elle existe, elle remplace la vidéo dans la fiche. */
  slides: { src: string; caption: string }[] | null;
  slidesPdf: string | null;
  features: string[];
  forWhom: string[];
  badges: string[];
  screens: { src: string; caption: string }[];
  logo: string | null;
  flow: string[];
  modules: string[];
  details: { href: string; label: string; external: boolean };
  download: string | null;
  /** Essai : à télécharger, sur demande (formulaire), ou rien. */
  trialMode: "download" | "request" | null;
  request: string | null;
  whatsapp: { href: string; label: string };
};

const colors = {
  m: { c: "#1e7fd8", g: "#38a3f0", bg: "#e6f1fc", t: "#196db9" },
  w: { c: "#ea6a0c", g: "#f59e0b", bg: "#fff2e6", t: "#b15009" },
  z: { c: "#15924b", g: "#22c55e", bg: "#e7f7ee", t: "#127d40" },
  r: { c: "#5650d6", g: "#7c6cf2", bg: "#eeedfd", t: "#5650d6" },
  p: { c: "#0273b8", g: "#0ea5e9", bg: "#e0f2fe", t: "#0170b4" },
  q: { c: "#16325c", g: "#2f6db5", bg: "#e8eef8", t: "#16325c" },
  b: { c: "#b45309", g: "#f59e0b", bg: "#fdf3e4", t: "#b05108" },
} as const;

/** Captures réelles de RAQIB (issues de sa page de présentation). */
const raqibScreens: [string, string, string][] = [
  ["accueil", "Écran d'accueil par modules", "شاشة الاستقبال حسب الوحدات"],
  ["fiche-bien", "Fiche bien : valeur, amortissement, garantie", "بطاقة الأصل: القيمة والاهتلاك والضمان"],
  ["liste-biens", "Liste des immobilisations", "قائمة الأصول"],
  ["mouvements", "Suivi des mouvements", "تتبع الحركات"],
  ["liste-mouvements", "État des mouvements", "تقرير الحركات"],
  ["parametres", "Paramètres de l'application", "إعدادات التطبيق"],
  ["connexion", "Connexion sécurisée", "تسجيل دخول آمن"],
  ["utilisateur", "Profils utilisateurs", "حسابات المستخدمين"],
];

/** Vidéos fournies par IT-RIM (durée différente d'une minute, avec bande son). */
const clips: Record<string, { duration: string; sound: boolean }> = {
  "waqood-fr": { duration: "2 min", sound: true },
  "waqood-ar": { duration: "دقيقتان", sound: true },
  "mbourou-fr": { duration: "1 min", sound: true },
  "mbourou-ar": { duration: "دقيقة", sound: true },
  "manzeel-fr": { duration: "1 min", sound: true },
  "manzeel-ar": { duration: "دقيقة", sound: true },
  "gestphone-fr": { duration: "1 min", sound: true },
  "gestphone-ar": { duration: "دقيقة", sound: true },
  "mouhassib-fr": { duration: "2 min 20", sound: true },
  "mouhassib-ar": { duration: "دقيقتان ونصف", sound: true },
};

/** Captures réelles de GestPhone IT (données de démonstration générées par le logiciel). */
const gestScreens: [string, string, string][] = [
  ["tableau-de-bord", "Tableau de bord", "لوحة التحكم"],
  ["point-de-vente", "Point de vente", "نقطة البيع"],
  ["produits-imei", "Produits et IMEI", "المنتجات و IMEI"],
  ["ventes", "Ventes", "المبيعات"],
  ["stock", "Mouvements de stock", "حركات المخزون"],
  ["achats", "Achats", "المشتريات"],
  ["caisse", "Caisse : espèces, Bankily, Sedad", "الصندوق: نقداً، بنكيلي، سداد"],
  ["sav-garanties", "SAV et garanties par IMEI", "الضمان برقم IMEI"],
  ["rapports", "Rapports", "التقارير"],
];

/** Captures réelles de Mouhassib Pro (base de démonstration saisie via le vrai moteur du logiciel). */
const mproScreens: [string, string, string][] = [
  ["tableau-de-bord", "Tableau de bord", "لوحة القيادة"],
  ["ventes", "Ventes multi-caisses", "المبيعات من كل الصناديق"],
  ["produits", "Catalogue et code-barres", "الكتالوج والباركود"],
  ["stocks", "Stocks et alertes", "المخزون والتنبيهات"],
  ["entrepots", "Entrepôts et transferts", "المستودعات والتحويلات"],
  ["caisse", "Caisse", "الصندوق"],
  ["devis", "Devis clients", "عروض الأسعار"],
  ["rapports", "Rapports", "التقارير"],
  ["zakat", "Calcul de la Zakât", "حساب الزكاة"],
];

/** Captures réelles de Mbourou (données de démonstration générées par le logiciel). */
const mbourouScreens: [string, string, string][] = [
  ["tableau-de-bord", "Tableau de bord", "لوحة التحكم"],
  ["point-de-vente", "Point de vente", "نقطة البيع"],
  ["produits", "Produits", "المنتجات"],
  ["matieres", "Matières premières", "المواد الأولية"],
  ["production", "Production et fournées", "الإنتاج والخبزات"],
  ["prix-de-revient", "Recettes et prix de revient", "الوصفات وسعر التكلفة"],
  ["caisse", "Caisse", "الصندوق"],
  ["inventaire", "Inventaire", "الجرد"],
  ["rapports", "Rapports", "التقارير"],
];

const wa = (text: string) => `${site.whatsappUrl}?text=${encodeURIComponent(text)}`;

export function showcaseItems(lang: Locale): ShowItem[] {
  const d = getDictionary(lang).showcase;
  const apps: ShowItem[] = products.map((p) => {
    const release = releases[p.slug];
    const url = releaseUrl(release, lang);
    const badges = [...new Set([...p.platforms, ...p.technologies[lang]])];
    if (p.trial.enabled) badges.push(d.trial(p.trial.days));
    const film = p.slug === "mouhassib" ? `/videos/mouhassib-demo-${lang}` : `/videos/${p.slug}-${lang}`;
    return {
      id: p.slug,
      kind: "app",
      accent: colors[p.accent],
      name: p.name[lang],
      category: p.category[lang],
      by: p.developedBy?.[lang] ?? null,
      summary: p.summary[lang],
      presentation: p.presentation[lang],
      card: p.slug === "mouhassib" ? `/videos/mouhassib-demo-${lang}.jpg` : decks[p.slug] ? `${decks[p.slug].dir}/${lang}/01.webp` : `/images/cards/${p.slug}-${lang}.webp`,
      video: decks[p.slug]
        ? { src: "", poster: "", duration: `${decks[p.slug].titles[lang].length} ${d.slides}`, sound: false }
        : { src: `${film}.mp4`, poster: `${film}.jpg`, ...(clips[`${p.slug}-${lang}`] ?? { duration: d.minute, sound: false }) },
      slides: decks[p.slug] ? decks[p.slug].titles[lang].map((caption, k) => ({ src: `${decks[p.slug].dir}/${lang}/${String(k + 1).padStart(2, "0")}.webp`, caption })) : null,
      slidesPdf: decks[p.slug] ? `${decks[p.slug].dir}/${decks[p.slug].file}-${lang}.pdf` : null,
      features: p.features[lang],
      forWhom: p.forWhom[lang],
      badges,
      logo: p.logo ?? null,
      flow: p.flow?.[lang] ?? [],
      modules: p.modules?.[lang] ?? [],
      screens: p.slug === "mouhassib-pro" ? mproScreens.map(([f, fr, ar]) => ({ src: `/images/mouhassib-pro/${lang}-${f}.webp`, caption: lang === "fr" ? fr : ar })) : p.slug === "mbourou" ? mbourouScreens.map(([f, fr, ar]) => ({ src: `/images/mbourou/${lang}-${f}.webp`, caption: lang === "fr" ? fr : ar })) : p.slug === "gestphone" ? gestScreens.map(([f, fr, ar]) => ({ src: `/images/gestphone/${lang}-${f}.webp`, caption: lang === "fr" ? fr : ar })) : p.slug === "raqib" ? raqibScreens.map(([f, fr, ar]) => ({ src: `/images/raqib/${f}.webp`, caption: lang === "fr" ? fr : ar })) : [],
      details: { href: `/${lang}/applications/${p.slug}`, label: d.details, external: false },
      download: url && p.trial.enabled ? `/${lang}/applications/${p.slug}#telechargement` : null,
      trialMode: !p.trial.enabled ? null : url ? "download" : "request",
      request: !url && p.trial.enabled ? `/${lang}/applications/${p.slug}/essai` : null,
      whatsapp: { href: wa(d.demoMsg(p.name[lang])), label: d.demo },
    };
  });

  const web: ShowItem[] = projects.map((pr) => ({
    id: pr.slug,
    kind: "web",
    accent: { c: "#0284c7", g: "#38bdf8", bg: "#e0f2fe", t: "#0171ab" },
    name: pr.name[lang],
    category: pr.type[lang],
    by: null,
    summary: pr.summary[lang],
    presentation: [pr.caseStudy.context?.[lang], pr.caseStudy.design?.[lang]].filter(Boolean).join(" ") || pr.summary[lang],
    card: pr.image,
    video: { src: `/videos/${pr.slug}-${lang}.mp4`, poster: `/videos/${pr.slug}-${lang}.jpg`, duration: d.minute, sound: false },
    slides: null,
    slidesPdf: null,
    features: pr.caseStudy.features?.map((f) => f[lang]) ?? [],
    forWhom: [],
    badges: pr.languages,
    screens: [],
    logo: null,
    flow: [],
    modules: [],
    details: pr.url
      ? { href: pr.url, label: d.visit, external: true }
      : { href: `/${lang}/realisations/${pr.slug}`, label: d.details, external: false },
    download: null,
    trialMode: null,
    request: null,
    whatsapp: { href: wa(d.projectMsg(pr.name[lang])), label: d.talk },
  }));

  return [...apps, ...web];
}

/** Libellés de la vitrine, sans fonctions (transmissibles au composant client). */
export function showcaseLabels(lang: Locale) {
  const d = getDictionary(lang).showcase;
  return {
    tabs: d.tabs, kind: d.kind, watch: d.watch, open: d.open, minute: d.minute, close: d.close, prev: d.prev, next: d.next,
    features: d.features, forWhom: d.forWhom, video: d.video, slidesLabel: d.slidesLabel, pdf: d.pdf, screens: d.screens, download: d.download, request: d.request, badgeDownload: d.badgeDownload, badgeRequest: d.badgeRequest, flow: d.flow, modules: d.modules,
  };
}
