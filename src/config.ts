// Configuration centralisee du site IT-RIM.

// Liens des installeurs Mouhassib (GitHub Releases du depot bahe1953/it-rim).
// Ils sont ecrits ici, dans le code, plutot que dans les variables d'environnement Vercel :
// pour publier une nouvelle version, il suffit de changer ces deux lignes puis de faire
// « git push » (Vercel redeploie alors le site automatiquement).
// Version 1.1.0 publiee le 30/09/2026.
export const MOUHASSIB_AR_DOWNLOAD_URL =
  'https://github.com/bahe1953/it-rim/releases/download/mouhassib-ar-v1.1.0/Mouhassib-Setup-1.1.0.exe';

export const MOUHASSIB_FR_DOWNLOAD_URL =
  'https://github.com/bahe1953/it-rim/releases/download/mouhassib-fr-v1.1.0/Mouhassib-FR-Setup-1.1.0.exe';

// Alias conserve pour compatibilite (utilise historiquement pour la version arabe).
export const MOUHASSIB_DOWNLOAD_URL = MOUHASSIB_AR_DOWNLOAD_URL;
