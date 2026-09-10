(function () {
  const contenedor = document.getElementById("jgContenedor");
  const INICIOS = ["Todo empezó una noche de tormenta, cuando", "Nadie recuerda cómo llegó ahí, pero", "El mapa mostraba un lugar que no existía, hasta que"];
  let oraciones = [INICIOS[Math.floor(Math.random() * INICIOS.length)]];
  const LIMITE = 8;

  GameEngine.iniciar({ juegoId: "historia-infinita", vidas: null, tiempoSegundos: null });

  function render() {
    contenedor.innerHTML = `
      <div style="width:min(94vw,480px);margin:0 auto;">
        <div style="background:white;border:2px solid var(--teal-pale);border-radius:var(--r);padding:20px;min-height:140px;font-size:1rem;line-height:1.7;color:var(--text);">
          ${oraciones.join(" ")}<span style="opacity:0.3;">▌</span>
        </div>
        <p style="text-align:center;font-size:0.78rem;color:var(--text-soft);margin:10px 0 16px;">${oraciones.length - 1} / ${LIMITE} aportes</p>
        <textarea class="jg-caja-texto" id="inputHistoriaInf" placeholder="Continuá la historia…" style="min-height:70px;"></textarea>
        <div style="display:flex;gap:10px;margin-top:12px;">
          <button id="btnAgregarHistInf" class="ge-btn ge-btn-principal" style="flex:1;">Agregar</button>
          <button id="btnTerminarHistInf" class="ge-btn ge-btn-secundario" style="flex:1;">Terminar acá</button>
        </div>
      </div>`;
    document.getElementById("btnAgregarHistInf").addEventListener("click", () => {
      const val = document.getElementById("inputHistoriaInf").value.trim();
      if (!val) return;
      oraciones.push(val);
      GameEngine.sumarPuntos(4);
      if (oraciones.length - 1 >= LIMITE) { terminar(); return; }
      render();
    });
    document.getElementById("btnTerminarHistInf").addEventListener("click", terminar);
  }

  function terminar() { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "¡Historia construida entre todos!" }); }

  render();
})();
