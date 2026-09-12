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
      if (typeof CatalogoJuegos === "undefined") return false; // este logro es de juegos; en páginas de ejercicios ese catálogo no está cargado
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
  { id: "un-minuto-calma", nombre: "Un momento de calma", descripcion: "Probaste una práctica de Mindfulness.", icono: "🧘",
    // Antes era "categoría Calma" de Juegos; esa categoría se centralizó
    // en la sección Mindfulness bajo varias categorías nuevas — "presente"
    // agrupa las prácticas animadas migradas (jardín zen, piedras, etc.).
    cumple: (ctx) => ctx.categoriasJugadas.has("calma") || ctx.categoriasJugadas.has("presente") },
  // ── Ejercicios (Biblioteca de ejercicios) ──
  { id: "ejercicio-primer-paso", nombre: "Primer paso", descripcion: "Completaste tu primer ejercicio.", icono: "🌱",
    cumple: (ctx) => ctx.totalEjercicios >= 1 },
  { id: "ejercicio-diez", nombre: "Constancia", descripcion: "Completaste 10 ejercicios.", icono: "🔥",
    cumple: (ctx) => ctx.totalEjercicios >= 10 },
  { id: "ejercicio-explorador-emocional", nombre: "Explorador emocional", descripcion: "Probaste 5 ejercicios de la categoría Emociones.", icono: "❤️",
    cumple: (ctx) => ctx.ejerciciosPorCategoria.emociones >= 5 },
  { id: "ejercicio-curioso", nombre: "Curioso", descripcion: "Exploraste 5 categorías distintas de ejercicios.", icono: "🪶",
    cumple: (ctx) => ctx.categoriasEjerciciosExploradas.size >= 5 },
  { id: "ejercicio-tiempo-para-vos", nombre: "Tiempo para vos", descripcion: "Acumulaste 60 minutos de práctica.", icono: "🌿",
    cumple: (ctx) => ctx.minutosEjercicios >= 60 },
  { id: "ejercicio-pausa", nombre: "Pausa", descripcion: "Completaste 10 ejercicios de la categoría Calma.", icono: "🧘",
    cumple: (ctx) => ctx.ejerciciosPorCategoria.calma >= 10 },
  // ── Biblioteca Sonora ──
  { id: "sonido-primera-mezcla", nombre: "Primera mezcla", descripcion: "Guardaste tu primera mezcla de sonidos.", icono: "🎚️",
    cumple: (ctx) => ctx.mezclasGuardadas >= 1 },
  { id: "sonido-cinco-mezclas", nombre: "Curador de ambientes", descripcion: "Guardaste 5 mezclas distintas.", icono: "🎧",
    cumple: (ctx) => ctx.mezclasGuardadas >= 5 },
  { id: "sonido-binaural", nombre: "Exploración sonora", descripcion: "Probaste el explorador de beats binaurales.", icono: "🧠",
    cumple: (ctx) => ctx.proboBinaural === true },
  { id: "sonido-treinta-min", nombre: "Media hora de calma", descripcion: "Acumulaste 30 minutos escuchando la Biblioteca Sonora.", icono: "🌙",
    cumple: (ctx) => ctx.minutosSonido >= 30 },
  // ── Creatividad ──
  { id: "creatividad-primera", nombre: "Primera creación", descripcion: "Guardaste tu primera creación en Creatividad.", icono: "🎨",
    cumple: (ctx) => ctx.totalCreaciones >= 1 },
  { id: "creatividad-diez", nombre: "Mente creativa", descripcion: "Guardaste 10 creaciones.", icono: "✨",
    cumple: (ctx) => ctx.totalCreaciones >= 10 },
  { id: "creatividad-variada", nombre: "Todoterreno creativo", descripcion: "Guardaste creaciones de al menos 4 tipos distintos (historia, dibujo, personaje, etc.).", icono: "🌈",
    cumple: (ctx) => ctx.tiposCreacionDistintos >= 4 },
];

/**
 * Datos de ejercicios que necesitan algunos logros del catálogo
 * (ej. "Explorador emocional", "Pausa"). Se calculan siempre, sin
 * importar si lo que disparó la evaluación fue un juego o un
 * ejercicio, porque el catálogo de logros es uno solo y compartido:
 * si faltaran estos campos, cualquier `cumple(ctx)` que los use
 * tiraría un error al leer una propiedad de `undefined` (por ejemplo
 * `ctx.ejerciciosPorCategoria.emociones`) y cortaría en seco la
 * evaluación de logros — que es lo que pasaba antes al terminar
 * CUALQUIER juego, sin llegar nunca a mostrar la pantalla final.
 */
function _contextoEjercicios() {
  const historial = Storage.getHistorialEjercicios();
  const porCategoria = {};
  historial.forEach(h => {
    // Los ejercicios de Mindfulness (ex-categoría "calma") se movieron de
    // EJERCICIOS a MINDFULNESS, pero el historial ya guardado sigue
    // viviendo acá — probamos ambos catálogos para no perder esa info.
    const ej = (typeof CatalogoEjercicios !== "undefined" && CatalogoEjercicios.porId(h.id))
      || (typeof CatalogoMindfulness !== "undefined" && CatalogoMindfulness.porId(h.id));
    if (!ej) return;
    porCategoria[ej.categoria] = (porCategoria[ej.categoria] || 0) + (h.vecesCompletado || 0);
  });
  return {
    totalEjercicios: historial.reduce((acc, h) => acc + (h.vecesCompletado || 0), 0),
    ejerciciosPorCategoria: porCategoria,
    categoriasEjerciciosExploradas: Storage.getCategoriasEjerciciosExploradas(),
    minutosEjercicios: Storage.getTotalMinutosEjercicios(),
  };
}

/** Recorre el catálogo, desbloquea lo que corresponda y devuelve lo nuevo. */
function _evaluar(ctx) {
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
}

const Logros = {
  catalogo: () => LOGROS_CATALOGO,
  desbloqueados: () => Storage.getLogros(),
  porId: (id) => LOGROS_CATALOGO.find(l => l.id === id),

  /**
   * Evalúa todos los logros tras una partida y devuelve los que se
   * acaban de desbloquear (para mostrar un aviso en pantalla).
   */
  evaluarTrasPartida({ mejoroRecordEnEstaPartida = false } = {}) {
    return _evaluar({
      totalPartidas: Storage.getTotalPartidas(),
      racha: Storage.getRacha(),
      categoriasJugadas: Storage.getCategoriasJugadas(),
      perfil: Storage.getPerfil(),
      mejoroRecordEnEstaPartida,
      ..._contextoEjercicios(),
    });
  },

  /**
   * Igual que evaluarTrasPartida, pero para el contexto de ejercicios
   * (biblioteca de ejercicios). Comparte el mismo catálogo de logros.
   */
  evaluarTrasEjercicio() {
    return _evaluar({
      totalPartidas: Storage.getTotalPartidas(),
      racha: Storage.getRacha(),
      categoriasJugadas: Storage.getCategoriasJugadas(),
      perfil: Storage.getPerfil(),
      mejoroRecordEnEstaPartida: false,
      ..._contextoEjercicios(),
    });
  },

  /**
   * Igual que las anteriores, pero para el contexto de la Biblioteca
   * Sonora. `proboBinaural` se pasa explícitamente porque el motor de
   * audio no persiste "probó el explorador" en ningún lado — lo sabe
   * sólo la página en el momento en que lo usa.
   */
  evaluarTrasSonido({ proboBinaural = false } = {}) {
    return _evaluar({
      totalPartidas: Storage.getTotalPartidas(),
      racha: Storage.getRacha(),
      categoriasJugadas: Storage.getCategoriasJugadas(),
      perfil: Storage.getPerfil(),
      mejoroRecordEnEstaPartida: false,
      mezclasGuardadas: Storage.getMezclasGuardadas().length,
      proboBinaural,
      minutosSonido: Storage.getProgresoSonido().minutosTotales,
      ..._contextoEjercicios(),
    });
  },

  /** Igual que las anteriores, pero para el contexto de Creatividad. */
  evaluarTrasCreacion() {
    const creaciones = Storage.getCreaciones();
    return _evaluar({
      totalPartidas: Storage.getTotalPartidas(),
      racha: Storage.getRacha(),
      categoriasJugadas: Storage.getCategoriasJugadas(),
      perfil: Storage.getPerfil(),
      mejoroRecordEnEstaPartida: false,
      totalCreaciones: creaciones.length,
      tiposCreacionDistintos: new Set(creaciones.map(c => c.tipo)).size,
      ..._contextoEjercicios(),
    });
  },
};
