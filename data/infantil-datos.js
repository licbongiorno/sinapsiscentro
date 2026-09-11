/**
 * CATÁLOGO DE LA ZONA INFANTIL — SINAPSIS
 * ===========================================
 * Mismo principio que los otros catálogos: sólo datos. Para sumar una
 * actividad nueva alcanza con agregar un objeto a ACTIVIDADES — el
 * motor (infantil-engine.js) ya sabe interpretar cada "tipo".
 */

const BANDAS_EDAD = [
  { id: "3-5", nombre: "3–5 años", emoji: "🐣", titulo: "Explorar", desc: "Juegos simples, coloridos y cortitos." },
  { id: "6-8", nombre: "6–8 años", emoji: "🦊", titulo: "Descubrir", desc: "Un poco más de desafío y de historia." },
  { id: "9-12", nombre: "9–12 años", emoji: "🚀", titulo: "Desafiar", desc: "Lógica, misterios y creatividad." },
];

const CATEGORIAS_INFANTIL = [
  { id: "animales", nombre: "Animales", icono: "🐶" },
  { id: "sonidos", nombre: "Sonidos", icono: "🔊" },
  { id: "formas-colores", nombre: "Formas y colores", icono: "🔷" },
  { id: "clasificacion", nombre: "Clasificación", icono: "🧩" },
  { id: "emociones", nombre: "Emociones", icono: "❤️" },
  { id: "atencion", nombre: "Atención", icono: "🧠" },
  { id: "memoria", nombre: "Memoria", icono: "🃏" },
  { id: "secuencias", nombre: "Secuencias", icono: "🔢" },
  { id: "historias", nombre: "Historias", icono: "📖" },
  { id: "social", nombre: "Habilidades sociales", icono: "🤝" },
  { id: "logica", nombre: "Lógica", icono: "🧩" },
  { id: "creatividad", nombre: "Creatividad", icono: "🎨" },
  { id: "calma", nombre: "Calma", icono: "🧘" },
];

const ACTIVIDADES = [
  // ═══════ 🐣 3–5 AÑOS ═══════
  { id: "memoria-animales-chicos", titulo: "Memoria de animales", descripcion: "Encontrá las parejas de animalitos.",
    edadMin: 3, edadMax: 5, categoria: "memoria", tipo: "memoria", duracion: 4,
    contenido: { pares: ["🐶", "🐱", "🐰"] }, activo: true, version: 1 },

  { id: "que-animal-es", titulo: "¿Qué animal es?", descripcion: "Adiviná el animal por sus características.",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "Tiene el cuello muy largo y come hojas de los árboles altos.", opciones: ["🦒 Jirafa", "🐘 Elefante", "🐸 Rana"], correctaIdx: 0 },
      { pregunta: "Tiene rayas negras y blancas.", opciones: ["🦓 Cebra", "🐨 Koala", "🐢 Tortuga"], correctaIdx: 0 },
      { pregunta: "Vive en el agua y tiene una concha dura.", opciones: ["🐢 Tortuga", "🦁 León", "🐿️ Ardilla"], correctaIdx: 0 },
      { pregunta: "Salta muy alto y tiene orejas largas.", opciones: ["🐰 Conejo", "🐌 Caracol", "🐳 Ballena"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "donde-vive", titulo: "¿Dónde vive?", descripcion: "Cada animal tiene su hogar.",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "¿Dónde vive el pez? 🐟", opciones: ["En el agua", "En un árbol", "Bajo tierra"], correctaIdx: 0 },
      { pregunta: "¿Dónde vive el pájaro? 🐦", opciones: ["En un nido", "En el agua", "En una cueva"], correctaIdx: 0 },
      { pregunta: "¿Dónde vive el oso? 🐻", opciones: ["En una cueva", "En el mar", "En una pecera"], correctaIdx: 0 },
      { pregunta: "¿Dónde vive la abeja? 🐝", opciones: ["En una colmena", "En un lago", "En la nieve"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "quien-hace-este-sonido", titulo: "¿Quién dice eso?", descripcion: "Adiviná qué animal hace cada sonido.",
    edadMin: 3, edadMax: 5, categoria: "sonidos", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "\"¡Muuu!\" ¿Quién lo dice?", opciones: ["🐮 Vaca", "🐱 Gato", "🐍 Serpiente"], correctaIdx: 0 },
      { pregunta: "\"¡Guau guau!\" ¿Quién lo dice?", opciones: ["🐶 Perro", "🐟 Pez", "🐢 Tortuga"], correctaIdx: 0 },
      { pregunta: "\"¡Miau!\" ¿Quién lo dice?", opciones: ["🐱 Gato", "🐷 Chancho", "🐸 Rana"], correctaIdx: 0 },
      { pregunta: "\"¡Kikirikí!\" ¿Quién lo dice?", opciones: ["🐓 Gallo", "🐑 Oveja", "🐴 Caballo"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "dibuja-como-te-sientes", titulo: "Dibujá cómo te sentís", descripcion: "Usá colores y formas para mostrar tu emoción de hoy.",
    edadMin: 3, edadMax: 5, categoria: "emociones", tipo: "dibujo", duracion: 4,
    contenido: { texto: "Dibujá cómo te sentís hoy, como vos quieras." }, activo: true, version: 1 },

  { id: "grande-pequeno", titulo: "Grande o pequeño", descripcion: "Clasificá cada cosa según su tamaño.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "clasificar", duracion: 3,
    contenido: { instruccion: "¿Es grande o pequeño?", grupoA: { nombre: "Grande", emoji: "🐘" }, grupoB: { nombre: "Pequeño", emoji: "🐜" },
      items: [{ emoji: "🐘", grupo: "A" }, { emoji: "🐜", grupo: "B" }, { emoji: "🐋", grupo: "A" }, { emoji: "🐭", grupo: "B" }, { emoji: "🏠", grupo: "A" }, { emoji: "🔘", grupo: "B" }] },
    activo: true, version: 1 },

  { id: "igual-o-diferente", titulo: "Igual o diferente", descripcion: "Encontrá el que no es igual a los demás.",
    edadMin: 3, edadMax: 5, categoria: "atencion", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "¿Cuál es diferente?", opciones: ["🔵", "🔵", "🔴"], correctaIdx: 2 },
      { pregunta: "¿Cuál es diferente?", opciones: ["⭐", "🌙", "⭐"], correctaIdx: 1 },
      { pregunta: "¿Cuál es diferente?", opciones: ["🐶", "🐶", "🐱"], correctaIdx: 2 },
      { pregunta: "¿Cuál es diferente?", opciones: ["🟩", "🟩", "🟨"], correctaIdx: 2 },
    ] }, activo: true, version: 1 },

  { id: "como-se-siente", titulo: "¿Cómo se siente?", descripcion: "Mirá la situación y elegí la emoción.",
    edadMin: 3, edadMax: 5, categoria: "emociones", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "A Sofi se le cayó el helado al piso.", emoji: "🍦", opciones: ["😢 Triste", "😄 Feliz", "😴 Cansada"], correctaIdx: 0 },
      { pregunta: "Tomás recibió un regalo sorpresa.", emoji: "🎁", opciones: ["😄 Feliz", "😡 Enojado", "😨 Asustado"], correctaIdx: 0 },
      { pregunta: "Hay un ruido muy fuerte de repente.", emoji: "💥", opciones: ["😨 Asustado", "😄 Feliz", "😌 Tranquilo"], correctaIdx: 0 },
      { pregunta: "Le sacaron un juguete sin preguntar.", emoji: "🧸", opciones: ["😡 Enojado", "😄 Feliz", "😌 Tranquilo"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "clasificar-animales", titulo: "Tierra, agua o aire", descripcion: "¿Dónde se mueve cada animal?",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "clasificar", duracion: 3,
    contenido: { instruccion: "¿Nada en el agua o camina en la tierra?", grupoA: { nombre: "Agua", emoji: "🌊" }, grupoB: { nombre: "Tierra", emoji: "🌳" },
      items: [{ emoji: "🐟", grupo: "A" }, { emoji: "🐘", grupo: "B" }, { emoji: "🐬", grupo: "A" }, { emoji: "🐻", grupo: "B" }, { emoji: "🐳", grupo: "A" }, { emoji: "🦁", grupo: "B" }] },
    activo: true, version: 1 },

  { id: "respiracion-burbuja", titulo: "La respiración de la burbuja", descripcion: "Infla una burbuja imaginaria con tu respiración.",
    edadMin: 3, edadMax: 5, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: { texto: "Imaginá que soplás una burbuja gigante 🫧", ciclos: 3, fases: [{ nombre: "Inflá la burbuja", segundos: 4 }, { nombre: "Soltala suavecito", segundos: 4 }] },
    activo: true, version: 1 },

  { id: "clasificar-comida-juguetes", titulo: "Comida o juguete", descripcion: "¿Se come o se juega con eso?",
    edadMin: 3, edadMax: 5, categoria: "clasificacion", tipo: "clasificar", duracion: 3,
    contenido: { instruccion: "¿Es comida o es un juguete?", grupoA: { nombre: "Comida", emoji: "🍎" }, grupoB: { nombre: "Juguete", emoji: "🧸" },
      items: [{ emoji: "🍎", grupo: "A" }, { emoji: "🧸", grupo: "B" }, { emoji: "🍌", grupo: "A" }, { emoji: "⚽", grupo: "B" }, { emoji: "🥕", grupo: "A" }, { emoji: "🪀", grupo: "B" }] },
    activo: true, version: 1 },

  { id: "dia-o-noche", titulo: "Día o noche", descripcion: "¿Cuándo pasa esto?",
    edadMin: 3, edadMax: 5, categoria: "clasificacion", tipo: "clasificar", duracion: 3,
    contenido: { instruccion: "¿Es algo de día o de noche?", grupoA: { nombre: "Día", emoji: "☀️" }, grupoB: { nombre: "Noche", emoji: "🌙" },
      items: [{ emoji: "☀️", grupo: "A" }, { emoji: "🌙", grupo: "B" }, { emoji: "🏫", grupo: "A" }, { emoji: "🛏️", grupo: "B" }, { emoji: "🌈", grupo: "A" }, { emoji: "⭐", grupo: "B" }] },
    activo: true, version: 1 },

  { id: "memoria-sonidos-chicos", titulo: "Memoria de sonidos", descripcion: "Encontrá las parejas de sonidos iguales.",
    edadMin: 3, edadMax: 5, categoria: "sonidos", tipo: "memoria", duracion: 4,
    contenido: { pares: ["🔔", "📯", "🥁"] }, activo: true, version: 1 },

  { id: "que-sigue-patron-simple", titulo: "¿Qué sigue?", descripcion: "Un patrón fácil de colores.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "🔴 🔵 🔴 🔵 ¿Qué sigue?", opciones: ["🔴", "🟢", "🟡"], correctaIdx: 0 },
      { pregunta: "⭐ ⭐ 🌙 ⭐ ⭐ ¿Qué sigue?", opciones: ["🌙", "⭐", "☀️"], correctaIdx: 0 },
      { pregunta: "🟩 🟨 🟩 🟨 ¿Qué sigue?", opciones: ["🟩", "🟦", "🟥"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  // ═══════ 🦊 6–8 AÑOS ═══════
  { id: "encontra-el-objeto", titulo: "Encontrá el objeto", descripcion: "Prestá atención y encontrá lo que se pide.",
    edadMin: 6, edadMax: 8, categoria: "atencion", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "¿Cuál de estos se usa para escribir?", opciones: ["✏️ Lápiz", "🍎 Manzana", "⚽ Pelota"], correctaIdx: 0 },
      { pregunta: "¿Cuál de estos vuela?", opciones: ["✈️ Avión", "🚗 Auto", "🚲 Bici"], correctaIdx: 0 },
      { pregunta: "¿Cuál de estos es una fruta?", opciones: ["🍌 Banana", "🔧 Llave", "📱 Celular"], correctaIdx: 0 },
      { pregunta: "¿Cuál de estos da luz?", opciones: ["💡 Lamparita", "🪑 Silla", "🧦 Media"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "que-cambio", titulo: "¿Qué cambió?", descripcion: "Mirá bien y notá la diferencia.",
    edadMin: 6, edadMax: 8, categoria: "atencion", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "Antes había 🔵🔵🔵. Ahora hay 🔵🔴🔵. ¿Qué cambió?", opciones: ["Un color", "La cantidad", "Nada"], correctaIdx: 0 },
      { pregunta: "Antes había ⭐⭐⭐. Ahora hay ⭐⭐. ¿Qué cambió?", opciones: ["Faltó una estrella", "Se agregó una", "Nada"], correctaIdx: 0 },
      { pregunta: "Antes había 🟩🟦. Ahora hay 🟦🟩. ¿Qué cambió?", opciones: ["El orden", "El color", "Nada"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "memoria-parejas-personajes", titulo: "Memoria de personajes", descripcion: "Encontrá las parejas.",
    edadMin: 6, edadMax: 8, categoria: "memoria", tipo: "memoria", duracion: 4,
    contenido: { pares: ["🦸", "🧙", "🧜", "🦹"] }, activo: true, version: 1 },

  { id: "que-sigue-secuencia", titulo: "¿Qué sigue?", descripcion: "Descubrí el patrón y elegí lo que sigue.",
    edadMin: 6, edadMax: 8, categoria: "secuencias", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "🔴 🔵 🔴 🔵 🔴 ¿Qué sigue?", opciones: ["🔵", "🔴", "🟢"], correctaIdx: 0 },
      { pregunta: "1 2 3 4 ¿Qué sigue?", opciones: ["5", "6", "3"], correctaIdx: 0 },
      { pregunta: "⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ¿Qué sigue?", opciones: ["⭐", "🌙", "☀️"], correctaIdx: 0 },
      { pregunta: "2 4 6 8 ¿Qué sigue?", opciones: ["10", "9", "12"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "ordena-la-historia", titulo: "Ordená la historia", descripcion: "Poné estas partes en el orden correcto.",
    edadMin: 6, edadMax: 8, categoria: "historias", tipo: "secuencia", duracion: 4,
    contenido: { instruccion: "Ordená lo que pasó primero, después y al final.", items: ["Sofía se despertó", "Desayunó con su familia", "Se fue a la escuela"] },
    activo: true, version: 1 },

  { id: "que-paso-que-siento", titulo: "¿Qué pasó? ¿Qué siento?", descripcion: "Pensá cómo se siente cada personaje.",
    edadMin: 6, edadMax: 8, categoria: "emociones", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "Martina estaba jugando y otro nene le quitó el juguete. ¿Qué podría sentir?", opciones: ["😡 Enojo", "😄 Alegría", "😴 Sueño"], correctaIdx: 0 },
      { pregunta: "Lucas practicó mucho para el partido y su equipo ganó. ¿Qué podría sentir?", opciones: ["😄 Alegría", "😢 Tristeza", "😨 Miedo"], correctaIdx: 0 },
      { pregunta: "A Valen se le rompió su juguete favorito. ¿Qué podría sentir?", opciones: ["😢 Tristeza", "😄 Alegría", "😌 Calma"], correctaIdx: 0 },
      { pregunta: "Nico tiene que hablar frente a toda la clase mañana. ¿Qué podría sentir?", opciones: ["😰 Nervios", "😄 Alegría", "😡 Enojo"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "elegi-que-pasa", titulo: "Elegí qué pasa", descripcion: "Una historia donde vos decidís.",
    edadMin: 6, edadMax: 8, categoria: "social", tipo: "historia", duracion: 4,
    contenido: { inicio: "inicio", nodos: {
      inicio: { texto: "Tomás llega a la escuela y ve que sus amigos están jugando a la pelota. Él quiere acercarse. ¿Qué puede hacer?", opciones: [
        { texto: "Preguntar si puede jugar", siguiente: "pregunta" },
        { texto: "Quedarse mirando de lejos", siguiente: "mirando" },
        { texto: "Enojarse porque no lo invitaron", siguiente: "enojo" } ] },
      pregunta: { texto: "Tomás pregunta \"¿Puedo jugar con ustedes?\". Sus amigos dicen que sí, y se suma al partido. Al ratito, ya se está riendo con todos.", opciones: [] },
      mirando: { texto: "Tomás se queda mirando un rato. Después de unos minutos, junta valor y se acerca a preguntar. Sus amigos lo invitan enseguida.", opciones: [] },
      enojo: { texto: "Tomás se enoja y se va solo. Más tarde, un amigo lo busca y le pregunta qué pasó — a veces, contar cómo nos sentimos ayuda a que los demás entiendan.", opciones: [] },
    } }, activo: true, version: 1 },

  { id: "cual-es-el-par", titulo: "¿Cuál va con cuál?", descripcion: "Relacioná cada cosa con su pareja lógica.",
    edadMin: 6, edadMax: 8, categoria: "logica", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "🧦 va con…", opciones: ["👟 Zapato", "🍕 Pizza", "📚 Libro"], correctaIdx: 0 },
      { pregunta: "🔑 va con…", opciones: ["🚪 Puerta", "🐟 Pez", "🌙 Luna"], correctaIdx: 0 },
      { pregunta: "☂️ va con…", opciones: ["🌧️ Lluvia", "☀️ Sol fuerte", "🎈 Globo"], correctaIdx: 0 },
      { pregunta: "🖊️ va con…", opciones: ["📄 Papel", "🍔 Hamburguesa", "🚗 Auto"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "secuencia-de-colores", titulo: "Secuencia de colores", descripcion: "Ordená los colores como se muestran.",
    edadMin: 6, edadMax: 8, categoria: "secuencias", tipo: "secuencia", duracion: 3,
    contenido: { instruccion: "Tocá en este orden: rojo, amarillo, azul, verde.", items: ["🔴 Rojo", "🟡 Amarillo", "🔵 Azul", "🟢 Verde"] },
    activo: true, version: 1 },

  { id: "modo-tortuga", titulo: "Modo tortuga", descripcion: "Cuando algo nos enoja, podemos meternos en el caparazón un momento.",
    edadMin: 6, edadMax: 8, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: { texto: "Como una tortuga 🐢: metete en tu caparazón un momento.", ciclos: 3, fases: [{ nombre: "Escondete (inhalá)", segundos: 4 }, { nombre: "Asomate (exhalá)", segundos: 4 }] },
    activo: true, version: 1 },

  { id: "memoria-de-sonidos", titulo: "Memoria de sonidos", descripcion: "Encontrá las parejas de instrumentos.",
    edadMin: 6, edadMax: 8, categoria: "sonidos", tipo: "memoria", duracion: 4,
    contenido: { pares: ["🥁", "🎺", "🎸", "🎹"] }, activo: true, version: 1 },

  { id: "atencion-sostenida", titulo: "Atención sostenida", descripcion: "Encontrá el símbolo que se repite en cada ronda.",
    edadMin: 6, edadMax: 8, categoria: "atencion", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "¿Cuál de estos NO es una fruta?", opciones: ["🍎 Manzana", "🍇 Uva", "🚲 Bici"], correctaIdx: 2 },
      { pregunta: "¿Cuál de estos NO vuela?", opciones: ["🦅 Águila", "🐟 Pez", "🦋 Mariposa"], correctaIdx: 1 },
      { pregunta: "¿Cuál de estos NO es un número?", opciones: ["7", "12", "🐱"], correctaIdx: 2 },
      { pregunta: "¿Cuál de estos NO se usa en la cocina?", opciones: ["🍳 Sartén", "🔨 Martillo", "🥄 Cuchara"], correctaIdx: 1 },
    ] }, activo: true, version: 1 },

  { id: "que-podria-decir", titulo: "¿Qué podrías decir?", descripcion: "Situaciones donde elegís cómo responder.",
    edadMin: 6, edadMax: 8, categoria: "social", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "Un amigo está triste porque perdió su juguete favorito. ¿Qué podrías decirle?", opciones: ["\"¿Querés que lo busquemos juntos?\"", "\"No es para tanto\"", "No decirle nada"], correctaIdx: 0 },
      { pregunta: "Un compañero no entiende la tarea. ¿Qué podrías hacer?", opciones: ["Explicarle lo que yo entendí", "Reírme", "Seguir con lo mío nomás"], correctaIdx: 0 },
      { pregunta: "Alguien nuevo llegó a tu clase y está solo. ¿Qué podrías hacer?", opciones: ["Invitarlo a jugar", "No hacer nada", "Esperar a que se acerque él solo"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "el-libro-perdido", titulo: "El libro perdido", descripcion: "Una pequeña historia donde vos decidís qué pasa.",
    edadMin: 6, edadMax: 8, categoria: "historias", tipo: "historia", duracion: 4,
    contenido: { inicio: "inicio", nodos: {
      inicio: { texto: "Valentina no encuentra su libro favorito. Lo tenía ayer en la mochila. ¿Qué hace primero?", opciones: [
        { texto: "Revisar toda la mochila de nuevo", siguiente: "mochila" },
        { texto: "Preguntarle a su hermano si lo vio", siguiente: "hermano" } ] },
      mochila: { texto: "Revisando bien, encuentra el libro en el fondo de la mochila, debajo de la cartuchera. ¡Estaba ahí todo el tiempo!", opciones: [] },
      hermano: { texto: "Su hermano dice que lo vio en la mesa del living. Valentina va corriendo y ahí estaba. Problema resuelto.", opciones: [] },
    } }, activo: true, version: 1 },

  // ═══════ 🚀 9–12 AÑOS ═══════
  { id: "secuencias-dificiles", titulo: "Secuencias numéricas", descripcion: "Descubrí el patrón matemático.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "3, 6, 9, 12, ¿qué sigue?", opciones: ["15", "13", "18"], correctaIdx: 0 },
      { pregunta: "1, 4, 9, 16, ¿qué sigue? (pista: son cuadrados)", opciones: ["25", "20", "18"], correctaIdx: 0 },
      { pregunta: "2, 4, 8, 16, ¿qué sigue?", opciones: ["32", "24", "20"], correctaIdx: 0 },
      { pregunta: "100, 90, 80, 70, ¿qué sigue?", opciones: ["60", "65", "50"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "caso-sinapsis-la-nota", titulo: "Caso Sinapsis: la nota", descripcion: "Alguien dejó una nota misteriosa en el aula. Investigá.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "historia", duracion: 5,
    contenido: { inicio: "inicio", nodos: {
      inicio: { texto: "Alguien dejó una nota doblada en el aula que dice: \"Nos vemos donde empieza todo\". ¿Por dónde empezás a investigar?", opciones: [
        { texto: "Preguntarle a la maestra", siguiente: "maestra" },
        { texto: "Revisar quién estuvo último en el aula", siguiente: "testigo" } ] },
      maestra: { texto: "La maestra dice que no vio nada raro, pero que la biblioteca fue lo primero que se armó en la escuela, hace años. \"Donde empieza todo\" podría ser ahí.", opciones: [
        { texto: "Ir a la biblioteca", siguiente: "biblioteca" } ] },
      testigo: { texto: "Un compañero cuenta que vio a alguien cerca de la biblioteca antes de que sonara el timbre.", opciones: [
        { texto: "Ir a la biblioteca", siguiente: "biblioteca" } ] },
      biblioteca: { texto: "En la biblioteca encontrás otra nota: \"¡Bien hecho, detective! Esto era sólo un juego para pensar como investigador\". Caso resuelto.", opciones: [] },
    } }, activo: true, version: 1 },

  { id: "que-harias-situaciones", titulo: "¿Qué harías?", descripcion: "Situaciones de todos los días para pensar juntos.",
    edadMin: 9, edadMax: 12, categoria: "social", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "Un compañero no te quiere prestar algo que necesitás. ¿Qué podrías hacer?", opciones: ["Preguntarle con calma si me lo presta más tarde", "Sacárselo igual", "Enojarme y no hablarle más"], correctaIdx: 0 },
      { pregunta: "Un amigo está triste y no sabés bien por qué. ¿Qué podrías decir?", opciones: ["\"¿Querés contarme qué te pasa?\"", "Nada, mejor no preguntar", "\"No estés triste, no es para tanto\""], correctaIdx: 0 },
      { pregunta: "Te equivocaste delante de otros y te da vergüenza. ¿Qué podrías hacer?", opciones: ["Respirar y seguir, a todos les pasa", "Irme corriendo", "Enojarme con quien se rió"], correctaIdx: 0 },
      { pregunta: "Alguien se burla de vos. ¿Qué opciones tenés?", opciones: ["Contárselo a un adulto de confianza", "Burlarme yo también de esa persona", "Guardármelo y no decir nada"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "inventa-la-historia", titulo: "Inventá la historia", descripcion: "Un pulpo abre una biblioteca en Marte. ¿Qué pasa después?",
    edadMin: 9, edadMax: 12, categoria: "creatividad", tipo: "escritura", duracion: 5,
    contenido: { pregunta: "🐙 Un pulpo abre una biblioteca en Marte. Inventá la historia.", placeholder: "Había una vez…" }, activo: true, version: 1 },

  { id: "que-pasaria-si", titulo: "¿Qué pasaría si...?", descripcion: "Una pregunta imposible para imaginar sin límites.",
    edadMin: 9, edadMax: 12, categoria: "creatividad", tipo: "escritura", duracion: 4,
    contenido: { pregunta: "¿Qué pasaría si los animales pudieran hablar por un día?", placeholder: "Escribí tu idea…" }, activo: true, version: 1 },

  { id: "metafora-emocional", titulo: "Si mi emoción fuera un clima", descripcion: "Describí cómo te sentís usando el clima como metáfora.",
    edadMin: 9, edadMax: 12, categoria: "emociones", tipo: "escritura", duracion: 3,
    contenido: { pregunta: "Si tu estado de ánimo de hoy fuera un clima, ¿cuál sería y por qué?", placeholder: "Hoy soy como un día…" }, activo: true, version: 1 },

  { id: "cual-no-pertenece", titulo: "¿Cuál no pertenece?", descripcion: "Encontrá el elemento que no va con el grupo.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "Manzana, Banana, Pera, Silla — ¿cuál no pertenece?", opciones: ["Silla", "Manzana", "Pera"], correctaIdx: 0 },
      { pregunta: "Perro, Gato, Auto, Loro — ¿cuál no pertenece?", opciones: ["Auto", "Perro", "Loro"], correctaIdx: 0 },
      { pregunta: "Lunes, Martes, Enero, Jueves — ¿cuál no pertenece?", opciones: ["Enero", "Lunes", "Jueves"], correctaIdx: 0 },
      { pregunta: "Feliz, Triste, Alto, Enojado — ¿cuál no pertenece?", opciones: ["Alto", "Feliz", "Triste"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "pistas-del-detective", titulo: "Pistas del detective", descripcion: "Usá las pistas para descubrir quién fue.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "historia", duracion: 4,
    contenido: { inicio: "inicio", nodos: {
      inicio: { texto: "Alguien comió la última porción de torta sin avisar. Hay tres sospechosos: Fede, que estaba en su cuarto; Cata, que estaba en la cocina; y Bruno, que llegó recién. ¿A quién investigás primero?", opciones: [
        { texto: "A Cata, porque estaba en la cocina", siguiente: "cata" },
        { texto: "A Fede, en su cuarto", siguiente: "fede" } ] },
      cata: { texto: "Cata dice que sólo fue a buscar agua. Pero hay migas de torta cerca de su silla... ¡Caso resuelto! Fue Cata.", opciones: [] },
      fede: { texto: "Fede no tiene nada que ver, estuvo todo el tiempo en su cuarto. Mejor revisá la cocina, ahí puede estar la pista.", opciones: [
        { texto: "Ir a la cocina", siguiente: "cata" } ] },
    } }, activo: true, version: 1 },

  { id: "pausa-antes-de-responder", titulo: "Pausa antes de responder", descripcion: "Un momento para respirar antes de reaccionar.",
    edadMin: 9, edadMax: 12, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: { texto: "Antes de responder algo que te molestó, probemos esto.", ciclos: 4, fases: [{ nombre: "Inhalá contando hasta 4", segundos: 4 }, { nombre: "Soltá contando hasta 4", segundos: 4 }] },
    activo: true, version: 1 },

  { id: "dibuja-tu-mundo", titulo: "Dibujá tu mundo ideal", descripcion: "¿Cómo sería un lugar inventado por vos?",
    edadMin: 9, edadMax: 12, categoria: "creatividad", tipo: "dibujo", duracion: 5,
    contenido: { texto: "Dibujá un lugar inventado por vos: ¿cómo es, quién vive ahí?" }, activo: true, version: 1 },

  { id: "secuencias-de-letras", titulo: "Secuencias de letras", descripcion: "Descubrí el patrón entre las letras.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "A, C, E, G, ¿qué sigue? (se saltea una letra)", opciones: ["I", "H", "F"], correctaIdx: 0 },
      { pregunta: "Z, Y, X, W, ¿qué sigue?", opciones: ["V", "U", "T"], correctaIdx: 0 },
      { pregunta: "B, D, F, H, ¿qué sigue?", opciones: ["J", "I", "G"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "mas-pistas-el-cuaderno", titulo: "El cuaderno desaparecido", descripcion: "Otro caso para resolver con pistas.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "historia", duracion: 4,
    contenido: { inicio: "inicio", nodos: {
      inicio: { texto: "El cuaderno de la maestra desapareció del escritorio durante el recreo. Tres compañeros se quedaron adentro: Juli, que dice que estaba dibujando; Mateo, que dice que estaba leyendo; y Ana, que dice que fue al baño. ¿A quién investigás primero?", opciones: [
        { texto: "A Juli, revisando qué estaba dibujando", siguiente: "juli" },
        { texto: "A Ana, preguntando cuánto tiempo estuvo afuera", siguiente: "ana" } ] },
      juli: { texto: "Juli muestra su dibujo — es de la clase de hoy, así que estuvo todo el tiempo ahí sentada, a la vista de todos. No parece ella.", opciones: [
        { texto: "Investigar a Ana", siguiente: "ana" } ] },
      ana: { texto: "Ana tardó bastante en volver del baño... y el cuaderno aparece en su mochila, se lo había llevado sin querer pensando que era el de ella. ¡Caso resuelto!", opciones: [] },
    } }, activo: true, version: 1 },

  { id: "relaciones-logicas", titulo: "¿Cuál va con cuál?", descripcion: "Encontrá la relación entre las palabras.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "Pájaro es a nido, como abeja es a…", opciones: ["Colmena", "Auto", "Silla"], correctaIdx: 0 },
      { pregunta: "Médico es a hospital, como maestro es a…", opciones: ["Escuela", "Cocina", "Playa"], correctaIdx: 0 },
      { pregunta: "Frío es a caliente, como día es a…", opciones: ["Noche", "Semana", "Reloj"], correctaIdx: 0 },
      { pregunta: "Libro es a leer, como pelota es a…", opciones: ["Jugar", "Comer", "Dormir"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "inventa-un-personaje", titulo: "Inventá un personaje", descripcion: "Creá a alguien completamente nuevo.",
    edadMin: 9, edadMax: 12, categoria: "creatividad", tipo: "escritura", duracion: 5,
    contenido: { pregunta: "Inventá un personaje: ¿cómo se llama, qué poder o habilidad especial tiene, qué le gusta hacer?", placeholder: "Se llama…" },
    activo: true, version: 1 },
];

// ── "Jugamos juntos" — actividades para hacer en familia (sin motor, sólo tarjetas de consigna) ──
const JUGAMOS_JUNTOS = [
  { categoria: "emociones", icono: "❤️", consigna: "Mostrame una cara de sorpresa. Ahora una de alegría. ¿Cuál te costó más?" },
  { categoria: "emociones", icono: "❤️", consigna: "¿Qué cosas te hacen sentir tranquilo/a? Contámelas." },
  { categoria: "social", icono: "🗣️", consigna: "Contame algo bueno que te haya pasado hoy." },
  { categoria: "creatividad", icono: "🎨", consigna: "Dibujemos juntos un monstruo inventado por los dos." },
  { categoria: "vinculo", icono: "🤝", consigna: "Cada uno diga una cosa que le gusta del otro." },
  { categoria: "logica", icono: "🧠", consigna: "Inventemos tres soluciones distintas para este problema: se nos rompió el paraguas y está lloviendo." },
  { categoria: "social", icono: "🗣️", consigna: "Si pudieras tener un superpoder por un día, ¿cuál sería y para qué lo usarías?" },
  { categoria: "vinculo", icono: "🤝", consigna: "Recordemos juntos un momento lindo que pasamos este mes." },
];

// ── Guía evolutiva para familias (referencia general, no una checklist clínica) ──
const GUIA_EVOLUTIVA = [
  { banda: "3-5", cognicion: "Empieza a clasificar por tamaño, color o forma. Le interesan las causas simples (\"¿por qué?\").",
    lenguaje: "Arma frases cortas, amplía vocabulario rápido, empieza a contar historias simples.",
    emociones: "Reconoce emociones básicas (alegría, tristeza, enojo, miedo) en sí mismo y en los demás, aunque todavía le cuesta regularlas solo.",
    social: "Juega en paralelo o de a poco en conjunto con otros chicos. Empieza a compartir, con ayuda.",
    atencion: "Sostiene la atención en algo que le interesa por unos minutos.",
    autonomia: "Puede empezar a vestirse solo, comer con cubiertos, lavarse las manos con ayuda.",
    juego: "Juego simbólico: hace \"de cuenta que\"." },
  { banda: "6-8", cognicion: "Empieza el pensamiento lógico más concreto: puede ordenar, clasificar con criterios más complejos, entender reglas de juegos.",
    lenguaje: "Lee y escribe (en distintos niveles según el proceso de cada uno), cuenta historias con más estructura.",
    emociones: "Empieza a identificar emociones más matizadas y a relacionarlas con situaciones. Todavía necesita acompañamiento para regularlas en momentos intensos.",
    social: "Le importa más la opinión de sus pares. Empieza a entender turnos, reglas compartidas, trabajo en equipo.",
    atencion: "Puede sostener tareas más largas, aunque sigue necesitando pausas.",
    autonomia: "Mayor independencia en rutinas diarias y responsabilidades chicas.",
    juego: "Juegos con reglas, competencia sana, colaboración." },
  { banda: "9-12", cognicion: "Pensamiento más abstracto: puede razonar sobre hipótesis, entender causas más complejas, planificar a futuro.",
    lenguaje: "Comunicación más elaborada, empieza a entender matices, ironía, dobles sentidos.",
    emociones: "Mayor conciencia emocional, pero también aparecen la autocrítica y la comparación social — es una etapa sensible para la autoestima.",
    social: "El grupo de pares gana mucha importancia. Empiezan a definirse identidades e intereses propios.",
    atencion: "Puede sostener tareas más largas y complejas, planificar estudio.",
    autonomia: "Mayor independencia general, aunque sigue necesitando límites y acompañamiento.",
    juego: "Juegos de estrategia, desafíos, creatividad más elaborada." },
];

const CatalogoInfantil = {
  todos: () => ACTIVIDADES.filter(a => a.activo),
  porId: (id) => ACTIVIDADES.find(a => a.id === id),
  porBanda: (bandaId) => {
    const b = BANDAS_EDAD.find(x => x.id === bandaId);
    if (!b) return [];
    const [min, max] = bandaId.split("-").map(Number);
    return CatalogoInfantil.todos().filter(a => a.edadMin <= max && a.edadMax >= min);
  },
  porCategoria: (catId) => CatalogoInfantil.todos().filter(a => a.categoria === catId),
  categorias: () => CATEGORIAS_INFANTIL,
  categoriaPorId: (id) => CATEGORIAS_INFANTIL.find(c => c.id === id),
  bandas: () => BANDAS_EDAD,
  bandaPorId: (id) => BANDAS_EDAD.find(b => b.id === id),
  aleatorio: (bandaId) => {
    const pool = bandaId ? CatalogoInfantil.porBanda(bandaId) : CatalogoInfantil.todos();
    return pool[Math.floor(Math.random() * pool.length)];
  },
  jugamosJuntos: () => JUGAMOS_JUNTOS,
  guiaEvolutiva: () => GUIA_EVOLUTIVA,
  guiaPorBanda: (bandaId) => GUIA_EVOLUTIVA.find(g => g.banda === bandaId),
};

if (typeof module !== "undefined") module.exports = { ACTIVIDADES, CATEGORIAS_INFANTIL, BANDAS_EDAD, JUGAMOS_JUNTOS, GUIA_EVOLUTIVA, CatalogoInfantil };
