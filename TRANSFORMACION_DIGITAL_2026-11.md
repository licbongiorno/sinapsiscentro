# Transformación digital — Centro Sinapsis (noviembre 2026)

Rama: `claude/great-ride-cxp0wn`. Cada etapa es un commit separado, así que cualquier cambio se puede revertir por separado con `git revert <commit>`.

Complementa a `AUDITORIA_INTEGRAL_2026-11.md` (SEO, GEO, rendimiento y accesibilidad de comienzos de noviembre) y a `DATOS_PENDIENTES_CENTRO_SINAPSIS.md` (las preguntas que tiene que responder el centro).

---

## 1. Skills: investigación y selección

Usé `find-skills` para buscar en el ecosistema público (skills.sh) skills de SEO, GEO, CRO, copy, accesibilidad, rendimiento, Firebase y diseño. Antes de instalar, **leí el SKILL.md de cada una**. Todas son instrucciones en Markdown, sin dependencias ni scripts que se ejecuten al instalarlas.

| Skill | Fuente (instalaciones) | Área | Decisión | Motivo |
|---|---|---|---|---|
| `ai-seo` | coreyhaines31/marketingskills (165K) | GEO / AEO | **Instalada** | Optimización para citas en ChatGPT, Perplexity y AI Overviews, y uso de `llms.txt`. |
| `schema` | coreyhaines31/marketingskills (56K) | Datos estructurados | **Instalada** | Qué tipo de schema corresponde y qué no está permitido (útil para no usar marcado engañoso). |
| `seo-audit` | coreyhaines31/marketingskills (254K) | SEO técnico, on-page y local | **Instalada** | Auditoría de indexación, canonicals, titles y SEO local. |
| `cro` | coreyhaines31/marketingskills | Conversión | **Instalada** | Marco de diagnóstico (propuesta de valor, CTA, confianza, objeciones, fricción). Guió la portada y el selector. |
| `copywriting` | coreyhaines31/marketingskills (255K) | Copy | **Instalada** | Exige afirmaciones con respaldo; coincide con la regla de no prometer resultados. |
| `accessibility` | addyosmani/web-quality-skills (70K) | WCAG 2.2 | **Instalada** | Auditoría WCAG 2.2 AA. |
| `core-web-vitals` | addyosmani/web-quality-skills | LCP / INP / CLS | **Instalada** | Rendimiento basado en datos de campo y de laboratorio. |
| `web-perf` | cloudflare/skills (127K) | Rendimiento | Descartada | Se superpone con `core-web-vitals`. |
| `seo-local` y similares | agricidaniel, jezweb, kostja94 (2–8K) | SEO local | Descartadas | Pocas instalaciones; el SEO local ya está cubierto por `seo-audit` y por el trabajo previo. |
| `firebase-auth-basics` | firebase/agent-skills (184K) | Firebase | Para más adelante | Solo hace falta si se cambia la autenticación o Firestore. Hoy no se toca. |
| Framer Motion, GSAP, React, Next.js, Tailwind | varias | Front-end | **No aplican** | El sitio es HTML estático sin framework, con 71 páginas generadas por scripts en Python. Migrar a React o Next.js sería reescribir todo sin beneficio para el usuario, y sumar GSAP agregaría peso. Las animaciones se hacen con CSS y las skills que ya estaban instaladas (`animate`, `emil-design-eng`, `improve-animations`, `impeccable`). |

Las skills de diseño y movimiento ya instaladas (`impeccable`, `animate`, `apple-design`, `emil-design-eng`, `design:*`) cubren UX/UI, diseño editorial, microinteracciones y accesibilidad del movimiento. No hizo falta sumar otras.

## 2. Auditoría: lo que se encontró

**Funciona bien y se conservó intacto:**

- 63 URLs indexables con JSON-LD válido (`MedicalBusiness` con especialidades reales, FAQ, `Person` en el equipo).
- `llms.txt` y validador SEO propio (0 errores).
- 249 juegos disponibles, ejercicios, mindfulness, creatividad, rincón infantil y sonidos, todos con motores reutilizables.
- Cuenta opcional con Google.
- Uso sin conexión (PWA).
- Formulario de consulta que arma el mensaje de WhatsApp sin guardar datos.
- Aviso de "no reemplaza un tratamiento" en los recursos.

**Problemas encontrados (y verificados):**

| # | Problema | Gravedad | Estado |
|---|---|---|---|
| 1 | No había pruebas automáticas de las páginas interactivas: un juego roto llegaba a producción sin aviso | Alta | ✅ Resuelto |
| 2 | Escritorio (1280×800): el título ocupaba toda la pantalla y el botón de turno quedaba debajo; no había ninguna imagen ni señal de confianza | Alta (conversión) | ✅ Resuelto |
| 3 | Menú entre 769 y 1100 px: "Pedir turno" se partía o quedaba fuera de pantalla (tablet) | Alta (conversión) | ✅ Resuelto |
| 4 | La política de privacidad decía que el progreso "no se envía a nuestros servidores", pero con sesión se sincroniza con Firestore (reflexiones escritas incluidas) | Alta (legal) | ✅ Resuelto |
| 5 | No había forma de borrar los datos propios sin escribir al centro | Media (Ley 25.326) | ✅ Resuelto |
| 6 | Los juegos arrancaban apenas cargaba la página, sin contexto, sin récord propio, sin aviso de que no son evaluaciones y sin forma de volver | Media | ✅ Resuelto |
| 7 | Algunos textos "¿Qué entrena?" exageraban la evidencia ("la memoria de trabajo se puede entrenar") | Media (ética) | ✅ Resuelto |
| 8 | Las guías no se podían filtrar por etapa de vida | Media | ✅ Resuelto |
| 9 | No se medía el uso de juegos ni el área de interés de quien consulta | Media | ✅ Resuelto |
| 10 | Contraste 4,37:1 en el aviso "Deslizá" de reseñas | Baja | ✅ Resuelto |
| 11 | `www` responde con redirección 307 (temporal) | Media | ⚠️ Manual en Vercel |
| 12 | Afirmaciones sin confirmar: "48 hs" (45 veces), marcas TODO en ADOS-2 y neurocognitiva | Media | ⚠️ Requiere datos del centro |
| 13 | 63 avisos de `lastmod` del sitemap por un cambio cosmético (el logo) que tocó todas las páginas | Baja | Decisión: no actualizar fechas por cambios que no son de contenido |
| 14 | La home pesa 186 KB de HTML (63 KB de CSS y 48 KB de SVG dentro de la página) | Media | Pendiente (ver §6) |

## 3. Qué se implementó

### 3.1 Red de seguridad (`tests/smoke.js` + CI)

- Abre las **71 páginas y los 249 juegos** en Chromium a 390 px, leyendo los archivos desde disco (sin servidor).
- Falla ante:
  - errores de JavaScript;
  - desborde horizontal;
  - enlaces de WhatsApp con otro número;
  - juegos que no dibujan nada o que no tienen su archivo.
- Corre en cada PR (`.github/workflows/calidad.yml`, job `humo`).
- Uso local: `node tests/smoke.js` (completo, unos 2 minutos) o `node tests/smoke.js --rapido`.

### 3.2 Portada y conversión

- **Escritorio:**
  - dos columnas con la **fachada real** del centro;
  - título en 3 líneas;
  - botón de turno dentro de la primera pantalla;
  - tarjeta con "Sinapsis · *donde vos sos el centro*", dirección y horarios.
- **Señales de confianza** (datos ya confirmados): con y sin CUD, sin derivación previa, todas las áreas en un mismo lugar.
- **Celular:** la composición no cambia. La foto no se descarga (`<picture>` con un GIF de 1 px), así no afecta el LCP.
- **Menú:** hamburguesa hasta 960 px y versión compacta hasta 1180 px.
- **Selector de especialidad** en los tres "Pedir turno" de la home (menú, portada y botón flotante):
  - un panel corto con 10 áreas, incluida "No sé qué área necesito";
  - el mensaje de WhatsApp sale con la especialidad;
  - "Escribir sin elegir" mantiene el camino directo;
  - accesible: diálogo modal, foco atrapado, Escape, devolución del foco y movimiento reducido;
  - sin JS, el enlace funciona como antes.
- En las páginas de servicio el botón sigue siendo directo, porque ya llega con el contexto del servicio.

### 3.3 Juegos (los 249, a través del reproductor común)

- **Ficha previa** antes de empezar:
  - categoría, edad sugerida, duración y nivel;
  - partidas jugadas y mejor puntaje propio;
  - "Volver a los juegos";
  - aviso: "recreativo y educativo, no evalúa ni diagnostica".
- El cronómetro arranca recién al tocar "Empezar".
- "Jugar de nuevo" saltea la ficha.
- Textos de beneficio más rigurosos: la mejora con la práctica suele ser específica de la tarea practicada.

### 3.4 Recursos

- El índice de guías tiene un filtro **"¿Para quién?"**: bebés, niñas y niños, adolescentes, adultos, adultos mayores, trámites y familias.
- Suma una franja **"Para practicar en casa"** con las 6 herramientas interactivas.
- Se generó con `scripts/generar_articulos.py`. Antes de cambiarlo verifiqué que el generador reprodujera exactamente el `guias.html` publicado.

### 3.5 Privacidad

- **"Borrar todos mis datos"** en el panel de perfil: borra lo guardado en el dispositivo y, con sesión, el documento `users/{uid}` de Firestore.
- La política de privacidad ahora describe lo que el sitio realmente guarda y cómo borrarlo.

## 4. Verificación (todo corrido en esta sesión)

| Prueba | Resultado |
|---|---|
| `node tests/smoke.js`: 71 páginas + 249 juegos a 390 px | ✅ Sin errores |
| `python3 scripts/validar_seo.py` | ✅ 0 errores (avisos: solo `lastmod`, ver §2 #13) |
| axe-core WCAG 2.0/2.1/2.2 A y AA: home (con el selector abierto), guías, privacidad, juego y portal de juegos, a 390 y 1280 px | ✅ 0 fallas (el contraste del pie fue un falso positivo de `content-visibility`, confirmado al desplazarse hasta el pie) |
| Selector: abre, foco en la primera opción, Escape cierra y devuelve el foco, el mensaje sale con la especialidad, Analytics recibe solo el área y el clic que abre el panel no cuenta como contacto | ✅ |
| Ficha de juego: no arranca hasta "Empezar", "Jugar de nuevo" la saltea, vuelve a aparecer en una visita nueva | ✅ |
| Borrar datos: elimina progreso, reflexiones y actividades infantiles; conserva solo la preferencia de modo accesible | ✅ (sin sesión de Google; el borrado en Firestore no se pudo probar sin una cuenta real) |
| Filtro de guías: 28 → 4 en "Adultos mayores", anuncia la cantidad y persiste en la sesión | ✅ |
| Sin desborde horizontal a 390, 820, 1024 y 1280 px en home, guías y servicios | ✅ |

**No probado acá:**

- Lighthouse en producción: lo mide la auditoría mensual automática.
- El borrado en Firestore con una cuenta real.
- Envíos reales de WhatsApp desde un celular.

## 5. Medición (GA4) y tablero

**Eventos que envía el sitio.** Ninguno incluye datos de salud, motivos de consulta, respuestas, reflexiones ni puntajes.

| Evento | Cuándo | Parámetros |
|---|---|---|
| `generate_lead` | Clic en WhatsApp, email o teléfono; envío del formulario de consulta | `ubicacion`, `metodo`, `especialidad` (solo si se eligió en el selector) |
| `click_whatsapp`, `click_email`, `click_telefono` | Cada contacto | `ubicacion`, `especialidad` |
| `click_mapa`, `click_instagram`, `click_resenas_google` | Interés en la ubicación o en la prueba social | `ubicacion` |
| `juego_iniciado` | "Empezar" en un juego | `juego_id`, `categoria` |
| `juego_completado` | Fin de una partida | `juego_id`, `exito` |
| `filtro_guias` | Uso del filtro de guías | `etapa` |

**Configuración en GA4 (manual, unos 20 minutos):**

1. Admin → Eventos → marcar `generate_lead` como **evento clave**.
2. Admin → Definiciones personalizadas → crear dimensiones de evento:
   - `ubicacion`, `metodo`, `especialidad`, `juego_id`, `categoria`, `etapa`.
3. Vincular **Search Console** con GA4 (Admin → Vinculaciones).

**Tablero sugerido** (Looker Studio, gratuito, con GA4 y Search Console como fuentes):

| Indicador | Cómo se calcula |
|---|---|
| Consultas generadas | `generate_lead` por semana |
| Tasa de conversión | `generate_lead` / sesiones |
| Especialidades más consultadas | `generate_lead` por `especialidad` (selector) y por página de servicio (`page_path`) |
| Canales | `generate_lead` por grupo de canales (orgánico, directo, social, referido) |
| Botón que convierte | `generate_lead` por `ubicacion` (hero, nav, botón flotante, formulario, servicio) |
| Uso de recursos | `juego_iniciado`, `juego_completado` y tasa de finalización por categoría; vistas de ejercicios y guías |
| Orgánico | Clics, impresiones, CTR y posición de Search Console por página y por consulta |

> Un clic en WhatsApp **no es un turno**: es intención de contacto. Para saber cuántas consultas terminan en turno, el centro puede anotar en una planilla cuántos mensajes nuevos llegan por semana y compararlo con `generate_lead`.

Google Tag Manager **no aporta valor hoy**: no hay píxeles publicitarios y GA4 directo es más liviano. Conviene sumarlo solo si se hacen campañas pagas.

## 6. Próximos pasos priorizados

**Dependen del centro** (sin estos datos no se publica nada, para no inventar):

1. Confirmar o corregir "primera entrevista en menos de 48 hs" (45 apariciones).
2. Profesionales y formación en ADOS-2/ADI-R, evaluación neurocognitiva, fonoaudiología y orientación vocacional (`DATOS_PENDIENTES` A–D).
3. Vercel → Domains: `www` con redirección **308**.
4. GA4: los pasos de §5.
5. Google Business Profile y directorios, para sumarlos a `sameAs`.

**Técnicos, en orden de impacto:**

1. **Rendimiento de la home:** pasar 63 KB de CSS a un archivo cacheable y los SVG repetidos a un sprite. Comparar Lighthouse antes y después, y revertir si no mejora.
2. **Página por localidad** (Quilmes, Florencio Varela, Hudson), solo si Search Console muestra impresiones desde esas zonas, para no crear contenido delgado.
3. **Ajuste de dificultad por juego:** hoy cada juego define la suya. Un ajuste automático debe hacerse juego por juego y con el criterio del equipo.
4. **Recursos descargables** (fichas imprimibles para familias), con revisión profesional y bibliografía.
5. **CSP** en modo solo reporte durante dos semanas y después en modo bloqueo.
6. Límites de tamaño en `firestore.rules`, probados con el emulador de Firebase.
