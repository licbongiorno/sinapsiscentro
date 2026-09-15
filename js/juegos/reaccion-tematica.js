(function () {
  const contenedor = document.getElementById("jgContenedor");
  const id = new URLSearchParams(window.location.search).get("id") || "";

  const BANCOS = /*__BANCOS__*/{"reflejos-espera-el-verde": {"modo": "espera", "rondas": 6, "colorEspera": "#e06060", "colorListo": "#4caf6a", "textoEspera": "esperá el verde…", "textoListo": "¡YA!", "mensajeFinal": "¡Buenos reflejos!"}, "reflejos-espera-el-azul": {"modo": "espera", "rondas": 6, "colorEspera": "#cccccc", "colorListo": "#2aaec2", "textoEspera": "esperá el azul…", "textoListo": "¡YA!", "mensajeFinal": "¡Buen tiempo de reacción!"}, "reflejos-toca-el-amarillo": {"modo": "espera", "rondas": 6, "colorEspera": "#888888", "colorListo": "#e0b64a", "textoEspera": "esperá el amarillo…", "textoListo": "¡YA!", "mensajeFinal": "¡Muy rápido!"}, "reflejos-solo-el-verde": {"modo": "inhibicion", "rondas": 8, "colorObjetivo": "#4caf6a", "colorDistractor": "#e06060", "instruccion": "Tocá SÓLO cuando el círculo sea verde.", "mensajeFinal": "¡Buen control!"}, "reflejos-solo-el-azul": {"modo": "inhibicion", "rondas": 8, "colorObjetivo": "#2aaec2", "colorDistractor": "#e08a4a", "instruccion": "Tocá SÓLO cuando el círculo sea azul.", "mensajeFinal": "¡Buen control!"}, "reflejos-solo-el-violeta": {"modo": "inhibicion", "rondas": 8, "colorObjetivo": "#9370db", "colorDistractor": "#e0b64a", "instruccion": "Tocá SÓLO cuando el círculo sea violeta.", "mensajeFinal": "¡Buen control!"}, "reflejos-evita-el-rojo": {"modo": "inhibicion", "rondas": 8, "colorObjetivo": "#1a9e94", "colorDistractor": "#e06060", "instruccion": "Tocá el turquesa. Evitá tocar el rojo.", "mensajeFinal": "¡Evitaste bien la trampa!"}, "reflejos-el-color-correcto": {"modo": "inhibicion", "rondas": 8, "colorObjetivo": "#e07ab0", "colorDistractor": "#888888", "instruccion": "Tocá SÓLO cuando el círculo sea rosa.", "mensajeFinal": "¡Elegiste bien cada vez!"}, "reflejos-toca-rapido": {"modo": "espera", "rondas": 4, "colorEspera": "#e06060", "colorListo": "#4caf6a", "textoEspera": "atento, viene rápido…", "textoListo": "¡YA!", "mensajeFinal": "¡Rapidísimo!"}, "reflejos-el-semaforo": {"modo": "inhibicion", "rondas": 9, "colorObjetivo": "#4caf6a", "colorDistractor": "#e06060", "instruccion": "Como en un semáforo: tocá sólo en verde, nunca en rojo.", "mensajeFinal": "¡Respetaste bien el semáforo!"}, "reflejos-el-guardian": {"modo": "inhibicion", "rondas": 8, "colorObjetivo": "#4caf6a", "colorDistractor": "#9370db", "instruccion": "Sólo tocá el color 'amigo' (verde). El violeta es el 'enemigo': no lo toques.", "mensajeFinal": "¡Buen guardián!"}, "reflejos-cuenta-y-toca": {"modo": "espera", "rondas": 8, "colorEspera": "#cccccc", "colorListo": "#e0b64a", "textoEspera": "esperá la señal…", "textoListo": "¡YA!", "mensajeFinal": "¡Sostuviste el ritmo hasta el final!"}, "reflejos-cronometro-personal": {"modo": "espera", "rondas": 6, "colorEspera": "#e06060", "colorListo": "#1a9e94", "textoEspera": "esperá el turquesa…", "textoListo": "¡YA!", "mensajeFinal": "¡Ese es tu tiempo de reacción de hoy!"}, "reflejos-precision-o-velocidad": {"modo": "inhibicion", "rondas": 8, "colorObjetivo": "#e08a4a", "colorDistractor": "#6ab7e0", "instruccion": "Tocá el naranja. Si aparece el celeste, no lo toques.", "mensajeFinal": "¡Buen equilibrio entre velocidad y control!"}, "reflejos-alerta-maxima": {"modo": "inhibicion", "rondas": 10, "colorObjetivo": "#4caf6a", "colorDistractor": "#e06060", "instruccion": "Tocá sólo el verde. Es una ronda larga: mantené la concentración.", "mensajeFinal": "¡Sostuviste el control hasta el final!"}, "atencion-vigilancia-de-color": {"modo": "inhibicion", "rondas": 9, "colorObjetivo": "#2aaec2", "colorDistractor": "#e0b64a", "instruccion": "Tocá SÓLO cuando el círculo sea azul.", "mensajeFinal": "¡Buena atención sostenida!"}, "atencion-no-te-distraigas": {"modo": "inhibicion", "rondas": 9, "colorObjetivo": "#e07ab0", "colorDistractor": "#9370db", "instruccion": "Tocá sólo el rosa. El violeta es parecido, pero no es el color correcto.", "mensajeFinal": "¡No te distrajiste!"}, "atencion-mantene-el-foco": {"modo": "espera", "rondas": 9, "colorEspera": "#cccccc", "colorListo": "#4caf6a", "textoEspera": "mantené el foco, esperá…", "textoListo": "¡YA!", "mensajeFinal": "¡Sostuviste el foco toda la ronda!"}, "atencion-doble-chequeo": {"modo": "inhibicion", "rondas": 8, "colorObjetivo": "#e08a4a", "colorDistractor": "#e0b64a", "instruccion": "Tocá sólo el naranja. El amarillo se le parece: fijate bien.", "mensajeFinal": "¡Buen chequeo!"}, "atencion-alerta-selectiva": {"modo": "inhibicion", "rondas": 9, "colorObjetivo": "#1a9e94", "colorDistractor": "#6ab7e0", "instruccion": "Tocá sólo el turquesa. Ignorá el celeste, aunque se le parezca.", "mensajeFinal": "¡Buena atención selectiva!"}, "flexibilidad-cambia-el-objetivo": {"modo": "cambio", "totalRondas": 8, "cambioEn": 4, "colorObjetivoInicial": "#4caf6a", "colorObjetivoFinal": "#2aaec2", "nombreInicial": "VERDE", "nombreFinal": "AZUL", "mensajeFinal": "¡Te adaptaste al cambio de regla!"}, "flexibilidad-nueva-regla-de-golpe": {"modo": "cambio", "totalRondas": 8, "cambioEn": 4, "colorObjetivoInicial": "#e06060", "colorObjetivoFinal": "#e0b64a", "nombreInicial": "ROJO", "nombreFinal": "AMARILLO", "mensajeFinal": "¡Buena adaptación!"}, "flexibilidad-adaptate-rapido": {"modo": "cambio", "totalRondas": 8, "cambioEn": 4, "colorObjetivoInicial": "#9370db", "colorObjetivoFinal": "#e08a4a", "nombreInicial": "VIOLETA", "nombreFinal": "NARANJA", "mensajeFinal": "¡Te adaptaste rápido!"}, "flexibilidad-el-cambio-de-mitad-de-partida": {"modo": "cambio", "totalRondas": 8, "cambioEn": 4, "colorObjetivoInicial": "#1a9e94", "colorObjetivoFinal": "#e07ab0", "nombreInicial": "TURQUESA", "nombreFinal": "ROSA", "mensajeFinal": "¡Buen cambio de estrategia!"}, "flexibilidad-regla-inesperada": {"modo": "cambio", "totalRondas": 8, "cambioEn": 4, "colorObjetivoInicial": "#888888", "colorObjetivoFinal": "#6ab7e0", "nombreInicial": "GRIS", "nombreFinal": "CELESTE", "mensajeFinal": "¡Buena flexibilidad!"}, "flexibilidad-de-un-color-a-otro": {"modo": "cambio", "totalRondas": 8, "cambioEn": 4, "colorObjetivoInicial": "#e0b64a", "colorObjetivoFinal": "#9370db", "nombreInicial": "AMARILLO", "nombreFinal": "VIOLETA", "mensajeFinal": "¡Bien adaptado a los dos colores!"}, "flexibilidad-el-giro-de-la-partida": {"modo": "cambio", "totalRondas": 10, "cambioEn": 5, "colorObjetivoInicial": "#e06060", "colorObjetivoFinal": "#4caf6a", "nombreInicial": "ROJO", "nombreFinal": "VERDE", "mensajeFinal": "¡Sostuviste bien el cambio!"}}/*__FIN_BANCOS__*/;
  const banco = BANCOS[id];
  if (!banco) { contenedor.innerHTML = "<p style='text-align:center;'>Juego no encontrado.</p>"; return; }

  GameEngine.iniciar({ juegoId: id, vidas: banco.vidas != null ? banco.vidas : 3, tiempoSegundos: null });

  // ── MODO "espera": clásico, tocar apenas aparece el color listo ──
  function modoEspera() {
    const total = banco.rondas || 6;
    let ronda = 0;
    let tiempoAparicion = 0, esperandoToque = false, timeoutId = null;

    function estadoEspera() {
      esperandoToque = false;
      contenedor.innerHTML = `
        <p style="text-align:center;color:var(--text-mid);margin-bottom:20px;">Ronda ${ronda + 1} de ${total} — ${banco.textoEspera || "esperá la señal…"}</p>
        <div id="zonaReaccion" style="width:min(90vw,300px);height:min(90vw,300px);margin:0 auto;border-radius:50%;background:${banco.colorEspera || "#e06060"};display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:1.1rem;cursor:pointer;transition:background 0.15s;">Esperá…</div>`;
      const zona = document.getElementById("zonaReaccion");
      zona.addEventListener("click", () => {
        if (esperandoToque) {
          registrar(Date.now() - tiempoAparicion);
        } else {
          clearTimeout(timeoutId);
          zona.style.background = "#a04040";
          zona.textContent = "¡Muy pronto! 😅";
          setTimeout(siguiente, 800);
        }
      });
      const espera = 1000 + Math.random() * 2200;
      timeoutId = setTimeout(() => {
        esperandoToque = true;
        tiempoAparicion = Date.now();
        zona.style.background = banco.colorListo || "#4caf6a";
        zona.textContent = banco.textoListo || "¡YA!";
      }, espera);
    }

    function registrar(ms) {
      const puntos = Math.max(5, Math.round(400 - ms / 3));
      GameEngine.sumarPuntos(puntos);
      contenedor.querySelector("#zonaReaccion").textContent = `${ms} ms`;
      setTimeout(siguiente, 650);
    }

    function siguiente() {
      ronda += 1;
      if (ronda >= total) {
        GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: banco.mensajeFinal || "¡Buenos reflejos!" });
        return;
      }
      estadoEspera();
    }

    estadoEspera();
  }

  // ── MODO "inhibicion": tocar sólo el color objetivo, no el distractor ──
  function modoInhibicion() {
    const total = banco.rondas || 8;
    let ronda = 0;
    let timeoutId = null;

    function nuevaRonda() {
      if (ronda >= total) {
        GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: banco.mensajeFinal || "¡Buen control!" });
        return;
      }
      const esObjetivo = Math.random() < 0.55;
      const color = esObjetivo ? banco.colorObjetivo : banco.colorDistractor;
      let resuelto = false;
      contenedor.innerHTML = `
        <p style="text-align:center;color:var(--text-mid);margin-bottom:8px;">Ronda ${ronda + 1} de ${total}</p>
        <p style="text-align:center;font-weight:700;color:var(--navy);margin-bottom:20px;">${banco.instruccion}</p>
        <div id="zonaInhibicion" style="width:min(85vw,260px);height:min(85vw,260px);margin:0 auto;border-radius:50%;background:${color};cursor:pointer;transition:transform 0.1s;"></div>`;
      const zona = document.getElementById("zonaInhibicion");
      zona.addEventListener("click", () => {
        if (resuelto) return;
        resuelto = true;
        clearTimeout(timeoutId);
        if (esObjetivo) { GameEngine.sumarPuntos(10); zona.style.transform = "scale(1.1)"; }
        else { GameEngine.restarVida(); }
        setTimeout(() => { ronda += 1; nuevaRonda(); }, 450);
      });
      timeoutId = setTimeout(() => {
        if (resuelto) return;
        resuelto = true;
        if (esObjetivo) { GameEngine.restarVida(); }
        else { GameEngine.sumarPuntos(5); }
        ronda += 1;
        nuevaRonda();
      }, esObjetivo ? 1300 : 950);
    }

    nuevaRonda();
  }

  // ── MODO "cambio": la regla de qué color tocar cambia a mitad de partida ──
  function modoCambio() {
    const total = banco.totalRondas || 10;
    const mitad = banco.cambioEn || Math.floor(total / 2);
    let ronda = 0;
    let tiempoAparicion = 0, esperandoToque = false, timeoutId = null;
    let avisoMostrado = false;

    function colorObjetivoActual() { return ronda < mitad ? banco.colorObjetivoInicial : banco.colorObjetivoFinal; }
    function nombreActual() { return ronda < mitad ? (banco.nombreInicial || "") : (banco.nombreFinal || ""); }

    function estado() {
      if (ronda === mitad && !avisoMostrado) {
        avisoMostrado = true;
        contenedor.innerHTML = `<div style="text-align:center;padding:40px 20px;"><p style="font-size:1.3rem;font-weight:800;color:var(--navy);">¡Cambio de regla!</p><p style="color:var(--text-mid);margin-top:10px;">Ahora tocá cuando sea ${nombreActual()}.</p></div>`;
        setTimeout(estado, 1400);
        return;
      }
      esperandoToque = false;
      contenedor.innerHTML = `
        <p style="text-align:center;color:var(--text-mid);margin-bottom:20px;">Ronda ${ronda + 1} de ${total} — tocá cuando sea ${nombreActual()}</p>
        <div id="zonaCambio" style="width:min(90vw,300px);height:min(90vw,300px);margin:0 auto;border-radius:50%;background:#cccccc;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:1.1rem;cursor:pointer;">Esperá…</div>`;
      const zona = document.getElementById("zonaCambio");
      zona.addEventListener("click", () => {
        if (esperandoToque) registrar();
        else {
          clearTimeout(timeoutId);
          zona.style.background = "#a04040";
          zona.textContent = "¡Muy pronto! 😅";
          setTimeout(siguiente, 700);
        }
      });
      const espera = 900 + Math.random() * 1800;
      timeoutId = setTimeout(() => {
        esperandoToque = true;
        tiempoAparicion = Date.now();
        zona.style.background = colorObjetivoActual();
        zona.textContent = "¡YA!";
      }, espera);
    }

    function registrar() {
      const ms = Date.now() - tiempoAparicion;
      GameEngine.sumarPuntos(Math.max(5, Math.round(350 - ms / 3)));
      contenedor.querySelector("#zonaCambio").textContent = `${ms} ms`;
      setTimeout(siguiente, 600);
    }

    function siguiente() {
      ronda += 1;
      if (ronda >= total) {
        GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: banco.mensajeFinal || "¡Te adaptaste al cambio!" });
        return;
      }
      estado();
    }

    estado();
  }

  if (banco.modo === "inhibicion") modoInhibicion();
  else if (banco.modo === "cambio") modoCambio();
  else modoEspera();
})();
