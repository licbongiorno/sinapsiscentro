/**
 * CATÁLOGO DE LA BIBLIOTECA SONORA — SINAPSIS
 * ================================================
 * Cada pista tiene un `tipo`:
 *   - "procedural": el audio-engine.js la genera en tiempo real
 *     (ruido, campanas, binaural). Funciona hoy, sin archivos.
 *   - "archivo": necesita un mp3 real que todavía no existe.
 *     Aparece en la interfaz marcada como "Próximamente" — el día
 *     que se suba el archivo, alcanza con completar `audioUrl` acá
 *     y anda sola, sin tocar el motor ni el HTML.
 */

const CATEGORIAS_SONIDOS = [
  { id: "ambientes", nombre: "Ambientes", icono: "🌧️" },
  { id: "ruido", nombre: "Ruido", icono: "🔊" },
  { id: "sonidos", nombre: "Sonidos", icono: "🔔" },
  { id: "musica", nombre: "Música", icono: "🎵" },
];

const PISTAS = [
  // ── 🌧️ AMBIENTES (varios ya sintetizados en tiempo real; el resto necesita archivo real) ──
  { id: "amb-lluvia", titulo: "Lluvia", categoria: "ambientes", icono: "🌧️", tipo: "procedural", generador: "lluvia",
    descripcion: "Aproximación sintetizada con ruido filtrado — no es una grabación real de lluvia, pero puede servir como fondo." },
  { id: "amb-tormenta", titulo: "Tormenta suave", categoria: "ambientes", icono: "⛈️", tipo: "procedural", generador: "tormenta",
    descripcion: "Aproximación sintetizada: la misma lluvia, con algún trueno grave y espaciado — no es una grabación real." },
  { id: "amb-bosque", titulo: "Bosque", categoria: "ambientes", icono: "🌲", tipo: "archivo", audioUrl: null },
  { id: "amb-rio", titulo: "Río", categoria: "ambientes", icono: "🏞️", tipo: "procedural", generador: "arroyo",
    descripcion: "Aproximación sintetizada de agua en movimiento y burbujeo — no es una grabación real." },
  { id: "amb-mar", titulo: "Mar", categoria: "ambientes", icono: "🌊", tipo: "procedural", generador: "olas",
    descripcion: "Aproximación sintetizada: ruido filtrado con un vaivén lento, como el de las olas — no es una grabación real." },
  { id: "amb-viento", titulo: "Viento", categoria: "ambientes", icono: "🍃", tipo: "procedural", generador: "viento",
    descripcion: "Aproximación sintetizada con ruido grave modulado en ráfagas lentas — no es una grabación real." },
  { id: "amb-fuego", titulo: "Fuego", categoria: "ambientes", icono: "🔥", tipo: "procedural", generador: "fuego",
    descripcion: "Aproximación sintetizada: una cama grave constante con chispazos agudos al azar — no es una grabación real." },
  { id: "amb-noche", titulo: "Noche", categoria: "ambientes", icono: "🌙", tipo: "archivo", audioUrl: null },
  { id: "amb-pajaros", titulo: "Pájaros", categoria: "ambientes", icono: "🐦", tipo: "archivo", audioUrl: null },
  { id: "amb-cafeteria", titulo: "Cafetería", categoria: "ambientes", icono: "☕", tipo: "archivo", audioUrl: null },

  // ── 🔊 RUIDO (procedural — funciona hoy) ──
  { id: "ruido-blanco", titulo: "Ruido blanco", categoria: "ruido", icono: "⬜", tipo: "procedural", generador: "blanco",
    descripcion: "Todas las frecuencias por igual. Puede ayudar a tapar sonidos molestos del entorno." },
  { id: "ruido-rosa", titulo: "Ruido rosa", categoria: "ruido", icono: "🌸", tipo: "procedural", generador: "rosa",
    descripcion: "Más suave que el blanco, con menos agudos. Muchas personas lo encuentran más cómodo para relajarse." },
  { id: "ruido-marron", titulo: "Ruido marrón", categoria: "ruido", icono: "🟫", tipo: "procedural", generador: "marron",
    descripcion: "Más grave y envolvente todavía. Se suele preferir para dormir." },
  { id: "ruido-gris", titulo: "Ruido gris", categoria: "ruido", icono: "⬛", tipo: "procedural", generador: "gris",
    descripcion: "Realza los graves y los agudos, y atenúa los medios — una curva pensada para sonar parejo al oído." },
  { id: "ruido-verde", titulo: "Ruido verde", categoria: "ruido", icono: "🟢", tipo: "procedural", generador: "verde",
    descripcion: "Concentrado en el rango medio, similar al que suele asociarse a sonidos de la naturaleza." },

  // ── 🔔 SONIDOS (campana/gong/cuenco/platillos/tibetano procedurales; naturaleza necesita archivo) ──
  { id: "son-campana", titulo: "Campana", categoria: "sonidos", icono: "🔔", tipo: "procedural", generador: "campana", campana: "campana",
    descripcion: "Un sonido breve, útil para marcar el inicio o el cierre de una práctica." },
  { id: "son-cuenco", titulo: "Cuenco", categoria: "sonidos", icono: "🥣", tipo: "procedural", generador: "campana", campana: "cuenco",
    descripcion: "Un tono sostenido y cálido." },
  { id: "son-gong", titulo: "Gong", categoria: "sonidos", icono: "🥁", tipo: "procedural", generador: "campana", campana: "gong",
    descripcion: "Grave y prolongado." },
  { id: "son-tibetano", titulo: "Cuenco tibetano", categoria: "sonidos", icono: "🎐", tipo: "procedural", generador: "campana", campana: "tibetano",
    descripcion: "Más grave y prolongado que el cuenco, con una resonancia más profunda." },
  { id: "son-platillos", titulo: "Platillos", categoria: "sonidos", icono: "✨", tipo: "procedural", generador: "campana", campana: "platillos",
    descripcion: "Un brillo agudo y breve, como el de un tingsha — útil para marcar transiciones cortas." },
  { id: "son-naturaleza", titulo: "Naturaleza", categoria: "sonidos", icono: "🌿", tipo: "archivo", audioUrl: null },
  { id: "son-agua", titulo: "Agua", categoria: "sonidos", icono: "💧", tipo: "procedural", generador: "arroyo",
    descripcion: "Aproximación sintetizada de agua en movimiento — no es una grabación real." },

  // ── 🎵 MÚSICA (generativa: notas sintetizadas en una escala, nunca suena igual dos veces) ──
  { id: "mus-relajante", titulo: "Relajante", categoria: "musica", icono: "🎵", tipo: "procedural", generador: "pad-relajante",
    descripcion: "Notas sueltas en escala pentatónica mayor, con espacio entre ellas. Música generativa, no una grabación fija." },
  { id: "mus-meditacion", titulo: "Meditación", categoria: "musica", icono: "🧘", tipo: "procedural", generador: "pad-meditacion",
    descripcion: "Registro grave, notas espaciadas y un tono cálido. Música generativa, no una grabación fija." },
  { id: "mus-concentracion", titulo: "Concentración", categoria: "musica", icono: "🎯", tipo: "procedural", generador: "pad-concentracion",
    descripcion: "Un fondo simple y discreto, pensado para no distraer. Música generativa, no una grabación fija." },
  { id: "mus-sueno", titulo: "Sueño", categoria: "musica", icono: "🌙", tipo: "procedural", generador: "pad-sueno",
    descripcion: "Registro muy grave y notas lentas y espaciadas. Música generativa, no una grabación fija." },
  { id: "mus-piano", titulo: "Piano", categoria: "musica", icono: "🎹", tipo: "procedural", generador: "pad-piano",
    descripcion: "Notas breves, como pequeños toques de piano, en escala mayor. Música generativa, no una grabación fija." },
  { id: "mus-ambient", titulo: "Ambient", categoria: "musica", icono: "✨", tipo: "procedural", generador: "pad-ambient",
    descripcion: "Una textura más amplia y brillante, con varias voces superpuestas. Música generativa, no una grabación fija." },
];

// ── "¿Qué necesitás?" — combinan pistas que YA funcionan (procedurales) ──
const NECESIDADES_SONIDOS = [
  { id: "relajarme", emoji: "😌", texto: "Relajarme", mezcla: [{ pista: "ruido-rosa", volumen: 0.3 }, { pista: "mus-relajante", volumen: 0.2 }] },
  { id: "meditar", emoji: "🧘", texto: "Meditar", mezcla: [{ pista: "ruido-rosa", volumen: 0.15 }, { pista: "mus-meditacion", volumen: 0.2 }], campanaInicial: "cuenco" },
  { id: "dormir", emoji: "🌙", texto: "Prepararme para dormir", mezcla: [{ pista: "ruido-marron", volumen: 0.4 }, { pista: "mus-sueno", volumen: 0.2 }] },
  { id: "concentrarme", emoji: "🎯", texto: "Concentrarme", mezcla: [{ pista: "ruido-blanco", volumen: 0.25 }, { pista: "mus-concentracion", volumen: 0.15 }] },
  { id: "estudiar", emoji: "📖", texto: "Estudiar", mezcla: [{ pista: "ruido-rosa", volumen: 0.25 }] },
  { id: "ambiente", emoji: "🌿", texto: "Crear un ambiente", mezcla: [{ pista: "ruido-marron", volumen: 0.3 }, { pista: "ruido-rosa", volumen: 0.2 }] },
  { id: "naturaleza", emoji: "🏞️", texto: "Conectar con la naturaleza", mezcla: [{ pista: "amb-rio", volumen: 0.4 }, { pista: "amb-viento", volumen: 0.15 }] },
  { id: "compania", emoji: "🔥", texto: "Sentir calidez y compañía", mezcla: [{ pista: "amb-fuego", volumen: 0.5 }] },
  { id: "explorar", emoji: "🧠", texto: "Explorar sonidos", mezcla: [], irABinaural: true },
];

// ── Ondas cerebrales — encuadre educativo, sin afirmaciones categóricas ──
const BANDAS_CEREBRALES = [
  { id: "delta", nombre: "Delta", rango: "≈ 0,5–4 Hz", color: "#0c5c6c", beatSugerido: 2,
    descripcion: "Relacionadas principalmente con el sueño profundo y procesos de recuperación durante el sueño." },
  { id: "theta", nombre: "Theta", rango: "≈ 4–8 Hz", color: "#6b4090", beatSugerido: 6,
    descripcion: "Aparecen especialmente durante determinadas fases del sueño y también pueden observarse durante relajación profunda y estados de somnolencia." },
  { id: "alpha", nombre: "Alpha", rango: "≈ 8–12 Hz", color: "#267339", beatSugerido: 10,
    descripcion: "Se asocian frecuentemente con vigilia relajada, especialmente cuando una persona está tranquila y con los ojos cerrados." },
  { id: "beta", nombre: "Beta", rango: "≈ 13–30 Hz", color: "#7a5c0d", beatSugerido: 20,
    descripcion: "Predominan en muchas situaciones de vigilia y actividad mental." },
  { id: "gamma", nombre: "Gamma", rango: "≈ 30 Hz en adelante", color: "#91315a", beatSugerido: 40,
    descripcion: "Se relacionan con distintos procesos de integración y procesamiento cognitivo, aunque su interpretación es mucho más compleja que decir simplemente \"gamma = concentración\"." },
];

const EXPLORADOR_FRECUENCIAS = [
  { necesidad: "Sueño", emoji: "🌙", bandas: ["delta", "theta"] },
  { necesidad: "Relajación", emoji: "🧘", bandas: ["alpha", "theta"] },
  { necesidad: "Atención", emoji: "🎯", bandas: ["beta"] },
  { necesidad: "Exploración cognitiva", emoji: "🧠", bandas: ["gamma"] },
];

const TEMPORIZADORES_SONIDO = [5, 15, 30, 45, 60];

const CatalogoSonidos = {
  categorias: () => CATEGORIAS_SONIDOS,
  categoriaPorId: (id) => CATEGORIAS_SONIDOS.find(c => c.id === id),
  todasLasPistas: () => PISTAS,
  pistaPorId: (id) => PISTAS.find(p => p.id === id),
  porCategoria: (catId) => PISTAS.filter(p => p.categoria === catId),
  disponibles: () => PISTAS.filter(p => p.tipo === "procedural" || !!p.audioUrl),
  necesidades: () => NECESIDADES_SONIDOS,
  necesidadPorId: (id) => NECESIDADES_SONIDOS.find(n => n.id === id),
  bandasCerebrales: () => BANDAS_CEREBRALES,
  bandaPorId: (id) => BANDAS_CEREBRALES.find(b => b.id === id),
  explorador: () => EXPLORADOR_FRECUENCIAS,
  temporizadores: () => TEMPORIZADORES_SONIDO,
};

if (typeof module !== "undefined") module.exports = { CATEGORIAS_SONIDOS, PISTAS, NECESIDADES_SONIDOS, BANDAS_CEREBRALES, EXPLORADOR_FRECUENCIAS, CatalogoSonidos };
