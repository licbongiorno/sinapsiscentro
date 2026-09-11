/**
 * INFANTIL-STORAGE.JS — Progreso local de la Zona Infantil
 * =============================================================
 * A propósito, esto NO usa Firebase ni el Storage de adultos.
 * Los chicos no inician sesión, no hay UID, no se guarda nombre real
 * ni ninguna reflexión escrita. Todo vive en el localStorage de este
 * dispositivo, en un namespace separado del resto del sitio.
 *
 * Si en el futuro se quiere progreso "familiar" entre dispositivos,
 * la persona ADULTA (con su cuenta de Google ya existente en el
 * sitio) podría optar por sincronizar sólo un resumen agregado
 * (cantidad de actividades, categorías exploradas) — nunca cuál
 * actividad puntual ni contenido escrito por el chico. Eso queda
 * para más adelante; hoy es 100% local.
 */

const NS_INFANTIL = "sinapsis_infantil";

function leerInfantil(clave, porDefecto) {
  try {
    const raw = localStorage.getItem(`${NS_INFANTIL}:${clave}`);
    return raw ? JSON.parse(raw) : porDefecto;
  } catch (e) { return porDefecto; }
}
function escribirInfantil(clave, valor) {
  try { localStorage.setItem(`${NS_INFANTIL}:${clave}`, JSON.stringify(valor)); } catch (e) {}
}

const PERFIL_INFANTIL_DEFAULT = () => ({ avatar: "🦊", edadBanda: null, estrellas: 0 });

const LOGROS_INFANTIL = [
  { id: "primer-paso", nombre: "Primer paso", icono: "🌟", cumple: (ctx) => ctx.totalActividades >= 1 },
  { id: "explorador", nombre: "Explorador", icono: "🧭", cumple: (ctx) => ctx.totalActividades >= 10 },
  { id: "aventurero", nombre: "Aventurero", icono: "🏅", cumple: (ctx) => ctx.totalActividades >= 25 },
  { id: "curioso", nombre: "Curioso de todo", icono: "🪄", cumple: (ctx) => ctx.categoriasExploradas >= 4 },
  { id: "racha-3", nombre: "3 días jugando", icono: "🔥", cumple: (ctx) => ctx.racha.dias >= 3 },
  { id: "racha-7", nombre: "Una semana entera", icono: "🔥", cumple: (ctx) => ctx.racha.dias >= 7 },
  { id: "emociones-5", nombre: "Explorador de emociones", icono: "❤️", cumple: (ctx) => (ctx.porCategoria.emociones || 0) >= 5 },
  { id: "calma-1", nombre: "Encontré mi calma", icono: "🧘", cumple: (ctx) => (ctx.porCategoria.calma || 0) >= 1 },
];

const InfantilStorage = {
  getPerfil() {
    let p = leerInfantil("perfil", null);
    if (!p) { p = PERFIL_INFANTIL_DEFAULT(); escribirInfantil("perfil", p); }
    return p;
  },
  guardarPerfil(p) { escribirInfantil("perfil", p); return p; },
  elegirAvatar(avatar) { const p = InfantilStorage.getPerfil(); p.avatar = avatar; return InfantilStorage.guardarPerfil(p); },
  elegirEdadBanda(banda) { const p = InfantilStorage.getPerfil(); p.edadBanda = banda; return InfantilStorage.guardarPerfil(p); },
  sumarEstrellas(n) { const p = InfantilStorage.getPerfil(); p.estrellas = (p.estrellas || 0) + n; return InfantilStorage.guardarPerfil(p); },

  getProgreso() { return leerInfantil("progreso", {}); },
  getProgresoActividad(id) { return InfantilStorage.getProgreso()[id] || { veces: 0, ultimaVez: null }; },
  registrarActividadCompletada(id) {
    const todo = InfantilStorage.getProgreso();
    const actual = todo[id] || { veces: 0, ultimaVez: null };
    actual.veces += 1; actual.ultimaVez = new Date().toISOString();
    todo[id] = actual;
    escribirInfantil("progreso", todo);
    InfantilStorage.registrarActividadHoy();
    return actual;
  },
  getTotalActividades() { return Object.values(InfantilStorage.getProgreso()).reduce((a, p) => a + p.veces, 0); },
  getCategoriasExploradas() {
    const todo = InfantilStorage.getProgreso();
    const set = new Set();
    Object.keys(todo).forEach(id => {
      const act = typeof CatalogoInfantil !== "undefined" ? CatalogoInfantil.porId(id) : null;
      if (act) set.add(act.categoria);
    });
    return set;
  },
  getConteoPorCategoria() {
    const todo = InfantilStorage.getProgreso();
    const conteo = {};
    Object.keys(todo).forEach(id => {
      const act = typeof CatalogoInfantil !== "undefined" ? CatalogoInfantil.porId(id) : null;
      if (act) conteo[act.categoria] = (conteo[act.categoria] || 0) + todo[id].veces;
    });
    return conteo;
  },

  getRacha() { return leerInfantil("racha", { dias: 0, ultimoDia: null }); },
  registrarActividadHoy() {
    const hoy = new Date().toISOString().slice(0, 10);
    const r = InfantilStorage.getRacha();
    if (r.ultimoDia === hoy) return r;
    const ayer = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    r.dias = r.ultimoDia === ayer ? r.dias + 1 : 1;
    r.ultimoDia = hoy;
    escribirInfantil("racha", r);
    return r;
  },

  getLogros() { return leerInfantil("logros", []); },
  evaluarLogros() {
    const ctx = {
      totalActividades: InfantilStorage.getTotalActividades(),
      categoriasExploradas: InfantilStorage.getCategoriasExploradas().size,
      racha: InfantilStorage.getRacha(),
      porCategoria: InfantilStorage.getConteoPorCategoria(),
    };
    const yaTenia = new Set(InfantilStorage.getLogros());
    const nuevos = [];
    LOGROS_INFANTIL.forEach(l => {
      if (yaTenia.has(l.id)) return;
      if (l.cumple(ctx)) { nuevos.push(l); }
    });
    if (nuevos.length) escribirInfantil("logros", [...InfantilStorage.getLogros(), ...nuevos.map(n => n.id)]);
    return nuevos;
  },
  catalogoLogros: () => LOGROS_INFANTIL,

  // Ajuste de "guardado familiar": desactivado por defecto. Si en el
  // futuro se activa, acá es donde se llamaría a un resumen agregado
  // hacia Firestore, usando la cuenta del adulto — nunca antes de que
  // la persona adulta lo habilite explícitamente.
  guardadoFamiliarActivo() { return leerInfantil("guardadoFamiliar", false); },
};
