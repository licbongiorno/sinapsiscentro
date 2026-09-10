(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { situacion: "Está enojado porque sintió que nadie lo escuchó en la reunión.", correcta: "Ser escuchado", opciones: ["Ser escuchado", "Dinero", "Dormir más"] },
    { situacion: "Está triste porque hace mucho no ve a su familia.", correcta: "Conexión", opciones: ["Conexión", "Competir", "Silencio total"] },
    { situacion: "Está ansioso antes de un examen para el que no estudió mucho.", correcta: "Preparación", opciones: ["Preparación", "Compañía", "Descanso"] },
    { situacion: "Está agotado después de una semana sin parar.", correcta: "Descanso", opciones: ["Descanso", "Más trabajo", "Reconocimiento"] },
    { situacion: "Se siente inseguro después de que le dijeran que se equivocó, en público.", correcta: "Validación", opciones: ["Validación", "Distancia", "Competencia"] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "que-necesita", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "Identificar la necesidad detrás de la emoción ayuda a responder mejor." }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;font-size:1rem;line-height:1.6;">${caso.situacion}</div>
        <p style="color:var(--text-mid);font-size:0.88rem;margin-bottom:12px;">¿Qué necesidad hay detrás?</p>
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
