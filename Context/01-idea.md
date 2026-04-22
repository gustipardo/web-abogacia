# Fase 1 - IDEA: Formulación del Proyecto

> **Sub-agente**: Dante "El Explorador"
> **Usuario**: Gusti (UTN FRD - Seminario Integrador / Habilitación Profesional)
> **Fecha**: 2026-04-07
> **Marco teórico de referencia**: `3_Marco Teorico/1 Idear y Ver Oportunidad.md` (PDF 01 - Formulación de Proyectos, Cátedra Seminario Integrador)
> **Documento de apoyo**: `skill-gestor/Context/SEO_for_LLMs.md`

---

## 1. Introducción

En 2024 Guillermo Rauch — CEO de Vercel — contó públicamente un caso que pasó casi desapercibido: una consultora chica de ingeniería en software ganó un contrato con una automotriz multinacional sin haber tenido nunca un contacto previo. El comprador no los encontró en Google, no los encontró por referidos, no los encontró en LinkedIn. Los encontró porque le preguntó a ChatGPT qué consultora contratar para un problema específico, y ChatGPT recomendó a esa consultora por nombre. No a una lista. A una sola.

Ese caso, que hoy suena anecdótico, es el síntoma de un cambio estructural en cómo se toman decisiones de compra de servicios: una fracción creciente de los clientes potenciales ya no empieza el proceso abriendo Google, lo empieza preguntándole a un modelo de lenguaje. Y lo hace sin contarle a nadie — ni siquiera al vendedor que termina recibiendo el mail — que la decisión ya venía parcialmente tomada antes del primer contacto.

Este proyecto nace en ese cruce: un estudiante de Ingeniería en Sistemas que vive en primera persona ese cambio de hábito (tres compras personales en los últimos meses — aspiradora, celular, auto — arrancaron preguntándole al modelo, no al buscador), una madre que está iniciando su carrera como abogada con cero presencia digital, y un mercado hispanohablante donde la oferta de servicios de *Generative Engine Optimization* (GEO) es prácticamente inexistente por fuera de algunas plataformas empresariales norteamericanas caras.

La propuesta concreta es construir — como proyecto integrador de la Habilitación Profesional, pero con intención explícita de que sea una empresa real — un **servicio productizado de GEO para profesionales independientes y servicios chicos**, con un primer caso real de validación (estudio jurídico especializado en jubilación docente y sucesiones) y un roadmap honesto sobre las herramientas que hoy no existen y que el proyecto tiene que construirse a sí mismo.

---

## 2. Planteo del problema

### 2.1 El cambio de canal

Durante dos décadas, la forma en que un cliente encontraba un proveedor de servicios era reconocible: buscaba en Google, comparaba algunos resultados, entraba a dos o tres sitios, pedía presupuesto. Cada paso dejaba rastros medibles (impresiones, clicks, bounce rate, conversiones) y había una industria entera — SEO, SEM, analítica — construida alrededor de optimizar ese embudo.

Con la llegada del uso masivo de asistentes conversacionales (ChatGPT, Perplexity, Gemini, Claude) ese embudo empezó a cambiar. Una parte todavía no cuantificada pero claramente creciente de los usuarios ya no pide "una lista de opciones"; pide una recomendación razonada, y la acepta. El modelo devuelve un nombre, una justificación, y a menudo un link directo.

### 2.2 Dos mecanismos estructurales que lo vuelven crítico

**Mecanismo 1 — Invisibilidad por personalización.** Cuando una persona le pregunta a un LLM "¿qué abogado me conviene para tramitar una jubilación docente en CABA?", la respuesta no se parece a una página de resultados que se pueda compartir o auditar: es un texto narrativo, adaptado al contexto específico de esa conversación, que se siente como razonamiento propio del usuario. El comprador termina creyendo que llegó a la conclusión por su cuenta. Esto hace que la influencia del LLM sea invisible incluso para quien la experimenta: no aparece en los reportes de adquisición, no deja UTMs, no dispara eventos de analytics. Es lo que en este proyecto llamaremos *materia oscura* del tráfico.

**Mecanismo 2 — Ventaja estructural de conversión.** Una búsqueda tradicional devuelve diez links; el usuario tiene que decidir en cuál hacer click, luego qué leer, luego a quién contactar. Una respuesta de LLM devuelve una decisión argumentada: "para este caso te conviene X, por estas tres razones". El camino cognitivo del usuario hasta el contacto es mucho más corto, y el usuario llega al primer contacto ya pre-convencido. Existen estudios iniciales que muestran tasas de conversión notablemente superiores en tráfico originado en LLMs frente a tráfico de búsqueda orgánica tradicional.

### 2.3 Por qué hoy nadie lo resuelve bien en el mercado hispanohablante

1. **Las herramientas existen pero son enterprise y en inglés.** Plataformas como Profound u Otterly cobran planes mensuales de varios cientos de dólares pensados para grandes marcas globales. Ningún profesional independiente argentino las puede pagar ni usar.
2. **No existe un "Google Analytics para LLMs".** No hay parámetros de tracking estándar, no hay dashboard abierto, no hay un SDK. La industria está en el estado en el que estaba la analítica web antes de que Google Analytics fuese gratis en 2005.
3. **Las agencias de marketing digital tradicionales todavía venden SEO clásico.** Su catálogo sigue siendo keywords, backlinks y Ads. Cuando una agencia de ese tipo habla de "IA" suele estar hablando de generar textos con ChatGPT, no de hacer aparecer al cliente *dentro* de ChatGPT.
4. **En LATAM hispanohablante, la oferta es prácticamente nula.** No se detectó ningún actor local vendiendo GEO como servicio productizado para servicios profesionales chicos.

### 2.4 El problema concreto a resolver

Un profesional independiente que está empezando (abogada, contador, psicólogo, kinesiólogo, consultor) hoy tiene tres problemas encadenados que ninguna oferta del mercado hispanohablante le resuelve:

1. **No aparece en las recomendaciones de los LLMs** porque no tiene contenido indexable que los modelos puedan citar.
2. **No sabe si aparece ni cómo** porque no hay herramientas accesibles de medición.
3. **No puede generar el contenido necesario por su cuenta** porque no sabe cómo estructurarlo para que sea citable y porque no tiene tiempo ni formación de redacción SEO/GEO.

---

## 3. Contexto actual

- **Plataformas enterprise de GEO** (Profound, Otterly, Goodie, AthenaHQ): existentes, caras, en inglés, orientadas a marcas globales.
- **Agencias de marketing digital en Argentina**: siguen vendiendo SEO tradicional + redes sociales + Ads. Salvo excepciones puntuales, no hablan de GEO ni miden citación en LLMs.
- **Consultoras freelance locales (ejemplo analizado: freelance local L)**: tienen sitios web modernos (NextJS, landing cuidada) pero su copy sigue apuntando a SEO tradicional y a captación por canales clásicos. No mencionan GEO ni citación en LLMs.
- **Documentación pública sobre GEO**: dispersa, mayoritariamente en inglés, concentrada en blogs de actores interesados (Vercel, agencias norteamericanas). El caso Thomas Germain ("Hotdog Experiment", 2024) demostró en la práctica lo barato que es influir en una recomendación de LLM si se apunta a una query nicho.
- **Adopción del lado del usuario final**: ya ocurrió. Tres compras personales del propio autor del proyecto (aspiradora, celular, auto) se iniciaron preguntándole a un LLM, no a Google. La evidencia anecdótica converge con los reportes internacionales.

---

## 4. Definir la solución

Un **servicio productizado de GEO** para servicios profesionales independientes y pymes, con tres componentes integrados:

### 4.1 Módulo 1 — Infraestructura web optimizada para citación

Sitio web construido con **Astro** (HTML estático puro, sin JavaScript bloqueante, tiempos de carga bajos, hreflang bilingüe limpio) siguiendo las reglas de atomic content para LLMs:

- H2/H3 en forma de pregunta ("¿Cómo tramitar la jubilación docente en CABA?")
- Primera oración bajo cada header = respuesta directa
- Párrafos ≤ 3 oraciones, oraciones ≤ 25 palabras
- FAQ schema markup en cada página relevante
- Versión bilingüe español/inglés con hreflang correctos

### 4.2 Módulo 2 — Agente automatizado de generación de contenido bilingüe

Pipeline de generación asistida por LLM que, a partir de entrevistas de descubrimiento al cliente (una o dos sesiones grabadas), produce un corpus sostenido de contenido:

- Temas surgidos del conocimiento real del profesional (no keywords genéricos)
- Versionado en ambos idiomas
- Estructurado según las reglas de atomic content del módulo 1
- Revisión humana antes de publicar (el profesional valida el fondo, el agente se encarga de la forma)

El agente en sí es una pieza reutilizable entre clientes; la configuración de entrada (temas, tono, ICP del cliente) cambia caso por caso.

### 4.3 Módulo 3 — Sistema de medición dual (técnica + encuesta post-conversión)

Dado que no existe un "Google Analytics para LLMs", la medición se construye a mano combinando dos fuentes:

- **Medición técnica**: scripts periódicos (ideal: semanales) que consultan vía API a varios LLMs con un set definido de *prompts canónicos* ("¿qué abogado me conviene para jubilación docente en CABA?", "¿quién lleva sucesiones en zona norte?", etc.) y registran si el cliente aparece citado, cómo, y con qué frecuencia.
- **Encuesta post-conversión**: una vez que el cliente del cliente (el lead que se convierte en contrato) firma, se le hace una encuesta breve con la pregunta clave "¿cómo llegaste a nosotros?", con opciones explícitas que incluyen *"lo pregunté a ChatGPT / Gemini / Perplexity / Claude"*. Esta encuesta es la que permite medir la *materia oscura*: los casos donde el tráfico no deja huella técnica.

La combinación de ambas capas es, hoy, el único camino practicable para atribuir valor al trabajo de GEO.

---

## 5. Requisitos del sistema

### 5.1 Funcionales

- **RF1**: Construir y desplegar un sitio Astro bilingüe (es/en) con hreflang y FAQ schema en cada página de servicio.
- **RF2**: Implementar un pipeline de generación de contenido asistido por LLM que, dado un corpus de entrevistas de descubrimiento, produzca artículos estructurados según atomic content.
- **RF3**: Implementar un script de monitoreo semanal que consulte APIs de al menos tres LLMs (OpenAI, Anthropic, Google) con un set de prompts canónicos y registre resultados en una base propia.
- **RF4**: Diseñar e implementar una encuesta post-conversión con canal digital (link enviado al cliente del cliente) y almacenamiento estructurado de respuestas.
- **RF5**: Presentar un reporte mensual al cliente con apariciones técnicas detectadas + resultados de encuesta post-conversión + acciones sugeridas.

### 5.2 No funcionales

- **RNF1**: Sitio con Lighthouse ≥ 95 en Performance, Accessibility, Best Practices, SEO.
- **RNF2**: Tiempos de carga < 1.5s en 3G simulado.
- **RNF3**: Contenido legalmente revisable por el profesional antes de publicar (no publicación automática sin approval humano).
- **RNF4**: Costos operativos de herramientas externas compatibles con un presupuesto de proyecto de grado (bootstrap, sin inversión externa).
- **RNF5**: Arquitectura replicable: pasar de un cliente a dos no debe requerir reescribir el sistema.

### 5.3 Restricciones

- **Tiempo**: un cuatrimestre de cursada (≈ 16 semanas) para llegar a un caso validado presentable al mentor.
- **Presupuesto**: bootstrap, gastos cubiertos por el autor del proyecto. Sin inversión externa.
- **Tecnología**: stack moderno y libre (Astro, GitHub, APIs de LLMs con planes básicos/pagos personales).
- **Regulatorias**: el contenido legal debe ser revisado y firmado por la profesional antes de publicarse; responsabilidad profesional sobre el fondo recae en la abogada, no en el servicio de GEO.
- **Equipo**: un ingeniero en sistemas (autor) + una advisor con formación ADE/Marketing (colaboradora ocasional, no full-time) + mentor académico.
- **Validación**: el proyecto no se considera validado hasta tener al menos un caso real con datos reales (aunque los números sean modestos).

---

## 6. Objetivo general

Diseñar, implementar y validar en un caso real un **servicio productizado de *Generative Engine Optimization* (GEO)** para servicios profesionales independientes en el mercado hispanohablante, que combine infraestructura web optimizada para citación por LLMs, generación automatizada de contenido bilingüe y un sistema propio de medición dual (técnica + encuesta post-conversión), dejando evidencia cuantitativa y cualitativa de su funcionamiento.

---

## 7. Objetivos específicos

1. **OE1** — Construir el *playbook* metodológico del servicio (checklist de relevamiento, plantilla de entrevista de descubrimiento, criterios de atomic content, criterios de priorización de temas), citable contra la teoría de formulación de proyectos y la documentación de GEO.
2. **OE2** — Implementar una plantilla Astro bilingüe reutilizable con hreflang, FAQ schema, y estructura de atomic content, que sirva como base para cualquier nuevo cliente.
3. **OE3** — Implementar el agente de generación de contenido bilingüe asistido por LLM, con pipeline reproducible desde "corpus de entrevista" hasta "borrador publicable".
4. **OE4** — Implementar el sistema de medición dual: scripts de monitoreo de prompts canónicos + encuesta post-conversión con almacenamiento estructurado.
5. **OE5** — Aplicar el servicio completo al caso piloto (estudio jurídico especializado en jubilación docente y sucesiones) y generar un reporte con datos reales de al menos un ciclo mensual.
6. **OE6** — Documentar el proyecto al nivel de rigor exigido por la cátedra: formulación, diseño, ejecución y evaluación, con trazabilidad contra los marcos teóricos de la Habilitación Profesional.

---

## 8. Alcance

### 8.1 Lo que SÍ incluye este proyecto

1. Construcción del playbook metodológico del servicio.
2. Implementación de una plantilla Astro bilingüe reutilizable.
3. Implementación del agente de generación de contenido bilingüe.
4. Implementación del sistema de medición técnica (scripts de prompts canónicos contra APIs de LLMs).
5. Diseño e implementación de la encuesta post-conversión.
6. Aplicación completa del servicio al caso piloto real (estudio jurídico).
7. Entrevistas de descubrimiento reales con la profesional del caso piloto.
8. Generación de un corpus inicial de contenido bilingüe para el caso piloto.
9. Publicación real del sitio del caso piloto con dominio propio.
10. Recolección de datos reales durante al menos un ciclo mensual de medición.
11. Reporte cuantitativo y cualitativo del resultado.
12. Documentación académica completa al nivel de rigor de la cátedra.

### 8.2 Lo que NO incluye (fuera de alcance)

13. Branding integral del cliente (logotipo, identidad visual, paleta).
14. Producción audiovisual (fotografía profesional, video, podcast).
15. Gestión de redes sociales del cliente (Instagram, TikTok, Facebook).
16. Campañas pagas (Google Ads, Meta Ads, LinkedIn Ads).
17. Implementación de CRM o software de gestión interna del estudio jurídico.
18. Escalar a más de un cliente dentro de este proyecto de grado (se mantiene foco en el caso piloto único para garantizar profundidad).
19. Garantías numéricas de resultados (tráfico mínimo, leads mínimos). El compromiso es metodológico y de medición honesta, no de resultados garantizados en un mercado todavía no caracterizado.

---

## 9. Screening formal (6 filtros)

| # | Filtro | Estado | Justificación |
|---|---|---|---|
| 1 | Mercado | 🟢 Verde | Existe demanda latente: profesionales independientes sin presencia digital que necesitan aparecer en canales de descubrimiento modernos. Dolor validado con caso piloto real (madre del autor). Mercado hispanohablante sin oferta local. |
| 2 | Diferenciación | 🟢 Verde | Ningún actor local hispanohablante ofrece GEO como servicio productizado. Las agencias tradicionales siguen en SEO clásico. Las plataformas enterprise son inaccesibles por precio e idioma. El sistema de medición dual (técnica + encuesta post-conversión) es una diferenciación estructural, no cosmética. |
| 3 | Viabilidad técnica | 🟢 Verde | Todas las piezas son construibles con tecnología disponible y conocida: Astro, APIs de LLMs, scripts Python/Node, formularios. No requiere investigación científica ni hardware especial. El autor tiene formación técnica suficiente. |
| 4 | Recursos | 🟢 Verde | Costos operativos manejables con presupuesto personal de estudiante (dominios, hosting estático gratuito o barato, APIs de LLMs en plan básico). Tiempo disponible: un cuatrimestre asignable al proyecto integrador. Caso piloto sin costo (acceso familiar). |
| 5 | Timing | 🟡 Amarillo | Riesgo asumido conscientemente. El mercado de compradores que ya usan LLMs para decidir existe (evidencia personal del autor + caso Rauch + reportes internacionales) pero todavía no está masificado en el segmento hispanohablante de servicios chicos. El proyecto se posiciona explícitamente como *early mover*: si llegamos dos años antes que el resto del mercado, capturamos el aprendizaje; si llegamos cinco años antes, el riesgo es que el caso piloto no genere tracción en el horizonte del cuatrimestre. Mitigación: el éxito del proyecto se mide por rigor metodológico + datos reales + evidencia de aparición en LLMs, no exclusivamente por leads convertidos. |
| 6 | Equipo | 🟢 Verde | Ingeniero en Sistemas (autor) con base técnica suficiente + advisor con formación ADE/Marketing (colaboración parcial) + mentor académico de la cátedra. Rol cubierto: técnico, estratégico-comercial, académico. |

**Resultado**: 5 verde + 1 amarillo. **Aprobado para avanzar**, con el riesgo de timing explícitamente documentado y mitigado por la métrica de éxito.

---

## 10. Revisión de pitfalls (Eje 4)

| Pitfall | Estado | Observación |
|---|---|---|
| Enamorarse de la idea | ✅ Controlado | El amarillo de timing se dejó visible en el screening en lugar de maquillarlo. |
| Solucionar un problema que nadie tiene | ✅ Controlado | Problema validado en caso piloto real: la profesional está empezando sin clientes y sin presencia digital. Adicionalmente, el propio autor experimenta el cambio de canal desde el lado del comprador. |
| Ignorar la competencia | ✅ Controlado | Mapeo hecho: plataformas enterprise, agencias tradicionales, freelance local L. Ninguno compite directamente en el segmento elegido. |
| Subestimar recursos | ✅ Controlado | Alcance acotado conscientemente a un único caso piloto. Lo que queda fuera está listado explícitamente (sección 8.2). |
| No hablar con usuarios reales | ⚠️ Gate para Fase 2 | Hasta el momento el dolor fue caracterizado con el caso piloto a nivel conceptual. Antes de cerrar el diseño, Fase 2 debe incluir al menos una entrevista de descubrimiento estructurada con la profesional, y — idealmente — dos o tres conversaciones con otros profesionales independientes del entorno para no quedar con un único punto de validación. |
| Sobreestimar el mercado | ✅ Controlado | El proyecto no promete TAM multimillonario. Promete un caso real y metodología replicable. |

---

## 11. Pitch (versión aprobada)

**[Apertura — 30 seg]**
En 2024 Guillermo Rauch, el CEO de Vercel, contó un caso medio al pasar. Una consultora chica de ingeniería en software ganó un contrato con una automotriz multinacional a la que nunca habían contactado. No los encontraron por Google, no los encontraron por referidos, no los encontraron en LinkedIn. Los encontraron porque el comprador le preguntó a ChatGPT qué consultora contratar, y ChatGPT les dio el nombre de ellos. No una lista de diez. Un nombre.

**[Problema — 40 seg]**
Esa escena es el síntoma de un cambio de canal que hoy pasa silencioso por dos razones. La primera es que cuando un LLM recomienda, la respuesta se adapta a la conversación de cada uno, así que el comprador termina sintiendo que la decisión fue suya. No aparece en ningún reporte de adquisición, no deja rastro en analytics. Yo mismo usé así a ChatGPT para elegir un auto, una aspiradora y un celular; en ninguna de las tres compras el vendedor se enteró de por qué llegué a él. La segunda razón es que el LLM no devuelve diez links para que elijas, devuelve una decisión razonada. El comprador llega al primer contacto con el proveedor ya medio convencido; hay estudios iniciales que muestran tasas de conversión bastante más altas en tráfico originado en LLMs que en búsqueda tradicional.

**[Pregunta natural — 5 seg]**
¿Y cómo hace un profesional chico para aparecer en esas recomendaciones?

**[La solución — 30 seg]**
Hay tres cosas concretas que hay que hacer, y son las tres cosas que hace este proyecto. Uno: preparar la presencia web del profesional para que los modelos la puedan leer y citar. Dos: generar contenido bilingüe de forma sostenida a partir del conocimiento real del profesional. Tres: medir mes a mes si efectivamente aparece, en qué prompts y cómo. Lo hago como ingeniero en sistemas con conocimiento de SEO, no como agencia de marketing.

**[Estado del campo — 30 seg]**
Y acá está la parte incómoda: para hacer el punto tres todavía no existen herramientas accesibles. No hay un Google Analytics para LLMs. No hay parámetros de tracking. No hay dashboard abierto. Lo único que existen son un par de plataformas enterprise norteamericanas que cobran cientos de dólares por mes. Para el mercado hispanohablante, no hay nada. Así que parte del trabajo del proyecto es construir la medición a mano, combinando scripts propios que consultan a los modelos periódicamente con una encuesta post-conversión que le pregunta al cliente cómo llegó.

**[Paralelo histórico — 20 seg]**
En 1995 Barnes & Noble era la cadena de librerías más grande del mundo y tenía todo para quedarse con el mercado. Amazon eran tres personas en un garaje en Seattle vendiendo libros por una web que casi nadie usaba. Diez años después, cuando la web se volvió obvia para todos, Amazon ya estaba diez años adelante. Con la búsqueda mediada por IA estamos en un momento estructuralmente parecido, con una diferencia importante: los ciclos hoy son mucho más rápidos que en los noventa.

**[Por qué servicios chicos — 20 seg]**
Arranco por servicios profesionales chicos por tres razones prácticas. Es el segmento más accesible para validar la metodología sin gastar un año en ventas corporativas. Es donde el efecto del trabajo es más visible, porque parte de una presencia digital casi nula. Y es donde no hay un departamento de marketing interno compitiendo con el proyecto sobre cómo hacer las cosas.

**[Equipo y pedido — 15 seg]**
El equipo somos yo — ingeniero en sistemas con conocimiento de SEO — más una advisor con formación en ADE y marketing, más el mentor académico de la cátedra. Lo que pido para este cuatrimestre es el espacio para construir el servicio completo, aplicarlo al primer caso real, y traer datos concretos sobre qué funciona y qué no.

---

## 12. ICP — Ideal Customer Profile

**Perfil primario**: profesional independiente de servicios (abogado/a, contador/a, psicólogo/a, kinesiólogo/a, consultor/a) con estas características combinadas:

- Especialización vertical reconocible (no generalista).
- Compra del cliente final con componente consultivo (el cliente necesita razones para elegir, no solo precio).
- Presencia digital actual baja o inexistente.
- Sin departamento de marketing interno.
- Presupuesto compatible con una iguala mensual modesta (fit con servicios productizados, no con retainers de agencia grande).
- Disponibilidad personal para dedicar dos o tres sesiones de entrevista de descubrimiento y revisar contenido antes de publicar.

**Caso piloto concreto**: abogada recientemente matriculada, especializada en jubilación docente y sucesiones, con conocimiento profundo del dominio (ejemplo: diferencia de haber jubilatorio entre directora y maestra de grado) y cero presencia digital actual.

---

## 13. Métricas de éxito del proyecto (Fase 1 → Fase 4)

1. **Apariciones medibles en LLMs**: que el cliente piloto aparezca citado en al menos una respuesta de al menos un LLM sobre al menos un prompt canónico de su dominio durante el período de medición, con evidencia registrada.
2. **Leads atribuidos**: al menos un lead cualificado (consulta inicial con intención real) con atribución a canal LLM vía encuesta post-conversión.
3. **Validación metodológica**: al menos una entrevista de descubrimiento completada + al menos dos conversaciones con profesionales independientes fuera del caso piloto, que confirmen (o corrijan) el diagnóstico del problema.

El éxito del proyecto **no depende** de alcanzar volúmenes comerciales relevantes. Depende de producir evidencia honesta, metodología replicable y documentación rigurosa.

---

## 14. Decisión

**GO — Fase 1 cerrada.**

Condiciones explícitas que viajan con la decisión hacia Fase 2:

- El riesgo de timing (amarillo del filtro 5) queda documentado y mitigado por la métrica de éxito (se mide rigor metodológico, no volumen comercial).
- El gate pendiente de pitfall (usuarios reales — más allá del caso piloto) debe resolverse dentro del diseño de Fase 2: al menos una entrevista de descubrimiento formal con la profesional del caso piloto + al menos dos conversaciones con otros profesionales independientes del entorno del autor.
- La alcance está acotado deliberadamente a un único caso piloto. Cualquier expansión a más clientes queda fuera del proyecto de grado.

---

## 15. Handoff a Fase 2 (DISEÑO)

**Sub-agente siguiente**: "El Arquitecto" / Valentina (`4_Agentes/02_arquitecto_fase2.md`)
**Marco teórico de entrada**: `3_Marco Teorico/2 Evaluacion y Gestion de Proyectos.md`
**Input que recibe Fase 2**: este archivo completo (`_output/01-idea.md`)

**Preguntas que Fase 2 tiene que responder**:

- Viabilidad financiera: ¿cuánto sale construir y operar el servicio durante un cuatrimestre? ¿Es compatible con el presupuesto declarado?
- Planificación temporal: cronograma del cuatrimestre con hitos verificables y dependencias entre los tres módulos.
- Riesgos operativos: qué pasa si las APIs de los LLMs cambian precio, qué pasa si la profesional del caso piloto no consigue disponibilidad para las entrevistas, qué pasa si el primer mes de medición no devuelve ninguna cita.
- Estructura de costos del servicio (no del proyecto): si el servicio se vende en el futuro, ¿cuál sería la iguala mínima viable?
- Gate pendiente de Fase 1: diseño concreto de las entrevistas de descubrimiento (guion, criterios, cantidad mínima).

---

*Documento generado por el sub-agente Dante "El Explorador" como output final de la Fase 1 — IDEA del framework Gestor de Proyectos.*
