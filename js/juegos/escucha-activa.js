(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { situacion: "Un amigo te dice: 'Tuve un día horrible en el trabajo.'", opciones: [
      { texto: "¿Qué fue lo que pasó?", correcta: true },
      { texto: "Uy, a mí también me pasan cosas así todo el tiempo.", correcta: false },
      { texto: "Bueno, ya va a pasar.", correcta: false } ] },
    { situacion: "Tu pareja te cuenta algo importante mientras mirás el celular.", opciones: [
      { texto: "Seguir mirando el celular pero decir 'ajá' de vez en cuando.", correcta: false },
      { texto: "Dejar el celular y prestarle atención completa.", correcta: true },
      { texto: "Pedirle que espere a que termines de mirar algo.", correcta: false } ] },
    { situacion: "Un compañero te dice: 'Estoy re estresado con los exámenes.'", opciones: [
      { texto: "Yo también, no sabés lo que es mi semana.", correcta: false },
      { texto: "Entiendo, ¿querés contarme un poco más?", correcta: true },
      { texto: "No te preocupes, seguro te va bien.", correcta: false } ] },
    { situacion: "Alguien te cuenta un problema y vos ya sabés cómo resolverlo.", opciones: [
      { texto: "Interrumpir para dar la solución de inmediato.", correcta: false },
      { texto: "Escuchar todo primero y preguntar si quiere consejos.", correcta: true },
      { texto: "Cambiar de tema porque ya sabés cómo termina.", correcta: false } ] },
    { situacion: "Un familiar te repite algo que ya te había contado antes.", opciones: [
      { texto: "Decirle que ya te lo contó, cortante.", correcta: false },
      { texto: "Escucharlo igual, con paciencia.", correcta: true },
      { texto: "Cambiar de tema enseguida.", correcta: false } ] },
    { situacion: "Alguien te habla y notás que estás pensando en qué vas a responder en vez de escuchar.", opciones: [
      { texto: "Seguir así, total ya tenés la respuesta pensada.", correcta: false },
      { texto: "Notarlo y volver a poner atención en lo que dice.", correcta: true },
      { texto: "Interrumpir para decir lo que pensaste.", correcta: false } ] },
    { situacion: "Un amigo te cuenta algo y hace una pausa larga, como buscando las palabras.", opciones: [
      { texto: "Completar la frase por él para que sea más rápido.", correcta: false },
      { texto: "Darle el tiempo y esperar en silencio.", correcta: true },
      { texto: "Cambiar de tema porque parece incómodo.", correcta: false } ] },
    { situacion: "Alguien te cuenta algo triste y no sabés bien qué decir.", opciones: [
      { texto: "Quedarte en silencio incómodo sin decir nada.", correcta: false },
      { texto: "Decir algo como 'gracias por contarme, estoy acá'.", correcta: true },
      { texto: "Cambiar de tema para aliviar la tensión.", correcta: false } ] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "escucha-activa", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Escuchar bien es, muchas veces, no decir nada todavía." });
      return;
    }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:24px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:20px;font-size:1.02rem;line-height:1.6;">
          ${caso.situacion}
        </div>
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:12px;">¿Cuál respuesta muestra mejor escucha activa?</p>
        <div class="jg-opciones">
          ${opciones.map(o => `<button class="jg-opcion" data-e="${o.correcta}">${o.texto}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.e === "true") { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); }
      setTimeout(() => { i += 1; render(); }, 600);
    }));
  }

  render();
})();
