(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "laberinto", vidas: null, tiempoSegundos: null });

  const NIVELES = [5, 6, 7, 8]; // celdas por lado en cada nivel (crece = más difícil)
  let nivel = 0;
  let mapa, jugador, pasosNivel, puntajeTotal = 0;

  // Genera un laberinto "perfecto" (un único camino posible entre dos puntos
  // cualesquiera) con búsqueda en profundidad, y ubica la meta en la celda
  // más lejana del inicio para que el recorrido tenga sentido.
  function generarLaberinto(n) {
    const visitado = Array.from({ length: n }, () => Array(n).fill(false));
    const ancho = 2 * n + 1, alto = 2 * n + 1;
    const grilla = Array.from({ length: alto }, () => Array(ancho).fill("#"));

    function carvar(cx, cy) {
      visitado[cy][cx] = true;
      grilla[2 * cy + 1][2 * cx + 1] = ".";
      const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]].sort(() => Math.random() - 0.5);
      for (const [dx, dy] of dirs) {
        const nx = cx + dx, ny = cy + dy;
        if (nx >= 0 && ny >= 0 && nx < n && ny < n && !visitado[ny][nx]) {
          grilla[2 * cy + 1 + dy][2 * cx + 1 + dx] = ".";
          carvar(nx, ny);
        }
      }
    }
    carvar(0, 0);

    // BFS desde el inicio para encontrar la celda más lejana (ahí va la meta)
    const distancias = new Map();
    const inicioKey = "1,1";
    distancias.set(inicioKey, 0);
    let cola = [[1, 1]];
    let lejano = [1, 1];
    while (cola.length) {
      const [x, y] = cola.shift();
      const d = distancias.get(`${x},${y}`);
      if (d > distancias.get(`${lejano[0]},${lejano[1]}`)) lejano = [x, y];
      for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) {
        const nx = x + dx, ny = y + dy;
        const key = `${nx},${ny}`;
        if (nx >= 0 && ny >= 0 && nx < ancho && ny < alto && grilla[ny][nx] !== "#" && !distancias.has(key)) {
          distancias.set(key, d + 1);
          cola.push([nx, ny]);
        }
      }
    }
    grilla[1][1] = "S";
    grilla[lejano[1]][lejano[0]] = "E";
    return grilla.map(fila => fila.join(""));
  }

  function nuevoNivel() {
    if (nivel >= NIVELES.length) {
      GameEngine.terminar({ puntaje: puntajeTotal, exito: true, mensaje: `¡Completaste los ${NIVELES.length} laberintos!` });
      return;
    }
    mapa = generarLaberinto(NIVELES[nivel]);
    jugador = { x: 1, y: 1 };
    pasosNivel = 0;
    render();
  }

  function esLibre(x, y) {
    if (y < 0 || y >= mapa.length || x < 0 || x >= mapa[0].length) return false;
    return mapa[y][x] !== "#";
  }

  function mover(dx, dy) {
    const nx = jugador.x + dx, ny = jugador.y + dy;
    if (!esLibre(nx, ny)) return;
    jugador = { x: nx, y: ny };
    pasosNivel += 1;
    if (mapa[ny][nx] === "E") {
      const puntos = Math.max(15, 60 - pasosNivel);
      puntajeTotal += puntos;
      GameEngine.sumarPuntos(puntos);
      nivel += 1;
      setTimeout(nuevoNivel, 700);
      return;
    }
    render();
  }

  function render() {
    const grande = mapa[0].length > 13;
    const tam = grande ? 22 : mapa[0].length > 9 ? 26 : 34;
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Nivel ${nivel + 1} de ${NIVELES.length} · ${pasosNivel} pasos</p>
        <div style="display:inline-grid;grid-template-columns:repeat(${mapa[0].length}, 1fr);gap:2px;margin:0 auto 20px;">
          ${mapa.map((fila, y) => fila.split("").map((c, x) => {
            const esJugador = x === jugador.x && y === jugador.y;
            let contenido = "", fondo = "var(--bg)";
            if (c === "#") fondo = "var(--teal-deep)";
            if (c === "E") { contenido = "🚩"; fondo = "#d6f5df"; }
            if (esJugador) contenido = "🧍";
            return `<div style="width:${tam}px;height:${tam}px;background:${fondo};display:flex;align-items:center;justify-content:center;font-size:${grande ? 0.7 : 1}rem;border-radius:3px;">${contenido}</div>`;
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

  nuevoNivel();
})();
