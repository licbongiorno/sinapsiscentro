(function () {
  const contenedor = document.getElementById("jgContenedor");
  const REGLAS = [
    { nombre: "par", cumple: n => n % 2 === 0 },
    { nombre: "impar", cumple: n => n % 2 !== 0 },
    { nombre: "múltiplo de 5", cumple: n => n % 5 === 0 },
    { nombre: "mayor que 50", cumple: n => n > 50 },
    { nombre: "menor que 20", cumple: n => n < 20 },
    { nombre: "termina en 7", cumple: n => n % 10 === 7 },
  ];
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "regla-secreta", vidas: 3, tiempoSegundos: null });

  function numeroQueCumple(regla) {
    let n;
    do { n = 1 + Math.floor(Math.random() * 98); } while (!regla.cumple(n));
    return n;
  }
  function numeroQueNoCumple(regla) {
    let n;
    do { n = 1 + Math.floor(Math.random() * 98); } while (regla.cumple(n));
    return n;
  }

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Descubriste todas las reglas!" });
      return;
    }
    const regla = REGLAS[Math.floor(Math.random() * REGLAS.length)];
    const ejemplos = [numeroQueCumple(regla), numeroQueCumple(regla), numeroQueCumple(regla)];
    const correcta = numeroQueCumple(regla);
    const opciones = [correcta, numeroQueNoCumple(regla), numeroQueNoCumple(regla)].sort(() => Math.random() - 0.5);

    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Ronda ${ronda} de ${TOTAL}</p>
        <p style="color:var(--text-mid);margin-bottom:6px;font-size:0.9rem;">Estos números tienen algo en común:</p>
        <div style="font-size:1.8rem;font-weight:800;color:var(--navy);margin-bottom:20px;">${ejemplos.join(" · ")}</div>
        <p style="color:var(--text-mid);margin-bottom:12px;font-size:0.9rem;">¿Cuál de estos sigue la misma regla?</p>
        <div class="jg-opciones">
          ${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.v) === correcta) {
        btn.classList.add("correcta");
        GameEngine.sumarPuntos(12);
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
