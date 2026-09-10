(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PREGUNTAS = [
    "¿Qué fue lo mejor de tu día hasta ahora?",
    "¿Hay algo que te esté pesando y no dijiste en voz alta?",
    "¿A quién te gustaría agradecerle algo?",
    "¿Qué necesitás soltar esta semana?",
    "¿Cuándo fue la última vez que te sentiste realmente en calma?",
    "¿Qué le dirías a la versión de vos de hace un año?",
    "¿Qué te gustaría que los demás entendieran de vos?",
    "¿Qué pequeña cosa te hizo sonreír últimamente?",
  ];
  let vueltas = 0;
  const MAX = 3;

  GameEngine.iniciar({ juegoId: "ruleta-emocional", vidas: null, tiempoSegundos: null });

  function render() {
    if (vueltas >= MAX) { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Gracias por tomarte el momento de pensarlo." }); return; }
    const pregunta = PREGUNTAS[Math.floor(Math.random() * PREGUNTAS.length)];
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:26px 22px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;font-size:1.05rem;line-height:1.6;font-family:'Playfair Display',serif;">${pregunta}</div>
        <textarea class="jg-caja-texto" id="textoRuleta" placeholder="Si querés, escribí tu respuesta…" style="min-height:70px;"></textarea>
        <button id="btnGirarRuleta" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">🎡 Girar de nuevo</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">${vueltas + 1} / ${MAX}</p>
      </div>`;
    document.getElementById("btnGirarRuleta").addEventListener("click", () => {
      GameEngine.sumarPuntos(1);
      vueltas += 1;
      render();
    });
  }

  render();
})();
