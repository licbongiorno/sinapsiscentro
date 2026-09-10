(function () {
  const contenedor = document.getElementById("jgContenedor");
  const CLAVES = [
    { pista: "Astro que nos da luz de día", letras: 3, correcta: "SOL" },
    { pista: "Animal doméstico que ladra", letras: 5, correcta: "PERRO" },
    { pista: "Se usa para escribir", letras: 5, correcta: "LAPIZ" },
    { pista: "Lugar donde se aprende", letras: 7, correcta: "ESCUELA" },
    { pista: "Fruta amarilla y curva", letras: 6, correcta: "BANANA" },
    { pista: "Animal que maúlla", letras: 4, correcta: "GATO" },
    { pista: "Se usa para abrir una puerta", letras: 5, correcta: "LLAVE" },
    { pista: "Estación fría del año", letras: 8, correcta: "INVIERNO" },
    { pista: "Astro que vemos de noche", letras: 4, correcta: "LUNA" },
    { pista: "Lugar donde se guardan libros", letras: 10, correcta: "BIBLIOTECA" },
    { pista: "Bebida caliente que se toma a la mañana", letras: 4, correcta: "CAFE" },
    { pista: "Mueble donde se duerme", letras: 4, correcta: "CAMA" },
    { pista: "Instrumento que marca la hora", letras: 5, correcta: "RELOJ" },
    { pista: "Vehículo de dos ruedas", letras: 9, correcta: "BICICLETA" },
  ];
  let orden = [...CLAVES].sort(() => Math.random() - 0.5).slice(0, 6);
  let i = 0;

  GameEngine.iniciar({ juegoId: "palabras-cruzadas-rapidas", vidas: 3, tiempoSegundos: null });

  function normalizar(s) { return s.trim().toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

  function render() {
    if (i >= orden.length) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Mini crucigrama resuelto!" }); return; }
    const clave = orden[i];
    contenedor.innerHTML = `
      <div style="width:min(94vw,420px);margin:0 auto;text-align:center;">
        <p style="color:var(--text-mid);margin-bottom:6px;font-size:0.85rem;">${i + 1} / ${orden.length} — ${clave.letras} letras</p>
        <p style="font-weight:700;color:var(--navy);margin-bottom:16px;">${clave.pista}</p>
        <input id="inputCruzada" type="text" maxlength="${clave.letras + 2}" style="width:100%;text-align:center;text-transform:uppercase;letter-spacing:0.2em;border:2px solid var(--teal-pale);border-radius:var(--r);padding:12px;font-family:inherit;font-size:1.2rem;font-weight:800;">
        <button id="btnConfirmarCruzada" class="ge-btn ge-btn-principal" style="width:100%;margin-top:14px;">Confirmar</button>
      </div>`;
    const input = document.getElementById("inputCruzada");
    input.focus();
    const confirmar = () => {
      if (normalizar(input.value) === normalizar(clave.correcta)) { GameEngine.sumarPuntos(15); }
      else { GameEngine.restarVida(); }
      i += 1;
      render();
    };
    document.getElementById("btnConfirmarCruzada").addEventListener("click", confirmar);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") confirmar(); });
  }

  render();
})();
