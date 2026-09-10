(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "la-intrusa", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Encontraste todas las intrusas!" });
      return;
    }
    const tam = Math.min(24, 9 + ronda * 2);
    const rotacionBase = [0, 90, 180, 270][Math.floor(Math.random() * 4)];
    const idxIntrusa = Math.floor(Math.random() * tam);
    const rotacionIntrusa = (rotacionBase + 90 + Math.floor(Math.random() * 2) * 90) % 360;

    const cols = Math.ceil(Math.sqrt(tam));
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Ronda ${ronda} de ${TOTAL} — encontrá la flecha que mira distinto</p>
      <div class="jg-grilla-simbolos" style="grid-template-columns: repeat(${cols}, 1fr);">
        ${Array.from({ length: tam }, (_, i) => `<div class="jg-simbolo" data-i="${i}" style="transform:rotate(${i === idxIntrusa ? rotacionIntrusa : rotacionBase}deg);font-size:1.4rem;">➤</div>`).join("")}
      </div>`;
    contenedor.querySelectorAll(".jg-simbolo").forEach(el => el.addEventListener("click", () => {
      if (Number(el.dataset.i) === idxIntrusa) {
        GameEngine.sumarPuntos(12);
        nuevaRonda();
      } else {
        GameEngine.restarVida();
        el.style.opacity = "0.3";
      }
    }));
  }

  nuevaRonda();
})();
