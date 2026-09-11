(function () {
  const contenedor = document.getElementById("jgContenedor");
  const EMOCIONES = ["Alegría", "Calma", "Sorpresa", "Nostalgia", "Entusiasmo", "Ternura"];
  const emocion = EMOCIONES[Math.floor(Math.random() * EMOCIONES.length)];
  const COLORES = ["#0d2535", "#e06060", "#2aaec2", "#4caf6a", "#e0c040", "#c98ac2"];
  GameEngine.iniciar({ juegoId: "dibuja-emocion", vidas: null, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div style="text-align:center;">
      <p style="color:var(--text-mid);margin-bottom:4px;font-size:0.9rem;">Representá, con formas y colores:</p>
      <p style="font-family:'Playfair Display',serif;font-size:1.6rem;color:var(--navy);margin-bottom:14px;">${emocion}</p>
      <canvas id="lienzoEmo" width="300" height="300" style="background:white;border-radius:var(--r-lg);border:2px solid var(--teal-pale);touch-action:none;max-width:90vw;"></canvas>
      <div style="display:flex;justify-content:center;gap:8px;margin:14px 0;">
        ${COLORES.map(c => `<button data-c="${c}" style="width:30px;height:30px;border-radius:50%;background:${c};border:2px solid white;box-shadow:0 0 0 1px var(--teal-pale);cursor:pointer;"></button>`).join("")}
      </div>
      <div style="display:flex;gap:10px;justify-content:center;">
        <button id="btnLimpiarEmo" class="ge-btn ge-btn-secundario">Limpiar</button>
        <button id="btnListoEmo" class="ge-btn ge-btn-principal">Listo</button>
      </div>
    </div>`;

  const canvas = document.getElementById("lienzoEmo");
  const lienzo = crearLienzoDibujable(canvas, { colorInicial: COLORES[0], grosor: 5 });

  contenedor.querySelectorAll("[data-c]").forEach(btn => btn.addEventListener("click", () => lienzo.setColor(btn.dataset.c)));
  document.getElementById("btnLimpiarEmo").addEventListener("click", () => lienzo.limpiar());
  document.getElementById("btnListoEmo").addEventListener("click", () => {
    if (lienzo.trazos() > 0) GameEngine.sumarPuntos(8);
    GameEngine.terminar({ puntaje: 0, exito: true, mensaje: `Representaste "${emocion}" a tu manera. 🎨` });
  });
})();
