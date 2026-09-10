/**
 * PERFIL.JS — Perfil de usuario, niveles y XP
 * =============================================
 */

const AVATARES = ["🙂", "🐱", "🦊", "🐼", "🦁", "🐧", "🦉", "🐢", "🐬", "🦋"];

// Curva de XP: cada nivel pide un poco más que el anterior.
const XP_POR_NIVEL = (nivel) => 50 * nivel;

const Perfil = {
  nivelPorXP(xp) {
    let nivel = 1;
    let restante = xp;
    while (restante >= XP_POR_NIVEL(nivel)) {
      restante -= XP_POR_NIVEL(nivel);
      nivel += 1;
    }
    return nivel;
  },
  progresoNivelActual(xp) {
    let nivel = 1;
    let restante = xp;
    while (restante >= XP_POR_NIVEL(nivel)) {
      restante -= XP_POR_NIVEL(nivel);
      nivel += 1;
    }
    return { nivel, xpEnNivel: restante, xpParaSiguiente: XP_POR_NIVEL(nivel) };
  },
  actualizarNombre(nombre) {
    const perfil = Storage.getPerfil();
    perfil.nombre = nombre.trim().slice(0, 24);
    return Storage.guardarPerfil(perfil);
  },
  actualizarAvatar(avatar) {
    const perfil = Storage.getPerfil();
    perfil.avatar = avatar;
    return Storage.guardarPerfil(perfil);
  },
};
