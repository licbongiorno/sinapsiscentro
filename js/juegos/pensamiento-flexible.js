(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PENSAMIENTOS = [
    "Nunca me sale nada bien.",
    "Si esto sale mal, va a ser un desastre total.",
    "Seguro piensan mal de mí.",
    "No sirvo para esto.",
    "Siempre termino arruinando todo.",
    "Si no lo hago perfecto, no vale la pena hacerlo.",
    "Nadie me va a entender si lo cuento.",
    "Ya es tarde para cambiar esto.",
    "Si pido ayuda, van a pensar que no puedo solo.",
    "Todo el mundo lo hace mejor que yo.",
  ];
  let orden = [...PENSAMIENTOS].sort(() => Math.random() - 0.5).slice(0, 4);
  let i = 0;

  GameEngine.iniciar({ juegoId: "pensamiento-flexible", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Buscar una versión más flexible del pensamiento ayuda a aliviar su peso." }); return; }
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:16px;font-size:1rem;line-height:1.6;font-style:italic;">"${orden[i]}"</div>
        <p style="color:var(--text-mid);margin-bottom:10px;font-size:0.9rem;">Reescribilo de una forma más flexible o realista.</p>
        <textarea class="jg-caja-texto" id="textoFlex" placeholder="Una forma más flexible de pensarlo sería…"></textarea>
        <button id="btnListoFlex" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Siguiente</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">${i + 1} / ${orden.length}</p>
      </div>`;
    document.getElementById("btnListoFlex").addEventListener("click", () => {
      const texto = document.getElementById("textoFlex").value.trim();
      if (texto.length > 5) GameEngine.sumarPuntos(8);
      i += 1;
      render();
    });
  }

  render();
})();
