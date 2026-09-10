(function () {
  const contenedor = document.getElementById("jgContenedor");
  const ESCENAS = [
    { texto: "Dos personas ven a un grupo riéndose fuerte en la mesa de al lado.", a: "Deben estar burlándose de alguien.", b: "Deben estar pasándola muy bien juntos." },
    { texto: "Un mensaje llega sin ningún emoji ni signo de exclamación.", a: "Debe estar enojado conmigo.", b: "Puede estar simplemente apurado." },
    { texto: "Alguien no te invita a un plan del que te enteraste por otro lado.", a: "Seguramente no me quiere ahí.", b: "Puede que se haya armado de improviso, sin pensarlo." },
  ];
  let orden = [...ESCENAS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "misma-historia", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "La misma escena admite más de una lectura." }); return; }
    const e = orden[i];
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;font-size:1rem;line-height:1.6;">${e.texto}</div>
        <p style="color:var(--text-mid);margin-bottom:12px;font-size:0.88rem;">Las dos interpretaciones son posibles. ¿Cuál elegís pensar hoy?</p>
        <div class="jg-opciones">
          <button class="jg-opcion" data-v="a">${e.a}</button>
          <button class="jg-opcion" data-v="b">${e.b}</button>
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      GameEngine.sumarPuntos(1);
      i += 1;
      render();
    }));
  }

  render();
})();
