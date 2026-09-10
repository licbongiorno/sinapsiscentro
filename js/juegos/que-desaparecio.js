(function () {
  const BANCO = ["🍎","🍌","🍇","🍓","🥝","🍑","🍒","🍋","🥕","🌽","🍆","🥦","🐶","🐱","🐰","🦋","⚽","🎈","🎸","☂️"];
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 6;

  GameEngine.iniciar({ juegoId: "que-desaparecio", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las rondas!" });
      return;
    }
    const cantidad = Math.min(9, 5 + Math.floor(ronda / 2));
    const barajado = [...BANCO].sort(() => Math.random() - 0.5).slice(0, cantidad);
    const faltanteIdx = Math.floor(Math.random() * cantidad);

    mostrarEscena(barajado, "Memorizá la escena…");
    setTimeout(() => {
      const conFalta = barajado.filter((_, i) => i !== faltanteIdx);
      contenedor.innerHTML = `
        <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Ronda ${ronda} de ${TOTAL} — ¿qué desapareció?</p>
        <div class="jg-grilla-simbolos" style="grid-template-columns: repeat(${Math.ceil(Math.sqrt(cantidad))}, 1fr); margin-bottom:22px;">
          ${conFalta.map(s => `<div class="jg-simbolo" style="cursor:default;">${s}</div>`).join("")}
        </div>
        <div class="jg-opciones" id="opcionesFaltante"></div>`;
      const opciones = [...conFalta.slice(0, 3), barajado[faltanteIdx]].sort(() => Math.random() - 0.5);
      document.getElementById("opcionesFaltante").innerHTML = opciones.map(o =>
        `<button class="jg-opcion" data-v="${o}" style="text-align:center;font-size:1.3rem;">${o}</button>`).join("");
      document.querySelectorAll("#opcionesFaltante .jg-opcion").forEach(btn => btn.addEventListener("click", () => {
        if (btn.dataset.v === barajado[faltanteIdx]) {
          GameEngine.sumarPuntos(15);
          nuevaRonda();
        } else {
          GameEngine.restarVida();
          btn.classList.add("incorrecta");
          btn.disabled = true;
        }
      }));
    }, 2200);
  }

  function mostrarEscena(items, titulo) {
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">${titulo}</p>
      <div class="jg-grilla-simbolos" style="grid-template-columns: repeat(${Math.ceil(Math.sqrt(items.length))}, 1fr);">
        ${items.map(s => `<div class="jg-simbolo" style="cursor:default;">${s}</div>`).join("")}
      </div>`;
  }

  nuevaRonda();
})();
