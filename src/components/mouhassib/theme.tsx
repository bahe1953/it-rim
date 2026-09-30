// Palette de la page Mouhassib FR : bleu ciel, blanc, gris très clair et touches dorées.
export const C = {
  primaire: '#0369A1', // bleu profond : boutons, liens (texte blanc lisible dessus)
  primaireFonce: '#075985',
  ciel: '#E0F2FE', // bleu ciel : bandes de section, surfaces
  cielClair: '#F0F9FF',
  cielMoyen: '#BAE6FD',
  cielVif: '#38BDF8', // accents graphiques uniquement (jamais du texte)
  or: '#C9A24A',
  orTexte: '#8A6516', // doré lisible en texte sur fond clair
  orClair: '#F7EFD9',
  encre: '#0F2A3D', // texte principal (bleu nuit, pas du noir)
  texte: '#475569',
  discret: '#64748B',
  bord: '#DCE7EF',
  gris: '#F4F7FA',
  vert: '#047857',
  rouge: '#B4432E',
};

export const POPPINS = 'Poppins, "Plus Jakarta Sans", Inter, system-ui, sans-serif';

export const ICONES = {
  dash: 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z',
  vente: 'M6 2h12v20l-3-2-3 2-3-2-3 2zM9 7h6M9 11h6M9 15h4',
  achat: 'M3 4h2l2.4 11h11.2L21 8H7M9 20h.01M18 20h.01',
  stock: 'M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10',
  client: 'M16 20v-2a4 4 0 0 0-8 0v2M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  fourn: 'M2 6h11v10H2zM13 10h5l3 3v3h-8M6 19h.01M17 19h.01',
  caisse: 'M3 7h18v12H3zM3 7l3-4h12l3 4M16 13h2',
  compta: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  paie: 'M3 5h18v14H3zM14 9h4M14 13h4M6 15h5M8.5 11h.01',
  alerte: 'M12 3l10 18H2L12 3zM12 10v4M12 17h.01',
  boutique: 'M3 9l2-5h14l2 5M3 9h18v11H3zM9 20v-6h6v6',
  magasin: 'M4 21V8l8-5 8 5v13M9 21v-7h6v7M4 11h16',
  entrepot: 'M3 21V9l9-6 9 6v12M7 21v-8h10v8M7 17h10',
  pme: 'M3 21V7h7V3h11v18M7 11h.01M7 15h.01M14 7h3M14 11h3M14 15h3',
  bateau: 'M3 17l2 4h14l2-4H3zM5 17V11h14v6M9 11V6h6v5M12 3v3',
  temps: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  bouclier: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4',
  coche: 'M20 6L9 17l-5-5',
};

export function Icone({ d, taille = 20, epaisseur = 1.8, couleur = 'currentColor' }: { d: string; taille?: number; epaisseur?: number; couleur?: string }) {
  return (
    <svg width={taille} height={taille} viewBox="0 0 24 24" fill="none" stroke={couleur} strokeWidth={epaisseur} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export function Logo({ taille = 40 }: { taille?: number }) {
  return (
    <div style={{ width: taille, height: taille, borderRadius: taille * 0.28, background: C.primaire, color: '#F5D078', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: POPPINS, fontWeight: 700, fontSize: taille * 0.5, flexShrink: 0 }}>M</div>
  );
}
