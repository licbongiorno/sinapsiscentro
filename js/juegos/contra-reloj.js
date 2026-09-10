(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "contra-reloj", vidas: null, tiempoSegundos: 30 });

  const N = 9;
  let siguiente = 1;
  const posiciones = Array.from({ length: N }, () => ({
    x: 10 + Math.random() * 75, y: 10 + Math.random() * 70,
  }));

  contenedor.innerHTML = `
    <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Tocá los números en orden, del 1 al ${N}</p>
    <div id="zonaReloj" style="position:relative;width:min(92vw,380px);height:56vh;max-height:420px;margin:0 auto;background:var(--bg);border:2px solid var(--teal-pale);border-radius:var(--r-lg);"></div>`;
  const zona = document.getElementById("zonaReloj");
  posiciones.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.style.cssText = `position:absolute;left:${p.x}%;top:${p.y}%;width:42px;height:42px;border-radius:50%;border:none;background:linear-gradient(135deg,var(--teal),var(--teal-mid));color:white;font-weight:800;cursor:pointer;`;
    btn.addEventListener("click", () => {
      if (i + 1 !== siguiente) return;
      btn.style.opacity = "0.2"; btn.disabled = true;
      GameEngine.sumarPuntos(10);
      siguiente += 1;
      if (siguiente > N) GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste la secuencia!" });
    });
    zona.appendChild(btn);
  });
})();
