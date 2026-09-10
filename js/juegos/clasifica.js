(function () {
  const contenedor = document.getElementById("jgContenedor");
  const FORMAS = [{ id: "circulo", simbolo: "●" }, { id: "cuadrado", simbolo: "■" }, { id: "triangulo", simbolo: "▲" }];
  const COLORES = [{ id: "azul", hex: "#2aaec2" }, { id: "rojo", hex: "#e06060" }, { id: "verde", hex: "#4caf6a" }];
  let ronda = 0;
  const TOTAL = 10;

  GameEngine.iniciar({ juegoId: "clasifica", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las clasificaciones!" });
      return;
    }
    const porColor = Math.random() < 0.5;
    const forma = FORMAS[Math.floor(Math.random() * FORMAS.length)];
    const color = COLORES[Math.floor(Math.random() * COLORES.length)];
    const objetivo = porColor ? COLORES[Math.floor(Math.random() * COLORES.length)] : FORMAS[Math.floor(Math.random() * FORMAS.length)];
    const vaIzquierda = porColor ? color.id === objetivo.id : forma.id === objetivo.id;

    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Ronda ${ronda} de ${TOTAL}</p>
        <p style="font-weight:800;color:var(--navy);margin-bottom:20px;">
          Regla: ${porColor ? `color <span style="color:${objetivo.hex}">${objetivo.id}</span> a la IZQUIERDA` : `forma ${objetivo.simbolo} a la IZQUIERDA`}, el resto a la DERECHA
        </p>
        <div style="font-size:4rem;color:${color.hex};margin-bottom:26px;">${forma.simbolo}</div>
        <div style="display:flex;justify-content:center;gap:14px;">
          <button data-v="izq" class="ge-btn ge-btn-secundario" style="flex:1;max-width:160px;">← Izquierda</button>
          <button data-v="der" class="ge-btn ge-btn-secundario" style="flex:1;max-width:160px;">Derecha →</button>
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      const eligioIzquierda = btn.dataset.v === "izq";
      if (eligioIzquierda === vaIzquierda) {
        GameEngine.sumarPuntos(10);
        nuevaRonda();
      } else {
        GameEngine.restarVida();
        setTimeout(nuevaRonda, 400);
      }
    }));
  }

  nuevaRonda();
})();
