(function () {
  const contenedor = document.getElementById("jgContenedor");
  let regla = "mayor";
  let ronda = 0;
  const TOTAL = 10;

  GameEngine.iniciar({ juegoId: "cambia-regla", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste el desafío!" }); return; }
    if (ronda % 3 === 0) regla = regla === "mayor" ? "menor" : "mayor";
    const a = 1 + Math.floor(Math.random() * 90);
    let b = 1 + Math.floor(Math.random() * 90);
    while (b === a) b = 1 + Math.floor(Math.random() * 90);
    const correcta = regla === "mayor" ? Math.max(a, b) : Math.min(a, b);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">Regla actual: tocá el número <b style="color:var(--teal)">${regla}</b></p>
        <div style="display:flex;justify-content:center;gap:16px;">
          <button data-v="${a}" style="width:100px;height:100px;border-radius:18px;border:none;background:linear-gradient(135deg,var(--teal),var(--teal-mid));color:white;font-size:1.8rem;font-weight:800;cursor:pointer;">${a}</button>
          <button data-v="${b}" style="width:100px;height:100px;border-radius:18px;border:none;background:linear-gradient(135deg,var(--teal),var(--teal-mid));color:white;font-size:1.8rem;font-weight:800;cursor:pointer;">${b}</button>
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.v) === correcta) { GameEngine.sumarPuntos(10); nuevaRonda(); }
      else { GameEngine.restarVida(); setTimeout(nuevaRonda, 400); }
    }));
  }

  nuevaRonda();
})();
