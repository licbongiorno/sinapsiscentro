(function () {
  const ANIMALES = ["🐶","🐱","🐰","🐻","🦁","🐸"];
  const contenedor = document.getElementById("jgContenedor");

  let cartas = [...ANIMALES, ...ANIMALES]
    .sort(() => Math.random() - 0.5)
    .map((s, i) => ({ id: i, simbolo: s, volteada: false, encontrada: false }));

  let primera = null, bloqueado = false, aciertos = 0;

  GameEngine.iniciar({ juegoId: "memoria-animales", vidas: null, tiempoSegundos: null });

  function render() {
    contenedor.innerHTML = `<div class="jg-tablero" style="grid-template-columns: repeat(3, 1fr);">
      ${cartas.map(c => `
        <div class="jg-carta ${c.volteada || c.encontrada ? "volteada" : ""} ${c.encontrada ? "encontrada" : ""}" data-id="${c.id}" style="font-size:2.2rem;">
          ${c.volteada || c.encontrada ? c.simbolo : "🐾"}
        </div>`).join("")}
    </div>`;
    contenedor.querySelectorAll(".jg-carta").forEach(el =>
      el.addEventListener("click", () => voltear(Number(el.dataset.id))));
  }

  function voltear(id) {
    if (bloqueado) return;
    const carta = cartas.find(c => c.id === id);
    if (!carta || carta.volteada || carta.encontrada) return;
    carta.volteada = true;
    render();

    if (!primera) { primera = carta; return; }

    if (primera.simbolo === carta.simbolo) {
      primera.encontrada = true;
      carta.encontrada = true;
      primera = null;
      aciertos += 1;
      GameEngine.sumarPuntos(10);
      if (aciertos === ANIMALES.length) {
        setTimeout(() => GameEngine.terminar({
          puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Encontraste todos los animalitos! 🎉",
        }), 400);
      }
    } else {
      bloqueado = true;
      setTimeout(() => {
        primera.volteada = false; carta.volteada = false; primera = null; bloqueado = false;
        render();
      }, 900);
    }
  }

  render();
})();
