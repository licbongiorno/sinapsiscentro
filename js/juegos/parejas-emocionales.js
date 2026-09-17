(function () {
  const BANCO = [
    ["😊","Te dan una buena noticia"], ["😢","Perdés algo importante"],
    ["😠","Alguien te falta el respeto"], ["😨","Enfrentás algo desconocido"],
    ["😲","Pasa algo que no esperabas"], ["😌","Todo está tranquilo y en orden"],
    ["😳","Te equivocás delante de otros"], ["🥹","Alguien tiene un gesto tierno con vos"],
    ["😤","Algo no sale como querías, de nuevo"],
  ];
  const PARES = [...BANCO].sort(() => Math.random() - 0.5).slice(0, 4);
  const contenedor = document.getElementById("jgContenedor");
  let cartas = [];
  PARES.forEach((p, g) => { cartas.push({ g, txt: p[0], grande: true }, { g, txt: p[1], grande: false }); });
  cartas = cartas.map((c, id) => ({ ...c, id, volteada: false, encontrada: false })).sort(() => Math.random() - 0.5);
  let primera = null, bloqueado = false, aciertos = 0;

  GameEngine.iniciar({ juegoId: "parejas-emocionales", vidas: null, tiempoSegundos: null });

  function render() {
    const idEnfocada = contenedor.querySelector(".jg-carta:focus")?.dataset.id;
    contenedor.innerHTML = `<div class="jg-tablero" style="grid-template-columns: repeat(2, 1fr);">
      ${cartas.map(c => `<button type="button" class="jg-carta ${c.volteada || c.encontrada ? "volteada" : ""} ${c.encontrada ? "encontrada" : ""}" data-id="${c.id}" style="font-size:${c.grande ? "1.8rem" : "0.78rem"};aspect-ratio:2;" aria-label="Carta ${c.id + 1} de ${cartas.length}${c.encontrada ? `, encontrada: ${c.txt}` : (c.volteada ? `: ${c.txt}` : ", boca abajo")}">${c.volteada || c.encontrada ? c.txt : "❓"}</button>`).join("")}
    </div>`;
    contenedor.querySelectorAll(".jg-carta").forEach(el => el.addEventListener("click", () => voltear(Number(el.dataset.id))));
    if (idEnfocada !== undefined) contenedor.querySelector(`.jg-carta[data-id="${idEnfocada}"]`)?.focus();
  }
  function voltear(id) {
    if (bloqueado) return;
    const carta = cartas.find(c => c.id === id);
    if (!carta || carta.volteada || carta.encontrada) return;
    carta.volteada = true; render();
    if (!primera) { primera = carta; return; }
    if (primera.g === carta.g) {
      primera.encontrada = true; carta.encontrada = true; primera = null; aciertos += 1;
      GameEngine.sumarPuntos(10);
      if (aciertos === PARES.length) setTimeout(() => GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las parejas!" }), 400);
    } else {
      bloqueado = true;
      setTimeout(() => { primera.volteada = false; carta.volteada = false; primera = null; bloqueado = false; render(); }, 1100);
    }
  }
  render();
})();
