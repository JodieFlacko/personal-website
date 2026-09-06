"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCALES, LOCALE_LABELS, type Locale } from "@/content/shared";

/**
 * The one client island on the page.
 *
 * `next/root-params` cannot be read in a Client Component, and this needs the
 * current path to build the other locale's URL, so the locale is recovered
 * from the pathname instead. Everything else on the page stays a Server
 * Component.
 */
export function LocaleSwitch({ label }: { label: string }) {
  const pathname = usePathname();
  const current =
    LOCALES.find(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
    ) ?? LOCALES[0];
  // Everything after the locale segment, so a future /it/qualcosa switches in
  // place rather than dropping the reader back on the home page.
  const rest = pathname.slice(`/${current}`.length);

  return (
    <span className="nh-lang" aria-label={label} role="group">
      {LOCALES.map((locale: Locale) =>
        locale === current ? (
          <span key={locale} className="nh-lang__on" aria-current="true">
            {LOCALE_LABELS[locale].short}
          </span>
        ) : (
          <Link
            key={locale}
            href={`/${locale}${rest}`}
            hrefLang={locale}
            title={LOCALE_LABELS[locale].full}
          >
            {LOCALE_LABELS[locale].short}
          </Link>
        ),
      )}
    </span>
  );
}
