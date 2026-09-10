(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 6;

  GameEngine.iniciar({ juegoId: "matematica-visual", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las cuentas!" }); return; }
    const a = 1 + Math.floor(Math.random() * 6), b = 1 + Math.floor(Math.random() * 6);
    const suma = Math.random() < 0.7;
    const resultado = suma ? a + b : Math.max(a, b) - Math.min(a, b);
    const [x, y] = suma ? [a, b] : [Math.max(a, b), Math.min(a, b)];
    const opciones = new Set([resultado]);
    while (opciones.size < 3) opciones.add(Math.max(0, resultado + (Math.floor(Math.random() * 4) - 2)));
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">Ronda ${ronda} de ${TOTAL}</p>
        <div style="font-size:1.8rem;margin-bottom:24px;">${"🍎".repeat(x)} ${suma ? "+" : "－"} ${"🍎".repeat(y)}</div>
        <div class="jg-opciones">${[...opciones].sort(() => Math.random() - 0.5).map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.v) === resultado) { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); GameEngine.restarVida(); }
      setTimeout(nuevaRonda, 500);
    }));
  }

  nuevaRonda();
})();
