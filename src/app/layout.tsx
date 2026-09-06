import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

// The clone is styled entirely by the ported scrollcraft/home stylesheets, which
// ship their own reset. Tailwind's preflight is deliberately not loaded here so
// it cannot fight them; a future route that wants Tailwind can import
// ./globals.css from its own layout.
import "@/styles/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/scrollcraft.css";
import "@/styles/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/home.css";
import "@/styles/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/fonts.css";

// Source page loads Inter with the optical-size axis: opsz,wght@14..32,400..800
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nateherk.com"),
  title: "Nate Herk · AI automation made easy",
  description:
    "Nate Herk is a 24-year-old AI automation creator, n8n expert and educator based in Chicago. He teaches founders and operators to build AI agents and automations, leads AI Automation Society, and wrote the #1 bestseller Becoming AI Native.",
  keywords: [
    "Nate Herk",
    "Nate Herkelman",
    "AI automation",
    "n8n expert",
    "AI agents",
    "workflow automation",
    "no-code automation",
    "AI automation agency",
    "AI Automation Society",
    "Becoming AI Native",
  ],
  authors: [{ name: "Nate Herk" }],
  alternates: { canonical: "https://nateherk.com" },
  openGraph: {
    type: "profile",
    title: "Nate Herk · AI automation made easy",
    description:
      "AI automation creator, n8n expert and educator. 950,000 YouTube subscribers, 450,000 in AI Automation Society, and the #1 bestseller Becoming AI Native.",
    url: "https://nateherk.com",
  },
  twitter: { card: "summary_large_image", site: "@nateherk" },
  icons: {
    icon: [
      {
        url: "/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/seo/favicon-32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/seo/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2/seo/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Ported verbatim from the source page's head script. A refresh must
            land on the hero: restoring a mid-page position paints the pinned
            acts before the engine has laid them out. beforeInteractive puts it
            in the initial HTML, ahead of any Next.js module and any hydration,
            which is the earliest the App Router offers. */}
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
