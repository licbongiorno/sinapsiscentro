(function () {
  const contenedor = document.getElementById("jgContenedor");
  const INICIO = ["CASA","AMOR","LUNA","SOL","RIO","FLOR","MAR","PAN",
    "GATO","LIBRO","NUBE","FUEGO","VERDE","NOCHE","CIELO","TREN",
    "PUENTE","ARBOL","CAMINO","ESTRELLA","VIENTO","PLAYA","MONTAÑA","JARDIN",
    "LLAVE","ESPEJO","RELOJ","BOSQUE","ISLA","BARCO","NIDO","LLUVIA",
    "FIESTA","AMIGO","MUSICA","DANZA","COLOR","PIEDRA","FUENTE","VALLE",
    "TORRE","CAMPANA","SENDA","AURORA","OCEANO","CRISTAL","HORIZONTE"];
  let cadena = [INICIO[Math.floor(Math.random() * INICIO.length)]];
  const LIMITE = 12;

  GameEngine.iniciar({ juegoId: "palabra-encadenada", vidas: null, tiempoSegundos: null });

  function ultimaLetra(p) { return p.trim().slice(-1).toUpperCase(); }

  function render() {
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:16px;">
          ${cadena.map(p => `<span style="background:var(--teal-pale);color:var(--teal-deep);padding:6px 12px;border-radius:50px;font-weight:700;font-size:0.85rem;">${p}</span>`).join("")}
        </div>
        <p style="color:var(--text-mid);margin-bottom:10px;font-size:0.9rem;">Escribí una palabra que empiece con <b style="color:var(--teal);">${ultimaLetra(cadena[cadena.length - 1])}</b></p>
        <input id="inputCadena" type="text" placeholder="Tu palabra…" maxlength="20"
          style="width:100%;border:2px solid var(--teal-pale);border-radius:50px;padding:12px 18px;font-family:inherit;font-size:1rem;text-align:center;">
        <button id="btnAgregarCadena" class="ge-btn ge-btn-principal" style="width:100%;margin-top:12px;">Agregar</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">${cadena.length} / ${LIMITE} palabras</p>
      </div>`;
    const input = document.getElementById("inputCadena");
    input.focus();
    const agregar = () => {
      const val = input.value.trim();
      if (!val) return;
      const ok = val[0].toUpperCase() === ultimaLetra(cadena[cadena.length - 1]);
      cadena.push(val.toUpperCase());
      if (ok) GameEngine.sumarPuntos(5);
      if (cadena.length - 1 >= LIMITE) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Cadena completa!" }); return; }
      render();
    };
    document.getElementById("btnAgregarCadena").addEventListener("click", agregar);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") agregar(); });
  }

  render();
})();
