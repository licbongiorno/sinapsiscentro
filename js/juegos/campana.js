(function () {
  const contenedor = document.getElementById("jgContenedor");
  let sonidos = 0;
  const MAX = 5;
  let ctx = null;

  GameEngine.iniciar({ juegoId: "campana", vidas: null, tiempoSegundos: null });

  function sonarCampana() {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = 528;
      g.gain.value = 0.12;
      o.connect(g).connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);
      o.stop(ctx.currentTime + 2.2);
    } catch (e) {}
  }

  function render() {
    contenedor.innerHTML = `
      <div style="text-align:center;padding:20px 0 30px;">
        <div id="campanaIcono" style="font-size:5rem;margin-bottom:20px;transition:transform 0.3s;">🔔</div>
        <p style="color:var(--text-mid);font-size:0.9rem;margin-bottom:20px;">Tocá la campana, cerrá los ojos y escuchá hasta que el sonido se apague por completo.</p>
        <button id="btnCampana" class="ge-btn ge-btn-principal">Sonar campana (${sonidos}/${MAX})</button>
      </div>`;
    document.getElementById("btnCampana").addEventListener("click", () => {
      sonarCampana();
      const icono = document.getElementById("campanaIcono");
      icono.style.transform = "scale(1.15)";
      setTimeout(() => { icono.style.transform = "scale(1)"; }, 300);
      sonidos += 1;
      if (sonidos >= MAX) {
        setTimeout(() => GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Cinco momentos de atención plena. 🔔" }), 2300);
      } else {
        render();
      }
    });
  }

  render();
})();
