import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const browser = await puppeteer.launch({
  headless: true, executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
});
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321';
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.evaluateOnNewDocument(() => {
    window.motionCalls = 0;
    window.heroMotion = [];
    const original = Element.prototype.animate;
    Element.prototype.animate = function(...args) {
      window.motionCalls++;
      if(this.matches('.hero-grid h1, .hero-grid .actions')){
        window.heroMotion.push({tag:this.tagName,from:args[0][0].opacity,duration:args[1].duration,delay:args[1].delay});
      }
      return original.apply(this, args);
    };
  });
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
  await page.goto(base, {waitUntil:'networkidle0'});
  assert.ok(await page.evaluate(() => window.motionCalls > 0), 'Entrance animation runs');
  const heroMotion = await page.evaluate(() => window.heroMotion);
  assert.equal(heroMotion.length, 2);
  assert.ok(heroMotion.every(effect => effect.from === 0 && effect.duration >= 1000), 'Hero fades fully in at a visible pace');
  assert.ok(heroMotion[1].delay > heroMotion[0].delay, 'Actions follow the heading');

  await page.evaluate(() => document.getElementById('servicios').scrollIntoView());
  await page.waitForFunction(() => document.getAnimations().some(a => a.playState === 'running'));
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await page.waitForFunction(() => document.getAnimations().every(a => a.playState !== 'running'));
  await page.goto(base, {waitUntil:'networkidle0'});
  assert.equal(await page.evaluate(() => window.motionCalls), 0, 'Reduced motion disables entrances');
  for (const width of [390, 1440]) {
    await page.setViewport({width, height:900});
    await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
    await page.goto(base, {waitUntil:'networkidle0'});
    if(width === 390) await page.click('.menu-toggle');
    await page.click('.services-menu summary');
    await page.click('.services-dropdown a[href="/#sucesiones"]');
    await page.waitForFunction(() => location.hash === '#sucesiones');
    assert.equal(await page.$eval('.services-menu',e=>e.open), false);
    await page.click('[data-consultation-area="sucesiones"]');
    assert.equal(await page.$eval('select[name="area"]',e=>e.value),'sucesiones');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  }
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'no-preference'}]);
  await page.goto(base + '/#contacto', {waitUntil:'networkidle0'});
  assert.equal(await page.$eval('.contact-grid',e=>getComputedStyle(e.children[0]).opacity), '1');
  await page.setJavaScriptEnabled(false);
  await page.goto(base, {waitUntil:'networkidle0'});
  const visible = await page.$$eval('.hero-grid > *, .service, .contact-grid > *', els =>
    els.every(e => getComputedStyle(e).opacity === '1' && getComputedStyle(e).visibility === 'visible'));
  assert.ok(visible, 'Content remains visible without JavaScript');
  assert.deepEqual(errors, []);
  console.log('Motion, live reduced-motion changes, mobile/desktop navigation and no-JS visibility: OK');
} finally { await browser.close(); }
