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
