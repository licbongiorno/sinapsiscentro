/**
 * GUIAS-FILTRO.JS — Filtro "¿Para quién?" del índice de guías
 * Mejora progresiva: sin JS, la barra queda oculta y se ven todas las guías.
 * Recuerda la última etapa elegida en la sesión (sessionStorage).
 */
(function () {
  var barra = document.querySelector(".gu-filtro");
  if (!barra) return;
  var botones = barra.querySelectorAll("[data-filtro]");
  var tarjetas = document.querySelectorAll(".gu-card[data-etapa]");
  var estado = document.querySelector(".gu-filtro-estado");

  function aplicar(etapa, anunciar) {
    var visibles = 0;
    tarjetas.forEach(function (t) {
      var ok = etapa === "todas" || (" " + t.getAttribute("data-etapa") + " ").indexOf(" " + etapa + " ") > -1;
      t.hidden = !ok;
      if (ok) visibles++;
    });
    botones.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filtro") === etapa)); });
    if (anunciar && estado) estado.textContent = visibles + (visibles === 1 ? " guía" : " guías");
    try { sessionStorage.setItem("gu-etapa", etapa); } catch (e) {}
  }

  botones.forEach(function (b) {
    b.addEventListener("click", function () {
      var etapa = b.getAttribute("data-filtro");
      aplicar(etapa, true);
      if (window.gtag) window.gtag("event", "filtro_guias", { etapa: etapa });
    });
  });
  barra.hidden = false;
  var previa = null;
  try { previa = sessionStorage.getItem("gu-etapa"); } catch (e) {}
  if (previa && barra.querySelector('[data-filtro="' + previa + '"]')) aplicar(previa, false);
})();
