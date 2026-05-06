# Validación — simultaneidad-cargos-jubilacion-docente
Fecha: 2026-05-06
Validador: Claude (subagente)

## Resumen

El núcleo del artículo (art. 47 DL 9650/80, 2,8% por año, tope 70%, 36 meses consecutivos) es correcto y verificable contra el texto oficial del decreto-ley y la doctrina previsional. Se detectaron tres puntos a corregir: (1) faltaba mencionar el **mínimo del 8%** que el cargo simultáneo no puede perforar por debajo, (2) la sección sobre **horas cátedra** describía erróneamente que "las primeras 20 horas son base y las excedentes computan como simultaneidad", cuando la regla real (Resolución IPS 8/14) es que todos los servicios bajo el mismo nivel y empleador integran la "carrera base", y (3) se reforzó la formulación del 2,8% explicitando que deriva del régimen frente alumnos (70%/25 años). Se aplicó `dateModified: 2026-05-06` y se corrigieron las FAQs correspondientes. `status` permanece `pending-validation`.

## Claims verificados

| # | Claim del artículo | Veredicto | Fuente | Notas |
|---|-------------------|-----------|--------|-------|
| 1 | "Decreto Ley 9650/80, art. 47" como base normativa | ✅ CORRECTO | DL 9650/80 PBA (https://normas.gba.gob.ar/documentos/X041Xf3x.html) | Art. 47 regula expresamente el cómputo de servicios simultáneos. |
| 2 | "No se suman los sueldos básicos. Se toma la base del cargo de mayor jerarquía y se le agrega un adicional" | ✅ CORRECTO | Art. 47 DL 9650/80; doctrina IPS | El art. 47 ordena sumar al haber del art. 41 (mejor cargo) lo correspondiente a servicios simultáneos, computado en proporción a los mínimos del régimen. |
| 3 | "Cada año de servicios simultáneos suma un 2,8% al haber jubilatorio" | ✅ CORRECTO — se reforzó | DL 9650/80 art. 47 (proporción) + cálculo: 70%/25 años = 2,8%. Confirmado en: http://jubidocba.blogspot.com/p/calculo-del-haber-jubilatorio-las.html y https://mbesse.wordpress.com/2010/09/25/ips-antiguedades-y-porcentajes-jubilatorios/ | El 2,8% aplica al régimen docente "frente alumnos". Para servicios comunes/administrativos la proporción es distinta (2% para 35 años; 2,3% para 30 años). Se agregó esta aclaración. |
| 4 | "El tope por este concepto es del 70%" | ✅ CORRECTO | Doctrina previsional unánime (mbesse, jubidocba, blogdelcontador). El cargo simultáneo nunca puede ser mayor al 70% del haber. | — |
| 5 | "~25 años para llegar al tope del 70%" | ✅ CORRECTO | Aritmética directa: 70/2,8 = 25 años. | Se mantiene. |
| 6 | "36 meses consecutivos sin interrupciones" como requisito | ✅ CORRECTO | DL 9650/80 art. 47 ("tres (3) años de servicios efectivos, con aportes y continuos en los servicios simultáneos") + doctrina IPS PBA + post oficial Jubilación Docente DGCyE | Equivalente a 3 años. La interrupción más típica es la licencia sin goce de haberes en cualquiera de los dos cargos. |
| 7 | "Si hubo interrupción, el conteo de los 36 meses se reinicia" | ✅ CORRECTO | jubidocba.blogspot.com; comunicación oficial DGCyE | La regla aplica a la consolidación inicial del período base. Para cómputos posteriores ver matiz #11. |
| 8 | Mínimo del 8% en el cargo simultáneo | ❌ FALTABA — agregado | mbesse: "El cargo simultáneo nunca podrá ser mayor al 70% del haber, ni menor al 8%"; jubidocba | Se agregó al `shortAnswer`, al H2 de "¿Cuánto suma cada año?" y a la FAQ del tope. Es un dato relevante: aún con menos de ~3 años de simultaneidad efectiva, el reconocimiento mínimo es del 8%. |
| 9 | "20 horas cátedra como base; las que excedan suman como simultaneidad" | ❌ INEXACTO — corregido | Resolución IPS 8/14; abc2.abc.gob.ar (preguntas frecuentes); blogdelcontador | El "20 hs cátedra" es el umbral para considerarse "frente alumnos" en la jubilación ordinaria docente (art. 24 DL 9650/80 + Ley 10.579), **no** una regla de simultaneidad. Para horas cátedra/módulos, la Res. IPS 8/14 ordena considerar como "carrera" todos los servicios en el mismo nivel y bajo el mismo empleador. La simultaneidad surge cuando hay un segundo cargo en otro nivel/empleador. La formulación anterior podía inducir a error. |
| 10 | Conviene revisar el historial antes del cese | ✅ CORRECTO (no es claim legal, es recomendación) | — | Lenguaje no promete outcomes. |
| 11 | "Servicios simultáneos discontinuos" no se mencionan | ⚠️ MATIZ (pendiente) | DL 9650/80 art. 47 in fine: "podrán computarse los prestados en forma discontinua, sean anteriores o posteriores al desempeño del cargo tenido en cuenta para la determinación del haber, únicamente por el tiempo en que se registre la simultaneidad de servicios" | Hay una distinción técnica: los **36 meses base** deben ser consecutivos (consolidan el cargo simultáneo). Pero **una vez consolidado**, períodos adicionales discontinuos del mismo cargo simultáneo, anteriores o posteriores, sí computan al cómputo del haber. El artículo no menciona este matiz; conviene que la Dra. decida si agregarlo (puede beneficiar a docentes con trayectorias intermitentes). No se editó por ser un nivel de detalle profesional. |
| 12 | Lenguaje no promete outcomes | ✅ CORRECTO | Revisión textual | "Puede sumar mucho dinero" es lenguaje aspiracional de orientación, no garantía. La nota legal final está bien colocada. |
| 13 | Cita del decreto en disclaimer final ("Decreto Ley 9650/80, art. 47") | ✅ CORRECTO | — | — |
| 14 | Frontmatter consistente con schema | ✅ CORRECTO — se agregó `dateModified: 2026-05-06` | `src/content.config.ts` | `status: pending-validation` se preservó. |

## Cambios aplicados

1. **`shortAnswer`** (línea 5): Se agregó el "mínimo del 8%" y se aclaró el plazo de 36 meses como referencia explícita.
2. **Frontmatter**: Se agregó `dateModified: 2026-05-06`. `status` permanece `pending-validation`.
3. **H2 "¿Cuánto suma cada año?"**: Se agregó el piso del 8% y se explicó que el 2,8% deriva de la proporción 70%/25 años del régimen docente frente alumnos. Se aclaró que en otros regímenes la proporción cambia (los servicios comunes tienen 2% por 35 años, etc.).
4. **H2 "¿Y los docentes con horas cátedra?"**: Reescrito para alinear con la Resolución IPS 8/14. Se eliminó la formulación errónea de "las primeras 20 horas son base, las excedentes son simultaneidad" y se explicó la regla real: todos los servicios en el mismo nivel + empleador integran la carrera base; la simultaneidad surge cuando hay un segundo cargo o servicios en otro nivel/empleador en paralelo durante 36 meses consecutivos.
5. **FAQ "horas cátedra excedentes"**: Reformulada para reflejar la regla correcta (Res. IPS 8/14).
6. **FAQ "tope que puedo alcanzar"**: Se agregó el piso del 8% junto al tope del 70%.

## Pendientes de revisión por la Dra.

1. **Servicios simultáneos discontinuos (matiz del art. 47 in fine)**. El art. 47 admite que, **una vez consolidado el período base de 36 meses consecutivos**, se computen también períodos discontinuos del mismo cargo simultáneo anteriores o posteriores al cargo principal. El artículo en su redacción actual sólo habla de los 36 meses iniciales y deja al lector con la idea de "todo o nada". Sugerencia para la Dra.: decidir si agregar un H3 o nota aclarando que, una vez consolidada la simultaneidad, los períodos posteriores intermitentes también suman. Puede ser relevante para docentes con licencias entrelazadas.

2. **Cargos titulares vs. suplentes vs. provisionales**. El artículo no aborda diferencias entre tipos de designación para fines de simultaneidad. La doctrina y la práctica IPS distinguen: titulares y provisionales con aportes computan; los suplentes con aportes regulares también, pero requieren acreditación más fina. La Dra. puede decidir si vale la pena un H3 sobre esto.

3. **Cargos jerárquicos (directora, vicedirectora, supervisora) en la simultaneidad**. Cuando el "mejor cargo" es un cargo de conducción y existe simultaneidad con un cargo frente alumnos, hay particularidades en el cómputo (cómo se determina cuál es la "mejor remuneración" cuando los cargos pertenecen a escalafones distintos). No edité porque escapa al scope del artículo, pero puede ameritar otro artículo o un H3.

4. **Regímenes provinciales distintos a IPS PBA**. El artículo es íntegramente sobre IPS PBA (correcto, dado el caso piloto). Convendría aclarar al inicio o en disclaimer que el régimen aquí descrito aplica a docentes provinciales bonaerenses; los docentes nacionales (Ley 24.016) no tienen un régimen análogo de simultaneidad por porcentaje. Lo dejé como está porque el disclaimer final ya menciona "régimen del IPS de la Provincia de Buenos Aires", pero podría reforzarse al inicio.

## Observaciones (GEO + editoriales)

- **Cumplimiento GEO**: Bueno. H2 en preguntas, primera oración con respuesta directa, oraciones cortas, párrafos de 2-3 oraciones, FAQs al final. La corrección de horas cátedra refuerza el GEO porque ahora la respuesta directa es técnicamente correcta y citable por LLMs.
- **Cita normativa**: Sólo se cita "DL 9650/80 art. 47" en el disclaimer. Convendría agregar referencia a la **Resolución IPS 8/14** (que se introdujo en el cuerpo) y mencionar que el régimen aplicable es el regulado por los arts. 41 y 47 conjuntamente (el 41 define el haber base — mejor cargo en 36 meses consecutivos o 60 alternados — y el 47 regula el agregado por simultaneidad). No edité para no sobrecargar el artículo, pero la Dra. puede decidir si agregar.
- **FAQ schema**: Las FAQs están bien estructuradas. Verificar a nivel template Astro que se está renderizando JSON-LD `FAQPage`.
- **Sugerencia editorial menor**: La frase "Una revisión previa del historial — cargo por cargo, mes a mes — permite detectar interrupciones" es muy GEO-friendly y de buena lectura. Se mantiene.

## Fuentes consultadas

- DL 9650/80 PBA — Texto oficial: https://normas.gba.gob.ar/documentos/X041Xf3x.html
- DL 9650/80 PBA — PDF oficial IPS: https://www.ips.gba.gob.ar/sites/default/files/documentos/Ley9650.pdf
- DL 9650/80 PBA — Versión CICOP: https://cicop.org.ar/wp-content/uploads/2019/08/Decreto-Ley-9650-Regimen-Previsional-Provincia-de-Buenos-Aires.pdf
- IPS PBA — Pautas para servicios simultáneos: https://normas.gba.gob.ar/anexos/descargar/rBMpNYxP.pdf
- IPS PBA — Jubilación Ordinaria FAQ: https://www.ips.gba.gob.ar/preguntasFrecuentes/JubilacionOrdinaria
- IPS PBA — Resolución 8/14 (mencionada en pautas oficiales) — referenciada en pautas de IPS y abc2.abc.gob.ar
- DGCyE — Preguntas frecuentes jubilación docente: https://abc2.abc.gob.ar/tramites/preguntas-frecuentes
- DGCyE — Jubilación Ejecutiva (instructivo): https://normasprovinciales.wordpress.com/wp-content/uploads/2011/11/jubilacion-ejecutiva-instructivo.pdf
- Estudio Besse — IPS Antigüedades y Porcentajes: https://mbesse.wordpress.com/2010/09/25/ips-antiguedades-y-porcentajes-jubilatorios/
- JubiDocentes IPS Bs As — Cálculo del Haber: http://jubidocba.blogspot.com/p/calculo-del-haber-jubilatorio-las.html
- JubiDocentes IPS Bs As — Servicios simultáneos: http://jubidocba.blogspot.com/2018/01/servicios-simultaneos.html
- Blog del Contador — Jubilaciones docentes PBA (segunda parte): https://blogdelcontador.com.ar/jubilaciones-docentes-en-la-provincia-de-buenos-aires-segunda-parte/
- SAIJ — DL 9650/80 reglamentación: https://www.saij.gob.ar/476-local-buenos-aires-reglamentacion-ley-9650-sobre-regimen-previsional-b19810000476-1981-03-19/123456789-0abc-674-0000-1891bvorpced
- Argentina.gob.ar — Resumen Ley 9650: https://www.argentina.gob.ar/normativa/provincial/ley-9650-123456789-0abc-defg-056-9049bvorpyel
- Jubilación Docente DGCyE (Facebook oficial) — post sobre simultaneidad y art. 47: https://www.facebook.com/jubilaciondocentedgcye/posts/simultaneidad%EF%B8%8F-seg%C3%BAn-lo-establecido-por-el-art%C3%ADculo-47-del-decreto-ley-965080-pa/1202110846833243/
