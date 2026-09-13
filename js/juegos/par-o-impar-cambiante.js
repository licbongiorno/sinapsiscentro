(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "par-o-impar-cambiante", vidas: 3, tiempoSegundos: null });
  let ronda = 0;
  const TOTAL = 14;
  let regla = Math.random() < 0.5 ? "par" : "impar";

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste el desafío!" });
      return;
    }
    if (ronda > 1 && ronda % 4 === 0) regla = regla === "par" ? "impar" : "par";
    const n = 1 + Math.floor(Math.random() * 98);
    const esDelTipo = (regla === "par") === (n % 2 === 0);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--teal-mid);font-weight:800;font-size:0.95rem;margin-bottom:6px;">Regla: tocá TOCAR si el número es ${regla.toUpperCase()}</p>
        <p style="color:var(--text-mid);font-size:0.8rem;margin-bottom:16px;">Ronda ${ronda} de ${TOTAL}</p>
        <div style="font-size:3rem;font-weight:800;color:var(--navy);margin-bottom:28px;">${n}</div>
        <div style="display:flex;justify-content:center;gap:16px;">
          <button data-v="tocar" class="jg-opcion" style="text-align:center;">TOCAR</button>
          <button data-v="pasar" class="jg-opcion" style="text-align:center;">PASAR</button>
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      const eligioTocar = btn.dataset.v === "tocar";
      if (eligioTocar === esDelTipo) { GameEngine.sumarPuntos(8); nuevaRonda(); }
      else { GameEngine.restarVida(); btn.classList.add("incorrecta"); setTimeout(nuevaRonda, 500); }
    }));
  }

  nuevaRonda();
})();
