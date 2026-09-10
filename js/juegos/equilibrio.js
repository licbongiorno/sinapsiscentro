(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 6;
  let objetivo = 0, elegidos = [], suma = 0;

  GameEngine.iniciar({ juegoId: "equilibrio", vidas: 3, tiempoSegundos: null });

  function generarPesos() {
    const cantidadPesos = 5 + Math.floor(ronda / 2);
    const pesos = Array.from({ length: cantidadPesos }, () => 1 + Math.floor(Math.random() * 9));
    const usados = pesos.slice(0, 2 + Math.floor(Math.random() * 2));
    objetivo = usados.reduce((a, b) => a + b, 0);
    return pesos.sort(() => Math.random() - 0.5);
  }

  let pesosDisponibles = [];

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Equilibraste todas las balanzas!" });
      return;
    }
    elegidos = []; suma = 0;
    pesosDisponibles = generarPesos();
    render();
  }

  function render() {
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Ronda ${ronda} de ${TOTAL}</p>
        <p style="font-weight:800;color:var(--navy);margin-bottom:16px;">Lado izquierdo pesa <span style="color:var(--teal);">${objetivo}</span>. Elegí pesos para equilibrar el derecho.</p>
        <div style="font-size:1.3rem;font-weight:800;color:${suma === objetivo ? "#4caf6a" : "var(--teal-deep)"};margin-bottom:16px;">Suma actual: ${suma}</div>
        <div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:18px;">
          ${pesosDisponibles.map((p, idx) => `<button data-idx="${idx}" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--teal-pale);background:white;font-weight:800;cursor:pointer;">${p}</button>`).join("")}
        </div>
        <button id="btnReiniciarPeso" class="ge-btn ge-btn-secundario">Reiniciar intento</button>
      </div>`;
    contenedor.querySelectorAll("[data-idx]").forEach(btn => btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      suma += pesosDisponibles[idx];
      pesosDisponibles = pesosDisponibles.filter((_, i) => i !== idx);
      if (suma === objetivo) {
        GameEngine.sumarPuntos(15);
        setTimeout(nuevaRonda, 500);
      } else if (suma > objetivo) {
        GameEngine.restarVida();
        setTimeout(nuevaRonda, 500);
      } else {
        render();
      }
    }));
    document.getElementById("btnReiniciarPeso").addEventListener("click", () => { suma = 0; pesosDisponibles = generarPesos(); render(); });
  }

  nuevaRonda();
})();
