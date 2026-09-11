/**
 * AUTH.JS — Inicio de sesión con Google (SDK modular v9+)
 * =========================================
 * Se carga como <script type="module">, justo después de
 * firebase-config.js (también módulo). Expone `window.Auth`, que el
 * resto del sitio (JS clásico: storage.js y el script final de cada
 * página) sigue usando exactamente igual que antes — Auth.onCambio,
 * Auth.iniciarSesion, Auth.cerrarSesion, Auth.usuarioActual — sin
 * enterarse de que por debajo cambió el SDK.
 */

const fb = window.__firebaseModular;

window.Auth = (() => {
  if (!fb) {
    // Firebase no está configurado o no se pudo cargar (ver firebase-config.js).
    // La plataforma sigue funcionando en modo invitado, sin login.
    console.warn("Auth: Firebase no está inicializado — jugando como invitado.");
    return {
      iniciarSesion: () => Promise.reject(new Error("Firebase no configurado")),
      cerrarSesion: () => Promise.resolve(),
      usuarioActual: () => null,
      onCambio: (fn) => fn(null),
    };
  }

  const provider = new fb.GoogleAuthProvider();
  let usuarioActual; // undefined = todavía no se resolvió el estado inicial
  const listeners = [];

  fb.onAuthStateChanged(fb.auth, (user) => {
    usuarioActual = user; // null si no hay sesión, objeto User de Firebase si la hay
    listeners.forEach((fn) => fn(usuarioActual));
  });

  return {
    iniciarSesion() {
      return fb.signInWithPopup(fb.auth, provider).catch((err) => {
        console.error("Auth: error al iniciar sesión", err);
        alert("No se pudo iniciar sesión con Google. Probá de nuevo.");
        throw err;
      });
    },
    cerrarSesion() {
      return fb.signOut(fb.auth);
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
