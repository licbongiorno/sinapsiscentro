(function () {
  const contenedor = document.getElementById("jgContenedor");
  const ESCENARIOS = [
    { situacion: "Un amigo cancela planes contigo por tercera vez seguida.", opciones: [
      "Le digo cómo me hace sentir, con calma.", "No digo nada, para no generar conflicto.", "Dejo de invitarlo sin explicar por qué." ] },
    { situacion: "Alguien te interrumpe todo el tiempo cuando hablás en un grupo.", opciones: [
      "Espero mi turno y sigo hablando cuando puedo.", "Le pido, en el momento, que me deje terminar.", "Dejo de participar en la conversación." ] },
    { situacion: "Un compañero de trabajo se atribuye una idea tuya.", opciones: [
      "Lo hablo con esa persona en privado.", "Lo comento con todo el equipo, ahí mismo.", "Lo dejo pasar para evitar tensión." ] },
    { situacion: "Tu pareja o amigo/a está triste y no sabés bien por qué.", opciones: [
      "Le pregunto cómo está, sin presionar.", "Espero a que me cuente por su cuenta.", "Le doy espacio pero le mando un mensaje después." ] },
    { situacion: "Te piden un favor grande justo cuando estás desbordado/a.", opciones: [
      "Explico mi situación y ofrezco ayudar en otro momento.", "Digo que sí igual, para no quedar mal.", "Digo que no, sin dar explicaciones." ] },
    { situacion: "Alguien hace un comentario que te incomoda, frente a otras personas.", opciones: [
      "Lo hablo con esa persona después, a solas.", "Respondo con humor y sigo la charla.", "Me quedo callado/a y lo pienso todo el día." ] },
  ];
  let orden = [...ESCENARIOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "que-responderias", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "No hay una única respuesta correcta — lo importante es pensarlo." });
      return;
    }
    const escenario = orden[i];
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:24px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:20px;font-size:1.02rem;line-height:1.6;">
          ${escenario.situacion}
        </div>
        <div class="jg-opciones">
          ${escenario.opciones.map((op, idx) => `<button class="jg-opcion" data-i="${idx}">${op}</button>`).join("")}
        </div>
        <p style="margin-top:16px;font-size:0.78rem;color:var(--text-soft);">${i + 1} / ${orden.length}</p>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      GameEngine.sumarPuntos(1);
      i += 1;
      render();
    }));
  }

  render();
})();
