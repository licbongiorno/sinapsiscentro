(function () {
  const contenedor = document.getElementById("jgContenedor");
  const HISTORIAS = [
    "La puerta llevaba diez años cerrada. Esa tarde, alguien finalmente giró la llave y…",
    "El mensaje decía solamente: \"Ya lo sabe\". Nadie entendía a qué se refería, hasta que…",
    "El pueblo entero se quedó sin luz la misma noche que apareció una luz en el cielo…",
    "Encontró una carta escrita por ella misma, pero con una letra que no reconocía…",
    "El tren nunca debía parar en esa estación abandonada. Esta vez, lo hizo…",
  ];
  let orden = [...HISTORIAS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "final-alternativo", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= Math.min(3, orden.length)) {
      GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "¡Buenos finales! ✍️" });
      return;
    }
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:16px;font-size:1rem;line-height:1.7;font-style:italic;">
          ${orden[i]}
        </div>
        <p style="color:var(--text-mid);margin-bottom:10px;font-size:0.88rem;">Continuá la historia como quieras.</p>
        <textarea class="jg-caja-texto" id="textoFinal" placeholder="Y entonces…"></textarea>
        <button id="btnListoFinal" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Siguiente</button>
        <p style="margin-top:14px;font-size:0.78rem;color:var(--text-soft);">${i + 1} / 3</p>
      </div>`;
    document.getElementById("btnListoFinal").addEventListener("click", () => {
      const texto = document.getElementById("textoFinal").value.trim();
      if (texto.length > 5) GameEngine.sumarPuntos(8);
      i += 1;
      render();
    });
  }

  render();
})();
