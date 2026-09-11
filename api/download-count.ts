// Vercel Serverless Function
// GET /api/download-count
// Lit le nombre total de telechargements enregistres dans le Google Sheet
// (via la fonction doGet() de l'Apps Script) et le renvoie au site.

export default async function handler(req: any, res: any) {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    return res.status(200).json({ count: null });
  }
  try {
    const r = await fetch(url);
    const data = await r.json();
    const count = typeof data.count === 'number' ? data.count : null;
    return res.status(200).json({ count });
  } catch (err) {
    console.error('[COUNT] Erreur lecture compteur :', err);
    return res.status(200).json({ count: null });
  }
}
