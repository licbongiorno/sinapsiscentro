/**
 * ANALYTICS-EVENTOS.JS — Eventos de conversión compartidos
 * ===============================================================
 * No hace nada si Google Analytics no está activo (ver el <script>
 * de gtag en el <head> de cada página). Cubre los mismos clics en
 * todas las páginas que lo cargan: WhatsApp, email, teléfono, mapa/
 * dirección e Instagram. No envía datos de salud ni contenido de
 * los mensajes, sólo qué botón se tocó y en qué sección.
 */
(function () {
  function ubicacionDe(a) {
    return a.closest("section,nav,footer,header")?.id
      || (a.classList.contains("fab") ? "boton-flotante" : "otro");
  }
  function instrumentar(selector, evento) {
    document.querySelectorAll(selector).forEach((a) => {
      a.addEventListener("click", () => {
        if (!window.gtag) return;
        gtag("event", evento, { ubicacion: ubicacionDe(a) });
      });
    });
  }
  instrumentar('a[href^="https://wa.me/"]', "click_whatsapp");
  instrumentar('a[href^="mailto:"]', "click_email");
  instrumentar('a[href^="tel:"]', "click_telefono");
  instrumentar('a[href*="openstreetmap.org"], a[href*="google.com/maps"], a[href*="goo.gl/maps"]', "click_mapa");
  instrumentar('a[href*="instagram.com"]', "click_instagram");
})();
