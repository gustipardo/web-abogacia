# Validación — anulacion-multas-errores-acta
Fecha: 2026-05-06
Validador: Claude (subagente)

## Claims verificados

| # | Claim | Veredicto | Fuente | Notas |
|---|-------|-----------|--------|-------|
| 1 | Existe la Ley 24.449 (Tránsito Nacional), vigente | ✅ correcto | https://www.argentina.gob.ar/normativa/nacional/ley-24449-818 | Sancionada 23/12/1994, publicada 10/02/1995, vigente con modificaciones |
| 2 | "Los requisitos del acta surgen de los artículos 70 a 72 de la Ley 24.449" | ❌ incorrecto | https://leyes-ar.com/ley_de_transito/69.htm , https://leyes-ar.com/ley_de_transito/70.htm , https://leyes-ar.com/ley_de_transito/71.htm , https://leyes-ar.com/ley_de_transito/72.htm | Art. 70 = "Deber de las autoridades" (general), Art. 71 = interjurisdiccionalidad / defensa escrita a >60km, Art. 72 = retención preventiva. **El procedimiento e inmediato labrado del acta única están en el Art. 69 inc. a)**. Los datos concretos que el acta debe contener están en la **reglamentación** (Decreto 779/95 nacional y, en PBA, Decreto 532/09 reglamentario de Ley 13.927). Se corrigió la cita en el cuerpo y en el bloque final. |
| 3 | Ley 13.927 PBA (régimen de tránsito provincial) existe y rige | ✅ correcto | https://normas.gba.gob.ar/documentos/0YqDnfd0.html , http://www.vialidad.gba.gov.ar/datos/educacion_vial/publicaciones/Ley%2013927_1.pdf | Ley 13.927 de adhesión a las Leyes Nacionales 24.449 y 26.363, con modificatorias (entre otras Ley 14.246). El artículo no la mencionaba. **Se agregó** porque la Dra. opera principalmente en PBA, no en jurisdicción nacional. |
| 4 | Decreto 532/09 PBA reglamenta los requisitos del acta única (datos del infractor, vehículo, lugar, fecha, hora, tipo de infracción) | ✅ correcto | https://normas.gba.gob.ar/documentos/B3yPzhj0.html , http://www.vialidad.gba.gov.ar/datos/educacion_vial/publicaciones/Reglamentaci%C3%B3n%20de%20la%20ley%2013,927.pdf | El Acta Única debe identificar inequívocamente al infractor, al vehículo (datos dominiales), lugar, fecha, hora y tipo de la infracción. Coincide con la lista de requisitos que afirma el artículo. |
| 5 | Constitución Nacional Art. 18 fundamenta el principio de legalidad y debido proceso/defensa en juicio | ✅ correcto | https://leyes-ar.com/constitucion_nacional/18.htm | "Ningún habitante de la Nación puede ser penado sin juicio previo fundado en ley anterior al hecho del proceso… es inviolable la defensa en juicio de la persona y de los derechos". Cubre legalidad penal y defensa. Se ajustó el texto de "legalidad y debido proceso" a "legalidad y defensa en juicio" (más fiel a la letra del Art. 18). |
| 6 | Errores típicos que invalidan el acta: patente mal cargada, lugar inexacto, fecha/hora inconsistentes, datos del titular incorrectos, falta de firma de la autoridad | ✅ correcto | Decreto 532/09 y Art. 40 Ley 13.927 (recurso de nulidad por violación de formas sustanciales) | Son causales razonables alineadas a la doctrina de los Juzgados de Faltas. La falta de firma del **infractor** no es causal de nulidad por sí sola (el infractor puede negarse a firmar), pero la falta de firma de la **autoridad** sí. El artículo solo menciona la firma de la autoridad, lo que es correcto. |
| 7 | Procedimiento: descargo o recurso ante el organismo sancionador, identificando el acta, detallando el error, aportando prueba, invocando normas | ⚠️ impreciso pero no incorrecto | Ley 13.927 Arts. 35-40; Decreto-ley 8751/77 (Código de Faltas Municipales PBA) | El descargo se presenta ante el Juzgado de Faltas competente. Contra la resolución hay recurso de revocatoria y apelación ante el Juez en lo Correccional, dentro de los 5 días. El artículo describe el flujo a nivel general, lo cual es válido para un público no jurídico, pero no menciona los recursos específicos ni el plazo de 5 días. **No se editó** porque el artículo es introductorio y no se compromete a un procedimiento específico; el detalle de plazos puede tratarse en otro artículo dedicado. |
| 8 | "El infractor tiene derecho a acceder a la prueba antes de cualquier sanción definitiva" (FAQ #3) | ✅ correcto | Art. 18 CN; Art. 40 Ley 13.927 (recurso de nulidad por violación de formas sustanciales) | Es una derivación directa del derecho de defensa. |
| 9 | Lenguaje no promete resultados | ✅ correcto | — | El artículo usa "puede solicitarse", "puede invalidar", "si la presentación es sólida". No promete éxito. |
| 10 | Frontmatter consistente con `src/content.config.ts` | ✅ correcto | — | Se agregó `dateModified: 2026-05-06`. Se mantiene `status: pending-validation` (no se publica sin aprobación de la Dra.). |

## Cambios aplicados

1. **Cita normativa corregida (cuerpo del artículo)**:
   - Antes: *"Estos requisitos surgen de los artículos 70 a 72 de la Ley 24.449 y de los principios constitucionales de legalidad (Art. 18 de la Constitución Nacional) y debido proceso."*
   - Después: *"Estos requisitos surgen del artículo 69 de la Ley 24.449 (Tránsito Nacional) y, en la Provincia de Buenos Aires, de la Ley 13.927 y su decreto reglamentario 532/09, junto con los principios constitucionales de legalidad y defensa en juicio (Art. 18 de la Constitución Nacional)."*

2. **Cita normativa corregida (bloque final blockquote)**:
   - Antes: *"Información basada en los artículos 70 a 72 de la Ley 24.449 y el artículo 18 de la Constitución Nacional."*
   - Después: *"Información basada en el artículo 69 de la Ley 24.449, la Ley 13.927 de la Provincia de Buenos Aires y su Decreto reglamentario 532/09, y el artículo 18 de la Constitución Nacional."*

3. **Frontmatter**: agregado `dateModified: 2026-05-06`.

## Pendientes de revisión por la Dra.

1. **Confirmar enfoque jurisdiccional**: el artículo ahora cita explícitamente la Ley 13.927 PBA y el Decreto 532/09. Si la Dra. atiende también casos en CABA u otras jurisdicciones, podría querer incluir una mención al régimen porteño (Ley 451 / Ley 1217 de Procedimiento de Faltas CABA) o aclarar que el régimen aplicable depende de la jurisdicción de la falta.

2. **¿Profundizar el procedimiento ante Juzgado de Faltas?**: el artículo describe el descargo a nivel general. Si la Dra. quiere precisar:
   - El plazo de 5 días para interponer recursos de revocatoria y apelación.
   - Que la apelación se eleva al Juez en lo Correccional (o Juez de Paz Letrado en partidos no cabecera).
   - El recurso de nulidad del Art. 40 Ley 13.927 contra resoluciones con violación u omisión de formas sustanciales.
   Puede ser tema para un artículo dedicado a "cómo presentar un descargo" o "recursos contra una resolución del Juzgado de Faltas".

3. **Errores menores y nulidad**: el FAQ "¿Y si el error es menor?" afirma que *"aun los errores menores pueden invalidar el acta si afectan la posibilidad de identificar inequívocamente la infracción"*. Esto es defendible doctrinariamente (concuerda con el criterio de "identificar inequívocamente al presunto infractor… al vehículo… al lugar, fecha, hora y tipo" del Decreto 532/09), pero la jurisprudencia de Juzgados de Faltas no es uniforme. Sugerencia: la Dra. podría suavizar a *"pueden invalidar"* (que ya está) y, si tiene un fallo concreto que respalde el criterio, agregarlo como cita.

4. **Mención a fotomultas/cinemómetros**: las nulidades por radar/foto-detección tienen regulación específica (Art. 28 bis Ley 13.927 — nulidad absoluta si faltan las señalizaciones verticales requeridas). El artículo actual habla de actas en general; si la Dra. quiere cubrir foto-multas, puede ser otro artículo o un agregado.

## Observaciones

- **Razón del error original**: la confusión Art. 70-72 vs. Art. 69 es un error frecuente en redacciones no jurídicas y en internet. El procedimiento sancionatorio y el labrado inmediato del acta única están en el **Art. 69 inc. a)** de la Ley 24.449. Los datos concretos están en el reglamento (Decreto 779/95 a nivel nacional, Decreto 532/09 a nivel PBA).

- **Ley 24.449 vs. Ley 13.927**: la Ley 13.927 adhiere a la Ley 24.449, pero la PBA tiene su propio régimen procedimental (Juzgados de Faltas) y su propia reglamentación (Decreto 532/09). En la práctica, las multas que la Dra. impugna se rigen por la Ley 13.927 + Decreto 532/09, con la Ley 24.449 como marco. La cita corregida refleja esto.

- **Status mantenido**: `pending-validation`. No se cambió a `published` — la Dra. debe revisar y aprobar.

- **No se realizaron commits** según instrucciones.

## Fuentes consultadas

- InfoLEG / Argentina.gob.ar — Ley 24.449: https://www.argentina.gob.ar/normativa/nacional/ley-24449-818
- Texto de Art. 69 Ley 24.449: https://leyes-ar.com/ley_de_transito/69.htm
- Texto de Art. 70 Ley 24.449: https://leyes-ar.com/ley_de_transito/70.htm
- Texto de Art. 71 Ley 24.449: https://leyes-ar.com/ley_de_transito/71.htm
- Texto de Art. 72 Ley 24.449: https://leyes-ar.com/ley_de_transito/72.htm
- Normas GBA — Ley 13.927: https://normas.gba.gob.ar/documentos/0YqDnfd0.html
- Vialidad PBA — Ley 13.927 PDF: http://www.vialidad.gba.gov.ar/datos/educacion_vial/publicaciones/Ley%2013927_1.pdf
- Normas GBA — Decreto 532/09: https://normas.gba.gob.ar/documentos/B3yPzhj0.html
- Vialidad PBA — Decreto 532/09 PDF: http://www.vialidad.gba.gov.ar/datos/educacion_vial/publicaciones/Reglamentaci%C3%B3n%20de%20la%20ley%2013,927.pdf
- Constitución Nacional Art. 18: https://leyes-ar.com/constitucion_nacional/18.htm
