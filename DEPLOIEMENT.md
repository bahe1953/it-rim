# Mise en ligne de Mouhassib sur it-rim.net

Ce document explique les 5 etapes pour publier ce site (deja pret : page Mouhassib,
formulaire de telechargement, envoi email, feuille de leads). Le code est termine et
teste (`npx tsc --noEmit` passe sans erreur) ; il reste des comptes/actions que vous
seul pouvez faire (Google, Resend, GitHub, Vercel).

## Etape 1 - Heberger le fichier .exe (GitHub Releases, gratuit, jusqu'a 2 Go)

1. Une fois le depot pousse sur GitHub (etape 4), aller sur
   `https://github.com/bahe1953/it-rim/releases/new`.
2. Tag : `v7.3`. Titre : `Mouhassib v7.3`.
3. Glisser-deposer `Mouhassib-v7.3-FINAL-20260901_201826.exe` (present sur votre Bureau).
4. Publier la release. Copier l'URL du fichier (clic droit sur son lien > copier
   l'adresse) : elle ressemble a
   `https://github.com/bahe1953/it-rim/releases/download/v7.3/Mouhassib-v7.3-FINAL-20260901_201826.exe`.

## Etape 2 - Google Sheet pour recevoir les emails des commercants

1. Creer une feuille sur https://sheets.google.com, nommee "Leads Mouhassib".
2. Extensions > Apps Script, coller le contenu de `apps_script.js` (fourni a cote de
   ce fichier), Enregistrer.
3. Deployer > Nouveau deploiement > Application Web > Executer en tant que "Moi",
   acces "Tout le monde". Copier l'URL `.../exec`.

## Etape 3 - Resend pour l'email de confirmation

1. Creer un compte sur https://resend.com (gratuit jusqu'a 3000 emails/mois).
2. Dans "API Keys", creer une cle et la copier (commence par `re_`).
3. Optionnel mais recommande : dans "Domains", ajouter `it-rim.net` et suivre les
   instructions DNS pour pouvoir envoyer depuis `contact@it-rim.net` plutot que
   `onboarding@resend.dev`.

## Etape 4 - Pousser le code sur GitHub

Le depot local est pret et le premier commit est fait. Il ne manque que le `push`,
qui a besoin de votre identifiant GitHub - une etape que je ne peux pas faire a
votre place par securite. Sur votre PC, dans le dossier
`C:\Users\lenovo\Desktop\it-rim`, ouvrez un terminal et lancez :

```
git push -u origin main
```

Une fenetre de connexion GitHub devrait s'ouvrir dans votre navigateur : connectez-vous
et c'est termine. Si rien ne s'ouvre et que Git demande un mot de passe, utilisez le
jeton present dans `JETONGITHUB.txt` sur votre Bureau comme mot de passe (le nom
d'utilisateur reste votre identifiant GitHub habituel).

## Etape 5 - Deployer sur Vercel

1. Aller sur https://vercel.com, "Sign up" ou "Log in" avec votre compte GitHub.
2. "Add New" > "Project", choisir le depot `bahe1953/it-rim`, cliquer "Deploy"
   (Vercel detecte automatiquement Vite grace a `vercel.json`).
3. Une fois deploye, aller dans Project > Settings > Environment Variables et
   ajouter ces 5 variables (valeurs recuperees aux etapes 1 a 3) :
   - `VITE_MOUHASSIB_DOWNLOAD_URL`
   - `MOUHASSIB_DOWNLOAD_URL` (meme valeur)
   - `GOOGLE_SHEET_WEBHOOK_URL`
   - `RESEND_API_KEY`
   - `RESEND_FROM` (ex: `IT-RIM <onboarding@resend.dev>`, ou `IT-RIM <contact@it-rim.net>` si domaine verifie)
4. Redeployer (Deployments > les trois points > Redeploy) pour que les variables
   soient prises en compte.
5. Dans Vercel > Settings > Domains, ajouter `it-rim.net` et suivre les instructions
   DNS pour pointer le domaine existant vers ce nouveau projet.

## Ce que fait le site une fois en ligne

Un commercant clique "Telecharger Mouhassib" sur `/mouhassib`, remplit nom/email/
telephone/ville, et :
- le telechargement du .exe demarre immediatement (pas d'attente d'email) ;
- son email est enregistre dans le Google Sheet ;
- un email de confirmation avec le lien de secours part via Resend.

Mouhassib est deja mis en avant sur la page d'accueil comme produit "Vedette"
(a cote de GestCommerce) avec un lien direct vers `/mouhassib` — c'est cette page,
plutot que la section "Nos services" (qui presente vos prestations d'agence : dev sur
mesure, conseil, formation), qui est le bon emplacement pour un telechargement de
logiciel.
