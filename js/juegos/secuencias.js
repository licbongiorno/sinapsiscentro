(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "secuencias", vidas: 3, tiempoSegundos: null });

  function generar() {
    const tipo = Math.random() < 0.5 ? "suma" : "geometrica";
    let secuencia = [];
    let siguiente, opciones;
    if (tipo === "suma") {
      const inicio = 1 + Math.floor(Math.random() * 10);
      const paso = 1 + Math.floor(Math.random() * (5 + ronda));
      secuencia = Array.from({ length: 4 }, (_, i) => inicio + i * paso);
      siguiente = inicio + 4 * paso;
    } else {
      const inicio = 1 + Math.floor(Math.random() * 3);
      const factor = 2;
      secuencia = Array.from({ length: 4 }, (_, i) => inicio * Math.pow(factor, i));
      siguiente = inicio * Math.pow(factor, 4);
    }
    opciones = new Set([siguiente]);
    while (opciones.size < 4) {
      const ruido = siguiente + (Math.floor(Math.random() * 10) - 5) * (Math.floor(Math.random() * 3) + 1);
      if (ruido > 0 && ruido !== siguiente) opciones.add(ruido);
    }
    return { secuencia, siguiente, opciones: [...opciones].sort(() => Math.random() - 0.5) };
  }

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las secuencias!" });
      return;
    }
    const { secuencia, siguiente, opciones } = generar();
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;">Ronda ${ronda} de ${TOTAL}</p>
        <div style="font-size:1.8rem;font-weight:800;color:var(--navy);margin-bottom:24px;letter-spacing:0.05em;">
          ${secuencia.join(" · ")} · <span style="color:var(--teal-mid);">?</span>
        </div>
        <div class="jg-opciones">
          ${opciones.map(o => `<button class="jg-opcion" data-v="${o}">${o}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.v) === siguiente) {
        btn.classList.add("correcta");
        GameEngine.sumarPuntos(15);
        setTimeout(nuevaRonda, 500);
      } else {
        btn.classList.add("incorrecta");
        GameEngine.restarVida();
        btn.disabled = true;
      }
    }));
  }

  nuevaRonda();
})();
