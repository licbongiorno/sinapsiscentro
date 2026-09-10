(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { lineas: [
        "A: ¿Vas a venir a la reunión?",
        "B: No sé, tengo mucho para hacer.",
        "A: Como digas, ya ni te importa el equipo.",
        "B: ¿Qué? Yo no dije eso.",
      ], idxMalentendido: 2, explicacion: "A interpretó \"no sé\" como desinterés, sin preguntar más." },
    { lineas: [
        "A: Te mandé el archivo ayer.",
        "B: No me llegó nada.",
        "A: Siempre pasa lo mismo con vos, nunca revisás bien.",
        "B: Recién lo encontré en spam.",
      ], idxMalentendido: 2, explicacion: "A asumió que era culpa de B antes de confirmar qué había pasado." },
  ];
  const caso = CASOS[Math.floor(Math.random() * CASOS.length)];

  GameEngine.iniciar({ juegoId: "malentendido", vidas: null, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
      <div style="text-align:left;background:white;border-radius:var(--r-lg);padding:20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;">
        ${caso.lineas.map((l, i) => `<p data-i="${i}" style="margin-bottom:8px;color:var(--text-mid);cursor:pointer;padding:4px;border-radius:6px;">${l}</p>`).join("")}
      </div>
      <p style="color:var(--text-mid);font-size:0.88rem;">Tocá la línea donde creés que empezó el malentendido.</p>
    </div>`;
  contenedor.querySelectorAll("[data-i]").forEach(el => el.addEventListener("click", () => {
    const acierto = Number(el.dataset.i) === caso.idxMalentendido;
    contenedor.querySelectorAll("[data-i]").forEach(x => x.style.pointerEvents = "none");
    el.style.background = acierto ? "#d6f5df" : "#ffe0e0";
    if (acierto) GameEngine.sumarPuntos(15);
    setTimeout(() => GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: caso.explicacion }), 1000);
  }));
})();
