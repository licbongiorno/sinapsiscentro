(function () {
  const contenedor = document.getElementById("jgContenedor");
  const COLORES = [{ n: "verde", h: "#4caf6a" }, { n: "azul", h: "#2aaec2" }, { n: "amarillo", h: "#e0c040" }, { n: "violeta", h: "#c98ac2" }];
  let objetivo = COLORES[0];
  let contador = 0;
  let token = 0;

  GameEngine.iniciar({ juegoId: "cambio-inesperado", vidas: 3, tiempoSegundos: 40 });

  function avisoCambio() {
    const banner = document.createElement("div");
    banner.textContent = `¡Nuevo objetivo: ${objetivo.n}!`;
    banner.style.cssText = `position:fixed;top:76px;left:50%;transform:translateX(-50%);background:var(--navy);color:white;padding:8px 18px;border-radius:50px;font-weight:700;font-size:0.85rem;z-index:600;`;
    document.body.appendChild(banner);
    setTimeout(() => banner.remove(), 1200);
  }

  function nuevoEstimulo() {
    token += 1;
    const miToken = token;
    contador += 1;
    if (contador > 1 && Math.random() < 0.25) {
      let nuevo; do { nuevo = COLORES[Math.floor(Math.random() * COLORES.length)]; } while (nuevo.n === objetivo.n);
      objetivo = nuevo;
      avisoCambio();
    }
    const mostrado = Math.random() < 0.4 ? objetivo : COLORES[Math.floor(Math.random() * COLORES.length)];
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Tocá sólo cuando sea <b style="color:${objetivo.h}">${objetivo.n}</b> — el objetivo puede cambiar sin avisar mucho</p>
        <div id="estCambio" style="width:170px;height:170px;border-radius:50%;background:${mostrado.h};margin:20px auto;cursor:pointer;"></div>
      </div>`;
    document.getElementById("estCambio").addEventListener("click", () => {
      if (miToken !== token) return;
      if (mostrado.n === objetivo.n) GameEngine.sumarPuntos(8); else GameEngine.restarVida();
      nuevoEstimulo();
    });
    setTimeout(() => { if (miToken === token) nuevoEstimulo(); }, 1200);
  }

  nuevoEstimulo();
})();
