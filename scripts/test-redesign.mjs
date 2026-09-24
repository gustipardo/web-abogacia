import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import puppeteer from 'puppeteer';
const base=process.env.TEST_BASE_URL||'http://127.0.0.1:4321';
const browser=await puppeteer.launch({headless:true,executablePath:process.env.PUPPETEER_EXECUTABLE_PATH||undefined});
await fs.mkdir('.mobile-shots',{recursive:true});
try{
 const page=await browser.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 const routes=['/','/articulos/','/articulos/requisitos-jubilacion-docente-ips-buenos-aires/','/ficha-consulta/','/404'];
 for(const width of [320,390,768,1440]){
  await page.setViewport({width,height:1000});
  for(const route of routes){
   await page.goto(base+route,{waitUntil:'networkidle0'});
   const state=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,missing:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),text:document.body.innerText}));
   assert.ok(state.scroll<=width+1,route+' overflows at '+width+': '+state.scroll);
   assert.deepEqual(state.missing,[]);
   assert.ok(!/gratis|gratuit|sin cargo|sin costo/i.test(state.text));
   await page.evaluate(()=>document.querySelector('astro-dev-toolbar')?.remove());
   if(route==='/'&&(width===390||width===1440))await page.screenshot({path:'.mobile-shots/home-'+width+'.png',fullPage:true});
  }
  console.log('Layout and assets OK at '+width+'px');
 }
 await page.setViewport({width:1440,height:1000});
 await page.goto(base,{waitUntil:'networkidle0'});
 await page.click('.services-menu summary');
 assert.equal(await page.$eval('.services-menu',e=>e.open),true);
 await page.keyboard.press('Escape');
 assert.equal(await page.$eval('.services-menu',e=>e.open),false);
 await page.focus('.services-menu summary');await page.keyboard.press('Enter');
 assert.equal(await page.$eval('.services-menu',e=>e.open),true);
 const broken=await page.evaluate(()=>[...document.querySelectorAll('a[href*="#"]')].filter(a=>{const u=new URL(a.href);return u.origin===location.origin&&u.pathname==='/'&&u.hash&&!document.getElementById(u.hash.slice(1))}).map(a=>a.href));
 assert.deepEqual(broken,[]);
 await page.setViewport({width:390,height:844});
 await page.click('.menu-toggle');await page.click('.services-menu summary');await page.click('.services-dropdown a[href="/#sucesiones"]');
 assert.equal(await page.$eval('.menu-toggle',e=>e.getAttribute('aria-expanded')),'false');
 assert.equal(await page.$eval('.nav',e=>getComputedStyle(e).display),'none');
 await page.click('[data-consultation-area="sucesiones"]');
 assert.equal(await page.$eval('select[name="area"]',e=>e.value),'sucesiones');
 const labels=await page.$$eval('select[name="area"] option',els=>els.map(e=>e.textContent));
 assert.ok(labels.includes('Derecho Civil')&&labels.includes('Sucesiones'));
 await page.click('#form-submit');
 assert.equal(await page.$eval('input[name="nombre"]',e=>e.validity.valueMissing),true);
 await page.type('input[name="nombre"]','Prueba local');
 await page.type('input[name="email"]','prueba@example.invalid');
 await page.type('textarea[name="mensaje"]','Prueba automatizada sin envio real.');
 let intercepted=0;
 await page.setRequestInterception(true);
 page.on('request',req=>{
  if(req.url().includes('api.web3forms.com/submit')){
   intercepted++;
   assert.ok(req.postData().includes('Sucesiones'));
   req.respond({status:200,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({success:true})});
  }else req.continue();
 });
 await page.click('#form-submit');
 await page.waitForSelector('#form-success:not([hidden])');
 assert.equal(intercepted,1);
 await page.click('#form-reset');
 assert.equal(await page.$eval('input[name="nombre"]',e=>e.value),'');
 console.log('Desktop/mobile menus, service selection and simulated contact submission OK');
 await page.goto(base+'/articulos/',{waitUntil:'networkidle0'});
 const listing=await page.$eval('main',e=>e.innerText);
 for(const month of ['agosto de 2026','enero de 2026','julio de 2025','marzo de 2025','enero de 2025','octubre de 2024','mayo de 2024','diciembre de 2023','mayo de 2026'])assert.ok(listing.includes(month),month);
 assert.deepEqual(errors,[]);
 console.log('Article dates and browser console OK');
}finally{await browser.close()}
