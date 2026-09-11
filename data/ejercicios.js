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
 *    "preguntas" | "relajacion" | "creatividad"
 *  - mensajeInicial: texto de la pantalla previa a empezar
 *  - advertencia: opcional, se muestra en la pantalla previa
 *  - pasos: la secuencia real del ejercicio (ver exercise-engine.js
 *    para los tipos de paso soportados)
 *  - activo, version
 */

const CATEGORIAS_EJERCICIOS = [
  { id: "calma", nombre: "Calma y regulación", icono: "🧘", color: "#2aaec2" },
  { id: "emociones", nombre: "Emociones", icono: "❤️", color: "#e08a8a" },
  { id: "atencion", nombre: "Atención y concentración", icono: "🧠", color: "#1a7a8a" },
  { id: "pensamientos", nombre: "Pensamientos", icono: "💭", color: "#3a5a6a" },
  { id: "autoconocimiento", nombre: "Autoconocimiento", icono: "🪞", color: "#c98ac2" },
  { id: "habitos", nombre: "Hábitos y bienestar", icono: "🌱", color: "#8ac9a9" },
  { id: "vinculos", nombre: "Vínculos", icono: "🤝", color: "#c9a97e" },
  { id: "creatividad", nombre: "Creatividad", icono: "🎨", color: "#c98ac2" },
  { id: "sueno", nombre: "Sueño y descanso", icono: "🌙", color: "#0e4d5c" },
  { id: "escritura", nombre: "Escritura y reflexión", icono: "✍️", color: "#7ed6e4" },
  { id: "valores", nombre: "Valores y propósito", icono: "🧭", color: "#2aaec2" },
  { id: "activacion", nombre: "Activación y energía", icono: "⚡", color: "#e0954a" },
];

const NECESIDADES = [
  { id: "saturado", emoji: "😵", texto: "Estoy saturado", categorias: ["calma", "atencion"] },
  { id: "ansiedad", emoji: "😰", texto: "Quiero bajar la ansiedad", categorias: ["calma", "emociones"] },
  { id: "concentrarme", emoji: "🧠", texto: "Quiero concentrarme", categorias: ["atencion"] },
  { id: "entender", emoji: "❤️", texto: "Quiero entender lo que siento", categorias: ["emociones"] },
  { id: "bajoneado", emoji: "😔", texto: "Estoy bajoneado", categorias: ["emociones", "autoconocimiento"] },
  { id: "enojado", emoji: "😡", texto: "Estoy enojado", categorias: ["emociones", "calma"] },
  { id: "conocerme", emoji: "🪞", texto: "Quiero conocerme mejor", categorias: ["autoconocimiento", "valores"] },
  { id: "ordenar", emoji: "🌱", texto: "Quiero ordenar mi cabeza", categorias: ["pensamientos", "escritura"] },
  { id: "relajarme", emoji: "🧘", texto: "Quiero relajarme", categorias: ["calma", "sueno"] },
  { id: "pensar", emoji: "💭", texto: "Quiero pensar", categorias: ["pensamientos", "valores"] },
  { id: "escribir", emoji: "✍️", texto: "Quiero escribir", categorias: ["escritura"] },
  { id: "creativo", emoji: "🎨", texto: "Quiero hacer algo creativo", categorias: ["creatividad"] },
];

const EJERCICIOS = [
  // ═══════ 🧘 CALMA Y REGULACIÓN ═══════
  { id: "respiracion-guiada", titulo: "Respiración guiada", descripcion: "Una práctica simple para acompañar la respiración y bajar el ritmo.",
    objetivo: "Puede ayudarte a hacer una pausa y aflojar la tensión del cuerpo.", categoria: "calma", etiquetas: ["respiración", "calma"],
    duracion: 3, dificultad: "facil", tipo: "respiracion",
    mensajeInicial: "Buscá una posición cómoda, sentado o parado. Vamos a acompañar la respiración durante unos minutos.",
    pasos: [
      { tipo: "mensaje", texto: "Cerrá los ojos si te resulta cómodo, o simplemente bajá la mirada.", duracionSeg: 4 },
      { tipo: "respiracion", ciclos: 5, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Sostené", segundos: 2 }, { nombre: "Exhalá", segundos: 6 }] },
      { tipo: "mensaje", texto: "Cuando quieras, abrí los ojos y volvé al ritmo habitual." },
    ], activo: true, version: 1 },

  { id: "respiracion-ola", titulo: "Respiración de la ola", descripcion: "Una práctica breve para acompañar la respiración y bajar el ritmo, siguiendo el vaivén de una ola.",
    objetivo: "Puede ayudarte a encontrar un ritmo más calmo.", categoria: "calma", etiquetas: ["respiración", "calma"],
    duracion: 3, dificultad: "facil", tipo: "respiracion",
    mensajeInicial: "Vamos a acompañar la respiración durante unos minutos, como el vaivén de una ola.",
    pasos: [
      { tipo: "respiracion", ciclos: 6, fases: [{ nombre: "La ola sube — Inhalá", segundos: 4 }, { nombre: "La ola baja — Exhalá", segundos: 5 }] },
      { tipo: "mensaje", texto: "Tomate un momento más antes de seguir." },
    ], activo: true, version: 1 },

  { id: "respiracion-cuadrada", titulo: "Respiración cuadrada", descripcion: "Cuatro fases de igual duración: inhalar, sostener, exhalar, sostener.",
    objetivo: "Puede ayudarte a regular el ritmo de la respiración de forma pareja.", categoria: "calma", etiquetas: ["respiración", "calma"],
    duracion: 3, dificultad: "facil", tipo: "respiracion",
    mensajeInicial: "Las cuatro fases duran lo mismo. Sólo tenés que seguir el ritmo.",
    pasos: [
      { tipo: "respiracion", ciclos: 5, fases: [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Sostené", segundos: 4 }, { nombre: "Exhalá", segundos: 4 }, { nombre: "Sostené", segundos: 4 }] },
    ], activo: true, version: 1 },

  { id: "grounding-54321", titulo: "Grounding 5-4-3-2-1", descripcion: "Una técnica para volver al momento presente usando los sentidos.",
    objetivo: "Puede ayudarte a bajar la intensidad de un momento de ansiedad, conectando con lo que hay alrededor.", categoria: "calma", etiquetas: ["grounding", "ansiedad", "mindfulness"],
    duracion: 5, dificultad: "facil", tipo: "mindfulness",
    mensajeInicial: "Vamos a recorrer los cinco sentidos, de a uno.",
    pasos: [
      { tipo: "mensaje", texto: "Mirá a tu alrededor y encontrá 5 cosas que podés ver.", duracionSeg: 15 },
      { tipo: "mensaje", texto: "Ahora notá 4 cosas que podés tocar (la ropa, una superficie, el aire).", duracionSeg: 15 },
      { tipo: "mensaje", texto: "Escuchá 3 sonidos distintos, aunque sean sutiles.", duracionSeg: 15 },
      { tipo: "mensaje", texto: "Notá 2 olores, aunque sea el del ambiente.", duracionSeg: 10 },
      { tipo: "mensaje", texto: "Por último, notá 1 sabor en tu boca, o el sabor del aire.", duracionSeg: 8 },
    ], activo: true, version: 1 },

  { id: "escaneo-corporal-breve", titulo: "Escaneo corporal breve", descripcion: "Un recorrido corto por el cuerpo, notando sensaciones sin cambiarlas.",
    objetivo: "Puede ayudarte a notar tensión que no habías registrado.", categoria: "calma", etiquetas: ["mindfulness", "cuerpo"],
    duracion: 4, dificultad: "facil", tipo: "mindfulness",
    mensajeInicial: "No hace falta cambiar nada, sólo notar.",
    pasos: [
      { tipo: "mensaje", texto: "Notá el contacto de tus pies con el piso.", duracionSeg: 8 },
      { tipo: "mensaje", texto: "Subí la atención a las piernas. ¿Están tensas o relajadas?", duracionSeg: 8 },
      { tipo: "mensaje", texto: "Notá la panza y el pecho, subiendo y bajando con cada respiración.", duracionSeg: 8 },
      { tipo: "mensaje", texto: "Notá los hombros. Si están levantados, dejalos caer.", duracionSeg: 8 },
      { tipo: "mensaje", texto: "Por último, notá la cara: la frente, la mandíbula. Aflojá lo que puedas.", duracionSeg: 8 },
    ], activo: true, version: 1 },

  { id: "pausa-consciente", titulo: "Pausa consciente", descripcion: "Un minuto entero sin hacer nada más que estar.",
    objetivo: "Puede ayudarte a cortar el piloto automático por un momento.", categoria: "calma", etiquetas: ["mindfulness", "pausa"],
    duracion: 1, dificultad: "facil", tipo: "mindfulness",
    mensajeInicial: "Sólo un minuto. No hace falta hacer nada más que estar acá.",
    pasos: [{ tipo: "temporizador", duracionSeg: 60, texto: "Quedate quieto, respirando a tu ritmo." }], activo: true, version: 1 },

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

  // ═══════ 🎨 CREATIVIDAD ═══════
  { id: "dibujar-una-emocion", titulo: "Dibujar una emoción", descripcion: "Representá con formas y colores lo que estás sintiendo.",
    objetivo: "Puede ayudarte a expresar algo que es difícil poner en palabras.", categoria: "creatividad", etiquetas: ["creatividad", "emociones"],
    duracion: 4, dificultad: "facil", tipo: "creatividad",
    mensajeInicial: "No hace falta que dibujes bien. Sólo dejá que la mano se mueva.",
    pasos: [{ tipo: "dibujo", texto: "Dibujá la emoción que predomina hoy, como te salga." }], activo: true, version: 1 },

  { id: "tres-palabras-historia", titulo: "Tres palabras, una historia", descripcion: "Armá una mini historia a partir de tres palabras al azar.",
    objetivo: "Puede ayudarte a salir del modo analítico por un rato.", categoria: "creatividad", etiquetas: ["creatividad", "escritura"],
    duracion: 3, dificultad: "facil", tipo: "creatividad",
    mensajeInicial: "Nube, reloj, puente. Armá algo con esas tres palabras.",
    pasos: [{ tipo: "escritura", pregunta: "Escribí una mini historia con: nube, reloj y puente.", placeholder: "Había una vez…" }], activo: true, version: 1 },

  { id: "metafora-de-hoy", titulo: "Metáfora de hoy", descripcion: "Completá una metáfora sobre cómo estás.",
    objetivo: "Puede ayudarte a describir tu estado de otra manera.", categoria: "creatividad", etiquetas: ["creatividad", "reflexión"],
    duracion: 3, dificultad: "facil", tipo: "creatividad",
    mensajeInicial: "No hay una respuesta correcta.",
    pasos: [{ tipo: "escritura", pregunta: "Completá: \"Hoy me siento como ___ porque ___\"", placeholder: "Escribí lo primero que se te ocurra…" }], activo: true, version: 1 },

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
