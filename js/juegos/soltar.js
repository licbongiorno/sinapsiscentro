(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PALABRAS = ["preocupación","tensión","la lista de pendientes","el ruido de afuera","esa idea repetida","el cansancio","la prisa","esa duda"];
  GameEngine.iniciar({ juegoId: "soltar", vidas: null, tiempoSegundos: null });
  let soltadas = 0;
  const MAX = 6;

  contenedor.innerHTML = `
    <div style="text-align:center;padding:10px 0 30px;">
      <p style="color:var(--text-mid);font-size:0.9rem;margin-bottom:20px;">Tocá cada palabra para dejarla ir.</p>
      <div id="zonaSoltar" style="position:relative;min-height:220px;display:flex;flex-wrap:wrap;gap:14px;justify-content:center;align-items:center;"></div>
      <p id="contadorSoltar" style="color:var(--text-soft);font-size:0.8rem;margin-top:16px;">0 / ${MAX}</p>
    </div>`;

  function agregarPalabra() {
    const zona = document.getElementById("zonaSoltar");
    if (!zona || soltadas >= MAX) return;
    const palabra = PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
    const el = document.createElement("span");
    el.textContent = palabra;
    el.style.cssText = "background:var(--teal-pale);color:var(--teal-deep);padding:10px 18px;border-radius:50px;font-weight:700;cursor:pointer;transition:opacity 0.6s, transform 0.6s;";
    el.addEventListener("click", () => {
      el.style.opacity = "0"; el.style.transform = "translateY(-20px) scale(0.8)";
      soltadas += 1;
      document.getElementById("contadorSoltar").textContent = `${soltadas} / ${MAX}`;
      setTimeout(() => el.remove(), 600);
      if (soltadas >= MAX) {
        setTimeout(() => GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Soltaste lo que traías. 🌬️" }), 700);
      }
    });
    zona.appendChild(el);
  }

  for (let n = 0; n < 3; n++) agregarPalabra();
  const intervalo = setInterval(() => { if (soltadas < MAX) agregarPalabra(); else clearInterval(intervalo); }, 1800);
})();
