export type Lang = 'fr' | 'ar';

export interface SoftwareCard {
  name: string;
  tagline: string;
  status: 'available' | 'soon';
  href: string;
  hasPage?: boolean;
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
    mouhassibFrDesc: string;
    mouhassibFrTags: string[];
    mouhassibFrCta: string;
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
    downloadChooseLabel: string;
    downloadButtonAr: string;
    downloadButtonFr: string;
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
  waqoodPage: {
    badge: string;
    title1: string;
    titleHighlight: string;
    subtitle: string;
    developedBy: string;
    featuresBadge: string;
    featuresTitle1: string;
    featuresTitleHighlight: string;
    features: { title: string; desc: string }[];
    ctaTitle: string;
    ctaButton: string;
    backLink: string;
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
      mouhassibFrDesc: 'Le même Mouhassib, dans une interface entièrement en français : ventes, stock, factures, comptabilité, zakat.',
      mouhassibFrTags: ['Français', 'Compta', 'Offline', 'Trial 30j'],
      mouhassibFrCta: 'Découvrir Mouhassib',
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
      downloadChooseLabel: 'Choisissez la version du logiciel :',
      downloadButtonAr: 'Télécharger la version arabe',
      downloadButtonFr: 'Télécharger la version française',
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
        { name: 'Mouhassib (Français)', tagline: 'Gestion commerciale et comptabilité, entièrement en français.', status: 'available', href: '/mouhassib' },
        { name: 'RAQIB', tagline: 'Gestion du patrimoine et des immobilisations.', status: 'available', href: 'https://bahe1953.github.io/raqib-landing/' },
        { name: 'Waqood', tagline: 'Gestion de station-service.', status: 'soon', href: '/logiciels/waqood', hasPage: true },
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
    waqoodPage: {
      badge: 'WAQOOD (وقود)',
      title1: 'Gestion intégrée pour',
      titleHighlight: 'stations-service',
      subtitle: "Maximisez le rendement de votre station-service et gardez un contrôle total sur vos opérations grâce à WAQOOD. Une solution intuitive, rapide et sécurisée, conçue pour répondre aux défis quotidiens de la gestion de carburant.",
      developedBy: 'Développé par Smartek',
      featuresBadge: 'Pourquoi choisir WAQOOD ?',
      featuresTitle1: 'Fait pour',
      featuresTitleHighlight: 'les stations-service',
      features: [
        { title: 'Visibilité à 360° & mode hors-ligne', desc: "Suivez vos ventes, vos stocks et vos finances en temps réel via un tableau de bord clair. La solution reste 100 % opérationnelle même sans connexion Internet." },
        { title: 'Gestion précise des stocks & pistolets', desc: "Suivez les compteurs/index des pompes avec exactitude, éliminez les erreurs de calcul manuel et recevez des alertes automatiques en cas de niveau de stock bas." },
        { title: 'Suivi des équipes & services', desc: "Attribuez des sessions de travail à vos pompistes, contrôlez les volumes vendus et comparez le chiffre d'affaires théorique aux encaissements réels." },
        { title: 'Trésorerie & multi-paiements', desc: "Séparez rigoureusement votre caisse physique (espèces) des paiements digitaux (Bankily, Mobile Money, virement, cartes bancaires) pour un suivi comptable sans faille." },
        { title: 'Gestion des clients, dettes & fournisseurs', desc: "Automatisez le suivi des livraisons de carburant, maîtrisez le crédit accordé à vos clients et enregistrez les remboursements en toute transparence." },
        { title: 'Rapports & exportations en 1 clic', desc: "Analysez vos performances financières et exportez vos données instantanément aux formats PDF, Excel ou CSV." },
        { title: 'Sécurité & sauvegardes', desc: "Contrôlez les accès grâce à la gestion affinée des rôles/utilisateurs et sécurisez vos données stratégiques grâce au module de sauvegarde/restauration intégré." },
      ],
      ctaTitle: 'Un projet de station-service ?',
      ctaButton: 'Demander une démonstration',
      backLink: 'Retour à nos logiciels',
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
      mouhassibFrDesc: 'نفس برنامج محاسب، بواجهة كاملة باللغة الفرنسية: المبيعات، المخزون، الفواتير، المحاسبة، الزكاة.',
      mouhassibFrTags: ['فرنسي', 'محاسبة', 'دون إنترنت', 'تجربة 30 يومًا'],
      mouhassibFrCta: 'اكتشف محاسب',
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
      downloadChooseLabel: 'اختر نسخة البرنامج:',
      downloadButtonAr: 'تحميل النسخة العربية',
      downloadButtonFr: 'تحميل النسخة الفرنسية',
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
        { name: 'محاسب (بالفرنسية)', tagline: 'إدارة تجارية ومحاسبة، باللغة الفرنسية بالكامل.', status: 'available', href: '/mouhassib' },
        { name: 'RAQIB', tagline: 'إدارة الممتلكات والأصول.', status: 'available', href: 'https://bahe1953.github.io/raqib-ar/' },
        { name: 'Waqood', tagline: 'إدارة محطات الوقود.', status: 'soon', href: '/logiciels/waqood', hasPage: true },
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
    waqoodPage: {
      badge: 'وقود (WAQOOD)',
      title1: 'إدارة متكاملة',
      titleHighlight: 'لمحطات الوقود',
      subtitle: 'عزّزوا أداء محطة الوقود الخاصة بكم وحافظوا على تحكم كامل في عملياتكم بفضل وقود. حل بديهي وسريع وآمن، مصمم لمواجهة التحديات اليومية لإدارة الوقود.',
      developedBy: 'من تطوير Smartek',
      featuresBadge: 'لماذا تختارون وقود؟',
      featuresTitle1: 'مصمم من أجل',
      featuresTitleHighlight: 'محطات الوقود',
      features: [
        { title: 'رؤية شاملة 360° ووضع عدم الاتصال', desc: 'تابعوا مبيعاتكم ومخزونكم وأموالكم لحظيًا عبر لوحة تحكم واضحة. يبقى الحل يعمل بالكامل حتى دون اتصال بالإنترنت.' },
        { title: 'إدارة دقيقة للمخزون والمضخات', desc: 'تابعوا عدادات/مؤشرات المضخات بدقة، وتخلصوا من أخطاء الحساب اليدوي، واستقبلوا تنبيهات تلقائية عند انخفاض المخزون.' },
        { title: 'متابعة الفرق والخدمات', desc: 'خصّصوا جلسات عمل لعمال التعبئة، وراقبوا الكميات المباعة، وقارنوا رقم الأعمال النظري بالمقبوضات الفعلية.' },
        { title: 'الخزينة والدفع متعدد الوسائل', desc: 'افصلوا بدقة بين صندوقكم النقدي (السيولة) والمدفوعات الرقمية (Bankily، Mobile Money، التحويل، البطاقات البنكية) لمتابعة محاسبية موثوقة.' },
        { title: 'إدارة العملاء والديون والموردين', desc: 'أتمتوا متابعة توصيلات الوقود، وتحكموا في الائتمان الممنوح لعملائكم، وسجّلوا التسديدات بكل شفافية.' },
        { title: 'تقارير وتصدير بنقرة واحدة', desc: 'حلّلوا أداءكم المالي وصدّروا بياناتكم فورًا بصيغ PDF أو Excel أو CSV.' },
        { title: 'الأمان والنسخ الاحتياطي', desc: 'تحكموا في الصلاحيات بفضل إدارة دقيقة للأدوار/المستخدمين، وأمّنوا بياناتكم الاستراتيجية بفضل وحدة النسخ الاحتياطي/الاستعادة المدمجة.' },
      ],
      ctaTitle: 'لديكم مشروع محطة وقود؟',
      ctaButton: 'اطلب عرضًا توضيحيًا',
      backLink: 'العودة إلى برمجياتنا',
    },
  },
};
