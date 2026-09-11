# Zona Infantil — SINAPSIS

Juegos y actividades por edad (3–5, 6–8, 9–12), más una sección para
familias con guía evolutiva orientativa y actividades para hacer en
conjunto. Arquitectura data-driven, igual que Juegos y Ejercicios —
un motor interpreta actividades definidas como datos, no un HTML por
juego.

## Decisión de privacidad (importante, leé esto primero)

**La Zona Infantil funciona 100% local y anónima, a propósito.** No
usa Firebase, no hay login, no hay UID, no se guarda nombre real ni
ninguna reflexión escrita por el chico en ningún servidor. Todo el
progreso (estrellas, racha, logros, avatar) vive únicamente en el
`localStorage` de ese dispositivo, en un namespace separado
(`sinapsis_infantil`) de todo lo demás del sitio.

Esto fue deliberado, siguiendo tu propio criterio: los chicos no
deberían tener cuenta propia ni datos identificables guardados por
defecto. El día que se quiera progreso "familiar" entre
dispositivos, la persona **adulta** (con la cuenta de Google que ya
existe en el sitio) podría optar por sincronizar un resumen agregado
— nunca cuál actividad puntual ni contenido escrito por el chico.
Hoy esa sincronización no está activada; `InfantilStorage.guardadoFamiliarActivo()`
existe como gancho para el futuro, pero siempre devuelve `false`.

## Qué se creó

```
/infantil.html              ← portal (puertas por edad + familias)
/infantil-actividad.html    ← reproductor universal de actividades
/css/infantil.css           ← estilos (más juguetón, misma identidad)
/data/infantil-datos.js     ← catálogo: 3 bandas, 12 categorías, 30 actividades
/js/infantil-engine.js      ← motor: 8 tipos de actividad
/js/infantil-storage.js     ← progreso 100% local (sin Firebase)
```

## Los 8 tipos de actividad

Ningún tipo tiene "juego terminado" por fracaso ni cuenta de vidas —
las respuestas incorrectas se acompañan con aliento ("Intentá de
nuevo") en vez de penalizarse. El objetivo es explorar, no fallar.

| tipo | qué es |
|---|---|
| `memoria` | Cartas para encontrar pares |
| `seleccion` | Pregunta con opciones (sin penalidad al errar) |
| `clasificar` | Tocar cada ítem hacia uno de dos grupos |
| `secuencia` | Ordenar tocando en el orden correcto |
| `historia` | Historia ramificada — el chico elige qué pasa |
| `dibujo` | Canvas con mouse/touch y colores |
| `respiracion` | Círculo animado con fases, mismo motor que usan Calma en Ejercicios |
| `escritura` | Texto libre para los más grandes (nunca se sube a ningún lado) |

## Catálogo: 42 actividades en 3 bandas de edad

| Banda | Actividades | Categorías que cubre |
|---|---|---|
| 🐣 3–5 años (Explorar) | 14 | Animales, sonidos, formas y colores, clasificación, emociones, atención, calma |
| 🦊 6–8 años (Descubrir) | 14 | Atención, memoria, sonidos, secuencias, historias, emociones, habilidades sociales, lógica, calma |
| 🚀 9–12 años (Desafiar) | 14 | Lógica, habilidades sociales, creatividad, emociones, calma |

Igual que con Ejercicios: tu documento imaginaba un universo mucho
más grande (100-200 actividades). Elegí construir 42 reales y bien
hechas, con la arquitectura ya lista para escalar — sumar la
actividad 43, 50 o 200 es agregar un objeto a `data/infantil-datos.js`,
nunca tocar el motor ni el HTML.

## "Jugamos juntos" y la guía evolutiva

- **`JUGAMOS_JUNTOS`**: 8 consignas para hacer entre adulto y chico,
  sin pantalla — se muestran como tarjetas simples, no tienen motor
  propio (no hace falta).
- **`GUIA_EVOLUTIVA`**: contenido por banda de edad (cognición,
  lenguaje, emociones, social, atención, autonomía, juego), con el
  encuadre que pediste explícitamente: *"cada niño tiene su propio
  ritmo, esto es una referencia, no una checklist"* — esa frase está
  literalmente en la pantalla, no sólo en este README. Incluye una
  tarjeta de "¿Cuándo conviene consultar?" con lenguaje prudente, sin
  diagnosticar desde la web.

## Gamificación (sin rankings públicos, como pediste)

Estrellas, racha de días y logros — pero nunca una tabla comparando
chicos entre sí. Los mensajes son del estilo *"¡Hoy descubriste algo
nuevo!"*, no *"sos mejor que el 80%"*.

## Testing que se corrió antes de entregar

Todo con `jsdom` (navegador simulado), no a ojo:

1. **Sintaxis**: los ~10 archivos nuevos, limpios. Chequeo final de
   los 132 archivos JS de todo el sitio (juegos + ejercicios +
   infantil): 0 errores.
2. **Motor — recorrido completo de las 42 actividades reales**, de
   punta a punta, interactuando según el tipo de cada una (memoria,
   selección, clasificar, secuencia, dibujo, escritura, respiración
   con temporizador real) hasta la pantalla final — **42/42 sin
   errores**.
3. **Portal**: las 3 puertas + familias, navegación por banda,
   filtro por categoría, cambio de tabs en la guía evolutiva,
   "Jugamos juntos", selector de avatar, vuelta a inicio, botón
   Sorprendeme — todo sin errores.

Lo que no se probó acá (hace falta un navegador de verdad): el
aspecto visual final en pantallas chicas, y que los emojis se vean
bien en distintos sistemas operativos (algunos emojis compuestos,
como 👨‍👩‍👧, se renderizan distinto según el dispositivo).

## Navegación

Se agregaron links cruzados entre las tres secciones (Juegos,
Ejercicios, Zona Infantil) y desde `index.html`, todos apuntando
entre sí para que sea fácil moverse de una a otra.
