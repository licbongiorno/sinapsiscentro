# Biblioteca de Ejercicios — SINAPSIS

Sección de ejercicios guiados de bienestar (calma, emociones, pensamientos,
autoconocimiento, escritura, sueño, creatividad, atención, hábitos,
vínculos, valores y activación), integrada con la misma cuenta de Google
que ya usa `/juegos.html` — sin Firebase duplicado, sin login nuevo.

## Qué se reutilizó (nada de esto se tocó)

- **Firebase / Google Auth**: `js/firebase-config.js` y `js/auth.js`, sin
  cambios.
- **`js/storage.js`**: se le agregaron funciones nuevas (favoritos,
  historial y reflexiones de ejercicios), pero todo lo que ya usaban los
  120 juegos sigue exactamente igual.
- **`js/logros.js`**: se sumaron 6 logros nuevos al mismo catálogo, más
  una función `evaluarTrasEjercicio()` paralela a `evaluarTrasPartida()`.
- **`js/perfil.js`**: mismo sistema de XP y niveles — los ejercicios
  también dan XP y suman al mismo nivel que los juegos.
- Paleta de colores, tipografías (Playfair Display + Nunito) y patrón de
  "motor reutilizable" (mismo espíritu que `game-engine.js`).

## Qué se creó

```
/ejercicios.html          ← portal (home de la biblioteca)
/ejercicio.html           ← reproductor universal de cualquier ejercicio
/css/ejercicios.css       ← estilos (tono cálido, no "gamer")
/data/ejercicios.js       ← catálogo: 12 categorías, 42 ejercicios
/js/exercise-engine.js    ← motor: 8 tipos de paso
```

## Los 8 tipos de paso del motor

Cada ejercicio es sólo datos — una lista de "pasos" con un `tipo`. Para
sumar un ejercicio nuevo alcanza con agregar un objeto a
`data/ejercicios.js`, no hace falta tocar el motor ni el HTML.

| tipo | qué hace |
|---|---|
| `mensaje` | Pantalla con texto; avanza con botón o solo (`duracionSeg`) |
| `temporizador` | Cuenta regresiva con pausar/continuar/finalizar |
| `respiracion` | Círculo animado con fases (inhalar/sostener/exhalar) |
| `escala` | Slider 0-10 con una pregunta |
| `seleccion` | Elegir una opción entre varias (sin correcto/incorrecto) |
| `escritura` | Textarea + "Guardar y continuar" o "Continuar sin guardar" |
| `ordenar` | Tocar elementos hasta ordenarlos todos |
| `dibujo` | Canvas con mouse/touch y selector de color |

## Catálogo: 42 ejercicios en 12 categorías

| Categoría | Cantidad |
|---|---|
| 🧘 Calma y regulación | 6 |
| ❤️ Emociones | 6 |
| 💭 Pensamientos | 5 |
| 🪞 Autoconocimiento | 4 |
| ✍️ Escritura y reflexión | 4 |
| 🎨 Creatividad | 3 |
| 🌙 Sueño y descanso | 3 |
| 🧠 Atención y concentración | 3 |
| 🌱 Hábitos y bienestar | 2 |
| 🤝 Vínculos | 2 |
| 🧭 Valores y propósito | 2 |
| ⚡ Activación y energía | 2 |

Superó el mínimo de 30 que pedía el spec original. Si en algún momento
querés sumar los ~3 restantes hasta 45 (o ir mucho más allá, la
arquitectura soporta cientos), avisame — es agregar entradas al array,
nada de arquitectura nueva.

## Privacidad de las reflexiones

Las reflexiones escritas (tipo `escritura`) sólo se guardan si la persona
toca explícitamente "Guardar y continuar" — nunca se guarda cada
tecleo. Viven en el mismo documento `users/{uid}` de Firestore que el
resto del perfil, protegidas por las mismas reglas de seguridad que ya
tenías (`firestore.rules` no necesitó ningún cambio: como todo vive
dentro de `users/{uid}`, la regla existente ya las protege). Nunca se
mandan a Analytics ni se usan en logros ni en ninguna estadística
pública.

## Recomendador

Sin IA: reglas simples en `CatalogoEjercicios.recomendar({ minutos,
necesidadId })` — cruza duración disponible con categorías asociadas a
cada "necesidad" (las 12 opciones de "¿Qué necesitás ahora?"). El
"Ejercicio del día" es determinístico según la fecha (mismo ejercicio
todo el día, cambia a la medianoche), no aleatorio en cada visita.

## Testing que se corrió antes de entregar

Todo con scripts automatizados (no a ojo), simulando un navegador real
con `jsdom`:

1. **Sintaxis**: los ~15 archivos nuevos/modificados, limpios.
2. **Motor — los 8 tipos de paso**: un ejercicio sintético que usa los
   8 tipos, recorrido de punta a punta (clicks, textarea, ordenar,
   dibujo) hasta la pantalla final — sin errores, con las llamadas a
   `Storage`/`Logros` disparándose en el orden esperado.
3. **Portal**: render de listas, categorías (12), búsqueda,
   filtros, favoritos (toggle + sección que aparece/desaparece), modal
   de login — sin errores.
4. **Los 42 ejercicios reales, uno por uno**:
   - Arrancan sin error (smoke test) — **42/42**.
   - Recorrido **completo, de punta a punta**, interactuando con cada
     paso según su tipo, hasta llegar a la pantalla final — **42/42
     sin errores**.

Lo que no se probó (porque hace falta un navegador de verdad, no algo
que yo pueda automatizar acá): el login real con Google desde este
dispositivo específico, y el aspecto visual final en pantallas de
320px a 430px. Te recomiendo esos dos chequeos manuales antes de
darlo por completamente cerrado.

## Cómo probarlo

Mismo método que con los juegos: `juegos.html` y `ejercicios.html`
necesitan servirse por `http://` o `https://` (no `file://`) para que
el login de Google funcione — Live Server de VS Code o `npx serve`
alcanzan para probar local.
