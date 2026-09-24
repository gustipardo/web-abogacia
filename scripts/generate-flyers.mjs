import puppeteer from 'puppeteer';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const browser=await puppeteer.launch({headless:true,executablePath:process.env.PUPPETEER_EXECUTABLE_PATH||undefined});
try {
 const page=await browser.newPage();
 await page.setViewport({width:1200,height:630,deviceScaleFactor:1});
 for(const [name,out] of [['home','og-default.png'],['ficha-consulta','og-ficha-consulta.png'],['jubilacion','flyer-jubilacion.png'],['multas','flyer-multas.png']]){
  await page.goto(pathToFileURL(path.join(root,'Context/og',name+'.html')).href);
  await page.evaluate(()=>Promise.all([document.fonts.ready,...[...document.images].map(i=>i.decode())]));
  await page.screenshot({path:path.join(root,'public',out)});
  console.log('Generated '+out);
 }
 const logo=await fs.readFile(path.join(root,'public/logo.png'));
 for(const [size,name] of [[32,'favicon-32.png'],[180,'apple-touch-icon.png']]){
  await page.setViewport({width:size,height:size,deviceScaleFactor:1});
  await page.setContent('<style>body{margin:0;background:#FDFCF9;overflow:hidden}img{position:absolute;width:230%;max-width:none;left:-65%;top:-42%}</style><img src="data:image/png;base64,'+logo.toString('base64')+'">');
  await page.evaluate(()=>document.images[0].decode());
  await page.screenshot({path:path.join(root,'public',name)});
 }
 // Encode the generated PNG in the standard ICO container for legacy requests.
 const png=await fs.readFile(path.join(root,'public/favicon-32.png'));
 const ico=Buffer.alloc(22);ico.writeUInt16LE(1,2);ico.writeUInt16LE(1,4);ico[6]=32;ico[7]=32;ico.writeUInt16LE(1,10);ico.writeUInt16LE(32,12);ico.writeUInt32LE(png.length,14);ico.writeUInt32LE(22,18);
 await fs.writeFile(path.join(root,'public/favicon.ico'),Buffer.concat([ico,png]));
} finally {await browser.close()}
