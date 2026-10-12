"use client";

import type { ReactNode } from "react";

/** Lien de téléchargement qui compte le clic (POST /api/download-request) sans bloquer le téléchargement. */
export default function TrackedDownload({ href, produit, className, children }: { href: string; produit: string; className?: string; children: ReactNode }) {
  const track = () => {
    try {
      fetch("/api/download-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produit }),
        keepalive: true,
      }).catch(() => {});
    } catch {}
  };
  return <a href={href} onClick={track} className={className}>{children}</a>;
}
