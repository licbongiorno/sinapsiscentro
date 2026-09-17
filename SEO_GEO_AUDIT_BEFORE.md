# Auditoría SEO/GEO — Estado antes de los cambios

Fecha: 2026-09-17. Sitio: `sinapsiscentro.com.ar` (repo `licbongiorno/sinapsiscentro`, static site en Vercel, sin build/framework — HTML/CSS/JS vanilla).

## 1. Estructura del proyecto

- Sitio estático, sin bundler ni framework. Cada página es un `.html` independiente con su propio `<head>` (title/meta/JSON-LD repetidos por página, no hay layout compartido a nivel de build).
- `css/servicios.css` es la hoja compartida por las 6 páginas de servicio (generadas desde una plantilla común en una sesión anterior).
- `data/*.js` alimenta las páginas de recursos (juegos, ejercicios, sonidos, etc.) — contenido dinámico vía JS, no SSR.
- Páginas "shell" dinámicas: `juego.html`, `ejercicio.html`, `infantil-actividad.html`, `mindfulness-item.html`, `creatividad-item.html` — renderizan contenido según un parámetro `?id=`, con `<meta name="robots" content="noindex">` ya puesto correctamente (esto ya estaba bien).
- No hay `replit.md` ni un `README.md` general del proyecto — sólo 4 README temáticos (`README-ejercicios.md`, `README-juegos.md`, `README-infantil.md`, `README-firebase-auth.md`), ninguno con instrucciones de SEO.

## 2. Hallazgos (antes de tocar nada)

| # | Hallazgo | Archivos afectados | Riesgo | Prioridad |
|---|---|---|---|---|
| 1 | Sin redirección `www` → sin `www` a nivel de código (sólo existía `/index.html` → `/`) | `vercel.json` | Alto (duplicación de dominio si `www` se indexa) | Alta |
| 2 | Código muerto del placeholder de Analytics (`G-XXXXXXXXXX`) en comentarios y en un `if` que ya no se ejecutaba, en 7 páginas — el ID real (`G-EMSJLNLRVJ`) ya estaba activo, pero el código confundía | `index.html` + 6 páginas de recursos | Bajo (cosmético/mantenimiento) | Media |
| 3 | 3 meta descriptions superaban los 160 caracteres (167–169) | `psicologia-berazategui.html`, `evaluacion-ados-2-adi-r-berazategui.html`, `evaluacion-neurocognitiva-berazategui.html` | Bajo | Media |
| 4 | `medicalSpecialty` en el JSON-LD de la home usaba valores que no son del enum oficial de schema.org (`"Psychological"`, `"Speech Therapy"`, `"Occupational Therapy"` no existen; el valor correcto más cercano es `"Psychiatric"`/`"SpeechPathology"`) | `index.html` | Bajo (no rompe Rich Results pero no es 100% válido) | Media |
| 5 | Ningún `tel:` clickeable en todo el sitio — el teléfono sólo aparecía dentro de un link a WhatsApp | Todas las páginas | Medio (UX y señal local SEO) | Alta |
| 6 | Sin enlace a Google Maps / no había forma de trackear clics en "cómo llegar" | `index.html` | Bajo | Media |
| 7 | Analytics: sólo `index.html` trackeaba clics en WhatsApp/email; las 6 páginas de servicio no tenían ningún evento de conversión | 6 páginas de servicio | Medio (pérdida de datos de conversión) | Alta |
| 8 | Frases de autoridad sin respaldo verificable ("equipo capacitado", "equipo interdisciplinario está capacitado para cada etapa del ciclo vital") en FAQ visibles + su copia en JSON-LD | `index.html`, `psicologia-berazategui.html`, `evaluacion-ados-2-adi-r-berazategui.html` | Medio (roza la regla de no afirmar credenciales sin evidencia) | Alta |
| 9 | Sin bloque "Fuentes y referencias" en las páginas clínicas (ADOS-2/ADI-R, Neurocognitiva) | 2 páginas de evaluación | Medio (spec lo pide explícitamente para estas páginas) | Alta |
| 10 | No existían `/equipo-profesional.html`, `/privacidad.html`, `/terminos.html`, `/uso-de-recursos.html` | — | Medio | Alta |
| 11 | Faltaba `dateModified` en el schema `MedicalWebPage` de las 6 páginas de servicio | 6 páginas de servicio | Bajo | Baja |
| 12 | El primer párrafo de "¿Qué es?" en cada página de servicio no seguía el patrón GEO de respuesta directa (no siempre nombraba "Sinapsis" + "Berazategui" + "sin derivación" en las primeras 40–60 palabras) | 6 páginas de servicio | Medio (afecta extractabilidad por IA) | Alta |
| 13 | Footer de las páginas de servicio no tenía teléfono/email/dirección/horario clickeables — sólo un link a "Volver al inicio" | 6 páginas de servicio | Medio | Alta |

## 3. Lo que ya estaba bien (verificado, no se tocó salvo mejora incremental)

- `robots.txt`: permite rastreo, no bloquea CSS/JS, referencia el sitemap sin `www`.
- `sitemap.xml`: sólo URLs canónicas sin `www` ni parámetros, sin los shells dinámicos.
- Canonical, `og:url`, `lang="es"`, H1 único: correctos en las 7 páginas indexables principales.
- JSON-LD: `MedicalBusiness` en la home ya tenía `@id`, `address`, `geo`, `openingHoursSpecification`, `sameAs`, `areaServed` reales. Las 6 páginas de servicio ya tenían `BreadcrumbList` + `MedicalWebPage` + `FAQPage`, con `isPartOf`/`about`/`publisher` bien enlazados por `@id`.
- FAQ visible == FAQ del schema, en todas las páginas que tienen FAQ.
- Rendimiento: `font-display: swap`, `preconnect` a Google Fonts, todos los `<script>` con `defer`, sin bloqueos de renderizado — ya estaba resuelto en trabajo previo de esta misma sesión.
- Accesibilidad: skip-link, `focus-visible`, modo accesible opcional, todas las `<img>` ya tenían `alt`.
- Disclaimer "Estos recursos son complementarios..." ya estaba presente en las 6 páginas de recursos (`.jp-disclaimer`), de trabajo previo en esta sesión.
- No se encontró ningún `<img>` sin `alt` en las páginas estáticas.

## 4. Información real del negocio que falta

Documentada en detalle en `SEO_GEO_CONTENT_NEEDED.md`. En resumen: no hay datos reales de profesionales individuales (nombre, matrícula, formación), ni la edición/editorial exacta de los manuales de ADOS-2/ADI-R que usa el centro, ni la batería de evaluación neurocognitiva específica, ni confirmación de si la atención es presencial/virtual/híbrida. **No se inventó ninguno de estos datos.**
