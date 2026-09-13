(function () {
  const contenedor = document.getElementById("jgContenedor");
  const BANCO = ["🐘","🐭","🐳","🐜","🦒","🐹","🐋","🐞","🦕","🐁"];
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "tamanos", vidas: null, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Muy bien! 📏" });
      return;
    }
    const pedirGrande = Math.random() < 0.5;
    const opciones = [...BANCO].sort(() => Math.random() - 0.5).slice(0, 3);
    const tamanos = opciones.map(() => 2.2 + Math.random() * 1.6).sort((a, b) => a - b);
    if (Math.random() < 0.5) tamanos.reverse();
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="font-weight:800;font-size:1.2rem;color:var(--navy);margin-bottom:24px;">Tocá el más ${pedirGrande ? "GRANDE" : "CHIQUITO"}</p>
        <div style="display:flex;justify-content:center;align-items:center;gap:20px;height:120px;">
          ${opciones.map((o, i) => `<button data-t="${tamanos[i]}" class="jg-opcion" style="font-size:${tamanos[i]}rem;background:none;border:none;padding:4px;">${o}</button>`).join("")}
        </div>
      </div>`;
    const objetivo = pedirGrande ? Math.max(...tamanos) : Math.min(...tamanos);
    contenedor.querySelectorAll("[data-t]").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.t) === objetivo) GameEngine.sumarPuntos(10);
      nuevaRonda();
    }));
  }

  nuevaRonda();
})();
