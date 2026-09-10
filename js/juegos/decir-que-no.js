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
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "decir-que-no", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Decir que no también es cuidarte." }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
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
