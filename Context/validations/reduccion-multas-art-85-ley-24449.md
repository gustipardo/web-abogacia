# Validación — reduccion-multas-art-85-ley-24449
Fecha: 2026-05-06
Validador: Claude (subagente)

## Claims verificados

| # | Claim | Veredicto | Fuente | Notas |
|---|-------|-----------|--------|-------|
| 1 | Existe la Ley 24.449 (Tránsito Nacional) y rige | ✅ correcto | https://www.argentina.gob.ar/normativa/nacional/ley-24449-818 | Sancionada 23/12/1994, publicada 10/02/1995, vigente con modificaciones. |
| 2 | "El artículo 85 de la Ley 24.449 (modificado por la Ley 26.363) permite una reducción del 50% del valor de la multa cuando corresponde a normas de circulación y existe reconocimiento voluntario de la infracción" | ✅ correcto | https://www.argentina.gob.ar/normativa/nacional/ley-26363-140098/actualizacion , https://servicios.infoleg.gob.ar/infolegInternet/anexos/140000-144999/140098/norma.htm , https://leyes-ar.com/ley_de_transito/85.htm | Texto vigente del Art. 85 (sustituido por el Art. 35 de la Ley 26.363, sancionada 09/04/2008): "La sanción de multa puede: a) Abonarse con una reducción del CINCUENTA POR CIENTO (50%) cuando corresponda a normas de circulación en la vía pública y exista reconocimiento voluntario de la infracción, en todos los casos esto tiene los efectos de sanción firme; b) Ser exigida mediante un sistema de cobro por vía ejecutiva cuando no se hubiera abonado en término; c) Abonarse en cuotas en caso de infractores de escasos recursos…". El artículo refleja correctamente el inciso a). |
| 3 | "La modificación es de la Ley 26.363" | ✅ correcto | https://www.argentina.gob.ar/normativa/nacional/ley-26363-140098/actualizacion | Es el Art. 35 de la Ley 26.363 (Tránsito y Seguridad Vial, BO 30/04/2008) el que sustituye el texto del Art. 85 de la Ley 24.449. |
| 4 | "La reducción aplica a infracciones a normas de circulación, no a faltas graves o conductas excluidas por la ley" (FAQ #2) | ⚠️ parcialmente preciso | Art. 85 inc. a) Ley 24.449 (texto Ley 26.363) | El Art. 85 limita literalmente el beneficio a "normas de circulación en la vía pública" — no usa la dicotomía "leves vs. graves". La práctica de los Juzgados de Faltas es que **algunas faltas graves del Art. 77 (alcoholemia, exceso grave, fuga, etc.) no acceden al 50%** porque exceden la categoría "normas de circulación" o porque la reglamentación local así lo dispone. La FAQ es defendible en la práctica pero técnicamente "faltas graves" no es la categoría que excluye el descuento — lo que excluye es no encuadrar en "normas de circulación". **No se editó** porque la formulación actual no es falsa y simplifica el concepto para el lector no jurídico, pero queda como observación para la Dra. |
| 5 | "Estar prescriptas (Art. 89 de la misma ley)" | ✅ correcto | https://leyes-ar.com/ley_de_transito/89.htm | Art. 89 Ley 24.449: prescribe a los 2 años la acción por falta leve y a los 5 años la acción por falta grave y las sanciones. La cita del artículo es correcta. |
| 6 | "Verificá la deuda en el sistema oficial (en PBA: infraccionesba.gba.gob.ar)" | ✅ correcto | https://infraccionesba.gba.gob.ar/preguntas-frecuentes | Es el sistema oficial de la Subsecretaría de Política y Seguridad Vial del Ministerio de Transporte de la Provincia de Buenos Aires. URL verificada y operativa. |
| 7 | Aplicación en PBA: la Ley 13.927 mantiene la reducción del 50% por pago voluntario | ✅ correcto | https://normas.gba.gob.ar/documentos/0YqDnfd0.html , https://normas.gba.gob.ar/documentos/B3yPzhj0.html | La Ley 13.927 PBA adhiere a la Ley 24.449 y a la 26.363. El **Decreto reglamentario 532/09** (Anexo I) regula el pago voluntario: para la Notificación de Infracciones con pago voluntario se aplica el monto mínimo de UF con un descuento del 50%, y el presunto infractor tiene **30 días desde la notificación** para acogerse al beneficio. El artículo no menciona explícitamente este plazo de 30 días, pero la afirmación general (existe el beneficio en PBA) es correcta. |
| 8 | Lenguaje no promete éxito | ✅ correcto | — | El artículo usa "puede reducirse", "puede negociar rebajas adicionales", "conviene cuando…", "no conviene reconocer automáticamente". No promete outcomes. El bloque final remite a "consultá con un profesional", correcto. |
| 9 | "Un abogado especializado puede negociar rebajas adicionales según los antecedentes del caso, las condiciones particulares del infractor y la receptividad del Juzgado de Faltas" | ⚠️ no surge del Art. 85 | Art. 84 Ley 24.449 (rangos UF), Decreto 532/09 PBA Art. 33 (facultades del Juzgado de Faltas) | El Art. 85 fija únicamente el 50% por reconocimiento voluntario. Las "rebajas adicionales" por sobre ese 50% no son un derecho consagrado en Art. 85 — pueden surgir de la **graduación de la sanción dentro del rango de UF del Art. 84** o de la facultad discrecional del Juzgado de Faltas (mínimo legal, atenuantes, condiciones del infractor). El artículo no afirma explícitamente que sea un derecho derivado de Art. 85, sino una práctica profesional ("un abogado especializado puede negociar"), lo cual es defendible. **No se editó** porque la redacción no afirma una base legal incorrecta; sólo describe una práctica. Pero conviene que la Dra. confirme si en su experiencia esa negociación es efectivamente viable en los Juzgados de Faltas en los que opera. |
| 10 | Frontmatter consistente con `src/content.config.ts` | ✅ correcto | — | Se agregó `dateModified: 2026-05-06`. Se mantiene `status: pending-validation` (no se publica sin aprobación de la Dra.). |

## Cambios aplicados

1. **Frontmatter — `dateModified`**:
   - Agregado `dateModified: 2026-05-06` al frontmatter (campo opcional ya presente en el schema de la colección).

No se modificó el cuerpo del artículo: las afirmaciones jurídicas verificables son correctas y las afirmaciones prácticas (rebajas adicionales, exclusiones) están redactadas con cautela.

## Pendientes de revisión por la Dra.

1. **Plazo de 30 días en PBA — agregar al artículo**: el artículo nombra el sistema `infraccionesba.gba.gob.ar` pero no menciona el plazo de 30 días desde la notificación para acogerse al pago voluntario con el 50% (Decreto 532/09 PBA Art. 35 inc. G). Es información práctica concreta que probablemente convenga incorporar — por ejemplo en el paso 1 de "Qué pasos seguir antes de pagar" o en una FAQ adicional. La Dra. decide si agregar.

2. **Categoría que excluye el 50% (FAQ #2)**: la FAQ actual dice que la reducción "no aplica a faltas graves o conductas excluidas por la ley". Técnicamente, lo que el Art. 85 inc. a) limita es "normas de circulación en la vía pública" — la categoría "faltas graves" del Art. 77 es práctica habitual de los Juzgados pero no es el criterio literal de la ley. Sugerencia para la Dra.: confirmar si quiere mantener la formulación actual (más legible) o precisar a "infracciones que exceden el ámbito de las normas de circulación en la vía pública (por ejemplo, conducir alcoholizado, fuga ante autoridad, exceso grave de velocidad)".

3. **"Rebajas adicionales" — base legal**: la afirmación de que un abogado puede "negociar rebajas adicionales" descansa en la práctica de los Juzgados de Faltas (graduación dentro del rango de UF del Art. 84, atenuantes). No surge del Art. 85. Si la Dra. quiere blindar el artículo, puede:
   - Mantener la redacción actual (aceptable, no afirma una base legal incorrecta).
   - Aclarar que esa negociación se basa en la facultad de graduación de la sanción del Juzgado de Faltas dentro del rango legal, no en Art. 85.
   La decisión depende de cuán conservador quiera ser el tono.

4. **Reincidencia (Art. 87)**: el artículo no menciona que la **reincidencia** duplica la sanción (Art. 87 Ley 24.449) — esto puede ser relevante para la decisión de pagar con o sin reducción, porque pagar con reducción tiene "efectos de sanción firme" (texto literal del Art. 85 inc. a) y por lo tanto computa para la reincidencia. La Dra. decide si esto entra en este artículo o en uno separado.

5. **"Efectos de sanción firme" — implicancia clave**: el texto literal del Art. 85 inc. a) dice "en todos los casos esto tiene los efectos de sanción firme". Esto significa que pagar con la reducción **es una condena firme, no una mera transacción** — no admite recurso ulterior y queda registrada como antecedente. El artículo actual no lo dice explícitamente. Es información de alto valor para el lector que está decidiendo si pagar — recomiendo a la Dra. evaluar si agregar una FAQ del tipo *"¿Pagar con la reducción del 50% deja antecedentes?"*.

## Observaciones

- **Ley 24.449 + Ley 26.363 + Ley 13.927 PBA**: el artículo trabaja correctamente con el marco nacional (24.449 modif. 26.363) y menciona PBA via `infraccionesba.gba.gob.ar`. La cita normativa central (Art. 85 modif. Ley 26.363) es exacta.

- **Texto oficial vigente del Art. 85 inc. a)**:
  > "Abonarse con una reducción del CINCUENTA POR CIENTO (50%) cuando corresponda a normas de circulación en la vía pública y exista reconocimiento voluntario de la infracción, en todos los casos esto tiene los efectos de sanción firme."

  El artículo simplifica a "normas de circulación" omitiendo "en la vía pública", lo cual no cambia el sentido pero conviene tenerlo presente.

- **Status mantenido**: `pending-validation`. No se cambió a `published` — la Dra. debe revisar y aprobar.

- **No se realizaron commits** según instrucciones.

## Fuentes consultadas

- InfoLEG / Argentina.gob.ar — Ley 24.449: https://www.argentina.gob.ar/normativa/nacional/ley-24449-818
- InfoLEG — Ley 26.363 (texto original): https://servicios.infoleg.gob.ar/infolegInternet/anexos/140000-144999/140098/norma.htm
- Argentina.gob.ar — Ley 26.363 (texto actualizado): https://www.argentina.gob.ar/normativa/nacional/ley-26363-140098/actualizacion
- Texto Art. 85 Ley 24.449: https://leyes-ar.com/ley_de_transito/85.htm
- Texto Art. 84 Ley 24.449: https://leyes-ar.com/ley_de_transito/84.htm
- Texto Art. 89 Ley 24.449 (prescripción): https://leyes-ar.com/ley_de_transito/89.htm
- Normas GBA — Ley 13.927 PBA: https://normas.gba.gob.ar/documentos/0YqDnfd0.html
- Normas GBA — Decreto 532/09 reglamentario Ley 13.927: https://normas.gba.gob.ar/documentos/B3yPzhj0.html
- Sistema oficial PBA — InfraccionesBA: https://infraccionesba.gba.gob.ar/preguntas-frecuentes
