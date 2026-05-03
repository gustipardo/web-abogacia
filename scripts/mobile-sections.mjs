import puppeteer from 'puppeteer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, '.mobile-shots/sections');
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({
  width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
});
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

// Check for horizontal overflow
const overflow = await page.evaluate(() => {
  const html = document.documentElement;
  const body = document.body;
  return {
    docWidth: html.scrollWidth,
    bodyWidth: body.scrollWidth,
    viewport: window.innerWidth,
    overflows: html.scrollWidth > window.innerWidth,
  };
});
console.log('Overflow check:', JSON.stringify(overflow));

const sections = ['inicio', 'servicios', 'jubilacion', 'multas', 'sobre-mi', 'articulos', 'contacto'];

for (const id of sections) {
  const el = await page.$(`#${id}`);
  if (!el) { console.log(`× #${id} not found`); continue; }
  const file = path.join(outDir, `${id}.png`);
  await el.screenshot({ path: file });
  console.log(`✓ ${id}`);
}

await browser.close();
