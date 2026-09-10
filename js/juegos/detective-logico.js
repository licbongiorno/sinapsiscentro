(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { pistas: ["El culpable usa lentes.", "El culpable no tiene pelo largo.", "El culpable llegó después de las 20hs."],
      sospechosos: [
        { nombre: "Ana", lentes: true, peloLargo: false, hora: 21 },
        { nombre: "Beto", lentes: true, peloLargo: true, hora: 22 },
        { nombre: "Cora", lentes: false, peloLargo: false, hora: 23 },
      ] },
    { pistas: ["El culpable llegó primero.", "El culpable no es alto.", "El culpable llevaba algo rojo."],
      sospechosos: [
        { nombre: "Nico", orden: 1, alto: false, rojo: true },
        { nombre: "Vale", orden: 2, alto: false, rojo: true },
        { nombre: "Tom", orden: 1, alto: true, rojo: false },
      ] },
  ];

  GameEngine.iniciar({ juegoId: "detective-logico", vidas: null, tiempoSegundos: null });

  let caso = CASOS[Math.floor(Math.random() * CASOS.length)];
  let correcto;
  if (caso.sospechosos[0].lentes !== undefined) {
    correcto = caso.sospechosos.find(s => s.lentes && !s.peloLargo && s.hora >= 20);
  } else {
    correcto = caso.sospechosos.find(s => s.orden === 1 && !s.alto && s.rojo);
  }

  contenedor.innerHTML = `
    <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
      <div style="text-align:left;background:white;border-radius:var(--r-lg);padding:20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;">
        ${caso.pistas.map(p => `<p style="margin-bottom:6px;color:var(--text-mid);">🔍 ${p}</p>`).join("")}
      </div>
      <p style="color:var(--text-mid);margin-bottom:12px;font-size:0.9rem;">¿Quién es el responsable?</p>
      <div class="jg-opciones">${caso.sospechosos.map(s => `<button class="jg-opcion" data-n="${s.nombre}" style="text-align:center;">${s.nombre}</button>`).join("")}</div>
    </div>`;
  contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
    if (btn.dataset.n === correcto.nombre) { btn.classList.add("correcta"); GameEngine.sumarPuntos(20); }
    else { btn.classList.add("incorrecta"); }
    setTimeout(() => GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: btn.dataset.n === correcto.nombre, mensaje: btn.dataset.n === correcto.nombre ? "¡Caso resuelto!" : `Era ${correcto.nombre}.` }), 700);
  }));
})();
