(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CICLOS = 6;
  const FASES = [
    { texto: "Inhalá…", segundos: 4, escala: 1.5 },
    { texto: "Sostené…", segundos: 4, escala: 1.5 },
    { texto: "Exhalá…", segundos: 5, escala: 1 },
  ];
  let ciclo = 0, faseIdx = 0;

  GameEngine.iniciar({ juegoId: "respira", vidas: null, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;padding:20px 0 40px;">
      <div id="circuloRespiro" style="width:180px;height:180px;border-radius:50%;background:radial-gradient(circle, var(--teal-soft), var(--teal-mid));transition:transform 4s ease-in-out;display:flex;align-items:center;justify-content:center;box-shadow:0 20px 50px rgba(42,174,194,0.3);">
        <span id="textoFase" style="color:white;font-weight:800;font-size:1.1rem;text-align:center;">Preparate…</span>
      </div>
      <p id="cicloTexto" style="margin-top:24px;color:var(--text-mid);font-size:0.9rem;">Ciclo 1 de ${CICLOS}</p>
      <button id="btnParar" class="ge-btn ge-btn-secundario" style="margin-top:20px;">Terminar acá</button>
    </div>`;

  const circulo = document.getElementById("circuloRespiro");
  const textoFase = document.getElementById("textoFase");
  const cicloTexto = document.getElementById("cicloTexto");
  let detenido = false;

  document.getElementById("btnParar").addEventListener("click", () => {
    detenido = true;
    GameEngine.terminar({ puntaje: 0, exito: true, mensaje: `Respiraste conscientemente durante ${ciclo} ciclo(s). 🧘` });
  });

  function siguienteFase() {
    if (detenido) return;
    if (ciclo >= CICLOS) {
      GameEngine.terminar({ puntaje: 0, exito: true, mensaje: `Completaste ${CICLOS} ciclos de respiración. 🧘` });
      return;
    }
    const fase = FASES[faseIdx];
    textoFase.textContent = fase.texto;
    circulo.style.transform = `scale(${fase.escala})`;
    circulo.style.transitionDuration = `${fase.segundos}s`;
    setTimeout(() => {
      faseIdx += 1;
      if (faseIdx >= FASES.length) { faseIdx = 0; ciclo += 1; cicloTexto.textContent = `Ciclo ${Math.min(ciclo + 1, CICLOS)} de ${CICLOS}`; }
      siguienteFase();
    }, fase.segundos * 1000);
  }

  setTimeout(siguienteFase, 600);
})();
