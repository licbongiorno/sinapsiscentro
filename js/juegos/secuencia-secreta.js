(function () {
  const contenedor = document.getElementById("jgContenedor");
  const SIMBOLOS = ["🔴","🔵","🟢","🟡","🟣","🟠"];
  let nivel = 3;
  const NIVEL_MAX = 8;

  GameEngine.iniciar({ juegoId: "secuencia-secreta", vidas: 3, tiempoSegundos: null });

  function nuevoNivel() {
    if (nivel > NIVEL_MAX) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Llegaste al nivel máximo!" });
      return;
    }
    const secuencia = Array.from({ length: nivel }, () => SIMBOLOS[Math.floor(Math.random() * SIMBOLOS.length)]);
    contenedor.innerHTML = `<p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;">Nivel ${nivel - 2} — memorizá el orden</p>
      <div style="display:flex;justify-content:center;gap:10px;font-size:2rem;flex-wrap:wrap;">${secuencia.map(s => `<span>${s}</span>`).join("")}</div>`;

    setTimeout(() => {
      let respuesta = [];
      const opciones = [...SIMBOLOS].sort(() => Math.random() - 0.5);
      function pintar() {
        contenedor.innerHTML = `
          <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Repetí el orden</p>
          <div style="min-height:50px;display:flex;justify-content:center;gap:8px;margin-bottom:20px;font-size:1.6rem;">
            ${respuesta.map(s => `<span>${s}</span>`).join("") || "<span style='opacity:0.3'>…</span>"}
          </div>
          <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
            ${opciones.map(s => `<button data-v="${s}" style="width:52px;height:52px;border-radius:14px;border:2px solid var(--teal-pale);background:white;font-size:1.6rem;cursor:pointer;">${s}</button>`).join("")}
          </div>`;
        contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
          respuesta.push(btn.dataset.v);
          const idx = respuesta.length - 1;
          if (respuesta[idx] !== secuencia[idx]) {
            GameEngine.restarVida();
            nivel = 3; // reinicia dificultad
            setTimeout(nuevoNivel, 700);
            return;
          }
          if (respuesta.length === secuencia.length) {
            GameEngine.sumarPuntos(nivel * 5);
            nivel += 1;
            setTimeout(nuevoNivel, 600);
            return;
          }
          pintar();
        }));
      }
      pintar();
    }, 900 + nivel * 350);
  }

  nuevoNivel();
})();
