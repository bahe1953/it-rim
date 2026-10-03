"use client";

import { useEffect, useRef, useState, type ReactNode } from 'react';

// Affiche un contenu dessiné à une taille fixe (ex. 1040 × 660) en le réduisant pour qu'il
// occupe toute la largeur disponible : les maquettes restent nettes et proportionnées,
// de l'écran d'ordinateur au téléphone.
export default function Echelle({ largeur, hauteur, children, className = '' }: {
  largeur: number; hauteur: number; children: ReactNode; className?: string;
}) {
  const boite = useRef<HTMLDivElement>(null);
  const [facteur, setFacteur] = useState(1);

  useEffect(() => {
    const el = boite.current;
    if (!el) return;
    const mesurer = () => setFacteur(el.clientWidth / largeur);
    mesurer();
    const obs = new ResizeObserver(mesurer);
    obs.observe(el);
    return () => obs.disconnect();
  }, [largeur]);

  return (
    <div ref={boite} className={className} style={{ width: '100%', height: hauteur * facteur, overflow: 'hidden', position: 'relative' }}>
      <div style={{ width: largeur, height: hauteur, transform: `scale(${facteur})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
        {children}
      </div>
    </div>
  );
}
