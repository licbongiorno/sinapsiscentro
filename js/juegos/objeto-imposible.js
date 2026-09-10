(function () {
  const contenedor = document.getElementById("jgContenedor");
  const MATERIALES = ["vidrio", "humo", "goma", "hielo que no se derrite", "luz", "papel", "arena", "metal líquido", "algodón", "madera flexible"];
  const FUNCIONES = ["guardar recuerdos", "medir el tiempo al revés", "escuchar pensamientos", "iluminar sin electricidad", "viajar sin moverse", "guardar silencio", "atrapar sueños", "enfriar el enojo", "abrir puertas invisibles", "recordar olores"];

  function combinacion() {
    return {
      material: MATERIALES[Math.floor(Math.random() * MATERIALES.length)],
      funcion: FUNCIONES[Math.floor(Math.random() * FUNCIONES.length)],
    };
  }

  GameEngine.iniciar({ juegoId: "objeto-imposible", vidas: null, tiempoSegundos: null });
  let combo = combinacion();
  let creaciones = 0;

  function render() {
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <p style="color:var(--text-mid);margin-bottom:14px;">Diseñá un objeto imposible hecho de <b style="color:var(--teal-deep);">${combo.material}</b> que sirva para <b style="color:var(--teal-deep);">${combo.funcion}</b>.</p>
        <textarea class="jg-caja-texto" id="textoObjeto" placeholder="Describilo: ¿qué forma tiene? ¿cómo funciona?"></textarea>
        <div style="display:flex;gap:10px;margin-top:14px;">
          <button id="btnOtraCombo" class="ge-btn ge-btn-secundario" style="flex:1;">Otra combinación</button>
          <button id="btnListoObjeto" class="ge-btn ge-btn-principal" style="flex:1;">Listo</button>
        </div>
        <p style="margin-top:14px;font-size:0.78rem;color:var(--text-soft);">Objetos creados: ${creaciones}</p>
      </div>`;
    document.getElementById("btnOtraCombo").addEventListener("click", () => { combo = combinacion(); render(); });
    document.getElementById("btnListoObjeto").addEventListener("click", () => {
      const texto = document.getElementById("textoObjeto").value.trim();
      if (texto.length > 3) { creaciones += 1; GameEngine.sumarPuntos(5); }
      if (creaciones >= 3) {
        GameEngine.terminar({ puntaje: 0, exito: true, mensaje: `Diseñaste ${creaciones} objetos imposibles. 🎨` });
      } else {
        combo = combinacion();
        render();
      }
    });
  }

  render();
})();
