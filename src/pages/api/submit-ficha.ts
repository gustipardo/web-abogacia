import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

type Payload = Record<string, string | string[]>;

const TO_EMAIL = import.meta.env.FICHA_TO_EMAIL || 'adriana@estudioghetti.com';
const FROM_EMAIL = import.meta.env.FICHA_FROM_EMAIL || 'Estudio Ghetti <noreply@estudioghetti.com>';

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
  // Buscar todos los empleos numerados
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
  const apellidos = get(p, 'apellidos');
  const nombres = get(p, 'nombres');
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

  // Texto plano fallback (mínimo)
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

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ ok: false, error: 'Servicio de email no configurado' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Payload inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validación mínima
  const apellidos = get(payload, 'apellidos').trim();
  const nombres = get(payload, 'nombres').trim();
  const dni = get(payload, 'dni').trim();
  const cuil = get(payload, 'cuil').trim();
  const email = get(payload, 'email_cliente').trim();
  const telefono = get(payload, 'telefono_celular').trim();
  const descripcion = get(payload, 'descripcion_consulta').trim();
  const declaracion = get(payload, 'declaracion');

  if (!apellidos || !nombres || !dni || !cuil || !email || !telefono || !descripcion) {
    return new Response(JSON.stringify({ ok: false, error: 'Faltan campos obligatorios' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!declaracion) {
    return new Response(JSON.stringify({ ok: false, error: 'Debe aceptar la declaración' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: 'Email inválido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
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
      console.error('[submit-ficha] Resend error:', error);
      return new Response(JSON.stringify({ ok: false, error: 'No se pudo enviar el email' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[submit-ficha] Unexpected error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Error inesperado' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
