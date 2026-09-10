(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CICLOS = 8;
  let ciclo = 0, detenido = false;

  GameEngine.iniciar({ juegoId: "la-ola", vidas: null, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div style="text-align:center;padding:10px 0 30px;">
      <svg id="svgOla" width="260" height="260" viewBox="0 0 260 260">
        <circle cx="130" cy="130" r="40" fill="var(--teal-mid)" id="puntoOla"/>
        <circle cx="130" cy="130" r="90" fill="none" stroke="var(--teal-pale)" stroke-width="2"/>
      </svg>
      <p id="textoOla" style="margin-top:10px;color:var(--text-mid);font-size:1rem;">Seguí el punto con la mirada, respirando a su ritmo…</p>
      <p id="cicloOla" style="color:var(--text-soft);font-size:0.8rem;margin-top:6px;">Ola 1 de ${CICLOS}</p>
      <button id="btnPararOla" class="ge-btn ge-btn-secundario" style="margin-top:16px;">Terminar acá</button>
    </div>`;

  const punto = document.getElementById("puntoOla");
  document.getElementById("btnPararOla").addEventListener("click", () => {
    detenido = true;
    GameEngine.terminar({ puntaje: 0, exito: true, mensaje: `Acompañaste ${ciclo} ola(s) de respiración. 🌊` });
  });

  function ola() {
    if (detenido) return;
    if (ciclo >= CICLOS) {
      GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Completaste el ejercicio de la ola. 🌊" });
      return;
    }
    document.getElementById("textoOla").textContent = "Inhalá mientras crece…";
    punto.setAttribute("r", "40");
    punto.style.transition = "r 4s ease-in-out";
    requestAnimationFrame(() => punto.setAttribute("r", "85"));
    setTimeout(() => {
      if (detenido) return;
      document.getElementById("textoOla").textContent = "Exhalá mientras baja…";
      punto.style.transition = "r 4.5s ease-in-out";
      requestAnimationFrame(() => punto.setAttribute("r", "40"));
      setTimeout(() => {
        ciclo += 1;
        document.getElementById("cicloOla").textContent = `Ola ${Math.min(ciclo + 1, CICLOS)} de ${CICLOS}`;
        ola();
      }, 4500);
    }, 4000);
  }

  setTimeout(ola, 500);
})();
