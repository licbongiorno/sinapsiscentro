(function () {
  const contenedor = document.getElementById("jgContenedor");
  const FASES = ["Inhalá", "Sostené", "Exhalá", "Sostené"];
  const CICLOS = 5;
  let ciclo = 0, fase = 0, detenido = false;

  GameEngine.iniciar({ juegoId: "respiracion-cuadrada", vidas: null, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div style="text-align:center;padding:10px 0 30px;">
      <div style="width:180px;height:180px;margin:0 auto 24px;position:relative;">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <rect x="10" y="10" width="160" height="160" rx="20" fill="none" stroke="var(--teal-pale)" stroke-width="6"/>
          <circle id="puntoCuadrado" cx="10" cy="10" r="9" fill="var(--teal-mid)"/>
        </svg>
      </div>
      <p id="textoCuadrado" style="font-size:1.2rem;font-weight:800;color:var(--navy);">Preparate…</p>
      <p id="cicloCuadrado" style="color:var(--text-soft);font-size:0.82rem;margin-top:6px;">Ciclo 1 de ${CICLOS}</p>
      <button id="btnPararCuadrado" class="ge-btn ge-btn-secundario" style="margin-top:16px;">Terminar acá</button>
    </div>`;
  document.getElementById("btnPararCuadrado").addEventListener("click", () => {
    detenido = true;
    GameEngine.terminar({ puntaje: 0, exito: true, mensaje: `Completaste ${ciclo} ciclo(s) de respiración cuadrada. 🧘` });
  });

  const puntos = [[10, 10], [170, 10], [170, 170], [10, 170]];
  function mover(idx, dur) {
    const p = document.getElementById("puntoCuadrado");
    p.style.transition = `cx ${dur}s linear, cy ${dur}s linear`;
    p.setAttribute("cx", puntos[idx][0]);
    p.setAttribute("cy", puntos[idx][1]);
  }

  function siguienteFase() {
    if (detenido) return;
    if (ciclo >= CICLOS) { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Completaste la respiración cuadrada. 🧘" }); return; }
    document.getElementById("textoCuadrado").textContent = FASES[fase];
    mover(fase, 4);
    setTimeout(() => {
      fase = (fase + 1) % 4;
      if (fase === 0) { ciclo += 1; document.getElementById("cicloCuadrado").textContent = `Ciclo ${Math.min(ciclo + 1, CICLOS)} de ${CICLOS}`; }
      siguienteFase();
    }, 4000);
  }
  setTimeout(siguienteFase, 500);
})();
