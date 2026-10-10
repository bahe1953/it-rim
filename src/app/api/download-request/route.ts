import { products } from "@/content/products";

/**
 * POST /api/download-request — compte un téléchargement d'application.
 * Si GOOGLE_SHEET_WEBHOOK_URL est défini, chaque téléchargement est ajouté au Google Sheet
 * (via la Google Apps Script existante). Le téléchargement lui-même ne dépend pas de cet appel.
 *
 * Protections (cette route n'a pas de compte utilisateur : ce sont des garde-fous, pas une authentification) :
 *  - seuls les produits du catalogue sont acceptés (`<slug>` ou `<slug>-fr` / `<slug>-ar`) ;
 *  - corps limité à 1 Ko, JSON uniquement ;
 *  - requêtes venant d'un autre site refusées quand le navigateur indique leur origine ;
 *  - limite par adresse IP (5 par 10 minutes) et plafond global par serveur (300 par heure).
 * Les compteurs sont en mémoire : ils ralentissent les abus sans les rendre impossibles.
 * Pour une limite stricte et partagée entre serveurs, brancher un stockage (Vercel KV / Upstash).
 */

const allowed = new Set(products.flatMap((p) => [p.slug, `${p.slug}-fr`, `${p.slug}-ar`]));
const allowedHosts = new Set(["www.it-rim.net", "it-rim.net", "localhost"]);

const PER_IP = { max: 5, windowMs: 10 * 60_000 };
const GLOBAL = { max: 300, windowMs: 60 * 60_000 };
const hits = new Map<string, number[]>();
let globalHits: number[] = [];

function allow(ip: string, now: number): boolean {
  globalHits = globalHits.filter((t) => now - t < GLOBAL.windowMs);
  if (globalHits.length >= GLOBAL.max) return false;
  const list = (hits.get(ip) ?? []).filter((t) => now - t < PER_IP.windowMs);
  if (list.length >= PER_IP.max) { hits.set(ip, list); return false; }
  list.push(now); hits.set(ip, list); globalHits.push(now);
  if (hits.size > 5_000) hits.clear(); // garde la mémoire bornée
  return true;
}

function sameSite(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // pas d'en-tête Origin : on s'en remet aux autres contrôles
  try {
    const host = new URL(origin).hostname;
    return allowedHosts.has(host) || host.endsWith(".vercel.app") || host === new URL(request.url).hostname;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameSite(request)) return Response.json({ success: false, error: "origin" }, { status: 403 });
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return Response.json({ success: false, error: "type" }, { status: 415 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > 1024) {
    return Response.json({ success: false, error: "size" }, { status: 413 });
  }

  let produit = "";
  try {
    const raw = await request.text();
    if (raw.length > 1024) return Response.json({ success: false, error: "size" }, { status: 413 });
    const body = JSON.parse(raw);
    if (typeof body?.produit === "string") produit = body.produit.trim().toLowerCase();
  } catch {
    return Response.json({ success: false, error: "json" }, { status: 400 });
  }
  if (!allowed.has(produit)) return Response.json({ success: false, error: "produit" }, { status: 400 });

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "inconnu";
  if (!allow(ip, Date.now())) {
    return Response.json({ success: false, error: "limite" }, { status: 429, headers: { "Retry-After": "600" } });
  }

  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (url) {
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: "", email: "", telephone: "", ville: "", produit, date: new Date().toISOString() }),
      });
    } catch {}
  }
  return Response.json({ success: true });
}
