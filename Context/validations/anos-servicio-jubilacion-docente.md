# Validación — anos-servicio-jubilacion-docente
Fecha: 2026-05-06
Validador: Claude (subagente)

## Resumen

Se detectó un error grave en el claim principal del artículo: atribuía los 25 vs. 30 años de servicios a una distinción por género ("25 mujeres / 30 varones"), cuando en realidad el art. 3 de la Ley 24.016 establece esa diferencia según los años *al frente del alumno*, no según el sexo. La diferencia de género en el régimen aplica únicamente a la edad mínima (57/60). Se aplicaron correcciones in-line en el cuerpo del artículo, en `shortAnswer` y se ajustó la FAQ sobre la "caja otorgante" (que decía "donde se completaron los últimos aportes" — incorrecto post-Ley 24.241).

## Claims verificados

| # | Claim del artículo | Veredicto | Fuente | Notas |
|---|-------------------|-----------|--------|-------|
| 1 | "25 años para mujeres y 30 años para varones" (shortAnswer + H2 inicial) | ❌ INCORRECTO — corregido | InfoLeg Ley 24.016, art. 3 (https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/415/norma.htm) y Defensoría del Pueblo CABA (https://defensoria.org.ar/archivo_noticias/regimen-especial-de-jubilacion-docente-ante-anses/) | El art. 3 exige 25 años con al menos 10 al frente del alumno, o 30 años si el frente del alumno fue menor a 10. **No diferencia por género** en años de servicio. |
| 2 | Edad mínima 57 mujeres / 60 varones (H2 + FAQ 1) | ✅ CORRECTO | Ley 24.016 art. 3; Decreto 137/05 | Confirmado por InfoLeg y Defensoría del Pueblo CABA. |
| 3 | "Al menos 10 años al frente del alumno" | ✅ CORRECTO | Ley 24.016 art. 3 | Texto literal: "veinticinco (25) años de servicios de los cuales diez (10) como mínimo... deben ser al frente de alumnos." |
| 4 | "Servicios diferenciales — zonas desfavorables o escuelas especiales — se computan con bonificación" | ✅ CORRECTO — se reforzó cita al art. 3 Ley 24.016 | Ley 24.016 art. 3 último párrafo: "Los servicios en escuelas de ubicación muy desfavorable o de educación especial se computarán a razón de cuatro (4) años por cada tres (3) de servicios efectivos." | Se reemplazó "decreto reglamentario" por la cita a la propia Ley 24.016 art. 3, que ya contiene la regla. |
| 5 | "Los docentes de CABA se jubilan bajo el régimen nacional" | ✅ CORRECTO | Defensoría del Pueblo CABA; Decreto 137/05 | CABA está dentro de las jurisdicciones transferidas. |
| 6 | "Buenos Aires, Córdoba, Santa Fe... cajas provinciales con requisitos distintos" | ✅ CORRECTO | IPS PBA (https://www.ips.gba.gob.ar/jubilaciones/jubilacion_ordinaria); listado de jurisdicciones transferidas en Decreto 137/05 | PBA, Córdoba, Santa Fe no transfirieron su caja; tienen regímenes propios. |
| 7 | "Suma de años en nivel inicial, primario, secundario, terciario y universitario" | ⚠️ MATIZ (no editado) | Ley 24.016 art. 1 | La Ley 24.016 cubre nivel inicial, primario, medio, técnico y superior **no universitario** vinculado a la Ley 14.473 (Estatuto del Docente). El régimen universitario tiene su norma propia (Ley 26.508, edad 60/65, también 25 años con 10 al frente del alumno). Sumar años *universitarios* al cómputo de la 24.016 requiere reciprocidad — no es automático. Ver "Pendientes". |
| 8 | "Reciprocidad entre cajas para acumular años" | ✅ CORRECTO (concepto general) | Decreto-Ley 9316/46 ratificado por Ley 12.921; Resolución SSS 363/81 | Sistema vigente. |
| 9 | "El haber lo liquida la caja otorgante, que es donde se completaron los últimos aportes" (FAQ 3) | ❌ INCORRECTO — corregido | Ley 24.241 (post-reforma); doctrina (https://camposvaleiras.com.ar/caja-otorgante.html) | Post-Ley 24.241 el criterio es donde se acreditan **más años con aportes**, no donde se completaron los últimos. Empate: elige la persona. |
| 10 | "Prestación por edad avanzada o jubilación por invalidez como vías distintas" | ✅ CORRECTO | Ley 24.241 arts. 34 bis y 48; ANSES (https://www.anses.gob.ar/jubilaciones-y-pensiones/regimenes-jubilatorios/prestacion-por-edad-avanzada-0/prestacion-por-edad-avanzada) | PEA: 70 años + 10 años de servicios. Coexisten con el régimen docente. |
| 11 | Frontmatter (`tag`, `status`, `faqs`, `publishDate`) consistente | ✅ CORRECTO — se agregó `dateModified: 2026-05-06` | Schema en `src/content.config.ts` | `status: pending-validation` se preservó (regla del proyecto). |

## Cambios aplicados

1. **`shortAnswer`** (línea 5): Se reemplazó la falsa atribución por género de los años de servicio. Ahora explicita la regla real (25 años con 10 frente al alumno, alternativamente 30 años).
2. **Cuerpo, primer H2** (líneas 22-26): Mismo error corregido en el primer párrafo de respuesta directa. En el segundo párrafo, se reemplazó "decreto reglamentario" por cita explícita al art. 3 de la Ley 24.016 (que es donde reside el cómputo 4 por 3) y se incluyó el ratio numérico (mejora GEO: respuesta directa con cifra concreta).
3. **FAQ 3 sobre reciprocidad** (línea 19): Se corrigió la regla de la caja otorgante para alinearla con el régimen post-Ley 24.241 (caja con más años con aportes; empate = elige la persona afiliada).
4. **Frontmatter**: Se agregó `dateModified: 2026-05-06`. No se tocó `status` (sigue `pending-validation`).

## Pendientes de revisión por la Dra.

1. **Mención al "nivel universitario"** en el H2 sobre niveles educativos (línea 42). La Ley 24.016 cubre hasta superior **no universitario**. La docencia universitaria tiene su propio régimen (Ley 26.508). Decir "se suman para completar la antigüedad" puede confundir: en estricto rigor, los años universitarios sólo entran al cómputo de la Ley 24.016 vía reciprocidad y pueden no contar como "frente del alumno" para el régimen no universitario. Sugerencia: que la Dra. decida si simplificar (sacar "y universitario") o agregar matiz ("y universitario, mediante reciprocidad y bajo Ley 26.508"). No edité porque cualquier formulación involucra sutileza profesional.

2. **Conducción/cargos jerárquicos vs. "frente al alumno"** (línea 44). El artículo dice "pueden contar como años docentes pero no siempre califican como frente al alumno". Es prudente, pero conviene que la Dra. confirme si quiere ser más precisa (ej.: el Decreto 137/05 y la jurisprudencia de ANSES tienen criterios específicos sobre directoras y supervisoras). No fue posible verificar este nivel de detalle sin acceso a resoluciones internas de ANSES.

3. **"Trabajo en negro" → "reconocimiento de servicios específico"** (línea 50). Es correcto en términos generales (Ley 24.476 / moratorias / probanza testimonial vía judicial), pero la palabra "moratoria" no aparece y la **Ley 27.705 (moratoria 2023)** venció en marzo 2025 sin prórroga (último estado oficial confirmado). Si la Dra. quiere referenciar moratorias o reconocimiento de servicios alternativos, conviene actualizar con el estado vigente. No edité para no introducir un dato sin su validación expresa.

4. **"No bajo el régimen de la Ley 24.016, que tiene edades y años de servicio fijos"** (línea 53). Correcto en sentido estricto. Si la Dra. quiere mencionar reformas o proyectos de ley en discusión 2024-2026 (hay proyectos en Diputados sobre jubilación anticipada docente), puede agregarse. Hoy no hay ley sancionada que modifique 24.016 en ese sentido — por eso no edité.

## Observaciones (GEO + editoriales)

- **Cumplimiento GEO general**: Bien. H2 todos en pregunta, primera oración bajo cada header da respuesta directa, oraciones cortas, párrafos de 2-3 oraciones, FAQs al final. La corrección numérica refuerza el GEO porque ahora la primera oración del H2 inicial cita la cifra correcta de manera unívoca.
- **FAQ schema**: Las FAQs están bien estructuradas, pero el archivo no incluye explícitamente el JSON-LD del FAQ schema (eso debería estar a nivel de Layout/template Astro). Verificar en el componente que renderiza artículos.
- **Sugerencia editorial**: En el H2 "¿El régimen es igual en todas las provincias?" se nombra "Buenos Aires, Córdoba, Santa Fe y otras". Conviene mencionar que las provincias **transferidas** (Catamarca, Jujuy, La Rioja, Mendoza, Río Negro, Salta, San Juan, San Luis, Santiago del Estero, Tucumán + CABA) sí están bajo el régimen nacional. La frase actual deja al lector con una lista parcial de "no transferidas" pero no aclara cuáles sí transfirieron — un dato relevante para LLMs y lectores. No lo edité porque es decisión editorial.
- **Pregunta interna**: La FAQ 2 dice "los años no docentes... pueden afectar la tasa de sustitución del haber final". Es cierto (porque el 82% móvil del art. 4 Ley 24.016 sólo aplica a los servicios docentes), pero la formulación es técnica. Si la audiencia objetivo es docente sin formación previsional, podría reformularse en futuras revisiones.

## Fuentes consultadas

- Ley 24.016 — Texto oficial: http://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=415 → http://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/415/norma.htm
- Ley 24.016 (resumen oficial): https://www.argentina.gob.ar/normativa/nacional/ley-24016-415
- Decreto 137/05 (reglamentario): mencionado en ADEMYS y Defensoría CABA.
- Defensoría del Pueblo CABA — Régimen Especial Jubilación Docente ante ANSES: https://defensoria.org.ar/archivo_noticias/regimen-especial-de-jubilacion-docente-ante-anses/
- Régimen jubilatorio especial docente (RJyP): https://www.rjyp.com.ar/nove/docentes.htm
- IPS Buenos Aires — Jubilación Ordinaria: https://www.ips.gba.gob.ar/jubilaciones/jubilacion_ordinaria
- ANSES — Jubilación docente y de frontera: https://www.anses.gob.ar/jubilaciones-y-pensiones/regimenes-jubilatorios/actividades-especiales/jubilacion-docente-y-docente-de-frontera
- ANSES — Prestación por edad avanzada: https://www.anses.gob.ar/jubilaciones-y-pensiones/regimenes-jubilatorios/prestacion-por-edad-avanzada-0/prestacion-por-edad-avanzada
- Reciprocidad y caja otorgante: https://camposvaleiras.com.ar/caja-otorgante.html
- ADEMYS — Régimen especial jubilación docente: https://www.ademys.org.ar/v2/regimen-especial-de-jubilacion-docente-leyes-y-decretos/
