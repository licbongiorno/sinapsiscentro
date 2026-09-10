# SINAPSIS — Plataforma de juegos

Portal de juegos cognitivos/emocionales para Sinapsis, con motor
compartido, gamificación (XP, niveles, rachas, logros) y arquitectura
lista para Firebase. Funciona **hoy**, sin configurar nada, guardando
todo en el dispositivo — y está preparada para pasar a Firestore el
día que quieras progreso multi-dispositivo y ranking global real.

## Los 120 juegos están completos y jugables

Las 120 ideas originales del documento ya tienen su mecánica
implementada y funcionando — diez juegos por cada una de las 12
categorías. No queda ningún juego en estado "Próximamente": todo el
catálogo (`data/juegos-catalogo.js`) tiene `disponible: true`.

| Categoría | Cantidad |
|---|---|
| 🧠 Memoria | 10 |
| 👁️ Atención | 10 |
| ⚡ Reflejos | 10 |
| 🔤 Palabras | 15 |
| ❤️ Emociones | 15 |
| 🧘 Calma | 10 |
| 🎨 Creatividad | 10 |
| 🧩 Lógica | 10 |
| 🔢 Números | 8 |
| 🌀 Flexibilidad | 7 |
| 🤝 Vínculos | 9 |
| 🧸 Niños | 6 |
| **Total** | **120** |

Para ver la lista completa de nombres por categoría, abrí el portal
(`juegos.html`) y navegá por cada categoría, o revisá directamente
`data/juegos-catalogo.js`.

## Nota honesta sobre el alcance de cada juego

Con 120 mecánicas para construir, muchas comparten una misma
"familia" de juego (memoria de pares, elegir la opción correcta en
una escena, completar una secuencia, escribir una respuesta libre,
etc.) con contenido y consigna propios en cada caso. Eso fue
deliberado: es lo que permitió tener el catálogo completo y jugable
en vez de sólo una fracción muy pulida. Algunos juegos más
elaborados (el mini-sudoku, la torre de Hanoi, el detective lógico)
usan datos fijos en vez de generación totalmente aleatoria infinita
— son perfectamente jugables y rejugables, pero si en algún momento
querés que alguno en particular tenga más variedad de contenido
(más historias, más casos, más preguntas), avisame cuál y lo
ampliamos primero.

## Cómo probarlo ahora mismo

Abrí `juegos.html` en el navegador (o subí toda la carpeta a un
hosting). No necesita build, ni npm, ni servidor — es HTML/CSS/JS
plano. Podés abrirlo directo con doble clic o con un servidor local
simple (`npx serve` / extensión "Live Server" de VS Code) para que
las rutas relativas funcionen sin problemas.

`index.html` es la landing de Sinapsis (la que ya optimizamos) con un
link "🎮 Juegos" agregado al menú.

## Arquitectura

```
/
├── index.html                 ← Landing (con link a Juegos)
├── juegos.html                ← Portal / launcher
├── juego.html                 ← Cargador universal de juegos
│
├── css/
│   ├── juegos.css             ← Estilos del portal
│   └── juego.css              ← Estilos del HUD y de los juegos
│
├── data/
│   └── juegos-catalogo.js     ← Los 120 juegos, todos disponible:true
│
├── js/
│   ├── storage.js             ← Adaptador de datos (hoy: localStorage)
│   ├── firebase-config.js     ← Placeholder de credenciales Firebase
│   ├── perfil.js              ← Perfil, niveles y XP
│   ├── logros.js              ← Catálogo de logros + lógica de desbloqueo
│   ├── game-engine.js         ← Motor común (HUD, puntos, vidas, sonido, guardado)
│   └── juegos/                ← 120 archivos, uno por juego
```

## Cómo funciona el motor (`game-engine.js`)

Cada juego es un archivo chico que sólo se ocupa de su propia
mecánica. Todo lo demás (HUD, cronómetro, vidas, sonido, vibración,
guardado, XP, logros, pantalla final) lo maneja el motor:

```js
GameEngine.iniciar({ juegoId: "mi-juego", vidas: 3, tiempoSegundos: null });
GameEngine.sumarPuntos(10);
GameEngine.restarVida();
GameEngine.terminar({ puntaje: 120, exito: true, mensaje: "¡Muy bien!" });
```

## Cómo agregar o mejorar un juego

1. Para **reemplazar o ampliar** un juego existente: editá directamente
   su archivo en `js/juegos/`, no hace falta tocar nada más.
2. Para **sumar un juego totalmente nuevo** (más allá de los 120
   originales): agregá una entrada en `data/juegos-catalogo.js` con
   `disponible: true` y `archivo: "js/juegos/tu-juego.js"`, y creá ese
   archivo siguiendo el patrón de cualquiera de los existentes
   (llamar `GameEngine.iniciar`, renderizar en `#jgContenedor`, usar
   `sumarPuntos` / `restarVida` / `terminar`).

`juego.html` ya sabe cargar cualquier juego del catálogo solo — lee
`?id=`, busca el archivo y lo inyecta. No hace falta tocar el portal
ni el motor.

## Gamificación

- **XP y niveles**: cada partida da XP según el desempeño; el nivel
  sube con una curva simple (`js/perfil.js`).
- **Rachas**: días consecutivos jugando, calculado en `storage.js`.
- **Logros**: catálogo en `js/logros.js`, evaluado automáticamente
  después de cada partida (primera partida, rachas, explorar
  categorías, superar récords personales, etc.).
- **Ranking**: hoy es local (por dispositivo, guardado en
  localStorage). Un ranking global real entre todos los usuarios
  necesita Firebase (ver más abajo).
- **"¿Cómo estás hoy?"**: el selector de ánimo en el portal recomienda
  una categoría de juegos según cómo se sienta la persona.

## Login con Google y sincronización en la nube

**Ya está integrado.** Cada usuario puede iniciar sesión con su
cuenta de Google desde el ícono de perfil, y su perfil, progreso,
logros y racha se guardan en Firestore además de en este
dispositivo — así no se pierde nada al cambiar de celular o
navegador.

Para dejarlo andando falta un solo paso que no puedo hacer yo por
vos: crear el proyecto en la consola de Firebase y pegar sus
credenciales. La guía completa, con capturas de qué tocar en cada
pantalla, está en **`README-firebase-auth.md`** — empezá por ahí.

Mientras `js/firebase-config.js` tenga los datos de ejemplo, la
plataforma sigue funcionando perfecto en modo invitado (todo se
guarda sólo en el dispositivo, como hasta ahora).

Con Authentication activo también queda habilitada la mecánica
**asincrónica** de "Letras compartidas" (que cada persona sume su
palabra desde su propio celular, en momentos distintos) como
posible mejora futura — hoy esa versión es por turnos en un mismo
dispositivo.

## Accesibilidad y rendimiento

- Estados de foco visibles para navegación por teclado.
- HUD y overlays con `aria-label` en los botones de ícono.
- Sonidos generados con Web Audio (sin archivos de audio que
  descargar) y vibración vía `navigator.vibrate`, ambos con manejo de
  error si el navegador no los soporta.
- Todo el layout es mobile-first.

## Próximos pasos sugeridos

1. Reemplazar el `og:image`, dominio y favicon reales en `index.html`
   cuando estén listos.
2. Jugar el catálogo completo una vez para detectar qué juegos
   conviene ampliar primero con más contenido o variantes.
3. Activar Firebase cuando quieras progreso entre dispositivos y
   ranking global real.
