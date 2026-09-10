(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "secuencia-numerica", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las secuencias!" }); return; }
    const inicio = 1 + Math.floor(Math.random() * 15);
    const paso = 1 + Math.floor(Math.random() * 6);
    const secuencia = Array.from({ length: 4 }, (_, i) => inicio + i * paso);
    const siguiente = inicio + 4 * paso;
    const opciones = new Set([siguiente]);
    while (opciones.size < 4) {
      const r = siguiente + (Math.floor(Math.random() * 8) - 4);
      if (r > 0 && r !== siguiente) opciones.add(r);
    }
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;">Ronda ${ronda} de ${TOTAL}</p>
        <div style="font-size:1.8rem;font-weight:800;color:var(--navy);margin-bottom:24px;">${secuencia.join(" · ")} · <span style="color:var(--teal-mid);">?</span></div>
        <div class="jg-opciones">${[...opciones].sort(() => Math.random() - 0.5).map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.v) === siguiente) { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); GameEngine.restarVida(); }
      setTimeout(nuevaRonda, 500);
    }));
  }

  nuevaRonda();
})();
