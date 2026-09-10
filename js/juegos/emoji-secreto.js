(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { emoji: "😊", correcta: "Alegría", opciones: ["Alegría", "Enojo", "Miedo", "Sorpresa"] },
    { emoji: "😢", correcta: "Tristeza", opciones: ["Tristeza", "Alegría", "Calma", "Orgullo"] },
    { emoji: "😠", correcta: "Enojo", opciones: ["Enojo", "Alivio", "Ternura", "Sorpresa"] },
    { emoji: "😨", correcta: "Miedo", opciones: ["Miedo", "Alegría", "Aburrimiento", "Orgullo"] },
    { emoji: "😲", correcta: "Sorpresa", opciones: ["Sorpresa", "Tristeza", "Calma", "Vergüenza"] },
    { emoji: "🥱", correcta: "Aburrimiento", opciones: ["Aburrimiento", "Enojo", "Sorpresa", "Miedo"] },
    { emoji: "😳", correcta: "Vergüenza", opciones: ["Vergüenza", "Alegría", "Calma", "Orgullo"] },
    { emoji: "😌", correcta: "Calma", opciones: ["Calma", "Enojo", "Miedo", "Sorpresa"] },
    { emoji: "🥹", correcta: "Ternura", opciones: ["Ternura", "Enojo", "Aburrimiento", "Vergüenza"] },
    { emoji: "😤", correcta: "Frustración", opciones: ["Frustración", "Alegría", "Calma", "Ternura"] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "emoji-secreto", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Reconociste todas las expresiones!" });
      return;
    }
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">${i + 1} / ${orden.length}</p>
        <div style="font-size:4rem;margin-bottom:24px;">${caso.emoji}</div>
        <div class="jg-opciones">
          ${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === caso.correcta) { btn.classList.add("correcta"); GameEngine.sumarPuntos(8); }
      else { btn.classList.add("incorrecta"); }
      setTimeout(() => { i += 1; render(); }, 450);
    }));
  }

  render();
})();
