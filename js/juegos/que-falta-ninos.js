(function () {
  const BANCO = ["🍎","🍌","🍇","🐶","🐱","🐰","⚽","🎈","🚗","🌟","🌸","🦋"];
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 6;

  GameEngine.iniciar({ juegoId: "que-falta-ninos", vidas: null, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Muy bien! 🎉" });
      return;
    }
    const cantidad = Math.min(6, 3 + Math.floor(ronda / 2));
    const items = [...BANCO].sort(() => Math.random() - 0.5).slice(0, cantidad);
    const faltanteIdx = Math.floor(Math.random() * cantidad);

    mostrar(items, "Mirá bien…");
    setTimeout(() => {
      const conFalta = items.filter((_, i) => i !== faltanteIdx);
      contenedor.innerHTML = `
        <p style="text-align:center;color:var(--text-mid);font-size:0.9rem;margin-bottom:12px;">¿Qué falta?</p>
        <div style="display:flex;justify-content:center;gap:10px;font-size:2rem;margin-bottom:24px;">
          ${conFalta.map(s => `<span>${s}</span>`).join("")}
        </div>
        <div class="jg-opciones" id="opcionesFaltaNinos"></div>`;
      const opciones = [items[faltanteIdx], ...BANCO.filter(b => !items.includes(b)).sort(() => Math.random() - 0.5).slice(0, 2)].sort(() => Math.random() - 0.5);
      document.getElementById("opcionesFaltaNinos").innerHTML = opciones.map(o =>
        `<button class="jg-opcion" data-v="${o}" style="text-align:center;font-size:1.6rem;">${o}</button>`).join("");
      document.querySelectorAll("#opcionesFaltaNinos .jg-opcion").forEach(btn => btn.addEventListener("click", () => {
        if (btn.dataset.v === items[faltanteIdx]) GameEngine.sumarPuntos(10);
        nuevaRonda();
      }));
    }, 1800);
  }

  function mostrar(items, titulo) {
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.9rem;margin-bottom:12px;">${titulo}</p>
      <div style="display:flex;justify-content:center;gap:10px;font-size:2rem;">${items.map(s => `<span>${s}</span>`).join("")}</div>`;
  }

  nuevaRonda();
})();
