/**
 * SW-REGISTRO.JS — Registra el service worker (sw.js) para que el
 * sitio funcione sin conexión. Presente en todas las páginas.
 */
(function () {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
})();
