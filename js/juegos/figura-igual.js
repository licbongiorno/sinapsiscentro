(function () {
  const contenedor = document.getElementById("jgContenedor");
  const FORMAS = ["●","■","▲","★"];
  const COLORES = ["#e06060", "#2aaec2", "#4caf6a", "#e0c040"];
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "figura-igual", vidas: null, tiempoSegundos: null });

  function itemAleatorio() {
    return { forma: FORMAS[Math.floor(Math.random() * FORMAS.length)], color: COLORES[Math.floor(Math.random() * COLORES.length)] };
  }

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Encontraste todas las figuras iguales! 🔷" });
      return;
    }
    const objetivo = itemAleatorio();
    const opciones = [objetivo];
    while (opciones.length < 4) {
      const it = itemAleatorio();
      if (it.forma === objetivo.forma && it.color === objetivo.color) continue;
      opciones.push(it);
    }
    const lista = opciones.sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.9rem;margin-bottom:8px;">Tocá la figura igual a esta</p>
      <div style="text-align:center;font-size:3rem;color:${objetivo.color};margin-bottom:22px;">${objetivo.forma}</div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:14px;width:min(90vw,280px);margin:0 auto;">
        ${lista.map((o, idx) => `<button data-i="${idx}" class="jg-opcion" style="font-size:2.4rem;color:${o.color};aspect-ratio:1;">${o.forma}</button>`).join("")}
      </div>`;
    contenedor.querySelectorAll("[data-i]").forEach((btn, idx) => btn.addEventListener("click", () => {
      const elegido = lista[idx];
      if (elegido.forma === objetivo.forma && elegido.color === objetivo.color) GameEngine.sumarPuntos(10);
      nuevaRonda();
    }));
  }

  nuevaRonda();
})();
