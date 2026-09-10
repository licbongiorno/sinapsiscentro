(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PLANTAS = ["🌱","🌿","🌸","🌷","🌻","🌳","🍄","🌵"];
  const CICLOS = 6;
  let ciclo = 0, detenido = false;
  let jardin = [];

  GameEngine.iniciar({ juegoId: "jardin-zen", vidas: null, tiempoSegundos: null });

  function render() {
    contenedor.innerHTML = `
      <div style="text-align:center;padding:10px 0 30px;">
        <div id="circuloZen" style="width:170px;height:170px;border-radius:50%;background:radial-gradient(circle,var(--teal-soft),var(--teal-mid));margin:0 auto 20px;display:flex;align-items:center;justify-content:center;transition:transform 4s ease-in-out;">
          <span id="textoZen" style="color:white;font-weight:800;">Inhalá…</span>
        </div>
        <div id="jardinVisual" style="min-height:60px;font-size:1.8rem;display:flex;justify-content:center;gap:6px;flex-wrap:wrap;max-width:280px;margin:0 auto 14px;">
          ${jardin.map(p => `<span>${p}</span>`).join("")}
        </div>
        <p style="color:var(--text-soft);font-size:0.82rem;">Cada respiración agrega algo a tu jardín — ${ciclo}/${CICLOS}</p>
        <button id="btnPararZen" class="ge-btn ge-btn-secundario" style="margin-top:16px;">Terminar acá</button>
      </div>`;
    document.getElementById("btnPararZen").addEventListener("click", () => {
      detenido = true;
      terminar();
    });
  }

  function terminar() {
    GameEngine.terminar({ puntaje: 0, exito: true, mensaje: `Cultivaste un jardín de ${jardin.length} elementos. 🌿` });
  }

  function ciclorespirar() {
    if (detenido) return;
    if (ciclo >= CICLOS) { terminar(); return; }
    render();
    const circulo = document.getElementById("circuloZen");
    const texto = document.getElementById("textoZen");
    circulo.style.transform = "scale(1.4)";
    texto.textContent = "Inhalá…";
    setTimeout(() => {
      if (detenido) return;
      circulo.style.transform = "scale(1)";
      texto.textContent = "Exhalá…";
      setTimeout(() => {
        if (detenido) return;
        jardin.push(PLANTAS[Math.floor(Math.random() * PLANTAS.length)]);
        ciclo += 1;
        ciclorespirar();
      }, 4200);
    }, 3800);
  }

  ciclorespirar();
})();
