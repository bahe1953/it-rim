/** Coordonnées officielles d'IT-RIM, réutilisées dans le header, le footer, le contact et les données structurées. */
export const site = {
  name: "IT-RIM",
  email: "contact@it-rim.net",
  whatsappDisplay: "+222 43 45 92 22",
  whatsappNumber: "22243459222",
  whatsappUrl: "https://wa.me/22243459222",
  /** Réseaux sociaux : renseigner les URL réelles. Un réseau sans URL n'est pas affiché. */
  social: {
    linkedin: null as string | null,
    youtube: null as string | null,
    facebook: null as string | null,
  },
  /** Technologies affichées dans la section « Nos outils » : ne garder que celles réellement utilisées. */
  technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Electron", "APIs", "IA"],
};
