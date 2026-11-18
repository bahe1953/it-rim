import { products } from "@/content/products";

/**
 * Vente en ligne en dollars via Paddle (revendeur et « Merchant of Record »).
 * Paddle encaisse le client, prélève sa commission, gère les taxes et verse le reste en USD.
 *
 * Mise en service :
 * 1. Dans Paddle, créer un produit par logiciel avec un prix récurrent mensuel de 65 USD.
 * 2. Copier chaque identifiant de prix (pri_…) dans `paddlePriceIds` ci-dessous.
 * 3. Renseigner NEXT_PUBLIC_PADDLE_CLIENT_TOKEN (et NEXT_PUBLIC_PADDLE_ENV=sandbox pour les essais).
 * Tant qu'un identifiant vaut null, le bouton « Acheter » renvoie vers la demande de licence : aucun faux paiement.
 */
export const billing = {
  /** Nom légal affiché dans les conditions générales (exigé par Paddle). */
  legalName: "BRAHIM ABD EL JELIL",
  tradeName: "IT-RIM",
  city: "Nouakchott, Mauritanie",
  /** Prix d'une licence mensuelle, par logiciel, en USD. */
  monthlyUsd: 65,
  /** Délai de remboursement sans condition, en jours (Paddle : 14 à 90). */
  refundDays: 14,
  paddle: {
    environment: process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? ("sandbox" as const) : ("production" as const),
    clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? null,
  },
};

/** Identifiants de prix Paddle (pri_…), un par logiciel. */
export const paddlePriceIds: Record<string, string | null> = {
  mouhassib: null,
  "mouhassib-pro": null,
  waqood: null,
  manzeel: null,
  raqib: null,
  gestphone: null,
  mbourou: null,
};

/** Logiciels proposés à la vente en ligne, dans l'ordre du catalogue. */
export const sellableProducts = products.filter((p) => p.status === "available" && p.slug in paddlePriceIds);

export const priceIdOf = (slug: string) => paddlePriceIds[slug] ?? null;

/** Vrai quand le paiement en ligne est prêt pour ce logiciel (jeton + identifiant de prix). */
export const canBuyOnline = (slug: string) => Boolean(billing.paddle.clientToken && priceIdOf(slug));
