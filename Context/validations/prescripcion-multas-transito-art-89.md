# Validación — prescripcion-multas-transito-art-89
Fecha: 2026-05-06
Validador: Claude (subagente)

## Texto literal del Art. 89 — Ley 24.449

> "La prescripción se opera: a) A los DOS (2) años para la acción por falta leve; b) A los CINCO (5) años para la acción por falta grave y para sanciones; En todos los casos, se interrumpe por la comisión de una falta grave o por la secuela del juicio contravencional, ejecutivo o judicial."

(Fuente: Ley 24.449, Capítulo III "Prescripción", Art. 89.)

## Claims verificados

| # | Claim | Veredicto | Fuente | Notas |
|---|-------|-----------|--------|-------|
| 1 | Existe la Ley 24.449 (Tránsito Nacional), vigente | ✅ correcto | https://www.argentina.gob.ar/normativa/nacional/ley-24449-818 | Sancionada 23/12/1994, vigente con modificatorias |
| 2 | "El Art. 89 de la Ley 24.449 establece plazos concretos: 2 años para faltas leves y 5 años para faltas graves" | ⚠️ impreciso | Texto literal del Art. 89 — https://leyes-ar.com/ley_de_transito/89.htm | El texto correcto es: 2 años "para la **acción por** falta leve" y 5 años "para la acción por falta grave **y para sanciones**". El artículo original omitía que los 5 años aplican también a las sanciones ya impuestas (no solo a la acción). **Se corrigió** título → cuerpo y FAQs para incluir esta distinción. |
| 3 | "Modificaciones de la Ley 26.363" mencionadas en el blockquote final | ⚠️ engañoso | https://www.argentina.gob.ar/normativa/nacional/ley-26363-140098/actualizacion ; texto consolidado Ley 24.449 | La Ley 26.363 (2008) modificó muchos aspectos de la Ley 24.449 (creó la ANSV, reformó el régimen de licencias, alcoholemia, etc.) **pero no modificó específicamente el Art. 89**. Citar "modificaciones de la Ley 26.363" en el contexto del Art. 89 puede inducir a error. **Se corrigió** el blockquote final eliminando esa referencia y reemplazándola por mención a regímenes provinciales (Ley 13.927 PBA). |
| 4 | "Si el Estado no notificó la infracción dentro de esos plazos, su poder sancionatorio se extingue" | ⚠️ impreciso | Doctrina de prescripción contravencional | La frase mezcla dos figuras: (a) la **acción** prescribe por inactividad de la administración —no requiere "notificación" en sentido estricto, sino actos válidos de impulso del expediente—; (b) la **sanción** ya impuesta prescribe si no se ejecuta. **Se corrigió** a "Si el Estado no realiza actos válidos de impulso del expediente dentro de esos plazos, su facultad sancionatoria se extingue". |
| 5 | "El plazo se cuenta desde la fecha de la infracción" | ⚠️ impreciso (parcialmente correcto) | Doctrina; analogía con CP Arts. 62/63 | Es correcto **para la acción**, no para la **sanción**. La prescripción de la sanción ya impuesta corre desde que la resolución sancionatoria queda firme (criterio mayoritario, por analogía con CP Art. 66). **Se corrigió** la FAQ y el cuerpo agregando esta distinción. |
| 6 | "La prescripción se interrumpe por causales del Art. 89" — el artículo original NO las enumeraba | ❌ omisión | Texto literal del Art. 89 | El Art. 89 enumera dos causales: (a) la comisión de una falta grave; (b) la secuela del juicio contravencional, ejecutivo o judicial. **Se agregó** una sección entera "¿Qué causales interrumpen la prescripción?" y una FAQ. |
| 7 | "Hay que solicitarla [la prescripción]. El infractor debe presentar descargo" (FAQ original) | ⚠️ debatible | Doctrina; jurisprudencia CABA Juzgado PCyF Nº 15 (2023) declaró inconstitucional plazo 5 años Ley 451 e indicó que la prescripción es de orden público; CN Art. 65 inc. 4 CP | En materia contravencional/penal hay doctrina y jurisprudencia consolidadas que sostienen que la prescripción es de orden público y debe declararse de oficio. En la práctica de Juzgados de Faltas PBA, sin embargo, lo habitual es que se invoque expresamente. **Se corrigió** la FAQ y se agregó nota aclaratoria al cuerpo. |
| 8 | "Una multa prescripta puede reactivarse: No" (FAQ) | ✅ correcto | — | La prescripción extingue la acción/sanción definitivamente. |
| 9 | "Hasta que no se obtiene la declaración formal y se actualiza el sistema, la multa puede seguir apareciendo en el libre deuda" | ✅ correcto (descripción práctica) | InfraccionesBA — preguntas frecuentes | Coincide con la práctica administrativa de PBA y CABA. |
| 10 | Aplicación a Juzgados de Faltas PBA | ⚠️ no se mencionaba régimen provincial | Ley 13.927 PBA — https://normas.gba.gob.ar/documentos/0YqDnfd0.html ; PBA adhiere a Ley 24.449 vía Ley 13.927 | El artículo original solo citaba la ley nacional, sin mencionar que en PBA rige la Ley 13.927 (con plazos de notificación específicos como 15 días — Art. 20). **Se agregó** mención en el blockquote final. |
| 11 | Lenguaje no promete outcomes | ✅ correcto | — | El artículo usa "puede prescribir", "muchas... pueden eliminarse", "conviene revisar", "el organismo puede declarar". No garantiza resultado. |
| 12 | Frontmatter consistente con `src/content.config.ts` | ✅ correcto | — | Se agregó `dateModified: 2026-05-06`. Se mantiene `status: pending-validation`. |

## Cambios aplicados

1. **Frontmatter — `shortAnswer` corregido**:
   - Antes: *"... 2 años para faltas leves y 5 años para faltas graves. Si el Estado no notificó la infracción en ese plazo, su poder sancionatorio se extingue y la deuda puede eliminarse mediante descargo."*
   - Después: *"... 2 años para la acción por falta leve y 5 años para la acción por falta grave y para las sanciones ya impuestas. Si el Estado no realizó actos válidos de impulso dentro de ese plazo, la facultad sancionatoria se extingue y la sanción puede dejarse sin efecto mediante el planteo de prescripción."*

2. **Frontmatter — `dateModified: 2026-05-06`** agregado.

3. **FAQ "¿Desde cuándo se cuenta el plazo?"** ampliada para distinguir prescripción de la acción (desde la comisión) y de la sanción (desde firmeza de la resolución).

4. **FAQ "¿La prescripción opera de oficio?"** reescrita: ahora reconoce la doctrina de orden público y aclara que en la práctica conviene invocarla expresamente.

5. **FAQ nueva** "¿Cuáles son las causales de interrupción según el Art. 89?" agregada con la enumeración literal del artículo (comisión de falta grave / secuela del juicio).

6. **Sección "¿Qué establece el Art. 89?"** corregida: ahora dice "para la acción por falta leve" / "para la acción por falta grave y para las sanciones ya impuestas".

7. **Sección "¿Cómo se computa el plazo?"** corregida: agrega la distinción entre prescripción de la acción y prescripción de la sanción ya firme.

8. **Sección nueva "¿Qué causales interrumpen la prescripción?"** agregada antes de "¿Por qué importa la prescripción?", enumerando las dos causales del Art. 89.

9. **Sección "¿Cómo se solicita?"** complementada con nota aclaratoria sobre el carácter de orden público de la prescripción contravencional.

10. **Blockquote final corregido**:
    - Antes: *"Información basada en la Ley 24.449 (artículo 89) y modificaciones de la Ley 26.363. Los plazos y modalidades varían según la jurisdicción específica."*
    - Después: *"Información basada en la Ley 24.449 (artículo 89). Las jurisdicciones provinciales y municipales pueden tener regímenes propios — por ejemplo, la Provincia de Buenos Aires (Ley 13.927 y modificatorias) regula plazos y modalidades de notificación específicos."*

## Pendientes de revisión por la Dra. (❓)

1. **Inclusión de jurisprudencia 2023 de CABA**: el Juzgado en lo PCyF Nº 15 (jueza Karina Andrade, mayo 2023) declaró inconstitucional el plazo de 5 años de la Ley 451 CABA, aplicando supletoriamente el plazo de 2 años del Art. 65 inc. 4 CP. Es jurisprudencia local de CABA, no aplica directamente a PBA, pero es señal del debate doctrinario sobre la competencia provincial para fijar plazos contravencionales. **¿La Dra. quiere mencionarlo?** Decisión política-editorial, no se incluyó.

2. **Plazo en PBA — ¿hay jurisprudencia provincial discutiendo los 5 años?**: la Ley 13.927 adhiere a la Ley 24.449, por lo que el Art. 89 nacional rige en PBA. Pero hay debate doctrinario sobre si las provincias pueden fijar plazos de prescripción en materia contravencional o si rige el CP. **La Dra. debería confirmar** si en su práctica los Juzgados de Faltas PBA aplican estrictamente los 2/5 años o si hay un criterio dominante distinto.

3. **Distinción "acción" vs "sanción" — ¿simplificar para SEO/GEO?**: el artículo ahora introduce la distinción técnica (acción vs sanción ya impuesta). Es jurídicamente más preciso pero puede ser denso para un lector lego. **Decisión de la Dra.**: dejarlo así (precisión) o suavizar (legibilidad).

4. **Notificaciones en PBA**: el Art. 20 de la Ley 13.927 PBA establece un plazo de 15 días para notificar el acta al titular. Si la notificación es defectuosa o tardía, hay vicios procedimentales. El artículo no profundiza en esto. **Tema para artículo dedicado** sobre "notificación de multas en PBA".

5. **Causales de interrupción — alcance de "secuela del juicio"**: la jurisprudencia interpreta "secuela del juicio" como actos procesales válidos con entidad de impulso (no cualquier acto administrativo). El artículo simplifica como "actos procesales válidos de impulso". Si la Dra. tiene un criterio jurisprudencial concreto (fallo PBA), conviene citarlo en una iteración futura.

6. **Listado de "faltas leves vs faltas graves"**: el artículo no lista qué faltas son leves y cuáles graves. Esto se define en otros artículos de la Ley 24.449 (Arts. 77 a 79) y en regímenes provinciales/municipales (en PBA, Ley 13.927 + Anexo del Decreto 532/09). **Posible artículo dedicado**: "Cómo se clasifican las faltas de tránsito y cuál es la diferencia para la prescripción".

## Observaciones

- **Status mantenido**: `pending-validation`. No se publicó.
- **No se realizaron commits** según instrucciones.
- **Texto literal del Art. 89 verificado** contra https://leyes-ar.com/ley_de_transito/89.htm y referencias cruzadas en alertastransito.com, errepar.com y argentina.gob.ar.
- El error más relevante del artículo original era omitir que los 5 años se aplican también a la prescripción de las sanciones ya impuestas (no solo a la acción). Esto se corrigió en título→cuerpo→FAQs.
- La afirmación de que "la prescripción no opera de oficio, hay que pedirla" era jurídicamente discutible pero útil como consejo práctico. Se reformuló para reflejar ambas dimensiones (orden público + práctica de los Juzgados de Faltas).

## Fuentes consultadas

- InfoLEG / Argentina.gob.ar — Ley 24.449: https://www.argentina.gob.ar/normativa/nacional/ley-24449-818
- Texto Art. 89 Ley 24.449: https://leyes-ar.com/ley_de_transito/89.htm
- Argentina.gob.ar — Ley 26.363: https://www.argentina.gob.ar/normativa/nacional/ley-26363-140098/actualizacion
- Normas GBA — Ley 13.927 PBA: https://normas.gba.gob.ar/documentos/0YqDnfd0.html
- Vialidad PBA — Ley 13.927 PDF: http://www.vialidad.gba.gov.ar/datos/educacion_vial/publicaciones/Ley%2013927_1.pdf
- Errepar — Multas de tránsito y prescripción (2025): https://documento.errepar.com/actualidad/multas-de-transito-cuando-prescriben-y-donde-pedir-que-las-eliminen-definitivamente-20250205184847413
- AlertasTránsito — Prescripción de multas: https://www.alertastransito.com/2023/08/prescripcion-multas-transito.html
- Microjuris al Día — Doctrina prescripción 2 años (2023): https://aldiaargentina.microjuris.com/2023/07/21/doctrina-las-infracciones-de-transito-prescriben-a-los-dos-anos/
- iJudicial — Inconstitucionalidad plazo 5 años Ley 451 CABA (2023): https://ijudicial.gob.ar/2023/la-justicia-portena-declaro-inconstitucional-el-plazo-de-prescripcion-de-cinco-anos-para-las-multas/
- Ámbito — CABA prescripción 2 años (2023): https://www.ambito.com/informacion-general/caba-la-justicia-determino-que-las-multas-transito-prescriben-los-dos-anos-n5766393
- DerechoEnZapatillas — Prescripción multas PBA: https://www.derechoenzapatillas.com/2023/prescripcion-multas-de-transito-en-la-provincia-de-buenos-aires/
- Autodata AR — Multas en BA: https://www.autodataar.com/nota-multas-de-transito-en-buenos-aires-cuando-prescriben--como-eliminarlas-y-como-saber-si-tenes-deudas-64945
- InfraccionesBA (oficial PBA) — Preguntas frecuentes: https://infraccionesba.gba.gob.ar/preguntas-frecuentes
