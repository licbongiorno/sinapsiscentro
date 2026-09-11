(function () {
  const contenedor = document.getElementById("jgContenedor");
  const COLORES = ["#0d2535", "#e06060", "#2aaec2", "#4caf6a", "#e0c040", "#c98ac2"];
  GameEngine.iniciar({ juegoId: "dibujo-libre", vidas: null, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div style="text-align:center;">
      <canvas id="lienzo" width="320" height="320" style="background:white;border-radius:var(--r-lg);border:2px solid var(--teal-pale);touch-action:none;max-width:94vw;"></canvas>
      <div style="display:flex;justify-content:center;gap:8px;margin:14px 0;">
        ${COLORES.map(c => `<button data-c="${c}" style="width:30px;height:30px;border-radius:50%;background:${c};border:2px solid white;box-shadow:0 0 0 1px var(--teal-pale);cursor:pointer;"></button>`).join("")}
      </div>
      <div style="display:flex;gap:10px;justify-content:center;">
        <button id="btnLimpiar" class="ge-btn ge-btn-secundario">Limpiar</button>
        <button id="btnListoDibujo" class="ge-btn ge-btn-principal">Listo</button>
      </div>
    </div>`;

  const canvas = document.getElementById("lienzo");
  const lienzo = crearLienzoDibujable(canvas, { colorInicial: COLORES[0] });

  contenedor.querySelectorAll("[data-c]").forEach(btn => btn.addEventListener("click", () => lienzo.setColor(btn.dataset.c)));
  document.getElementById("btnLimpiar").addEventListener("click", () => lienzo.limpiar());
  document.getElementById("btnListoDibujo").addEventListener("click", () => {
    if (lienzo.trazos() > 0) GameEngine.sumarPuntos(5);
    GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "¡Lindo dibujo! 🎨" });
  });
})();
