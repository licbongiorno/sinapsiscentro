(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { frase: "Si no salgo perfecto en esto, soy un desastre total.", correcta: "Todo o nada", opciones: ["Todo o nada", "Catastrofización", "Lectura de mente"] },
    { frase: "Seguro todos piensan que dije algo estúpido.", correcta: "Lectura de mente", opciones: ["Lectura de mente", "Todo o nada", "Generalización"] },
    { frase: "Si llego tarde una vez, van a pensar que soy un desastre para siempre.", correcta: "Generalización", opciones: ["Generalización", "Catastrofización", "Todo o nada"] },
    { frase: "Si me equivoco en la entrevista, va a ser el fin de mi carrera.", correcta: "Catastrofización", opciones: ["Catastrofización", "Lectura de mente", "Generalización"] },
    { frase: "Fue mi culpa que la reunión saliera mal, aunque nadie dijo eso.", correcta: "Personalización", opciones: ["Personalización", "Todo o nada", "Filtro mental"] },
    { frase: "Debería poder con todo sin pedir ayuda nunca.", correcta: "Debería", opciones: ["Debería", "Lectura de mente", "Etiquetado"] },
    { frase: "Soy un inútil, listo, así soy yo.", correcta: "Etiquetado", opciones: ["Etiquetado", "Generalización", "Catastrofización"] },
    { frase: "De todo lo que salió bien en el día, sólo puedo pensar en el único error que cometí.", correcta: "Filtro mental", opciones: ["Filtro mental", "Todo o nada", "Personalización"] },
    { frase: "Ella lo hace todo mejor que yo, siempre.", correcta: "Comparación", opciones: ["Comparación", "Debería", "Lectura de mente"] },
    { frase: "Como no me contestó el mensaje, seguro está enojado conmigo.", correcta: "Lectura de mente", opciones: ["Lectura de mente", "Filtro mental", "Etiquetado"] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 6);
  let i = 0;

  GameEngine.iniciar({ juegoId: "detective-pensamientos", vidas: 3, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Identificar el patrón es el primer paso para cuestionarlo." }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;font-size:1rem;line-height:1.6;font-style:italic;">"${caso.frase}"</div>
        <p style="color:var(--text-mid);font-size:0.88rem;margin-bottom:12px;">¿Qué patrón de pensamiento es?</p>
        <div class="jg-opciones">${opciones.map(o => `<button class="jg-opcion" data-v="${o}">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === caso.correcta) { btn.classList.add("correcta"); GameEngine.sumarPuntos(12); }
      else { btn.classList.add("incorrecta"); GameEngine.restarVida(); }
      setTimeout(() => { i += 1; render(); }, 600);
    }));
  }

  render();
})();
