(function () {
  const contenedor = document.getElementById("jgContenedor");
  let regla = "par";
  let ronda = 0;
  const TOTAL = 10;

  GameEngine.iniciar({ juegoId: "cambio-regla", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste el desafío!" }); return; }
    if (ronda % 3 === 0) regla = regla === "par" ? "impar" : "par";
    const numero = 1 + Math.floor(Math.random() * 60);
    const cumple = regla === "par" ? numero % 2 === 0 : numero % 2 !== 0;
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:8px;">Regla actual: número <b style="color:var(--teal)">${regla}</b></p>
        <div style="font-size:2.4rem;font-weight:800;color:var(--navy);margin-bottom:24px;">${numero}</div>
        <div style="display:flex;justify-content:center;gap:14px;">
          <button data-v="si" class="ge-btn ge-btn-principal">Cumple</button>
          <button data-v="no" class="ge-btn ge-btn-secundario">No cumple</button>
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      const dijoCumple = btn.dataset.v === "si";
      if (dijoCumple === cumple) { GameEngine.sumarPuntos(10); nuevaRonda(); }
      else { GameEngine.restarVida(); setTimeout(nuevaRonda, 400); }
    }));
  }

  nuevaRonda();
})();
