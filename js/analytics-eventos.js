/**
 * ANALYTICS-EVENTOS.JS — Eventos de conversión compartidos
 * ===============================================================
 * No hace nada si Google Analytics no está activo (ver el <script>
 * de gtag en el <head> de cada página). Cubre los mismos clics en
 * todas las páginas que lo cargan: WhatsApp, email, teléfono, mapa/
 * dirección e Instagram. No envía datos de salud ni contenido de
 * los mensajes, sólo qué botón se tocó, en qué sección y —si la
 * persona lo eligió en el selector— el área de servicio.
 *
 * Usa delegación (un solo listener en document) para medir también
 * los enlaces que se crean después de cargar la página (botón
 * flotante, selector de especialidad).
 */
(function () {
  function ubicacionDe(a) {
    return a.getAttribute("data-ubicacion")
      || a.closest("section,nav,footer,header")?.id
      || (a.classList.contains("fab") ? "boton-flotante" : "otro");
  }
  // lead: true → además del evento propio, manda "generate_lead" (evento
  // recomendado de GA4) para poder marcarlo como conversión clave en GA.
  const REGLAS = [
    ['a[href^="https://wa.me/"]', "click_whatsapp", true],
    ['a[href^="mailto:"]', "click_email", true],
    ['a[href^="tel:"]', "click_telefono", true],
    ['a[href*="openstreetmap.org"], a[href*="google.com/maps"], a[href*="goo.gl/maps"]', "click_mapa", false],
    ['a[href*="instagram.com"]', "click_instagram", false],
  ];
  document.addEventListener("click", (e) => {
    // Un botón que solo abre el selector de especialidad todavía no es un contacto.
    if (e.defaultPrevented || !window.gtag) return;
    const a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    const regla = REGLAS.find(([sel]) => a.matches(sel));
    if (!regla) return;
    const [, evento, lead] = regla;
    const params = { ubicacion: ubicacionDe(a) };
    const area = a.getAttribute("data-especialidad");
    if (area) params.especialidad = area;
    gtag("event", evento, params);
    if (lead) gtag("event", "generate_lead", { ...params, metodo: evento.replace("click_", "") });
  });
})();
