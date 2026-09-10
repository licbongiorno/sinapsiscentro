(function () {
  const contenedor = document.getElementById("jgContenedor");
  let torres = [[3, 2, 1], [], []];
  let seleccion = null;
  let movimientos = 0;
  const MIN_MOVS = 7;

  GameEngine.iniciar({ juegoId: "torres", vidas: null, tiempoSegundos: null });

  const COLORES = { 1: "#e06060", 2: "#e0c040", 3: "#2aaec2" };
  const ANCHOS = { 1: 40, 2: 60, 3: 80 };

  function render() {
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Movés el disco de arriba de una torre a otra. No podés poner un disco grande sobre uno chico.</p>
      <p style="text-align:center;color:var(--text-soft);font-size:0.8rem;margin-bottom:16px;">Movimientos: ${movimientos} (mínimo posible: ${MIN_MOVS})</p>
      <div style="display:flex;justify-content:center;gap:20px;align-items:flex-end;height:160px;">
        ${torres.map((t, i) => `
          <div data-t="${i}" style="width:100px;height:160px;display:flex;flex-direction:column-reverse;align-items:center;justify-content:flex-start;border-bottom:4px solid var(--teal-deep);cursor:pointer;background:${seleccion === i ? "rgba(42,174,194,0.1)" : "transparent"};border-radius:8px;">
            ${t.map(d => `<div style="width:${ANCHOS[d]}px;height:22px;background:${COLORES[d]};border-radius:6px;margin-bottom:3px;"></div>`).join("")}
          </div>`).join("")}
      </div>`;
    contenedor.querySelectorAll("[data-t]").forEach(el => el.addEventListener("click", () => clicTorre(Number(el.dataset.t))));
  }

  function clicTorre(i) {
    if (seleccion === null) {
      if (torres[i].length === 0) return;
      seleccion = i; render();
      return;
    }
    if (seleccion === i) { seleccion = null; render(); return; }
    const origen = torres[seleccion], destino = torres[i];
    const disco = origen[origen.length - 1];
    if (destino.length === 0 || destino[destino.length - 1] > disco) {
      origen.pop(); destino.push(disco);
      movimientos += 1;
      seleccion = null;
      if (torres[2].length === 3) {
        GameEngine.sumarPuntos(Math.max(10, 60 - movimientos * 3));
        setTimeout(() => GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: `¡Resuelto en ${movimientos} movimientos!` }), 300);
      }
      render();
    } else {
      seleccion = null; render();
    }
  }

  render();
})();
