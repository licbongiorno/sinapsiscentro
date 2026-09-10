(function () {
  const contenedor = document.getElementById("jgContenedor");
  const COLORES = [{ h: "#e06060", esRojo: true }, { h: "#4caf6a" }, { h: "#2aaec2" }, { h: "#e0c040" }, { h: "#c98ac2" }];
  GameEngine.iniciar({ juegoId: "no-toques-rojo", vidas: 3, tiempoSegundos: 40 });
  let token = 0;

  function nuevoEstimulo() {
    token += 1;
    const miToken = token;
    const c = COLORES[Math.floor(Math.random() * COLORES.length)];
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Tocá todos los círculos, MENOS los rojos</p>
        <div id="circuloNR" style="width:170px;height:170px;border-radius:50%;background:${c.h};margin:20px auto;cursor:pointer;"></div>
      </div>`;
    document.getElementById("circuloNR").addEventListener("click", () => {
      if (miToken !== token) return;
      if (c.esRojo) GameEngine.restarVida(); else GameEngine.sumarPuntos(6);
      nuevoEstimulo();
    });
    setTimeout(() => { if (miToken === token) nuevoEstimulo(); }, 1100);
  }

  nuevoEstimulo();
})();
