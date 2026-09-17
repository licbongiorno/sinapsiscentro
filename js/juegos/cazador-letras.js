(function () {
  const contenedor = document.getElementById("jgContenedor");
  const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let ronda = 0;
  const TOTAL = 6;

  GameEngine.iniciar({ juegoId: "cazador-letras", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las rondas!" });
      return;
    }
    const cantidad = Math.min(36, 16 + ronda * 3);
    const objetivo = ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
    const posiciones = Array.from({ length: cantidad }, () => {
      let letra;
      do { letra = ALFABETO[Math.floor(Math.random() * ALFABETO.length)]; } while (letra === objetivo);
      return letra;
    });
    const idxObjetivo = Math.floor(Math.random() * cantidad);
    posiciones[idxObjetivo] = objetivo;

    const cols = Math.ceil(Math.sqrt(cantidad));
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Ronda ${ronda} de ${TOTAL}</p>
      <p style="text-align:center;font-weight:800;font-size:1.2rem;color:var(--navy);margin-bottom:14px;">Encontrá la letra: <span style="color:var(--teal);">${objetivo}</span></p>
      <div class="jg-grilla-simbolos" style="grid-template-columns: repeat(${cols}, 1fr);">
        ${posiciones.map((l, i) => `<button type="button" class="jg-simbolo" data-i="${i}" style="font-weight:800;" aria-label="Casilla ${i + 1} de ${cantidad}, letra ${l}">${l}</button>`).join("")}
      </div>`;
    contenedor.querySelectorAll(".jg-simbolo").forEach(el => el.addEventListener("click", () => {
      if (Number(el.dataset.i) === idxObjetivo) {
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
