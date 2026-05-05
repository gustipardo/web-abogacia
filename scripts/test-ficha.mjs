/**
 * E2E test del formulario /ficha-consulta.
 *
 *   npm run test:ficha           ← test normal (no envía email real)
 *   npm run test:ficha -- --real ← test que SÍ envía email a adriana@estudioghetti.com
 *
 * Qué hace:
 *  1. Levanta un dev server temporal en el puerto 4322.
 *  2. Abre /ficha-consulta en Chrome headless con Puppeteer.
 *  3. Rellena las 7 secciones del formulario con datos ficticios.
 *  4. Por defecto INTERCEPTA el POST a /api/submit-ficha con una respuesta
 *     fake — así no se spamea la inbox de la Dra. en cada corrida.
 *     Con --real deja pasar el POST y el email llega de verdad.
 *  5. Verifica que aparece la pantalla de éxito y que el payload capturado
 *     tiene los campos obligatorios.
 *
 * --real requiere RESEND_API_KEY en .env (igual que en producción).
 */

import { spawn } from 'node:child_process';
import puppeteer from 'puppeteer';

const PORT = 4322;
const BASE = `http://localhost:${PORT}`;
const FORM_URL = `${BASE}/ficha-consulta`;
const REAL_SEND = process.argv.includes('--real');

const log = (msg) => console.log(msg);
const ok = (msg) => console.log(`✅ ${msg}`);
const fail = (msg) => { console.error(`❌ ${msg}`); process.exitCode = 1; };

// ---------- helpers ---------------------------------------------------------

async function waitForServer(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(url);
      if (r.ok) return; // strict: queremos 200, no 404 (que indicaría compilación incompleta)
    } catch {
      /* server not up yet */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Dev server no respondió 200 OK en ${url} (timeout ${timeoutMs}ms)`);
}

async function fillText(page, selector, value) {
  await page.click(selector, { clickCount: 3 }).catch(() => {});
  await page.type(selector, value, { delay: 0 });
}

// ---------- test ------------------------------------------------------------

async function runTest() {
  log('▶ Levantando dev server…');
  // Spawn astro directamente (sin npx/sh) para que SIGTERM lo mate sin orphans.
  // detached + group kill cubre cualquier subproceso interno de astro/vite.
  const dev = spawn(process.execPath, ['./node_modules/astro/bin/astro.mjs', 'dev', '--port', String(PORT)], {
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
  });

  // Capturar logs por si algo falla (silencioso por defecto)
  const devLog = [];
  dev.stdout.on('data', (d) => devLog.push(`[dev] ${d}`));
  dev.stderr.on('data', (d) => devLog.push(`[dev:err] ${d}`));

  let browser;
  try {
    // Esperar que /ficha-consulta esté compilado y sirva 200 (no sólo /)
    await waitForServer(FORM_URL);
    ok('Dev server listo');

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    // Capturar errores y mensajes de consola del navegador
    page.on('pageerror', (err) => console.error(`[browser] pageerror: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        console.error(`[browser:${msg.type()}] ${msg.text()}`);
      }
    });
    // Mostrar 404s con la URL para saber qué falta
    page.on('response', (resp) => {
      if (resp.status() === 404) {
        console.error(`[browser:404] ${resp.url()}`);
      }
    });

    // Modo dry-run (default): interceptamos el POST y devolvemos fake 200 ok.
    // Modo --real: dejamos pasar el POST → llega un email real a la Dra.
    let capturedPayload = null;
    let apiCallCount = 0;
    let realApiResponse = null;
    if (REAL_SEND) {
      log('🔴 Modo --real ACTIVADO: el email se enviará de verdad a adriana@estudioghetti.com');
    } else {
      log('🟢 Modo normal: el POST se intercepta, no se envía email real');
    }
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (req.method() === 'POST' && req.url().endsWith('/api/submit-ficha')) {
        apiCallCount += 1;
        try {
          capturedPayload = JSON.parse(req.postData() || '{}');
        } catch {
          capturedPayload = { __raw: req.postData() };
        }
        if (REAL_SEND) {
          req.continue();
        } else {
          req.respond({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ ok: true }),
          });
        }
      } else {
        req.continue();
      }
    });

    if (REAL_SEND) {
      // Capturar la respuesta real para detectar errores de Resend
      page.on('response', async (resp) => {
        if (resp.url().endsWith('/api/submit-ficha')) {
          realApiResponse = {
            status: resp.status(),
            body: await resp.json().catch(() => null),
          };
        }
      });
    }

    // Ir al formulario, evitando que el draft de localStorage previo contamine
    await page.goto(FORM_URL, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => localStorage.removeItem('ficha-consulta-v1'));
    await page.reload({ waitUntil: 'domcontentloaded' });
    ok('Formulario cargado');

    // ---- Sección 1: datos personales -----------------------------------
    await fillText(page, 'input[name="apellidos"]', 'Pérez García');
    await fillText(page, 'input[name="nombres"]', 'María Elena');
    await fillText(page, 'input[name="dni"]', '12345678');
    await fillText(page, 'input[name="cuil"]', '27-12345678-4');
    // Tipear sólo dígitos para verificar que el auto-format inserta las "/"
    await fillText(page, 'input[name="fecha_nacimiento"]', '15031965');
    await fillText(page, 'input[name="nacionalidad"]', 'Argentina');
    await page.select('select[name="estado_civil"]', 'Casado/a');
    await page.select('select[name="sexo"]', 'Femenino');
    await fillText(page, 'input[name="domicilio"]', 'Av. Siempreviva 742, Pilar, Buenos Aires');
    await fillText(page, 'input[name="telefono_celular"]', '11 5555 5555');
    await fillText(page, 'input[name="telefono_alternativo"]', '11 4444 4444');
    await fillText(page, 'input[name="email_cliente"]', 'maria.perez@example.com');
    ok('Sección 1 (Datos Personales) completa');

    // ---- Sección 2: credenciales ---------------------------------------
    await page.click('input[name="cred_anses"]');
    await page.click('input[name="cred_afip"]');
    await fillText(page, 'input[name="credenciales_obs"]', 'Clave ANSES bloqueada hace 6 meses.');
    ok('Sección 2 (Credenciales) completa');

    // ---- Sección 3: tipo de consulta -----------------------------------
    await page.click('input[name="tipo"][value="docente"]');
    await page.click('input[name="tipo"][value="ordinaria"]');
    await page.select('select[name="trabajando_actualmente"]', 'Sí');
    await fillText(page, 'input[name="cobra_beneficio"]', 'No');
    const descPrefix = REAL_SEND
      ? '[ESTO ES UN TEST AUTOMATIZADO — SE PUEDE IGNORAR] '
      : '';
    await fillText(
      page,
      'textarea[name="descripcion_consulta"]',
      `${descPrefix}Quiero saber si puedo jubilarme con 28 años en docencia y 8 años en relación de dependencia previa.`
    );
    ok('Sección 3 (Tipo de Consulta) completa');

    // Verificar que las secciones condicionales se muestren
    await page.waitForFunction(
      () => {
        const d = document.querySelector('.route-docente');
        const g = document.querySelector('.route-general');
        return d && g && !d.hasAttribute('hidden') && !g.hasAttribute('hidden');
      },
      { timeout: 3000 }
    );
    ok('Secciones condicionales (5 docente + 6 ANSES) se desplegaron');

    // ---- Sección 4: empleos --------------------------------------------
    await fillText(page, 'input[name="empleo_1_empleador"]', 'Escuela N° 12 Pilar');
    await fillText(page, 'input[name="empleo_1_cargo"]', 'Maestra de grado');
    await fillText(page, 'input[name="empleo_1_desde"]', '03/1995');
    await fillText(page, 'input[name="empleo_1_hasta"]', 'actual');
    await fillText(page, 'input[name="empleo_1_caja"]', 'IPS');
    await fillText(page, 'input[name="empleo_1_observaciones"]', 'Titular desde 2002.');

    await page.click('#empleo-add');
    await page.waitForSelector('input[name="empleo_2_empleador"]', { timeout: 3000 });
    await fillText(page, 'input[name="empleo_2_empleador"]', 'Empresa SA');
    await fillText(page, 'input[name="empleo_2_cargo"]', 'Administrativa');
    await fillText(page, 'input[name="empleo_2_desde"]', '03/1985');
    await fillText(page, 'input[name="empleo_2_hasta"]', '02/1995');
    await fillText(page, 'input[name="empleo_2_caja"]', 'ANSES');
    ok('Sección 4 (Historia Laboral) completa — 2 empleos');

    // ---- Sección 5: docentes -------------------------------------------
    // Esperar que la sección sea realmente visible (no sólo sin atributo hidden).
    await page.waitForSelector('.route-docente input[name="niveles"][value="Primaria"]', { visible: true, timeout: 3000 });
    // Marcamos checkboxes vía evaluate — más robusto cuando la sección
    // se acaba de desplegar y la posición/scroll todavía está reacomodándose.
    await page.evaluate(() => {
      const tick = (sel) => {
        const el = document.querySelector(sel);
        if (el && !el.checked) {
          el.checked = true;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
      tick('input[name="niveles"][value="Primaria"]');
      tick('input[name="gestion"][value="Estatal"]');
      tick('input[name="cargo"][value="Titular"]');
      tick('input[name="licencias"][value="Maternidad"]');
    });
    await fillText(page, 'input[name="max_horas_simultaneas"]', '36');
    await page.select('select[name="cargos_simultaneos"]', 'Sí');
    await fillText(page, 'input[name="anos_simultaneidad"]', '12');
    await fillText(page, 'textarea[name="detalle_licencias"]', '2 licencias por maternidad: 2001 y 2003.');
    await page.select('select[name="hoja_vida_abc"]', 'Sí');
    await page.select('select[name="certificaciones_servicios"]', 'Sí');
    ok('Sección 5 (Carrera Docente) completa');

    // ---- Sección 6: ANSES ----------------------------------------------
    await page.evaluate(() => {
      const tick = (sel) => {
        const el = document.querySelector(sel);
        if (el && !el.checked) {
          el.checked = true;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
      tick('input[name="tipo_actividad"][value="Rel. dependencia privada"]');
    });
    await page.select('select[name="tiene_sabana"]', 'Sí');
    await fillText(page, 'input[name="anos_aportes"]', '10');
    await page.select('select[name="moratoria"]', 'No');
    await page.select('select[name="empleadores_cerrados"]', 'No');
    await fillText(page, 'input[name="cobra_beneficio_actual"]', 'No');
    ok('Sección 6 (ANSES) completa');

    // ---- Sección 7: documentación --------------------------------------
    await page.evaluate(() => {
      const tick = (sel) => {
        const el = document.querySelector(sel);
        if (el && !el.checked) {
          el.checked = true;
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
      tick('input[name="doc"][value="DNI (fotocopia)"]');
      tick('input[name="doc"][value="Hoja de Vida ABC"]');
      tick('input[name="doc"][value="Constancia de CUIL"]');
    });
    await fillText(page, 'textarea[name="doc_detalle"]', 'Tengo todos los recibos de los últimos 5 años.');
    ok('Sección 7 (Documentación) completa');

    // ---- Declaración + envío -------------------------------------------
    await page.click('input[name="declaracion"]');

    // Esperar a pasar el anti-spam de 4 segundos
    log('⏱  Esperando 4.5s (anti-spam)…');
    await new Promise((r) => setTimeout(r, 4500));

    // Diagnóstico: verificar valor del campo fecha y validez del formulario
    const debug = await page.evaluate(() => {
      const fecha = document.querySelector('input[name="fecha_nacimiento"]');
      const form = document.getElementById('ficha-form');
      return {
        fechaValue: fecha?.value,
        fechaValidity: fecha?.validity ? {
          valid: fecha.validity.valid,
          patternMismatch: fecha.validity.patternMismatch,
          valueMissing: fecha.validity.valueMissing,
        } : null,
        formValid: form?.checkValidity?.(),
        firstInvalid: (() => {
          const all = form?.querySelectorAll('input, select, textarea') ?? [];
          for (const el of all) {
            if (!el.checkValidity()) return { name: el.name, value: el.value, type: el.type };
          }
          return null;
        })(),
      };
    });
    log(`🔍 Debug: fecha="${debug.fechaValue}" formValid=${debug.formValid}`);
    if (!debug.formValid) {
      log(`   Primer campo inválido: ${JSON.stringify(debug.firstInvalid)}`);
    }

    log('▶ Enviando formulario…');
    await page.click('#ficha-submit');

    // Esperar pantalla de éxito
    await page.waitForFunction(
      () => {
        const el = document.querySelector('#ficha-success');
        return el && !el.hasAttribute('hidden');
      },
      { timeout: 8000 }
    );
    ok('Pantalla de éxito visible');

    // ---- Verificar payload capturado -----------------------------------
    if (apiCallCount !== 1) {
      throw new Error(`Se esperaba 1 POST a /api/submit-ficha, se recibieron ${apiCallCount}`);
    }
    if (!capturedPayload) {
      throw new Error('No se capturó el body del POST');
    }

    const required = [
      'apellidos', 'nombres', 'dni', 'cuil', 'fecha_nacimiento',
      'email_cliente', 'telefono_celular',
      'descripcion_consulta', 'declaracion',
    ];
    const missing = required.filter((k) => !capturedPayload[k]);
    if (missing.length > 0) {
      throw new Error(`Faltan en el payload: ${missing.join(', ')}`);
    }
    ok('Payload contiene todos los campos obligatorios');

    // Verificar que los auto-format funcionaron
    if (capturedPayload.fecha_nacimiento !== '15/03/1965') {
      throw new Error(`Fecha mal formateada — esperado "15/03/1965", recibido "${capturedPayload.fecha_nacimiento}"`);
    }
    ok('Fecha de nacimiento auto-formateada (dd/mm/aaaa)');

    if (capturedPayload.dni !== '12.345.678') {
      throw new Error(`DNI mal formateado — esperado "12.345.678", recibido "${capturedPayload.dni}"`);
    }
    ok('DNI auto-formateado con puntos');

    if (capturedPayload.cuil !== '27-12345678-4') {
      throw new Error(`CUIL mal formateado — esperado "27-12345678-4", recibido "${capturedPayload.cuil}"`);
    }
    ok('CUIL auto-formateado con guiones');

    // Verificaciones específicas
    const tipos = Array.isArray(capturedPayload.tipo) ? capturedPayload.tipo : [capturedPayload.tipo];
    if (!tipos.includes('docente') || !tipos.includes('ordinaria')) {
      throw new Error(`Tipos esperados: docente + ordinaria. Recibidos: ${tipos.join(', ')}`);
    }
    ok('Tipos de consulta capturados correctamente');

    // Empleos
    if (!capturedPayload.empleo_1_empleador || !capturedPayload.empleo_2_empleador) {
      throw new Error('No se capturaron los 2 empleos');
    }
    ok('2 empleos capturados (sección 4 dinámica)');

    // Datos docentes
    if (!capturedPayload.niveles) {
      throw new Error('Datos docentes (sección 5) no capturados');
    }
    ok('Datos docentes capturados');

    // Datos ANSES
    if (!capturedPayload.tiene_sabana) {
      throw new Error('Datos ANSES (sección 6) no capturados');
    }
    ok('Datos ANSES capturados');

    log('');
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    log(`📋 Cliente: ${capturedPayload.nombres} ${capturedPayload.apellidos}`);
    log(`📧 Email:   ${capturedPayload.email_cliente}`);
    log(`📞 Tel:     ${capturedPayload.telefono_celular}`);
    log(`🏷  Tipos:   ${tipos.join(', ')}`);
    log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    log('');
    if (REAL_SEND) {
      if (realApiResponse?.status === 200) {
        ok('TEST OK — email REAL enviado a adriana@estudioghetti.com (revisá la inbox)');
      } else {
        throw new Error(`API respondió ${realApiResponse?.status}: ${JSON.stringify(realApiResponse?.body)}`);
      }
    } else {
      ok('TEST happy path OK — formulario funciona end-to-end (sin enviar email real)');
    }

    // ============================================================
    // TEST NEGATIVO: el formulario rechaza el envío sin tipo de consulta
    // (sólo en modo dry-run; en --real evitamos el doble envío)
    // ============================================================
    if (!REAL_SEND) {
      log('');
      log('━━━ Test negativo: validación de tipo de consulta ━━━');

      // Reset de estado
      const apiCallsBefore = apiCallCount;
      await page.evaluate(() => localStorage.removeItem('ficha-consulta-v1'));
      await page.reload({ waitUntil: 'domcontentloaded' });

      // Llenamos sólo lo OBLIGATORIO menos "tipo de consulta"
      await fillText(page, 'input[name="apellidos"]', 'Test');
      await fillText(page, 'input[name="nombres"]', 'Negativo');
      await fillText(page, 'input[name="dni"]', '12345678');
      await fillText(page, 'input[name="cuil"]', '20123456789');
      await fillText(page, 'input[name="fecha_nacimiento"]', '15031965');
      await fillText(page, 'input[name="telefono_celular"]', '1155555555');
      await fillText(page, 'input[name="email_cliente"]', 'test@test.com');
      await fillText(page, 'textarea[name="descripcion_consulta"]', 'Texto cualquiera.');
      await page.evaluate(() => {
        const d = document.querySelector('input[name="declaracion"]');
        if (d) { d.checked = true; d.dispatchEvent(new Event('change', { bubbles: true })); }
      });

      await new Promise((r) => setTimeout(r, 4500));
      log('▶ Intentando enviar sin "tipo de consulta"…');
      await page.click('#ficha-submit');

      // Esperar a que aparezca el banner de error mencionando "Tipo de consulta"
      await page.waitForFunction(
        () => {
          const el = document.querySelector('#ficha-error');
          return el && !el.hasAttribute('hidden') && el.textContent && el.textContent.includes('Tipo de consulta');
        },
        { timeout: 3000 }
      ).catch(() => {
        throw new Error('No apareció el banner de error mencionando "Tipo de consulta"');
      });
      ok('Banner de error muestra "Tipo de consulta"');

      // Verificar que NO se hizo POST al API
      if (apiCallCount !== apiCallsBefore) {
        throw new Error(`Se hizo un POST al API que no debería haber pasado (${apiCallCount} > ${apiCallsBefore})`);
      }
      ok('No se llamó al API (envío correctamente bloqueado)');

      // Verificar que el fieldset está marcado como inválido
      const fieldsetInvalid = await page.evaluate(() => {
        const inp = document.querySelector('input[name="tipo"]');
        const fs = inp ? inp.closest('fieldset.fieldset') : null;
        return fs ? fs.classList.contains('is-invalid') : false;
      });
      if (!fieldsetInvalid) {
        throw new Error('El fieldset de tipo no tiene la clase .is-invalid');
      }
      ok('Fieldset de "tipo de consulta" marcado visualmente como inválido');

      // Ahora marcamos uno y verificamos que la marca se limpia
      await page.click('input[name="tipo"][value="ordinaria"]');
      const fieldsetCleared = await page.evaluate(() => {
        const inp = document.querySelector('input[name="tipo"]');
        const fs = inp ? inp.closest('fieldset.fieldset') : null;
        return fs ? !fs.classList.contains('is-invalid') : false;
      });
      if (!fieldsetCleared) {
        throw new Error('El fieldset siguió marcado como inválido tras tildar un tipo');
      }
      ok('Marca inválida se limpia automáticamente al tildar un tipo');

      log('');
      ok('TEST negativo OK — la validación bloquea el envío incompleto');
    }
  } catch (err) {
    fail(err.message);
    if (devLog.length) {
      console.error('\n--- Dev server logs ---');
      console.error(devLog.join(''));
    }
    throw err;
  } finally {
    if (browser) await browser.close();
    log('▶ Cerrando dev server…');
    // Matamos el grupo entero (detached: true creó un nuevo process group)
    try { process.kill(-dev.pid, 'SIGTERM'); } catch { /* ya muerto */ }
    await new Promise((r) => setTimeout(r, 800));
    try { process.kill(-dev.pid, 'SIGKILL'); } catch { /* ya muerto */ }
  }
}

runTest().catch(() => {
  process.exit(1);
});
