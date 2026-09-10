# SINAPSIS — Plataforma de juegos

Portal de juegos cognitivos/emocionales para Sinapsis, con motor
compartido, gamificación (XP, niveles, rachas, logros) y arquitectura
lista para Firebase. Funciona **hoy**, sin configurar nada, guardando
todo en el dispositivo — y está preparada para pasar a Firestore el
día que quieras progreso multi-dispositivo y ranking global real.

## Cómo probarlo ahora mismo

Abrí `juegos.html` en el navegador (o subí toda la carpeta a un
hosting). No necesita build, ni npm, ni servidor — es HTML/CSS/JS
plano. Podés abrirlo directo con doble clic o con un servidor local
simple (`npx serve` / extensión "Live Server" de VS Code) para que
las rutas relativas funcionen sin problemas.

`index.html` es la landing de Sinapsis (la que ya optimizamos) con un
link nuevo "🎮 Juegos" agregado al menú.

## Qué está jugable HOY (24 juegos, dos por categoría)

| Categoría | Juegos |
|---|---|
| 🧠 Memoria | Memoria clásica · ¿Qué desapareció? |
| 👁️ Atención | Encontrá el diferente · Cazador de letras |
| ⚡ Reflejos | Toca cuando aparezca · Caza-burbujas |
| 🔤 Palabras | Letras compartidas · Anagrama |
| ❤️ Emociones | Semáforo emocional · ¿Qué siento? |
| 🧘 Calma | Respira · Un minuto |
| 🎨 Creatividad | Tres palabras · Objeto imposible |
| 🧩 Lógica | Secuencias · ¿Qué sigue? |
| 🔢 Números | Cálculo mental · Mayor o menor |
| 🌀 Flexibilidad | Stroop visual · Ahora al revés |
| 🤝 Vínculos | ¿Qué responderías? · Empatía |
| 🧸 Niños | Memoria de animales · Colores |

## Por qué 24 y no 120

El documento original tenía 120 ideas de juegos — están **todas**
cargadas en `data/juegos-catalogo.js`, con su categoría, dificultad,
edad recomendada, etc. Los 96 restantes aparecen en el portal como
**"Próximamente"**, agrupados en sus categorías, para que se vea el
mapa completo del proyecto.

Construir 120 mecánicas de juego únicas y pulidas no entra en una
sola entrega — son, literalmente, 120 productos chicos. Lo que sí
armamos completo es la parte que hace que agregar el juego 13, 14…
120 sea rápido: el motor común, el catálogo, la gamificación, el
portal y un juego de referencia por cada categoría para copiar el
patrón. Ver "Cómo agregar un juego nuevo" más abajo — con esta base,
cada juego nuevo es mayormente lógica propia, no infraestructura.

Si seguimos, la próxima tanda natural sería otros 10-15 juegos más
repartidos entre categorías (ver `Próximos pasos sugeridos` al final).

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
│   └── juegos-catalogo.js     ← Los 120 juegos (12 disponibles, 108 "próximamente")
│
├── js/
│   ├── storage.js             ← Adaptador de datos (hoy: localStorage)
│   ├── firebase-config.js     ← Placeholder de credenciales Firebase
│   ├── perfil.js              ← Perfil, niveles y XP
│   ├── logros.js              ← Catálogo de logros + lógica de desbloqueo
│   ├── game-engine.js         ← Motor común (HUD, puntos, vidas, sonido, guardado)
│   └── juegos/
│       ├── memoria-clasica.js
│       ├── encuentra-diferente.js
│       ├── reflejos.js
│       ├── letras-compartidas.js
│       ├── semaforo-emocional.js
│       ├── respira.js
│       ├── tres-palabras.js
│       ├── secuencias.js
│       ├── calculo-mental.js
│       ├── stroop.js
│       ├── que-responderias.js
│       └── memoria-animales.js
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

## Cómo agregar un juego nuevo (13, 14, ... 120)

1. **Sumalo al catálogo** en `data/juegos-catalogo.js`: copiá una
   entrada existente, cambiá `disponible` a `true` y agregá
   `archivo: "js/juegos/tu-juego.js"`.
2. **Creá `js/juegos/tu-juego.js`**, usando cualquiera de los 12
   juegos existentes como plantilla — todos siguen el mismo patrón:
   llamar `GameEngine.iniciar(...)`, renderizar el tablero dentro de
   `#jgContenedor`, y llamar `GameEngine.sumarPuntos`/`restarVida`/
   `terminar` según la mecánica.
3. Listo. `juego.html` ya sabe cargarlo solo (lee `?id=tu-juego`,
   busca el archivo en el catálogo y lo inyecta).

No hace falta tocar el portal, el motor, ni ningún otro juego.

## Gamificación

- **XP y niveles**: cada partida da XP según el desempeño; el nivel
  sube con una curva simple (`js/perfil.js`).
- **Rachas**: días consecutivos jugando, calculado en `storage.js`.
- **Logros**: catálogo en `js/logros.js`, evaluado automáticamente
  después de cada partida (primera partida, rachas, explorar
  categorías, superar récords personales, etc.). Es fácil sumar más
  logros agregando una entrada al array `LOGROS_CATALOGO`.
- **Ranking**: hoy es local (por dispositivo, guardado en
  localStorage). Un ranking global real entre todos los usuarios
  necesita Firebase (ver más abajo).
- **"¿Cómo estás hoy?"**: el selector de ánimo en el portal recomienda
  una categoría de juegos según cómo se sienta la persona, en vez de
  mostrar sólo una lista para elegir.

## Cómo activar Firebase (progreso multi-dispositivo + ranking global)

1. Creá un proyecto en Firebase, activá **Firestore** y
   **Authentication** (alcanza con el modo anónimo para arrancar).
2. Completá `js/firebase-config.js` con las credenciales reales.
3. En `js/storage.js`: poné `USAR_FIREBASE = true` y descomentá el
   bloque `FIREBASE` al final del archivo, reemplazando cada función
   del objeto `Storage` por su equivalente en Firestore, manteniendo
   la forma de los datos que ya devuelven hoy (así no hay que tocar
   `game-engine.js` ni ningún juego individual).

Estructura sugerida en Firestore (ya estaba en el documento original):

```
users/{uid}/
   profile
   progress/{juegoId}
   achievements
scores/{juegoId}/entries   ← para ranking global
```

Con Authentication activo también se habilita la mecánica
**asincrónica** de "Letras compartidas" (que cada persona sume su
palabra desde su propio celular, en momentos distintos) — hoy esa
versión es por turnos en un mismo dispositivo; con Firestore en
tiempo real es un salto natural, sin rediseñar nada más.

## Accesibilidad y rendimiento

- Estados de foco visibles para navegación por teclado.
- HUD y overlays con `aria-label` en los botones de ícono.
- Sonidos generados con Web Audio (sin archivos de audio que
  descargar) y vibración vía `navigator.vibrate`, ambos con manejo de
  error si el navegador no los soporta.
- Todo el layout es mobile-first, como pedía el diseño original.

## Próximos pasos sugeridos

1. Reemplazar el `og:image`, dominio y favicon reales cuando estén
   listos (mismos placeholders que en `index.html`).
2. Elegir 10-15 juegos más del catálogo "Próximamente" para la
   siguiente tanda — recomiendo repartir entre categorías en vez de
   completar una sola, para que el portal se sienta parejo.
3. Activar Firebase cuando quieras progreso entre dispositivos y
   ranking global real.
