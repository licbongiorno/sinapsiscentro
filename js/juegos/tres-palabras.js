(function () {
  const contenedor = document.getElementById("jgContenedor");
  const BANCO = ["nube","reloj","puente","semilla","espejo","tormenta","llave","sombra","farol","raíz",
    "océano","escalera","brújula","cometa","laberinto","caracol","lámpara","viento","puerta","hoguera",
    "isla","cuaderno","eco","hilo","montaña","susurro","marea","ventana","jardín","estrella"];

  function tresAlAzar() {
    const copia = [...BANCO];
    const elegidas = [];
    for (let n = 0; n < 3; n++) {
      const idx = Math.floor(Math.random() * copia.length);
      elegidas.push(copia.splice(idx, 1)[0]);
    }
    return elegidas;
  }

  GameEngine.iniciar({ juegoId: "tres-palabras", vidas: null, tiempoSegundos: null });

  let palabras = tresAlAzar();
  let creaciones = 0;

  function render() {
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="display:flex;justify-content:center;gap:10px;margin-bottom:20px;flex-wrap:wrap;">
          ${palabras.map(p => `<span style="background:var(--teal-pale);color:var(--teal-deep);padding:10px 18px;border-radius:50px;font-weight:800;">${p}</span>`).join("")}
        </div>
        <p style="color:var(--text-mid);margin-bottom:12px;font-size:0.9rem;">Escribí una frase, una idea o una mini historia que use las tres palabras.</p>
        <textarea class="jg-caja-texto" id="textoCreacion" placeholder="Empezá a escribir…"></textarea>
        <div style="display:flex;gap:10px;margin-top:14px;">
          <button id="btnOtras" class="ge-btn ge-btn-secundario" style="flex:1;">Otras palabras</button>
          <button id="btnListo" class="ge-btn ge-btn-principal" style="flex:1;">Listo</button>
        </div>
        <p style="margin-top:14px;font-size:0.78rem;color:var(--text-soft);">Creaciones esta partida: ${creaciones}</p>
      </div>`;

    document.getElementById("btnOtras").addEventListener("click", () => { palabras = tresAlAzar(); render(); });
    document.getElementById("btnListo").addEventListener("click", () => {
      const texto = document.getElementById("textoCreacion").value.trim();
      if (texto.length > 3) {
        creaciones += 1;
        GameEngine.sumarPuntos(5);
      }
      if (creaciones >= 3) {
        GameEngine.terminar({ puntaje: 0, exito: true, mensaje: `Creaste ${creaciones} historias con palabras al azar. ✨` });
      } else {
        palabras = tresAlAzar();
        render();
      }
    });
  }

  render();
})();
