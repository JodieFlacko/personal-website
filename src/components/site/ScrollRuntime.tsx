"use client";

import { useEffect } from "react";

/**
 * Boots the ported scroll runtime once the real DOM exists.
 *
 * The three modules are imported dynamically and sequentially rather than at
 * module scope for two reasons: glass.js and scrollcraft.js are IIFEs that read
 * `window` as they evaluate (which would throw during SSR), and the page
 * controller requires both globals to already be installed. Awaiting them in
 * order gives that guarantee — `<Script>` tags in the same strategy group do
 * not.
 *
 * Renders nothing. The engine styles existing markup; it never generates DOM.
 */
export function ScrollRuntime() {
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      await import("@/lib/site/glass.js");
      await import(
        "@/lib/site/scrollcraft.js"
      );
      const { mountHome } = await import(
        "@/lib/site/home-runtime.js"
      );
      if (cancelled) return;
      mountHome();
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
