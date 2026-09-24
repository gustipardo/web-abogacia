# Rediseño Estudio Ghetti
Rama: diseno-estudio-ghetti. Base: main, commit 6a8939c.

## Cambios
- Diseño de la maqueta aplicado a Astro: logo 01, retrato monocromo, bordó #511725, marfil #FDFCF9, arena y oliva; Georgia y Arial.
- Menú Servicios en escritorio y móvil: Jubilación docente, Multas de tránsito, Sucesiones y Derecho Civil.
- Secciones propias para esos servicios, preguntas frecuentes y contacto simplificado.
- Formulario con opciones coherentes; al consultar desde un servicio, el área queda seleccionada.
- Eliminación de mensajes de gratuidad en la interfaz, metadatos y gráficos públicos.
- Marca aplicada a artículos, ficha previsional, favicon y tarjetas para compartir enlaces.
- Fechas: requisitos agosto 2026; cálculo mayo 2026 (sin cambios); simultaneidad enero 2026; licencias julio 2025; premio marzo 2025; jubilación parcial enero 2025; reciprocidad octubre 2024; cese mayo 2024; años de servicio diciembre 2023.
- Se conservó el día de las fechas originales porque el documento solo especifica mes y año. Formato UTC para que la zona horaria no altere el mes.
- El contenido jurídico y el estado de validación de los artículos se conservan.

## Revisión local
La vista previa se inicia con npm run dev. Las variables de producción siguen en Vercel; no se incluyen credenciales en el repositorio.
La prueba npm run test:redesign usa un servidor local con PUBLIC_WEB3FORMS_KEY=local-test-intercept-only e intercepta el envío; esa clave ficticia nunca debe configurarse en producción.
npm run test:ficha también simula el envío por defecto.
Para usar Edge instalado, configurar PUPPETEER_EXECUTABLE_PATH.

## Publicación
La rama contiene los cambios para revisar antes de incorporarlos a main. CLAUDE.md exige aprobación de la Dra. antes de publicar.

## Verificación realizada
- npm run build: correcto, todas las rutas generadas.
- test:redesign: correcto en 320, 390, 768 y 1440 px; sin desbordes ni imágenes rotas; menú con teclado y móvil, opciones y envío de contacto simulado, fechas y consola.
- test:ficha: escenarios positivo y negativo correctos, sin correos reales.
- git diff --check: correcto.
