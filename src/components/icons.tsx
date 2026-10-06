import type { SVGProps } from "react";
import Image from "next/image";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 20, p: P) => ({ width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false as const, ...p });
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const Arrow = ({ size = 16, ...p }: P) => (
  <span className="flip"><svg {...base(size, p)} {...stroke} strokeWidth={2.2}><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
);
export const Check = ({ size = 16, ...p }: P) => <svg {...base(size, p)} {...stroke} strokeWidth={2.4}><path d="M5 12.5l4.2 4.2L19 7" /></svg>;
export const Flask = ({ size = 17, ...p }: P) => <svg {...base(size, p)} {...stroke}><path d="M9 3h6M10 3v6L4.8 18.2A2 2 0 0 0 6.5 21h11a2 2 0 0 0 1.7-2.8L14 9V3M7.5 15h9" /></svg>;
export const Grid = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)} fill="currentColor"><rect x="3" y="3" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="2" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="2" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" /></svg>
);
export const Play = ({ size = 12, ...p }: P) => <svg {...base(size, p)} fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>;
export const Globe = ({ size = 18, ...p }: P) => <svg {...base(size, p)} {...stroke}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></svg>;
export const Shield = ({ size = 18, ...p }: P) => <svg {...base(size, p)} {...stroke}><path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>;
export const Users = ({ size = 18, ...p }: P) => <svg {...base(size, p)} {...stroke}><circle cx="9" cy="8" r="3.2" /><path d="M3 19c.8-3.2 3.2-5 6-5s5.2 1.8 6 5" /><circle cx="17.5" cy="9" r="2.5" /><path d="M16 14.2c2.6-.3 4.6 1.4 5 4.3" /></svg>;
export const Layers = ({ size = 28, ...p }: P) => <svg {...base(size, p)}><path d="M12 2 2 7l10 5 10-5z" fill="currentColor" /><path d="M2 12l10 5 10-5M2 17l10 5 10-5" {...stroke} /></svg>;
export const Headset = ({ size = 28, ...p }: P) => <svg {...base(size, p)} {...stroke}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" fill="currentColor" /><rect x="17" y="13" width="4" height="6" rx="1.5" fill="currentColor" /><path d="M19 19c0 1.5-1.5 2.5-4 2.5" /></svg>;
export const Growth = ({ size = 28, ...p }: P) => <svg {...base(size, p)}><g fill="currentColor"><rect x="3" y="14" width="3.5" height="7" rx="1" /><rect x="8.5" y="11" width="3.5" height="10" rx="1" /><rect x="14" y="8" width="3.5" height="13" rx="1" /></g><path d="M4 10l6-5 4 3 6-5" {...stroke} /></svg>;
export const Search = ({ size = 26, ...p }: P) => <svg {...base(size, p)} {...stroke} strokeWidth={2.2}><circle cx="10.5" cy="10.5" r="6" /><path d="M15 15l5 5" /></svg>;
export const Bulb = ({ size = 26, ...p }: P) => <svg {...base(size, p)} {...stroke}><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z" /></svg>;
export const Code = ({ size = 26, ...p }: P) => <svg {...base(size, p)} {...stroke} strokeWidth={2.2}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" /></svg>;
export const Rocket = ({ size = 26, ...p }: P) => <svg {...base(size, p)} fill="currentColor"><path d="M14.5 3.5c2.8-.9 5.2-.6 6 .1.7.8 1 3.2.1 6-1 3-3.7 6-6.6 7.7l-1.3 3.3-2.7-2.7-2.6-2.6-2.7-2.7 3.3-1.3c1.7-2.9 4.7-5.6 6.5-7.8zM15.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM6 16c-1.5.5-2.5 2-2.5 4.5C6 20.5 7.5 19.5 8 18z" /></svg>;
export const Monitor = ({ size = 22, ...p }: P) => <svg {...base(size, p)} {...stroke}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4M7 9h10M7 12.5h6" /></svg>;
export const Screen = ({ size = 22, ...p }: P) => <svg {...base(size, p)} {...stroke}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M10 8l3 2-3 2" /></svg>;
export const Network = ({ size = 22, ...p }: P) => <svg {...base(size, p)} {...stroke}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.5 6h7M6 8.5v7M18 8.5v7M8.5 18h7M8 8l8 8" /></svg>;
export const Chip = ({ size = 22, ...p }: P) => <svg {...base(size, p)} {...stroke}><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" /><circle cx="12" cy="12" r="1.6" fill="currentColor" /></svg>;
export const Pin = ({ size = 16, ...p }: P) => <svg {...base(size, p)} {...stroke}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
export const Mail = ({ size = 16, ...p }: P) => <svg {...base(size, p)} {...stroke}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
export const Download = ({ size = 18, ...p }: P) => <svg {...base(size, p)} {...stroke}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>;
export const Windows = ({ size = 18, ...p }: P) => <svg {...base(size, p)} fill="currentColor"><path d="M3 5.5l7.5-1v7H3zM11.5 4.4 21 3v8.5h-9.5zM3 12.5h7.5v7L3 18.5zM11.5 12.5H21V21l-9.5-1.4z" /></svg>;
export const Clock = ({ size = 18, ...p }: P) => <svg {...base(size, p)} {...stroke}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
export const Video = ({ size = 28, ...p }: P) => <svg {...base(size, p)} {...stroke}><rect x="3" y="5" width="13" height="14" rx="2" /><path d="M16 10l5-3v10l-5-3" /></svg>;
export const Plus = ({ size = 18, ...p }: P) => <svg {...base(size, p)} {...stroke}><path d="M12 5v14M5 12h14" /></svg>;
export const WhatsApp = ({ size = 18, ...p }: P) => (
  <svg {...base(size, p)} fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1.9 2 1.2 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.4.2.5.3.1.2.1.7-.2 1.3z" /></svg>
);
export const LinkedIn = ({ size = 16, ...p }: P) => <svg {...base(size, p)} fill="currentColor"><path d="M6.5 8.5h-3V20h3zM5 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.5 13.2c0-3-1.6-4.9-4.2-4.9-1.5 0-2.4.8-2.8 1.5V8.5h-3V20h3v-6.1c0-1.5.6-2.6 2-2.6s1.9 1 1.9 2.6V20h3.1z" /></svg>;
export const YouTube = ({ size = 16, ...p }: P) => <svg {...base(size, p)} fill="currentColor"><path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8zM10 15V9l5.2 3z" /></svg>;
export const Facebook = ({ size = 16, ...p }: P) => <svg {...base(size, p)} fill="currentColor"><path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.2h-3c-3.3 0-4 2.4-4 4v2.3H8V12h2v10h4V12h2.7l.4-3.5z" /></svg>;

/** Pictogrammes des produits */
export const ProductIcon = ({ accent, size = 24 }: { accent: "m" | "w" | "z" | "r" | "p" | "b"; size?: number }) => {
  const b = base(size, {});
  if (accent === "b") return <svg {...b} {...stroke}><ellipse cx="12" cy="12" rx="9.5" ry="5.5" /><path d="M8.5 9.5c.8 1.5.8 3.5 0 5M12 9c.8 1.7.8 4.3 0 6M15.5 9.5c.8 1.5.8 3.5 0 5" /></svg>;
  if (accent === "p") return <svg {...b} {...stroke}><rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></svg>;
  if (accent === "m") return <svg {...b} fill="currentColor"><rect x="4" y="12" width="4" height="8" rx="1" /><rect x="10" y="7" width="4" height="13" rx="1" /><rect x="16" y="3" width="4" height="17" rx="1" /></svg>;
  if (accent === "w") return <svg {...b} {...stroke}><path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12" /><path d="M6.5 7h5v4h-5z" fill="currentColor" fillOpacity={0.3} /><path d="M14 9h2a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3" /></svg>;
  if (accent === "z") return <svg {...b} {...stroke}><path d="M3 4h2.2l2.3 10.5a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2" /><circle cx="9.5" cy="19.5" r="1.4" /><circle cx="17" cy="19.5" r="1.4" /></svg>;
  return (
    <svg {...b} fill="currentColor"><path d="M4 21V9l6-3v15zM11 21V3l9 4v14z" /><g fill="#fff" fillOpacity={0.85}><rect x="6" y="11" width="2" height="2" /><rect x="6" y="15" width="2" height="2" /><rect x="13.5" y="8" width="2" height="2" /><rect x="16.5" y="9" width="2" height="2" /><rect x="13.5" y="12" width="2" height="2" /><rect x="16.5" y="13" width="2" height="2" /><rect x="14.5" y="17" width="3" height="4" /></g></svg>
  );
};

export const Logo = ({ size = 42 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <defs><linearGradient id="itrim-lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#38BDF8" /><stop offset="1" stopColor="#0272B8" /></linearGradient></defs>
    <path d="M14 36a9 9 0 0 1-1.5-17.9A12 12 0 0 1 35.6 16 9 9 0 0 1 35 36" fill="none" stroke="url(#itrim-lg)" strokeWidth="4.2" strokeLinecap="round" />
    <path d="M19 30v-6M24 32v-11M29 30v-6" stroke="url(#itrim-lg)" strokeWidth="4" strokeLinecap="round" />
    <circle cx="24" cy="38" r="3" fill="#0272B8" />
  </svg>
);
export const Close = ({ size = 20, ...p }: P) => <svg {...base(size, p)} {...stroke} strokeWidth={2.4}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const Chevron = ({ size = 20, ...p }: P) => (
  <span className="flip"><svg {...base(size, p)} {...stroke} strokeWidth={2.4}><path d="M9 5l7 7-7 7" /></svg></span>
);

/** Logo officiel IT-RIM (badge rond). */
export const BrandLogo = ({ size = 44, priority = false }: { size?: number; priority?: boolean }) => (
  <Image src="/images/logo-itrim.png" alt="IT-RIM" width={size} height={size} priority={priority}
    className="shrink-0 rounded-full shadow-[0_6px_16px_-6px_rgba(0,60,40,.55)] ring-2 ring-white" />
);
