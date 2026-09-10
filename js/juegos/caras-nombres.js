(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CARAS = ["🧑‍🦰","👩‍🦱","👨‍🦳","🧑‍🦲","👩‍🦰","👨‍🦱"];
  const NOMBRES = ["Mora","Tomás","Elena","Julián","Renata","Bruno","Nina","Facundo"];
  let ronda = 0;
  const TOTAL = 5;

  GameEngine.iniciar({ juegoId: "caras-nombres", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las rondas!" });
      return;
    }
    const cara = CARAS[Math.floor(Math.random() * CARAS.length)];
    const nombre = NOMBRES[Math.floor(Math.random() * NOMBRES.length)];
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:4rem;margin-bottom:10px;">${cara}</div>
        <p style="font-weight:800;font-size:1.3rem;color:var(--teal);margin-bottom:20px;">${nombre}</p>
        <p style="color:var(--text-mid);font-size:0.9rem;">Memorizalo…</p>
      </div>`;
    setTimeout(() => {
      const opciones = [nombre, ...NOMBRES.filter(n => n !== nombre).sort(() => Math.random() - 0.5).slice(0, 2)].sort(() => Math.random() - 0.5);
      contenedor.innerHTML = `
        <div style="text-align:center;">
          <div style="font-size:4rem;margin-bottom:16px;">${cara}</div>
          <p style="color:var(--text-mid);font-size:0.9rem;margin-bottom:12px;">¿Cómo se llamaba?</p>
          <div class="jg-opciones">${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
        </div>`;
      contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
        if (btn.dataset.v === nombre) { GameEngine.sumarPuntos(12); } else { GameEngine.restarVida(); }
        nuevaRonda();
      }));
    }, 2200);
  }

  nuevaRonda();
})();
