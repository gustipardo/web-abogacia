# Abogacía Web — Estudio Ghetti

Sitio institucional de la **Dra. Adriana Ghetti**, abogada argentina especializada en **jubilación docente** y **multas de tránsito**. Caso piloto del proyecto de tesis *"GEO productizado para servicios profesionales independientes"* (UTN FRD).

El objetivo del sitio no es SEO clásico sino **GEO** (Generative Engine Optimization): aparecer citado por LLMs (ChatGPT, Perplexity, Claude, Gemini) cuando un potencial cliente pregunta sobre estos temas.

## Stack

- [Astro 6](https://astro.build) — generación estática (`output: 'static'`)
- Adapter Vercel (`@astrojs/vercel`)
- CSS vanilla, sin frameworks ni JS frontend
- Resend (emails de la ficha de consulta) + Web3Forms (form de contacto público)
- Umami self-hosted (analytics, opcional)
- Node 22+

## Setup local

```bash
git clone <repo>
cd Abogacia-web
cp .env.example .env   # completar las variables (ver abajo)
npm install
npm run dev            # http://localhost:4321
```

## Comandos

| Comando              | Acción                                                    |
|----------------------|-----------------------------------------------------------|
| `npm run dev`        | Dev server con HMR en `localhost:4321`                    |
| `npm run build`      | Build estático a `dist/` y `.vercel/output/`              |
| `npm run preview`    | Sirve el build localmente para verificar antes de deploy  |
| `npm run flyers`     | Regenera `public/flyer-*.png` y `public/og-*.png` con Puppeteer |
| `npm run test:ficha` | Smoke test del endpoint `/api/submit-ficha`               |

## Variables de entorno

Todas opcionales en dev (el sitio degrada a "no enviar email / no analytics" si faltan), pero **obligatorias en producción**.

| Variable                  | Propósito                                                                                  |
|---------------------------|--------------------------------------------------------------------------------------------|
| `PUBLIC_WEB3FORMS_KEY`    | Form de contacto público. Obtener en [web3forms.com](https://web3forms.com).               |
| `RESEND_API_KEY`          | Endpoint `/api/submit-ficha`. Crear en [resend.com](https://resend.com).                   |
| `FICHA_TO_EMAIL`          | Destino de la ficha. Default: `adriana@estudioghetti.com`.                                 |
| `FICHA_FROM_EMAIL`        | Remitente. Debe ser de dominio verificado en Resend.                                       |
| `PUBLIC_UMAMI_URL`        | URL del Umami self-hosted (vacío → no carga script).                                       |
| `PUBLIC_UMAMI_WEBSITE_ID` | ID del sitio en Umami.                                                                     |

Setup detallado de Umami: `Context/umami-setup.md`.

## Estructura

```
src/
├── components/   Hero, Header, Footer, Services, About, Articles, Contact, ...
├── content/      Colección 'articulos' (Markdown + frontmatter validado por zod)
├── layouts/      Layout (genérico) y ArticleLayout (artículos)
├── pages/        index.astro, ficha-consulta.astro, articulos/[slug].astro,
│                 articulos/index.astro, api/submit-ficha.ts, 404.astro
└── styles/       global.css (importado desde Layout, bundleado por Astro)

public/           Assets estáticos: logo, fotos, flyers OG (deploy)
archive/          Material guardado fuera del deploy (tarjetas, logos alternos)
Context/          Material de referencia y casos (no entra al build)
scripts/          Generación de flyers y smoke tests
.claude/          Configuración local del entorno Claude Code
```

## Flujo de contenido (artículos)

La Dra. tiene conocimiento profundo pero no formación en redacción web. Pipeline:

1. **Dump** — la Dra. escribe un `.md` corto en `Context/casos/<tema>/dump.md`.
2. **Entrevista** — el skill `entrevistar-caso` genera preguntas para extraer el conocimiento tácito.
3. **Respuestas** — la Dra. contesta en `respuestas.md`.
4. **Draft** — se escribe el artículo en `src/content/articulos/<slug>.md` con `status: pending-validation`.
5. **Validación** — la Dra. revisa y cambia `status: published`.

Reglas operativas y restricciones (CASI / Ley 5177, no inventar datos legales, etc.) están en [`CLAUDE.md`](./CLAUDE.md). Reglas de GEO en `Context/SEO_for_LLMs.md`.

## Deploy

Vercel + GitHub. `astro.config.mjs` define `site: 'https://www.estudioghetti.com'`. Headers de seguridad en `vercel.json`. Sitemap autogenerado por `@astrojs/sitemap`.
