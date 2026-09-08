// Configuration centralisee du site IT-RIM.

// URL publique du fichier installeur Mouhassib (.exe).
// A heberger sur une GitHub Release (jusqu'a 2 Go, gratuit) et a renseigner
// via la variable d'environnement Vercel VITE_MOUHASSIB_DOWNLOAD_URL.
// Exemple : https://github.com/bahe1953/it-rim/releases/download/v7.3/Mouhassib-v7.3-FINAL.exe
export const MOUHASSIB_DOWNLOAD_URL =
  import.meta.env.VITE_MOUHASSIB_DOWNLOAD_URL || '';
