/**
 * FIREBASE-CONFIG.JS (SDK modular v9+)
 * =====================
 * Pegá acá la configuración de TU proyecto de Firebase (la copiás
 * de la consola en el paso 2 de la guía del README).
 *
 * Este archivo se carga como <script type="module">, antes de
 * auth.js (también módulo) — ver el <head> de juegos.html, juego.html,
 * ejercicios.html y ejercicio.html. El resto del sitio (storage.js,
 * perfil.js, logros.js, game-engine.js, los 120 juegos, etc.) sigue
 * siendo JS clásico sin módulos ni build: no necesitan saber que
 * Firebase existe, sólo leen `window.Auth` / `window.__firebaseModular`
 * cuando corresponde (y ninguno de ellos cambia por esto).
 *
 * Mientras esto tenga los valores de ejemplo ("TU_API_KEY", etc.),
 * la plataforma sigue funcionando perfecto en modo invitado, sólo
 * que sin login ni sincronización entre dispositivos.
 */

const firebaseConfig = {
  apiKey: "AIzaSyA3tg6IJ_yCSjxdNizqlMlFhxBvHv_njgU",
  authDomain: "centrosinapsis-nuevo.firebaseapp.com",
  projectId: "centrosinapsis-nuevo",
  storageBucket: "centrosinapsis-nuevo.firebasestorage.app",
  messagingSenderId: "868962845774",
  appId: "1:868962845774:web:6457bc46ce745e16b6ef1f",
};

const FIREBASE_SDK_VERSION = "10.13.0";
const CDN = `https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}`;

// null hasta que se confirme una inicialización exitosa. auth.js (que
// se carga después, también como módulo) lee esto para decidir si
// arma el login real o el objeto Auth de modo invitado.
window.__firebaseModular = null;

if (firebaseConfig.apiKey === "TU_API_KEY") {
  console.warn("firebase-config.js: todavía tiene los datos de ejemplo. Completalo con tu proyecto real para activar el login.");
} else {
  // import() dinámico (no un import estático arriba del archivo) a
  // propósito: si el CDN de Firebase no responde (sin conexión,
  // bloqueado, etc.), esto se puede atrapar con try/catch y degradar
  // a modo invitado — un import estático que falla aborta el módulo
  // entero sin poder controlarlo.
  try {
    const [{ initializeApp }, authMod, fsMod] = await Promise.all([
      import(`${CDN}/firebase-app.js`),
      import(`${CDN}/firebase-auth.js`),
      import(`${CDN}/firebase-firestore.js`),
    ]);
    const app = initializeApp(firebaseConfig);
    window.__firebaseModular = {
      auth: authMod.getAuth(app),
      db: fsMod.getFirestore(app),
      GoogleAuthProvider: authMod.GoogleAuthProvider,
      onAuthStateChanged: authMod.onAuthStateChanged,
      signInWithPopup: authMod.signInWithPopup,
      signOut: authMod.signOut,
      doc: fsMod.doc,
      getDoc: fsMod.getDoc,
      setDoc: fsMod.setDoc,
      collection: fsMod.collection,
      addDoc: fsMod.addDoc,
      serverTimestamp: fsMod.serverTimestamp,
    };
  } catch (e) {
    console.warn("firebase-config.js: no se pudo cargar el SDK de Firebase (revisá la conexión) — la plataforma sigue funcionando en modo invitado.", e);
  }
}
