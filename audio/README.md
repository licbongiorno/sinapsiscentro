# Audio — procedencia y licencias

Los archivos de esta carpeta son grabaciones reales bajadas de Pixabay
(https://pixabay.com) bajo la **Pixabay Content License**: gratis para
uso comercial, no requiere atribución, se puede editar/recortar. Texto
completo de la licencia: https://pixabay.com/service/license-summary/

Cada archivo fue recortado a un fragmento de 45-75 segundos y
re-exportado a MP3 128kbps para reducir peso. El original completo no
se conserva en el repo.

**Procesamiento (2026-09-17, con ffmpeg):** los 4 archivos sonaban con
volúmenes bastante distintos entre sí, y además tenían un salto audible
al hacer loop — empezaban casi en silencio y terminaban fuertes, así
que al repetirse se escuchaba un "click"/salto de golpe. Se
normalizó el volumen de las 4 pistas a un mismo nivel objetivo
(-20 LUFS integrado, two-pass `loudnorm`) y se les agregó un fade
in/out de 2.5s en las puntas, así el punto de loop queda silencio→silencio
en vez de fuerte→silencio. Las versiones anteriores sin este
procesamiento quedan en el historial de git por si hace falta comparar
o volver atrás.

| Archivo | Fuente original | Autor/uploader en Pixabay |
|---|---|---|
| `ambiente-bosque.mp3` | Forest Ambience — Morning/Spring (localization: Poland 4) | AudioPapkin |
| `ambiente-noche.mp3` | Night Crickets Ambiance | freesound_community |
| `ambiente-pajaros.mp3` | Birds | SoundReality |
| `ambiente-naturaleza.mp3` | Calm Nature Ambience | ZenHendrew |

Conectados en `data/sonidos-datos.js` (`audioUrl`) y reproducidos por
`AudioEngine.iniciarArchivo()` en `js/audio-engine.js`.

**Pendiente:** `amb-cafeteria` (Cafetería) todavía no tiene archivo —
sigue con `audioUrl: null` y aparece como "Próximamente" en la UI.
