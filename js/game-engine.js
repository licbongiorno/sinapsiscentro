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
 *
 * Los botones de "volver"/"pausa: salir"/"otro juego" van a juegos.html
 * por defecto, pero algunos de estos mismos juegos (js/juegos/*.js) ahora
 * también se reproducen desde Mindfulness (mindfulness-item.html), que
 * setea `window.__geVolverA = "mindfulness.html"` ANTES de inyectar el
 * script del juego para que esos botones vuelvan al portal correcto.
 */

const GameEngine = (() => {
  let estado = null;
  let alFinalizarCallback = null;

  // beep() vive en js/beep.js (compartido con exercise-engine.js).

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
      window.location.href = window.__geVolverA || "juegos.html";
    });
    document.getElementById("gePausa").addEventListener("click", () => GameEngine.alternarPausa());
    return hud;
  }

  function actualizarVidasHUD(perdida = false) {
    const el = document.getElementById("geVidas");
    if (estado.vidas == null) { el.hidden = true; return; }
    el.hidden = false;
    const corazones = el.querySelectorAll(".ge-corazon");
    if (!perdida || corazones.length === 0) {
      el.innerHTML = "";
      for (let i = 0; i < Math.max(0, estado.vidas); i++) {
        const span = document.createElement("span");
        span.className = "ge-corazon";
        span.textContent = "❤️";
        el.appendChild(span);
      }
      return;
    }
    const ultimo = corazones[corazones.length - 1];
    ultimo.classList.add("ge-corazon-perdida");
    setTimeout(() => ultimo.remove(), 220);
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
        <button class="compartir-btn" id="gePausaCompartir">🔗 Compartir este juego</button>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById("geReanudar").addEventListener("click", () => GameEngine.alternarPausa());
    document.getElementById("geSalirPausa").addEventListener("click", () => window.location.href = window.__geVolverA || "juegos.html");
    document.getElementById("gePausaCompartir").addEventListener("click", () => {
      const juego = (typeof CatalogoJuegos !== "undefined" && CatalogoJuegos.porId(estado.juegoId))
        || (typeof CatalogoMindfulness !== "undefined" && CatalogoMindfulness.porId(estado.juegoId))
        || (typeof CatalogoCreatividad !== "undefined" && CatalogoCreatividad.porId(estado.juegoId))
        || null;
      const nombreJuego = (juego && (juego.titulo || juego.nombre)) || "Este juego";
      Compartir.compartir({
        titulo: nombreJuego,
        texto: `${nombreJuego} — un recurso gratuito de Sinapsis, Centro de Salud Integral.`,
        url: window.location.href,
      });
    });
    return overlay;
  }

  return {
    /** Inicializa una partida nueva. */
    iniciar({ juegoId, vidas = null, tiempoSegundos = null }) {
      document.querySelectorAll(".ge-hud").forEach(h => h.remove());
      alFinalizarCallback = null;
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
      const el = document.getElementById("gePuntos");
      el.querySelector("span").textContent = estado.puntos;
      el.classList.remove("ge-bump");
      void el.offsetWidth; // reinicia la animación si se suman puntos rápido seguido
      el.classList.add("ge-bump");
      SFX.acierto();
    },

    restarVida() {
      if (!estado || estado.terminado || estado.vidas == null) return;
      estado.vidas -= 1;
      actualizarVidasHUD(true);
      vibrar(40);
      SFX.error();
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
      if (alFinalizarCallback) alFinalizarCallback();

      // Igual que en logros.js/storage.js: algunos de estos juegos ahora
      // también se reproducen desde Mindfulness o Creatividad
      // (mindfulness-item.html/creatividad-item.html), que no cargan
      // data/juegos-catalogo.js — sin esta guarda, CatalogoJuegos
      // quedaría indefinido ahí y esto cortaría en seco antes de
      // llegar a mostrar la pantalla final.
      const juego = (typeof CatalogoJuegos !== "undefined" && CatalogoJuegos.porId(estado.juegoId))
        || (typeof CatalogoMindfulness !== "undefined" && CatalogoMindfulness.porId(estado.juegoId))
        || (typeof CatalogoCreatividad !== "undefined" && CatalogoCreatividad.porId(estado.juegoId))
        || null;
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
      const ranking = (juego && juego.puntuable) ? Storage.getRankingLocal(estado.juegoId) : [];

      mostrarPantallaFin({ juego, puntaje, exito, mensaje, xpGanada, perfil, racha, mejoroRecord, logrosNuevos, ranking });
      vibrar(exito ? [30, 40, 30] : 60);
      exito ? SFX.logro() : SFX.finSinExito();
    },

    reiniciar() {
      window.location.reload();
    },

    /**
     * Registra una función que se ejecuta justo antes de que termine
     * la partida (por ejemplo, para limpiar setInterval/requestAnimationFrame
     * propios de un juego). Reemplaza la necesidad de sobreescribir
     * GameEngine.terminar manualmente desde cada juego.
     */
    alFinalizar(fn) {
      alFinalizarCallback = fn;
    },
  };

  function mostrarPantallaFin({ juego, puntaje, exito, mensaje, xpGanada, perfil, racha, mejoroRecord, logrosNuevos, ranking = [] }) {
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
            ${logrosNuevos.map((l, i) => `<div class="ge-logro-chip" style="animation-delay:${0.3 + i * 0.1}s">${l.icono} ${l.nombre}</div>`).join("")}
          </div>` : ""}
        ${ranking.length ? `
          <div class="ge-ranking">
            <p class="ge-ranking-titulo">🏆 Tus mejores puntajes en este juego</p>
            <ol class="ge-ranking-lista">
              ${ranking.slice(0, 5).map((r, i) => `<li class="${r.puntaje === puntaje && mejoroRecord && i === 0 ? "actual" : ""}">${i + 1}. ${r.puntaje} pts</li>`).join("")}
            </ol>
          </div>` : ""}
        <div class="ge-fin-botones">
          <button class="ge-btn ge-btn-principal" id="geJugarDeNuevo">Jugar de nuevo</button>
          <button class="ge-btn ge-btn-secundario" id="geOtroJuego">Otro juego</button>
        </div>
        <button class="compartir-btn" id="geCompartir">🔗 Compartir este juego</button>
      </div>`;
    document.getElementById("geJugarDeNuevo").addEventListener("click", () => window.location.reload());
    document.getElementById("geOtroJuego").addEventListener("click", () => window.location.href = window.__geVolverA || "juegos.html");
    document.getElementById("geCompartir").addEventListener("click", () => {
      const nombreJuego = (juego && (juego.titulo || juego.nombre)) || "Este juego";
      Compartir.compartir({
        titulo: nombreJuego,
        texto: `${nombreJuego} — un recurso gratuito de Sinapsis, Centro de Salud Integral.`,
        url: window.location.href,
      });
    });
  }
})();
