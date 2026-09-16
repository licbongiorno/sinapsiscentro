/**
 * DICTADO.JS — Botón de dictado por voz (voz a texto) para las
 * actividades de escritura/reflexión. Complemento de lector.js (que
 * lee en voz alta): esto deja responder hablando en vez de tipear.
 * Usa la Web Speech API (SpeechRecognition) del navegador — sin
 * backend ni costo. Si el navegador no la soporta (Firefox, algunos
 * de escritorio), boton() devuelve "" y no aparece nada.
 *
 * OJO con `continuous: true`: en varios navegadores de Android, el
 * reconocedor va "revisando" texto que ya había marcado como final y
 * lo reenvía en eventos posteriores, duplicándolo (p. ej. "probando"
 * termina apareciendo como "probando probando probando…"). Por eso
 * acá cada sesión de reconocimiento es corta (continuous: false) y
 * se reinicia sola apenas termina.
 *
 * Pero reiniciar trae su propio problema: en Android, entre que una
 * sesión termina y la siguiente arranca, el micrófono suele volver a
 * capturar una cola de audio ya transcripta (solapamiento del buffer),
 * así que la sesión nueva puede volver a "escuchar" el final de lo
 * que ya se había dictado y repetirlo — cada reinicio agrega otra
 * repetición, por eso crece cada vez más. `combinarSinSolape` detecta
 * cuánto se repite entre el final de lo ya confirmado y el arranque
 * de lo nuevo, y sólo agrega lo que realmente es texto nuevo.
 */
const Dictado = (() => {
  const Reconocedor = window.SpeechRecognition || window.webkitSpeechRecognition;
  const soportado = !!Reconocedor;
  let estado = null; // { rec, textarea, btn, base, detenido }

  function pararVisual(btn) {
    if (btn) {
      btn.classList.remove("dictado-activo");
      btn.setAttribute("aria-pressed", "false");
      btn.title = "Dictar por voz";
    }
  }

  function limpiar(texto) {
    return texto.replace(/\s+/g, " ").trim();
  }

  /**
   * Agrega `nuevo` al final de `base`, pero si el arranque de `nuevo`
   * repite las últimas palabras de `base` (solapamiento entre
   * sesiones), sólo agrega lo que sigue después de esa repetición.
   * Compara sin mayúsculas/tildes para tolerar pequeñas variaciones
   * de transcripción entre una sesión y la otra.
   */
  function combinarSinSolape(base, nuevo) {
    nuevo = limpiar(nuevo);
    if (!nuevo) return base;
    if (!base) return nuevo;
    const normalizar = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const palabrasBase = base.split(" ");
    const palabrasNuevo = nuevo.split(" ");
    const maxSolape = Math.min(palabrasBase.length, palabrasNuevo.length, 12);
    for (let n = maxSolape; n > 0; n--) {
      const colaBase = normalizar(palabrasBase.slice(-n).join(" "));
      const inicioNuevo = normalizar(palabrasNuevo.slice(0, n).join(" "));
      if (colaBase === inicioNuevo) {
        const resto = palabrasNuevo.slice(n).join(" ");
        return resto ? `${base} ${resto}` : base;
      }
    }
    return `${base} ${nuevo}`;
  }

  function iniciarSesion() {
    const rec = new Reconocedor();
    rec.lang = "es-AR";
    rec.interimResults = true;
    rec.continuous = false;
    let finalDeEstaSesion = "";

    rec.onresult = (e) => {
      if (!estado || estado.rec !== rec) return;
      let final = "", interim = "";
      for (let i = 0; i < e.results.length; i++) {
        const texto = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += texto;
        else interim += texto;
      }
      finalDeEstaSesion = final;
      const vistaPrevia = combinarSinSolape(estado.base, final);
      estado.textarea.value = limpiar(`${vistaPrevia} ${interim}`);
    };

    rec.onerror = (e) => {
      if (!estado || estado.rec !== rec) return;
      // "no-speech" (silencio) y "aborted" (lo detuvimos nosotros) no son
      // errores reales — el onend que sigue decide si reinicia o no.
      if (e.error === "no-speech" || e.error === "aborted") return;
      pararVisual(estado.btn);
      estado = null;
    };

    rec.onend = () => {
      if (!estado || estado.rec !== rec) return;
      if (finalDeEstaSesion) {
        estado.base = combinarSinSolape(estado.base, finalDeEstaSesion);
        estado.textarea.value = estado.base;
      }
      if (estado.detenido) { pararVisual(estado.btn); estado = null; return; }
      // Pequeña pausa antes de reabrir el micrófono: si se reinicia
      // demasiado pegado al cierre anterior, en algunos Android el
      // buffer de audio todavía se solapa con la sesión vieja.
      const detenidoAlCerrar = estado;
      setTimeout(() => {
        if (estado === detenidoAlCerrar && !estado.detenido) iniciarSesion();
      }, 250);
    };

    if (estado) estado.rec = rec;
    try { rec.start(); } catch (err) { if (estado) { pararVisual(estado.btn); estado = null; } }
  }

  function iniciar(textarea, btn) {
    const baseInicial = textarea.value ? limpiar(textarea.value) : "";
    estado = { rec: null, textarea, btn, base: baseInicial, detenido: false };
    btn.classList.add("dictado-activo");
    btn.setAttribute("aria-pressed", "true");
    btn.title = "Escuchando… tocá para detener";
    iniciarSesion();
  }

  function detenerEstadoActivo() {
    if (!estado) return;
    estado.detenido = true;
    pararVisual(estado.btn);
    if (estado.rec) { try { estado.rec.stop(); } catch (e) {} }
  }

  function alternar(textareaId, btn) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    const eraElMismo = estado && estado.btn === btn;
    if (estado) detenerEstadoActivo();
    if (eraElMismo) return;
    iniciar(textarea, btn);
  }

  /** Devuelve el HTML de un botón de dictado para el textarea con ese id, o "" si no hay soporte. */
  function boton(textareaId, claseExtra = "") {
    if (!soportado || !textareaId) return "";
    return `<button type="button" class="dictado-btn ${claseExtra}" data-dictado-textarea="${textareaId}" aria-pressed="false" aria-label="Dictar por voz" title="Dictar por voz">🎙️</button>`;
  }

  /** Conecta los botones data-dictado-textarea ya insertados en el DOM (llamar tras cada innerHTML). */
  function conectar(raiz) {
    if (!soportado) return;
    const root = raiz || document;
    root.querySelectorAll("[data-dictado-textarea]").forEach((btn) => {
      if (btn.dataset.dictadoListo) return;
      btn.dataset.dictadoListo = "1";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        alternar(btn.getAttribute("data-dictado-textarea"), btn);
      });
    });
  }

  function detener() {
    detenerEstadoActivo();
    estado = null;
  }

  return { soportado, boton, conectar, detener };
})();
