(function () {
  const contenedor = document.getElementById("jgContenedor");
  const COLOR_OBJETIVO = { nombre: "verde", hex: "#4caf6a" };
  const OTROS = [{ hex: "#e06060" }, { hex: "#e0c040" }, { hex: "#2aaec2" }, { hex: "#c98ac2" }];

  GameEngine.iniciar({ juegoId: "caza-burbujas", vidas: 3, tiempoSegundos: 40 });

  contenedor.innerHTML = `
    <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:8px;">Explotá sólo las burbujas <b style="color:${COLOR_OBJETIVO.hex}">verdes</b></p>
    <div id="zonaBurbujas" style="position:relative;width:min(94vw,420px);height:60vh;max-height:460px;margin:0 auto;background:linear-gradient(180deg,#eaf7fa,#f5fafc);border-radius:var(--r-lg);overflow:hidden;border:2px solid var(--teal-pale);"></div>`;
  const zona = document.getElementById("zonaBurbujas");
  let activo = true;

  function crearBurbuja() {
    if (!activo) return;
    const esObjetivo = Math.random() < 0.4;
    const color = esObjetivo ? COLOR_OBJETIVO.hex : OTROS[Math.floor(Math.random() * OTROS.length)].hex;
    const tam = 40 + Math.random() * 30;
    const b = document.createElement("div");
    b.style.cssText = `position:absolute;bottom:-${tam}px;left:${Math.random() * 85}%;width:${tam}px;height:${tam}px;border-radius:50%;background:${color};opacity:0.85;box-shadow:0 4px 12px rgba(0,0,0,0.15);cursor:pointer;transition:bottom 3.2s linear, transform 0.15s;`;
    zona.appendChild(b);
    requestAnimationFrame(() => { b.style.bottom = "105%"; });
    b.addEventListener("click", () => {
      if (color === COLOR_OBJETIVO.hex) {
        GameEngine.sumarPuntos(8);
      } else {
        GameEngine.restarVida();
      }
      b.style.transform = "scale(0)";
      setTimeout(() => b.remove(), 150);
    });
    setTimeout(() => b.remove(), 3400);
  }

  const intervalo = setInterval(crearBurbuja, 650);

  const terminarOriginal = GameEngine.terminar;
  GameEngine.terminar = function (...args) {
    activo = false;
    clearInterval(intervalo);
    GameEngine.terminar = terminarOriginal;
    GameEngine.terminar(...args);
  };
})();
