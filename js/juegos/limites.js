(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { situacion: "Un compañero te pide que hagas su parte del trabajo, otra vez.", opciones: [
      { texto: "Esta vez no puedo, tengo lo mío para terminar.", asertiva: true },
      { texto: "Bueno, dale, lo hago yo.", asertiva: false },
      { texto: "No le contesto el mensaje.", asertiva: false } ] },
    { situacion: "Alguien te pide plata prestada por tercera vez este mes.", opciones: [
      { texto: "Le digo que sí sin pensarlo, para no incomodar.", asertiva: false },
      { texto: "Le explico que esta vez no puedo prestarle.", asertiva: true },
      { texto: "Invento una excusa para no contestar.", asertiva: false } ] },
    { situacion: "Tu familia quiere que vayas a una reunión y vos necesitás descansar.", opciones: [
      { texto: "Voy igual, aunque no tenga ganas.", asertiva: false },
      { texto: "Les explico que necesito quedarme, y propongo verlos otro día.", asertiva: true },
      { texto: "No aviso y simplemente no voy.", asertiva: false } ] },
    { situacion: "Un amigo hace un comentario que no te gustó, frente a otros.", opciones: [
      { texto: "Le digo, con calma, que ese comentario me incomodó.", asertiva: true },
      { texto: "Me quedo callado y lo pienso el resto del día.", asertiva: false },
      { texto: "Respondo con un comentario hiriente también.", asertiva: false } ] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "limites", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Poner límites también se entrena." });
      return;
    }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;font-size:1.02rem;line-height:1.6;">
          ${caso.situacion}
        </div>
        <div class="jg-opciones">
          ${opciones.map(o => `<button class="jg-opcion" data-a="${o.asertiva}">${o.texto}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.a === "true") { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); }
      setTimeout(() => { i += 1; render(); }, 600);
    }));
  }

  render();
})();
