(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "esquiva", vidas: 3, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div id="zonaEsquiva" style="position:relative;width:min(92vw,380px);height:56vh;max-height:440px;margin:0 auto;background:linear-gradient(180deg,#eaf7fa,#f5fafc);border:2px solid var(--teal-pale);border-radius:var(--r-lg);overflow:hidden;touch-action:none;">
      <div id="jugadorEsquiva" style="position:absolute;bottom:10px;left:0;width:42px;height:20px;border-radius:10px;background:linear-gradient(135deg,var(--teal),var(--teal-mid));"></div>
    </div>
    <p style="text-align:center;color:var(--text-soft);font-size:0.78rem;margin-top:10px;">Arrastrá o usá las flechas del teclado</p>`;

  const zona = document.getElementById("zonaEsquiva");
  const jugador = document.getElementById("jugadorEsquiva");
  let anchoZona = zona.clientWidth, altoZona = zona.clientHeight;
  let jugadorX = anchoZona / 2 - 21;
  jugador.style.transform = `translateX(${jugadorX}px)`;

  function moverA(x) {
    jugadorX = Math.max(0, Math.min(anchoZona - 42, x));
    jugador.style.transform = `translateX(${jugadorX}px)`;
  }
  zona.addEventListener("pointermove", (e) => {
    if (e.pressure === 0 && e.pointerType === "mouse") return;
    const rect = zona.getBoundingClientRect();
    moverA(e.clientX - rect.left - 21);
  });
  zona.addEventListener("pointerdown", (e) => {
    const rect = zona.getBoundingClientRect();
    moverA(e.clientX - rect.left - 21);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") moverA(jugadorX - 30);
    if (e.key === "ArrowRight") moverA(jugadorX + 30);
  });

  let obstaculos = [];
  let invulnerable = false;
  let activo = true;
  let velocidad = 2.2;
  let ultimoPuntaje = Date.now();

  function crearObstaculo() {
    if (!activo) return;
    const tam = 26 + Math.random() * 18;
    const el = document.createElement("div");
    el.style.cssText = `position:absolute;top:-${tam}px;width:${tam}px;height:${tam}px;border-radius:8px;background:#e06060;left:${Math.random() * (anchoZona - tam)}px;`;
    zona.appendChild(el);
    obstaculos.push({ el, y: -tam, tam });
  }

  const spawnInterval = setInterval(crearObstaculo, 900);
  const velocidadInterval = setInterval(() => { velocidad += 0.15; }, 4000);

  function loop() {
    if (!activo) return;
    obstaculos = obstaculos.filter(o => {
      o.y += velocidad;
      o.el.style.transform = `translateY(${o.y + o.tam}px)`;
      const colision = !invulnerable && o.y + o.tam > altoZona - 30 && o.y < altoZona - 10 &&
        jugadorX < parseFloat(o.el.style.left) + o.tam && jugadorX + 42 > parseFloat(o.el.style.left);
      if (colision) {
        GameEngine.restarVida();
        invulnerable = true;
        jugador.style.opacity = "0.4";
        setTimeout(() => { invulnerable = false; jugador.style.opacity = "1"; }, 1000);
      }
      if (o.y > altoZona) { o.el.remove(); return false; }
      return true;
    });
    if (Date.now() - ultimoPuntaje > 1000) {
      GameEngine.sumarPuntos(2);
      ultimoPuntaje = Date.now();
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  GameEngine.alFinalizar(() => {
    activo = false;
    clearInterval(spawnInterval);
    clearInterval(velocidadInterval);
  });
})();
