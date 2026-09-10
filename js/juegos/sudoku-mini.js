(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "sudoku-mini", vidas: 3, tiempoSegundos: null });

  const BASE = [[1, 2, 3, 4], [3, 4, 1, 2], [2, 1, 4, 3], [4, 3, 2, 1]];
  function transponer(m) { return m[0].map((_, c) => m.map(f => f[c])); }

  // Genera un sudoku 4x4 válido nuevo a partir de la base, combinando al azar
  // operaciones que preservan la validez (relabeling de dígitos, intercambio
  // de filas/columnas dentro de una banda, intercambio de bandas, transposición).
  // Con estas combinaciones el resultado visual cambia muchísimo entre partidas.
  function generarSudoku() {
    const digitos = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
    let g = BASE.map(f => f.map(v => digitos[v - 1]));
    if (Math.random() < 0.5) [g[0], g[1]] = [g[1], g[0]];
    if (Math.random() < 0.5) [g[2], g[3]] = [g[3], g[2]];
    if (Math.random() < 0.5) [g[0], g[1], g[2], g[3]] = [g[2], g[3], g[0], g[1]];
    g = transponer(g);
    if (Math.random() < 0.5) [g[0], g[1]] = [g[1], g[0]];
    if (Math.random() < 0.5) [g[2], g[3]] = [g[3], g[2]];
    if (Math.random() < 0.5) [g[0], g[1], g[2], g[3]] = [g[2], g[3], g[0], g[1]];
    g = transponer(g);
    if (Math.random() < 0.5) g = transponer(g);
    return g;
  }

  const RONDAS = [6, 8, 9]; // celdas ocultas por ronda (dificultad creciente)
  let ronda = 0;
  let SOLUCION, oculto, valores, seleccionada;

  function valorEn(idx) {
    const r = Math.floor(idx / 4), c = idx % 4;
    if (!oculto.has(idx)) return SOLUCION[r][c];
    return valores[idx] || null;
  }

  function tieneConflicto(idx) {
    const val = valorEn(idx);
    if (!val) return false;
    const r = Math.floor(idx / 4), c = idx % 4;
    for (let cc = 0; cc < 4; cc++) if (cc !== c && valorEn(r * 4 + cc) === val) return true;
    for (let rr = 0; rr < 4; rr++) if (rr !== r && valorEn(rr * 4 + c) === val) return true;
    const br = Math.floor(r / 2) * 2, bc = Math.floor(c / 2) * 2;
    for (let rr = br; rr < br + 2; rr++) for (let cc = bc; cc < bc + 2; cc++) {
      const i2 = rr * 4 + cc;
      if (i2 !== idx && valorEn(i2) === val) return true;
    }
    return false;
  }

  function nuevaRonda() {
    if (ronda >= RONDAS.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Resolviste los tres sudokus!" });
      return;
    }
    SOLUCION = generarSudoku();
    oculto = new Set();
    while (oculto.size < RONDAS[ronda]) oculto.add(Math.floor(Math.random() * 16));
    valores = {};
    seleccionada = null;
    render();
  }

  function render() {
    let html = `<p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:4px;">Ronda ${ronda + 1} de ${RONDAS.length}</p>`;
    html += `<p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">Sin repetir en filas, columnas ni cuadrantes 2×2</p>`;
    html += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;width:min(72vw,220px);margin:0 auto 18px;">`;
    for (let idx = 0; idx < 16; idx++) {
      const r = Math.floor(idx / 4), c = idx % 4;
      const fijo = !oculto.has(idx);
      const val = fijo ? SOLUCION[r][c] : (valores[idx] || "");
      const mal = !fijo && val && tieneConflicto(idx);
      const activa = seleccionada === idx;
      const borde = activa ? "var(--teal-mid)" : mal ? "#e06060" : "var(--teal-pale)";
      const fondo = fijo ? "var(--teal-pale)" : mal ? "#ffe0e0" : "white";
      html += `<button data-idx="${idx}" ${fijo ? "disabled" : ""} style="aspect-ratio:1;border-radius:8px;border:2px solid ${borde};background:${fondo};font-weight:800;font-size:1.1rem;cursor:${fijo ? "default" : "pointer"};">${val}</button>`;
    }
    html += `</div>`;
    html += `<div style="display:flex;justify-content:center;gap:8px;margin-bottom:18px;">`;
    html += [1, 2, 3, 4].map(n => `<button data-num="${n}" style="width:46px;height:46px;border-radius:10px;border:2px solid var(--teal-pale);background:white;font-weight:800;font-size:1.15rem;cursor:pointer;">${n}</button>`).join("");
    html += `<button data-num="0" style="width:46px;height:46px;border-radius:10px;border:2px solid var(--teal-pale);background:white;font-size:1.1rem;cursor:pointer;">⌫</button>`;
    html += `</div>`;
    html += `<button id="btnRevisarSudoku" class="ge-btn ge-btn-principal" style="display:block;margin:0 auto;">Revisar</button>`;
    contenedor.innerHTML = html;

    contenedor.querySelectorAll("[data-idx]:not([disabled])").forEach(btn => btn.addEventListener("click", () => {
      seleccionada = Number(btn.dataset.idx);
      render();
    }));
    contenedor.querySelectorAll("[data-num]").forEach(btn => btn.addEventListener("click", () => {
      if (seleccionada === null) return;
      const n = Number(btn.dataset.num);
      if (n === 0) delete valores[seleccionada]; else valores[seleccionada] = n;
      render();
    }));
    document.getElementById("btnRevisarSudoku").addEventListener("click", revisar);
  }

  function revisar() {
    let completo = true, correcto = true;
    oculto.forEach(idx => {
      const r = Math.floor(idx / 4), c = idx % 4;
      if (!valores[idx]) completo = false;
      if (valores[idx] !== SOLUCION[r][c]) correcto = false;
    });
    if (!completo) { render(); return; }
    if (correcto) {
      GameEngine.sumarPuntos(15 + ronda * 5);
      ronda += 1;
      setTimeout(nuevaRonda, 500);
    } else {
      GameEngine.restarVida();
    }
  }

  nuevaRonda();
})();
