(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { palabra: "Feliz", correcta: "Contento", opciones: ["Contento", "Cansado", "Enojado"] },
    { palabra: "Rápido", correcta: "Veloz", opciones: ["Veloz", "Lento", "Quieto"] },
    { palabra: "Bonito", correcta: "Lindo", opciones: ["Lindo", "Feo", "Grande"] },
    { palabra: "Inteligente", correcta: "Listo", opciones: ["Listo", "Torpe", "Cansado"] },
    { palabra: "Valiente", correcta: "Audaz", opciones: ["Audaz", "Miedoso", "Tímido"] },
    { palabra: "Amable", correcta: "Cordial", opciones: ["Cordial", "Grosero", "Distante"] },
    { palabra: "Difícil", correcta: "Complicado", opciones: ["Complicado", "Sencillo", "Fácil"] },
    { palabra: "Grande", correcta: "Enorme", opciones: ["Enorme", "Diminuto", "Mediano"] },
    { palabra: "Triste", correcta: "Apenado", opciones: ["Apenado", "Alegre", "Calmado"] },
    { palabra: "Callado", correcta: "Silencioso", opciones: ["Silencioso", "Ruidoso", "Hablador"] },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "sinonimo-express", vidas: null, tiempoSegundos: 40 });

  function render() {
    if (i >= orden.length) i = 0; // se repite mientras haya tiempo
    const caso = orden[i];
    const opciones = [...caso.opciones].sort(() => Math.random() - 0.5);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="font-weight:800;font-size:1.6rem;color:var(--navy);margin-bottom:22px;">${caso.palabra}</p>
        <div class="jg-opciones">
          ${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === caso.correcta) GameEngine.sumarPuntos(8);
      i += 1;
      render();
    }));
  }

  render();
})();
