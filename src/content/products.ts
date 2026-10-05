import type { Locale } from "@/i18n/config";

type L = Record<Locale, string>;
type LL = Record<Locale, string[]>;

export type ProductStatus = "available" | "beta" | "soon";
export type Accent = "m" | "w" | "z" | "r" | "p";

export type Product = {
  slug: string;
  accent: Accent;
  status: ProductStatus;
  /** Essai gratuit : activer/désactiver et durée en jours (7, 15, 30 ou autre). */
  trial: { enabled: boolean; days: number };
  /** URL de la vidéo de démonstration (YouTube nocookie ou fichier). null = « bientôt disponible ». */
  demoVideo: string | null;
  platforms: string[];
  image: string;
  name: L;
  category: L;
  summary: L;
  features: LL;
  presentation: L;
  problem: L;
  solution: L;
  forWhom: LL;
  /** Mots-clés techniques réels, affichés sur la fiche. Liste vide = section masquée. */
  technologies: LL;
  /** Éditeur, si l'application n'est pas développée par IT-RIM. */
  developedBy?: L;
  /** Documents de présentation téléchargeables ou consultables. */
  documents?: { lang: Locale; href: string; label: L }[];
  /** Logo propre à l'application. */
  logo?: string;
  /** Circuit de travail du logiciel, étape par étape. */
  flow?: LL;
  /** Modules (écrans) du logiciel. */
  modules?: LL;
};

export const products: Product[] = [
  {
    slug: "mouhassib",
    accent: "m",
    status: "available",
    trial: { enabled: true, days: 30 },
    demoVideo: null,
    platforms: ["Windows 10", "Windows 11"],
    image: "/images/mouhassib.webp",
    name: { fr: "Mouhassib", ar: "محاسب" },
    category: { fr: "Gestion commerciale", ar: "إدارة الأعمال التجارية" },
    summary: {
      fr: "Une solution complète pour gérer vos ventes, achats, stock, clients, fournisseurs, caisse et comptabilité.",
      ar: "حل متكامل لإدارة المبيعات والمشتريات والمخزون والعملاء والموردين والصندوق والمحاسبة.",
    },
    features: {
      fr: ["Ventes et achats", "Stock et inventaire", "Clients et fournisseurs", "Caisse et comptabilité", "Rapports détaillés", "Paiements"],
      ar: ["المبيعات والمشتريات", "المخزون والجرد", "العملاء والموردون", "الصندوق والمحاسبة", "تقارير مفصلة", "المدفوعات"],
    },
    presentation: {
      fr: "Mouhassib réunit dans un seul logiciel les opérations quotidiennes d'un commerce ou d'une entreprise : vendre, acheter, suivre le stock, encaisser et tenir la comptabilité.",
      ar: "يجمع محاسب في برنامج واحد العمليات اليومية للمحل التجاري أو المؤسسة: البيع والشراء ومتابعة المخزون والتحصيل ومسك المحاسبة.",
    },
    problem: {
      fr: "Cahiers, fichiers Excel dispersés et caisse tenue à part : il devient difficile de savoir ce qui a été vendu, ce qui reste en stock et ce qui est dû.",
      ar: "دفاتر وملفات إكسل متفرقة وصندوق منفصل: يصبح من الصعب معرفة ما بيع وما تبقى في المخزون وما هو مستحق.",
    },
    solution: {
      fr: "Chaque vente, achat et paiement est enregistré au même endroit. Le stock, la caisse et les comptes clients et fournisseurs se mettent à jour, et les rapports sont disponibles à tout moment.",
      ar: "تُسجَّل كل عملية بيع وشراء ودفع في مكان واحد، فيتحدّث المخزون والصندوق وحسابات العملاء والموردين، وتتوفر التقارير في أي وقت.",
    },
    forWhom: {
      fr: ["Commerces de détail et de gros", "PME", "Distributeurs"],
      ar: ["محلات التجزئة والجملة", "المؤسسات الصغيرة والمتوسطة", "الموزعون"],
    },
    technologies: { fr: ["Application de bureau Windows"], ar: ["تطبيق مكتبي لويندوز"] },
  },
  {
    slug: "waqood",
    accent: "w",
    status: "available",
    trial: { enabled: true, days: 30 },
    demoVideo: null,
    platforms: ["Windows 10", "Windows 11"],
    image: "/images/waqood.webp",
    developedBy: { fr: "Développé avec Smartek", ar: "طُوِّر بالتعاون مع Smartek" },
    name: { fr: "Waqood", ar: "وقود" },
    category: { fr: "Gestion de station-service", ar: "إدارة محطات الوقود" },
    summary: {
      fr: "Une solution intuitive, rapide et sécurisée pour gérer pompes, carburant, équipes et caisse d'une station-service.",
      ar: "حل بديهي وسريع وآمن لإدارة المضخات والوقود والفرق والصندوق في محطة الوقود.",
    },
    features: {
      fr: ["Carburants, pompes et index", "Livraisons : le stock monte tout seul", "Ventes : stock et caisse à jour", "Suivi des équipes de pompistes", "Clients, dettes et dépenses", "Caisse et paiements mobiles", "Rapports PDF, Excel et CSV", "100 % hors ligne, sauvegarde en un fichier"],
      ar: ["الوقود والمضخات والعدادات", "التوريدات: يرتفع المخزون تلقائياً", "المبيعات: تحديث المخزون والصندوق", "متابعة فرق عمال التعبئة", "العملاء والديون والمصاريف", "الصندوق والدفع عبر الهاتف", "تقارير PDF وExcel وCSV", "يعمل دون إنترنت، ونسخ احتياطي بملف واحد"],
    },
    presentation: {
      fr: "Maximisez le rendement de votre station-service et gardez un contrôle total sur vos opérations grâce à Waqood, conçu pour les défis quotidiens de la gestion de carburant.",
      ar: "عزّزوا أداء محطة الوقود وحافظوا على تحكم كامل في عملياتكم بفضل وقود، المصمم لمواجهة التحديات اليومية لإدارة الوقود.",
    },
    problem: {
      fr: "Index de pompes relevés à la main, écarts entre le chiffre d'affaires théorique et les encaissements, crédits clients mal suivis : la station manque de visibilité.",
      ar: "عدادات المضخات تُسجَّل يدوياً، وفوارق بين رقم الأعمال النظري والمقبوضات، وديون عملاء غير متابعة: تفتقد المحطة إلى رؤية واضحة.",
    },
    solution: {
      fr: "Waqood suit les compteurs des pompes, affecte des sessions aux pompistes, sépare espèces et paiements digitaux (Bankily, Mobile Money, virement, carte) et compare le théorique au réel. Il reste opérationnel sans Internet.",
      ar: "يتابع وقود عدادات المضخات، ويخصص جلسات عمل لعمال التعبئة، ويفصل النقد عن المدفوعات الرقمية (Bankily وMobile Money والتحويل والبطاقة)، ويقارن النظري بالفعلي، ويبقى يعمل دون إنترنت.",
    },
    forWhom: { fr: ["Stations-service", "Réseaux de stations", "Distributeurs de carburant"], ar: ["محطات الوقود", "شبكات المحطات", "موزعو الوقود"] },
    technologies: { fr: ["Application de bureau Windows", "100 % hors ligne", "Base de données locale SQLite"], ar: ["تطبيق مكتبي لويندوز", "يعمل دون إنترنت كلياً", "قاعدة بيانات محلية SQLite"] },
    logo: "/images/waqood-logo.png",
    flow: {
      fr: ["Livraison", "Stock", "Vente", "Caisse", "Rapports"],
      ar: ["التوريد", "المخزون", "البيع", "الصندوق", "التقارير"],
    },
    modules: {
      fr: ["Tableau de bord", "Carburants", "Pompes", "Livraisons", "Ventes", "Clients", "Dépenses", "Caisse", "Rapports", "Paramètres", "Sauvegarde"],
      ar: ["لوحة القيادة", "الوقود", "المضخات", "التوريدات", "المبيعات", "العملاء", "المصاريف", "الصندوق", "التقارير", "الإعدادات", "النسخ الاحتياطي"],
    },
  },
  {
    slug: "manzeel",
    accent: "z",
    status: "available",
    trial: { enabled: true, days: 30 },
    demoVideo: null,
    platforms: ["Windows 10", "Windows 11"],
    image: "/images/manzeel.webp",
    documents: [
      { lang: "fr", href: "/downloads/Manzeel-Presentation-FR.pptx", label: { fr: "Présentation (français, PowerPoint)", ar: "العرض التقديمي (بالفرنسية، PowerPoint)" } },
      { lang: "ar", href: "/downloads/Manzeel-Presentation-AR.pptx", label: { fr: "Présentation (arabe, PowerPoint)", ar: "العرض التقديمي (بالعربية، PowerPoint)" } },
    ],
    name: { fr: "Manzeel", ar: "منزل" },
    category: { fr: "Gestion commerciale bilingue FR / AR", ar: "إدارة تجارية ثنائية اللغة" },
    summary: {
      fr: "Ventes, achats, stock, caisse et zakat dans une seule application, entièrement bilingue français / arabe, factures comprises.",
      ar: "المبيعات والمشتريات والمخزون والصندوق والزكاة في تطبيق واحد، ثنائي اللغة بالكامل، بما في ذلك الفواتير.",
    },
    features: {
      fr: ["Ventes comptant ou à crédit", "Factures PDF bilingues", "Caisse et dépenses par catégorie", "Bankily, Sedad, Masrvi, Click", "Calcul automatique de la zakat", "Rôles et réseau local"],
      ar: ["بيع نقدي أو بالأجل", "فواتير PDF ثنائية اللغة", "الصندوق والمصاريف حسب الفئة", "بنكيلي وسداد ومصرفي وكليك", "حساب الزكاة تلقائياً", "الأدوار والشبكة المحلية"],
    },
    presentation: {
      fr: "Manzeel est la gestion commerciale qui parle vos deux langues : chaque écran, chaque facture et chaque rapport existe en français et en arabe.",
      ar: "منزل هو الإدارة التجارية التي تتحدث لغتيكم: كل شاشة وكل فاتورة وكل تقرير متوفر بالفرنسية والعربية.",
    },
    problem: {
      fr: "Factures dans une seule langue, caisse qui ne correspond pas aux ventes, paiements mobiles notés à part et zakat calculée à la main en fin d'année.",
      ar: "فواتير بلغة واحدة، وصندوق لا يطابق المبيعات، ومدفوعات عبر الهاتف تُسجَّل على حدة، وزكاة تُحسب يدوياً في نهاية السنة.",
    },
    solution: {
      fr: "Manzeel alimente la caisse automatiquement, intègre Bankily, Sedad, Masrvi et Click comme les espèces, trace stock et dettes fournisseurs, et suit le hawl jour après jour avec un rapport de zakat exportable en PDF.",
      ar: "يغذّي منزل الصندوق تلقائياً، ويدمج بنكيلي وسداد ومصرفي وكليك مثل النقد، ويتتبع المخزون وديون الموردين، ويتابع الحول يوماً بيوم مع تقرير زكاة قابل للتصدير بصيغة PDF.",
    },
    forWhom: { fr: ["Commerçants", "Boutiques et magasins", "Commerces avec plusieurs vendeurs"], ar: ["التجار", "المحلات والمتاجر", "المحلات متعددة البائعين"] },
    technologies: { fr: ["Application de bureau Windows", "Réseau local partagé", "Interface FR / AR"], ar: ["تطبيق مكتبي لويندوز", "شبكة محلية مشتركة", "واجهة بالعربية والفرنسية"] },
  },
  {
    slug: "raqib",
    accent: "r",
    status: "available",
    trial: { enabled: false, days: 30 },
    demoVideo: null,
    platforms: ["Windows", "Réseau local (client-serveur)"],
    image: "/images/raqib.webp",
    documents: [
      { lang: "fr", href: "/raqib-landing.html", label: { fr: "Présentation complète de RAQIB", ar: "العرض الكامل لرقيب (بالفرنسية)" } },
      { lang: "ar", href: "https://bahe1953.github.io/raqib-ar/", label: { fr: "Présentation en arabe", ar: "العرض الكامل لرقيب" } },
    ],
    name: { fr: "RAQIB", ar: "رقيب" },
    category: { fr: "Gestion des immobilisations", ar: "إدارة الممتلكات والأصول" },
    summary: {
      fr: "La plateforme de gestion et de traçabilité des immobilisations, pour les organismes publics et privés.",
      ar: "منصة إدارة الأصول وتتبعها، للهيئات العمومية والخاصة. رقيب – عينك على مالك.",
    },
    features: {
      fr: ["Fiche bien avec code-barres", "Amortissements automatiques", "Suivi des mouvements", "Tableau de bord et alertes", "Inventaire et états imprimables", "Profils utilisateurs, FR / AR"],
      ar: ["بطاقة الأصل مع الرمز الشريطي", "حساب الاهتلاك تلقائياً", "تتبع الحركات", "لوحة قيادة وتنبيهات", "الجرد والتقارير المطبوعة", "صلاحيات المستخدمين، عربي / فرنسي"],
    },
    presentation: {
      fr: "RAQIB couvre tout le cycle de vie des immobilisations : enregistrement, amortissement, affectation, transfert, inventaire et rapports officiels.",
      ar: "يغطي رقيب دورة حياة الأصول كاملة: التسجيل والاهتلاك والتخصيص والنقل والجرد والتقارير الرسمية.",
    },
    problem: {
      fr: "Pas de vue d'ensemble du parc, des biens perdus ou déplacés sans procédure, des fichiers Excel dispersés entre directions et des achats impossibles à justifier.",
      ar: "غياب رؤية شاملة للأصول، وممتلكات تضيع أو تُنقل دون إجراءات، وملفات إكسل متفرقة بين الإدارات، ومشتريات يصعب تبريرها.",
    },
    solution: {
      fr: "Chaque bien a sa fiche codifiée avec photo, valeur et responsable ; chaque mouvement est horodaté ; les amortissements et l'inventaire physique sont produits automatiquement, avec un journal de toutes les actions.",
      ar: "لكل أصل بطاقة مرمّزة مع صورة وقيمة ومسؤول؛ وكل حركة مؤرخة بدقة؛ ويُنتج الاهتلاك والجرد الفعلي تلقائياً، مع سجل لكل العمليات.",
    },
    forWhom: { fr: ["Administrations et organismes publics", "Entreprises", "Établissements et ONG"], ar: ["الإدارات والهيئات العمومية", "الشركات", "المؤسسات والمنظمات"] },
    technologies: { fr: ["WinDev client-serveur", "Déploiement en réseau local", "Interface FR / AR"], ar: ["WinDev خادم-عميل", "تشغيل عبر شبكة محلية", "واجهة بالعربية والفرنسية"] },
  },
  {
    slug: "gestphone",
    accent: "p",
    status: "available",
    trial: { enabled: true, days: 30 },
    demoVideo: null,
    platforms: ["Windows 10", "Windows 11"],
    image: "/images/gestphone/fr-tableau-de-bord.webp",
    logo: "/images/gestphone-logo.png",
    name: { fr: "GestPhone IT", ar: "GestPhone IT" },
    category: { fr: "Boutiques de téléphones et d'informatique", ar: "محلات الهواتف والمعلوميات" },
    summary: {
      fr: "La gestion complète d'une boutique de téléphones et d'informatique : point de vente, suivi par IMEI, stock, achats, caisse, SAV et garanties, hors ligne.",
      ar: "الإدارة الكاملة لمحل الهواتف والمعلوميات: نقطة البيع، والتتبع برقم IMEI، والمخزون، والمشتريات، والصندوق، وخدمة ما بعد البيع والضمان، دون إنترنت.",
    },
    features: {
      fr: ["Point de vente rapide, code-barres (F1)", "Produits et suivi par IMEI", "Stock, inventaire et valorisation", "Achats et fournisseurs", "Caisse : espèces, Bankily, Sedad", "Ventes comptant ou à crédit", "SAV et garanties par IMEI", "Rapports : CA, bénéfice, marges"],
      ar: ["نقطة بيع سريعة بالباركود (F1)", "المنتجات والتتبع برقم IMEI", "المخزون والجرد والتقييم", "المشتريات والموردون", "الصندوق: نقداً، بنكيلي، سداد", "بيع نقدي أو بالأجل", "خدمة ما بعد البيع والضمان برقم IMEI", "التقارير: رقم الأعمال والأرباح والهوامش"],
    },
    presentation: {
      fr: "GestPhone IT réunit en un seul logiciel tout ce qu'une boutique de téléphones et d'informatique gère chaque jour : vendre, suivre chaque appareil par son IMEI, réapprovisionner, encaisser et assurer la garantie.",
      ar: "يجمع GestPhone IT في برنامج واحد كل ما يديره محل الهواتف والمعلوميات يومياً: البيع، وتتبع كل جهاز برقم IMEI، وإعادة التموين، والتحصيل، وضمان ما بعد البيع.",
    },
    problem: {
      fr: "Chaque téléphone a son IMEI, son prix et sa garantie : avec un cahier ou Excel, on perd la trace du stock réel, des ventes à crédit et des appareils revenus en SAV.",
      ar: "لكل هاتف رقم IMEI وسعر وضمان: ومع الدفتر أو إكسل تضيع متابعة المخزون الفعلي والبيع بالأجل والأجهزة العائدة للصيانة.",
    },
    solution: {
      fr: "GestPhone IT enregistre chaque vente au point de vente, suit chaque appareil par son IMEI jusqu'à la fin de sa garantie, met à jour le stock et la caisse (espèces, Bankily, Sedad) et calcule le bénéfice du jour, sans Internet.",
      ar: "يسجّل GestPhone IT كل عملية بيع في نقطة البيع، ويتتبع كل جهاز برقم IMEI حتى نهاية ضمانه، ويحدّث المخزون والصندوق (نقداً، بنكيلي، سداد)، ويحسب ربح اليوم، دون إنترنت.",
    },
    forWhom: {
      fr: ["Boutiques de téléphones", "Magasins d'informatique", "Revendeurs d'accessoires"],
      ar: ["محلات الهواتف", "محلات المعلوميات", "بائعو الإكسسوارات"],
    },
    technologies: {
      fr: ["Application de bureau Windows (64 bits)", "100 % hors ligne", "Interface FR / AR", "Base de données locale SQLite"],
      ar: ["تطبيق مكتبي لويندوز (64 بت)", "يعمل دون إنترنت كلياً", "واجهة بالعربية والفرنسية", "قاعدة بيانات محلية SQLite"],
    },
    flow: {
      fr: ["Achat", "Stock par IMEI", "Vente", "Caisse", "Garantie / SAV"],
      ar: ["الشراء", "المخزون برقم IMEI", "البيع", "الصندوق", "الضمان / الصيانة"],
    },
    modules: {
      fr: ["Tableau de bord", "Point de vente", "Ventes", "Produits & IMEI", "Stock", "Achats", "Clients", "Fournisseurs", "Caisse", "SAV / Garanties", "Rapports", "Utilisateurs", "Paramètres", "Sauvegarde"],
      ar: ["لوحة التحكم", "نقطة البيع", "المبيعات", "المنتجات و IMEI", "المخزون", "المشتريات", "العملاء", "الموردون", "الصندوق", "خدمة ما بعد البيع / الضمان", "التقارير", "المستخدمون", "الإعدادات", "النسخ الاحتياطي"],
    },
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
