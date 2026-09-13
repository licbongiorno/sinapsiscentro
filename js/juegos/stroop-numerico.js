(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "stroop-numerico", vidas: 3, tiempoSegundos: null });
  let ronda = 0;
  const TOTAL = 12;
  let criterio = "valor"; // "valor" | "tamano"

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Buen control de la atención!" });
      return;
    }
    if (ronda > 1 && ronda % 4 === 1) criterio = criterio === "valor" ? "tamano" : "valor";
    const a = 1 + Math.floor(Math.random() * 9);
    let b = 1 + Math.floor(Math.random() * 9);
    while (b === a) b = 1 + Math.floor(Math.random() * 9);
    const aGrande = Math.random() < 0.5;
    const tamA = aGrande ? "3.2rem" : "1.4rem";
    const tamB = aGrande ? "1.4rem" : "3.2rem";
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--teal-mid);font-weight:800;font-size:0.9rem;margin-bottom:6px;">Elegí el número ${criterio === "valor" ? "MAYOR (en valor)" : "más GRANDE (en tamaño)"}</p>
        <p style="color:var(--text-mid);font-size:0.8rem;margin-bottom:16px;">Ronda ${ronda} de ${TOTAL}</p>
        <div style="display:flex;justify-content:center;align-items:center;gap:40px;height:90px;margin-bottom:28px;">
          <button data-v="a" class="jg-opcion" style="font-size:${tamA};font-weight:800;padding:14px 20px;">${a}</button>
          <button data-v="b" class="jg-opcion" style="font-size:${tamB};font-weight:800;padding:14px 20px;">${b}</button>
        </div>
      </div>`;
    let correcta;
    if (criterio === "valor") correcta = a > b ? "a" : "b";
    else correcta = aGrande ? "a" : "b";
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === correcta) { GameEngine.sumarPuntos(8); nuevaRonda(); }
      else { GameEngine.restarVida(); btn.classList.add("incorrecta"); setTimeout(nuevaRonda, 500); }
    }));
  }

  nuevaRonda();
})();
