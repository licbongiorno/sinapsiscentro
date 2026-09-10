(function () {
  const contenedor = document.getElementById("jgContenedor");
  const COLORES = [
    { nombre: "Rojo", hex: "#e06060" }, { nombre: "Azul", hex: "#2aaec2" },
    { nombre: "Verde", hex: "#4caf6a" }, { nombre: "Amarillo", hex: "#e0c040" },
    { nombre: "Violeta", hex: "#c98ac2" }, { nombre: "Naranja", hex: "#e0954a" },
  ];
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "colores", vidas: null, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Muy bien! 🌈" });
      return;
    }
    const objetivo = COLORES[Math.floor(Math.random() * COLORES.length)];
    const opciones = [...COLORES].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!opciones.includes(objetivo)) opciones[0] = objetivo;

    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="font-weight:800;font-size:1.3rem;color:var(--navy);margin-bottom:20px;">Tocá el color: ${objetivo.nombre}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;width:min(90vw,320px);margin:0 auto;">
          ${opciones.sort(() => Math.random() - 0.5).map(c => `<button data-v="${c.nombre}" style="aspect-ratio:1;border-radius:20px;border:none;background:${c.hex};cursor:pointer;"></button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === objetivo.nombre) GameEngine.sumarPuntos(10);
      nuevaRonda();
    }));
  }

  nuevaRonda();
})();
