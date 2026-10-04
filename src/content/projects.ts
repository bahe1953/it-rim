import type { Locale } from "@/i18n/config";

type L = Record<Locale, string>;

export type Project = {
  slug: string;
  name: L;
  type: L;
  summary: L;
  /** URL publique du site. null = bouton « Visiter » masqué tant qu'elle n'est pas fournie. */
  url: string | null;
  image: string;
  languages: string[];
  technologies: string[];
  year: string | null;
  /** Étude de cas : chaque bloc vide affiche « À compléter » et n'est pas indexé. */
  caseStudy: {
    context: L | null;
    challenge: L | null;
    approach: L[] | null;
    design: L | null;
    development: L | null;
    features: L[] | null;
    result: L | null;
  };
};

export const projects: Project[] = [
  {
    slug: "oulemas-de-mauritanie",
    name: { fr: "Haute Instance des Oulémas de Mauritanie", ar: "هيئة العلماء الموريتانيين" },
    type: { fr: "Plateforme web", ar: "منصة ويب" },
    summary: {
      fr: "Le site bilingue de la Haute Instance des Oulémas de Mauritanie : l'institution, sa structure, le patrimoine scientifique et les grands savants.",
      ar: "الموقع ثنائي اللغة لهيئة العلماء الموريتانيين: الهيئة وهيكلها والتراث العلمي وكبار العلماء.",
    },
    url: "https://oulema.vercel.app",
    image: "/images/oulemas.webp",
    languages: ["FR", "العربية"],
    technologies: ["Next.js", "PostgreSQL", "Responsive"],
    year: null,
    caseStudy: {
      context: {
        fr: "Rendre accessible au public le patrimoine des savants mauritaniens, dans les deux langues du pays.",
        ar: "إتاحة تراث العلماء الموريتانيين للجمهور، باللغتين المستعملتين في البلاد.",
      },
      challenge: null,
      approach: null,
      design: {
        fr: "Une interface bilingue français / arabe, pensée dès le départ pour la lecture de droite à gauche.",
        ar: "واجهة ثنائية اللغة بالفرنسية والعربية، مصممة منذ البداية للقراءة من اليمين إلى اليسار.",
      },
      development: null,
      features: null,
      result: null,
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Catégories de réalisations affichées à côté du projet vedette. */
export const workCategories = [
  { image: "/images/cat-sites.webp", name: { fr: "Sites institutionnels", ar: "مواقع مؤسسية" }, sub: { fr: "Sites web", ar: "مواقع ويب" } },
  { image: "/images/cat-plateformes.webp", name: { fr: "Plateformes métier", ar: "منصات مهنية" }, sub: { fr: "Applications web", ar: "تطبيقات ويب" } },
];
