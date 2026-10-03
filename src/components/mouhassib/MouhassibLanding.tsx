"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import Echelle from "./Echelle";
import DashboardMockup from "./DashboardMockup";
import VideoDemo from "./VideoDemo";
import { C, POPPINS, ICONES as I, Icone, Logo } from "./theme";

/**
 * Page de présentation de Mouhassib, reprise de la page « mouhassib-fr » du site actuel d'IT-RIM,
 * en français (/fr/applications/mouhassib) et en arabe (/ar/applications/mouhassib).
 * Le bouton de téléchargement donne l'installateur de la langue de la page ; l'essai gratuit
 * démarre à l'installation (durée réglée dans src/content/products.ts).
 */

type Lang = "fr" | "ar";

export type DownloadInfo = { url: string | null; otherUrl: string | null; version: string | null; date: string | null; platforms: string; sizeMb: number | null; sha256: string | null };

const WA = "22243459222";

const T = {
  fr: {
    font: "var(--font-lat)",
    titles: POPPINS,
    badge: "Gestion commerciale · Version française",
    h1a: "MOUHASSIB —",
    h1b: "Votre commerce, maîtrisé ",
    h1hl: "de A à Z.",
    lead: "Ventes, achats, stocks, clients, fournisseurs, caisse et comptes réunis dans une seule solution.",
    discover: "Découvrir Mouhassib",
    demo: "Voir la démonstration",
    checks: (d: number) => ["Fonctionne hors ligne", `Essai gratuit ${d} jours`, "Données sur votre ordinateur"],
    floatInvoice: ["Facture validée", "FAC-2026-0184 · 18 400 MRU"],
    floatStock: ["Stock · Riz 25 kg", "148 sacs"],
    videoEyebrow: "DÉMONSTRATION · 60 SECONDES",
    videoTitle: "Mouhassib en une minute.",
    featEyebrow: "FONCTIONNALITÉS",
    featTitle: "Tout ce qu'il vous faut pour piloter votre activité.",
    featLead: "Six modules reliés entre eux : chaque vente met à jour le stock, la caisse et les comptes, sans double saisie.",
    modules: [
      ["Ventes & factures", I.vente, "Encaissez au comptoir, éditez devis, factures et bons de livraison en quelques clics."],
      ["Achats", I.achat, "Enregistrez vos réceptions, frais d'approche compris, et gardez un œil sur ce que vous devez."],
      ["Gestion des stocks", I.stock, "Quantités et valeur à jour à chaque vente, alertes de réassort et de péremption."],
      ["Clients", I.client, "Fiches, historique d'achats et factures à encaisser, réunis au même endroit."],
      ["Fournisseurs", I.fourn, "Achats, règlements et soldes par fournisseur, sans tableau Excel à tenir."],
      ["Caisse & comptes", I.caisse, "Caisse, banques, chèques et mobile money suivis au centime, écritures comptables générées pour vous."],
    ],
    dashEyebrow: "TABLEAU DE BORD",
    dashTitle: "Votre activité, en un coup d'œil.",
    dashLead: "Chiffre d'affaires, ventes du jour, achats, stock, créances, dettes et caisse : les chiffres qui comptent, à jour à chaque opération.",
    dashPoints: ["Stock valorisé au coût moyen", "Créances et dettes toujours à jour", "Caisse et comptabilité concordantes"],
    whoEyebrow: "POUR QUI ?",
    whoTitle: "Une solution pensée pour le commerce réel.",
    whoLead: "Du comptoir de quartier au dépôt de gros, Mouhassib s'adapte à votre façon de vendre, d'acheter et de stocker.",
    targets: [
      ["Commerces", I.boutique, "Épiceries, boutiques, quincailleries : un comptoir rapide et un stock juste."],
      ["Magasins", I.magasin, "Plusieurs caisses reliées au même poste, sur votre réseau local."],
      ["Grossistes", I.entrepot, "Ventes en volume, ventes à crédit et facturation professionnelle."],
      ["Distributeurs", I.fourn, "Bons de livraison, créances par client et suivi des règlements."],
      ["PME", I.pme, "Comptabilité, paie et exports Sage prêts pour votre comptable."],
      ["Importateurs", I.bateau, "Frais de douane, de port et de transport intégrés au coût de revient."],
    ],
    simEyebrow: "SIMPLICITÉ",
    simTitle: "Moins de complexité. Plus de contrôle.",
    benefits: [
      ["01", "Gagnez du temps", I.temps, "Automatisez les opérations quotidiennes : une vente saisie une fois met tout à jour."],
      ["02", "Gardez le contrôle", I.bouclier, "Visualisez votre activité à tout moment, poste par poste et utilisateur par utilisateur."],
      ["03", "Décidez avec de vrais chiffres", I.compta, "Des informations claires pour mieux piloter votre entreprise."],
    ],
    dlEyebrow: "ESSAI GRATUIT",
    dlTitle: (d: number) => `Téléchargez Mouhassib et essayez-le ${d} jours.`,
    dlLead: (d: number) => `Installez Mouhassib sur votre ordinateur Windows : toutes les fonctions sont ouvertes pendant ${d} jours, sans carte bancaire. À la fin de l'essai, l'équipe IT-RIM vous accompagne pour obtenir une licence.`,
    dlButton: "Télécharger Mouhassib (version française)",
    dlOther: "Vous préférez l'interface en arabe ? Télécharger la version arabe",
    dlStarted: "Le téléchargement a démarré. Lancez le fichier téléchargé pour installer Mouhassib.",
    dlSoon: "Téléchargement bientôt disponible. Écrivez-nous sur WhatsApp pour recevoir l'installateur.",
    dlFacts: ["Version", "Taille", "Mise à jour", "Système", "Essai gratuit"],
    mb: "Mo",
    after: "Après téléchargement, ouvrez le fichier .exe et suivez l'assistant d'installation. Si Windows affiche « Windows a protégé votre ordinateur », cliquez sur « Informations complémentaires » puis « Exécuter quand même ».",
    days: "jours",
    dlIncludes: ["Toutes les fonctions débloquées", "Données conservées sur votre PC", "Assistance par WhatsApp"],
    ctaTitle: "Prêt à moderniser votre gestion commerciale ?",
    ctaLead: (d: number) => `Nous vous montrons Mouhassib sur vos propres opérations, puis vous l'essayez gratuitement pendant ${d} jours.`,
    ctaDemo: "Demander une démonstration",
    ctaContact: "Nous contacter",
    waDemo: "Bonjour IT-RIM, je souhaite une démonstration de Mouhassib (version française)",
    brand: "MOUHASSIB",
    brandLine: "Solution professionnelle de gestion commerciale.",
  },
  ar: {
    font: "var(--font-ar)",
    titles: "var(--font-ar)",
    badge: "إدارة الأعمال التجارية · النسخة العربية",
    h1a: "محاسب —",
    h1b: "تجارتك تحت السيطرة ",
    h1hl: "من الألف إلى الياء.",
    lead: "المبيعات والمشتريات والمخزون والزبائن والموردون والصندوق والحسابات، مجتمعة في حل واحد.",
    discover: "اكتشف محاسب",
    demo: "شاهد العرض التوضيحي",
    checks: (d: number) => ["يعمل دون إنترنت", `تجربة مجانية ${d} يوماً`, "بياناتك على حاسوبك"],
    floatInvoice: ["تم تأكيد الفاتورة", "FAC-2026-0184 · 18 400 أوقية"],
    floatStock: ["المخزون · أرز 25 كغ", "148 كيساً"],
    videoEyebrow: "عرض توضيحي · 60 ثانية",
    videoTitle: "محاسب في دقيقة واحدة.",
    featEyebrow: "الوظائف",
    featTitle: "كل ما تحتاجه لتسيير نشاطك.",
    featLead: "ست وحدات مترابطة: كل عملية بيع تحدّث المخزون والصندوق والحسابات، دون إدخال مزدوج.",
    modules: [
      ["المبيعات والفواتير", I.vente, "سجّل البيع عند الصندوق، وأصدر عروض الأسعار والفواتير ووصولات التسليم بنقرات قليلة."],
      ["المشتريات", I.achat, "سجّل الاستلامات مع مصاريف الشحن، وتابع ما عليك من مستحقات."],
      ["تسيير المخزون", I.stock, "الكميات والقيمة محدّثة مع كل بيع، مع تنبيهات إعادة التموين وانتهاء الصلاحية."],
      ["الزبائن", I.client, "البطاقات وسجل المشتريات والفواتير المستحقة، في مكان واحد."],
      ["الموردون", I.fourn, "المشتريات والتسديدات والأرصدة لكل مورد، دون جداول إكسل."],
      ["الصندوق والحسابات", I.caisse, "الصندوق والبنوك والشيكات والدفع عبر الهاتف متابَعة بدقة، والقيود المحاسبية تُنشأ تلقائياً."],
    ],
    dashEyebrow: "لوحة القيادة",
    dashTitle: "نشاطك بنظرة واحدة.",
    dashLead: "رقم الأعمال، مبيعات اليوم، المشتريات، المخزون، ديون الزبائن والموردين، والصندوق: الأرقام المهمة، محدّثة مع كل عملية.",
    dashPoints: ["مخزون مقيَّم بالتكلفة المتوسطة", "ديون الزبائن والموردين محدّثة دائماً", "صندوق ومحاسبة متطابقان"],
    whoEyebrow: "لمن؟",
    whoTitle: "حل مصمم للتجارة الحقيقية.",
    whoLead: "من دكان الحي إلى مستودع الجملة، يتكيف محاسب مع طريقتك في البيع والشراء والتخزين.",
    targets: [
      ["المحلات التجارية", I.boutique, "البقالات والبوتيكات ومحلات الأدوات: صندوق سريع ومخزون دقيق."],
      ["المتاجر", I.magasin, "عدة صناديق مرتبطة بالجهاز نفسه، عبر شبكتك المحلية."],
      ["تجار الجملة", I.entrepot, "مبيعات بالكميات، وبيع بالأجل، وفوترة احترافية."],
      ["الموزعون", I.fourn, "وصولات التسليم، وديون كل زبون، ومتابعة التسديدات."],
      ["المؤسسات الصغيرة والمتوسطة", I.pme, "المحاسبة والرواتب وتصدير البيانات إلى Sage جاهزة لمحاسبك."],
      ["المستوردون", I.bateau, "مصاريف الجمارك والميناء والنقل مدمجة في سعر التكلفة."],
    ],
    simEyebrow: "البساطة",
    simTitle: "تعقيد أقل. تحكم أكبر.",
    benefits: [
      ["01", "اربح الوقت", I.temps, "أتمت العمليات اليومية: بيع يُسجَّل مرة واحدة يحدّث كل شيء."],
      ["02", "حافظ على السيطرة", I.bouclier, "تابع نشاطك في أي وقت، جهازاً بجهاز ومستخدماً بمستخدم."],
      ["03", "قرّر بأرقام حقيقية", I.compta, "معلومات واضحة لتسيير مؤسستك بشكل أفضل."],
    ],
    dlEyebrow: "تجربة مجانية",
    dlTitle: (d: number) => `حمّل محاسب وجرّبه ${d} يوماً.`,
    dlLead: (d: number) => `ثبّت محاسب على حاسوبك بنظام ويندوز: جميع الوظائف مفتوحة لمدة ${d} يوماً، دون بطاقة بنكية. وعند نهاية التجربة، يرافقك فريق IT-RIM للحصول على ترخيص.`,
    dlButton: "تحميل محاسب (النسخة العربية)",
    dlOther: "تفضّل الواجهة بالفرنسية؟ حمّل النسخة الفرنسية",
    dlStarted: "بدأ التحميل. افتح الملف الذي تم تحميله لتثبيت محاسب.",
    dlSoon: "التحميل متاح قريباً. راسلنا عبر واتساب لتحصل على ملف التثبيت.",
    dlFacts: ["الإصدار", "الحجم", "آخر تحديث", "النظام", "التجربة المجانية"],
    mb: "ميغابايت",
    after: "بعد التحميل، افتح ملف ‎.exe‎ واتبع خطوات التثبيت. إذا ظهرت رسالة «قام Windows بحماية جهاز الكمبيوتر»، اضغط على «مزيد من المعلومات» ثم «التشغيل على أي حال».",
    days: "يوماً",
    dlIncludes: ["جميع الوظائف مفتوحة", "بياناتك محفوظة على حاسوبك", "دعم عبر واتساب"],
    ctaTitle: "مستعد لتحديث تسيير تجارتك؟",
    ctaLead: (d: number) => `نعرض عليك محاسب على عملياتك الفعلية، ثم تجرّبه مجاناً لمدة ${d} يوماً.`,
    ctaDemo: "اطلب عرضاً توضيحياً",
    ctaContact: "تواصل معنا",
    waDemo: "السلام عليكم IT-RIM، أرغب في عرض توضيحي لبرنامج محاسب (النسخة العربية)",
    brand: "محاسب",
    brandLine: "حل احترافي لتسيير الأعمال التجارية.",
  },
} as const;

function EyebrowBase({ children, rtl }: { children: ReactNode; rtl: boolean }) {
  return <div style={{ fontSize: rtl ? 15 : 13, fontWeight: 700, letterSpacing: rtl ? 0 : "0.14em", color: C.orTexte }}>{children}</div>;
}
function H2Base({ children, className = "", rtl, font }: { children: ReactNode; className?: string; rtl: boolean; font: string }) {
  return (
    <h2 className={`text-3xl md:text-[44px] leading-tight ${className}`} style={{ margin: 0, fontFamily: font, fontWeight: 700, letterSpacing: rtl ? 0 : "-0.02em", color: C.encre, lineHeight: rtl ? 1.35 : 1.15 }}>{children}</h2>
  );
}
function Tick({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-2"><Icone d={I.coche} taille={18} epaisseur={2.2} couleur={C.primaire} />{children}</div>;
}

const appear = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] },
};

export default function MouhassibLanding({ lang, trialDays, download }: { lang: Lang; trialDays: number; download: DownloadInfo }) {
  const t = T[lang];
  const rtl = lang === "ar";
  const [demoRequest, setDemoRequest] = useState(0);
  const [started, setStarted] = useState(false);

  const watchDemo = () => {
    document.getElementById("demonstration")?.scrollIntoView({ behavior: "smooth", block: "center" });
    setDemoRequest((n) => n + 1);
  };
  const trackDownload = (version: Lang) => {
    fetch("/api/download-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produit: `mouhassib-${version}` }),
    }).catch(() => {});
    setStarted(true);
  };

  const primary = { background: C.primaire, color: "#fff" };
  const hover = { whileHover: { y: -2, boxShadow: "0 14px 28px -14px rgba(3,105,161,.6)" }, transition: { duration: 0.2 } };
  const otherLang: Lang = rtl ? "fr" : "ar";
  const fmtDate = (iso: string) => iso.split("-").reverse().join("/");

  return (
    <div dir={rtl ? "rtl" : "ltr"} lang={lang} style={{ background: "#fff", color: C.encre, fontFamily: t.font }}>
      {/* HERO */}
      <section style={{ background: `linear-gradient(180deg, ${C.cielClair} 0%, #fff 100%)` }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-12 pb-16 md:px-8 md:pt-16 md:pb-24 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-7">
            <motion.div {...appear} className="flex items-center gap-2.5 self-start rounded-full px-3.5 py-2 text-[13px] font-medium" style={{ background: "#fff", border: `1px solid ${C.bord}`, color: C.texte }}>
              <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.4, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: "50%", background: C.or }} />
              {t.badge}
            </motion.div>
            <motion.h1 {...appear} transition={{ ...appear.transition, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-[56px]"
              style={{ margin: 0, fontFamily: t.titles, fontWeight: 700, lineHeight: rtl ? 1.35 : 1.08, letterSpacing: rtl ? 0 : "-0.02em", color: C.encre }}>
              {t.h1a}<br />{t.h1b}<span style={{ color: C.primaire, borderBottom: `5px solid ${C.or}` }}>{t.h1hl}</span>
            </motion.h1>
            <motion.p {...appear} transition={{ ...appear.transition, delay: 0.2 }} className="text-lg md:text-xl" style={{ margin: 0, lineHeight: 1.6, color: C.texte }}>{t.lead}</motion.p>
            <motion.div {...appear} transition={{ ...appear.transition, delay: 0.3 }} className="flex flex-col gap-3.5 sm:flex-row">
              <motion.a {...hover} href="#telecharger" className="rounded-xl px-7 py-4 text-center font-semibold" style={primary}>{t.discover}</motion.a>
              <motion.button {...hover} type="button" onClick={watchDemo} className="flex items-center justify-center gap-2.5 rounded-xl px-6 py-4 font-semibold" style={{ background: "#fff", border: `1px solid ${C.cielMoyen}`, color: C.encre }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: C.ciel, color: C.primaire, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ transform: rtl ? "scaleX(-1)" : undefined }}><path d="M7 4l13 8-13 8z" /></svg>
                </span>
                {t.demo}
              </motion.button>
            </motion.div>
            <motion.div {...appear} transition={{ ...appear.transition, delay: 0.4 }} className="flex flex-wrap gap-x-7 gap-y-2 text-sm" style={{ color: C.texte }}>
              {t.checks(trialDays).map((c) => <Tick key={c}>{c}</Tick>)}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative min-w-0">
            <div style={{ padding: "12px 12px 18px 12px", borderRadius: 22, background: "#E2E8F0", border: "1px solid #CBD5E1", boxShadow: "0 60px 120px -50px rgba(3,105,161,.45)" }}>
              <div style={{ borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                <Echelle largeur={1040} hauteur={660}><DashboardMockup langue={lang} /></Echelle>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div style={{ width: 110, height: 44, background: "#CBD5E1" }} />
              <div style={{ width: 240, height: 12, borderRadius: 8, background: "#B8C6D4" }} />
            </div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -start-10 bottom-24 hidden items-center gap-3 rounded-2xl px-4 py-3.5 md:flex"
              style={{ width: 250, background: "#fff", border: `1px solid ${C.bord}`, boxShadow: "0 24px 48px -24px rgba(3,105,161,.4)" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: C.ciel, color: C.primaire, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icone d={I.coche} taille={20} epaisseur={2} /></div>
              <div><div className="text-[13px] font-semibold">{t.floatInvoice[0]}</div><div className="text-xs" style={{ color: C.discret }}>{t.floatInvoice[1]}</div></div>
            </motion.div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
              className="absolute -end-4 top-6 hidden flex-col gap-2 rounded-2xl px-4 py-3.5 md:flex"
              style={{ width: 220, background: "#fff", border: `1px solid ${C.bord}`, boxShadow: "0 24px 48px -24px rgba(3,105,161,.4)" }}>
              <div className="text-xs" style={{ color: C.discret }}>{t.floatStock[0]}</div>
              <div style={{ fontFamily: t.titles, fontWeight: 600, fontSize: 20 }}>{t.floatStock[1]}</div>
              <div style={{ height: 6, borderRadius: 4, background: "#EEF3F7", overflow: "hidden" }}><div style={{ width: "68%", height: 6, background: C.or }} /></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VIDÉO */}
      <section id="demonstration" className="mx-auto max-w-6xl scroll-mt-28 px-5 pb-20 md:px-8 md:pb-28">
        <motion.div {...appear} className="mb-10 flex flex-col items-center gap-3 text-center">
          <EyebrowBase rtl={rtl}>{t.videoEyebrow}</EyebrowBase>
          <H2Base rtl={rtl} font={t.titles}>{t.videoTitle}</H2Base>
        </motion.div>
        <motion.div {...appear}><VideoDemo demande={demoRequest} langue={lang} /></motion.div>
      </section>

      {/* FONCTIONNALITÉS */}
      <section id="fonctionnalites" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-20 md:px-8 md:py-28">
        <motion.div {...appear} className="mb-14 flex flex-col items-center gap-4 text-center">
          <EyebrowBase rtl={rtl}>{t.featEyebrow}</EyebrowBase>
          <H2Base rtl={rtl} font={t.titles} className="max-w-3xl">{t.featTitle}</H2Base>
          <p className="max-w-2xl text-lg" style={{ margin: 0, color: C.texte, lineHeight: 1.6 }}>{t.featLead}</p>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {t.modules.map(([title, d, text], k) => (
            <motion.div key={title} {...appear} transition={{ ...appear.transition, delay: (k % 3) * 0.08 }}
              whileHover={{ y: -6, boxShadow: "0 28px 56px -28px rgba(3,105,161,.35)", borderColor: C.or }}
              className="group flex flex-col gap-4 rounded-2xl p-7 md:p-8" style={{ background: "#fff", border: `1px solid ${C.bord}` }}>
              <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] transition-colors duration-300 group-hover:bg-[#0369A1] group-hover:text-white" style={{ background: C.ciel, color: C.primaire }}>
                <Icone d={d} taille={24} />
              </div>
              <div style={{ fontFamily: t.titles, fontWeight: 600, fontSize: 21 }}>{title}</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.6, color: C.texte }}>{text}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TABLEAU DE BORD */}
      <section style={{ background: C.ciel }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-5 py-20 md:px-8 md:py-28">
          <motion.div {...appear} className="flex flex-col items-center gap-4 text-center">
            <EyebrowBase rtl={rtl}>{t.dashEyebrow}</EyebrowBase>
            <H2Base rtl={rtl} font={t.titles}>{t.dashTitle}</H2Base>
            <p className="max-w-2xl text-lg" style={{ margin: 0, color: C.texte, lineHeight: 1.6 }}>{t.dashLead}</p>
          </motion.div>
          <motion.div {...appear} className="w-full max-w-[1064px]" style={{ padding: 12, borderRadius: 24, background: "#fff", border: `1px solid ${C.cielMoyen}`, boxShadow: "0 60px 120px -50px rgba(3,105,161,.45)" }}>
            <div style={{ borderRadius: 14, overflow: "hidden" }}><Echelle largeur={1040} hauteur={660}><DashboardMockup langue={lang} /></Echelle></div>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm" style={{ color: C.texte }}>
            {t.dashPoints.map((x) => <div key={x} className="flex items-center gap-2"><span style={{ width: 8, height: 8, borderRadius: "50%", background: C.or }} />{x}</div>)}
          </div>
        </div>
      </section>

      {/* POUR QUI */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[400px_1fr] lg:gap-20">
        <motion.div {...appear} className="flex flex-col gap-4">
          <EyebrowBase rtl={rtl}>{t.whoEyebrow}</EyebrowBase>
          <H2Base rtl={rtl} font={t.titles}>{t.whoTitle}</H2Base>
          <p className="text-lg" style={{ margin: 0, color: C.texte, lineHeight: 1.6 }}>{t.whoLead}</p>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2">
          {t.targets.map(([title, d, text], k) => (
            <motion.div key={title} {...appear} transition={{ ...appear.transition, delay: (k % 2) * 0.08 }}
              whileHover={{ y: -4, borderColor: C.or }} className="flex items-start gap-4 rounded-2xl p-6" style={{ background: C.gris, border: `1px solid ${C.bord}` }}>
              <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl" style={{ background: "#fff", color: C.primaire }}><Icone d={d} taille={22} /></div>
              <div className="flex flex-col gap-1.5">
                <div style={{ fontFamily: t.titles, fontWeight: 600, fontSize: 19 }}>{title}</div>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: C.texte }}>{text}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SIMPLICITÉ */}
      <section style={{ background: C.gris }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-20 md:px-8 md:py-28">
          <motion.div {...appear} className="flex flex-col items-center gap-4 text-center">
            <EyebrowBase rtl={rtl}>{t.simEyebrow}</EyebrowBase>
            <H2Base rtl={rtl} font={t.titles}>{t.simTitle}</H2Base>
          </motion.div>
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {t.benefits.map(([num, title, d, text], k) => (
              <motion.div key={title} {...appear} transition={{ ...appear.transition, delay: k * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 28px 56px -28px rgba(3,105,161,.35)" }} className="flex flex-col gap-5 rounded-3xl p-8 md:p-10" style={{ background: "#fff", border: `1px solid ${C.bord}` }}>
                <div className="flex items-center justify-between">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl" style={{ background: C.ciel, color: C.primaire }}><Icone d={d} taille={28} /></div>
                  <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 40, color: "#E4D3A6" }}>{num}</div>
                </div>
                <div style={{ fontFamily: t.titles, fontWeight: 600, fontSize: 24 }}>{title}</div>
                <div style={{ fontSize: 17, lineHeight: 1.6, color: C.texte }}>{text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉLÉCHARGEMENT — ESSAI GRATUIT */}
      <section id="telecharger" className="mx-auto max-w-5xl scroll-mt-28 px-5 py-20 md:px-8 md:py-28">
        <motion.div {...appear} className="flex flex-col items-center gap-4 text-center">
          <EyebrowBase rtl={rtl}>{t.dlEyebrow}</EyebrowBase>
          <H2Base rtl={rtl} font={t.titles}>{t.dlTitle(trialDays)}</H2Base>
          <p className="max-w-2xl text-lg" style={{ margin: 0, color: C.texte, lineHeight: 1.6 }}>{t.dlLead(trialDays)}</p>
        </motion.div>
        <motion.div {...appear} className="mt-10 grid gap-8 rounded-[28px] p-6 md:grid-cols-[1.2fr_1fr] md:p-10"
          style={{ background: `linear-gradient(135deg, ${C.cielClair}, ${C.ciel})`, border: `1px solid ${C.cielMoyen}` }}>
          <div className="flex flex-col justify-center gap-5">
            <div className="flex items-center gap-3">
              <Logo taille={48} />
              <div>
                <div style={{ fontFamily: t.titles, fontWeight: 700, fontSize: 22 }}>{t.brand}</div>
                <div className="text-sm" style={{ color: C.texte }}>{download.platforms}</div>
              </div>
            </div>
            {download.url ? (
              <>
                <motion.a {...hover} href={download.url} onClick={() => trackDownload(lang)} className="flex items-center justify-center gap-3 rounded-xl px-7 py-4 text-center text-[17px] font-bold" style={primary}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
                  {t.dlButton}
                </motion.a>
                {started && <p role="status" className="rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: "#ECFDF5", color: "#065F46" }}>{t.dlStarted}</p>}
                <p className="text-[13.5px]" style={{ margin: 0, color: C.texte, lineHeight: 1.6 }}>{t.after}</p>
                {download.otherUrl && (
                  <a href={download.otherUrl} onClick={() => trackDownload(otherLang)} className="text-sm font-semibold underline underline-offset-4" style={{ color: C.primaire }}>{t.dlOther}</a>
                )}
              </>
            ) : (
              <p className="rounded-xl px-4 py-3 text-sm font-semibold" style={{ background: "#FFF7E6", color: "#8A6516" }}>{t.dlSoon}</p>
            )}
            <ul className="grid gap-2 text-[15px]" style={{ color: C.texte, listStyle: "none", padding: 0, margin: 0 }}>
              {t.dlIncludes.map((x) => <li key={x}><Tick>{x}</Tick></li>)}
            </ul>
          </div>
          <dl className="grid content-center gap-0 rounded-2xl bg-white p-2" style={{ border: `1px solid ${C.bord}`, margin: 0 }}>
            {[
              [t.dlFacts[0], download.version],
              [t.dlFacts[1], download.sizeMb ? `${download.sizeMb} ${t.mb}` : null],
              [t.dlFacts[2], download.date ? fmtDate(download.date) : null],
              [t.dlFacts[3], download.platforms],
              [t.dlFacts[4], `${trialDays} ${t.days}`],
            ].map(([k, v], i) => (
              <div key={k as string} className="flex items-center justify-between gap-4 px-4 py-3.5" style={{ borderTop: i ? `1px solid ${C.bord}` : undefined }}>
                <dt style={{ color: C.discret, fontSize: 14 }}>{k}</dt>
                <dd style={{ margin: 0, fontWeight: 700, fontSize: 15, unicodeBidi: "isolate" }}>{v ?? "—"}</dd>
              </div>
            ))}
            {download.sha256 && (
              <div className="px-4 pt-2 pb-3" style={{ borderTop: `1px solid ${C.bord}` }}>
                <div style={{ color: C.discret, fontSize: 12 }}>SHA-256</div>
                <code dir="ltr" className="block break-all" style={{ fontSize: 11, color: C.texte, fontFamily: "ui-monospace, Consolas, monospace" }}>{download.sha256}</code>
              </div>
            )}
          </dl>
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-24">
        <motion.div {...appear} className="relative grid items-center gap-10 overflow-hidden rounded-[28px] lg:grid-cols-[1fr_1.1fr]"
          style={{ background: `linear-gradient(135deg, ${C.ciel} 0%, ${C.cielMoyen} 100%)`, border: `1px solid ${C.cielMoyen}` }}>
          <div className="flex flex-col gap-5 p-8 md:p-14">
            <div style={{ width: 56, height: 4, borderRadius: 2, background: C.or }} />
            <h2 className="text-3xl md:text-[42px]" style={{ margin: 0, fontFamily: t.titles, fontWeight: 700, lineHeight: rtl ? 1.4 : 1.15, letterSpacing: rtl ? 0 : "-0.02em", color: C.encre }}>{t.ctaTitle}</h2>
            <p className="text-lg" style={{ margin: 0, lineHeight: 1.6, color: C.texte }}>{t.ctaLead(trialDays)}</p>
            <div className="flex flex-col gap-3.5 pt-2 sm:flex-row">
              <motion.a {...hover} href={`https://wa.me/${WA}?text=${encodeURIComponent(t.waDemo)}`} target="_blank" rel="noopener noreferrer" className="rounded-xl px-7 py-4 text-center font-bold" style={primary}>{t.ctaDemo}</motion.a>
              <motion.a {...hover} href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" className="rounded-xl px-6 py-4 text-center font-semibold" style={{ background: "#fff", color: C.encre, border: `1px solid ${C.cielMoyen}` }}>{t.ctaContact}</motion.a>
            </div>
          </div>
          <div className={`hidden self-end lg:block ${rtl ? "-translate-x-10" : "translate-x-10"} translate-y-6`}>
            <div style={{ padding: 10, borderRadius: 20, background: "#fff", border: `1px solid ${C.cielMoyen}`, boxShadow: "0 40px 80px -40px rgba(3,105,161,.5)" }}>
              <div style={{ borderRadius: 12, overflow: "hidden" }}><Echelle largeur={1040} hauteur={660}><DashboardMockup langue={lang} /></Echelle></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BANDEAU DE MARQUE */}
      <section style={{ borderTop: `1px solid ${C.bord}` }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center md:px-8">
          <div className="flex items-center gap-3">
            <Logo taille={38} />
            <span style={{ fontFamily: t.titles, fontWeight: 700, fontSize: 19, letterSpacing: rtl ? 0 : "0.06em" }}>{t.brand}</span>
          </div>
          <div style={{ fontSize: 15, color: C.texte }}>{t.brandLine}</div>
        </div>
      </section>
    </div>
  );
}
