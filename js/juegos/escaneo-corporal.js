(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PASOS = [
    { parte: "Pies", consigna: "Notá el contacto de tus pies con el piso." },
    { parte: "Piernas", consigna: "Aflojá los músculos de las piernas, aunque estén cómodas." },
    { parte: "Panza", consigna: "Notá cómo sube y baja con cada respiración." },
    { parte: "Hombros", consigna: "Bajalos, aunque sientas que ya estaban relajados." },
    { parte: "Cara", consigna: "Aflojá la mandíbula y la frente." },
  ];
  let i = 0;

  GameEngine.iniciar({ juegoId: "escaneo-corporal", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= PASOS.length) { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "Recorriste todo el cuerpo con atención. 🧘" }); return; }
    const p = PASOS[i];
    contenedor.innerHTML = `
      <div style="text-align:center;padding:20px 0 30px;">
        <p style="color:var(--teal);font-weight:800;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;">${p.parte}</p>
        <p style="font-size:1.1rem;color:var(--navy);max-width:320px;margin:0 auto 24px;line-height:1.6;">${p.consigna}</p>
        <p style="color:var(--text-soft);font-size:0.8rem;">${i + 1} / ${PASOS.length}</p>
      </div>`;
    setTimeout(() => { i += 1; render(); }, 4500);
  }

  render();
})();
