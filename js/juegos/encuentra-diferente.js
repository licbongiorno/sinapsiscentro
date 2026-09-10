(function () {
  const BASES = ["🔵","🟢","🟡","🟣","🔺","⬛"];
  const DIFERENTES = { "🔵": "🔷", "🟢": "🟩", "🟡": "🟨", "🟣": "🟪", "🔺": "🔻", "⬛": "⬜" };
  const contenedor = document.getElementById("jgContenedor");

  let ronda = 0;
  const TOTAL_RONDAS = 8;

  GameEngine.iniciar({ juegoId: "encuentra-diferente", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL_RONDAS) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las rondas!" });
      return;
    }
    const tam = Math.min(20, 8 + ronda * 2);
    const base = BASES[Math.floor(Math.random() * BASES.length)];
    const diferente = DIFERENTES[base];
    const posicionDiferente = Math.floor(Math.random() * tam);

    const cols = Math.ceil(Math.sqrt(tam));
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Ronda ${ronda} de ${TOTAL_RONDAS}</p>
      <div class="jg-grilla-simbolos" style="grid-template-columns: repeat(${cols}, 1fr);">
        ${Array.from({ length: tam }, (_, i) => `<div class="jg-simbolo" data-i="${i}">${i === posicionDiferente ? diferente : base}</div>`).join("")}
      </div>`;
    contenedor.querySelectorAll(".jg-simbolo").forEach(el => el.addEventListener("click", () => {
      if (Number(el.dataset.i) === posicionDiferente) {
        GameEngine.sumarPuntos(15);
        nuevaRonda();
      } else {
        GameEngine.restarVida();
        el.style.opacity = "0.3";
      }
    }));
  }

  nuevaRonda();
})();
