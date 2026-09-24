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
  // Check rendered opacity with the actual OS setting, then both explicit modes.
  // Merely counting animate() calls missed the original reduced-motion failure.
  await page.evaluateOnNewDocument(() => {
    window.renderedFade = [];
    const start = performance.now();
    function sample() {
      const heading = document.querySelector('.hero-grid h1');
      if (heading) window.renderedFade.push(Number(getComputedStyle(heading).opacity));
      if (performance.now() - start < 6000) requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
  });
  for (const mode of [null, 'reduce', 'no-preference']) {
    if (mode) await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:mode}]);
    await page.goto(base, {waitUntil:'domcontentloaded'});
    await page.waitForFunction(() => window.renderedFade?.some(value => value > 0.15 && value < 0.85));
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.hero-grid h1')).opacity === '1');
    const result = await page.evaluate(() => ({
      reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
      min: Math.min(...window.renderedFade), max: Math.max(...window.renderedFade),
    }));
    assert.ok(result.min < 0.3 && result.max > 0.95, 'Visible fade from transparent to opaque');
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.querySelector('.services .service').scrollIntoView({block:'center', behavior:'instant'});
    });
    await page.waitForFunction(() => {
      const opacity = Number(getComputedStyle(document.querySelector('.services .service')).opacity);
      return opacity > 0.05 && opacity < 0.9;
    });
    if (result.reduced) {
      assert.ok(await page.evaluate(() => document.getAnimations().every(a =>
        a.effect.getKeyframes().every(frame => !frame.transform || frame.transform === 'none'))));
    }
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.services .service')).opacity === '1');
    console.log(`Rendered heading and scroll fade: ${mode || 'system default'} (reduce=${result.reduced}) OK`);
  }
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
  assert.ok(await page.evaluate(() => window.motionCalls > 0), 'Reduced motion preserves opacity fades');
  assert.ok(await page.evaluate(() => document.getAnimations().every(a =>
    a.effect.getKeyframes().every(frame => !frame.transform || frame.transform === 'none'))),
    'Reduced motion never translates or scales content');
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
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#contacto h2')).opacity === '1');
  assert.equal(await page.$eval('.contact-grid',e=>getComputedStyle(e.children[0]).opacity), '1');
  for (const width of [390, 1440]) {
    await page.setViewport({width, height:900});
    for (const mode of ['reduce', 'no-preference']) {
      await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:mode}]);
      await page.goto(base, {waitUntil:'networkidle0'});
      for (let repeat = 0; repeat < 2; repeat++) {
        if (width === 390) await page.click('.menu-toggle');
        await page.click('.services-menu summary');
        await page.click('.services-dropdown a[href="/#jubilacion"]');
        await page.waitForFunction(() => {
          const heading = document.querySelector('#jubilacion h2');
          const opacity = Number(getComputedStyle(heading).opacity);
          return location.hash === '#jubilacion' && opacity > 0.05 && opacity < 0.9;
        });
        if (mode === 'reduce') {
          assert.equal(await page.$eval('#jubilacion h2', e => getComputedStyle(e).transform), 'none');
        }
        await page.waitForFunction(() => getComputedStyle(document.querySelector('#jubilacion h2')).opacity === '1');
        assert.equal(await page.$eval('.services-menu', e => e.open), false);
      }
      await page.click('#jubilacion [data-consultation-area]');
      await page.waitForFunction(() => {
        const opacity = Number(getComputedStyle(document.querySelector('#contacto h2')).opacity);
        return opacity > 0.05 && opacity < 0.9;
      });
      assert.equal(await page.$eval('select[name="area"]', e => e.value), 'jubilacion-docente');
      await page.waitForFunction(() => getComputedStyle(document.querySelector('#contacto h2')).opacity === '1');
      console.log(`Anchor click, repeat click and contact selection: ${width}px ${mode} OK`);
    }
  }
  await page.setJavaScriptEnabled(false);
  await page.goto(base, {waitUntil:'networkidle0'});
  const visible = await page.$$eval('.hero-grid > *, .service, .contact-grid > *', els =>
    els.every(e => getComputedStyle(e).opacity === '1' && getComputedStyle(e).visibility === 'visible'));
  assert.ok(visible, 'Content remains visible without JavaScript');
  assert.deepEqual(errors, []);
  console.log('Motion, live reduced-motion changes, mobile/desktop navigation and no-JS visibility: OK');
} finally { await browser.close(); }
