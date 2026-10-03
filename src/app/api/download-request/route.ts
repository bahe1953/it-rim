/**
 * POST /api/download-request — compte un téléchargement d'application.
 * Reprend le fonctionnement du site actuel : si GOOGLE_SHEET_WEBHOOK_URL est défini,
 * chaque téléchargement est ajouté au Google Sheet (via la Google Apps Script existante).
 * Le téléchargement lui-même ne dépend pas de cet appel.
 */
export async function POST(request: Request) {
  let produit = "inconnu";
  try {
    const body = await request.json();
    if (typeof body?.produit === "string") produit = body.produit.slice(0, 40);
  } catch {}

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
