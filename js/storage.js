/**
 * STORAGE.JS — Adaptador de persistencia (local + Firebase)
 * =============================================================
 * Sigue funcionando exactamente igual que antes si Firebase no está
 * configurado: todo se lee/escribe en localStorage, de forma
 * SINCRÓNICA, que es como lo usan game-engine.js, perfil.js,
 * logros.js y los 120 juegos (ninguno de esos archivos cambia).
 *
 * Cuando hay una sesión de Google iniciada (ver auth.js), además:
 *   - Al iniciar sesión: se trae el perfil desde Firestore y
 *     reemplaza la copia local (o, si es la primera vez que esa
 *     cuenta inicia sesión, sube el progreso local/invitado para no
 *     perderlo).
 *   - En cada escritura local: se programa un guardado en Firestore
 *     (con un pequeño debounce, para no escribir en la nube en cada
 *     click suelto).
 *
 * Así, el resto del código sigue leyendo/escribiendo en localStorage
 * de forma instantánea (nada se pone más lento ni más complicado
 * para ellos), y Firestore queda como una copia de respaldo /
 * sincronización entre dispositivos por debajo.
 */

const NS = "sinapsis_juegos"; // prefijo de todas las claves en localStorage
const DEBOUNCE_NUBE_MS = 1200;

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

// ── Estado de sincronización con Firebase (nada de esto se usa si no hay sesión) ──
let _uidNube = null; // uid de Firebase Auth mientras haya sesión iniciada
let _timerNube = null;

function _db() {
  if (typeof firebase === "undefined" || !firebase.apps || !firebase.apps.length) return null;
  return firebase.firestore();
}

function _snapshotLocal() {
  return {
    perfil: leer("perfil", null),
    progreso: leer("progreso", {}),
    logros: leer("logros", []),
    racha: leer("racha", { dias: 0, ultimoDia: null, historial: [] }),
    actualizadoEl: new Date().toISOString(),
  };
}

function _programarSincronizacion() {
  if (!_uidNube) return;
  clearTimeout(_timerNube);
  _timerNube = setTimeout(_empujarANube, DEBOUNCE_NUBE_MS);
}

function _empujarANube() {
  const db = _db();
  if (!db || !_uidNube) return;
  db.collection("users").doc(_uidNube).set(_snapshotLocal(), { merge: true })
    .catch((e) => console.warn("Storage: no se pudo sincronizar con Firestore", e));
}

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
    _programarSincronizacion();
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
    _programarSincronizacion();
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
    _programarSincronizacion();
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
    _programarSincronizacion();
    return racha;
  },

  // ── RANKING LOCAL (por dispositivo) + global si hay sesión ──
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

    // Además, si hay sesión, sumamos el puntaje a una colección pública
    // para un futuro ranking global (no se lee todavía desde el portal).
    const db = _db();
    if (db && _uidNube) {
      db.collection("scores").doc(juegoId).collection("entries").add({
        uid: _uidNube, nombre: nombre || "Anónimo", puntaje,
        creadoEl: firebase.firestore.FieldValue.serverTimestamp(),
      }).catch(() => {});
    }
    return todos[juegoId];
  },

  // ── Vínculo con la cuenta de Google (llamado desde auth.js) ──
  /**
   * Se llama cuando el usuario inicia sesión con Google. Trae su
   * perfil desde Firestore si ya existía, o sube el progreso actual
   * de este dispositivo si es la primera vez que esa cuenta entra.
   * Devuelve una Promise que resuelve cuando la sincronización
   * inicial terminó.
   */
  vincularUsuario(user) {
    _uidNube = user.uid;
    const db = _db();
    if (!db) return Promise.resolve();

    return db.collection("users").doc(user.uid).get().then((doc) => {
      if (doc.exists) {
        // Ya existía progreso en la nube (este usuario ya jugó antes,
        // en este dispositivo o en otro): la nube manda.
        const datos = doc.data();
        if (datos.perfil) escribir("perfil", datos.perfil);
        if (datos.progreso) escribir("progreso", datos.progreso);
        if (datos.logros) escribir("logros", datos.logros);
        if (datos.racha) escribir("racha", datos.racha);
      } else {
        // Primera vez que esta cuenta de Google inicia sesión: el
        // progreso que ya tenía este dispositivo como invitado pasa
        // a ser el punto de partida de su cuenta.
        const perfil = Storage.getPerfil();
        if (!perfil.nombre && user.displayName) perfil.nombre = user.displayName;
        perfil.uid = user.uid;
        escribir("perfil", perfil);
      }
      _empujarANube();
    }).catch((e) => {
      console.warn("Storage: no se pudo traer el perfil desde Firestore", e);
    });
  },

  /** Se llama cuando el usuario cierra sesión: empieza de nuevo como invitado en este dispositivo. */
  desvincularUsuario() {
    _uidNube = null;
    clearTimeout(_timerNube);
    Object.keys(localStorage)
      .filter(k => k.startsWith(`${NS}:`))
      .forEach(k => localStorage.removeItem(k));
  },
};
