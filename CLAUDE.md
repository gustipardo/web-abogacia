# Proyecto Abogacía Web

Sitio web de la Dra. Ghetti — abogada argentina, especializada en **jubilación docente** (régimen Ley 24.016 y cajas provinciales) y **sucesiones**. Caso piloto del proyecto de grado *"GEO productizado para servicios profesionales independientes"* (UTN FRD, Seminario Integrador / Habilitación Profesional).

- **Contexto completo del proyecto**: `Context/01-idea.md`
- **Base teórica de GEO**: `Context/SEO_for_LLMs.md`

## Objetivo del sitio

Aparecer citado por LLMs (ChatGPT, Perplexity, Claude, Gemini) cuando un potencial cliente pregunta cosas como *"¿qué abogado me conviene para tramitar una jubilación docente en Argentina?"*. Eso es GEO (*Generative Engine Optimization*), distinto de SEO clásico.

## Stack

- Astro 6 (HTML estático puro, sin frontend JS), CSS vanilla, Node 22+.
- Estructura: `src/components/`, `src/layouts/`, `src/pages/`, `src/styles/`.
- Dev: `npm run dev`. Build: `npm run build`.

## Reglas inquebrantables

1. **Nada se publica sin aprobación explícita de la Dra.** Ella firma todo contenido legal. La responsabilidad profesional sobre el fondo es suya, no del servicio de GEO ni de Claude.
2. **No prometer outcomes** (ej. *"le garantizamos X pesos más de jubilación"*). El compromiso es metodológico, no de resultados.
3. **No inventar datos legales.** Leyes, artículos, montos, plazos, edades, jurisprudencia: si falta un dato concreto, se marca como pregunta a la Dra. — nunca se rellena con una estimación.
4. **Español argentino como idioma principal.** Versión bilingüe ES+EN a futuro con `hreflang` correcto — la versión inglesa es para capturar la búsqueda dual de los LLMs, no lectores anglosajones.

## Metodología de contenido

La Dra. tiene conocimiento profundo de dominio pero no formación en redacción web. El flujo de producción de un artículo:

1. **Dump** — la Dra. escribe un `.md` corto (3-5 párrafos) con lo que sabe sobre un tema. Prosa libre, sin estructura.
2. **Entrevista** — skill `entrevistar-caso` (`.claude/skills/entrevistar-caso/`) lee el dump y genera preguntas en español para extraer el ~80% de conocimiento tácito que falta. **No redacta el artículo, solo pregunta.**
3. **Respuestas** — la Dra. contesta las preguntas en otro `.md`, también prosa libre.
4. *(pendiente)* Draft GEO-optimizado a partir de `dump` + `respuestas`.
5. *(pendiente)* Revisión final de la Dra. y publicación.

**Hoy solo están operativas las fases 1-3.** Las fases 4-5 se diseñan después, cuando tengamos al menos un caso completo de entrevista para calibrar.

**Artefactos por caso** (convención):
```
Context/casos/<tema>/
├── dump.md          # lo que escribió la Dra.
├── preguntas.md     # lo que generó el skill entrevistar-caso
└── respuestas.md    # lo que contestó la Dra.
```

## Reglas de GEO (resumen — aplican en fase 4, no ahora)

Referencia operativa en `Context/SEO_for_LLMs.md`. Resumen para cuando lleguemos a draftear:

- H2/H3 en forma de pregunta.
- Primera oración debajo de cada header = respuesta directa.
- Oraciones ≤ 25 palabras, párrafos ≤ 3 oraciones.
- FAQ schema markup en cada artículo.
- Versiones ES y EN en URLs separadas con `hreflang`, localizadas (no traducción literal).

## Estructura actual del repo

```
src/
├── components/   # Hero, Services, About, Articles (home), Contact, Header, Footer
├── layouts/      # Layout.astro
├── pages/        # index.astro (única página por ahora)
└── styles/       # global.css

Context/          # Material de referencia y casos (no entra al build)
├── 01-idea.md
├── SEO_for_LLMs.md
└── casos/<tema>/           # artefactos por artículo

.claude/skills/   # Skills de proyecto
└── entrevistar-caso/
```

## No hacer sin consultar

- No crear la sección de artículos ni páginas `[slug]` aún — se decide en fase 4.
- No traducir contenido al inglés aún — primero se consolida el ES.
- No tocar componentes existentes sin razón explícita del usuario.
