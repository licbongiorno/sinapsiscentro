(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { situacion: "Te invitan a un plan justo el día que necesitás descansar.", opciones: [
      { texto: "Voy igual, para no quedar mal con nadie.", buena: false },
      { texto: "Agradezco la invitación y explico que hoy necesito descansar.", buena: true },
      { texto: "No contesto el mensaje.", buena: false } ] },
    { situacion: "Un compañero te pide que te quedes horas extra, de nuevo.", opciones: [
      { texto: "Le explico que hoy no puedo quedarme, y propongo otro momento.", buena: true },
      { texto: "Me quedo aunque tenía otros planes.", buena: false },
      { texto: "Le contesto de mal modo.", buena: false } ] },
    { situacion: "Alguien te pide un favor que te incomoda.", opciones: [
      { texto: "Digo que sí para evitar el conflicto.", buena: false },
      { texto: "Explico con calma que esta vez prefiero no hacerlo.", buena: true },
      { texto: "Ignoro el pedido sin responder.", buena: false } ] },
    { situacion: "Un familiar te pide plata prestada por segunda vez este mes.", opciones: [
      { texto: "Le explico honestamente que esta vez no puedo prestarle.", buena: true },
      { texto: "Le presto igual, aunque me complique a mí.", buena: false },
      { texto: "Invento una excusa para no contestarle.", buena: false } ] },
    { situacion: "Te piden que organices un evento cuando ya tenés la agenda llena.", opciones: [
      { texto: "Explico mi situación y ofrezco ayudar de otra forma, más chica.", buena: true },
      { texto: "Acepto igual y termino agotado.", buena: false },
      { texto: "Digo que sí y después cancelo a último momento.", buena: false } ] },
    { situacion: "Un amigo quiere que lo acompañes a algo que no te interesa nada.", opciones: [
      { texto: "Le digo con cariño que esta vez prefiero no ir.", buena: true },
      { texto: "Voy igual y paso todo el tiempo de mal humor.", buena: false },
      { texto: "Le digo que sí y después no aparezco.", buena: false } ] },
    { situacion: "En el trabajo te asignan una tarea que no te corresponde, otra vez.", opciones: [
      { texto: "Pregunto por qué recae siempre en mí y pido que se reparta distinto.", buena: true },
      { texto: "La hago en silencio, aunque me genere resentimiento.", buena: false },
      { texto: "La hago mal a propósito para que no me la vuelvan a pedir.", buena: false } ] },
    { situacion: "Alguien te pide que guardes un secreto que te hace sentir incómodo.", opciones: [
      { texto: "Le digo que prefiero que no me cuente ese tipo de cosas.", buena: true },
      { texto: "Acepto guardar el secreto aunque me pese.", buena: false },
      { texto: "Se lo cuento a otra persona para sacarme el peso.", buena: false } ] },
    { situacion: "Te ofrecen un plan que te descuadra completamente el presupuesto del mes.", opciones: [
      { texto: "Explico mi situación y propongo un plan más económico.", buena: true },
      { texto: "Voy igual y después me preocupo por la plata.", buena: false },
      { texto: "Digo que sí y cancelo el día anterior sin explicar por qué.", buena: false } ] },
    { situacion: "Un compañero te pide cubrir su turno por tercera semana seguida.", opciones: [
      { texto: "Le digo que esta vez no puedo, aunque las veces anteriores sí pude.", buena: true },
      { texto: "Acepto de nuevo, aunque ya me esté afectando.", buena: false },
      { texto: "Dejo de responderle los mensajes.", buena: false } ] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "decir-que-no", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Decir que no también es cuidarte." }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">${i + 1} / ${orden.length}</p>
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;font-size:1.02rem;line-height:1.6;">${caso.situacion}</div>
        <div class="jg-opciones">${opciones.map(o => `<button class="jg-opcion" data-b="${o.buena}">${o.texto}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.b === "true") { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); }
      setTimeout(() => { i += 1; render(); }, 600);
    }));
  }

  render();
})();
