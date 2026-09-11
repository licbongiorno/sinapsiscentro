(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CARAS = ["🧑‍🦰","👩‍🦱","👨‍🦳","🧑‍🦲","👩‍🦰","👨‍🦱","🧑‍🦳","👩‍🦳","🧔","👱‍♀️","👨‍🦰","👩‍🦲"];
  const NOMBRES = ["Mora","Tomás","Elena","Julián","Renata","Bruno","Nina","Facundo","Delfina","Santiago","Agustina","Mateo","Catalina","Joaquín"];
  const NIVELES = [2, 3, 4]; // personas a memorizar juntas por nivel
  let nivel = 0;

  GameEngine.iniciar({ juegoId: "caras-nombres", vidas: 3, tiempoSegundos: null });

  function nuevoNivel() {
    if (nivel >= NIVELES.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste los tres niveles!" });
      return;
    }
    const cantidad = NIVELES[nivel];
    const caras = [...CARAS].sort(() => Math.random() - 0.5).slice(0, cantidad);
    const nombres = [...NOMBRES].sort(() => Math.random() - 0.5).slice(0, cantidad);
    const personas = caras.map((cara, i) => ({ cara, nombre: nombres[i] }));

    contenedor.innerHTML = `
      <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Nivel ${nivel + 1} de ${NIVELES.length}</p>
      <p style="text-align:center;color:var(--text-mid);font-size:0.9rem;margin-bottom:16px;">Memorizá quién es quién…</p>
      <div style="display:flex;justify-content:center;gap:18px;flex-wrap:wrap;">
        ${personas.map(p => `<div style="text-align:center;"><div style="font-size:3rem;">${p.cara}</div><p style="font-weight:800;color:var(--teal);margin-top:4px;">${p.nombre}</p></div>`).join("")}
      </div>`;

    setTimeout(() => preguntar(personas, [...personas].sort(() => Math.random() - 0.5), 0), 1600 + cantidad * 700);
  }

  function preguntar(personas, orden, i) {
    if (i >= orden.length) {
      nivel += 1;
      setTimeout(nuevoNivel, 400);
      return;
    }
    const persona = orden[i];
    const distractores = personas.filter(p => p.nombre !== persona.nombre).map(p => p.nombre).sort(() => Math.random() - 0.5).slice(0, 2);
    const opciones = [persona.nombre, ...distractores].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">${i + 1} / ${orden.length}</p>
        <div style="font-size:4rem;margin-bottom:16px;">${persona.cara}</div>
        <p style="color:var(--text-mid);font-size:0.9rem;margin-bottom:12px;">¿Cómo se llamaba?</p>
        <div class="jg-opciones">${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === persona.nombre) { btn.classList.add("correcta"); GameEngine.sumarPuntos(12); }
      else { btn.classList.add("incorrecta"); GameEngine.restarVida(); }
      setTimeout(() => preguntar(personas, orden, i + 1), 500);
    }));
  }

  nuevoNivel();
})();
