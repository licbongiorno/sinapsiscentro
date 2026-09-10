(function () {
  const contenedor = document.getElementById("jgContenedor");
  // Sudoku 4x4 resuelto de base; se ocultan algunas celdas.
  const SOLUCION = [
    [1, 2, 3, 4],
    [3, 4, 1, 2],
    [2, 1, 4, 3],
    [4, 3, 2, 1],
  ];
  const oculto = new Set();
  while (oculto.size < 7) oculto.add(Math.floor(Math.random() * 16));

  GameEngine.iniciar({ juegoId: "sudoku-mini", vidas: 3, tiempoSegundos: null });

  const valores = {};
  function render() {
    let html = `<p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">Completá para que cada fila, columna y cuadrante 2×2 tenga los números 1 al 4, sin repetir.</p>`;
    html += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;width:min(80vw,260px);margin:0 auto 20px;">`;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const idx = r * 4 + c;
        const fijo = !oculto.has(idx);
        const val = fijo ? SOLUCION[r][c] : (valores[idx] || "");
        html += `<button data-idx="${idx}" ${fijo ? "disabled" : ""} style="aspect-ratio:1;border-radius:8px;border:2px solid var(--teal-pale);background:${fijo ? "var(--teal-pale)" : "white"};font-weight:800;font-size:1.1rem;cursor:${fijo ? "default" : "pointer"};">${val}</button>`;
      }
    }
    html += `</div><button id="btnRevisarSudoku" class="ge-btn ge-btn-principal" style="display:block;margin:0 auto;">Revisar</button>`;
    contenedor.innerHTML = html;
    contenedor.querySelectorAll("[data-idx]:not([disabled])").forEach(btn => btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      valores[idx] = ((valores[idx] || 0) % 4) + 1;
      render();
    }));
    document.getElementById("btnRevisarSudoku").addEventListener("click", revisar);
  }

  function revisar() {
    let ok = true;
    oculto.forEach(idx => {
      const r = Math.floor(idx / 4), c = idx % 4;
      if (valores[idx] !== SOLUCION[r][c]) ok = false;
    });
    if (ok) GameEngine.terminar({ puntaje: 40, exito: true, mensaje: "¡Sudoku resuelto!" });
    else { GameEngine.restarVida(); }
  }

  render();
})();
