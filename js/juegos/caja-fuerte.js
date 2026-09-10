(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 5;

  GameEngine.iniciar({ juegoId: "caja-fuerte", vidas: 3, tiempoSegundos: null });

  function generarCodigo() {
    const d1 = 1 + Math.floor(Math.random() * 8);
    const d2 = Math.floor(Math.random() * 10);
    const d3 = 1 + Math.floor(Math.random() * 9);
    return [d1, d2, d3];
  }

  function pistas(codigo) {
    const [a, b, c] = codigo;
    return [
      `El primer dígito es ${a % 2 === 0 ? "par" : "impar"}.`,
      `La suma de los tres dígitos es ${a + b + c}.`,
      `El último dígito es ${c > a ? "mayor" : "menor o igual"} que el primero.`,
    ];
  }

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Abriste todas las cajas fuertes!" }); return; }
    const codigo = generarCodigo();
    const correcta = codigo.join("");
    const opciones = new Set([correcta]);
    while (opciones.size < 4) {
      const falso = generarCodigo().join("");
      if (falso !== correcta) opciones.add(falso);
    }
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Caja ${ronda} de ${TOTAL}</p>
        <div style="text-align:left;background:white;border-radius:var(--r-lg);padding:20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);max-width:380px;margin:0 auto 18px;">
          ${pistas(codigo).map(p => `<p style="margin-bottom:6px;color:var(--text-mid);">🔒 ${p}</p>`).join("")}
        </div>
        <div class="jg-opciones">${[...opciones].sort(() => Math.random() - 0.5).map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;font-weight:800;letter-spacing:0.1em;">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === correcta) { btn.classList.add("correcta"); GameEngine.sumarPuntos(15); }
      else { btn.classList.add("incorrecta"); GameEngine.restarVida(); }
      setTimeout(nuevaRonda, 600);
    }));
  }

  nuevaRonda();
})();
