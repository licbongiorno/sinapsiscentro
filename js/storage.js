/**
 * STORAGE.JS — Adaptador de persistencia
 * ========================================
 * Hoy guarda todo en localStorage, así la plataforma funciona
 * completa desde el primer momento, sin depender de configurar
 * Firebase para poder probarla.
 *
 * La estructura de datos está calcada de la que se usaría en
 * Firestore (users/{uid}/profile, progress, achievements, scores),
 * así que el día de mañana alcanza con reemplazar las funciones de
 * este archivo por lecturas/escrituras a Firestore sin tocar
 * game-engine.js ni ningún juego individual — todos hablan sólo
 * con el objeto "Storage" de acá.
 *
 * Para activar Firebase real:
 *  1. Completá firebase-config.js con las credenciales del proyecto.
 *  2. Descomentá el bloque FIREBASE al final de este archivo.
 *  3. Cambiá USAR_FIREBASE = true.
 */

const USAR_FIREBASE = false; // ← cambiar a true cuando esté configurado firebase-config.js

const NS = "sinapsis_juegos"; // prefijo de todas las claves en localStorage

function leer(clave, porDefecto) {
  try {
    const raw = localStorage.getItem(`${NS}:${clave}`);
    return raw ? JSON.parse(raw) : porDefecto;
  } catch (e) {
    console.warn("Storage: error leyendo", clave, e);
    return porDefecto;
  }
}

function escribir(clave, valor) {
  try {
    localStorage.setItem(`${NS}:${clave}`, JSON.stringify(valor));
    return true;
  } catch (e) {
    console.warn("Storage: error guardando", clave, e);
    return false;
  }
}

const PERFIL_DEFAULT = () => ({
  uid: "local-" + Math.random().toString(36).slice(2, 10),
  nombre: "",
  avatar: "🙂",
  xp: 0,
  nivel: 1,
  creadoEl: new Date().toISOString(),
});

const Storage = {
  // ── PERFIL ──
  getPerfil() {
    let perfil = leer("perfil", null);
    if (!perfil) {
      perfil = PERFIL_DEFAULT();
      escribir("perfil", perfil);
    }
    return perfil;
  },
  guardarPerfil(perfil) {
    escribir("perfil", perfil);
    return perfil;
  },
  sumarXP(cantidad) {
    const perfil = Storage.getPerfil();
    perfil.xp = (perfil.xp || 0) + cantidad;
    perfil.nivel = Perfil.nivelPorXP(perfil.xp);
    Storage.guardarPerfil(perfil);
    return perfil;
  },

  // ── PROGRESO POR JUEGO ──
  getProgreso(juegoId) {
    const todos = leer("progreso", {});
    return todos[juegoId] || { partidas: 0, mejorPuntaje: 0, ultimaVez: null };
  },
  guardarProgreso(juegoId, resultado) {
    const todos = leer("progreso", {});
    const actual = todos[juegoId] || { partidas: 0, mejorPuntaje: 0, ultimaVez: null };
    actual.partidas += 1;
    actual.mejorPuntaje = Math.max(actual.mejorPuntaje, resultado.puntaje || 0);
    actual.ultimaVez = new Date().toISOString();
    todos[juegoId] = actual;
    escribir("progreso", todos);
    return actual;
  },
  getProgresoCompleto() {
    return leer("progreso", {});
  },
  getCategoriasJugadas() {
    const progreso = leer("progreso", {});
    const jugadas = new Set();
    Object.keys(progreso).forEach(juegoId => {
      const juego = CatalogoJuegos.porId(juegoId);
      if (juego && progreso[juegoId].partidas > 0) jugadas.add(juego.categoria);
    });
    return jugadas;
  },
  getTotalPartidas() {
    const progreso = leer("progreso", {});
    return Object.values(progreso).reduce((acc, p) => acc + (p.partidas || 0), 0);
  },

  // ── LOGROS ──
  getLogros() {
    return leer("logros", []); // array de ids de logros desbloqueados
  },
  desbloquearLogro(id) {
    const logros = leer("logros", []);
    if (logros.includes(id)) return false; // ya lo tenía
    logros.push(id);
    escribir("logros", logros);
    return true; // recién desbloqueado
  },

  // ── RACHA (días consecutivos jugando) ──
  getRacha() {
    return leer("racha", { dias: 0, ultimoDia: null, historial: [] });
  },
  registrarActividadHoy() {
    const hoy = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const racha = Storage.getRacha();
    if (racha.ultimoDia === hoy) return racha; // ya contado hoy

    const ayer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    racha.dias = racha.ultimoDia === ayer ? racha.dias + 1 : 1;
    racha.ultimoDia = hoy;
    racha.historial = [...(racha.historial || []).slice(-6), hoy];
    escribir("racha", racha);
    return racha;
  },

  // ── RANKING LOCAL (por dispositivo; ranking global real requiere Firebase) ──
  getRankingLocal(juegoId) {
    const todos = leer("ranking", {});
    return (todos[juegoId] || []).sort((a, b) => b.puntaje - a.puntaje).slice(0, 10);
  },
  registrarPuntaje(juegoId, puntaje, nombre) {
    const todos = leer("ranking", {});
    const lista = todos[juegoId] || [];
    lista.push({ nombre: nombre || "Vos", puntaje, fecha: new Date().toISOString() });
    todos[juegoId] = lista.sort((a, b) => b.puntaje - a.puntaje).slice(0, 20);
    escribir("ranking", todos);
    return todos[juegoId];
  },
};

/* ═══════════════════════════════════════════════════════════
   BLOQUE FIREBASE (comentado) — activar cuando haya credenciales
   ═══════════════════════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, arrayUnion, collection, query, orderBy, limit, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-firestore.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.x.x/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Reemplazar cada método de Storage de arriba por su equivalente en:
//   users/{uid}/profile         (doc)
//   users/{uid}/progress/{juegoId}  (doc dentro de subcolección)
//   users/{uid}/achievements    (doc con array de ids)
//   scores/{juegoId}/entries    (colección para ranking global)
// manteniendo exactamente la misma forma de los objetos que ya
// devuelven las funciones de arriba, para no tener que tocar nada
// del motor ni de los juegos.

═══════════════════════════════════════════════════════════ */
