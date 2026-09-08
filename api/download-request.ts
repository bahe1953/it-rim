// Vercel Serverless Function
// POST /api/download-request
// Recoit : { nom, email, telephone, ville, produit }
//
// 1) Enregistre le lead dans un Google Sheet (via une Apps Script Web App, gratuit,
//    utilise le compte Gmail existant d'IT-RIM -- voir GOOGLE_SHEET_WEBHOOK_URL).
// 2) Envoie un email de confirmation via Resend (RESEND_API_KEY).
// Le telechargement du logiciel se declenche cote client immediatement apres
// la soumission du formulaire : il ne depend pas du succes de cet email.

async function enregistrerDansGoogleSheet(lead: Record<string, string>) {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) {
    console.warn('[LEAD] GOOGLE_SHEET_WEBHOOK_URL non configuree - lead non sauvegarde dans le Sheet.');
    return { ok: false, skipped: true };
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, date: new Date().toISOString() }),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error('[LEAD] Erreur envoi Google Sheet :', err);
    return { ok: false, error: String(err) };
  }
}

async function envoyerEmailConfirmation(lead: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[LEAD] RESEND_API_KEY non configuree - email de confirmation non envoye.');
    return { ok: false, skipped: true };
  }
  const from = process.env.RESEND_FROM || 'IT-RIM <onboarding@resend.dev>';
  const downloadUrl = process.env.MOUHASSIB_DOWNLOAD_URL || 'https://it-rim.net/mouhassib#telecharger';

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: lead.email,
        subject: 'Votre telechargement Mouhassib - IT-RIM',
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
            <h2>Merci ${lead.nom} !</h2>
            <p>Votre telechargement de <strong>Mouhassib</strong> a bien demarre depuis votre navigateur.</p>
            <p>Si le telechargement ne s'est pas lance automatiquement, cliquez ici :</p>
            <p><a href="${downloadUrl}" style="display:inline-block;padding:12px 20px;background:#0891b2;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">Telecharger Mouhassib</a></p>
            <p>Votre essai gratuit de 30 jours commence des l'installation. Besoin d'aide ? Repondez a cet email ou ecrivez-nous sur WhatsApp au +222 43 45 92 22.</p>
            <p>-- L'equipe IT-RIM</p>
          </div>
        `,
      }),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error('[LEAD] Erreur envoi Resend :', err);
    return { ok: false, error: String(err) };
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nom, email, telephone, ville, produit } = req.body || {};

  if (!nom || !email || !telephone) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }

  // Validation email basique
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }

  const lead = { nom, email, telephone: telephone || '', ville: ville || '', produit: produit || 'mouhassib' };

  console.log('[LEAD] Nouveau telechargement demande :', lead);

  const [sheet, mail] = await Promise.all([
    enregistrerDansGoogleSheet(lead),
    envoyerEmailConfirmation(lead),
  ]);

  return res.status(200).json({
    success: true,
    message: 'Demande enregistree.',
    sheet: sheet.ok,
    email: mail.ok,
  });
}
