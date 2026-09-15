(function () {
  const contenedor = document.getElementById("jgContenedor");
  const TEMAS = ["La vida", "El tiempo", "El amor", "El miedo", "La memoria", "Un buen día",
    "La amistad", "El cambio", "La espera", "Un secreto", "La calma", "El enojo",
    "La familia", "Un comienzo", "Una despedida", "La confianza", "El silencio", "La costumbre",
    "Un error", "La curiosidad", "El cansancio", "Una decisión", "El perdón", "La rutina",
    "La soledad", "Un logro", "La paciencia", "El coraje", "Una promesa", "El hogar",
    "La duda", "Un recuerdo", "La gratitud", "El cambio de planes", "La rutina diaria", "Una segunda oportunidad",
    "El primer día", "La nostalgia", "Un abrazo", "La incertidumbre"];
  let orden = [...TEMAS].sort(() => Math.random() - 0.5).slice(0, 3);
  let i = 0;

  GameEngine.iniciar({ juegoId: "metafora", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Buenas metáforas!" }); return; }
    const tema = orden[i];
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <div class="lector-fila"><p style="color:var(--text-mid);font-size:0.9rem;">Completá la metáfora:</p>${Lector.boton(`Completá la metáfora: ${tema} es como, porque…`)}</div>
        <p style="font-family:'Playfair Display',serif;font-size:1.3rem;color:var(--navy);margin-bottom:18px;">"${tema} es como ___ porque ___"</p>
        <div class="dictado-fila">
          <textarea class="jg-caja-texto" id="textoMetafora" placeholder="Escribí tu metáfora…"></textarea>
          ${Dictado.boton("textoMetafora")}
        </div>
        <button id="btnListoMetafora" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Siguiente</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">${i + 1} / ${orden.length}</p>
      </div>`;
    Lector.conectar(contenedor);
    Dictado.conectar(contenedor);
    document.getElementById("btnListoMetafora").addEventListener("click", () => {
      const texto = document.getElementById("textoMetafora").value.trim();
      if (texto.length > 5) GameEngine.sumarPuntos(10);
      i += 1;
      render();
    });
  }

  render();
})();
