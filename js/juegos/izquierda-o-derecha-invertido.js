(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "izquierda-o-derecha-invertido", vidas: 3, tiempoSegundos: null });
  let ronda = 0;
  const TOTAL = 12;

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las rondas!" });
      return;
    }
    const esDerecha = Math.random() < 0.5;
    const invertido = Math.random() < 0.35;
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Ronda ${ronda} de ${TOTAL}</p>
        <p style="font-weight:800;font-size:1rem;color:var(--navy);margin-bottom:16px;">Tocá el mismo lado que la flecha${invertido ? " — pero ahora al REVÉS 🔄" : ""}</p>
        <div style="font-size:4rem;margin-bottom:28px;">${esDerecha ? "➡️" : "⬅️"}</div>
        <div style="display:flex;justify-content:center;gap:16px;">
          <button data-v="izquierda" class="jg-opcion" style="text-align:center;">IZQUIERDA</button>
          <button data-v="derecha" class="jg-opcion" style="text-align:center;">DERECHA</button>
        </div>
      </div>`;
    let correcta = esDerecha ? "derecha" : "izquierda";
    if (invertido) correcta = correcta === "derecha" ? "izquierda" : "derecha";
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === correcta) { GameEngine.sumarPuntos(8); nuevaRonda(); }
      else { GameEngine.restarVida(); btn.classList.add("incorrecta"); setTimeout(nuevaRonda, 500); }
    }));
  }

  nuevaRonda();
})();
