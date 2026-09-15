(function () {
  const contenedor = document.getElementById("jgContenedor");
  const id = new URLSearchParams(window.location.search).get("id") || "";

  const BANCOS = /*__BANCOS__*/{"memoria-banderas-paises": {"simbolos": ["🇦🇷", "🇧🇷", "🇯🇵", "🇫🇷", "🇪🇬", "🇮🇳"]}, "memoria-planetas": {"simbolos": ["🪐", "🌍", "🌙", "⭐", "☄️", "🌞"]}, "memoria-herramientas": {"simbolos": ["🔨", "🔧", "🪛", "🪚", "⚙️", "🧰"]}, "memoria-transporte": {"simbolos": ["🚗", "🚲", "✈️", "🚢", "🚂", "🚁"]}, "memoria-clima-avanzada": {"simbolos": ["☀️", "🌧️", "❄️", "⛈️", "🌈", "🌪️"]}, "memoria-deportes": {"simbolos": ["⚽", "🏀", "🎾", "🏐", "🏈", "⚾"]}, "memoria-insectos": {"simbolos": ["🐝", "🦋", "🐞", "🐜", "🦗", "🕷️"]}, "memoria-postres": {"simbolos": ["🍰", "🍩", "🍪", "🧁", "🍫", "🍦"]}, "memoria-flores": {"simbolos": ["🌹", "🌻", "🌷", "🌸", "🌺", "🌼"]}, "memoria-profesiones": {"simbolos": ["👨‍⚕️", "👩‍🏫", "👨‍🍳", "👮", "👩‍🚀", "👨‍🎨"]}, "memoria-instrumentos-avanzada": {"simbolos": ["🎸", "🎹", "🥁", "🎻", "🎺", "🪕", "🎷"]}, "memoria-frutas-tropicales": {"simbolos": ["🥭", "🍍", "🥥", "🍈", "🍉", "🍋"]}, "memoria-mar-profundo": {"simbolos": ["🐙", "🦑", "🐡", "🦈", "🐠", "🦞"]}, "memoria-utiles-escolares": {"simbolos": ["✏️", "📏", "📐", "🖊️", "📓", "🎒"]}, "memoria-cielo-nocturno": {"simbolos": ["🌙", "⭐", "🌠", "🛸", "🪐", "☄️", "✨"]}, "memoria-paises-texto": {"simbolos": ["Argentina", "Brasil", "Japón", "Francia", "Egipto", "Canadá"]}, "memoria-verbos-comunes": {"simbolos": ["Correr", "Saltar", "Cantar", "Bailar", "Reír", "Soñar"]}, "memoria-colores-en-palabras": {"simbolos": ["Rojo", "Azul", "Verde", "Amarillo", "Violeta", "Naranja"]}, "memoria-emociones-en-palabras": {"simbolos": ["Alegría", "Tristeza", "Sorpresa", "Calma", "Enojo", "Orgullo"]}, "memoria-animales-selva-jg": {"simbolos": ["🦁", "🐘", "🦒", "🦓", "🐆", "🦍"]}, "memoria-animales-granja-jg": {"simbolos": ["🐄", "🐖", "🐑", "🐓", "🐴", "🐇"]}, "memoria-juguetes": {"simbolos": ["🧸", "🪀", "🎈", "🪁", "🎲", "🧩"]}, "memoria-numeros-ninos": {"simbolos": ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣"]}, "memoria-formas-ninos-jg": {"simbolos": ["🔵", "🟥", "🔺", "⭐", "🟢"]}, "memoria-clima-ninos": {"simbolos": ["☀️", "🌧️", "❄️", "⛄", "🌈"]}}/*__FIN_BANCOS__*/;
  const banco = BANCOS[id];
  if (!banco) { contenedor.innerHTML = "<p style='text-align:center;'>Juego no encontrado.</p>"; return; }

  const SIMBOLOS = banco.simbolos;
  let cartas = [...SIMBOLOS, ...SIMBOLOS]
    .sort(() => Math.random() - 0.5)
    .map((s, idx) => ({ id: idx, simbolo: s, volteada: false, encontrada: false }));

  let primera = null, bloqueado = false, aciertos = 0, intentos = 0;
  const columnas = SIMBOLOS.length <= 5 ? 4 : (SIMBOLOS.length <= 7 ? 4 : 5);

  GameEngine.iniciar({ juegoId: id, vidas: null, tiempoSegundos: null });

  function render() {
    contenedor.innerHTML = `<div class="jg-tablero" style="grid-template-columns: repeat(${columnas}, 1fr);">
      ${cartas.map(c => `
        <div class="jg-carta ${c.volteada || c.encontrada ? "volteada" : ""} ${c.encontrada ? "encontrada" : ""}" data-id="${c.id}">
          ${c.volteada || c.encontrada ? c.simbolo : "❓"}
        </div>`).join("")}
    </div>`;
    contenedor.querySelectorAll(".jg-carta").forEach(el =>
      el.addEventListener("click", () => voltear(Number(el.dataset.id))));
  }

  function voltear(idCarta) {
    if (bloqueado) return;
    const carta = cartas.find(c => c.id === idCarta);
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
