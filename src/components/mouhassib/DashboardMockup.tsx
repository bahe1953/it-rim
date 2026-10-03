"use client";
/* eslint-disable react-hooks/set-state-in-effect -- composant repris tel quel du site actuel */

import { useEffect, useRef, useState } from 'react';
import { C, POPPINS, ICONES as I, Icone } from './theme';

export type Langue = 'fr' | 'ar';

const TEXTES = {
  fr: {
    fenetre: 'Mouhassib — Tableau de bord', marque: 'MOUHASSIB', police: 'Inter, system-ui, sans-serif', titres: POPPINS,
    nav: ['Tableau de bord', 'Ventes & factures', 'Achats', 'Stock', 'Clients', 'Fournisseurs', 'Caisse & banque', 'Comptabilité', 'Paie'],
    magasin: ['Boutique Centrale', 'Nouakchott'], titre: 'Tableau de bord', sousTitre: "Vue d'ensemble de l'activité", periode: 'Ce mois', nouvelle: '+ Nouvelle vente',
    kpis: [
      ["Chiffre d'affaires (mois)", '+12 % sur le mois précédent'], ['Ventes du jour', '37 tickets encaissés'], ['Achats (mois)', '14 bons de réception'],
      ['Valeur du stock', '412 articles suivis'], ['Créances clients', '9 factures à encaisser'], ['Dettes fournisseurs', '3 échéances ce mois'],
      ['Caisse', 'Solde au comptoir'], ['Alertes stock', 'Sous le seuil de réassort'],
    ],
    articles: 'articles', monnaie: 'MRU', graphe: 'Ventes des 7 derniers jours', jours: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    dernieres: 'Dernières ventes', clients: ['Boutique El Amane', 'Comptoir', 'Superette Tevragh', 'Comptoir', 'Dépôt Sebkha'],
  },
  ar: {
    fenetre: 'محاسب — لوحة القيادة', marque: 'محاسب', police: 'Cairo, system-ui, sans-serif', titres: 'Cairo, system-ui, sans-serif',
    nav: ['لوحة القيادة', 'المبيعات والفواتير', 'المشتريات', 'المخزون', 'الزبائن', 'الموردون', 'الصندوق والبنك', 'المحاسبة', 'الرواتب'],
    magasin: ['المتجر المركزي', 'نواكشوط'], titre: 'لوحة القيادة', sousTitre: 'نظرة عامة على النشاط', periode: 'هذا الشهر', nouvelle: '+ بيع جديد',
    kpis: [
      ['رقم الأعمال (الشهر)', '+12 % مقارنة بالشهر السابق'], ['مبيعات اليوم', '37 تذكرة مسجلة'], ['المشتريات (الشهر)', '14 وصل استلام'],
      ['قيمة المخزون', '412 صنفا متابَعا'], ['ديون الزبائن', '9 فواتير للتحصيل'], ['ديون الموردين', '3 استحقاقات هذا الشهر'],
      ['الصندوق', 'رصيد الصندوق'], ['تنبيهات المخزون', 'تحت حد إعادة التموين'],
    ],
    articles: 'أصناف', monnaie: 'أوقية', graphe: 'مبيعات آخر 7 أيام', jours: ['اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت', 'أحد'],
    dernieres: 'آخر المبيعات', clients: ['بوتيك الأمانة', 'بيع مباشر', 'متجر تفرغ زينة', 'بيع مباشر', 'مستودع السبخة'],
  },
};

// Maquette du tableau de bord de Mouhassib, dessinée à 1040 × 660 (à placer dans <Echelle>), en
// français ou en arabe. Les chiffres montent et le graphique se remplit quand elle apparaît à l'écran.
// Montants et noms : exemples de démonstration.
export default function DashboardMockup({ langue = 'fr' }: { langue?: Langue }) {
  const L = TEXTES[langue];
  const racine = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = racine.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setP(1); return; }
    let minuterie: number | undefined;
    const obs = new IntersectionObserver(([entree]) => {
      if (!entree.isIntersecting) return;
      obs.disconnect();
      const debut = performance.now();
      const pas = () => {
        const t = Math.min(1, (performance.now() - debut) / 1400);
        setP(1 - Math.pow(1 - t, 3));
        if (t < 1) minuterie = requestAnimationFrame(pas);
      };
      minuterie = requestAnimationFrame(pas);
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => { obs.disconnect(); if (minuterie) cancelAnimationFrame(minuterie); };
  }, []);

  const f = (n: number) => Math.round(n * p).toLocaleString('fr-FR') + ' ' + L.monnaie;
  const icones = [I.dash, I.vente, I.achat, I.stock, I.client, I.fourn, I.caisse, I.compta, I.paie];
  const bleu = { fond: C.ciel, encre: C.primaire, noteCouleur: C.vert };
  const or = { fond: C.orClair, encre: C.orTexte, noteCouleur: C.discret };
  const valeursKpi = [f(1248500), f(42380), f(612900), f(2184000), f(186400), f(94250), f(318760), Math.round(6 * p) + ' ' + L.articles];
  const stylesKpi = [bleu, bleu, or, or, bleu, or, bleu, { fond: '#FBE9E4', encre: C.rouge, noteCouleur: C.discret }];
  const iconesKpi = [I.compta, I.vente, I.achat, I.stock, I.client, I.fourn, I.caisse, I.alerte];
  const valeurs = [31200, 38900, 29400, 45100, 52300, 47800, 42380];
  const refs = ['FAC-2026-0184', 'TIC-004512', 'FAC-2026-0183', 'TIC-004511', 'FAC-2026-0182'];
  const montants = [18400, 2350, 9870, 1120, 26500];

  return (
    <div ref={racine} dir={langue === 'ar' ? 'rtl' : 'ltr'} style={{ width: 1040, height: 660, background: '#fff', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: L.police, color: C.encre }}>
      <div style={{ height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: '#EEF3F7', borderBottom: `1px solid ${C.bord}` }}>
        {['#F2B8AE', '#F1DC9C', '#B4DEC7'].map((c) => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
        <div style={{ flexGrow: 1, textAlign: 'center', fontSize: 12, color: C.discret, fontWeight: 500 }}>{L.fenetre}</div>
        <div style={{ width: 50 }} />
      </div>
      <div style={{ flexGrow: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ width: 196, flexShrink: 0, background: C.cielClair, borderInlineEnd: `1px solid ${C.bord}`, display: 'flex', flexDirection: 'column', padding: '18px 12px', gap: 4, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 18px 8px' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: C.primaire, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5D078', fontFamily: POPPINS, fontWeight: 700, fontSize: 16 }}>M</div>
            <div style={{ fontFamily: L.titres, fontWeight: 700, fontSize: 15, letterSpacing: langue === 'fr' ? '0.04em' : 0 }}>{L.marque}</div>
          </div>
          {L.nav.map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, fontSize: 13, background: i === 0 ? C.primaire : 'transparent', color: i === 0 ? '#fff' : C.texte, fontWeight: i === 0 ? 600 : 400 }}>
              <Icone d={icones[i]} taille={16} />
              <span>{label}</span>
            </div>
          ))}
          <div style={{ flexGrow: 1 }} />
          <div style={{ padding: 10, borderRadius: 10, background: C.ciel, fontSize: 11, color: C.texte, lineHeight: 1.4 }}>{L.magasin[0]}<br />{L.magasin[1]}</div>
        </div>
        <div style={{ flexGrow: 1, background: C.gris, padding: '20px 22px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 36 }}>
            <div>
              <div style={{ fontFamily: L.titres, fontWeight: 700, fontSize: 19 }}>{L.titre}</div>
              <div style={{ fontSize: 11, color: C.discret }}>{L.sousTitre}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ padding: '6px 12px', borderRadius: 8, background: '#fff', border: `1px solid ${C.bord}`, fontSize: 12, color: C.texte }}>{L.periode}</div>
              <div style={{ padding: '6px 12px', borderRadius: 8, background: C.primaire, fontSize: 12, color: '#fff', fontWeight: 600 }}>{L.nouvelle}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
            {L.kpis.map(([label, note], k) => (
              <div key={label} style={{ background: '#fff', border: `1px solid ${C.bord}`, borderRadius: 12, padding: '12px 14px', height: 92, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 11, color: C.discret, fontWeight: 500 }}>{label}</div>
                  <div style={{ width: 24, height: 24, borderRadius: 7, background: stylesKpi[k].fond, color: stylesKpi[k].encre, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icone d={iconesKpi[k]} taille={13} epaisseur={2} /></div>
                </div>
                <div dir="ltr" style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 19, textAlign: langue === 'ar' ? 'right' : 'left' }}>{valeursKpi[k]}</div>
                <div style={{ fontSize: 10.5, color: stylesKpi[k].noteCouleur }}>{note}</div>
              </div>
            ))}
          </div>
          <div style={{ flexGrow: 1, display: 'flex', gap: 12, minHeight: 0 }}>
            <div style={{ flex: 3, background: '#fff', border: `1px solid ${C.bord}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{L.graphe}</div>
                <div style={{ fontSize: 11, color: C.discret }}>{L.monnaie}</div>
              </div>
              <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', gap: 14, padding: '4px 4px 0 4px', borderBottom: `1px solid ${C.bord}` }}>
                {valeurs.map((v, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%' }}>
                    <div style={{ width: '100%', maxWidth: 40, height: Math.round((v / 52300) * 190 * p), borderRadius: '6px 6px 0 0', background: i === 6 ? C.or : C.cielVif }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 14, padding: '0 4px' }}>
                {L.jours.map((j) => <div key={j} style={{ flex: 1, textAlign: 'center', fontSize: 10.5, color: C.discret }}>{j}</div>)}
              </div>
            </div>
            <div style={{ flex: 2, background: '#fff', border: `1px solid ${C.bord}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{L.dernieres}</div>
              {L.clients.map((client, k) => (
                <div key={refs[k]} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #EEF3F7', fontSize: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <span style={{ fontWeight: 500 }}>{client}</span>
                    <span dir="ltr" style={{ fontSize: 10.5, color: C.discret, textAlign: langue === 'ar' ? 'right' : 'left' }}>{refs[k]}</span>
                  </div>
                  <span dir="ltr" style={{ fontWeight: 600, color: C.primaire }}>{montants[k].toLocaleString('fr-FR')} {L.monnaie}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
