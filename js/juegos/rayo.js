(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 8;

  GameEngine.iniciar({ juegoId: "rayo", vidas: null, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste el desafío!" }); return; }
    contenedor.innerHTML = `
      <div id="zonaRayo" style="width:min(90vw,320px);height:min(90vw,320px);margin:0 auto;border-radius:26px;background:var(--navy);display:flex;align-items:center;justify-content:center;color:white;font-weight:800;">Preparate…</div>`;
    const zona = document.getElementById("zonaRayo");
    let listo = false, inicio = 0;
    const espera = 1000 + Math.random() * 2000;
    setTimeout(() => {
      listo = true; inicio = Date.now();
      zona.style.background = "#e0c040";
      zona.textContent = "¡YA!";
    }, espera);
    zona.addEventListener("click", () => {
      if (!listo) { zona.style.background = "#e06060"; zona.textContent = "Muy pronto 😅"; setTimeout(nuevaRonda, 800); return; }
      const ms = Date.now() - inicio;
      GameEngine.sumarPuntos(Math.max(5, Math.round(350 - ms / 3)));
      zona.textContent = `${ms} ms`;
      setTimeout(nuevaRonda, 700);
    });
  }

  nuevaRonda();
})();
