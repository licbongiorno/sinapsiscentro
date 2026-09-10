(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { escena: "Tu amigo responde tus mensajes con monosílabos y tarda mucho más que antes.", pregunta: "¿Qué podría estar pasando?", opciones: [
      "Puede estar pasando un mal momento y necesita espacio.", "Seguro que ya no quiere ser tu amigo.", "No significa nada, no hay que darle importancia." ], correcta: 0 },
    { escena: "En una reunión, alguien cruza los brazos y evita el contacto visual mientras hablás.", pregunta: "¿Qué podría indicar esta postura?", opciones: [
      "Que está totalmente de acuerdo con todo.", "Que puede sentirse incómodo/a o a la defensiva.", "Que tiene frío, nada más." ], correcta: 1 },
    { escena: "Un compañero se ríe fuerte de un chiste que no fue tan gracioso.", pregunta: "¿Qué podría estar comunicando?", opciones: [
      "Que le pareció el mejor chiste del mundo.", "Nada, la risa siempre significa lo mismo.", "Puede estar tratando de encajar o aliviar tensión." ], correcta: 2 },
    { escena: "Alguien cambia de tema rápido cuando le preguntás por su familia.", pregunta: "¿Qué podría sugerir esto?", opciones: [
      "Que el tema le resulta sensible ahora mismo.", "Que le aburre hablar en general.", "Que se olvidó la pregunta." ], correcta: 0 },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "detective-social", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Leer señales sociales es una habilidad que se entrena." });
      return;
    }
    const caso = orden[i];
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:16px;font-size:1rem;line-height:1.6;">
          ${caso.escena}
        </div>
        <p style="color:var(--text-mid);font-size:0.9rem;margin-bottom:14px;">${caso.pregunta}</p>
        <div class="jg-opciones">
          ${caso.opciones.map((o, idx) => `<button class="jg-opcion" data-i="${idx}">${o}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.i) === caso.correcta) { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); }
      setTimeout(() => { i += 1; render(); }, 600);
    }));
  }

  render();
})();
