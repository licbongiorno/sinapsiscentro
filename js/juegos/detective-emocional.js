(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { escena: "Juan llega tarde a la fiesta, se queda en la puerta y no saluda a nadie.", correcta: "Vergüenza", opciones: ["Vergüenza", "Alegría", "Aburrimiento", "Orgullo"] },
    { escena: "Marina revisa el celular cada dos minutos esperando una respuesta.", correcta: "Ansiedad", opciones: ["Ansiedad", "Calma", "Enojo", "Alivio"] },
    { escena: "Pedro sonríe y camina más erguido después de recibir el premio.", correcta: "Orgullo", opciones: ["Orgullo", "Tristeza", "Miedo", "Vergüenza"] },
    { escena: "Sol se queda mirando fijo la pantalla, sin poder concentrarse en nada más.", correcta: "Preocupación", opciones: ["Preocupación", "Alegría", "Calma", "Aburrimiento"] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "detective-emocional", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Buen ojo para las emociones!" }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;font-size:1rem;line-height:1.6;">${caso.escena}</div>
        <p style="color:var(--text-mid);font-size:0.88rem;margin-bottom:12px;">¿Qué emoción está sintiendo?</p>
        <div class="jg-opciones">${opciones.map(o => `<button class="jg-opcion" data-v="${o}">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === caso.correcta) { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); }
      setTimeout(() => { i += 1; render(); }, 550);
    }));
  }

  render();
})();
