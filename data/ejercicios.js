/**
 * CATÁLOGO DE EJERCICIOS — SINAPSIS
 * ====================================
 * Igual que data/juegos-catalogo.js: acá vive únicamente el
 * contenido. Para sumar un ejercicio nuevo alcanza con agregar un
 * objeto a EJERCICIOS — no hace falta tocar ejercicios.html,
 * ejercicio.html ni exercise-engine.js.
 *
 * Cada ejercicio tiene:
 *  - id, titulo, descripcion, objetivo
 *  - categoria (ver CATEGORIAS), etiquetas: string[]
 *  - duracion: minutos aproximados (número)
 *  - dificultad: "facil" | "intermedio" | "profundo"
 *  - tipo: tipo dominante para los filtros — "respiracion" | "mindfulness" |
 *    "reflexion" | "escritura" | "interactividad" | "visual" | "escala" |
 *    "preguntas" | "relajacion" | "seleccion"
 *  - mensajeInicial: texto de la pantalla previa a empezar
 *  - advertencia: opcional, se muestra en la pantalla previa
 *  - pasos: la secuencia real del ejercicio (ver exercise-engine.js
 *    para los tipos de paso soportados)
 *  - activo, version
 */

const CATEGORIAS_EJERCICIOS = [
  { id: "emociones", nombre: "Emociones", icono: "❤️", color: "#e08a8a" },
  { id: "atencion", nombre: "Atención y concentración", icono: "🧠", color: "#1a7a8a" },
  { id: "pensamientos", nombre: "Pensamientos", icono: "💭", color: "#3a5a6a" },
  { id: "autoconocimiento", nombre: "Autoconocimiento", icono: "🪞", color: "#c98ac2" },
  { id: "habitos", nombre: "Hábitos y bienestar", icono: "🌱", color: "#8ac9a9" },
  { id: "vinculos", nombre: "Vínculos", icono: "🤝", color: "#c9a97e" },
  { id: "sueno", nombre: "Sueño y descanso", icono: "🌙", color: "#0e4d5c" },
  { id: "escritura", nombre: "Escritura y reflexión", icono: "✍️", color: "#7ed6e4" },
  { id: "valores", nombre: "Valores y propósito", icono: "🧭", color: "#2aaec2" },
  { id: "activacion", nombre: "Activación y energía", icono: "⚡", color: "#e0954a" },
];

const NECESIDADES = [
  { id: "saturado", emoji: "😵", texto: "Estoy saturado", categorias: ["atencion"] },
  { id: "ansiedad", emoji: "😰", texto: "Quiero bajar la ansiedad", categorias: ["emociones"] },
  { id: "concentrarme", emoji: "🧠", texto: "Quiero concentrarme", categorias: ["atencion"] },
  { id: "entender", emoji: "❤️", texto: "Quiero entender lo que siento", categorias: ["emociones"] },
  { id: "bajoneado", emoji: "😔", texto: "Estoy bajoneado", categorias: ["emociones", "autoconocimiento"] },
  { id: "enojado", emoji: "😡", texto: "Estoy enojado", categorias: ["emociones"] },
  { id: "conocerme", emoji: "🪞", texto: "Quiero conocerme mejor", categorias: ["autoconocimiento", "valores"] },
  { id: "ordenar", emoji: "🌱", texto: "Quiero ordenar mi cabeza", categorias: ["pensamientos", "escritura"] },
  { id: "relajarme", emoji: "🧘", texto: "Quiero relajarme", categorias: ["sueno"] },
  { id: "pensar", emoji: "💭", texto: "Quiero pensar", categorias: ["pensamientos", "valores"] },
  { id: "escribir", emoji: "✍️", texto: "Quiero escribir", categorias: ["escritura"] },
];

const EJERCICIOS = [
  // ═══════ ❤️ EMOCIONES ═══════
  { id: "termometro-emocional", titulo: "Termómetro emocional", descripcion: "Registrá qué tan intensa es una emoción que estás sintiendo ahora.",
    objetivo: "Puede ayudarte a tomar distancia de la intensidad de lo que sentís.", categoria: "emociones", etiquetas: ["emociones", "escala"],
    duracion: 3, dificultad: "facil", tipo: "escala",
    mensajeInicial: "Pensá en algo que estés sintiendo ahora mismo.",
    pasos: [
      { tipo: "escala", pregunta: "¿Qué tan intensa es esa emoción ahora?", min: 0, max: 10, etiquetaMin: "Nada", etiquetaMax: "Muchísimo" },
      { tipo: "seleccion", pregunta: "¿Cuál se parece más a lo que sentís?", opciones: [{ emoji: "😰", texto: "Ansiedad" }, { emoji: "😔", texto: "Tristeza" }, { emoji: "😡", texto: "Enojo" }, { emoji: "😌", texto: "Calma" }, { emoji: "😐", texto: "No sé bien" }] },
      { tipo: "mensaje", texto: "Nombrar lo que sentimos, aunque sea aproximado, ya es un primer paso." },
    ], activo: true, version: 1 },

  { id: "rueda-emociones", titulo: "Rueda de emociones", descripcion: "Un recorrido para ponerle un nombre más preciso a lo que sentís.",
    objetivo: "Puede ayudarte a encontrar una palabra más exacta que 'bien' o 'mal'.", categoria: "emociones", etiquetas: ["emociones", "vocabulario emocional"],
    duracion: 3, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "Vamos de lo general a lo específico.",
    pasos: [
      { tipo: "seleccion", pregunta: "En términos generales, ¿cómo te sentís?", opciones: [{ emoji: "😊", texto: "Bien" }, { emoji: "😐", texto: "Neutral" }, { emoji: "😕", texto: "Mal" }] },
      { tipo: "seleccion", pregunta: "Dentro de eso, ¿cuál se acerca más?", opciones: [{ texto: "Alegría" }, { texto: "Alivio" }, { texto: "Orgullo" }, { texto: "Ternura" }, { texto: "Cansancio" }, { texto: "Otra" }] },
      { tipo: "mensaje", texto: "Ponerle un nombre más preciso ayuda a entender qué necesitás." },
    ], activo: true, version: 1 },

  { id: "que-estoy-sintiendo", titulo: "¿Qué estoy sintiendo?", descripcion: "Una pausa para identificar y poner en palabras una emoción.",
    objetivo: "Puede ayudarte a ordenar algo que sentís pero no terminás de nombrar.", categoria: "emociones", etiquetas: ["emociones", "escritura"],
    duracion: 4, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "No hay respuestas correctas, sólo lo que sea cierto para vos ahora.",
    pasos: [
      { tipo: "seleccion", pregunta: "¿Qué emoción predomina ahora?", opciones: [{ emoji: "😰", texto: "Ansiedad" }, { emoji: "😔", texto: "Tristeza" }, { emoji: "😡", texto: "Enojo" }, { emoji: "😌", texto: "Calma" }, { emoji: "🤩", texto: "Entusiasmo" }] },
      { tipo: "escritura", pregunta: "¿Qué la disparó, si lo sabés?", placeholder: "Puede ser algo puntual, o no tener un motivo claro…" },
    ], activo: true, version: 1 },

  { id: "identificacion-necesidades", titulo: "Identificación de necesidades", descripcion: "Detrás de cada emoción suele haber una necesidad. Vamos a buscarla.",
    objetivo: "Puede ayudarte a pasar de 'cómo me siento' a 'qué necesito'.", categoria: "emociones", etiquetas: ["emociones", "necesidades"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Pensá en una situación reciente que te generó una emoción fuerte.",
    pasos: [
      { tipo: "seleccion", pregunta: "¿Qué emoción sentiste en esa situación?", opciones: [{ texto: "Enojo" }, { texto: "Tristeza" }, { texto: "Ansiedad" }, { texto: "Frustración" }] },
      { tipo: "seleccion", pregunta: "¿Qué necesitabas en ese momento?", opciones: [{ texto: "Ser escuchado" }, { texto: "Descanso" }, { texto: "Reconocimiento" }, { texto: "Espacio" }, { texto: "Compañía" }] },
      { tipo: "mensaje", texto: "Identificar la necesidad es el primer paso para poder pedirla o buscarla." },
    ], activo: true, version: 1 },

  { id: "semaforo-emocional", titulo: "Semáforo emocional", descripcion: "Clasificá la intensidad de lo que sentís como si fuera un semáforo.",
    objetivo: "Puede ayudarte a decidir qué tipo de respuesta necesita el momento.", categoria: "emociones", etiquetas: ["emociones", "regulación"],
    duracion: 3, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "Verde: manejable. Amarillo: atención. Rojo: necesita una pausa.",
    pasos: [
      { tipo: "seleccion", pregunta: "¿En qué color estás ahora?", opciones: [{ emoji: "🟢", texto: "Verde — estoy bien" }, { emoji: "🟡", texto: "Amarillo — un poco alterado" }, { emoji: "🔴", texto: "Rojo — necesito parar" }] },
      { tipo: "mensaje", texto: "Si estás en rojo o amarillo, quizás un ejercicio de calma te sirva ahora." },
    ], activo: true, version: 1 },

  { id: "mapa-corporal-emociones", titulo: "Mapa corporal de emociones", descripcion: "Las emociones también se sienten en el cuerpo. Vamos a ubicarlas.",
    objetivo: "Puede ayudarte a notar señales físicas antes de que la emoción crezca.", categoria: "emociones", etiquetas: ["emociones", "cuerpo"],
    duracion: 3, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "Pensá en la emoción que predomina hoy.",
    pasos: [
      { tipo: "seleccion", pregunta: "¿Dónde la sentís más?", opciones: [{ texto: "Pecho" }, { texto: "Estómago" }, { texto: "Garganta" }, { texto: "Cabeza" }, { texto: "Manos" }, { texto: "Todo el cuerpo" }] },
      { tipo: "mensaje", texto: "Notar dónde vive una emoción en el cuerpo es el primer paso para poder regularla." },
    ], activo: true, version: 1 },

  { id: "lo-que-cambio-en-la-ultima-hora", titulo: "Lo que cambió en la última hora", descripcion: "Comparar cómo te sentías hace una hora con cómo te sentís ahora.",
    objetivo: "Puede ayudarte a notar que el estado de ánimo no es fijo, cambia todo el tiempo.", categoria: "emociones", etiquetas: ["emociones", "cambio"],
    duracion: 3, dificultad: "facil", tipo: "escala",
    mensajeInicial: "No hace falta que el cambio sea grande.",
    pasos: [
      { tipo: "escala", pregunta: "¿Cómo te sentías hace una hora?", min: 0, max: 10, etiquetaMin: "Muy mal", etiquetaMax: "Muy bien" },
      { tipo: "escala", pregunta: "¿Cómo te sentís ahora?", min: 0, max: 10, etiquetaMin: "Muy mal", etiquetaMax: "Muy bien" },
      { tipo: "mensaje", texto: "El ánimo cambia todo el tiempo, aunque no siempre lo notemos." },
    ], activo: true, version: 1 },

  { id: "emocion-en-tres-palabras", titulo: "La emoción en tres palabras", descripcion: "Elegí tres palabras que describan lo que sentís ahora, sin pensarlo de más.",
    objetivo: "Puede ayudarte a ponerle nombre rápido a algo difuso.", categoria: "emociones", etiquetas: ["emociones", "vocabulario emocional"],
    duracion: 2, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Las primeras que se te ocurran, sin filtrar.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué tres palabras describen cómo estás ahora?", placeholder: "Por ejemplo: cansado, expectante, inquieto…" }], activo: true, version: 1 },

  { id: "que-dispara-esta-emocion", titulo: "¿Qué la disparó?", descripcion: "Rastreá el momento exacto en el que empezó a cambiar tu estado de ánimo.",
    objetivo: "Puede ayudarte a identificar disparadores que se repiten.", categoria: "emociones", etiquetas: ["emociones", "disparadores"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Volvé un poco atrás en el día de hoy.",
    pasos: [
      { tipo: "escritura", pregunta: "¿En qué momento notaste que tu ánimo cambió?", placeholder: "Una hora aproximada, un lugar, algo que pasó…" },
      { tipo: "seleccion", pregunta: "¿Qué tipo de disparador fue?", opciones: [{ texto: "Algo que alguien dijo" }, { texto: "Un pensamiento" }, { texto: "Cansancio o hambre" }, { texto: "No lo tengo claro" }] },
    ], activo: true, version: 1 },

  { id: "aceptar-sin-actuar", titulo: "Aceptar sin actuar todavía", descripcion: "Practicá dejar que una emoción esté presente sin responder a ella de inmediato.",
    objetivo: "Puede ayudarte a ganar espacio entre sentir y reaccionar.", categoria: "emociones", etiquetas: ["emociones", "regulación"],
    duracion: 3, dificultad: "intermedio", tipo: "mindfulness",
    mensajeInicial: "No se trata de ignorarla, sino de no actuar todavía.",
    pasos: [
      { tipo: "mensaje", texto: "Notá la emoción presente. No hace falta hacer nada con ella todavía.", duracionSeg: 10 },
      { tipo: "respiracion", ciclos: 3, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Exhalá", segundos: 5 }] },
    ], activo: true, version: 1 },

  { id: "emociones-mixtas", titulo: "Emociones mezcladas", descripcion: "A veces sentimos más de una cosa a la vez. Vamos a desarmarlas.",
    objetivo: "Puede ayudarte a no simplificar algo que en realidad es complejo.", categoria: "emociones", etiquetas: ["emociones", "complejidad"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Es normal sentir cosas contradictorias al mismo tiempo.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué dos (o más) emociones distintas sentís ahora?", placeholder: "Por ejemplo: alivio y tristeza, alegría y culpa…" },
      { tipo: "mensaje", texto: "Las dos pueden ser ciertas al mismo tiempo. No hace falta elegir una." },
    ], activo: true, version: 1 },

  { id: "de-donde-viene-este-enojo", titulo: "¿De dónde viene este enojo?", descripcion: "El enojo suele tener capas. Vamos a ver qué hay debajo.",
    objetivo: "Puede ayudarte a notar si debajo del enojo hay otra emoción.", categoria: "emociones", etiquetas: ["emociones", "enojo"],
    duracion: 4, dificultad: "intermedio", tipo: "preguntas",
    advertencia: "Si este ejercicio te genera malestar significativo, podés detenerlo.",
    mensajeInicial: "El enojo a veces tapa algo más.",
    pasos: [
      { tipo: "seleccion", pregunta: "Debajo de este enojo, ¿qué más podría haber?", opciones: [{ texto: "Miedo" }, { texto: "Tristeza" }, { texto: "Sentirme no tenido en cuenta" }, { texto: "Cansancio" }, { texto: "No estoy seguro" }] },
      { tipo: "escritura", pregunta: "¿Qué necesitarías para que baje un poco?", placeholder: "Puede ser algo concreto o simplemente tiempo…" },
    ], activo: true, version: 1 },

  { id: "la-intensidad-segun-el-momento-del-dia", titulo: "La intensidad según el momento del día", descripcion: "Notá si hay un patrón entre cómo te sentís y el momento del día.",
    objetivo: "Puede ayudarte a identificar franjas horarias más difíciles para anticiparte.", categoria: "emociones", etiquetas: ["emociones", "patrones"],
    duracion: 3, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "Pensá en los últimos días, no sólo en hoy.",
    pasos: [
      { tipo: "seleccion", pregunta: "¿En qué momento del día solés sentirte peor?", opciones: [{ texto: "Mañana" }, { texto: "Mediodía" }, { texto: "Tarde" }, { texto: "Noche" }, { texto: "No hay un patrón claro" }] },
      { tipo: "mensaje", texto: "Conocer tu patrón puede ayudarte a anticiparte con algo de cuidado extra en ese momento." },
    ], activo: true, version: 1 },

  { id: "escala-de-calma", titulo: "Escala de calma", descripcion: "Medí tu nivel de calma actual y qué lo movería un punto hacia arriba.",
    objetivo: "Puede ayudarte a encontrar pasos pequeños hacia más tranquilidad.", categoria: "emociones", etiquetas: ["emociones", "calma"],
    duracion: 3, dificultad: "facil", tipo: "escala",
    mensajeInicial: "No hace falta llegar a 10, sólo subir un poco.",
    pasos: [
      { tipo: "escala", pregunta: "¿Qué tan en calma estás ahora?", min: 0, max: 10, etiquetaMin: "Nada en calma", etiquetaMax: "Totalmente en calma" },
      { tipo: "escritura", pregunta: "¿Qué te haría subir aunque sea un punto?", placeholder: "Algo simple y posible ahora…" },
    ], activo: true, version: 1 },

  { id: "nombrar-para-calmar", titulo: "Nombrar para calmar", descripcion: "Poner en palabras exactas una emoción puede bajar su intensidad.",
    objetivo: "Puede ayudarte a usar el lenguaje como herramienta de regulación.", categoria: "emociones", etiquetas: ["emociones", "regulación"],
    duracion: 3, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "Cuanto más precisa la palabra, mejor funciona.",
    pasos: [
      { tipo: "seleccion", pregunta: "De estas palabras, ¿cuál describe MEJOR lo que sentís? (no la más general)", opciones: [{ texto: "Irritado" }, { texto: "Frustrado" }, { texto: "Decepcionado" }, { texto: "Abrumado" }, { texto: "Inquieto" }, { texto: "Ninguna encaja del todo" }] },
      { tipo: "mensaje", texto: "Repetite esa palabra mentalmente una vez más. Nombrar con precisión ayuda a bajar la intensidad." },
    ], activo: true, version: 1 },

  { id: "cuando-senti-esto-antes", titulo: "¿Cuándo sentí esto antes?", descripcion: "Buscá en tu memoria otra vez que hayas sentido algo parecido, y cómo pasó.",
    objetivo: "Puede ayudarte a recordar que ya atravesaste algo similar.", categoria: "emociones", etiquetas: ["emociones", "memoria"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Buscá un recuerdo, no hace falta que sea idéntico.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Cuándo sentiste algo parecido antes?", placeholder: "Contá brevemente esa otra vez…" },
      { tipo: "escritura", pregunta: "¿Cómo se fue pasando en aquel momento?", placeholder: "¿Qué ayudó, aunque sea un poco?" },
    ], activo: true, version: 1 },

  { id: "mi-emocion-tiene-forma", titulo: "Mi emoción tiene forma", descripcion: "Dale una forma y un color a lo que sentís ahora, sin pensarlo de más.",
    objetivo: "Puede ayudarte a externalizar algo que es difícil poner en palabras.", categoria: "emociones", etiquetas: ["emociones", "cuerpo"],
    duracion: 4, dificultad: "facil", tipo: "visual",
    mensajeInicial: "No hace falta que se entienda. Es sólo para vos.",
    pasos: [{ tipo: "dibujo", texto: "Si tu emoción de ahora tuviera una forma y un color, ¿cómo sería? Dibujala." }], activo: true, version: 1 },

  { id: "el-volumen-de-la-emocion", titulo: "El volumen de la emoción", descripcion: "Imaginá que la intensidad de la emoción es un volumen que podés bajar un poco, sin apagarlo del todo.",
    objetivo: "Puede ayudarte a regular sin la meta imposible de eliminar la emoción por completo.", categoria: "emociones", etiquetas: ["emociones", "regulación"],
    duracion: 3, dificultad: "facil", tipo: "escala",
    mensajeInicial: "No se trata de silenciarla, sólo de bajarle un par de rayitas.",
    pasos: [
      { tipo: "escala", pregunta: "¿En qué volumen está la emoción ahora?", min: 0, max: 10, etiquetaMin: "Apenas se escucha", etiquetaMax: "A todo volumen" },
      { tipo: "respiracion", ciclos: 4, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Exhalá", segundos: 6 }] },
      { tipo: "escala", pregunta: "¿Bajó aunque sea un poco el volumen?", min: 0, max: 10, etiquetaMin: "Igual", etiquetaMax: "Bajó bastante" },
    ], activo: true, version: 1 },

  // ═══════ 💭 PENSAMIENTOS ═══════
  { id: "hecho-o-interpretacion", titulo: "Hecho o interpretación", descripcion: "Distinguí lo que pasó realmente de la lectura que le diste.",
    objetivo: "Puede ayudarte a separar los datos objetivos de las conclusiones que sacaste.", categoria: "pensamientos", etiquetas: ["pensamientos", "distorsiones"],
    duracion: 4, dificultad: "intermedio", tipo: "preguntas",
    mensajeInicial: "Pensá en algo que te haya pasado hoy y te generó una reacción.",
    pasos: [
      { tipo: "escritura", pregunta: "Describí lo que pasó, sólo los hechos (lo que se vio, se dijo, se hizo).", placeholder: "Por ejemplo: 'no me contestó el mensaje en 3 horas'" },
      { tipo: "escritura", pregunta: "Ahora escribí qué interpretación sacaste de eso.", placeholder: "Por ejemplo: 'debe estar enojado conmigo'" },
      { tipo: "mensaje", texto: "El hecho es un dato. La interpretación es una entre varias posibles." },
    ], activo: true, version: 1 },

  { id: "registro-pensamientos", titulo: "Registro de pensamientos", descripcion: "Anotá un pensamiento que te esté dando vueltas.",
    objetivo: "Puede ayudarte a sacarlo de la cabeza y verlo con algo más de distancia.", categoria: "pensamientos", etiquetas: ["pensamientos", "escritura"],
    duracion: 5, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "No hace falta que el pensamiento tenga sentido del todo.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué pensamiento se repite hoy?", placeholder: "Escribilo tal cual aparece en tu cabeza…" },
      { tipo: "escala", pregunta: "¿Cuánto creés en ese pensamiento ahora mismo?", min: 0, max: 10, etiquetaMin: "Nada", etiquetaMax: "Totalmente" },
    ], activo: true, version: 1 },

  { id: "otra-mirada", titulo: "Otra mirada", descripcion: "Buscá una forma alternativa de ver la misma situación.",
    objetivo: "Puede ayudarte a encontrar una interpretación menos rígida.", categoria: "pensamientos", etiquetas: ["pensamientos", "flexibilidad"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Vamos a poner el mismo hecho bajo otra luz.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué situación te gustaría mirar distinto?", placeholder: "Contala brevemente…" },
      { tipo: "escritura", pregunta: "Si un amigo te contara exactamente lo mismo, ¿qué le dirías vos?", placeholder: "A veces somos más comprensivos con otros que con nosotros mismos." },
    ], activo: true, version: 1 },

  { id: "que-esta-bajo-mi-control", titulo: "¿Qué está bajo mi control?", descripcion: "Separá lo que podés influir de lo que no depende de vos.",
    objetivo: "Puede ayudarte a enfocar la energía en lo que sí podés hacer.", categoria: "pensamientos", etiquetas: ["pensamientos", "control"],
    duracion: 5, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Pensá en algo que te esté preocupando.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué parte de esto SÍ está bajo tu control?", placeholder: "Por ejemplo: cómo me preparo, qué digo, cómo reacciono…" },
      { tipo: "escritura", pregunta: "¿Qué parte NO está bajo tu control?", placeholder: "Por ejemplo: la decisión de otra persona, el resultado final…" },
      { tipo: "mensaje", texto: "Enfocar la energía en la primera lista suele aliviar un poco la carga." },
    ], activo: true, version: 1 },

  { id: "preocupacion-o-problema", titulo: "Preocupación o problema", descripcion: "Distinguí si hay algo concreto para resolver, o si es una preocupación que da vueltas.",
    objetivo: "Puede ayudarte a decidir si toca actuar o soltar por ahora.", categoria: "pensamientos", etiquetas: ["pensamientos", "ansiedad"],
    duracion: 5, dificultad: "intermedio", tipo: "preguntas",
    advertencia: "Si este ejercicio te genera malestar significativo, podés detenerlo.",
    mensajeInicial: "Un problema tiene una acción posible ahora. Una preocupación, no.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué te está dando vueltas?", placeholder: "Describilo brevemente…" },
      { tipo: "seleccion", pregunta: "¿Hay algo concreto que podrías hacer AHORA al respecto?", opciones: [{ texto: "Sí, hay una acción posible" }, { texto: "No, no depende de mí ahora" }, { texto: "No estoy seguro" }] },
      { tipo: "mensaje", texto: "Si es un problema con acción posible, ese es el próximo paso. Si es una preocupación, quizás hoy sólo se pueda notar y soltar." },
    ], activo: true, version: 1 },

  { id: "pensamiento-catastrofico", titulo: "¿Me estoy yendo al peor escenario?", descripcion: "Revisá si un pensamiento está saltando directo a la catástrofe.",
    objetivo: "Puede ayudarte a notar cuando un pensamiento se adelanta demasiado.", categoria: "pensamientos", etiquetas: ["pensamientos", "distorsiones"],
    duracion: 4, dificultad: "intermedio", tipo: "preguntas",
    mensajeInicial: "Pensá en algo que te esté preocupando ahora.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Cuál es el pensamiento que te preocupa?", placeholder: "Escribilo tal cual aparece…" },
      { tipo: "seleccion", pregunta: "¿Qué tan probable es que pase exactamente así?", opciones: [{ texto: "Muy probable" }, { texto: "Posible pero poco probable" }, { texto: "Muy poco probable" }] },
      { tipo: "mensaje", texto: "La mente suele imaginar el peor escenario. No siempre es el más probable." },
    ], activo: true, version: 1 },

  { id: "evidencia-a-favor-y-en-contra", titulo: "Evidencia a favor y en contra", descripcion: "Ponele a prueba un pensamiento como si fueras un investigador.",
    objetivo: "Puede ayudarte a chequear qué tan sólido es un pensamiento.", categoria: "pensamientos", etiquetas: ["pensamientos", "distorsiones"],
    duracion: 5, dificultad: "intermedio", tipo: "preguntas",
    mensajeInicial: "Elegí un pensamiento que te esté costando soltar.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Cuál es ese pensamiento?", placeholder: "Por ejemplo: 'no le importo a nadie'" },
      { tipo: "escritura", pregunta: "¿Qué evidencia tenés A FAVOR de ese pensamiento?", placeholder: "Hechos concretos, no sensaciones…" },
      { tipo: "escritura", pregunta: "¿Qué evidencia tenés EN CONTRA?", placeholder: "Hechos que lo contradicen…" },
    ], activo: true, version: 1 },

  { id: "el-peor-el-mejor-el-mas-probable", titulo: "El peor, el mejor y el más probable", descripcion: "Mirá una misma situación desde tres escenarios distintos.",
    objetivo: "Puede ayudarte a equilibrar la balanza cuando sólo ves un desenlace.", categoria: "pensamientos", etiquetas: ["pensamientos", "perspectiva"],
    duracion: 5, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "Pensá en algo incierto que se viene.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Cuál es el PEOR escenario posible?", placeholder: "Sin filtrar…" },
      { tipo: "escritura", pregunta: "¿Cuál es el MEJOR escenario posible?", placeholder: "También sin filtrar…" },
      { tipo: "escritura", pregunta: "¿Cuál te parece el MÁS PROBABLE, en el medio de los dos?", placeholder: "El realista…" },
    ], activo: true, version: 1 },

  { id: "pensar-en-blanco-y-negro", titulo: "¿Todo o nada?", descripcion: "Revisá si un pensamiento está dejando afuera los grises.",
    objetivo: "Puede ayudarte a notar el pensamiento de 'todo o nada'.", categoria: "pensamientos", etiquetas: ["pensamientos", "distorsiones"],
    duracion: 3, dificultad: "intermedio", tipo: "preguntas",
    mensajeInicial: "Fijate si aparecen palabras como 'siempre', 'nunca' o 'todo'.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué pensamiento con 'siempre' o 'nunca' te está dando vueltas?", placeholder: "Por ejemplo: 'siempre arruino todo'" },
      { tipo: "escritura", pregunta: "¿Podés pensar en UNA excepción a eso, aunque sea chica?", placeholder: "Un momento en que no fue así…" },
    ], activo: true, version: 1 },

  { id: "y-si-le-pasara-a-un-amigo", titulo: "¿Y si le pasara a un amigo?", descripcion: "Pedile prestada tu propia compasión, imaginando que esto le pasa a otra persona.",
    objetivo: "Puede ayudarte a ser menos duro con vos mismo.", categoria: "pensamientos", etiquetas: ["pensamientos", "autocompasión"],
    duracion: 4, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "A veces somos más duros con nosotros que con los demás.",
    pasos: [
      { tipo: "escritura", pregunta: "Contá la situación como si le hubiera pasado a un amigo.", placeholder: "'A mi amigo le pasó que…'" },
      { tipo: "escritura", pregunta: "¿Qué le dirías a ese amigo?", placeholder: "Escribí lo que realmente le dirías…" },
    ], activo: true, version: 1 },

  { id: "cuanto-va-a-importar-en-un-ano", titulo: "¿Cuánto va a importar en un año?", descripcion: "Ponele perspectiva de tiempo a algo que hoy pesa mucho.",
    objetivo: "Puede ayudarte a relativizar la urgencia de un problema.", categoria: "pensamientos", etiquetas: ["pensamientos", "perspectiva"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Pensá en lo que te está preocupando hoy.",
    pasos: [
      { tipo: "seleccion", pregunta: "¿Cuánto creés que va a importar esto dentro de un año?", opciones: [{ texto: "Muchísimo" }, { texto: "Algo, pero menos" }, { texto: "Casi nada" }, { texto: "No lo voy a recordar" }] },
      { tipo: "mensaje", texto: "No significa que no importe ahora. Sólo ayuda a ponerlo en tamaño real." },
    ], activo: true, version: 1 },

  { id: "ordenar-mis-prioridades", titulo: "Ordenar mis prioridades", descripcion: "Poné en orden lo que realmente te importa resolver esta semana.",
    objetivo: "Puede ayudarte a decidir por dónde empezar cuando todo parece urgente.", categoria: "pensamientos", etiquetas: ["pensamientos", "organización"],
    duracion: 4, dificultad: "intermedio", tipo: "interactividad",
    mensajeInicial: "Pensá en 4 o 5 cosas que tenés en la cabeza. Vamos a ordenarlas.",
    pasos: [{ tipo: "ordenar", instruccion: "Tocá en el orden de lo más urgente a lo menos urgente para vos hoy.", items: ["Lo que me preocupa más", "Lo que tiene fecha límite", "Lo que puedo resolver rápido", "Lo que puede esperar"] }], activo: true, version: 1 },

  { id: "el-pensamiento-no-es-una-orden", titulo: "El pensamiento no es una orden", descripcion: "Practicá notar un pensamiento sin obedecerlo automáticamente.",
    objetivo: "Puede ayudarte a ganar distancia entre pensar algo y actuar en consecuencia.", categoria: "pensamientos", etiquetas: ["pensamientos", "defusión"],
    duracion: 3, dificultad: "intermedio", tipo: "mindfulness",
    mensajeInicial: "Un pensamiento es sólo una idea que pasa, no una obligación.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué pensamiento te está empujando a hacer algo ahora?", placeholder: "Por ejemplo: 'tengo que revisar el celular'" },
      { tipo: "mensaje", texto: "Probá decirte: 'Estoy teniendo el pensamiento de que...' antes de esa frase. Notá si cambia algo." },
    ], activo: true, version: 1 },

  { id: "distancia-de-un-pensamiento", titulo: "Tomar distancia de un pensamiento", descripcion: "Imaginá el pensamiento como algo externo a vos, no como un hecho.",
    objetivo: "Puede ayudarte a no fusionarte tanto con lo que pensás.", categoria: "pensamientos", etiquetas: ["pensamientos", "defusión"],
    duracion: 3, dificultad: "intermedio", tipo: "visual",
    mensajeInicial: "Imaginá el pensamiento escrito en una hoja que pasa flotando.",
    pasos: [{ tipo: "mensaje", texto: "Imaginá tu pensamiento más molesto escrito en una hoja de papel, flotando en un río que se aleja. No hace falta detenerlo.", duracionSeg: 14 }], activo: true, version: 1 },

  { id: "generalizando-de-mas", titulo: "¿Estoy generalizando de más?", descripcion: "Un mal momento no siempre significa que todo esté mal.",
    objetivo: "Puede ayudarte a notar cuando un hecho puntual se convierte en una regla general.", categoria: "pensamientos", etiquetas: ["pensamientos", "distorsiones"],
    duracion: 3, dificultad: "intermedio", tipo: "preguntas",
    mensajeInicial: "Pensá en algo puntual que salió mal.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué pasó puntualmente?", placeholder: "Un hecho concreto…" },
      { tipo: "escritura", pregunta: "¿Qué regla general sacaste de eso?", placeholder: "Por ejemplo: 'soy un desastre para esto'" },
      { tipo: "mensaje", texto: "Un hecho puntual es un dato. No siempre es una regla." },
    ], activo: true, version: 1 },

  { id: "la-etiqueta-que-me-puse", titulo: "La etiqueta que me puse", descripcion: "Revisá si te estás definiendo entero por un solo error o momento.",
    objetivo: "Puede ayudarte a separar lo que hiciste de quién sos.", categoria: "pensamientos", etiquetas: ["pensamientos", "autocrítica"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "'Me equivoqué' y 'soy un fracaso' no son lo mismo.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué etiqueta te pusiste después de lo que pasó?", placeholder: "Por ejemplo: 'soy un desastre', 'no sirvo para esto'" },
      { tipo: "escritura", pregunta: "¿Qué pasó en realidad, en hechos concretos?", placeholder: "Separá el hecho de la etiqueta…" },
    ], activo: true, version: 1 },

  { id: "tres-explicaciones-posibles", titulo: "Tres explicaciones posibles", descripcion: "Cuando algo te genera dudas, buscá alternativas a la primera interpretación.",
    objetivo: "Puede ayudarte a no quedarte con la primera lectura, que suele ser la más negativa.", categoria: "pensamientos", etiquetas: ["pensamientos", "flexibilidad"],
    duracion: 4, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "Pensá en algo ambiguo que te haya pasado (un mensaje sin responder, un gesto raro).",
    pasos: [{ tipo: "escritura", pregunta: "Escribí tres explicaciones distintas y posibles para lo que pasó.", placeholder: "1. … 2. … 3. … (no elijas todavía cuál es la 'verdadera')" }], activo: true, version: 1 },

  // ═══════ 🪞 AUTOCONOCIMIENTO ═══════
  { id: "que-necesito-hoy", titulo: "¿Qué necesito hoy?", descripcion: "Una pregunta simple para chequear con vos mismo.",
    objetivo: "Puede ayudarte a conectar con lo que necesitás en este momento del día.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento"],
    duracion: 2, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "Sin pensarlo demasiado, ¿qué elegís?",
    pasos: [
      { tipo: "seleccion", pregunta: "¿Qué necesitás hoy, más que nada?", opciones: [{ texto: "Descanso" }, { texto: "Compañía" }, { texto: "Espacio" }, { texto: "Movimiento" }, { texto: "Silencio" }, { texto: "Distracción" }] },
      { tipo: "mensaje", texto: "Guardá esa respuesta. Puede orientarte para el resto del día." },
    ], activo: true, version: 1 },

  { id: "mi-dialogo-interno", titulo: "Mi diálogo interno", descripcion: "Notá cómo te hablás a vos mismo cuando algo sale mal.",
    objetivo: "Puede ayudarte a notar el tono de tu propia voz interior.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "autocrítica"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Pensá en la última vez que te equivocaste en algo.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué te dijiste a vos mismo en ese momento?", placeholder: "Tratá de recordar las palabras exactas…" },
      { tipo: "escritura", pregunta: "¿Le dirías eso mismo a alguien que querés?", placeholder: "Si la respuesta es no, ¿qué le dirías en cambio?" },
    ], activo: true, version: 1 },

  { id: "lo-que-me-da-energia", titulo: "Lo que me da energía", descripcion: "Identificá qué actividades o momentos te recargan.",
    objetivo: "Puede ayudarte a notar patrones sobre lo que te hace bien.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "bienestar"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Pensá en la última semana.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué momento te dejó con más energía que antes?", placeholder: "Puede ser algo chico…" },
      { tipo: "escritura", pregunta: "¿Qué momento te dejó más agotado?", placeholder: "También puede ser algo chico…" },
    ], activo: true, version: 1 },

  { id: "una-pequena-victoria", titulo: "Una pequeña victoria", descripcion: "Reconocé algo que hiciste bien, por chico que parezca.",
    objetivo: "Puede ayudarte a notar logros que suelen pasar desapercibidos.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "logros"],
    duracion: 2, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "No hace falta que sea algo grande.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué hiciste hoy (o esta semana) que podrías reconocerte?", placeholder: "Desde levantarte con ganas hasta terminar algo pendiente…" }],
    activo: true, version: 1 },

  { id: "mi-mejor-version-hoy", titulo: "Mi mejor versión hoy", descripcion: "Imaginá cómo se comportaría tu mejor versión en el resto del día.",
    objetivo: "Puede ayudarte a orientar tus próximas decisiones.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "identidad"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "No hace falta que sea perfecta, sólo un poco mejor.",
    pasos: [{ tipo: "escritura", pregunta: "¿Cómo actuaría tu mejor versión en lo que te queda del día?", placeholder: "Pensá en algo concreto que harías distinto…" }], activo: true, version: 1 },

  { id: "que-me-representa", titulo: "¿Qué me representa?", descripcion: "Elegí algo (un objeto, color o animal) que sientas que te representa hoy.",
    objetivo: "Puede ayudarte a reflexionar sobre tu estado actual de forma indirecta.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "identidad"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "No pienses demasiado, dejá que aparezca lo primero.",
    pasos: [
      { tipo: "escritura", pregunta: "Si fueras un objeto hoy, ¿cuál serías?", placeholder: "Lo primero que se te ocurra…" },
      { tipo: "escritura", pregunta: "¿Por qué ese, y no otro?", placeholder: "…" },
    ], activo: true, version: 1 },

  { id: "mis-disparadores-de-estres", titulo: "Mis disparadores de estrés", descripcion: "Identificá qué situaciones sueles vivir como más estresantes.",
    objetivo: "Puede ayudarte a anticiparte a lo que te desregula.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "estrés"],
    duracion: 4, dificultad: "intermedio", tipo: "seleccion",
    mensajeInicial: "Pensá en patrones, no en un solo día.",
    pasos: [
      { tipo: "seleccion", pregunta: "¿Cuál de estos te genera más estrés habitualmente?", opciones: [{ texto: "Tener poco tiempo" }, { texto: "No saber qué esperar" }, { texto: "Sentirme juzgado" }, { texto: "Tener mucho para decidir" }, { texto: "El desorden" }] },
      { tipo: "escritura", pregunta: "¿Qué te ayudaría a manejar mejor eso la próxima vez?", placeholder: "Algo simple y concreto…" },
    ], activo: true, version: 1 },

  { id: "como-recargo-energia", titulo: "Cómo recargo energía", descripcion: "Hacé una lista rápida de lo que realmente te recarga (no lo que 'deberías' hacer).",
    objetivo: "Puede ayudarte a tener a mano opciones reales para cuando estés bajo.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "energía"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "No pienses en lo ideal, pensá en lo que de verdad funciona con vos.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué tres cosas te recargan de verdad, aunque sean chicas?", placeholder: "Por ejemplo: dormir siesta, hablar con alguien, estar en silencio…" }], activo: true, version: 1 },

  { id: "mi-rol-en-el-conflicto", titulo: "Mi rol en el conflicto", descripcion: "Pensá en cómo sueles reaccionar cuando hay una discusión.",
    objetivo: "Puede ayudarte a notar tu patrón habitual frente al conflicto.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "vínculos"],
    duracion: 4, dificultad: "intermedio", tipo: "seleccion",
    mensajeInicial: "Sin juzgarte, sólo observando.",
    pasos: [
      { tipo: "seleccion", pregunta: "Frente a un conflicto, ¿qué tendés a hacer primero?", opciones: [{ texto: "Evitarlo" }, { texto: "Enfrentarlo de inmediato" }, { texto: "Ceder para que termine" }, { texto: "Necesito tiempo antes de hablar" }] },
      { tipo: "mensaje", texto: "Ningún patrón es 'malo' en sí mismo. Conocerlo te da más opciones." },
    ], activo: true, version: 1 },

  { id: "lo-que-evito-y-por-que", titulo: "Lo que evito y por qué", descripcion: "Pensá en algo que venís postergando y qué hay detrás de esa evitación.",
    objetivo: "Puede ayudarte a entender el motivo real detrás de una postergación.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "procrastinación"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "No hace falta resolverlo ahora, sólo entenderlo un poco más.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué venís evitando hacer?", placeholder: "Algo concreto…" },
      { tipo: "seleccion", pregunta: "¿Qué hay detrás, más probablemente?", opciones: [{ texto: "Miedo a hacerlo mal" }, { texto: "No sé por dónde empezar" }, { texto: "Me aburre" }, { texto: "Me da ansiedad" }] },
    ], activo: true, version: 1 },

  { id: "mis-fortalezas-tres", titulo: "Mis tres fortalezas", descripcion: "Nombrá tres cosas que hacés bien, sin restarles importancia.",
    objetivo: "Puede ayudarte a contrarrestar la tendencia a minimizar lo positivo.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "autoestima"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "No vale decir 'no sé'. Buscá aunque sea algo chico.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué tres cosas hacés bien?", placeholder: "Pueden ser habilidades, formas de tratar a otros, cualidades…" }], activo: true, version: 1 },

  { id: "que-cambiaria-de-mi-rutina", titulo: "¿Qué cambiaría de mi rutina?", descripcion: "Pensá en un ajuste chico que le haría bien a tu día a día.",
    objetivo: "Puede ayudarte a identificar un cambio realista, no una revolución completa.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "rutina"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Pensá en algo chico, no en cambiar todo de una vez.",
    pasos: [{ tipo: "escritura", pregunta: "Si pudieras cambiar una sola cosa de tu rutina esta semana, ¿cuál sería?", placeholder: "Algo realista, no ideal…" }], activo: true, version: 1 },

  { id: "el-momento-mas-yo", titulo: "El momento más 'yo'", descripcion: "Pensá en un momento reciente en el que te sentiste completamente vos mismo.",
    objetivo: "Puede ayudarte a reconectar con quién sos cuando no estás actuando para otros.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "identidad"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Puede ser un momento chico, no necesita ser especial para otros.",
    pasos: [{ tipo: "escritura", pregunta: "¿Cuándo fue la última vez que te sentiste 'muy vos'? ¿Qué estabas haciendo?", placeholder: "…" }], activo: true, version: 1 },

  { id: "mis-senales-de-cansancio", titulo: "Mis señales de cansancio", descripcion: "Identificá cómo se manifiesta tu cansancio antes de llegar al límite.",
    objetivo: "Puede ayudarte a detectar el agotamiento antes de que sea demasiado.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "autocuidado"],
    duracion: 3, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "Pensá en las últimas veces que estuviste muy cansado.",
    pasos: [{ tipo: "seleccion", pregunta: "¿Cómo se nota primero, en tu caso?", opciones: [{ texto: "Me irrito más fácil" }, { texto: "Me cuesta concentrarme" }, { texto: "Quiero estar solo" }, { texto: "Se me acumulan los olvidos" }, { texto: "El cuerpo, directamente" }] }], activo: true, version: 1 },

  { id: "que-necesita-mi-cuerpo-hoy", titulo: "¿Qué necesita mi cuerpo hoy?", descripcion: "Una pausa para chequear con tu cuerpo, no sólo con tu cabeza.",
    objetivo: "Puede ayudarte a no ignorar señales físicas del día a día.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "cuerpo"],
    duracion: 2, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "Hacé una pausa y escaneá rápido tu cuerpo.",
    pasos: [{ tipo: "seleccion", pregunta: "¿Qué necesita tu cuerpo ahora, más que nada?", opciones: [{ texto: "Agua" }, { texto: "Moverse" }, { texto: "Descansar" }, { texto: "Comer" }, { texto: "Estirar" }, { texto: "Nada en particular" }] }], activo: true, version: 1 },

  { id: "una-creencia-sobre-mi-mismo", titulo: "Una creencia sobre mí mismo", descripcion: "Explorá una idea que tenés instalada sobre vos, y de dónde viene.",
    objetivo: "Puede ayudarte a notar creencias que quizás ya no te representan.", categoria: "autoconocimiento", etiquetas: ["autoconocimiento", "creencias"],
    duracion: 5, dificultad: "profundo", tipo: "reflexion",
    mensajeInicial: "No hace falta cambiarla ahora, sólo mirarla de cerca.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué idea tenés instalada sobre vos mismo (buena o mala)?", placeholder: "Por ejemplo: 'soy tímido', 'siempre llego tarde'…" },
      { tipo: "escritura", pregunta: "¿De dónde creés que viene esa idea?", placeholder: "Algo de la infancia, un comentario que se repitió…" },
      { tipo: "escritura", pregunta: "¿Sigue siendo del todo cierta hoy?", placeholder: "…" },
    ], activo: true, version: 1 },

  // ═══════ ✍️ ESCRITURA Y REFLEXIÓN ═══════
  { id: "descarga-mental", titulo: "Descarga mental", descripcion: "Escribí todo lo que tenés en la cabeza, sin ordenarlo.",
    objetivo: "Puede ayudarte a aliviar la sensación de tener demasiado dando vueltas.", categoria: "escritura", etiquetas: ["escritura", "desahogo"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "No hace falta que tenga orden ni sentido. Sólo escribí.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué tenés en la cabeza ahora?", placeholder: "Escribí todo lo que se te ocurra, tal como viene…" }],
    activo: true, version: 1 },

  { id: "carta-que-no-voy-a-enviar", titulo: "Carta que no voy a enviar", descripcion: "Escribile a alguien lo que necesitás decir, sin la intención de enviarlo.",
    objetivo: "Puede ayudarte a poner en palabras algo que quedó sin decir.", categoria: "escritura", etiquetas: ["escritura", "vínculos"],
    duracion: 6, dificultad: "profundo", tipo: "escritura",
    advertencia: "Si este ejercicio te genera malestar significativo, podés detenerlo. No hace falta enviar ni mostrar lo que escribas.",
    mensajeInicial: "Esta carta es sólo para vos. Nadie más la va a leer.",
    pasos: [
      { tipo: "escritura", pregunta: "¿A quién le escribirías?", placeholder: "Un nombre, o simplemente 'a esa persona'…" },
      { tipo: "escritura", pregunta: "Escribile lo que necesites decirle.", placeholder: "Sin filtro. Nadie la va a leer." },
    ], activo: true, version: 1 },

  { id: "tres-cosas-que-agradezco", titulo: "Tres cosas que agradezco", descripcion: "Un momento breve para notar lo que sí está bien.",
    objetivo: "Puede ayudarte a equilibrar la atención hacia lo positivo del día.", categoria: "escritura", etiquetas: ["escritura", "gratitud"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Pueden ser cosas chicas.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué tres cosas agradecés hoy?", placeholder: "1. … 2. … 3. …" }], activo: true, version: 1 },

  { id: "diario-de-tres-minutos", titulo: "Diario de tres minutos", descripcion: "Escribí sin parar durante tres minutos.",
    objetivo: "Puede ayudarte a que las ideas fluyan sin autocensura.", categoria: "escritura", etiquetas: ["escritura", "reflexión"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "No te detengas a corregir. Sólo escribí hasta que se acabe el tiempo.",
    pasos: [
      { tipo: "temporizador", duracionSeg: 180, texto: "Escribí en tu cabeza (o en un papel aparte) todo lo que surja. Este es tu tiempo." },
      { tipo: "escritura", pregunta: "Si querés, resumí acá algo de lo que pensaste.", placeholder: "Opcional…" },
    ], activo: true, version: 1 },

  { id: "carta-a-mi-yo-futuro", titulo: "Carta a mi yo futuro", descripcion: "Escribile a la persona que vas a ser dentro de un año.",
    objetivo: "Puede ayudarte a poner en palabras esperanzas y preocupaciones actuales.", categoria: "escritura", etiquetas: ["escritura", "futuro"],
    duracion: 6, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "No hace falta que sea formal ni perfecta.",
    pasos: [{ tipo: "escritura", pregunta: "Escribile una carta a vos mismo dentro de un año.", placeholder: "Contale cómo estás hoy, qué esperás, qué te gustaría que haya cambiado…" }], activo: true, version: 1 },

  { id: "carta-de-mi-yo-futuro", titulo: "Carta desde mi yo futuro", descripcion: "Imaginá que tu yo de dentro de un año te escribe a vos, hoy.",
    objetivo: "Puede ayudarte a ganar perspectiva sobre lo que estás viviendo ahora.", categoria: "escritura", etiquetas: ["escritura", "perspectiva"],
    duracion: 5, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "Imaginá que ya pasó un año y las cosas se acomodaron un poco.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué te diría tu yo de dentro de un año sobre lo que estás pasando ahora?", placeholder: "Escribilo como si él o ella te hablara…" }], activo: true, version: 1 },

  { id: "lo-que-aprendi-esta-semana", titulo: "Lo que aprendí esta semana", descripcion: "Un repaso corto de algo que te llevás de los últimos días.",
    objetivo: "Puede ayudarte a cerrar la semana con algo más que cansancio.", categoria: "escritura", etiquetas: ["escritura", "reflexión"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Puede ser un aprendizaje chico o grande.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué aprendiste esta semana, de vos o de algo externo?", placeholder: "…" }], activo: true, version: 1 },

  { id: "si-hoy-fuera-distinto", titulo: "Si hoy fuera distinto", descripcion: "Escribí sobre qué harías diferente si pudieras repetir el día de hoy.",
    objetivo: "Puede ayudarte a identificar ajustes concretos para mañana.", categoria: "escritura", etiquetas: ["escritura", "reflexión"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Sin culpa, sólo como ejercicio.",
    pasos: [{ tipo: "escritura", pregunta: "Si pudieras repetir el día de hoy, ¿qué harías distinto?", placeholder: "Algo chico y concreto…" }], activo: true, version: 1 },

  { id: "una-disculpa-que-me-debo", titulo: "Una disculpa que me debo", descripcion: "Escribite una disculpa a vos mismo por algo que fuiste duro con vos.",
    objetivo: "Puede ayudarte a practicar la autocompasión de forma concreta.", categoria: "escritura", etiquetas: ["escritura", "autocompasión"],
    duracion: 4, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "Pensá en un momento en que fuiste muy autoexigente.",
    pasos: [{ tipo: "escritura", pregunta: "Escribite una disculpa por haber sido tan duro con vos mismo en ese momento.", placeholder: "'Perdón por…'" }], activo: true, version: 1 },

  { id: "los-cinco-sentidos-de-hoy", titulo: "Los cinco sentidos de hoy", descripcion: "Registrá algo que notaste hoy con cada uno de tus sentidos.",
    objetivo: "Puede ayudarte a anclarte en detalles concretos del día.", categoria: "escritura", etiquetas: ["escritura", "presente"],
    duracion: 4, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "No hace falta que sea algo especial, sólo real.",
    pasos: [{ tipo: "escritura", pregunta: "Algo que viste, escuchaste, oliste, tocaste o probaste hoy.", placeholder: "Elegí uno o varios sentidos y describí…" }], activo: true, version: 1 },

  { id: "que-le-diria-a-mi-yo-de-hace-un-ano", titulo: "Qué le diría a mi yo de hace un año", descripcion: "Mirá hacia atrás y pensá qué le dirías a quien eras hace un año.",
    objetivo: "Puede ayudarte a notar cuánto cambiaste, aunque no lo notes en el día a día.", categoria: "escritura", etiquetas: ["escritura", "perspectiva"],
    duracion: 4, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Pensá en cómo estabas hace un año, más o menos.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué le dirías a la persona que eras hace un año?", placeholder: "…" }], activo: true, version: 1 },

  { id: "mi-lista-de-quejas", titulo: "Mi lista de quejas", descripcion: "Un espacio sin filtro para descargar todo lo que te molesta ahora.",
    objetivo: "Puede ayudarte a sacar afuera la irritación acumulada.", categoria: "escritura", etiquetas: ["escritura", "desahogo"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Sin filtro, sin buscarle el lado positivo todavía.",
    pasos: [{ tipo: "escritura", pregunta: "¿De qué tenés ganas de quejarte ahora mismo?", placeholder: "Todo lo que se te ocurra, sin editar…" }], activo: true, version: 1 },

  { id: "agradecimiento-a-mi-cuerpo", titulo: "Una carta de agradecimiento a mi cuerpo", descripcion: "Reconocé algo que tu cuerpo hizo por vos, más allá de cómo se ve.",
    objetivo: "Puede ayudarte a cambiar el enfoque de la estética a la función.", categoria: "escritura", etiquetas: ["escritura", "cuerpo"],
    duracion: 4, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "Pensá en lo que tu cuerpo te permite hacer, no en cómo luce.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué le agradecerías a tu cuerpo hoy?", placeholder: "Por ejemplo: haberte sostenido en un mal día, dejarte caminar, abrazar…" }], activo: true, version: 1 },

  { id: "el-dia-en-titulares", titulo: "El día en titulares", descripcion: "Resumí tu día como si fuera una noticia, con un titular corto.",
    objetivo: "Puede ayudarte a sintetizar y tomar distancia con humor.", categoria: "escritura", etiquetas: ["escritura", "reflexión"],
    duracion: 2, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Como si fueras periodista de tu propio día.",
    pasos: [{ tipo: "escritura", pregunta: "Si tu día de hoy fuera una noticia, ¿cuál sería el titular?", placeholder: "Podés usar humor si querés…" }], activo: true, version: 1 },

  { id: "escribir-sin-frenar", titulo: "Escribir sin el botón de borrar", descripcion: "Escribí durante un minuto sin corregir ni releer.",
    objetivo: "Puede ayudarte a dejar salir ideas sin el filtro del perfeccionismo.", categoria: "escritura", etiquetas: ["escritura", "fluidez"],
    duracion: 2, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "No importa si no tiene sentido. La idea es no parar.",
    pasos: [
      { tipo: "temporizador", duracionSeg: 60, texto: "Escribí (en tu cabeza o en un papel aparte) sin parar ni corregir, aunque no tenga sentido." },
      { tipo: "escritura", pregunta: "¿Qué frase o idea te quedó de eso?", placeholder: "Opcional…" },
    ], activo: true, version: 1 },

  { id: "mi-manual-de-instrucciones", titulo: "Mi manual de instrucciones", descripcion: "Escribí cómo te gustaría que te traten cuando estás pasando un mal momento.",
    objetivo: "Puede ayudarte a identificar y después comunicar lo que necesitás.", categoria: "escritura", etiquetas: ["escritura", "vínculos"],
    duracion: 5, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "Pensá en lo que de verdad te ayuda, no en lo que 'debería' ayudar.",
    pasos: [{ tipo: "escritura", pregunta: "Cuando estás mal, ¿qué te ayuda que hagan (o que NO hagan) los demás?", placeholder: "Por ejemplo: 'que me pregunten sin insistir', 'que me dejen espacio'…" }], activo: true, version: 1 },

  // ═══════ 🌙 SUEÑO Y DESCANSO ═══════
  { id: "vaciar-la-cabeza", titulo: "Vaciar la cabeza", descripcion: "Anotá lo pendiente para poder soltarlo antes de dormir.",
    objetivo: "Puede ayudarte a que la mente no siga trabajando a la hora de descansar.", categoria: "sueno", etiquetas: ["sueño", "escritura"],
    duracion: 4, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Escribí lo que tenés pendiente, para no tener que retenerlo en la cabeza.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué tenés pendiente para mañana?", placeholder: "Una lista simple alcanza…" }], activo: true, version: 1 },

  { id: "ritual-de-cierre", titulo: "Ritual de cierre del día", descripcion: "Un recorrido breve para cerrar el día antes de dormir.",
    objetivo: "Puede ayudarte a marcar una transición entre el día y el descanso.", categoria: "sueno", etiquetas: ["sueño", "rutina"],
    duracion: 5, dificultad: "facil", tipo: "mindfulness",
    mensajeInicial: "Bajemos el ritmo, de a poco.",
    pasos: [
      { tipo: "mensaje", texto: "Pensá en algo bueno que haya pasado hoy, por chico que sea.", duracionSeg: 10 },
      { tipo: "mensaje", texto: "Soltá mentalmente lo que no pudiste resolver hoy. Mañana hay más tiempo.", duracionSeg: 10 },
      { tipo: "respiracion", ciclos: 4, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Exhalá", segundos: 6 }] },
    ], activo: true, version: 1 },

  { id: "respiracion-para-desacelerar", titulo: "Respiración para desacelerar", descripcion: "Una respiración con exhalación más larga, útil antes de dormir.",
    objetivo: "Puede ayudarte a bajar el ritmo antes de descansar.", categoria: "sueno", etiquetas: ["sueño", "respiración"],
    duracion: 4, dificultad: "facil", tipo: "respiracion",
    mensajeInicial: "La exhalación va a ser más larga que la inhalación.",
    pasos: [{ tipo: "respiracion", ciclos: 6, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Exhalá", segundos: 7 }] }], activo: true, version: 1 },

  { id: "relajacion-progresiva-corta", titulo: "Relajación progresiva corta", descripcion: "Tensá y soltá distintos grupos musculares para bajar la activación del cuerpo.",
    objetivo: "Puede ayudarte a liberar tensión física acumulada antes de dormir.", categoria: "sueno", etiquetas: ["sueño", "cuerpo"],
    duracion: 5, dificultad: "facil", tipo: "relajacion",
    mensajeInicial: "Si podés, hacé este ejercicio ya acostado.",
    pasos: [
      { tipo: "mensaje", texto: "Apretá los puños con fuerza 5 segundos y soltá. Notá la diferencia.", duracionSeg: 10 },
      { tipo: "mensaje", texto: "Ahora tensá los hombros hacia las orejas y soltá.", duracionSeg: 10 },
      { tipo: "mensaje", texto: "Por último, apretá los dedos de los pies y soltá.", duracionSeg: 10 },
    ], activo: true, version: 1 },

  { id: "escaneo-corporal-para-dormir", titulo: "Escaneo corporal para dormir", descripcion: "Un recorrido lento por el cuerpo para soltar tensión antes de descansar.",
    objetivo: "Puede ayudarte a bajar el nivel de alerta física antes de dormir.", categoria: "sueno", etiquetas: ["sueño", "cuerpo"],
    duracion: 5, dificultad: "facil", tipo: "mindfulness",
    mensajeInicial: "Acostate cómodo antes de empezar.",
    pasos: [
      { tipo: "mensaje", texto: "Llevá la atención a los pies. Sin cambiar nada, sólo notá cómo están.", duracionSeg: 12 },
      { tipo: "mensaje", texto: "Subí la atención a las piernas y la panza. Aflojá lo que puedas.", duracionSeg: 12 },
      { tipo: "mensaje", texto: "Por último, notá los hombros, el cuello y la cara. Soltá la mandíbula.", duracionSeg: 12 },
    ], activo: true, version: 1 },

  { id: "lista-de-manana", titulo: "Lista para mañana", descripcion: "Anotá lo esencial de mañana para no tener que retenerlo mientras intentás dormir.",
    objetivo: "Puede ayudarte a evitar que la cabeza siga 'organizando' en la cama.", categoria: "sueno", etiquetas: ["sueño", "organización"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Hacelo antes de acostarte, si podés.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué es lo esencial que tenés que hacer mañana?", placeholder: "Una lista corta alcanza…" }], activo: true, version: 1 },

  { id: "conteo-regresivo-para-dormir", titulo: "Conteo regresivo para dormir", descripcion: "Una cuenta regresiva lenta acompañada de respiración.",
    objetivo: "Puede ayudarte a darle a la mente algo simple en qué enfocarse.", categoria: "sueno", etiquetas: ["sueño", "respiración"],
    duracion: 3, dificultad: "facil", tipo: "respiracion",
    mensajeInicial: "Contá mentalmente hacia atrás con cada respiración.",
    pasos: [{ tipo: "respiracion", ciclos: 8, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Exhalá", segundos: 6 }] }], activo: true, version: 1 },

  { id: "cerrar-las-pestanas-mentales", titulo: "Cerrar las pestañas mentales", descripcion: "Una metáfora simple para ir cerrando temas abiertos en la cabeza antes de dormir.",
    objetivo: "Puede ayudarte a sentir que el día 'se cierra' antes de descansar.", categoria: "sueno", etiquetas: ["sueño", "cierre"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Como si tu mente tuviera pestañas abiertas, como un navegador.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué 'pestañas' tenés abiertas en la cabeza ahora?", placeholder: "Temas, pendientes, preocupaciones…" },
      { tipo: "mensaje", texto: "Imaginá que las vas cerrando una por una. No hace falta resolverlas, sólo cerrarlas por hoy." },
    ], activo: true, version: 1 },

  { id: "gratitud-antes-de-dormir", titulo: "Gratitud antes de dormir", descripcion: "Cerrá el día notando algo bueno, por chico que sea.",
    objetivo: "Puede ayudarte a que el último pensamiento del día no sea uno negativo.", categoria: "sueno", etiquetas: ["sueño", "gratitud"],
    duracion: 2, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "No hace falta que sea algo grande.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué cosa buena, por chica que sea, pasó hoy?", placeholder: "…" }], activo: true, version: 1 },

  { id: "aflojar-la-mandibula", titulo: "Aflojar la mandíbula", descripcion: "Un chequeo rápido de tensión en la cara y la mandíbula antes de dormir.",
    objetivo: "Puede ayudarte a notar tensión que solemos cargar sin darnos cuenta.", categoria: "sueno", etiquetas: ["sueño", "cuerpo"],
    duracion: 2, dificultad: "facil", tipo: "relajacion",
    mensajeInicial: "Muchas veces apretamos la mandíbula sin notarlo.",
    pasos: [{ tipo: "mensaje", texto: "Separá un poco los dientes, dejá caer la mandíbula y aflojá la lengua. Quedate así unos segundos.", duracionSeg: 15 }], activo: true, version: 1 },

  { id: "de-la-pantalla-al-descanso", titulo: "De la pantalla al descanso", descripcion: "Una transición breve entre el uso de pantallas y el momento de dormir.",
    objetivo: "Puede ayudarte a marcar un corte antes de acostarte.", categoria: "sueno", etiquetas: ["sueño", "rutina"],
    duracion: 2, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Este es un buen momento para dejar el celular a un lado.",
    pasos: [{ tipo: "mensaje", texto: "Si podés, dejá el celular fuera de alcance ahora. Los próximos minutos son sólo para desconectar.", duracionSeg: 8 }], activo: true, version: 1 },

  { id: "una-preocupacion-para-manana", titulo: "Una preocupación, para mañana", descripcion: "Anotá una preocupación y date permiso de retomarla recién mañana.",
    objetivo: "Puede ayudarte a posponer conscientemente algo que no podés resolver ahora.", categoria: "sueno", etiquetas: ["sueño", "preocupación"],
    duracion: 3, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "No se trata de ignorarla, sino de posponerla a un horario mejor.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué preocupación te gustaría dejar anotada para retomar recién mañana?", placeholder: "Escribila, y date permiso de soltarla por hoy…" }], activo: true, version: 1 },

  { id: "respiracion-caja", titulo: "Respiración caja", descripcion: "Una técnica con cuatro tiempos iguales para bajar la activación antes de dormir.",
    objetivo: "Puede ayudarte a regular el sistema nervioso con un patrón simple de recordar.", categoria: "sueno", etiquetas: ["sueño", "respiración"],
    duracion: 3, dificultad: "facil", tipo: "respiracion",
    mensajeInicial: "Inhalá, sostené, exhalá y sostené, todo por el mismo tiempo.",
    pasos: [{ tipo: "respiracion", ciclos: 5, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Sostené", segundos: 4 }, { nombre: "Exhalá", segundos: 4 }, { nombre: "Sostené", segundos: 4 }] }], activo: true, version: 1 },

  { id: "visualizar-un-lugar-tranquilo", titulo: "Visualizar un lugar tranquilo", descripcion: "Imaginá con detalle un lugar donde te sentís en paz.",
    objetivo: "Puede ayudarte a inducir calma a través de la imaginación.", categoria: "sueno", etiquetas: ["sueño", "visualización"],
    duracion: 4, dificultad: "facil", tipo: "mindfulness",
    mensajeInicial: "Puede ser un lugar real o inventado.",
    pasos: [
      { tipo: "mensaje", texto: "Elegí un lugar donde te sentís tranquilo. Imaginá qué ves ahí.", duracionSeg: 12 },
      { tipo: "mensaje", texto: "Ahora imaginá qué sonidos habría, y qué temperatura sentirías.", duracionSeg: 12 },
    ], activo: true, version: 1 },

  { id: "notas-para-mi-yo-de-manana", titulo: "Una nota para mi yo de mañana", descripcion: "Dejate un mensaje corto y amable para cuando te despiertes.",
    objetivo: "Puede ayudarte a empezar el día siguiente con algo amable, en vez de exigencia.", categoria: "sueno", etiquetas: ["sueño", "autocompasión"],
    duracion: 2, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Como si le dejaras una nota a alguien que querés.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué mensaje corto le dejarías a tu yo de mañana?", placeholder: "Algo amable y simple…" }], activo: true, version: 1 },

  // ═══════ 🧠 ATENCIÓN Y CONCENTRACIÓN ═══════
  { id: "atencion-plena-un-minuto", titulo: "Atención plena de un minuto", descripcion: "Un minuto de atención completa a la respiración.",
    objetivo: "Puede ayudarte a entrenar la vuelta de la atención cuando se dispersa.", categoria: "atencion", etiquetas: ["atención", "mindfulness"],
    duracion: 1, dificultad: "facil", tipo: "mindfulness",
    mensajeInicial: "Cuando la mente se vaya, simplemente traela de vuelta. Es parte del ejercicio.",
    pasos: [{ tipo: "temporizador", duracionSeg: 60, texto: "Prestá atención sólo a tu respiración." }], activo: true, version: 1 },

  { id: "observacion-consciente", titulo: "Observación consciente", descripcion: "Elegí un objeto cercano y observalo con atención total.",
    objetivo: "Puede ayudarte a entrenar la atención sostenida.", categoria: "atencion", etiquetas: ["atención", "mindfulness"],
    duracion: 3, dificultad: "facil", tipo: "mindfulness",
    mensajeInicial: "Elegí cualquier objeto que tengas cerca.",
    pasos: [
      { tipo: "mensaje", texto: "Observá su forma, como si nunca lo hubieras visto.", duracionSeg: 12 },
      { tipo: "mensaje", texto: "Notá su color, sus texturas, los detalles pequeños.", duracionSeg: 12 },
      { tipo: "mensaje", texto: "Si la mente se va a otra cosa, volvé a mirar el objeto.", duracionSeg: 10 },
    ], activo: true, version: 1 },

  { id: "foco-en-una-tarea", titulo: "Foco en una tarea", descripcion: "Un bloque breve de concentración en una sola cosa, sin distracciones.",
    objetivo: "Puede ayudarte a entrar en un estado de foco antes de una tarea.", categoria: "atencion", etiquetas: ["atención", "concentración"],
    duracion: 5, dificultad: "intermedio", tipo: "interactividad",
    mensajeInicial: "Elegí la tarea que vas a hacer apenas termine este bloque, y dejá el celular lejos.",
    pasos: [{ tipo: "temporizador", duracionSeg: 300, texto: "Este tiempo es sólo para una cosa. Cuando termine, arrancá con esa tarea." }], activo: true, version: 1 },

  { id: "cuenta-hacia-atras-de-7-en-7", titulo: "Contar hacia atrás de 7 en 7", descripcion: "Un ejercicio mental simple para anclar la atención en una tarea concreta.",
    objetivo: "Puede ayudarte a cortar con pensamientos en bucle usando concentración activa.", categoria: "atencion", etiquetas: ["atención", "concentración"],
    duracion: 2, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Elegí un número de tres cifras y restá de a 7.",
    pasos: [{ tipo: "temporizador", duracionSeg: 60, texto: "Elegí un número (por ejemplo 100) y andá restando 7 mentalmente: 100, 93, 86… seguí mientras dure el tiempo." }], activo: true, version: 1 },

  { id: "un-sentido-a-la-vez", titulo: "Un sentido a la vez", descripcion: "Recorré tus sentidos de a uno, dedicándole toda la atención a cada uno.",
    objetivo: "Puede ayudarte a entrenar el cambio voluntario de foco atencional.", categoria: "atencion", etiquetas: ["atención", "sentidos"],
    duracion: 3, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Vamos a ir sentido por sentido, sin apurar.",
    pasos: [
      { tipo: "mensaje", texto: "Sólo la vista: mirá todo lo que puedas de tu alrededor.", duracionSeg: 15 },
      { tipo: "mensaje", texto: "Ahora sólo el oído: escuchá todo lo que puedas.", duracionSeg: 15 },
      { tipo: "mensaje", texto: "Por último, sólo el tacto: notá la textura de algo que tengas cerca.", duracionSeg: 15 },
    ], activo: true, version: 1 },

  { id: "leer-sin-que-la-mente-se-vaya", titulo: "Leer sin que la mente se vaya", descripcion: "Leé un párrafo cualquiera prestando atención total, sin distraerte.",
    objetivo: "Puede ayudarte a notar cuántas veces se dispersa tu atención al leer.", categoria: "atencion", etiquetas: ["atención", "concentración"],
    duracion: 3, dificultad: "intermedio", tipo: "interactividad",
    mensajeInicial: "Elegí cualquier texto que tengas a mano.",
    pasos: [
      { tipo: "temporizador", duracionSeg: 90, texto: "Leé un texto cualquiera prestando atención total. Si la mente se va, notalo y volvé al texto." },
      { tipo: "escala", pregunta: "¿Cuántas veces notaste que la mente se fue?", min: 0, max: 10, etiquetaMin: "Ninguna", etiquetaMax: "Muchísimas" },
    ], activo: true, version: 1 },

  { id: "el-abecedario-de-una-categoria", titulo: "El abecedario de una categoría", descripcion: "Nombrá mentalmente una palabra de una categoría para cada letra del abecedario.",
    objetivo: "Puede ayudarte a mantener la mente enfocada en una sola tarea activa.", categoria: "atencion", etiquetas: ["atención", "concentración"],
    duracion: 3, dificultad: "intermedio", tipo: "interactividad",
    mensajeInicial: "Elegí una categoría: animales, comidas, países…",
    pasos: [{ tipo: "temporizador", duracionSeg: 90, texto: "Elegí una categoría y andá nombrando una palabra por cada letra del abecedario, mentalmente o en voz alta." }], activo: true, version: 1 },

  { id: "un-bloque-sin-multitarea", titulo: "Un bloque sin multitarea", descripcion: "Comprometete a hacer una sola cosa durante un rato corto, sin cambiar de tarea.",
    objetivo: "Puede ayudarte a notar cuánto cambiás de tarea sin darte cuenta.", categoria: "atencion", etiquetas: ["atención", "concentración"],
    duracion: 5, dificultad: "intermedio", tipo: "interactividad",
    mensajeInicial: "Elegí una sola tarea y dejá todo lo demás cerrado o silenciado.",
    pasos: [
      { tipo: "temporizador", duracionSeg: 300, texto: "Hacé sólo esa tarea. Si aparece el impulso de cambiar, notalo y volvé." },
      { tipo: "escritura", pregunta: "¿Cuántas veces tuviste el impulso de cambiar de tarea?", placeholder: "Un número aproximado alcanza…" },
    ], activo: true, version: 1 },

  { id: "atencion-selectiva-al-ruido", titulo: "Atención selectiva al ruido", descripcion: "Elegí un sonido de fondo y prestale atención total, ignorando el resto.",
    objetivo: "Puede ayudarte a entrenar el foco en medio de estímulos que compiten.", categoria: "atencion", etiquetas: ["atención", "concentración"],
    duracion: 3, dificultad: "intermedio", tipo: "interactividad",
    mensajeInicial: "Elegí un sonido de fondo (el tráfico, un ventilador, voces lejanas).",
    pasos: [{ tipo: "temporizador", duracionSeg: 60, texto: "Prestale atención total a ese único sonido, dejando pasar el resto." }], activo: true, version: 1 },

  { id: "foco-visual-en-un-punto", titulo: "Foco visual en un punto", descripcion: "Fijá la mirada en un punto fijo y sostené la atención ahí.",
    objetivo: "Puede ayudarte a entrenar la atención sostenida a nivel visual.", categoria: "atencion", etiquetas: ["atención", "concentración"],
    duracion: 2, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Elegí un punto fijo en la pared o en un objeto.",
    pasos: [{ tipo: "temporizador", duracionSeg: 45, texto: "Mirá ese punto sin moverte. Cuando la mente se distraiga, volvé la mirada y la atención al punto." }], activo: true, version: 1 },

  { id: "escuchar-musica-con-atencion-total", titulo: "Escuchar música con atención total", descripcion: "Elegí una canción y escuchala de principio a fin sin hacer nada más.",
    objetivo: "Puede ayudarte a entrenar la escucha activa y sostenida.", categoria: "atencion", etiquetas: ["atención", "concentración"],
    duracion: 4, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Nada de celular ni otra pantalla mientras escuchás.",
    pasos: [{ tipo: "mensaje", texto: "Poné una canción y escuchala completa, prestando atención a los instrumentos, la letra o el ritmo, sin hacer otra cosa.", duracionSeg: 20 }], activo: true, version: 1 },

  { id: "el-semaforo-de-mi-atencion", titulo: "El semáforo de mi atención", descripcion: "Chequeá qué tan disponible está tu atención ahora mismo.",
    objetivo: "Puede ayudarte a decidir si es buen momento para una tarea que requiere foco.", categoria: "atencion", etiquetas: ["atención", "autoconocimiento"],
    duracion: 2, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "Sin exigirte, sólo chequeando.",
    pasos: [{ tipo: "seleccion", pregunta: "¿Cómo está tu capacidad de concentración ahora?", opciones: [{ emoji: "🟢", texto: "Verde — puedo enfocarme bien" }, { emoji: "🟡", texto: "Amarillo — a medias" }, { emoji: "🔴", texto: "Rojo — muy disperso" }] }], activo: true, version: 1 },

  { id: "recordar-la-lista", titulo: "Recordar la lista", descripcion: "Un ejercicio breve de memoria a corto plazo para entrenar la atención.",
    objetivo: "Puede ayudarte a entrenar la memoria de trabajo.", categoria: "atencion", etiquetas: ["atención", "memoria"],
    duracion: 2, dificultad: "intermedio", tipo: "interactividad",
    mensajeInicial: "Vas a armar una lista mental de 5 objetos.",
    pasos: [
      { tipo: "mensaje", texto: "Pensá 5 objetos cualquiera y repetilos mentalmente 3 veces.", duracionSeg: 20 },
      { tipo: "escritura", pregunta: "Sin mirar atrás, escribí los 5 objetos que elegiste.", placeholder: "…" },
    ], activo: true, version: 1 },

  { id: "contar-objetos-de-un-color", titulo: "Contar objetos de un color", descripcion: "Elegí un color y contá cuántos objetos de ese color ves a tu alrededor.",
    objetivo: "Puede ayudarte a entrenar la atención visual dirigida.", categoria: "atencion", etiquetas: ["atención", "concentración"],
    duracion: 2, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Elegí un color antes de mirar a tu alrededor.",
    pasos: [{ tipo: "escritura", pregunta: "Elegí un color y contá cuántos objetos de ese color ves. ¿Cuántos encontraste?", placeholder: "Un número, y si querés cuáles eran…" }], activo: true, version: 1 },

  { id: "ordenar-mi-foco", titulo: "Ordenar mi foco", descripcion: "Ordená distintas actividades según cuánta concentración te piden.",
    objetivo: "Puede ayudarte a planificar mejor cuándo hacer qué, según tu nivel de energía atencional.", categoria: "atencion", etiquetas: ["atención", "organización"],
    duracion: 3, dificultad: "intermedio", tipo: "interactividad",
    mensajeInicial: "Pensá en lo que tenés para hacer hoy.",
    pasos: [{ tipo: "ordenar", instruccion: "Ordená estas de la que más concentración pide a la que menos.", items: ["Una tarea nueva y compleja", "Responder mensajes", "Una tarea repetitiva y conocida", "Organizar o limpiar algo"] }], activo: true, version: 1 },

  // ═══════ 🌱 HÁBITOS Y BIENESTAR ═══════
  { id: "un-habito-a-la-vez", titulo: "Un hábito a la vez", descripcion: "Elegí un único hábito chico para esta semana.",
    objetivo: "Puede ayudarte a evitar la sobrecarga de proponerte demasiado a la vez.", categoria: "habitos", etiquetas: ["hábitos", "bienestar"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Mejor un cambio chico y sostenible que muchos a la vez.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué hábito chico te gustaría sostener esta semana?", placeholder: "Por ejemplo: tomar agua al despertar, salir a caminar 10 minutos…" },
      { tipo: "mensaje", texto: "No hace falta que sea perfecto todos los días. Alcanza con volver a intentarlo." },
    ], activo: true, version: 1 },

  { id: "revisar-mi-semana", titulo: "Revisar mi semana", descripcion: "Un repaso breve de cómo viene la semana.",
    objetivo: "Puede ayudarte a notar patrones antes de que termine la semana.", categoria: "habitos", etiquetas: ["hábitos", "reflexión"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Sin juzgar, sólo observando.",
    pasos: [
      { tipo: "escala", pregunta: "En general, ¿cómo viene esta semana?", min: 0, max: 10, etiquetaMin: "Muy difícil", etiquetaMax: "Muy buena" },
      { tipo: "escritura", pregunta: "¿Qué te gustaría que sea distinto la semana que viene?", placeholder: "Puede ser algo chico…" },
    ], activo: true, version: 1 },

  { id: "habito-y-senal", titulo: "El hábito y su señal", descripcion: "Identificá qué momento del día podría disparar un nuevo hábito.",
    objetivo: "Puede ayudarte a enganchar un hábito nuevo a algo que ya hacés.", categoria: "habitos", etiquetas: ["hábitos", "rutina"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Los hábitos se sostienen mejor cuando están 'enganchados' a otra rutina.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué hábito te gustaría empezar a sostener?", placeholder: "…" },
      { tipo: "escritura", pregunta: "¿Después de qué cosa que ya hacés todos los días podrías hacerlo?", placeholder: "Por ejemplo: 'después de lavarme los dientes'" },
    ], activo: true, version: 1 },

  { id: "mi-obstaculo-mas-comun", titulo: "Mi obstáculo más común", descripcion: "Identificá qué suele frenarte cuando intentás sostener un hábito.",
    objetivo: "Puede ayudarte a anticipar la barrera más probable.", categoria: "habitos", etiquetas: ["hábitos", "obstáculos"],
    duracion: 3, dificultad: "intermedio", tipo: "seleccion",
    mensajeInicial: "Pensá en hábitos que intentaste sostener antes.",
    pasos: [
      { tipo: "seleccion", pregunta: "¿Qué es lo que más te suele frenar?", opciones: [{ texto: "El cansancio" }, { texto: "Olvidarme" }, { texto: "Falta de tiempo" }, { texto: "Perder la motivación" }, { texto: "No ver resultados rápido" }] },
      { tipo: "mensaje", texto: "Conocer tu obstáculo típico te ayuda a diseñar un plan más realista." },
    ], activo: true, version: 1 },

  { id: "reducir-antes-de-agregar", titulo: "Reducir antes de agregar", descripcion: "Antes de sumar un hábito nuevo, pensá si hay algo que podrías sacar.",
    objetivo: "Puede ayudarte a evitar la sobrecarga de agregar cosas sin restar otras.", categoria: "habitos", etiquetas: ["hábitos", "simplicidad"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "A veces cambiar es más sobre restar que sobre sumar.",
    pasos: [{ tipo: "escritura", pregunta: "¿Hay algo que podrías sacar de tu rutina para tener más espacio?", placeholder: "…" }], activo: true, version: 1 },

  { id: "el-habito-de-5-minutos", titulo: "El hábito de 5 minutos", descripcion: "Reducí un hábito que querés sostener a su versión de sólo 5 minutos.",
    objetivo: "Puede ayudarte a bajar la barrera de entrada de un hábito difícil de sostener.", categoria: "habitos", etiquetas: ["hábitos", "constancia"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Mejor 5 minutos reales que una hora ideal que nunca pasa.",
    pasos: [{ tipo: "escritura", pregunta: "¿Cómo sería la versión de 5 minutos de ese hábito que querés sostener?", placeholder: "Por ejemplo: 'leer una página' en vez de 'leer un capítulo'" }], activo: true, version: 1 },

  { id: "trackear-sin-presionar", titulo: "Trackear sin presionar", descripcion: "Registrá cómo te fue con un hábito esta semana, sin autoexigencia.",
    objetivo: "Puede ayudarte a mirar tu constancia con curiosidad en vez de con crítica.", categoria: "habitos", etiquetas: ["hábitos", "seguimiento"],
    duracion: 3, dificultad: "facil", tipo: "escala",
    mensajeInicial: "No se trata de ser perfecto, sólo de mirar el patrón.",
    pasos: [
      { tipo: "escala", pregunta: "¿Cuántos días de la semana sostuviste el hábito que te propusiste?", min: 0, max: 7, etiquetaMin: "Ninguno", etiquetaMax: "Todos" },
      { tipo: "mensaje", texto: "Cualquier número está bien. Lo importante es seguir intentándolo." },
    ], activo: true, version: 1 },

  { id: "que-rutina-me-sostiene", titulo: "¿Qué rutina me sostiene?", descripcion: "Identificá una rutina que ya tenés y que te hace bien, aunque no la valores tanto.",
    objetivo: "Puede ayudarte a reconocer lo que ya funciona antes de sumar cosas nuevas.", categoria: "habitos", etiquetas: ["hábitos", "reconocimiento"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "A veces damos por sentado lo que ya funciona bien.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué rutina o hábito que ya tenés te sostiene más de lo que reconocés?", placeholder: "…" }], activo: true, version: 1 },

  { id: "habito-que-quiero-soltar", titulo: "Un hábito que quiero soltar", descripcion: "Pensá en un hábito que te gustaría reducir, y qué lo reemplazaría.",
    objetivo: "Puede ayudarte a pensar en reemplazos, no sólo en prohibiciones.", categoria: "habitos", etiquetas: ["hábitos", "cambio"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Es más fácil reemplazar un hábito que simplemente eliminarlo.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué hábito te gustaría reducir?", placeholder: "…" },
      { tipo: "escritura", pregunta: "¿Con qué otra cosa podrías reemplazarlo en ese mismo momento del día?", placeholder: "…" },
    ], activo: true, version: 1 },

  { id: "version-mas-facil-del-habito", titulo: "La versión más fácil", descripcion: "Encontrá la manera más simple posible de empezar un hábito hoy mismo.",
    objetivo: "Puede ayudarte a arrancar aunque el día no esté ideal.", categoria: "habitos", etiquetas: ["hábitos", "simplicidad"],
    duracion: 2, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "No hace falta hacerlo perfecto, sólo hacerlo.",
    pasos: [{ tipo: "escritura", pregunta: "¿Cuál es la versión MÁS fácil posible de un hábito que querés sostener hoy?", placeholder: "Por ejemplo: en vez de entrenar 40 min, hacer 3 sentadillas" }], activo: true, version: 1 },

  { id: "celebrar-lo-que-si-hice", titulo: "Celebrar lo que sí hice", descripcion: "Reconocé lo que lograste sostener esta semana, aunque sea parcial.",
    objetivo: "Puede ayudarte a reforzar el progreso en vez de sólo notar lo que faltó.", categoria: "habitos", etiquetas: ["hábitos", "motivación"],
    duracion: 2, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Buscá algo, aunque sea chico.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué lograste sostener esta semana, aunque sea en parte?", placeholder: "…" }], activo: true, version: 1 },

  { id: "mi-entorno-y-mis-habitos", titulo: "Mi entorno y mis hábitos", descripcion: "Pensá cómo tu espacio físico ayuda o dificulta un hábito.",
    objetivo: "Puede ayudarte a ajustar el entorno en vez de depender sólo de la fuerza de voluntad.", categoria: "habitos", etiquetas: ["hábitos", "entorno"],
    duracion: 3, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "A veces el entorno pesa más que la motivación.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué cambio chico en tu espacio haría más fácil sostener ese hábito?", placeholder: "Por ejemplo: dejar las zapatillas a la vista para salir a caminar" }], activo: true, version: 1 },

  { id: "el-habito-los-fines-de-semana", titulo: "El hábito los fines de semana", descripcion: "Pensá cómo adaptar un hábito cuando cambia tu rutina habitual.",
    objetivo: "Puede ayudarte a no perder el hábito por completo cuando cambia el contexto.", categoria: "habitos", etiquetas: ["hábitos", "flexibilidad"],
    duracion: 3, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Los fines de semana suelen romper rutinas armadas para la semana.",
    pasos: [{ tipo: "escritura", pregunta: "¿Cómo sería una versión de ese hábito que funcione también el fin de semana?", placeholder: "…" }], activo: true, version: 1 },

  { id: "plan-b-para-dias-dificiles", titulo: "Plan B para los días difíciles", descripcion: "Diseñá con anticipación una versión mínima de tu hábito para los días malos.",
    objetivo: "Puede ayudarte a no abandonar del todo en los días complicados.", categoria: "habitos", etiquetas: ["hábitos", "constancia"],
    duracion: 3, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "No todos los días van a ser iguales, y está bien.",
    pasos: [{ tipo: "escritura", pregunta: "En un día muy difícil, ¿cuál sería la versión mínima de tu hábito que igual podrías cumplir?", placeholder: "…" }], activo: true, version: 1 },

  // ═══════ 🤝 VÍNCULOS ═══════
  { id: "gratitud-hacia-alguien", titulo: "Gratitud hacia alguien", descripcion: "Pensá en una persona a la que te gustaría agradecerle algo.",
    objetivo: "Puede ayudarte a poner en palabras un vínculo que valorás.", categoria: "vinculos", etiquetas: ["vínculos", "gratitud"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "No hace falta enviarlo, aunque podés hacerlo si querés.",
    pasos: [{ tipo: "escritura", pregunta: "¿A quién le agradecerías algo hoy, y por qué?", placeholder: "Podés escribirlo como si se lo estuvieras diciendo…" }], activo: true, version: 1 },

  { id: "pedir-lo-que-necesito", titulo: "Pedir lo que necesito", descripcion: "Practicá cómo pondrías en palabras un pedido que venís postergando.",
    objetivo: "Puede ayudarte a animarte a decirlo.", categoria: "vinculos", etiquetas: ["vínculos", "comunicación"],
    duracion: 4, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "Pensá en algo que necesitás pedirle a alguien.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué necesitás pedir, y a quién?", placeholder: "Escribilo tal como se lo dirías…" },
      { tipo: "mensaje", texto: "Ponerlo en palabras primero, aunque sea acá, hace más fácil decirlo después." },
    ], activo: true, version: 1 },

  { id: "escuchar-sin-preparar-la-respuesta", titulo: "Escuchar sin preparar la respuesta", descripcion: "Practicá mentalmente cómo sería escuchar a alguien sin pensar qué vas a decir después.",
    objetivo: "Puede ayudarte a mejorar la calidad de la escucha en tus vínculos.", categoria: "vinculos", etiquetas: ["vínculos", "comunicación"],
    duracion: 3, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Pensá en la última conversación en la que sentiste que no escuchaste del todo.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué te distrajo de escuchar realmente en esa conversación?", placeholder: "Por ejemplo: estaba pensando en qué responder…" }], activo: true, version: 1 },

  { id: "un-limite-que-necesito-poner", titulo: "Un límite que necesito poner", descripcion: "Pensá en un límite que venís postergando poner con alguien.",
    objetivo: "Puede ayudarte a identificarlo antes de animarte a comunicarlo.", categoria: "vinculos", etiquetas: ["vínculos", "límites"],
    duracion: 4, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "No hace falta decirlo hoy, sólo identificarlo.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué límite necesitás poner, y con quién?", placeholder: "…" },
      { tipo: "escritura", pregunta: "¿Cómo lo dirías, en pocas palabras?", placeholder: "Probá una frase simple y directa…" },
    ], activo: true, version: 1 },

  { id: "reparar-despues-de-una-discusion", titulo: "Reparar después de una discusión", descripcion: "Pensá en un paso posible para reconectar después de un conflicto.",
    objetivo: "Puede ayudarte a dar el primer paso hacia la reparación de un vínculo.", categoria: "vinculos", etiquetas: ["vínculos", "conflicto"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    advertencia: "Si la situación involucra maltrato o abuso, este ejercicio no lo reemplaza: buscá apoyo profesional.",
    mensajeInicial: "Pensá en una discusión reciente que te dejó incómodo.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué paso chico podrías dar para acercarte de nuevo a esa persona?", placeholder: "No hace falta resolver todo, sólo un primer paso…" }], activo: true, version: 1 },

  { id: "lo-que-no-dije-y-queria-decir", titulo: "Lo que no dije y quería decir", descripcion: "Escribí algo que te quedó sin decir en una conversación reciente.",
    objetivo: "Puede ayudarte a identificar algo pendiente de comunicar.", categoria: "vinculos", etiquetas: ["vínculos", "comunicación"],
    duracion: 4, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "No hace falta decirlo después, sólo ponerlo en palabras acá.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué te quedó sin decir en alguna conversación reciente?", placeholder: "…" }], activo: true, version: 1 },

  { id: "el-vinculo-que-quiero-cuidar", titulo: "El vínculo que quiero cuidar", descripcion: "Elegí un vínculo importante y pensá en un gesto concreto para cuidarlo.",
    objetivo: "Puede ayudarte a priorizar activamente una relación que te importa.", categoria: "vinculos", etiquetas: ["vínculos", "cuidado"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Pensá en alguien que te importa y con quien te gustaría estar más presente.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué gesto chico y concreto podrías hacer esta semana por ese vínculo?", placeholder: "Por ejemplo: llamarlo, preguntarle algo puntual, hacer un plan…" }], activo: true, version: 1 },

  { id: "pedir-perdon-bien-hecho", titulo: "Pedir perdón bien hecho", descripcion: "Pensá cómo sería una disculpa completa, más allá de un simple 'perdón'.",
    objetivo: "Puede ayudarte a preparar una disculpa que realmente repare.", categoria: "vinculos", etiquetas: ["vínculos", "reparación"],
    duracion: 4, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "Una buena disculpa suele nombrar qué pasó y qué vas a hacer distinto.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué necesitás pedir disculpas, específicamente?", placeholder: "Sé concreto sobre qué hiciste…" },
      { tipo: "escritura", pregunta: "¿Qué harías distinto la próxima vez?", placeholder: "…" },
    ], activo: true, version: 1 },

  { id: "que-necesito-de-los-demas-hoy", titulo: "¿Qué necesito de los demás hoy?", descripcion: "Identificá qué tipo de apoyo te vendría bien pedir hoy.",
    objetivo: "Puede ayudarte a reconocer que pedir ayuda es una opción válida.", categoria: "vinculos", etiquetas: ["vínculos", "pedir ayuda"],
    duracion: 2, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "No hace falta que sea algo grande.",
    pasos: [{ tipo: "seleccion", pregunta: "¿Qué tipo de apoyo te vendría bien hoy?", opciones: [{ texto: "Que me escuchen" }, { texto: "Un consejo" }, { texto: "Ayuda práctica" }, { texto: "Distracción" }, { texto: "Espacio, no compañía" }] }], activo: true, version: 1 },

  { id: "reconocer-el-esfuerzo-ajeno", titulo: "Reconocer el esfuerzo ajeno", descripcion: "Pensá en alguien que hizo algo por vos que quizás no agradeciste del todo.",
    objetivo: "Puede ayudarte a notar gestos que a veces damos por sentado.", categoria: "vinculos", etiquetas: ["vínculos", "gratitud"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Puede ser algo reciente o de hace tiempo.",
    pasos: [{ tipo: "escritura", pregunta: "¿Quién hizo algo por vos que te gustaría reconocer más?", placeholder: "…" }], activo: true, version: 1 },

  { id: "mi-forma-de-mostrar-afecto", titulo: "Mi forma de mostrar afecto", descripcion: "Reflexioná sobre cómo sueles expresar cariño, y si coincide con cómo lo reciben los demás.",
    objetivo: "Puede ayudarte a notar posibles desencuentros en cómo damos y recibimos afecto.", categoria: "vinculos", etiquetas: ["vínculos", "afecto"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "No hay una forma correcta, sólo distintas.",
    pasos: [{ tipo: "seleccion", pregunta: "¿Cómo sueles mostrar afecto más naturalmente?", opciones: [{ texto: "Con palabras" }, { texto: "Con gestos y ayuda práctica" }, { texto: "Con tiempo compartido" }, { texto: "Con contacto físico" }, { texto: "Con regalos o detalles" }] }], activo: true, version: 1 },

  { id: "una-conversacion-pendiente", titulo: "Una conversación pendiente", descripcion: "Identificá una conversación que venís postergando tener con alguien.",
    objetivo: "Puede ayudarte a darle forma antes de animarte a tenerla.", categoria: "vinculos", etiquetas: ["vínculos", "comunicación"],
    duracion: 4, dificultad: "intermedio", tipo: "escritura",
    mensajeInicial: "No hace falta tenerla hoy, sólo pensarla.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué conversación venís postergando, y con quién?", placeholder: "…" }], activo: true, version: 1 },

  { id: "el-beneficio-de-la-duda", titulo: "El beneficio de la duda", descripcion: "Pensá en una situación donde diste por sentado algo negativo sobre alguien.",
    objetivo: "Puede ayudarte a considerar explicaciones alternativas más generosas.", categoria: "vinculos", etiquetas: ["vínculos", "interpretación"],
    duracion: 3, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Pensá en alguien cuyo comportamiento te molestó últimamente.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué otra explicación, más generosa, podría tener su comportamiento?", placeholder: "…" }], activo: true, version: 1 },

  { id: "compania-vs-soledad", titulo: "Compañía o soledad, ¿qué necesito?", descripcion: "Chequeá si lo que necesitás hoy es estar con alguien o estar solo.",
    objetivo: "Puede ayudarte a distinguir entre ambas necesidades, que a veces se confunden.", categoria: "vinculos", etiquetas: ["vínculos", "autoconocimiento"],
    duracion: 2, dificultad: "facil", tipo: "seleccion",
    mensajeInicial: "No hay una respuesta 'mejor'.",
    pasos: [{ tipo: "seleccion", pregunta: "Ahora mismo, ¿qué necesitás más?", opciones: [{ texto: "Estar acompañado" }, { texto: "Estar solo" }, { texto: "Un poco de los dos" }, { texto: "No estoy seguro" }] }], activo: true, version: 1 },

  // ═══════ 🧭 VALORES Y PROPÓSITO ═══════
  { id: "mis-valores", titulo: "Mis valores", descripcion: "Elegí qué valores sentís más presentes hoy en tu vida.",
    objetivo: "Puede ayudarte a conectar con lo que más te importa.", categoria: "valores", etiquetas: ["valores", "propósito"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "No hay una lista correcta. Es personal.",
    pasos: [
      { tipo: "seleccion", pregunta: "¿Cuál de estos sentís más presente hoy?", opciones: [{ texto: "Familia" }, { texto: "Libertad" }, { texto: "Crecimiento" }, { texto: "Conexión" }, { texto: "Logro" }, { texto: "Calma" }] },
      { tipo: "escritura", pregunta: "¿Por qué ese valor es importante para vos?", placeholder: "Podés escribir lo primero que se te ocurra…" },
    ], activo: true, version: 1 },

  { id: "que-es-importante-hoy", titulo: "¿Qué es importante hoy?", descripcion: "Una pregunta breve para orientar el día.",
    objetivo: "Puede ayudarte a decidir en qué poner la energía.", categoria: "valores", etiquetas: ["valores", "propósito"],
    duracion: 2, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Sin pensarlo demasiado.",
    pasos: [{ tipo: "escritura", pregunta: "De todo lo que tenés para hoy, ¿qué es lo más importante?", placeholder: "Puede ser una tarea, o simplemente un estado de ánimo que buscás sostener…" }], activo: true, version: 1 },

  { id: "un-valor-en-accion-hoy", titulo: "Un valor en acción hoy", descripcion: "Elegí un valor importante para vos y pensá una acción concreta de hoy que lo exprese.",
    objetivo: "Puede ayudarte a bajar un valor abstracto a algo concreto y posible.", categoria: "valores", etiquetas: ["valores", "acción"],
    duracion: 3, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "Un valor sin acción queda sólo en la idea.",
    pasos: [
      { tipo: "seleccion", pregunta: "¿Qué valor querés expresar hoy?", opciones: [{ texto: "Honestidad" }, { texto: "Generosidad" }, { texto: "Curiosidad" }, { texto: "Constancia" }, { texto: "Cuidado" }] },
      { tipo: "escritura", pregunta: "¿Qué acción concreta de hoy podría expresar ese valor?", placeholder: "…" },
    ], activo: true, version: 1 },

  { id: "lo-que-me-gustaria-que-digan-de-mi", titulo: "Lo que me gustaría que digan de mí", descripcion: "Pensá cómo te gustaría que te describan las personas que más te importan.",
    objetivo: "Puede ayudarte a conectar con lo que realmente valorás ser.", categoria: "valores", etiquetas: ["valores", "identidad"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "No pienses en lo que 'deberías' ser, sino en lo que de verdad te importaría.",
    pasos: [{ tipo: "escritura", pregunta: "Si alguien cercano te describiera, ¿qué te gustaría que dijera de vos?", placeholder: "…" }], activo: true, version: 1 },

  { id: "brujula-para-una-decision", titulo: "Brújula para una decisión", descripcion: "Usá tus valores como guía frente a una decisión que tenés pendiente.",
    objetivo: "Puede ayudarte a decidir desde lo que te importa, no sólo desde el miedo o la costumbre.", categoria: "valores", etiquetas: ["valores", "decisiones"],
    duracion: 5, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Pensá en una decisión que tengas pendiente.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Cuál es la decisión?", placeholder: "…" },
      { tipo: "escritura", pregunta: "¿Cuál de las opciones está más alineada con lo que realmente te importa?", placeholder: "Más allá de lo cómodo o lo esperado…" },
    ], activo: true, version: 1 },

  { id: "mi-legado-chico", titulo: "Mi legado chico", descripcion: "Pensá en el efecto pequeño y cotidiano que te gustaría dejar en las personas que ves seguido.",
    objetivo: "Puede ayudarte a conectar con un propósito accesible, no grandioso.", categoria: "valores", etiquetas: ["valores", "propósito"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "No hace falta pensar en algo trascendental. Puede ser chico y cotidiano.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué te gustaría que la gente sienta después de pasar un rato con vos?", placeholder: "…" }], activo: true, version: 1 },

  { id: "importante-vs-urgente", titulo: "Lo importante y lo urgente", descripcion: "Distinguí entre lo que te presiona hoy y lo que de verdad importa a largo plazo.",
    objetivo: "Puede ayudarte a no dejar que lo urgente tape siempre a lo importante.", categoria: "valores", etiquetas: ["valores", "prioridades"],
    duracion: 4, dificultad: "intermedio", tipo: "interactividad",
    mensajeInicial: "Pensá en las cosas que tenés dando vueltas ahora.",
    pasos: [{ tipo: "ordenar", instruccion: "Ordená de lo que más importa a largo plazo a lo que sólo presiona hoy.", items: ["Cuidar un vínculo importante", "Responder un mensaje pendiente", "Avanzar en algo que te importa a futuro", "Resolver algo urgente pero menor"] }], activo: true, version: 1 },

  { id: "vida-alineada-a-mis-valores", titulo: "Una vida alineada a mis valores", descripcion: "Compará cómo estás viviendo con lo que decís que te importa.",
    objetivo: "Puede ayudarte a notar posibles desajustes entre valores y acciones.", categoria: "valores", etiquetas: ["valores", "coherencia"],
    duracion: 5, dificultad: "profundo", tipo: "reflexion",
    mensajeInicial: "Sin culpa, sólo con honestidad.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Cuál es un valor muy importante para vos?", placeholder: "…" },
      { tipo: "escala", pregunta: "¿Qué tan alineada sentís tu vida actual con ese valor?", min: 0, max: 10, etiquetaMin: "Nada", etiquetaMax: "Totalmente" },
    ], activo: true, version: 1 },

  { id: "que-admiro-en-otros", titulo: "Qué admiro en otros", descripcion: "Lo que admiramos en otras personas suele reflejar nuestros propios valores.",
    objetivo: "Puede ayudarte a descubrir valores propios a través de a quién admirás.", categoria: "valores", etiquetas: ["valores", "identidad"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Pensá en alguien que admirás, real o no.",
    pasos: [
      { tipo: "escritura", pregunta: "¿A quién admirás, y qué es específicamente lo que admirás de esa persona?", placeholder: "…" },
      { tipo: "mensaje", texto: "Lo que admiramos en otros suele señalar algo que también valoramos para nosotros mismos." },
    ], activo: true, version: 1 },

  { id: "proposito-detras-de-la-tarea", titulo: "El propósito detrás de la tarea", descripcion: "Conectá una tarea aburrida o rutinaria con un propósito más grande.",
    objetivo: "Puede ayudarte a encontrarle sentido a tareas que se sienten mecánicas.", categoria: "valores", etiquetas: ["valores", "sentido"],
    duracion: 3, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "Pensá en algo de tu rutina que sentís poco significativo.",
    pasos: [{ tipo: "escritura", pregunta: "¿Con qué valor o propósito más grande se conecta esa tarea, aunque no sea obvio?", placeholder: "Por ejemplo: 'este trabajo aburrido sostiene a mi familia'" }], activo: true, version: 1 },

  { id: "mis-valores-en-el-estudio-o-trabajo", titulo: "Mis valores en el estudio o trabajo", descripcion: "Pensá qué valores querés que guíen cómo hacés tu trabajo o estudio.",
    objetivo: "Puede ayudarte a encontrar sentido más allá del resultado final.", categoria: "valores", etiquetas: ["valores", "trabajo"],
    duracion: 4, dificultad: "intermedio", tipo: "seleccion",
    mensajeInicial: "Más allá de lo que tenés que entregar o lograr.",
    pasos: [{ tipo: "seleccion", pregunta: "¿Qué te gustaría que guíe cómo trabajás o estudiás?", opciones: [{ texto: "Hacerlo con cuidado, aunque tome más tiempo" }, { texto: "Ser honesto sobre lo que sé y no sé" }, { texto: "Colaborar con otros" }, { texto: "Aprender, más allá del resultado" }] }], activo: true, version: 1 },

  { id: "cuando-actue-segun-mis-valores", titulo: "Cuando actué según mis valores", descripcion: "Recordá un momento en que actuaste de acuerdo a algo que te importa mucho.",
    objetivo: "Puede ayudarte a reconectar con la sensación de coherencia.", categoria: "valores", etiquetas: ["valores", "coherencia"],
    duracion: 3, dificultad: "facil", tipo: "escritura",
    mensajeInicial: "Buscá un ejemplo concreto, aunque sea chico.",
    pasos: [{ tipo: "escritura", pregunta: "Contá un momento en que actuaste según algo muy importante para vos.", placeholder: "…" }], activo: true, version: 1 },

  { id: "que-le-daria-sentido-a-hoy", titulo: "¿Qué le daría sentido a hoy?", descripcion: "Elegí algo que, si lo hacés hoy, te haga sentir que el día valió la pena.",
    objetivo: "Puede ayudarte a orientar el día hacia algo con sentido, más allá de la lista de tareas.", categoria: "valores", etiquetas: ["valores", "sentido"],
    duracion: 2, dificultad: "facil", tipo: "reflexion",
    mensajeInicial: "No tiene que ser grande.",
    pasos: [{ tipo: "escritura", pregunta: "¿Qué podrías hacer hoy que le dé sentido al día, más allá de tachar tareas?", placeholder: "…" }], activo: true, version: 1 },

  { id: "valores-heredados", titulo: "Valores que heredé", descripcion: "Pensá en un valor que aprendiste de tu familia o de alguien importante, y si lo hacés propio.",
    objetivo: "Puede ayudarte a distinguir entre valores heredados y valores elegidos.", categoria: "valores", etiquetas: ["valores", "identidad"],
    duracion: 4, dificultad: "intermedio", tipo: "reflexion",
    mensajeInicial: "No todos los valores heredados siguen siendo nuestros hoy, y está bien revisarlos.",
    pasos: [
      { tipo: "escritura", pregunta: "¿Qué valor aprendiste de tu familia o de alguien importante?", placeholder: "…" },
      { tipo: "seleccion", pregunta: "¿Seguís sintiéndolo tan propio hoy?", opciones: [{ texto: "Sí, totalmente" }, { texto: "En parte" }, { texto: "No tanto como antes" }] },
    ], activo: true, version: 1 },

  // ═══════ ⚡ ACTIVACIÓN Y ENERGÍA ═══════
  { id: "activacion-breve", titulo: "Activación breve", descripcion: "Un impulso corto de energía para salir del estancamiento.",
    objetivo: "Puede ayudarte a romper con un momento de letargo.", categoria: "activacion", etiquetas: ["energía", "movimiento"],
    duracion: 2, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Si podés, parate para este ejercicio.",
    pasos: [
      { tipo: "mensaje", texto: "Estirá los brazos hacia arriba y sostené unos segundos.", duracionSeg: 10 },
      { tipo: "mensaje", texto: "Sacudí las manos y los hombros, aflojando.", duracionSeg: 10 },
      { tipo: "mensaje", texto: "Dá unos pasos, aunque sea en el lugar.", duracionSeg: 10 },
    ], activo: true, version: 1 },

  { id: "energia-en-movimiento", titulo: "Energía en movimiento", descripcion: "Una pausa activa breve para cortar con el sedentarismo.",
    objetivo: "Puede ayudarte a recuperar algo de energía en medio del día.", categoria: "activacion", etiquetas: ["energía", "movimiento"],
    duracion: 3, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "No hace falta hacer nada intenso.",
    pasos: [{ tipo: "temporizador", duracionSeg: 90, texto: "Movete como quieras: caminar, estirar, bailar un poco. Lo que te pida el cuerpo." }], activo: true, version: 1 },

  { id: "estiramiento-de-escritorio", titulo: "Estiramiento de escritorio", descripcion: "Una serie corta de estiramientos para hacer sin levantarte de la silla.",
    objetivo: "Puede ayudarte a soltar tensión acumulada por estar mucho tiempo sentado.", categoria: "activacion", etiquetas: ["energía", "cuerpo"],
    duracion: 3, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "No hace falta levantarte para este.",
    pasos: [
      { tipo: "mensaje", texto: "Girá el cuello lentamente hacia un lado y hacia el otro.", duracionSeg: 12 },
      { tipo: "mensaje", texto: "Estirá los brazos hacia adelante y entrelazá los dedos, empujando.", duracionSeg: 12 },
      { tipo: "mensaje", texto: "Girá el torso suavemente hacia cada lado, sin forzar.", duracionSeg: 12 },
    ], activo: true, version: 1 },

  { id: "salto-de-energia", titulo: "Salto de energía", descripcion: "Un impulso físico corto e intenso para cortar con el letargo.",
    objetivo: "Puede ayudarte a subir rápidamente el nivel de alerta del cuerpo.", categoria: "activacion", etiquetas: ["energía", "movimiento"],
    duracion: 2, dificultad: "facil", tipo: "interactividad",
    advertencia: "Si tenés alguna limitación física, adaptá el movimiento o salteá este ejercicio.",
    mensajeInicial: "Si podés, hacé este ejercicio de pie.",
    pasos: [{ tipo: "temporizador", duracionSeg: 30, texto: "Saltá en el lugar, o si no podés, moví los brazos con energía durante este tiempo." }], activo: true, version: 1 },

  { id: "postura-de-poder", titulo: "Postura de poder", descripcion: "Adoptá una postura corporal expansiva durante un minuto.",
    objetivo: "Puede ayudarte a sentirte un poco más seguro antes de algo que te pone nervioso.", categoria: "activacion", etiquetas: ["energía", "confianza"],
    duracion: 2, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Si podés, hacelo de pie y en privado.",
    pasos: [{ tipo: "mensaje", texto: "Parate con los pies separados, manos en la cintura o brazos elevados, pecho abierto. Sostené la postura.", duracionSeg: 45 }], activo: true, version: 1 },

  { id: "respiracion-energizante", titulo: "Respiración energizante", descripcion: "Una respiración con inhalaciones más marcadas para activar el cuerpo.",
    objetivo: "Puede ayudarte a subir el nivel de alerta de forma natural.", categoria: "activacion", etiquetas: ["energía", "respiración"],
    duracion: 2, dificultad: "facil", tipo: "respiracion",
    advertencia: "Si sentís mareo, volvé a tu respiración normal.",
    mensajeInicial: "Inhalá con más fuerza que de costumbre, exhalá corto.",
    pasos: [{ tipo: "respiracion", ciclos: 6, fases: [{ nombre: "Inhalá fuerte", segundos: 2 }, { nombre: "Exhalá corto", segundos: 2 }] }], activo: true, version: 1 },

  { id: "musica-para-activarme", titulo: "Música para activarme", descripcion: "Elegí una canción con ritmo y dejá que el cuerpo se mueva un poco.",
    objetivo: "Puede ayudarte a usar el ritmo externo para subir tu propia energía.", categoria: "activacion", etiquetas: ["energía", "música"],
    duracion: 3, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Elegí algo con ritmo, no hace falta que sea perfecto para bailar.",
    pasos: [{ tipo: "temporizador", duracionSeg: 120, texto: "Poné una canción con ritmo y movete como quieras durante este rato." }], activo: true, version: 1 },

  { id: "el-primer-paso-fisico", titulo: "El primer paso físico", descripcion: "A veces el cuerpo tiene que moverse antes de que la motivación aparezca.",
    objetivo: "Puede ayudarte a romper la parálisis inicial antes de una tarea.", categoria: "activacion", etiquetas: ["energía", "motivación"],
    duracion: 2, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "No hace falta tener ganas para empezar a moverte.",
    pasos: [{ tipo: "mensaje", texto: "Parate, aunque no tengas ganas. A veces el cuerpo arrastra a la motivación, no al revés.", duracionSeg: 10 }], activo: true, version: 1 },

  { id: "activacion-con-agua-fria", titulo: "Activación con agua fría", descripcion: "Mojate la cara o las manos con agua fría para un reseteo rápido.",
    objetivo: "Puede ayudarte a cortar con el letargo de forma casi inmediata.", categoria: "activacion", etiquetas: ["energía", "reseteo"],
    duracion: 1, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Si tenés cerca un baño o una canilla, este es rápido.",
    pasos: [{ tipo: "mensaje", texto: "Si podés, mojate la cara, la nuca o las manos con agua fría. Notá el cambio en el cuerpo.", duracionSeg: 10 }], activo: true, version: 1 },

  { id: "romper-el-letargo-de-la-tarde", titulo: "Romper el letargo de la tarde", descripcion: "Una combinación breve de movimiento y respiración para el bajón de la tarde.",
    objetivo: "Puede ayudarte a atravesar el momento del día donde suele bajar la energía.", categoria: "activacion", etiquetas: ["energía", "rutina"],
    duracion: 3, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "El bajón de la tarde le pasa a casi todo el mundo.",
    pasos: [
      { tipo: "mensaje", texto: "Parate y estirate hacia arriba, bien completo.", duracionSeg: 10 },
      { tipo: "respiracion", ciclos: 3, fases: [{ nombre: "Inhalá", segundos: 3 }, { nombre: "Exhalá", segundos: 3 }] },
    ], activo: true, version: 1 },

  { id: "tres-minutos-de-baile", titulo: "Tres minutos de baile", descripcion: "Bailá sin ningún objetivo más que moverte y soltar el cuerpo.",
    objetivo: "Puede ayudarte a liberar tensión y subir el ánimo a través del movimiento.", categoria: "activacion", etiquetas: ["energía", "movimiento"],
    duracion: 3, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Nadie te está mirando ni evaluando.",
    pasos: [{ tipo: "temporizador", duracionSeg: 180, texto: "Poné música y bailá como quieras, sin pensar en cómo se ve." }], activo: true, version: 1 },

  { id: "activar-antes-de-tarea-dificil", titulo: "Activarme antes de una tarea difícil", descripcion: "Un ritual corto de activación física y mental antes de encarar algo que te cuesta.",
    objetivo: "Puede ayudarte a entrar con más energía a algo que te genera resistencia.", categoria: "activacion", etiquetas: ["energía", "motivación"],
    duracion: 3, dificultad: "intermedio", tipo: "interactividad",
    mensajeInicial: "Pensá en la tarea que estás por encarar.",
    pasos: [
      { tipo: "mensaje", texto: "Parate, estirate y sacudí brazos y hombros.", duracionSeg: 10 },
      { tipo: "mensaje", texto: "Decite en voz alta o mentalmente: 'Voy a empezar, no hace falta tener ganas todavía'.", duracionSeg: 8 },
    ], activo: true, version: 1 },

  { id: "energia-desde-la-postura", titulo: "Energía desde la postura", descripcion: "Corregí tu postura corporal y notá si cambia algo en tu energía.",
    objetivo: "Puede ayudarte a notar la relación entre postura corporal y estado de ánimo.", categoria: "activacion", etiquetas: ["energía", "cuerpo"],
    duracion: 2, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Notá cómo estás sentado o parado ahora mismo.",
    pasos: [{ tipo: "mensaje", texto: "Enderezá la espalda, abrí el pecho y levantá un poco la mirada. Sostené así unos segundos y notá si algo cambia.", duracionSeg: 15 }], activo: true, version: 1 },

  { id: "sacudir-la-inercia", titulo: "Sacudir la inercia", descripcion: "Un movimiento corto y literal para 'sacudirte' el estancamiento de encima.",
    objetivo: "Puede ayudarte a cortar de forma física con un momento de estancamiento.", categoria: "activacion", etiquetas: ["energía", "movimiento"],
    duracion: 1, dificultad: "facil", tipo: "interactividad",
    mensajeInicial: "Literal: sacudí el cuerpo como si te sacudieras algo de encima.",
    pasos: [{ tipo: "mensaje", texto: "Sacudí brazos, manos y piernas con energía, como si te estuvieras sacando algo de encima.", duracionSeg: 15 }], activo: true, version: 1 },
];

const CatalogoEjercicios = {
  todos: () => EJERCICIOS.filter(e => e.activo),
  porId: (id) => EJERCICIOS.find(e => e.id === id),
  categorias: () => CATEGORIAS_EJERCICIOS,
  categoriaPorId: (id) => CATEGORIAS_EJERCICIOS.find(c => c.id === id),
  necesidades: () => NECESIDADES,
  porCategoria: (catId) => CatalogoEjercicios.todos().filter(e => e.categoria === catId),

  buscar(query) {
    const q = query.trim().toLowerCase();
    if (!q) return CatalogoEjercicios.todos();
    return CatalogoEjercicios.todos().filter(e =>
      e.titulo.toLowerCase().includes(q) ||
      e.descripcion.toLowerCase().includes(q) ||
      e.categoria.toLowerCase().includes(q) ||
      (e.etiquetas || []).some(t => t.toLowerCase().includes(q)));
  },

  filtrar({ duracionMax, dificultad, tipo, estado } = {}) {
    let lista = CatalogoEjercicios.todos();
    if (duracionMax) lista = lista.filter(e => e.duracion <= duracionMax);
    if (dificultad) lista = lista.filter(e => e.dificultad === dificultad);
    if (tipo) lista = lista.filter(e => e.tipo === tipo);
    if (estado === "favoritos") lista = lista.filter(e => Storage.esFavoritoEjercicio(e.id));
    if (estado === "realizados") lista = lista.filter(e => Storage.getProgresoEjercicio(e.id).vecesCompletado > 0);
    if (estado === "no-realizados") lista = lista.filter(e => Storage.getProgresoEjercicio(e.id).vecesCompletado === 0);
    return lista;
  },

  aleatorio(filtros = {}) {
    const lista = CatalogoEjercicios.filtrar(filtros);
    const pool = lista.length ? lista : CatalogoEjercicios.todos();
    return pool[Math.floor(Math.random() * pool.length)];
  },

  /** Ejercicio del día: determinístico según la fecha, no cambia en cada visita. */
  delDia() {
    const lista = CatalogoEjercicios.todos();
    const hoy = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < hoy.length; i++) hash = (hash * 31 + hoy.charCodeAt(i)) >>> 0;
    return lista[hash % lista.length];
  },

  /** Recomendación por reglas simples: tiempo disponible + necesidad elegida. */
  recomendar({ minutos, necesidadId } = {}) {
    let lista = CatalogoEjercicios.todos();
    const necesidad = NECESIDADES.find(n => n.id === necesidadId);
    if (necesidad) lista = lista.filter(e => necesidad.categorias.includes(e.categoria));
    if (minutos) {
      const dentroDelTiempo = lista.filter(e => e.duracion <= minutos);
      lista = dentroDelTiempo.length ? dentroDelTiempo : [...lista].sort((a, b) => Math.abs(a.duracion - minutos) - Math.abs(b.duracion - minutos));
    }
    if (!lista.length) lista = CatalogoEjercicios.todos();
    return lista.sort(() => Math.random() - 0.5).slice(0, 3);
  },
};

if (typeof module !== "undefined") module.exports = { EJERCICIOS, CATEGORIAS_EJERCICIOS, NECESIDADES, CatalogoEjercicios };
