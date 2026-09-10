/**
 * AUTH.JS — Inicio de sesión con Google
 * =========================================
 * Expone el objeto global `Auth`. Storage.js y las páginas del
 * portal (juegos.html, juego.html) se suscriben con Auth.onCambio
 * para enterarse cuándo hay o deja de haber sesión.
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

  return {
    iniciarSesion() {
      return firebase.auth().signInWithPopup(provider).catch((err) => {
        console.error("Auth: error al iniciar sesión", err);
        alert("No se pudo iniciar sesión con Google. Probá de nuevo.");
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
