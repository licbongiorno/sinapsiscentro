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
    { situacion: "Te olvidaste de algo importante que habías prometido.", opciones: [
      { texto: "Me equivoqué, puedo repararlo y prestar más atención.", buena: true },
      { texto: "Nunca puedo cumplir nada, no sirvo.", buena: false } ] },
    { situacion: "Alguien te comparó con otra persona que le fue mejor.", opciones: [
      { texto: "Mi camino no tiene por qué ser igual al de otro.", buena: true },
      { texto: "Tienen razón, siempre voy a ser menos que los demás.", buena: false } ] },
    { situacion: "Recibiste una crítica sobre algo en lo que te esforzaste mucho.", opciones: [
      { texto: "Puedo escuchar lo que sirve sin dejar de valorar el esfuerzo que puse.", buena: true },
      { texto: "Si me criticaron es porque no valgo nada de lo que hago.", buena: false } ] },
    { situacion: "Tuviste un día improductivo y sentís que perdiste el tiempo.", opciones: [
      { texto: "No todos los días rinden igual, mañana retomo.", buena: true },
      { texto: "Soy un vago, no sirvo para nada.", buena: false } ] },
    { situacion: "Alguien no respondió bien a algo que hiciste con buena intención.", opciones: [
      { texto: "Hice lo que pude con lo que sabía en ese momento.", buena: true },
      { texto: "Debería haber sabido que iba a salir mal, soy torpe.", buena: false } ] },
    { situacion: "Comparaste tu progreso con el de otra persona en redes sociales.", opciones: [
      { texto: "Cada quien muestra una parte, mi proceso también vale.", buena: true },
      { texto: "Estoy atrasado en todo comparado con los demás.", buena: false } ] },
    { situacion: "Te cuesta empezar algo nuevo por miedo a no hacerlo bien.", opciones: [
      { texto: "Puedo empezar igual, aprender se trata de eso.", buena: true },
      { texto: "Mejor ni intento, seguro me va a salir mal.", buena: false } ] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "amigo-interior", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Hablarte como a un amigo también es una forma de cuidarte." }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">${i + 1} / ${orden.length}</p>
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
