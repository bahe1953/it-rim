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
    lead: "Achetez votre licence en ligne : 15 $ par mois et par logiciel, sans engagement, annulable à tout moment.",
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
    lead: "اشتروا ترخيصكم عبر الإنترنت: 15 دولاراً شهرياً لكل برنامج، دون التزام، ويمكن إلغاؤه في أي وقت.",
    contact: {
      title: "اتصل بنا",
      lead: "لديكم سؤال حول برنامج أو ترخيص أو عملية دفع؟ راسلونا، ونرد خلال 24 ساعة عمل.",
      email: "البريد الإلكتروني",
      whatsapp: "واتساب",
      address: "العنوان",
    },
  },
};

type Faq = { q: string; a: string };

/** Logiciels présentés comme « bientôt disponibles » tant qu'ils n'ont pas de prix Paddle actif sur le site. */
export const comingSoonSlugs = ["mouhassib-pro", "waqood", "manzeel", "raqib"];

/** Textes de l'accueil de la boutique (présentation des logiciels vendus en ligne). */
export const storeHome: Record<Locale, {
  eyebrow: string;
  noCommitment: string;
  refund: (days: number) => string;
  featuresTitle: string;
  forWhomTitle: string;
  includedTitle: string;
  stepsTitle: string;
  stepsLead: string;
  step: string;
  steps: { title: string; text: string }[];
  faqTitle: string;
  faq: (refundDays: number) => Faq[];
  moreQuestions: string;
  soonTitle: string;
  soonLead: string;
  soonBadge: string;
  soonCta: string;
}> = {
  fr: {
    eyebrow: "Logiciel de gestion pour Windows",
    noCommitment: "sans engagement",
    refund: (n) => `Remboursé sous ${n} jours`,
    featuresTitle: "Tout ce qu'il faut pour gérer votre commerce",
    forWhomTitle: "Pour qui ?",
    includedTitle: "Inclus dans l'abonnement",
    stepsTitle: "Comment ça marche",
    stepsLead: "De l'achat au premier encaissement, en trois étapes.",
    step: "Étape",
    steps: [
      { title: "Payez en ligne", text: "Paiement sécurisé par carte, Google Pay, Apple Pay ou PayPal, traité par Paddle. Vous recevez la facture par email." },
      { title: "Installez le logiciel", text: "Téléchargez l'installateur Windows depuis la fiche du logiciel. Au premier lancement, il affiche votre « code poste »." },
      { title: "Recevez votre code d'activation", text: "Envoyez-nous ce code poste par WhatsApp ou par email : nous vous répondons avec votre code d'activation sous 24 heures ouvrées." },
    ],
    faqTitle: "Questions fréquentes",
    faq: (n) => [
      { q: "Comment le logiciel est-il activé ?", a: "Chaque licence est liée à un ordinateur. Après l'achat, envoyez-nous le code poste affiché par le logiciel ; nous vous envoyons le code d'activation correspondant, valable pendant votre abonnement." },
      { q: "Puis-je annuler mon abonnement ?", a: "Oui, à tout moment, depuis le lien reçu par email avec votre facture. L'abonnement s'arrête à la fin du mois déjà payé, sans frais." },
      { q: "Et si le logiciel ne me convient pas ?", a: `Vous êtes remboursé en totalité, sans condition, si vous le demandez dans les ${n} jours qui suivent votre paiement.` },
      { q: "Dans quelle monnaie suis-je facturé ?", a: "Le prix est en dollars américains (USD), hors taxes. Selon votre pays, Paddle ajoute la TVA ou la taxe locale, affichée avant le paiement." },
      { q: "Mes données sont-elles envoyées sur Internet ?", a: "Non. Vos ventes, votre stock et votre comptabilité restent sur votre ordinateur ; vous pouvez en faire des sauvegardes à tout moment." },
      { q: "Quel ordinateur faut-il ?", a: "Un PC sous Windows 10 ou Windows 11. Le logiciel fonctionne sans connexion Internet une fois activé." },
    ],
    moreQuestions: "Une autre question ?",
    soonTitle: "Bientôt disponibles en ligne",
    soonLead: "Nos autres logiciels de gestion arrivent prochainement dans la boutique.",
    soonBadge: "Bientôt",
    soonCta: "Être prévenu sur WhatsApp",
  },
  ar: {
    eyebrow: "برنامج تسيير لنظام ويندوز",
    noCommitment: "دون التزام",
    refund: (n) => `استرداد المبلغ خلال ${n} يوماً`,
    featuresTitle: "كل ما تحتاجونه لتسيير تجارتكم",
    forWhomTitle: "لمن هذا البرنامج؟",
    includedTitle: "يشمل الاشتراك",
    stepsTitle: "كيف يتم ذلك؟",
    stepsLead: "من الشراء إلى أول عملية بيع، في ثلاث خطوات.",
    step: "الخطوة",
    steps: [
      { title: "ادفعوا عبر الإنترنت", text: "دفع آمن بالبطاقة البنكية أو Google Pay أو Apple Pay أو PayPal، تعالجه شركة Paddle. تصلكم الفاتورة عبر البريد الإلكتروني." },
      { title: "ثبّتوا البرنامج", text: "حمّلوا برنامج التثبيت لويندوز من صفحة البرنامج. عند أول تشغيل، يعرض البرنامج « رمز الجهاز »." },
      { title: "استلموا رمز التفعيل", text: "أرسلوا لنا رمز الجهاز عبر واتساب أو البريد الإلكتروني، ونرسل لكم رمز التفعيل خلال 24 ساعة عمل." },
    ],
    faqTitle: "أسئلة شائعة",
    faq: (n) => [
      { q: "كيف يتم تفعيل البرنامج؟", a: "كل ترخيص مرتبط بجهاز واحد. بعد الشراء، أرسلوا لنا رمز الجهاز الذي يعرضه البرنامج، فنرسل لكم رمز التفعيل الخاص به، صالحاً طوال مدة اشتراككم." },
      { q: "هل يمكنني إلغاء الاشتراك؟", a: "نعم، في أي وقت، عبر الرابط الذي يصلكم مع الفاتورة. يتوقف الاشتراك في نهاية الشهر المدفوع، دون أي رسوم." },
      { q: "وإذا لم يناسبني البرنامج؟", a: `نعيد لكم المبلغ كاملاً دون شروط إذا طلبتم ذلك خلال ${n} يوماً من الدفع.` },
      { q: "بأي عملة تتم الفوترة؟", a: "السعر بالدولار الأمريكي (USD) دون احتساب الضرائب. حسب بلدكم، تضيف Paddle الضريبة على القيمة المضافة أو الضريبة المحلية، وتُعرض قبل الدفع." },
      { q: "هل تُرسل بياناتي عبر الإنترنت؟", a: "لا. تبقى مبيعاتكم ومخزونكم ومحاسبتكم على جهازكم، ويمكنكم حفظ نسخة احتياطية في أي وقت." },
      { q: "ما هو الجهاز المطلوب؟", a: "حاسوب يعمل بنظام ويندوز 10 أو ويندوز 11. يعمل البرنامج دون اتصال بالإنترنت بعد تفعيله." },
    ],
    moreQuestions: "لديكم سؤال آخر؟",
    soonTitle: "قريباً عبر الإنترنت",
    soonLead: "برامج التسيير الأخرى قادمة قريباً إلى المتجر.",
    soonBadge: "قريباً",
    soonCta: "أعلموني عبر واتساب",
  },
};
