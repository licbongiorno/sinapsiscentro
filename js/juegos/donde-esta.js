(function () {
  const contenedor = document.getElementById("jgContenedor");
  const RELLENO = "·";
  const OBJETOS = ["🎯","🍀","⭐","🔔","🍄","🐝","🦴","🧩"];
  let ronda = 0;
  const TOTAL = 6;

  GameEngine.iniciar({ juegoId: "donde-esta", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las rondas!" });
      return;
    }
    const objetivo = OBJETOS[Math.floor(Math.random() * OBJETOS.length)];
    const tam = Math.min(48, 20 + ronda * 5);
    const idxObjetivo = Math.floor(Math.random() * tam);

    const cols = Math.ceil(Math.sqrt(tam * 1.6));
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Ronda ${ronda} de ${TOTAL}</p>
      <p style="text-align:center;font-weight:800;color:var(--navy);margin-bottom:12px;">Encontrá: <span style="font-size:1.4rem;">${objetivo}</span></p>
      <div class="jg-grilla-simbolos" style="grid-template-columns: repeat(${cols}, 1fr); gap:4px;">
        ${Array.from({ length: tam }, (_, i) => `<div class="jg-simbolo" data-i="${i}" style="font-size:0.9rem;opacity:0.35;">${i === idxObjetivo ? objetivo : RELLENO}</div>`).join("")}
      </div>`;
    contenedor.querySelectorAll(".jg-simbolo").forEach(el => el.addEventListener("click", () => {
      if (Number(el.dataset.i) === idxObjetivo) {
        GameEngine.sumarPuntos(12);
        nuevaRonda();
      } else {
        GameEngine.restarVida();
      }
    }));
  }

  nuevaRonda();
})();
