import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";
import { isStoreHost, storePaths } from "@/content/store";

/** Choisit la langue : cookie de préférence, puis en-tête Accept-Language, sinon français. */
function pickLocale(request: NextRequest): Locale {
  const saved = request.cookies.get("lang")?.value;
  if (saved && hasLocale(saved)) return saved;
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const hit = ranked.find((r) => hasLocale(r.lang));
  return hit ? (hit.lang as Locale) : defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const store = isStoreHost(request.headers.get("host") ?? "");

  // Les pages de la boutique ne s'ouvrent que sur son propre domaine, sans le préfixe interne.
  if (pathname === "/boutique" || pathname.startsWith("/boutique/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice("/boutique".length) || "/";
    return NextResponse.redirect(url, 307);
  }

  const first = pathname.split("/")[1] ?? "";
  if (!hasLocale(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url, 307);
  }

  if (!store) return;

  // Boutique : seuls les logiciels, les tarifs, les pages légales et le contact ; le reste mène à l'accueil.
  if (!storePaths.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${first}`;
    return NextResponse.redirect(url, 307);
  }
  const url = request.nextUrl.clone();
  url.pathname = `/boutique${pathname.replace(/\/$/, "")}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
