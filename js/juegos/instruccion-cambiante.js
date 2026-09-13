(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "instruccion-cambiante", vidas: 3, tiempoSegundos: null });
  let ronda = 0;
  const TOTAL = 12;
  let criterio = "flecha"; // "flecha" | "palabra"
  const DIRECCIONES = [
    { id: "arriba", flecha: "⬆️", texto: "ARRIBA" },
    { id: "abajo", flecha: "⬇️", texto: "ABAJO" },
    { id: "izquierda", flecha: "⬅️", texto: "IZQUIERDA" },
    { id: "derecha", flecha: "➡️", texto: "DERECHA" },
  ];

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste el desafío!" });
      return;
    }
    if (ronda > 1 && ronda % 4 === 1) criterio = criterio === "flecha" ? "palabra" : "flecha";
    const flechaDir = DIRECCIONES[Math.floor(Math.random() * DIRECCIONES.length)];
    const palabraDir = DIRECCIONES[Math.floor(Math.random() * DIRECCIONES.length)];
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--teal-mid);font-weight:800;font-size:0.9rem;margin-bottom:6px;">Seguí ${criterio === "flecha" ? "la FLECHA" : "la PALABRA"}</p>
        <p style="color:var(--text-mid);font-size:0.8rem;margin-bottom:12px;">Ronda ${ronda} de ${TOTAL}</p>
        <div style="font-size:3rem;margin-bottom:6px;">${flechaDir.flecha}</div>
        <div style="font-weight:800;color:var(--navy);font-size:1.2rem;margin-bottom:24px;">${palabraDir.texto}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:min(90vw,280px);margin:0 auto;">
          ${DIRECCIONES.map(d => `<button data-v="${d.id}" class="jg-opcion" style="text-align:center;">${d.texto}</button>`).join("")}
        </div>
      </div>`;
    const correcta = criterio === "flecha" ? flechaDir.id : palabraDir.id;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === correcta) { GameEngine.sumarPuntos(8); nuevaRonda(); }
      else { GameEngine.restarVida(); btn.classList.add("incorrecta"); setTimeout(nuevaRonda, 500); }
    }));
  }

  nuevaRonda();
})();
