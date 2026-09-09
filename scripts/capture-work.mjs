/**
 * Generates SVG placeholders and attempts live screenshots for portfolio sites.
 * Usage: node scripts/capture-work.mjs
 */
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "work");

const projects = [
  { slug: "bettys-rooste", name: "Betty's Rooste", url: "https://bettysrooste.com", cat: "Restaurant" },
  { slug: "christinas-beauty-room", name: "Christina's Beauty Room", url: "https://christinasbeautyroom.com", cat: "Beauty" },
  { slug: "ckm-travel", name: "CKM Travel", url: "https://ckmtravel.com", cat: "Travel" },
  { slug: "eat-drink-work-play", name: "Eat. Drink. Work. Play.", url: "https://eatdrinkworkplay.com", cat: "Lifestyle" },
  { slug: "live-a-life-explored", name: "Live a Life Explored", url: "https://livealifeexplored.com", cat: "Travel" },
  { slug: "lynn-balter", name: "Lynn Balter", url: "https://lynnbalter.com", cat: "Author" },
  { slug: "southwest-insurance", name: "Southwest Insurance", url: "https://southwestinsurancesolutions.net", cat: "Insurance" },
  { slug: "novi-foundation", name: "Novi Foundation", url: "https://thenovifoundationforcures.org", cat: "Nonprofit" },
  { slug: "tr-fitness", name: "TR Fitness Centers", url: "https://trfitnesscenters.com", cat: "Fitness" },
  { slug: "wade-weber", name: "Wade Weber", url: "https://wadeweber.com", cat: "Artist" },
  { slug: "sibhub", name: "SibHub", url: "https://yoursibhub.com", cat: "Community" },
];

function placeholderSvg(name, cat) {
  const safe = name.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f7f4ef"/>
      <stop offset="100%" stop-color="#e8e4dc"/>
    </linearGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#g)"/>
  <rect x="80" y="80" width="1440" height="840" fill="none" stroke="#1c1c1c" stroke-opacity="0.08" stroke-width="2"/>
  <circle cx="1400" cy="200" r="120" fill="#27C7CD" fill-opacity="0.2"/>
  <text x="120" y="200" font-family="Georgia, serif" font-size="28" fill="#6b6b6b" letter-spacing="4">${cat.toUpperCase()}</text>
  <text x="120" y="320" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="#1c1c1c">${safe}</text>
  <text x="120" y="900" font-family="ui-monospace, monospace" font-size="22" fill="#27C7CD">buselworks</text>
</svg>`;
}

mkdirSync(outDir, { recursive: true });

for (const p of projects) {
  const svgPath = join(outDir, `${p.slug}.svg`);
  if (!existsSync(join(outDir, `${p.slug}.jpg`))) {
    writeFileSync(svgPath, placeholderSvg(p.name, p.cat));
    console.log("placeholder", p.slug);
  }
}

async function capture() {
  let playwright;
  try {
    playwright = await import("playwright");
  } catch {
    console.log("Playwright not installed — placeholders only. Run: npm i -D playwright && npx playwright install chromium");
    return;
  }

  const browser = await playwright.chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  for (const p of projects) {
    const out = join(outDir, `${p.slug}.jpg`);
    try {
      console.log("capturing", p.url);
      await page.goto(p.url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(2500);
      // Hide common cookie banners when possible
      await page.evaluate(() => {
        const selectors = [
          "#onetrust-banner-sdk",
          ".cc-window",
          "[class*='cookie']",
          "[id*='cookie']",
          "[aria-label*='cookie' i]",
        ];
        for (const sel of selectors) {
          document.querySelectorAll(sel).forEach((el) => {
            el.style.display = "none";
          });
        }
      });
      await page.screenshot({ path: out, type: "jpeg", quality: 82, clip: { x: 0, y: 0, width: 1440, height: 900 } });
      console.log("saved", p.slug);
    } catch (err) {
      console.warn("failed", p.slug, err.message);
    }
  }

  await browser.close();
}

capture().catch((e) => {
  console.warn(e);
  process.exitCode = 0;
});
