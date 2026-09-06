import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The scroll engine, ported verbatim from the reference site. Reformatting
    // or "fixing" it would change tuned scroll maths, so it is not linted.
    "src/lib/site/**",
  ]),
  {
    // next/image wraps images in its own element and rewrites their styles,
    // which breaks the ported CSS's descendant selectors and its measured
    // layout, so plain <img> is correct here and the rule is off for the page's
    // own components only.
    files: ["src/components/site/**/*.tsx"],
    rules: { "@next/next/no-img-element": "off" },
  },
]);

export default eslintConfig;
