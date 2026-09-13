(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { situacion: "Un amigo canceló un plan importante para vos a último momento, y te molestó.", opciones: [
      { texto: "Decirle: 'Me sentí dejado de lado cuando cancelaste tan tarde.'", correcta: true },
      { texto: "No decir nada, pero cancelarle algo vos después.", correcta: false },
      { texto: "Decirle 'sos un desconsiderado' apenas lo veas.", correcta: false } ] },
    { situacion: "Tu pareja se olvidó de algo importante para vos.", opciones: [
      { texto: "Guardarte el enojo y esperar a que se dé cuenta solo.", correcta: false },
      { texto: "Contarle cómo te sentiste, sin acusar, cuando tengan un momento tranquilo.", correcta: true },
      { texto: "Hacerle sentir culpa con indirectas todo el día.", correcta: false } ] },
    { situacion: "Un compañero de trabajo te interrumpe seguido en las reuniones.", opciones: [
      { texto: "Interrumpirlo a él también, para que sienta lo mismo.", correcta: false },
      { texto: "Decirle en privado que te gustaría poder terminar tus ideas.", correcta: true },
      { texto: "Dejar de participar en las reuniones.", correcta: false } ] },
    { situacion: "Sentís que un familiar te compara todo el tiempo con tu hermano/a.", opciones: [
      { texto: "Explicarle con calma cómo te hace sentir esa comparación.", correcta: true },
      { texto: "Empezar a competir para 'ganarle' a tu hermano.", correcta: false },
      { texto: "Alejarte de la familia sin explicar por qué.", correcta: false } ] },
    { situacion: "Te sentís abrumado porque un amigo te pide favores muy seguido.", opciones: [
      { texto: "Seguir diciendo que sí para no quedar mal.", correcta: false },
      { texto: "Contarle que últimamente te está costando y por qué.", correcta: true },
      { texto: "Empezar a evitarlo sin decir nada.", correcta: false } ] },
    { situacion: "Un amigo hizo un chiste sobre vos que te dolió, aunque él no se dio cuenta.", opciones: [
      { texto: "Reírte igual para no hacer drama.", correcta: false },
      { texto: "Decirle después, con calma, que ese chiste te incomodó.", correcta: true },
      { texto: "Hacerle un chiste hiriente de vuelta.", correcta: false } ] },
    { situacion: "Sentís orgullo por algo que lograste, pero te da vergüenza contarlo.", opciones: [
      { texto: "No contarlo nunca, por las dudas.", correcta: false },
      { texto: "Contarlo a alguien de confianza, aunque te dé un poco de pudor.", correcta: true },
      { texto: "Minimizarlo apenas alguien lo note.", correcta: false } ] },
    { situacion: "Te sentís triste, pero no sabés bien explicar por qué.", opciones: [
      { texto: "Decir 'estoy bien' aunque no sea cierto.", correcta: false },
      { texto: "Decir 'no estoy del todo bien, aunque no sé explicarlo bien todavía'.", correcta: true },
      { texto: "Aislarte sin avisarle a nadie.", correcta: false } ] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "compartir-sentimientos", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Nombrar lo que sentís, sin acusar, suele abrir más puertas que cerrarlas." });
      return;
    }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:24px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:20px;font-size:1.02rem;line-height:1.6;">
          ${caso.situacion}
        </div>
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:12px;">¿Cuál es la forma más sana de compartir lo que sentís?</p>
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
