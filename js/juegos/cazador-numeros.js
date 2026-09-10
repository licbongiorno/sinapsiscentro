(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 6;

  GameEngine.iniciar({ juegoId: "cazador-numeros", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las rondas!" }); return; }
    const cantidad = Math.min(36, 16 + ronda * 3);
    const objetivo = 1 + Math.floor(Math.random() * 9);
    const numeros = Array.from({ length: cantidad }, () => {
      let n; do { n = 1 + Math.floor(Math.random() * 9); } while (n === objetivo); return n;
    });
    const idxObjetivo = Math.floor(Math.random() * cantidad);
    numeros[idxObjetivo] = objetivo;
    const cols = Math.ceil(Math.sqrt(cantidad));
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Ronda ${ronda} de ${TOTAL}</p>
      <p style="text-align:center;font-weight:800;font-size:1.2rem;color:var(--navy);margin-bottom:14px;">Encontrá el número: <span style="color:var(--teal);">${objetivo}</span></p>
      <div class="jg-grilla-simbolos" style="grid-template-columns:repeat(${cols},1fr);">
        ${numeros.map((n, i) => `<div class="jg-simbolo" data-i="${i}" style="font-weight:800;">${n}</div>`).join("")}
      </div>`;
    contenedor.querySelectorAll(".jg-simbolo").forEach(el => el.addEventListener("click", () => {
      if (Number(el.dataset.i) === idxObjetivo) { GameEngine.sumarPuntos(12); nuevaRonda(); }
      else { GameEngine.restarVida(); el.style.opacity = "0.3"; }
    }));
  }

  nuevaRonda();
})();
