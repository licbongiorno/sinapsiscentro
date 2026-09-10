(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PARES = [
    ["Feliz","Triste"], ["Grande","Chico"], ["Rápido","Lento"], ["Claro","Oscuro"],
    ["Fuerte","Débil"], ["Cerca","Lejos"], ["Lleno","Vacío"], ["Duro","Blando"],
    ["Fácil","Difícil"], ["Caliente","Frío"], ["Abierto","Cerrado"], ["Ruidoso","Silencioso"],
  ];
  let orden = [...PARES].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "antonimo", vidas: 3, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todos los antónimos!" });
      return;
    }
    const [palabra, correcta] = orden[i];
    const distractores = orden.filter((_, idx) => idx !== i).map(p => p[1]).sort(() => Math.random() - 0.5).slice(0, 2);
    const opciones = [correcta, ...distractores].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">${i + 1} / ${orden.length}</p>
        <p style="font-weight:800;font-size:1.6rem;color:var(--navy);margin-bottom:22px;">${palabra}</p>
        <div class="jg-opciones">
          ${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === correcta) { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); GameEngine.restarVida(); }
      setTimeout(() => { i += 1; render(); }, 500);
    }));
  }

  render();
})();
