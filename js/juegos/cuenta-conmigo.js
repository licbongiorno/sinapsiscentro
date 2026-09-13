(function () {
  const contenedor = document.getElementById("jgContenedor");
  const BANCO = ["🍎","🍌","⭐","🎈","🐶","🌸","⚽","🍇"];
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "cuenta-conmigo", vidas: null, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Contaste todo muy bien! 🔢" });
      return;
    }
    const emoji = BANCO[Math.floor(Math.random() * BANCO.length)];
    const cantidad = 1 + Math.floor(Math.random() * 8);
    const opciones = new Set([cantidad]);
    while (opciones.size < 3) {
      const v = 1 + Math.floor(Math.random() * 8);
      opciones.add(v);
    }
    const lista = [...opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.9rem;margin-bottom:12px;">¿Cuántos hay?</p>
      <div style="text-align:center;font-size:2.2rem;margin-bottom:24px;letter-spacing:6px;">${emoji.repeat(cantidad)}</div>
      <div style="display:flex;justify-content:center;gap:14px;">
        ${lista.map(v => `<button data-v="${v}" class="jg-opcion" style="font-size:1.4rem;font-weight:800;width:60px;text-align:center;">${v}</button>`).join("")}
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.v) === cantidad) GameEngine.sumarPuntos(10);
      nuevaRonda();
    }));
  }

  nuevaRonda();
})();
