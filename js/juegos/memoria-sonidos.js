(function () {
  const contenedor = document.getElementById("jgContenedor");
  const TONOS = [{ hex: "#e06060", f: 330 }, { hex: "#4caf6a", f: 440 }, { hex: "#2aaec2", f: 550 }, { hex: "#e0c040", f: 660 }];
  let secuencia = [], entrada = [], mostrando = true;
  let ctx = null;

  GameEngine.iniciar({ juegoId: "memoria-sonidos", vidas: 3, tiempoSegundos: null });

  function tono(f) {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = f; g.gain.value = 0.07;
      o.connect(g).connect(ctx.destination); o.start();
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      o.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  }

  function render() {
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;">${mostrando ? "Escuchá la secuencia…" : "Repetila"}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;width:min(80vw,260px);margin:0 auto;">
        ${TONOS.map((t, i) => `<button data-i="${i}" id="tono${i}" style="aspect-ratio:1;border-radius:20px;border:none;background:${t.hex};opacity:0.55;cursor:pointer;transition:opacity .15s;" ${mostrando ? "disabled" : ""}></button>`).join("")}
      </div>`;
    if (!mostrando) {
      contenedor.querySelectorAll("[data-i]").forEach(btn => btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        pulso(i);
        entrada.push(i);
        const pos = entrada.length - 1;
        if (secuencia[pos] !== i) { GameEngine.restarVida(); entrada = []; secuencia = []; setTimeout(siguienteNivel, 700); return; }
        if (entrada.length === secuencia.length) { GameEngine.sumarPuntos(secuencia.length * 4); setTimeout(siguienteNivel, 500); }
      }));
    }
  }
  function pulso(i) {
    tono(TONOS[i].f);
    const el = document.getElementById(`tono${i}`);
    if (!el) return;
    el.style.opacity = "1"; setTimeout(() => el.style.opacity = "0.55", 250);
  }
  function siguienteNivel() {
    entrada = []; secuencia.push(Math.floor(Math.random() * TONOS.length));
    mostrando = true; render();
    let i = 0;
    const intervalo = setInterval(() => {
      pulso(secuencia[i]); i += 1;
      if (i >= secuencia.length) { clearInterval(intervalo); setTimeout(() => { mostrando = false; render(); }, 500); }
    }, 700);
  }
  siguienteNivel();
})();
