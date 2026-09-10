(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { situacion: "Te equivocaste en algo importante en el trabajo.", opciones: [
      { texto: "Cometí un error, y aún así puedo aprender de esto.", buena: true },
      { texto: "Soy un desastre, siempre arruino todo.", buena: false } ] },
    { situacion: "No lograste el objetivo que te habías propuesto esta semana.", opciones: [
      { texto: "No lo logré esta vez, ¿qué puedo ajustar para la próxima?", buena: true },
      { texto: "Soy un fracaso, para qué sigo intentando.", buena: false } ] },
    { situacion: "Dijiste algo que después sentiste que no estuvo bien.", opciones: [
      { texto: "Fue un desliz, puedo pedir disculpas y seguir adelante.", buena: true },
      { texto: "Soy una mala persona por haber dicho eso.", buena: false } ] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "amigo-interior", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Hablarte como a un amigo también es una forma de cuidarte." }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;font-size:1rem;line-height:1.6;">${caso.situacion}</div>
        <p style="color:var(--text-mid);font-size:0.88rem;margin-bottom:12px;">¿Cuál respuesta te trataría con más amabilidad?</p>
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
