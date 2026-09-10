(function () {
  const contenedor = document.getElementById("jgContenedor");
  let combo = 0, mejorCombo = 0;

  GameEngine.iniciar({ juegoId: "combo-mental", vidas: 3, tiempoSegundos: 40 });

  function ronda() {
    const a = 1 + Math.floor(Math.random() * 12), b = 1 + Math.floor(Math.random() * 12);
    const resultado = a + b;
    const opciones = new Set([resultado]);
    while (opciones.size < 3) opciones.add(resultado + (Math.floor(Math.random() * 6) - 3));
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--teal);font-weight:800;font-size:0.85rem;margin-bottom:6px;">🔥 Combo: ${combo}</p>
        <div style="font-size:2rem;font-weight:800;color:var(--navy);margin:10px 0 22px;">${a} + ${b}</div>
        <div class="jg-opciones">${[...opciones].sort(() => Math.random() - 0.5).map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.v) === resultado) {
        combo += 1;
        mejorCombo = Math.max(mejorCombo, combo);
        GameEngine.sumarPuntos(5 + combo);
      } else {
        combo = 0;
        GameEngine.restarVida();
      }
      ronda();
    }));
  }

  ronda();
})();
