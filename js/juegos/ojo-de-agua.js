(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "ojo-de-agua", vidas: null, tiempoSegundos: null });
  let ondas = 0;
  const MAX = 10;
  let detenido = false;

  contenedor.innerHTML = `
    <div style="text-align:center;padding:10px 0 30px;">
      <div id="zonaAgua" style="position:relative;width:240px;height:240px;margin:0 auto 20px;border-radius:50%;background:radial-gradient(circle,var(--teal-pale),var(--bg));overflow:hidden;cursor:pointer;"></div>
      <p style="color:var(--text-mid);font-size:0.9rem;">Tocá el agua y observá cómo se expande la onda, con calma.</p>
      <p id="contadorOndas" style="color:var(--text-soft);font-size:0.8rem;margin-top:6px;">${ondas} / ${MAX} ondas</p>
      <button id="btnPararAgua" class="ge-btn ge-btn-secundario" style="margin-top:16px;">Terminar acá</button>
    </div>`;

  const zona = document.getElementById("zonaAgua");
  zona.addEventListener("click", (e) => {
    if (detenido) return;
    const rect = zona.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const onda = document.createElement("div");
    onda.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:220px;height:220px;border-radius:50%;border:2px solid var(--teal-mid);transform:translate(-50%,-50%) scale(0.045);opacity:0.8;transition:transform 2s ease-out,opacity 2s ease-out;`;
    zona.appendChild(onda);
    requestAnimationFrame(() => { onda.style.transform = "translate(-50%,-50%) scale(1)"; onda.style.opacity = "0"; });
    setTimeout(() => onda.remove(), 2000);
    ondas += 1;
    document.getElementById("contadorOndas").textContent = `${ondas} / ${MAX} ondas`;
    if (ondas >= MAX) {
      detenido = true;
      setTimeout(() => GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Cada onda, a su tiempo. 🌊" }), 800);
    }
  });
  document.getElementById("btnPararAgua").addEventListener("click", () => {
    detenido = true;
    GameEngine.terminar({ puntaje: 0, exito: true, mensaje: `Observaste ${ondas} onda(s) con calma.` });
  });
})();
