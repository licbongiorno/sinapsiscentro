(function () {
  const contenedor = document.getElementById("jgContenedor");
  const ANIMALES = [
    { emoji: "🐶", pista: "Hace 'Guau guau' y mueve la cola" },
    { emoji: "🐱", pista: "Hace 'Miau' y le gusta dormir mucho" },
    { emoji: "🐮", pista: "Hace 'Muu' y da leche" },
    { emoji: "🐷", pista: "Hace 'Oink' y vive en el barro" },
    { emoji: "🐴", pista: "Hace 'Iiiih' y le gusta correr" },
    { emoji: "🐑", pista: "Hace 'Beee' y tiene lana" },
    { emoji: "🐔", pista: "Hace 'Kikirikí' y pone huevos" },
    { emoji: "🐸", pista: "Hace 'Croac' y salta muy alto" },
    { emoji: "🦆", pista: "Hace 'Cuac' y nada en el agua" },
    { emoji: "🦁", pista: "Hace 'Roar' y es el rey de la selva" },
  ];
  let orden = [...ANIMALES].sort(() => Math.random() - 0.5).slice(0, 7);
  let i = 0;

  GameEngine.iniciar({ juegoId: "adivina-el-animal", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Conocés muy bien a los animales! 🐾" });
      return;
    }
    const actual = orden[i];
    const opciones = [actual, ...ANIMALES.filter(a => a !== actual).sort(() => Math.random() - 0.5).slice(0, 2)].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.9rem;margin-bottom:16px;">${actual.pista}</p>
      <div style="display:flex;justify-content:center;gap:16px;">
        ${opciones.map(o => `<button data-v="${o.emoji}" class="jg-opcion" style="font-size:2.4rem;padding:14px 20px;">${o.emoji}</button>`).join("")}
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === actual.emoji) GameEngine.sumarPuntos(10);
      i += 1;
      render();
    }));
  }

  render();
})();
