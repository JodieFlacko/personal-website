// Downloads every image/SEO asset for the nateherk.com root-page clone into its
// namespaced public/ directory. Batched 4 at a time. Idempotent — re-running
// overwrites with a fresh copy.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const ORIGIN = "https://www.nateherk.com";
const OUT_ROOT = "public/sites/www-nateherk-com-dfc5c2e7/root-8a5edab2";

/** @type {Array<[string, string]>} [remote path, local path relative to OUT_ROOT] */
const ASSETS = [
  // Brand + SEO
  ["/scroll/assets/logo.png", "images/logo.png"],
  ["/scroll/assets/signature.png", "images/signature.png"],
  ["/scroll/assets/favicon-32.png", "seo/favicon-32.png"],
  ["/scroll/assets/icon-512.png", "seo/icon-512.png"],
  ["/scroll/assets/apple-touch-icon.png", "seo/apple-touch-icon.png"],

  // Hero
  ["/scroll/assets/portrait-speaking.webp", "images/portrait-speaking.webp"],

  // Trust row logos
  ["/scroll/assets/logos/microsoft.webp", "images/logos/microsoft.webp"],
  ["/scroll/assets/logos/n8n.webp", "images/logos/n8n.webp"],
  ["/scroll/assets/logos/skool.webp", "images/logos/skool.webp"],
  ["/scroll/assets/logos/apify.webp", "images/logos/apify.webp"],
  ["/scroll/assets/logos/forbes.webp", "images/logos/forbes.webp"],
  ["/scroll/assets/logos/linkedin.webp", "images/logos/linkedin.webp"],
  ["/scroll/assets/logos/hostinger.webp", "images/logos/hostinger.webp"],
  ["/scroll/assets/logos/n8n-expert-badge.webp", "images/logos/n8n-expert-badge.webp"],

  // Recognition ring
  ["/scroll/assets/skool-win.webp", "images/skool-win.webp"],

  // Story
  ["/scroll/assets/grad.webp", "images/grad.webp"],
  ["/scroll/assets/office.webp", "images/office.webp"],

  // Rooms rail
  ["/scroll/assets/workless.webp", "images/workless.webp"],
  ["/scroll/assets/speaking-stage.webp", "images/speaking-stage.webp"],
  ["/scroll/assets/speaking-mic.webp", "images/speaking-mic.webp"],
  ["/scroll/assets/book-hand.webp", "images/book-hand.webp"],
  ["/scroll/assets/africai.webp", "images/africai.webp"],
  ["/scroll/assets/montenegro.webp", "images/montenegro.webp"],

  // Book
  ["/scroll/assets/book-cover.webp", "images/book-cover.webp"],
];

const BATCH = 4;

async function fetchOne([remote, local]) {
  const url = ORIGIN + remote;
  const dest = join(OUT_ROOT, local);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  return { local, bytes: buf.length, type: res.headers.get("content-type") };
}

const ok = [];
const failed = [];

for (let i = 0; i < ASSETS.length; i += BATCH) {
  const slice = ASSETS.slice(i, i + BATCH);
  const results = await Promise.allSettled(slice.map(fetchOne));
  results.forEach((r, j) => {
    if (r.status === "fulfilled") {
      ok.push(r.value);
      console.log(`  ok  ${r.value.local.padEnd(42)} ${String(r.value.bytes).padStart(8)} b  ${r.value.type}`);
    } else {
      failed.push({ asset: slice[j][0], error: String(r.reason) });
      console.error(`  FAIL ${slice[j][0]}: ${r.reason}`);
    }
  });
}

console.log(`\n${ok.length}/${ASSETS.length} downloaded, ${failed.length} failed.`);
if (failed.length) process.exitCode = 1;
