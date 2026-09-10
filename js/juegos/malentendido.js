(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { lineas: [
        "A: ¿Vas a venir a la reunión?",
        "B: No sé, tengo mucho para hacer.",
        "A: Como digas, ya ni te importa el equipo.",
        "B: ¿Qué? Yo no dije eso.",
      ], idxMalentendido: 2, explicacion: "A interpretó \"no sé\" como desinterés, sin preguntar más." },
    { lineas: [
        "A: Te mandé el archivo ayer.",
        "B: No me llegó nada.",
        "A: Siempre pasa lo mismo con vos, nunca revisás bien.",
        "B: Recién lo encontré en spam.",
      ], idxMalentendido: 2, explicacion: "A asumió que era culpa de B antes de confirmar qué había pasado." },
    { lineas: [
        "A: ¿Podés ayudarme con esto el sábado?",
        "B: Tengo un compromiso, pero después puedo.",
        "A: Ok, entendido, no cuento con vos entonces.",
        "B: Esperá, dije que SÍ puedo, más tarde.",
      ], idxMalentendido: 2, explicacion: "A se quedó con la primera parte de la frase y no escuchó el resto." },
    { lineas: [
        "A: ¿Cómo te fue en la entrevista?",
        "B: Bien, supongo.",
        "A: Ah, seguro no te interesaba el puesto.",
        "B: No, para nada, estoy nervioso esperando la respuesta.",
      ], idxMalentendido: 2, explicacion: "A confundió cautela o nerviosismo con desinterés." },
    { lineas: [
        "A: ¿Vas a comer con nosotros?",
        "B: Ya comí algo antes, gracias.",
        "A: Bueno, como quieras, ya no insisto más.",
        "B: No es que no quiera, es que ya no tengo hambre.",
      ], idxMalentendido: 2, explicacion: "A leyó un rechazo personal donde sólo había una cuestión de horarios." },
    { lineas: [
        "A: El informe todavía no está listo.",
        "B: ¿Cómo? Necesitaba eso para hoy.",
        "A: Nadie me avisó que era urgente.",
        "B: Te lo escribí en el mensaje del lunes.",
      ], idxMalentendido: 1, explicacion: "B asumió que A había visto y entendido la urgencia sin confirmarlo." },
    { lineas: [
        "A: Estuve pensando en lo que hablamos.",
        "B: ¿Y? ¿Qué decidiste?",
        "A: Todavía nada, sigo pensando.",
        "B: Ah, entonces ya decidiste que no.",
      ], idxMalentendido: 3, explicacion: "B interpretó una respuesta abierta como un \"no\" definitivo." },
  ];
  const caso = CASOS[Math.floor(Math.random() * CASOS.length)];

  GameEngine.iniciar({ juegoId: "malentendido", vidas: null, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
      <div style="text-align:left;background:white;border-radius:var(--r-lg);padding:20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;">
        ${caso.lineas.map((l, i) => `<p data-i="${i}" style="margin-bottom:8px;color:var(--text-mid);cursor:pointer;padding:4px;border-radius:6px;">${l}</p>`).join("")}
      </div>
      <p style="color:var(--text-mid);font-size:0.88rem;">Tocá la línea donde creés que empezó el malentendido.</p>
    </div>`;
  contenedor.querySelectorAll("[data-i]").forEach(el => el.addEventListener("click", () => {
    const acierto = Number(el.dataset.i) === caso.idxMalentendido;
    contenedor.querySelectorAll("[data-i]").forEach(x => x.style.pointerEvents = "none");
    el.style.background = acierto ? "#d6f5df" : "#ffe0e0";
    if (acierto) GameEngine.sumarPuntos(15);
    setTimeout(() => GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: caso.explicacion }), 1000);
  }));
})();
