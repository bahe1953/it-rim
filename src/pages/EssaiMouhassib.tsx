import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { C, POPPINS, ICONES as I, Icone, Logo } from '../components/mouhassib/theme';
import { MOUHASSIB_AR_DOWNLOAD_URL, MOUHASSIB_FR_DOWNLOAD_URL } from '../config';

// Landing page de conversion Mouhassib (route /essai), bilingue FR / AR, centrée sur la vidéo muette.
// Page autonome : pas d'en-tête ni de pied de site, pour garder l'attention sur l'essai gratuit.

type Langue = 'fr' | 'ar';
const TEL = '22243459222';

const T = {
  fr: {
    badge: 'Logiciel de gestion commerciale',
    titre: ['Votre stock et votre caisse,', 'enfin justes. Chaque jour.'],
    sousTitre: "Mouhassib met à jour le stock, la caisse et les comptes à chaque vente. Vous savez à tout moment ce que vous avez, ce qu'on vous doit et ce que vous gagnez.",
    cta: 'Essayer gratuitement 30 jours',
    whatsapp: 'Démonstration sur WhatsApp',
    msgWhatsapp: 'Bonjour IT-RIM, je souhaite une démonstration de Mouhassib.',
    rassurance: ['Sans carte bancaire', 'Fonctionne sans internet', 'Aide au démarrage offerte'],
    legendeVideo: 'Une vente saisie : le stock, la caisse et les comptes se mettent à jour tout seuls.',
    douleursTitre: 'Vous vous reconnaissez ?',
    douleurs: [
      { d: I.stock, pb: 'Le stock du magasin ne correspond jamais au cahier.', sol: 'Chaque vente et chaque réception mettent le stock à jour, en quantité et en valeur.' },
      { d: I.caisse, pb: 'Le soir, la caisse ne tombe pas juste.', sol: 'Espèces, chèque, Bankily, Masrivi : chaque encaissement est enregistré, le solde se vérifie en un clic.' },
      { d: I.client, pb: 'Des crédits clients oubliés, de l\'argent perdu.', sol: 'Chaque client a son solde et son historique. Vous savez qui vous doit quoi.' },
    ],
    probleme: 'Le problème',
    solution: 'Avec Mouhassib',
    etapesTitre: 'Démarrez en 3 étapes',
    etapes: [
      { t: 'Téléchargez', x: "Installez Mouhassib sur votre ordinateur Windows. L'essai démarre tout de suite." },
      { t: 'Saisissez vos articles', x: 'Vos produits, vos prix, votre stock de départ. Nous vous aidons sur WhatsApp.' },
      { t: 'Vendez', x: 'Chaque facture met à jour le stock, la caisse et les comptes. Sans double saisie.' },
    ],
    resultatsTitre: 'Ce qui change dès la première semaine',
    resultats: ['Un stock auquel vous pouvez vous fier', 'Une caisse qui tombe juste', 'Vos crédits clients sous contrôle', 'Des chiffres clairs pour décider'],
    garantieSurtitre: 'NOTRE GARANTIE',
    garantieTitre: 'Vous jugez sur résultat.',
    garantieTexte: "Utilisez Mouhassib pendant 30 jours, gratuitement. Si vous ne voyez pas la différence dans votre stock et votre caisse, vous ne payez rien. Vos données restent sur votre ordinateur.",
    garantiePoints: ['30 jours gratuits, sans engagement', 'Aide au démarrage par WhatsApp', 'Vos données restent chez vous'],
    faqTitre: 'Questions fréquentes',
    faq: [
      ['Faut-il une connexion internet ?', 'Non. Mouhassib fonctionne entièrement hors ligne, sur votre ordinateur.'],
      ['Est-ce en arabe ou en français ?', 'Les deux : Mouhassib existe en version arabe et en version française.'],
      ['Que se passe-t-il après 30 jours ?', "Vous nous contactez sur WhatsApp pour recevoir votre code d'activation. Toutes vos données sont conservées."],
      ['Combien ça coûte ?', "Le tarif dépend de votre activité et du nombre de postes. Demandez-le sur WhatsApp, la réponse est rapide."],
      ['Puis-je avoir plusieurs caisses ?', 'Oui, plusieurs postes peuvent être reliés sur votre réseau local.'],
    ],
    finalTitre: 'Commencez aujourd\'hui. Jugez dans 30 jours.',
    finalTexte: 'Téléchargez l\'essai gratuit, ou demandez-nous une démonstration sur vos propres produits.',
    marque: 'Solution professionnelle de gestion commerciale · IT-RIM',
    autreLangue: 'عربي',
  },
  ar: {
    badge: 'برنامج التسيير التجاري',
    titre: ['مخزونك وصندوقك', 'مضبوطان… كل يوم.'],
    sousTitre: 'محاسب يحدّث المخزون والصندوق والحسابات مع كل عملية بيع. تعرف في كل لحظة ما تملكه، وما لك عند الزبائن، وكم تربح.',
    cta: 'جرّب مجانا لمدة 30 يوما',
    whatsapp: 'عرض توضيحي على واتساب',
    msgWhatsapp: 'السلام عليكم IT-RIM، أريد عرضا توضيحيا لبرنامج محاسب.',
    rassurance: ['بدون بطاقة بنكية', 'يعمل بدون إنترنت', 'مساعدة مجانية في البداية'],
    legendeVideo: 'عملية بيع واحدة: المخزون والصندوق والحسابات تتحدّث تلقائيا.',
    douleursTitre: 'هل تعيش هذه المشاكل؟',
    douleurs: [
      { d: I.stock, pb: 'مخزون المحل لا يطابق الدفتر أبدا.', sol: 'كل بيع وكل استلام يحدّث المخزون كمّيةً وقيمةً.' },
      { d: I.caisse, pb: 'في المساء، الصندوق لا يطابق.', sol: 'نقدا، شيك، بنكيلي، مصرفي: كل مبلغ مسجّل، والرصيد يُراجَع بنقرة.' },
      { d: I.client, pb: 'ديون زبائن منسية، وأموال ضائعة.', sol: 'لكل زبون رصيده وسجله. تعرف من يدين لك وبكم.' },
    ],
    probleme: 'المشكلة',
    solution: 'مع محاسب',
    etapesTitre: 'ابدأ في 3 خطوات',
    etapes: [
      { t: 'حمّل البرنامج', x: 'ثبّت محاسب على حاسوبك (ويندوز). تبدأ التجربة فورا.' },
      { t: 'أدخل سلعك', x: 'منتجاتك وأسعارك ومخزونك الأولي. نساعدك على واتساب.' },
      { t: 'بِع', x: 'كل فاتورة تحدّث المخزون والصندوق والحسابات، بدون إدخال مكرر.' },
    ],
    resultatsTitre: 'ما يتغيّر من الأسبوع الأول',
    resultats: ['مخزون يمكنك الوثوق به', 'صندوق يطابق كل مساء', 'ديون الزبائن تحت السيطرة', 'أرقام واضحة لاتخاذ القرار'],
    garantieSurtitre: 'ضماننا',
    garantieTitre: 'احكم بالنتيجة.',
    garantieTexte: 'استعمل محاسب 30 يوما مجانا. إذا لم ترَ الفرق في مخزونك وصندوقك، فلن تدفع شيئا. بياناتك تبقى على حاسوبك.',
    garantiePoints: ['30 يوما مجانا بدون التزام', 'مساعدة في البداية على واتساب', 'بياناتك تبقى عندك'],
    faqTitre: 'أسئلة متكررة',
    faq: [
      ['هل أحتاج إلى الإنترنت؟', 'لا. محاسب يعمل بالكامل بدون إنترنت، على حاسوبك.'],
      ['هل البرنامج بالعربية أم بالفرنسية؟', 'الاثنان: محاسب متوفر بنسخة عربية ونسخة فرنسية.'],
      ['ماذا يحدث بعد 30 يوما؟', 'تتصل بنا على واتساب لتحصل على رمز التفعيل. كل بياناتك محفوظة.'],
      ['كم السعر؟', 'السعر حسب نشاطك وعدد الأجهزة. اسألنا على واتساب، الرد سريع.'],
      ['هل يمكن استعمال عدة صناديق؟', 'نعم، يمكن ربط عدة أجهزة على شبكتك المحلية.'],
    ],
    finalTitre: 'ابدأ اليوم… واحكم بعد 30 يوما.',
    finalTexte: 'حمّل التجربة المجانية، أو اطلب عرضا توضيحيا على سلعك أنت.',
    marque: 'حل احترافي للتسيير التجاري · IT-RIM',
    autreLangue: 'Français',
  },
};

const apparition = {
  // Glissement seul (pas d'opacité 0) : le contenu reste lisible même si l'animation ne se déclenche pas.
  initial: { y: 24 },
  whileInView: { y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] },
};

function Titre2({ children, police }: { children: ReactNode; police: string }) {
  return <h2 className="text-3xl md:text-[42px] leading-tight text-center" style={{ margin: 0, fontFamily: police, fontWeight: 700, color: C.encre }}>{children}</h2>;
}

function langueInitiale(): Langue {
  if (typeof window === 'undefined') return 'fr';
  return new URLSearchParams(window.location.search).get('lang') === 'ar' ? 'ar' : 'fr';
}

export default function EssaiMouhassib() {
  const [langue, setLangue] = useState<Langue>(langueInitiale);
  const t = T[langue];
  const ar = langue === 'ar';
  const police = ar ? 'Cairo, system-ui, sans-serif' : POPPINS;
  const policeTexte = ar ? 'Cairo, system-ui, sans-serif' : 'Inter, system-ui, sans-serif';
  const lienWhatsapp = `https://wa.me/${TEL}?text=${encodeURIComponent(t.msgWhatsapp)}`;

  useEffect(() => {
    document.title = ar ? 'محاسب — جرّب مجانا 30 يوما' : 'Mouhassib — Essai gratuit 30 jours';
  }, [ar]);

  const changerLangue = () => {
    const l: Langue = ar ? 'fr' : 'ar';
    setLangue(l);
    const u = new URL(window.location.href);
    if (l === 'ar') u.searchParams.set('lang', 'ar'); else u.searchParams.delete('lang');
    window.history.replaceState(null, '', u.toString());
  };

  const telecharger = () => {
    fetch('/api/download-request', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ produit: ar ? 'mouhassib-ar' : 'mouhassib-fr' }),
    }).catch(() => {});
    window.location.href = ar ? MOUHASSIB_AR_DOWNLOAD_URL : MOUHASSIB_FR_DOWNLOAD_URL;
  };

  const survol = { whileHover: { y: -2, boxShadow: '0 16px 30px -14px rgba(3,105,161,.65)' }, whileTap: { scale: 0.98 }, transition: { duration: 0.2 } };

  const BoutonEssai = ({ grand = false }: { grand?: boolean }) => (
    <motion.button {...survol} type="button" onClick={telecharger}
      className={`${grand ? 'px-8 py-[18px] text-lg' : 'px-7 py-4'} rounded-xl font-bold flex items-center justify-center gap-2.5`}
      style={{ background: C.primaire, color: '#fff', border: 'none', cursor: 'pointer', fontFamily: policeTexte }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M4 20h16" /></svg>
      {t.cta}
    </motion.button>
  );
  const BoutonWhatsapp = () => (
    <motion.a {...survol} href={lienWhatsapp} target="_blank" rel="noopener noreferrer"
      className="px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2.5"
      style={{ background: '#fff', border: `1px solid ${C.cielMoyen}`, color: C.encre }}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.1.1.6-.1 1.2z" /></svg>
      {t.whatsapp}
    </motion.a>
  );

  return (
    <div dir={ar ? 'rtl' : 'ltr'} lang={langue} style={{ background: '#fff', color: C.encre, fontFamily: policeTexte }} className="pb-24 md:pb-0">
      {/* BARRE DU HAUT */}
      <header className="sticky top-0 z-40" style={{ background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${C.bord}` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Logo taille={34} />
            <span style={{ fontFamily: police, fontWeight: 700, fontSize: 18, letterSpacing: ar ? 0 : '0.06em' }}>{ar ? 'محاسب' : 'MOUHASSIB'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={changerLangue} className="px-3.5 py-2 rounded-lg text-sm font-semibold"
              style={{ background: C.ciel, color: C.primaire, border: 'none', cursor: 'pointer', fontFamily: ar ? 'Inter, sans-serif' : 'Cairo, sans-serif' }}>
              {t.autreLangue}
            </button>
            <a href={lienWhatsapp} target="_blank" rel="noopener noreferrer" className="hidden sm:flex px-3.5 py-2 rounded-lg text-sm font-semibold" style={{ background: C.primaire, color: '#fff' }}>WhatsApp</a>
          </div>
        </div>
      </header>

      {/* HÉROS + VIDÉO */}
      <section style={{ background: `linear-gradient(180deg, ${C.cielClair} 0%, #fff 75%)` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-10 md:pt-16 pb-14 md:pb-20 flex flex-col items-center text-center gap-6">
          <motion.div {...apparition} className="flex items-center gap-2.5 px-3.5 py-2 rounded-full text-[13px] font-medium" style={{ background: '#fff', border: `1px solid ${C.bord}`, color: C.texte }}>
            <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.4, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: C.or }} />
            {t.badge}
          </motion.div>
          <motion.h1 {...apparition} className="text-[34px] sm:text-5xl lg:text-[60px] max-w-4xl" style={{ margin: 0, fontFamily: police, fontWeight: 700, lineHeight: ar ? 1.3 : 1.08, letterSpacing: ar ? 0 : '-0.02em' }}>
            {t.titre[0]}<br /><span style={{ color: C.primaire, borderBottom: `5px solid ${C.or}` }}>{t.titre[1]}</span>
          </motion.h1>
          <motion.p {...apparition} className="text-lg md:text-xl max-w-2xl" style={{ margin: 0, lineHeight: 1.65, color: C.texte }}>{t.sousTitre}</motion.p>
          <motion.div {...apparition} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"><BoutonEssai grand /><BoutonWhatsapp /></motion.div>
          <motion.div {...apparition} className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" style={{ color: C.texte }}>
            {t.rassurance.map((r) => <div key={r} className="flex items-center gap-1.5"><Icone d={I.coche} taille={17} epaisseur={2.4} couleur={C.vert} />{r}</div>)}
          </motion.div>

          <motion.figure initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.3 }} className="w-full max-w-5xl mt-6" style={{ margin: 0 }}>
            <div style={{ padding: 10, borderRadius: 22, background: '#fff', border: `1px solid ${C.cielMoyen}`, boxShadow: '0 60px 120px -50px rgba(3,105,161,.5)' }}>
              <video key={langue} src={`/videos/mouhassib-demo-${langue}.mp4`} poster={`/videos/mouhassib-demo-${langue}.jpg`}
                autoPlay muted loop playsInline preload="auto" aria-label={t.legendeVideo}
                style={{ width: '100%', display: 'block', borderRadius: 14, aspectRatio: '16 / 9', background: C.cielClair }} />
            </div>
            <figcaption className="mt-4 text-sm md:text-base" style={{ color: C.discret }}>{t.legendeVideo}</figcaption>
          </motion.figure>
        </div>
      </section>

      {/* DOULEURS → SOLUTIONS */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col gap-10">
        <motion.div {...apparition}><Titre2 police={police}>{t.douleursTitre}</Titre2></motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {t.douleurs.map((x, k) => (
            <motion.div key={x.pb} {...apparition} transition={{ ...apparition.transition, delay: k * 0.08 }} className="rounded-2xl overflow-hidden flex flex-col" style={{ border: `1px solid ${C.bord}` }}>
              <div className="p-6 flex flex-col gap-3" style={{ background: '#FFF7F5' }}>
                <div className="text-xs font-bold" style={{ color: C.rouge, letterSpacing: ar ? 0 : '0.1em' }}>{ar ? t.probleme : t.probleme.toUpperCase()}</div>
                <div style={{ fontFamily: police, fontWeight: 600, fontSize: 19, lineHeight: 1.4 }}>{x.pb}</div>
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1" style={{ background: '#fff' }}>
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: C.vert, letterSpacing: ar ? 0 : '0.1em' }}>
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.ciel, color: C.primaire }}><Icone d={x.d} taille={18} /></span>
                  {ar ? t.solution : t.solution.toUpperCase()}
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.6, color: C.texte }}>{x.sol}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3 ÉTAPES */}
      <section style={{ background: C.ciel }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col gap-10">
          <motion.div {...apparition}><Titre2 police={police}>{t.etapesTitre}</Titre2></motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {t.etapes.map((e, k) => (
              <motion.div key={e.t} {...apparition} transition={{ ...apparition.transition, delay: k * 0.1 }} className="p-7 rounded-2xl flex flex-col gap-3" style={{ background: '#fff', border: `1px solid ${C.cielMoyen}` }}>
                <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: C.primaire, color: '#fff', fontFamily: POPPINS, fontWeight: 700, fontSize: 18 }}>{k + 1}</div>
                <div style={{ fontFamily: police, fontWeight: 700, fontSize: 21 }}>{e.t}</div>
                <div style={{ fontSize: 16, lineHeight: 1.6, color: C.texte }}>{e.x}</div>
              </motion.div>
            ))}
          </div>
          <motion.div {...apparition} className="flex justify-center"><BoutonEssai /></motion.div>
        </div>
      </section>

      {/* RÉSULTATS */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col gap-10">
        <motion.div {...apparition}><Titre2 police={police}>{t.resultatsTitre}</Titre2></motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.resultats.map((r, k) => (
            <motion.div key={r} {...apparition} transition={{ ...apparition.transition, delay: k * 0.07 }} className="p-6 rounded-2xl flex flex-col gap-4" style={{ background: C.gris, border: `1px solid ${C.bord}` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#E7F5EF' }}><Icone d={I.coche} taille={20} epaisseur={2.6} couleur={C.vert} /></div>
              <div style={{ fontFamily: police, fontWeight: 600, fontSize: 18, lineHeight: 1.4 }}>{r}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GARANTIE */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-16 md:pb-24">
        <motion.div {...apparition} className="rounded-[28px] p-8 md:p-14 grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center" style={{ background: `linear-gradient(135deg, ${C.orClair} 0%, #fff 100%)`, border: `2px solid ${C.or}` }}>
          <div className="mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full flex flex-col items-center justify-center text-center" style={{ background: '#fff', border: `3px solid ${C.or}`, color: C.orTexte }}>
            <Icone d={I.bouclier} taille={34} epaisseur={1.8} />
            <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 26, lineHeight: 1 }}>30</div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{ar ? 'يوما' : 'JOURS'}</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-[13px] font-bold" style={{ color: C.orTexte, letterSpacing: ar ? 0 : '0.14em' }}>{t.garantieSurtitre}</div>
            <h2 className="text-3xl md:text-[40px]" style={{ margin: 0, fontFamily: police, fontWeight: 700, lineHeight: 1.2 }}>{t.garantieTitre}</h2>
            <p className="text-lg" style={{ margin: 0, lineHeight: 1.65, color: C.texte }}>{t.garantieTexte}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] font-medium">
              {t.garantiePoints.map((g) => <div key={g} className="flex items-center gap-1.5"><Icone d={I.coche} taille={17} epaisseur={2.4} couleur={C.orTexte} />{g}</div>)}
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section style={{ background: C.gris }}>
        <div className="max-w-3xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col gap-8">
          <motion.div {...apparition}><Titre2 police={police}>{t.faqTitre}</Titre2></motion.div>
          <div className="flex flex-col gap-3">
            {t.faq.map(([q, r]) => (
              <details key={q} className="group rounded-xl p-5" style={{ background: '#fff', border: `1px solid ${C.bord}` }}>
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4" style={{ fontFamily: police, fontWeight: 600, fontSize: 17 }}>
                  {q}
                  <span className="shrink-0 transition-transform group-open:rotate-45" style={{ color: C.primaire, fontSize: 24, lineHeight: 1 }}>+</span>
                </summary>
                <p className="mt-3" style={{ marginBottom: 0, lineHeight: 1.65, color: C.texte }}>{r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <motion.div {...apparition} className="rounded-[28px] px-6 py-12 md:p-16 flex flex-col items-center text-center gap-6" style={{ background: `linear-gradient(135deg, ${C.ciel} 0%, ${C.cielMoyen} 100%)`, border: `1px solid ${C.cielMoyen}` }}>
          <div style={{ width: 56, height: 4, borderRadius: 2, background: C.or }} />
          <h2 className="text-3xl md:text-[44px] max-w-3xl" style={{ margin: 0, fontFamily: police, fontWeight: 700, lineHeight: 1.2 }}>{t.finalTitre}</h2>
          <p className="text-lg max-w-2xl" style={{ margin: 0, lineHeight: 1.6, color: C.texte }}>{t.finalTexte}</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"><BoutonEssai grand /><BoutonWhatsapp /></div>
        </motion.div>
      </section>

      {/* MARQUE */}
      <footer style={{ borderTop: `1px solid ${C.bord}` }}>
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm" style={{ color: C.discret }}>
          <div className="flex items-center gap-2.5"><Logo taille={30} /><span>{t.marque}</span></div>
          <a href="/" style={{ color: C.primaire }}>it-rim.net</a>
        </div>
      </footer>

      {/* BARRE D'ACTION MOBILE */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 p-3 flex gap-2" style={{ background: 'rgba(255,255,255,.96)', borderTop: `1px solid ${C.bord}`, boxShadow: '0 -10px 30px -15px rgba(3,105,161,.35)' }}>
        <button type="button" onClick={telecharger} className="flex-1 py-3.5 rounded-xl font-bold text-[15px]" style={{ background: C.primaire, color: '#fff', border: 'none', fontFamily: policeTexte }}>{t.cta}</button>
        <a href={lienWhatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-[52px] rounded-xl flex items-center justify-center" style={{ background: '#25D366' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.1.1.6-.1 1.2z" /></svg>
        </a>
      </div>
    </div>
  );
}
