(function () {
  const contenedor = document.getElementById("jgContenedor");
  const MAPAS = [
    [
      "#######",
      "#S....#",
      "#.###.#",
      "#...#.#",
      "###.#.#",
      "#...#.#",
      "#.###E#",
      "#######",
    ],
    [
      "#######",
      "#S....#",
      "#####.#",
      "#.....#",
      "#.#####",
      "#.....#",
      "#####E#",
      "#######",
    ],
  ];
  const mapa = MAPAS[Math.floor(Math.random() * MAPAS.length)];
  let jugador = { x: 0, y: 0 };
  mapa.forEach((fila, y) => { const x = fila.indexOf("S"); if (x >= 0) jugador = { x, y }; });
  let pasos = 0;

  GameEngine.iniciar({ juegoId: "laberinto", vidas: null, tiempoSegundos: null });

  function esLibre(x, y) {
    if (y < 0 || y >= mapa.length || x < 0 || x >= mapa[0].length) return false;
    return mapa[y][x] !== "#";
  }

  function mover(dx, dy) {
    const nx = jugador.x + dx, ny = jugador.y + dy;
    if (!esLibre(nx, ny)) return;
    jugador = { x: nx, y: ny };
    pasos += 1;
    if (mapa[ny][nx] === "E") {
      GameEngine.sumarPuntos(Math.max(20, 80 - pasos * 2));
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: `¡Encontraste la salida en ${pasos} pasos!` });
      return;
    }
    render();
  }

  function render() {
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <div style="display:inline-grid;grid-template-columns:repeat(${mapa[0].length}, 1fr);gap:2px;margin:0 auto 20px;">
          ${mapa.map((fila, y) => fila.split("").map((c, x) => {
            const esJugador = x === jugador.x && y === jugador.y;
            let contenido = "", fondo = "var(--bg)";
            if (c === "#") fondo = "var(--teal-deep)";
            if (c === "E") { contenido = "🚩"; fondo = "#d6f5df"; }
            if (esJugador) contenido = "🧍";
            return `<div style="width:34px;height:34px;background:${fondo};display:flex;align-items:center;justify-content:center;font-size:1rem;border-radius:4px;">${contenido}</div>`;
          }).join("")).join("")}
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,50px);gap:6px;justify-content:center;">
          <div></div>
          <button data-dx="0" data-dy="-1" class="jg-flecha">↑</button>
          <div></div>
          <button data-dx="-1" data-dy="0" class="jg-flecha">←</button>
          <button data-dx="0" data-dy="1" class="jg-flecha">↓</button>
          <button data-dx="1" data-dy="0" class="jg-flecha">→</button>
        </div>
      </div>
      <style>.jg-flecha{width:50px;height:50px;border-radius:12px;border:none;background:white;border:2px solid var(--teal-pale);font-size:1.3rem;cursor:pointer;}</style>`;
    contenedor.querySelectorAll(".jg-flecha").forEach(btn =>
      btn.addEventListener("click", () => mover(Number(btn.dataset.dx), Number(btn.dataset.dy))));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") mover(0, -1);
    if (e.key === "ArrowDown") mover(0, 1);
    if (e.key === "ArrowLeft") mover(-1, 0);
    if (e.key === "ArrowRight") mover(1, 0);
  });

  render();
})();
