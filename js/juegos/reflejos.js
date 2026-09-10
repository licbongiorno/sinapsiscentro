(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 6;
  let tiempoAparicion = 0;
  let esperandoToque = false;
  let timeoutId = null;
  const tiempos = [];

  GameEngine.iniciar({ juegoId: "toca-cuando-aparezca", vidas: null, tiempoSegundos: null });

  function estadoEspera() {
    esperandoToque = false;
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);margin-bottom:20px;">Ronda ${ronda + 1} de ${TOTAL} — esperá el círculo verde…</p>
      <div id="zonaReflejo" style="width:min(90vw,320px);height:min(90vw,320px);margin:0 auto;border-radius:50%;background:#e06060;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:1.1rem;cursor:pointer;transition:background 0.15s;">Esperá…</div>`;
    const zona = document.getElementById("zonaReflejo");
    zona.addEventListener("click", () => {
      if (esperandoToque) {
        registrar(Date.now() - tiempoAparicion);
      } else {
        // tocó antes de tiempo
        clearTimeout(timeoutId);
        zona.style.background = "#a04040";
        zona.textContent = "¡Muy pronto! 😅";
        GameEngine.sumarPuntos(0);
        setTimeout(siguienteRonda, 900);
      }
    });
    const espera = 1200 + Math.random() * 2200;
    timeoutId = setTimeout(() => {
      esperandoToque = true;
      tiempoAparicion = Date.now();
      zona.style.background = "#4caf6a";
      zona.textContent = "¡YA!";
    }, espera);
  }

  function registrar(ms) {
    tiempos.push(ms);
    const puntos = Math.max(5, Math.round(400 - ms / 3));
    GameEngine.sumarPuntos(puntos);
    contenedor.querySelector("#zonaReflejo").textContent = `${ms} ms`;
    setTimeout(siguienteRonda, 700);
  }

  function siguienteRonda() {
    ronda += 1;
    if (ronda >= TOTAL) {
      const promedio = Math.round(tiempos.reduce((a, b) => a + b, 0) / (tiempos.length || 1));
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: `Tiempo de reacción promedio: ${promedio} ms` });
      return;
    }
    estadoEspera();
  }

  estadoEspera();
})();
