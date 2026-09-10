(function () {
  const contenedor = document.getElementById("jgContenedor");
  const COLORES = [
    { nombre: "ROJO", hex: "#e06060" },
    { nombre: "AZUL", hex: "#2aaec2" },
    { nombre: "VERDE", hex: "#4caf6a" },
    { nombre: "AMARILLO", hex: "#e0c040" },
  ];

  GameEngine.iniciar({ juegoId: "stroop", vidas: 3, tiempoSegundos: 45 });

  function render() {
    const palabra = COLORES[Math.floor(Math.random() * COLORES.length)];
    let tinta = COLORES[Math.floor(Math.random() * COLORES.length)];
    // forzamos que casi siempre no coincidan, es la gracia del juego
    if (Math.random() < 0.85 && tinta.nombre === palabra.nombre) {
      tinta = COLORES[(COLORES.indexOf(tinta) + 1) % COLORES.length];
    }
    const opciones = [...COLORES].sort(() => Math.random() - 0.5);

    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Tocá el COLOR de la tinta, no la palabra</p>
        <div style="font-size:2.4rem;font-weight:800;color:${tinta.hex};margin:14px 0 28px;">${palabra.nombre}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:min(94vw,360px);margin:0 auto;">
          ${opciones.map(c => `<button class="jg-opcion" data-v="${c.nombre}" style="text-align:center;color:${c.hex};font-weight:800;">${c.nombre}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === tinta.nombre) {
        GameEngine.sumarPuntos(8);
      } else {
        GameEngine.restarVida();
      }
      render();
    }));
  }

  render();
})();
