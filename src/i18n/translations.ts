export type Lang = 'fr' | 'ar';

export interface SoftwareCard {
  name: string;
  tagline: string;
  status: 'available' | 'soon';
  href: string;
}

export interface Dictionary {
  nav: {
    home: string;
    software: string;
    enterprise: string;
    services: string;
    contact: string;
    downloadCta: string;
  };
  footer: {
    tagline: string;
    productsTitle: string;
    contactTitle: string;
    address: string;
    rights: string;
  };
  home: {
    badge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroSubtitle: string;
    ctaDiscover: string;
    ctaContact: string;
    productsBadge: string;
    productsTitle1: string;
    productsTitle2: string;
    productsSubtitle: string;
    mouhassibBadge: string;
    mouhassibDesc: string;
    mouhassibTags: string[];
    mouhassibCta: string;
    gestcommerceDesc: string;
    gestcommerceTags: string[];
    gestcommerceCta: string;
    seeAllSoftware: string;
    servicesBadge: string;
    servicesTitle1: string;
    servicesTitle2: string;
    services: { title: string; desc: string }[];
    ctaTitle1: string;
    ctaTitleHighlight: string;
    ctaTitleEnd: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  mouhassib: {
    badge: string;
    heroTitleLine1: string;
    heroTitleLine2: string;
    heroDesc: string;
    chips: string[];
    ctaFree: string;
    previewLabel: string;
    previewSub: string;
    liveLabel: string;
    featuresBadge: string;
    featuresTitle1: string;
    featuresTitleHighlight: string;
    features: { title: string; desc: string }[];
    downloadBadge: string;
    downloadTitle1: string;
    downloadTitleHighlight: string;
    downloadDesc1: string;
    downloadDesc2: string;
    downloadCountSuffix: string;
    downloadCountSuffixOne: string;
    downloadButton: string;
    downloadFinePrint: string;
    downloadedMsg: string;
    includes: string[];
  };
  gestcommerce: {
    title: string;
    desc: string;
    cardText1: string;
    cardText2: string;
    ctaButton: string;
  };
  contact: {
    title: string;
    subtitle: string;
    cardEmail: string;
    cardPhone: string;
    cardWhatsapp: string;
    addressTitle: string;
    addressDesc: string;
  };
  software: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    cards: SoftwareCard[];
    ctaDiscover: string;
    ctaDemo: string;
    comingSoonBadge: string;
  };
  comingSoon: {
    badgeLabel: string;
    bodyText: string;
    contactCta: string;
    backLink: string;
  };
  services: {
    badge: string;
    title1: string;
    titleHighlight: string;
    subtitle: string;
    items: { title: string; desc: string }[];
    ctaTitle: string;
    ctaButton: string;
  };
  enterprise: {
    title: string;
    tagline: string;
  };
}

export const translations: Record<Lang, Dictionary> = {
  fr: {
    nav: {
      home: 'Accueil',
      software: 'Nos logiciels',
      enterprise: 'Solutions entreprises',
      services: 'Services IT',
      contact: 'Contact',
      downloadCta: 'Télécharger Mouhassib',
    },
    footer: {
      tagline:
        "La technologie au service de votre réussite. Solutions logicielles professionnelles pour commerçants et entreprises en Mauritanie et au-delà.",
      productsTitle: 'Produits',
      contactTitle: 'Contact',
      address: 'Nouakchott, Mauritanie',
      rights: 'Tous droits réservés.',
    },
    home: {
      badge: 'Solutions logicielles professionnelles',
      heroTitle1: 'La technologie au service',
      heroTitle2: 'de votre réussite',
      heroSubtitle:
        "IT-RIM développe des logiciels sur mesure pour commerçants et entreprises. Découvrez Mouhassib et GestCommerce, nos solutions phares de gestion commerciale.",
      ctaDiscover: 'Découvrir Mouhassib',
      ctaContact: 'Nous contacter',
      productsBadge: 'Nos produits',
      productsTitle1: 'Des solutions',
      productsTitle2: 'clé en main',
      productsSubtitle: 'Deux logiciels professionnels pour digitaliser votre gestion commerciale.',
      mouhassibBadge: 'Vedette',
      mouhassibDesc:
        'Gestion commerciale complète avec comptabilité intégrée, entièrement en arabe. Ventes, stock, factures, comptabilité, zakat — tout dans une seule application.',
      mouhassibTags: ['Arabe RTL', 'Compta', 'Offline', 'Trial 30j'],
      mouhassibCta: 'Découvrir Mouhassib',
      gestcommerceDesc:
        'Solution de gestion commerciale simple et efficace : ventes, achats, stock, clients, fournisseurs. La version essentielle sans le module comptabilité.',
      gestcommerceTags: ['Simple', 'Rapide', 'Offline', 'Trial 30j'],
      gestcommerceCta: 'Découvrir GestCommerce',
      seeAllSoftware: 'Voir tous nos logiciels',
      servicesBadge: 'Nos services',
      servicesTitle1: 'Ce que nous',
      servicesTitle2: 'faisons',
      services: [
        { title: 'Développement sur mesure', desc: 'Applications web, desktop et mobiles adaptées à vos besoins spécifiques.' },
        { title: 'Conseil et audit', desc: 'Analyse de vos processus et recommandations pour la transformation digitale.' },
        { title: 'Formation', desc: 'Accompagnement de vos équipes pour maîtriser nos outils.' },
      ],
      ctaTitle1: 'Prêt à transformer votre',
      ctaTitleHighlight: 'activité',
      ctaTitleEnd: '?',
      ctaSubtitle: 'Essayez Mouhassib gratuitement pendant 30 jours. Aucune carte bancaire requise.',
      ctaButton: "Télécharger l'essai gratuit",
    },
    mouhassib: {
      badge: 'Version 1.0.0 disponible',
      heroTitleLine1: 'La gestion commerciale',
      heroTitleLine2: 'qui parle votre langue',
      heroDesc:
        'Logiciel complet de gestion pour commerçants et TPE : ventes, stock, achats, clients, factures et comptabilité. Entièrement en arabe, avec support RTL natif.',
      chips: ['Trial 30 jours gratuit', 'Aucune carte requise', 'Fonctionne hors ligne'],
      ctaFree: 'Télécharger gratuitement',
      previewLabel: 'Aperçu de Mouhassib',
      previewSub: '(Screenshot à venir)',
      liveLabel: 'Live production',
      featuresBadge: 'Fonctionnalités',
      featuresTitle1: 'Tout ce dont votre commerce',
      featuresTitleHighlight: 'a besoin',
      features: [
        { title: 'Dashboard temps réel', desc: 'Vue globale de votre activité : ventes, achats, résultat, alertes stock et péremption.' },
        { title: 'Ventes & factures', desc: 'Enregistrement des ventes, génération de tickets et factures professionnelles.' },
        { title: 'Stock & péremption', desc: 'Suivi du stock, alertes automatiques sur seuils et dates de péremption.' },
        { title: 'Comptabilité intégrée', desc: 'Journaux, balance, bilan, export Sage 100. Gestion complète de la zakat.' },
        { title: '100% arabe RTL', desc: 'Interface entièrement en arabe, adaptée aux commerçants arabophones.' },
        { title: 'Fonctionne hors ligne', desc: "Base SQLite locale. Aucun besoin d'internet pour utiliser Mouhassib." },
      ],
      downloadBadge: 'Téléchargement',
      downloadTitle1: 'Essayez Mouhassib',
      downloadTitleHighlight: 'gratuitement',
      downloadDesc1: 'Un seul clic : le téléchargement démarre immédiatement, sans inscription.',
      downloadDesc2: 'Trial 30 jours complet, sans engagement.',
      downloadCountSuffix: 'téléchargements déjà effectués',
      downloadCountSuffixOne: 'téléchargement déjà effectué',
      downloadButton: 'Télécharger Mouhassib',
      downloadFinePrint: 'Un clic suffit : le téléchargement démarre immédiatement, sans inscription.',
      downloadedMsg: 'Téléchargement lancé !',
      includes: ['Trial complet 30 jours', 'Toutes les fonctionnalités', 'Support par WhatsApp'],
    },
    gestcommerce: {
      title: 'GestCommerce',
      desc: "Version simplifiée de notre solution de gestion commerciale. Idéale pour les commerçants qui n'ont pas besoin du module comptabilité.",
      cardText1: 'Cette page est en cours de finalisation.',
      cardText2: 'En attendant, découvrez notre produit vedette',
      ctaButton: 'Voir Mouhassib',
    },
    contact: {
      title: 'Contactez-nous',
      subtitle: 'Une question ? Une demande sur mesure ? Écrivez-nous.',
      cardEmail: 'Email',
      cardPhone: 'Téléphone',
      cardWhatsapp: 'WhatsApp',
      addressTitle: 'Nouakchott, Mauritanie',
      addressDesc: "Nous accompagnons commerçants et entreprises en Mauritanie et dans toute l'Afrique de l'Ouest.",
    },
    software: {
      badge: 'Nos logiciels',
      title1: 'Des logiciels conçus pour',
      title2: 'votre entreprise',
      subtitle:
        "Des solutions professionnelles conçues par IT-RIM pour répondre aux besoins réels des entreprises en Mauritanie et à l'international.",
      cards: [
        { name: 'Mouhassib', tagline: 'Gestion commerciale et comptabilité, entièrement en arabe.', status: 'available', href: '/mouhassib' },
        { name: 'GestCommerce', tagline: 'Gestion commerciale simple et rapide, sans comptabilité.', status: 'available', href: '/gestcommerce' },
        { name: 'RAQIB', tagline: 'Gestion du patrimoine et des immobilisations.', status: 'soon', href: '/logiciels/raqib' },
        { name: 'Waqood', tagline: 'Gestion de station-service.', status: 'soon', href: '/logiciels/waqood' },
      ],
      ctaDiscover: 'Découvrir',
      ctaDemo: 'Demander une démonstration',
      comingSoonBadge: 'Bientôt disponible',
    },
    comingSoon: {
      badgeLabel: 'Bientôt disponible',
      bodyText: 'Cette page est en cours de préparation. Contactez-nous pour en savoir plus dès maintenant.',
      contactCta: 'Nous contacter',
      backLink: 'Retour à nos logiciels',
    },
    services: {
      badge: 'Services IT',
      title1: 'Votre partenaire de',
      titleHighlight: 'transformation numérique',
      subtitle: 'Au-delà de nos logiciels, nous accompagnons les entreprises dans leurs projets technologiques.',
      items: [
        { title: 'Développement sur mesure', desc: 'Applications web, desktop et mobiles adaptées à vos besoins spécifiques.' },
        { title: 'Conseil et audit', desc: 'Analyse de vos processus et recommandations pour la transformation digitale.' },
        { title: 'Formation', desc: 'Accompagnement de vos équipes pour maîtriser nos outils.' },
      ],
      ctaTitle: 'Un projet en tête ?',
      ctaButton: 'Discutons-en',
    },
    enterprise: {
      title: 'Solutions entreprises',
      tagline: 'Des solutions sur mesure pour accompagner la croissance de votre entreprise.',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      software: 'برمجياتنا',
      enterprise: 'حلول المؤسسات',
      services: 'الخدمات التقنية',
      contact: 'اتصل بنا',
      downloadCta: 'تحميل محاسب',
    },
    footer: {
      tagline:
        'التكنولوجيا في خدمة نجاحكم. حلول برمجية احترافية للتجار والشركات في موريتانيا وخارجها.',
      productsTitle: 'المنتجات',
      contactTitle: 'اتصل بنا',
      address: 'نواكشوط، موريتانيا',
      rights: 'جميع الحقوق محفوظة.',
    },
    home: {
      badge: 'حلول برمجية احترافية',
      heroTitle1: 'التكنولوجيا في خدمة',
      heroTitle2: 'نجاحكم',
      heroSubtitle:
        'تطوّر آي تي ريم برمجيات مخصصة للتجار والشركات. اكتشفوا محاسب وGestCommerce، حلولنا الرائدة لإدارة الأعمال التجارية.',
      ctaDiscover: 'اكتشف محاسب',
      ctaContact: 'تواصل معنا',
      productsBadge: 'منتجاتنا',
      productsTitle1: 'حلول',
      productsTitle2: 'جاهزة للاستخدام',
      productsSubtitle: 'برنامجان احترافيان لرقمنة إدارة أعمالكم التجارية.',
      mouhassibBadge: 'مميز',
      mouhassibDesc:
        'إدارة تجارية متكاملة مع محاسبة مدمجة، باللغة العربية بالكامل. المبيعات، المخزون، الفواتير، المحاسبة، الزكاة — كل ذلك في تطبيق واحد.',
      mouhassibTags: ['عربي RTL', 'محاسبة', 'دون إنترنت', 'تجربة 30 يومًا'],
      mouhassibCta: 'اكتشف محاسب',
      gestcommerceDesc:
        'حل بسيط وفعّال لإدارة الأعمال التجارية: المبيعات، المشتريات، المخزون، العملاء، الموردون. النسخة الأساسية دون وحدة المحاسبة.',
      gestcommerceTags: ['بسيط', 'سريع', 'دون إنترنت', 'تجربة 30 يومًا'],
      gestcommerceCta: 'اكتشف GestCommerce',
      seeAllSoftware: 'عرض كل برمجياتنا',
      servicesBadge: 'خدماتنا',
      servicesTitle1: 'ما الذي',
      servicesTitle2: 'نقدمه',
      services: [
        { title: 'تطوير حسب الطلب', desc: 'تطبيقات ويب وسطح مكتب وهواتف محمولة مصممة خصيصًا لاحتياجاتكم.' },
        { title: 'استشارات وتدقيق', desc: 'تحليل عملياتكم وتقديم توصيات للتحول الرقمي.' },
        { title: 'تدريب', desc: 'مرافقة فرقكم لإتقان استخدام أدواتنا.' },
      ],
      ctaTitle1: 'هل أنتم مستعدون لتطوير',
      ctaTitleHighlight: 'نشاطكم',
      ctaTitleEnd: '؟',
      ctaSubtitle: 'جرّبوا محاسب مجانًا لمدة 30 يومًا. دون الحاجة لبطاقة بنكية.',
      ctaButton: 'تحميل النسخة التجريبية المجانية',
    },
    mouhassib: {
      badge: 'الإصدار 1.0.0 متوفر الآن',
      heroTitleLine1: 'الإدارة التجارية',
      heroTitleLine2: 'التي تتحدث لغتكم',
      heroDesc:
        'برنامج إدارة متكامل للتجار والمقاولات الصغيرة: المبيعات، المخزون، المشتريات، العملاء، الفواتير والمحاسبة. باللغة العربية بالكامل، مع دعم أصلي للكتابة من اليمين إلى اليسار.',
      chips: ['تجربة مجانية 30 يومًا', 'دون الحاجة لبطاقة بنكية', 'يعمل دون اتصال بالإنترنت'],
      ctaFree: 'تحميل مجاني',
      previewLabel: 'لمحة عن محاسب',
      previewSub: '(لقطة شاشة قريبًا)',
      liveLabel: 'متاح الآن',
      featuresBadge: 'المزايا',
      featuresTitle1: 'كل ما يحتاجه',
      featuresTitleHighlight: 'متجركم',
      features: [
        { title: 'لوحة تحكم فورية', desc: 'نظرة شاملة على نشاطكم: المبيعات، المشتريات، النتائج، تنبيهات المخزون وتواريخ الصلاحية.' },
        { title: 'المبيعات والفواتير', desc: 'تسجيل المبيعات، وإصدار الإيصالات والفواتير الاحترافية.' },
        { title: 'المخزون والصلاحية', desc: 'متابعة المخزون، وتنبيهات تلقائية عند بلوغ الحدود وتواريخ الصلاحية.' },
        { title: 'محاسبة مدمجة', desc: 'دفاتر اليومية، ميزان المراجعة، الميزانية، وتصدير إلى Sage 100. إدارة كاملة للزكاة.' },
        { title: '100% عربي', desc: 'واجهة بالكامل باللغة العربية، مصممة للتجار الناطقين بالعربية.' },
        { title: 'يعمل دون إنترنت', desc: 'قاعدة بيانات SQLite محلية. لا حاجة إلى الإنترنت لاستخدام محاسب.' },
      ],
      downloadBadge: 'التحميل',
      downloadTitle1: 'جرّبوا محاسب',
      downloadTitleHighlight: 'مجانًا',
      downloadDesc1: 'نقرة واحدة تكفي: يبدأ التحميل فورًا، دون أي تسجيل.',
      downloadDesc2: 'تجربة كاملة لمدة 30 يومًا، دون أي التزام.',
      downloadCountSuffix: 'عمليات تنزيل حتى الآن',
      downloadCountSuffixOne: 'عملية تنزيل حتى الآن',
      downloadButton: 'تحميل محاسب',
      downloadFinePrint: 'نقرة واحدة تكفي: يبدأ التحميل فورًا، دون أي تسجيل.',
      downloadedMsg: 'تم بدء التحميل!',
      includes: ['تجربة كاملة 30 يومًا', 'كل المزايا', 'دعم عبر واتساب'],
    },
    gestcommerce: {
      title: 'GestCommerce',
      desc: 'نسخة مبسطة من حلنا لإدارة الأعمال التجارية. مثالية للتجار الذين لا يحتاجون إلى وحدة المحاسبة.',
      cardText1: 'هذه الصفحة قيد الإنجاز.',
      cardText2: 'في غضون ذلك، اكتشفوا منتجنا المميز',
      ctaButton: 'اكتشف محاسب',
    },
    contact: {
      title: 'تواصلوا معنا',
      subtitle: 'لديكم سؤال؟ طلب خاص؟ راسلونا.',
      cardEmail: 'البريد الإلكتروني',
      cardPhone: 'الهاتف',
      cardWhatsapp: 'واتساب',
      addressTitle: 'نواكشوط، موريتانيا',
      addressDesc: 'نرافق التجار والشركات في موريتانيا وفي جميع أنحاء غرب إفريقيا.',
    },
    software: {
      badge: 'برمجياتنا',
      title1: 'حلول برمجية مصممة',
      title2: 'لتطوير أعمالكم',
      subtitle:
        'حلول احترافية صممتها آي تي ريم لتلبية الاحتياجات الفعلية للشركات في موريتانيا وعلى الصعيد الدولي.',
      cards: [
        { name: 'محاسب', tagline: 'إدارة تجارية ومحاسبة، باللغة العربية بالكامل.', status: 'available', href: '/mouhassib' },
        { name: 'GestCommerce', tagline: 'إدارة تجارية بسيطة وسريعة، دون وحدة محاسبة.', status: 'available', href: '/gestcommerce' },
        { name: 'RAQIB', tagline: 'إدارة الممتلكات والأصول.', status: 'soon', href: '/logiciels/raqib' },
        { name: 'Waqood', tagline: 'إدارة محطات الوقود.', status: 'soon', href: '/logiciels/waqood' },
      ],
      ctaDiscover: 'اكتشف',
      ctaDemo: 'اطلب عرضًا توضيحيًا',
      comingSoonBadge: 'قريبًا',
    },
    comingSoon: {
      badgeLabel: 'قريبًا',
      bodyText: 'هذه الصفحة قيد الإعداد. تواصلوا معنا لمعرفة المزيد الآن.',
      contactCta: 'تواصل معنا',
      backLink: 'العودة إلى برمجياتنا',
    },
    services: {
      badge: 'الخدمات التقنية',
      title1: 'شريككم في',
      titleHighlight: 'التحول الرقمي',
      subtitle: 'إلى جانب برمجياتنا، نرافق الشركات في مشاريعها التقنية.',
      items: [
        { title: 'تطوير حسب الطلب', desc: 'تطبيقات ويب وسطح مكتب وهواتف محمولة مصممة خصيصًا لاحتياجاتكم.' },
        { title: 'استشارات وتدقيق', desc: 'تحليل عملياتكم وتقديم توصيات للتحول الرقمي.' },
        { title: 'تدريب', desc: 'مرافقة فرقكم لإتقان استخدام أدواتنا.' },
      ],
      ctaTitle: 'لديكم مشروع في الذهن؟',
      ctaButton: 'لنتحدث عن ذلك',
    },
    enterprise: {
      title: 'حلول المؤسسات',
      tagline: 'حلول مخصصة لمواكبة نمو شركتكم.',
    },
  },
};
