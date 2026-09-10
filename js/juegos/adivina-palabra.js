(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PALABRAS = ["ELEFANTE","GUITARRA","VENTANA","CHOCOLATE","BICICLETA","ASTRONAUTA","MARIPOSA"];
  const palabra = PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
  const ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  let adivinadas = new Set();
  let falladas = new Set();

  GameEngine.iniciar({ juegoId: "adivina-palabra", vidas: 6, tiempoSegundos: null });

  function render() {
    const completa = palabra.split("").every(l => adivinadas.has(l));
    if (completa) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Adivinaste la palabra!" }); return; }
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:1.8rem;font-weight:800;letter-spacing:0.15em;color:var(--navy);margin-bottom:24px;">
          ${palabra.split("").map(l => adivinadas.has(l) ? l : "_").join(" ")}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:400px;margin:0 auto;">
          ${ALFABETO.map(l => `<button data-l="${l}" ${adivinadas.has(l) || falladas.has(l) ? "disabled" : ""} style="width:32px;height:36px;border-radius:8px;border:2px solid var(--teal-pale);background:${adivinadas.has(l) ? "#d6f5df" : falladas.has(l) ? "#ffe0e0" : "white"};font-weight:700;cursor:pointer;font-size:0.85rem;">${l}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-l]").forEach(btn => btn.addEventListener("click", () => {
      const l = btn.dataset.l;
      if (palabra.includes(l)) { adivinadas.add(l); GameEngine.sumarPuntos(5); }
      else { falladas.add(l); GameEngine.restarVida(); }
      render();
    }));
  }

  render();
})();
