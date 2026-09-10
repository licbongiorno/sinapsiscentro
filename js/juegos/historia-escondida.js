(function () {
  const contenedor = document.getElementById("jgContenedor");
  const HISTORIAS = [
    { texto: "Marta salió de su casa a las 7 y se olvidó el paraguas azul. Cuando llegó a la esquina, se cruzó con un perro marrón que la siguió tres cuadras.", preguntas: [
      { q: "¿De qué color era el paraguas?", ops: ["Azul", "Rojo", "Verde"], c: 0 },
      { q: "¿De qué color era el perro?", ops: ["Negro", "Marrón", "Blanco"], c: 1 } ] },
    { texto: "El sábado, Diego y Sofía fueron al mercado. Compraron cuatro manzanas, dos panes y una botella de leche. Se olvidaron el queso en casa.", preguntas: [
      { q: "¿Cuántas manzanas compraron?", ops: ["Tres", "Cuatro", "Cinco"], c: 1 },
      { q: "¿Qué se olvidaron?", ops: ["El pan", "La leche", "El queso"], c: 2 } ] },
  ];
  const historia = HISTORIAS[Math.floor(Math.random() * HISTORIAS.length)];
  let i = 0;

  GameEngine.iniciar({ juegoId: "historia-escondida", vidas: null, tiempoSegundos: null });

  contenedor.innerHTML = `
    <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
      <div style="background:white;border-radius:var(--r-lg);padding:24px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);font-size:1rem;line-height:1.7;">${historia.texto}</div>
      <p style="color:var(--text-mid);margin-top:16px;font-size:0.85rem;">Leela con atención, en unos segundos te vamos a preguntar sobre los detalles.</p>
    </div>`;

  setTimeout(preguntar, 5000);

  function preguntar() {
    if (i >= historia.preguntas.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Buena memoria de detalles!" });
      return;
    }
    const p = historia.preguntas[i];
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <p style="font-weight:700;color:var(--navy);margin-bottom:16px;">${p.q}</p>
        <div class="jg-opciones">${p.ops.map((o, idx) => `<button class="jg-opcion" data-i="${idx}">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.i) === p.c) { btn.classList.add("correcta"); GameEngine.sumarPuntos(15); }
      else { btn.classList.add("incorrecta"); }
      setTimeout(() => { i += 1; preguntar(); }, 600);
    }));
  }
})();
