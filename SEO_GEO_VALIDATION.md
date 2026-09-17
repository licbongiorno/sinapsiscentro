# Validaciones ejecutadas

Todas corridas localmente sobre el código fuente (servidor estático `python3 -m http.server` + Chromium vía Playwright), no contra el sitio desplegado — no hay acceso a internet saliente desde este entorno para probar `sinapsiscentro.com.ar` en vivo.

## 1. Script de validación técnica (`scripts/validar_seo.py`)

Reutilizable — correrlo de nuevo con `python3 scripts/validar_seo.py` cada vez que se toquen títulos, meta descriptions, canonicals, JSON-LD, el sitemap o enlaces internos.

Verifica:
- `sitemap.xml` es XML válido, sin URLs con `www`, sin parámetros/fragmentos, `lastmod` con formato de fecha real, y que cada URL corresponda a un archivo local existente.
- `robots.txt` no bloquea `/css/` ni `/js/`, referencia el sitemap sin `www`.
- Por cada página indexable (excluye los 5 shells dinámicos en `noindex` y las utilitarias `404.html`/`offline.html`/`buscar.html`): `<title>` presente y no duplicado, meta description presente, única y entre 120-165 caracteres, `canonical` presente, sin `www`, sin parámetros, y coincide con la URL real de la página; exactamente un `<h1>`; `lang="es"`; `og:url` sin `www`.
- Todos los bloques `<script type="application/ld+json">` parsean como JSON válido.
- Todos los `href` locales (sin `http`, `mailto:`, `tel:`, `#`) apuntan a un archivo que existe.

**Resultado de la última corrida (2026-09-17):**
```
sitemap.xml: 16 URLs listadas
robots.txt: OK (sin bloqueos de CSS/JS, referencia sitemap sin www)
22 páginas HTML auditadas (title/description/canonical/H1/JSON-LD)
Enlaces internos verificados (archivos locales referenciados por href)

AVISOS (0):

ERRORES (0):
```
Código de salida: `0`.

## 2. Validación JSON-LD completa (los 32 bloques del sitio)

Script ad-hoc que recorre las 25 páginas HTML y hace `json.loads()` sobre cada bloque `application/ld+json`.

**Resultado:** 32 bloques encontrados, 0 inválidos.

## 3. FAQ visible == FAQ del schema

Script ad-hoc que compara, página por página, el texto de cada pregunta/respuesta visible (`.svc-faq-q`/`.svc-faq-a` en servicios, `.faq-q`/`.faq-a` en la home) contra el texto del `FAQPage` JSON-LD correspondiente.

**Resultado:** coinciden exactamente en las 8 páginas que tienen FAQ (home + 6 servicios + `uso-de-recursos.html`).

## 4. `vercel.json` y `manifest.json`

`json.load()` sobre ambos archivos — ambos parsean sin error. El nuevo redirect `www` → sin `www` usa la sintaxis `has: [{ type: "host", ... }]` documentada por Vercel.

## 5. Barrido funcional con Playwright (Chromium real)

Servidor local + navegador real, sin mockear nada. Se probaron **las 25 páginas HTML del sitio** (no sólo las tocadas en esta tanda): status HTTP 200 y cero errores de consola/página, filtrando ruido conocido del sandbox (`firebase is not defined` cuando no hay red, timeouts de conexión del proxy). Resultado: **las 25 limpias**.

Además, específicamente sobre lo nuevo de esta tanda:
- Las 4 páginas nuevas (`equipo-profesional.html`, `privacidad.html`, `terminos.html`, `uso-de-recursos.html`) cargan con status 200, H1 único y sin errores.
- El acordeón de FAQ de `uso-de-recursos.html` abre al hacer click real (no sólo se inspeccionó el DOM).
- Cada una de las 6 páginas de servicio + la home tienen al menos un `<a href="tel:...">` en pantalla.
- Captura de pantalla visual de `equipo-profesional.html` y `uso-de-recursos.html` en viewport móvil (390×844) para confirmar que no se rompió el diseño.

## 6. Lo que NO se pudo validar desde este entorno

- **Lighthouse / PageSpeed Insights reales**: necesitan acceder a la URL pública en vivo; este sandbox tiene la salida de red bloqueada por política a dominios externos (confirmado con `curl` a `sinapsiscentro.com.ar`: `CONNECT tunnel failed, response 403`). Lo que sí se verificó a nivel de código son las señales que Lighthouse mide (font-display swap, preconnect, defer, sin bloqueos de render, imágenes con ancho/alto) — ver detalle en `SEO_GEO_AUDIT_AFTER.md`.
- **Redirección `www` en producción**: el código (`vercel.json`) ya tiene la regla; falta que `www.sinapsiscentro.com.ar` esté agregado como dominio del mismo proyecto en el panel de Vercel para que la regla aplique (acción externa, ver `SEO_GEO_AUDIT_AFTER.md`).
- **Indexación real en Google/Bing**: sólo se puede confirmar una vez desplegado, desde Google Search Console.
- **Contraste WCAG medido con una herramienta automática**: no hay un linter de accesibilidad instalado en este entorno; se revisó visualmente contra los tokens de color ya definidos en `css/variables.css`, que ya venían de un trabajo de accesibilidad anterior en esta misma sesión.
