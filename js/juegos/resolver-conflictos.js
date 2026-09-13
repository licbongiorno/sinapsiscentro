(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { situacion: "Vos y tu compañero de cuarto no se ponen de acuerdo sobre el volumen de la música.", opciones: [
      { texto: "Proponer un horario para cada uno.", correcta: true },
      { texto: "Subir el volumen todavía más para que entienda.", correcta: false },
      { texto: "No decir nada y aguantarte.", correcta: false } ] },
    { situacion: "Dos amigos quieren ver películas distintas y no llegan a un acuerdo.", opciones: [
      { texto: "Insistir en la propia hasta que el otro ceda.", correcta: false },
      { texto: "Proponer ver la de uno hoy y la del otro la próxima.", correcta: true },
      { texto: "Cancelar el plan directamente.", correcta: false } ] },
    { situacion: "En un trabajo grupal, alguien no está haciendo su parte.", opciones: [
      { texto: "Hacer su parte sin decir nada, para no generar tensión.", correcta: false },
      { texto: "Hablarlo directamente con esa persona y preguntar qué está pasando.", correcta: true },
      { texto: "Quejarse con el resto del grupo, pero no con esa persona.", correcta: false } ] },
    { situacion: "Dos hermanos se pelean por quién usa la computadora primero.", opciones: [
      { texto: "El que grite más fuerte, gana.", correcta: false },
      { texto: "Turnarse por tiempo, con un reloj de por medio.", correcta: true },
      { texto: "Que decida un adulto sin escuchar a ninguno.", correcta: false } ] },
    { situacion: "Un compañero de trabajo toma crédito por una idea que fue tuya.", opciones: [
      { texto: "Ignorarlo, no vale la pena el conflicto.", correcta: false },
      { texto: "Hablarlo en privado con esa persona antes de escalarlo.", correcta: true },
      { texto: "Hacer un comentario sarcástico delante de todos.", correcta: false } ] },
    { situacion: "En una salida grupal, la mitad quiere comer afuera y la otra mitad cocinar en casa.", opciones: [
      { texto: "Que gane el grupo más grande, sin más discusión.", correcta: false },
      { texto: "Buscar una tercera opción que combine ambas ideas.", correcta: true },
      { texto: "Dividir el grupo en dos planes distintos sin avisar.", correcta: false } ] },
    { situacion: "Tu pareja y vos no se ponen de acuerdo sobre cómo gastar un ahorro en común.", opciones: [
      { texto: "Decidir cada uno por su lado sin consultar al otro.", correcta: false },
      { texto: "Sentarse a conversar qué necesita y prioriza cada uno.", correcta: true },
      { texto: "Dejar de hablar del tema para evitar la discusión.", correcta: false } ] },
    { situacion: "Un vecino se queja porque tu perro ladra mucho de noche.", opciones: [
      { texto: "Decirle que no es tu problema.", correcta: false },
      { texto: "Escuchar el reclamo y pensar juntos alguna solución.", correcta: true },
      { texto: "Evitar cruzarte con esa persona de ahora en más.", correcta: false } ] },
    { situacion: "Dos compañeros de equipo tienen ideas opuestas sobre cómo resolver un problema.", opciones: [
      { texto: "Probar la idea de quien tenga más experiencia, explicando el porqué.", correcta: true },
      { texto: "Que decida quien habló primero.", correcta: false },
      { texto: "No decidir nada y seguir discutiendo indefinidamente.", correcta: false } ] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "resolver-conflictos", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Los conflictos se resuelven mejor buscando un punto en común." });
      return;
    }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:24px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:20px;font-size:1.02rem;line-height:1.6;">
          ${caso.situacion}
        </div>
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:12px;">¿Cuál opción ayuda más a resolver el conflicto?</p>
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
