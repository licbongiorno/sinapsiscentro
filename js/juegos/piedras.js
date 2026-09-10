(function () {
  const contenedor = document.getElementById("jgContenedor");
  const TAMS = [70, 60, 52, 44, 38, 32];
  let pila = 0;
  const MAX = TAMS.length;

  GameEngine.iniciar({ juegoId: "piedras", vidas: null, tiempoSegundos: null });

  function render() {
    contenedor.innerHTML = `
      <div style="text-align:center;padding:20px 0;">
        <p style="color:var(--text-mid);margin-bottom:20px;font-size:0.9rem;">Tocá despacio para apilar una piedra a la vez.</p>
        <div style="display:flex;flex-direction:column-reverse;align-items:center;gap:4px;min-height:280px;justify-content:flex-end;">
          ${Array.from({ length: pila }, (_, i) => `<div style="width:${TAMS[i]}px;height:${TAMS[i] * 0.55}px;border-radius:50%;background:linear-gradient(135deg,#b8a488,#9c8a6e);box-shadow:0 4px 8px rgba(0,0,0,0.15);"></div>`).join("")}
        </div>
        <button id="btnApilar" class="ge-btn ge-btn-principal" style="margin-top:20px;" ${pila >= MAX ? "disabled" : ""}>${pila >= MAX ? "Pila completa" : "Apilar piedra"}</button>
      </div>`;
    document.getElementById("btnApilar").addEventListener("click", () => {
      pila += 1;
      GameEngine.sumarPuntos(0);
      if (pila >= MAX) {
        setTimeout(() => GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Tu pila de piedras quedó en equilibrio. 🪨" }), 500);
      }
      render();
    });
  }

  render();
})();
