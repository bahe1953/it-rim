import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Echelle from '../components/mouhassib/Echelle';
import DashboardMockup from '../components/mouhassib/DashboardMockup';
import VideoDemo from '../components/mouhassib/VideoDemo';
import { C, POPPINS, ICONES as I, Icone, Logo } from '../components/mouhassib/theme';
import { MOUHASSIB_FR_DOWNLOAD_URL } from '../config';

// Landing page de Mouhassib FR (route /mouhassib-fr) — thème clair bleu ciel, blanc, touches dorées.
const WHATSAPP_DEMO = 'https://wa.me/22243459222?text=' + encodeURIComponent('Bonjour IT-RIM, je souhaite une démonstration de Mouhassib FR');
const WHATSAPP = 'https://wa.me/22243459222';

const MODULES = [
  { titre: 'Ventes & factures', d: I.vente, texte: 'Encaissez au comptoir, éditez devis, factures et bons de livraison en quelques clics.' },
  { titre: 'Achats', d: I.achat, texte: "Enregistrez vos réceptions, frais d'approche compris, et gardez un œil sur ce que vous devez." },
  { titre: 'Gestion des stocks', d: I.stock, texte: 'Quantités et valeur à jour à chaque vente, alertes de réassort et de péremption.' },
  { titre: 'Clients', d: I.client, texte: "Fiches, historique d'achats et factures à encaisser, réunis au même endroit." },
  { titre: 'Fournisseurs', d: I.fourn, texte: 'Achats, règlements et soldes par fournisseur, sans tableau Excel à tenir.' },
  { titre: 'Caisse & comptes', d: I.caisse, texte: 'Caisse, banques, chèques et mobile money suivis au centime, écritures comptables générées pour vous.' },
];
const CIBLES = [
  { titre: 'Commerces', d: I.boutique, texte: 'Épiceries, boutiques, quincailleries : un comptoir rapide et un stock juste.' },
  { titre: 'Magasins', d: I.magasin, texte: 'Plusieurs caisses reliées au même poste, sur votre réseau local.' },
  { titre: 'Grossistes', d: I.entrepot, texte: 'Ventes en volume, ventes à crédit et facturation professionnelle.' },
  { titre: 'Distributeurs', d: I.fourn, texte: 'Bons de livraison, créances par client et suivi des règlements.' },
  { titre: 'PME', d: I.pme, texte: 'Comptabilité, paie et exports Sage prêts pour votre comptable.' },
  { titre: 'Importateurs', d: I.bateau, texte: 'Frais de douane, de port et de transport intégrés au coût de revient.' },
];
const BENEFICES = [
  { num: '01', titre: 'Gagnez du temps', d: I.temps, texte: 'Automatisez les opérations quotidiennes : une vente saisie une fois met tout à jour.' },
  { num: '02', titre: 'Gardez le contrôle', d: I.bouclier, texte: 'Visualisez votre activité à tout moment, poste par poste et utilisateur par utilisateur.' },
  { num: '03', titre: 'Décidez avec de vrais chiffres', d: I.compta, texte: 'Des informations claires pour mieux piloter votre entreprise.' },
];

const apparition = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as [number, number, number, number] },
};

function Surtitre({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.14em', color: C.orTexte }}>{children}</div>;
}
function Titre2({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-3xl md:text-[44px] leading-tight ${className}`} style={{ margin: 0, fontFamily: POPPINS, fontWeight: 700, letterSpacing: '-0.02em', color: C.encre }}>{children}</h2>;
}
function Coche({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-2"><Icone d={I.coche} taille={18} epaisseur={2.2} couleur={C.primaire} />{children}</div>;
}

export default function MouhassibFR() {
  const [demandeVideo, setDemandeVideo] = useState(0);

  const voirDemo = () => {
    document.getElementById('demonstration')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setDemandeVideo((n) => n + 1);
  };
  const telecharger = () => {
    fetch('/api/download-request', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ produit: 'mouhassib-fr' }),
    }).catch(() => {});
    window.location.href = MOUHASSIB_FR_DOWNLOAD_URL;
  };

  const btnPrimaire = { background: C.primaire, color: '#fff' };
  const survol = { whileHover: { y: -2, boxShadow: '0 14px 28px -14px rgba(3,105,161,.6)' }, transition: { duration: 0.2 } };

  return (
    <div dir="ltr" lang="fr" className="pt-20" style={{ background: '#fff', color: C.encre, fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* HERO */}
      <section style={{ background: `linear-gradient(180deg, ${C.cielClair} 0%, #fff 100%)` }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-16 md:pb-24 grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-14 items-center">
          <div className="flex flex-col gap-7">
            <motion.div {...apparition} className="self-start flex items-center gap-2.5 px-3.5 py-2 rounded-full text-[13px] font-medium" style={{ background: '#fff', border: `1px solid ${C.bord}`, color: C.texte }}>
              <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.4, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: C.or }} />
              Gestion commerciale · Version française
            </motion.div>
            <motion.h1 {...apparition} transition={{ ...apparition.transition, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-[58px]" style={{ margin: 0, fontFamily: POPPINS, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: C.encre }}>
              MOUHASSIB —<br />Votre commerce, maîtrisé <span style={{ color: C.primaire, borderBottom: `5px solid ${C.or}` }}>de A à Z.</span>
            </motion.h1>
            <motion.p {...apparition} transition={{ ...apparition.transition, delay: 0.2 }} className="text-lg md:text-xl" style={{ margin: 0, lineHeight: 1.6, color: C.texte }}>
              Ventes, achats, stocks, clients, fournisseurs, caisse et comptes réunis dans une seule solution.
            </motion.p>
            <motion.div {...apparition} transition={{ ...apparition.transition, delay: 0.3 }} className="flex flex-col sm:flex-row gap-3.5">
              <motion.a {...survol} href="#fonctionnalites" className="px-7 py-4 rounded-xl font-semibold text-center" style={btnPrimaire}>Découvrir Mouhassib</motion.a>
              <motion.button {...survol} type="button" onClick={voirDemo} className="px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2.5" style={{ background: '#fff', border: `1px solid ${C.cielMoyen}`, color: C.encre }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: C.ciel, color: C.primaire, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z" /></svg>
                </span>
                Voir la démonstration
              </motion.button>
            </motion.div>
            <motion.div {...apparition} transition={{ ...apparition.transition, delay: 0.4 }} className="flex flex-wrap gap-x-7 gap-y-2 text-sm" style={{ color: C.texte }}>
              <Coche>Fonctionne hors ligne</Coche><Coche>Essai gratuit 30 jours</Coche><Coche>Données sur votre ordinateur</Coche>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative">
            <div style={{ padding: '12px 12px 18px 12px', borderRadius: 22, background: '#E2E8F0', border: '1px solid #CBD5E1', boxShadow: '0 60px 120px -50px rgba(3,105,161,.45)' }}>
              <div style={{ borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
                <Echelle largeur={1040} hauteur={660}><DashboardMockup /></Echelle>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div style={{ width: 110, height: 44, background: '#CBD5E1' }} />
              <div style={{ width: 240, height: 12, borderRadius: 8, background: '#B8C6D4' }} />
            </div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="hidden md:flex absolute -left-10 bottom-24 items-center gap-3 px-4 py-3.5 rounded-2xl" style={{ width: 250, background: '#fff', border: `1px solid ${C.bord}`, boxShadow: '0 24px 48px -24px rgba(3,105,161,.4)' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: C.ciel, color: C.primaire, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icone d={I.coche} taille={20} epaisseur={2} /></div>
              <div><div className="text-[13px] font-semibold">Facture validée</div><div className="text-xs" style={{ color: C.discret }}>FAC-2026-0184 · 18 400 MRU</div></div>
            </motion.div>
            <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }} className="hidden md:flex absolute -right-4 top-6 flex-col gap-2 px-4 py-3.5 rounded-2xl" style={{ width: 220, background: '#fff', border: `1px solid ${C.bord}`, boxShadow: '0 24px 48px -24px rgba(3,105,161,.4)' }}>
              <div className="text-xs" style={{ color: C.discret }}>Stock · Riz 25 kg</div>
              <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 20 }}>148 sacs</div>
              <div style={{ height: 6, borderRadius: 4, background: '#EEF3F7', overflow: 'hidden' }}><div style={{ width: '68%', height: 6, background: C.or }} /></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* VIDÉO */}
      <section id="demonstration" className="max-w-6xl mx-auto px-5 md:px-8 pb-20 md:pb-28">
        <motion.div {...apparition} className="flex flex-col items-center gap-3 text-center mb-10">
          <Surtitre>DÉMONSTRATION · 60 SECONDES</Surtitre>
          <Titre2>Mouhassib en une minute.</Titre2>
        </motion.div>
        <motion.div {...apparition}><VideoDemo demande={demandeVideo} /></motion.div>
      </section>

      {/* SECTION 1 — PROMESSE */}
      <section id="fonctionnalites" className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 scroll-mt-24">
        <motion.div {...apparition} className="flex flex-col items-center gap-4 text-center mb-14">
          <Surtitre>FONCTIONNALITÉS</Surtitre>
          <Titre2 className="max-w-3xl">Tout ce qu'il vous faut pour piloter votre activité.</Titre2>
          <p className="text-lg max-w-2xl" style={{ margin: 0, color: C.texte, lineHeight: 1.6 }}>Six modules reliés entre eux : chaque vente met à jour le stock, la caisse et les comptes, sans double saisie.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {MODULES.map((m, k) => (
            <motion.div key={m.titre} {...apparition} transition={{ ...apparition.transition, delay: (k % 3) * 0.08 }}
              whileHover={{ y: -6, boxShadow: '0 28px 56px -28px rgba(3,105,161,.35)', borderColor: C.or }}
              className="group p-7 md:p-8 rounded-2xl flex flex-col gap-4" style={{ background: '#fff', border: `1px solid ${C.bord}` }}>
              <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#0369A1] group-hover:text-white" style={{ background: C.ciel, color: C.primaire }}>
                <Icone d={m.d} taille={24} />
              </div>
              <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 21 }}>{m.titre}</div>
              <div style={{ fontSize: 15.5, lineHeight: 1.6, color: C.texte }}>{m.texte}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 2 — DASHBOARD */}
      <section id="tableau-de-bord" style={{ background: C.ciel }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28 flex flex-col items-center gap-12">
          <motion.div {...apparition} className="flex flex-col items-center gap-4 text-center">
            <Surtitre>TABLEAU DE BORD</Surtitre>
            <Titre2>Votre activité, en un coup d'œil.</Titre2>
            <p className="text-lg max-w-2xl" style={{ margin: 0, color: C.texte, lineHeight: 1.6 }}>Chiffre d'affaires, ventes du jour, achats, stock, créances, dettes et caisse : les chiffres qui comptent, à jour à chaque opération.</p>
          </motion.div>
          <motion.div {...apparition} className="w-full max-w-[1064px]" style={{ padding: 12, borderRadius: 24, background: '#fff', border: `1px solid ${C.cielMoyen}`, boxShadow: '0 60px 120px -50px rgba(3,105,161,.45)' }}>
            <div style={{ borderRadius: 14, overflow: 'hidden' }}><Echelle largeur={1040} hauteur={660}><DashboardMockup /></Echelle></div>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm" style={{ color: C.texte }}>
            {['Stock valorisé au coût moyen', 'Créances et dettes toujours à jour', 'Caisse et comptabilité concordantes'].map((x) => (
              <div key={x} className="flex items-center gap-2"><span style={{ width: 8, height: 8, borderRadius: '50%', background: C.or }} />{x}</div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — POUR QUI */}
      <section id="pour-qui" className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid lg:grid-cols-[400px_1fr] gap-12 lg:gap-20">
        <motion.div {...apparition} className="flex flex-col gap-4">
          <Surtitre>POUR QUI ?</Surtitre>
          <Titre2>Une solution pensée pour le commerce réel.</Titre2>
          <p className="text-lg" style={{ margin: 0, color: C.texte, lineHeight: 1.6 }}>Du comptoir de quartier au dépôt de gros, Mouhassib s'adapte à votre façon de vendre, d'acheter et de stocker.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {CIBLES.map((c, k) => (
            <motion.div key={c.titre} {...apparition} transition={{ ...apparition.transition, delay: (k % 2) * 0.08 }}
              whileHover={{ y: -4, borderColor: C.or }} className="p-6 rounded-2xl flex gap-4 items-start" style={{ background: C.gris, border: `1px solid ${C.bord}` }}>
              <div className="w-[46px] h-[46px] shrink-0 rounded-xl flex items-center justify-center" style={{ background: '#fff', color: C.primaire }}><Icone d={c.d} taille={22} /></div>
              <div className="flex flex-col gap-1.5">
                <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 19 }}>{c.titre}</div>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: C.texte }}>{c.texte}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — SIMPLICITÉ */}
      <section style={{ background: C.gris }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 flex flex-col gap-14">
          <motion.div {...apparition} className="flex flex-col items-center gap-4 text-center">
            <Surtitre>SIMPLICITÉ</Surtitre>
            <Titre2>Moins de complexité. Plus de contrôle.</Titre2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 md:gap-6">
            {BENEFICES.map((b, k) => (
              <motion.div key={b.titre} {...apparition} transition={{ ...apparition.transition, delay: k * 0.1 }}
                whileHover={{ y: -6, boxShadow: '0 28px 56px -28px rgba(3,105,161,.35)' }} className="p-8 md:p-10 rounded-3xl flex flex-col gap-5" style={{ background: '#fff', border: `1px solid ${C.bord}` }}>
                <div className="flex items-center justify-between">
                  <div className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center" style={{ background: C.ciel, color: C.primaire }}><Icone d={b.d} taille={28} /></div>
                  <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 40, color: '#E4D3A6' }}>{b.num}</div>
                </div>
                <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 24 }}>{b.titre}</div>
                <div style={{ fontSize: 17, lineHeight: 1.6, color: C.texte }}>{b.texte}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CTA FINAL */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24">
        <motion.div {...apparition} className="relative overflow-hidden rounded-[28px] grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center" style={{ background: `linear-gradient(135deg, ${C.ciel} 0%, ${C.cielMoyen} 100%)`, border: `1px solid ${C.cielMoyen}` }}>
          <div className="p-8 md:p-14 flex flex-col gap-5">
            <div style={{ width: 56, height: 4, borderRadius: 2, background: C.or }} />
            <h2 className="text-3xl md:text-[42px]" style={{ margin: 0, fontFamily: POPPINS, fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: C.encre }}>Prêt à moderniser votre gestion commerciale ?</h2>
            <p className="text-lg" style={{ margin: 0, lineHeight: 1.6, color: C.texte }}>Nous vous montrons Mouhassib sur vos propres opérations, puis vous l'essayez gratuitement pendant 30 jours.</p>
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <motion.a {...survol} href={WHATSAPP_DEMO} target="_blank" rel="noopener noreferrer" className="px-7 py-4 rounded-xl font-bold text-center" style={btnPrimaire}>Demander une démonstration</motion.a>
              <motion.a {...survol} href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="px-6 py-4 rounded-xl font-semibold text-center" style={{ background: '#fff', color: C.encre, border: `1px solid ${C.cielMoyen}` }}>Nous contacter</motion.a>
            </div>
            <button type="button" onClick={telecharger} className="self-start text-sm font-semibold underline underline-offset-4" style={{ color: C.primaire, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              Ou téléchargez directement l'essai gratuit de 30 jours
            </button>
          </div>
          <div className="hidden lg:block self-end translate-x-10 translate-y-6">
            <div style={{ padding: 10, borderRadius: 20, background: '#fff', border: `1px solid ${C.cielMoyen}`, boxShadow: '0 40px 80px -40px rgba(3,105,161,.5)' }}>
              <div style={{ borderRadius: 12, overflow: 'hidden' }}><Echelle largeur={1040} hauteur={660}><DashboardMockup /></Echelle></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* BANDEAU DE MARQUE */}
      <section style={{ borderTop: `1px solid ${C.bord}` }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo taille={38} />
            <span style={{ fontFamily: POPPINS, fontWeight: 700, fontSize: 19, letterSpacing: '0.06em' }}>MOUHASSIB</span>
          </div>
          <div style={{ fontSize: 15, color: C.texte }}>Solution professionnelle de gestion commerciale.</div>
        </div>
      </section>
    </div>
  );
}
