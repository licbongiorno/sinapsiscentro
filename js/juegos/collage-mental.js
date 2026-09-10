(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CONCEPTOS = ["un reloj derritiéndose","una ciudad flotante","un jardín de vidrio","una carta que nunca llegó","un mapa del silencio","una máquina de recuerdos","un río que sube","una puerta sin pared"];
  function dos() {
    const c = [...CONCEPTOS];
    return [c.splice(Math.floor(Math.random() * c.length), 1)[0], c.splice(Math.floor(Math.random() * c.length), 1)[0]];
  }
  GameEngine.iniciar({ juegoId: "collage-mental", vidas: null, tiempoSegundos: null });
  let par = dos(), creaciones = 0;

  function render() {
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <p style="color:var(--text-mid);margin-bottom:12px;font-size:0.9rem;">Combiná estas dos ideas en una sola imagen o escena:</p>
        <div style="display:flex;justify-content:center;gap:10px;margin-bottom:18px;flex-wrap:wrap;">
          ${par.map(p => `<span style="background:var(--teal-pale);color:var(--teal-deep);padding:10px 16px;border-radius:50px;font-weight:700;">${p}</span>`).join("")}
        </div>
        <textarea class="jg-caja-texto" id="textoCollage" placeholder="Describí la escena combinada…"></textarea>
        <button id="btnListoCollage" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Siguiente</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">Creaciones: ${creaciones}</p>
      </div>`;
    document.getElementById("btnListoCollage").addEventListener("click", () => {
      const texto = document.getElementById("textoCollage").value.trim();
      if (texto.length > 5) { creaciones += 1; GameEngine.sumarPuntos(6); }
      if (creaciones >= 3) GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "¡Collage mental completo! 🎨" });
      else { par = dos(); render(); }
    });
  }

  render();
})();
