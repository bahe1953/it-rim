import type { Locale } from "@/i18n/config";

/**
 * Boutique en ligne (sous-domaine dédié à la vente des licences, sans les services IT-RIM).
 * Paddle n'accepte que des produits logiciels : ce sous-domaine ne montre que les logiciels,
 * les tarifs, les pages légales et un contact. Le proxy (src/proxy.ts) sert ces pages depuis
 * src/app/boutique quand la requête arrive sur ce domaine.
 */
export const storeHost = (process.env.NEXT_PUBLIC_STORE_HOST ?? "logiciels.it-rim.net").toLowerCase();

/** Vrai pour le domaine de la boutique (et logiciels.localhost pour les essais en local). */
export const isStoreHost = (host: string) => {
  const h = host.split(":")[0].toLowerCase();
  return h === storeHost || h === "logiciels.localhost";
};

/** Chemins servis par la boutique, après la langue. Tout le reste renvoie vers l'accueil de la boutique. */
export const storePaths = /^\/(fr|ar)(\/(tarifs|conditions|confidentialite|remboursement|contact|applications\/[a-z0-9-]+(\/(licence|essai))?))?\/?$/;

export const storeText: Record<Locale, {
  nav: { home: string; pricing: string; contact: string };
  cta: string;
  title: string;
  lead: string;
  contact: { title: string; lead: string; email: string; whatsapp: string; address: string };
}> = {
  fr: {
    nav: { home: "Logiciels", pricing: "Tarifs", contact: "Contact" },
    cta: "Voir les tarifs",
    title: "Logiciels de gestion IT-RIM pour Windows",
    lead: "Achetez votre licence en ligne : 65 $ par mois et par logiciel, sans engagement, annulable à tout moment.",
    contact: {
      title: "Contact",
      lead: "Une question sur un logiciel, une licence ou un paiement ? Écrivez-nous, nous répondons sous 24 heures ouvrées.",
      email: "Email",
      whatsapp: "WhatsApp",
      address: "Adresse",
    },
  },
  ar: {
    nav: { home: "البرامج", pricing: "الأسعار", contact: "اتصل بنا" },
    cta: "عرض الأسعار",
    title: "برامج التسيير من IT-RIM لنظام ويندوز",
    lead: "اشتروا ترخيصكم عبر الإنترنت: 65 دولاراً شهرياً لكل برنامج، دون التزام، ويمكن إلغاؤه في أي وقت.",
    contact: {
      title: "اتصل بنا",
      lead: "لديكم سؤال حول برنامج أو ترخيص أو عملية دفع؟ راسلونا، ونرد خلال 24 ساعة عمل.",
      email: "البريد الإلكتروني",
      whatsapp: "واتساب",
      address: "العنوان",
    },
  },
};
