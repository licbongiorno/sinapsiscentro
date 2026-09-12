/**
 * LIENZO.JS — Canvas de dibujo compartido (mouse + touch)
 * ===========================================================
 * Antes esta misma lógica (normalizar coordenadas mouse/touch al
 * tamaño real del canvas, y el ciclo empezar/dibujar/terminar trazo)
 * estaba copiada en 5 lugares distintos: exercise-engine.js,
 * infantil-engine.js y los tres juegos de dibujo. Ahora todos usan
 * esta única función.
 *
 * Uso:
 *   const lienzo = crearLienzoDibujable(canvas, { colorInicial: "#0d2535" });
 *   lienzo.setColor("#e06060");
 *   lienzo.limpiar();
 *   lienzo.trazos(); // cantidad de trazos dibujados hasta ahora
 */
function crearLienzoDibujable(canvas, { colorInicial = "#0d2535", grosor = 4, deshacerMax = 20 } = {}) {
  const ctx = canvas.getContext("2d");
  ctx.lineWidth = grosor;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = colorInicial;
  let dibujando = false;
  let trazos = 0;
  let modo = "dibujar"; // "dibujar" | "borrar"
  const pilaDeshacer = [];
  let pilaRehacer = [];

  function pos(e) {
    const r = canvas.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: (p.clientX - r.left) * (canvas.width / r.width), y: (p.clientY - r.top) * (canvas.height / r.height) };
  }
  function guardarParaDeshacer() {
    pilaDeshacer.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (pilaDeshacer.length > deshacerMax) pilaDeshacer.shift();
    pilaRehacer = [];
  }
  function empezar(e) {
    guardarParaDeshacer();
    dibujando = true; trazos += 1;
    ctx.globalCompositeOperation = modo === "borrar" ? "destination-out" : "source-over";
    const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); e.preventDefault();
  }
  function dibujar(e) { if (!dibujando) return; const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); e.preventDefault(); }
  function terminarTrazo() { dibujando = false; }

  canvas.addEventListener("mousedown", empezar);
  canvas.addEventListener("mousemove", dibujar);
  window.addEventListener("mouseup", terminarTrazo);
  canvas.addEventListener("touchstart", empezar, { passive: false });
  canvas.addEventListener("touchmove", dibujar, { passive: false });
  canvas.addEventListener("touchend", terminarTrazo);

  return {
    ctx,
    trazos: () => trazos,
    setColor(color) { modo = "dibujar"; ctx.strokeStyle = color; },
    setGrosor(px) { ctx.lineWidth = px; },
    setModo(m) { modo = m; }, // "dibujar" | "borrar"
    limpiar() { guardarParaDeshacer(); ctx.clearRect(0, 0, canvas.width, canvas.height); },
    puedeDeshacer: () => pilaDeshacer.length > 0,
    puedeRehacer: () => pilaRehacer.length > 0,
    deshacer() {
      if (!pilaDeshacer.length) return;
      pilaRehacer.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      ctx.putImageData(pilaDeshacer.pop(), 0, 0);
    },
    rehacer() {
      if (!pilaRehacer.length) return;
      pilaDeshacer.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
      ctx.putImageData(pilaRehacer.pop(), 0, 0);
    },
    dataUrl(tipo = "image/png") { return canvas.toDataURL(tipo); },
  };
}
