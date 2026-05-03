import puppeteer from 'puppeteer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, '.mobile-shots');
await mkdir(outDir, { recursive: true });

const url = process.argv[2] ?? 'http://localhost:4321/';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const devices = [
  { name: 'iphone-se', width: 375, height: 667 },
  { name: 'iphone-12', width: 390, height: 844 },
  { name: 'galaxy-s8', width: 360, height: 740 },
];

for (const d of devices) {
  const page = await browser.newPage();
  await page.setViewport({
    width: d.width,
    height: d.height,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Full page screenshot
  await page.screenshot({
    path: path.join(outDir, `${d.name}-full.png`),
    fullPage: true,
  });

  // Above-the-fold (just the visible viewport)
  await page.screenshot({
    path: path.join(outDir, `${d.name}-fold.png`),
    fullPage: false,
  });

  console.log(`✓ ${d.name} (${d.width}x${d.height})`);
  await page.close();
}

await browser.close();
