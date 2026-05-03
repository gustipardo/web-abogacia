import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 375, height: 667 });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

const data = await page.evaluate(() => {
  const grid = document.querySelector('.articles-grid');
  // Get the *applied* styles for grid by walking through stylesheet rules
  const applied = [];
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch (e) { continue; }
    for (const r of rules) {
      if (r.constructor.name === 'CSSMediaRule') {
        if (window.matchMedia(r.conditionText).matches) {
          for (const sub of r.cssRules) {
            try { if (grid.matches(sub.selectorText)) applied.push('@media: ' + sub.cssText.slice(0,200)); } catch(e){}
          }
        }
      } else if (r.constructor.name === 'CSSStyleRule') {
        try { if (grid.matches(r.selectorText)) applied.push(r.cssText.slice(0,200)); } catch(e){}
      }
    }
  }
  return {
    gridCols: getComputedStyle(grid).gridTemplateColumns,
    appliedRules: applied,
  };
});
console.log(JSON.stringify(data, null, 2));

// Scroll to articles and take viewport screenshot
await page.evaluate(() => document.getElementById('articulos').scrollIntoView());
await new Promise(r => setTimeout(r, 300));
await page.screenshot({ path: '.mobile-shots/articulos-viewport.png', fullPage: false });

await browser.close();
