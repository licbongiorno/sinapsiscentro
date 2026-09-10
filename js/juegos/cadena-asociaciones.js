(function () {
  const contenedor = document.getElementById("jgContenedor");
  const INICIO = ["Playa", "Música", "Café", "Libro", "Montaña",
    "Infancia", "Viaje", "Lluvia", "Familia", "Silencio",
    "Otoño", "Amistad", "Cine", "Cocina", "Domingo",
    "Trabajo", "Escuela", "Verano", "Ciudad", "Recuerdo",
    "Abrazo", "Camino", "Fuego", "Jardín", "Noche",
    "Risas", "Mar", "Invierno", "Puerta", "Sueño",
    "Hogar", "Fiesta", "Tren", "Bosque", "Estrella"];
  let cadena = [INICIO[Math.floor(Math.random() * INICIO.length)]];
  const LIMITE = 12;

  GameEngine.iniciar({ juegoId: "cadena-asociaciones", vidas: null, tiempoSegundos: null });

  function render() {
    contenedor.innerHTML = `
      <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
        <div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:16px;">
          ${cadena.map(p => `<span style="background:var(--teal-pale);color:var(--teal-deep);padding:6px 12px;border-radius:50px;font-weight:700;font-size:0.85rem;">${p}</span>`).join("")}
        </div>
        <p style="color:var(--text-mid);margin-bottom:10px;font-size:0.9rem;">¿Qué te hace pensar <b style="color:var(--teal);">${cadena[cadena.length - 1]}</b>? (no repitas palabras)</p>
        <input id="inputAsoc" type="text" placeholder="Tu palabra…" maxlength="20"
          style="width:100%;border:2px solid var(--teal-pale);border-radius:50px;padding:12px 18px;font-family:inherit;font-size:1rem;text-align:center;">
        <button id="btnAgregarAsoc" class="ge-btn ge-btn-principal" style="width:100%;margin-top:12px;">Agregar</button>
        <p style="margin-top:12px;font-size:0.78rem;color:var(--text-soft);">${cadena.length} / ${LIMITE} palabras</p>
      </div>`;
    const input = document.getElementById("inputAsoc");
    input.focus();
    const agregar = () => {
      const val = input.value.trim();
      if (!val) return;
      const repetida = cadena.some(p => p.toLowerCase() === val.toLowerCase());
      if (!repetida) { cadena.push(val); GameEngine.sumarPuntos(4); }
      if (cadena.length - 1 >= LIMITE) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Cadena completa!" }); return; }
      render();
    };
    document.getElementById("btnAgregarAsoc").addEventListener("click", agregar);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") agregar(); });
  }

  render();
})();
