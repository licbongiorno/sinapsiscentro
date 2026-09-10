(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { escena: "Un compañero llega siempre callado a la oficina y casi no habla con nadie.", correcta: "Puede estar pasando algo personal, o simplemente ser reservado.", opciones: ["Puede estar pasando algo personal, o simplemente ser reservado.", "Seguro me tiene bronca a mí.", "No le importa nadie del equipo."] },
    { escena: "Un vecino nunca saluda cuando se cruzan en el pasillo.", correcta: "Puede estar distraído o no haberte visto.", opciones: ["Puede estar distraído o no haberte visto.", "Es una persona antipática con todos, seguro.", "Te está ignorando a propósito."] },
    { escena: "Un amigo tarda días en responder un mensaje.", correcta: "Puede estar con mucho encima esta semana.", opciones: ["Puede estar con mucho encima esta semana.", "Ya no le importás.", "Se olvidó que existís."] },
    { escena: "Un familiar se muestra cortante en una llamada corta.", correcta: "Puede estar apurado o con un mal momento puntual.", opciones: ["Puede estar apurado o con un mal momento puntual.", "Seguro está enojado conmigo.", "Ya no quiere hablar más conmigo."] },
    { escena: "Un compañero de estudio no compartió sus apuntes esta vez.", correcta: "Puede tener sus propios motivos que no tienen que ver conmigo.", opciones: ["Puede tener sus propios motivos que no tienen que ver conmigo.", "Lo hizo para perjudicarme.", "Nunca le importó ayudar a nadie."] },
    { escena: "Alguien no comenta ni le da \"me gusta\" a tus publicaciones.", correcta: "Puede que ni siquiera las haya visto.", opciones: ["Puede que ni siquiera las haya visto.", "Está evitando interactuar conmigo.", "No le interesa nada de lo que hago."] },
    { escena: "Un compañero de trabajo te corrige en público.", correcta: "Puede estar tratando de ayudar, aunque el modo no sea el ideal.", opciones: ["Puede estar tratando de ayudar, aunque el modo no sea el ideal.", "Lo hizo para hacerme quedar mal.", "Me tiene entre ojos."] },
    { escena: "Alguien cambia de tema cuando le contás algo importante para vos.", correcta: "Puede no haber registrado la importancia que tenía para vos.", opciones: ["Puede no haber registrado la importancia que tenía para vos.", "No le importa nada de lo que me pasa.", "Lo hizo a propósito para ningunearme."] },
    { escena: "Un amigo no te felicitó por algo que lograste.", correcta: "Puede que todavía no se haya enterado.", opciones: ["Puede que todavía no se haya enterado.", "Le da envidia lo que logré.", "No le importan mis logros."] },
    { escena: "Alguien te responde de forma cortante en un chat grupal.", correcta: "Puede estar escribiendo rápido, sin mala intención.", opciones: ["Puede estar escribiendo rápido, sin mala intención.", "Me está atacando delante de todos.", "Ya no me banca en el grupo."] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "perspectivas", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Hay más de una forma de leer la misma situación." }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">${i + 1} / ${orden.length}</p>
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
