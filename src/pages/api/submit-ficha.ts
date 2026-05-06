import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

type Payload = Record<string, string | string[]>;

const TO_EMAIL = import.meta.env.FICHA_TO_EMAIL || 'adriana@estudioghetti.com';
const FROM_EMAIL = import.meta.env.FICHA_FROM_EMAIL || 'Estudio Ghetti <noreply@estudioghetti.com>';

const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/www\.estudioghetti\.com(?:\/|$)/,
  /^https:\/\/estudioghetti\.com(?:\/|$)/,
  // En dev y previews permitimos localhost y cualquier preview de Vercel.
  ...(import.meta.env.DEV ? [/^http:\/\/localhost(?::\d+)?(?:\/|$)/] : []),
  /^https:\/\/[\w-]+\.vercel\.app(?:\/|$)/,
];

// Límites de longitud por campo. Defensa contra payloads enormes.
const MAX_FIELD_LEN: Record<string, number> = {
  apellidos: 120,
  nombres: 120,
  dni: 15,
  cuil: 15,
  fecha_nacimiento: 10,
  nacionalidad: 80,
  estado_civil: 30,
  sexo: 20,
  domicilio: 300,
  telefono_celular: 30,
  telefono_alternativo: 30,
  telefono_area: 6,
  telefono_num: 20,
  email_cliente: 254,
  descripcion_consulta: 5000,
  credenciales_obs: 500,
  detalle_licencias: 1500,
  detalle_moratorias: 1500,
  doc_detalle: 1000,
  cobra_beneficio: 200,
  cobra_beneficio_actual: 200,
  monto_beneficio: 30,
  anos_aportes: 10,
  anos_simultaneidad: 10,
  max_horas_simultaneas: 10,
};
const DEFAULT_MAX_FIELD_LEN = 200;
const MAX_PAYLOAD_BYTES = 200_000;
const MIN_FORM_FILL_MS = 4_000;
// Rate limit per IP, per función-instance. Es best-effort (cold starts limpian
// el Map) pero ya filtra el spam más obvio. Subir a Upstash/KV para producción seria.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, number[]>();

const TIPO_LABELS: Record<string, string> = {
  ordinaria: 'Jubilación ordinaria (edad + aportes)',
  docente: 'Jubilación docente (IPS)',
  invalidez: 'Retiro por invalidez',
  pension: 'Pensión por fallecimiento',
  diagnostico: 'Diagnóstico previsional',
  reajuste: 'Reajuste de haberes',
  otro: 'Otro',
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Quita CR/LF para evitar inyección de headers SMTP en campos como nombre.
function stripCRLF(s: string): string {
  return s.replace(/[\r\n]+/g, ' ').trim();
}

function get(p: Payload, key: string): string {
  const v = p[key];
  if (Array.isArray(v)) return v.join(', ');
  return typeof v === 'string' ? v : '';
}

function getArray(p: Payload, key: string): string[] {
  const v = p[key];
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v.length > 0) return [v];
  return [];
}

function row(label: string, value: string): string {
  if (!value || value.trim() === '') {
    return `<tr><td class="lbl">${escapeHtml(label)}</td><td class="val muted">—</td></tr>`;
  }
  return `<tr><td class="lbl">${escapeHtml(label)}</td><td class="val">${escapeHtml(value)}</td></tr>`;
}

function rowList(label: string, values: string[]): string {
  if (values.length === 0) {
    return `<tr><td class="lbl">${escapeHtml(label)}</td><td class="val muted">—</td></tr>`;
  }
  return `<tr><td class="lbl">${escapeHtml(label)}</td><td class="val">${values.map(escapeHtml).join(', ')}</td></tr>`;
}

function buildEmpleosHtml(p: Payload): string {
  const rows: string[] = [];
  const indices = new Set<number>();
  Object.keys(p).forEach((k) => {
    const m = k.match(/^empleo_(\d+)_/);
    if (m) indices.add(parseInt(m[1], 10));
  });
  if (indices.size === 0) {
    return '<p class="muted">— Sin empleos cargados —</p>';
  }
  const sorted = Array.from(indices).sort((a, b) => a - b);
  for (const i of sorted) {
    const empleador = get(p, `empleo_${i}_empleador`);
    const cargo = get(p, `empleo_${i}_cargo`);
    const desde = get(p, `empleo_${i}_desde`);
    const hasta = get(p, `empleo_${i}_hasta`);
    const actual = get(p, `empleo_${i}_actual`);
    const caja = get(p, `empleo_${i}_caja`);
    const obs = get(p, `empleo_${i}_observaciones`);
    if (!empleador && !cargo && !desde && !hasta && !actual && !caja && !obs) continue;
    const hastaDisplay = actual ? '<strong>Actual</strong>' : (escapeHtml(hasta) || '—');
    rows.push(`
      <tr>
        <td>${escapeHtml(String(i))}</td>
        <td>${escapeHtml(empleador) || '—'}</td>
        <td>${escapeHtml(cargo) || '—'}</td>
        <td>${escapeHtml(desde) || '—'}</td>
        <td>${hastaDisplay}</td>
        <td>${escapeHtml(caja) || '—'}</td>
        <td>${escapeHtml(obs) || '—'}</td>
      </tr>
    `);
  }
  if (rows.length === 0) return '<p class="muted">— Sin empleos cargados —</p>';
  return `
    <table class="empleos-table">
      <thead>
        <tr><th>#</th><th>Empleador</th><th>Cargo</th><th>Desde</th><th>Hasta</th><th>Caja</th><th>Obs.</th></tr>
      </thead>
      <tbody>${rows.join('')}</tbody>
    </table>
  `;
}

function buildEmail(p: Payload): { subject: string; html: string; text: string } {
  const apellidos = stripCRLF(get(p, 'apellidos'));
  const nombres = stripCRLF(get(p, 'nombres'));
  const fullName = `${nombres} ${apellidos}`.trim() || 'Cliente sin nombre';

  const tipos = getArray(p, 'tipo').map((t) => TIPO_LABELS[t] || t);
  const isDocente = getArray(p, 'tipo').includes('docente');

  const credentialsList: string[] = [];
  if (get(p, 'cred_anses')) credentialsList.push('Mi ANSES');
  if (get(p, 'cred_afip')) credentialsList.push('AFIP/ARCA');
  if (get(p, 'cred_ips')) credentialsList.push('Mi IPS');
  if (get(p, 'cred_abc')) credentialsList.push('ABC Docente');

  const subject = `Ficha previsional — ${fullName}`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1A1A1A; background: #F8F6F2; padding: 0; margin: 0; }
    .wrap { max-width: 720px; margin: 0 auto; background: #fff; }
    .header { background: #1B2A4A; color: #fff; padding: 1.5rem 2rem; }
    .header h1 { margin: 0 0 0.3rem; font-size: 1.3rem; }
    .header p { margin: 0; font-size: 0.85rem; opacity: 0.85; }
    .content { padding: 1.5rem 2rem; }
    h2 { color: #1B2A4A; font-size: 1rem; border-bottom: 2px solid #B8986A; padding-bottom: 0.4rem; margin: 1.5rem 0 0.75rem; }
    h2:first-child { margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 0.5rem; }
    td { padding: 0.45rem 0.5rem; vertical-align: top; font-size: 0.88rem; line-height: 1.5; border-bottom: 1px solid #EDE8E1; }
    td.lbl { color: #5A5A6A; font-weight: 600; width: 40%; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.04em; }
    td.val { color: #1A1A1A; }
    td.muted { color: #B0AAB8; font-style: italic; }
    .empleos-table th { background: #F8F6F2; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: #5A5A6A; padding: 0.5rem; text-align: left; border-bottom: 1px solid #B8986A; }
    .empleos-table td { font-size: 0.83rem; padding: 0.4rem 0.5rem; border-bottom: 1px solid #EDE8E1; }
    .footer { padding: 1rem 2rem; background: #F8F6F2; color: #5A5A6A; font-size: 0.75rem; text-align: center; border-top: 1px solid #E0DBD4; }
    .descripcion { background: #F8F6F2; border-left: 3px solid #B8986A; padding: 0.85rem 1rem; margin: 0.5rem 0; border-radius: 4px; font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <h1>Ficha de Primera Consulta Previsional</h1>
      <p>Recibida vía formulario web · Cliente: <strong>${escapeHtml(fullName)}</strong></p>
    </div>
    <div class="content">

      <h2>1. Datos Personales</h2>
      <table>
        ${row('Apellido/s', apellidos)}
        ${row('Nombre/s', nombres)}
        ${row('DNI', get(p, 'dni'))}
        ${row('CUIL', get(p, 'cuil'))}
        ${row('Fecha de nacimiento', get(p, 'fecha_nacimiento'))}
        ${row('Nacionalidad', get(p, 'nacionalidad'))}
        ${row('Estado civil', get(p, 'estado_civil'))}
        ${row('Sexo (s/ DNI)', get(p, 'sexo'))}
        ${row('Domicilio', get(p, 'domicilio'))}
        ${row('Tel. celular', get(p, 'telefono_celular'))}
        ${row('Tel. alternativo', get(p, 'telefono_alternativo'))}
        ${row('Email', get(p, 'email_cliente'))}
      </table>

      <h2>2. Credenciales Digitales</h2>
      <table>
        ${rowList('Claves activas', credentialsList)}
        ${row('Observaciones', get(p, 'credenciales_obs'))}
      </table>

      <h2>3. Tipo de Consulta</h2>
      <table>
        ${rowList('Tipo de jubilación', tipos)}
        ${row('¿Trabajando actualmente?', get(p, 'trabajando_actualmente'))}
        ${row('¿Cobra beneficio previsional?', get(p, 'cobra_beneficio'))}
      </table>
      <p class="lbl" style="font-size: 0.8rem; color: #5A5A6A; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600; margin: 0.75rem 0 0.3rem;">Descripción de la consulta</p>
      <div class="descripcion">${escapeHtml(get(p, 'descripcion_consulta')) || '—'}</div>

      <h2>4. Historia Laboral</h2>
      ${buildEmpleosHtml(p)}

      ${isDocente ? `
      <h2>5. Datos Docentes (IPS)</h2>
      <table>
        ${rowList('Niveles', getArray(p, 'niveles'))}
        ${rowList('Tipo de gestión', getArray(p, 'gestion'))}
        ${rowList('Tipo de cargo', getArray(p, 'cargo'))}
        ${row('Máx. horas simultáneas', get(p, 'max_horas_simultaneas'))}
        ${row('¿Cargos simultáneos?', get(p, 'cargos_simultaneos'))}
        ${row('Años con simultaneidad', get(p, 'anos_simultaneidad'))}
        ${rowList('Licencias relevantes', getArray(p, 'licencias'))}
        ${row('Detalle de licencias', get(p, 'detalle_licencias'))}
        ${row('Hoja de Vida ABC descargada', get(p, 'hoja_vida_abc'))}
        ${row('Certificaciones de servicios', get(p, 'certificaciones_servicios'))}
      </table>
      ` : ''}

      ${getArray(p, 'tipo').some((t) => t !== 'docente') ? `
      <h2>6. Datos ANSES (Trabajador General)</h2>
      <table>
        ${row('¿Tiene la sábana ANSES?', get(p, 'tiene_sabana'))}
        ${row('Años estimados con aportes', get(p, 'anos_aportes'))}
        ${rowList('Tipo de actividad', getArray(p, 'tipo_actividad'))}
        ${row('¿Realizó moratoria?', get(p, 'moratoria'))}
        ${row('¿Empleadores cerrados/quebrados?', get(p, 'empleadores_cerrados'))}
        ${row('Detalle moratorias', get(p, 'detalle_moratorias'))}
        ${row('¿Cobra beneficio actual?', get(p, 'cobra_beneficio_actual'))}
        ${row('Monto aprox. del beneficio ($)', get(p, 'monto_beneficio'))}
      </table>
      ` : ''}

      <h2>7. Documentación que aporta</h2>
      <table>
        ${rowList('Documentos disponibles', getArray(p, 'doc'))}
        ${row('Detalle adicional', get(p, 'doc_detalle'))}
      </table>

    </div>
    <div class="footer">
      Ficha enviada desde el formulario web · estudioghetti.com<br/>
      Datos protegidos por el secreto profesional.
    </div>
  </div>
</body>
</html>`;

  const text = `Ficha de Primera Consulta Previsional
Cliente: ${fullName}

1. DATOS PERSONALES
DNI: ${get(p, 'dni')}
CUIL: ${get(p, 'cuil')}
Fecha de nacimiento: ${get(p, 'fecha_nacimiento')}
Email: ${get(p, 'email_cliente')}
Tel. celular: ${get(p, 'telefono_celular')}
Domicilio: ${get(p, 'domicilio')}

3. TIPO DE CONSULTA
Tipos: ${tipos.join(', ')}
Trabajando: ${get(p, 'trabajando_actualmente')}
Cobra beneficio: ${get(p, 'cobra_beneficio')}

Descripción: ${get(p, 'descripcion_consulta')}

(Ver versión HTML del email para el detalle completo de empleos, datos docentes/ANSES y documentación.)
`;

  return { subject, html, text };
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function getClientIp(request: Request): string {
  // Vercel pone la IP real en x-forwarded-for. Tomamos la primera del listado.
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipHits.get(ip) ?? []).filter((t) => t > cutoff);
  if (hits.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, hits);
    return false;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  // GC ocasional para que el Map no crezca sin tope.
  if (ipHits.size > 1000) {
    for (const [k, v] of ipHits) {
      if (v.every((t) => t <= cutoff)) ipHits.delete(k);
    }
  }
  return true;
}

function violatesLengthLimits(p: Payload): string | null {
  for (const [k, v] of Object.entries(p)) {
    const max = MAX_FIELD_LEN[k] ?? DEFAULT_MAX_FIELD_LEN;
    if (typeof v === 'string') {
      if (v.length > max) return k;
    } else if (Array.isArray(v)) {
      if (v.some((s) => typeof s === 'string' && s.length > max)) return k;
    }
  }
  return null;
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return jsonResponse(500, { ok: false, error: 'Servicio de email no configurado' });
  }

  // 1) Origin / Referer check — bloquea POSTs desde otros dominios.
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const sourceUrl = origin ?? referer ?? '';
  const sourceOk = sourceUrl !== '' && ALLOWED_ORIGIN_PATTERNS.some((pat) => pat.test(sourceUrl));
  if (!sourceOk) {
    return jsonResponse(403, { ok: false, error: 'Origen no autorizado' });
  }

  // 2) Rate limit por IP.
  const ip = getClientIp(request);
  if (!checkRateLimit(ip)) {
    return jsonResponse(429, { ok: false, error: 'Demasiadas solicitudes. Esperá un momento e intentá de nuevo.' });
  }

  // 3) Tamaño total del payload.
  const lengthHeader = request.headers.get('content-length');
  if (lengthHeader && parseInt(lengthHeader, 10) > MAX_PAYLOAD_BYTES) {
    return jsonResponse(413, { ok: false, error: 'Payload demasiado grande' });
  }

  let payload: Payload;
  try {
    const raw = await request.text();
    if (raw.length > MAX_PAYLOAD_BYTES) {
      return jsonResponse(413, { ok: false, error: 'Payload demasiado grande' });
    }
    payload = JSON.parse(raw) as Payload;
  } catch {
    return jsonResponse(400, { ok: false, error: 'Payload inválido' });
  }

  // 4) Honeypot: si vino completo, fingimos éxito sin enviar.
  const honeypot = get(payload, 'website');
  if (honeypot.trim() !== '') {
    return jsonResponse(200, { ok: true });
  }

  // 5) Tiempo mínimo en página: el cliente envía _loaded_at (ms epoch).
  const loadedAtRaw = get(payload, '_loaded_at');
  const loadedAt = parseInt(loadedAtRaw, 10);
  if (!Number.isFinite(loadedAt) || Date.now() - loadedAt < MIN_FORM_FILL_MS) {
    return jsonResponse(400, { ok: false, error: 'Formulario enviado demasiado rápido. Intentá de nuevo.' });
  }

  // 6) Longitudes máximas por campo.
  const tooLong = violatesLengthLimits(payload);
  if (tooLong) {
    return jsonResponse(400, { ok: false, error: `Campo "${tooLong}" excede la longitud máxima permitida.` });
  }

  // 7) Validación mínima de campos obligatorios.
  const apellidos = stripCRLF(get(payload, 'apellidos'));
  const nombres = stripCRLF(get(payload, 'nombres'));
  const dni = get(payload, 'dni').trim();
  const cuil = get(payload, 'cuil').trim();
  const email = stripCRLF(get(payload, 'email_cliente'));
  const telefono = get(payload, 'telefono_celular').trim();
  const descripcion = get(payload, 'descripcion_consulta').trim();
  const declaracion = get(payload, 'declaracion');

  if (!apellidos || !nombres || !dni || !cuil || !email || !telefono || !descripcion) {
    return jsonResponse(400, { ok: false, error: 'Faltan campos obligatorios' });
  }
  if (!declaracion) {
    return jsonResponse(400, { ok: false, error: 'Debe aceptar la declaración' });
  }
  // Email más estricto que el regex anterior.
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    return jsonResponse(400, { ok: false, error: 'Email inválido' });
  }

  const { subject, html, text } = buildEmail(payload);
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject,
      html,
      text,
    });
    if (error) {
      // Loguear solo el name/code/message — nunca el cuerpo del error completo
      // ni los emails involucrados, que pueden contener PII.
      const safe = error && typeof error === 'object'
        ? { name: (error as { name?: string }).name, message: (error as { message?: string }).message }
        : 'unknown';
      console.error('[submit-ficha] Resend error:', safe);
      return jsonResponse(502, { ok: false, error: 'No se pudo enviar el email' });
    }
    return jsonResponse(200, { ok: true });
  } catch (err) {
    const safe = err instanceof Error ? { name: err.name, message: err.message } : 'unknown';
    console.error('[submit-ficha] Unexpected error:', safe);
    return jsonResponse(500, { ok: false, error: 'Error inesperado' });
  }
};
