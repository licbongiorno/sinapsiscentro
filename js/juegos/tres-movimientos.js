(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 5;

  GameEngine.iniciar({ juegoId: "tres-movimientos", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Resolviste todos los rompecabezas!" }); return; }
    let numeros = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
    while (JSON.stringify(numeros) === "[1,2,3,4]") numeros = [1, 2, 3, 4].sort(() => Math.random() - 0.5);
    let movimientos = 0;
    const LIMITE = 3;
    let seleccionado = null;

    function render() {
      const ordenado = numeros.every((n, i) => n === i + 1);
      if (ordenado) { GameEngine.sumarPuntos(20); setTimeout(nuevaRonda, 500); return; }
      if (movimientos >= LIMITE) { GameEngine.restarVida(); setTimeout(nuevaRonda, 500); return; }
      contenedor.innerHTML = `
        <div style="text-align:center;">
          <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Ronda ${ronda} de ${TOTAL}</p>
          <p style="font-weight:700;color:var(--navy);margin-bottom:18px;">Ordená de menor a mayor tocando dos números para intercambiarlos. Tenés ${LIMITE - movimientos} movimiento(s).</p>
          <div style="display:flex;justify-content:center;gap:10px;">
            ${numeros.map((n, i) => `<button data-i="${i}" style="width:56px;height:56px;border-radius:14px;border:2px solid var(--teal-pale);background:${seleccionado === i ? "var(--teal-mid)" : "white"};color:${seleccionado === i ? "white" : "var(--navy)"};font-weight:800;font-size:1.3rem;cursor:pointer;">${n}</button>`).join("")}
          </div>
        </div>`;
      contenedor.querySelectorAll("[data-i]").forEach(btn => btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        if (seleccionado === null) { seleccionado = i; render(); return; }
        if (seleccionado === i) { seleccionado = null; render(); return; }
        [numeros[seleccionado], numeros[i]] = [numeros[i], numeros[seleccionado]];
        movimientos += 1; seleccionado = null;
        render();
      }));
    }
    render();
  }

  nuevaRonda();
})();
