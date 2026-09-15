(function () {
  const contenedor = document.getElementById("jgContenedor");
  const INVENTADAS = ["Flurbeo","Zampalindo","Trocantín","Miscabudo","Farolengo","Chundelaje","Petropludo","Vencilargo",
    "Grimoloso","Pantufloide","Recontrajo","Malimbroso","Cachurumbo","Tembeleque","Fosforengo","Nucaramba",
    "Sopetrán","Batifundio","Chirimango","Cangalapo","Trebolinda","Marfujenco","Pespuntoso","Galimoto",
    "Rebuznante","Sacapuntoso","Balandroso","Espelunca","Zarapondo","Bicharraco",
    "Trapisondo","Cachivachudo","Merengoso","Pelaguampa","Sarasondo","Vichivento","Golondrango","Mazacote",
    "Chipilongo","Trastabillo","Bambaleco","Perendengue","Zanganeta","Fofolengo","Trompeludo","Bolindango",
    "Cachirulete","Marimoño","Tarantundo","Escobajo","Pintarrajo","Zambumbudo","Trapichongo","Garabulengo"];
  let orden = [...INVENTADAS].sort(() => Math.random() - 0.5).slice(0, 3);
  let i = 0;

  GameEngine.iniciar({ juegoId: "diccionario-loco", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "¡Diccionario inventado con éxito! 📖" }); return; }
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <p style="font-family:'Playfair Display',serif;font-size:1.8rem;color:var(--navy);margin-bottom:6px;">${orden[i]}</p>
        <p style="color:var(--text-soft);font-size:0.8rem;margin-bottom:16px;">(palabra inventada)</p>
        <div class="lector-fila"><p style="color:var(--text-mid);font-size:0.9rem;">Inventá una definición para esta palabra.</p>${Lector.boton(`${orden[i]}. Palabra inventada. Inventá una definición para esta palabra.`)}</div>
        <div class="dictado-fila">
          <textarea class="jg-caja-texto" id="textoDicc" placeholder="Significa…"></textarea>
          ${Dictado.boton("textoDicc")}
        </div>
        <button id="btnListoDicc" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Siguiente</button>
      </div>`;
    Lector.conectar(contenedor);
    Dictado.conectar(contenedor);
    document.getElementById("btnListoDicc").addEventListener("click", () => {
      const texto = document.getElementById("textoDicc").value.trim();
      if (texto.length > 3) GameEngine.sumarPuntos(5);
      i += 1;
      render();
    });
  }

  render();
})();
