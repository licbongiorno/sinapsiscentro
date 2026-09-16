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
const RN_ICONOS = {
  inicio: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  buscar: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>',
  juegos: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></svg>',
  ejercicios: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/></svg>',
  mindfulness: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg>',
  creatividad: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>',
  sonidos: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></svg>',
  infantil: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/></svg>',
};

const RECURSOS_SITIO = [
  { id: "inicio", nombre: "Inicio", icono: RN_ICONOS.inicio, href: "index.html" },
  { id: "buscar", nombre: "Buscar", icono: RN_ICONOS.buscar, href: "buscar.html" },
  { id: "juegos", nombre: "Juegos", icono: RN_ICONOS.juegos, href: "juegos.html" },
  { id: "ejercicios", nombre: "Ejercicios", icono: RN_ICONOS.ejercicios, href: "ejercicios.html" },
  { id: "mindfulness", nombre: "Mindfulness", icono: RN_ICONOS.mindfulness, href: "mindfulness.html" },
  { id: "creatividad", nombre: "Creatividad", icono: RN_ICONOS.creatividad, href: "creatividad.html" },
  { id: "sonidos", nombre: "Biblioteca Sonora", icono: RN_ICONOS.sonidos, href: "sonidos.html" },
  { id: "infantil", nombre: "Zona Infantil", icono: RN_ICONOS.infantil, href: "infantil.html" },
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
