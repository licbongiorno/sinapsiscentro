(function () {
  const contenedor = document.getElementById("jgContenedor");
  const SITUACIONES = [
    "Un compañero no te saludó esta mañana.",
    "Tu pareja canceló un plan a último momento.",
    "Alguien no respondió tu mensaje en todo el día.",
    "Un amigo se fue temprano de tu cumpleaños.",
    "Un familiar no comentó nada sobre algo que lograste.",
    "Alguien te miró serio mientras hablabas.",
    "Un compañero de trabajo no te invitó a un almuerzo grupal.",
    "Tu jefe te pidió una reunión sin dar más detalles.",
    "Un amigo tardó en devolverte algo que le prestaste.",
    "Alguien cambió de planes sin avisarte antes.",
  ];
  let orden = [...SITUACIONES].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "cambiar-perspectiva", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Ver una situación desde otro ángulo abre opciones." }); return; }
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:16px;font-size:1rem;line-height:1.6;">${orden[i]}</div>
        <div class="lector-fila"><p style="color:var(--text-mid);font-size:0.9rem;">Pensá en al menos dos explicaciones posibles, distintas a la primera que se te ocurrió.</p>${Lector.boton(`${orden[i]} Pensá en al menos dos explicaciones posibles, distintas a la primera que se te ocurrió.`)}</div>
        <div class="dictado-fila">
          <textarea class="jg-caja-texto" id="textoPersp" placeholder="Otra posible explicación sería…"></textarea>
          ${Dictado.boton("textoPersp")}
        </div>
        <button id="btnListoPersp" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Siguiente</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">${i + 1} / ${orden.length}</p>
      </div>`;
    Lector.conectar(contenedor);
    Dictado.conectar(contenedor);
    document.getElementById("btnListoPersp").addEventListener("click", () => {
      const texto = document.getElementById("textoPersp").value.trim();
      if (texto.length > 5) GameEngine.sumarPuntos(8);
      i += 1;
      render();
    });
  }

  render();
})();
