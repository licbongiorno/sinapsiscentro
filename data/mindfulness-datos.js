/**
 * MINDFULNESS-DATOS.JS — Catálogo de la sección Mindfulness
 * ================================================================
 * Igual que juegos-catalogo.js y ejercicios.js: acá vive sólo el
 * contenido, no la lógica. Para sumar una práctica nueva alcanza con
 * agregar un objeto a MINDFULNESS — no hace falta tocar
 * mindfulness.html ni mindfulness-item.html.
 *
 * Esta sección centraliza lo que antes estaba repartido como
 * categoría "calma" en Juegos y Ejercicios (documentado en cada
 * commit de la migración) — se movió acá para tener un solo lugar
 * de referencia para respiración, atención plena y autocompasión.
 *
 * Cada práctica tiene un campo `motor` que indica cómo se reproduce:
 *  - "ejercicio": una secuencia de `pasos` interpretada por
 *    ExerciseEngine (exercise-engine.js) — igual que en Ejercicios.
 *  - "juego": un archivo individual en js/juegos/ que usa GameEngine
 *    (las prácticas animadas heredadas de Juegos: jardín zen, piedras,
 *    etc.). El campo `archivo` apunta al mismo JS de siempre — no se
 *    duplicó ni reescribió ningún juego, sólo se movió su entrada de
 *    catálogo.
 *
 * Todas las demás propiedades (id, titulo, descripcion, categoria,
 * duracion en minutos, dificultad) son comunes a los dos tipos, para
 * que el portal (mindfulness.html) las pueda listar sin distinguir
 * motor — sólo mindfulness-item.html necesita saber cuál usar para
 * reproducir la práctica.
 */

const CATEGORIAS_MINDFULNESS = [
  { id: "respiracion", nombre: "Respiración", icono: "🌬️", color: "#2aaec2" },
  { id: "presente", nombre: "Atención al presente", icono: "🌱", color: "#8ac9a9" },
  { id: "cuerpo", nombre: "Cuerpo y sensaciones", icono: "🧍", color: "#c9a97e" },
  { id: "pensamientos", nombre: "Observar pensamientos", icono: "💭", color: "#3a5a6a" },
  { id: "autocompasion", nombre: "Autocompasión", icono: "💗", color: "#e08a8a" },
  { id: "cotidiano", nombre: "Mindfulness cotidiano", icono: "☕", color: "#c98ac2" },
  { id: "emociones-dificiles", nombre: "Emociones difíciles", icono: "🌊", color: "#0e4d5c" },
];

const NECESIDADES_MINDFULNESS = [
  { id: "ansioso", emoji: "😰", texto: "Estoy ansioso", categorias: ["respiracion", "presente"] },
  { id: "cansado", emoji: "😴", texto: "Estoy muy cansado", categorias: ["presente", "cuerpo"] },
  { id: "cabeza-llena", emoji: "💭", texto: "Tengo la cabeza llena", categorias: ["pensamientos"] },
  { id: "autoexigente", emoji: "😣", texto: "Estoy siendo muy duro conmigo", categorias: ["autocompasion"] },
  { id: "emocion-fuerte", emoji: "🌊", texto: "Siento una emoción fuerte", categorias: ["emociones-dificiles"] },
  { id: "distraido", emoji: "🌀", texto: "Estoy disperso", categorias: ["presente"] },
  { id: "empezar", emoji: "🌱", texto: "Quiero empezar a practicar", categorias: ["respiracion"] },
  { id: "vida-diaria", emoji: "☕", texto: "Quiero llevarlo a mi día a día", categorias: ["cotidiano"] },
  { id: "conectar-cuerpo", emoji: "🧍", texto: "Quiero conectar con mi cuerpo", categorias: ["cuerpo"] },
];

const MINDFULNESS = [
  // ═══════ 🌬️ RESPIRACIÓN ═══════
  { id: "respiracion-guiada", titulo: "Respiración guiada", descripcion: "Una práctica simple para acompañar la respiración y bajar el ritmo.",
    objetivo: "Puede ayudarte a hacer una pausa y aflojar la tensión del cuerpo.", categoria: "respiracion", etiquetas: ["respiración"],
    duracion: 3, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    mensajeInicial: "Buscá una posición cómoda, sentado o parado. Vamos a acompañar la respiración durante unos minutos.",
    pasos: [
      { tipo: "mensaje", texto: "Cerrá los ojos si te resulta cómodo, o simplemente bajá la mirada.", duracionSeg: 4 },
      { tipo: "respiracion", ciclos: 5, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Sostené", segundos: 2 }, { nombre: "Exhalá", segundos: 6 }] },
      { tipo: "mensaje", texto: "Cuando quieras, abrí los ojos y volvé al ritmo habitual." },
    ], activo: true, version: 1 },

  { id: "respiracion-ola", titulo: "Respiración de la ola", descripcion: "Una práctica breve para acompañar la respiración, siguiendo el vaivén de una ola.",
    objetivo: "Puede ayudarte a encontrar un ritmo más calmo.", categoria: "respiracion", etiquetas: ["respiración"],
    duracion: 3, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    mensajeInicial: "Vamos a acompañar la respiración durante unos minutos, como el vaivén de una ola.",
    pasos: [
      { tipo: "respiracion", ciclos: 6, fases: [{ nombre: "La ola sube — Inhalá", segundos: 4 }, { nombre: "La ola baja — Exhalá", segundos: 5 }] },
      { tipo: "mensaje", texto: "Tomate un momento más antes de seguir." },
    ], activo: true, version: 1 },

  { id: "respiracion-cuadrada", titulo: "Respiración cuadrada", descripcion: "Cuatro fases de igual duración: inhalar, sostener, exhalar, sostener.",
    objetivo: "Puede ayudarte a regular el ritmo de la respiración de forma pareja.", categoria: "respiracion", etiquetas: ["respiración"],
    duracion: 3, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    mensajeInicial: "Las cuatro fases duran lo mismo. Sólo tenés que seguir el ritmo.",
    pasos: [
      { tipo: "respiracion", ciclos: 5, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Sostené", segundos: 4 }, { nombre: "Exhalá", segundos: 4 }, { nombre: "Sostené", segundos: 4 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-4-7-8", titulo: "Respiración 4-7-8", descripcion: "Inhalar 4 segundos, sostener 7, exhalar 8: un patrón para bajar la activación.",
    objetivo: "Puede ayudarte a calmar el sistema nervioso antes de un momento tenso.", categoria: "respiracion", etiquetas: ["respiración"],
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "respiracion",
    mensajeInicial: "Sentate cómodo, con la espalda apoyada.",
    pasos: [{ tipo: "respiracion", ciclos: 4, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Sostené", segundos: 7 }, { nombre: "Exhalá", segundos: 8 }] }],
    activo: true, version: 1 },

  { id: "respiracion-conteo-regresivo", titulo: "Conteo regresivo con la respiración", descripcion: "Contá cada exhalación de 10 a 1, y si perdés la cuenta, volvés a empezar sin juzgarte.",
    objetivo: "Puede ayudarte a entrenar la atención sostenida.", categoria: "respiracion", etiquetas: ["respiración", "atención"],
    duracion: 3, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Inhalá por la nariz. En cada exhalación, contá mentalmente: 10, 9, 8… hasta llegar a 1. Si te distraés, volvé a empezar desde 10, sin culpa.", duracionSeg: 180 }],
    activo: true, version: 1 },

  { id: "suspiro-fisiologico", titulo: "Suspiro fisiológico", descripcion: "Dos inhalaciones cortas seguidas de una exhalación larga — una técnica breve para bajar la activación rápido.",
    objetivo: "Puede ayudarte en un pico de estrés puntual, no sólo como práctica programada.", categoria: "respiracion", etiquetas: ["respiración"],
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    pasos: [{ tipo: "respiracion", ciclos: 3, fases: [{ nombre: "Inhalá corto", segundos: 2 }, { nombre: "Inhalá de nuevo", segundos: 1 }, { nombre: "Exhalá largo", segundos: 6 }] }],
    activo: true, version: 1 },

  { id: "respira", titulo: "Respira", descripcion: "Respiración guiada con una animación que marca el ritmo.",
    objetivo: "Puede ayudarte a acompañar visualmente el ritmo de la respiración.", categoria: "respiracion",
    duracion: 3, dificultad: "facil", motor: "juego", puntuable: false, archivo: "js/juegos/respira.js", activo: true, version: 1 },

  { id: "respiracion-cuadrada-animada", titulo: "Respiración cuadrada (animada)", descripcion: "Cuatro fases: inhalar, sostener, exhalar, sostener — con una animación que marca el ritmo.",
    objetivo: "La misma respiración cuadrada, con apoyo visual en vez de texto.", categoria: "respiracion",
    duracion: 4, dificultad: "facil", motor: "juego", puntuable: false, archivo: "js/juegos/respiracion-cuadrada.js", activo: true, version: 1 },

  { id: "la-ola", titulo: "La ola", descripcion: "Sincronizá tu respiración con una ola animada.",
    objetivo: "Puede ayudarte a seguir un ritmo de respiración con apoyo visual.", categoria: "respiracion",
    duracion: 3, dificultad: "facil", motor: "juego", puntuable: false, archivo: "js/juegos/la-ola.js", activo: true, version: 1 },

  // ═══════ 🌱 ATENCIÓN AL PRESENTE ═══════
  { id: "grounding-54321", titulo: "Grounding 5-4-3-2-1", descripcion: "Una técnica para volver al momento presente usando los sentidos.",
    objetivo: "Puede ayudarte a bajar la intensidad de un momento de ansiedad, conectando con lo que hay alrededor.", categoria: "presente", etiquetas: ["grounding", "ansiedad"],
    duracion: 5, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    mensajeInicial: "Vamos a recorrer los cinco sentidos, de a uno.",
    pasos: [
      { tipo: "mensaje", texto: "Mirá a tu alrededor y encontrá 5 cosas que podés ver.", duracionSeg: 15 },
      { tipo: "mensaje", texto: "Ahora notá 4 cosas que podés tocar (la ropa, una superficie, el aire).", duracionSeg: 15 },
      { tipo: "mensaje", texto: "Escuchá 3 sonidos distintos, aunque sean sutiles.", duracionSeg: 15 },
      { tipo: "mensaje", texto: "Notá 2 olores, aunque sea el del ambiente.", duracionSeg: 10 },
      { tipo: "mensaje", texto: "Por último, notá 1 sabor en tu boca, o el sabor del aire.", duracionSeg: 8 },
    ], activo: true, version: 1 },

  { id: "pausa-consciente", titulo: "Pausa consciente", descripcion: "Un minuto entero sin hacer nada más que estar.",
    objetivo: "Puede ayudarte a cortar el piloto automático por un momento.", categoria: "presente", etiquetas: ["pausa"],
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    mensajeInicial: "Sólo un minuto. No hace falta hacer nada más que estar acá.",
    pasos: [{ tipo: "temporizador", duracionSeg: 60, texto: "Quedate quieto, respirando a tu ritmo." }], activo: true, version: 1 },

  { id: "tres-sonidos", titulo: "Tres sonidos", descripcion: "Identificá tres sonidos distintos a tu alrededor, uno por vez, sin nombrarlos ni juzgarlos.",
    objetivo: "Puede ayudarte a anclar la atención en el presente a través del oído.", categoria: "presente",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Cerrá los ojos si te resulta cómodo. Notá el sonido más lejano que puedas escuchar. Después uno más cercano. Después el sonido de tu propia respiración.", duracionSeg: 60 }],
    activo: true, version: 1 },

  { id: "anclaje-en-los-pies", titulo: "Anclaje en los pies", descripcion: "Llevá toda la atención a la sensación de tus pies tocando el piso.",
    objetivo: "Puede ayudarte a salir de un momento de disociación o sobrepensamiento.", categoria: "presente",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá el contacto de tus pies con el piso o el calzado. El peso, la temperatura, la textura. Quedate ahí un momento.", duracionSeg: 60 }],
    activo: true, version: 1 },

  { id: "jardin-zen", titulo: "Jardín zen", descripcion: "Vas creando un jardín a medida que respirás.",
    objetivo: "Puede ayudarte a combinar respiración con una actividad creativa lenta.", categoria: "presente",
    duracion: 5, dificultad: "facil", motor: "juego", puntuable: false, archivo: "js/juegos/jardin-zen.js", activo: true, version: 1 },

  { id: "piedras", titulo: "Piedras", descripcion: "Apilá piedras virtuales, despacio.",
    objetivo: "Puede ayudarte a practicar paciencia y atención a un movimiento lento.", categoria: "presente",
    duracion: 3, dificultad: "facil", motor: "juego", puntuable: false, archivo: "js/juegos/piedras.js", activo: true, version: 1 },

  { id: "ojo-de-agua", titulo: "Ojo de agua", descripcion: "Observá ondas en el agua y seguí su ritmo.",
    objetivo: "Puede ayudarte a practicar la observación sin intervenir.", categoria: "presente",
    duracion: 3, dificultad: "facil", motor: "juego", puntuable: false, archivo: "js/juegos/ojo-de-agua.js", activo: true, version: 1 },

  { id: "campana", titulo: "Campana", descripcion: "Atención plena guiada por sonidos.",
    objetivo: "Puede ayudarte a practicar la atención sostenida a un sonido que se apaga.", categoria: "presente",
    duracion: 4, dificultad: "facil", motor: "juego", puntuable: false, archivo: "js/juegos/campana.js", activo: true, version: 1 },

  { id: "un-minuto", titulo: "Un minuto", descripcion: "Permanecé atento y quieto durante 60 segundos.",
    objetivo: "Puede ayudarte a practicar quietud breve y sostenida.", categoria: "presente",
    duracion: 1, dificultad: "facil", motor: "juego", puntuable: false, archivo: "js/juegos/un-minuto.js", activo: true, version: 1 },

  // ═══════ 🧍 CUERPO Y SENSACIONES ═══════
  { id: "escaneo-corporal-breve", titulo: "Escaneo corporal breve", descripcion: "Un recorrido corto por el cuerpo, notando sensaciones sin cambiarlas.",
    objetivo: "Puede ayudarte a notar tensión que no habías registrado.", categoria: "cuerpo", etiquetas: ["cuerpo"],
    duracion: 4, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    mensajeInicial: "No hace falta cambiar nada, sólo notar.",
    pasos: [
      { tipo: "mensaje", texto: "Notá el contacto de tus pies con el piso.", duracionSeg: 8 },
      { tipo: "mensaje", texto: "Subí la atención a las piernas. ¿Están tensas o relajadas?", duracionSeg: 8 },
      { tipo: "mensaje", texto: "Notá la panza y el pecho, subiendo y bajando con cada respiración.", duracionSeg: 8 },
      { tipo: "mensaje", texto: "Notá los hombros. Si están levantados, dejalos caer.", duracionSeg: 8 },
      { tipo: "mensaje", texto: "Por último, notá la cara: la frente, la mandíbula. Aflojá lo que puedas.", duracionSeg: 8 },
    ], activo: true, version: 1 },

  { id: "escaneo-corporal-completo", titulo: "Escaneo corporal completo", descripcion: "Un recorrido más largo, de pies a cabeza, notando sensaciones sin cambiarlas.",
    objetivo: "Puede ayudarte a bajar la activación general del cuerpo.", categoria: "cuerpo", etiquetas: ["cuerpo"],
    duracion: 8, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    advertencia: "Si notás mucho malestar en algún punto del cuerpo, podés saltear esa parte.",
    pasos: [
      { tipo: "mensaje", texto: "Empezá por los pies. Notá temperatura, peso, contacto con el piso.", duracionSeg: 40 },
      { tipo: "mensaje", texto: "Subí a las piernas. Notá si hay tensión.", duracionSeg: 40 },
      { tipo: "mensaje", texto: "El torso y la espalda. Notá el movimiento de la respiración ahí.", duracionSeg: 40 },
      { tipo: "mensaje", texto: "Los brazos y las manos.", duracionSeg: 30 },
      { tipo: "mensaje", texto: "El cuello, la cara, la mandíbula. Y por último, todo el cuerpo junto.", duracionSeg: 40 },
    ], activo: true, version: 1 },

  { id: "tension-y-soltar", titulo: "Tensar y soltar", descripcion: "Tensá y soltá distintos grupos musculares, uno a la vez, para notar mejor la diferencia.",
    objetivo: "Puede ayudarte a reconocer tensión corporal que pasa desapercibida.", categoria: "cuerpo",
    duracion: 4, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [
      { tipo: "mensaje", texto: "Cerrá los puños fuerte 5 segundos. Soltá y notá la diferencia.", duracionSeg: 10 },
      { tipo: "mensaje", texto: "Subí los hombros hacia las orejas 5 segundos. Soltá.", duracionSeg: 10 },
      { tipo: "mensaje", texto: "Apretá la mandíbula 5 segundos. Soltá.", duracionSeg: 10 },
    ], activo: true, version: 1 },

  { id: "escaneo-manos", titulo: "Escaneo de manos", descripcion: "Un recorrido breve de atención sólo en tus manos: temperatura, peso, hormigueo.",
    objetivo: "Puede ayudarte a practicar atención al cuerpo en poco tiempo.", categoria: "cuerpo",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Apoyá las manos donde estén cómodas. Notá la temperatura. El peso. Si hay hormigueo o pulso. No hace falta cambiar nada, sólo notar.", duracionSeg: 60 }],
    activo: true, version: 1 },

  { id: "postura-consciente", titulo: "Postura consciente", descripcion: "Notá cómo estás sentado o parado ahora mismo, sin corregir todavía.",
    objetivo: "Puede ayudarte a tomar conciencia de hábitos posturales ligados a la tensión.", categoria: "cuerpo",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "¿Cómo está tu espalda? ¿Tus hombros? ¿Tu mandíbula? Solo notá, sin corregir todavía. Si después querés ajustar algo, hacelo despacio.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "escaneo-corporal", titulo: "Escaneo corporal", descripcion: "Pequeñas consignas de atención al cuerpo.",
    objetivo: "Puede ayudarte a recorrer el cuerpo con consignas breves y guiadas.", categoria: "cuerpo",
    duracion: 5, dificultad: "facil", motor: "juego", puntuable: false, archivo: "js/juegos/escaneo-corporal.js", activo: true, version: 1 },

  // ═══════ 💭 OBSERVAR PENSAMIENTOS ═══════
  { id: "soltar", titulo: "Soltar", descripcion: "Tocá y dejá desaparecer pensamientos o palabras.",
    objetivo: "Puede ayudarte a practicar dejar ir un pensamiento en vez de aferrarte a él.", categoria: "pensamientos",
    duracion: 3, dificultad: "facil", motor: "juego", puntuable: false, archivo: "js/juegos/soltar.js", activo: true, version: 1 },

  { id: "nombrar-el-pensamiento", titulo: "Nombrar el pensamiento", descripcion: "Ponele una etiqueta simple al tipo de pensamiento que aparece, sin seguirlo.",
    objetivo: "Puede ayudarte a tomar distancia de un pensamiento repetitivo.", categoria: "pensamientos",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Cuando aparezca un pensamiento, probá nombrarlo en silencio: 'preocupación', 'recuerdo', 'plan'. Solo nombralo, no hace falta resolverlo ahora.", duracionSeg: 90 }],
    activo: true, version: 1 },

  { id: "hojas-en-el-rio", titulo: "Hojas en el río", descripcion: "Imaginá cada pensamiento como una hoja que pasa flotando en un río, sin subirte a ella.",
    objetivo: "Una técnica clásica de defusión cognitiva para tomar distancia de los pensamientos.", categoria: "pensamientos",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Imaginá un río corriendo. Cada pensamiento que aparece, ponelo sobre una hoja y dejala flotar, sin agarrarla.", duracionSeg: 90 }],
    activo: true, version: 1 },

  { id: "pensamiento-vs-hecho", titulo: "Pensamiento vs. hecho", descripcion: "Tomá un pensamiento actual y separá qué parte es un hecho verificable y qué parte es interpretación.",
    objetivo: "Puede ayudarte a separar lo que pasó de la historia que te contás sobre eso.", categoria: "pensamientos",
    duracion: 4, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué pensamiento te está dando vueltas? Escribilo tal cual aparece.", placeholder: "Por ejemplo: 'seguro está enojado conmigo'" }],
    activo: true, version: 1 },

  { id: "cuestionar-el-pensamiento", titulo: "Cuestionar el pensamiento", descripcion: "Dos preguntas simples para mirar un pensamiento con más distancia.",
    objetivo: "Puede ayudarte a no tomar cada pensamiento como una verdad automática.", categoria: "pensamientos",
    duracion: 4, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué tan seguro estás de que ese pensamiento es 100% cierto? ¿Hay otra forma de ver la misma situación?", placeholder: "Escribí lo que se te ocurra…" }],
    activo: true, version: 1 },

  { id: "observar-sin-actuar", titulo: "Observar sin actuar", descripcion: "Practicá notar un impulso (contestar mal, revisar el celular) sin actuarlo todavía.",
    objetivo: "Puede ayudarte a ampliar el espacio entre el impulso y la acción.", categoria: "pensamientos",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Si sentís un impulso ahora (revisar el celular, comer algo, responder algo), quedate un momento solo notándolo, sin actuarlo todavía.", duracionSeg: 60 }],
    activo: true, version: 1 },

  { id: "tres-palabras-del-dia", titulo: "Tres palabras del día", descripcion: "Elegí tres palabras que resuman cómo está tu cabeza hoy, sin explicar nada más.",
    objetivo: "Puede ayudarte a poner en palabras un estado difuso.", categoria: "pensamientos",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué tres palabras describen cómo está tu cabeza hoy?", placeholder: "Por ejemplo: dispersa, cansada, expectante…" }],
    activo: true, version: 1 },

  // ═══════ 💗 AUTOCOMPASIÓN ═══════
  { id: "hablate-como-a-un-amigo", titulo: "Hablate como a un amigo", descripcion: "Reformulá algo que te dijiste duro hoy, como se lo dirías a alguien que querés.",
    objetivo: "Puede ayudarte a bajar la autocrítica automática.", categoria: "autocompasion",
    duracion: 4, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué te dijiste hoy que fue duro con vos mismo? Reescribilo como se lo dirías a alguien que querés.", placeholder: "Escribí las dos versiones si querés…" }],
    activo: true, version: 1 },

  { id: "mano-en-el-pecho", titulo: "Mano en el pecho", descripcion: "Un gesto físico simple de autocuidado, usado en prácticas de autocompasión.",
    objetivo: "El contacto físico suave puede ayudar a activar una respuesta de calma.", categoria: "autocompasion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Si te resulta cómodo, apoyá una mano en el pecho. Notá el calor y el movimiento de la respiración debajo. Quedate así un momento.", duracionSeg: 60 }],
    activo: true, version: 1 },

  { id: "frase-de-autocompasion", titulo: "Frase de autocompasión", descripcion: "Repetí en silencio una frase breve de buena voluntad hacia vos mismo.",
    objetivo: "Una práctica breve inspirada en meditaciones de compasión (metta).", categoria: "autocompasion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Repetí en silencio, a tu ritmo: 'Que pueda ser amable conmigo. Que pueda aceptar este momento tal como es.'", duracionSeg: 60 }],
    activo: true, version: 1 },

  { id: "lo-que-necesitas-hoy", titulo: "Lo que necesitás hoy", descripcion: "Una pregunta simple para chequear qué te haría falta en este momento del día.",
    objetivo: "Puede ayudarte a notar una necesidad que veías pasar por alto.", categoria: "autocompasion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué necesitás ahora mismo? Puede ser algo chico: agua, una pausa, aire.", placeholder: "Escribí lo primero que se te ocurra…" }],
    activo: true, version: 1 },

  { id: "permiso-para-descansar", titulo: "Permiso para descansar", descripcion: "Un recordatorio breve de que descansar no hay que ganárselo.",
    objetivo: "Puede ayudarte a bajar la exigencia de estar siempre productivo.", categoria: "autocompasion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Descansar no es algo que tengas que ganarte. Date el permiso, aunque sea por este minuto.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "carta-breve-a-vos-mismo", titulo: "Carta breve a vos mismo", descripcion: "Un mensaje corto de aliento, escrito para vos mismo en un momento difícil.",
    objetivo: "Puede ayudarte a practicar el mismo cuidado que le darías a otra persona.", categoria: "autocompasion",
    duracion: 4, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Escribite un mensaje corto de aliento, como si fueras tu propio amigo.", placeholder: "Empezá como quieras: 'Che, quiero decirte que…'" }],
    activo: true, version: 1 },

  { id: "los-tres-humanos", titulo: "Los tres humanos", descripcion: "Recordá que sufrir, equivocarte y no ser perfecto es parte de ser humano, no algo que te pase solo a vos.",
    objetivo: "Puede ayudarte a sentirte menos solo en un momento difícil (humanidad compartida).", categoria: "autocompasion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Lo que estás sintiendo ahora, en algún momento lo sienten todos: no sos el único al que le cuesta. Formar parte de eso también es parte de ser humano.", duracionSeg: 45 }],
    activo: true, version: 1 },

  // ═══════ ☕ MINDFULNESS COTIDIANO ═══════
  { id: "primer-sorbo-consciente", titulo: "Primer sorbo consciente", descripcion: "Tomá el primer sorbo de tu próxima bebida prestando atención completa.",
    objetivo: "Una práctica breve de mindfulness aplicada a un momento cotidiano.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que tomes algo, prestá atención completa al primer sorbo: temperatura, sabor, cómo se siente al tragar.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "caminar-tres-pasos", titulo: "Caminar tres pasos con atención", descripcion: "Los próximos tres pasos que des, hacelos notando el movimiento de tu cuerpo.",
    objetivo: "Puede ayudarte a traer atención plena a un movimiento automático.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Los próximos tres pasos que des (ahora o en un rato), hacelos despacio, notando el movimiento de pies, piernas y el contacto con el piso.", duracionSeg: 20 }],
    activo: true, version: 1 },

  { id: "escuchar-sin-responder", titulo: "Escuchar sin planear la respuesta", descripcion: "En tu próxima conversación, notá si estás escuchando o ya armando lo que vas a decir.",
    objetivo: "Puede ayudarte a estar más presente en las conversaciones.", categoria: "cotidiano",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "En tu próxima conversación, notá si estás realmente escuchando o ya pensando qué vas a responder. No hace falta cambiar nada, solo notarlo.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "lavarte-las-manos-con-atencion", titulo: "Lavarte las manos con atención", descripcion: "La próxima vez que te laves las manos, hacelo prestando atención al agua y la sensación.",
    objetivo: "Un micro-momento cotidiano para practicar presencia.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que te laves las manos, notá la temperatura del agua, la textura del jabón, sin apurarte.", duracionSeg: 20 }],
    activo: true, version: 1 },

  { id: "pausa-antes-de-responder", titulo: "Pausa antes de responder un mensaje", descripcion: "Antes de contestar tu próximo mensaje, hacé una respiración completa.",
    objetivo: "Puede ayudarte a responder desde un lugar más calmo, no sólo reactivo.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    pasos: [{ tipo: "respiracion", ciclos: 1, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Exhalá", segundos: 4 }] }],
    activo: true, version: 1 },

  { id: "comer-un-bocado-despacio", titulo: "Un bocado despacio", descripcion: "En tu próxima comida, comé el primer bocado el doble de despacio de lo habitual.",
    objetivo: "Una práctica breve de alimentación consciente.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "En tu próxima comida, masticá el primer bocado el doble de despacio de lo habitual. Notá sabor y textura.", duracionSeg: 30 }],
    activo: true, version: 1 },

  // ═══════ 🌊 EMOCIONES DIFÍCILES ═══════
  { id: "nombrar-la-emocion", titulo: "Nombrar la emoción", descripcion: "Ponele un nombre simple a lo que sentís ahora, sin necesidad de resolverlo.",
    objetivo: "Nombrar una emoción puede ayudar a regularla.", categoria: "emociones-dificiles",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "seleccion",
    pasos: [{ tipo: "seleccion", pregunta: "¿Qué emoción está más presente ahora mismo?", opciones: [{ emoji: "😰", texto: "Ansiedad" }, { emoji: "😔", texto: "Tristeza" }, { emoji: "😡", texto: "Enojo" }, { emoji: "😳", texto: "Vergüenza" }, { emoji: "😌", texto: "Calma" }] }],
    activo: true, version: 1 },

  { id: "rain-reconocer", titulo: "RAIN: reconocer", descripcion: "El primer paso de la técnica RAIN: simplemente reconocer qué está pasando.",
    objetivo: "RAIN es una técnica de mindfulness para transitar emociones difíciles en pasos.", categoria: "emociones-dificiles",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "R de Reconocer: ¿qué emoción está presente ahora? No hace falta cambiarla, sólo nombrarla para vos.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "rain-permitir", titulo: "RAIN: permitir", descripcion: "El segundo paso: dejar que la emoción esté, sin pelear contra ella.",
    objetivo: "Practicar la aceptación de una emoción, sin evitarla ni sobreidentificarte.", categoria: "emociones-dificiles",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "A de Aceptar/Permitir: dejá que la emoción esté ahí un momento, sin empujarla ni engancharte más de lo necesario.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "donde-vive-en-el-cuerpo", titulo: "¿Dónde vive en el cuerpo?", descripcion: "Ubicá en qué parte del cuerpo sentís la emoción actual.",
    objetivo: "Conectar la emoción con su sensación física puede ayudar a procesarla.", categoria: "emociones-dificiles",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "¿En qué parte del cuerpo sentís lo que estás sintiendo? ¿Pecho, panza, garganta, hombros? Solo notá dónde está.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "ola-emocional", titulo: "La ola emocional", descripcion: "Las emociones intensas suelen tener un pico y después bajan, como una ola.",
    objetivo: "Puede ayudarte a recordar que una emoción intensa no dura para siempre igual de fuerte.", categoria: "emociones-dificiles",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Las emociones intensas suben, llegan a un pico, y bajan — como una ola. No hace falta hacer nada para que baje, sólo dejarla pasar.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "que-necesita-esta-emocion", titulo: "¿Qué necesita esta emoción?", descripcion: "Preguntate qué podría ayudar a la emoción actual, en vez de qué podría eliminarla.",
    objetivo: "Puede ayudarte a responder a una emoción con cuidado en vez de con rechazo.", categoria: "emociones-dificiles",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Lo que sentís ahora, ¿qué necesitaría para sentirse un poco mejor acompañado?", placeholder: "Escribí lo primero que se te ocurra…" }],
    activo: true, version: 1 },

  // ════════════════════════════════════════════════════════════════
  // +100 prácticas nuevas (segunda tanda), mismas 7 categorías,
  // mismo esquema que las primeras 50 — ver comentario al inicio del
  // archivo. Ninguna reutiliza id ni contenido de las anteriores.
  // ════════════════════════════════════════════════════════════════

  // ═══════ 🌬️ RESPIRACIÓN (+14) ═══════
  { id: "respiracion-abdominal", titulo: "Respiración abdominal", descripcion: "Respirar llevando el aire a la panza en vez de al pecho.",
    objetivo: "Puede ayudarte a activar una respuesta de calma más profunda que la respiración superficial.", categoria: "respiracion",
    duracion: 3, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    mensajeInicial: "Apoyá una mano en el pecho y otra en la panza. Vamos a respirar tratando de mover más la mano de abajo.",
    pasos: [
      { tipo: "respiracion", ciclos: 6, fases: [{ nombre: "Inhalá inflando la panza", segundos: 4 }, { nombre: "Exhalá desinflando la panza", segundos: 5 }] },
      { tipo: "mensaje", texto: "¿Notaste alguna diferencia con la respiración de siempre?" },
    ], activo: true, version: 1 },

  { id: "respiracion-tres-tiempos", titulo: "Respiración de tres tiempos iguales", descripcion: "Inhalar, sostener y exhalar durante la misma cantidad de tiempo.",
    objetivo: "Un ritmo simple y parejo puede ayudar a bajar la activación.", categoria: "respiracion",
    duracion: 3, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    pasos: [
      { tipo: "respiracion", ciclos: 6, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Sostené", segundos: 4 }, { nombre: "Exhalá", segundos: 4 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-exhalacion-extendida", titulo: "Exhalación extendida", descripcion: "Exhalar más lento y más largo que la inhalación.",
    objetivo: "Alargar la exhalación es una de las formas más simples de activar el sistema de calma del cuerpo.", categoria: "respiracion",
    duracion: 3, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    pasos: [
      { tipo: "respiracion", ciclos: 6, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Exhalá bien despacio", segundos: 7 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-labios-fruncidos", titulo: "Respiración con labios fruncidos", descripcion: "Exhalar despacio como si soplaras a través de una pajita.",
    objetivo: "Puede ayudarte a alargar la exhalación de forma natural, sin contar.", categoria: "respiracion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    mensajeInicial: "Inhalá por la nariz y exhalá por la boca con los labios casi cerrados, como si soplaras muy despacio.",
    pasos: [
      { tipo: "respiracion", ciclos: 6, fases: [{ nombre: "Inhalá por la nariz", segundos: 3 }, { nombre: "Exhalá soplando despacio", segundos: 6 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-globo", titulo: "Respiración del globo", descripcion: "Imaginar que la panza es un globo que se infla y se desinfla.",
    objetivo: "La imagen del globo puede ayudar a hacer más concreta la respiración abdominal, sobre todo para chicos.", categoria: "respiracion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    pasos: [
      { tipo: "mensaje", texto: "Imaginá que tenés un globo adentro de la panza.", duracionSeg: 15 },
      { tipo: "respiracion", ciclos: 5, fases: [{ nombre: "Inflá el globo (inhalá)", segundos: 4 }, { nombre: "Desinflá el globo (exhalá)", segundos: 5 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-oler-flor-soplar-vela", titulo: "Oler la flor, soplar la vela", descripcion: "Inhalar como si olieras una flor y exhalar como si soplaras una vela.",
    objetivo: "Una forma simple y visual de recordar el ritmo de inhalar profundo y exhalar largo.", categoria: "respiracion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    pasos: [
      { tipo: "respiracion", ciclos: 6, fases: [{ nombre: "Olé la flor (inhalá por la nariz)", segundos: 3 }, { nombre: "Soplá la vela (exhalá por la boca)", segundos: 4 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-conteo-ascendente", titulo: "Conteo ascendente", descripcion: "Contar del uno en adelante, un número por respiración, hasta perder la cuenta.",
    objetivo: "Contar da algo simple en que enfocarse y suele ayudar quietar la mente que da vueltas.", categoria: "respiracion",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Contá en silencio cada respiración: uno al inhalar, dos al exhalar, y así. Si perdés la cuenta, no importa — volvé a empezar desde uno.", duracionSeg: 60 }],
    activo: true, version: 1 },

  { id: "respiracion-veinte-a-cero", titulo: "De veinte a cero", descripcion: "Contar hacia atrás desde veinte, una respiración por número.",
    objetivo: "Puede ayudar a ocupar la mente con algo simple mientras el cuerpo se calma.", categoria: "respiracion",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Contá hacia atrás desde veinte, una respiración por número: veinte, diecinueve, dieciocho… hasta llegar a cero.", duracionSeg: 70 }],
    activo: true, version: 1 },

  { id: "respiracion-cinco-dedos", titulo: "Respiración de los cinco dedos", descripcion: "Recorrer los dedos de una mano con la otra, respirando al ritmo del recorrido.",
    objetivo: "Combina respiración con un movimiento simple, útil para momentos de mucha activación.", categoria: "respiracion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    mensajeInicial: "Extendé una mano. Vas a recorrer cada dedo con el índice de la otra mano: subiendo inhalás, bajando exhalás.",
    pasos: [
      { tipo: "respiracion", ciclos: 5, fases: [{ nombre: "Subís el dedo (inhalá)", segundos: 3 }, { nombre: "Bajás el dedo (exhalá)", segundos: 3 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-antes-de-dormir", titulo: "Respiración para antes de dormir", descripcion: "Una respiración lenta pensada para el momento de acostarse.",
    objetivo: "Puede ayudarte a bajar el ritmo del cuerpo antes de dormir.", categoria: "respiracion",
    duracion: 4, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    mensajeInicial: "Acostate cómodo, con los ojos cerrados si querés. No hace falta hacer nada más que respirar.",
    pasos: [
      { tipo: "respiracion", ciclos: 8, fases: [{ nombre: "Inhalá suave", segundos: 4 }, { nombre: "Exhalá largo y suelto", segundos: 6 }] },
      { tipo: "mensaje", texto: "Dejá que la respiración siga a su propio ritmo, sin contar más." },
    ], activo: true, version: 1 },

  { id: "respiracion-de-emergencia", titulo: "Respiración para un momento difícil", descripcion: "Una respiración corta y simple para cuando algo se siente demasiado.",
    objetivo: "Pensada para momentos de mucha activación, cuando cuesta seguir instrucciones largas.", categoria: "respiracion",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    advertencia: "Si la sensación es muy intensa o dura mucho tiempo, buscá acompañamiento de alguien de confianza o un profesional.",
    pasos: [
      { tipo: "respiracion", ciclos: 4, fases: [{ nombre: "Inhalá", segundos: 3 }, { nombre: "Exhalá fuerte y largo", segundos: 5 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-caminando", titulo: "Respiración caminando", descripcion: "Coordinar la respiración con los pasos al caminar despacio.",
    objetivo: "Combina movimiento y respiración, útil para quienes les cuesta quedarse quietos.", categoria: "respiracion",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "respiracion",
    mensajeInicial: "Si podés, caminá muy despacio mientras hacés esto. Si no, imaginá los pasos.",
    pasos: [
      { tipo: "respiracion", ciclos: 6, fases: [{ nombre: "Dos pasos inhalando", segundos: 3 }, { nombre: "Dos pasos exhalando", segundos: 4 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-shhh", titulo: "Respiración del susurro", descripcion: "Exhalar haciendo un sonido suave de 'shhh'.",
    objetivo: "El sonido puede ayudar a alargar la exhalación y a soltar tensión de la mandíbula.", categoria: "respiracion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "respiracion",
    pasos: [
      { tipo: "respiracion", ciclos: 6, fases: [{ nombre: "Inhalá por la nariz", segundos: 3 }, { nombre: "Exhalá haciendo 'shhh'", segundos: 5 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-compartida", titulo: "Respiración compartida", descripcion: "Si hay alguien cerca, respirar al mismo ritmo que esa persona.",
    objetivo: "Sincronizar la respiración con otra persona puede generar una sensación de calma y conexión.", categoria: "respiracion",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "respiracion",
    mensajeInicial: "Si hay alguien cerca tuyo ahora, invitalo a respirar junto con vos, al mismo ritmo. Si estás solo, imaginá que alguien respira con vos.",
    pasos: [
      { tipo: "respiracion", ciclos: 6, fases: [{ nombre: "Inhalá junto con la otra persona", segundos: 4 }, { nombre: "Exhalá junto con la otra persona", segundos: 5 }] },
    ], activo: true, version: 1 },

  // ═══════ 🌱 ATENCIÓN AL PRESENTE (+14) ═══════
  { id: "grounding-321", titulo: "Grounding 3-2-1", descripcion: "Una versión más corta del clásico 5-4-3-2-1: tres cosas que ves, dos que escuchás, una que sentís.",
    objetivo: "Útil cuando el 5-4-3-2-1 completo se siente demasiado largo.", categoria: "presente",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá tres cosas que ves, dos cosas que escuchás, y una cosa que sentís en el cuerpo en este momento.", duracionSeg: 50 }],
    activo: true, version: 1 },

  { id: "anclaje-en-la-silla", titulo: "Anclaje en la silla", descripcion: "Notar el punto exacto donde el cuerpo hace contacto con la silla.",
    objetivo: "Sentir el propio peso apoyado puede ayudar a bajar la sensación de estar 'flotando' o disperso.", categoria: "presente",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá dónde tu cuerpo toca la silla: la espalda, las piernas, las manos si están apoyadas. Quedate un momento con esa sensación.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "sonido-mas-lejano", titulo: "El sonido más lejano", descripcion: "Buscar, entre todos los sonidos que hay ahora, el que está más lejos.",
    objetivo: "Agudizar la atención auditiva ayuda a anclarse en el momento presente.", categoria: "presente",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Cerrá los ojos si querés. Buscá el sonido más lejano que puedas escuchar ahora. Después, el más cercano.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "mirar-un-minuto", titulo: "Mirar un objeto un minuto", descripcion: "Elegir un objeto cualquiera y mirarlo con atención completa durante un minuto.",
    objetivo: "Mirar algo cotidiano como si fuera la primera vez entrena la atención plena.", categoria: "presente",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Elegí cualquier objeto cerca tuyo. Mirálo como si nunca lo hubieras visto: su forma, su color, sus detalles.", duracionSeg: 55 }],
    activo: true, version: 1 },

  { id: "temperatura-del-aire", titulo: "La temperatura del aire", descripcion: "Notar cómo se siente el aire en la piel en este momento.",
    objetivo: "Un ancla sensorial simple y siempre disponible.", categoria: "presente",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá la temperatura del aire sobre tu piel: en la cara, en las manos. ¿Es fresco, tibio, húmedo?", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "cinco-colores", titulo: "Cinco colores", descripcion: "Encontrar cinco colores distintos en el lugar donde estás.",
    objetivo: "Un juego de atención simple que ancla la mente en lo que hay alrededor.", categoria: "presente",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Mirá alrededor y encontrá cinco colores distintos, nombrándolos en silencio a medida que los ves.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "palpar-una-textura", titulo: "Palpar una textura", descripcion: "Tocar algo cercano y prestarle atención completa a su textura.",
    objetivo: "El tacto es un ancla sensorial muy directa al presente.", categoria: "presente",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Tocá algo que tengas cerca — tu ropa, una mesa, tu propia piel. Notá la textura: ¿es suave, áspera, fría, tibia?", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "peso-de-las-manos", titulo: "El peso de las manos", descripcion: "Notar simplemente el peso de las propias manos, donde estén apoyadas.",
    objetivo: "Un ancla corporal muy simple para volver al presente en cualquier momento.", categoria: "presente",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá el peso de tus manos, ahí donde estén apoyadas ahora. Sólo eso.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "un-minuto-sin-hacer-nada", titulo: "Un minuto sin hacer nada", descripcion: "Un minuto entero sin ninguna tarea, sólo estando.",
    objetivo: "Practicar el 'no hacer' es en sí mismo una forma de atención plena.", categoria: "presente",
    duracion: 1, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Durante un minuto, no hagas nada. No revises el celular, no pienses en lo que sigue. Sólo quedate.", duracionSeg: 60 }],
    activo: true, version: 1 },

  { id: "punto-de-apoyo-del-cuerpo", titulo: "El punto de apoyo del cuerpo", descripcion: "Encontrar el punto exacto donde el cuerpo está más apoyado ahora.",
    objetivo: "Un ancla corporal simple, útil en cualquier postura.", categoria: "presente",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá cuál es el punto de tu cuerpo que está más apoyado ahora mismo — puede ser los pies, la espalda, las piernas.", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "silencio-entre-sonidos", titulo: "El silencio entre los sonidos", descripcion: "Prestar atención a los pequeños silencios que hay entre un sonido y otro.",
    objetivo: "Una práctica de escucha más sutil, para momentos de más calma.", categoria: "presente",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Escuchá los sonidos alrededor, pero prestale atención a los pequeños silencios entre uno y otro.", duracionSeg: 50 }],
    activo: true, version: 1 },

  { id: "aire-entrando-por-la-nariz", titulo: "El aire entrando por la nariz", descripcion: "Notar la sensación exacta del aire al entrar y salir por la nariz.",
    objetivo: "Una de las anclas más clásicas de mindfulness: la sensación física de la respiración.", categoria: "presente",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá la sensación del aire entrando y saliendo por la nariz: la temperatura, si es distinta al inhalar y al exhalar.", duracionSeg: 50 }],
    activo: true, version: 1 },

  { id: "taza-consciente", titulo: "Una taza con atención", descripcion: "Sostener una taza o vaso prestando atención completa a la sensación.",
    objetivo: "Convertir un gesto diario en una práctica breve de atención plena.", categoria: "presente",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Si tenés una taza o vaso cerca, sostenelo con las dos manos. Notá el peso, la temperatura, la forma.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "notar-los-parpadeos", titulo: "Contar los parpadeos", descripcion: "Notar, sin forzar, cuántas veces parpadean los ojos en un minuto.",
    objetivo: "Una forma poco común de anclar la atención en algo automático del cuerpo.", categoria: "presente",
    duracion: 1, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Sin forzar el parpadeo, notá cuántas veces parpadean tus ojos naturalmente durante este momento.", duracionSeg: 40 }],
    activo: true, version: 1 },

  // ═══════ 🧍 CUERPO Y SENSACIONES (+15) ═══════
  { id: "escaneo-corporal-acostado", titulo: "Escaneo corporal acostado", descripcion: "Un recorrido por el cuerpo, pensado para hacer acostado.",
    objetivo: "Acostarse puede ayudar a soltar más el cuerpo que sentado.", categoria: "cuerpo",
    duracion: 4, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    mensajeInicial: "Acostate boca arriba si podés, con los brazos sueltos a los costados.",
    pasos: [
      { tipo: "mensaje", texto: "Notá los pies. Después las piernas. Después la espalda apoyada. Después los brazos. Después la cabeza.", duracionSeg: 70 },
      { tipo: "mensaje", texto: "Notá todo el cuerpo apoyado de una vez, como un solo peso." },
    ], activo: true, version: 1 },

  { id: "estiramiento-de-cuello", titulo: "Estiramiento consciente de cuello", descripcion: "Mover el cuello despacio, prestando atención a las sensaciones.",
    objetivo: "El cuello suele acumular tensión sin que lo notemos.", categoria: "cuerpo",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Inclina la cabeza suavemente hacia un lado, después hacia el otro, después adelante. Notá dónde sentís más tensión.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "relajar-la-mandibula", titulo: "Relajar la mandíbula", descripcion: "Notar si la mandíbula está apretada y soltarla despacio.",
    objetivo: "La mandíbula es uno de los lugares donde más se acumula tensión sin darnos cuenta.", categoria: "cuerpo",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá si tenés los dientes apretados. Aflojá la mandíbula, dejando los labios apenas separados.", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "soltar-los-hombros", titulo: "Soltar los hombros", descripcion: "Notar si los hombros están elevados y dejarlos caer.",
    objetivo: "Los hombros tensos y elevados son una de las formas más comunes de cargar estrés en el cuerpo.", categoria: "cuerpo",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá si tus hombros están cerca de las orejas. Subilos un poco más, y después soltalos de golpe.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "escaneo-de-pies", titulo: "Escaneo de pies", descripcion: "Prestar atención completa a la sensación de los pies.",
    objetivo: "Los pies son una parte del cuerpo poco atendida y un buen ancla sensorial.", categoria: "cuerpo",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá tus pies: el contacto con el piso o el calzado, la temperatura, si hay algún hormigueo.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "sentir-el-pulso", titulo: "Sentir el propio pulso", descripcion: "Encontrar el pulso en la muñeca o el cuello y prestarle atención.",
    objetivo: "Sentir el propio ritmo cardíaco puede ser un ancla corporal muy directa.", categoria: "cuerpo",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Buscá tu pulso en la muñeca con dos dedos de la otra mano. Cuando lo encuentres, quedate notándolo un momento.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "tensar-y-soltar-puños", titulo: "Tensar y soltar los puños", descripcion: "Cerrar los puños con fuerza y después soltarlos de golpe.",
    objetivo: "Un ejercicio rápido de tensión-relajación, útil cuando hay mucha energía acumulada.", categoria: "cuerpo",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Cerrá los puños con fuerza durante cinco segundos. Soltalos de golpe y notá la diferencia.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "movimiento-consciente-de-manos", titulo: "Movimiento consciente de manos", descripcion: "Mover las manos muy despacio, prestando atención a cada gesto.",
    objetivo: "Ralentizar un movimiento simple ayuda a entrenar la atención plena en acción.", categoria: "cuerpo",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Movés las manos muy despacio, como si estuvieran bajo el agua. Prestá atención a cada gesto pequeño.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "bostezo-consciente", titulo: "Bostezo consciente", descripcion: "Provocar un bostezo a propósito y notar cómo afloja la cara y el cuerpo.",
    objetivo: "El bostezo tiene un efecto relajante real sobre la mandíbula y la respiración.", categoria: "cuerpo",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Abrí bien grande la boca como para bostezar, aunque no tengas ganas. Notá cómo se afloja la cara después.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "escaneo-rapido-de-tension", titulo: "Escaneo rápido de tensión", descripcion: "Un recorrido veloz por el cuerpo buscando sólo puntos de tensión.",
    objetivo: "Una versión corta del escaneo corporal, para cuando hay poco tiempo.", categoria: "cuerpo",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Recorré rápido: mandíbula, hombros, manos, panza, piernas. En cada lugar, notá si hay tensión y aflojá un poco si podés.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "peso-en-la-silla", titulo: "El peso del cuerpo en la silla", descripcion: "Notar todo el peso del cuerpo apoyado en la silla o el piso.",
    objetivo: "Sentir el propio peso apoyado puede dar una sensación de estabilidad.", categoria: "cuerpo",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá el peso completo de tu cuerpo apoyado donde estés — la silla, el piso, la cama.", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "estirar-los-brazos", titulo: "Estirar los brazos hacia arriba", descripcion: "Un estiramiento simple de brazos, prestando atención a la sensación.",
    objetivo: "Un estiramiento corto puede aflojar tensión acumulada de estar mucho tiempo en una postura.", categoria: "cuerpo",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Estirá los brazos bien hacia arriba, como si quisieras tocar el techo. Notá el estiramiento en el cuerpo entero.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "masaje-en-las-sienes", titulo: "Masaje breve en las sienes", descripcion: "Un masaje corto en las sienes con los dedos, prestando atención a la sensación.",
    objetivo: "Puede ayudar a aliviar tensión relacionada con el cansancio visual o mental.", categoria: "cuerpo",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Con las yemas de los dedos, hacé pequeños círculos suaves en las sienes durante unos segundos.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "rodar-los-hombros", titulo: "Rodar los hombros", descripcion: "Mover los hombros en círculos lentos, hacia atrás.",
    objetivo: "Un movimiento simple que ayuda a soltar tensión acumulada en la espalda alta.", categoria: "cuerpo",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Hacé círculos lentos con los hombros, llevándolos hacia atrás. Repetí unas cuantas veces, despacio.", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "pies-en-el-piso-grounding", titulo: "Sentir los pies en el piso", descripcion: "Presionar los pies contra el piso con atención, notando el apoyo.",
    objetivo: "Un ancla corporal muy directa para momentos de mucha activación mental.", categoria: "cuerpo",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Presioná los pies contra el piso, con fuerza suave. Notá el contacto, el apoyo, la estabilidad.", duracionSeg: 35 }],
    activo: true, version: 1 },

  // ═══════ 💭 OBSERVAR PENSAMIENTOS (+14) ═══════
  { id: "pensamientos-como-nubes", titulo: "Pensamientos como nubes", descripcion: "Imaginar cada pensamiento como una nube que pasa por el cielo.",
    objetivo: "Una imagen clásica para practicar observar pensamientos sin aferrarse a ellos.", categoria: "pensamientos",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Imaginá el cielo. Cada pensamiento que aparece es una nube que pasa. No hace falta detenerla, sólo mirarla pasar.", duracionSeg: 50 }],
    activo: true, version: 1 },

  { id: "pensamientos-como-tren", titulo: "Pensamientos como un tren que pasa", descripcion: "Observar los pensamientos como vagones de un tren, sin subirse a ninguno.",
    objetivo: "Otra imagen para practicar la distancia con los propios pensamientos.", categoria: "pensamientos",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Imaginá tus pensamientos como vagones de un tren que pasa frente a vos. Podés mirarlos pasar sin subirte a ninguno.", duracionSeg: 50 }],
    activo: true, version: 1 },

  { id: "etiquetar-el-pensamiento", titulo: "Etiquetar el tipo de pensamiento", descripcion: "Ponerle una etiqueta simple a cada pensamiento: juzgar, planear, recordar.",
    objetivo: "Categorizar sin juzgar puede ayudar a tomar distancia de un pensamiento insistente.", categoria: "pensamientos",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Cuando aparezca un pensamiento, poné una etiqueta simple: 'juzgando', 'planeando', 'recordando'. Sólo eso, sin seguirlo.", duracionSeg: 55 }],
    activo: true, version: 1 },

  { id: "distancia-con-el-pensamiento", titulo: "'Estoy teniendo el pensamiento de que...'", descripcion: "Agregar esta frase antes de cada pensamiento para tomar distancia.",
    objetivo: "Una técnica simple de defusión cognitiva: separa al pensamiento de uno mismo.", categoria: "pensamientos",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Tomá el pensamiento que tengas ahora y decilo empezando con 'Estoy teniendo el pensamiento de que...'. Notá si se siente distinto.", duracionSeg: 50 }],
    activo: true, version: 1 },

  { id: "el-pensamiento-no-es-orden", titulo: "El pensamiento no es una orden", descripcion: "Recordar que tener un pensamiento no obliga a actuar según él.",
    objetivo: "Puede ayudar a des-enganchar de pensamientos que empujan a reaccionar de forma automática.", categoria: "pensamientos",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Un pensamiento es sólo un pensamiento. Podés tenerlo y no hacer nada con él. No es una orden que haya que obedecer.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "escribir-y-cerrar", titulo: "Escribir el pensamiento y cerrarlo", descripcion: "Anotar un pensamiento insistente y, simbólicamente, cerrar el cuaderno.",
    objetivo: "El gesto de escribir y cerrar puede ayudar a soltar un pensamiento que da vueltas.", categoria: "pensamientos",
    duracion: 3, dificultad: "facil", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Escribí el pensamiento que más vueltas te está dando ahora.", placeholder: "Escribilo tal cual aparece en tu cabeza…" }],
    activo: true, version: 1 },

  { id: "pensamientos-repetitivos", titulo: "Notar un pensamiento repetitivo", descripcion: "Reconocer cuándo un pensamiento vuelve una y otra vez, sin seguirlo cada vez.",
    objetivo: "Sólo notar la repetición ya es un paso para no quedar atrapado en ella.", categoria: "pensamientos",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Si hay un pensamiento que volvió varias veces hoy, notalo: 'ah, este de nuevo'. No hace falta resolverlo ahora.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "este-pensamiento-me-ayuda", titulo: "¿Este pensamiento me ayuda?", descripcion: "Preguntarse si un pensamiento actual está siendo útil ahora mismo.",
    objetivo: "Una pregunta simple para evaluar la utilidad de un pensamiento sin necesidad de que sea 'verdadero' o 'falso'.", categoria: "pensamientos",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Pensá en algo que te esté dando vueltas. ¿Ese pensamiento te está ayudando en algo ahora mismo?", placeholder: "Escribí lo que se te ocurra…" }],
    activo: true, version: 1 },

  { id: "el-observador-de-pensamientos", titulo: "El observador de pensamientos", descripcion: "Imaginar una parte de uno mismo que sólo observa, sin participar.",
    objetivo: "Practicar la posición de 'observador' es una habilidad central de mindfulness.", categoria: "pensamientos",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Imaginá que hay una parte tuya que sólo observa los pensamientos pasar, sin opinar ni participar. Quedate ahí un momento.", duracionSeg: 55 }],
    activo: true, version: 1 },

  { id: "pensamientos-como-el-clima", titulo: "Pensamientos como el clima", descripcion: "Los pensamientos, como el clima, cambian solos con el tiempo.",
    objetivo: "Una metáfora para recordar que ningún estado mental dura para siempre.", categoria: "pensamientos",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Los pensamientos son como el clima: hay días nublados y días de sol, y ninguno dura para siempre. Ahora mismo, ¿qué 'clima' hay en tu cabeza?", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "un-pensamiento-tres-reacciones", titulo: "Un pensamiento, tres reacciones posibles", descripcion: "Pensar en tres formas distintas de responder a un mismo pensamiento.",
    objetivo: "Abrir opciones ayuda a salir del piloto automático frente a un pensamiento difícil.", categoria: "pensamientos",
    duracion: 4, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Elegí un pensamiento que tengas ahora y escribí tres formas distintas en que podrías responder a él.", placeholder: "Podés listarlas una debajo de la otra…" }],
    activo: true, version: 1 },

  { id: "pausa-pensamiento-reaccion", titulo: "Pausa entre pensamiento y reacción", descripcion: "Practicar dejar un segundo de pausa antes de reaccionar a un pensamiento.",
    objetivo: "Esa pequeña pausa es donde vive la posibilidad de elegir cómo responder.", categoria: "pensamientos",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que un pensamiento te empuje a reaccionar, probá dejar pasar un segundo antes de hacer algo. Sólo un segundo.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "agradecer-y-soltar-pensamiento", titulo: "Agradecer y soltar un pensamiento", descripcion: "Agradecerle a la mente por un pensamiento y dejarlo ir.",
    objetivo: "Un gesto simbólico que puede ayudar a soltar sin pelear contra el pensamiento.", categoria: "pensamientos",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Tomá el pensamiento que tengas ahora. Decile en silencio 'gracias, mente' y dejalo ir, sin pelear con él.", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "pensar-en-silencio-vs-voz", titulo: "Pensar en silencio vs. en voz baja", descripcion: "Decir un pensamiento en voz baja y notar si se siente distinto que sólo pensarlo.",
    objetivo: "Cambiar el canal (pensado vs. hablado) puede dar una perspectiva distinta sobre un pensamiento.", categoria: "pensamientos",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Elegí un pensamiento actual. Primero notalo en silencio. Después decilo en voz baja. ¿Se siente diferente de alguna forma?", duracionSeg: 45 }],
    activo: true, version: 1 },

  // ═══════ 💗 AUTOCOMPASIÓN (+14) ═══════
  { id: "abrazo-a-uno-mismo", titulo: "Abrazo a uno mismo", descripcion: "Cruzar los brazos y darse un abrazo breve.",
    objetivo: "El contacto físico, aunque sea con uno mismo, puede activar una sensación de calma y cuidado.", categoria: "autocompasion",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Cruzá los brazos sobre el pecho y date un abrazo suave. Quedate así unos segundos.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "frase-de-aliento-personal", titulo: "Tu frase de aliento", descripcion: "Elegir o inventar una frase corta de aliento para usar cuando la necesites.",
    objetivo: "Tener una frase propia lista puede ayudar en momentos difíciles.", categoria: "autocompasion",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Si pudieras decirte una sola frase de aliento cuando las cosas se ponen difíciles, ¿cuál sería?", placeholder: "Escribí la frase que se te ocurra…" }],
    activo: true, version: 1 },

  { id: "perdonar-un-error-pequeno", titulo: "Perdonarse un error pequeño", descripcion: "Elegir un error reciente, pequeño, y practicar soltarlo.",
    objetivo: "Practicar con errores chicos ayuda a construir el hábito de la autocompasión.", categoria: "autocompasion",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Pensá en un error pequeño que cometiste hace poco. ¿Qué le dirías a un amigo que cometió ese mismo error?", placeholder: "Escribí lo que le dirías…" }],
    activo: true, version: 1 },

  { id: "reconocer-el-esfuerzo", titulo: "Reconocer el esfuerzo, no sólo el resultado", descripcion: "Valorar lo que se intentó, más allá de si salió como se esperaba.",
    objetivo: "Puede ayudar a bajar la exigencia de que todo tiene que salir perfecto para valer la pena.", categoria: "autocompasion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Pensá en algo que intentaste hoy, haya salido bien o no. ¿Qué esfuerzo pusiste en eso, más allá del resultado?", placeholder: "Escribí lo que se te ocurra…" }],
    activo: true, version: 1 },

  { id: "hablale-a-tu-yo-de-antes", titulo: "Hablale a tu yo de hace un año", descripcion: "Escribir un mensaje breve para la persona que eras hace un año.",
    objetivo: "Puede ayudarte a ver cuánto cambiaste y a tratarte con más amabilidad.", categoria: "autocompasion",
    duracion: 4, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Si pudieras hablarle a la persona que eras hace un año, ¿qué le dirías?", placeholder: "Escribile lo que se te ocurra…" }],
    activo: true, version: 1 },

  { id: "tres-cosas-bien-hechas", titulo: "Tres cosas que hiciste bien hoy", descripcion: "Enumerar tres cosas, aunque sean pequeñas, que hiciste bien hoy.",
    objetivo: "Contrarresta la tendencia a notar sólo lo que salió mal.", categoria: "autocompasion",
    duracion: 3, dificultad: "facil", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Nombrá tres cosas, por más chicas que sean, que hiciste bien hoy.", placeholder: "Podés listarlas una por una…" }],
    activo: true, version: 1 },

  { id: "el-amigo-interior-responde", titulo: "El amigo interior responde", descripcion: "Imaginar cómo respondería un amigo comprensivo a la situación actual.",
    objetivo: "Practicar la voz interna amable, como si fuera la de alguien que te quiere bien.", categoria: "autocompasion",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Si tu mejor amigo supiera exactamente cómo te sentís ahora, ¿qué te diría?", placeholder: "Escribí lo que imaginás que te diría…" }],
    activo: true, version: 1 },

  { id: "aceptar-un-cumplido", titulo: "Aceptar un cumplido", descripcion: "Recordar un cumplido reciente y practicar simplemente aceptarlo, sin descartarlo.",
    objetivo: "Muchas personas descartan automáticamente los cumplidos; practicar aceptarlos es una forma de autocompasión.", categoria: "autocompasion",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Pensá en un cumplido que te hicieron hace poco. En vez de restarle importancia, probá simplemente aceptarlo: 'gracias, es verdad'.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "cuidar-el-cuerpo-cansado", titulo: "Cuidar el cuerpo cansado", descripcion: "Notar el cansancio del cuerpo y ofrecerle un gesto de cuidado.",
    objetivo: "Responder al cansancio con cuidado en vez de exigencia.", categoria: "autocompasion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Notá si tu cuerpo está cansado ahora. Si es así, ofrecele algún gesto de cuidado: estirarte, tomar agua, o simplemente reconocerlo.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "pausa-de-gentileza", titulo: "Pausa de gentileza", descripcion: "Una pausa breve para tratarte con la misma gentileza que le darías a alguien que querés.",
    objetivo: "Un recordatorio simple en medio de un día exigente.", categoria: "autocompasion",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Por un momento, tratate con la misma gentileza que le darías a alguien que querés mucho.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "reconocer-un-limite-propio", titulo: "Reconocer un límite propio", descripcion: "Identificar un límite que pusiste (o necesitás poner) y validarlo.",
    objetivo: "Poner límites también es una forma de cuidado hacia uno mismo.", categoria: "autocompasion",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Pensá en un límite que pusiste hace poco, o que sentís que necesitás poner. ¿Por qué es importante para vos?", placeholder: "Escribí lo que se te ocurra…" }],
    activo: true, version: 1 },

  { id: "celebrar-el-intento", titulo: "Celebrar un intento, no sólo un logro", descripcion: "Reconocer el valor de haber intentado algo, más allá de si funcionó.",
    objetivo: "Ayuda a construir una relación menos exigente con los propios resultados.", categoria: "autocompasion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Animarse a intentar algo ya tiene valor, salga como salga. Pensá en algo que intentaste últimamente y date crédito por eso.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "compasion-por-el-yo-con-miedo", titulo: "Compasión por el yo que tuvo miedo", descripcion: "Recordar un momento de miedo pasado y ofrecerle compasión a esa versión de uno mismo.",
    objetivo: "Mirar el propio miedo pasado con compasión, en vez de vergüenza.", categoria: "autocompasion",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Pensá en un momento en que tuviste mucho miedo. ¿Qué le dirías hoy a esa versión de vos mismo?", placeholder: "Escribí lo que se te ocurra…" }],
    activo: true, version: 1 },

  { id: "nota-para-mañana", titulo: "Escribirte una nota para mañana", descripcion: "Dejarte un mensaje breve y amable para leer al día siguiente.",
    objetivo: "Un pequeño gesto de cuidado hacia tu propio futuro cercano.", categoria: "autocompasion",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Escribite una nota corta y amable para leer mañana.", placeholder: "Escribí lo que te gustaría leer…" }],
    activo: true, version: 1 },

  // ═══════ ☕ MINDFULNESS COTIDIANO (+15) ═══════
  { id: "cepillarte-los-dientes-con-atencion", titulo: "Cepillarte los dientes con atención", descripcion: "Prestar atención completa al gesto de cepillarte los dientes.",
    objetivo: "Convertir un hábito automático en una pequeña práctica de atención plena.", categoria: "cotidiano",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que te cepilles los dientes, prestale atención completa: el sabor, el sonido, el movimiento de la mano.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "subir-una-escalera-con-atencion", titulo: "Subir una escalera con atención", descripcion: "Prestar atención a cada escalón al subir, en vez de hacerlo en piloto automático.",
    objetivo: "Un gesto cotidiano convertido en ancla de presente.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que subas una escalera, prestale atención a cada escalón: el peso del cuerpo, el movimiento de las piernas.", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "abrir-una-puerta-con-atencion", titulo: "Abrir una puerta con atención", descripcion: "Notar el gesto completo de abrir una puerta, sin apuro.",
    objetivo: "Los gestos más automáticos son buenas oportunidades para practicar presencia.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que abras una puerta, hacelo despacio, notando la sensación de la manija y el movimiento.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "vestirte-con-atencion", titulo: "Vestirte con atención", descripcion: "Prestar atención al gesto de vestirte, en vez de hacerlo apurado.",
    objetivo: "Un momento cotidiano que suele hacerse en piloto automático.", categoria: "cotidiano",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que te vistas, notá la textura de la ropa, el movimiento de tus brazos, sin apurarte.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "guardar-el-celular-un-minuto", titulo: "Guardar el celular por un minuto", descripcion: "Dejar el celular fuera de la vista durante un minuto, sin hacer nada más.",
    objetivo: "Un pequeño descanso de estímulos, aunque sea breve.", categoria: "cotidiano",
    duracion: 1, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Guardá el celular fuera de tu vista durante un minuto entero. Notá qué se siente ese pequeño espacio vacío.", duracionSeg: 60 }],
    activo: true, version: 1 },

  { id: "un-mensaje-mas-lento", titulo: "Un mensaje de texto más lento", descripcion: "Escribir un mensaje de texto prestando atención a cada palabra, sin apuro.",
    objetivo: "Ralentizar algo tan automático como escribir un mensaje puede ser una práctica breve de presencia.", categoria: "cotidiano",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que escribas un mensaje, hacelo más despacio de lo normal, prestando atención a cada palabra que elegís.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "mirar-por-la-ventana-un-minuto", titulo: "Mirar por la ventana un minuto", descripcion: "Un minuto entero mirando lo que hay afuera, sin ningún otro objetivo.",
    objetivo: "Un descanso breve y accesible en medio de cualquier día.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Mirá por una ventana durante un minuto, sin buscar nada en particular. Sólo mirá lo que hay.", duracionSeg: 60 }],
    activo: true, version: 1 },

  { id: "doblar-ropa-con-atencion", titulo: "Doblar ropa con atención", descripcion: "Prestar atención completa al gesto de doblar una prenda.",
    objetivo: "Una tarea doméstica común, convertida en una pequeña práctica de presencia.", categoria: "cotidiano",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Si tenés que doblar ropa hoy, hacelo prestando atención a la textura de la tela y al movimiento de tus manos.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "regar-una-planta-con-atencion", titulo: "Regar una planta con atención", descripcion: "Prestar atención completa al gesto de regar una planta.",
    objetivo: "Cuidar algo vivo con atención plena puede ser una práctica breve y agradable.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Si tenés una planta cerca, regala prestando atención al agua cayendo y a la tierra recibiéndola.", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "escuchar-musica-sin-hacer-nada-mas", titulo: "Escuchar música sin hacer nada más", descripcion: "Escuchar una canción entera sin hacer ninguna otra cosa al mismo tiempo.",
    objetivo: "En un mundo de multitarea, prestarle atención completa a algo simple es poco común.", categoria: "cotidiano",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Elegí una canción y escuchala completa, sin hacer nada más al mismo tiempo. Prestá atención a los instrumentos, a la voz, a los silencios.", duracionSeg: 55 }],
    activo: true, version: 1 },

  { id: "preparar-una-bebida-con-atencion", titulo: "Preparar una bebida con atención", descripcion: "Prestar atención completa al preparar el mate, café o té.",
    objetivo: "Un ritual cotidiano muy propicio para practicar presencia.", categoria: "cotidiano",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que prepares una bebida, prestale atención completa: el sonido, el aroma, el movimiento de las manos.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "cerrar-los-ojos-en-el-transporte", titulo: "Cerrar los ojos en el transporte", descripcion: "Un momento breve con los ojos cerrados mientras viajás en colectivo, tren o auto.",
    objetivo: "Aprovechar un tiempo muerto para una pausa breve.", categoria: "cotidiano",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Si estás viajando de forma segura como pasajero, cerrá los ojos un momento y prestá atención sólo a los sonidos y al movimiento.", duracionSeg: 45 }],
    activo: true, version: 1 },

  { id: "semaforo-consciente", titulo: "Un semáforo consciente", descripcion: "Aprovechar la espera en un semáforo para una pausa breve, sin mirar el celular.",
    objetivo: "Convertir un momento de espera en una oportunidad de pausa, en vez de llenarlo con distracción.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que esperes un semáforo, dejá el celular guardado y respirá un par de veces mirando alrededor.", duracionSeg: 30 }],
    activo: true, version: 1 },

  { id: "guardar-las-llaves-con-atencion", titulo: "Guardar las llaves con atención", descripcion: "Prestar atención al gesto pequeño de guardar las llaves.",
    objetivo: "Los gestos más chicos y automáticos son terreno fértil para practicar presencia.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que guardes las llaves, hacelo notando el sonido y el gesto de la mano, sin apuro.", duracionSeg: 25 }],
    activo: true, version: 1 },

  { id: "apagar-la-luz-con-atencion", titulo: "Apagar la luz con atención", descripcion: "Prestar atención al gesto simple de apagar una luz.",
    objetivo: "Un cierre pequeño y simbólico para el final de una actividad o del día.", categoria: "cotidiano",
    duracion: 1, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "La próxima vez que apagues una luz, hacelo con atención al gesto, como un pequeño cierre.", duracionSeg: 25 }],
    activo: true, version: 1 },

  // ═══════ 🌊 EMOCIONES DIFÍCILES (+14) ═══════
  { id: "rain-investigar", titulo: "RAIN: investigar", descripcion: "El tercer paso de RAIN: investigar con curiosidad cómo se siente la emoción en el cuerpo y en la mente.",
    objetivo: "Investigar con curiosidad, no con juicio, ayuda a entender mejor una emoción difícil.", categoria: "emociones-dificiles",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "I de Investigar: con curiosidad, notá dónde vive esta emoción en tu cuerpo y qué pensamientos la acompañan.", duracionSeg: 50 }],
    activo: true, version: 1 },

  { id: "rain-nutrir", titulo: "RAIN: nutrir", descripcion: "El último paso de RAIN: ofrecerte a vos mismo algo de cuidado frente a la emoción.",
    objetivo: "Cierra el ciclo de RAIN con un gesto de compasión hacia uno mismo.", categoria: "emociones-dificiles",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "N de Nutrir: ofrecete a vos mismo algo de cuidado ahora, como lo harías con alguien que querés y que está pasando por esto.", duracionSeg: 50 }],
    activo: true, version: 1 },

  { id: "darle-un-color-a-la-emocion", titulo: "Darle un color a la emoción", descripcion: "Imaginar qué color tendría la emoción actual, si pudiera verse.",
    objetivo: "Traducir una emoción a una imagen simple puede ayudar a tomar distancia y observarla.", categoria: "emociones-dificiles",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Si la emoción que sentís ahora tuviera un color, ¿cuál sería? No hace falta que tenga sentido, sólo notá qué color aparece.", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "darle-una-forma-a-la-emocion", titulo: "Darle una forma a la emoción", descripcion: "Imaginar qué forma tendría la emoción actual, si fuera un objeto.",
    objetivo: "Otra forma de traducir una emoción difícil en algo más concreto y manejable.", categoria: "emociones-dificiles",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Si esta emoción tuviera una forma, ¿sería redonda, puntiaguda, pesada, liviana? Notá lo primero que aparezca.", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "la-emocion-tiene-un-mensaje", titulo: "La emoción tiene un mensaje", descripcion: "Preguntarse qué podría estar intentando decir o proteger la emoción actual.",
    objetivo: "Las emociones difíciles suelen tener una función, aunque se sientan incómodas.", categoria: "emociones-dificiles",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Si esta emoción pudiera hablar, ¿qué mensaje te estaría tratando de dar?", placeholder: "Escribí lo primero que se te ocurra…" }],
    activo: true, version: 1 },

  { id: "respirar-con-la-emocion", titulo: "Respirar con la emoción", descripcion: "Respirar dejando que la emoción esté presente, sin pelear contra ella.",
    objetivo: "Respirar 'con' la emoción, en vez de contra ella, suele bajar su intensidad más rápido.", categoria: "emociones-dificiles",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "respiracion",
    pasos: [
      { tipo: "mensaje", texto: "Dejá que la emoción esté ahí, sin empujarla. Vamos a respirar acompañándola, no combatiéndola.", duracionSeg: 15 },
      { tipo: "respiracion", ciclos: 5, fases: [{ nombre: "Inhalá dejando espacio para lo que sentís", segundos: 4 }, { nombre: "Exhalá sin apurar la emoción", segundos: 5 }] },
    ], activo: true, version: 1 },

  { id: "escala-de-intensidad-emocional", titulo: "Escala de intensidad emocional", descripcion: "Ponerle un número del 0 al 10 a la intensidad de la emoción actual.",
    objetivo: "Medir la intensidad ayuda a notar que las emociones suben y bajan, no son un todo-o-nada.", categoria: "emociones-dificiles",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "escala",
    pasos: [{ tipo: "escala", pregunta: "Del 0 al 10, ¿qué tan intensa es la emoción que sentís ahora?", min: 0, max: 10, etiquetaMin: "Nada", etiquetaMax: "Muchísimo" }],
    activo: true, version: 1 },

  { id: "que-necesito-ahora-mismo", titulo: "¿Qué necesito ahora mismo?", descripcion: "Una pregunta directa y simple frente a una emoción difícil.",
    objetivo: "A veces la pregunta más simple es la más útil frente a una emoción intensa.", categoria: "emociones-dificiles",
    duracion: 2, dificultad: "facil", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué necesitás ahora mismo? Puede ser algo chico: agua, aire, un momento a solas.", placeholder: "Escribí lo que se te ocurra…" }],
    activo: true, version: 1 },

  { id: "nombrar-sin-juzgar", titulo: "Nombrar sin juzgar", descripcion: "Ponerle nombre a la emoción actual, sin agregarle un juicio de 'buena' o 'mala'.",
    objetivo: "Nombrar una emoción sin juzgarla ayuda a que sea más fácil de sostener.", categoria: "emociones-dificiles",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Nombrá la emoción que sentís ahora, sin agregarle 'está mal sentir esto'. Sólo el nombre: 'esto es tristeza', 'esto es enojo'.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "la-emocion-no-sos-vos", titulo: "La emoción no sos vos", descripcion: "Recordar la diferencia entre sentir una emoción y ser esa emoción.",
    objetivo: "Una distinción simple pero poderosa: 'siento enojo' es distinto de 'soy un enojado'.", categoria: "emociones-dificiles",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Sentís esta emoción, pero no sos esta emoción. Es algo que está pasando por vos, no algo que te define.", duracionSeg: 40 }],
    activo: true, version: 1 },

  { id: "esperar-antes-de-reaccionar", titulo: "Esperar antes de reaccionar", descripcion: "Darse un momento de espera antes de actuar frente a una emoción intensa.",
    objetivo: "Ese pequeño margen de tiempo suele mejorar mucho la calidad de la respuesta.", categoria: "emociones-dificiles",
    duracion: 2, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Si sentís ganas de reaccionar fuerte a algo, probá esperar aunque sea un minuto antes de actuar.", duracionSeg: 35 }],
    activo: true, version: 1 },

  { id: "lugar-seguro-imaginario", titulo: "Un lugar seguro imaginario", descripcion: "Imaginar con detalle un lugar donde te sentís seguro y en calma.",
    objetivo: "Una técnica clásica de regulación emocional para momentos de mucha activación.", categoria: "emociones-dificiles",
    duracion: 3, dificultad: "facil", motor: "ejercicio", tipo: "mindfulness",
    pasos: [{ tipo: "mensaje", texto: "Imaginá un lugar donde te sentís completamente seguro y en calma. Puede ser real o inventado. Notá los detalles: colores, sonidos, temperatura.", duracionSeg: 55 }],
    activo: true, version: 1 },

  { id: "emocion-como-personaje", titulo: "Escribir la emoción como un personaje", descripcion: "Describir la emoción actual como si fuera un personaje, con su propia forma de ser.",
    objetivo: "Externalizar una emoción como personaje puede ayudar a relacionarse con ella de otra forma.", categoria: "emociones-dificiles",
    duracion: 4, dificultad: "intermedio", motor: "ejercicio", tipo: "escritura",
    pasos: [{ tipo: "escritura", pregunta: "Si esta emoción fuera un personaje, ¿cómo sería? ¿Qué diría, cómo se movería?", placeholder: "Describilo como se te ocurra…" }],
    activo: true, version: 1 },

  { id: "agradecer-lo-que-protege", titulo: "Agradecer lo que la emoción intenta proteger", descripcion: "Reconocer que incluso una emoción difícil suele intentar cuidar algo importante.",
    objetivo: "Un cierre compasivo: incluso el miedo o el enojo suelen tener una intención de cuidado detrás.", categoria: "emociones-dificiles",
    duracion: 3, dificultad: "intermedio", motor: "ejercicio", tipo: "mensaje",
    pasos: [{ tipo: "mensaje", texto: "Aunque se sienta incómoda, esta emoción probablemente esté tratando de proteger algo importante para vos. Podés agradecerle eso, aunque no te guste cómo se siente.", duracionSeg: 45 }],
    activo: true, version: 1 },
];

const CatalogoMindfulness = {
  todos: () => MINDFULNESS.filter(m => m.activo),
  porId: (id) => MINDFULNESS.find(m => m.id === id),
  categorias: () => CATEGORIAS_MINDFULNESS,
  categoriaPorId: (id) => CATEGORIAS_MINDFULNESS.find(c => c.id === id),
  necesidades: () => NECESIDADES_MINDFULNESS,
  necesidadPorId: (id) => NECESIDADES_MINDFULNESS.find(n => n.id === id),
  porCategoria: (catId) => CatalogoMindfulness.todos().filter(m => m.categoria === catId),

  buscar(query) {
    const q = query.trim().toLowerCase();
    if (!q) return CatalogoMindfulness.todos();
    return CatalogoMindfulness.todos().filter(m =>
      m.titulo.toLowerCase().includes(q) ||
      m.descripcion.toLowerCase().includes(q) ||
      m.categoria.toLowerCase().includes(q) ||
      (m.etiquetas || []).some(t => t.toLowerCase().includes(q)));
  },

  filtrar({ duracionMax, dificultad, estado } = {}) {
    let lista = CatalogoMindfulness.todos();
    if (duracionMax) lista = lista.filter(m => m.duracion <= duracionMax);
    if (dificultad) lista = lista.filter(m => m.dificultad === dificultad);
    if (estado === "favoritos") lista = lista.filter(m => Storage.esFavoritoEjercicio(m.id));
    if (estado === "realizados") lista = lista.filter(m => Storage.getProgresoEjercicio(m.id).vecesCompletado > 0);
    if (estado === "no-realizados") lista = lista.filter(m => Storage.getProgresoEjercicio(m.id).vecesCompletado === 0);
    return lista;
  },

  aleatorio(filtros = {}) {
    const lista = CatalogoMindfulness.filtrar(filtros);
    const pool = lista.length ? lista : CatalogoMindfulness.todos();
    return pool[Math.floor(Math.random() * pool.length)];
  },

  /** Práctica del día: determinística según la fecha, no cambia en cada visita. */
  delDia() {
    const lista = CatalogoMindfulness.todos();
    const hoy = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < hoy.length; i++) hash = (hash * 31 + hoy.charCodeAt(i)) >>> 0;
    return lista[hash % lista.length];
  },

  /** Recomendación por reglas simples: tiempo disponible + necesidad elegida. */
  recomendar({ minutos, necesidadId } = {}) {
    let lista = CatalogoMindfulness.todos();
    const necesidad = NECESIDADES_MINDFULNESS.find(n => n.id === necesidadId);
    if (necesidad) lista = lista.filter(m => necesidad.categorias.includes(m.categoria));
    if (minutos) {
      const dentroDelTiempo = lista.filter(m => m.duracion <= minutos);
      lista = dentroDelTiempo.length ? dentroDelTiempo : [...lista].sort((a, b) => Math.abs(a.duracion - minutos) - Math.abs(b.duracion - minutos));
    }
    if (!lista.length) lista = CatalogoMindfulness.todos();
    return lista.sort(() => Math.random() - 0.5).slice(0, 3);
  },
};

if (typeof module !== "undefined") module.exports = { MINDFULNESS, CATEGORIAS_MINDFULNESS, NECESIDADES_MINDFULNESS, CatalogoMindfulness };
