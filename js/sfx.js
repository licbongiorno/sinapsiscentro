/**
 * SFX.JS — Sonidos de acierto/error/logro para juegos y actividades
 * =======================================================================
 * Capa chica arriba de zzfx() (ver js/zzfx.js) con los momentos
 * puntuales que antes usaban beep() con un tono plano: sumar puntos,
 * perder una vida, terminar un juego, y (en la Zona Infantil) ganar
 * una estrella o la pantalla final. Los parámetros de cada preset
 * parten de combinaciones ya probadas por la comunidad de ZzFX
 * (ver README del paquete: presets "Heart"/"Drum"/"Game Over"),
 * retocadas en volumen/frecuencia para sonar consistentes con el
 * resto del sitio — que ya mezcla todo bastante suave (ganancias
 * 0.03-0.06 en los beep() que reemplaza).
 *
 * Si zzfx() no está cargado (por lo que sea), cada función no hace
 * nada — no rompe el juego, sólo queda mudo ese efecto puntual.
 */
const SFX = (() => {
  function zz(...args) { if (typeof zzfx === "function") zzfx(...args); }

  // "cha-ding" breve y brillante — sumar puntos / respuesta correcta.
  function acierto() {
    zz(.6, .05, 660, .01, .04, .18, 1, 1.4, -4, 3);
  }

  // golpe grave y corto, suavizado con un pasabajos — perder una vida / respuesta incorrecta.
  // No es un "buzzer": el sitio ya evita sonidos ásperos incluso al fallar.
  function error() {
    zz(.45, .1, 150, 0, .02, .16, 0, 1, 0, 0, 0, 0, 0, 3.5, 0, 0, 0, 1, 0, 0, -700);
  }

  // arpegio ascendente de 3 notas (do-mi-sol) — fin de juego con éxito / logro nuevo.
  function logro() {
    zz(.55, .05, 523, .01, .04, .14, 1, 1.4, -3, 2);
    setTimeout(() => zz(.55, .05, 659, .01, .04, .14, 1, 1.4, -3, 2), 90);
    setTimeout(() => zz(.6, .05, 784, .01, .07, .2, 1, 1.4, -3, 2), 180);
  }

  // tono descendente y suave — fin de juego sin éxito ("probá de nuevo").
  function finSinExito() {
    zz(.4, .08, 320, .02, .06, .3, 1, 1, -5, -2, 0, 0, 0, 0, 0, 0, 0, .6, .05);
  }

  // toque muy liviano — para la Zona Infantil, donde un error nunca "penaliza"
  // (ver comentario en js/infantil-engine.js), sólo invita a probar de nuevo.
  function suave() {
    zz(.25, .1, 260, 0, .02, .1, 0, 1, 0, 0, 0, 0, 0, 1.5);
  }

  return { acierto, error, logro, finSinExito, suave };
})();
