import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import type { SiteContent } from "@/types/site";

import { LOCALES, type Locale } from "./shared";

/** The dictionary loader, per `next/dist/docs/01-app/02-guides/internationalization.md`.
 *
 *  The locale is resolved internally from the root parameter rather than
 *  drilled through props: `[lang]` sits above the root layout, so every Server
 *  Component on the page can call `getDictionary()` with no arguments.
 *  `next/root-params` is unavailable in Client Components, Server Actions and
 *  Route Handlers — the one client island here (`LocaleSwitch`) reads the
 *  locale off the pathname instead. */

const dictionaries: Record<Locale, () => Promise<SiteContent>> = {
  en: () => import("./en").then((m) => m.en),
  it: () => import("./it").then((m) => m.it),
};

export function hasLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** 404 rather than a runtime error on `/de`. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary(locale?: Locale): Promise<SiteContent> {
  return dictionaries[locale ?? (await getLocale())]();
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ lang: locale }));
}
