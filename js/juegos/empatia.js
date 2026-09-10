(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { situacion: "Un amigo te cuenta que perdió su trabajo.", opciones: [
      { texto: "Debe ser difícil. ¿Cómo estás llevándolo?", empatica: true },
      { texto: "Tranquilo, ya vas a conseguir otro.", empatica: false },
      { texto: "A mí también me pasó, fue horrible.", empatica: false } ] },
    { situacion: "Tu hermano/a está nervioso/a antes de un examen importante.", opciones: [
      { texto: "No pasa nada si no sale bien, no te compliques.", empatica: false },
      { texto: "Es normal estar nervioso antes de algo así. ¿Te ayudo a repasar?", empatica: true },
      { texto: "Yo nunca me pongo nervioso para nada.", empatica: false } ] },
    { situacion: "Un compañero comete un error en frente de todos.", opciones: [
      { texto: "Le hago una broma para aliviar el ambiente.", empatica: false },
      { texto: "No digo nada y sigo con lo mío.", empatica: false },
      { texto: "Después le digo en privado que le puede pasar a cualquiera.", empatica: true } ] },
    { situacion: "Alguien te cuenta que está pasando un momento difícil en su familia.", opciones: [
      { texto: "Le cuento cómo resolví yo un problema parecido.", empatica: false },
      { texto: "Le pregunto qué necesita en este momento.", empatica: true },
      { texto: "Cambio de tema para no incomodar.", empatica: false } ] },
    { situacion: "Un amigo te cuenta que está muy orgulloso de algo que logró.", opciones: [
      { texto: "Le digo que se lo merece y le pregunto cómo lo logró.", empatica: true },
      { texto: "Le resto importancia porque a mí no me parece tanto.", empatica: false },
      { texto: "Cambio el tema hacia algo que logré yo.", empatica: false } ] },
    { situacion: "Alguien está frustrado porque algo no le salió como esperaba.", opciones: [
      { texto: "Le digo que tiene razón en sentirse así, sin querer arreglarlo enseguida.", empatica: true },
      { texto: "Le digo que no es para tanto.", empatica: false },
      { texto: "Le explico todo lo que hizo mal.", empatica: false } ] },
    { situacion: "Un amigo te confiesa que tiene miedo de algo que le parece una tontería.", opciones: [
      { texto: "Le digo que ningún miedo es una tontería si a él le afecta.", empatica: true },
      { texto: "Me río, porque sí suena medio ridículo.", empatica: false },
      { texto: "Le digo que se deje de pavadas.", empatica: false } ] },
    { situacion: "Alguien te cuenta que discutió fuerte con su pareja.", opciones: [
      { texto: "Le pregunto cómo se siente, sin juzgar a ninguno de los dos.", empatica: true },
      { texto: "Directamente le digo con quién tiene razón.", empatica: false },
      { texto: "Le digo que seguro exagera.", empatica: false } ] },
    { situacion: "Un compañero de estudio está agobiado por la cantidad de materias que le quedan.", opciones: [
      { texto: "Le digo que entiendo que se sienta así, y le pregunto si quiere organizar un plan juntos.", empatica: true },
      { texto: "Le digo que a mí me quedan más y no me quejo.", empatica: false },
      { texto: "Le digo que se apure porque se está quedando atrás.", empatica: false } ] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "empatia", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "No hay una única forma de acompañar — lo importante es pensarlo." });
      return;
    }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:24px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:20px;font-size:1.02rem;line-height:1.6;">
          ${caso.situacion}
        </div>
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:12px;">¿Cuál respuesta acompaña mejor?</p>
        <div class="jg-opciones">
          ${opciones.map(o => `<button class="jg-opcion" data-e="${o.empatica}">${o.texto}</button>`).join("")}
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
