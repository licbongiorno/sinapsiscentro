(function () {
  const BANCO = [
    ["😊","Alegría"], ["😢","Tristeza"], ["😠","Enojo"], ["😨","Miedo"], ["😲","Sorpresa"], ["😌","Calma"],
    ["😳","Vergüenza"], ["🥹","Ternura"], ["😤","Frustración"], ["😴","Cansancio"], ["🤢","Asco"], ["😕","Confusión"],
  ];
  const contenedor = document.getElementById("jgContenedor");
  const NIVELES = [3, 5, 6];
  let nivel = 0;
  let cartas, primera, bloqueado, aciertos;

  GameEngine.iniciar({ juegoId: "memoria-emocional", vidas: null, tiempoSegundos: null });

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
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Nivel ${nivel + 1} de ${NIVELES.length} — ${NIVELES[nivel]} pares</p>
      <div class="jg-tablero" style="grid-template-columns: repeat(4, 1fr);">
      ${cartas.map(c => `<div class="jg-carta ${c.volteada || c.encontrada ? "volteada" : ""} ${c.encontrada ? "encontrada" : ""}" data-id="${c.id}" style="font-size:${c.txt.length > 2 ? "0.78rem" : "1.8rem"};">${c.volteada || c.encontrada ? c.txt : "❓"}</div>`).join("")}
    </div>`;
    contenedor.querySelectorAll(".jg-carta").forEach(el => el.addEventListener("click", () => voltear(Number(el.dataset.id))));
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
