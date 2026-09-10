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
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
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
