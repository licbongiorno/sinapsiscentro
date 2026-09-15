/**
 * CATÁLOGO DE JUEGOS — SINAPSIS
 * ==============================
 * Registro central de todos los juegos de la plataforma.
 *
 * Cada juego tiene:
 *  - id:          identificador único (usado en la URL juego.html?id=...)
 *  - nombre:      nombre visible
 *  - descripcion: bajada corta
 *  - categoria:   id de categoría (ver CATEGORIAS más abajo)
 *  - edadMin:     edad mínima recomendada
 *  - dificultad:  "facil" | "media" | "dificil"
 *  - duracion:    texto libre ("3-5 min")
 *  - tipo:        "individual" | "social"
 *  - movil:       true si está optimizado para celular
 *  - puntuable:   true si genera puntaje/ranking
 *  - logros:      true si puede desbloquear logros
 *  - disponible:  true si ya está implementado y jugable
 *  - archivo:     ruta del módulo JS del juego (solo si disponible)
 *  - necesita:    "sesion" si requiere 2+ personas en el mismo dispositivo (opcional)
 *
 * Los juegos con disponible:false son parte del roadmap (las 120 ideas
 * originales) y aparecen en el portal como "Próximamente" — así el
 * catálogo completo ya está armado y sólo hace falta ir sumando módulos
 * en js/juegos/ siguiendo el mismo patrón que los juegos ya construidos.
 */

const CATEGORIAS = [
  { id: "memoria",      nombre: "Memoria",       icono: "🧠", color: "#2aaec2" },
  { id: "atencion",     nombre: "Atención",      icono: "👁️", color: "#1a7a8a" },
  { id: "reflejos",     nombre: "Reflejos",      icono: "⚡", color: "#c9a97e" },
  { id: "palabras",     nombre: "Palabras",      icono: "🔤", color: "#7ed6e4" },
  { id: "emociones",    nombre: "Emociones",     icono: "❤️", color: "#e08a8a" },
  { id: "logica",       nombre: "Lógica",        icono: "🧩", color: "#0e4d5c" },
  { id: "numeros",      nombre: "Números",       icono: "🔢", color: "#3a5a6a" },
  { id: "flexibilidad", nombre: "Flexibilidad",  icono: "🌀", color: "#2aaec2" },
  { id: "vinculos",     nombre: "Vínculos",      icono: "🤝", color: "#c9a97e" },
  { id: "ninos",        nombre: "Niños",         icono: "🧸", color: "#e0b28a" },
];

const JUEGOS = [
  // ───────── 🧠 MEMORIA ─────────
  { id: "memoria-clasica", nombre: "Memoria clásica", descripcion: "Encontrá los pares de cartas.", beneficio: "La memoria de trabajo —sostener y manipular información brevemente en la mente— es una de las funciones cognitivas más estudiadas, desde los trabajos clásicos del psicólogo Alan Baddeley, y se puede entrenar con la práctica repetida de este tipo de tareas.", categoria: "memoria", edadMin: 6, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/memoria-clasica.js" },
  { id: "memoria-emocional", nombre: "Memoria emocional", descripcion: "Asociá cada emoción con su situación.", beneficio: "Buscar pares y recordar posiciones ejercita la memoria visoespacial, un subsistema de la memoria de trabajo distinto del que se usa para recordar palabras o números.", categoria: "memoria", edadMin: 8, dificultad: "media", duracion: "5-10 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/memoria-emocional.js" },
  { id: "parejas-imposibles", nombre: "Parejas imposibles", descripcion: "Relacioná objetos aparentemente inconexos.", beneficio: "La repetición espaciada de un mismo tipo de desafío de memoria está asociada, en investigación sobre aprendizaje, con mejoras medibles en la capacidad de retención a corto plazo.", categoria: "memoria", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/parejas-imposibles.js" },
  { id: "que-desaparecio", nombre: "¿Qué desapareció?", descripcion: "Observá una escena y detectá qué falta.", beneficio: "Memorizar secuencias que crecen de a poco, una más larga cada vez, es una técnica clásica en la evaluación neuropsicológica de la memoria, como en las pruebas de dígitos de las escalas de Wechsler.", categoria: "memoria", edadMin: 6, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/que-desaparecio.js" },
  { id: "secuencia-secreta", nombre: "Secuencia secreta", descripcion: "Memorizá una secuencia de símbolos.", beneficio: "La memoria de trabajo —sostener y manipular información brevemente en la mente— es una de las funciones cognitivas más estudiadas, desde los trabajos clásicos del psicólogo Alan Baddeley, y se puede entrenar con la práctica repetida de este tipo de tareas.", categoria: "memoria", edadMin: 8, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/secuencia-secreta.js" },
  { id: "luces", nombre: "Luces", descripcion: "Repetí la secuencia de luces, cada vez más larga.", beneficio: "Buscar pares y recordar posiciones ejercita la memoria visoespacial, un subsistema de la memoria de trabajo distinto del que se usa para recordar palabras o números.", categoria: "memoria", edadMin: 6, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/luces.js" },
  { id: "memoria-sonidos", nombre: "Memoria de sonidos", descripcion: "Recordá secuencias sonoras.", beneficio: "La repetición espaciada de un mismo tipo de desafío de memoria está asociada, en investigación sobre aprendizaje, con mejoras medibles en la capacidad de retención a corto plazo.", categoria: "memoria", edadMin: 6, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/memoria-sonidos.js" },
  { id: "camino-memoria", nombre: "Camino de memoria", descripcion: "Memorizá un recorrido en una grilla.", beneficio: "Memorizar secuencias que crecen de a poco, una más larga cada vez, es una técnica clásica en la evaluación neuropsicológica de la memoria, como en las pruebas de dígitos de las escalas de Wechsler.", categoria: "memoria", edadMin: 8, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/camino-memoria.js" },
  { id: "caras-nombres", nombre: "Caras y nombres", descripcion: "Asociá nombres con personajes.", beneficio: "La memoria de trabajo —sostener y manipular información brevemente en la mente— es una de las funciones cognitivas más estudiadas, desde los trabajos clásicos del psicólogo Alan Baddeley, y se puede entrenar con la práctica repetida de este tipo de tareas.", categoria: "memoria", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/caras-nombres.js" },
  { id: "historia-escondida", nombre: "Historia escondida", descripcion: "Recordá detalles de una pequeña historia.", beneficio: "Buscar pares y recordar posiciones ejercita la memoria visoespacial, un subsistema de la memoria de trabajo distinto del que se usa para recordar palabras o números.", categoria: "memoria", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/historia-escondida.js" },

  // ───────── 👁️ ATENCIÓN ─────────
  { id: "encuentra-diferente", nombre: "Encontrá el diferente", descripcion: "Detectá el símbolo distinto entre todos.", beneficio: "La atención sostenida —la capacidad de mantener el foco en una tarea durante un tiempo— es una función medida en pruebas neuropsicológicas clásicas como el Test de Ejecución Continua (CPT), y mejora con la práctica regular.", categoria: "atencion", edadMin: 6, dificultad: "facil", duracion: "2-4 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/encuentra-diferente.js" },
  { id: "donde-esta", nombre: "¿Dónde está?", descripcion: "Encontrá un elemento entre muchos.", beneficio: "Detectar un elemento entre muchos distractores entrena la atención selectiva: la capacidad de filtrar información irrelevante para enfocarse en lo que importa.", categoria: "atencion", edadMin: 6, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/donde-esta.js" },
  { id: "semaforo-mental", nombre: "Semáforo mental", descripcion: "Tocá según una regla que va cambiando.", beneficio: "La velocidad para detectar diferencias sutiles está vinculada, en estudios cognitivos, a la eficiencia del procesamiento visual temprano, una habilidad de base para muchas otras tareas atencionales.", categoria: "atencion", edadMin: 10, dificultad: "media", duracion: "4 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/semaforo-mental.js" },
  { id: "no-toques-rojo", nombre: "No toques el rojo", descripcion: "Respondé únicamente a ciertos estímulos.", beneficio: "La atención sostenida —la capacidad de mantener el foco en una tarea durante un tiempo— es una función medida en pruebas neuropsicológicas clásicas como el Test de Ejecución Continua (CPT), y mejora con la práctica regular.", categoria: "atencion", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/no-toques-rojo.js" },
  { id: "cambio-regla", nombre: "Cambio de regla", descripcion: "La consigna cambia sin avisar.", beneficio: "Detectar un elemento entre muchos distractores entrena la atención selectiva: la capacidad de filtrar información irrelevante para enfocarse en lo que importa.", categoria: "atencion", edadMin: 10, dificultad: "dificil", duracion: "4 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cambio-regla.js" },
  { id: "atencion-dividida", nombre: "Atención dividida", descripcion: "Resolvé dos tareas al mismo tiempo.", beneficio: "La velocidad para detectar diferencias sutiles está vinculada, en estudios cognitivos, a la eficiencia del procesamiento visual temprano, una habilidad de base para muchas otras tareas atencionales.", categoria: "atencion", edadMin: 12, dificultad: "dificil", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/atencion-dividida.js" },
  { id: "cazador-letras", nombre: "Cazador de letras", descripcion: "Encontrá una letra determinada, rápido.", beneficio: "La atención sostenida —la capacidad de mantener el foco en una tarea durante un tiempo— es una función medida en pruebas neuropsicológicas clásicas como el Test de Ejecución Continua (CPT), y mejora con la práctica regular.", categoria: "atencion", edadMin: 6, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cazador-letras.js" },
  { id: "cazador-numeros", nombre: "Cazador de números", descripcion: "Encontrá números específicos.", beneficio: "Detectar un elemento entre muchos distractores entrena la atención selectiva: la capacidad de filtrar información irrelevante para enfocarse en lo que importa.", categoria: "atencion", edadMin: 6, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cazador-numeros.js" },
  { id: "la-intrusa", nombre: "La intrusa", descripcion: "Detectá el elemento que rompe el patrón.", beneficio: "La velocidad para detectar diferencias sutiles está vinculada, en estudios cognitivos, a la eficiencia del procesamiento visual temprano, una habilidad de base para muchas otras tareas atencionales.", categoria: "atencion", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/la-intrusa.js" },
  { id: "vista-aguila", nombre: "Vista de águila", descripcion: "Identificá pequeños cambios entre imágenes.", beneficio: "La atención sostenida —la capacidad de mantener el foco en una tarea durante un tiempo— es una función medida en pruebas neuropsicológicas clásicas como el Test de Ejecución Continua (CPT), y mejora con la práctica regular.", categoria: "atencion", edadMin: 8, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/vista-aguila.js" },

  // ───────── ⚡ REFLEJOS ─────────
  { id: "toca-cuando-aparezca", nombre: "Toca cuando aparezca", descripcion: "Tocá el objetivo lo más rápido posible.", beneficio: "El tiempo de reacción es una de las medidas más antiguas y confiables en psicología experimental, usada desde el siglo XIX para estudiar la velocidad del procesamiento mental.", categoria: "reflejos", edadMin: 6, dificultad: "facil", duracion: "1-2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/reflejos.js" },
  { id: "atrapa-circulo", nombre: "Atrapa el círculo", descripcion: "El objetivo cambia de posición.", beneficio: "La velocidad de procesamiento —qué tan rápido el cerebro recibe información y responde— tiende a relacionarse con el rendimiento general en tareas cognitivas más complejas.", categoria: "reflejos", edadMin: 6, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/atrapa-circulo.js" },
  { id: "pulso", nombre: "Pulso", descripcion: "Reaccioná sólo al estímulo correcto.", beneficio: "Responder sólo a ciertos estímulos e inhibir la respuesta a otros entrena el control inhibitorio, una de las funciones ejecutivas centrales según el modelo de la investigadora Adele Diamond.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/pulso.js" },
  { id: "rapido-lento", nombre: "Rápido o lento", descripcion: "Respondé según la velocidad del estímulo.", beneficio: "El tiempo de reacción es una de las medidas más antiguas y confiables en psicología experimental, usada desde el siglo XIX para estudiar la velocidad del procesamiento mental.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/rapido-lento.js" },
  { id: "dedos-veloces", nombre: "Dedos veloces", descripcion: "Repetí secuencias táctiles cada vez más rápido.", beneficio: "La velocidad de procesamiento —qué tan rápido el cerebro recibe información y responde— tiende a relacionarse con el rendimiento general en tareas cognitivas más complejas.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/dedos-veloces.js" },
  { id: "caza-burbujas", nombre: "Caza-burbujas", descripcion: "Explotá las burbujas determinadas.", beneficio: "Responder sólo a ciertos estímulos e inhibir la respuesta a otros entrena el control inhibitorio, una de las funciones ejecutivas centrales según el modelo de la investigadora Adele Diamond.", categoria: "reflejos", edadMin: 6, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/caza-burbujas.js" },
  { id: "esquiva", nombre: "Esquiva", descripcion: "Evitá los obstáculos que caen.", beneficio: "El tiempo de reacción es una de las medidas más antiguas y confiables en psicología experimental, usada desde el siglo XIX para estudiar la velocidad del procesamiento mental.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/esquiva.js" },
  { id: "rayo", nombre: "Rayo", descripcion: "Reaccioná al cambio de pantalla.", beneficio: "La velocidad de procesamiento —qué tan rápido el cerebro recibe información y responde— tiende a relacionarse con el rendimiento general en tareas cognitivas más complejas.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "1-2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/rayo.js" },
  { id: "contra-reloj", nombre: "Uno contra el reloj", descripcion: "Completá la tarea antes del tiempo límite.", beneficio: "Responder sólo a ciertos estímulos e inhibir la respuesta a otros entrena el control inhibitorio, una de las funciones ejecutivas centrales según el modelo de la investigadora Adele Diamond.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/contra-reloj.js" },
  { id: "combo-mental", nombre: "Combo mental", descripcion: "Encadená respuestas correctas sin fallar.", beneficio: "El tiempo de reacción es una de las medidas más antiguas y confiables en psicología experimental, usada desde el siglo XIX para estudiar la velocidad del procesamiento mental.", categoria: "reflejos", edadMin: 10, dificultad: "dificil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/combo-mental.js" },

  // ───────── 🔤 PALABRAS ─────────
  { id: "letras-compartidas", nombre: "Letras compartidas", descripcion: "Construyan una historia entre todos, palabra por palabra.", beneficio: "La fluidez verbal —encontrar palabras rápido según una categoría o letra— es una prueba clásica de función ejecutiva y lenguaje, usada en distintas baterías de evaluación neuropsicológica.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "5-10 min", tipo: "social", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/letras-compartidas.js", necesita: "sesion" },
  { id: "palabra-encadenada", nombre: "Palabra encadenada", descripcion: "La siguiente palabra empieza con la última letra.", beneficio: "Jugar con el lenguaje de forma activa mantiene en uso las redes cerebrales asociadas al lenguaje, algo que la investigación relaciona con la reserva cognitiva a largo plazo.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "5 min", tipo: "social", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/palabra-encadenada.js" },
  { id: "palabra-escondida", nombre: "Palabra escondida", descripcion: "Descubrí una palabra entre letras.", beneficio: "La recuperación de palabras desde la memoria, no sólo reconocerlas al verlas, exige más esfuerzo cognitivo que la simple lectura, y por eso se considera un entrenamiento más efectivo.", categoria: "palabras", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/palabra-escondida.js" },
  { id: "anagrama", nombre: "Anagrama", descripcion: "Ordená las letras para formar una palabra.", beneficio: "La fluidez verbal —encontrar palabras rápido según una categoría o letra— es una prueba clásica de función ejecutiva y lenguaje, usada en distintas baterías de evaluación neuropsicológica.", categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/anagrama.js" },
  { id: "palabra-intrusa", nombre: "Palabra intrusa", descripcion: "Encontrá cuál palabra no pertenece al grupo.", beneficio: "Jugar con el lenguaje de forma activa mantiene en uso las redes cerebrales asociadas al lenguaje, algo que la investigación relaciona con la reserva cognitiva a largo plazo.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/palabra-intrusa.js" },
  { id: "sinonimo-express", nombre: "Sinónimo express", descripcion: "Elegí el sinónimo correcto contra el reloj.", beneficio: "La recuperación de palabras desde la memoria, no sólo reconocerlas al verlas, exige más esfuerzo cognitivo que la simple lectura, y por eso se considera un entrenamiento más efectivo.", categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/sinonimo-express.js" },
  { id: "antonimo", nombre: "Antónimo", descripcion: "Encontrá el contrario de cada palabra.", beneficio: "La fluidez verbal —encontrar palabras rápido según una categoría o letra— es una prueba clásica de función ejecutiva y lenguaje, usada en distintas baterías de evaluación neuropsicológica.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/antonimo.js" },
  { id: "completa-frase", nombre: "Completá la frase", descripcion: "Seleccioná la palabra que falta.", beneficio: "Jugar con el lenguaje de forma activa mantiene en uso las redes cerebrales asociadas al lenguaje, algo que la investigación relaciona con la reserva cognitiva a largo plazo.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/completa-frase.js" },
  { id: "historias-tres-palabras", nombre: "Historias de tres palabras", descripcion: "Creá una mini historia con tres palabras dadas.", beneficio: "La recuperación de palabras desde la memoria, no sólo reconocerlas al verlas, exige más esfuerzo cognitivo que la simple lectura, y por eso se considera un entrenamiento más efectivo.", categoria: "palabras", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/historias-tres-palabras.js" },
  { id: "palabra-imposible", nombre: "Palabra imposible", descripcion: "Descubrí una palabra a partir de pistas.", beneficio: "La fluidez verbal —encontrar palabras rápido según una categoría o letra— es una prueba clásica de función ejecutiva y lenguaje, usada en distintas baterías de evaluación neuropsicológica.", categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/palabra-imposible.js" },
  { id: "diccionario-loco", nombre: "Diccionario loco", descripcion: "Inventá definiciones divertidas.", beneficio: "Jugar con el lenguaje de forma activa mantiene en uso las redes cerebrales asociadas al lenguaje, algo que la investigación relaciona con la reserva cognitiva a largo plazo.", categoria: "palabras", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "social", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/diccionario-loco.js" },
  { id: "cadena-asociaciones", nombre: "Cadena de asociaciones", descripcion: "Palabra → palabra → palabra, sin repetir.", beneficio: "La recuperación de palabras desde la memoria, no sólo reconocerlas al verlas, exige más esfuerzo cognitivo que la simple lectura, y por eso se considera un entrenamiento más efectivo.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cadena-asociaciones.js" },
  { id: "una-palabra-mil-ideas", nombre: "Una palabra, mil ideas", descripcion: "Generá tantas asociaciones como puedas.", beneficio: "La fluidez verbal —encontrar palabras rápido según una categoría o letra— es una prueba clásica de función ejecutiva y lenguaje, usada en distintas baterías de evaluación neuropsicológica.", categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/una-palabra-mil-ideas.js" },
  { id: "adivina-palabra", nombre: "Adivina la palabra", descripcion: "Estilo ahorcado, sin violencia en el diseño.", beneficio: "Jugar con el lenguaje de forma activa mantiene en uso las redes cerebrales asociadas al lenguaje, algo que la investigación relaciona con la reserva cognitiva a largo plazo.", categoria: "palabras", edadMin: 8, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/adivina-palabra.js" },
  { id: "palabras-cruzadas-rapidas", nombre: "Palabras cruzadas rápidas", descripcion: "Mini crucigramas de 5x5.", beneficio: "La recuperación de palabras desde la memoria, no sólo reconocerlas al verlas, exige más esfuerzo cognitivo que la simple lectura, y por eso se considera un entrenamiento más efectivo.", categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "5-8 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/palabras-cruzadas-rapidas.js" },

  // ───────── ❤️ EMOCIONES ─────────
  { id: "semaforo-emocional", nombre: "Semáforo emocional", descripcion: "Ubicá la intensidad de una emoción: rojo, amarillo o verde.", beneficio: "Reconocer emociones en una expresión o una situación es una habilidad central de la cognición social, estudiada en profundidad por investigadores como Simon Baron-Cohen, y se puede entrenar con la práctica.", categoria: "emociones", edadMin: 6, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/semaforo-emocional.js" },
  { id: "que-siento", nombre: "¿Qué siento?", descripcion: "Identificá la emoción a partir de una situación.", beneficio: "Asociar una emoción con su causa o contexto entrena lo que en psicología se llama 'teoría de la mente': la capacidad de entender los estados internos propios y ajenos.", categoria: "emociones", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/que-siento.js" },
  { id: "detective-emocional", nombre: "Detective emocional", descripcion: "Descubrí qué emoción experimenta un personaje.", beneficio: "La precisión para identificar emociones específicas, no sólo 'bien' o 'mal', está vinculada según investigación en inteligencia emocional a mejor regulación emocional en la vida cotidiana.", categoria: "emociones", edadMin: 8, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/detective-emocional.js" },
  { id: "termometro-emocional", nombre: "Termómetro emocional", descripcion: "Ubicá una emoción entre 0 y 10.", beneficio: "Reconocer emociones en una expresión o una situación es una habilidad central de la cognición social, estudiada en profundidad por investigadores como Simon Baron-Cohen, y se puede entrenar con la práctica.", categoria: "emociones", edadMin: 8, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/termometro-emocional.js" },
  { id: "emocion-o-pensamiento", nombre: "Emoción o pensamiento", descripcion: "Diferenciá entre ambos conceptos.", beneficio: "Asociar una emoción con su causa o contexto entrena lo que en psicología se llama 'teoría de la mente': la capacidad de entender los estados internos propios y ajenos.", categoria: "emociones", edadMin: 10, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/emocion-o-pensamiento.js" },
  { id: "que-necesita", nombre: "¿Qué necesita?", descripcion: "Identificá la necesidad detrás de una emoción.", beneficio: "La precisión para identificar emociones específicas, no sólo 'bien' o 'mal', está vinculada según investigación en inteligencia emocional a mejor regulación emocional en la vida cotidiana.", categoria: "emociones", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/que-necesita.js" },
  { id: "cambiar-perspectiva", nombre: "Cambiar la perspectiva", descripcion: "Observá una situación desde otro punto de vista.", beneficio: "Reconocer emociones en una expresión o una situación es una habilidad central de la cognición social, estudiada en profundidad por investigadores como Simon Baron-Cohen, y se puede entrenar con la práctica.", categoria: "emociones", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/cambiar-perspectiva.js" },
  { id: "misma-historia", nombre: "La misma historia", descripcion: "Distintas interpretaciones de una misma escena.", beneficio: "Asociar una emoción con su causa o contexto entrena lo que en psicología se llama 'teoría de la mente': la capacidad de entender los estados internos propios y ajenos.", categoria: "emociones", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/misma-historia.js" },
  { id: "emoji-secreto", nombre: "Emoji secreto", descripcion: "Adiviná la emoción que representa el emoji.", beneficio: "La precisión para identificar emociones específicas, no sólo 'bien' o 'mal', está vinculada según investigación en inteligencia emocional a mejor regulación emocional en la vida cotidiana.", categoria: "emociones", edadMin: 6, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/emoji-secreto.js" },
  { id: "parejas-emocionales", nombre: "Parejas emocionales", descripcion: "Emoción ↔ situación.", beneficio: "Reconocer emociones en una expresión o una situación es una habilidad central de la cognición social, estudiada en profundidad por investigadores como Simon Baron-Cohen, y se puede entrenar con la práctica.", categoria: "emociones", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/parejas-emocionales.js" },
  { id: "ruleta-emocional", nombre: "Ruleta emocional", descripcion: "Una pregunta o reflexión al azar para charlar.", beneficio: "Asociar una emoción con su causa o contexto entrena lo que en psicología se llama 'teoría de la mente': la capacidad de entender los estados internos propios y ajenos.", categoria: "emociones", edadMin: 8, dificultad: "facil", duracion: "libre", tipo: "social", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/ruleta-emocional.js" },
  { id: "mapa-emociones", nombre: "Mapa de emociones", descripcion: "Ubicá emociones en un mapa corporal.", beneficio: "La precisión para identificar emociones específicas, no sólo 'bien' o 'mal', está vinculada según investigación en inteligencia emocional a mejor regulación emocional en la vida cotidiana.", categoria: "emociones", edadMin: 8, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/mapa-emociones.js" },
  { id: "detective-pensamientos", nombre: "El detective de pensamientos", descripcion: "Identificá distorsiones cognitivas comunes.", beneficio: "Reconocer emociones en una expresión o una situación es una habilidad central de la cognición social, estudiada en profundidad por investigadores como Simon Baron-Cohen, y se puede entrenar con la práctica.", categoria: "emociones", edadMin: 14, dificultad: "dificil", duracion: "5-8 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/detective-pensamientos.js" },
  { id: "pensamiento-flexible", nombre: "Pensamiento flexible", descripcion: "Encontrá interpretaciones alternativas.", beneficio: "Asociar una emoción con su causa o contexto entrena lo que en psicología se llama 'teoría de la mente': la capacidad de entender los estados internos propios y ajenos.", categoria: "emociones", edadMin: 12, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/pensamiento-flexible.js" },
  { id: "amigo-interior", nombre: "El amigo interior", descripcion: "Elegí respuestas autocompasivas ante un error.", beneficio: "La precisión para identificar emociones específicas, no sólo 'bien' o 'mal', está vinculada según investigación en inteligencia emocional a mejor regulación emocional en la vida cotidiana.", categoria: "emociones", edadMin: 12, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/amigo-interior.js" },

  // ───────── 🧩 LÓGICA ─────────
  { id: "secuencias", nombre: "Secuencias", descripcion: "Completá el patrón que sigue.", beneficio: "Resolver problemas con reglas nuevas, no aprendidas de memoria, es lo que la psicología cognitiva llama 'inteligencia fluida': la capacidad de razonar frente a situaciones novedosas.", categoria: "logica", edadMin: 8, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/secuencias.js" },
  { id: "sudoku-mini", nombre: "Sudoku mini", descripcion: "Versiones 4×4 y 6×6, sin la complejidad del clásico.", beneficio: "Encontrar patrones y reglas ocultas entrena el razonamiento inductivo, una habilidad que distintos estudios asocian con mejor resolución de problemas en general, más allá del juego puntual.", categoria: "logica", edadMin: 10, dificultad: "media", duracion: "5-10 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/sudoku-mini.js" },
  { id: "torres", nombre: "Torres", descripcion: "Resolvé pequeños rompecabezas de apilado.", beneficio: "Resolver problemas con reglas nuevas, no aprendidas de memoria, es lo que la psicología cognitiva llama 'inteligencia fluida': la capacidad de razonar frente a situaciones novedosas.", categoria: "logica", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/torres.js" },
  { id: "puentes", nombre: "Puentes", descripcion: "Conectá los puntos siguiendo la regla del juego.", beneficio: "Encontrar patrones y reglas ocultas entrena el razonamiento inductivo, una habilidad que distintos estudios asocian con mejor resolución de problemas en general, más allá del juego puntual.", categoria: "logica", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/puentes.js" },
  { id: "laberinto", nombre: "Laberinto", descripcion: "Encontrá la salida.", beneficio: "Resolver problemas con reglas nuevas, no aprendidas de memoria, es lo que la psicología cognitiva llama 'inteligencia fluida': la capacidad de razonar frente a situaciones novedosas.", categoria: "logica", edadMin: 6, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/laberinto.js" },
  { id: "caja-fuerte", nombre: "Caja fuerte", descripcion: "Descubrí la combinación a partir de pistas.", beneficio: "Encontrar patrones y reglas ocultas entrena el razonamiento inductivo, una habilidad que distintos estudios asocian con mejor resolución de problemas en general, más allá del juego puntual.", categoria: "logica", edadMin: 10, dificultad: "dificil", duracion: "5-8 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/caja-fuerte.js" },
  { id: "que-sigue", nombre: "¿Qué sigue?", descripcion: "Completá patrones visuales.", beneficio: "Resolver problemas con reglas nuevas, no aprendidas de memoria, es lo que la psicología cognitiva llama 'inteligencia fluida': la capacidad de razonar frente a situaciones novedosas.", categoria: "logica", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/que-sigue.js" },
  { id: "equilibrio", nombre: "Equilibrio", descripcion: "Distribuí objetos correctamente en una balanza.", beneficio: "Encontrar patrones y reglas ocultas entrena el razonamiento inductivo, una habilidad que distintos estudios asocian con mejor resolución de problemas en general, más allá del juego puntual.", categoria: "logica", edadMin: 8, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/equilibrio.js" },
  { id: "tres-movimientos", nombre: "Tres movimientos", descripcion: "Resolvé el rompecabezas en pocos movimientos.", beneficio: "Resolver problemas con reglas nuevas, no aprendidas de memoria, es lo que la psicología cognitiva llama 'inteligencia fluida': la capacidad de razonar frente a situaciones novedosas.", categoria: "logica", edadMin: 10, dificultad: "dificil", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/tres-movimientos.js" },
  { id: "detective-logico", nombre: "Detective lógico", descripcion: "Resolvé un caso a partir de pistas.", beneficio: "Encontrar patrones y reglas ocultas entrena el razonamiento inductivo, una habilidad que distintos estudios asocian con mejor resolución de problemas en general, más allá del juego puntual.", categoria: "logica", edadMin: 10, dificultad: "media", duracion: "5-8 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/detective-logico.js" },

  // ───────── 🔢 NÚMEROS ─────────
  { id: "calculo-mental", nombre: "Cálculo mental", descripcion: "Resolvé operaciones antes de que se acabe el tiempo.", beneficio: "El sentido numérico —estimar cantidades sin contar una por una— es una capacidad cognitiva estudiada en profundidad por investigadores como Stanislas Dehaene, presente incluso antes de aprender a contar de forma formal.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/calculo-mental.js" },
  { id: "numero-objetivo", nombre: "Número objetivo", descripcion: "Combiná números para alcanzar un resultado.", beneficio: "Operar con números bajo presión de tiempo entrena tanto el cálculo como la velocidad de procesamiento, dos habilidades relacionadas pero distintas.", categoria: "numeros", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/numero-objetivo.js" },
  { id: "mayor-menor", nombre: "Mayor o menor", descripcion: "Compará números rápidamente.", beneficio: "El sentido numérico —estimar cantidades sin contar una por una— es una capacidad cognitiva estudiada en profundidad por investigadores como Stanislas Dehaene, presente incluso antes de aprender a contar de forma formal.", categoria: "numeros", edadMin: 6, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/mayor-menor.js" },
  { id: "secuencia-numerica", nombre: "Secuencia numérica", descripcion: "Descubrí el número que sigue.", beneficio: "Operar con números bajo presión de tiempo entrena tanto el cálculo como la velocidad de procesamiento, dos habilidades relacionadas pero distintas.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/secuencia-numerica.js" },
  { id: "memoria-numerica", nombre: "Memoria numérica", descripcion: "Recordá secuencias de números.", beneficio: "El sentido numérico —estimar cantidades sin contar una por una— es una capacidad cognitiva estudiada en profundidad por investigadores como Stanislas Dehaene, presente incluso antes de aprender a contar de forma formal.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/memoria-numerica.js" },
  { id: "cuenta-regresiva", nombre: "Cuenta regresiva", descripcion: "Resolvé antes de que el reloj llegue a cero.", beneficio: "Operar con números bajo presión de tiempo entrena tanto el cálculo como la velocidad de procesamiento, dos habilidades relacionadas pero distintas.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cuenta-regresiva.js" },
  { id: "suma-explosiva", nombre: "Suma explosiva", descripcion: "Combiná números rápido antes de que exploten.", beneficio: "El sentido numérico —estimar cantidades sin contar una por una— es una capacidad cognitiva estudiada en profundidad por investigadores como Stanislas Dehaene, presente incluso antes de aprender a contar de forma formal.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/suma-explosiva.js" },
  { id: "matematica-visual", nombre: "Matemática visual", descripcion: "Resolvé operaciones mediante imágenes.", beneficio: "Operar con números bajo presión de tiempo entrena tanto el cálculo como la velocidad de procesamiento, dos habilidades relacionadas pero distintas.", categoria: "numeros", edadMin: 6, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/matematica-visual.js" },
  { id: "par-o-impar", nombre: "Par o impar", descripcion: "Decidí rápido si el número es par o impar.", beneficio: "El sentido numérico —estimar cantidades sin contar una por una— es una capacidad cognitiva estudiada en profundidad por investigadores como Stanislas Dehaene, presente incluso antes de aprender a contar de forma formal.", categoria: "numeros", edadMin: 6, dificultad: "facil", duracion: "1 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/par-o-impar.js" },
  { id: "resta-relampago", nombre: "Resta relámpago", descripcion: "Resolvé restas antes de perder todas las vidas.", beneficio: "Operar con números bajo presión de tiempo entrena tanto el cálculo como la velocidad de procesamiento, dos habilidades relacionadas pero distintas.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/resta-relampago.js" },
  { id: "tabla-multiplicar", nombre: "Tabla de multiplicar", descripcion: "Resolvé multiplicaciones antes de que se acabe el tiempo.", beneficio: "El sentido numérico —estimar cantidades sin contar una por una— es una capacidad cognitiva estudiada en profundidad por investigadores como Stanislas Dehaene, presente incluso antes de aprender a contar de forma formal.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "1 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/tabla-multiplicar.js" },
  { id: "estimacion-rapida", nombre: "Estimación rápida", descripcion: "Calculá cuántos puntos ves, sin contarlos de a uno.", beneficio: "Operar con números bajo presión de tiempo entrena tanto el cálculo como la velocidad de procesamiento, dos habilidades relacionadas pero distintas.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/estimacion-rapida.js" },

  // ───────── 🌀 FLEXIBILIDAD ─────────
  { id: "stroop", nombre: "Stroop visual", descripcion: "Elegí el color de la tinta, no la palabra.", beneficio: "La flexibilidad cognitiva —cambiar de estrategia cuando la regla cambia— es una de las tres funciones ejecutivas centrales según el modelo de la investigadora Adele Diamond, junto con la memoria de trabajo y el control inhibitorio.", categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/stroop.js" },
  { id: "cambia-regla", nombre: "Cambia la regla", descripcion: "Alterná entre consignas sin previo aviso.", beneficio: "Adaptarse a una consigna que cambia sin aviso entrena directamente lo que la neuropsicología llama 'cambio de set': salir de un patrón de respuesta ya establecido.", categoria: "flexibilidad", edadMin: 10, dificultad: "dificil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cambia-regla.js" },
  { id: "ahora-al-reves", nombre: "Ahora al revés", descripcion: "Respondé exactamente lo contrario.", beneficio: "La flexibilidad cognitiva —cambiar de estrategia cuando la regla cambia— es una de las tres funciones ejecutivas centrales según el modelo de la investigadora Adele Diamond, junto con la memoria de trabajo y el control inhibitorio.", categoria: "flexibilidad", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/ahora-al-reves.js" },
  { id: "clasifica", nombre: "Clasificá", descripcion: "El criterio de clasificación cambia sobre la marcha.", beneficio: "Adaptarse a una consigna que cambia sin aviso entrena directamente lo que la neuropsicología llama 'cambio de set': salir de un patrón de respuesta ya establecido.", categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/clasifica.js" },
  { id: "dos-caminos", nombre: "Dos caminos", descripcion: "Elegí una estrategia y sostenela.", beneficio: "La flexibilidad cognitiva —cambiar de estrategia cuando la regla cambia— es una de las tres funciones ejecutivas centrales según el modelo de la investigadora Adele Diamond, junto con la memoria de trabajo y el control inhibitorio.", categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/dos-caminos.js" },
  { id: "regla-secreta", nombre: "Regla secreta", descripcion: "Descubrí qué tienen en común los elementos.", beneficio: "Adaptarse a una consigna que cambia sin aviso entrena directamente lo que la neuropsicología llama 'cambio de set': salir de un patrón de respuesta ya establecido.", categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/regla-secreta.js" },
  { id: "cambio-inesperado", nombre: "Cambio inesperado", descripcion: "Adaptá tu estrategia cuando cambia el escenario.", beneficio: "La flexibilidad cognitiva —cambiar de estrategia cuando la regla cambia— es una de las tres funciones ejecutivas centrales según el modelo de la investigadora Adele Diamond, junto con la memoria de trabajo y el control inhibitorio.", categoria: "flexibilidad", edadMin: 10, dificultad: "dificil", duracion: "4 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cambio-inesperado.js" },
  { id: "par-o-impar-cambiante", nombre: "Regla que cambia", descripcion: "La regla de par/impar cambia sin aviso: prestá atención.", beneficio: "Adaptarse a una consigna que cambia sin aviso entrena directamente lo que la neuropsicología llama 'cambio de set': salir de un patrón de respuesta ya establecido.", categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/par-o-impar-cambiante.js" },
  { id: "izquierda-o-derecha-invertido", nombre: "Izquierda o derecha", descripcion: "Seguí la flecha, pero a veces hay que ir al revés.", beneficio: "La flexibilidad cognitiva —cambiar de estrategia cuando la regla cambia— es una de las tres funciones ejecutivas centrales según el modelo de la investigadora Adele Diamond, junto con la memoria de trabajo y el control inhibitorio.", categoria: "flexibilidad", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/izquierda-o-derecha-invertido.js" },
  { id: "clasifica-el-turno", nombre: "Clasificá por turno", descripcion: "El criterio para clasificar cambia cada pocas rondas.", beneficio: "Adaptarse a una consigna que cambia sin aviso entrena directamente lo que la neuropsicología llama 'cambio de set': salir de un patrón de respuesta ya establecido.", categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/clasifica-el-turno.js" },
  { id: "stroop-numerico", nombre: "Stroop numérico", descripcion: "Elegí por valor o por tamaño, según la regla del momento.", beneficio: "La flexibilidad cognitiva —cambiar de estrategia cuando la regla cambia— es una de las tres funciones ejecutivas centrales según el modelo de la investigadora Adele Diamond, junto con la memoria de trabajo y el control inhibitorio.", categoria: "flexibilidad", edadMin: 10, dificultad: "dificil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/stroop-numerico.js" },
  { id: "instruccion-cambiante", nombre: "Instrucción cambiante", descripcion: "A veces hay que seguir la flecha, a veces la palabra.", beneficio: "Adaptarse a una consigna que cambia sin aviso entrena directamente lo que la neuropsicología llama 'cambio de set': salir de un patrón de respuesta ya establecido.", categoria: "flexibilidad", edadMin: 10, dificultad: "dificil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/instruccion-cambiante.js" },

  // ───────── 🤝 VÍNCULOS ─────────
  { id: "que-responderias", nombre: "¿Qué responderías?", descripcion: "Elegí cómo responder ante distintas situaciones sociales.", beneficio: "Jugar con otra persona, coordinando turnos o resolviendo algo en conjunto, entrena habilidades de cognición social que sólo se desarrollan en interacción real, no en solitario.", categoria: "vinculos", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/que-responderias.js" },
  { id: "conversacion-dificil", nombre: "Conversación difícil", descripcion: "Elegí distintas formas de responder en una charla tensa.", beneficio: "Anticipar lo que otra persona va a hacer o pensar, algo relevante en juegos de a dos, es parte de lo que la psicología del desarrollo llama 'teoría de la mente'.", categoria: "vinculos", edadMin: 12, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/conversacion-dificil.js" },
  { id: "detective-social", nombre: "Detective social", descripcion: "Interpretá señales sociales en una escena.", beneficio: "Jugar con otra persona, coordinando turnos o resolviendo algo en conjunto, entrena habilidades de cognición social que sólo se desarrollan en interacción real, no en solitario.", categoria: "vinculos", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/detective-social.js" },
  { id: "perspectivas", nombre: "Perspectivas", descripcion: "Descubrí cómo pueden pensar distintos personajes.", beneficio: "Anticipar lo que otra persona va a hacer o pensar, algo relevante en juegos de a dos, es parte de lo que la psicología del desarrollo llama 'teoría de la mente'.", categoria: "vinculos", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/perspectivas.js" },
  { id: "empatia", nombre: "Empatía", descripcion: "Elegí la respuesta más empática ante cada situación.", beneficio: "Jugar con otra persona, coordinando turnos o resolviendo algo en conjunto, entrena habilidades de cognición social que sólo se desarrollan en interacción real, no en solitario.", categoria: "vinculos", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/empatia.js" },
  { id: "limites", nombre: "Límites", descripcion: "Practicá respuestas asertivas.", beneficio: "Anticipar lo que otra persona va a hacer o pensar, algo relevante en juegos de a dos, es parte de lo que la psicología del desarrollo llama 'teoría de la mente'.", categoria: "vinculos", edadMin: 12, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/limites.js" },
  { id: "decir-que-no", nombre: "Decir que no", descripcion: "Distintos escenarios para practicar poner un límite.", beneficio: "Jugar con otra persona, coordinando turnos o resolviendo algo en conjunto, entrena habilidades de cognición social que sólo se desarrollan en interacción real, no en solitario.", categoria: "vinculos", edadMin: 12, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/decir-que-no.js" },
  { id: "malentendido", nombre: "Malentendido", descripcion: "Detectá en qué momento se produjo la confusión.", beneficio: "Anticipar lo que otra persona va a hacer o pensar, algo relevante en juegos de a dos, es parte de lo que la psicología del desarrollo llama 'teoría de la mente'.", categoria: "vinculos", edadMin: 10, dificultad: "media", duracion: "4 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/malentendido.js" },
  { id: "puentes-vinculos", nombre: "Puentes", descripcion: "Encontrá puntos de encuentro entre dos personajes.", beneficio: "Jugar con otra persona, coordinando turnos o resolviendo algo en conjunto, entrena habilidades de cognición social que sólo se desarrollan en interacción real, no en solitario.", categoria: "vinculos", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/puentes-vinculos.js" },
  { id: "resolver-conflictos", nombre: "Resolver conflictos", descripcion: "Elegí la mejor forma de resolver un desacuerdo.", beneficio: "Anticipar lo que otra persona va a hacer o pensar, algo relevante en juegos de a dos, es parte de lo que la psicología del desarrollo llama 'teoría de la mente'.", categoria: "vinculos", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/resolver-conflictos.js" },
  { id: "escucha-activa", nombre: "Escucha activa", descripcion: "Elegí la respuesta que muestra mejor escucha.", beneficio: "Jugar con otra persona, coordinando turnos o resolviendo algo en conjunto, entrena habilidades de cognición social que sólo se desarrollan en interacción real, no en solitario.", categoria: "vinculos", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/escucha-activa.js" },
  { id: "compartir-sentimientos", nombre: "Compartir sentimientos", descripcion: "Practicá formas sanas de expresar lo que sentís.", beneficio: "Anticipar lo que otra persona va a hacer o pensar, algo relevante en juegos de a dos, es parte de lo que la psicología del desarrollo llama 'teoría de la mente'.", categoria: "vinculos", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/compartir-sentimientos.js" },

  // ───────── 🧸 NIÑOS ─────────
  { id: "memoria-animales", nombre: "Memoria de animales", descripcion: "Encontrá los pares de animalitos.", beneficio: "Este tipo de juego está pensado para las primeras etapas del desarrollo cognitivo, cuando el cerebro forma las bases de funciones que después se vuelven más complejas, como la atención y la memoria.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/memoria-animales.js" },
  { id: "animales-escondidos", nombre: "Animales escondidos", descripcion: "Encontrá los animales escondidos en la escena.", beneficio: "Jugar de forma simple y repetida es, para el desarrollo infantil, una de las formas más efectivas de aprendizaje: no hace falta que el juego sea complicado para que sea valioso.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/animales-escondidos.js" },
  { id: "colores", nombre: "Colores", descripcion: "Identificá el color correcto.", beneficio: "Este tipo de juego está pensado para las primeras etapas del desarrollo cognitivo, cuando el cerebro forma las bases de funciones que después se vuelven más complejas, como la atención y la memoria.", categoria: "ninos", edadMin: 3, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/colores.js" },
  { id: "formas", nombre: "Formas", descripcion: "Reconocé las figuras geométricas.", beneficio: "Jugar de forma simple y repetida es, para el desarrollo infantil, una de las formas más efectivas de aprendizaje: no hace falta que el juego sea complicado para que sea valioso.", categoria: "ninos", edadMin: 3, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/formas.js" },
  { id: "secuencias-infantiles", nombre: "Secuencias infantiles", descripcion: "Ordená las imágenes en el orden correcto.", beneficio: "Este tipo de juego está pensado para las primeras etapas del desarrollo cognitivo, cuando el cerebro forma las bases de funciones que después se vuelven más complejas, como la atención y la memoria.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/secuencias-infantiles.js" },
  { id: "que-falta-ninos", nombre: "¿Qué falta?", descripcion: "Detectá qué objeto no está.", beneficio: "Jugar de forma simple y repetida es, para el desarrollo infantil, una de las formas más efectivas de aprendizaje: no hace falta que el juego sea complicado para que sea valioso.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/que-falta-ninos.js" },
  { id: "tamanos", nombre: "Tamaños", descripcion: "Tocá el más grande o el más chiquito.", beneficio: "Este tipo de juego está pensado para las primeras etapas del desarrollo cognitivo, cuando el cerebro forma las bases de funciones que después se vuelven más complejas, como la atención y la memoria.", categoria: "ninos", edadMin: 3, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/tamanos.js" },
  { id: "cuenta-conmigo", nombre: "Cuenta conmigo", descripcion: "Contá cuántos objetos hay.", beneficio: "Jugar de forma simple y repetida es, para el desarrollo infantil, una de las formas más efectivas de aprendizaje: no hace falta que el juego sea complicado para que sea valioso.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cuenta-conmigo.js" },
  { id: "adivina-el-animal", nombre: "Adiviná el animal", descripcion: "Adiviná el animal a partir de una pista.", beneficio: "Este tipo de juego está pensado para las primeras etapas del desarrollo cognitivo, cuando el cerebro forma las bases de funciones que después se vuelven más complejas, como la atención y la memoria.", categoria: "ninos", edadMin: 3, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/adivina-el-animal.js" },
  { id: "opuestos", nombre: "Opuestos", descripcion: "Encontrá la imagen opuesta.", beneficio: "Jugar de forma simple y repetida es, para el desarrollo infantil, una de las formas más efectivas de aprendizaje: no hace falta que el juego sea complicado para que sea valioso.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/opuestos.js" },
  { id: "encuentra-la-fruta", nombre: "Encontrá la fruta", descripcion: "Tocá la fruta entre otros objetos.", beneficio: "Este tipo de juego está pensado para las primeras etapas del desarrollo cognitivo, cuando el cerebro forma las bases de funciones que después se vuelven más complejas, como la atención y la memoria.", categoria: "ninos", edadMin: 3, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/encuentra-la-fruta.js" },
  { id: "figura-igual", nombre: "Figura igual", descripcion: "Encontrá la figura con la misma forma y color.", beneficio: "Jugar de forma simple y repetida es, para el desarrollo infantil, una de las formas más efectivas de aprendizaje: no hace falta que el juego sea complicado para que sea valioso.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/figura-igual.js" },

  // ═══════ Motor genérico: memoria-tematica ═══════
  { id: "memoria-banderas-paises", nombre: "Memoria de banderas", descripcion: "Encontrá las parejas de banderas de distintos países.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 8, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-planetas", nombre: "Memoria del sistema solar", descripcion: "Encontrá las parejas de cuerpos celestes.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 7, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-herramientas", nombre: "Memoria de herramientas", descripcion: "Encontrá las parejas de herramientas.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 7, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-transporte", nombre: "Memoria de transportes", descripcion: "Encontrá las parejas de medios de transporte.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 6, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-clima-avanzada", nombre: "Memoria del clima", descripcion: "Encontrá las parejas de fenómenos climáticos.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 7, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-deportes", nombre: "Memoria de deportes", descripcion: "Encontrá las parejas de deportes.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 7, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-insectos", nombre: "Memoria de insectos", descripcion: "Encontrá las parejas de insectos y pequeños bichos.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 7, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-postres", nombre: "Memoria de postres", descripcion: "Encontrá las parejas de postres.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 6, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-flores", nombre: "Memoria de flores", descripcion: "Encontrá las parejas de flores.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 6, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-profesiones", nombre: "Memoria de profesiones", descripcion: "Encontrá las parejas de oficios y profesiones.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 8, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-instrumentos-avanzada", nombre: "Memoria de instrumentos musicales", descripcion: "Un desafío más grande: siete instrumentos para emparejar.",
    beneficio: "Encontrar 7 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 9, dificultad: "media", duracion: "5-8 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-frutas-tropicales", nombre: "Memoria de frutas tropicales", descripcion: "Encontrá las parejas de frutas.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 6, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-mar-profundo", nombre: "Memoria del mar profundo", descripcion: "Encontrá las parejas de criaturas marinas.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 7, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-utiles-escolares", nombre: "Memoria de útiles escolares", descripcion: "Encontrá las parejas de útiles de la escuela.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 6, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-cielo-nocturno", nombre: "Memoria del cielo nocturno", descripcion: "Un desafío grande: siete elementos del cielo de noche.",
    beneficio: "Encontrar 7 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "memoria", edadMin: 9, dificultad: "media", duracion: "5-8 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-paises-texto", nombre: "Memoria de países", descripcion: "Encontrá las parejas de nombres de países.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "palabras", edadMin: 9, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-verbos-comunes", nombre: "Memoria de verbos", descripcion: "Encontrá las parejas de verbos.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-colores-en-palabras", nombre: "Memoria de colores (en palabras)", descripcion: "Encontrá las parejas de nombres de colores.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "palabras", edadMin: 7, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-emociones-en-palabras", nombre: "Memoria de emociones (en palabras)", descripcion: "Encontrá las parejas de nombres de emociones.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-animales-selva-jg", nombre: "Memoria de animales de la selva", descripcion: "Encontrá las parejas de animales salvajes.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-animales-granja-jg", nombre: "Memoria de animales de granja", descripcion: "Encontrá las parejas de animales de granja.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "ninos", edadMin: 3, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-juguetes", nombre: "Memoria de juguetes", descripcion: "Encontrá las parejas de juguetes.",
    beneficio: "Encontrar 6 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-numeros-ninos", nombre: "Memoria de números", descripcion: "Encontrá las parejas de números.",
    beneficio: "Encontrar 5 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-formas-ninos-jg", nombre: "Memoria de formas", descripcion: "Encontrá las parejas de formas.",
    beneficio: "Encontrar 5 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "ninos", edadMin: 3, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  { id: "memoria-clima-ninos", nombre: "Memoria del clima", descripcion: "Encontrá las parejas de climas.",
    beneficio: "Encontrar 5 parejas entrena la memoria de trabajo visoespacial: sostener en la mente dónde está cada carta mientras se buscan las coincidencias.",
    categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/memoria-tematica.js" },

  // ═══════ Motor genérico: trivia-tematica ═══════
  { id: "atencion-detalles-de-la-escena", nombre: "Detalles de la escena", descripcion: "Leé con atención y respondé sobre los detalles.",
    beneficio: "Retener detalles específicos de una descripción entrena la atención selectiva y la memoria a corto plazo, dos funciones que trabajan juntas todo el tiempo en la vida cotidiana.",
    categoria: "atencion", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "atencion-orden-de-los-eventos", nombre: "El orden de los eventos", descripcion: "Reconstruí qué pasó primero según el relato.",
    beneficio: "Recordar el orden temporal de una serie de eventos es una habilidad ligada a la comprensión narrativa y a la memoria episódica.",
    categoria: "atencion", edadMin: 9, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "atencion-encontrar-el-intruso", nombre: "Encontrá el intruso", descripcion: "Un elemento no pertenece al grupo. Encontralo.",
    beneficio: "Detectar qué elemento no pertenece a una categoría entrena la clasificación y la atención a las excepciones de una regla.",
    categoria: "atencion", edadMin: 9, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "atencion-quien-dijo-que", nombre: "¿Quién dijo qué?", descripcion: "Seguí el diálogo y recordá quién dijo cada cosa.",
    beneficio: "Seguir quién dice qué en una conversación entrena la memoria de trabajo verbal, la misma que usamos todo el tiempo en charlas reales.",
    categoria: "atencion", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "atencion-numeros-escondidos", nombre: "Números escondidos", descripcion: "Encontrá el número que falta en cada frase.",
    beneficio: "Procesar números dentro de un texto, en vez de aislados, entrena la atención dividida entre lenguaje y cálculo.",
    categoria: "atencion", edadMin: 9, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "atencion-la-frase-exacta", nombre: "La frase exacta", descripcion: "Elegí la opción que coincide exactamente con lo que se dijo.",
    beneficio: "Distinguir una frase exacta de una parecida pero distinta entrena la precisión lectora, más allá de captar solo la idea general.",
    categoria: "atencion", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "atencion-contar-con-condicion", nombre: "Contar con una condición", descripcion: "Contá solo lo que cumple la condición pedida.",
    beneficio: "Aplicar una condición mientras se cuenta (no solo contar todo) entrena el filtrado activo de información, una función atencional más exigente que el conteo simple.",
    categoria: "atencion", edadMin: 10, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "atencion-comparar-cantidades", nombre: "Comparar cantidades", descripcion: "Decidí cuál cantidad es mayor en cada situación.",
    beneficio: "Comparar cantidades descriptas verbalmente, sin verlas, entrena la representación mental de números.",
    categoria: "atencion", edadMin: 8, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "atencion-a-las-instrucciones", nombre: "Atención a las instrucciones", descripcion: "Leé bien la instrucción antes de elegir.",
    beneficio: "Leer una instrucción completa antes de actuar, en vez de responder por impulso a la primera parte, es una habilidad de control atencional que se puede entrenar.",
    categoria: "atencion", edadMin: 9, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "atencion-al-patron-verbal", nombre: "El patrón verbal", descripcion: "Encontrá la palabra que sigue el mismo patrón.",
    beneficio: "Detectar patrones en el lenguaje (no solo en números o formas) entrena la generalización de reglas, una habilidad cognitiva de base.",
    categoria: "atencion", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "palabras-sinonimos-exactos", nombre: "Sinónimos exactos", descripcion: "Elegí el sinónimo más preciso.",
    beneficio: "Ampliar el vocabulario de sinónimos permite expresar matices más precisos de significado, no solo repetir la misma palabra siempre.",
    categoria: "palabras", edadMin: 9, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "palabras-antonimos-exactos", nombre: "Antónimos exactos", descripcion: "Elegí la palabra opuesta.",
    beneficio: "Reconocer antónimos entrena la organización semántica del vocabulario: entender una palabra también por lo que NO significa.",
    categoria: "palabras", edadMin: 9, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "palabras-completa-el-refran", nombre: "Completá el refrán", descripcion: "Terminá estos dichos populares.",
    beneficio: "Los refranes son parte del conocimiento cultural compartido de un idioma, y completarlos entrena la memoria semántica de largo plazo.",
    categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "palabras-de-donde-viene", nombre: "¿De dónde viene esa palabra?", descripcion: "Elegí el origen o campo semántico correcto.",
    beneficio: "Conocer de dónde vienen las palabras (su campo semántico o su origen) profundiza la comprensión del idioma más allá de memorizar significados sueltos.",
    categoria: "palabras", edadMin: 11, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "palabras-una-letra-de-diferencia", nombre: "Una letra de diferencia", descripcion: "Encontrá la palabra que cambia todo el significado.",
    beneficio: "Notar que una sola letra puede cambiar completamente el significado de una palabra entrena la atención ortográfica fina.",
    categoria: "palabras", edadMin: 9, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "palabras-clasificar-tipo", nombre: "¿Sustantivo, verbo o adjetivo?", descripcion: "Clasificá cada palabra según su función.",
    beneficio: "Reconocer la función gramatical de una palabra (sustantivo, verbo, adjetivo) es la base para construir frases más complejas y precisas.",
    categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "emociones-en-el-trabajo", nombre: "Emociones en el trabajo", descripcion: "Reconocé emociones en situaciones laborales.",
    beneficio: "Reconocer emociones en contextos específicos, como el trabajo, entrena la inteligencia emocional aplicada a la vida cotidiana adulta.",
    categoria: "emociones", edadMin: 14, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "emociones-en-la-familia", nombre: "Emociones en la familia", descripcion: "Reconocé emociones en situaciones familiares.",
    beneficio: "Practicar el reconocimiento de emociones en vínculos cercanos ayuda a anticipar reacciones y a comunicarse con más empatía.",
    categoria: "emociones", edadMin: 12, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "emociones-sutiles", nombre: "Emociones sutiles", descripcion: "Reconocé matices emocionales más finos.",
    beneficio: "Distinguir emociones parecidas pero distintas —como la nostalgia de la tristeza— es lo que la psicóloga Lisa Feldman Barrett llama 'granularidad emocional'.",
    categoria: "emociones", edadMin: 13, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "emociones-y-el-cuerpo", nombre: "Emociones y el cuerpo", descripcion: "Relacioná cada emoción con su señal corporal típica.",
    beneficio: "Las emociones tienen correlatos físicos reales: el cuerpo suele avisar antes de que la mente termine de nombrar lo que se siente.",
    categoria: "emociones", edadMin: 11, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "emociones-en-la-amistad", nombre: "Emociones en la amistad", descripcion: "Reconocé emociones típicas entre amigos.",
    beneficio: "Reconocer emociones específicas de la amistad (como los celos entre amigos o el alivio de reencontrarse) ayuda a entender mejor los propios vínculos.",
    categoria: "emociones", edadMin: 11, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "emociones-decisiones-dificiles", nombre: "Emociones en decisiones difíciles", descripcion: "Reconocé qué se siente al decidir entre dos opciones.",
    beneficio: "Las decisiones difíciles suelen generar una mezcla de emociones —duelo por lo que se deja, esperanza por lo que se elige— en vez de una sola emoción pura.",
    categoria: "emociones", edadMin: 13, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "emociones-frente-al-fracaso", nombre: "Emociones frente al fracaso", descripcion: "Reconocé cómo se siente fallar en distintos contextos.",
    beneficio: "Aceptar que el fracaso genera emociones reales, no solo 'hay que superarlo', es un primer paso hacia una relación más sana con el error.",
    categoria: "emociones", edadMin: 12, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "emociones-al-lograr-algo", nombre: "Emociones al lograr algo", descripcion: "Reconocé emociones asociadas a los logros.",
    beneficio: "Reconocer las emociones positivas con la misma atención que las negativas ayuda a disfrutarlas más plenamente, sin apuro por pasar a lo siguiente.",
    categoria: "emociones", edadMin: 10, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "emociones-cuando-alguien-cambia", nombre: "Cuando alguien cambia", descripcion: "Reconocé emociones frente a cambios en otras personas.",
    beneficio: "Los cambios en las personas cercanas —para bien o para mal— generan emociones que vale la pena reconocer, en vez de solo adaptarse en silencio.",
    categoria: "emociones", edadMin: 13, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "emociones-primera-impresion", nombre: "La primera impresión", descripcion: "Reconocé emociones que aparecen al conocer a alguien.",
    beneficio: "Las primeras impresiones activan emociones rápidas e instintivas, que después pueden confirmarse o cambiar completamente con el tiempo.",
    categoria: "emociones", edadMin: 11, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "logica-silogismos-2", nombre: "Silogismos", descripcion: "Razoná paso a paso hasta la conclusión correcta.",
    beneficio: "Los silogismos son la base clásica del razonamiento deductivo, estudiada desde Aristóteles: si las premisas son ciertas, la conclusión lógica también lo es.",
    categoria: "logica", edadMin: 12, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "logica-problemas-de-edades", nombre: "Problemas de edades", descripcion: "Resolvé estos clásicos acertijos de edades.",
    beneficio: "Los problemas de edades son un clásico del razonamiento lógico-matemático: requieren traducir una relación verbal en una ecuación simple.",
    categoria: "logica", edadMin: 12, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "logica-deducciones-simples", nombre: "Deducciones simples", descripcion: "Usá pistas para llegar a la conclusión correcta.",
    beneficio: "Combinar varias pistas parciales para llegar a una única conclusión es la base del razonamiento deductivo usado en la resolución de problemas.",
    categoria: "logica", edadMin: 11, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "logica-proporciones", nombre: "Proporciones y relaciones", descripcion: "Resolvé problemas de proporciones simples.",
    beneficio: "Entender proporciones (si X aumenta, cómo cambia Y) es una habilidad de razonamiento matemático usada en la vida diaria, desde cocinar hasta hacer compras.",
    categoria: "logica", edadMin: 12, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "logica-el-mentiroso", nombre: "El mentiroso y el sincero", descripcion: "Descubrí quién dice la verdad usando lógica.",
    beneficio: "Los acertijos de 'el mentiroso y el sincero' son un clásico de la lógica proposicional, popularizados por el matemático Raymond Smullyan.",
    categoria: "logica", edadMin: 13, dificultad: "profundo", duracion: "5-8 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "logica-secuencias-de-letras-2", nombre: "Secuencias de letras", descripcion: "Descubrí el patrón y completá la secuencia.",
    beneficio: "Encontrar patrones alfabéticos entrena el mismo tipo de razonamiento abstracto que los patrones numéricos, pero con otro tipo de símbolo.",
    categoria: "logica", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "logica-problemas-de-balanza", nombre: "El problema de la balanza", descripcion: "Resolvé estos acertijos clásicos de peso.",
    beneficio: "Los problemas de balanza son un clásico de la lógica: obligan a pensar en términos de comparación relativa, no de valores absolutos.",
    categoria: "logica", edadMin: 12, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "logica-veo-veo-numerico", nombre: "Veo veo numérico", descripcion: "Descubrí el número secreto con las pistas dadas.",
    beneficio: "Combinar varias pistas (par/impar, mayor/menor, cantidad de dígitos) para acotar un número es un ejercicio real de razonamiento deductivo por eliminación.",
    categoria: "logica", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "numeros-porcentajes-simples", nombre: "Porcentajes simples", descripcion: "Calculá porcentajes de la vida cotidiana.",
    beneficio: "Calcular porcentajes es una habilidad matemática con aplicación directa en la vida diaria: descuentos, propinas, estadísticas.",
    categoria: "numeros", edadMin: 12, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "numeros-fracciones-simples", nombre: "Fracciones simples", descripcion: "Resolvé estos problemas con fracciones.",
    beneficio: "Trabajar con fracciones entrena una forma de pensamiento numérico distinta a los números enteros: pensar en partes de un todo.",
    categoria: "numeros", edadMin: 11, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "numeros-estimar-cantidades", nombre: "Estimar cantidades", descripcion: "Elegí la estimación más razonable, sin calcular exacto.",
    beneficio: "Estimar en vez de calcular exacto es una habilidad numérica real y muy usada: saber si un resultado 'tiene sentido' sin hacer la cuenta completa.",
    categoria: "numeros", edadMin: 11, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "numeros-romanos", nombre: "Números romanos", descripcion: "Convertí y reconocé números romanos.",
    beneficio: "Los números romanos, aunque ya no se usan para calcular, siguen apareciendo en relojes, capítulos y siglos: reconocerlos es una habilidad práctica.",
    categoria: "numeros", edadMin: 11, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "numeros-unidades-de-medida", nombre: "Unidades de medida", descripcion: "Convertí entre unidades comunes.",
    beneficio: "Convertir entre unidades de medida (metros, kilos, litros) es una habilidad numérica aplicada que se usa constantemente en la vida diaria.",
    categoria: "numeros", edadMin: 11, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "numeros-probabilidad-simple", nombre: "Probabilidad simple", descripcion: "Estimá qué tan probable es cada evento.",
    beneficio: "Estimar probabilidades, aunque sea de forma intuitiva, es una habilidad numérica que ayuda a tomar decisiones más informadas en la vida diaria.",
    categoria: "numeros", edadMin: 12, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "numeros-multiplicaciones-mentales", nombre: "Multiplicaciones mentales", descripcion: "Resolvé estas multiplicaciones sin calculadora.",
    beneficio: "El cálculo mental entrena la memoria de trabajo numérica y la fluidez aritmética, más allá de saber el procedimiento en papel.",
    categoria: "numeros", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-como-responderias-2", nombre: "¿Cómo responderías?", descripcion: "Elegí la respuesta más constructiva en cada situación.",
    beneficio: "Practicar respuestas constructivas ante situaciones sociales difíciles, aunque sea en un juego, entrena patrones de comunicación más sanos.",
    categoria: "vinculos", edadMin: 13, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-leer-entre-lineas", nombre: "Leer entre líneas", descripcion: "Interpretá lo que alguien quiere decir, más allá de las palabras.",
    beneficio: "Interpretar el mensaje detrás de las palabras literales —el subtexto— es una habilidad social avanzada, muy usada en comunicación cotidiana.",
    categoria: "vinculos", edadMin: 13, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-limites-sanos", nombre: "Límites sanos", descripcion: "Elegí la forma más sana de poner un límite.",
    beneficio: "Poner límites de forma clara y respetuosa, sin agresividad ni sumisión, es una habilidad central de la comunicación asertiva.",
    categoria: "vinculos", edadMin: 13, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-detectar-el-tono", nombre: "Detectar el tono", descripcion: "Interpretá el tono emocional de cada mensaje.",
    beneficio: "Interpretar el tono emocional detrás de un mensaje, incluso escrito, es cada vez más relevante en la comunicación digital, donde no hay tono de voz real.",
    categoria: "vinculos", edadMin: 12, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-resolver-malentendidos", nombre: "Resolver malentendidos", descripcion: "Elegí la mejor forma de aclarar un malentendido.",
    beneficio: "La mayoría de los conflictos cotidianos no son por mala intención, sino por malentendidos; aclarar en vez de asumir suele resolverlos rápido.",
    categoria: "vinculos", edadMin: 12, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-empatia-en-accion", nombre: "Empatía en acción", descripcion: "Elegí la respuesta más empática en cada situación.",
    beneficio: "La empatía no es solo sentir con el otro, sino traducir eso en una respuesta concreta que la otra persona pueda sentir como apoyo real.",
    categoria: "vinculos", edadMin: 12, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-perspectivas-distintas", nombre: "Perspectivas distintas", descripcion: "Pensá cómo vería la situación la otra persona.",
    beneficio: "Imaginar activamente el punto de vista del otro (no solo el propio) es la base de lo que la psicología llama 'toma de perspectiva'.",
    categoria: "vinculos", edadMin: 13, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-pedir-ayuda", nombre: "Pedir ayuda", descripcion: "Elegí la mejor forma de pedir ayuda sin culpa.",
    beneficio: "Pedir ayuda de forma directa y sin disculparse en exceso es una habilidad social que muchas personas nunca practicaron explícitamente.",
    categoria: "vinculos", edadMin: 12, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-dar-y-recibir-feedback", nombre: "Dar y recibir feedback", descripcion: "Elegí la forma más constructiva de dar una devolución.",
    beneficio: "Dar feedback específico sobre una conducta, en vez de una crítica general sobre la persona, es una técnica real de comunicación efectiva.",
    categoria: "vinculos", edadMin: 13, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-reconocer-manipulacion", nombre: "Reconocer patrones que incomodan", descripcion: "Notá señales de un vínculo que no se siente parejo.",
    beneficio: "Reconocer patrones de desequilibrio en un vínculo —quien siempre cede, quien nunca pide disculpas— es un primer paso para poder nombrarlos y hablarlos.",
    categoria: "vinculos", edadMin: 14, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-celebrar-al-otro", nombre: "Celebrar al otro", descripcion: "Elegí la mejor forma de reaccionar a una buena noticia ajena.",
    beneficio: "Cómo reaccionamos a las buenas noticias de otra persona —la 'respuesta activa-constructiva'— fortalece el vínculo tanto o más que apoyar en los problemas.",
    categoria: "vinculos", edadMin: 11, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "vinculos-conflictos-de-pareja-o-amistad", nombre: "Conflictos cotidianos", descripcion: "Elegí la respuesta más constructiva ante un roce cotidiano.",
    beneficio: "Los pequeños roces cotidianos, bien manejados, no desgastan un vínculo; mal manejados (acumulados en silencio), sí.",
    categoria: "vinculos", edadMin: 13, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "ninos-animales-y-sus-crias", nombre: "Animales y sus crías", descripcion: "Relacioná cada animal con el nombre de su cría.",
    beneficio: "Aprender el vocabulario específico de un tema (como las crías de los animales) amplía el vocabulario de forma entretenida y memorable.",
    categoria: "ninos", edadMin: 6, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "ninos-colores-que-se-mezclan", nombre: "Colores que se mezclan", descripcion: "Adiviná qué color sale al mezclar dos colores.",
    beneficio: "Aprender qué colores se forman al mezclar otros es una introducción simple y visual a conceptos básicos de ciencia.",
    categoria: "ninos", edadMin: 6, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "ninos-donde-vive-cada-animal", nombre: "¿Dónde vive?", descripcion: "Elegí el hábitat correcto de cada animal.",
    beneficio: "Aprender sobre hábitats naturales ayuda a los chicos a entender que cada animal está adaptado a un ambiente particular.",
    categoria: "ninos", edadMin: 5, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "ninos-que-suena-asi", nombre: "¿Quién hace ese sonido?", descripcion: "Adiviná qué animal hace cada sonido.",
    beneficio: "Reconocer sonidos y asociarlos a su fuente entrena la discriminación auditiva, una base del desarrollo del lenguaje.",
    categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "ninos-numeros-del-uno-al-diez", nombre: "Números del uno al diez", descripcion: "Contá y elegí el número correcto.",
    beneficio: "Contar objetos en voz alta y asociarlos al símbolo numérico correcto es uno de los primeros pasos del pensamiento matemático.",
    categoria: "ninos", edadMin: 5, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "ninos-partes-del-dia", nombre: "Partes del día", descripcion: "Elegí qué hacemos en cada momento del día.",
    beneficio: "Entender la secuencia del día (mañana, tarde, noche) ayuda a los chicos a organizar el tiempo y anticipar rutinas.",
    categoria: "ninos", edadMin: 5, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  { id: "ninos-frutas-o-verduras", nombre: "¿Fruta o verdura?", descripcion: "Clasificá cada alimento correctamente.",
    beneficio: "Clasificar alimentos en categorías es una de las primeras formas de pensamiento lógico que desarrollan los chicos.",
    categoria: "ninos", edadMin: 5, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/trivia-tematica.js" },

  // ═══════ Motor genérico: ordenar-tematica ═══════
  { id: "logica-orden-de-tamano", nombre: "Orden de tamaño", descripcion: "Ordená los elementos de más chico a más grande.",
    beneficio: "Ordenar elementos por tamaño relativo, sin medirlos, entrena la comparación y la estimación visual.",
    categoria: "logica", edadMin: 9, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "logica-orden-cronologico-historia", nombre: "Orden cronológico", descripcion: "Ordená estos inventos según cuándo aparecieron.",
    beneficio: "Ordenar hechos históricos entrena tanto el razonamiento secuencial como el conocimiento general sobre cómo cambió el mundo con el tiempo.",
    categoria: "logica", edadMin: 11, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "logica-pasos-de-un-plan", nombre: "Los pasos de un plan", descripcion: "Ordená los pasos lógicos para lograr el objetivo.",
    beneficio: "Ordenar pasos para lograr un objetivo entrena la planificación, una de las funciones ejecutivas centrales del pensamiento.",
    categoria: "logica", edadMin: 10, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "logica-orden-de-magnitud", nombre: "Orden de magnitud", descripcion: "Ordená estos conceptos de menor a mayor escala.",
    beneficio: "Ordenar conceptos por escala (de lo microscópico a lo cósmico) entrena una noción de magnitud poco intuitiva pero fundamental en ciencia.",
    categoria: "logica", edadMin: 12, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "logica-causa-y-efecto", nombre: "Causa y efecto", descripcion: "Ordená la causa antes que su efecto.",
    beneficio: "Distinguir causas de efectos, y ordenarlos correctamente, es la base del razonamiento causal usado en ciencia y en la vida diaria.",
    categoria: "logica", edadMin: 9, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "logica-jerarquia-biologica", nombre: "Jerarquía biológica", descripcion: "Ordená estos niveles de organización de lo más simple a lo más complejo.",
    beneficio: "Los seres vivos se organizan en niveles jerárquicos, de la célula al organismo completo; ordenar esos niveles entrena el pensamiento sistémico.",
    categoria: "logica", edadMin: 13, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "logica-orden-de-prioridad", nombre: "Orden de prioridad", descripcion: "Ordená estas tareas según cuál conviene hacer primero.",
    beneficio: "Decidir qué hacer primero, según urgencia e importancia, es una habilidad de organización que se puede entrenar como cualquier otra.",
    categoria: "logica", edadMin: 11, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "numeros-ordenar-de-menor-a-mayor", nombre: "De menor a mayor", descripcion: "Ordená estos números de menor a mayor.",
    beneficio: "Ordenar números es una de las habilidades más básicas y fundamentales del pensamiento matemático temprano.",
    categoria: "numeros", edadMin: 8, dificultad: "facil", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "numeros-ordenar-fracciones", nombre: "Ordenar fracciones", descripcion: "Ordená estas fracciones de menor a mayor.",
    beneficio: "Ordenar fracciones requiere entender que el valor no depende solo de los números que las forman, sino de la relación entre ellos.",
    categoria: "numeros", edadMin: 11, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "numeros-ordenar-decimales", nombre: "Ordenar decimales", descripcion: "Ordená estos números decimales de menor a mayor.",
    beneficio: "Ordenar números decimales entrena la comprensión de que la posición de cada dígito después de la coma tiene un valor distinto.",
    categoria: "numeros", edadMin: 11, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "numeros-ordenar-negativos", nombre: "Ordenar números negativos", descripcion: "Ordená estos números, incluyendo negativos, de menor a mayor.",
    beneficio: "Ordenar números negativos junto con positivos entrena la comprensión de la recta numérica completa, no solo los números 'naturales'.",
    categoria: "numeros", edadMin: 11, dificultad: "media", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "numeros-orden-de-longitudes", nombre: "Orden de longitudes", descripcion: "Ordená estas unidades de más corta a más larga.",
    beneficio: "Ordenar unidades de medida por su magnitud real (no por el número que las acompaña) entrena la comprensión conceptual de las unidades.",
    categoria: "numeros", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "numeros-ordenar-porcentajes", nombre: "Ordenar porcentajes", descripcion: "Ordená estos porcentajes de menor a mayor.",
    beneficio: "Ordenar porcentajes entrena la comprensión de que representan una proporción, comparable directamente entre sí.",
    categoria: "numeros", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "flexibilidad-cambiar-de-criterio", nombre: "Cambiar de criterio", descripcion: "Ordená primero por un criterio, después por otro.",
    beneficio: "Cambiar el criterio de ordenamiento en medio de la tarea (de tamaño a alfabético, por ejemplo) entrena la flexibilidad cognitiva: la capacidad de soltar una regla y adoptar otra.",
    categoria: "flexibilidad", edadMin: 11, dificultad: "profundo", duracion: "5-8 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "flexibilidad-de-lo-concreto-a-lo-abstracto", nombre: "De lo concreto a lo abstracto", descripcion: "Ordená de la idea más concreta a la más abstracta.",
    beneficio: "Pasar de ideas concretas a abstracciones cada vez mayores entrena la flexibilidad para moverse entre niveles de pensamiento.",
    categoria: "flexibilidad", edadMin: 12, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "flexibilidad-prioridades-que-cambian", nombre: "Prioridades que cambian", descripcion: "Reordená tus prioridades según cambia la situación.",
    beneficio: "Ajustar prioridades cuando la situación cambia, en vez de aferrarse al primer plan, es un componente central de la flexibilidad cognitiva.",
    categoria: "flexibilidad", edadMin: 12, dificultad: "profundo", duracion: "4-6 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "flexibilidad-doble-clasificacion", nombre: "Doble clasificación", descripcion: "Ordená considerando dos características a la vez.",
    beneficio: "Ordenar según dos criterios combinados (no uno solo) entrena la capacidad de sostener varias reglas activas al mismo tiempo.",
    categoria: "flexibilidad", edadMin: 12, dificultad: "profundo", duracion: "5-8 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "flexibilidad-orden-inverso-a-pedido", nombre: "Orden inverso", descripcion: "Ordená al revés de lo que parece natural.",
    beneficio: "Invertir deliberadamente un orden habitual (como contar hacia atrás) entrena el control inhibitorio: frenar la respuesta automática y aplicar una regla distinta.",
    categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "3-5 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },

  { id: "flexibilidad-reglas-que-cambian-de-a-una", nombre: "Reglas que cambian", descripcion: "La regla de ordenar cambia en cada ronda: prestá atención.",
    beneficio: "Cambiar de regla ronda a ronda, sin previo aviso salvo la instrucción, es un ejercicio directo de flexibilidad cognitiva, la misma que se mide en pruebas neuropsicológicas como el Wisconsin Card Sorting Test.",
    categoria: "flexibilidad", edadMin: 12, dificultad: "profundo", duracion: "5-8 min",
    tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true,
    archivo: "js/juegos/ordenar-tematica.js" },
];

// Utilidades del catálogo
const CatalogoJuegos = {
  todos: () => JUEGOS,
  disponibles: () => JUEGOS.filter(j => j.disponible),
  proximamente: () => JUEGOS.filter(j => !j.disponible),
  porCategoria: (catId) => JUEGOS.filter(j => j.categoria === catId),
  porId: (id) => JUEGOS.find(j => j.id === id),
  categorias: () => CATEGORIAS,
  categoriaPorId: (id) => CATEGORIAS.find(c => c.id === id),
  aleatorioDisponible: () => {
    const disp = CatalogoJuegos.disponibles();
    return disp[Math.floor(Math.random() * disp.length)];
  },

  /** Busca por nombre, descripción o categoría entre los juegos disponibles. */
  buscar(query) {
    const q = query.trim().toLowerCase();
    if (!q) return CatalogoJuegos.disponibles();
    return CatalogoJuegos.disponibles().filter(j =>
      j.nombre.toLowerCase().includes(q) ||
      j.descripcion.toLowerCase().includes(q) ||
      (CatalogoJuegos.categoriaPorId(j.categoria)?.nombre || "").toLowerCase().includes(q));
  },
};

if (typeof module !== "undefined") module.exports = { JUEGOS, CATEGORIAS, CatalogoJuegos };
