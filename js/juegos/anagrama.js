(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PALABRAS = ["CASA","LIBRO","PLAYA","JARDIN","VENTANA","CAMINO","MUSICA","ESCUELA","FAMILIA","AMISTAD","SILENCIO","PALABRA","HISTORIA","RECUERDO","SONRISA"];
  let orden = [...PALABRAS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "anagrama", vidas: 3, tiempoSegundos: null });

  function mezclar(palabra) {
    let letras;
    do { letras = palabra.split("").sort(() => Math.random() - 0.5); } while (letras.join("") === palabra);
    return letras;
  }

  function render() {
    if (i >= orden.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Resolviste todos los anagramas!" });
      return;
    }
    const palabra = orden[i];
    let letras = mezclar(palabra);
    let elegidas = [];

    function pintar() {
      contenedor.innerHTML = `
        <p style="text-align:center;color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;">Palabra ${i + 1} de ${orden.length}</p>
        <div style="min-height:56px;display:flex;justify-content:center;gap:6px;margin-bottom:24px;flex-wrap:wrap;">
          ${elegidas.map(l => `<span style="width:40px;height:48px;background:var(--teal-pale);border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1.2rem;color:var(--teal-deep);">${l}</span>`).join("")}
        </div>
        <div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;margin-bottom:20px;">
          ${letras.map((l, idx) => `<button data-idx="${idx}" style="width:40px;height:48px;border:none;border-radius:8px;background:white;border:2px solid var(--teal-pale);font-weight:800;font-size:1.2rem;cursor:pointer;">${l}</button>`).join("")}
        </div>
        <div style="text-align:center;"><button id="btnBorrar" class="ge-btn ge-btn-secundario">Borrar última</button></div>`;

      contenedor.querySelectorAll("[data-idx]").forEach(btn => btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.idx);
        elegidas.push(letras[idx]);
        letras.splice(idx, 1);
        if (elegidas.join("") === palabra) {
          GameEngine.sumarPuntos(20);
          i += 1;
          setTimeout(render, 500);
        } else if (elegidas.length === palabra.length) {
          GameEngine.restarVida();
          i += 1;
          setTimeout(render, 700);
        } else {
          pintar();
        }
      }));
      document.getElementById("btnBorrar").addEventListener("click", () => {
        if (!elegidas.length) return;
        letras.push(elegidas.pop());
        pintar();
      });
    }
    pintar();
  }

  render();
})();
