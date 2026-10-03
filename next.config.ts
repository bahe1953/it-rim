import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
