(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "cuenta-regresiva", vidas: 3, tiempoSegundos: null });
  let intervaloBarra = null;

  function ronda() {
    const a = 1 + Math.floor(Math.random() * 20), b = 1 + Math.floor(Math.random() * 20);
    const resultado = a + b;
    const opciones = new Set([resultado]);
    while (opciones.size < 3) opciones.add(resultado + (Math.floor(Math.random() * 8) - 4));
    let restante = 100;
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <div style="height:8px;background:var(--teal-pale);border-radius:8px;overflow:hidden;margin-bottom:20px;width:min(90vw,300px);margin-left:auto;margin-right:auto;">
          <div id="barraCR" style="height:100%;width:100%;background:var(--teal-mid);transform-origin:left;transition:transform 0.1s linear;"></div>
        </div>
        <div style="font-size:2rem;font-weight:800;color:var(--navy);margin-bottom:22px;">${a} + ${b}</div>
        <div class="jg-opciones">${[...opciones].sort(() => Math.random() - 0.5).map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
      </div>`;
    clearInterval(intervaloBarra);
    intervaloBarra = setInterval(() => {
      restante -= 2;
      const barra = document.getElementById("barraCR");
      if (!barra) { clearInterval(intervaloBarra); return; }
      barra.style.transform = `scaleX(${Math.max(0, restante) / 100})`;
      if (restante <= 0) {
        clearInterval(intervaloBarra);
        GameEngine.restarVida();
        ronda();
      }
    }, 100);
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      clearInterval(intervaloBarra);
      if (Number(btn.dataset.v) === resultado) GameEngine.sumarPuntos(10); else GameEngine.restarVida();
      ronda();
    }));
  }

  ronda();
})();
