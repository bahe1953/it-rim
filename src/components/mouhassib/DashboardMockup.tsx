import { useEffect, useRef, useState } from 'react';
import { C, POPPINS, ICONES as I, Icone } from './theme';

// Maquette du tableau de bord de Mouhassib, dessinée à 1040 × 660 (à placer dans <Echelle>).
// Les chiffres montent et le graphique se remplit quand la maquette apparaît à l'écran.
// Montants et noms : exemples de démonstration.
export default function DashboardMockup() {
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

  const f = (n: number) => Math.round(n * p).toLocaleString('fr-FR') + ' MRU';
  const nav: [string, string][] = [
    ['Tableau de bord', I.dash], ['Ventes & factures', I.vente], ['Achats', I.achat], ['Stock', I.stock],
    ['Clients', I.client], ['Fournisseurs', I.fourn], ['Caisse & banque', I.caisse], ['Comptabilité', I.compta], ['Paie', I.paie],
  ];
  const bleu = { fond: C.ciel, encre: C.primaire, noteCouleur: C.vert };
  const or = { fond: C.orClair, encre: C.orTexte, noteCouleur: C.discret };
  const kpis = [
    { label: "Chiffre d'affaires (mois)", valeur: f(1248500), note: '+12 % sur le mois précédent', d: I.compta, ...bleu },
    { label: 'Ventes du jour', valeur: f(42380), note: '37 tickets encaissés', d: I.vente, ...bleu },
    { label: 'Achats (mois)', valeur: f(612900), note: '14 bons de réception', d: I.achat, ...or },
    { label: 'Valeur du stock', valeur: f(2184000), note: '412 articles suivis', d: I.stock, ...or },
    { label: 'Créances clients', valeur: f(186400), note: '9 factures à encaisser', d: I.client, ...bleu },
    { label: 'Dettes fournisseurs', valeur: f(94250), note: '3 échéances ce mois', d: I.fourn, ...or },
    { label: 'Caisse', valeur: f(318760), note: 'Solde au comptoir', d: I.caisse, ...bleu },
    { label: 'Alertes stock', valeur: Math.round(6 * p) + ' articles', note: 'Sous le seuil de réassort', d: I.alerte, fond: '#FBE9E4', encre: C.rouge, noteCouleur: C.discret },
  ];
  const valeurs = [31200, 38900, 29400, 45100, 52300, 47800, 42380];
  const jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const ventes = [
    ['Boutique El Amane', 'FAC-2026-0184', '18 400 MRU'], ['Comptoir', 'TIC-004512', '2 350 MRU'],
    ['Superette Tevragh', 'FAC-2026-0183', '9 870 MRU'], ['Comptoir', 'TIC-004511', '1 120 MRU'], ['Dépôt Sebkha', 'FAC-2026-0182', '26 500 MRU'],
  ];

  return (
    <div ref={racine} style={{ width: 1040, height: 660, background: '#fff', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, system-ui, sans-serif', color: C.encre }}>
      <div style={{ height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: '#EEF3F7', borderBottom: `1px solid ${C.bord}` }}>
        {['#F2B8AE', '#F1DC9C', '#B4DEC7'].map((c) => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
        <div style={{ flexGrow: 1, textAlign: 'center', fontSize: 12, color: C.discret, fontWeight: 500 }}>Mouhassib — Tableau de bord</div>
        <div style={{ width: 50 }} />
      </div>
      <div style={{ flexGrow: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ width: 196, flexShrink: 0, background: C.cielClair, borderRight: `1px solid ${C.bord}`, display: 'flex', flexDirection: 'column', padding: '18px 12px', gap: 4, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 18px 8px' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: C.primaire, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5D078', fontFamily: POPPINS, fontWeight: 700, fontSize: 16 }}>M</div>
            <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 15, letterSpacing: '0.04em' }}>MOUHASSIB</div>
          </div>
          {nav.map(([label, d], i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, fontSize: 13, background: i === 0 ? C.primaire : 'transparent', color: i === 0 ? '#fff' : C.texte, fontWeight: i === 0 ? 600 : 400 }}>
              <Icone d={d} taille={16} />
              <span>{label}</span>
            </div>
          ))}
          <div style={{ flexGrow: 1 }} />
          <div style={{ padding: 10, borderRadius: 10, background: C.ciel, fontSize: 11, color: C.texte, lineHeight: 1.4 }}>Boutique Centrale<br />Nouakchott</div>
        </div>
        <div style={{ flexGrow: 1, background: C.gris, padding: '20px 22px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 36 }}>
            <div>
              <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 19 }}>Tableau de bord</div>
              <div style={{ fontSize: 11, color: C.discret }}>Vue d'ensemble de l'activité</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ padding: '6px 12px', borderRadius: 8, background: '#fff', border: `1px solid ${C.bord}`, fontSize: 12, color: C.texte }}>Ce mois</div>
              <div style={{ padding: '6px 12px', borderRadius: 8, background: C.primaire, fontSize: 12, color: '#fff', fontWeight: 600 }}>+ Nouvelle vente</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 12 }}>
            {kpis.map((k) => (
              <div key={k.label} style={{ background: '#fff', border: `1px solid ${C.bord}`, borderRadius: 12, padding: '12px 14px', height: 92, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 11, color: C.discret, fontWeight: 500 }}>{k.label}</div>
                  <div style={{ width: 24, height: 24, borderRadius: 7, background: k.fond, color: k.encre, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icone d={k.d} taille={13} epaisseur={2} /></div>
                </div>
                <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 19 }}>{k.valeur}</div>
                <div style={{ fontSize: 10.5, color: k.noteCouleur }}>{k.note}</div>
              </div>
            ))}
          </div>
          <div style={{ flexGrow: 1, display: 'flex', gap: 12, minHeight: 0 }}>
            <div style={{ flex: 3, background: '#fff', border: `1px solid ${C.bord}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Ventes des 7 derniers jours</div>
                <div style={{ fontSize: 11, color: C.discret }}>MRU</div>
              </div>
              <div style={{ flexGrow: 1, display: 'flex', alignItems: 'flex-end', gap: 14, padding: '4px 4px 0 4px', borderBottom: `1px solid ${C.bord}` }}>
                {valeurs.map((v, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '100%' }}>
                    <div style={{ width: '100%', maxWidth: 40, height: Math.round((v / 52300) * 190 * p), borderRadius: '6px 6px 0 0', background: i === 6 ? C.or : C.cielVif }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 14, padding: '0 4px' }}>
                {jours.map((j) => <div key={j} style={{ flex: 1, textAlign: 'center', fontSize: 10.5, color: C.discret }}>{j}</div>)}
              </div>
            </div>
            <div style={{ flex: 2, background: '#fff', border: `1px solid ${C.bord}`, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>Dernières ventes</div>
              {ventes.map(([client, ref, montant]) => (
                <div key={ref} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #EEF3F7', fontSize: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <span style={{ fontWeight: 500 }}>{client}</span>
                    <span style={{ fontSize: 10.5, color: C.discret }}>{ref}</span>
                  </div>
                  <span style={{ fontWeight: 600, color: C.primaire }}>{montant}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
