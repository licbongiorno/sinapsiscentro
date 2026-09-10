(function () {
  const contenedor = document.getElementById("jgContenedor");
  const COLORES = [
    { hex: "#e06060", claro: "#ff9c9c" }, { hex: "#4caf6a", claro: "#8fe0a8" },
    { hex: "#2aaec2", claro: "#9de6f2" }, { hex: "#e0c040", claro: "#ffe08a" },
  ];
  let secuencia = [];
  let entrada = [];
  let mostrando = true;

  GameEngine.iniciar({ juegoId: "luces", vidas: 3, tiempoSegundos: null });

  function render() {
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;" id="luzTexto">${mostrando ? "Mirá la secuencia…" : "Repetila"}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:min(80vw,260px);margin:0 auto;">
        ${COLORES.map((c, i) => `<button data-i="${i}" id="luz${i}" style="aspect-ratio:1;border-radius:20px;border:none;background:${c.hex};cursor:pointer;opacity:0.55;transition:opacity 0.15s,transform 0.15s;" ${mostrando ? "disabled" : ""}></button>`).join("")}
      </div>`;
    if (!mostrando) {
      contenedor.querySelectorAll("[data-i]").forEach(btn => btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        flash(i, 150);
        entrada.push(i);
        const pos = entrada.length - 1;
        if (secuencia[pos] !== i) {
          GameEngine.restarVida();
          entrada = []; secuencia = [];
          setTimeout(siguienteNivel, 700);
          return;
        }
        if (entrada.length === secuencia.length) {
          GameEngine.sumarPuntos(secuencia.length * 4);
          setTimeout(siguienteNivel, 500);
        }
      }));
    }
  }

  function flash(i, ms = 400) {
    const el = document.getElementById(`luz${i}`);
    if (!el) return;
    el.style.opacity = "1";
    el.style.transform = "scale(1.06)";
    setTimeout(() => { el.style.opacity = "0.55"; el.style.transform = "scale(1)"; }, ms);
  }

  function siguienteNivel() {
    entrada = [];
    secuencia.push(Math.floor(Math.random() * COLORES.length));
    mostrando = true;
    render();
    let i = 0;
    const intervalo = setInterval(() => {
      flash(secuencia[i]);
      i += 1;
      if (i >= secuencia.length) {
        clearInterval(intervalo);
        setTimeout(() => { mostrando = false; render(); }, 500);
      }
    }, 650);
  }

  siguienteNivel();
})();
