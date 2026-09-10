(function () {
  const contenedor = document.getElementById("jgContenedor");
  const FORMAS = ["⭐","🔺","⬛","⚪","🔷"];
  GameEngine.iniciar({ juegoId: "pulso", vidas: 3, tiempoSegundos: 40 });
  let token = 0;

  function nuevoEstimulo() {
    token += 1;
    const miToken = token;
    const f = FORMAS[Math.floor(Math.random() * FORMAS.length)];
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Tocá sólo cuando aparezca ⭐</p>
        <div id="pulsoForma" style="font-size:5rem;cursor:pointer;margin:20px auto;">${f}</div>
      </div>`;
    document.getElementById("pulsoForma").addEventListener("click", () => {
      if (miToken !== token) return;
      if (f === "⭐") GameEngine.sumarPuntos(8); else GameEngine.restarVida();
      nuevoEstimulo();
    });
    setTimeout(() => { if (miToken === token) nuevoEstimulo(); }, 1000);
  }

  nuevoEstimulo();
})();
