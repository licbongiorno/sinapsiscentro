(function () {
  const contenedor = document.getElementById("jgContenedor");
  const FORMAS = ["🔵","🟥","🔺","⬛","⭐","🟣"];
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "que-sigue", vidas: 3, tiempoSegundos: null });

  function generarPatron() {
    const largoBase = 2 + Math.floor(Math.random() * 2); // patrón de 2 o 3 elementos
    const disponibles = [...FORMAS].sort(() => Math.random() - 0.5);
    const base = disponibles.slice(0, largoBase);
    const repeticiones = 3;
    const secuencia = Array.from({ length: base.length * repeticiones }, (_, i) => base[i % base.length]);
    const siguiente = base[secuencia.length % base.length];
    const opciones = new Set([siguiente]);
    while (opciones.size < 4) opciones.add(FORMAS[Math.floor(Math.random() * FORMAS.length)]);
    return { secuencia, siguiente, opciones: [...opciones].sort(() => Math.random() - 0.5) };
  }

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todos los patrones!" });
      return;
    }
    const { secuencia, siguiente, opciones } = generarPatron();
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;">Ronda ${ronda} de ${TOTAL}</p>
        <div style="font-size:2rem;margin-bottom:26px;letter-spacing:6px;">${secuencia.join("")} <span style="color:var(--teal-mid);">?</span></div>
        <div style="display:flex;justify-content:center;gap:10px;">
          ${opciones.map(o => `<button data-v="${o}" style="width:56px;height:56px;border-radius:14px;border:2px solid var(--teal-pale);background:white;font-size:1.5rem;cursor:pointer;">${o}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === siguiente) {
        GameEngine.sumarPuntos(12);
        nuevaRonda();
      } else {
        GameEngine.restarVida();
        btn.style.opacity = "0.3";
        btn.disabled = true;
      }
    }));
  }

  nuevaRonda();
})();
