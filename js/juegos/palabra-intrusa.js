(function () {
  const contenedor = document.getElementById("jgContenedor");
  const GRUPOS = [
    { grupo: ["Manzana","Banana","Pera","Silla"], intrusa: "Silla" },
    { grupo: ["Perro","Gato","Auto","Loro"], intrusa: "Auto" },
    { grupo: ["Rojo","Azul","Verde","Rápido"], intrusa: "Rápido" },
    { grupo: ["Guitarra","Piano","Violín","Cuchara"], intrusa: "Cuchara" },
    { grupo: ["Lunes","Martes","Enero","Jueves"], intrusa: "Enero" },
    { grupo: ["Feliz","Triste","Alto","Enojado"], intrusa: "Alto" },
  ];
  let orden = [...GRUPOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "palabra-intrusa", vidas: 3, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Encontraste todas las intrusas!" }); return; }
    const caso = orden[i];
    const opciones = [...caso.grupo].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">¿Cuál palabra no pertenece al grupo?</p>
        <div class="jg-opciones">${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === caso.intrusa) { btn.classList.add("correcta"); GameEngine.sumarPuntos(10); }
      else { btn.classList.add("incorrecta"); GameEngine.restarVida(); }
      setTimeout(() => { i += 1; render(); }, 500);
    }));
  }

  render();
})();
