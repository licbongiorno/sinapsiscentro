/**
 * GAME-ENGINE.JS — Motor común para todos los juegos
 * ======================================================
 * Cada juego individual (js/juegos/*.js) sólo se ocupa de SU propia
 * mecánica: dibuja su tablero dentro de `#juego-area` y llama a las
 * funciones de este motor para sumar puntos, restar vidas, terminar
 * la partida, etc. El motor se encarga de: HUD, cronómetro, vidas,
 * sonido, vibración, guardado de resultados, XP, logros y pantalla
 * final.
 *
 * Uso típico dentro de un juego:
 *
 *   GameEngine.iniciar({
 *     juegoId: "memoria-clasica",
 *     vidas: 3,               // null = sin vidas
 *     tiempoSegundos: null,   // null = sin cronómetro
 *   });
 *   ...
 *   GameEngine.sumarPuntos(10);
 *   GameEngine.restarVida();
 *   GameEngine.terminar({ puntaje: 120, exito: true, mensaje: "¡Muy bien!" });
 */

const GameEngine = (() => {
  let estado = null;
  let audioCtx = null;

  function beep(frecuencia = 440, duracionMs = 120, tipo = "sine", volumen = 0.05) {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = tipo;
      osc.frequency.value = frecuencia;
      gain.gain.value = volumen;
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duracionMs / 1000);
      osc.stop(audioCtx.currentTime + duracionMs / 1000);
    } catch (e) { /* audio no disponible; no es crítico */ }
  }

  function vibrar(patron = 30) {
    if (navigator.vibrate) navigator.vibrate(patron);
  }

  function crearHUD() {
    const hud = document.createElement("div");
    hud.className = "ge-hud";
    hud.innerHTML = `
      <button class="ge-volver" id="geVolver" aria-label="Volver al portal">←</button>
      <div class="ge-hud-centro">
        <div class="ge-hud-item" id="geTiempo" hidden>⏱ <span>--</span></div>
        <div class="ge-hud-item" id="gePuntos">⭐ <span>0</span></div>
        <div class="ge-hud-item" id="geVidas" hidden></div>
      </div>
      <button class="ge-pausa" id="gePausa" aria-label="Pausar">⏸</button>
    `;
    document.body.prepend(hud);
    document.getElementById("geVolver").addEventListener("click", () => {
      window.location.href = "juegos.html";
    });
    document.getElementById("gePausa").addEventListener("click", () => GameEngine.alternarPausa());
    return hud;
  }

  function actualizarVidasHUD() {
    const el = document.getElementById("geVidas");
    if (estado.vidas == null) { el.hidden = true; return; }
    el.hidden = false;
    el.textContent = "❤️".repeat(Math.max(0, estado.vidas));
  }

  function actualizarTiempoHUD() {
    const el = document.getElementById("geTiempo");
    if (estado.tiempoSegundos == null) { el.hidden = true; return; }
    el.hidden = false;
    const s = Math.max(0, estado.tiempoRestante);
    el.querySelector("span").textContent = `${s}s`;
  }

  function tickTimer() {
    if (estado.pausado) return;
    estado.tiempoRestante -= 1;
    actualizarTiempoHUD();
    if (estado.tiempoRestante <= 0) {
      clearInterval(estado.timerId);
      GameEngine.terminar({ puntaje: estado.puntos, exito: estado.puntos > 0, mensaje: "¡Se acabó el tiempo!" });
    }
  }

  function crearOverlayFin() {
    let overlay = document.getElementById("geFin");
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.id = "geFin";
    overlay.className = "ge-overlay";
    overlay.hidden = true;
    document.body.appendChild(overlay);
    return overlay;
  }

  function crearOverlayPausa() {
    let overlay = document.getElementById("gePausaOverlay");
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.id = "gePausaOverlay";
    overlay.className = "ge-overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="ge-card">
        <h2>Pausa</h2>
        <p>Tomate el tiempo que necesites.</p>
        <button class="ge-btn ge-btn-principal" id="geReanudar">Continuar</button>
        <button class="ge-btn ge-btn-secundario" id="geSalirPausa">Volver al portal</button>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById("geReanudar").addEventListener("click", () => GameEngine.alternarPausa());
    document.getElementById("geSalirPausa").addEventListener("click", () => window.location.href = "juegos.html");
    return overlay;
  }

  return {
    /** Inicializa una partida nueva. */
    iniciar({ juegoId, vidas = null, tiempoSegundos = null }) {
      document.querySelectorAll(".ge-hud").forEach(h => h.remove());
      estado = {
        juegoId, vidas, tiempoSegundos,
        tiempoRestante: tiempoSegundos,
        puntos: 0, pausado: false, terminado: false, timerId: null,
        inicio: Date.now(),
      };
      crearHUD();
      crearOverlayFin();
      crearOverlayPausa();
      actualizarVidasHUD();
      actualizarTiempoHUD();
      if (tiempoSegundos != null) {
        estado.timerId = setInterval(tickTimer, 1000);
      }
      document.getElementById("gePuntos").querySelector("span").textContent = "0";
      return estado;
    },

    sumarPuntos(n = 1) {
      if (!estado || estado.terminado) return;
      estado.puntos += n;
      document.getElementById("gePuntos").querySelector("span").textContent = estado.puntos;
      beep(660, 90, "triangle", 0.04);
    },

    restarVida() {
      if (!estado || estado.terminado || estado.vidas == null) return;
      estado.vidas -= 1;
      actualizarVidasHUD();
      vibrar(40);
      beep(180, 150, "sawtooth", 0.05);
      if (estado.vidas <= 0) {
        GameEngine.terminar({ puntaje: estado.puntos, exito: false, mensaje: "Se acabaron las vidas. ¡Probá de nuevo!" });
      }
    },

    puntosActuales: () => (estado ? estado.puntos : 0),

    alternarPausa() {
      if (!estado || estado.terminado) return;
      estado.pausado = !estado.pausado;
      const overlay = document.getElementById("gePausaOverlay");
      overlay.hidden = !estado.pausado;
    },

    /**
     * Cierra la partida: guarda progreso, calcula XP, evalúa logros
     * y muestra la pantalla final.
     */
    terminar({ puntaje = 0, exito = true, mensaje = "" } = {}) {
      if (!estado || estado.terminado) return;
      estado.terminado = true;
      if (estado.timerId) clearInterval(estado.timerId);

      const juego = CatalogoJuegos.porId(estado.juegoId);
      const progresoAnterior = Storage.getProgreso(estado.juegoId);
      const mejoroRecord = puntaje > (progresoAnterior.mejorPuntaje || 0) && puntaje > 0;

      Storage.guardarProgreso(estado.juegoId, { puntaje });
      const racha = Storage.registrarActividadHoy();

      const xpGanada = Math.max(5, Math.round(puntaje / 2) + (exito ? 10 : 3));
      const perfil = Storage.sumarXP(xpGanada);

      if (juego && juego.puntuable && puntaje > 0) {
        Storage.registrarPuntaje(estado.juegoId, puntaje, perfil.nombre);
      }

      const logrosNuevos = Logros.evaluarTrasPartida({ mejoroRecordEnEstaPartida: mejoroRecord });

      mostrarPantallaFin({ juego, puntaje, exito, mensaje, xpGanada, perfil, racha, mejoroRecord, logrosNuevos });
      vibrar(exito ? [30, 40, 30] : 60);
      beep(exito ? 880 : 220, 200, exito ? "triangle" : "sawtooth", 0.05);
    },

    reiniciar() {
      window.location.reload();
    },
  };

  function mostrarPantallaFin({ juego, puntaje, exito, mensaje, xpGanada, perfil, racha, mejoroRecord, logrosNuevos }) {
    const overlay = document.getElementById("geFin");
    overlay.hidden = false;
    overlay.innerHTML = `
      <div class="ge-card">
        <div class="ge-fin-icono">${exito ? "🎉" : "💛"}</div>
        <h2>${mensaje || (exito ? "¡Buen trabajo!" : "Fin de la partida")}</h2>
        ${puntaje > 0 ? `<p class="ge-puntaje-final">${puntaje} puntos</p>` : ""}
        ${mejoroRecord ? `<p class="ge-record">📈 ¡Superaste tu récord!</p>` : ""}
        <p class="ge-xp">+${xpGanada} XP · Nivel ${perfil.nivel} · Racha 🔥 ${racha.dias} día${racha.dias === 1 ? "" : "s"}</p>
        ${logrosNuevos.length ? `
          <div class="ge-logros-nuevos">
            ${logrosNuevos.map(l => `<div class="ge-logro-chip">${l.icono} ${l.nombre}</div>`).join("")}
          </div>` : ""}
        <div class="ge-fin-botones">
          <button class="ge-btn ge-btn-principal" id="geJugarDeNuevo">Jugar de nuevo</button>
          <button class="ge-btn ge-btn-secundario" id="geOtroJuego">Otro juego</button>
        </div>
      </div>`;
    document.getElementById("geJugarDeNuevo").addEventListener("click", () => window.location.reload());
    document.getElementById("geOtroJuego").addEventListener("click", () => window.location.href = "juegos.html");
  }
})();
