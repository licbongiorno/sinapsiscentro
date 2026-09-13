(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PARES = [
    { palabra: "Grande", emoji: "🐘", opuestoPalabra: "Chico", opuestoEmoji: "🐭" },
    { palabra: "Arriba", emoji: "⬆️", opuestoPalabra: "Abajo", opuestoEmoji: "⬇️" },
    { palabra: "Día", emoji: "☀️", opuestoPalabra: "Noche", opuestoEmoji: "🌙" },
    { palabra: "Feliz", emoji: "😄", opuestoPalabra: "Triste", opuestoEmoji: "😢" },
    { palabra: "Rápido", emoji: "🐇", opuestoPalabra: "Lento", opuestoEmoji: "🐢" },
    { palabra: "Caliente", emoji: "🔥", opuestoPalabra: "Frío", opuestoEmoji: "❄️" },
    { palabra: "Lleno", emoji: "🫙", opuestoPalabra: "Vacío", opuestoEmoji: "🕳️" },
    { palabra: "Limpio", emoji: "🧼", opuestoPalabra: "Sucio", opuestoEmoji: "🟤" },
  ];
  let orden = [...PARES].sort(() => Math.random() - 0.5).slice(0, 6);
  let i = 0;

  GameEngine.iniciar({ juegoId: "opuestos", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Encontraste todos los opuestos! ↔️" });
      return;
    }
    const actual = orden[i];
    const opciones = [
      { emoji: actual.opuestoEmoji, correcta: true },
      { emoji: PARES.filter(p => p !== actual)[Math.floor(Math.random() * (PARES.length - 1))].emoji, correcta: false },
    ].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.9rem;margin-bottom:8px;">¿Cuál es lo opuesto de...?</p>
      <div style="text-align:center;font-size:2.4rem;margin-bottom:6px;">${actual.emoji}</div>
      <p style="text-align:center;font-weight:800;color:var(--navy);font-size:1.1rem;margin-bottom:22px;">${actual.palabra}</p>
      <div style="display:flex;justify-content:center;gap:20px;">
        ${opciones.map(o => `<button data-c="${o.correcta}" class="jg-opcion" style="font-size:2.4rem;padding:14px 20px;">${o.emoji}</button>`).join("")}
      </div>`;
    contenedor.querySelectorAll("[data-c]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.c === "true") GameEngine.sumarPuntos(10);
      i += 1;
      render();
    }));
  }

  render();
})();
