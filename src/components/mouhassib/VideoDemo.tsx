import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Echelle from './Echelle';
import DashboardMockup from './DashboardMockup';
import { C, POPPINS, ICONES as I, Icone } from './theme';

// Film publicitaire de 60 secondes, joué dans la page (scènes animées dessinées à 1280 × 720).
// Démarre quand il devient visible, ou quand on clique sur « Voir la démonstration ».
const SCENES = [
  { nom: 'Ouverture', debut: 0, fin: 8, label: '' },
  { nom: 'Mouhassib', debut: 8, fin: 17, label: '' },
  { nom: 'Ventes', debut: 17, fin: 27, label: 'Ventes & facturation' },
  { nom: 'Stock', debut: 27, fin: 37, label: 'Stock & achats' },
  { nom: 'Tiers', debut: 37, fin: 46, label: 'Clients & fournisseurs' },
  { nom: 'Caisse', debut: 46, fin: 53, label: 'Caisse & comptes' },
  { nom: 'Final', debut: 53, fin: 60, label: '' },
];
const mru = (n: number) => Math.round(n).toLocaleString('fr-FR') + ' MRU';
const carte = { background: '#fff', border: `1px solid ${C.bord}`, borderRadius: 18, boxShadow: '0 40px 80px -40px rgba(3,105,161,.35)', boxSizing: 'border-box' as const };
const entree = { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] } };
const pop = { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] } };

export default function VideoDemo({ demande }: { demande: number }) {
  const [t, setT] = useState(0);
  const [lecture, setLecture] = useState(false);
  const boite = useRef<HTMLDivElement>(null);
  const dejaVu = useRef(false);

  useEffect(() => {
    if (!lecture) return;
    const id = window.setInterval(() => setT((v) => (v + 0.1 >= 60 ? 0 : v + 0.1)), 100);
    return () => window.clearInterval(id);
  }, [lecture]);

  // Lecture automatique la première fois que le film apparaît à l'écran ; pause quand il en sort.
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

  useEffect(() => { if (demande > 0) { setT(0); setLecture(true); dejaVu.current = true; } }, [demande]);

  const i = Math.max(0, SCENES.findIndex((s) => t >= s.debut && t < s.fin));
  const lt = t - SCENES[i].debut;

  return (
    <div ref={boite} style={{ borderRadius: 24, overflow: 'hidden', border: `1px solid ${C.bord}`, background: '#fff', boxShadow: '0 50px 100px -50px rgba(3,105,161,.45)' }}>
      <Echelle largeur={1280} hauteur={720}>
        <div style={{ width: 1280, height: 720, position: 'relative', overflow: 'hidden', background: C.cielClair, fontFamily: 'Inter, system-ui, sans-serif', color: C.encre }}>
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} style={{ position: 'absolute', inset: 0 }}>
              {i === 0 && <Scene1 />}
              {i === 1 && <Scene2 />}
              {i === 2 && <Scene3 lt={lt} />}
              {i === 3 && <Scene4 lt={lt} />}
              {i === 4 && <Scene5 />}
              {i === 5 && <Scene6 lt={lt} />}
              {i === 6 && <Scene7 />}
            </motion.div>
          </AnimatePresence>
          {SCENES[i].label && (
            <motion.div key={'l' + i} {...entree} style={{ position: 'absolute', left: 48, bottom: 40, padding: '12px 20px', borderRadius: 12, background: C.primaire, color: '#fff', fontFamily: POPPINS, fontWeight: 600, fontSize: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F5D078' }} />{SCENES[i].label}
            </motion.div>
          )}
        </div>
      </Echelle>

      <div style={{ padding: '14px 18px', background: C.ciel, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 4, height: 6 }}>
          {SCENES.map((s) => (
            <div key={s.nom} style={{ flexGrow: s.fin - s.debut, height: 6, borderRadius: 3, background: C.cielMoyen, overflow: 'hidden' }}>
              <div style={{ height: 6, background: C.primaire, width: `${t >= s.fin ? 100 : t <= s.debut ? 0 : ((t - s.debut) / (s.fin - s.debut)) * 100}%` }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" aria-label={lecture ? 'Mettre en pause' : 'Lire la vidéo'} onClick={() => setLecture(!lecture)} style={{ width: 46, height: 46, borderRadius: '50%', border: 'none', background: C.primaire, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={lecture ? 'M6 4h4v16H6zM14 4h4v16h-4z' : 'M7 4l13 8-13 8z'} /></svg>
          </button>
          <button type="button" aria-label="Recommencer" onClick={() => { setT(0); setLecture(true); }} style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid ${C.cielMoyen}`, background: '#fff', color: C.primaire, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icone d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" taille={18} epaisseur={2} />
          </button>
          <div style={{ fontSize: 14, color: C.encre, width: 84, fontVariantNumeric: 'tabular-nums' }}>0:{String(Math.floor(t)).padStart(2, '0')} / 1:00</div>
          <div className="hidden md:flex" style={{ flexGrow: 1, gap: 6, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            {SCENES.map((s, j) => (
              <button type="button" key={s.nom} onClick={() => { setT(s.debut + 0.01); setLecture(true); }} style={{ height: 40, padding: '0 12px', borderRadius: 8, border: 'none', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', background: j === i ? C.primaire : '#fff', color: j === i ? '#fff' : C.encre }}>{s.nom}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Scene1() {
  const papier = (left: number, top: number, w: number, h: number, r: number, delai: number) => (
    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, delay: delai }} style={{ position: 'absolute', left, top, width: w, height: h, borderRadius: 4, background: '#fff', border: `1px solid ${C.bord}`, rotate: r, boxShadow: '0 10px 20px -12px rgba(15,42,61,.25)' }} />
  );
  return (
    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${C.ciel} 0%, ${C.cielClair} 100%)` }}>
      <motion.div initial={{ scale: 1 }} animate={{ scale: 1.07 }} transition={{ duration: 9, ease: 'easeOut' }} style={{ position: 'absolute', inset: 0 }}>
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
      </motion.div>
      <motion.div {...entree} transition={{ ...entree.transition, delay: 0.6 }} style={{ position: 'absolute', left: 80, top: 230, width: 540, fontFamily: POPPINS, fontWeight: 600, fontSize: 52, lineHeight: 1.15, letterSpacing: '-0.02em', color: C.encre }}>
        Gérer une entreprise ne devrait pas être compliqué.
      </motion.div>
    </div>
  );
}

function Scene2() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40, gap: 28, boxSizing: 'border-box', background: '#fff' }}>
      <motion.div {...entree} style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '0.16em', color: C.orTexte }}>MOUHASSIB</div>
        <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 40, letterSpacing: '-0.02em', marginTop: 8 }}>Mouhassib centralise votre gestion commerciale.</div>
      </motion.div>
      <motion.div {...pop} transition={{ ...pop.transition, delay: 0.4 }} style={{ padding: 10, borderRadius: 20, background: C.ciel, border: `1px solid ${C.cielMoyen}` }}>
        <div style={{ width: 811, height: 515, overflow: 'hidden', borderRadius: 12 }}>
          <div style={{ transform: 'scale(0.78)', transformOrigin: 'top left' }}><DashboardMockup /></div>
        </div>
      </motion.div>
    </div>
  );
}

function Scene3({ lt }: { lt: number }) {
  const saisie = 'Boutique El Am'.slice(0, Math.max(0, Math.floor((lt - 0.6) * 6)));
  const toutes = [['Riz 25 kg', '× 10', 9000], ['Huile 5 L', '× 12', 6600], ['Sucre 50 kg', '× 2', 2800]] as const;
  const nb = lt < 3.4 ? 0 : Math.min(3, Math.floor((lt - 3.4) / 0.9) + 1);
  const lignes = toutes.slice(0, nb);
  const valide = lt >= 7;
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.cielClair }}>
      <motion.div {...pop} style={{ ...carte, width: 760, height: 560, padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 24 }}>Nouvelle facture</div>
          <div style={{ fontSize: 14, color: C.discret }}>FAC-2026-0185</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 13, color: C.discret, fontWeight: 500 }}>Client</div>
          <div style={{ height: 48, boxSizing: 'border-box', borderRadius: 10, border: `2px solid ${C.primaire}`, padding: '0 16px', display: 'flex', alignItems: 'center', gap: 10, fontSize: 17 }}>
            <Icone d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" taille={18} couleur={C.discret} epaisseur={2} />
            <span>{saisie}</span><span style={{ width: 2, height: 22, background: C.primaire }} />
          </div>
          {lt >= 2.8 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ borderRadius: 10, background: C.ciel, padding: '10px 16px', fontSize: 15, color: C.primaireFonce, fontWeight: 600 }}>Boutique El Amane — Tevragh Zeina · solde 0 MRU</motion.div>}
        </div>
        <div style={{ borderTop: '1px solid #EEF3F7' }}>
          {lignes.map(([article, qte, v]) => (
            <motion.div key={article} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 4px', borderBottom: '1px solid #EEF3F7', fontSize: 16 }}>
              <span>{article}</span><span style={{ color: C.discret }}>{qte}</span><span style={{ fontWeight: 600 }}>{mru(v)}</span>
            </motion.div>
          ))}
        </div>
        <div style={{ flexGrow: 1 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 13, color: C.discret }}>Total TTC</div>
            <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 28 }}>{mru(lignes.reduce((s, l) => s + l[2], 0))}</div>
          </div>
          <div style={{ padding: '15px 26px', borderRadius: 12, background: valide ? C.vert : C.primaire, color: '#fff', fontWeight: 700, fontSize: 17 }}>{valide ? 'Vente validée' : 'Valider la vente'}</div>
        </div>
      </motion.div>
      {valide && (
        <motion.div {...pop} style={{ ...carte, position: 'absolute', right: 90, top: 110, width: 300, padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: C.vert, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icone d={I.coche} taille={22} epaisseur={2.4} /></div>
          <div><div style={{ fontWeight: 700, fontSize: 15 }}>Vente validée</div><div style={{ fontSize: 13, color: C.discret }}>Stock et caisse mis à jour</div></div>
        </motion.div>
      )}
    </div>
  );
}

function Scene4({ lt }: { lt: number }) {
  const k = Math.min(1, lt / 5);
  const articles = [
    { nom: 'Riz 25 kg', base: 98, delta: 50, mvt: '+ 50 réception' },
    { nom: 'Huile 5 L', base: 84, delta: -12, mvt: '− 12 vente' },
    { nom: 'Sucre 50 kg', base: 40, delta: -2, mvt: '− 2 vente' },
    { nom: 'Thé vert 1 kg', base: 12, delta: 60, mvt: '+ 60 réception' },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: C.cielClair }}>
      <motion.div {...pop} style={{ ...carte, width: 900, padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12 }}>
          <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 24 }}>Articles en stock</div>
          <div style={{ fontSize: 14, color: C.discret }}>412 articles · valeur au coût moyen</div>
        </div>
        {articles.map((a) => {
          const q = Math.round(a.base + a.delta * k);
          return (
            <div key={a.nom} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0', borderTop: '1px solid #EEF3F7' }}>
              <div style={{ width: 220, fontSize: 16, fontWeight: 600 }}>{a.nom}</div>
              <div style={{ flexGrow: 1, height: 10, borderRadius: 6, background: '#EEF3F7', overflow: 'hidden' }}><div style={{ height: 10, width: `${(q / 200) * 100}%`, background: q < 30 ? C.or : C.cielVif }} /></div>
              <div style={{ width: 110, textAlign: 'right', fontFamily: POPPINS, fontWeight: 600, fontSize: 18 }}>{q} u.</div>
              <div style={{ width: 170, textAlign: 'right', fontSize: 14, fontWeight: 600, color: a.delta > 0 ? C.vert : C.rouge }}>{lt > 1.2 ? a.mvt : ''}</div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function Scene5() {
  const fiches = [
    { type: 'CLIENT', nom: 'Boutique El Amane', info: 'Tevragh Zeina · client depuis 2024', histo: [['FAC-2026-0185', '18 400 MRU'], ['FAC-2026-0171', '12 250 MRU'], ['FAC-2026-0152', '21 900 MRU'], ['Règlement chèque', '− 34 150 MRU']], soldeLabel: 'Reste à encaisser', solde: '18 400 MRU', fond: C.orClair, couleur: C.orTexte },
    { type: 'FOURNISSEUR', nom: 'Grands Moulins du Sahel', info: 'Farine, riz, sucre · paiement à 30 jours', histo: [['Réception BR-0412', '64 250 MRU'], ['Réception BR-0398', '30 000 MRU'], ['Réception BR-0377', '48 700 MRU'], ['Règlement virement', '− 48 700 MRU']], soldeLabel: 'Reste à payer', solde: '94 250 MRU', fond: C.ciel, couleur: C.primaireFonce },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, background: C.cielClair }}>
      {fiches.map((f, j) => (
        <motion.div key={f.nom} {...pop} transition={{ ...pop.transition, delay: j * 0.3 }} style={{ ...carte, width: 450, height: 470, padding: 30, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', color: C.orTexte }}>{f.type}</div>
          <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 24 }}>{f.nom}</div>
          <div style={{ fontSize: 14, color: C.discret }}>{f.info}</div>
          <div>
            {f.histo.map(([ref, m]) => <div key={ref} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid #EEF3F7', fontSize: 15 }}><span>{ref}</span><span style={{ fontWeight: 600 }}>{m}</span></div>)}
          </div>
          <div style={{ flexGrow: 1 }} />
          <div style={{ borderRadius: 12, background: f.fond, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, color: C.texte }}>{f.soldeLabel}</span>
            <span style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 20, color: f.couleur }}>{f.solde}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Scene6({ lt }: { lt: number }) {
  const mvts = [
    ['Vente TIC-004513 · espèces', '+ 2 350 MRU', true], ['Vente FAC-2026-0185 · chèque', '+ 18 400 MRU', true],
    ['Dépense · électricité', '− 4 800 MRU', false], ['Vente TIC-004514 · Bankily', '+ 1 120 MRU', true], ['Règlement fournisseur', '− 30 000 MRU', false],
  ] as const;
  const nb = Math.min(5, Math.floor(lt / 0.8) + 1);
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, background: C.cielClair }}>
      <motion.div {...pop} style={{ ...carte, width: 560, height: 500, padding: 30, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 24, paddingBottom: 8 }}>Mouvements de caisse</div>
        {mvts.slice(0, nb).map(([libelle, montant, entree]) => (
          <motion.div key={libelle} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #EEF3F7', fontSize: 15 }}>
            <span>{libelle}</span><span style={{ fontWeight: 700, color: entree ? C.vert : C.rouge }}>{montant}</span>
          </motion.div>
        ))}
      </motion.div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <motion.div {...pop} transition={{ ...pop.transition, delay: 0.4 }} style={{ width: 340, boxSizing: 'border-box', borderRadius: 18, background: C.primaire, padding: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 14, color: C.ciel }}>Solde de caisse</div>
          <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 34, color: '#fff' }}>{mru(318760 * Math.min(1, lt / 3))}</div>
          <div style={{ fontSize: 13, color: '#F5D078' }}>Concordant avec la comptabilité</div>
        </motion.div>
        <motion.div {...pop} transition={{ ...pop.transition, delay: 0.8 }} style={{ ...carte, width: 340, padding: 22, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Espèces', 'Chèque', 'Bankily', 'Masrivi', 'Virement'].map((m) => <span key={m} style={{ padding: '8px 12px', borderRadius: 8, background: C.ciel, color: C.primaireFonce, fontSize: 14, fontWeight: 600 }}>{m}</span>)}
        </motion.div>
      </div>
    </div>
  );
}

function Scene7() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${C.ciel} 0%, #fff 100%)`, display: 'flex', alignItems: 'center', gap: 56, padding: '0 70px', boxSizing: 'border-box' }}>
      <motion.div {...pop} style={{ padding: 8, borderRadius: 16, background: '#fff', border: `1px solid ${C.cielMoyen}`, flexShrink: 0 }}>
        <div style={{ width: 603, height: 383, overflow: 'hidden', borderRadius: 10 }}>
          <div style={{ transform: 'scale(0.58)', transformOrigin: 'top left' }}><DashboardMockup /></div>
        </div>
      </motion.div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <motion.div {...entree} transition={{ ...entree.transition, delay: 0.4 }} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: C.primaire, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5D078', fontFamily: POPPINS, fontWeight: 700, fontSize: 34 }}>M</div>
          <div style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 44, letterSpacing: '0.06em', color: C.encre }}>MOUHASSIB</div>
        </motion.div>
        <motion.div {...entree} transition={{ ...entree.transition, delay: 0.8 }} style={{ width: 64, height: 4, borderRadius: 2, background: C.or }} />
        <motion.div {...entree} transition={{ ...entree.transition, delay: 1.2 }} style={{ fontFamily: POPPINS, fontWeight: 500, fontSize: 30, lineHeight: 1.3, color: C.encre }}>
          Une gestion plus simple.<br />Un meilleur contrôle.
        </motion.div>
      </div>
    </div>
  );
}
