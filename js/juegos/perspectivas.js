(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { escena: "Un compañero llega siempre callado a la oficina y casi no habla con nadie.", correcta: "Puede estar pasando algo personal, o simplemente ser reservado.", opciones: ["Puede estar pasando algo personal, o simplemente ser reservado.", "Seguro me tiene bronca a mí.", "No le importa nadie del equipo."] },
    { escena: "Un vecino nunca saluda cuando se cruzan en el pasillo.", correcta: "Puede estar distraído o no haberte visto.", opciones: ["Puede estar distraído o no haberte visto.", "Es una persona antipática con todos, seguro.", "Te está ignorando a propósito."] },
    { escena: "Un amigo tarda días en responder un mensaje.", correcta: "Puede estar con mucho encima esta semana.", opciones: ["Puede estar con mucho encima esta semana.", "Ya no le importás.", "Se olvidó que existís."] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "perspectivas", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Hay más de una forma de leer la misma situación." }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;font-size:1rem;line-height:1.6;">${caso.escena}</div>
        <p style="color:var(--text-mid);font-size:0.88rem;margin-bottom:12px;">¿Cuál interpretación te parece más equilibrada?</p>
        <div class="jg-opciones">${opciones.map(o => `<button class="jg-opcion" data-v="${o}">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === caso.correcta) { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); }
      setTimeout(() => { i += 1; render(); }, 600);
    }));
  }

  render();
})();
