(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 10;

  GameEngine.iniciar({ juegoId: "ahora-al-reves", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las rondas!" });
      return;
    }
    const arriba = Math.random() < 0.5;
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Ronda ${ronda} de ${TOTAL}</p>
        <p style="font-weight:800;font-size:1.1rem;color:var(--navy);margin-bottom:24px;">Tocá el botón de <u>ABAJO</u> cuando la flecha apunte hacia <u>ARRIBA</u>, y viceversa</p>
        <div style="font-size:4rem;margin-bottom:30px;">${arriba ? "⬆️" : "⬇️"}</div>
        <div style="display:flex;flex-direction:column;gap:12px;width:min(90vw,300px);margin:0 auto;">
          <button data-v="arriba" class="jg-opcion" style="text-align:center;">ARRIBA</button>
          <button data-v="abajo" class="jg-opcion" style="text-align:center;">ABAJO</button>
        </div>
      </div>`;
    const correcta = arriba ? "abajo" : "arriba";
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === correcta) {
        GameEngine.sumarPuntos(10);
        nuevaRonda();
      } else {
        GameEngine.restarVida();
        btn.classList.add("incorrecta");
        setTimeout(nuevaRonda, 500);
      }
    }));
  }

  nuevaRonda();
})();
