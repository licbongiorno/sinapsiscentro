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

  const lienzo = crearLienzoDibujable(canvas, { colorInicial: "#0d2535" });

  document.getElementById("btnLimpiarGar").addEventListener("click", dibujarGarabatoBase);
  document.getElementById("btnListoGar").addEventListener("click", () => {
    if (lienzo.trazos() > 0) GameEngine.sumarPuntos(8);
    GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "¡Buen ojo para transformar un garabato! 🎨" });
  });
})();
