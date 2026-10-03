import type { Product } from "@/content/products";

/**
 * État de l'essai gratuit d'un visiteur pour une application.
 *
 * Architecture prévue (voir README) : à l'inscription, une ligne `trials` est créée côté serveur
 * (produit, contact, started_at, expires_at = started_at + product.trial.days). L'espace client lit
 * cette ligne et appelle `trialState` côté serveur, jamais dans le navigateur.
 * Tant que ce stockage n'existe pas, la fiche produit affiche l'état « idle ».
 */
export type TrialRecord = { startedAt: Date; expiresAt: Date };

export type TrialState =
  | { kind: "disabled" }
  | { kind: "idle"; days: number }
  | { kind: "active"; daysLeft: number; days: number; ending: boolean }
  | { kind: "expired" };

const DAY = 86_400_000;

export function trialState(product: Product, record: TrialRecord | null, now = new Date()): TrialState {
  if (!product.trial.enabled) return { kind: "disabled" };
  if (!record) return { kind: "idle", days: product.trial.days };
  const left = Math.ceil((record.expiresAt.getTime() - now.getTime()) / DAY);
  if (left <= 0) return { kind: "expired" };
  return { kind: "active", daysLeft: left, days: product.trial.days, ending: left <= 5 };
}

export const newTrialRecord = (product: Product, start = new Date()): TrialRecord => ({
  startedAt: start,
  expiresAt: new Date(start.getTime() + product.trial.days * DAY),
});
