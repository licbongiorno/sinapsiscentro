(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CONSIGNAS = [
    "Fijate en tres sonidos distintos que puedas escuchar ahora.",
    "Notá el peso de tu cuerpo en la silla o el piso.",
    "Seguí el aire entrando y saliendo, sin cambiarlo.",
    "Notá la temperatura del aire en tu piel.",
    "Aflojá los hombros, aunque no sientas que están tensos.",
    "Fijate en algo de color azul que tengas cerca.",
    "Notá el contacto de tus pies con el piso o el calzado.",
    "Prestá atención al peso de tus manos, apoyadas o sueltas.",
    "Notá si hay tensión en tu mandíbula, y aflojala si podés.",
    "Escuchá el sonido más lejano que puedas percibir ahora.",
    "Notá cómo se siente tragar saliva, un detalle que casi nunca notamos.",
    "Fijate en la textura de la ropa que tenés puesta.",
  ];
  const consigna = CONSIGNAS[Math.floor(Math.random() * CONSIGNAS.length)];
  let segundos = 60;

  GameEngine.iniciar({ juegoId: "un-minuto", vidas: null, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div style="text-align:center;padding:10px 20px 30px;">
      <div id="aroCalma" style="width:200px;height:200px;border-radius:50%;margin:0 auto 24px;border:6px solid var(--teal-pale);display:flex;align-items:center;justify-content:center;position:relative;">
        <svg width="200" height="200" style="position:absolute;top:-6px;left:-6px;transform:rotate(-90deg);">
          <circle cx="100" cy="100" r="94" fill="none" stroke="var(--teal-mid)" stroke-width="6" stroke-linecap="round"
            stroke-dasharray="590" id="circuloProgreso" stroke-dashoffset="0"/>
        </svg>
        <span id="numeroSegundos" style="font-size:2.2rem;font-weight:800;color:var(--navy);">60</span>
      </div>
      <p style="color:var(--text-mid);max-width:320px;margin:0 auto;line-height:1.6;">${consigna}</p>
    </div>`;

  const numeroEl = document.getElementById("numeroSegundos");
  const circulo = document.getElementById("circuloProgreso");
  const total = 590;

  const intervalo = setInterval(() => {
    segundos -= 1;
    numeroEl.textContent = segundos;
    circulo.setAttribute("stroke-dashoffset", String(total * (1 - segundos / 60)));
    if (segundos <= 0) {
      clearInterval(intervalo);
      GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Un minuto de atención plena. 🧘" });
    }
  }, 1000);
})();
