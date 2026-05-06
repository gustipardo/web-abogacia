# Validación — libre-deuda-multas-renovar-registro-vender-vehiculo
Fecha: 2026-05-06
Validador: Claude (subagente)

## Claims verificados

| # | Claim | Veredicto | Fuente | Notas |
|---|-------|-----------|--------|-------|
| 1 | "Sin libre deuda no podés renovar la licencia de conducir" | ⚠️ correcto con matiz | https://www.gba.gob.ar/seguridadvial/preguntas_frecuentes_0 ; https://www.ellitoral.com.ar/policiales/2026-5-4-8-16-0 ; https://www.defensorba.org.ar/contenido/la-defensoria-recuer | Las FAQ oficiales de PBA confirman que el libre deuda de infracciones es requisito para tramitar la licencia. Pero hay precedentes jurisprudenciales que declararon inconstitucional la exigencia respecto de **multas no firmes** (Defensoría PBA, fallos de Corrientes y otras). Se reformuló la afirmación absoluta del artículo para contemplar la matización ("multas firmes" + "puede bloquear"). |
| 2 | "Sin libre deuda no podés transferir el vehículo / vender el auto formalmente" | ❌ desactualizado | Disposición DNRPA 142/2024 (BORA 19/09/2024): https://www.boletinoficial.gov.ar/detalleAviso/primera/314268/20240919 ; https://www.argentina.gob.ar/noticias/compra-venta-de-autos-respuestas-las-15-preguntas-mas-frecuentes ; https://segurarse.com.ar/blog/2025/07/03/tengo-que-pagar-las-multas-para-transferir-el-auto/ | A partir de la Disposición 142/2024 (modifica el régimen registral), **el libre deuda de multas dejó de ser obligatorio para inscribir la transferencia automotor**. Es opcional: si las partes lo solicitan en la Solicitud Tipo 08/08-D, se gestiona; si no, la transferencia procede igual. La deuda permanece a nombre del titular registral original. **Cambio de marco regulatorio importante** que invalidaba la afirmación del artículo. Se reformuló la sección "¿Por qué importa el libre deuda?" para reflejar el régimen vigente. |
| 3 | URL `infraccionesba.gba.gob.ar/consulta-infraccion` para PBA | ✅ correcto | https://infraccionesba.gba.gob.ar/ ; https://www.gba.gob.ar/seguridadvial/infracciones_de_transito | El sitio oficial es `infraccionesba.gba.gob.ar` (Ministerio de Transporte PBA). La ruta `/consulta-infraccion` es válida y permite consulta por dominio o DNI. |
| 4 | "A nivel nacional, el sistema SUCIVE / RUIT y los registros del RNA reflejan parte del estado registral del vehículo" | ❌ incorrecto | https://montevideo.gub.uy/area-tematica/movilidad/valor-y-pago-de-las-infracciones ; https://www.sucerp.com.ar/ ; https://www.sugit.com.ar/ ; https://consultainfracciones.seguridadvial.gob.ar/ ; https://www.dnrpa.gov.ar/ | **SUCIVE es el Sistema Único de Cobro de Ingresos Vehiculares de Uruguay, no de Argentina**. **RUIT no es un sistema reconocido del régimen argentino**. **RNA ("Registro Nacional Automotor") no es la denominación oficial**: la autoridad es la DNRPA (Dirección Nacional de los Registros Nacionales de la Propiedad del Automotor y de Créditos Prendarios) y los puntos de atención son los Registros Seccionales de la Propiedad del Automotor. Los sistemas argentinos relevantes son: **SUCERP** (patentes, ACARA), **SUGIT** (gestión de infracciones, integrado con DNRPA) y la **consulta nacional de la ANSV** (`consultainfracciones.seguridadvial.gob.ar`) para jurisdicciones adheridas. Se reescribió el párrafo para reemplazar las referencias erróneas por las correctas. |
| 5 | "Art. 89 Ley 24.449: 2 años faltas leves, 5 años faltas graves" | ✅ correcto | https://leyes-ar.com/ley_de_transito/89.htm ; https://www.argentina.gob.ar/normativa/nacional/ley-24449-818 | Texto literal del Art. 89: "DOS (2) años para la acción por falta leve" y "CINCO (5) años para la acción por falta grave y para sanciones". La prescripción se interrumpe por nueva falta grave o secuela del juicio contravencional, ejecutivo o judicial. Se enriqueció la sección de prescripción para incorporar también la causal de interrupción (que es un dato relevante para el cliente). |
| 6 | "Errores en el acta (Art. 70-72)" Ley 24.449 | ⚠️ impreciso | https://leyes-ar.com/ley_de_transito/70.htm ; https://leyes-ar.com/ley_de_transito/71.htm ; https://leyes-ar.com/ley_de_transito/72.htm | Solo el Art. 70 ("Deberes de las autoridades") se relaciona con el acta — describe la obligación de identificarse, usar formulario reglamentario y entregar copia. El Art. 71 trata de **interjurisdiccionalidad** (defensa por correo a >60 km). El Art. 72 trata de **retención preventiva** de conductor/licencia/vehículo. La cita "70-72" como rango único asociado a "errores en el acta" es incorrecta. **Nota cruzada**: el contenido formal del acta está en la reglamentación (Decreto 779/95 nacional; Decreto 532/09 en PBA), tal como se documentó en la validación de `anulacion-multas-errores-acta.md`. Se reescribió la sección para citar correctamente el Art. 70 Ley 24.449 (deberes de comprobación) y el régimen procedimental de la Ley 13.927. |
| 7 | "Vicios de procedimiento (Art. 40 Ley 13.927 PBA)" | ❌ incorrecto | https://normas.gba.gob.ar/documentos/0YqDnfd0.html ; http://www.vialidad.gba.gov.ar/datos/educacion_vial/publicaciones/Ley%2013927_1.pdf | El Art. 40 de la Ley 13.927 trata sobre **recursos** (revocatoria y apelación) contra la resolución, dentro de los 5 días de notificada — **no sobre vicios de procedimiento**. La cita estaba incorrectamente alineada al concepto. Se corrigió y se ubicó al Art. 40 en el lugar conceptual correcto: "contra las resoluciones del juez de faltas en PBA caben los recursos previstos en el Art. 40 (revocatoria y apelación, dentro de los 5 días)". |
| 8 | "Descuento del 50% (Art. 85 Ley 24.449)" | ✅ correcto | https://leyes-ar.com/ley_de_transito/85.htm ; https://www.argentina.gob.ar/normativa/nacional/ley-24449-818 | Texto del Art. 85: la sanción de multa puede abonarse con una reducción del 50% cuando corresponda a normas de circulación en la vía pública y exista reconocimiento voluntario de la infracción. En todos los casos tiene efectos de sanción firme. Se enriqueció la redacción para mencionar las dos condiciones (normas de circulación + reconocimiento voluntario) y la consecuencia (sanción firme). |
| 9 | "Negociar rebajas adicionales según el caso" | ⚠️ ambiguo | — | El artículo permite leer que se "negocian" reducciones adicionales por fuera del régimen legal. Las reducciones adicionales existen cuando hay moratorias municipales o convenios específicos del juzgado de faltas, no como negociación libre. Se eliminó esta frase del cuerpo del artículo para evitar el riesgo de que el lector entienda que la Dra. consigue rebajas extralegales — esto colisiona con la regla de "no prometer outcomes" y con las restricciones publicitarias del Art. 18 Ley 5177. |
| 10 | FAQ #1: el "libre deuda como requisito para la renovación de la licencia y para los trámites registrales del vehículo" | ⚠️ desactualizado en el segundo tramo | Disposición DNRPA 142/2024 ; FAQ oficiales PBA | El primer tramo (renovación de licencia) sigue siendo correcto en PBA. El segundo tramo ("trámites registrales del vehículo") quedó desactualizado tras la 142/2024. Se reescribió la FAQ para reflejar la situación actual y mencionar la jurisprudencia que cuestiona la exigencia para renovación cuando las multas no están firmes. |
| 11 | FAQ #2: "Las multas viejas siguen vinculadas al titular registral del momento de la infracción" | ✅ correcto | https://www.argentina.gob.ar/noticias/compra-venta-de-autos-respuestas-las-15-preguntas-mas-frecuentes ; https://segurarse.com.ar/blog/2025/07/03/tengo-que-pagar-las-multas-para-transferir-el-auto/ | Confirmado. La transferencia no extingue la deuda de multas previas — quedan a nombre del titular registral original al momento de la infracción. Se ajustó el texto para incorporar la mención explícita de la Disp. 142/2024 (que cambia el régimen del trámite, no el régimen de imputación de la deuda). |
| 12 | FAQ #3: "La baja del sistema requiere que el organismo procese el pago, descargo o recurso… puede demorar" | ✅ correcto | FAQ oficiales PBA: pago demora ~72 hs en impactar | Se enriqueció con el dato concreto de las 72 hs aproximadas para que el pago impacte en sistema (PBA). |
| 13 | Lenguaje no promete outcomes | ⚠️ con observación | — | El artículo en general cumple, pero "aumenta las chances de éxito" en la sección final puede leerse como una sugerencia de outcome. Se mantuvo porque está acompañado de "según el caso" y no hay una promesa específica, pero puede ser revisado en aprobación final. |
| 14 | Frontmatter consistente con `src/content.config.ts` | ✅ correcto | — | Se agregó `dateModified: 2026-05-06`. Se mantiene `status: pending-validation` (no se publica sin aprobación de la Dra.). |

## Cambios aplicados

1. **Frontmatter — `dateModified` agregado** (`2026-05-06`).

2. **Description y shortAnswer reformulados** para no afirmar tajantemente "sin libre deuda no podés transferir":
   - Antes: *"Sin libre deuda no podés renovar la licencia ni transferir el vehículo."*
   - Después: *"Las multas impagas pueden bloquear la renovación de la licencia. Cómo gestionar la baja integral por prescripción, anulación, nulidad o pago con reducción."*
   - Ajuste paralelo en `shortAnswer`.

3. **Sección "¿Por qué importa el libre deuda?" — reescrita** para reflejar el régimen post-Disposición DNRPA 142/2024:
   - Renovación de licencia: sigue siendo requisito en PBA y muchos municipios.
   - Transferencia: ya no es obligatorio (es opcional desde 142/2024).
   - Venta: si bien no es requisito registral, en la práctica es operativamente exigido por el comprador.

4. **Sección "¿Cómo se consulta la deuda?" — reescrita** para reemplazar las referencias incorrectas:
   - Eliminadas: "SUCIVE / RUIT" (SUCIVE es uruguayo) y "RNA" (sigla colloquial inexistente como organismo).
   - Agregadas: `consultainfracciones.seguridadvial.gob.ar` (ANSV nacional) y "Registros Seccionales de la DNRPA" (denominación oficial).

5. **Sección "Prescripción"** — agregada la causal de interrupción (nueva falta grave o secuela del juicio contravencional, ejecutivo o judicial), tal como surge del Art. 89.

6. **Sección "Anulación o nulidad" — reescrita**:
   - Antes: *"errores en el acta (Art. 70-72) o vicios de procedimiento (Art. 40 Ley 13.927 PBA)"*.
   - Después: cita Art. 70 Ley 24.449 (deberes de comprobación) y reubica el Art. 40 Ley 13.927 en su lugar correcto (recursos: revocatoria y apelación, plazo 5 días).

7. **Sección "Pago con reducción"** — afinada para precisar que el 50% del Art. 85 aplica solo a normas de circulación en la vía pública con reconocimiento voluntario, y tiene efectos de sanción firme. Eliminada la frase "negociar rebajas adicionales según el caso" para evitar lectura de outcomes prometidos.

8. **FAQ #1 reescrita** para reflejar la jurisprudencia que cuestiona el libre deuda para renovación cuando las multas no están firmes.

9. **FAQ #2 reescrita** para mencionar la Disp. DNRPA 142/2024 y el cambio de régimen para transferencias.

10. **FAQ #3 enriquecida** con el plazo concreto de ~72 hs para impacto del pago en PBA.

11. **Blockquote final** — agregada referencia a la Disposición DNRPA 142/2024.

## Pendientes de revisión por la Dra.

1. **Confirmar enfoque jurisdiccional**: el artículo está orientado a PBA pero menciona el régimen nacional en la consulta de deuda. Si la Dra. atiende también CABA u otras jurisdicciones, podría querer aclararlo. CABA tiene su propio régimen (Ley 451 de Faltas, Ley 1217 de Procedimiento de Faltas, sistema de consulta `buenosaires.gob.ar/licenciasdeconducir/consulta-de-infracciones`).

2. **¿Mencionar la situación de CABA explícitamente?**: hoy el artículo no la nombra. Posible mejora si la Dra. quiere capturar búsquedas de clientes de CABA.

3. **Disposición DNRPA 142/2024 — confirmar interpretación**: se interpretó que la disposición vuelve **opcional** la consulta de libre deuda en la transferencia (basado en la BO 19/09/2024 y notas de Argentina.gob.ar). Si la Dra. tiene una interpretación distinta o sabe de modificaciones posteriores, conviene revisar.

4. **¿Profundizar el régimen de fotomultas/cinemómetros?**: el artículo no los menciona específicamente. El Art. 28 bis Ley 13.927 PBA exige señalización vertical para validez del control automático — es un tema que toca la práctica habitual de la Dra. Posible artículo dedicado.

5. **"Aumenta las chances de éxito"** en la última sección: borderline con "no prometer outcomes". Se mantuvo porque está acompañado de "según el caso", pero la Dra. puede preferir suavizar a "puede acortar tiempos y dar mayor solidez al planteo".

6. **Tono de "cuándo conviene asesoramiento legal"**: la sección entera puede leerse como autopromoción. El Art. 18 Ley 5177 limita la publicidad ("ofrecer servicios... induciendo a actos lesivos"). Se mantuvo el tono actual (que es informativo: explica criterios objetivos), pero conviene una revisión final por la Dra. para confirmar que no roza la prohibición.

## Observaciones

- **Cambio regulatorio crítico**: el artículo en su versión original asumía un régimen que dejó de regir en septiembre de 2024. La Disposición DNRPA 142/2024 desreguló el libre deuda para transferencias automotores. **Este es el cambio de mayor peso en la validación**.

- **Confusión de jurisdicciones (SUCIVE)**: SUCIVE pertenece al régimen uruguayo. La confusión es relativamente frecuente porque ambos sistemas (uruguayo y argentino) tienen denominaciones parecidas. Se reemplazó por las siglas correctas argentinas (SUCERP, SUGIT, ANSV, DNRPA).

- **Citas normativas**: se mantuvo el patrón validado en `anulacion-multas-errores-acta.md` (Art. 69 + Art. 70 Ley 24.449 son los relevantes para acta; Art. 40 Ley 13.927 es de recursos).

- **Status mantenido**: `pending-validation`. No se cambió a `published` — la Dra. debe revisar y aprobar.

- **No se realizaron commits** según instrucciones.

## Fuentes consultadas

- Argentina.gob.ar — Ley 24.449: https://www.argentina.gob.ar/normativa/nacional/ley-24449-818
- Texto Art. 70 Ley 24.449: https://leyes-ar.com/ley_de_transito/70.htm
- Texto Art. 71 Ley 24.449: https://leyes-ar.com/ley_de_transito/71.htm
- Texto Art. 72 Ley 24.449: https://leyes-ar.com/ley_de_transito/72.htm
- Texto Art. 85 Ley 24.449: https://leyes-ar.com/ley_de_transito/85.htm
- Texto Art. 89 Ley 24.449: https://leyes-ar.com/ley_de_transito/89.htm
- Normas GBA — Ley 13.927 (texto sistematizado): https://normas.gba.gob.ar/documentos/0YqDnfd0.html
- Vialidad PBA — Ley 13.927 PDF: http://www.vialidad.gba.gov.ar/datos/educacion_vial/publicaciones/Ley%2013927_1.pdf
- BORA — Disposición DNRPA 142/2024: https://www.boletinoficial.gov.ar/detalleAviso/primera/314268/20240919
- Argentina.gob.ar — Compra-venta de autos (15 preguntas frecuentes): https://www.argentina.gob.ar/noticias/compra-venta-de-autos-respuestas-las-15-preguntas-mas-frecuentes
- DNRPA — Transferencia: https://www.dnrpa.gov.ar/portal_dnrpa/guia_tramites/informacion/gt_transferencia.htm
- InfraccionesBA (PBA): https://infraccionesba.gba.gob.ar/
- Ministerio de Transporte PBA — Infracciones: https://www.gba.gob.ar/seguridadvial/infracciones_de_transito
- FAQ Provincia BA — Seguridad Vial: https://www.gba.gob.ar/seguridadvial/preguntas_frecuentes_0
- ANSV — Consulta nacional de infracciones: https://consultainfracciones.seguridadvial.gob.ar/
- SUCERP (sistema unificado de patentes, ACARA): https://www.sucerp.com.ar/
- SUGIT (sistema unificado de gestión de infracciones): https://www.sugit.com.ar/
- SUCIVE (sistema uruguayo, no argentino — para contraste): https://montevideo.gub.uy/area-tematica/movilidad/valor-y-pago-de-las-infracciones
- Defensoría PBA — Multas sin sentencia firme y licencia: https://www.defensorba.org.ar/contenido/la-defensoria-recuer
- El Litoral — Justicia Corrientes inconstitucionalidad libre deuda: https://www.ellitoral.com.ar/policiales/2026-5-4-8-16-0-la-justicia-freno-la-exigencia-de-libre-deuda-para-renovar-la-licencia-de-conducir
