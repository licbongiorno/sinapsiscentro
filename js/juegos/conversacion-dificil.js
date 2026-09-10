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
    { situacion: "Un amigo cancela planes contigo por tercera vez seguida.", opciones: [
      { texto: "Le digo con calma cómo me hace sentir esa situación.", buena: true },
      { texto: "Dejo de hablarle sin explicar por qué.", buena: false },
      { texto: "No digo nada, aunque me moleste cada vez más.", buena: false } ] },
    { situacion: "Un compañero se atribuye una idea que fue tuya, en una reunión.", opciones: [
      { texto: "Lo aclaro con calma en el momento, sin atacar.", buena: true },
      { texto: "Lo dejo pasar para no generar tensión, aunque me moleste.", buena: false },
      { texto: "Se lo reprocho en voz alta frente a todos.", buena: false } ] },
    { situacion: "Tenés que darle una devolución negativa a alguien de tu equipo.", opciones: [
      { texto: "Preparo ejemplos concretos y elijo un momento privado para decírselo.", buena: true },
      { texto: "Se lo digo de pasada, sin pensarlo mucho.", buena: false },
      { texto: "Evito decírselo y espero que se dé cuenta solo.", buena: false } ] },
    { situacion: "Alguien te interrumpe todo el tiempo cuando hablás en una reunión.", opciones: [
      { texto: "Le pido, en el momento y con calma, que me deje terminar.", buena: true },
      { texto: "Dejo de participar por el resto de la reunión.", buena: false },
      { texto: "Lo interrumpo yo también, más fuerte.", buena: false } ] },
    { situacion: "Un familiar hace un comentario hiriente disfrazado de broma.", opciones: [
      { texto: "Le digo, sin agresividad, que ese comentario me dolió.", buena: true },
      { texto: "Me río para no hacer olas, aunque me haya dolido.", buena: false },
      { texto: "Respondo con otro comentario hiriente.", buena: false } ] },
    { situacion: "Tenés que pedirle a un amigo que te devuelva algo que te debe hace tiempo.", opciones: [
      { texto: "Se lo pido directamente, sin dar vueltas ni culpar.", buena: true },
      { texto: "Espero a que se acuerde solo, aunque pase el tiempo.", buena: false },
      { texto: "Lo comento con otras personas en vez de hablarlo con él.", buena: false } ] },
    { situacion: "Un compañero de equipo no está cumpliendo con su parte del trabajo.", opciones: [
      { texto: "Le pregunto cómo está y si necesita ayuda antes de reclamarle.", buena: true },
      { texto: "Hago yo su parte sin decir nada, para que no se note.", buena: false },
      { texto: "Me quejo con el resto del equipo, sin hablarlo con él.", buena: false } ] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "conversacion-dificil", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Las conversaciones difíciles se entrenan de a poco." }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">${i + 1} / ${orden.length}</p>
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
