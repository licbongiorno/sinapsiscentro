/**
 * BEEP.JS — Sonido compartido (Web Audio, sin archivos que descargar)
 * =======================================================================
 * Antes game-engine.js y exercise-engine.js tenían cada uno su propia
 * copia casi idéntica de esta función; la de exercise-engine.js además
 * creaba un AudioContext nuevo en cada llamada en vez de reutilizarlo.
 * Ahora ambos motores usan esta única función, con un solo AudioContext
 * cacheado.
 */
let _beepAudioCtx = null;

function beep(frecuencia = 440, duracionMs = 120, tipo = "sine", volumen = 0.05) {
  try {
    _beepAudioCtx = _beepAudioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = _beepAudioCtx.createOscillator();
    const gain = _beepAudioCtx.createGain();
    osc.type = tipo;
    osc.frequency.value = frecuencia;
    gain.gain.value = volumen;
    osc.connect(gain).connect(_beepAudioCtx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, _beepAudioCtx.currentTime + duracionMs / 1000);
    osc.stop(_beepAudioCtx.currentTime + duracionMs / 1000);
  } catch (e) { /* audio no disponible; no es crítico */ }
}
