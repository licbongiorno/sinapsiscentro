# Audio — procedencia y licencias

Los archivos de esta carpeta son grabaciones reales bajadas de Pixabay
(https://pixabay.com) bajo la **Pixabay Content License**: gratis para
uso comercial, no requiere atribución, se puede editar/recortar. Texto
completo de la licencia: https://pixabay.com/service/license-summary/

Cada archivo fue recortado a un fragmento de 45-75 segundos (con fade
in/out de 1.5s para que el loop no suene cortado), normalizado y
re-exportado a MP3 128kbps para reducir peso. El original completo no
se conserva en el repo.

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
