/**
 * DICTADO.JS — Botón de dictado por voz (voz a texto) para las
 * actividades de escritura/reflexión. Complemento de lector.js (que
 * lee en voz alta): esto deja responder hablando en vez de tipear.
 * Usa la Web Speech API (SpeechRecognition) del navegador — sin
 * backend ni costo. Si el navegador no la soporta (Firefox, algunos
 * de escritorio), boton() devuelve "" y no aparece nada.
 */
const Dictado = (() => {
  const Reconocedor = window.SpeechRecognition || window.webkitSpeechRecognition;
  const soportado = !!Reconocedor;
  let recActivo = null;
  let botonActivo = null;

  function pararVisual(btn) {
    if (btn) {
      btn.classList.remove("dictado-activo");
      btn.setAttribute("aria-pressed", "false");
      btn.title = "Dictar por voz";
    }
    recActivo = null;
    botonActivo = null;
  }

  function iniciar(textarea, btn) {
    const rec = new Reconocedor();
    rec.lang = "es-AR";
    rec.interimResults = true;
    rec.continuous = true;
    let base = textarea.value ? textarea.value.replace(/\s+$/, "") + " " : "";

    rec.onresult = (e) => {
      let final = "", interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const texto = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += texto;
        else interim += texto;
      }
      if (final) base = (base + final).replace(/\s+$/, "") + " ";
      textarea.value = base + interim;
    };
    rec.onerror = () => pararVisual(btn);
    rec.onend = () => pararVisual(btn);

    recActivo = rec;
    botonActivo = btn;
    btn.classList.add("dictado-activo");
    btn.setAttribute("aria-pressed", "true");
    btn.title = "Escuchando… tocá para detener";
    try { rec.start(); } catch (e) { pararVisual(btn); }
  }

  function alternar(textareaId, btn) {
    const textarea = document.getElementById(textareaId);
    if (!textarea) return;
    if (recActivo) {
      const eraElMismo = botonActivo === btn;
      recActivo.stop();
      pararVisual(botonActivo);
      if (eraElMismo) return;
    }
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
    if (recActivo) { recActivo.stop(); pararVisual(botonActivo); }
  }

  return { soportado, boton, conectar, detener };
})();
