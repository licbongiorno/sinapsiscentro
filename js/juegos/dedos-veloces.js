(function () {
  const contenedor = document.getElementById("jgContenedor");
  const N = 6;
  let nivel = 2, secuencia = [], entrada = [], mostrando = true;

  GameEngine.iniciar({ juegoId: "dedos-veloces", vidas: 3, tiempoSegundos: null });

  function grid(activo = -1) {
    let html = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:min(80vw,260px);margin:0 auto;">`;
    for (let i = 0; i < N; i++) html += `<button data-i="${i}" style="aspect-ratio:1;border-radius:14px;border:none;background:${i === activo ? "var(--teal-mid)" : "white"};border:2px solid var(--teal-pale);cursor:pointer;" ${mostrando ? "disabled" : ""}></button>`;
    return html + "</div>";
  }

  function siguienteNivel() {
    entrada = [];
    secuencia.push(Math.floor(Math.random() * N));
    mostrando = true;
    contenedor.innerHTML = `<p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">Nivel ${nivel - 1} — memorizá, cada vez más rápido</p>${grid()}`;
    let i = 0;
    const velocidad = Math.max(280, 650 - nivel * 25);
    const intervalo = setInterval(() => {
      contenedor.querySelector(`[data-i]`) && (contenedor.innerHTML = `<p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">Nivel ${nivel - 1}</p>${grid(secuencia[i])}`);
      i += 1;
      if (i >= secuencia.length) {
        clearInterval(intervalo);
        setTimeout(() => { mostrando = false; render(); }, 400);
      }
    }, velocidad);
  }

  function render() {
    contenedor.innerHTML = `<p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">Repetí el orden</p>${grid()}`;
    contenedor.querySelectorAll("[data-i]").forEach(btn => btn.addEventListener("click", () => {
      const i = Number(btn.dataset.i);
      entrada.push(i);
      const pos = entrada.length - 1;
      if (secuencia[pos] !== i) { GameEngine.restarVida(); nivel = 2; secuencia = []; setTimeout(siguienteNivel, 600); return; }
      if (entrada.length === secuencia.length) { GameEngine.sumarPuntos(nivel * 4); nivel += 1; setTimeout(siguienteNivel, 500); }
    }));
  }

  siguienteNivel();
})();
