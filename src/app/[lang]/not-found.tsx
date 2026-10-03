"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const ar = (usePathname() ?? "").startsWith("/ar");
  return (
    <section className="sec">
      <div className="wrap grid max-w-xl justify-items-start gap-4">
        <p className="eyebrow">404</p>
        <h1 className="text-4xl">{ar ? "الصفحة غير موجودة" : "Page introuvable"}</h1>
        <p className="sub">{ar ? "هذه الصفحة غير موجودة أو تم نقلها." : "Cette page n'existe pas ou a été déplacée."}</p>
        <Link href={ar ? "/ar" : "/fr"} className="btn btn-p">{ar ? "العودة إلى الرئيسية" : "Retour à l'accueil"}</Link>
      </div>
    </section>
  );
}
