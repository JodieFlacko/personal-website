import { NextResponse, type NextRequest } from "next/server";

/** Sends a bare `/` to a locale.
 *
 *  `proxy` — not `middleware`: the middleware file convention is deprecated in
 *  Next 16 and renamed. Kept self-contained on purpose (proxy can be deployed
 *  to the CDN separately from the render path, so it should not lean on shared
 *  application modules), which is why the two locales are repeated here.
 *
 *  The match is a first-tag `accept-language` sniff rather than
 *  `negotiator` + `@formatjs/intl-localematcher`: with exactly two locales and
 *  a visible switch in the nav, two dependencies buy nothing. */

const LOCALES = ["en", "it"] as const;
const DEFAULT_LOCALE = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const preferred =
    request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase() ?? "";
  const locale = preferred.startsWith("it") ? "it" : DEFAULT_LOCALE;

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Everything except Next's own output, the public files and anything with a
  // file extension — a redirect on those would break CSS, JS and images.
  matcher: ["/((?!_next|favicon.ico|.*\\.).*)"],
};
