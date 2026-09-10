(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CONCEPTOS = ["un reloj derritiéndose","una ciudad flotante","un jardín de vidrio","una carta que nunca llegó","un mapa del silencio","una máquina de recuerdos","un río que sube","una puerta sin pared",
    "una biblioteca de voces","un tren que va hacia atrás","un espejo que envejece","una casa hecha de preguntas","un semáforo de emociones","un paraguas para la nostalgia","una escalera sin final","un jardín en invierno eterno",
    "una fotografía que respira","un teléfono para hablar con el pasado","una isla que cambia de lugar","un cajón lleno de silencios","una ventana que muestra otro clima","un reloj de arena con estrellas","un bosque de letras","una calle que se repite",
    "un faro apagado que igual guía","una maleta que pesa según el ánimo","un paraguas que sólo protege de los recuerdos tristes","un espejo que muestra a quien fuiste",
    "una plaza que aparece sólo de noche","un cuaderno que se escribe solo","un ascensor que va a otros años","una radio que sintoniza voces del futuro","un jardín donde crecen preguntas","una llave que abre conversaciones pendientes",
    "un mapa que se dibuja al caminar","una ciudad que respira al mismo ritmo que su gente","un río que guarda todas las despedidas","una casa que recuerda a quienes vivieron ahí","un tren que para en los recuerdos felices","una biblioteca donde los libros eligen a quien los lee",
    "un jardín que florece con las buenas noticias","un espejo que devuelve la mirada de otra persona","una calle sin nombre que todos conocen","un faro que guía sólo a quien lo necesita esa noche"];
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
