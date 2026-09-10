(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 5;

  GameEngine.iniciar({ juegoId: "numero-objetivo", vidas: 3, tiempoSegundos: null });

  function generar() {
    const numeros = Array.from({ length: 4 }, () => 1 + Math.floor(Math.random() * 9));
    const objetivo = numeros[0] + numeros[1] * (Math.random() < 0.5 ? 1 : -1) + numeros[2];
    return { numeros, objetivo: Math.abs(objetivo) || numeros[0] + numeros[1] };
  }

  let numeros, objetivo, seleccion = [], operador = null;

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Alcanzaste todos los objetivos!" }); return; }
    const g = generar();
    numeros = g.numeros; objetivo = g.objetivo; seleccion = []; operador = null;
    render();
  }

  function render() {
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Ronda ${ronda} de ${TOTAL}</p>
        <p style="font-weight:800;color:var(--navy);margin-bottom:16px;">Combiná números para llegar a: <span style="color:var(--teal);font-size:1.3rem;">${objetivo}</span></p>
        <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-bottom:16px;">
          ${numeros.map((n, i) => `<button data-i="${i}" style="width:54px;height:54px;border-radius:14px;border:2px solid var(--teal-pale);background:${seleccion.includes(i) ? "var(--teal-mid)" : "white"};color:${seleccion.includes(i) ? "white" : "var(--navy)"};font-weight:800;font-size:1.2rem;cursor:pointer;">${n}</button>`).join("")}
        </div>
        <div style="display:flex;justify-content:center;gap:8px;margin-bottom:16px;">
          ${["+", "-", "×"].map(op => `<button data-op="${op}" style="width:44px;height:44px;border-radius:10px;border:2px solid var(--teal-pale);background:${operador === op ? "var(--teal-mid)" : "white"};color:${operador === op ? "white" : "var(--navy)"};font-weight:800;cursor:pointer;">${op}</button>`).join("")}
        </div>
        <button id="btnReiniciarNO" class="ge-btn ge-btn-secundario">Reiniciar ronda</button>
      </div>`;
    contenedor.querySelectorAll("[data-i]").forEach(btn => btn.addEventListener("click", () => {
      const i = Number(btn.dataset.i);
      if (seleccion.includes(i)) { seleccion = seleccion.filter(x => x !== i); render(); return; }
      seleccion.push(i);
      if (seleccion.length === 2 && operador) combinar();
      render();
    }));
    contenedor.querySelectorAll("[data-op]").forEach(btn => btn.addEventListener("click", () => {
      operador = btn.dataset.op;
      if (seleccion.length === 2) combinar();
      render();
    }));
    document.getElementById("btnReiniciarNO").addEventListener("click", () => { seleccion = []; operador = null; render(); });
  }

  function combinar() {
    const [a, b] = seleccion.map(i => numeros[i]);
    let resultado;
    if (operador === "+") resultado = a + b;
    else if (operador === "-") resultado = Math.abs(a - b);
    else resultado = a * b;
    numeros = numeros.filter((_, i) => !seleccion.includes(i));
    numeros.push(resultado);
    seleccion = []; operador = null;
    if (numeros.length === 1) {
      if (numeros[0] === objetivo) { GameEngine.sumarPuntos(20); setTimeout(nuevaRonda, 500); }
      else { GameEngine.restarVida(); setTimeout(nuevaRonda, 500); }
      return;
    }
    render();
  }

  nuevaRonda();
})();
