(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 10;

  GameEngine.iniciar({ juegoId: "atrapa-circulo", vidas: 3, tiempoSegundos: null });

  contenedor.innerHTML = `
    <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;" id="rondaTexto">Ronda 1 de ${TOTAL}</p>
    <div id="zonaJuego" style="position:relative;width:min(92vw,420px);height:56vh;max-height:420px;margin:0 auto;background:var(--bg);border:2px solid var(--teal-pale);border-radius:var(--r-lg);overflow:hidden;"></div>`;
  const zona = document.getElementById("zonaJuego");

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste todas las rondas!" });
      return;
    }
    document.getElementById("rondaTexto").textContent = `Ronda ${ronda} de ${TOTAL}`;
    zona.innerHTML = "";
    const tam = Math.max(36, 64 - ronda * 2);
    const circulo = document.createElement("div");
    const maxX = zona.clientWidth - tam, maxY = zona.clientHeight - tam;
    circulo.style.cssText = `position:absolute;width:${tam}px;height:${tam}px;border-radius:50%;background:linear-gradient(135deg,var(--teal),var(--teal-mid));cursor:pointer;left:0;top:0;transform:translate(${Math.random()*maxX}px,${Math.random()*maxY}px);transition:transform 0.25s cubic-bezier(0.77, 0, 0.175, 1);`;
    zona.appendChild(circulo);

    let escapando = true;
    const escape = setInterval(() => {
      if (!escapando) return;
      circulo.style.transform = `translate(${Math.random() * maxX}px,${Math.random() * maxY}px)`;
    }, 550);

    let terminada = false;
    circulo.addEventListener("click", () => {
      if (terminada) return;
      terminada = true;
      escapando = false;
      clearInterval(escape);
      GameEngine.sumarPuntos(10);
      nuevaRonda();
    });

    setTimeout(() => {
      if (terminada) return;
      terminada = true;
      escapando = false;
      clearInterval(escape);
      GameEngine.restarVida();
      nuevaRonda();
    }, 4000);
  }

  nuevaRonda();
})();
