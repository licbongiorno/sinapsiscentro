/**
 * LETRAS COMPARTIDAS
 * ====================
 * Mecánica: entre varias personas (en el mismo dispositivo, por
 * turnos) van construyendo una historia agregando una palabra por
 * vez. Pensado para jugarse en el consultorio o en casa, en grupo.
 *
 * La versión asincrónica (cada persona agrega su palabra desde su
 * propio celular, en momentos distintos) está prevista en el diseño
 * pero necesita Firestore en tiempo real — queda documentada acá
 * como el próximo paso natural una vez conectado Firebase.
 */
(function () {
  const contenedor = document.getElementById("jgContenedor");
  const INICIOS = [
    "Había una vez",
    "En un pueblo pequeño",
    "Nadie sabía por qué",
    "Esa mañana algo cambió cuando",
    "Al abrir la puerta encontraron",
    "Muy lejos de acá",
    "Cuentan que hace tiempo",
    "Todo iba normal hasta que",
    "En la última casa de la calle vivía",
    "Nadie se animaba a hablar de",
    "Cada vez que llovía aparecía",
    "Al fondo del patio había",
    "Desde la ventana se veía",
    "Un día cualquiera, sin avisar,",
    "Lo que nadie contaba era que",
    "Entre todos los vecinos, sólo uno sabía que",
    "En el pueblo se decía que",
    "Todo cambió el día que llegó",
    "Nadie había visto algo así hasta que",
    "Escondido entre los árboles estaba",
    "Cada vez que alguien preguntaba, la respuesta era",
    "Al final del camino, siempre había",
    "Desde ese día, en el barrio se hablaba de",
    "Nadie quiso contar qué pasó cuando",
    "En la escuela, todos recordaban el día que",
    "La historia empieza con",
    "Contra todo pronóstico,",
    "Lo último que se supo fue que",
    "En el medio de la nada apareció",
    "Sin que nadie lo esperara,",
  ];

  let palabras = [INICIOS[Math.floor(Math.random() * INICIOS.length)]];
  const LIMITE_PALABRAS = 25;

  GameEngine.iniciar({ juegoId: "letras-compartidas", vidas: null, tiempoSegundos: null });

  function render() {
    contenedor.innerHTML = `
      <div style="width:min(94vw,480px);margin:0 auto;">
        <div style="background:white;border:2px solid var(--teal-pale);border-radius:var(--r);padding:20px;min-height:140px;font-size:1.05rem;line-height:1.7;color:var(--text);">
          ${palabras.join(" ")}<span style="opacity:0.3;">▌</span>
        </div>
        <p style="text-align:center;font-size:0.78rem;color:var(--text-soft);margin:10px 0 16px;">${palabras.length - 1} / ${LIMITE_PALABRAS} palabras agregadas</p>
        <div style="display:flex;gap:8px;">
          <input id="inputPalabra" type="text" placeholder="Sumá una palabra…" maxlength="20"
            style="flex:1;border:2px solid var(--teal-pale);border-radius:50px;padding:12px 18px;font-family:inherit;font-size:1rem;">
          <button id="btnAgregar" style="border:none;border-radius:50px;padding:0 22px;background:linear-gradient(135deg,var(--teal),var(--teal-mid));color:white;font-weight:800;cursor:pointer;">＋</button>
        </div>
        <button id="btnTerminar" class="ge-btn ge-btn-secundario" style="width:100%;margin-top:14px;">Terminar historia acá</button>
      </div>`;

    const input = document.getElementById("inputPalabra");
    input.focus();
    const agregar = () => {
      const val = input.value.trim();
      if (!val) return;
      palabras.push(val.split(/\s+/)[0]); // una palabra por turno
      input.value = "";
      GameEngine.sumarPuntos(2);
      if (palabras.length - 1 >= LIMITE_PALABRAS) { terminar(); return; }
      render();
    };
    document.getElementById("btnAgregar").addEventListener("click", agregar);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") agregar(); });
    document.getElementById("btnTerminar").addEventListener("click", terminar);
  }

  function terminar() {
    // Guardamos la historia en una pequeña galería local, propia de este juego.
    try {
      const clave = "sinapsis_juegos:historias-compartidas";
      const historias = JSON.parse(localStorage.getItem(clave) || "[]");
      historias.unshift({ texto: palabras.join(" "), fecha: new Date().toISOString() });
      localStorage.setItem(clave, JSON.stringify(historias.slice(0, 20)));
    } catch (e) { /* no crítico */ }

    GameEngine.terminar({
      puntaje: GameEngine.puntosActuales(),
      exito: true,
      mensaje: "¡Historia terminada!",
    });
  }

  render();
})();
