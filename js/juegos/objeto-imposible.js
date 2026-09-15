(function () {
  const contenedor = document.getElementById("jgContenedor");
  const MATERIALES = ["vidrio", "humo", "goma", "hielo que no se derrite", "luz", "papel", "arena", "metal líquido", "algodón", "madera flexible",
    "agua congelada a la mitad", "telaraña", "nubes compactadas", "sombra sólida", "seda de acero", "cera tibia", "espejo líquido", "raíces trenzadas",
    "escarcha", "burbujas de jabón resistentes", "papel de diario", "piedra porosa", "cristal de sal", "pluma metálica", "barro seco", "corcho", "hueso tallado", "cuero de nube",
    "vapor solidificado", "musgo tejido", "arcilla luminosa", "ceniza compactada", "resina de árbol", "hielo tibio", "arena magnética", "cristal blando", "tela de araña dorada", "madera translúcida",
    "polvo de estrellas", "goma de borrar gigante", "cáscara de huevo reforzada", "vidrio soplado a mano", "lana de nube", "piel de tambor", "cartón encerado", "alambre trenzado con seda"];
  const FUNCIONES = ["guardar recuerdos", "medir el tiempo al revés", "escuchar pensamientos", "iluminar sin electricidad", "viajar sin moverse", "guardar silencio", "atrapar sueños", "enfriar el enojo", "abrir puertas invisibles", "recordar olores",
    "traducir el llanto", "guardar promesas", "medir la nostalgia", "despertar recuerdos dormidos", "guardar el eco de una risa", "detener una discusión", "iluminar sólo lo importante", "avisar cuando alguien miente sin querer",
    "guardar el primer día de algo", "hacer más liviana una despedida", "escuchar lo que no se dijo", "conservar el calor de un abrazo", "mapear los caminos no elegidos", "devolver el tiempo prestado", "coleccionar segundas oportunidades", "convertir el ruido en calma",
    "medir cuánto falta para sanar", "guardar el sonido de una casa vacía", "hacer visible lo que se siente", "avisar cuando alguien necesita ayuda sin pedirla", "conservar el primer intento de algo", "traducir un silencio incómodo",
    "medir la distancia entre dos personas", "guardar el peso de una decisión", "recordar quién fuiste antes de un cambio", "hacer que una disculpa llegue a tiempo", "conservar el entusiasmo de un comienzo", "avisar cuando ya es momento de soltar"];

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
        <div class="lector-fila"><p style="color:var(--text-mid);">Diseñá un objeto imposible hecho de <b style="color:var(--teal-deep);">${combo.material}</b> que sirva para <b style="color:var(--teal-deep);">${combo.funcion}</b>.</p>${Lector.boton(`Diseñá un objeto imposible hecho de ${combo.material}, que sirva para ${combo.funcion}.`)}</div>
        <div class="dictado-fila">
          <textarea class="jg-caja-texto" id="textoObjeto" placeholder="Describilo: ¿qué forma tiene? ¿cómo funciona?"></textarea>
          ${Dictado.boton("textoObjeto")}
        </div>
        <div style="display:flex;gap:10px;margin-top:14px;">
          <button id="btnOtraCombo" class="ge-btn ge-btn-secundario" style="flex:1;">Otra combinación</button>
          <button id="btnListoObjeto" class="ge-btn ge-btn-principal" style="flex:1;">Listo</button>
        </div>
        <p style="margin-top:14px;font-size:0.78rem;color:var(--text-soft);">Objetos creados: ${creaciones}</p>
      </div>`;
    Lector.conectar(contenedor);
    Dictado.conectar(contenedor);
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
