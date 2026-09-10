(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "garabato", vidas: null, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div style="text-align:center;">
      <p style="color:var(--text-mid);margin-bottom:10px;font-size:0.9rem;">Partiendo de este garabato, convertilo en algo reconocible.</p>
      <canvas id="lienzoGarabato" width="300" height="300" style="background:white;border-radius:var(--r-lg);border:2px solid var(--teal-pale);touch-action:none;max-width:90vw;"></canvas>
      <div style="display:flex;gap:10px;justify-content:center;margin-top:14px;">
        <button id="btnLimpiarGar" class="ge-btn ge-btn-secundario">Reiniciar garabato</button>
        <button id="btnListoGar" class="ge-btn ge-btn-principal">Listo</button>
      </div>
    </div>`;

  const canvas = document.getElementById("lienzoGarabato");
  const ctx = canvas.getContext("2d");

  function dibujarGarabatoBase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#7ed6e4"; ctx.lineWidth = 3; ctx.beginPath();
    ctx.moveTo(40 + Math.random() * 40, 150);
    for (let i = 0; i < 5; i++) ctx.quadraticCurveTo(60 + Math.random() * 180, 40 + Math.random() * 220, 60 + Math.random() * 180, 40 + Math.random() * 220);
    ctx.stroke();
  }
  dibujarGarabatoBase();

  ctx.lineWidth = 4; ctx.lineCap = "round"; ctx.strokeStyle = "#0d2535";
  let dibujando = false, trazos = 0;
  function pos(e) {
    const r = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: (p.clientX - r.left) * (canvas.width / r.width), y: (p.clientY - r.top) * (canvas.height / r.height) };
  }
  function empezar(e) { dibujando = true; trazos += 1; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); e.preventDefault(); }
  function dibujar(e) { if (!dibujando) return; const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); }
  function fin() { dibujando = false; }
  canvas.addEventListener("mousedown", empezar); canvas.addEventListener("mousemove", dibujar); window.addEventListener("mouseup", fin);
  canvas.addEventListener("touchstart", empezar, { passive: false }); canvas.addEventListener("touchmove", dibujar, { passive: false }); canvas.addEventListener("touchend", fin);

  document.getElementById("btnLimpiarGar").addEventListener("click", dibujarGarabatoBase);
  document.getElementById("btnListoGar").addEventListener("click", () => {
    if (trazos > 0) GameEngine.sumarPuntos(8);
    GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "¡Buen ojo para transformar un garabato! 🎨" });
  });
})();
