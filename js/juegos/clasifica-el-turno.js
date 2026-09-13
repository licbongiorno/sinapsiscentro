(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "clasifica-el-turno", vidas: 3, tiempoSegundos: null });
  let ronda = 0;
  const TOTAL = 12;
  let criterio = "color"; // "color" | "tamano"

  function nuevoItem() {
    return {
      color: Math.random() < 0.5 ? "azul" : "naranja",
      tamano: Math.random() < 0.5 ? "grande" : "chico",
    };
  }

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste la clasificación!" });
      return;
    }
    if (ronda > 1 && ronda % 4 === 1) criterio = criterio === "color" ? "tamano" : "color";
    const item = nuevoItem();
    const size = item.tamano === "grande" ? 70 : 34;
    const color = item.color === "azul" ? "#2aaec2" : "#e0954a";
    const etiquetaA = criterio === "color" ? "AZUL" : "GRANDE";
    const etiquetaB = criterio === "color" ? "NARANJA" : "CHICO";
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--teal-mid);font-weight:800;font-size:0.9rem;margin-bottom:6px;">Clasificá por: ${criterio === "color" ? "COLOR" : "TAMAÑO"}</p>
        <p style="color:var(--text-mid);font-size:0.8rem;margin-bottom:16px;">Ronda ${ronda} de ${TOTAL}</p>
        <div style="display:flex;justify-content:center;align-items:center;height:90px;margin-bottom:28px;">
          <div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};"></div>
        </div>
        <div style="display:flex;justify-content:center;gap:16px;">
          <button data-v="A" class="jg-opcion" style="text-align:center;">${etiquetaA}</button>
          <button data-v="B" class="jg-opcion" style="text-align:center;">${etiquetaB}</button>
        </div>
      </div>`;
    const correcta = criterio === "color" ? (item.color === "azul" ? "A" : "B") : (item.tamano === "grande" ? "A" : "B");
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === correcta) { GameEngine.sumarPuntos(8); nuevaRonda(); }
      else { GameEngine.restarVida(); btn.classList.add("incorrecta"); setTimeout(nuevaRonda, 500); }
    }));
  }

  nuevaRonda();
})();
