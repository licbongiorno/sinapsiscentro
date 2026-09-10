(function () {
  const contenedor = document.getElementById("jgContenedor");
  const SITUACIONES = [
    "Tu mejor amigo te cancela un plan a último momento.",
    "Te felicitan en público por un trabajo bien hecho.",
    "Perdiste algo que era importante para vos.",
    "Alguien te interrumpe todo el tiempo cuando hablás.",
    "Recibís un mensaje que no entendés bien el tono.",
    "Tenés un examen o entrevista mañana.",
    "Un familiar te cuenta una buena noticia.",
    "Alguien hace un chiste a tu costa delante de otros.",
    "Tenés mucho por hacer y poco tiempo.",
    "Te agradecen por haber ayudado a alguien.",
  ];
  let orden = [...SITUACIONES].sort(() => Math.random() - 0.5);
  let i = 0;
  const respuestas = [];

  GameEngine.iniciar({ juegoId: "semaforo-emocional", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Gracias por reflexionar sobre cada situación." });
      return;
    }
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:26px 22px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:22px;font-size:1.05rem;line-height:1.6;">
          ${orden[i]}
        </div>
        <p style="color:var(--text-mid);margin-bottom:16px;font-size:0.9rem;">¿Qué tan intensa sería la reacción para vos?</p>
        <div style="display:flex;justify-content:center;gap:14px;">
          <button data-v="verde" style="width:64px;height:64px;border-radius:50%;border:none;background:#4caf6a;cursor:pointer;box-shadow:0 6px 16px rgba(76,175,106,0.4);"></button>
          <button data-v="amarillo" style="width:64px;height:64px;border-radius:50%;border:none;background:#e0c040;cursor:pointer;box-shadow:0 6px 16px rgba(224,192,64,0.4);"></button>
          <button data-v="rojo" style="width:64px;height:64px;border-radius:50%;border:none;background:#e06060;cursor:pointer;box-shadow:0 6px 16px rgba(224,96,96,0.4);"></button>
        </div>
        <div style="display:flex;justify-content:center;gap:14px;margin-top:8px;font-size:0.7rem;color:var(--text-soft);">
          <span style="width:64px;">Leve</span><span style="width:64px;">Media</span><span style="width:64px;">Intensa</span>
        </div>
        <p style="margin-top:24px;font-size:0.78rem;color:var(--text-soft);">${i + 1} / ${orden.length}</p>
      </div>`;
    contenedor.querySelectorAll("button[data-v]").forEach(btn =>
      btn.addEventListener("click", () => {
        respuestas.push({ situacion: orden[i], intensidad: btn.dataset.v });
        GameEngine.sumarPuntos(1);
        i += 1;
        render();
      }));
  }

  render();
})();
