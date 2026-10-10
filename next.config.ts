import type { NextConfig } from "next";

/**
 * En-têtes de sécurité appliqués à toutes les pages.
 * La politique de contenu (CSP) n'autorise que le site lui-même, plus Google Fonts
 * (utilisé par la page de présentation RAQIB). Les liens vers WhatsApp et GitHub sont
 * de simples liens de navigation : ils ne sont pas concernés.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Anciennes adresses du site actuel, redirigées vers les nouvelles pages bilingues.
  async redirects() {
    return [
      { source: "/mouhassib-fr", destination: "/fr/applications/mouhassib", permanent: true },
      { source: "/mouhassib-ar", destination: "/ar/applications/mouhassib", permanent: true },
      { source: "/mouhassib", destination: "/ar/applications/mouhassib", permanent: true },
      { source: "/essai", destination: "/fr/applications/mouhassib#telecharger", permanent: false },
      { source: "/manzeel", destination: "/fr/applications/manzeel", permanent: true },
      { source: "/logiciels/waqood", destination: "/fr/applications/waqood", permanent: true },
      { source: "/logiciels/raqib", destination: "/fr/applications/raqib", permanent: true },
      { source: "/logiciels", destination: "/fr/applications", permanent: true },
      { source: "/contact", destination: "/fr/contact", permanent: true },
    ];
  },
};

export default nextConfig;
