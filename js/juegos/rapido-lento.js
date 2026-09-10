(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "rapido-lento", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste el desafío!" }); return; }
    const esRapido = Math.random() < 0.5;
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;">Observá el ritmo…</p>
        <div id="pulsoRL" style="width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,var(--teal),var(--teal-mid));margin:0 auto;animation:pulsoRL ${esRapido ? "0.35s" : "1.3s"} infinite ease-in-out;"></div>
      </div>
      <style>@keyframes pulsoRL{0%,100%{transform:scale(1);}50%{transform:scale(1.3);}}</style>`;
    setTimeout(() => {
      contenedor.innerHTML += `
        <div style="text-align:center;margin-top:20px;">
          <div style="display:flex;justify-content:center;gap:14px;">
            <button data-v="rapido" class="ge-btn ge-btn-principal">Rápido</button>
            <button data-v="lento" class="ge-btn ge-btn-secundario">Lento</button>
          </div>
        </div>`;
      contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
        const dijoRapido = btn.dataset.v === "rapido";
        if (dijoRapido === esRapido) GameEngine.sumarPuntos(10); else GameEngine.restarVida();
        nuevaRonda();
      }));
    }, 2200);
  }

  nuevaRonda();
})();
