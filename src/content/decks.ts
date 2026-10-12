import type { Locale } from "@/i18n/config";

/** Présentations commerciales (diapositives) affichées sur la fiche d'un logiciel, avec téléchargement PDF et PowerPoint. */
export type Deck = {
  dir: string;
  file: string;
  titles: Record<Locale, string[]>;
};

export const decks: Record<string, Deck> = {
  "mouhassib-pro": {
    dir: "/presentations/mouhassib-pro",
    file: "Mouhassib-Pro-presentation",
    titles: {
      fr: [
        "Mouhassib Pro : toutes vos caisses et tous vos dépôts dans un seul logiciel",
        "Votre commerce a grandi, vos chiffres ne suivent plus",
        "La solution : un seul « cerveau » pour tout le commerce",
        "Le parcours d'une marchandise, de l'achat à la Zakât",
        "Vendre sur plusieurs caisses en même temps",
        "Suivre le stock dépôt par dépôt",
        "Encaisser, faire un devis, facturer",
        "La comptabilité et la Zakât, déjà préparées",
        "Vous gardez le contrôle",
        "Est-ce fait pour vous ?",
        "Ce qu'il vous faut pour démarrer",
        "Test de charge : plusieurs caisses en même temps",
        "Résultat : le serveur garde une très grande marge",
        "Ce qui compte vraiment : la qualité du réseau",
        "Fiche : ce qu'il faut retenir",
        "Voyez Mouhassib Pro en action",
      ],
      ar: [
        "محاسب برو: كل صناديقكم وكل مستودعاتكم في برنامج واحد",
        "تجارتكم كبرت، وأرقامكم لم تعد تواكب",
        "الحل: «عقل» واحد لكل التجارة",
        "مسار السلعة، من الشراء إلى الزكاة",
        "البيع في عدة صناديق في الوقت نفسه",
        "متابعة المخزون مستودعاً بمستودع",
        "التحصيل، وعروض الأسعار، والفوترة",
        "المحاسبة والزكاة جاهزتان",
        "تبقى السيطرة بأيديكم",
        "هل هو مناسب لكم؟",
        "ما تحتاجونه للبدء",
        "اختبار التحمّل: عدة صناديق في الوقت نفسه",
        "النتيجة: الخادم يحتفظ بهامش كبير جداً",
        "ما يهم حقاً: جودة الشبكة",
        "بطاقة: ما يجب تذكّره",
        "شاهدوا محاسب برو وهو يعمل",
      ],
    },
  },
};

export const deckLabels: Record<Locale, { title: string; intro: string; prev: string; next: string; pdf: string; pptx: string; slide: string }> = {
  fr: {
    title: "Présentation commerciale",
    intro: "Le logiciel expliqué simplement, en 16 diapositives, avec les résultats d'un test de charge multiposte.",
    prev: "Diapositive précédente",
    next: "Diapositive suivante",
    pdf: "Télécharger en PDF",
    pptx: "Télécharger en PowerPoint",
    slide: "Diapositive {i} sur {n}",
  },
  ar: {
    title: "العرض التقديمي",
    intro: "البرنامج مشروح ببساطة في 16 شريحة، مع نتائج اختبار تحمّل متعدد المراكز.",
    prev: "الشريحة السابقة",
    next: "الشريحة التالية",
    pdf: "تحميل بصيغة PDF",
    pptx: "تحميل بصيغة PowerPoint",
    slide: "الشريحة {i} من {n}",
  },
};
