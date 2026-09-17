# Auditoría SEO/GEO — Estado después de los cambios

Fecha: 2026-09-17. Ver `SEO_GEO_AUDIT_BEFORE.md` para el estado previo, `SEO_GEO_CONTENT_NEEDED.md` para lo que falta de información real, y `SEO_GEO_VALIDATION.md` para el detalle de cada validación corrida.

## 1. Cambios realizados

### Técnico / global
- **Redirección `www` → sin `www`** agregada en `vercel.json` (regla `has: [{type: "host", value: "www.sinapsiscentro.com.ar"}]`). Requiere una acción externa para activarse — ver sección 7.
- **Código muerto del placeholder de Analytics** (`G-XXXXXXXXXX`) eliminado de `index.html` y las 6 páginas de recursos; el ID real `G-EMSJLNLRVJ` queda como única referencia, sin condicionales confusos.
- **`medicalSpecialty`** en el JSON-LD de la home corregido a valores válidos del enum de schema.org (`Psychiatric`, `SpeechPathology`) — no existe un valor oficial para "terapia ocupacional" ni "psicopedagogía" en ese enum (limitación real de schema.org, documentada, no un error nuestro).
- **`sitemap.xml`**: `lastmod` actualizado a la fecha real de esta edición, agregadas las 3 páginas nuevas indexables (`uso-de-recursos.html`, `privacidad.html`, `terminos.html`). `equipo-profesional.html` queda deliberadamente fuera (está en `noindex`).

### Analytics y conversiones
- Nuevo `js/analytics-eventos.js` compartido: trackea clics en WhatsApp, email, **teléfono** (nuevo) y **mapa/dirección** (nuevo) en cualquier página que lo cargue. Antes sólo `index.html` trackeaba WhatsApp/email, y ninguna página trackeaba teléfono ni mapa.
- Conectado en la home y en las 6 páginas de servicio (antes esas 6 no trackeaban ningún clic de conversión).
- Agregado un `<a href="tel:+5491168567160">` real (antes el teléfono sólo aparecía dentro de un link a WhatsApp, nunca como llamada directa) — en la home y en el footer de las 6 páginas de servicio + las 4 páginas nuevas.
- Agregado un link a Google Maps (búsqueda por la dirección real) en la home, con tracking de clic.

### On-page SEO
- 3 meta descriptions que superaban 160 caracteres, recortadas a 145-160 sin perder el sentido (`psicologia-berazategui.html`, `evaluacion-ados-2-adi-r-berazategui.html`, `evaluacion-neurocognitiva-berazategui.html`).
- `dateModified` (real, fecha de esta edición) agregado al JSON-LD `MedicalWebPage` de las 6 páginas de servicio.
- Footer de las 6 páginas de servicio: antes sólo tenía "Volver al inicio"; ahora tiene teléfono, email, dirección y horario clickeables/visibles, más links a Equipo/Privacidad/Términos.

### GEO (respuesta directa)
- Reescrito el primer párrafo ("¿Qué es?") de las 6 páginas de servicio para que sea una respuesta autosuficiente de 35-50 palabras que nombra explícitamente "Sinapsis", "Berazategui" y "sin derivación médica previa" — antes algunas empezaban con "La psicología..." o "La fonoaudiología..." sin anclar la marca ni la ubicación en esa primera oración.
- La página de ADOS-2/ADI-R ahora aclara explícitamente, en la respuesta directa, que "no reemplazan un diagnóstico por sí solos" (pedido explícito del punto 6 del prompt original).

### Autoridad y afirmaciones
- Eliminadas o reformuladas las frases que afirmaban una credencial sin evidencia ("equipo capacitado", "nuestro equipo interdisciplinario está capacitado para cada etapa del ciclo vital") en `index.html`, `psicologia-berazategui.html` y `evaluacion-ados-2-adi-r-berazategui.html` (FAQ visible + su copia en JSON-LD), reemplazadas por descripciones de lo que el centro efectivamente hace, sin afirmar formación específica no verificada.
- Agregada la sección "Fuentes y referencias" en las 2 páginas clínicas (ADOS-2/ADI-R, Neurocognitiva). La de ADOS-2/ADI-R tiene una fuente real (OMS); la de Neurocognitiva queda con un aviso honesto de que está pendiente, en vez de una fuente inventada.

### Páginas nuevas
- `/equipo-profesional.html` — estructura lista, en `noindex` hasta tener datos reales, sin nombres inventados.
- `/privacidad.html` — borrador prudente basado en lo que el sitio realmente hace técnicamente (Firebase Auth, Analytics, localStorage), marcado para revisión legal.
- `/terminos.html` — borrador prudente, marcado para revisión legal.
- `/uso-de-recursos.html` — consolida la aclaración "estos recursos son complementarios..." con FAQ propia y enlaces a las 6 secciones de recursos.
- Las 6 páginas de servicio + la home ahora enlazan a estas 4 páginas nuevas desde el footer.

### Scripts de validación
- `scripts/validar_seo.py` — reutilizable, valida sitemap/robots/title/description/canonical/H1/JSON-LD/enlaces internos en todo el sitio. Ver `SEO_GEO_VALIDATION.md`.

## 2. Archivos modificados o creados

**Modificados:** `index.html`, `vercel.json`, `sitemap.xml`, `css/servicios.css`, `juegos.html`, `ejercicios.html`, `mindfulness.html`, `creatividad.html`, `infantil.html`, `sonidos.html`, `psicologia-berazategui.html`, `psicopedagogia-dificultades-aprendizaje.html`, `fonoaudiologia-berazategui.html`, `terapia-ocupacional-integracion-sensorial.html`, `evaluacion-ados-2-adi-r-berazategui.html`, `evaluacion-neurocognitiva-berazategui.html`.

**Creados:** `equipo-profesional.html`, `privacidad.html`, `terminos.html`, `uso-de-recursos.html`, `js/analytics-eventos.js`, `scripts/validar_seo.py`, `SEO_GEO_AUDIT_BEFORE.md`, `SEO_GEO_AUDIT_AFTER.md`, `SEO_GEO_CONTENT_NEEDED.md`, `SEO_GEO_VALIDATION.md`, `SEO_GEO_PROMPTS.md`.

## 3. Problemas resueltos vs. pendientes

**Resueltos** (ver detalle arriba): redirect www a nivel de código, placeholder de Analytics muerto, meta descriptions largas, `medicalSpecialty` inválido, cero tracking de teléfono/mapa/conversión en páginas de servicio, cero `tel:` clickeable en todo el sitio, afirmaciones de autoridad sin respaldo, falta de páginas legales/equipo/uso-de-recursos, respuesta directa GEO débil en varias páginas de servicio, falta de `dateModified` real.

**Pendientes** (dependen de información real que no existía en el proyecto, ver `SEO_GEO_CONTENT_NEEDED.md`): perfiles de profesionales, fuente clínica de la batería neurocognitiva, edición exacta de los manuales ADOS-2/ADI-R, confirmación de modalidad de atención, revisión legal de privacidad/términos, listado de obras sociales específicas.

**Pendientes que son 100% acciones externas** (no se pueden resolver desde el código, ver sección 7).

## 4. Puntuación SEO técnico: ~81/100

**Esto es una estimación interna basada en esta auditoría, con una rúbrica propia — no es el resultado de Lighthouse, PageSpeed ni ninguna herramienta oficial**, porque ninguna de ellas puede correr contra una URL en vivo desde este entorno (sin salida de red a `sinapsiscentro.com.ar`, confirmado con `curl`).

| Categoría | Puntos | Evidencia |
|---|---|---|
| Canonicalización y URLs | 8/10 | Código correcto; falta confirmar que `www` esté atado al proyecto en Vercel (acción externa) |
| Robots.txt y sitemap | 10/10 | `scripts/validar_seo.py` sin errores |
| Metadata on-page (title/desc/canonical/OG/Twitter/H1) | 14/15 | Validado en las 20 páginas indexables; los 5 shells dinámicos quedan sin metadata estática por diseño |
| Datos estructurados | 12/15 | 32 bloques JSON-LD, 0 inválidos; `medicalSpecialty` con una limitación real de schema.org; sin `Person` para el equipo todavía |
| Contenido único y profundidad | 10/15 | Páginas de servicio en ~450-600 palabras con secciones reales; no se alcanzó la profundidad exhaustiva de cada subtema pedido en el prompt (ver sección 5) |
| Enlaces internos | 9/10 | Sin enlaces rotos (validado); breadcrumbs + servicios relacionados + footer en las 6 páginas |
| Rendimiento | 7/10 | font-display swap, preconnect, defer, sin bloqueos — verificado en código; sin número real de LCP/INP/CLS (necesita Lighthouse en vivo) |
| Accesibilidad | 8/10 | Skip link, focus-visible, alt, aria-label, modo accesible — verificado; sin auditoría automática de contraste |
| SEO local (NAP, areaServed, sameAs) | 3/5 | Datos consistentes y reales en el código; estado del Perfil de Empresa de Google desconocido (acción externa) |
| **Total** | **81/100** | |

## 5. Puntuación GEO: ~74/100

| Categoría | Puntos | Evidencia |
|---|---|---|
| Respuesta directa en 40-60 palabras | 13/15 | Reescrita en las 6 páginas de servicio |
| Autosuficiencia (nombra Sinapsis + Berazategui explícitamente) | 13/15 | Igual que arriba |
| FAQ visible = FAQ schema | 15/15 | Validado programáticamente en 8 páginas, coincide 100% |
| Fuentes citables | 5/15 | Sólo 1 de 2 páginas clínicas tiene una fuente real citada; el resto no tenía afirmaciones que ameritaran cita, o quedó marcado como pendiente en vez de inventar una |
| Actualidad (`dateModified` real) | 8/10 | En las 6 páginas de servicio; no en la home (no tiene ese campo en su schema `MedicalBusiness`, que no lo requiere) |
| E-E-A-T / autoridad (profesionales, matrícula) | 3/15 | Deliberadamente no completado — no hay datos reales, y se prefirió dejarlo pendiente antes que inventarlo. Es el mayor bloqueo real para el 100/100 |
| Consistencia de menciones (sin pronombres ambiguos) | 8/10 | Mejorada en las respuestas directas; el resto del contenido preexistente no se reescribió entero |
| Indexabilidad para crawlers de IA | 9/10 | `robots.txt` permite todos los user-agents (incluidos los de IA); no se verificó explícitamente contra cada bot conocido (GPTBot, PerplexityBot, ClaudeBot, etc.) porque `Allow: /` para `User-agent: *` ya los cubre a todos por definición |
| **Total** | **74/100** | |

## 6. Por qué no es 100/100 (ni debería prometerse)

1. **Sin datos reales de profesionales** — es el bloqueo más grande para GEO/E-E-A-T. Ningún buscador con IA va a poder citar "quién te atiende" hasta que exista esa información, y agregarla inventada sería peor que no tenerla.
2. **Sin verificación en vivo** — nada de esto se probó contra el dominio real desplegado (Lighthouse, indexación en Google Search Console, Rich Results Test de Google). El código está listo, pero "listo en el código" no es lo mismo que "confirmado en producción".
3. **Sin señales externas de autoridad** — reseñas, menciones en directorios, backlinks reales: nada de esto se puede fabricar desde el código, y son señales que los buscadores (tradicionales y con IA) sí usan.
4. **Redirección `www` no confirmada en Vercel** — el código está listo pero depende de una configuración de dominio fuera del repositorio.
5. **Profundidad de contenido parcial** — el prompt original pedía cubrir en detalle cada subtema de cada especialidad (por ejemplo, las 8 subsecciones pedidas para "Psicología"); se cubrieron las más importantes por página sin inflar el contenido con relleno, pero no se llegó a una cobertura exhaustiva de cada punto listado en el prompt para las 6 especialidades.

## 7. Acciones que debe realizar el dueño fuera del código

- Agregar `www.sinapsiscentro.com.ar` como dominio del mismo proyecto en Vercel (Settings → Domains) para que la redirección a sin-`www` funcione.
- Revisar y "reclamar" el Perfil de Empresa de Google (Google Business Profile): categoría correcta, horarios, servicios, fotos.
- Conseguir reseñas genuinas de pacientes/familias (nunca fabricadas) y responderlas.
- Conseguir menciones/enlaces reales desde directorios locales o profesionales (colegios profesionales, cámaras de comercio de Berazategui, etc.).
- Verificar consistencia del NAP (nombre/dirección/teléfono) en cualquier directorio externo donde ya figure el centro.
- Enviar el sitemap actualizado a Google Search Console y Bing Webmaster Tools una vez desplegado.
- Decidir y confirmar la modalidad de atención (presencial/virtual/híbrida) para poder afirmarla en el sitio.
- Cuando exista, entregar la información real de cada profesional para completar `/equipo-profesional.html`.
- Revisar `/privacidad.html` y `/terminos.html` con asesoría legal antes de considerarlos definitivos.
- Correr Lighthouse/PageSpeed Insights contra la URL real una vez desplegado, para tener números reales de Core Web Vitals (LCP/INP/CLS) — el código ya está preparado (font-display swap, preconnect, defer, sin bloqueos) pero el número final depende también del hosting/CDN en producción.

## 8. Riesgos y pendientes técnicos menores

- `medicalSpecialty` en el JSON-LD de la home no tiene un valor 100% preciso para "terapia ocupacional"/"psicopedagogía" porque schema.org no tiene ese enum — se dejó sólo con los valores que sí son válidos (`Psychiatric`, `SpeechPathology`), lo cual es más correcto técnicamente pero representa menos servicios explícitamente en ese campo puntual (no afecta el resto del schema, que sí los menciona en `areaServed`/contenido).
- Las 5 páginas "shell" dinámicas (`juego.html`, `ejercicio.html`, etc.) siguen sin metadata estática por diseño (están en `noindex`, su contenido real lo pone JS según `?id=`) — es la arquitectura correcta para este caso, no un pendiente.

## 9. Próximo paso recomendado

Priorizar, en este orden: (1) conseguir y cargar los datos reales del equipo profesional — es lo que más impacto tendría en GEO/E-E-A-T; (2) atar el dominio `www` en Vercel; (3) correr Lighthouse contra el sitio ya desplegado y ajustar rendimiento si hace falta; (4) revisar legal las páginas de privacidad/términos; (5) empezar a correr manualmente las consultas de `SEO_GEO_PROMPTS.md` cada mes para medir progreso real en GEO.
