(function () {
  const contenedor = document.getElementById("jgContenedor");
  const N = 4;
  let camino = [], entrada = [], mostrando = true;

  GameEngine.iniciar({ juegoId: "camino-memoria", vidas: 3, tiempoSegundos: null });

  function grid(activos = [], clase = "") {
    let html = `<div style="display:grid;grid-template-columns:repeat(${N},1fr);gap:6px;width:min(80vw,280px);margin:0 auto;">`;
    for (let i = 0; i < N * N; i++) {
      const on = activos.includes(i);
      html += `<button data-i="${i}" style="aspect-ratio:1;border-radius:8px;border:2px solid var(--teal-pale);background:${on ? "var(--teal-mid)" : "white"};cursor:pointer;" ${clase}></button>`;
    }
    return html + "</div>";
  }

  function render(activos = [], habilitado = false) {
    contenedor.innerHTML = `<p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">${mostrando ? "Memorizá el camino…" : "Repetilo tocando las celdas en orden"}</p>${grid(activos)}`;
    if (habilitado) {
      contenedor.querySelectorAll("[data-i]").forEach(btn => btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        entrada.push(i);
        btn.style.background = "var(--teal-soft)";
        const pos = entrada.length - 1;
        if (camino[pos] !== i) { GameEngine.restarVida(); camino = []; setTimeout(siguienteNivel, 700); return; }
        if (entrada.length === camino.length) { GameEngine.sumarPuntos(camino.length * 5); setTimeout(siguienteNivel, 500); }
      }));
    }
  }

  function siguienteNivel() {
    entrada = [];
    if (camino.length === 0) camino = [];
    let nuevo;
    do { nuevo = Math.floor(Math.random() * N * N); } while (camino.includes(nuevo));
    camino.push(nuevo);
    mostrando = true;
    render(camino);
    setTimeout(() => { mostrando = false; entrada = []; render([], true); }, 900 + camino.length * 500);
  }

  siguienteNivel();
})();
