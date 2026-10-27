---
target: psicologia-berazategui.html (representativa del template de servicio)
total_score: 33
max_score: 36
na_heuristics: 9
p0_count: 1
p1_count: 1
target_identity: "file:/home/user/sinapsiscentro/psicologia-berazategui.html"
target_fingerprint: "sha256:d8a5f44e1cdde91c98301d4d21ddb76f39148e3465b26eec716496b0d1a0599f"
target_path: /home/user/sinapsiscentro/psicologia-berazategui.html
timestamp: 2026-10-27T15-03-12Z
slug: psicologia-berazategui-html
---
Method: dual-agent (A: ad3966127ecd27bf9 · B: a8ffb964e3432c1af)

## Resultado clave: los hallazgos son del template, no de esta página puntual

Se comparó directamente contra `terapia-ocupacional-integracion-sensorial.html` y 4 de 5 reglas del detector dieron **snippets idénticos byte a byte** en ambas páginas (mismo texto exacto: "Cómo es la primera entrevista" → salto de encabezado, "Conexiones que importan" en 10.88px, el mismo glow oscuro). Eso significa que lo que se encuentre acá aplica, con altísima probabilidad, a las 17 páginas de servicio que comparten `css/servicios.css` y el mismo patrón de HTML.

## Puntaje

**33/36 (91.7%)** — banda "Excelente". Bastante mejor que el home (80.5%), consistente con que esta página no tiene el problema de los "5 colores de CTA compitiendo": acá todo usa la misma familia de teal, solo con una variante gradiente (botones de CTA) vs. plana (botón del nav) — una diferencia de estilo deliberada, no una violación real de consistencia.

## Especificidad del diseño

Fuerte: 3 psicólogos reales con matrícula y universidad, FAQ que responde las ansiedades específicas de salud mental en Argentina, mensajes de WhatsApp con contexto. No es relleno genérico.

## Problemas encontrados (afectan al template → a las 17 páginas)

**[P0] El botón de accesibilidad flotante tapa e intercepta toques sobre contenido interactivo a mitad de página — no solo cerca del footer**
*Qué:* confirmado con `elementFromPoint`: al abrir el FAQ, el botón de accesibilidad queda literalmente arriba de una de las preguntas (la 4ta), siendo el elemento más alto en ese punto — un toque ahí activa el modo accesible en vez de abrir la pregunta. También tapa transitoriamente el botón de CTA final durante el scroll.
*Por qué importa:* es la misma familia de bug que ya arreglamos en el home (ahí solo para el footer) — pero acá un botón pensado para *ayudar* a usuarios con necesidades de accesibilidad termina bloqueando lo que ellos mismos quieren tocar, incluido el botón de conversión de la página.
*Nota:* este componente es compartido por **todo el sitio** (`js/accesibilidad.js` + `css/accesibilidad.css`), no solo las páginas de servicio — así que el fix, sea cual sea, aplicaría también al home.

**[P1] Salto de nivel de encabezado en "Cómo es la primera entrevista"**
*Qué:* la secuencia es `h2 → h4 → h4 → h4 → h3 → h2` (los 3 pasos son `<h4>` sin que exista un `<h3>` antes, y "Trabajamos con y sin CUD" es `<h3>` suelto después). Confirmado idéntico en psicología y terapia ocupacional — es el bloque de "los 3 pasos" copiado en cada página de servicio.
*Por qué importa:* rompe la navegación por encabezados que usan los lectores de pantalla (la estrategia principal de navegación no lineal para esos usuarios).
*Fix:* los 3 pasos pasan de `<h4>` a `<h3>`; "Trabajamos con y sin CUD" deja de ser un heading (es un banner, no una sección nueva) o se ajusta para no quedar fuera de secuencia.

**[P2] El CTA final y el footer quedan fuera del landmark `<main>`**
*Qué:* `<section class="svc-cta-final">` y `<footer>` son hermanos de `<main>`, no están adentro.
*Por qué importa:* el elemento más importante de la página (el botón de conversión final) queda estructuralmente excluido del contenido principal — afecta a quien navega por landmarks con lector de pantalla.
*Fix:* mover `.svc-cta-final` adentro de `<main>`.

**[P3] Sin fotos de los psicólogos (solo iniciales)**
*Qué:* ya documentado como pendiente en `equipo-profesional.html` — pero acá pesa más que en otras páginas, porque "a quién le confío esto" es un factor de decisión más grande en salud mental que en, por ejemplo, logística de turnos.
*Fix:* si hay que priorizar, las fotos de psicología antes que las de otras 16 páginas.

**[P3] Detalles menores de accesibilidad técnica**
- La flecha decorativa (`<span class="arrow">→</span>`) no tiene `aria-hidden="true"` — un lector de pantalla la lee en voz alta ("flecha hacia la derecha").
- El mensaje de WhatsApp de "Psicología" tiene el acento sin codificar en la URL (`í` literal en vez de `%C3%AD`) — funciona en los navegadores modernos pero no es robusto.
- El texto de copyright del footer da ~4.51:1 de contraste — pasa el mínimo AA (4.5:1) por muy poco margen.

## Lo que ya está bien (no tocar)

- No hay el problema de "5 colores compitiendo" que sí tenía el home — un solo sistema de color en toda la página.
- El viaje emocional está bien armado: normaliza antes de pedir nada ("sin apuro y sin etiquetas apresuradas"), tranquiliza justo antes de la parte logística (CUD/cobertura), y el FAQ responde las dos ansiedades más grandes antes del cierre.
- Cero problemas de `alt` faltante (todo es SVG inline con `aria-hidden` correcto).
- Estados de foco muy bien implementados (outline teal visible en todo lo interactivo).

## Preguntas para decidir el alcance

Como esto son 5 problemas (≥3), y 4 de ellos son del template compartido (osea, aplicarían a las 17 páginas de servicio de una sola vez si se corrigen bien), conviene decidir el alcance antes de tocar código.
