(function () {
  const contenedor = document.getElementById("jgContenedor");
  const SITUACIONES = [
    "Tenés que hablar en público en unos minutos.",
    "Alguien te dice algo que te llena de alegría.",
    "Estás muy enojado por una injusticia.",
    "Sentís mucha vergüenza por algo que dijiste.",
    "Estás esperando un resultado importante.",
    "Alguien te abraza después de mucho tiempo sin verse.",
    "Te acaban de dar una mala noticia de golpe.",
    "Sentís alivio después de resolver algo que te preocupaba.",
    "Estás muy concentrado terminando algo importante.",
    "Sentís nostalgia al escuchar una canción vieja.",
  ];
  const ZONAS = ["Cabeza", "Pecho", "Estómago", "Manos", "Todo el cuerpo"];
  let orden = [...SITUACIONES].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "mapa-emociones", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Notar dónde vive la emoción en el cuerpo es el primer paso para regularla." }); return; }
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;font-size:1rem;line-height:1.6;">${orden[i]}</div>
        <p style="color:var(--text-mid);margin-bottom:12px;font-size:0.88rem;">¿Dónde sentirías esa emoción en el cuerpo?</p>
        <div class="jg-opciones">${ZONAS.map(z => `<button class="jg-opcion" data-v="${z}" style="text-align:center;">${z}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      GameEngine.sumarPuntos(1);
      i += 1;
      render();
    }));
  }

  render();
})();
