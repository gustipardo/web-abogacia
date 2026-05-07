---
artículo: calculo-haber-jubilatorio-docente-porcentajes
fecha_validación: 2026-05-06
validador: Claude (validate-article)
estado_artículo: pending-validation (sin cambio)
---

# Validación — Cálculo del haber jubilatorio docente

## Resumen ejecutivo

El artículo presentaba un **error legal estructural**: confundía el **70%** del Art. 41 DL 9650/80 (régimen general en relación de dependencia) con el **75%** del Art. 43 (régimen docente del inciso b del Art. 24). Para los docentes amparados por el régimen especial, la base es **75%** y la escala correcta es **75% / 80% / 85%**, con incrementos por exceder la **edad requerida** en 3 o 5+ años, no en 10. Se aplicaron las correcciones in place (⚠️ resueltas con certeza). Quedan algunas decisiones pendientes para la Dra. (❓) sobre cómo presentar el matiz entre régimen general y régimen docente.

## Claims verificados

| # | Claim del artículo | Estado | Fuente | Notas |
|---|---|---|---|---|
| 1 | Base del haber 70% | ❌→✅ | DL 9650/80 art. 41 (general) vs **art. 43** (docentes inciso b: 75%) | Corregido a 75% |
| 2 | Cargo de mayor jerarquía como base | ✅ | DL 9650/80 art. 41, IPS FAQ | OK |
| 3 | Mínimo 36 meses consecutivos o 60 alternados | ✅ | DL 9650/80 art. 41 | OK |
| 4 | Escala 75% (3+3 años) | ❌→✅ | DL 9650/80 art. 43 | Reescrito: 80% si excede edad en 3 años |
| 5 | Escala 80% (5+5 años) | ❌→✅ | DL 9650/80 art. 43 | Reescrito: 85% si excede edad en 5+ años |
| 6 | Escala 85% (10+10 años) | ❌→✅ | DL 9650/80 art. 43 | Eliminado: la ley no contempla un escalón a 10 años. El 85% se alcanza con 5+ años excedentes |
| 7 | 85% es el máximo legal | ✅ | DL 9650/80 art. 43 | OK (techo del régimen docente) |
| 8 | Sistema móvil (paritarias docentes se trasladan) | ✅ | DL 9650/80 art. 50 | "Los importes de las prestaciones... son móviles y deberán ser actualizados de oficio" |
| 9 | Simultaneidad: 2,8% por año, tope 70%, ~25 años | ✅ | DL 9650/80 art. 47 + Defensor Pueblo BA p.246 | Mecánica: 70/25=2,8% por año; 25 años × 2,8% = 70% |
| 10 | Horas cátedra: base 20 horas | ✅ | DL 9650/80 art. 24 inc. b: "profesores con veinte (20) horas cátedra" | OK |
| 11 | Horas excedentes computan por simultaneidad | ✅ | Defensor Pueblo BA + práctica IPS | Coherente con régimen de simultaneidad |
| 12 | Citas: artículos 41, 42 y 47 | ⚠️→✅ | Faltaba **art. 43** (clave para docentes) | Agregado al disclaimer |

## Cambios aplicados

### 1. Título y shortAnswer (frontmatter)
- **Antes**: `title: "Cómo se calcula el haber jubilatorio docente: del 70% al 85%"`
- **Después**: `title: "Cómo se calcula el haber jubilatorio docente: del 75% al 85%"`
- **Razón**: para docentes del inciso b) del art. 24 (régimen especial — 50 años de edad + 25 de servicios al frente directo de alumnos), el art. 43 fija la base en 75%, no 70%.

### 2. shortAnswer corregido
- **Antes**: "El haber base es del 70% del cargo de mayor jerarquía con aportes. Si superás los mínimos de edad y años requeridos, el porcentaje sube al 75%, 80% o hasta el 85% (máximo legal)."
- **Después**: "El haber base es del 75% del cargo de mayor jerarquía con aportes. Si excedés la edad requerida en 3 años, sube al 80%; si la excedés en 5 o más años, llegás al 85% (máximo legal)."

### 3. FAQ "¿Puedo subir el porcentaje si sigo trabajando?"
- **Antes**: "Cada año extra de edad y de aportes por encima del mínimo suma sobre el 70% base, hasta el tope del 85%."
- **Después**: La ley fija dos escalones discretos: +5% (80%) si al cesar excedés la edad requerida en 3 años, +10% (85%) si la excedés en 5 o más. No es lineal.

### 4. H2 "¿Cuál es el porcentaje base y cómo sube?"
- Reescrito el cuerpo. Base = 75%. Escalones = 80% (3 años edad excedente) y 85% (5+ años edad excedente).
- Se eliminó el escalón ficticio de 85% con "10 años más de edad y 10 de servicios" — no figura en el art. 43 ni en ninguna fuente oficial consultada.

### 5. Disclaimer final
- Antes: "artículos 41, 42 y 47".
- Después: "artículos 41, **43** y 47" (43 es el aplicable a docentes del inciso b del art. 24).

### 6. dateModified
- Agregado `dateModified: 2026-05-06` al frontmatter.

## Pendientes para la Dra. (❓)

### A. Decisión editorial: ¿cubrir también el régimen general (70%)?
El artículo actual asume que el lector es docente del inciso b) del art. 24 (al frente directo de alumnos, ≥50/25 años) y aplica el art. 43. Pero hay docentes que cobran por el inciso d) (55/30 años, sin requisito de "frente directo"), y eventualmente docentes que pasaron por reciprocidad y caen bajo el art. 41 con base 70%.

**Pregunta**: ¿Querés mantener el artículo enfocado únicamente en el caso típico (inciso b, 75% base) o agregar una nota sobre cuándo aplica el 70%?

Sugerencia: dejarlo como está (foco en el caso más común, que también es el más beneficioso) y crear un artículo separado más adelante sobre "casos atípicos" o "régimen general vs régimen docente".

### B. Matiz sobre exceso de edad vs servicios
La letra del art. 43 habla solo de exceder la **edad requerida** ("excedieran en tres (3) años la edad requerida"). En la práctica, si el docente sigue trabajando, también excede los años de servicios. Pero técnicamente, alguien que entró tarde a la docencia podría tener mucha edad y pocos años — la norma no lo contempla explícitamente.

**Pregunta**: ¿Confirmás que en la práctica del IPS se exige superar **ambos** mínimos (edad y servicios) para acceder a los escalones de 80% y 85%? Una fuente terciaria (Estudio Besse) lo afirma así, pero no encontré una resolución del IPS o jurisprudencia clara.

Por ahora dejé el texto siguiendo la letra del art. 43 (excedentes solo de edad). Si hay práctica administrativa distinta, se puede ajustar.

### C. Mención de "75% intermedio"
El shortAnswer original mencionaba "75%" como un escalón intermedio. La realidad es que 75% es la **base** del régimen docente, no un escalón. El nuevo texto lo refleja, pero conviene revisar que la frase final del artículo no quede ambigua.

### D. Eventual cambio normativo (informativo, no requiere acción)
- El proyecto nacional de Milei propone unificar regímenes y eliminar especiales. La Provincia se está resistiendo.
- La Ley 15557 (Presupuesto 2026 PBA) no modifica los arts. 41, 42, 43 ni 47 del DL 9650/80. Solo redirige aportes de algunas empresas al IPS.
- No hay reforma vigente al cálculo del haber docente al 2026-05-06.

## Observaciones adicionales

1. **Voz y tono**: el artículo conserva el tono coloquial argentino y la estructura GEO (H2 como pregunta, oraciones cortas, párrafos ≤3 oraciones). Los cambios mantienen ese estilo.

2. **Una imprecisión menor que NO se cambió**: el artículo dice "el régimen del IPS" como si fuera homogéneo, cuando en realidad coexisten varios subregímenes. Para no romper la fluidez, se mantuvo. Podés evaluar si conviene un párrafo aclaratorio.

3. **No se cambió `status: pending-validation`** — eso lo decide la Dra.

## Fuentes consultadas

- **Texto oficial DL 9650/80** (IPS PBA): https://www.ips.gba.gob.ar/sites/default/files/documentos/Ley9650.pdf — descargado y leído íntegramente. Confirma redacción de arts. 24, 25, 26, 41, 42, 43, 47, 50.
- **IPS FAQ - Jubilación Ordinaria**: https://www.ips.gba.gob.ar/preguntasFrecuentes/JubilacionOrdinaria — confirma 70-85% según excedentes y mejor cargo 36/60 meses.
- **Defensoría del Pueblo PBA, "Jubilaciones y Pensiones en la Provincia de Buenos Aires"** (María Ventura Martínez): https://www.defensorba.org.ar/pdfs/jubilaciones-y-pensiones-en-la-provincia-de-bs-as-maria-ventura-martinez.pdf — confirma fórmula 70/25=2.8% por año en simultaneidad, citando art. 47 y caso "Mahlí de Ciarlotti" SCBA.
- **Argentina.gob.ar — Ley 9650 actualizada**: https://www.argentina.gob.ar/normativa/provincial/ley-9650-123456789-0abc-defg-056-9049bvorpyel/actualizacion
- **CICOP (texto Decreto-Ley 9650/80 con notas)**: https://cicop.org.ar/legislacion/decreto-ley-965080-ips/
- **Blog del Contador (jurisprudencia docente)**: https://blogdelcontador.com.ar/jubilaciones-docentes-preguntas-y-respuestas — confirma escala 75/80/85 con concurrencia de edad y servicios (50/25 → 53/28 → 55/30).
- **Estudio Besse & Asociados (cuadro de antigüedades y porcentajes)**: https://mbesse.wordpress.com/2010/09/25/ips-antiguedades-y-porcentajes-jubilatorios/ — confirma que se requieren excedentes en edad y servicios concurrentemente.
- **Ley 15557 (Presupuesto PBA 2026)**: https://normas.gba.gob.ar/documentos/xAZogLSo.html — no modifica arts. 41/42/43/47.
