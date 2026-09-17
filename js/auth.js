/**
 * AUTH.JS — Inicio de sesión con Google
 * =========================================
 * Expone el objeto global `Auth`. Storage.js y las páginas del
 * portal (juegos.html, juego.html, ejercicios.html, ejercicio.html)
 * se suscriben con Auth.onCambio para enterarse cuándo hay o deja de
 * haber sesión.
 *
 * Requiere que ANTES de este script se hayan cargado, en este orden:
 *   1. firebase-app-compat.js, firebase-auth-compat.js, firebase-firestore-compat.js
 *   2. firebase-config.js (que llama a firebase.initializeApp(...))
 */

const Auth = (() => {
  if (typeof firebase === "undefined" || !firebase.apps || !firebase.apps.length) {
    // Firebase no está configurado todavía (firebase-config.js con datos de ejemplo).
    // La plataforma sigue funcionando en modo invitado, sin login.
    console.warn("Auth: Firebase no está inicializado — jugando como invitado.");
    return {
      iniciarSesion: () => Promise.reject(new Error("Firebase no configurado")),
      cerrarSesion: () => Promise.resolve(),
      usuarioActual: () => null,
      onCambio: (fn) => fn(null),
    };
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  let usuarioActual; // undefined = todavía no se resolvió el estado inicial
  const listeners = [];

  firebase.auth().onAuthStateChanged((user) => {
    usuarioActual = user; // null si no hay sesión, objeto User de Firebase si la hay
    listeners.forEach((fn) => fn(usuarioActual));
  });

  // Si volvemos de un signInWithRedirect (fallback de más abajo), esto
  // atrapa errores que de otra forma quedarían silenciosos (dominio no
  // autorizado, etc.) — el usuario logueado en sí ya se refleja solo
  // vía onAuthStateChanged.
  firebase.auth().getRedirectResult().catch((err) => {
    console.error("Auth: error al volver del login con Google", err);
    alert("No se pudo iniciar sesión con Google. Probá de nuevo.");
  });

  return {
    iniciarSesion() {
      // signInWithPopup en vez de signInWithRedirect: el redirect
      // dependía de que el navegador comparta cookies/storage entre
      // esta página y el dominio auxiliar de Firebase
      // (*.firebaseapp.com) al volver de Google — con el bloqueo de
      // cookies de terceros que ya viene activado por defecto en
      // Chrome/Safari/Firefox, esa vuelta puede fallar en silencio:
      // Google deja elegir la cuenta, pero el navegador nunca completa
      // el login (no aparece ni error ni usuario nuevo en Firebase).
      // El popup no tiene ese problema (usa postMessage, no storage
      // compartido) — sólo hace falta el fallback a redirect para el
      // caso real, más raro hoy, de que el navegador bloquee el popup.
      return firebase.auth().signInWithPopup(provider).catch((err) => {
        if (err && err.code === "auth/popup-blocked") {
          console.warn("Auth: pop-up bloqueado por el navegador, reintentando con redirect", err);
          return firebase.auth().signInWithRedirect(provider);
        }
        throw err;
      });
    },
    cerrarSesion() {
      return firebase.auth().signOut();
    },
    /** Devuelve undefined si el estado inicial todavía no se resolvió, null si no hay sesión, o el usuario. */
    usuarioActual: () => usuarioActual,
    /** fn(user) se llama inmediatamente si ya se resolvió el estado inicial, y de nuevo cada vez que cambia. */
    onCambio(fn) {
      listeners.push(fn);
      if (usuarioActual !== undefined) fn(usuarioActual);
    },
  };
})();

window.Auth = Auth;
