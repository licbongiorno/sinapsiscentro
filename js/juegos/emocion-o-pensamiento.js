(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CASOS = [
    { frase: "Estoy triste.", tipo: "emocion" },
    { frase: "Soy un fracaso.", tipo: "pensamiento" },
    { frase: "Siento miedo.", tipo: "emocion" },
    { frase: "Nadie me quiere.", tipo: "pensamiento" },
    { frase: "Estoy enojado.", tipo: "emocion" },
    { frase: "Todo me sale mal siempre.", tipo: "pensamiento" },
    { frase: "Siento alegría.", tipo: "emocion" },
    { frase: "Voy a fallar en esto seguro.", tipo: "pensamiento" },
    { frase: "Estoy nervioso.", tipo: "emocion" },
    { frase: "Soy incapaz de lograrlo.", tipo: "pensamiento" },
  ];
  let orden = [...CASOS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "emocion-o-pensamiento", vidas: 3, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Buena distinción entre ambos!" }); return; }
    const caso = orden[i];
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">${i + 1} / ${orden.length}</p>
        <p style="font-weight:700;font-size:1.2rem;color:var(--navy);margin-bottom:24px;">"${caso.frase}"</p>
        <div style="display:flex;justify-content:center;gap:14px;">
          <button data-v="emocion" class="ge-btn ge-btn-principal">Emoción</button>
          <button data-v="pensamiento" class="ge-btn ge-btn-secundario">Pensamiento</button>
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === caso.tipo) GameEngine.sumarPuntos(10); else GameEngine.restarVida();
      i += 1; render();
    }));
  }

  render();
})();
