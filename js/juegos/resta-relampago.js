(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "resta-relampago", vidas: 3, tiempoSegundos: null });
  let ronda = 0;
  const TOTAL = 12;

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las restas!" });
      return;
    }
    const a = 10 + Math.floor(Math.random() * 90);
    const b = 1 + Math.floor(Math.random() * a);
    const correcto = a - b;
    const opciones = new Set([correcto]);
    while (opciones.size < 4) {
      const delta = (Math.floor(Math.random() * 9) + 1) * (Math.random() < 0.5 ? -1 : 1);
      const v = correcto + delta;
      if (v >= 0) opciones.add(v);
    }
    const lista = [...opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:8px;">Ronda ${ronda} de ${TOTAL}</p>
        <div style="font-size:2.4rem;font-weight:800;color:var(--navy);margin-bottom:24px;">${a} − ${b} = ?</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;width:min(90vw,320px);margin:0 auto;">
          ${lista.map(v => `<button data-v="${v}" class="jg-opcion" style="text-align:center;">${v}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.v) === correcto) { GameEngine.sumarPuntos(10); nuevaRonda(); }
      else { GameEngine.restarVida(); btn.classList.add("incorrecta"); setTimeout(nuevaRonda, 500); }
    }));
  }

  nuevaRonda();
})();
