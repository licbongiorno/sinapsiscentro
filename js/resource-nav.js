/**
 * RESOURCE-NAV.JS — Menú "Ir a..." compartido por las páginas de recursos
 * ==========================================================================
 * Reemplaza la fila de íconos sueltos que tenía cada header (sin texto,
 * apretada en mobile) por un solo botón que abre un panel con Inicio y
 * el resto de los recursos, cada uno con su nombre. La página actual se
 * excluye de la lista. Requiere en el HTML, dentro del <body>:
 *   <button class="rn-trigger" id="rnTrigger" aria-haspopup="true"
 *     aria-expanded="false" aria-controls="rnPanel" aria-label="Ir a...">
 *     <span></span><span></span><span></span>
 *   </button>
 *   ...
 *   <div class="rn-overlay" id="rnOverlay"></div>
 *   <nav class="rn-panel" id="rnPanel" aria-label="Secciones del sitio">
 *     <div class="rn-panel-header"><h2>Ir a...</h2>
 *       <button class="rn-cerrar" id="rnCerrar" aria-label="Cerrar menú">✕</button></div>
 *     <div class="rn-lista" id="rnLista"></div>
 *   </nav>
 */
const RECURSOS_SITIO = [
  { id: "inicio", nombre: "Inicio", icono: "🏠", href: "index.html" },
  { id: "juegos", nombre: "Juegos", icono: "🎮", href: "juegos.html" },
  { id: "ejercicios", nombre: "Ejercicios", icono: "🌱", href: "ejercicios.html" },
  { id: "mindfulness", nombre: "Mindfulness", icono: "🧘", href: "mindfulness.html" },
  { id: "creatividad", nombre: "Creatividad", icono: "🎨", href: "creatividad.html" },
  { id: "sonidos", nombre: "Biblioteca Sonora", icono: "🎧", href: "sonidos.html" },
  { id: "infantil", nombre: "Zona Infantil", icono: "🧸", href: "infantil.html" },
];

const MenuRecursos = (() => {
  let trigger, overlay, panel, disparador;

  function elementosFocables() {
    return [...panel.querySelectorAll("a, button")].filter(el => el.offsetParent !== null);
  }

  function paginaActual() {
    const partes = location.pathname.split("/");
    return partes[partes.length - 1] || "index.html";
  }

  function abrir() {
    disparador = document.activeElement;
    overlay.classList.add("open");
    panel.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", teclado);
    // El primer foco va al primer destino de la lista, no al botón de
    // cerrar: quien abre este menú quiere navegar, no cerrarlo.
    const primerDestino = panel.querySelector(".rn-item");
    if (primerDestino) primerDestino.focus();
  }

  function cerrar() {
    overlay.classList.remove("open");
    panel.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", teclado);
    if (disparador) disparador.focus();
  }

  function teclado(e) {
    if (e.key === "Escape") { e.preventDefault(); cerrar(); return; }
    if (e.key !== "Tab") return;
    const focables = elementosFocables();
    if (!focables.length) return;
    const primero = focables[0], ultimo = focables[focables.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  }

  function iniciar() {
    trigger = document.getElementById("rnTrigger");
    overlay = document.getElementById("rnOverlay");
    panel = document.getElementById("rnPanel");
    if (!trigger || !overlay || !panel) return;

    const actual = paginaActual();
    const items = RECURSOS_SITIO.filter(r => r.href !== actual);
    document.getElementById("rnLista").innerHTML = items.map(r =>
      `<a href="${r.href}" class="rn-item ${r.id === "inicio" ? "rn-inicio" : ""}">
        <span class="rn-icono">${r.icono}</span><span>${r.nombre}</span>
      </a>`).join("");

    trigger.addEventListener("click", () => { panel.classList.contains("open") ? cerrar() : abrir(); });
    document.getElementById("rnCerrar").addEventListener("click", cerrar);
    overlay.addEventListener("click", cerrar);
  }

  return { iniciar };
})();

document.addEventListener("DOMContentLoaded", () => MenuRecursos.iniciar());
