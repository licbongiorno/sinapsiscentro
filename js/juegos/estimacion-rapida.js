(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "estimacion-rapida", vidas: null, tiempoSegundos: null });
  let ronda = 0;
  const TOTAL = 10;

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Buen ojo para estimar!" });
      return;
    }
    const cantidad = 8 + Math.floor(Math.random() * 35);
    const puntos = Array.from({ length: cantidad }, () =>
      `<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--teal-mid);margin:3px;"></span>`).join("");
    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Sin contar de a uno, ¿cuántos puntos ves?</p>
      <div style="max-width:280px;margin:0 auto 24px;text-align:center;">${puntos}</div>
      <div class="jg-opciones" id="opcionesEstim"></div>`;
    const opciones = new Set([cantidad]);
    while (opciones.size < 4) {
      const delta = (Math.floor(Math.random() * 8) + 2) * (Math.random() < 0.5 ? -1 : 1);
      const v = cantidad + delta;
      if (v > 0) opciones.add(v);
    }
    const lista = [...opciones].sort(() => Math.random() - 0.5);
    document.getElementById("opcionesEstim").innerHTML = lista.map(v =>
      `<button class="jg-opcion" data-v="${v}" style="text-align:center;">${v}</button>`).join("");
    document.querySelectorAll("#opcionesEstim .jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      const diff = Math.abs(Number(btn.dataset.v) - cantidad);
      if (diff === 0) GameEngine.sumarPuntos(10);
      else if (diff <= 3) GameEngine.sumarPuntos(4);
      nuevaRonda();
    }));
  }

  nuevaRonda();
})();
