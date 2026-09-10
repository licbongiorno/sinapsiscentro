(function () {
  const contenedor = document.getElementById("jgContenedor");
  const HISTORIAS = [
    { texto: "Marta salió de su casa a las 7 y se olvidó el paraguas azul. Cuando llegó a la esquina, se cruzó con un perro marrón que la siguió tres cuadras.", preguntas: [
      { q: "¿De qué color era el paraguas?", ops: ["Azul", "Rojo", "Verde"], c: 0 },
      { q: "¿De qué color era el perro?", ops: ["Negro", "Marrón", "Blanco"], c: 1 } ] },
    { texto: "El sábado, Diego y Sofía fueron al mercado. Compraron cuatro manzanas, dos panes y una botella de leche. Se olvidaron el queso en casa.", preguntas: [
      { q: "¿Cuántas manzanas compraron?", ops: ["Tres", "Cuatro", "Cinco"], c: 1 },
      { q: "¿Qué se olvidaron?", ops: ["El pan", "La leche", "El queso"], c: 2 } ] },
    { texto: "Julián llegó tarde a la oficina porque el colectivo 45 no pasó. Cuando por fin entró, ya eran las 9:40 y la reunión había empezado hacía diez minutos.", preguntas: [
      { q: "¿Qué colectivo no pasó?", ops: ["El 45", "El 60", "El 12"], c: 0 },
      { q: "¿A qué hora entró Julián?", ops: ["9:10", "9:30", "9:40"], c: 2 } ] },
    { texto: "En la fiesta de Camila había globos amarillos y una torta de chocolate con tres velas. Su tío Rodrigo llegó con una guitarra y tocó dos canciones.", preguntas: [
      { q: "¿De qué color eran los globos?", ops: ["Amarillos", "Rosas", "Celestes"], c: 0 },
      { q: "¿Cuántas canciones tocó el tío?", ops: ["Una", "Dos", "Tres"], c: 1 } ] },
    { texto: "El profesor pidió que entregaran el trabajo el jueves, no el viernes como habían entendido algunos. Sólo cinco de los veinte alumnos lo entregaron a tiempo.", preguntas: [
      { q: "¿Qué día pidió el profesor?", ops: ["Miércoles", "Jueves", "Viernes"], c: 1 },
      { q: "¿Cuántos alumnos entregaron a tiempo?", ops: ["Cinco", "Diez", "Veinte"], c: 0 } ] },
    { texto: "Valentina plantó tomates y albahaca en macetas verdes, en el balcón que mira al este. Cada mañana los regaba antes de las ocho.", preguntas: [
      { q: "¿Qué plantó, además de tomates?", ops: ["Albahaca", "Lechuga", "Perejil"], c: 0 },
      { q: "¿Hacia dónde mira el balcón?", ops: ["Al norte", "Al este", "Al oeste"], c: 1 } ] },
    { texto: "El tren de las 14:15 salió con retraso de la estación Constitución. Llegó a destino con cuarenta minutos de demora, y varios pasajeros perdieron su conexión.", preguntas: [
      { q: "¿De qué estación salió?", ops: ["Retiro", "Constitución", "Once"], c: 1 },
      { q: "¿Con cuánto retraso llegó?", ops: ["Veinte minutos", "Cuarenta minutos", "Una hora"], c: 1 } ] },
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
