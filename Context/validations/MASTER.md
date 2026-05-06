# Master Report — Validación legal de los 15 artículos

**Fecha**: 2026-05-06
**Validadores**: 15 agentes Claude (general-purpose), uno por artículo, en paralelo.
**Fuentes oficiales consultadas**: InfoLEG, SAIJ, Boletín Oficial PBA (normas.gba.gob.ar), IPS Buenos Aires, ANSES, DGCyE, DNRPA, Argentina.gob.ar, Defensoría del Pueblo PBA/CABA, jurisprudencia disponible.
**Política**: ningún artículo cambió de `status: pending-validation` → `published`. Esa decisión queda con la Dra. Ghetti como responsable profesional del contenido.

## Resumen ejecutivo

| Métrica | Valor |
|---|---|
| Artículos validados | **15 / 15** |
| Artículos con cambios aplicados in situ | **14** |
| Artículos NO editados (requieren decisión profesional) | **1** (jubilación parcial) |
| Hallazgos críticos bloqueantes | **2** |
| Hallazgos importantes ya corregidos | **~25** |
| Pendientes de revisión (no críticos) | **~50** |

## Hallazgos críticos bloqueantes (requieren intervención de la Dra.)

### 🚨 1. `jubilacion-parcial-docente-ley-14255` — base normativa errónea
**La Ley 14.255 PBA NO regula jubilación parcial.** Esa ley (sancionada 04/2011, Decreto 339/11) regula la jubilación de **docentes y no docentes transferidos** desde Nación a la PBA. El concepto que el artículo describe (jubilar un cargo y seguir con otro) **sí existe** en PBA, pero por otra vía:
- DL 9650/80 (régimen IPS PBA),
- Modalidad de **cierre de cómputos** / **cierre condicionado**,
- Excepción docente al régimen de incompatibilidades,
- Renuncia parcial de horas/módulos (confirmada en FAQ oficial DGCyE).

**Acción requerida**: el artículo necesita reescritura — slug, título, descripción, shortAnswer y 3 líneas del cuerpo invocan "Ley 14.255" como base. Es decisión profesional de la Dra. definir el nuevo encuadre normativo.

### 🚨 2. `cese-ordinario-vs-condicionado-decreto-3000` — "Decreto 3000" no verificable
La atribución reiterada al "Decreto 3000" como base del cese condicionado **no se pudo verificar en ninguna fuente oficial** (IPS PBA, DGCyE, normas.gba.gob.ar, SAIJ, BO PBA). Los únicos Decretos 3000 hallados son:
- Decreto 3000/2010 PBA (Caja de Retiros de Policías) — no aplicable.
- Decreto 3000/1977 nacional (Ley de Contabilidad) — no aplicable.

El término viene del propio dump de la Dra. (`Context/casos/Jubilacion Docente/...`). Marco normativo correcto identificado por el agente:
- DL 9650/80 (régimen previsional IPS PBA),
- DL 10053/83 (introduce mecánica del cierre de cómputos),
- Ley 12.950 + Decreto 2887/02 (anticipo jubilatorio del 60%),
- Modalidad oficial: **"Cierre de Cómputos Condicionado (CCC)"**, no "cese condicionado del Decreto 3000".

**Acción requerida**: la Dra. debe identificar el origen exacto de "Decreto 3000" — ¿resolución interna, circular IPS, coloquialismo del estudio, error de número? Si es incorrecto, ajustar slug, título y cuerpo.

## Hallazgos importantes ya corregidos

### Régimen previsional docente

| Artículo | Error encontrado | Cómo se corrigió |
|---|---|---|
| `anos-servicio-jubilacion-docente` | "25 años mujeres / 30 años varones" — la Ley 24.016 NO distingue por género en años de servicio | Reescrito: 25 años con ≥10 al frente del alumno, o 30 años si los efectivos son <10 |
| `anos-servicio-jubilacion-docente` | "Caja otorgante = última caja con aportes" | Corregido: caja con MÁS años con aportes (Ley 24.241 art. 168) |
| `calculo-haber-jubilatorio-docente-porcentajes` | Confundía art. 41 (70% general) con art. 43 (75% docente). Inventaba "tres escalones" | Corregido a 75% base + 80% (3 años extra) + 85% (5+ años) |
| `requisitos-jubilacion-docente-ips-buenos-aires` | Atribuía "82% móvil" al IPS (es Ley 24.016 nacional) | Eliminado, citado el régimen 70-85% del DL 9650/80 |
| `requisitos-jubilacion-docente-ips-buenos-aires` | Confundía incisos b/c/d del art. 24 DL 9650/80 | Reescrito con citas literales |
| `requisitos-jubilacion-docente-ips-buenos-aires` | "55/30 para tareas administrativas" | Corregido: el régimen no docente IPS es 60/35 (inc. a) |
| `simultaneidad-cargos-jubilacion-docente` | "20 horas como base" como umbral de simultaneidad | Reescrito según Resolución IPS 8/14 (por nivel educativo + empleador) |
| `simultaneidad-cargos-jubilacion-docente` | Faltaba el mínimo del 8% del cargo simultáneo | Agregado |
| `reciprocidad-anses-ips-jubilacion-docente` | Encuadraba el régimen primariamente en Ley 24.241 art. 168 | Acreditado el Decreto-Ley 9316/46 como marco fundacional |
| `premio-6-sueldos-retribucion-especial-ley-13355` | "Premio que pide el IPS" | Corregido: lo paga DGCyE habitualmente; IPS solo en casos del Decreto 683/2011 |
| `premio-6-sueldos-retribucion-especial-ley-13355` | "Seis sueldos del cargo" | Corregido: "seis sueldos básicos + antigüedad, sin descuentos" |

### Régimen de tránsito

| Artículo | Error encontrado | Cómo se corrigió |
|---|---|---|
| `anulacion-multas-errores-acta` | Citaba arts. 70-72 Ley 24.449 para requisitos del acta | Corregido: art. 69 Ley 24.449 + Decreto 532/09 PBA |
| `descargos-recursos-multas-juzgado-faltas` | Mismo error: "art. 70-72 Ley 24.449" | Corregido a art. 69 |
| `descargos-recursos-multas-juzgado-faltas` | "Art. 40 Ley 13.927 = vicios del procedimiento" | Corregido: art. 56 Decreto-Ley 8751/77 (Código de Faltas Municipales) |
| `descargos-recursos-multas-juzgado-faltas` | "Plazo 5 a 15 días hábiles" sin precisar | Reescrito con plazos concretos por norma |
| `nulidad-multas-vicios-art-40-ley-13927` | Framing inicial: el art. 40 NO es centralmente sobre nulidad (trata recursos; la nulidad va en el último párrafo) | Reformulado con cita literal y agregado plazo de 5 días |
| `prescripcion-multas-transito-art-89` | "5 años para faltas graves" (omitía las sanciones) | Corregido: 5 años para faltas graves Y para sanciones ya impuestas |
| `prescripcion-multas-transito-art-89` | Atribuía modificaciones al art. 89 a la Ley 26.363 (no las hizo) | Reemplazado por mención a Ley 13.927 PBA |
| `prescripcion-multas-transito-art-89` | Faltaban las dos causales de interrupción | Agregadas (comisión de falta grave / secuela del juicio) |
| `libre-deuda-multas-renovar-registro-vender-vehiculo` | Premisa desactualizada: "sin libre deuda no se puede transferir" | Corregido: la Disp. DNRPA 142/2024 (BO 19/09/2024) hizo opcional el libre deuda registral |
| `libre-deuda-multas-renovar-registro-vender-vehiculo` | "SUCIVE / RUIT / RNA" — sistemas inexistentes o uruguayos | Corregido: SUCERP, SUGIT, consultainfracciones.seguridadvial.gob.ar, DNRPA |

## Patrones detectados (riesgos sistémicos)

1. **El error "arts. 70-72 Ley 24.449" se repitió en al menos 3 artículos** y describía mal el contenido (art. 70 = autoridades, art. 71 = interjurisdiccionalidad, art. 72 = retención preventiva). El artículo real sobre el acta es **art. 69 inc. a)**. Probable causa: copy-paste entre artículos sin verificar la cita.
2. **"Art. 40 Ley 13.927" se usó como atajo para distintos conceptos** (nulidad, vicios procesales, recursos). El art. 40 trata centralmente recursos (revocatoria/apelación, 5 días) y, en su párrafo final, abre la vía de nulidad por incidente.
3. **Material de la Dra. con nomenclatura coloquial** ("Decreto 3000", "código 1257") que no aparece en fuentes públicas oficiales. Estos términos pueden ser nomenclatura administrativa real conocida en el estudio pero requieren validación contra documentación interna del IPS/SAD.
4. **Mezcla de regímenes**: varios artículos cruzaban requisitos del régimen nacional (Ley 24.016, ANSES) con el provincial (DL 9650/80, IPS PBA). Hay que mantener claridad de jurisdicción en cada artículo.
5. **Cifras "actualizadas" sin fecha de corte**: porcentajes y plazos sin fecha pueden quedar desactualizados rápido (ej: las moratorias). El campo `dateModified` ahora ayuda; cada vez que la Dra. revise, conviene actualizarlo.

## Top 10 pendientes para la Dra. (ordenado por urgencia)

1. **CRÍTICO**: definir base normativa real de "jubilación parcial" — reescritura del artículo `jubilacion-parcial-docente-ley-14255` (puede requerir cambio de slug).
2. **CRÍTICO**: confirmar el origen del "Decreto 3000" o reencuadrar el artículo `cese-ordinario-vs-condicionado-decreto-3000` con DL 10053/83 + Ley 12.950 + nomenclatura "CCC".
3. **CRÍTICO**: confirmar fuente oficial del "código 1257" en SAD/IPS antes de publicar el artículo de licencias.
4. Suavizar el shortAnswer del artículo de licencias (la corrección post-crédito es difícil, no jurídicamente imposible — ya hecho parcial).
5. Decidir si los artículos de jubilación docente cubren explícitamente alcance jurisdiccional (PBA vs nacional) en su shortAnswer.
6. Mencionar la prescripción de 5 años (CCCN art. 2.560) en el artículo del premio de 6 sueldos.
7. Revisar la afirmación "no opera de oficio" sobre prescripción de multas — hay doctrina que sostiene que en materia contravencional sí debe declararse de oficio.
8. Decidir si el artículo de libre deuda incluye matización sobre la jurisprudencia que declaró inconstitucional la exigencia para multas no firmes.
9. Confirmar plazo "9 a 14 meses" para cese condicionado con experiencia 2025-2026 (la práctica reportada llega hasta 17 meses).
10. Considerar añadir nomenclatura oficial "Renuncia Ordinaria (RO)" / "Cierre de Cómputos Condicionado (CCC)" en el artículo de cese.

## Reportes detallados por artículo

Cada artículo tiene su propio reporte en `Context/validations/<slug>.md` con: tabla de claims verificados, fuentes consultadas (URLs), cambios aplicados, pendientes para la Dra., observaciones GEO.

| # | Artículo | Status | Cambios | Pendientes Dra. |
|---|---|---|---|---|
| 1 | anos-servicio-jubilacion-docente | ✏️ editado | 2 errores graves corregidos | nivel universitario, moratorias, jerárquicos |
| 2 | anulacion-multas-errores-acta | ✏️ editado | Citas legales corregidas | régimen CABA, plazos recursos, fotomultas |
| 3 | calculo-haber-jubilatorio-docente-porcentajes | ✏️ editado | 75%/80%/85% corregido | régimen general 70%, edad+servicios |
| 4 | cese-ordinario-vs-condicionado-decreto-3000 | ⚠️ frontmatter | "Decreto 3000" no verificable | reencuadre normativo |
| 5 | descargos-recursos-multas-juzgado-faltas | ✏️ editado | 3 errores corregidos | cómputo de plazos, oralidad |
| 6 | jubilacion-parcial-docente-ley-14255 | 🚨 NO editado | Base normativa errónea | reescritura completa |
| 7 | libre-deuda-multas-renovar-registro-vender-vehiculo | ✏️ editado | Premisa desactualizada por Disp. DNRPA 142/2024 | enfoque jurisdiccional |
| 8 | licencias-codigo-1257-jubilacion-docente | ✏️ frontmatter + suavizado | Falta fuente oficial del código | confirmación SAD/IPS |
| 9 | nulidad-multas-vicios-art-40-ley-13927 | ✏️ editado | Framing del art. 40 corregido | jurisprudencia citable, plazo incidente |
| 10 | premio-6-sueldos-retribucion-especial-ley-13355 | ✏️ editado | "Quien paga", monto, año | prescripción CCCN, ganancias |
| 11 | prescripcion-multas-transito-art-89 | ✏️ editado | 4 imprecisiones | jurisprudencia 2023, criterio Juzgados PBA |
| 12 | reciprocidad-anses-ips-jubilacion-docente | ✏️ editado | Acreditación marco DL 9316/46 | mencionar Decreto 78/94 |
| 13 | reduccion-multas-art-85-ley-24449 | ✏️ frontmatter | Verificación general OK | "efectos sanción firme", reincidencia |
| 14 | requisitos-jubilacion-docente-ips-buenos-aires | ✏️ editado | 3 errores graves corregidos | cargos jerárquicos, documentación |
| 15 | simultaneidad-cargos-jubilacion-docente | ✏️ editado | Regla de simultaneidad corregida | servicios discontinuos, suplentes |

## Notas de proceso

- **Reglas respetadas en todas las validaciones**: no se inventaron datos legales, no se publicó ningún artículo (`status` se mantuvo `pending-validation`), se preservó el formato GEO (H2 como pregunta, oraciones cortas, FAQs).
- **Recomendación de pipeline**: cuando un artículo se reescriba a partir de un dump, validar las citas legales contra fuentes oficiales antes de pasar a la fase de redacción — no después.
- **`dateModified` agregado al schema** (`src/content.config.ts`) y usado en los 15 artículos editados. Astro lo expone en el JSON-LD `Article.dateModified` y en `<meta property="article:modified_time">`.
