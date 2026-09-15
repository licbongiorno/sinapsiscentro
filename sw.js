/**
 * SW.JS — Service worker: modo offline para SINAPSIS.
 * ======================================================
 * Estrategia:
 *  - Navegación (HTML): red primero, con la respuesta guardada en caché
 *    para la próxima vez; si no hay red, se sirve la versión en caché
 *    de esa página o, si nunca se visitó, offline.html.
 *  - Estáticos del mismo origen (css/js/json/svg/png/…): stale-while-
 *    revalidate — se responde al toque desde caché si existe, mientras
 *    se actualiza en segundo plano.
 *  - /audio/* y cualquier pedido cruzado de origen (Firebase, fuentes)
 *    NO se intercepta: sigue yendo directo a la red como siempre.
 *
 * Subir CACHE_VERSION cuando cambie el contenido "shell" del sitio,
 * para que los navegadores descarten la caché vieja.
 */

const CACHE_VERSION = "sinapsis-v1";

const APP_SHELL = [
  "/", "/index.html", "/offline.html", "/manifest.json",
  "/favicon.svg", "/icon-192.png", "/icon-512.png",
  "/juegos.html", "/ejercicios.html", "/mindfulness.html", "/creatividad.html", "/infantil.html", "/sonidos.html", "/buscar.html",
  "/css/variables.css", "/css/accesibilidad.css", "/css/compartir.css", "/css/lector.css",
  "/css/ejercicios.css", "/css/infantil.css", "/css/juego.css", "/css/juegos.css", "/css/resource-nav.css", "/css/sonidos.css",
  "/js/accesibilidad.js", "/js/audio-engine.js", "/js/auth.js", "/js/beep.js", "/js/compartir.js",
  "/js/creatividad-motor.js", "/js/exercise-engine.js", "/js/exportar.js", "/js/firebase-config.js",
  "/js/game-engine.js", "/js/infantil-engine.js", "/js/infantil-storage.js", "/js/lector.js", "/js/lienzo.js",
  "/js/logros.js", "/js/perfil.js", "/js/perfil-modal.js", "/js/resource-nav.js", "/js/storage.js", "/js/buscador.js",
  "/data/creatividad-actividades.js", "/data/creatividad-elementos.js", "/data/ejercicios.js",
  "/data/infantil-datos.js", "/data/juegos-catalogo.js", "/data/mindfulness-datos.js", "/data/sonidos-datos.js",
];

const STATIC_EXT = /\.(css|js|json|svg|png|jpg|jpeg|webp|ico|woff2?)$/;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      .catch(() => {}) // si algún archivo del shell falla, no rompe la instalación
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/audio/")) return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copia));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match("/offline.html")))
    );
    return;
  }

  if (STATIC_EXT.test(url.pathname)) {
    event.respondWith(
      caches.open(CACHE_VERSION).then(async (cache) => {
        const cached = await cache.match(req);
        const enRed = fetch(req)
          .then((res) => { if (res.ok) cache.put(req, res.clone()); return res; })
          .catch(() => cached);
        return cached || enRed;
      })
    );
  }
});
