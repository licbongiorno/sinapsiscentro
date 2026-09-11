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
  { id: "calma",        nombre: "Calma",         icono: "🧘", color: "#8ac9a9" },
  { id: "creatividad",  nombre: "Creatividad",   icono: "🎨", color: "#c98ac2" },
  { id: "logica",       nombre: "Lógica",        icono: "🧩", color: "#0e4d5c" },
  { id: "numeros",      nombre: "Números",       icono: "🔢", color: "#3a5a6a" },
  { id: "flexibilidad", nombre: "Flexibilidad",  icono: "🌀", color: "#2aaec2" },
  { id: "vinculos",     nombre: "Vínculos",      icono: "🤝", color: "#c9a97e" },
  { id: "ninos",        nombre: "Niños",         icono: "🧸", color: "#e0b28a" },
];

const JUEGOS = [
  // ───────── 🧠 MEMORIA ─────────
  { id: "memoria-clasica", nombre: "Memoria clásica", descripcion: "Encontrá los pares de cartas.", categoria: "memoria", edadMin: 6, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/memoria-clasica.js" },
  { id: "memoria-emocional", nombre: "Memoria emocional", descripcion: "Asociá cada emoción con su situación.", categoria: "memoria", edadMin: 8, dificultad: "media", duracion: "5-10 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/memoria-emocional.js" },
  { id: "parejas-imposibles", nombre: "Parejas imposibles", descripcion: "Relacioná objetos aparentemente inconexos.", categoria: "memoria", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/parejas-imposibles.js" },
  { id: "que-desaparecio", nombre: "¿Qué desapareció?", descripcion: "Observá una escena y detectá qué falta.", categoria: "memoria", edadMin: 6, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/que-desaparecio.js" },
  { id: "secuencia-secreta", nombre: "Secuencia secreta", descripcion: "Memorizá una secuencia de símbolos.", categoria: "memoria", edadMin: 8, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/secuencia-secreta.js" },
  { id: "luces", nombre: "Luces", descripcion: "Repetí la secuencia de luces, cada vez más larga.", categoria: "memoria", edadMin: 6, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/luces.js" },
  { id: "memoria-sonidos", nombre: "Memoria de sonidos", descripcion: "Recordá secuencias sonoras.", categoria: "memoria", edadMin: 6, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/memoria-sonidos.js" },
  { id: "camino-memoria", nombre: "Camino de memoria", descripcion: "Memorizá un recorrido en una grilla.", categoria: "memoria", edadMin: 8, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/camino-memoria.js" },
  { id: "caras-nombres", nombre: "Caras y nombres", descripcion: "Asociá nombres con personajes.", categoria: "memoria", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/caras-nombres.js" },
  { id: "historia-escondida", nombre: "Historia escondida", descripcion: "Recordá detalles de una pequeña historia.", categoria: "memoria", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/historia-escondida.js" },

  // ───────── 👁️ ATENCIÓN ─────────
  { id: "encuentra-diferente", nombre: "Encontrá el diferente", descripcion: "Detectá el símbolo distinto entre todos.", categoria: "atencion", edadMin: 6, dificultad: "facil", duracion: "2-4 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/encuentra-diferente.js" },
  { id: "donde-esta", nombre: "¿Dónde está?", descripcion: "Encontrá un elemento entre muchos.", categoria: "atencion", edadMin: 6, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/donde-esta.js" },
  { id: "semaforo-mental", nombre: "Semáforo mental", descripcion: "Tocá según una regla que va cambiando.", categoria: "atencion", edadMin: 10, dificultad: "media", duracion: "4 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/semaforo-mental.js" },
  { id: "no-toques-rojo", nombre: "No toques el rojo", descripcion: "Respondé únicamente a ciertos estímulos.", categoria: "atencion", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/no-toques-rojo.js" },
  { id: "cambio-regla", nombre: "Cambio de regla", descripcion: "La consigna cambia sin avisar.", categoria: "atencion", edadMin: 10, dificultad: "dificil", duracion: "4 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cambio-regla.js" },
  { id: "atencion-dividida", nombre: "Atención dividida", descripcion: "Resolvé dos tareas al mismo tiempo.", categoria: "atencion", edadMin: 12, dificultad: "dificil", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/atencion-dividida.js" },
  { id: "cazador-letras", nombre: "Cazador de letras", descripcion: "Encontrá una letra determinada, rápido.", categoria: "atencion", edadMin: 6, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cazador-letras.js" },
  { id: "cazador-numeros", nombre: "Cazador de números", descripcion: "Encontrá números específicos.", categoria: "atencion", edadMin: 6, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cazador-numeros.js" },
  { id: "la-intrusa", nombre: "La intrusa", descripcion: "Detectá el elemento que rompe el patrón.", categoria: "atencion", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/la-intrusa.js" },
  { id: "vista-aguila", nombre: "Vista de águila", descripcion: "Identificá pequeños cambios entre imágenes.", categoria: "atencion", edadMin: 8, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/vista-aguila.js" },

  // ───────── ⚡ REFLEJOS ─────────
  { id: "toca-cuando-aparezca", nombre: "Toca cuando aparezca", descripcion: "Tocá el objetivo lo más rápido posible.", categoria: "reflejos", edadMin: 6, dificultad: "facil", duracion: "1-2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/reflejos.js" },
  { id: "atrapa-circulo", nombre: "Atrapa el círculo", descripcion: "El objetivo cambia de posición.", categoria: "reflejos", edadMin: 6, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/atrapa-circulo.js" },
  { id: "pulso", nombre: "Pulso", descripcion: "Reaccioná sólo al estímulo correcto.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/pulso.js" },
  { id: "rapido-lento", nombre: "Rápido o lento", descripcion: "Respondé según la velocidad del estímulo.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/rapido-lento.js" },
  { id: "dedos-veloces", nombre: "Dedos veloces", descripcion: "Repetí secuencias táctiles cada vez más rápido.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/dedos-veloces.js" },
  { id: "caza-burbujas", nombre: "Caza-burbujas", descripcion: "Explotá las burbujas determinadas.", categoria: "reflejos", edadMin: 6, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/caza-burbujas.js" },
  { id: "esquiva", nombre: "Esquiva", descripcion: "Evitá los obstáculos que caen.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/esquiva.js" },
  { id: "rayo", nombre: "Rayo", descripcion: "Reaccioná al cambio de pantalla.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "1-2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/rayo.js" },
  { id: "contra-reloj", nombre: "Uno contra el reloj", descripcion: "Completá la tarea antes del tiempo límite.", categoria: "reflejos", edadMin: 8, dificultad: "media", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/contra-reloj.js" },
  { id: "combo-mental", nombre: "Combo mental", descripcion: "Encadená respuestas correctas sin fallar.", categoria: "reflejos", edadMin: 10, dificultad: "dificil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/combo-mental.js" },

  // ───────── 🔤 PALABRAS ─────────
  { id: "letras-compartidas", nombre: "Letras compartidas", descripcion: "Construyan una historia entre todos, palabra por palabra.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "5-10 min", tipo: "social", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/letras-compartidas.js", necesita: "sesion" },
  { id: "palabra-encadenada", nombre: "Palabra encadenada", descripcion: "La siguiente palabra empieza con la última letra.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "5 min", tipo: "social", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/palabra-encadenada.js" },
  { id: "palabra-escondida", nombre: "Palabra escondida", descripcion: "Descubrí una palabra entre letras.", categoria: "palabras", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/palabra-escondida.js" },
  { id: "anagrama", nombre: "Anagrama", descripcion: "Ordená las letras para formar una palabra.", categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/anagrama.js" },
  { id: "palabra-intrusa", nombre: "Palabra intrusa", descripcion: "Encontrá cuál palabra no pertenece al grupo.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/palabra-intrusa.js" },
  { id: "sinonimo-express", nombre: "Sinónimo express", descripcion: "Elegí el sinónimo correcto contra el reloj.", categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/sinonimo-express.js" },
  { id: "antonimo", nombre: "Antónimo", descripcion: "Encontrá el contrario de cada palabra.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/antonimo.js" },
  { id: "completa-frase", nombre: "Completá la frase", descripcion: "Seleccioná la palabra que falta.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/completa-frase.js" },
  { id: "historias-tres-palabras", nombre: "Historias de tres palabras", descripcion: "Creá una mini historia con tres palabras dadas.", categoria: "palabras", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/historias-tres-palabras.js" },
  { id: "palabra-imposible", nombre: "Palabra imposible", descripcion: "Descubrí una palabra a partir de pistas.", categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/palabra-imposible.js" },
  { id: "diccionario-loco", nombre: "Diccionario loco", descripcion: "Inventá definiciones divertidas.", categoria: "palabras", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "social", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/diccionario-loco.js" },
  { id: "cadena-asociaciones", nombre: "Cadena de asociaciones", descripcion: "Palabra → palabra → palabra, sin repetir.", categoria: "palabras", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cadena-asociaciones.js" },
  { id: "una-palabra-mil-ideas", nombre: "Una palabra, mil ideas", descripcion: "Generá tantas asociaciones como puedas.", categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/una-palabra-mil-ideas.js" },
  { id: "adivina-palabra", nombre: "Adivina la palabra", descripcion: "Estilo ahorcado, sin violencia en el diseño.", categoria: "palabras", edadMin: 8, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/adivina-palabra.js" },
  { id: "palabras-cruzadas-rapidas", nombre: "Palabras cruzadas rápidas", descripcion: "Mini crucigramas de 5x5.", categoria: "palabras", edadMin: 10, dificultad: "media", duracion: "5-8 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/palabras-cruzadas-rapidas.js" },

  // ───────── ❤️ EMOCIONES ─────────
  { id: "semaforo-emocional", nombre: "Semáforo emocional", descripcion: "Ubicá la intensidad de una emoción: rojo, amarillo o verde.", categoria: "emociones", edadMin: 6, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/semaforo-emocional.js" },
  { id: "que-siento", nombre: "¿Qué siento?", descripcion: "Identificá la emoción a partir de una situación.", categoria: "emociones", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/que-siento.js" },
  { id: "detective-emocional", nombre: "Detective emocional", descripcion: "Descubrí qué emoción experimenta un personaje.", categoria: "emociones", edadMin: 8, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/detective-emocional.js" },
  { id: "termometro-emocional", nombre: "Termómetro emocional", descripcion: "Ubicá una emoción entre 0 y 10.", categoria: "emociones", edadMin: 8, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/termometro-emocional.js" },
  { id: "emocion-o-pensamiento", nombre: "Emoción o pensamiento", descripcion: "Diferenciá entre ambos conceptos.", categoria: "emociones", edadMin: 10, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/emocion-o-pensamiento.js" },
  { id: "que-necesita", nombre: "¿Qué necesita?", descripcion: "Identificá la necesidad detrás de una emoción.", categoria: "emociones", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/que-necesita.js" },
  { id: "cambiar-perspectiva", nombre: "Cambiar la perspectiva", descripcion: "Observá una situación desde otro punto de vista.", categoria: "emociones", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/cambiar-perspectiva.js" },
  { id: "misma-historia", nombre: "La misma historia", descripcion: "Distintas interpretaciones de una misma escena.", categoria: "emociones", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/misma-historia.js" },
  { id: "emoji-secreto", nombre: "Emoji secreto", descripcion: "Adiviná la emoción que representa el emoji.", categoria: "emociones", edadMin: 6, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/emoji-secreto.js" },
  { id: "parejas-emocionales", nombre: "Parejas emocionales", descripcion: "Emoción ↔ situación.", categoria: "emociones", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/parejas-emocionales.js" },
  { id: "ruleta-emocional", nombre: "Ruleta emocional", descripcion: "Una pregunta o reflexión al azar para charlar.", categoria: "emociones", edadMin: 8, dificultad: "facil", duracion: "libre", tipo: "social", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/ruleta-emocional.js" },
  { id: "mapa-emociones", nombre: "Mapa de emociones", descripcion: "Ubicá emociones en un mapa corporal.", categoria: "emociones", edadMin: 8, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/mapa-emociones.js" },
  { id: "detective-pensamientos", nombre: "El detective de pensamientos", descripcion: "Identificá distorsiones cognitivas comunes.", categoria: "emociones", edadMin: 14, dificultad: "dificil", duracion: "5-8 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/detective-pensamientos.js" },
  { id: "pensamiento-flexible", nombre: "Pensamiento flexible", descripcion: "Encontrá interpretaciones alternativas.", categoria: "emociones", edadMin: 12, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/pensamiento-flexible.js" },
  { id: "amigo-interior", nombre: "El amigo interior", descripcion: "Elegí respuestas autocompasivas ante un error.", categoria: "emociones", edadMin: 12, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/amigo-interior.js" },

  // ───────── 🧘 CALMA ─────────
  { id: "respira", nombre: "Respira", descripcion: "Respiración guiada con una animación que marca el ritmo.", categoria: "calma", edadMin: 6, dificultad: "facil", duracion: "2-5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/respira.js" },
  { id: "respiracion-cuadrada", nombre: "Respiración cuadrada", descripcion: "Cuatro fases: inhalar, sostener, exhalar, sostener.", categoria: "calma", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/respiracion-cuadrada.js" },
  { id: "la-ola", nombre: "La ola", descripcion: "Sincronizá tu respiración con una ola animada.", categoria: "calma", edadMin: 6, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/la-ola.js" },
  { id: "jardin-zen", nombre: "Jardín zen", descripcion: "Vas creando un jardín a medida que respirás.", categoria: "calma", edadMin: 6, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/jardin-zen.js" },
  { id: "piedras", nombre: "Piedras", descripcion: "Apilá piedras virtuales, despacio.", categoria: "calma", edadMin: 6, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/piedras.js" },
  { id: "ojo-de-agua", nombre: "Ojo de agua", descripcion: "Observá ondas en el agua y seguí su ritmo.", categoria: "calma", edadMin: 6, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/ojo-de-agua.js" },
  { id: "campana", nombre: "Campana", descripcion: "Atención plena guiada por sonidos.", categoria: "calma", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/campana.js" },
  { id: "un-minuto", nombre: "Un minuto", descripcion: "Permanecé atento y quieto durante 60 segundos.", categoria: "calma", edadMin: 6, dificultad: "facil", duracion: "1 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/un-minuto.js" },
  { id: "escaneo-corporal", nombre: "Escaneo corporal", descripcion: "Pequeñas consignas de atención al cuerpo.", categoria: "calma", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/escaneo-corporal.js" },
  { id: "soltar", nombre: "Soltar", descripcion: "Tocá y dejá desaparecer pensamientos o palabras.", categoria: "calma", edadMin: 8, dificultad: "facil", duracion: "2-4 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/soltar.js" },

  // ───────── 🎨 CREATIVIDAD ─────────
  { id: "tres-palabras", nombre: "Tres palabras", descripcion: "Creá algo (una frase, una idea) con tres palabras al azar.", categoria: "creatividad", edadMin: 8, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/tres-palabras.js" },
  { id: "dibujo-libre", nombre: "Dibujo libre", descripcion: "Pintá o dibujá libremente en la pantalla.", categoria: "creatividad", edadMin: 4, dificultad: "facil", duracion: "libre", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/dibujo-libre.js" },
  { id: "dibuja-emocion", nombre: "Dibujá una emoción", descripcion: "Representá una emoción con formas y colores.", categoria: "creatividad", edadMin: 6, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/dibuja-emocion.js" },
  { id: "historia-infinita", nombre: "Historia infinita", descripcion: "Continuá una historia que nunca termina.", categoria: "creatividad", edadMin: 8, dificultad: "facil", duracion: "5-10 min", tipo: "social", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/historia-infinita.js" },
  { id: "objeto-imposible", nombre: "Objeto imposible", descripcion: "Diseñá un objeto absurdo que no podría existir.", categoria: "creatividad", edadMin: 8, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/objeto-imposible.js" },
  { id: "collage-mental", nombre: "Collage mental", descripcion: "Combiná imágenes y conceptos sin relación aparente.", categoria: "creatividad", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/collage-mental.js" },
  { id: "metafora", nombre: "Metáfora", descripcion: "Completá metáforas de forma original.", categoria: "creatividad", edadMin: 12, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/metafora.js" },
  { id: "que-ves", nombre: "¿Qué ves?", descripcion: "Interpretá formas abstractas.", categoria: "creatividad", edadMin: 6, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/que-ves.js" },
  { id: "garabato", nombre: "Garabato", descripcion: "Convertí un garabato al azar en algo reconocible.", categoria: "creatividad", edadMin: 6, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/garabato.js" },
  { id: "final-alternativo", nombre: "Final alternativo", descripcion: "Cambiá el final de una historia conocida.", categoria: "creatividad", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/final-alternativo.js" },

  // ───────── 🧩 LÓGICA ─────────
  { id: "secuencias", nombre: "Secuencias", descripcion: "Completá el patrón que sigue.", categoria: "logica", edadMin: 8, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/secuencias.js" },
  { id: "sudoku-mini", nombre: "Sudoku mini", descripcion: "Versiones 4×4 y 6×6, sin la complejidad del clásico.", categoria: "logica", edadMin: 10, dificultad: "media", duracion: "5-10 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/sudoku-mini.js" },
  { id: "torres", nombre: "Torres", descripcion: "Resolvé pequeños rompecabezas de apilado.", categoria: "logica", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/torres.js" },
  { id: "puentes", nombre: "Puentes", descripcion: "Conectá los puntos siguiendo la regla del juego.", categoria: "logica", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/puentes.js" },
  { id: "laberinto", nombre: "Laberinto", descripcion: "Encontrá la salida.", categoria: "logica", edadMin: 6, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/laberinto.js" },
  { id: "caja-fuerte", nombre: "Caja fuerte", descripcion: "Descubrí la combinación a partir de pistas.", categoria: "logica", edadMin: 10, dificultad: "dificil", duracion: "5-8 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/caja-fuerte.js" },
  { id: "que-sigue", nombre: "¿Qué sigue?", descripcion: "Completá patrones visuales.", categoria: "logica", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/que-sigue.js" },
  { id: "equilibrio", nombre: "Equilibrio", descripcion: "Distribuí objetos correctamente en una balanza.", categoria: "logica", edadMin: 8, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/equilibrio.js" },
  { id: "tres-movimientos", nombre: "Tres movimientos", descripcion: "Resolvé el rompecabezas en pocos movimientos.", categoria: "logica", edadMin: 10, dificultad: "dificil", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/tres-movimientos.js" },
  { id: "detective-logico", nombre: "Detective lógico", descripcion: "Resolvé un caso a partir de pistas.", categoria: "logica", edadMin: 10, dificultad: "media", duracion: "5-8 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/detective-logico.js" },

  // ───────── 🔢 NÚMEROS ─────────
  { id: "calculo-mental", nombre: "Cálculo mental", descripcion: "Resolvé operaciones antes de que se acabe el tiempo.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/calculo-mental.js" },
  { id: "numero-objetivo", nombre: "Número objetivo", descripcion: "Combiná números para alcanzar un resultado.", categoria: "numeros", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/numero-objetivo.js" },
  { id: "mayor-menor", nombre: "Mayor o menor", descripcion: "Compará números rápidamente.", categoria: "numeros", edadMin: 6, dificultad: "facil", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/mayor-menor.js" },
  { id: "secuencia-numerica", nombre: "Secuencia numérica", descripcion: "Descubrí el número que sigue.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/secuencia-numerica.js" },
  { id: "memoria-numerica", nombre: "Memoria numérica", descripcion: "Recordá secuencias de números.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/memoria-numerica.js" },
  { id: "cuenta-regresiva", nombre: "Cuenta regresiva", descripcion: "Resolvé antes de que el reloj llegue a cero.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cuenta-regresiva.js" },
  { id: "suma-explosiva", nombre: "Suma explosiva", descripcion: "Combiná números rápido antes de que exploten.", categoria: "numeros", edadMin: 8, dificultad: "media", duracion: "2 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/suma-explosiva.js" },
  { id: "matematica-visual", nombre: "Matemática visual", descripcion: "Resolvé operaciones mediante imágenes.", categoria: "numeros", edadMin: 6, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/matematica-visual.js" },

  // ───────── 🌀 FLEXIBILIDAD ─────────
  { id: "stroop", nombre: "Stroop visual", descripcion: "Elegí el color de la tinta, no la palabra.", categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/stroop.js" },
  { id: "cambia-regla", nombre: "Cambia la regla", descripcion: "Alterná entre consignas sin previo aviso.", categoria: "flexibilidad", edadMin: 10, dificultad: "dificil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cambia-regla.js" },
  { id: "ahora-al-reves", nombre: "Ahora al revés", descripcion: "Respondé exactamente lo contrario.", categoria: "flexibilidad", edadMin: 8, dificultad: "media", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/ahora-al-reves.js" },
  { id: "clasifica", nombre: "Clasificá", descripcion: "El criterio de clasificación cambia sobre la marcha.", categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/clasifica.js" },
  { id: "dos-caminos", nombre: "Dos caminos", descripcion: "Elegí una estrategia y sostenela.", categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/dos-caminos.js" },
  { id: "regla-secreta", nombre: "Regla secreta", descripcion: "Descubrí qué tienen en común los elementos.", categoria: "flexibilidad", edadMin: 10, dificultad: "media", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/regla-secreta.js" },
  { id: "cambio-inesperado", nombre: "Cambio inesperado", descripcion: "Adaptá tu estrategia cuando cambia el escenario.", categoria: "flexibilidad", edadMin: 10, dificultad: "dificil", duracion: "4 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/cambio-inesperado.js" },

  // ───────── 🤝 VÍNCULOS ─────────
  { id: "que-responderias", nombre: "¿Qué responderías?", descripcion: "Elegí cómo responder ante distintas situaciones sociales.", categoria: "vinculos", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/que-responderias.js" },
  { id: "conversacion-dificil", nombre: "Conversación difícil", descripcion: "Elegí distintas formas de responder en una charla tensa.", categoria: "vinculos", edadMin: 12, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/conversacion-dificil.js" },
  { id: "detective-social", nombre: "Detective social", descripcion: "Interpretá señales sociales en una escena.", categoria: "vinculos", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/detective-social.js" },
  { id: "perspectivas", nombre: "Perspectivas", descripcion: "Descubrí cómo pueden pensar distintos personajes.", categoria: "vinculos", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/perspectivas.js" },
  { id: "empatia", nombre: "Empatía", descripcion: "Elegí la respuesta más empática ante cada situación.", categoria: "vinculos", edadMin: 10, dificultad: "facil", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/empatia.js" },
  { id: "limites", nombre: "Límites", descripcion: "Practicá respuestas asertivas.", categoria: "vinculos", edadMin: 12, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/limites.js" },
  { id: "decir-que-no", nombre: "Decir que no", descripcion: "Distintos escenarios para practicar poner un límite.", categoria: "vinculos", edadMin: 12, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/decir-que-no.js" },
  { id: "malentendido", nombre: "Malentendido", descripcion: "Detectá en qué momento se produjo la confusión.", categoria: "vinculos", edadMin: 10, dificultad: "media", duracion: "4 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/malentendido.js" },
  { id: "puentes-vinculos", nombre: "Puentes", descripcion: "Encontrá puntos de encuentro entre dos personajes.", categoria: "vinculos", edadMin: 10, dificultad: "media", duracion: "5 min", tipo: "individual", movil: true, puntuable: false, logros: true, disponible: true, archivo: "js/juegos/puentes-vinculos.js" },

  // ───────── 🧸 NIÑOS ─────────
  { id: "memoria-animales", nombre: "Memoria de animales", descripcion: "Encontrá los pares de animalitos.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/memoria-animales.js" },
  { id: "animales-escondidos", nombre: "Animales escondidos", descripcion: "Encontrá los animales escondidos en la escena.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3-5 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/animales-escondidos.js" },
  { id: "colores", nombre: "Colores", descripcion: "Identificá el color correcto.", categoria: "ninos", edadMin: 3, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/colores.js" },
  { id: "formas", nombre: "Formas", descripcion: "Reconocé las figuras geométricas.", categoria: "ninos", edadMin: 3, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/formas.js" },
  { id: "secuencias-infantiles", nombre: "Secuencias infantiles", descripcion: "Ordená las imágenes en el orden correcto.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/secuencias-infantiles.js" },
  { id: "que-falta-ninos", nombre: "¿Qué falta?", descripcion: "Detectá qué objeto no está.", categoria: "ninos", edadMin: 4, dificultad: "facil", duracion: "2-3 min", tipo: "individual", movil: true, puntuable: true, logros: true, disponible: true, archivo: "js/juegos/que-falta-ninos.js" },
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
