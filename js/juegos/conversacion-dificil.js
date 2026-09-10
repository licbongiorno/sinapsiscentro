(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { situacion: "Tu jefe te critica un trabajo delante de otros compañeros.", opciones: [
      { texto: "Le pido hablarlo en privado después.", buena: true },
      { texto: "Le respondo mal ahí mismo, delante de todos.", buena: false },
      { texto: "Me quedo callado y lo dejo pasar sin decir nada nunca.", buena: false } ] },
    { situacion: "Un familiar saca un tema político en una cena y la charla se tensa.", opciones: [
      { texto: "Propongo bajar un cambio y seguir charlando de otra cosa.", buena: true },
      { texto: "Insisto en tener la razón hasta el final.", buena: false },
      { texto: "Me levanto de la mesa sin decir nada.", buena: false } ] },
    { situacion: "Tu pareja te dice algo que sentís injusto, frente a otras personas.", opciones: [
      { texto: "Le pido hablarlo después, a solas.", buena: true },
      { texto: "Discuto ahí mismo, delante de todos.", buena: false },
      { texto: "Finjo que no me afectó y sigo como si nada.", buena: false } ] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "conversacion-dificil", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Las conversaciones difíciles se entrenan de a poco." }); return; }
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
