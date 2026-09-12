/**
 * FIREBASE-CONFIG.JS
 * =====================
 * Pegá acá la configuración de TU proyecto de Firebase (la copiás
 * de la consola en el paso 2 de la guía del README). Este archivo
 * se carga después de los <script> de Firebase y antes de auth.js
 * y storage.js — ver el <head> de juegos.html, juego.html,
 * ejercicios.html y ejercicio.html.
 *
 * Vuelve al SDK "compat" clásico (script normal, sin <script
 * type="module">). Se probó migrar a Firebase modular v9+ con
 * import() dinámico, pero al ser dos <script type="module">
 * independientes (este archivo y auth.js) sin relación de import()
 * entre ellos, el navegador no garantiza que auth.js espere a que
 * termine el import() async de este archivo — eso producía una
 * carrera intermitente donde Firebase quedaba a mitad de inicializar
 * y Auth caía en modo invitado aunque la config fuera correcta. El
 * SDK compat es 100% síncrono (firebase.initializeApp corre en el
 * momento exacto en que se ejecuta este <script>), así que no tiene
 * ese problema.
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

// Sólo inicializamos si ya se completaron los datos reales, para no
// tirar un error en consola apenas se abre la página sin configurar.
if (firebaseConfig.apiKey !== "TU_API_KEY") {
  firebase.initializeApp(firebaseConfig);
} else {
  console.warn("firebase-config.js: todavía tiene los datos de ejemplo. Completalo con tu proyecto real para activar el login.");
}
