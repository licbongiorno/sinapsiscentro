/**
 * FIREBASE-CONFIG.JS
 * =====================
 * Completá esto con las credenciales de tu proyecto de Firebase
 * (Configuración del proyecto → Tus apps → Config) y después:
 *
 *   1. Poné USAR_FIREBASE = true en js/storage.js
 *   2. Descomentá el bloque FIREBASE al final de js/storage.js
 *   3. Habilitá Firestore y Authentication (modo anónimo alcanza
 *      para arrancar) en la consola de Firebase.
 *
 * Hasta entonces, la plataforma funciona igual pero guarda todo en
 * el localStorage del dispositivo (ver js/storage.js).
 */

export const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID",
};
