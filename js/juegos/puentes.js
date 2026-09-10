(function () {
  const contenedor = document.getElementById("jgContenedor");
  const N = 6;
  GameEngine.iniciar({ juegoId: "puentes", vidas: 3, tiempoSegundos: null });

  const posiciones = Array.from({ length: N }, () => ({ x: 15 + Math.random() * 70, y: 15 + Math.random() * 70 }));
  let siguiente = 1;
  const conexiones = [];

  contenedor.innerHTML = `
    <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Conectá las islas en orden, del 1 al ${N}</p>
    <div id="zonaPuentes" style="position:relative;width:min(92vw,380px);height:56vh;max-height:420px;margin:0 auto;background:var(--bg);border:2px solid var(--teal-pale);border-radius:var(--r-lg);">
      <svg id="svgPuentes" width="100%" height="100%" style="position:absolute;inset:0;"></svg>
    </div>`;
  const zona = document.getElementById("zonaPuentes");
  const svg = document.getElementById("svgPuentes");

  posiciones.forEach((p, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.style.cssText = `position:absolute;left:${p.x}%;top:${p.y}%;width:40px;height:40px;border-radius:50%;border:none;background:linear-gradient(135deg,var(--teal),var(--teal-mid));color:white;font-weight:800;cursor:pointer;transform:translate(-50%,-50%);`;
    btn.addEventListener("click", () => {
      if (i + 1 !== siguiente) { GameEngine.restarVida(); return; }
      if (siguiente > 1) {
        const anterior = posiciones[siguiente - 2];
        const linea = document.createElementNS("http://www.w3.org/2000/svg", "line");
        linea.setAttribute("x1", `${anterior.x}%`); linea.setAttribute("y1", `${anterior.y}%`);
        linea.setAttribute("x2", `${p.x}%`); linea.setAttribute("y2", `${p.y}%`);
        linea.setAttribute("stroke", "var(--teal-mid)"); linea.setAttribute("stroke-width", "3");
        svg.appendChild(linea);
      }
      btn.style.opacity = "0.5"; btn.disabled = true;
      GameEngine.sumarPuntos(8);
      siguiente += 1;
      if (siguiente > N) GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Todas las islas conectadas!" });
    });
    zona.appendChild(btn);
  });
})();
