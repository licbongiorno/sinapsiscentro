# Auditoría integral — Centro Sinapsis (noviembre 2026)

Sitio: https://sinapsiscentro.com.ar/ · Rama de trabajo: `claude/gracious-newton-mivhaf` · Despliegue: Vercel desde `main`.

---

## 1. Diagnóstico general

El sitio parte de una base técnica **buena**: HTML estático sin framework, HTTPS con HSTS, sitemap y robots correctos, canonical en todas las páginas, datos estructurados válidos, `llms.txt`, IndexNow y un validador SEO propio. En Lighthouse (móvil, producción) tenía **SEO 100 y Buenas prácticas 100** en las páginas medidas.

Los problemas reales estaban en otro lado:

1. **Rendimiento móvil de la home: 59/100**, con LCP de 4,6 s. La animación de entrada del título arrancaba con opacidad 0, y Google Analytics y el widget de Instagram competían con la carga inicial.
2. **Rigor clínico en la comunicación del ADOS-2.** Varias páginas, la meta descripción y `llms.txt` decían "para el diagnóstico del TEA". El ADOS-2 no diagnostica por sí solo.
3. **Páginas de servicio delgadas y con plantilla repetida.** Faltaban qué situaciones aborda cada área, cómo trabaja y qué puede esperar la familia. Las FAQ eran casi iguales en todas las páginas.
4. **Un servicio sin página**: Orientación vocacional y ocupacional no aparecía en ningún lugar del sitio.
5. **Accesibilidad**: tres fallas WCAG en todo el sitio:
   - enlaces del pie de página que solo se distinguían por el color (2,57:1);
   - el botón flotante de WhatsApp fuera de una región identificable;
   - un texto con contraste insuficiente en la home (4,37:1).
6. **Dato estructurado incorrecto**: `medicalSpecialty: "Psychiatric"`, cuando el centro no tiene psiquiatría.
7. **No existía un control automático** que impidiera publicar un error ni una auditoría periódica.

## 2. Estado por área (antes → después)

| Área | Antes | Después |
|---|---|---|
| **SEO técnico** | Muy bueno (validador sin errores, SEO 100) | Igual. Se suma control automático en cada PR. |
| **SEO local** | NAP consistente en web y schema. www → sin www con **307** (temporal). | Igual en la web. El 307 se corrige en Vercel: **tarea manual**. |
| **GEO / AEO** | `llms.txt`, FAQPage y knowsAbout. Afirmación incorrecta sobre ADOS-2 y cobertura ambigua ("obras sociales y prepagas"). | Afirmaciones corregidas. Cobertura explicada como reintegro / CUD. Nuevo servicio en schema y `llms.txt`. 12 páginas de servicio con respuestas concretas. |
| **Rendimiento** (Lighthouse móvil, home) | 59 en producción; 75 en local | **91–92 en local**. LCP de 4,6 s a ~1,9 s. TBT de ~1,1 s a ~0,3 s. |
| **Accesibilidad** (axe, 54 páginas) | 3 fallas graves en ~45 páginas | **0 fallas graves o críticas**. Lighthouse Accesibilidad 100 en home y servicios. |
| **Copywriting** | Cálido y claro, pero repetitivo en servicios y con promesas clínicas imprecisas | 11 servicios ampliados y una página nueva, sin promesas terapéuticas. |
| **Diseño** | Sistema consistente: navy/teal en la estructura, paleta Instagram en ilustraciones y talleres | Se mantiene la identidad. Nuevo componente "Cómo trabajamos" (tarjetas numeradas). Contraste ajustado. |
| **Legal / datos** | Privacidad y términos en borrador. El formulario no aclaraba qué pasa con los datos. | Aviso en el formulario: no guarda datos, solo arma el mensaje de WhatsApp, con enlace a la política. |

> La medición "después" es en servidor local con la misma simulación móvil de Lighthouse. La de producción queda en el primer informe automático mensual, porque Vercel suma compresión y CDN.

## 3. Problemas detectados, por prioridad

### CRÍTICO

Ninguno: el sitio no tenía errores que impidieran indexar o funcionar.

### ALTO

| # | Problema | Solución | Beneficio | ¿Automático? |
|---|---|---|---|---|
| A1 | ADOS-2 presentado como "para el diagnóstico del TEA" (meta, `llms.txt`, home, TEA) | Reescritura: observación y entrevista estandarizadas dentro de una evaluación clínica. "Ningún instrumento diagnostica por sí solo." | Rigor ético. Evita que buscadores e IA repitan una afirmación incorrecta. | ✅ Hecho |
| A2 | Home lenta en móvil (LCP 4,6 s, TBT 950 ms) | Animación del título sin opacidad 0, GA cargado después del `load`, SnapWidget diferido, `content-visibility` en secciones fuera de pantalla | Mejor posicionamiento móvil y menos abandono | ✅ Hecho |
| A3 | Servicios sin "situaciones / cómo trabajamos / qué esperar" | 3 secciones nuevas + FAQ propias en 11 páginas, en HTML y JSON-LD | Más relevancia para búsquedas long-tail y respuestas citables por IA. Más confianza para la familia. | ✅ Hecho |
| A4 | Orientación vocacional y ocupacional sin página | Página nueva, tarjeta en la home, pie de página, sitemap, schema y `llms.txt` | Captar una búsqueda hoy perdida | ✅ Hecho (faltan datos: ver §8) |
| A5 | Enlaces del pie de página sin subrayado (WCAG 1.4.1) | Subrayado sutil | Accesibilidad | ✅ Hecho |
| A6 | `medicalSpecialty: Psychiatric` | Se reemplaza por SpeechPathology + Physiotherapy | Evita que Google o una IA asuman atención psiquiátrica | ✅ Hecho |
| A7 | www redirige con 307 (temporal) | Marcar el dominio www como redirección permanente (308) en Vercel → Settings → Domains | Consolidar señales en un solo dominio | ❌ Manual |

### MEDIO

| # | Problema | Solución | ¿Automático? |
|---|---|---|---|
| M1 | Botón flotante fuera de un landmark | Se envuelve en `<aside aria-label>` | ✅ |
| M2 | Contraste 4,37:1 en el acceso a Talleres | Color de texto más oscuro | ✅ |
| M3 | El formulario no explicaba el tratamiento de datos | Aviso + enlace a privacidad | ✅ |
| M4 | Promesa "primera entrevista en menos de 48 hs" / "turnos esta semana" (31 apariciones) | Se mantiene, porque ya estaba publicada por el centro. Queda como **pendiente de confirmación** y la auditoría mensual la recuerda. | ⚠️ Confirmar |
| M5 | Kinesiología con 571 palabras | Ampliar cuando se confirme la modalidad (grupal o individual) y los horarios del gimnasio | ⚠️ Requiere datos |
| M6 | Rótulo "Diagnóstico de TEA" en tarjetas relacionadas | Pasa a "Evaluación del TEA" | ✅ |
| M7 | El nombre "Sinapsis" coincide con centros de España, Chile y Ecuador | Mantener siempre "Centro Sinapsis · Berazategui" en perfiles externos y sumar `sameAs` cuando existan GBP y directorios | ⚠️ Parcial (manual) |

### BAJO

- Las páginas utilitarias con `noindex` (juegos, recursos, 404) tienen contenido fuera de landmarks. Es un aviso de buenas prácticas sin impacto en SEO.
- Las URLs sin `.html` (`/psicologia-berazategui`) dan 404. Activar `cleanUrls` cambiaría todas las canónicas, así que no se hizo. Se puede evaluar más adelante.
- Fuentes: Nunito y Playfair se cargan de forma asíncrona y ya no bloquean el render. Autoalojarlas sería una mejora menor.

## 4. Competencia e investigación de búsquedas

- **Competencia local en la web: débil.** En las búsquedas de prueba no apareció ningún centro de Berazategui con páginas propias por servicio. Los resultados son directorios (Doctoralia, que lista prestadores de Lanús, Quilmes y Temperley bajo "Berazategui"), PDFs de cartillas de obras sociales y el centro municipal de salud mental. **Oportunidad:** con páginas por servicio y por zona, Sinapsis puede ser la mejor respuesta local.
- **ADOS-2 en Zona Sur:** no apareció ningún prestador local con contenido propio. Los resultados son de editoriales (TEA Ediciones) y cursos. Una página clara y rigurosa sobre ADOS-2 en Berazategui tiene muy poca competencia.
- **Marca:** "Centro Sinapsis" no aparece todavía en buscadores generales para "Berazategui", y el nombre se confunde con entidades homónimas. Para la GEO la prioridad es la **consistencia de entidad**: el mismo nombre, dirección y teléfono en Google Business Profile, Instagram, Facebook, Doctoralia y directorios, enlazados con `sameAs`.
- **Diferenciales a sostener en la comunicación:** todas las áreas en un mismo lugar, atención con y sin CUD, explicación honesta del reintegro, talleres, guías para familias y kinesiología para adultos mayores.

*Limitación:* la búsqueda web disponible para esta auditoría no está localizada en Argentina. El análisis de volumen real de búsquedas debe hacerse con Search Console (está en la checklist trimestral).

## 5. GEO / AEO: qué se hizo y por qué

- **`llms.txt`: se mantiene.** Es barato, ya existe, y resume la entidad, los servicios y las reglas de cobertura sin ambigüedad. No reemplaza al HTML: los motores generativos citan sobre todo páginas indexadas. Por eso el esfuerzo principal estuvo en el contenido de servicios.
- **Respuestas citables:** cada servicio responde ahora "para quién, qué situaciones, cómo se trabaja, qué esperar" en frases cortas y autocontenidas. Son el formato que extraen AI Overviews y Perplexity.
- **Precisión antes que volumen:** se corrigieron las afirmaciones que una IA podría repetir mal: el ADOS-2 como diagnóstico, la cobertura de "obras sociales y prepagas" sin aclarar el reintegro y la especialidad psiquiátrica.
- **Sin promesas:** el sitio no puede garantizar que una IA recomiende el centro. Lo que se mejoró es la comprensión, la consistencia y la elegibilidad como fuente.

## 6. Cambios realizados en el código

| Archivo | Cambio |
|---|---|
| `scripts/enriquecer_servicios.py` (nuevo) | Agrega a 11 servicios "Situaciones que acompañamos", "Cómo trabajamos", "Qué podés esperar" y FAQ propias (HTML + JSON-LD). Renombra "Cómo es la primera entrevista" a "Cómo pedir una consulta". Es idempotente. |
| `scripts/generar_servicios_nuevos.py` (nuevo) | Genera `orientacion-vocacional-ocupacional-berazategui.html` |
| `orientacion-vocacional-ocupacional-berazategui.html` (nuevo) | Página del servicio |
| `img/ilustraciones/orientacion-vocacional.svg` (nuevo) | Ilustración (brújula + birrete, Phosphor) |
| 11 páginas `*-berazategui.html` y de servicio | Contenido nuevo, `dateModified`, FAQ |
| `evaluacion-ados-2-adi-r-berazategui.html`, `autismo-tea-berazategui.html`, `llms.txt` | Evaluación ≠ diagnóstico; cobertura por reintegro |
| `index.html` | Rendimiento (animación, `content-visibility` con corrección de anclas, SnapWidget diferido, título del iframe en español), tarjeta y oferta de Orientación vocacional, `medicalSpecialty`, `knowsAbout` |
| 50 páginas HTML + plantillas | Google Analytics se carga después del evento `load` |
| `css/servicios.css` | Subrayado accesible en el pie de página. Estilos de "Cómo trabajamos". |
| `css/talleres.css` | Contraste del acceso a Talleres |
| `js/consulta.js` | Botón flotante dentro de `<aside>`, aviso de privacidad del formulario, motivo "Orientación vocacional" |
| `scripts/ilustraciones.py`, `scripts/plantilla_paginas.py` | Nueva ilustración e ícono. Enlace relacionado "vocacional". Rótulo "Evaluación del TEA". GA diferido. |
| `sitemap.xml` | Página nueva (49 URLs) y `lastmod` actualizado |
| `scripts/auditoria_periodica.py` (nuevo) | Auditoría del sitio publicado y del contenido |
| `.github/workflows/calidad.yml` (nuevo) | Validación en cada PR y en cada push a main |
| `.github/workflows/auditoria-periodica.yml` (nuevo) | Informe mensual + checklist trimestral en un issue |

## 7. Resultados de los tests

- `python3 scripts/validar_seo.py`: **0 errores, 0 avisos** (54 páginas, 49 URLs de sitemap).
- FAQ visible = FAQPage JSON-LD en todas las páginas: **OK**.
- axe-core (WCAG 2.0/2.1/2.2 A-AA + buenas prácticas) en las 54 páginas, móvil:
  - **0 fallas graves o críticas** (antes, 42 páginas con fallas graves);
  - quedan avisos "moderados" de landmarks en 14 páginas utilitarias.
- Lighthouse local, móvil:
  - home: Rendimiento **91–92**, Accesibilidad **100**;
  - Psicología: Rendimiento **96**, Accesibilidad **100**.
- Anclas internas (`#servicios`, `#faq`, `#info`…) al hacer clic desde el menú: llegan igual o mejor que antes. Con enlaces desde otras páginas (`/#servicios`), la posición se corrige después de la carga.
- Sin desbordamiento horizontal en 390 px en ninguna página.
- `scripts/auditoria_periodica.py` contra producción antes del deploy: detectó correctamente la página nueva como 404 y el sitemap desactualizado (era lo esperado antes de publicar).

## 8. Tareas que requieren intervención del centro

**Configuración (15–30 min cada una)**

1. **Vercel → Settings → Domains:** cambiar `www.sinapsiscentro.com.ar` a redirección **permanente (308)**. Hoy es 307.
2. **Google Search Console:** pedir indexación de `orientacion-vocacional-ocupacional-berazategui.html` y de las 11 páginas de servicio actualizadas. Revisar la cobertura.
3. **GA4:** marcar `generate_lead` como evento clave (si no se hizo).
4. **Google Business Profile:**
   - categoría principal y secundarias acordes a los servicios reales;
   - mismos nombre, dirección y teléfono que la web;
   - horario;
   - fotos reales del espacio;
   - descripción con los servicios;
   - responder las reseñas.
5. **Directorios:** perfil en Doctoralia (lista "centros de Berazategui") y otros, siempre como "Centro Sinapsis – Berazategui". Después me pasan los enlaces para sumarlos a `sameAs`.

**Información a confirmar (no se publicó nada sin confirmar)**

6. **Orientación vocacional:**
   - qué profesional la realiza;
   - edades;
   - modalidad (individual, grupal u online);
   - cantidad aproximada de encuentros.
7. **ADOS-2 / ADI-R:**
   - qué profesional los administra y su formación o acreditación en el instrumento;
   - edición del manual.
8. **Evaluación neurocognitiva:** qué baterías se usan.
9. **Plazo "primera entrevista en menos de 48 hs" y "turnos esta semana":** confirmar que se cumple. Si no, cambiarlo.
10. **Kinesiología:** modalidad y horarios del gimnasio terapéutico.
11. **Equipo:** profesionales de psicopedagogía y fonoaudiología. Formación de Flavia Avellaneda e Ian Guzmán.
12. **Fotografías reales** del centro (con autorización de las personas que aparezcan). Las fotos reales son la mayor mejora pendiente de confianza.

**Legal**

13. Revisión profesional de `privacidad.html` y `terminos.html`, y evaluar la inscripción de la base de datos ante la AAIP (Ley 25.326).
14. Mantener por escrito el consentimiento de las 3 personas cuyas reseñas se citan con nombre.

**Copyright** (revisado: sin problemas detectados)

- Íconos e ilustraciones: Phosphor Icons, licencia MIT, guardada en `scripts/phosphor/LICENSE`.
- Tipografías: Google Fonts, licencia OFL.
- No hay fotografías de terceros.
- Los textos son propios: no se encontraron coincidencias con webs de la competencia en las búsquedas realizadas.

## 9. Plan de 90 días

| Semana | Acción | Responsable |
|---|---|---|
| 1 | Mergear y desplegar. Redirección 308. Search Console (pedir indexación). GA4 evento clave. | Centro (config) / Claude (deploy) |
| 1–2 | Completar Google Business Profile con fotos reales. Pedir reseñas a pacientes satisfechos (sin incentivos). | Centro |
| 2–3 | Confirmar los datos del punto 8 (6 a 11). Con esas respuestas se actualizan las páginas en un día. | Centro → Claude |
| 3–4 | Doctoralia y 2 o 3 directorios locales. Agregar `sameAs`. | Centro → Claude |
| 5–6 | Fotos reales en home, equipo y talleres (WebP, con `alt` descriptivo). | Centro → Claude |
| 6–8 | 3 guías nuevas según Search Console (candidatas: "cómo tramitar el CUD en Berazategui", "qué es el ADOS-2 y cómo prepararse", "orientación vocacional después de la secundaria"). | Claude, con revisión del equipo |
| 9 | Primera auditoría mensual automática: revisar el issue y priorizar. | Centro + Claude |
| 10–12 | Revisión trimestral: competencia, consultas, prueba de citación en ChatGPT, Gemini, Perplexity y Copilot. Ajustes de contenido. | Claude, con revisión del centro |

## 10. Sistema de mejora continua

```
Cada PR / push a main ──► "Calidad del sitio" (GitHub Actions)
                           validar_seo.py + auditoria_periodica.py --sin-red
                           ✗ si hay errores → no se mergea

Día 2 de cada mes ──────► "Auditoría periódica" (GitHub Actions)
                           sitio publicado + Lighthouse móvil + frescura
                           → issue "Auditoría periódica AAAA-MM"

Ene / abr / jul / oct ──► se suma al issue la checklist trimestral
                           (competencia, Search Console, prueba GEO en IAs)

Mejoras ────────────────► rama aparte (persona o agente de IA autorizado)
                           → PR → "Calidad del sitio" en verde → revisión → merge → Vercel
```

**Principios:**

- La automatización **informa**; no cambia producción.
- Todo cambio pasa por rama, PR y control de calidad.
- No usa servicios pagos: GitHub Actions gratuito y Lighthouse open source.
- La única intervención humana obligatoria es leer el issue mensual y aprobar los PR.
