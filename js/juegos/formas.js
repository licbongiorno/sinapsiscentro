(function () {
  const contenedor = document.getElementById("jgContenedor");
  const FORMAS = [
    { nombre: "Círculo", simbolo: "●" }, { nombre: "Cuadrado", simbolo: "■" },
    { nombre: "Triángulo", simbolo: "▲" }, { nombre: "Estrella", simbolo: "★" },
    { nombre: "Corazón", simbolo: "♥" }, { nombre: "Rombo", simbolo: "◆" },
  ];
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "formas", vidas: null, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Muy bien! 🔷" });
      return;
    }
    const objetivo = FORMAS[Math.floor(Math.random() * FORMAS.length)];
    const opciones = [...FORMAS].sort(() => Math.random() - 0.5).slice(0, 4);
    if (!opciones.includes(objetivo)) opciones[0] = objetivo;

    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="font-weight:800;font-size:1.3rem;color:var(--navy);margin-bottom:20px;">Tocá: ${objetivo.nombre}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;width:min(90vw,320px);margin:0 auto;">
          ${opciones.sort(() => Math.random() - 0.5).map(f => `<button data-v="${f.nombre}" style="aspect-ratio:1;border-radius:20px;border:2px solid var(--teal-pale);background:white;font-size:2.4rem;color:var(--teal-mid);cursor:pointer;">${f.simbolo}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === objetivo.nombre) GameEngine.sumarPuntos(10);
      nuevaRonda();
    }));
  }

  nuevaRonda();
})();
