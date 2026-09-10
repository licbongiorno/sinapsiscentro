(function () {
  const contenedor = document.getElementById("jgContenedor");
  const SECUENCIAS = [
    ["🌱","🌿","🌳"],
    ["🥚","🐣","🐥"],
    ["☀️","🌤️","🌙"],
    ["👶","🧒","🧑"],
  ];
  let orden = [...SECUENCIAS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "secuencias-infantiles", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Muy bien ordenado! 🎉" }); return; }
    const correcta = orden[i];
    const mezclada = [...correcta].sort(() => Math.random() - 0.5);
    let elegidos = [];

    function pintar() {
      contenedor.innerHTML = `
        <div style="text-align:center;">
          <p style="color:var(--text-mid);font-size:0.9rem;margin-bottom:16px;">Tocá en el orden correcto</p>
          <div style="min-height:50px;display:flex;justify-content:center;gap:10px;margin-bottom:24px;font-size:2rem;">
            ${elegidos.map(s => `<span>${s}</span>`).join("") || "<span style='opacity:0.3'>…</span>"}
          </div>
          <div style="display:flex;justify-content:center;gap:14px;">
            ${mezclada.map((s, idx) => `<button data-idx="${idx}" style="font-size:2.2rem;background:white;border:2px solid var(--teal-pale);border-radius:14px;width:70px;height:70px;cursor:pointer;">${s}</button>`).join("")}
          </div>
        </div>`;
      contenedor.querySelectorAll("[data-idx]").forEach(btn => btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.idx);
        const val = mezclada[idx];
        elegidos.push(val);
        mezclada.splice(idx, 1);
        const pos = elegidos.length - 1;
        if (elegidos[pos] !== correcta[pos]) {
          setTimeout(() => { i += 1; render(); }, 500);
          return;
        }
        if (elegidos.length === correcta.length) {
          GameEngine.sumarPuntos(15);
          setTimeout(() => { i += 1; render(); }, 500);
          return;
        }
        pintar();
      }));
    }
    pintar();
  }

  render();
})();
