(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "que-ves", vidas: null, tiempoSegundos: null });
  let ronda = 0;
  const TOTAL = 3;

  function formaAleatoria() {
    const puntos = Array.from({ length: 6 + Math.floor(Math.random() * 4) }, () => {
      const angulo = Math.random() * Math.PI * 2;
      const radio = 40 + Math.random() * 55;
      return [130 + Math.cos(angulo) * radio, 130 + Math.sin(angulo) * radio];
    });
    // ordenar en forma de polígono para que se vea como una mancha, no un caos de líneas
    puntos.sort((a, b) => Math.atan2(a[1] - 130, a[0] - 130) - Math.atan2(b[1] - 130, b[0] - 130));
    return puntos.map(p => p.join(",")).join(" ");
  }

  function render() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "¡Buena imaginación! 🎨" });
      return;
    }
    contenedor.innerHTML = `
      <div style="text-align:center;width:min(94vw,420px);margin:0 auto;">
        <svg width="260" height="260" viewBox="0 0 260 260" style="margin:0 auto;display:block;">
          <polygon points="${formaAleatoria()}" fill="var(--teal-mid)" opacity="0.85"/>
        </svg>
        <p style="color:var(--text-mid);margin:14px 0 10px;">¿Qué te parece que es esta forma?</p>
        <textarea class="jg-caja-texto" id="textoVes" placeholder="Escribí lo primero que se te ocurra…" style="min-height:70px;"></textarea>
        <button id="btnListoVes" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Siguiente</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">${ronda} / ${TOTAL}</p>
      </div>`;
    document.getElementById("btnListoVes").addEventListener("click", () => {
      const texto = document.getElementById("textoVes").value.trim();
      if (texto.length > 2) GameEngine.sumarPuntos(5);
      render();
    });
  }

  render();
})();
