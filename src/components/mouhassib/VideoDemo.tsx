"use client";
/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps -- composant repris tel quel du site actuel */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Echelle from './Echelle';
import DashboardMockup, { type Langue } from './DashboardMockup';
import { C, POPPINS, ICONES as I, Icone } from './theme';

// Film publicitaire de 60 secondes, joué dans la page (scènes animées dessinées à 1280 × 720), en
// français ou en arabe. Démarre quand il devient visible, ou quand on clique sur « Voir la démonstration ».
// Voix off : fichiers audio enregistrés (prop `audio`, une piste par scène) s'ils existent, sinon la
// synthèse vocale du navigateur. Les navigateurs n'autorisent le son qu'après un clic du visiteur.
const TEMPS = [[0, 8], [8, 17], [17, 27], [27, 37], [37, 46], [46, 53], [53, 60]];

const T = {
  fr: {
    police: 'Inter, system-ui, sans-serif', titres: POPPINS, monnaie: 'MRU', voixLang: 'fr',
    scenes: ['Ouverture', 'Mouhassib', 'Ventes', 'Stock', 'Tiers', 'Caisse', 'Final'],
    labels: ['', '', 'Ventes & facturation', 'Stock & achats', 'Clients & fournisseurs', 'Caisse & comptes', ''],
    voix: [
      'Gérer une entreprise ne devrait pas être compliqué.',
      'Avec Mouhassib, toute votre gestion commerciale est réunie dans un seul logiciel.',
      'Trouvez le client, ajoutez les articles, validez. La facture est prête, le stock et la caisse sont à jour.',
      'Chaque entrée et chaque sortie de stock est suivie, avec la valeur de votre marchandise.',
      "Clients et fournisseurs : l'historique et les soldes, toujours sous les yeux.",
      'Caisse, banque et mobile money : chaque montant est suivi.',
      'Mouhassib. Une gestion plus simple. Un meilleur contrôle.',
    ],
    ui: { activer: 'Activer la voix off', couper: 'Couper la voix off', lire: 'Lire la vidéo', pause: 'Mettre en pause', recommencer: 'Recommencer', sansVoix: 'Aucune voix française sur cet appareil' },
    s1: 'Gérer une entreprise ne devrait pas être compliqué.',
    s2: ['MOUHASSIB', 'Mouhassib centralise votre gestion commerciale.'],
    s3: { titre: 'Nouvelle facture', client: 'Client', saisie: 'Boutique El Am', trouve: 'Boutique El Amane — Tevragh Zeina · solde 0 MRU', lignes: [['Riz 25 kg', 9000, 10], ['Huile 5 L', 6600, 12], ['Sucre 50 kg', 2800, 2]] as [string, number, number][], total: 'Total TTC', valider: 'Valider la vente', valide: 'Vente validée', maj: 'Stock et caisse mis à jour' },
    s4: { titre: 'Articles en stock', info: '412 articles · valeur au coût moyen', noms: ['Riz 25 kg', 'Huile 5 L', 'Sucre 50 kg', 'Thé vert 1 kg'], unite: 'u.', entree: 'réception', sortie: 'vente' },
    s5: [
      { type: 'CLIENT', nom: 'Boutique El Amane', info: 'Tevragh Zeina · client depuis 2024', histo: [['FAC-2026-0185', 18400], ['FAC-2026-0171', 12250], ['FAC-2026-0152', 21900], ['Règlement chèque', -34150]] as [string, number][], soldeLabel: 'Reste à encaisser', solde: 18400 },
      { type: 'FOURNISSEUR', nom: 'Grands Moulins du Sahel', info: 'Farine, riz, sucre · paiement à 30 jours', histo: [['Réception BR-0412', 64250], ['Réception BR-0398', 30000], ['Réception BR-0377', 48700], ['Règlement virement', -48700]] as [string, number][], soldeLabel: 'Reste à payer', solde: 94250 },
    ],
    s6: { titre: 'Mouvements de caisse', mvts: [['Vente TIC-004513 · espèces', 2350], ['Vente FAC-2026-0185 · chèque', 18400], ['Dépense · électricité', -4800], ['Vente TIC-004514 · Bankily', 1120], ['Règlement fournisseur', -30000]] as [string, number][], solde: 'Solde de caisse', concordant: 'Concordant avec la comptabilité', modes: ['Espèces', 'Chèque', 'Bankily', 'Masrivi', 'Virement'] },
    s7: { marque: 'MOUHASSIB', slogan: ['Une gestion plus simple.', 'Un meilleur contrôle.'] },
  },
  ar: {
    police: 'Cairo, system-ui, sans-serif', titres: 'Cairo, system-ui, sans-serif', monnaie: 'أوقية', voixLang: 'ar',
    scenes: ['البداية', 'محاسب', 'المبيعات', 'المخزون', 'الزبائن', 'الصندوق', 'الخاتمة'],
    labels: ['', '', 'المبيعات والفوترة', 'المخزون والمشتريات', 'الزبائن والموردون', 'الصندوق والحسابات', ''],
    voix: [
      'تسيير المؤسسة لا ينبغي أن يكون معقدا.',
      'محاسب… تجارتك كلها بين يديك، في برنامج واحد.',
      'اختر الزبون، أضف السلع، ثم أكّد. الفاتورة جاهزة، والمخزون والصندوق محدّثان.',
      'كل دخول وكل خروج من المخزون متابَع، مع قيمة بضاعتك.',
      'الزبائن والموردون: السجل والأرصدة دائما أمام عينيك.',
      'الصندوق والبنك والدفع عبر الهاتف: كل مبلغ متابَع.',
      'محاسب. تسيير أبسط. تحكم أفضل.',
    ],
    ui: { activer: 'تشغيل التعليق الصوتي', couper: 'إيقاف التعليق الصوتي', lire: 'تشغيل الفيديو', pause: 'إيقاف مؤقت', recommencer: 'إعادة من البداية', sansVoix: 'لا يوجد صوت عربي على هذا الجهاز' },
    s1: 'تسيير المؤسسة لا ينبغي أن يكون معقدا.',
    s2: ['محاسب', 'تجارتك كلها بين يديك، في برنامج واحد.'],
    s3: { titre: 'فاتورة جديدة', client: 'الزبون', saisie: 'بوتيك الأما', trouve: 'بوتيك الأمانة — تفرغ زينة · الرصيد 0 أوقية', lignes: [['أرز 25 كغ', 9000, 10], ['زيت 5 لتر', 6600, 12], ['سكر 50 كغ', 2800, 2]] as [string, number, number][], total: 'المجموع', valider: 'تأكيد البيع', valide: 'تم تأكيد البيع', maj: 'تم تحديث المخزون والصندوق' },
    s4: { titre: 'الأصناف في المخزون', info: '412 صنفا · القيمة بالتكلفة المتوسطة', noms: ['أرز 25 كغ', 'زيت 5 لتر', 'سكر 50 كغ', 'شاي أخضر 1 كغ'], unite: 'وحدة', entree: 'استلام', sortie: 'بيع' },
    s5: [
      { type: 'زبون', nom: 'بوتيك الأمانة', info: 'تفرغ زينة · زبون منذ 2024', histo: [['FAC-2026-0185', 18400], ['FAC-2026-0171', 12250], ['FAC-2026-0152', 21900], ['تسديد بشيك', -34150]] as [string, number][], soldeLabel: 'المتبقي للتحصيل', solde: 18400 },
      { type: 'مورد', nom: 'مطاحن الساحل الكبرى', info: 'دقيق، أرز، سكر · الدفع بعد 30 يوما', histo: [['استلام BR-0412', 64250], ['استلام BR-0398', 30000], ['استلام BR-0377', 48700], ['تسديد بتحويل', -48700]] as [string, number][], soldeLabel: 'المتبقي للدفع', solde: 94250 },
    ],
    s6: { titre: 'حركات الصندوق', mvts: [['بيع TIC-004513 · نقدا', 2350], ['بيع FAC-2026-0185 · شيك', 18400], ['مصروف · كهرباء', -4800], ['بيع TIC-004514 · بنكيلي', 1120], ['تسديد مورد', -30000]] as [string, number][], solde: 'رصيد الصندوق', concordant: 'مطابق للمحاسبة', modes: ['نقدا', 'شيك', 'بنكيلي', 'مصرفي', 'تحويل'] },
    s7: { marque: 'محاسب', slogan: ['تسيير أبسط.', 'تحكم أفضل.'] },
  },
};
type Textes = typeof T.fr;

const syntheseDispo = typeof window !== 'undefined' && 'speechSynthesis' in window;
function trouverVoix(lang: string): SpeechSynthesisVoice | undefined {
  const voix = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith(lang));
  return voix.find((v) => /google|natural|online|denise|henri|julie|hoda|naayf|zariyah|hamed/i.test(v.name)) || voix[0];
}

const carte = { background: '#fff', border: `1px solid ${C.bord}`, borderRadius: 18, boxShadow: '0 40px 80px -40px rgba(3,105,161,.35)', boxSizing: 'border-box' as const };
const EASE = [0.2, 0.7, 0.2, 1] as [number, number, number, number];
const entree = { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE } };
const pop = { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, ease: EASE } };
const icoSon = 'M11 5L6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14';
const icoMuet = 'M11 5L6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6';

// `enregistrement` : image seule (sans boutons ni barre de lecture), pour produire un fichier vidéo.
export default function VideoDemo({ demande = 0, langue = 'fr', audio, enregistrement = false }: { demande?: number; langue?: Langue; audio?: string[]; enregistrement?: boolean }) {
  const L = T[langue];
  const rtl = langue === 'ar';
  const [t, setT] = useState(0);
  const [lecture, setLecture] = useState(false);
  const [voix, setVoix] = useState(false);
  const [sansVoix, setSansVoix] = useState(false);
  const boite = useRef<HTMLDivElement>(null);
  const dejaVu = useRef(false);
  const piste = useRef<HTMLAudioElement | null>(null);
  const [client, setClient] = useState(false);
  useEffect(() => setClient(true), []);
  const sonDispo = !!audio || (client && syntheseDispo);

  useEffect(() => {
    if (!lecture) return;
    const id = window.setInterval(() => setT((v) => (v + 0.1 >= 60 ? 0 : v + 0.1)), 100);
    return () => window.clearInterval(id);
  }, [lecture]);

  // Lecture automatique (muette) la première fois que le film apparaît ; pause quand il sort de l'écran.
  useEffect(() => {
    const el = boite.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !dejaVu.current) { dejaVu.current = true; setLecture(true); }
      if (!e.isIntersecting) setLecture(false);
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => { if (demande > 0) { setT(0); setLecture(true); setVoix(sonDispo); dejaVu.current = true; } }, [demande, sonDispo]);

  const i = Math.max(0, TEMPS.findIndex(([d, f]) => t >= d && t < f));
  const lt = t - TEMPS[i][0];

  const couper = () => {
    if (piste.current) { piste.current.pause(); piste.current = null; }
    if (syntheseDispo) window.speechSynthesis.cancel();
  };
  // Une phrase au début de chaque scène ; silence dès que la vidéo est en pause ou la voix coupée.
  useEffect(() => {
    couper();
    if (!voix || !lecture) return;
    if (audio && audio[i]) {
      const a = new Audio(audio[i]);
      piste.current = a;
      a.play().catch(() => {});
      return;
    }
    if (!syntheseDispo) return;
    const v = trouverVoix(L.voixLang);
    if (!v) { setSansVoix(true); return; }
    const u = new SpeechSynthesisUtterance(L.voix[i]);
    u.voice = v;
    u.lang = v.lang;
    u.rate = 0.98;
    window.speechSynthesis.speak(u);
  }, [i, voix, lecture, langue]);
  useEffect(() => () => couper(), []);
  useEffect(() => { if (syntheseDispo) window.speechSynthesis.getVoices(); }, []);

  const activerVoix = () => { setSansVoix(false); setVoix(true); setLecture(true); };

  return (
    <div ref={boite} dir={rtl ? 'rtl' : 'ltr'} style={enregistrement ? { position: 'relative', overflow: 'hidden', fontFamily: L.police } : { position: 'relative', borderRadius: 24, overflow: 'hidden', border: `1px solid ${C.bord}`, background: '#fff', boxShadow: '0 50px 100px -50px rgba(3,105,161,.45)', fontFamily: L.police }}>
      {sonDispo && !voix && !enregistrement && (
        <button type="button" onClick={activerVoix} style={{ position: 'absolute', top: 14, insetInlineEnd: 14, zIndex: 2, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 999, border: 'none', background: C.primaire, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 24px -10px rgba(3,105,161,.7)', fontFamily: L.police }}>
          <Icone d={icoSon} taille={18} epaisseur={2} />{L.ui.activer}
        </button>
      )}
      {voix && sansVoix && (
        <div style={{ position: 'absolute', top: 14, insetInlineEnd: 14, zIndex: 2, padding: '8px 14px', borderRadius: 999, background: '#fff', border: `1px solid ${C.bord}`, color: C.texte, fontSize: 13 }}>{L.ui.sansVoix}</div>
      )}
      <div dir="ltr">
        <Echelle largeur={1280} hauteur={720}>
          <div dir={rtl ? 'rtl' : 'ltr'} style={{ width: 1280, height: 720, position: 'relative', overflow: 'hidden', background: C.cielClair, fontFamily: L.police, color: C.encre }}>
            {/* Pas d'attente de fin d'animation entre deux scènes (plus robuste) : la nouvelle scène apparaît en fondu. */}
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} style={{ position: 'absolute', inset: 0 }}>
                {i === 0 && <Scene1 L={L} rtl={rtl} />}
                {i === 1 && <Scene2 L={L} langue={langue} />}
                {i === 2 && <Scene3 L={L} lt={lt} />}
                {i === 3 && <Scene4 L={L} lt={lt} />}
                {i === 4 && <Scene5 L={L} />}
                {i === 5 && <Scene6 L={L} lt={lt} />}
                {i === 6 && <Scene7 L={L} langue={langue} />}
              </motion.div>
            {L.labels[i] && (
              <motion.div key={'l' + i} {...entree} style={{ position: 'absolute', insetInlineStart: 48, bottom: 40, padding: '12px 20px', borderRadius: 12, background: C.primaire, color: '#fff', fontFamily: L.titres, fontWeight: 700, fontSize: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F5D078' }} />{L.labels[i]}
              </motion.div>
            )}
          </div>
        </Echelle>
      </div>

      {!enregistrement && <div style={{ padding: '14px 18px', background: C.ciel, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 4, height: 6 }}>
          {TEMPS.map(([d, f]) => (
            <div key={d} style={{ flexGrow: f - d, height: 6, borderRadius: 3, background: C.cielMoyen, overflow: 'hidden' }}>
              <div style={{ height: 6, background: C.primaire, width: `${t >= f ? 100 : t <= d ? 0 : ((t - d) / (f - d)) * 100}%` }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" aria-label={lecture ? L.ui.pause : L.ui.lire} onClick={() => setLecture(!lecture)} style={{ width: 46, height: 46, borderRadius: '50%', border: 'none', background: C.primaire, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ transform: rtl && !lecture ? 'scaleX(-1)' : undefined }}><path d={lecture ? 'M6 4h4v16H6zM14 4h4v16h-4z' : 'M7 4l13 8-13 8z'} /></svg>
          </button>
          <button type="button" aria-label={L.ui.recommencer} onClick={() => { setT(0); setLecture(true); }} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${C.cielMoyen}`, background: '#fff', color: C.primaire, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icone d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" taille={18} epaisseur={2} />
          </button>
          {sonDispo && (
            <button type="button" aria-label={voix ? L.ui.couper : L.ui.activer} aria-pressed={voix} onClick={() => (voix ? setVoix(false) : activerVoix())} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${C.cielMoyen}`, background: voix ? C.primaire : '#fff', color: voix ? '#fff' : C.primaire, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Icone d={voix ? icoSon : icoMuet} taille={18} epaisseur={2} />
            </button>
          )}
          <div dir="ltr" style={{ fontSize: 14, color: C.encre, width: 84, fontVariantNumeric: 'tabular-nums', fontFamily: 'Inter, system-ui, sans-serif' }}>0:{String(Math.floor(t)).padStart(2, '0')} / 1:00</div>
          <div className="hidden md:flex" style={{ flexGrow: 1, gap: 6, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            {L.scenes.map((nom, j) => (
              <button type="button" key={nom} onClick={() => { setT(TEMPS[j][0] + 0.01); setLecture(true); }} style={{ height: 40, padding: '0 12px', borderRadius: 8, border: 'none', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: L.police, background: j === i ? C.primaire : '#fff', color: j === i ? '#fff' : C.encre }}>{nom}</button>
            ))}
          </div>
        </div>
      </div>}
    </div>
  );
}

const montant = (n: number, L: Textes) => (n < 0 ? '− ' : '') + Math.round(Math.abs(n)).toLocaleString('fr-FR') + ' ' + L.monnaie;

function Scene1({ L, rtl }: { L: Textes; rtl: boolean }) {
  const papier = (left: number, top: number, w: number, h: number, r: number, delai: number) => (
    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, delay: delai }} style={{ position: 'absolute', left, top, width: w, height: h, borderRadius: 4, background: '#fff', border: `1px solid ${C.bord}`, rotate: r, boxShadow: '0 10px 20px -12px rgba(15,42,61,.25)' }} />
  );
  return (
    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${C.ciel} 0%, ${C.cielClair} 100%)` }}>
      <motion.div initial={{ scale: 1 }} animate={{ scale: 1.07 }} transition={{ duration: 9, ease: 'easeOut' }} style={{ position: 'absolute', inset: 0 }}>
       <div style={{ position: 'absolute', inset: 0, transform: rtl ? 'scaleX(-1)' : undefined }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 520, height: 200, background: '#D5E6F1' }} />
        <div style={{ position: 'absolute', left: 600, top: 190, width: 420, height: 270, borderRadius: 14, background: '#fff', border: '10px solid #CBD5E1', boxSizing: 'border-box', padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[70, 90, 55, 80, 62, 85].map((w, k) => <div key={k} style={{ height: 10, width: `${w}%`, borderRadius: 4, background: k === 4 ? '#F2B8AE' : '#E2E8F0' }} />)}
        </div>
        <div style={{ position: 'absolute', left: 780, top: 460, width: 60, height: 60, background: '#CBD5E1' }} />
        <div style={{ position: 'absolute', left: 730, top: 405, width: 170, height: 170, borderRadius: '50%', background: '#8FA9BD' }} />
        <div style={{ position: 'absolute', left: 640, top: 520, width: 350, height: 240, borderRadius: '120px 120px 0 0', background: '#8FA9BD' }} />
        {papier(1050, 470, 120, 150, -8, 0)}
        {papier(470, 500, 110, 140, 6, 0.8)}
        {papier(1120, 420, 90, 120, 14, 1.6)}
       </div>
      </motion.div>
      <motion.div {...entree} transition={{ ...entree.transition, delay: 0.6 }} style={{ position: 'absolute', insetInlineStart: 80, top: 230, width: 540, fontFamily: L.titres, fontWeight: 700, fontSize: 52, lineHeight: 1.2, color: C.encre }}>
        {L.s1}
      </motion.div>
    </div>
  );
}

function Scene2({ L, langue }: { L: Textes; langue: Langue }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 28, boxSizing: 'border-box', background: '#fff' }}>
      <motion.div {...entree} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: langue === 'fr' ? '0.16em' : 0, color: C.orTexte }}>{L.s2[0]}</div>
        <div style={{ fontFamily: L.titres, fontWeight: 700, fontSize: 40, marginTop: 8 }}>{L.s2[1]}</div>
      </motion.div>
      <motion.div {...pop} transition={{ ...pop.transition, delay: 0.4 }} style={{ padding: 10, borderRadius: 20, background: C.ciel, border: `1px solid ${C.cielMoyen}` }}>
        <div dir="ltr" style={{ width: 811, height: 515, overflow: 'hidden', borderRadius: 12 }}>
          <div style={{ transform: 'scale(0.78)', transformOrigin: 'top left' }}><DashboardMockup langue={langue} /></div>
        </div>
      </motion.div>
    </div>
  );
}

function Scene3({ L, lt }: { L: Textes; lt: number }) {
  const S = L.s3;
  const saisie = S.saisie.slice(0, Math.max(0, Math.floor((lt - 0.6) * 6)));
  const nb = lt < 3.4 ? 0 : Math.min(3, Math.floor((lt - 3.4) / 0.9) + 1);
  const lignes = S.lignes.slice(0, nb);
  const valide = lt >= 7;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.cielClair }}>
      <motion.div {...pop} style={{ ...carte, width: 760, height: 560, padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: L.titres, fontWeight: 700, fontSize: 24 }}>{S.titre}</div>
          <div dir="ltr" style={{ fontSize: 14, color: C.discret }}>FAC-2026-0185</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 13, color: C.discret, fontWeight: 500 }}>{S.client}</div>
          <div style={{ height: 48, boxSizing: 'border-box', borderRadius: 10, border: `2px solid ${C.primaire}`, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 17 }}>
            <Icone d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" taille={18} couleur={C.discret} epaisseur={2} />
            <span>{saisie}</span><span style={{ width: 2, height: 22, background: C.primaire }} />
          </div>
          {lt >= 2.8 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ borderRadius: 10, background: C.ciel, padding: '10px 16px', fontSize: 15, color: C.primaireFonce, fontWeight: 600 }}>{S.trouve}</motion.div>}
        </div>
        <div style={{ borderTop: '1px solid #EEF3F7' }}>
          {lignes.map(([article, v, q]) => (
            <motion.div key={article} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 4px', borderBottom: '1px solid #EEF3F7', fontSize: 16 }}>
              <span>{article}</span><span dir="ltr" style={{ color: C.discret }}>× {q}</span><span dir="ltr" style={{ fontWeight: 600 }}>{montant(v, L)}</span>
            </motion.div>
          ))}
        </div>
        <div style={{ flexGrow: 1 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, color: C.discret }}>{S.total}</div>
            <div dir="ltr" style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 28 }}>{montant(lignes.reduce((s, l) => s + l[1], 0), L)}</div>
          </div>
          <div style={{ padding: '15px 26px', borderRadius: 12, background: valide ? C.vert : C.primaire, color: '#fff', fontWeight: 700, fontSize: 17 }}>{valide ? S.valide : S.valider}</div>
        </div>
      </motion.div>
      {valide && (
        <motion.div {...pop} style={{ ...carte, position: 'absolute', insetInlineEnd: 90, top: 110, width: 300, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: C.vert, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icone d={I.coche} taille={22} epaisseur={2.4} /></div>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>{S.valide}</div><div style={{ fontSize: 13, color: C.discret }}>{S.maj}</div></div>
        </motion.div>
      )}
    </div>
  );
}

function Scene4({ L, lt }: { L: Textes; lt: number }) {
  const S = L.s4;
  const k = Math.min(1, lt / 5);
  const base = [[98, 50], [84, -12], [40, -2], [12, 60]];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.cielClair }}>
      <motion.div {...pop} style={{ ...carte, width: 900, padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12 }}>
          <div style={{ fontFamily: L.titres, fontWeight: 700, fontSize: 24 }}>{S.titre}</div>
          <div style={{ fontSize: 14, color: C.discret }}>{S.info}</div>
        </div>
        {S.noms.map((nom, j) => {
          const [b, delta] = base[j];
          const q = Math.round(b + delta * k);
          return (
            <div key={nom} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0', borderTop: '1px solid #EEF3F7' }}>
              <div style={{ width: 220, fontSize: 16, fontWeight: 600 }}>{nom}</div>
              <div style={{ flexGrow: 1, height: 10, borderRadius: 6, background: '#EEF3F7', overflow: 'hidden' }}><div style={{ height: 10, width: `${(q / 200) * 100}%`, background: q < 30 ? C.or : C.cielVif }} /></div>
              <div style={{ width: 120, textAlign: 'end', fontFamily: L.titres, fontWeight: 700, fontSize: 18 }}>{q} {S.unite}</div>
              <div style={{ width: 170, textAlign: 'end', fontSize: 14, fontWeight: 600, color: delta > 0 ? C.vert : C.rouge }}>{lt > 1.2 ? `${delta > 0 ? '+' : '−'} ${Math.abs(delta)} ${delta > 0 ? S.entree : S.sortie}` : ''}</div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function Scene5({ L }: { L: Textes }) {
  const couleurs = [{ fond: C.orClair, couleur: C.orTexte }, { fond: C.ciel, couleur: C.primaireFonce }];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, background: C.cielClair }}>
      {L.s5.map((f, j) => (
        <motion.div key={f.nom} {...pop} transition={{ ...pop.transition, delay: j * 0.3 }} style={{ ...carte, width: 450, height: 470, padding: 30, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: L === T.fr ? '0.12em' : 0, color: C.orTexte }}>{f.type}</div>
          <div style={{ fontFamily: L.titres, fontWeight: 700, fontSize: 24 }}>{f.nom}</div>
          <div style={{ fontSize: 14, color: C.discret }}>{f.info}</div>
          <div>
            {f.histo.map(([ref, m]) => <div key={ref} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #EEF3F7', fontSize: 15 }}><span>{ref}</span><span dir="ltr" style={{ fontWeight: 600 }}>{montant(m, L)}</span></div>)}
          </div>
          <div style={{ flexGrow: 1 }} />
          <div style={{ borderRadius: 12, background: couleurs[j].fond, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: C.texte }}>{f.soldeLabel}</span>
            <span dir="ltr" style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 20, color: couleurs[j].couleur }}>{montant(f.solde, L)}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Scene6({ L, lt }: { L: Textes; lt: number }) {
  const S = L.s6;
  const nb = Math.min(5, Math.floor(lt / 0.8) + 1);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, background: C.cielClair }}>
      <motion.div {...pop} style={{ ...carte, width: 560, height: 500, padding: 30, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontFamily: L.titres, fontWeight: 700, fontSize: 24, paddingBottom: 8 }}>{S.titre}</div>
        {S.mvts.slice(0, nb).map(([libelle, m]) => (
          <motion.div key={libelle} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #EEF3F7', fontSize: 15 }}>
            <span>{libelle}</span><span dir="ltr" style={{ fontWeight: 700, color: m > 0 ? C.vert : C.rouge }}>{m > 0 ? '+ ' : ''}{montant(m, L)}</span>
          </motion.div>
        ))}
      </motion.div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <motion.div {...pop} transition={{ ...pop.transition, delay: 0.4 }} style={{ width: 340, boxSizing: 'border-box', borderRadius: 18, background: C.primaire, padding: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 14, color: C.ciel }}>{S.solde}</div>
          <div dir="ltr" style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 34, color: '#fff', textAlign: L === T.ar ? 'right' : 'left' }}>{montant(318760 * Math.min(1, lt / 3), L)}</div>
          <div style={{ fontSize: 13, color: '#F5D078' }}>{S.concordant}</div>
        </motion.div>
        <motion.div {...pop} transition={{ ...pop.transition, delay: 0.8 }} style={{ ...carte, width: 340, padding: 22, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {S.modes.map((m) => <span key={m} style={{ padding: '8px 12px', borderRadius: 8, background: C.ciel, color: C.primaireFonce, fontSize: 14, fontWeight: 600 }}>{m}</span>)}
        </motion.div>
      </div>
    </div>
  );
}

function Scene7({ L, langue }: { L: Textes; langue: Langue }) {
  return (
    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${C.ciel} 0%, #fff 100%)`, display: 'flex', alignItems: 'center', gap: 56, padding: '0 70px', boxSizing: 'border-box' }}>
      <motion.div {...pop} style={{ padding: 8, borderRadius: 16, background: '#fff', border: `1px solid ${C.cielMoyen}`, flexShrink: 0 }}>
        <div dir="ltr" style={{ width: 603, height: 383, overflow: 'hidden', borderRadius: 10 }}>
          <div style={{ transform: 'scale(0.58)', transformOrigin: 'top left' }}><DashboardMockup langue={langue} /></div>
        </div>
      </motion.div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <motion.div {...entree} transition={{ ...entree.transition, delay: 0.4 }} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: C.primaire, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5D078', fontFamily: POPPINS, fontWeight: 700, fontSize: 34 }}>M</div>
          <div style={{ fontFamily: L.titres, fontWeight: 700, fontSize: 44, letterSpacing: langue === 'fr' ? '0.06em' : 0, color: C.encre }}>{L.s7.marque}</div>
        </motion.div>
        <motion.div {...entree} transition={{ ...entree.transition, delay: 0.8 }} style={{ width: 64, height: 4, borderRadius: 2, background: C.or }} />
        <motion.div {...entree} transition={{ ...entree.transition, delay: 1.2 }} style={{ fontFamily: L.titres, fontWeight: 600, fontSize: 30, lineHeight: 1.4, color: C.encre }}>
          {L.s7.slogan[0]}<br />{L.s7.slogan[1]}
        </motion.div>
      </div>
    </div>
  );
}
