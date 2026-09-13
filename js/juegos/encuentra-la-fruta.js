(function () {
  const contenedor = document.getElementById("jgContenedor");
  const FRUTAS = ["🍎","🍌","🍇","🍉","🍓","🍊","🍍","🍑"];
  const NO_FRUTAS = ["🚗","⚽","🐶","🎈","🌟","👟","🎲","📚"];
  let ronda = 0;
  const TOTAL = 6;

  GameEngine.iniciar({ juegoId: "encuentra-la-fruta", vidas: null, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Muy bien! Conocés todas las frutas 🍓" });
      return;
    }
    const fruta = FRUTAS[Math.floor(Math.random() * FRUTAS.length)];
    const distractores = [...NO_FRUTAS].sort(() => Math.random() - 0.5).slice(0, 5);
    const items = [fruta, ...distractores].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.9rem;margin-bottom:16px;">Tocá la fruta</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;width:min(90vw,320px);margin:0 auto;">
        ${items.map(it => `<button data-v="${it}" class="jg-opcion" style="font-size:1.8rem;aspect-ratio:1;">${it}</button>`).join("")}
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === fruta) GameEngine.sumarPuntos(10);
      nuevaRonda();
    }));
  }

  nuevaRonda();
})();
