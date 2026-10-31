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
  // lead: true → además del evento propio, manda "generate_lead" (evento
  // recomendado de GA4) para poder marcarlo como conversión clave en GA.
  function instrumentar(selector, evento, lead) {
    document.querySelectorAll(selector).forEach((a) => {
      a.addEventListener("click", () => {
        if (!window.gtag) return;
        const ubicacion = ubicacionDe(a);
        gtag("event", evento, { ubicacion });
        if (lead) gtag("event", "generate_lead", { ubicacion, metodo: evento.replace("click_", "") });
      });
    });
  }
  instrumentar('a[href^="https://wa.me/"]', "click_whatsapp", true);
  instrumentar('a[href^="mailto:"]', "click_email", true);
  instrumentar('a[href^="tel:"]', "click_telefono", true);
  instrumentar('a[href*="openstreetmap.org"], a[href*="google.com/maps"], a[href*="goo.gl/maps"]', "click_mapa");
  instrumentar('a[href*="instagram.com"]', "click_instagram");
})();
