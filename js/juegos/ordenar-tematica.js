(function () {
  const contenedor = document.getElementById("jgContenedor");
  const id = new URLSearchParams(window.location.search).get("id") || "";

  const BANCOS = /*__BANCOS__*/{"logica-orden-de-tamano": {"vidas": 3, "mensajeFinal": "¡Buen orden!", "rondas": [{"instruccion": "Ordená de más chico a más grande.", "items": ["Hormiga", "Gato", "Caballo", "Elefante"]}, {"instruccion": "Ordená de más chico a más grande.", "items": ["Semilla", "Pelota", "Auto", "Casa"]}, {"instruccion": "Ordená de más chico a más grande.", "items": ["Átomo", "Célula", "Persona", "Planeta"]}]}, "logica-orden-cronologico-historia": {"vidas": 3, "mensajeFinal": "¡Buen orden cronológico!", "rondas": [{"instruccion": "Ordená del más antiguo al más reciente.", "items": ["La rueda", "La imprenta", "El teléfono", "Internet"]}, {"instruccion": "Ordená del más antiguo al más reciente.", "items": ["El fuego controlado", "La escritura", "El avión", "El smartphone"]}]}, "logica-pasos-de-un-plan": {"vidas": 3, "mensajeFinal": "¡Buena planificación!", "rondas": [{"instruccion": "Ordená los pasos para preparar un mate.", "items": ["Calentar el agua", "Cebar el mate", "Poner la yerba", "Tomarlo"]}, {"instruccion": "Ordená los pasos para armar una valija.", "items": ["Decidir el destino", "Hacer una lista", "Elegir la ropa", "Cerrar la valija"]}, {"instruccion": "Ordená los pasos para plantar una semilla.", "items": ["Conseguir una maceta", "Poner tierra", "Plantar la semilla", "Regarla"]}]}, "logica-orden-de-magnitud": {"vidas": 3, "mensajeFinal": "¡Buena noción de escala!", "rondas": [{"instruccion": "Ordená de más chico a más grande.", "items": ["Átomo", "Bacteria", "Hormiga", "Ballena"]}, {"instruccion": "Ordená de más chico a más grande.", "items": ["Ciudad", "País", "Planeta", "Galaxia"]}]}, "logica-causa-y-efecto": {"vidas": 3, "mensajeFinal": "¡Buen razonamiento causal!", "rondas": [{"instruccion": "Ordená: primero la causa, después el efecto.", "items": ["Llueve mucho", "El río crece"]}, {"instruccion": "Ordená: primero la causa, después el efecto.", "items": ["No regaste la planta", "La planta se secó"]}, {"instruccion": "Ordená: primero la causa, después el efecto.", "items": ["Estudiaste mucho", "Aprobaste el examen"]}]}, "logica-jerarquia-biologica": {"vidas": 3, "mensajeFinal": "¡Buena jerarquía biológica!", "rondas": [{"instruccion": "Ordená de lo más simple a lo más complejo.", "items": ["Célula", "Tejido", "Órgano", "Organismo"]}]}, "logica-orden-de-prioridad": {"vidas": 3, "mensajeFinal": "¡Buen orden de prioridades!", "rondas": [{"instruccion": "Ordená de más urgente a menos urgente.", "items": ["Apagar un incendio chico en la cocina", "Responder un mensaje", "Planear vacaciones del año que viene", "Guardar la ropa limpia"]}]}, "numeros-ordenar-de-menor-a-mayor": {"vidas": 3, "mensajeFinal": "¡Buen orden numérico!", "rondas": [{"instruccion": "Ordená de menor a mayor.", "items": ["23", "8", "45", "17"]}, {"instruccion": "Ordená de menor a mayor.", "items": ["100", "99", "101", "50"]}, {"instruccion": "Ordená de menor a mayor.", "items": ["7", "70", "700", "0"]}]}, "numeros-ordenar-fracciones": {"vidas": 3, "mensajeFinal": "¡Buen orden de fracciones!", "rondas": [{"instruccion": "Ordená de menor a mayor.", "items": ["1/4", "1/2", "3/4", "1/8"]}, {"instruccion": "Ordená de menor a mayor.", "items": ["1/3", "2/3", "1/6", "1"]}]}, "numeros-ordenar-decimales": {"vidas": 3, "mensajeFinal": "¡Buen orden de decimales!", "rondas": [{"instruccion": "Ordená de menor a mayor.", "items": ["1.5", "1.05", "1.55", "1.1"]}, {"instruccion": "Ordená de menor a mayor.", "items": ["0.9", "0.09", "0.99", "0.1"]}]}, "numeros-ordenar-negativos": {"vidas": 3, "mensajeFinal": "¡Buen orden con negativos!", "rondas": [{"instruccion": "Ordená de menor a mayor.", "items": ["-5", "3", "-1", "0"]}, {"instruccion": "Ordená de menor a mayor.", "items": ["-10", "-2", "5", "-7"]}]}, "numeros-orden-de-longitudes": {"vidas": 3, "mensajeFinal": "¡Buen orden de medidas!", "rondas": [{"instruccion": "Ordená de más corto a más largo.", "items": ["1 milímetro", "1 centímetro", "1 metro", "1 kilómetro"]}]}, "numeros-ordenar-porcentajes": {"vidas": 3, "mensajeFinal": "¡Buen orden de porcentajes!", "rondas": [{"instruccion": "Ordená de menor a mayor.", "items": ["25%", "75%", "10%", "50%"]}, {"instruccion": "Ordená de menor a mayor.", "items": ["5%", "100%", "50%", "1%"]}]}, "flexibilidad-cambiar-de-criterio": {"vidas": 3, "mensajeFinal": "¡Buena flexibilidad mental!", "rondas": [{"instruccion": "Primero ordená estos animales por tamaño (de más chico a más grande).", "items": ["Hormiga", "Perro", "Elefante"]}, {"instruccion": "Ahora ordená los mismos animales, pero alfabéticamente.", "items": ["Elefante", "Hormiga", "Perro"]}]}, "flexibilidad-de-lo-concreto-a-lo-abstracto": {"vidas": 3, "mensajeFinal": "¡Buen pensamiento abstracto!", "rondas": [{"instruccion": "Ordená de lo más concreto a lo más abstracto.", "items": ["Esta silla", "Una silla", "Un mueble", "Un objeto"]}]}, "flexibilidad-prioridades-que-cambian": {"vidas": 3, "mensajeFinal": "¡Buena adaptación!", "rondas": [{"instruccion": "Es un día normal. Ordená de más a menos urgente.", "items": ["Terminar un informe", "Responder un mensaje", "Ordenar el escritorio"]}, {"instruccion": "Ahora se rompió una cañería en tu casa. Reordená.", "items": ["Cortar el agua", "Terminar un informe", "Ordenar el escritorio"]}]}, "flexibilidad-doble-clasificacion": {"vidas": 3, "mensajeFinal": "¡Buena clasificación múltiple!", "rondas": [{"instruccion": "Ordená estas formas primero por tamaño y, si empatan, alfabéticamente: círculo grande, cuadrado grande, círculo chico.", "items": ["Círculo chico", "Círculo grande", "Cuadrado grande"]}]}, "flexibilidad-orden-inverso-a-pedido": {"vidas": 3, "mensajeFinal": "¡Buena flexibilidad!", "rondas": [{"instruccion": "Ordená estos números de MAYOR a menor (al revés de lo habitual).", "items": ["50", "30", "10", "5"]}, {"instruccion": "Ordená estas letras del final del abecedario hacia el principio.", "items": ["Z", "M", "D", "A"]}]}, "flexibilidad-reglas-que-cambian-de-a-una": {"vidas": 3, "mensajeFinal": "¡Te adaptaste a cada regla!", "rondas": [{"instruccion": "Ordená estos números de menor a mayor.", "items": ["8", "3", "15"]}, {"instruccion": "Ahora ordená estos números de mayor a menor.", "items": ["8", "3", "15"]}, {"instruccion": "Ahora ordená estas palabras alfabéticamente.", "items": ["Gato", "Auto", "Mesa"]}]}}/*__FIN_BANCOS__*/;
  const banco = BANCOS[id];
  if (!banco) { contenedor.innerHTML = "<p style='text-align:center;'>Juego no encontrado.</p>"; return; }

  let ronda = 0;
  GameEngine.iniciar({ juegoId: id, vidas: banco.vidas != null ? banco.vidas : 3, tiempoSegundos: null });

  function nuevaRonda() {
    if (ronda >= banco.rondas.length) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: banco.mensajeFinal || "¡Completaste todas las secuencias!" });
      return;
    }
    const r = banco.rondas[ronda];
    const items = r.items;
    let disponibles = items.map((texto, idx) => ({ texto, idx }));
    disponibles.sort(() => Math.random() - 0.5);
    const elegidos = [];

    function render() {
      contenedor.innerHTML = `
        <div style="text-align:center;">
          <p style="color:var(--text-soft);font-size:0.85rem;margin-bottom:4px;">${ronda + 1} / ${banco.rondas.length}</p>
          <p style="font-weight:700;color:var(--navy);margin-bottom:14px;">${r.instruccion}</p>
          <div style="min-height:44px;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:16px;">
            ${elegidos.length ? elegidos.map((e, i) => `<span style="background:var(--teal-pale);border-radius:8px;padding:6px 10px;font-size:0.85rem;font-weight:700;">${i + 1}. ${e.texto}</span>`).join("") : `<span style="color:var(--text-soft);font-size:0.85rem;">Tocá en orden…</span>`}
          </div>
          <div class="jg-opciones">${disponibles.map(d => `<button class="jg-opcion" data-idx="${d.idx}">${d.texto}</button>`).join("")}</div>
        </div>`;
      contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.idx);
        elegidos.push({ texto: items[idx], idx });
        disponibles = disponibles.filter(d => d.idx !== idx);
        if (disponibles.length === 0) {
          const correcto = elegidos.every((e, i) => e.idx === i);
          if (correcto) GameEngine.sumarPuntos(15); else GameEngine.restarVida();
          setTimeout(() => { ronda += 1; nuevaRonda(); }, 700);
        } else {
          render();
        }
      }));
    }
    render();
  }

  nuevaRonda();
})();
