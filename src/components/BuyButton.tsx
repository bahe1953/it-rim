"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import type { Locale } from "@/i18n/config";

type PaddleGlobal = {
  Environment: { set: (env: "sandbox") => void };
  Initialize: (opts: { token: string }) => void;
  Checkout: {
    open: (opts: {
      items: { priceId: string; quantity: number }[];
      settings?: { displayMode?: "overlay"; locale?: string; theme?: "light" };
    }) => void;
  };
};

declare global {
  interface Window {
    Paddle?: PaddleGlobal;
    __paddleReady?: boolean;
  }
}

type Props = {
  lang: Locale;
  label: string;
  /** Identifiant de prix Paddle (pri_…). null = pas encore de paiement en ligne. */
  priceId: string | null;
  clientToken: string | null;
  environment: "sandbox" | "production";
  /** Page de repli quand le paiement en ligne n'est pas encore activé. */
  fallbackHref: string;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Bouton « Acheter » : ouvre le paiement Paddle (carte, Google Pay, Apple Pay, PayPal) dans une fenêtre
 * superposée. Sans jeton ni identifiant de prix, c'est un simple lien vers la demande de licence.
 */
export default function BuyButton({ lang, label, priceId, clientToken, environment, fallbackHref, className = "btn btn-acc", children }: Props) {
  const [ready, setReady] = useState(false);

  if (!priceId || !clientToken) {
    return <Link href={fallbackHref} className={className}>{children}{label}</Link>;
  }

  const init = () => {
    const P = window.Paddle;
    if (!P) return;
    if (!window.__paddleReady) {
      if (environment === "sandbox") P.Environment.set("sandbox");
      P.Initialize({ token: clientToken });
      window.__paddleReady = true;
    }
    setReady(true);
  };

  const open = () => {
    window.Paddle?.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      settings: { displayMode: "overlay", locale: lang, theme: "light" },
    });
  };

  return (
    <>
      <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" strategy="afterInteractive" onReady={init} />
      <button type="button" onClick={open} disabled={!ready} className={className} aria-busy={!ready}>
        {children}{label}
      </button>
    </>
  );
}
