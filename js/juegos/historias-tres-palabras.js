(function () {
  const contenedor = document.getElementById("jgContenedor");
  const BANCO = ["gato","maleta","lluvia","secreto","escalera","fantasma","carta","reloj","bosque","espejo","tren","cometa"];
  function tres() {
    const c = [...BANCO]; const r = [];
    for (let n = 0; n < 3; n++) r.push(c.splice(Math.floor(Math.random() * c.length), 1)[0]);
    return r;
  }
  GameEngine.iniciar({ juegoId: "historias-tres-palabras", vidas: null, tiempoSegundos: null });
  let palabras = tres(), historias = 0;

  function render() {
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="display:flex;justify-content:center;gap:10px;margin-bottom:18px;flex-wrap:wrap;">
          ${palabras.map(p => `<span style="background:var(--teal-pale);color:var(--teal-deep);padding:10px 18px;border-radius:50px;font-weight:800;">${p}</span>`).join("")}
        </div>
        <p style="color:var(--text-mid);margin-bottom:10px;font-size:0.9rem;">Armá una mini historia (2 o 3 líneas) usando las tres palabras.</p>
        <textarea class="jg-caja-texto" id="textoHistoria" placeholder="Había una vez…"></textarea>
        <button id="btnListoHistoria" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Listo</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">Historias: ${historias}</p>
      </div>`;
    document.getElementById("btnListoHistoria").addEventListener("click", () => {
      const texto = document.getElementById("textoHistoria").value.trim();
      if (texto.length > 5) { historias += 1; GameEngine.sumarPuntos(5); }
      if (historias >= 3) GameEngine.terminar({ puntaje: 0, exito: true, mensaje: `Creaste ${historias} historias. 📖` });
      else { palabras = tres(); render(); }
    });
  }

  render();
})();
