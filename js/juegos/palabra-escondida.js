(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PALABRAS = ["PLAYA","CAMINO","NUBE","JARDIN","MUSICA","ESCUELA","VIENTO","PUENTE"];
  let orden = [...PALABRAS].sort(() => Math.random() - 0.5).slice(0, 6);
  let i = 0;

  GameEngine.iniciar({ juegoId: "palabra-escondida", vidas: 3, tiempoSegundos: null });

  function ruido(n) {
    const letras = "BCDFGHJKLMNPQRSTVWXYZ";
    return Array.from({ length: n }, () => letras[Math.floor(Math.random() * letras.length)]).join("");
  }

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Encontraste todas las palabras!" }); return; }
    const palabra = orden[i];
    const texto = ruido(2) + palabra + ruido(2);
    const distractores = PALABRAS.filter(p => p !== palabra).sort(() => Math.random() - 0.5).slice(0, 2);
    const opciones = [palabra, ...distractores].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">${i + 1} / ${orden.length} — encontrá la palabra escondida</p>
        <div style="font-size:1.6rem;font-weight:800;letter-spacing:0.15em;color:var(--navy);margin-bottom:24px;">${texto}</div>
        <div class="jg-opciones">${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === palabra) { btn.classList.add("correcta"); GameEngine.sumarPuntos(12); }
      else { btn.classList.add("incorrecta"); GameEngine.restarVida(); }
      setTimeout(() => { i += 1; render(); }, 500);
    }));
  }

  render();
})();
