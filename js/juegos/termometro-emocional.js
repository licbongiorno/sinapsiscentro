(function () {
  const contenedor = document.getElementById("jgContenedor");
  const SITUACIONES = [
    "Te olvidaste de un cumpleaños importante.",
    "Alguien te dice algo lindo sin esperarlo.",
    "Tenés que hablar frente a mucha gente.",
    "Un plan que esperabas mucho se cancela.",
    "Lográs algo en lo que veías trabajando hace tiempo.",
    "Alguien te grita sin motivo aparente.",
    "Te piden disculpas por algo que te dolió.",
    "Ves una noticia que te preocupa.",
    "Alguien te compara desfavorablemente con otra persona.",
    "Te avisan un cambio de planes a último momento.",
    "Recibís un halago inesperado de alguien que respetás.",
    "Tenés que esperar mucho más de lo previsto por algo importante.",
    "Alguien cumple una promesa que casi habías olvidado.",
    "Te piden que tomes una decisión rápida bajo presión.",
  ];
  let orden = [...SITUACIONES].sort(() => Math.random() - 0.5).slice(0, 6);
  let i = 0;

  GameEngine.iniciar({ juegoId: "termometro-emocional", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Gracias por registrar cada intensidad." });
      return;
    }
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:24px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:24px;font-size:1.02rem;line-height:1.6;">
          ${orden[i]}
        </div>
        <p style="color:var(--text-mid);margin-bottom:8px;font-size:0.9rem;">¿Qué tan intensa sería tu reacción?</p>
        <div style="display:flex;align-items:center;gap:12px;margin:18px 0;">
          <span style="font-size:0.8rem;color:var(--text-soft);">0</span>
          <input type="range" id="sliderTermo" min="0" max="10" value="5" style="flex:1;accent-color:var(--teal-mid);">
          <span style="font-size:0.8rem;color:var(--text-soft);">10</span>
        </div>
        <div id="valorTermo" style="font-size:1.6rem;font-weight:800;color:var(--teal);margin-bottom:22px;">5</div>
        <button id="btnSiguienteTermo" class="ge-btn ge-btn-principal" style="width:100%;">Siguiente</button>
        <p style="margin-top:14px;font-size:0.78rem;color:var(--text-soft);">${i + 1} / ${orden.length}</p>
      </div>`;
    const slider = document.getElementById("sliderTermo");
    const valor = document.getElementById("valorTermo");
    slider.addEventListener("input", () => { valor.textContent = slider.value; });
    document.getElementById("btnSiguienteTermo").addEventListener("click", () => {
      GameEngine.sumarPuntos(1);
      i += 1;
      render();
    });
  }

  render();
})();
