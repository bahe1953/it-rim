/**
 * Versions téléchargeables de chaque application.
 * Pour publier une version : renseigner version, date (AAAA-MM-JJ), sizeMb, url (et sha256 si disponible).
 * Tant que `url` vaut null, la fiche affiche « Téléchargement bientôt disponible » : aucun faux lien.
 */
export type Release = {
  version: string | null;
  date: string | null;
  sizeMb: number | null;
  /** Lien d'installation unique, ou un lien par langue de l'application. */
  url: string | null | { fr: string; ar: string };
  /** Empreinte SHA-256 de l'installateur (une par langue si les fichiers diffèrent). */
  sha256: string | null | { fr: string; ar: string };
};

/** Lien d'installation à proposer pour une langue du site. */
export const releaseUrl = (r: Release, lang: "fr" | "ar") => (r.url && typeof r.url === "object" ? r.url[lang] : r.url);
export const releaseSha = (r: Release, lang: "fr" | "ar") => (r.sha256 && typeof r.sha256 === "object" ? r.sha256[lang] : r.sha256);

export type Requirements = {
  os: string;
  cpu: string | null;
  ram: string | null;
  disk: string | null;
  network: string | null;
};

const empty: Release = { version: null, date: null, sizeMb: null, url: null, sha256: null };

export const releases: Record<string, Release> = {
  // Version 1.1.0 publiée le 30/09/2026 (GitHub Releases du dépôt bahe1953/it-rim).
  // Fichiers vérifiés le 03/10/2026 : installateurs Windows (NSIS), 84 849 074 octets (FR) et 84 848 230 octets (AR).
  mouhassib: {
    version: "1.1.0",
    date: "2026-09-30",
    sizeMb: 81,
    url: {
      fr: "https://github.com/bahe1953/it-rim/releases/download/mouhassib-fr-v1.1.0/Mouhassib-FR-Setup-1.1.0.exe",
      ar: "https://github.com/bahe1953/it-rim/releases/download/mouhassib-ar-v1.1.0/Mouhassib-Setup-1.1.0.exe",
    },
    sha256: {
      fr: "093f7db278615151b8cda9898d765bbdb24be71d62bfc0a4965bc121ab183bea",
      ar: "1190d15d2ea648453717bed04d9a9f2e2166bcc36753270dd313630d2272d973",
    },
  },
  waqood: { ...empty },
  manzeel: { ...empty },
  raqib: { ...empty },
};

const baseReq: Requirements = { os: "Windows 10 / Windows 11", cpu: null, ram: null, disk: null, network: null };

export const requirements: Record<string, Requirements> = {
  mouhassib: { ...baseReq },
  waqood: { ...baseReq },
  manzeel: { ...baseReq },
  raqib: { ...baseReq },
};
