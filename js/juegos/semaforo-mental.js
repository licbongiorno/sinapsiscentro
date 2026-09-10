(function () {
  const contenedor = document.getElementById("jgContenedor");
  const COLORES = [{ n: "rojo", h: "#e06060" }, { n: "verde", h: "#4caf6a" }, { n: "azul", h: "#2aaec2" }, { n: "amarillo", h: "#e0c040" }];
  let objetivo = COLORES[1];
  let contadorRonda = 0;

  GameEngine.iniciar({ juegoId: "semaforo-mental", vidas: 3, tiempoSegundos: 45 });

  let token = 0;
  function nuevoEstimulo() {
    contadorRonda += 1;
    token += 1;
    const miToken = token;
    if (contadorRonda % 5 === 0) objetivo = COLORES[Math.floor(Math.random() * COLORES.length)];
    const mostrado = Math.random() < 0.4 ? objetivo : COLORES[Math.floor(Math.random() * COLORES.length)];
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Tocá sólo cuando el círculo sea <b style="color:${objetivo.h}">${objetivo.n}</b></p>
        <div id="circuloSem" style="width:180px;height:180px;border-radius:50%;background:${mostrado.h};margin:20px auto;cursor:pointer;"></div>
      </div>`;
    document.getElementById("circuloSem").addEventListener("click", () => {
      if (miToken !== token) return;
      if (mostrado.n === objetivo.n) { GameEngine.sumarPuntos(8); } else { GameEngine.restarVida(); }
      nuevoEstimulo();
    });
    setTimeout(() => { if (miToken === token) nuevoEstimulo(); }, 1400);
  }

  nuevoEstimulo();
})();
