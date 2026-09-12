// Configuration centralisee du site IT-RIM.

// URL publique du fichier installeur Mouhassib version arabe (.exe).
// A heberger sur une GitHub Release (jusqu'a 2 Go, gratuit) et a renseigner
// via la variable d'environnement Vercel VITE_MOUHASSIB_DOWNLOAD_URL.
// Exemple : https://github.com/bahe1953/it-rim/releases/download/v7.3/Mouhassib-v7.3-FINAL.exe
export const MOUHASSIB_AR_DOWNLOAD_URL =
  import.meta.env.VITE_MOUHASSIB_DOWNLOAD_URL || '';

// URL publique du fichier installeur Mouhassib version francaise (.exe).
// Meme principe que la version arabe : a heberger sur une GitHub Release et
// a renseigner via la variable d'environnement Vercel VITE_MOUHASSIB_FR_DOWNLOAD_URL.
// Exemple : https://github.com/bahe1953/it-rim/releases/download/v7.3/Mouhassib-FR-v7.3-FINAL.exe
export const MOUHASSIB_FR_DOWNLOAD_URL =
  import.meta.env.VITE_MOUHASSIB_FR_DOWNLOAD_URL || '';

// Alias conserve pour compatibilite (utilise historiquement pour la version arabe).
export const MOUHASSIB_DOWNLOAD_URL = MOUHASSIB_AR_DOWNLOAD_URL;
