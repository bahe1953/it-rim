import { products } from "@/content/products";

/**
 * Vente en ligne en dollars américains (USD) via Paddle (revendeur et « Merchant of Record »).
 * Paddle encaisse le client, prélève sa commission, gère les taxes et verse le reste en USD (conversion faite par Paddle).
 *
 * Mise en service :
 * 1. Dans Paddle, créer un produit par logiciel avec un prix récurrent mensuel de 25 USD.
 * 2. Copier chaque identifiant de prix (pri_…) dans `paddlePriceIds` ci-dessous.
 * 3. Renseigner NEXT_PUBLIC_PADDLE_CLIENT_TOKEN (et NEXT_PUBLIC_PADDLE_ENV=sandbox pour les essais).
 * Tant qu'un identifiant vaut null, le bouton « Acheter » renvoie vers la demande de licence : aucun faux paiement.
 */
export const billing = {
  /** Nom légal affiché dans les conditions générales (exigé par Paddle). */
  legalName: "BRAHIM ABD EL JELIL",
  tradeName: "IT-RIM",
  city: "Nouakchott, Mauritanie",
  /** Prix d'une licence mensuelle, par logiciel. */
  monthlyPrice: 25,
  currency: "USD" as const,
  currencySymbol: "$",
  /** Délai de remboursement sans condition, en jours (Paddle : 14 à 90). */
  refundDays: 14,
  paddle: {
    environment: process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? ("sandbox" as const) : ("production" as const),
    clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? null,
  },
};

/** Identifiants de prix Paddle (pri_…), un par logiciel. */
export const paddlePriceIds: Record<string, string | null> = {
  mouhassib: "pri_01m7z5eb70sx3ap12dwemc2zj4",
  "mouhassib-pro": "pri_01m7z5jrwwn9p2jyccwj72wrb4",
  waqood: "pri_01m7z5m531cfcjraa183mcaxd0",
  manzeel: "pri_01m7z5zw48fbpzxfzyafad0nba",
  raqib: "pri_01m7z610bny09scn43h3j4jr7n",
  gestphone: null, // retiré de la vente en ligne pour l'instant (prix Paddle : pri_01m7z628sd8xvjsyhe0pczhyjs)
  mbourou: null, // retiré de la vente en ligne pour l'instant (prix Paddle : pri_01m7z63at2fze0mp3cmb1r9eh1)
};

export const priceIdOf = (slug: string) => paddlePriceIds[slug] ?? null;

/** Logiciels proposés à la vente en ligne, dans l'ordre du catalogue (ceux qui ont un prix Paddle). */
export const sellableProducts = products.filter((p) => p.status === "available" && Boolean(priceIdOf(p.slug)));

/** Vrai quand le paiement en ligne est prêt pour ce logiciel (jeton + identifiant de prix). */
export const canBuyOnline = (slug: string) => Boolean(billing.paddle.clientToken && priceIdOf(slug));
