(function () {
  const contenedor = document.getElementById("jgContenedor");
  const TEMAS = ["La vida", "El tiempo", "El amor", "El miedo", "La memoria", "Un buen día"];
  let orden = [...TEMAS].sort(() => Math.random() - 0.5).slice(0, 3);
  let i = 0;

  GameEngine.iniciar({ juegoId: "metafora", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Buenas metáforas!" }); return; }
    const tema = orden[i];
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <p style="color:var(--text-mid);margin-bottom:10px;font-size:0.9rem;">Completá la metáfora:</p>
        <p style="font-family:'Playfair Display',serif;font-size:1.3rem;color:var(--navy);margin-bottom:18px;">"${tema} es como ___ porque ___"</p>
        <textarea class="jg-caja-texto" id="textoMetafora" placeholder="Escribí tu metáfora…"></textarea>
        <button id="btnListoMetafora" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Siguiente</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">${i + 1} / ${orden.length}</p>
      </div>`;
    document.getElementById("btnListoMetafora").addEventListener("click", () => {
      const texto = document.getElementById("textoMetafora").value.trim();
      if (texto.length > 5) GameEngine.sumarPuntos(10);
      i += 1;
      render();
    });
  }

  render();
})();
