(function () {
  const SIMBOLOS = ["🌸","🍀","⭐","🌙","🔵","🟣","🍉","🎈"];
  const contenedor = document.getElementById("jgContenedor");

  let cartas = [...SIMBOLOS, ...SIMBOLOS]
    .sort(() => Math.random() - 0.5)
    .map((s, i) => ({ id: i, simbolo: s, volteada: false, encontrada: false }));

  let primera = null, bloqueado = false, aciertos = 0, intentos = 0;

  GameEngine.iniciar({ juegoId: "memoria-clasica", vidas: null, tiempoSegundos: null });

  function render() {
    const idEnfocada = contenedor.querySelector(".jg-carta:focus")?.dataset.id;
    contenedor.innerHTML = `<div class="jg-tablero" style="grid-template-columns: repeat(4, 1fr);">
      ${cartas.map(c => `
        <button type="button" class="jg-carta ${c.volteada || c.encontrada ? "volteada" : ""} ${c.encontrada ? "encontrada" : ""}" data-id="${c.id}" aria-label="Carta ${c.id + 1} de ${cartas.length}${c.encontrada ? `, encontrada: ${c.simbolo}` : (c.volteada ? `: ${c.simbolo}` : ", boca abajo")}">
          ${c.volteada || c.encontrada ? c.simbolo : "❓"}
        </button>`).join("")}
    </div>`;
    contenedor.querySelectorAll(".jg-carta").forEach(el =>
      el.addEventListener("click", () => voltear(Number(el.dataset.id))));
    if (idEnfocada !== undefined) contenedor.querySelector(`.jg-carta[data-id="${idEnfocada}"]`)?.focus();
  }

  function voltear(id) {
    if (bloqueado) return;
    const carta = cartas.find(c => c.id === id);
    if (!carta || carta.volteada || carta.encontrada) return;
    carta.volteada = true;
    render();

    if (!primera) { primera = carta; return; }

    intentos += 1;
    if (primera.simbolo === carta.simbolo) {
      primera.encontrada = true;
      carta.encontrada = true;
      primera = null;
      aciertos += 1;
      GameEngine.sumarPuntos(10);
      if (aciertos === SIMBOLOS.length) {
        setTimeout(() => GameEngine.terminar({
          puntaje: GameEngine.puntosActuales(),
          exito: true,
          mensaje: `¡Completaste el tablero en ${intentos} intentos!`,
        }), 400);
      }
    } else {
      bloqueado = true;
      setTimeout(() => {
        primera.volteada = false;
        carta.volteada = false;
        primera = null;
        bloqueado = false;
        render();
      }, 800);
    }
  }

  render();
})();
