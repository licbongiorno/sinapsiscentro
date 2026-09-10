(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { a: "Quiere salir todos los fines de semana.", b: "Prefiere quedarse tranquilo en casa." },
    { a: "Le gusta planificar todo con anticipación.", b: "Prefiere improvisar sobre la marcha." },
    { a: "Necesita hablar las cosas apenas pasan.", b: "Necesita procesarlas en silencio primero." },
    { a: "Quiere ahorrar para el futuro.", b: "Prefiere disfrutar el presente." },
    { a: "Le gusta tener la casa siempre ordenada.", b: "No le molesta el desorden mientras esté cómodo." },
    { a: "Prefiere resolver los conflictos hablando en el momento.", b: "Prefiere darse un tiempo antes de hablar de algo tenso." },
    { a: "Le gusta compartir todo con el grupo de amigos.", b: "Prefiere mantener ciertas cosas más privadas." },
    { a: "Quiere mudarse a otra ciudad.", b: "Está muy arraigado a donde vive." },
    { a: "Prefiere decidir rápido y avanzar.", b: "Prefiere pensarlo bien antes de decidir." },
    { a: "Necesita mucho tiempo a solas para recargar energía.", b: "Se recarga estando rodeado de gente." },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 4);
  let i = 0;

  GameEngine.iniciar({ juegoId: "puentes-vinculos", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Encontrar puntos en común no significa que alguien tenga que ceder del todo." }); return; }
    const c = orden[i];
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="display:flex;gap:10px;margin-bottom:18px;">
          <div style="flex:1;background:white;border-radius:var(--r);padding:16px;box-shadow:0 6px 18px rgba(8,32,46,0.06);font-size:0.9rem;">${c.a}</div>
          <div style="flex:1;background:white;border-radius:var(--r);padding:16px;box-shadow:0 6px 18px rgba(8,32,46,0.06);font-size:0.9rem;">${c.b}</div>
        </div>
        <p style="color:var(--text-mid);margin-bottom:10px;font-size:0.9rem;">¿Qué punto en común o acuerdo podría tender un puente entre las dos posturas?</p>
        <textarea class="jg-caja-texto" id="textoPuente" placeholder="Por ejemplo, podrían…"></textarea>
        <button id="btnListoPuente" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Siguiente</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">${i + 1} / ${orden.length}</p>
      </div>`;
    document.getElementById("btnListoPuente").addEventListener("click", () => {
      const texto = document.getElementById("textoPuente").value.trim();
      if (texto.length > 5) GameEngine.sumarPuntos(8);
      i += 1;
      render();
    });
  }

  render();
})();
