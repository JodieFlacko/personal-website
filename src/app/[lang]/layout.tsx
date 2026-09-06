import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";

// The page is styled entirely by the ported scrollcraft/home stylesheets, which
// ship their own reset. Tailwind's preflight is deliberately not loaded here so
// it cannot fight them; a future route that wants Tailwind can import
// ../globals.css from its own layout.
import "@/styles/site/scrollcraft.css";
import "@/styles/site/home.css";
import "@/styles/site/fonts.css";

import { getDictionary, hasLocale } from "@/content/dictionaries";
import { LOCALES, SITE_URL } from "@/content/shared";

// Inter with the optical-size axis: opsz,wght@14..32,400..800
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  display: "swap",
  variable: "--font-inter",
});

/** Both locales are prerendered. `[lang]` sits above the root layout, which is
 *  what makes `lang` a root parameter and lets any Server Component read it. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { meta } = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    keywords: [...meta.keywords],
    authors: [{ name: "Giuseppe Ciccone" }],
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        it: "/it",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "profile",
      locale: lang === "it" ? "it_IT" : "en_GB",
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: `/${lang}`,
    },
    twitter: { card: "summary_large_image" },
    // The three source favicons belonged to the cloned site and were deleted.
    // Next's own src/app/favicon.ico convention serves /favicon.ico until
    // Giuseppe supplies a real mark; a proper icon set is still outstanding.
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={inter.variable}>
      <body>
        {/* A refresh must land on the hero: restoring a mid-page position
            paints the pinned acts before the engine has laid them out.
            beforeInteractive puts this in the initial HTML, ahead of any
            Next.js module and any hydration, which is the earliest the App
            Router offers. */}
        <Script
          id="nh-scroll-restoration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "if('scrollRestoration' in history)history.scrollRestoration='manual';if(location.hash==='')scrollTo(0,0);",
          }}
        />
        {children}
      </body>
    </html>
  );
}
