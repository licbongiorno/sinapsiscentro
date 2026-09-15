/**
 * LECTOR.JS — Botón "Escuchar" (texto a voz) para la Zona Infantil.
 * Usa la Web Speech API del navegador (SpeechSynthesis), sin backend ni
 * costo. Si el navegador no la soporta, boton() devuelve "" y no aparece
 * ningún botón.
 */
const Lector = (() => {
  const soportado = typeof window !== "undefined" && "speechSynthesis" in window;
  let voz = null;

  function elegirVoz() {
    if (!soportado) return null;
    const voces = window.speechSynthesis.getVoices();
    if (!voces.length) return null;
    return voces.find(v => v.lang === "es-AR")
      || voces.find(v => /^es-(419|MX|UY|CL|PE|CO)/.test(v.lang))
      || voces.find(v => v.lang && v.lang.startsWith("es"))
      || null;
  }

  if (soportado) {
    voz = elegirVoz();
    window.speechSynthesis.onvoiceschanged = () => { voz = elegirVoz(); };
  }

  function leer(texto) {
    if (!soportado || !texto) return;
    const limpio = String(texto).replace(/\s+/g, " ").trim();
    if (!limpio) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(limpio);
    u.lang = (voz && voz.lang) || "es-419";
    if (voz) u.voice = voz;
    u.rate = 0.92;
    u.pitch = 1.05;
    window.speechSynthesis.speak(u);
  }

  function detener() {
    if (soportado) window.speechSynthesis.cancel();
  }

  function escaparAtributo(s) {
    return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /** Devuelve el HTML de un botón de escuchar para `texto`, o "" si el navegador no soporta voz. */
  function boton(texto, claseExtra = "") {
    if (!soportado || !texto) return "";
    return `<button type="button" class="lector-btn ${claseExtra}" data-lector-texto="${escaparAtributo(texto)}" aria-label="Escuchar en voz alta">🔊</button>`;
  }

  /** Conecta los botones data-lector-texto ya insertados en el DOM (llamar tras cada innerHTML). */
  function conectar(raiz) {
    if (!soportado) return;
    const root = raiz || document;
    root.querySelectorAll("[data-lector-texto]").forEach(btn => {
      if (btn.dataset.lectorListo) return;
      btn.dataset.lectorListo = "1";
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        leer(btn.getAttribute("data-lector-texto"));
      });
    });
  }

  return { soportado, leer, detener, boton, conectar };
})();
