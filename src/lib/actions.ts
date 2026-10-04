"use server";

import { z } from "zod";

/**
 * Réception des formulaires (contact, essai, licence, alerte de téléchargement, newsletter).
 *
 * Aucun backend n'est imposé. L'envoi se configure par variables d'environnement :
 *  - RESEND_API_KEY (+ CONTACT_TO, défaut contact@it-rim.net ; + RESEND_FROM ou CONTACT_FROM) : envoi par email via l'API Resend,
 *    avec les mêmes variables que le site actuel sur Vercel ;
 *  - CONTACT_WEBHOOK_URL : POST JSON vers un webhook (Make, n8n, Supabase Edge Function, etc.) ;
 *  - GOOGLE_SHEET_WEBHOOK_URL : copie de chaque demande dans le Google Sheet existant (filet de sécurité).
 * Tous les canaux configurés sont utilisés ; la demande est acceptée si au moins un l'a reçue.
 * Sans configuration, le formulaire répond « not_configured » et invite à écrire sur WhatsApp :
 * aucune demande n'est perdue silencieusement.
 */

const kinds = ["project", "trial", "license", "notify", "newsletter"] as const;

const schema = z
  .object({
    kind: z.enum(kinds),
    lang: z.enum(["fr", "ar"]),
    name: z.string().trim().max(120).optional().default(""),
    company: z.string().trim().max(160).optional().default(""),
    phone: z.string().trim().max(40).optional().default(""),
    email: z.union([z.literal(""), z.string().trim().email().max(160)]).optional().default(""),
    types: z.array(z.string().max(80)).max(10).optional().default([]),
    product: z.string().trim().max(40).optional().default(""),
    message: z.string().trim().max(4000).optional().default(""),
    website: z.string().max(0).optional().default(""), // champ piège anti-robots
  })
  .superRefine((v, ctx) => {
    if (v.kind !== "newsletter" && v.kind !== "notify" && !v.name) ctx.addIssue({ code: "custom", path: ["name"], message: "required" });
    if (v.kind === "newsletter" && !v.email) ctx.addIssue({ code: "custom", path: ["email"], message: "required" });
    if (!v.phone && !v.email) ctx.addIssue({ code: "custom", path: ["phone"], message: "contact" });
  });

export type FormState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "not_configured" }
  | { status: "invalid"; fields: Record<string, string> }
  | { status: "error" };

export async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = {
    kind: formData.get("kind"),
    lang: formData.get("lang"),
    name: formData.get("name") ?? "",
    company: formData.get("company") ?? "",
    phone: formData.get("phone") ?? "",
    email: formData.get("email") ?? "",
    types: formData.getAll("types"),
    product: formData.get("product") ?? "",
    message: formData.get("message") ?? "",
    website: formData.get("website") ?? "",
  };
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fields[key] = key === "email" && issue.message !== "required" ? "email" : issue.message;
    }
    return { status: "invalid", fields };
  }
  const data = parsed.data;

  const subject = `[IT-RIM] ${data.kind}${data.product ? ` · ${data.product}` : ""} · ${data.name || data.email}`;
  const text = [
    `Type : ${data.kind}`,
    data.product && `Application : ${data.product}`,
    `Langue : ${data.lang}`,
    data.name && `Nom : ${data.name}`,
    data.company && `Entreprise : ${data.company}`,
    data.phone && `Téléphone / WhatsApp : ${data.phone}`,
    data.email && `Email : ${data.email}`,
    data.types.length ? `Type de projet : ${data.types.join(", ")}` : "",
    data.message && `\n${data.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  // Chaque canal configuré est tenté ; la demande est acceptée dès qu'un canal l'a bien reçue.
  const results: boolean[] = [];

  if (process.env.RESEND_API_KEY) {
    const to = (process.env.CONTACT_TO ?? "contact@it-rim.net").split(",").map((s) => s.trim()).filter(Boolean);
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? process.env.RESEND_FROM ?? "IT-RIM <onboarding@resend.dev>",
          to,
          reply_to: data.email || undefined,
          subject,
          text,
        }),
      });
      if (!res.ok) console.error("[FORM] Resend a refusé l'envoi :", res.status, await res.text().catch(() => ""));
      results.push(res.ok);
    } catch (err) {
      console.error("[FORM] Erreur Resend :", err);
      results.push(false);
    }
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      const res = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, subject, receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) console.error("[FORM] Webhook en erreur :", res.status);
      results.push(res.ok);
    } catch (err) {
      console.error("[FORM] Erreur webhook :", err);
      results.push(false);
    }
  }

  // Copie de secours dans le Google Sheet déjà utilisé par le site (colonnes Date, Nom, Email, Telephone, Ville, Produit).
  if (process.env.GOOGLE_SHEET_WEBHOOK_URL) {
    try {
      const res = await fetch(process.env.GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: new Date().toISOString(),
          nom: data.name,
          email: data.email,
          telephone: data.phone,
          ville: data.company,
          produit: `[${data.kind}]${data.product ? ` ${data.product}` : ""}${data.types.length ? ` (${data.types.join(", ")})` : ""}${data.message ? ` : ${data.message}` : ""}`.slice(0, 4500),
        }),
      });
      if (!res.ok) console.error("[FORM] Google Sheet en erreur :", res.status);
      results.push(res.ok);
    } catch (err) {
      console.error("[FORM] Erreur Google Sheet :", err);
      results.push(false);
    }
  }

  if (results.length === 0) return { status: "not_configured" };
  return results.some(Boolean) ? { status: "ok" } : { status: "error" };
}
