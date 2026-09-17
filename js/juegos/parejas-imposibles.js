(function () {
  const BANCO = [
    ["🔑","🔒"], ["🐝","🍯"], ["✏️","📓"], ["⚡","🔋"], ["🌂","🌧️"], ["🧦","👟"],
    ["🪥","🦷"], ["🧲","🔩"], ["🕯️","🔥"], ["🧵","🪡"], ["🎣","🐟"], ["🔨","🪵"],
    ["🧼","🛁"], ["🪞","💄"],
  ];
  const contenedor = document.getElementById("jgContenedor");
  const NIVELES = [4, 6, 8];
  let nivel = 0;
  let cartas, primera, bloqueado, aciertos;

  GameEngine.iniciar({ juegoId: "parejas-imposibles", vidas: null, tiempoSegundos: null });

  function nuevoNivel() {
    if (nivel >= NIVELES.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste los tres niveles!" });
      return;
    }
    const cantidad = NIVELES[nivel];
    const elegidos = [...BANCO].sort(() => Math.random() - 0.5).slice(0, cantidad);
    cartas = [];
    elegidos.forEach((p, g) => { cartas.push({ g, txt: p[0] }, { g, txt: p[1] }); });
    cartas = cartas.map((c, id) => ({ ...c, id, volteada: false, encontrada: false })).sort(() => Math.random() - 0.5);
    primera = null; bloqueado = false; aciertos = 0;
    render();
  }

  function render() {
    const idEnfocada = contenedor.querySelector(".jg-carta:focus")?.dataset.id;
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Nivel ${nivel + 1} de ${NIVELES.length} — ${NIVELES[nivel]} pares</p>
      <div class="jg-tablero" style="grid-template-columns: repeat(4, 1fr);">
      ${cartas.map(c => `<button type="button" class="jg-carta ${c.volteada || c.encontrada ? "volteada" : ""} ${c.encontrada ? "encontrada" : ""}" data-id="${c.id}" aria-label="Carta ${c.id + 1} de ${cartas.length}${c.encontrada ? `, encontrada: ${c.txt}` : (c.volteada ? `: ${c.txt}` : ", boca abajo")}">${c.volteada || c.encontrada ? c.txt : "❓"}</button>`).join("")}
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
      if (aciertos === NIVELES[nivel]) { nivel += 1; setTimeout(nuevoNivel, 600); }
    } else {
      bloqueado = true;
      setTimeout(() => { primera.volteada = false; carta.volteada = false; primera = null; bloqueado = false; render(); }, 900);
    }
  }

  nuevoNivel();
})();
