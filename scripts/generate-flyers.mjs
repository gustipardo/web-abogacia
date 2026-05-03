import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Each flyer is rendered once and copied to all `outs` so caso/, public/
// and any legacy duplicate stay in sync.
const flyers = [
  {
    html: 'Context/casos/Multas/flyer.html',
    outs: [
      'Context/casos/Multas/flyer.png',
      'public/flyer-multas.png',
    ],
  },
  {
    html: 'Context/casos/Jubilacion Docente/flyer.html',
    outs: [
      'Context/casos/Jubilacion Docente/flyer.png',
      'Context/casos/Jubilacion Docente/flyer-jubilacion-estudio-ghetti.png',
      'public/flyer-jubilacion.png',
    ],
  },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

for (const f of flyers) {
  const page = await browser.newPage();
  // Wide viewport so the @media (max-width:1200px){scale 0.6} doesn't trigger.
  await page.setViewport({ width: 1400, height: 4000, deviceScaleFactor: 2 });

  const url = 'file://' + path.join(root, f.html);
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Measure after the final viewport is set so the bbox is accurate.
  const box = await page.evaluate(() => {
    const el = document.querySelector('.flyer');
    const r = el.getBoundingClientRect();
    return { x: r.left, y: r.top, width: r.width, height: r.height };
  });

  const buf = await page.screenshot({
    type: 'png',
    clip: {
      x: box.x,
      y: box.y,
      width: Math.ceil(box.width),
      height: Math.ceil(box.height),
    },
  });

  const fs = await import('node:fs/promises');
  for (const out of f.outs) {
    const outPath = path.join(root, out);
    await fs.writeFile(outPath, buf);
    console.log(`✓ ${out} (${Math.ceil(box.width)}x${Math.ceil(box.height)})`);
  }
  await page.close();
}

await browser.close();
