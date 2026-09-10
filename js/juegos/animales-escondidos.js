(function () {
  const contenedor = document.getElementById("jgContenedor");
  const RELLENO = "🌿";
  const ANIMALES = ["🐶","🐱","🐰","🐻","🦁","🐸","🐵","🐷"];
  let ronda = 0;
  const TOTAL = 5;

  GameEngine.iniciar({ juegoId: "animales-escondidos", vidas: null, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Encontraste todos los animalitos! 🎉" }); return; }
    const objetivo = ANIMALES[Math.floor(Math.random() * ANIMALES.length)];
    const tam = Math.min(24, 12 + ronda * 2);
    const idxObjetivo = Math.floor(Math.random() * tam);
    const cols = Math.ceil(Math.sqrt(tam));
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.9rem;margin-bottom:10px;">Encontrá: ${objetivo}</p>
      <div class="jg-grilla-simbolos" style="grid-template-columns:repeat(${cols},1fr);">
        ${Array.from({ length: tam }, (_, i) => `<div class="jg-simbolo" data-i="${i}" style="font-size:1.3rem;">${i === idxObjetivo ? objetivo : RELLENO}</div>`).join("")}
      </div>`;
    contenedor.querySelectorAll(".jg-simbolo").forEach(el => el.addEventListener("click", () => {
      if (Number(el.dataset.i) === idxObjetivo) { GameEngine.sumarPuntos(10); nuevaRonda(); }
    }));
  }

  nuevaRonda();
})();
