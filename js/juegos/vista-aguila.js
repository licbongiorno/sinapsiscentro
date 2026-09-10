(function () {
  const contenedor = document.getElementById("jgContenedor");
  const BASE = ["🌳","🏠","☁️","🚗","🌼","🐦","⛰️","🪨","🌞","🪵","🍂","🧱"];
  let ronda = 0;
  const TOTAL = 6;

  GameEngine.iniciar({ juegoId: "vista-aguila", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las rondas!" }); return; }
    const tam = 10;
    const fila = Array.from({ length: tam }, () => BASE[Math.floor(Math.random() * BASE.length)]);
    const copia = [...fila];
    const idxCambio = Math.floor(Math.random() * tam);
    let nuevoItem;
    do { nuevoItem = BASE[Math.floor(Math.random() * BASE.length)]; } while (nuevoItem === copia[idxCambio]);
    copia[idxCambio] = nuevoItem;

    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Ronda ${ronda} de ${TOTAL} — encontrá lo que cambió en la fila de abajo</p>
        <div style="display:flex;justify-content:center;gap:4px;font-size:1.3rem;margin-bottom:10px;">${fila.map(s => `<span>${s}</span>`).join("")}</div>
        <div style="display:flex;justify-content:center;gap:4px;font-size:1.3rem;" id="filaCambio">${copia.map((s, i) => `<span data-i="${i}" style="cursor:pointer;">${s}</span>`).join("")}</div>
      </div>`;
    document.querySelectorAll("#filaCambio [data-i]").forEach(el => {
      el.addEventListener("click", () => {
        if (Number(el.dataset.i) === idxCambio) { GameEngine.sumarPuntos(12); nuevaRonda(); }
        else { GameEngine.restarVida(); el.style.opacity = "0.3"; }
      });
    });
  }

  nuevaRonda();
})();
