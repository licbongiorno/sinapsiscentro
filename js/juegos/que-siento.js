(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { situacion: "Llegaste tarde a algo importante por culpa de otra persona.", correcta: "Frustración", opciones: ["Frustración", "Alegría", "Sorpresa", "Calma"] },
    { situacion: "Te enteraste de que aprobaste algo que te costó mucho.", correcta: "Alivio", opciones: ["Alivio", "Enojo", "Aburrimiento", "Vergüenza"] },
    { situacion: "Alguien te cuenta un secreto que no esperabas.", correcta: "Sorpresa", opciones: ["Sorpresa", "Tristeza", "Calma", "Enojo"] },
    { situacion: "Volvés a un lugar que te recuerda a alguien que ya no está.", correcta: "Nostalgia", opciones: ["Nostalgia", "Alegría", "Miedo", "Orgullo"] },
    { situacion: "Vas a hablar en público por primera vez.", correcta: "Nerviosismo", opciones: ["Nerviosismo", "Aburrimiento", "Alivio", "Calma"] },
    { situacion: "Terminaste un proyecto en el que trabajaste mucho tiempo.", correcta: "Orgullo", opciones: ["Orgullo", "Vergüenza", "Miedo", "Enojo"] },
    { situacion: "Te comparan todo el tiempo con otra persona.", correcta: "Incomodidad", opciones: ["Incomodidad", "Alegría", "Sorpresa", "Calma"] },
    { situacion: "Estás esperando un resultado médico importante.", correcta: "Ansiedad", opciones: ["Ansiedad", "Aburrimiento", "Orgullo", "Alivio"] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "que-siento", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Recorriste todas las situaciones!" });
      return;
    }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:24px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:20px;font-size:1.02rem;line-height:1.6;">
          ${caso.situacion}
        </div>
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:12px;">¿Qué emoción es más probable que aparezca?</p>
        <div class="jg-opciones">
          ${opciones.map(o => `<button class="jg-opcion" data-v="${o}">${o}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === caso.correcta) { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); }
      setTimeout(() => { i += 1; render(); }, 500);
    }));
  }

  render();
})();
