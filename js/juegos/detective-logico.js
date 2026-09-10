(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { pistas: ["El culpable usa lentes.", "El culpable no tiene pelo largo.", "El culpable llegó después de las 20hs."],
      sospechosos: ["Ana (lentes, pelo corto, llegó 21hs)", "Beto (lentes, pelo largo, llegó 22hs)", "Cora (sin lentes, pelo corto, llegó 23hs)"],
      correcto: "Ana (lentes, pelo corto, llegó 21hs)" },
    { pistas: ["El culpable llegó primero.", "El culpable no es alto.", "El culpable llevaba algo rojo."],
      sospechosos: ["Nico (1º, bajo, rojo)", "Vale (2º, bajo, rojo)", "Tom (1º, alto, sin rojo)"],
      correcto: "Nico (1º, bajo, rojo)" },
    { pistas: ["El culpable tiene el pelo oscuro.", "El culpable no usa reloj.", "El culpable vive en el primer piso."],
      sospechosos: ["Meli (pelo oscuro, sin reloj, 1º piso)", "Caro (pelo claro, sin reloj, 1º piso)", "Fede (pelo oscuro, con reloj, 1º piso)"],
      correcto: "Meli (pelo oscuro, sin reloj, 1º piso)" },
    { pistas: ["El culpable trabaja de mañana.", "El culpable no tiene auto.", "El culpable conoce a la víctima hace más de 5 años."],
      sospechosos: ["Pablo (mañana, sin auto, 8 años)", "Rocío (tarde, sin auto, 8 años)", "Iván (mañana, con auto, 8 años)"],
      correcto: "Pablo (mañana, sin auto, 8 años)" },
    { pistas: ["El culpable estuvo en el edificio toda la tarde.", "El culpable no habló con nadie.", "El culpable salió por la puerta trasera."],
      sospechosos: ["Lucía (toda la tarde, habló con todos, puerta trasera)", "Denis (toda la tarde, no habló, puerta trasera)", "Ayelén (sólo un rato, no habló, puerta trasera)"],
      correcto: "Denis (toda la tarde, no habló, puerta trasera)" },
    { pistas: ["El culpable pagó en efectivo.", "El culpable no usó la salida principal.", "El culpable estuvo ahí menos de 10 minutos."],
      sospechosos: ["Martina (efectivo, salida lateral, 8 min)", "Bruno (tarjeta, salida lateral, 8 min)", "Ceci (efectivo, salida principal, 8 min)"],
      correcto: "Martina (efectivo, salida lateral, 8 min)" },
    { pistas: ["El culpable no fumaba.", "El culpable llevaba una mochila.", "El culpable habló por teléfono antes de irse."],
      sospechosos: ["Gastón (fumaba, mochila, habló)", "Yamila (no fumaba, mochila, habló)", "Tobías (no fumaba, sin mochila, habló)"],
      correcto: "Yamila (no fumaba, mochila, habló)" },
    { pistas: ["El culpable tenía las manos manchadas de tinta.", "El culpable no estuvo en la reunión.", "El culpable dejó la luz prendida."],
      sospechosos: ["Ramiro (tinta, no fue a la reunión, luz prendida)", "Sol (sin tinta, no fue a la reunión, luz prendida)", "Enzo (tinta, fue a la reunión, luz prendida)"],
      correcto: "Ramiro (tinta, no fue a la reunión, luz prendida)" },
    { pistas: ["El culpable llegó en bicicleta.", "El culpable no conocía el lugar de antes.", "El culpable se quedó hasta el final."],
      sospechosos: ["Guada (bici, primera vez ahí, se quedó)", "Franco (bici, ya conocía, se quedó)", "Naty (auto, primera vez ahí, se quedó)"],
      correcto: "Guada (bici, primera vez ahí, se quedó)" },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5).slice(0, 5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "detective-logico", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Resolviste todos los casos!" }); return; }
    const caso = orden[i];
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Caso ${i + 1} de ${orden.length}</p>
        <div style="text-align:left;background:white;border-radius:var(--r-lg);padding:20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:18px;">
          ${caso.pistas.map(p => `<p style="margin-bottom:6px;color:var(--text-mid);">🔍 ${p}</p>`).join("")}
        </div>
        <p style="color:var(--text-mid);margin-bottom:12px;font-size:0.9rem;">¿Quién es el responsable?</p>
        <div class="jg-opciones">${caso.sospechosos.map(s => `<button class="jg-opcion" data-n="${s}">${s}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      const acierto = btn.dataset.n === caso.correcto;
      if (acierto) { btn.classList.add("correcta"); GameEngine.sumarPuntos(20); }
      else { btn.classList.add("incorrecta"); }
      setTimeout(() => { i += 1; render(); }, 800);
    }));
  }

  render();
})();
