/**
 * ACCESIBILIDAD.JS — Botón de modo accesible, presente en todo el sitio
 * ==========================================================================
 * Inyecta un único botón flotante (♿) que agrega/quita la clase
 * `modo-accesible` en <html>. Los estilos de esa clase viven en
 * css/accesibilidad.css. El estado se guarda en localStorage para que
 * se mantenga entre páginas y visitas.
 *
 * La clase ya se aplica ANTES de que corra este archivo (ver el
 * pequeño script inline al principio del <head> de cada página, que
 * la lee de localStorage y la agrega enseguida) — así se evita el
 * parpadeo de "diseño normal" al cargar con el modo ya activado.
 *
 * A propósito NO agranda a la fuerza los botones de los juegos: varios
 * (memoria, colores, figura-igual) usan tamaños y proporciones exactas
 * para que el tablero se vea bien, y agrandar todo con fuerza bruta
 * rompería esos diseños. El modo accesible se enfoca en texto, contraste,
 * foco visible y movimiento — lo que es seguro de aplicar en cualquier
 * página sin mirar caso por caso.
 */

(function () {
  const CLAVE = "sinapsis_modo_accesible";

  function activo() {
    return document.documentElement.classList.contains("modo-accesible");
  }

  function actualizarBoton(btn) {
    const on = activo();
    btn.setAttribute("aria-pressed", String(on));
    btn.setAttribute("aria-label", on ? "Desactivar modo accesible" : "Activar modo accesible");
    btn.title = on ? "Modo accesible activado — tocá para desactivar" : "Activar modo accesible (texto más grande, más contraste, menos movimiento)";
  }

  function alternar(btn) {
    document.documentElement.classList.toggle("modo-accesible");
    try { localStorage.setItem(CLAVE, activo() ? "1" : "0"); } catch (e) {}
    actualizarBoton(btn);
  }

  function crearBoton() {
    if (document.getElementById("btnAccesibilidad")) return;
    const btn = document.createElement("button");
    btn.id = "btnAccesibilidad";
    btn.type = "button";
    btn.innerHTML = "♿";
    actualizarBoton(btn);
    btn.addEventListener("click", () => alternar(btn));
    document.body.appendChild(btn);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", crearBoton);
  } else {
    crearBoton();
  }
})();
