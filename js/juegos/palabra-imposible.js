(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { pistas: ["Es un lugar", "Tiene arena", "Está cerca del mar"], correcta: "PLAYA", opciones: ["PLAYA", "MONTAÑA", "CIUDAD"] },
    { pistas: ["Es un objeto", "Marca la hora", "Tiene agujas o número"], correcta: "RELOJ", opciones: ["RELOJ", "ESPEJO", "LIBRO"] },
    { pistas: ["Es un animal", "Vuela", "Hace nido"], correcta: "PÁJARO", opciones: ["PÁJARO", "PEZ", "GATO"] },
    { pistas: ["Es una emoción", "Aparece con lo inesperado", "Puede ser buena o mala"], correcta: "SORPRESA", opciones: ["SORPRESA", "CALMA", "ABURRIMIENTO"] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "palabra-imposible", vidas: 3, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Descubriste todas las palabras!" }); return; }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <div style="text-align:left;background:white;border-radius:var(--r-lg);padding:20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;">
          ${caso.pistas.map(p => `<p style="margin-bottom:6px;color:var(--text-mid);">• ${p}</p>`).join("")}
        </div>
        <div class="jg-opciones">${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === caso.correcta) { btn.classList.add("correcta"); GameEngine.sumarPuntos(15); }
      else { btn.classList.add("incorrecta"); GameEngine.restarVida(); }
      setTimeout(() => { i += 1; render(); }, 600);
    }));
  }

  render();
})();
