(function () {
  const contenedor = document.getElementById("jgContenedor");
  const HISTORIAS = [
    "La puerta llevaba diez años cerrada. Esa tarde, alguien finalmente giró la llave y…",
    "El mensaje decía solamente: \"Ya lo sabe\". Nadie entendía a qué se refería, hasta que…",
    "El pueblo entero se quedó sin luz la misma noche que apareció una luz en el cielo…",
    "Encontró una carta escrita por ella misma, pero con una letra que no reconocía…",
    "El tren nunca debía parar en esa estación abandonada. Esta vez, lo hizo…",
    "Todos los relojes del edificio se detuvieron a la misma hora, menos uno…",
    "La foto tenía una persona de más. Nadie recordaba haberla conocido…",
    "El perro empezó a ladrarle a la pared vacía, todas las noches, a la misma hora…",
    "Debajo de las tablas del piso encontraron un cuaderno con su propia letra, de niño…",
    "El eco de la casa devolvía palabras que nadie había dicho…",
    "La última página del libro estaba en blanco, hasta que empezó a escribirse sola…",
    "Alguien dejó una llave bajo la puerta con una nota: \"Sabés para qué es\"…",
    "El ascensor se detuvo en un piso que el edificio no tenía…",
    "Todos en el pueblo soñaron lo mismo esa noche, sin haberlo hablado entre ellos…",
    "La radio vieja del sótano empezó a transmitir una voz conocida…",
    "En la última caja de mudanza había algo que nadie había guardado ahí…",
    "El espejo del pasillo empezó a reflejar un segundo antes de lo que pasaba…",
    "Volvió al pueblo después de veinte años y su casa seguía exactamente igual, hasta el último detalle…",
    "Un barco apareció en el puerto sin tripulación, con las luces encendidas…",
    "Todos los días a las tres de la tarde, alguien tocaba el timbre y no había nadie…",
    "En el fondo del ropero encontró una puerta que no debería estar ahí…",
    "El árbol del patio empezó a dar frutos que nadie había plantado…",
    "La vecina nueva conocía el nombre de todos antes de que se lo dijeran…",
    "El reloj de la abuela atrasaba un minuto por año, siempre el mismo minuto…",
    "Alguien había estado durmiendo en la casa de verano, aunque nadie tenía llave…",
    "El mapa del tesoro que encontraron de chicos resultó ser un mapa real…",
    "La última carta de la abuela tenía instrucciones para un día que todavía no había llegado…",
    "Todos los relojes de sol del pueblo señalaban el mismo punto en el bosque…",
    "El eco del sótano repetía una frase que nadie había dicho en voz alta…",
    "La foto de graduación tenía una sombra de más, justo detrás de él…",
    "El correo siguió llegando a esa dirección diez años después de que se mudaran…",
    "Una melodía conocida empezó a sonar desde la casa vacía de al lado…",
    "El río bajó su nivel una noche y dejó ver algo que nadie esperaba…",
    "En el ático encontraron una maleta con su nombre, hecha antes de que naciera…",
    "La luz del faro se encendió esa noche, aunque hacía años que nadie lo operaba…",
  ];
  let orden = [...HISTORIAS].sort(() => Math.random() - 0.5);
  let i = 0;

  GameEngine.iniciar({ juegoId: "final-alternativo", vidas: null, tiempoSegundos: null });

  function render() {
    if (i >= Math.min(3, orden.length)) {
      GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "¡Buenos finales! ✍️" });
      return;
    }
    contenedor.innerHTML = `
      <div style="width:min(94vw,460px);margin:0 auto;text-align:center;">
        <div style="background:white;border-radius:var(--r-lg);padding:22px 20px;box-shadow:0 10px 30px rgba(8,32,46,0.08);margin-bottom:16px;font-size:1rem;line-height:1.7;font-style:italic;">
          ${orden[i]}
        </div>
        <p style="color:var(--text-mid);margin-bottom:10px;font-size:0.88rem;">Continuá la historia como quieras.</p>
        <textarea class="jg-caja-texto" id="textoFinal" placeholder="Y entonces…"></textarea>
        <button id="btnListoFinal" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Siguiente</button>
        <p style="margin-top:14px;font-size:0.78rem;color:var(--text-soft);">${i + 1} / 3</p>
      </div>`;
    document.getElementById("btnListoFinal").addEventListener("click", () => {
      const texto = document.getElementById("textoFinal").value.trim();
      if (texto.length > 5) GameEngine.sumarPuntos(8);
      i += 1;
      render();
    });
  }

  render();
})();
