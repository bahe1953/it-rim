# IT-RIM — Site web premium

Site vitrine IT-RIM avec pages produits Mouhassib et GestCommerce.

**Stack** : React 18 + Vite + TypeScript + Tailwind + Framer Motion + Vercel Serverless Functions

## Installation

```bash
npm install
npm run dev
```

Le site tourne sur http://localhost:3000

## Structure

```
src/
├── components/
│   ├── Header.tsx        # Navigation + logo
│   └── Footer.tsx        # Contact + copyright
├── pages/
│   ├── Home.tsx          # Accueil avec hero + produits + services
│   ├── Mouhassib.tsx     # Fiche produit vedette + formulaire download
│   ├── GestCommerce.tsx  # Fiche produit (placeholder pour v2)
│   ├── Contact.tsx       # Page contact
│   └── Thanks.tsx        # Confirmation après soumission
└── App.tsx               # Router principal

api/
└── download-request.ts   # POST /api/download-request (leads)

public/
└── logo-itrim.jpg        # Logo IT-RIM
```

## Déploiement Vercel

Le projet se déploie automatiquement à chaque push GitHub via l'intégration Vercel.

```bash
git add .
git commit -m "Update"
git push origin main
```

Vercel détecte le push et déploie automatiquement sur it-rim.net.

## Roadmap Phase 2

- [x] Capture des leads (Google Sheet via Apps Script, voir DEPLOIEMENT.md)
- [x] Email de confirmation automatique (Resend)
- [x] Téléchargement immédiat du .exe (hébergé sur GitHub Releases)
- [ ] Page /admin (protégée par mot de passe) avec liste des leads
- [ ] Générateur de codes licence MHSB-*
- [ ] Version arabe RTL avec toggle FR/AR
- [ ] Screenshots réels de Mouhassib dans la page produit
- [ ] Séquence emails automatiques (J+20, J+28)

Voir `DEPLOIEMENT.md` pour la procédure complète de mise en ligne.

## Contact

contact@it-rim.net
