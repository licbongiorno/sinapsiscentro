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
    const DIRECCION = { 0: "arriba", 90: "derecha", 180: "abajo", 270: "izquierda" };
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Ronda ${ronda} de ${TOTAL} — encontrá la flecha que mira distinto</p>
      <div class="jg-grilla-simbolos" style="grid-template-columns: repeat(${cols}, 1fr);">
        ${Array.from({ length: tam }, (_, i) => { const rot = i === idxIntrusa ? rotacionIntrusa : rotacionBase; return `<button type="button" class="jg-simbolo" data-i="${i}" style="transform:rotate(${rot}deg);font-size:1.4rem;" aria-label="Casilla ${i + 1} de ${tam}, flecha apunta hacia ${DIRECCION[rot]}">➤</button>`; }).join("")}
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
