/**
 * COMPARTIR.JS — Botón de compartir universal
 * ==============================================
 * Un solo módulo para los 5 flujos (Mindfulness/Ejercicios vía
 * exercise-engine.js, Juegos vía game-engine.js, Creatividad y Zona
 * Infantil) en vez de reimplementar la lógica en cada uno.
 *
 * Compartir.compartir({ titulo, texto, url }) intenta primero la Web
 * Share API nativa (navigator.share) — eso abre el selector del
 * sistema operativo con WhatsApp, Telegram, Mail y cualquier otra
 * app instalada, sin que este sitio tenga que saber cuáles existen.
 * Sólo cuando el navegador no la soporta (la mayoría de los
 * navegadores de escritorio) se muestra un menú propio con los
 * enlaces directos más usados.
 */
const Compartir = (() => {
  function compartir({ titulo, texto, url }) {
    if (navigator.share) {
      navigator.share({ title: titulo, text: texto, url }).catch((err) => {
        if (err && err.name === "AbortError") return; // el usuario cerró el selector nativo
        mostrarMenu({ titulo, texto, url });
      });
    } else {
      mostrarMenu({ titulo, texto, url });
    }
  }

  function mostrarMenu({ titulo, texto, url }) {
    document.querySelectorAll(".compartir-overlay").forEach((m) => m.remove());
    const mensaje = `${texto}\n${url}`;
    const opciones = [
      { nombre: "WhatsApp", icono: "💬", href: `https://wa.me/?text=${encodeURIComponent(mensaje)}` },
      { nombre: "Telegram", icono: "✈️", href: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}` },
      { nombre: "Email", icono: "✉️", href: `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(mensaje)}` },
    ];
    const overlay = document.createElement("div");
    overlay.className = "compartir-overlay";
    overlay.innerHTML = `
      <div class="compartir-menu" role="dialog" aria-modal="true" aria-label="Compartir">
        <button class="compartir-cerrar" id="compartirCerrar" aria-label="Cerrar">✕</button>
        <p class="compartir-titulo">Compartir</p>
        <p class="compartir-subtitulo">${titulo}</p>
        <div class="compartir-opciones">
          ${opciones.map((o) => `<a class="compartir-opcion" href="${o.href}" target="_blank" rel="noopener"><span class="compartir-opcion-icono">${o.icono}</span>${o.nombre}</a>`).join("")}
          <button class="compartir-opcion" id="compartirCopiar"><span class="compartir-opcion-icono">🔗</span>Copiar enlace</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
    document.getElementById("compartirCerrar").addEventListener("click", () => overlay.remove());
    document.getElementById("compartirCopiar").addEventListener("click", () => {
      copiarAlPortapapeles(url).then(() => {
        const btn = document.getElementById("compartirCopiar");
        btn.innerHTML = `<span class="compartir-opcion-icono">✓</span>Enlace copiado`;
        setTimeout(() => overlay.remove(), 900);
      });
    });
  }

  function copiarAlPortapapeles(texto) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(texto).catch(() => copiarConInputTemporal(texto));
    }
    return copiarConInputTemporal(texto);
  }

  function copiarConInputTemporal(texto) {
    return new Promise((resolve) => {
      const input = document.createElement("textarea");
      input.value = texto;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      try { document.execCommand("copy"); } catch (e) { /* no-op */ }
      document.body.removeChild(input);
      resolve();
    });
  }

  return { compartir };
})();
