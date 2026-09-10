(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { frase: "El sol sale por el ___ y se pone por el oeste.", correcta: "este", opciones: ["este", "norte", "sur"] },
    { frase: "No hay mal que dure ___ años.", correcta: "cien", opciones: ["cien", "diez", "mil"] },
    { frase: "Más vale ___ en mano que cien volando.", correcta: "pájaro", opciones: ["pájaro", "gato", "avión"] },
    { frase: "El que mucho abarca, poco ___.", correcta: "aprieta", opciones: ["aprieta", "camina", "duerme"] },
    { frase: "A caballo regalado no se le mira el ___.", correcta: "diente", opciones: ["diente", "casco", "pelo"] },
    { frase: "Quien siembra vientos, cosecha ___.", correcta: "tempestades", opciones: ["tempestades", "flores", "frutas"] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "completa-frase", vidas: 3, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las frases!" }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <p style="font-size:1.05rem;color:var(--navy);line-height:1.6;margin-bottom:20px;">${caso.frase}</p>
        <div class="jg-opciones">${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === caso.correcta) { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); GameEngine.restarVida(); }
      setTimeout(() => { i += 1; render(); }, 500);
    }));
  }

  render();
})();
