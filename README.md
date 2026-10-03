# IT-RIM — site officiel (FR / العربية)

Site vitrine des logiciels et réalisations d'IT-RIM.

- **Stack** : Next.js 16 (App Router) + TypeScript + Tailwind CSS 4.
- **Rendu** : pages générées en statique (SSG), donc rapides et indexables.
- **Langues** : français (gauche à droite) et arabe (droite à gauche).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000  → redirige vers /fr ou /ar
npm run build && npm start
```

Node 20 ou plus récent. Le déploiement est prévu sur Vercel ; un hébergement Node classique fonctionne aussi.

## Variables d'environnement

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique, `https://www.it-rim.net` par défaut. Sert aux balises hreflang, au sitemap et à Open Graph. |
| `RESEND_API_KEY` + `CONTACT_TO` (+ `CONTACT_FROM`) | Envoi des formulaires par email via Resend. |
| `CONTACT_WEBHOOK_URL` | Alternative à Resend : envoi en JSON vers un webhook (Make, n8n, Supabase Edge Function, etc.). |

Si aucun envoi n'est configuré, les formulaires n'enregistrent rien et invitent le visiteur à écrire sur WhatsApp. Aucune demande n'est perdue sans qu'il le sache.

## Arborescence

```
/fr  /ar                                  Accueil
/{lang}/applications                      Liste des applications
/{lang}/applications/{slug}               Fiche produit (mouhassib, waqood, manzeel, raqib)
/{lang}/applications/{slug}/essai         Demande d'essai gratuit
/{lang}/applications/{slug}/licence       Demande de licence
/{lang}/realisations                      Réalisations
/{lang}/realisations/{slug}               Étude de cas (oulemas-de-mauritanie)
/{lang}/expertise · /a-propos · /contact · /confidentialite · /conditions
```

- La racine `/` redirige vers la langue du visiteur : d'abord le cookie de préférence, puis l'en-tête `Accept-Language`, sinon le français (fichier `src/proxy.ts`).
- Le sélecteur FR | العربية renvoie vers la même page dans l'autre langue.
- Chaque page déclare son URL canonique, ses alternatives hreflang (`fr`, `ar`, `x-default`) et des données structurées JSON-LD :
  - `Organization` sur tout le site ;
  - `SoftwareApplication` et `FAQPage` sur les fiches produit ;
  - `ItemList` sur l'accueil.
- `sitemap.xml` et `robots.txt` sont générés automatiquement.

## Modifier le contenu

Tout le contenu se trouve dans des fichiers TypeScript typés. Il n'y a pas de CMS à payer ; un CMS headless pourra être branché plus tard sans toucher aux composants.

| Fichier | Contenu |
| --- | --- |
| `src/i18n/dictionaries.ts` | Tous les textes de l'interface, en FR et en AR, avec la même structure. Une clé manquante dans une langue fait échouer le build. |
| `src/content/products.ts` | Les 4 applications : textes, fonctionnalités, statut, **essai gratuit (`trial.enabled`, `trial.days`)**, vidéo de démonstration. |
| `src/content/releases.ts` | Téléchargements et configuration requise. |
| `src/content/projects.ts` | Réalisations et études de cas. |
| `src/content/site.ts` | Coordonnées, WhatsApp, réseaux sociaux, technologies affichées. |
| `public/images/` | Logos, captures et photos. |

### Publier un téléchargement

Dans `src/content/releases.ts`, renseigner `version`, `date` (format AAAA-MM-JJ), `sizeMb`, `url` et, si possible, `sha256`.

Tant que `url` vaut `null`, la fiche affiche « Téléchargement bientôt disponible » avec un formulaire « Être prévenu » : aucun faux lien n'est publié.

### Changer la durée d'essai

Dans `src/content/products.ts`, modifier `trial: { enabled: true, days: 30 }`. Les valeurs 7, 15, 30 ou toute autre durée fonctionnent. Le badge, la carte d'essai, la page d'essai et la FAQ se mettent à jour automatiquement.

### Ajouter une réalisation

Ajouter une entrée dans `src/content/projects.ts` et son image dans `public/images/`. Dans l'étude de cas, chaque bloc laissé à `null` affiche « À compléter ».

### Réseaux sociaux

Renseigner les URL dans `src/content/site.ts`. Un réseau sans URL n'est pas affiché.

## Essai gratuit et licences : architecture prévue

L'interface est prête. La logique se trouve dans `src/lib/trial.ts`.

**États de la carte d'essai** :

- `idle` : « Essai gratuit · 30 jours » ;
- `active` : « Votre essai expire dans 27 jours. » ;
- `ending` : 5 jours ou moins restants, affichage orange ;
- `expired` : « Votre période d'essai est terminée. » avec les boutons Obtenir une licence et Contacter IT-RIM ;
- `disabled` : essai désactivé pour ce produit.

Aujourd'hui, une demande d'essai ou de licence arrive à l'équipe par email ou webhook, puis l'équipe active l'essai à la main.

**Étapes pour automatiser** (par exemple avec Supabase) :

1. Créer les tables `trials` (product, name, phone, email, started_at, expires_at) et `license_requests`.
2. Activer la Row Level Security : chaque utilisateur ne lit que ses propres essais.
3. Dans `submitForm` (`src/lib/actions.ts`, cas `kind === "trial"`), insérer la ligne `trials` avec `newTrialRecord(product)`.
4. Envoyer un lien de connexion par email (magic link).
5. Créer une page `/{lang}/compte` qui lit l'essai côté serveur et affiche `<TrialCard state={trialState(product, record)} />`. Les jours restants sont calculés sur le serveur, jamais dans le navigateur.
6. Si le logiciel de bureau doit vérifier sa clé, ajouter une route `/api/license/verify` qui contrôle une clé signée.

Aucun paiement en ligne n'est proposé : la licence est délivrée par l'équipe IT-RIM.

## Bilingue et RTL

- Les attributs `lang` et `dir` sont posés côté serveur sur `<html>`, dans `src/app/[lang]/layout.tsx`.
- Toute la mise en page utilise des propriétés logiques (`ms-`, `me-`, `ps-`, `start-`, `end-`, `text-start`, `inset-inline`), si bien que le RTL ne demande aucun CSS dédié.
- Les flèches directionnelles passent par la classe `.flip` et se retournent en arabe. Les icônes non directionnelles ne bougent pas.
- Les numéros, emails, URL et versions sont isolés en `dir="ltr"`.
- **Polices** : Plus Jakarta Sans pour le latin et IBM Plex Sans Arabic pour l'arabe. Elles sont auto-hébergées via Fontsource : aucun appel à Google Fonts.

## Mise en production (Vercel, projet actuel « it-rim »)

Le nouveau site remplace l'ancien site Vite sur le même dépôt `bahe1953/it-rim` et le même projet Vercel.

1. **Aperçu.** Poussez la branche `refonte-nextjs`. Vercel construit automatiquement un aperçu, dont il donne l'adresse dans GitHub et dans le tableau de bord Vercel. Vérifiez-y les pages `/fr` et `/ar`, la page Mouhassib et le téléchargement.
2. **Réglages Vercel**, dans Settings → Build & Development :
   - le fichier `vercel.json` force déjà le framework Next.js ;
   - si un « Output Directory » personnalisé (`dist`) était défini pour l'ancien site, il faut le retirer.
3. **Variables d'environnement.** Celles du site actuel sont reprises telles quelles : `RESEND_API_KEY`, `RESEND_FROM` et `GOOGLE_SHEET_WEBHOOK_URL`. Ajoutez `NEXT_PUBLIC_SITE_URL=https://www.it-rim.net`, et si besoin `CONTACT_TO`, qui vaut `contact@it-rim.net` par défaut.
4. **Mise en ligne.** Fusionnez `refonte-nextjs` dans `main` (pull request sur GitHub). Vercel déploie alors en production.
5. **Anciennes adresses.** Elles sont redirigées dans `next.config.ts` : `/mouhassib-fr`, `/mouhassib`, `/manzeel`, `/logiciels/...`, `/contact` et `/essai`.

## À fournir plus tard

- [ ] Captures haute définition de Waqood, Manzeel et RAQIB (images actuelles tirées de la maquette).
- [ ] Logo vectoriel officiel d'IT-RIM, pour remplacer `Logo` dans `src/components/icons.tsx`.
- [ ] Installateurs de Waqood et Manzeel, s'ils doivent être téléchargeables (`src/content/releases.ts`).
- [ ] URL du site Oulemas de Mauritanie et autres réalisations (`src/content/projects.ts`).
- [ ] URL des réseaux sociaux (`src/content/site.ts`).
- [ ] Relecture des textes arabes et validation des pages légales.
