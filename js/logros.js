/**
 * LOGROS.JS — Catálogo de logros y lógica de desbloqueo
 * ========================================================
 * Cada logro tiene una función `cumple(ctx)` que recibe el estado
 * actual (progreso, racha, categorías jugadas, etc.) y devuelve
 * true/false. Se evalúan todos después de cada partida.
 */

const LOGROS_CATALOGO = [
  { id: "primera-partida", nombre: "Primer paso", descripcion: "Jugaste tu primera partida.", icono: "🌱",
    cumple: (ctx) => ctx.totalPartidas >= 1 },
  { id: "diez-partidas", nombre: "Entrenamiento constante", descripcion: "Jugaste 10 partidas.", icono: "💪",
    cumple: (ctx) => ctx.totalPartidas >= 10 },
  { id: "cincuenta-partidas", nombre: "Veterano", descripcion: "Jugaste 50 partidas.", icono: "🏅",
    cumple: (ctx) => ctx.totalPartidas >= 50 },
  { id: "racha-3", nombre: "Tres días seguidos", descripcion: "Jugaste 3 días consecutivos.", icono: "🔥",
    cumple: (ctx) => ctx.racha.dias >= 3 },
  { id: "racha-7", nombre: "Una semana entera", descripcion: "Jugaste 7 días consecutivos.", icono: "🔥",
    cumple: (ctx) => ctx.racha.dias >= 7 },
  { id: "racha-30", nombre: "Hábito construido", descripcion: "Jugaste 30 días consecutivos.", icono: "🔥",
    cumple: (ctx) => ctx.racha.dias >= 30 },
  { id: "explorador", nombre: "Explorador", descripcion: "Probaste juegos de 3 categorías distintas.", icono: "🧭",
    cumple: (ctx) => ctx.categoriasJugadas.size >= 3 },
  { id: "curioso-total", nombre: "Curioso total", descripcion: "Probaste al menos un juego de cada categoría disponible.", icono: "🗺️",
    cumple: (ctx) => {
      const catsDisponibles = new Set(CatalogoJuegos.disponibles().map(j => j.categoria));
      for (const cat of catsDisponibles) if (!ctx.categoriasJugadas.has(cat)) return false;
      return true;
    } },
  { id: "record-personal", nombre: "Superaste tu récord", descripcion: "Mejoraste tu mejor puntaje en un juego.", icono: "📈",
    cumple: (ctx) => ctx.mejoroRecordEnEstaPartida === true },
  { id: "nivel-5", nombre: "Nivel 5", descripcion: "Llegaste al nivel 5.", icono: "⭐",
    cumple: (ctx) => ctx.perfil.nivel >= 5 },
  { id: "nivel-10", nombre: "Nivel 10", descripcion: "Llegaste al nivel 10.", icono: "🌟",
    cumple: (ctx) => ctx.perfil.nivel >= 10 },
  { id: "letras-compartidas-fan", nombre: "Cuentacuentos", descripcion: "Jugaste Letras compartidas.", icono: "🪶",
    cumple: (ctx) => (Storage.getProgreso("letras-compartidas").partidas || 0) >= 1 },
  { id: "un-minuto-calma", nombre: "Un momento de calma", descripcion: "Jugaste un juego de la categoría Calma.", icono: "🧘",
    cumple: (ctx) => ctx.categoriasJugadas.has("calma") },
];

const Logros = {
  catalogo: () => LOGROS_CATALOGO,
  desbloqueados: () => Storage.getLogros(),
  porId: (id) => LOGROS_CATALOGO.find(l => l.id === id),

  /**
   * Evalúa todos los logros tras una partida y devuelve los que se
   * acaban de desbloquear (para mostrar un aviso en pantalla).
   */
  evaluarTrasPartida({ mejoroRecordEnEstaPartida = false } = {}) {
    const ctx = {
      totalPartidas: Storage.getTotalPartidas(),
      racha: Storage.getRacha(),
      categoriasJugadas: Storage.getCategoriasJugadas(),
      perfil: Storage.getPerfil(),
      mejoroRecordEnEstaPartida,
    };
    const yaTenia = new Set(Storage.getLogros());
    const nuevos = [];
    for (const logro of LOGROS_CATALOGO) {
      if (yaTenia.has(logro.id)) continue;
      if (logro.cumple(ctx)) {
        Storage.desbloquearLogro(logro.id);
        nuevos.push(logro);
      }
    }
    return nuevos;
  },
};
