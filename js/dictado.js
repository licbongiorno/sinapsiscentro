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
 * se reinicia sola apenas termina, acumulando el texto ya cerrado de
 * cada sesión en `estado.base` — así nunca se reprocesa un resultado
 * que ya se había dado por final.
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
      estado.textarea.value = limpiar(`${estado.base} ${final} ${interim}`);
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
        estado.base = limpiar(`${estado.base} ${finalDeEstaSesion}`);
        estado.textarea.value = estado.base;
      }
      if (estado.detenido) { pararVisual(estado.btn); estado = null; return; }
      iniciarSesion();
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
