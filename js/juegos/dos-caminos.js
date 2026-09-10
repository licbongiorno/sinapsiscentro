(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 6;

  GameEngine.iniciar({ juegoId: "dos-caminos", vidas: null, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Recorriste los dos caminos!" }); return; }
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;">Ronda ${ronda} de ${TOTAL} — elegí un camino</p>
        <div style="display:flex;justify-content:center;gap:14px;">
          <button id="caminoA" style="flex:1;max-width:170px;padding:24px 10px;border-radius:var(--r-lg);border:none;background:var(--teal-pale);color:var(--teal-deep);font-weight:800;cursor:pointer;">Camino A<br><span style="font-size:0.78rem;font-weight:500;">+5 puntos seguro</span></button>
          <button id="caminoB" style="flex:1;max-width:170px;padding:24px 10px;border-radius:var(--r-lg);border:none;background:var(--warm-lt);color:#7a5a2a;font-weight:800;cursor:pointer;">Camino B<br><span style="font-size:0.78rem;font-weight:500;">+15 o +0, al azar</span></button>
        </div>
      </div>`;
    document.getElementById("caminoA").addEventListener("click", () => { GameEngine.sumarPuntos(5); nuevaRonda(); });
    document.getElementById("caminoB").addEventListener("click", () => { GameEngine.sumarPuntos(Math.random() < 0.5 ? 15 : 0); nuevaRonda(); });
  }

  nuevaRonda();
})();
