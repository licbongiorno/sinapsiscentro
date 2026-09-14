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
  { id: "memoria-animales-chicos", titulo: "Memoria de animales", descripcion: "Encontrá las parejas de animalitos.", beneficio: "Los juegos de memoria en la primera infancia entrenan la memoria de trabajo de una forma simple y visual, adaptada a cómo piensan los chicos a esta edad.",
    edadMin: 3, edadMax: 5, categoria: "memoria", tipo: "memoria", duracion: 4,
    contenido: { pares: ["🐶", "🐱", "🐰", "🦁", "🐸", "🐼"] }, activo: true, version: 3 },

  { id: "que-animal-es", titulo: "¿Qué animal es?", descripcion: "Adiviná el animal por sus características.", beneficio: "Reconocer y nombrar animales ayuda a ampliar el vocabulario y a practicar la categorización, una de las primeras formas de pensamiento lógico que desarrollan los chicos.",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "Tiene el cuello muy largo y come hojas de los árboles altos.", opciones: ["🦒 Jirafa", "🐘 Elefante", "🐸 Rana"], correctaIdx: 0 },
      { pregunta: "Tiene rayas negras y blancas.", opciones: ["🦓 Cebra", "🐨 Koala", "🐢 Tortuga"], correctaIdx: 0 },
      { pregunta: "Vive en el agua y tiene una concha dura.", opciones: ["🐢 Tortuga", "🦁 León", "🐿️ Ardilla"], correctaIdx: 0 },
      { pregunta: "Salta muy alto y tiene orejas largas.", opciones: ["🐰 Conejo", "🐌 Caracol", "🐳 Ballena"], correctaIdx: 0 },
      { pregunta: "Tiene una trompa muy larga y orejas grandes.", opciones: ["🐘 Elefante", "🐹 Hámster", "🦉 Búho"], correctaIdx: 0 },
      { pregunta: "Es muy lento y lleva su casa en la espalda.", opciones: ["🐌 Caracol", "🐆 Guepardo", "🦅 Águila"], correctaIdx: 0 },
      { pregunta: "Tiene melena y es el rey de la selva.", opciones: ["🦁 León", "🐑 Oveja", "🐹 Hámster"], correctaIdx: 0 },
      { pregunta: "Vuela de flor en flor y hace miel.", opciones: ["🐝 Abeja", "🐛 Oruga", "🐌 Caracol"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "donde-vive", titulo: "¿Dónde vive?", descripcion: "Cada animal tiene su hogar.", beneficio: "Asociar sonidos, imágenes y nombres de animales entrena la memoria y el lenguaje al mismo tiempo, dos áreas que en la primera infancia se desarrollan muy conectadas entre sí.",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "¿Dónde vive el pez? 🐟", opciones: ["En el agua", "En un árbol", "Bajo tierra"], correctaIdx: 0 },
      { pregunta: "¿Dónde vive el pájaro? 🐦", opciones: ["En un nido", "En el agua", "En una cueva"], correctaIdx: 0 },
      { pregunta: "¿Dónde vive el oso? 🐻", opciones: ["En una cueva", "En el mar", "En una pecera"], correctaIdx: 0 },
      { pregunta: "¿Dónde vive la abeja? 🐝", opciones: ["En una colmena", "En un lago", "En la nieve"], correctaIdx: 0 },
      { pregunta: "¿Dónde vive el conejo? 🐰", opciones: ["En una cueva bajo tierra", "En el mar", "En un nido en el árbol"], correctaIdx: 0 },
      { pregunta: "¿Dónde vive el delfín? 🐬", opciones: ["En el mar", "En el desierto", "En una montaña"], correctaIdx: 0 },
      { pregunta: "¿Dónde vive la araña? 🕷️", opciones: ["En una telaraña", "Bajo el agua", "En el cielo"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "quien-hace-este-sonido", titulo: "¿Quién dice eso?", descripcion: "Adiviná qué animal hace cada sonido.", beneficio: "Distinguir sonidos entrena la discriminación auditiva, una habilidad de base para el desarrollo del lenguaje y, más adelante, para el aprendizaje de la lectura.",
    edadMin: 3, edadMax: 5, categoria: "sonidos", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "\"¡Muuu!\" ¿Quién lo dice?", opciones: ["🐮 Vaca", "🐱 Gato", "🐍 Serpiente"], correctaIdx: 0 },
      { pregunta: "\"¡Guau guau!\" ¿Quién lo dice?", opciones: ["🐶 Perro", "🐟 Pez", "🐢 Tortuga"], correctaIdx: 0 },
      { pregunta: "\"¡Miau!\" ¿Quién lo dice?", opciones: ["🐱 Gato", "🐷 Chancho", "🐸 Rana"], correctaIdx: 0 },
      { pregunta: "\"¡Kikirikí!\" ¿Quién lo dice?", opciones: ["🐓 Gallo", "🐑 Oveja", "🐴 Caballo"], correctaIdx: 0 },
      { pregunta: "\"¡Beee!\" ¿Quién lo dice?", opciones: ["🐑 Oveja", "🐔 Gallina", "🐢 Tortuga"], correctaIdx: 0 },
      { pregunta: "\"¡Cuac cuac!\" ¿Quién lo dice?", opciones: ["🦆 Pato", "🐺 Lobo", "🐝 Abeja"], correctaIdx: 0 },
      { pregunta: "\"¡Iii-oo!\" ¿Quién lo dice?", opciones: ["🫏 Burro", "🐦 Pájaro", "🐍 Serpiente"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "dibuja-como-te-sientes", titulo: "Dibujá cómo te sentís", descripcion: "Usá colores y formas para mostrar tu emoción de hoy.", beneficio: "Ponerle nombre a las emociones desde chicos —lo que en desarrollo infantil se llama 'alfabetización emocional'— está asociado con mejor regulación emocional más adelante en la vida.",
    edadMin: 3, edadMax: 5, categoria: "emociones", tipo: "dibujo", duracion: 4,
    contenido: { texto: "Dibujá cómo te sentís hoy, como vos quieras." }, activo: true, version: 1 },

  { id: "grande-pequeno", titulo: "Grande o pequeño", descripcion: "Clasificá cada cosa según su tamaño.", beneficio: "Reconocer formas y colores es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "clasificar", duracion: 4,
    contenido: { instruccion: "¿Es grande o pequeño?", grupoA: { nombre: "Grande", emoji: "🐘" }, grupoB: { nombre: "Pequeño", emoji: "🐜" },
      items: [{ emoji: "🐘", grupo: "A" }, { emoji: "🐜", grupo: "B" }, { emoji: "🐋", grupo: "A" }, { emoji: "🐭", grupo: "B" }, { emoji: "🏠", grupo: "A" }, { emoji: "🔘", grupo: "B" }, { emoji: "🦕", grupo: "A" }, { emoji: "🐞", grupo: "B" }, { emoji: "🚛", grupo: "A" }, { emoji: "🍬", grupo: "B" }] },
    activo: true, version: 2 },

  { id: "igual-o-diferente", titulo: "Igual o diferente", descripcion: "Encontrá el que no es igual a los demás.", beneficio: "La capacidad de sostener la atención en una tarea se desarrolla gradualmente durante la infancia; actividades breves y con un final claro son una forma efectiva de ejercitarla sin generar frustración.",
    edadMin: 3, edadMax: 5, categoria: "atencion", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "¿Cuál es diferente?", opciones: ["🔵", "🔵", "🔴"], correctaIdx: 2 },
      { pregunta: "¿Cuál es diferente?", opciones: ["⭐", "🌙", "⭐"], correctaIdx: 1 },
      { pregunta: "¿Cuál es diferente?", opciones: ["🐶", "🐶", "🐱"], correctaIdx: 2 },
      { pregunta: "¿Cuál es diferente?", opciones: ["🟩", "🟩", "🟨"], correctaIdx: 2 },
      { pregunta: "¿Cuál es diferente?", opciones: ["🍎", "🍎", "🍌"], correctaIdx: 2 },
      { pregunta: "¿Cuál es diferente?", opciones: ["🐦", "🦋", "🐦"], correctaIdx: 1 },
      { pregunta: "¿Cuál es diferente?", opciones: ["🔺", "🔺", "🔻"], correctaIdx: 2 },
    ] }, activo: true, version: 2 },

  { id: "como-se-siente", titulo: "¿Cómo se siente?", descripcion: "Mirá la situación y elegí la emoción.", beneficio: "Reconocer emociones en otros es una habilidad social temprana que sienta las bases de la empatía.",
    edadMin: 3, edadMax: 5, categoria: "emociones", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "A Sofi se le cayó el helado al piso.", emoji: "🍦", opciones: ["😢 Triste", "😄 Feliz", "😴 Cansada"], correctaIdx: 0 },
      { pregunta: "Tomás recibió un regalo sorpresa.", emoji: "🎁", opciones: ["😄 Feliz", "😡 Enojado", "😨 Asustado"], correctaIdx: 0 },
      { pregunta: "Hay un ruido muy fuerte de repente.", emoji: "💥", opciones: ["😨 Asustado", "😄 Feliz", "😌 Tranquilo"], correctaIdx: 0 },
      { pregunta: "Le sacaron un juguete sin preguntar.", emoji: "🧸", opciones: ["😡 Enojado", "😄 Feliz", "😌 Tranquilo"], correctaIdx: 0 },
      { pregunta: "Encontró a su mejor amigo en la plaza.", emoji: "🎡", opciones: ["😄 Feliz", "😢 Triste", "😨 Asustado"], correctaIdx: 0 },
      { pregunta: "Se despertó en medio de la noche por un trueno.", emoji: "⛈️", opciones: ["😨 Asustado", "😄 Feliz", "😴 Cansado"], correctaIdx: 0 },
      { pregunta: "Después de correr mucho en el parque.", emoji: "🏃", opciones: ["😴 Cansado", "😡 Enojado", "😨 Asustado"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "clasificar-animales", titulo: "Tierra, agua o aire", descripcion: "¿Dónde se mueve cada animal?", beneficio: "Reconocer y nombrar animales ayuda a ampliar el vocabulario y a practicar la categorización, una de las primeras formas de pensamiento lógico que desarrollan los chicos.",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "clasificar", duracion: 4,
    contenido: { instruccion: "¿Nada en el agua o camina en la tierra?", grupoA: { nombre: "Agua", emoji: "🌊" }, grupoB: { nombre: "Tierra", emoji: "🌳" },
      items: [{ emoji: "🐟", grupo: "A" }, { emoji: "🐘", grupo: "B" }, { emoji: "🐬", grupo: "A" }, { emoji: "🐻", grupo: "B" }, { emoji: "🐳", grupo: "A" }, { emoji: "🦁", grupo: "B" }, { emoji: "🐙", grupo: "A" }, { emoji: "🐴", grupo: "B" }] },
    activo: true, version: 2 },

  { id: "respiracion-burbuja", titulo: "La respiración de la burbuja", descripcion: "Infla una burbuja imaginaria con tu respiración.", beneficio: "Las prácticas breves de respiración y calma, adaptadas a la infancia, ayudan a que los chicos empiecen a reconocer señales de su propio cuerpo desde chicos: una base para la autorregulación futura.",
    edadMin: 3, edadMax: 5, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: { texto: "Imaginá que soplás una burbuja gigante 🫧", ciclos: 3, fases: [{ nombre: "Inflá la burbuja", segundos: 4 }, { nombre: "Soltala suavecito", segundos: 4 }] },
    activo: true, version: 1 },

  { id: "clasificar-comida-juguetes", titulo: "Comida o juguete", descripcion: "¿Se come o se juega con eso?", beneficio: "Agrupar objetos según una característica común es una de las primeras formas de razonamiento lógico, y una base importante para el pensamiento matemático posterior.",
    edadMin: 3, edadMax: 5, categoria: "clasificacion", tipo: "clasificar", duracion: 4,
    contenido: { instruccion: "¿Es comida o es un juguete?", grupoA: { nombre: "Comida", emoji: "🍎" }, grupoB: { nombre: "Juguete", emoji: "🧸" },
      items: [{ emoji: "🍎", grupo: "A" }, { emoji: "🧸", grupo: "B" }, { emoji: "🍌", grupo: "A" }, { emoji: "⚽", grupo: "B" }, { emoji: "🥕", grupo: "A" }, { emoji: "🪀", grupo: "B" }, { emoji: "🍕", grupo: "A" }, { emoji: "🪁", grupo: "B" }] },
    activo: true, version: 2 },

  { id: "dia-o-noche", titulo: "Día o noche", descripcion: "¿Cuándo pasa esto?", beneficio: "Clasificar exige sostener una regla en la mente mientras se decide dónde va cada cosa: un pequeño ejercicio temprano de función ejecutiva.",
    edadMin: 3, edadMax: 5, categoria: "clasificacion", tipo: "clasificar", duracion: 4,
    contenido: { instruccion: "¿Es algo de día o de noche?", grupoA: { nombre: "Día", emoji: "☀️" }, grupoB: { nombre: "Noche", emoji: "🌙" },
      items: [{ emoji: "☀️", grupo: "A" }, { emoji: "🌙", grupo: "B" }, { emoji: "🏫", grupo: "A" }, { emoji: "🛏️", grupo: "B" }, { emoji: "🌈", grupo: "A" }, { emoji: "⭐", grupo: "B" }, { emoji: "🥞", grupo: "A" }, { emoji: "🦉", grupo: "B" }] },
    activo: true, version: 2 },

  { id: "memoria-sonidos-chicos", titulo: "Memoria de sonidos", descripcion: "Encontrá las parejas de sonidos iguales.", beneficio: "Reconocer sonidos del entorno ayuda a los chicos a conectar su mundo sensorial con palabras, un paso importante en el desarrollo del lenguaje.",
    edadMin: 3, edadMax: 5, categoria: "sonidos", tipo: "memoria", duracion: 4,
    contenido: { pares: ["🔔", "📯", "🥁", "🎵", "🎶"] }, activo: true, version: 3 },

  { id: "que-sigue-patron-simple", titulo: "¿Qué sigue?", descripcion: "Un patrón fácil de colores.", beneficio: "La discriminación visual —diferenciar formas y colores parecidos— es una habilidad perceptiva que se sigue desarrollando durante toda la primera infancia.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "🔴 🔵 🔴 🔵 ¿Qué sigue?", opciones: ["🔴", "🟢", "🟡"], correctaIdx: 0 },
      { pregunta: "⭐ ⭐ 🌙 ⭐ ⭐ ¿Qué sigue?", opciones: ["🌙", "⭐", "☀️"], correctaIdx: 0 },
      { pregunta: "🟩 🟨 🟩 🟨 ¿Qué sigue?", opciones: ["🟩", "🟦", "🟥"], correctaIdx: 0 },
      { pregunta: "🐶 🐱 🐶 🐱 ¿Qué sigue?", opciones: ["🐶", "🐰", "🐱"], correctaIdx: 0 },
      { pregunta: "1 2 1 2 ¿Qué sigue?", opciones: ["1", "3", "2"], correctaIdx: 0 },
      { pregunta: "🟣 🟣 🟠 🟣 🟣 ¿Qué sigue?", opciones: ["🟠", "🟣", "🟢"], correctaIdx: 0 },
      { pregunta: "🔺 🔵 🔺 🔵 ¿Qué sigue?", opciones: ["🔺", "🔻", "🟡"], correctaIdx: 0 },
    ] }, activo: true, version: 3 },

  { id: "encontra-la-forma", titulo: "Encontrá la forma", descripcion: "Buscá la forma que se pide entre varias parecidas.", beneficio: "Reconocer formas y colores es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "¿Cuál es el círculo?", opciones: ["🔵", "🔺", "🟦"], correctaIdx: 0 },
      { pregunta: "¿Cuál es el cuadrado?", opciones: ["🟦", "🔵", "🔺"], correctaIdx: 0 },
      { pregunta: "¿Cuál es el triángulo?", opciones: ["🔺", "⭐", "🟦"], correctaIdx: 0 },
      { pregunta: "¿Cuál es la estrella?", opciones: ["⭐", "🔵", "🟩"], correctaIdx: 0 },
      { pregunta: "¿Cuál es de color rojo?", opciones: ["🔴", "🔵", "🟢"], correctaIdx: 0 },
      { pregunta: "¿Cuál es de color amarillo?", opciones: ["🟡", "🟣", "🔵"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "cuantos-hay", titulo: "¿Cuántos hay?", descripcion: "Contá los elementos y elegí el número.", beneficio: "La discriminación visual —diferenciar formas y colores parecidos— es una habilidad perceptiva que se sigue desarrollando durante toda la primera infancia.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "🍎 🍎 ¿Cuántas manzanas hay?", opciones: ["2", "3", "1"], correctaIdx: 0 },
      { pregunta: "⭐ ⭐ ⭐ ¿Cuántas estrellas hay?", opciones: ["3", "2", "4"], correctaIdx: 0 },
      { pregunta: "🐶 🐶 🐶 🐶 ¿Cuántos perritos hay?", opciones: ["4", "3", "5"], correctaIdx: 0 },
      { pregunta: "🎈 ¿Cuántos globos hay?", opciones: ["1", "2", "3"], correctaIdx: 0 },
      { pregunta: "🌸 🌸 🌸 🌸 🌸 ¿Cuántas flores hay?", opciones: ["5", "4", "6"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "que-hacemos-cuando", titulo: "¿Qué hacemos cuando...?", descripcion: "Pequeñas situaciones de todos los días.", beneficio: "Los juegos que involucran turnos, reglas simples o pensar en otro personaje entrenan habilidades sociales tempranas, como esperar el turno o considerar una perspectiva distinta a la propia.",
    edadMin: 3, edadMax: 5, categoria: "social", tipo: "seleccion", duracion: 3,
    contenido: { rondas: [
      { pregunta: "¿Qué hacemos antes de comer?", opciones: ["Lavarnos las manos", "Saltar", "Dormir"], correctaIdx: 0 },
      { pregunta: "¿Qué decimos cuando alguien nos ayuda?", opciones: ["Gracias", "Chau", "Nada"], correctaIdx: 0 },
      { pregunta: "¿Qué hacemos si queremos algo de otro nene?", opciones: ["Se lo pedimos", "Se lo sacamos", "Gritamos"], correctaIdx: 0 },
      { pregunta: "¿Qué decimos cuando llegamos a un lugar?", opciones: ["Hola", "Chau", "Nada"], correctaIdx: 0 },
      { pregunta: "¿Qué hacemos antes de dormir?", opciones: ["Lavarnos los dientes", "Correr", "Comer"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "respiracion-estrella", titulo: "Respiración de la estrella", descripcion: "Dibujá una estrella en el aire mientras respirás.", beneficio: "Aprender a calmarse con una técnica simple, repetida varias veces, suele ser más efectivo en la infancia que las explicaciones abstractas sobre las emociones.",
    edadMin: 3, edadMax: 5, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: { texto: "Imaginá una estrella brillante ⭐ que se prende y se apaga con tu respiración.", ciclos: 4, fases: [{ nombre: "Se prende (inhalá)", segundos: 3 }, { nombre: "Se apaga (exhalá)", segundos: 4 }] },
    activo: true, version: 1 },

  // ═══════ 🦊 6–8 AÑOS ═══════
  { id: "encontra-el-objeto", titulo: "Encontrá el objeto", descripcion: "Prestá atención y encontrá lo que se pide.", beneficio: "Buscar y encontrar algo específico entrena la atención selectiva, una habilidad que después es clave para el aprendizaje escolar.",
    edadMin: 6, edadMax: 8, categoria: "atencion", tipo: "seleccion", duracion: 5,
    contenido: { rondas: [
      { pregunta: "¿Cuál de estos se usa para escribir?", opciones: ["✏️ Lápiz", "🍎 Manzana", "⚽ Pelota", "🧦 Media"], correctaIdx: 0 },
      { pregunta: "¿Cuál de estos vuela?", opciones: ["✈️ Avión", "🚗 Auto", "🚲 Bici", "🛴 Monopatín"], correctaIdx: 0 },
      { pregunta: "¿Cuál de estos es una fruta?", opciones: ["🍌 Banana", "🔧 Llave", "📱 Celular", "👟 Zapatilla"], correctaIdx: 0 },
      { pregunta: "¿Cuál de estos da luz?", opciones: ["💡 Lamparita", "🪑 Silla", "🧦 Media", "📚 Libro"], correctaIdx: 0 },
      { pregunta: "¿Cuál de estos se usa para cortar?", opciones: ["✂️ Tijera", "🥄 Cuchara", "🖊️ Lapicera", "🧽 Esponja"], correctaIdx: 0 },
      { pregunta: "¿Cuál de estos flota en el agua?", opciones: ["🚤 Bote", "🪨 Piedra", "🔨 Martillo", "🧱 Ladrillo"], correctaIdx: 0 },
      { pregunta: "¿Cuál de estos se usa en invierno?", opciones: ["🧣 Bufanda", "🩳 Short", "🩴 Ojota", "🕶️ Anteojos de sol"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "que-cambio", titulo: "¿Qué cambió?", descripcion: "Mirá bien y notá la diferencia.", beneficio: "La capacidad de sostener la atención en una tarea se desarrolla gradualmente durante la infancia; actividades breves y con un final claro son una forma efectiva de ejercitarla sin generar frustración.",
    edadMin: 6, edadMax: 8, categoria: "atencion", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "Antes había 🔵🔵🔵. Ahora hay 🔵🔴🔵. ¿Qué cambió?", opciones: ["Un color", "La cantidad", "Nada", "El orden"], correctaIdx: 0 },
      { pregunta: "Antes había ⭐⭐⭐. Ahora hay ⭐⭐. ¿Qué cambió?", opciones: ["Faltó una estrella", "Se agregó una", "Nada", "Cambió el color"], correctaIdx: 0 },
      { pregunta: "Antes había 🟩🟦. Ahora hay 🟦🟩. ¿Qué cambió?", opciones: ["El orden", "El color", "Nada", "La cantidad"], correctaIdx: 0 },
      { pregunta: "Antes había 🐶🐱. Ahora hay 🐶🐱🐰. ¿Qué cambió?", opciones: ["Se agregó un animal", "Cambió el orden", "Nada", "Faltó un animal"], correctaIdx: 0 },
      { pregunta: "Antes había ☀️. Ahora hay 🌙. ¿Qué cambió?", opciones: ["Pasó de día a noche", "Hay más cosas", "Nada", "Cambió el tamaño"], correctaIdx: 0 },
      { pregunta: "Antes había 🟥🟥🟥🟥. Ahora hay 🟥🟥. ¿Qué cambió?", opciones: ["Faltan dos", "Sobran dos", "Nada", "Cambió el color"], correctaIdx: 0 },
    ] }, activo: true, version: 3 },

  { id: "memoria-parejas-personajes", titulo: "Memoria de personajes", descripcion: "Encontrá las parejas.", beneficio: "Recordar dónde está algo, aunque sea en un juego simple, es un ejercicio real de memoria visoespacial.",
    edadMin: 6, edadMax: 8, categoria: "memoria", tipo: "memoria", duracion: 5,
    contenido: { pares: ["🦸", "🧙", "🧜", "🦹", "🕵️", "🧑‍🚀", "🧛", "🥷"] }, activo: true, version: 3 },

  { id: "que-sigue-secuencia", titulo: "¿Qué sigue?", descripcion: "Descubrí el patrón y elegí lo que sigue.", beneficio: "Entender y repetir una secuencia —qué va primero, qué va después— es una habilidad de razonamiento lógico que también ayuda a entender rutinas y consignas de varios pasos.",
    edadMin: 6, edadMax: 8, categoria: "secuencias", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "🔴 🔵 🔴 🔵 🔴 ¿Qué sigue?", opciones: ["🔵", "🔴", "🟢", "🟡"], correctaIdx: 0 },
      { pregunta: "1 2 3 4 ¿Qué sigue?", opciones: ["5", "6", "3", "7"], correctaIdx: 0 },
      { pregunta: "⭐ ⭐ 🌙 ⭐ ⭐ 🌙 ¿Qué sigue?", opciones: ["⭐", "🌙", "☀️", "🌟"], correctaIdx: 0 },
      { pregunta: "2 4 6 8 ¿Qué sigue?", opciones: ["10", "9", "12", "11"], correctaIdx: 0 },
      { pregunta: "🟢 🟢 🔵 🟢 🟢 🔵 ¿Qué sigue?", opciones: ["🟢", "🔵", "🔴", "🟡"], correctaIdx: 0 },
      { pregunta: "5 10 15 20 ¿Qué sigue?", opciones: ["25", "22", "30", "21"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "ordena-la-historia", titulo: "Ordená la historia", descripcion: "Poné estas partes en el orden correcto.", beneficio: "Escuchar y recordar partes de una historia entrena la comprensión narrativa, una habilidad directamente relacionada con la comprensión lectora futura.",
    edadMin: 6, edadMax: 8, categoria: "historias", tipo: "secuencia", duracion: 4,
    contenido: { instruccion: "Ordená lo que pasó primero, después y al final.", items: ["Sofía se despertó", "Desayunó con su familia", "Se lavó los dientes", "Se fue a la escuela", "Volvió a casa a la tarde"] },
    activo: true, version: 3 },

  { id: "que-paso-que-siento", titulo: "¿Qué pasó? ¿Qué siento?", descripcion: "Pensá cómo se siente cada personaje.", beneficio: "Ponerle nombre a las emociones desde chicos —lo que en desarrollo infantil se llama 'alfabetización emocional'— está asociado con mejor regulación emocional más adelante en la vida.",
    edadMin: 6, edadMax: 8, categoria: "emociones", tipo: "seleccion", duracion: 5,
    contenido: { rondas: [
      { pregunta: "Martina estaba jugando y otro nene le quitó el juguete. ¿Qué podría sentir?", opciones: ["😡 Enojo", "😄 Alegría", "😴 Sueño", "😌 Calma"], correctaIdx: 0 },
      { pregunta: "Lucas practicó mucho para el partido y su equipo ganó. ¿Qué podría sentir?", opciones: ["😄 Alegría", "😢 Tristeza", "😨 Miedo", "😴 Sueño"], correctaIdx: 0 },
      { pregunta: "A Valen se le rompió su juguete favorito. ¿Qué podría sentir?", opciones: ["😢 Tristeza", "😄 Alegría", "😌 Calma", "😴 Sueño"], correctaIdx: 0 },
      { pregunta: "Nico tiene que hablar frente a toda la clase mañana. ¿Qué podría sentir?", opciones: ["😰 Nervios", "😄 Alegría", "😡 Enojo", "😌 Calma"], correctaIdx: 0 },
      { pregunta: "Belén se olvidó el cumpleaños de su mejor amiga. ¿Qué podría sentir?", opciones: ["😔 Culpa", "😄 Alegría", "😡 Enojo", "😴 Sueño"], correctaIdx: 0 },
      { pregunta: "Iñaki finalmente aprendió a andar en bici sin rueditas. ¿Qué podría sentir?", opciones: ["🤩 Orgullo", "😢 Tristeza", "😨 Miedo", "😡 Enojo"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "elegi-que-pasa", titulo: "Elegí qué pasa", descripcion: "Una historia donde vos decidís.", beneficio: "Ponerse en el lugar de un personaje es una forma simple de empezar a desarrollar la empatía.",
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

  { id: "cual-es-el-par", titulo: "¿Cuál va con cuál?", descripcion: "Relacioná cada cosa con su pareja lógica.", beneficio: "El pensamiento lógico en la primera infancia se construye con actividades concretas —ordenar, comparar, encontrar reglas— mucho antes de poder razonar de forma abstracta.",
    edadMin: 6, edadMax: 8, categoria: "logica", tipo: "seleccion", duracion: 5,
    contenido: { rondas: [
      { pregunta: "🧦 va con…", opciones: ["👟 Zapato", "🍕 Pizza", "📚 Libro", "🚗 Auto"], correctaIdx: 0 },
      { pregunta: "🔑 va con…", opciones: ["🚪 Puerta", "🐟 Pez", "🌙 Luna", "🍦 Helado"], correctaIdx: 0 },
      { pregunta: "☂️ va con…", opciones: ["🌧️ Lluvia", "☀️ Sol fuerte", "🎈 Globo", "🔥 Fuego"], correctaIdx: 0 },
      { pregunta: "🖊️ va con…", opciones: ["📄 Papel", "🍔 Hamburguesa", "🚗 Auto", "⚽ Pelota"], correctaIdx: 0 },
      { pregunta: "🪥 va con…", opciones: ["🦷 Dientes", "👂 Oreja", "👃 Nariz", "👀 Ojos"], correctaIdx: 0 },
      { pregunta: "🕯️ va con…", opciones: ["🎂 Torta de cumpleaños", "🥗 Ensalada", "🚲 Bici", "📖 Libro"], correctaIdx: 0 },
      { pregunta: "🧤 va con…", opciones: ["✋ Mano", "🦶 Pie", "👂 Oreja", "👃 Nariz"], correctaIdx: 0 },
      { pregunta: "🪮 va con…", opciones: ["💇 Pelo", "🦷 Dientes", "👀 Ojos", "👃 Nariz"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "secuencia-de-colores", titulo: "Secuencia de colores", descripcion: "Ordená los colores como se muestran.", beneficio: "Entender y repetir una secuencia —qué va primero, qué va después— es una habilidad de razonamiento lógico que también ayuda a entender rutinas y consignas de varios pasos.",
    edadMin: 6, edadMax: 8, categoria: "secuencias", tipo: "secuencia", duracion: 4,
    contenido: { instruccion: "Tocá en este orden: rojo, amarillo, azul, verde, violeta.", items: ["🔴 Rojo", "🟡 Amarillo", "🔵 Azul", "🟢 Verde", "🟣 Violeta"] },
    activo: true, version: 2 },

  { id: "modo-tortuga", titulo: "Modo tortuga", descripcion: "Cuando algo nos enoja, podemos meternos en el caparazón un momento.", beneficio: "Las prácticas breves de respiración y calma, adaptadas a la infancia, ayudan a que los chicos empiecen a reconocer señales de su propio cuerpo desde chicos: una base para la autorregulación futura.",
    edadMin: 6, edadMax: 8, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: { texto: "Como una tortuga 🐢: metete en tu caparazón un momento.", ciclos: 4, fases: [{ nombre: "Escondete (inhalá)", segundos: 4 }, { nombre: "Asomate (exhalá)", segundos: 4 }] },
    activo: true, version: 2 },

  { id: "memoria-de-sonidos", titulo: "Memoria de sonidos", descripcion: "Encontrá las parejas de instrumentos.", beneficio: "Distinguir sonidos entrena la discriminación auditiva, una habilidad de base para el desarrollo del lenguaje y, más adelante, para el aprendizaje de la lectura.",
    edadMin: 6, edadMax: 8, categoria: "sonidos", tipo: "memoria", duracion: 5,
    contenido: { pares: ["🥁", "🎺", "🎸", "🎹", "🎻", "🪕"] }, activo: true, version: 2 },

  { id: "atencion-sostenida", titulo: "Atención sostenida", descripcion: "Encontrá el símbolo que se repite en cada ronda.", beneficio: "Buscar y encontrar algo específico entrena la atención selectiva, una habilidad que después es clave para el aprendizaje escolar.",
    edadMin: 6, edadMax: 8, categoria: "atencion", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "¿Cuál de estos NO es una fruta?", opciones: ["🍎 Manzana", "🍇 Uva", "🚲 Bici", "🍌 Banana"], correctaIdx: 2 },
      { pregunta: "¿Cuál de estos NO vuela?", opciones: ["🦅 Águila", "🐟 Pez", "🦋 Mariposa", "🐝 Abeja"], correctaIdx: 1 },
      { pregunta: "¿Cuál de estos NO es un número?", opciones: ["7", "12", "🐱", "5"], correctaIdx: 2 },
      { pregunta: "¿Cuál de estos NO se usa en la cocina?", opciones: ["🍳 Sartén", "🔨 Martillo", "🥄 Cuchara", "🍽️ Plato"], correctaIdx: 1 },
      { pregunta: "¿Cuál de estos NO es un medio de transporte?", opciones: ["🚗 Auto", "🚲 Bici", "🪑 Silla", "✈️ Avión"], correctaIdx: 2 },
      { pregunta: "¿Cuál de estos NO se usa para bañarse?", opciones: ["🧼 Jabón", "🧴 Champú", "🖊️ Lapicera", "🧽 Esponja"], correctaIdx: 2 },
    ] }, activo: true, version: 2 },

  { id: "que-podria-decir", titulo: "¿Qué podrías decir?", descripcion: "Situaciones donde elegís cómo responder.", beneficio: "Los juegos que involucran turnos, reglas simples o pensar en otro personaje entrenan habilidades sociales tempranas, como esperar el turno o considerar una perspectiva distinta a la propia.",
    edadMin: 6, edadMax: 8, categoria: "social", tipo: "seleccion", duracion: 5,
    contenido: { rondas: [
      { pregunta: "Un amigo está triste porque perdió su juguete favorito. ¿Qué podrías decirle?", opciones: ["\"¿Querés que lo busquemos juntos?\"", "\"No es para tanto\"", "No decirle nada", "Reírme"], correctaIdx: 0 },
      { pregunta: "Un compañero no entiende la tarea. ¿Qué podrías hacer?", opciones: ["Explicarle lo que yo entendí", "Reírme", "Seguir con lo mío nomás", "Decirle que es fácil"], correctaIdx: 0 },
      { pregunta: "Alguien nuevo llegó a tu clase y está solo. ¿Qué podrías hacer?", opciones: ["Invitarlo a jugar", "No hacer nada", "Esperar a que se acerque él solo", "Ignorarlo"], correctaIdx: 0 },
      { pregunta: "Sin querer chocaste a alguien y se le cayeron los útiles. ¿Qué podrías decir?", opciones: ["\"Perdón, ¿te ayudo a juntarlos?\"", "\"No fue nada\"", "Irme sin mirar", "Reírme"], correctaIdx: 0 },
      { pregunta: "Tu amigo quiere jugar a otra cosa. ¿Qué podrías hacer?", opciones: ["Buscar un juego que les guste a los dos", "Enojarme y no hablar", "Decir que sólo vale mi idea", "Irme"], correctaIdx: 0 },
      { pregunta: "Ganaste un juego y tu amigo perdió. ¿Qué podrías decirle?", opciones: ["\"Jugaste muy bien, revancha?\"", "\"Te gané fácil\"", "Nada, sólo festejar", "Burlarme un poco"], correctaIdx: 0 },
    ] }, activo: true, version: 3 },

  { id: "el-libro-perdido", titulo: "El libro perdido", descripcion: "Una pequeña historia donde vos decidís qué pasa.", beneficio: "Las historias ayudan a los chicos a practicar la secuencia temporal —qué pasó primero, qué después— y a ampliar el vocabulario.",
    edadMin: 6, edadMax: 8, categoria: "historias", tipo: "historia", duracion: 4,
    contenido: { inicio: "inicio", nodos: {
      inicio: { texto: "Valentina no encuentra su libro favorito. Lo tenía ayer en la mochila. ¿Qué hace primero?", opciones: [
        { texto: "Revisar toda la mochila de nuevo", siguiente: "mochila" },
        { texto: "Preguntarle a su hermano si lo vio", siguiente: "hermano" } ] },
      mochila: { texto: "Revisando bien, encuentra el libro en el fondo de la mochila, debajo de la cartuchera. ¡Estaba ahí todo el tiempo!", opciones: [] },
      hermano: { texto: "Su hermano dice que lo vio en la mesa del living. Valentina va corriendo y ahí estaba. Problema resuelto.", opciones: [] },
    } }, activo: true, version: 1 },

  { id: "vivo-o-no-vivo", titulo: "Vivo o no vivo", descripcion: "Clasificá según si es un ser vivo o no.", beneficio: "Agrupar objetos según una característica común es una de las primeras formas de razonamiento lógico, y una base importante para el pensamiento matemático posterior.",
    edadMin: 6, edadMax: 8, categoria: "clasificacion", tipo: "clasificar", duracion: 4,
    contenido: { instruccion: "¿Es un ser vivo o no?", grupoA: { nombre: "Ser vivo", emoji: "🌱" }, grupoB: { nombre: "No es ser vivo", emoji: "🪨" },
      items: [{ emoji: "🐶", grupo: "A" }, { emoji: "🪑", grupo: "B" }, { emoji: "🌳", grupo: "A" }, { emoji: "🚗", grupo: "B" }, { emoji: "🦋", grupo: "A" }, { emoji: "📱", grupo: "B" }, { emoji: "🐟", grupo: "A" }, { emoji: "🪨", grupo: "B" }] },
    activo: true, version: 1 },

  { id: "el-perro-perdido", titulo: "El perro perdido", descripcion: "Una historia donde vos decidís cómo ayudar.", beneficio: "Escuchar y recordar partes de una historia entrena la comprensión narrativa, una habilidad directamente relacionada con la comprensión lectora futura.",
    edadMin: 6, edadMax: 8, categoria: "historias", tipo: "historia", duracion: 5,
    contenido: { inicio: "inicio", nodos: {
      inicio: { texto: "Camino a la escuela, Bruno ve un perrito solo, sin dueño a la vista. Parece perdido. ¿Qué hace?", opciones: [
        { texto: "Contarle a un adulto de confianza", siguiente: "adulto" },
        { texto: "Llevárselo a upa hasta la escuela", siguiente: "upa" } ] },
      adulto: { texto: "Bruno le cuenta a la maestra, que lo ayuda a buscar carteles de \"perdido\" cerca. ¡Encuentran a la familia del perrito esa misma tarde!", opciones: [] },
      upa: { texto: "El perrito se pone nervioso y no quiere que lo carguen. Bruno entiende que mejor es pedir ayuda a un adulto, y juntos encuentran a los dueños.", opciones: [] },
    } }, activo: true, version: 1 },

  { id: "cuenta-los-lados", titulo: "Contá los lados", descripcion: "¿Cuántos lados tiene cada figura?", beneficio: "Encontrar un patrón o completar una secuencia es una forma temprana de razonamiento que más adelante se usa en matemática.",
    edadMin: 6, edadMax: 8, categoria: "logica", tipo: "seleccion", duracion: 4,
    contenido: { rondas: [
      { pregunta: "¿Cuántos lados tiene un triángulo? 🔺", opciones: ["3", "4", "5", "6"], correctaIdx: 0 },
      { pregunta: "¿Cuántos lados tiene un cuadrado? 🟦", opciones: ["4", "3", "5", "6"], correctaIdx: 0 },
      { pregunta: "¿Cuántos lados tiene un círculo? 🔵", opciones: ["0", "1", "2", "4"], correctaIdx: 0 },
      { pregunta: "¿Cuántas patas tiene una araña? 🕷️", opciones: ["8", "6", "4", "10"], correctaIdx: 0 },
      { pregunta: "¿Cuántas patas tiene un perro? 🐶", opciones: ["4", "2", "6", "3"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  // ═══════ 🚀 9–12 AÑOS ═══════
  { id: "secuencias-dificiles", titulo: "Secuencias numéricas", descripcion: "Descubrí el patrón matemático.", beneficio: "Resolver un problema simple paso a paso ejercita la planificación, otra de las funciones ejecutivas que se desarrollan durante la infancia.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "seleccion", duracion: 5,
    contenido: { rondas: [
      { pregunta: "3, 6, 9, 12, ¿qué sigue?", opciones: ["15", "13", "18", "14"], correctaIdx: 0 },
      { pregunta: "1, 4, 9, 16, ¿qué sigue? (pista: son cuadrados)", opciones: ["25", "20", "18", "21"], correctaIdx: 0 },
      { pregunta: "2, 4, 8, 16, ¿qué sigue?", opciones: ["32", "24", "20", "18"], correctaIdx: 0 },
      { pregunta: "100, 90, 80, 70, ¿qué sigue?", opciones: ["60", "65", "50", "55"], correctaIdx: 0 },
      { pregunta: "1, 1, 2, 3, 5, ¿qué sigue? (cada número es la suma de los dos anteriores)", opciones: ["8", "7", "6", "9"], correctaIdx: 0 },
      { pregunta: "5, 10, 20, 40, ¿qué sigue?", opciones: ["80", "60", "50", "45"], correctaIdx: 0 },
      { pregunta: "1, 3, 6, 10, ¿qué sigue? (pista: se suma uno más cada vez)", opciones: ["15", "13", "14", "12"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "caso-sinapsis-la-nota", titulo: "Caso Sinapsis: la nota", descripcion: "Alguien dejó una nota misteriosa en el aula. Investigá.", beneficio: "El pensamiento lógico en la primera infancia se construye con actividades concretas —ordenar, comparar, encontrar reglas— mucho antes de poder razonar de forma abstracta.",
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

  { id: "que-harias-situaciones", titulo: "¿Qué harías?", descripcion: "Situaciones de todos los días para pensar juntos.", beneficio: "Ponerse en el lugar de un personaje es una forma simple de empezar a desarrollar la empatía.",
    edadMin: 9, edadMax: 12, categoria: "social", tipo: "seleccion", duracion: 5,
    contenido: { rondas: [
      { pregunta: "Un compañero no te quiere prestar algo que necesitás. ¿Qué podrías hacer?", opciones: ["Preguntarle con calma si me lo presta más tarde", "Sacárselo igual", "Enojarme y no hablarle más", "Contárselo a todos"], correctaIdx: 0 },
      { pregunta: "Un amigo está triste y no sabés bien por qué. ¿Qué podrías decir?", opciones: ["\"¿Querés contarme qué te pasa?\"", "Nada, mejor no preguntar", "\"No estés triste, no es para tanto\"", "Ignorarlo hasta que se le pase"], correctaIdx: 0 },
      { pregunta: "Te equivocaste delante de otros y te da vergüenza. ¿Qué podrías hacer?", opciones: ["Respirar y seguir, a todos les pasa", "Irme corriendo", "Enojarme con quien se rió", "Negar que me equivoqué"], correctaIdx: 0 },
      { pregunta: "Alguien se burla de vos. ¿Qué opciones tenés?", opciones: ["Contárselo a un adulto de confianza", "Burlarme yo también de esa persona", "Guardármelo y no decir nada", "Devolverle la burla más fuerte"], correctaIdx: 0 },
      { pregunta: "Un grupo está dejando de lado a un compañero. ¿Qué podrías hacer?", opciones: ["Invitarlo a sumarse con vos", "Sumarme a dejarlo de lado también", "No decir nada para no meterme", "Reírme con el grupo"], correctaIdx: 0 },
      { pregunta: "Prometiste algo y te das cuenta que no vas a poder cumplirlo. ¿Qué podrías hacer?", opciones: ["Avisar antes de tiempo y explicar por qué", "No decir nada y desaparecer", "Inventar una excusa distinta", "Esperar a que se olviden"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "inventa-la-historia", titulo: "Inventá la historia", descripcion: "Un pulpo abre una biblioteca en Marte. ¿Qué pasa después?", beneficio: "El juego creativo sin una única respuesta correcta le da a los chicos espacio para experimentar sin miedo a equivocarse, algo valioso para el desarrollo cognitivo y emocional.",
    edadMin: 9, edadMax: 12, categoria: "creatividad", tipo: "escritura", duracion: 5,
    contenido: { pregunta: "🐙 Un pulpo abre una biblioteca en Marte. Inventá la historia.", placeholder: "Había una vez…" }, activo: true, version: 1 },

  { id: "que-pasaria-si", titulo: "¿Qué pasaría si...?", descripcion: "Una pregunta imposible para imaginar sin límites.", beneficio: "Dibujar e imaginar libremente entrena la creatividad, pero también la motricidad fina y la capacidad de planificar una idea antes de ejecutarla.",
    edadMin: 9, edadMax: 12, categoria: "creatividad", tipo: "escritura", duracion: 4,
    contenido: { pregunta: "¿Qué pasaría si los animales pudieran hablar por un día?", placeholder: "Escribí tu idea…" }, activo: true, version: 1 },

  { id: "metafora-emocional", titulo: "Si mi emoción fuera un clima", descripcion: "Describí cómo te sentís usando el clima como metáfora.", beneficio: "Reconocer emociones en otros es una habilidad social temprana que sienta las bases de la empatía.",
    edadMin: 9, edadMax: 12, categoria: "emociones", tipo: "escritura", duracion: 3,
    contenido: { pregunta: "Si tu estado de ánimo de hoy fuera un clima, ¿cuál sería y por qué?", placeholder: "Hoy soy como un día…" }, activo: true, version: 1 },

  { id: "cual-no-pertenece", titulo: "¿Cuál no pertenece?", descripcion: "Encontrá el elemento que no va con el grupo.", beneficio: "Encontrar un patrón o completar una secuencia es una forma temprana de razonamiento que más adelante se usa en matemática.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "seleccion", duracion: 5,
    contenido: { rondas: [
      { pregunta: "¿Cuál de estas palabras no pertenece al grupo?", opciones: ["Manzana", "Banana", "Pera", "Silla"], correctaIdx: 3 },
      { pregunta: "¿Cuál de estas palabras no pertenece al grupo?", opciones: ["Perro", "Gato", "Auto", "Loro"], correctaIdx: 2 },
      { pregunta: "¿Cuál de estas palabras no pertenece al grupo?", opciones: ["Lunes", "Martes", "Enero", "Jueves"], correctaIdx: 2 },
      { pregunta: "¿Cuál de estas palabras no pertenece al grupo?", opciones: ["Feliz", "Triste", "Alto", "Enojado"], correctaIdx: 2 },
      { pregunta: "¿Cuál de estas palabras no pertenece al grupo?", opciones: ["Rojo", "Azul", "Grande", "Verde"], correctaIdx: 2 },
      { pregunta: "¿Cuál de estas palabras no pertenece al grupo?", opciones: ["Cuchara", "Tenedor", "Cuchillo", "Zapato"], correctaIdx: 3 },
      { pregunta: "¿Cuál de estas palabras no pertenece al grupo?", opciones: ["Fútbol", "Básquet", "Tenis", "Guitarra"], correctaIdx: 3 },
    ] }, activo: true, version: 2 },

  { id: "pistas-del-detective", titulo: "Pistas del detective", descripcion: "Usá las pistas para descubrir quién fue.", beneficio: "Resolver un problema simple paso a paso ejercita la planificación, otra de las funciones ejecutivas que se desarrollan durante la infancia.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "historia", duracion: 4,
    contenido: { inicio: "inicio", nodos: {
      inicio: { texto: "Alguien comió la última porción de torta sin avisar. Hay tres sospechosos: Fede, que estaba en su cuarto; Cata, que estaba en la cocina; y Bruno, que llegó recién. ¿A quién investigás primero?", opciones: [
        { texto: "A Cata, porque estaba en la cocina", siguiente: "cata" },
        { texto: "A Fede, en su cuarto", siguiente: "fede" } ] },
      cata: { texto: "Cata dice que sólo fue a buscar agua. Pero hay migas de torta cerca de su silla... ¡Caso resuelto! Fue Cata.", opciones: [] },
      fede: { texto: "Fede no tiene nada que ver, estuvo todo el tiempo en su cuarto. Mejor revisá la cocina, ahí puede estar la pista.", opciones: [
        { texto: "Ir a la cocina", siguiente: "cata" } ] },
    } }, activo: true, version: 1 },

  { id: "pausa-antes-de-responder", titulo: "Pausa antes de responder", descripcion: "Un momento para respirar antes de reaccionar.", beneficio: "Aprender a calmarse con una técnica simple, repetida varias veces, suele ser más efectivo en la infancia que las explicaciones abstractas sobre las emociones.",
    edadMin: 9, edadMax: 12, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: { texto: "Antes de responder algo que te molestó, probemos esto.", ciclos: 4, fases: [{ nombre: "Inhalá contando hasta 4", segundos: 4 }, { nombre: "Soltá contando hasta 4", segundos: 4 }] },
    activo: true, version: 1 },

  { id: "dibuja-tu-mundo", titulo: "Dibujá tu mundo ideal", descripcion: "¿Cómo sería un lugar inventado por vos?", beneficio: "El juego creativo sin una única respuesta correcta le da a los chicos espacio para experimentar sin miedo a equivocarse, algo valioso para el desarrollo cognitivo y emocional.",
    edadMin: 9, edadMax: 12, categoria: "creatividad", tipo: "dibujo", duracion: 5,
    contenido: { texto: "Dibujá un lugar inventado por vos: ¿cómo es, quién vive ahí?" }, activo: true, version: 1 },

  { id: "secuencias-de-letras", titulo: "Secuencias de letras", descripcion: "Descubrí el patrón entre las letras.", beneficio: "El pensamiento lógico en la primera infancia se construye con actividades concretas —ordenar, comparar, encontrar reglas— mucho antes de poder razonar de forma abstracta.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "seleccion", duracion: 5,
    contenido: { rondas: [
      { pregunta: "A, C, E, G, ¿qué sigue? (se saltea una letra)", opciones: ["I", "H", "F", "J"], correctaIdx: 0 },
      { pregunta: "Z, Y, X, W, ¿qué sigue?", opciones: ["V", "U", "T", "Y"], correctaIdx: 0 },
      { pregunta: "B, D, F, H, ¿qué sigue?", opciones: ["J", "I", "G", "K"], correctaIdx: 0 },
      { pregunta: "C, F, I, L, ¿qué sigue? (avanza de tres en tres)", opciones: ["O", "M", "P", "N"], correctaIdx: 0 },
      { pregunta: "A, D, G, J, ¿qué sigue?", opciones: ["M", "K", "L", "N"], correctaIdx: 0 },
      { pregunta: "Y, W, U, S, ¿qué sigue? (va hacia atrás, saltando una)", opciones: ["Q", "R", "T", "P"], correctaIdx: 0 },
      { pregunta: "A, B, D, G, ¿qué sigue? (el salto crece de a uno)", opciones: ["K", "J", "H", "L"], correctaIdx: 0 },
    ] }, activo: true, version: 3 },

  { id: "mas-pistas-el-cuaderno", titulo: "El cuaderno desaparecido", descripcion: "Otro caso para resolver con pistas.", beneficio: "Encontrar un patrón o completar una secuencia es una forma temprana de razonamiento que más adelante se usa en matemática.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "historia", duracion: 4,
    contenido: { inicio: "inicio", nodos: {
      inicio: { texto: "El cuaderno de la maestra desapareció del escritorio durante el recreo. Tres compañeros se quedaron adentro: Juli, que dice que estaba dibujando; Mateo, que dice que estaba leyendo; y Ana, que dice que fue al baño. ¿A quién investigás primero?", opciones: [
        { texto: "A Juli, revisando qué estaba dibujando", siguiente: "juli" },
        { texto: "A Ana, preguntando cuánto tiempo estuvo afuera", siguiente: "ana" } ] },
      juli: { texto: "Juli muestra su dibujo — es de la clase de hoy, así que estuvo todo el tiempo ahí sentada, a la vista de todos. No parece ella.", opciones: [
        { texto: "Investigar a Ana", siguiente: "ana" } ] },
      ana: { texto: "Ana tardó bastante en volver del baño... y el cuaderno aparece en su mochila, se lo había llevado sin querer pensando que era el de ella. ¡Caso resuelto!", opciones: [] },
    } }, activo: true, version: 1 },

  { id: "relaciones-logicas", titulo: "¿Cuál va con cuál?", descripcion: "Encontrá la relación entre las palabras.", beneficio: "Resolver un problema simple paso a paso ejercita la planificación, otra de las funciones ejecutivas que se desarrollan durante la infancia.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "seleccion", duracion: 5,
    contenido: { rondas: [
      { pregunta: "Pájaro es a nido, como abeja es a…", opciones: ["Colmena", "Auto", "Silla", "Cueva"], correctaIdx: 0 },
      { pregunta: "Médico es a hospital, como maestro es a…", opciones: ["Escuela", "Cocina", "Playa", "Auto"], correctaIdx: 0 },
      { pregunta: "Frío es a caliente, como día es a…", opciones: ["Noche", "Semana", "Reloj", "Mes"], correctaIdx: 0 },
      { pregunta: "Libro es a leer, como pelota es a…", opciones: ["Jugar", "Comer", "Dormir", "Escribir"], correctaIdx: 0 },
      { pregunta: "Ojo es a ver, como oído es a…", opciones: ["Escuchar", "Oler", "Tocar", "Saltar"], correctaIdx: 0 },
      { pregunta: "Semilla es a árbol, como huevo es a…", opciones: ["Pollito", "Piedra", "Nube", "Auto"], correctaIdx: 0 },
      { pregunta: "Río es a agua, como desierto es a…", opciones: ["Arena", "Nieve", "Hielo", "Pasto"], correctaIdx: 0 },
    ] }, activo: true, version: 2 },

  { id: "inventa-un-personaje", titulo: "Inventá un personaje", descripcion: "Creá a alguien completamente nuevo.", beneficio: "Dibujar e imaginar libremente entrena la creatividad, pero también la motricidad fina y la capacidad de planificar una idea antes de ejecutarla.",
    edadMin: 9, edadMax: 12, categoria: "creatividad", tipo: "escritura", duracion: 5,
    contenido: { pregunta: "Inventá un personaje: ¿cómo se llama, qué poder o habilidad especial tiene, qué le gusta hacer?", placeholder: "Se llama…" },
    activo: true, version: 1 },

  { id: "memoria-simbolos-antiguos", titulo: "Memoria de símbolos", descripcion: "Encontrá las parejas de símbolos misteriosos.", beneficio: "Los juegos de memoria en la primera infancia entrenan la memoria de trabajo de una forma simple y visual, adaptada a cómo piensan los chicos a esta edad.",
    edadMin: 9, edadMax: 12, categoria: "memoria", tipo: "memoria", duracion: 5,
    contenido: { pares: ["🔮", "🗝️", "📜", "🕰️", "🧭", "💎", "🪬", "🏺"] }, activo: true, version: 1 },

  { id: "detective-de-detalles", titulo: "Detective de detalles", descripcion: "Encontrá qué detalle no encaja en cada situación.", beneficio: "La capacidad de sostener la atención en una tarea se desarrolla gradualmente durante la infancia; actividades breves y con un final claro son una forma efectiva de ejercitarla sin generar frustración.",
    edadMin: 9, edadMax: 12, categoria: "atencion", tipo: "seleccion", duracion: 5,
    contenido: { rondas: [
      { pregunta: "En una lista de útiles escolares aparece: lápiz, goma, regla, banana. ¿Qué no encaja?", opciones: ["Banana", "Lápiz", "Goma", "Regla"], correctaIdx: 0 },
      { pregunta: "Alguien dice que salió de noche porque \"había mucho sol\". ¿Qué no tiene sentido?", opciones: ["El sol de noche", "Que haya salido", "Que sea de noche", "Nada, está bien"], correctaIdx: 0 },
      { pregunta: "En una receta de ensalada fría aparece: lechuga, tomate, hielo, sartén caliente. ¿Qué no encaja?", opciones: ["Sartén caliente", "Lechuga", "Tomate", "Hielo"], correctaIdx: 0 },
      { pregunta: "Un cuento dice: \"El pez caminaba tranquilo por el bosque\". ¿Qué detalle está raro?", opciones: ["Que un pez camine", "Que sea un bosque", "Que esté tranquilo", "Nada"], correctaIdx: 0 },
      { pregunta: "En una lista de útiles de invierno aparece: campera, guantes, bufanda, ojotas. ¿Qué no encaja?", opciones: ["Ojotas", "Campera", "Guantes", "Bufanda"], correctaIdx: 0 },
    ] }, activo: true, version: 1 },

  { id: "clasificar-solido-liquido-gas", titulo: "Sólido, líquido o vapor", descripcion: "Clasificá según el estado en que se encuentra.", beneficio: "El pensamiento lógico en la primera infancia se construye con actividades concretas —ordenar, comparar, encontrar reglas— mucho antes de poder razonar de forma abstracta.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "clasificar", duracion: 4,
    contenido: { instruccion: "¿Es algo sólido o se puede tomar como líquido?", grupoA: { nombre: "Sólido", emoji: "🧊" }, grupoB: { nombre: "Líquido", emoji: "💧" },
      items: [{ emoji: "🪨", grupo: "A" }, { emoji: "🥛", grupo: "B" }, { emoji: "🧱", grupo: "A" }, { emoji: "🧃", grupo: "B" }, { emoji: "🌳", grupo: "A" }, { emoji: "☕", grupo: "B" }, { emoji: "📚", grupo: "A" }, { emoji: "🥤", grupo: "B" }] },
    activo: true, version: 1 },

  { id: "el-experimento-que-fallo", titulo: "El experimento que falló", descripcion: "Una historia de ciencia donde vos decidís cómo seguir investigando.", beneficio: "Encontrar un patrón o completar una secuencia es una forma temprana de razonamiento que más adelante se usa en matemática.",
    edadMin: 9, edadMax: 12, categoria: "logica", tipo: "historia", duracion: 5,
    contenido: { inicio: "inicio", nodos: {
      inicio: { texto: "Para la feria de ciencias, tu plantita no creció como esperabas. Tenías dos macetas iguales, pero una las regaste con agua y otra con agua con sal, para comparar. ¿Qué hacés primero para entender qué pasó?", opciones: [
        { texto: "Revisar si ambas recibieron la misma luz", siguiente: "luz" },
        { texto: "Medir cuánta agua le pusiste a cada una", siguiente: "agua" } ] },
      luz: { texto: "Descubrís que una maceta estaba más cerca de la ventana. Eso también pudo influir — un buen experimento necesita cambiar sólo una cosa a la vez.", opciones: [
        { texto: "Armar el experimento de nuevo, mejor", siguiente: "final" } ] },
      agua: { texto: "Las dos recibieron la misma cantidad de agua. El agua con sal parece haber sido la causa de que esa plantita no creciera tanto — ¡tu hipótesis tenía razón!", opciones: [
        { texto: "Armar el experimento de nuevo, mejor", siguiente: "final" } ] },
      final: { texto: "Repetís el experimento controlando mejor las variables. Esta vez, los resultados son mucho más claros. Así funciona la ciencia: probar, revisar, y volver a probar.", opciones: [] },
    } }, activo: true, version: 1 },

  { id: "escribi-el-final", titulo: "Escribí el final", descripcion: "Una historia a medio terminar, esperando tu final.", beneficio: "El juego creativo sin una única respuesta correcta le da a los chicos espacio para experimentar sin miedo a equivocarse, algo valioso para el desarrollo cognitivo y emocional.",
    edadMin: 9, edadMax: 12, categoria: "creatividad", tipo: "escritura", duracion: 5,
    contenido: { pregunta: "La última persona del planeta encontró una carta escrita hace cien años que decía: \"Si estás leyendo esto, todavía hay esperanza\". Escribí cómo sigue la historia.", placeholder: "La carta seguía diciendo…" },
    activo: true, version: 1 },

  // ═══════ 🐣 3-5 AÑOS (parte 2) ═══════
  { id: "donde-duerme-el-animal", titulo: "¿Dónde duerme?", descripcion: "Adiviná dónde duerme cada animal.",
    beneficio: "Reconocer y nombrar cosas de su entorno ayuda a los chicos a ampliar el vocabulario y a practicar la categorización, una de las primeras formas de pensamiento lógico.",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "El oso duerme en una cueva durante el invierno. ¿Dónde duerme?", "opciones": ["🕳️ Cueva", "🌊 Agua", "☁️ Nube"], "correctaIdx": 0}, {"pregunta": "El pájaro duerme en su nido, arriba del árbol. ¿Dónde duerme?", "opciones": ["🪺 Nido", "🕳️ Cueva", "🏠 Casa"], "correctaIdx": 0}, {"pregunta": "El pez duerme flotando en el agua. ¿Dónde duerme?", "opciones": ["🌊 Agua", "🌳 Árbol", "🏔️ Montaña"], "correctaIdx": 0}, {"pregunta": "El murciélago duerme colgado, boca abajo. ¿Dónde duerme?", "opciones": ["🦇 Colgado", "🛏️ Cama", "🌊 Agua"], "correctaIdx": 0}, {"pregunta": "La vaca duerme en el establo o en el campo. ¿Dónde duerme?", "opciones": ["🌾 Campo", "🌊 Mar", "☁️ Cielo"], "correctaIdx": 0}, {"pregunta": "El perro duerme en su cucha o en la casa. ¿Dónde duerme?", "opciones": ["🏠 Casa", "🌊 Agua", "🕳️ Cueva"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "que-come-el-animal", titulo: "¿Qué come?", descripcion: "Adiviná qué come cada animal.",
    beneficio: "Reconocer y nombrar cosas de su entorno ayuda a los chicos a ampliar el vocabulario y a practicar la categorización, una de las primeras formas de pensamiento lógico.",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "El conejo come zanahorias y lechuga. ¿Qué come?", "opciones": ["🥕 Zanahoria", "🍖 Carne", "🐟 Pescado"], "correctaIdx": 0}, {"pregunta": "El león come carne de otros animales. ¿Qué come?", "opciones": ["🍖 Carne", "🌿 Pasto", "🍯 Miel"], "correctaIdx": 0}, {"pregunta": "La vaca come pasto en el campo. ¿Qué come?", "opciones": ["🌿 Pasto", "🍖 Carne", "🐟 Pescado"], "correctaIdx": 0}, {"pregunta": "El oso hormiguero come hormigas. ¿Qué come?", "opciones": ["🐜 Hormigas", "🍎 Manzanas", "🧀 Queso"], "correctaIdx": 0}, {"pregunta": "La abeja come el néctar de las flores. ¿Qué come?", "opciones": ["🌸 Néctar", "🍖 Carne", "🐟 Pescado"], "correctaIdx": 0}, {"pregunta": "El oso come miel y peces. ¿Qué come?", "opciones": ["🍯 Miel", "🌵 Cactus", "🪨 Piedras"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "animales-granja-o-selva", titulo: "¿Granja o selva?", descripcion: "Clasificá cada animal según dónde vive.",
    beneficio: "Reconocer y nombrar cosas de su entorno ayuda a los chicos a ampliar el vocabulario y a practicar la categorización, una de las primeras formas de pensamiento lógico.",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "clasificar", duracion: 4,
    contenido: {"instruccion": "¿Vive en la granja o en la selva?", "grupoA": {"nombre": "Granja", "emoji": "🚜"}, "grupoB": {"nombre": "Selva", "emoji": "🌴"}, "items": [{"emoji": "🐄", "grupo": "A"}, {"emoji": "🦁", "grupo": "B"}, {"emoji": "🐔", "grupo": "A"}, {"emoji": "🐒", "grupo": "B"}, {"emoji": "🐖", "grupo": "A"}, {"emoji": "🐆", "grupo": "B"}, {"emoji": "🐑", "grupo": "A"}, {"emoji": "🦜", "grupo": "B"}, {"emoji": "🐎", "grupo": "A"}, {"emoji": "🐍", "grupo": "B"}]},
    activo: true, version: 1 },

  { id: "sonidos-de-la-casa", titulo: "Sonidos de casa", descripcion: "Adiviná qué hace ese sonido en tu casa.",
    beneficio: "Distinguir sonidos y ponerles nombre entrena la discriminación auditiva, una habilidad de base para el desarrollo del lenguaje y, más adelante, para el aprendizaje de la lectura.",
    edadMin: 3, edadMax: 5, categoria: "sonidos", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "\"¡Riiiing!\" El teléfono suena así. ¿Qué es?", "opciones": ["📞 Teléfono", "🚿 Ducha", "🪟 Ventana"], "correctaIdx": 0}, {"pregunta": "\"¡Tic tac, tic tac!\" ¿Qué hace ese sonido?", "opciones": ["⏰ Reloj", "🍽️ Plato", "🛏️ Cama"], "correctaIdx": 0}, {"pregunta": "\"¡Pop!\" salta el pan cuando está listo. ¿Qué es?", "opciones": ["🍞 Tostadora", "🚪 Puerta", "📺 Televisor"], "correctaIdx": 0}, {"pregunta": "\"¡Splash!\" cuando cae el agua. ¿Qué es?", "opciones": ["🚿 Ducha", "📻 Radio", "🔔 Timbre"], "correctaIdx": 0}, {"pregunta": "\"¡Ding dong!\" alguien está en la puerta. ¿Qué es?", "opciones": ["🔔 Timbre", "🥄 Cuchara", "👟 Zapato"], "correctaIdx": 0}, {"pregunta": "\"¡Vrrrum!\" limpia la alfombra. ¿Qué es?", "opciones": ["🧹 Aspiradora", "🎵 Música", "🐶 Perro"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "memoria-instrumentos-chicos", titulo: "Memoria de instrumentos", descripcion: "Encontrá las parejas de instrumentos.",
    beneficio: "Distinguir sonidos y ponerles nombre entrena la discriminación auditiva, una habilidad de base para el desarrollo del lenguaje y, más adelante, para el aprendizaje de la lectura.",
    edadMin: 3, edadMax: 5, categoria: "sonidos", tipo: "memoria", duracion: 4,
    contenido: {"pares": ["🥁", "🎺", "🎸", "🔔", "🎻"]},
    activo: true, version: 1 },

  { id: "de-que-color-es", titulo: "¿De qué color es?", descripcion: "Elegí el color correcto de cada cosa.",
    beneficio: "Reconocer formas, colores y cantidades es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "¿De qué color es el sol? ☀️", "opciones": ["🟡 Amarillo", "🔵 Azul", "🟣 Violeta"], "correctaIdx": 0}, {"pregunta": "¿De qué color es el pasto? 🌱", "opciones": ["🟢 Verde", "🔴 Rojo", "⚪ Blanco"], "correctaIdx": 0}, {"pregunta": "¿De qué color es el cielo de día? ☁️", "opciones": ["🔵 Azul", "🟤 Marrón", "🟢 Verde"], "correctaIdx": 0}, {"pregunta": "¿De qué color es una fresa madura? 🍓", "opciones": ["🔴 Rojo", "🟡 Amarillo", "⚫ Negro"], "correctaIdx": 0}, {"pregunta": "¿De qué color es una naranja? 🍊", "opciones": ["🟠 Naranja", "🔵 Azul", "⚪ Blanco"], "correctaIdx": 0}, {"pregunta": "¿De qué color es la nieve? ❄️", "opciones": ["⚪ Blanco", "🟢 Verde", "🔴 Rojo"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "cuenta-las-formas", titulo: "Contá las formas", descripcion: "Contá cuántas formas hay de cada tipo.",
    beneficio: "Reconocer formas, colores y cantidades es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "🔵🔵🔵 ¿Cuántos círculos hay?", "opciones": ["3", "2", "5"], "correctaIdx": 0}, {"pregunta": "🟦🟦 ¿Cuántos cuadrados hay?", "opciones": ["2", "4", "1"], "correctaIdx": 0}, {"pregunta": "🔺🔺🔺🔺 ¿Cuántos triángulos hay?", "opciones": ["4", "3", "6"], "correctaIdx": 0}, {"pregunta": "⭐⭐ ¿Cuántas estrellas hay?", "opciones": ["2", "5", "3"], "correctaIdx": 0}, {"pregunta": "🟢🟢🟢🟢🟢 ¿Cuántos círculos verdes hay?", "opciones": ["5", "4", "2"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "clasificar-por-color", titulo: "Clasificar por color", descripcion: "Separá las cosas por su color.",
    beneficio: "Reconocer formas, colores y cantidades es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "clasificar", duracion: 4,
    contenido: {"instruccion": "¿Es rojo o azul?", "grupoA": {"nombre": "Rojo", "emoji": "🔴"}, "grupoB": {"nombre": "Azul", "emoji": "🔵"}, "items": [{"emoji": "🍓", "grupo": "A"}, {"emoji": "🫐", "grupo": "B"}, {"emoji": "🍎", "grupo": "A"}, {"emoji": "🦋", "grupo": "B"}, {"emoji": "🌹", "grupo": "A"}, {"emoji": "💧", "grupo": "B"}, {"emoji": "🚗", "grupo": "A"}, {"emoji": "🐳", "grupo": "B"}, {"emoji": "❤️", "grupo": "A"}, {"emoji": "🔵", "grupo": "B"}]},
    activo: true, version: 1 },

  { id: "clasificar-frutas-verduras", titulo: "Frutas o verduras", descripcion: "Separá cada alimento en el grupo correcto.",
    beneficio: "Reconocer y nombrar cosas de su entorno ayuda a los chicos a ampliar el vocabulario y a practicar la categorización, una de las primeras formas de pensamiento lógico.",
    edadMin: 3, edadMax: 5, categoria: "clasificacion", tipo: "clasificar", duracion: 4,
    contenido: {"instruccion": "¿Es una fruta o una verdura?", "grupoA": {"nombre": "Fruta", "emoji": "🍎"}, "grupoB": {"nombre": "Verdura", "emoji": "🥕"}, "items": [{"emoji": "🍎", "grupo": "A"}, {"emoji": "🥕", "grupo": "B"}, {"emoji": "🍌", "grupo": "A"}, {"emoji": "🥦", "grupo": "B"}, {"emoji": "🍇", "grupo": "A"}, {"emoji": "🥬", "grupo": "B"}, {"emoji": "🍉", "grupo": "A"}, {"emoji": "🧅", "grupo": "B"}, {"emoji": "🍊", "grupo": "A"}, {"emoji": "🌽", "grupo": "B"}]},
    activo: true, version: 1 },

  { id: "adentro-o-afuera", titulo: "¿Adentro o afuera?", descripcion: "Clasificá dónde suele estar cada cosa.",
    beneficio: "Reconocer y nombrar cosas de su entorno ayuda a los chicos a ampliar el vocabulario y a practicar la categorización, una de las primeras formas de pensamiento lógico.",
    edadMin: 3, edadMax: 5, categoria: "clasificacion", tipo: "clasificar", duracion: 4,
    contenido: {"instruccion": "¿Se usa adentro de casa o afuera?", "grupoA": {"nombre": "Adentro", "emoji": "🏠"}, "grupoB": {"nombre": "Afuera", "emoji": "🌳"}, "items": [{"emoji": "🛋️", "grupo": "A"}, {"emoji": "⚽", "grupo": "B"}, {"emoji": "🛏️", "grupo": "A"}, {"emoji": "🚲", "grupo": "B"}, {"emoji": "🍽️", "grupo": "A"}, {"emoji": "🌳", "grupo": "B"}, {"emoji": "📺", "grupo": "A"}, {"emoji": "☀️", "grupo": "B"}, {"emoji": "🚿", "grupo": "A"}, {"emoji": "🏊", "grupo": "B"}]},
    activo: true, version: 1 },

  { id: "como-se-siente-el-personaje", titulo: "¿Cómo se siente?", descripcion: "Mirá la situación y adiviná la emoción.",
    beneficio: "Ponerle nombre a las emociones desde chicos —lo que en desarrollo infantil se llama 'alfabetización emocional'— está asociado con mejor regulación emocional más adelante en la vida.",
    edadMin: 3, edadMax: 5, categoria: "emociones", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "A Lucas se le rompió su juguete favorito. ¿Cómo se siente?", "opciones": ["😢 Triste", "😄 Feliz", "😴 Cansado"], "correctaIdx": 0}, {"pregunta": "Mica recibió un regalo que le encantó. ¿Cómo se siente?", "opciones": ["😄 Feliz", "😡 Enojada", "😨 Asustada"], "correctaIdx": 0}, {"pregunta": "Tomi vio una araña grande de repente. ¿Cómo se siente?", "opciones": ["😨 Asustado", "😄 Feliz", "😌 Tranquilo"], "correctaIdx": 0}, {"pregunta": "Sofi jugó todo el día y ya es de noche. ¿Cómo se siente?", "opciones": ["😴 Cansada", "😡 Enojada", "😲 Sorprendida"], "correctaIdx": 0}, {"pregunta": "A Juan le sacaron su juguete sin pedirlo. ¿Cómo se siente?", "opciones": ["😡 Enojado", "😄 Feliz", "😴 Cansado"], "correctaIdx": 0}, {"pregunta": "Ana abrió la puerta y había una fiesta sorpresa. ¿Cómo se siente?", "opciones": ["😲 Sorprendida", "😢 Triste", "😴 Cansada"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "dibuja-algo-que-te-hace-feliz", titulo: "Dibujá algo feliz", descripcion: "Dibujá algo que te hace feliz.",
    beneficio: "Ponerle nombre a las emociones desde chicos —lo que en desarrollo infantil se llama 'alfabetización emocional'— está asociado con mejor regulación emocional más adelante en la vida.",
    edadMin: 3, edadMax: 5, categoria: "emociones", tipo: "dibujo", duracion: 4,
    contenido: {"texto": "Dibujá algo que te hace muy, muy feliz 😄"},
    activo: true, version: 1 },

  { id: "dibuja-tu-familia", titulo: "Dibujá tu familia", descripcion: "Dibujá a las personas de tu familia.",
    beneficio: "Ponerle nombre a las emociones desde chicos —lo que en desarrollo infantil se llama 'alfabetización emocional'— está asociado con mejor regulación emocional más adelante en la vida.",
    edadMin: 3, edadMax: 5, categoria: "emociones", tipo: "dibujo", duracion: 4,
    contenido: {"texto": "Dibujá a tu familia, como vos quieras 👨‍👩‍👧‍👦"},
    activo: true, version: 1 },

  { id: "encontra-el-diferente", titulo: "Encontrá el diferente", descripcion: "Encontrá cuál no es igual a los demás.",
    beneficio: "Reconocer formas, colores y cantidades es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "atencion", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "🐶🐶🐱🐶 ¿Cuál es diferente?", "opciones": ["🐱", "🐶 (primero)", "🐶 (segundo)"], "correctaIdx": 0}, {"pregunta": "🟦🟦🟦🟥 ¿Cuál es diferente?", "opciones": ["🟥", "🟦 (primero)", "🟦 (segundo)"], "correctaIdx": 0}, {"pregunta": "🍎🍎🍌🍎 ¿Cuál es diferente?", "opciones": ["🍌", "🍎 (primera)", "🍎 (segunda)"], "correctaIdx": 0}, {"pregunta": "⭐⭐⭐🌙 ¿Cuál es diferente?", "opciones": ["🌙", "⭐ (primera)", "⭐ (segunda)"], "correctaIdx": 0}, {"pregunta": "🐸🐸🐸🐢 ¿Cuál es diferente?", "opciones": ["🐢", "🐸 (primera)", "🐸 (segunda)"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "cuenta-por-color", titulo: "Contá por color", descripcion: "Contá cuántos hay de cada color.",
    beneficio: "Reconocer formas, colores y cantidades es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "atencion", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "🔴🔴🟡🔴🟡 ¿Cuántos rojos hay?", "opciones": ["3", "2", "4"], "correctaIdx": 0}, {"pregunta": "🟢🟢🟢🔵🔵 ¿Cuántos verdes hay?", "opciones": ["3", "2", "5"], "correctaIdx": 0}, {"pregunta": "🟡🟡🟡🟡🔴 ¿Cuántos amarillos hay?", "opciones": ["4", "3", "1"], "correctaIdx": 0}, {"pregunta": "🔵🔴🔵🔴🔵 ¿Cuántos azules hay?", "opciones": ["3", "2", "4"], "correctaIdx": 0}, {"pregunta": "🟣🟣🟠🟠🟠 ¿Cuántos naranjas hay?", "opciones": ["3", "2", "5"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "memoria-frutas", titulo: "Memoria de frutas", descripcion: "Encontrá las parejas de frutas.",
    beneficio: "Los juegos de memoria en la primera infancia entrenan la memoria de trabajo de una forma simple y visual, adaptada a cómo piensan los chicos a esta edad.",
    edadMin: 3, edadMax: 5, categoria: "memoria", tipo: "memoria", duracion: 4,
    contenido: {"pares": ["🍎", "🍌", "🍇", "🍓", "🍊"]},
    activo: true, version: 1 },

  { id: "memoria-formas-chicas", titulo: "Memoria de formas", descripcion: "Encontrá las parejas de formas.",
    beneficio: "Los juegos de memoria en la primera infancia entrenan la memoria de trabajo de una forma simple y visual, adaptada a cómo piensan los chicos a esta edad.",
    edadMin: 3, edadMax: 5, categoria: "memoria", tipo: "memoria", duracion: 4,
    contenido: {"pares": ["🔵", "🟦", "🔺", "⭐", "🟣", "🟢"]},
    activo: true, version: 1 },

  { id: "memoria-vehiculos", titulo: "Memoria de vehículos", descripcion: "Encontrá las parejas de vehículos.",
    beneficio: "Los juegos de memoria en la primera infancia entrenan la memoria de trabajo de una forma simple y visual, adaptada a cómo piensan los chicos a esta edad.",
    edadMin: 3, edadMax: 5, categoria: "memoria", tipo: "memoria", duracion: 4,
    contenido: {"pares": ["🚗", "🚲", "🚂", "✈️", "🚢"]},
    activo: true, version: 1 },

  { id: "que-decimos-cuando", titulo: "¿Qué decimos?", descripcion: "Elegí qué decimos en cada momento.",
    beneficio: "Practicar situaciones sociales simples, como compartir o pedir ayuda, les da a los chicos un guión mental que después pueden usar en la vida real.",
    edadMin: 3, edadMax: 5, categoria: "social", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "Alguien te da un regalo. ¿Qué le decís?", "opciones": ["🙏 Gracias", "👋 Chau", "❌ No"], "correctaIdx": 0}, {"pregunta": "Pisaste sin querer a un amigo. ¿Qué le decís?", "opciones": ["😔 Perdón", "😄 Hola", "🎉 Feliz cumpleaños"], "correctaIdx": 0}, {"pregunta": "Llegás a la casa de un amigo. ¿Qué le decís?", "opciones": ["👋 Hola", "😔 Perdón", "👋 Chau"], "correctaIdx": 0}, {"pregunta": "Te vas de un lugar. ¿Qué decís?", "opciones": ["👋 Chau", "🙏 Gracias", "👋 Hola"], "correctaIdx": 0}, {"pregunta": "Querés algo que tiene otra persona. ¿Qué le decís?", "opciones": ["🙏 ¿Me lo prestás?", "❌ ¡Dámelo!", "😡 Es mío"], "correctaIdx": 0}, {"pregunta": "Un amigo te ayudó con algo. ¿Qué le decís?", "opciones": ["🙏 Gracias", "😡 No quería", "👋 Chau"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "compartir-o-no", titulo: "¿Compartimos?", descripcion: "Elegí la mejor forma de compartir.",
    beneficio: "Practicar situaciones sociales simples, como compartir o pedir ayuda, les da a los chicos un guión mental que después pueden usar en la vida real.",
    edadMin: 3, edadMax: 5, categoria: "social", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "Tenés dos caramelos y tu amigo no tiene ninguno. ¿Qué hacés?", "opciones": ["🍬 Le doy uno", "🍬 Me como los dos", "😡 Lo escondo"], "correctaIdx": 0}, {"pregunta": "Tu amigo quiere jugar con tu juguete. ¿Qué hacés?", "opciones": ["🎲 Jugamos juntos", "❌ No lo dejo", "🏃 Me voy corriendo"], "correctaIdx": 0}, {"pregunta": "Hay una sola hamaca y dos quieren usarla. ¿Qué se puede hacer?", "opciones": ["🔄 Turnarse", "😡 Pelear", "🏃 Irse enojado"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "respiracion-del-sol", titulo: "La respiración del sol", descripcion: "Abrí los brazos como el sol que sale.",
    beneficio: "Ponerle nombre a las emociones desde chicos —lo que en desarrollo infantil se llama 'alfabetización emocional'— está asociado con mejor regulación emocional más adelante en la vida.",
    edadMin: 3, edadMax: 5, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: {"texto": "Imaginá que sos el sol saliendo despacito ☀️", "ciclos": 3, "fases": [{"nombre": "Salí como el sol", "segundos": 4}, {"nombre": "Escondete despacito", "segundos": 4}]},
    activo: true, version: 1 },

  { id: "respiracion-de-la-flor", titulo: "La respiración de la flor", descripcion: "Olé una flor imaginaria y soplá.",
    beneficio: "Ponerle nombre a las emociones desde chicos —lo que en desarrollo infantil se llama 'alfabetización emocional'— está asociado con mejor regulación emocional más adelante en la vida.",
    edadMin: 3, edadMax: 5, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: {"texto": "Imaginá que olés una flor hermosa 🌸", "ciclos": 3, "fases": [{"nombre": "Olé la flor", "segundos": 4}, {"nombre": "Soplá despacito", "segundos": 4}]},
    activo: true, version: 1 },

  { id: "respiracion-del-oso", titulo: "La respiración del oso", descripcion: "Respirá grande y lento como un oso dormido.",
    beneficio: "Ponerle nombre a las emociones desde chicos —lo que en desarrollo infantil se llama 'alfabetización emocional'— está asociado con mejor regulación emocional más adelante en la vida.",
    edadMin: 3, edadMax: 5, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: {"texto": "Imaginá que sos un oso grande que respira despacito 🐻", "ciclos": 3, "fases": [{"nombre": "Inhalá grande", "segundos": 5}, {"nombre": "Exhalá despacito", "segundos": 5}]},
    activo: true, version: 1 },

  { id: "cuantas-patas-tiene", titulo: "¿Cuántas patas tiene?", descripcion: "Adiviná cuántas patas tiene cada animal.",
    beneficio: "Reconocer y nombrar cosas de su entorno ayuda a los chicos a ampliar el vocabulario y a practicar la categorización, una de las primeras formas de pensamiento lógico.",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "¿Cuántas patas tiene un perro?", "opciones": ["4", "2", "6"], "correctaIdx": 0}, {"pregunta": "¿Cuántas patas tiene un pájaro?", "opciones": ["2", "4", "8"], "correctaIdx": 0}, {"pregunta": "¿Cuántas patas tiene una araña?", "opciones": ["8", "4", "6"], "correctaIdx": 0}, {"pregunta": "¿Cuántas patas tiene una vaca?", "opciones": ["4", "2", "6"], "correctaIdx": 0}, {"pregunta": "¿Cuántas patas tiene una serpiente?", "opciones": ["0", "4", "2"], "correctaIdx": 0}, {"pregunta": "¿Cuántas patas tiene una hormiga?", "opciones": ["6", "4", "8"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "memoria-animales-del-mar", titulo: "Memoria del mar", descripcion: "Encontrá las parejas de animales del mar.",
    beneficio: "Los juegos de memoria en la primera infancia entrenan la memoria de trabajo de una forma simple y visual, adaptada a cómo piensan los chicos a esta edad.",
    edadMin: 3, edadMax: 5, categoria: "memoria", tipo: "memoria", duracion: 4,
    contenido: {"pares": ["🐟", "🐙", "🦀", "🐳", "🐢"]},
    activo: true, version: 1 },

  { id: "que-forma-es", titulo: "¿Qué forma es?", descripcion: "Elegí el nombre correcto de cada forma.",
    beneficio: "Reconocer formas, colores y cantidades es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "🔵 ¿Qué forma es?", "opciones": ["Círculo", "Cuadrado", "Triángulo"], "correctaIdx": 0}, {"pregunta": "🟦 ¿Qué forma es?", "opciones": ["Cuadrado", "Círculo", "Estrella"], "correctaIdx": 0}, {"pregunta": "🔺 ¿Qué forma es?", "opciones": ["Triángulo", "Cuadrado", "Círculo"], "correctaIdx": 0}, {"pregunta": "⭐ ¿Qué forma es?", "opciones": ["Estrella", "Triángulo", "Cuadrado"], "correctaIdx": 0}, {"pregunta": "❤️ ¿Qué forma es?", "opciones": ["Corazón", "Círculo", "Estrella"], "correctaIdx": 0}, {"pregunta": "🌙 ¿Qué forma es?", "opciones": ["Luna", "Sol", "Cuadrado"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "ropa-de-verano-o-invierno", titulo: "Ropa de verano o invierno", descripcion: "Clasificá la ropa según la estación.",
    beneficio: "Reconocer formas, colores y cantidades es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "clasificacion", tipo: "clasificar", duracion: 4,
    contenido: {"instruccion": "¿Es ropa de verano o de invierno?", "grupoA": {"nombre": "Verano", "emoji": "☀️"}, "grupoB": {"nombre": "Invierno", "emoji": "❄️"}, "items": [{"emoji": "🩳", "grupo": "A"}, {"emoji": "🧥", "grupo": "B"}, {"emoji": "👙", "grupo": "A"}, {"emoji": "🧤", "grupo": "B"}, {"emoji": "👡", "grupo": "A"}, {"emoji": "🧣", "grupo": "B"}, {"emoji": "🕶️", "grupo": "A"}, {"emoji": "🥾", "grupo": "B"}, {"emoji": "👕", "grupo": "A"}, {"emoji": "🧦", "grupo": "B"}]},
    activo: true, version: 1 },

  { id: "que-lo-haria-sentir-asi", titulo: "¿Qué lo haría sentir así?", descripcion: "Elegí qué situación provoca esa emoción.",
    beneficio: "Ponerle nombre a las emociones desde chicos —lo que en desarrollo infantil se llama 'alfabetización emocional'— está asociado con mejor regulación emocional más adelante en la vida.",
    edadMin: 3, edadMax: 5, categoria: "emociones", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "¿Qué podría hacer sentir feliz a alguien?", "opciones": ["🎁 Un regalo", "💔 Perder algo", "😢 Estar solo"], "correctaIdx": 0}, {"pregunta": "¿Qué podría hacer sentir triste a alguien?", "opciones": ["💔 Perder su juguete", "🎉 Una fiesta", "🍦 Un helado"], "correctaIdx": 0}, {"pregunta": "¿Qué podría dar miedo?", "opciones": ["⚡ Un trueno fuerte", "🌈 Un arcoíris", "🍰 Una torta"], "correctaIdx": 0}, {"pregunta": "¿Qué podría dar sorpresa?", "opciones": ["🎉 Una fiesta sorpresa", "😴 Dormir la siesta", "🚶 Caminar"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "dibuja-tu-animal-favorito", titulo: "Dibujá tu animal favorito", descripcion: "Dibujá el animal que más te gusta.",
    beneficio: "Reconocer y nombrar cosas de su entorno ayuda a los chicos a ampliar el vocabulario y a practicar la categorización, una de las primeras formas de pensamiento lógico.",
    edadMin: 3, edadMax: 5, categoria: "animales", tipo: "dibujo", duracion: 4,
    contenido: {"texto": "Dibujá tu animal favorito, el que más te gusta 🐾"},
    activo: true, version: 1 },

  { id: "dibuja-algo-redondo", titulo: "Dibujá algo redondo", descripcion: "Dibujá todas las cosas redondas que se te ocurran.",
    beneficio: "Reconocer formas, colores y cantidades es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "formas-colores", tipo: "dibujo", duracion: 4,
    contenido: {"texto": "Dibujá todas las cosas redondas que se te ocurran 🔵"},
    activo: true, version: 1 },

  { id: "ayudar-o-no-ayudar", titulo: "¿Cómo ayudamos?", descripcion: "Elegí la mejor forma de ayudar.",
    beneficio: "Practicar situaciones sociales simples, como compartir o pedir ayuda, les da a los chicos un guión mental que después pueden usar en la vida real.",
    edadMin: 3, edadMax: 5, categoria: "social", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "Un amigo se cayó y está llorando. ¿Qué hacés?", "opciones": ["🤗 Le pregunto si está bien", "🏃 Sigo jugando", "😄 Me río"], "correctaIdx": 0}, {"pregunta": "Tu hermanito no puede alcanzar un juguete. ¿Qué hacés?", "opciones": ["🙋 Se lo alcanzo", "❌ No lo ayudo", "😡 Le digo que no puede"], "correctaIdx": 0}, {"pregunta": "Alguien dejó caer sus cosas. ¿Qué hacés?", "opciones": ["🤲 Lo ayudo a juntarlas", "🚶 Sigo caminando", "😄 Me río"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "que-falta", titulo: "¿Qué falta?", descripcion: "Mirá bien y adiviná qué falta.",
    beneficio: "Reconocer formas, colores y cantidades es una de las bases del pensamiento matemático temprano: antes de contar, los chicos aprenden a clasificar y comparar.",
    edadMin: 3, edadMax: 5, categoria: "atencion", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "Un auto tiene 4 ruedas, pero a este le dibujaron solo 3. ¿Qué falta?", "opciones": ["🛞 Una rueda", "🪟 Una ventana", "🚪 Una puerta"], "correctaIdx": 0}, {"pregunta": "Una cara sin nariz. ¿Qué falta?", "opciones": ["👃 La nariz", "👀 Los ojos", "👂 Las orejas"], "correctaIdx": 0}, {"pregunta": "Una mano con solo 4 dedos dibujados. ¿Qué falta?", "opciones": ["✋ Un dedo", "💅 Una uña", "🤚 La muñeca"], "correctaIdx": 0}, {"pregunta": "Un sol sin rayos. ¿Qué le falta?", "opciones": ["☀️ Los rayos", "🌙 La luna", "⭐ Las estrellas"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  // ═══════ 🦊 6-8 AÑOS (parte 2) ═══════
  { id: "encontra-las-diferencias-avanzado", titulo: "Encontrá las diferencias", descripcion: "Compará dos descripciones y encontrá qué cambió.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "atencion", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "Antes: \"la casa tiene 3 ventanas\". Ahora: \"la casa tiene 4 ventanas\". ¿Qué cambió?", "opciones": ["El número de ventanas", "El color de la casa", "El tamaño de la puerta"], "correctaIdx": 0}, {"pregunta": "Antes: \"el gato es negro\". Ahora: \"el gato es blanco\". ¿Qué cambió?", "opciones": ["El color del gato", "El tamaño del gato", "Dónde está el gato"], "correctaIdx": 0}, {"pregunta": "Antes: \"hay 2 pájaros en el árbol\". Ahora: \"hay 5 pájaros en el árbol\". ¿Qué cambió?", "opciones": ["La cantidad de pájaros", "El tipo de árbol", "El color del cielo"], "correctaIdx": 0}, {"pregunta": "Antes: \"el sombrero es rojo\". Ahora: \"el sombrero es azul y tiene una pluma\". ¿Qué cambió?", "opciones": ["El color y se agregó una pluma", "Solo el tamaño", "Nada cambió"], "correctaIdx": 0}, {"pregunta": "Antes: \"el tren tiene 3 vagones\". Ahora: \"el tren tiene 3 vagones y una locomotora nueva\". ¿Qué cambió?", "opciones": ["Se agregó una locomotora nueva", "Se sacó un vagón", "El color del tren"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "cuenta-objetos-escondidos", titulo: "Contá los objetos escondidos", descripcion: "Leé bien la descripción y contá cuántos hay.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "atencion", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "En la caja hay 3 autos rojos, 2 autos azules y 1 auto verde. ¿Cuántos autos hay en total?", "opciones": ["6", "5", "7"], "correctaIdx": 0}, {"pregunta": "En el jardín hay 4 flores amarillas y 3 flores rosas. ¿Cuántas flores hay en total?", "opciones": ["7", "6", "8"], "correctaIdx": 0}, {"pregunta": "En la mochila hay 2 lápices, 3 lapiceras y 1 goma. ¿Cuántos útiles hay en total?", "opciones": ["6", "5", "7"], "correctaIdx": 0}, {"pregunta": "En el cielo hay 5 nubes chicas y 2 nubes grandes. ¿Cuántas nubes hay en total?", "opciones": ["7", "6", "8"], "correctaIdx": 0}, {"pregunta": "En la pecera hay 4 peces naranjas y 4 peces dorados. ¿Cuántos peces hay en total?", "opciones": ["8", "7", "9"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "sigue-la-instruccion", titulo: "Seguí la instrucción", descripcion: "Leé con atención y elegí lo que corresponde.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "atencion", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "Tocate primero la cabeza y después la panza. ¿Qué hacés primero?", "opciones": ["Tocarme la cabeza", "Tocarme la panza", "Aplaudir"], "correctaIdx": 0}, {"pregunta": "Levantá el brazo derecho y después saltá una vez. ¿Qué hacés al final?", "opciones": ["Saltar una vez", "Levantar el brazo", "Sentarme"], "correctaIdx": 0}, {"pregunta": "Contá hasta 3 y después decí tu nombre. ¿Qué hacés después de contar?", "opciones": ["Decir mi nombre", "Contar de nuevo", "Aplaudir"], "correctaIdx": 0}, {"pregunta": "Cerrá los ojos, contá hasta 5, y abrilos. ¿Qué hacés al final?", "opciones": ["Abrir los ojos", "Cerrar los ojos", "Contar hasta 10"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "encuentra-el-error", titulo: "Encontrá el error", descripcion: "Leé la frase y encontrá qué está mal.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "atencion", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "\"Los peces vuelan por el cielo.\" ¿Qué está mal en esta frase?", "opciones": ["Los peces no vuelan, nadan", "Está bien la frase", "El cielo no existe"], "correctaIdx": 0}, {"pregunta": "\"El sol sale de noche.\" ¿Qué está mal?", "opciones": ["El sol sale de día", "Está bien la frase", "El sol es azul"], "correctaIdx": 0}, {"pregunta": "\"Los perros ponen huevos.\" ¿Qué está mal?", "opciones": ["Los perros no ponen huevos", "Está bien la frase", "Los perros vuelan"], "correctaIdx": 0}, {"pregunta": "\"En invierno hace mucho calor.\" ¿Qué está mal?", "opciones": ["En invierno hace frío", "Está bien la frase", "El invierno no existe"], "correctaIdx": 0}, {"pregunta": "\"Los peces caminan por la tierra.\" ¿Qué está mal?", "opciones": ["Los peces nadan en el agua", "Está bien la frase", "Los peces vuelan"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "memoria-banderas", titulo: "Memoria de banderas", descripcion: "Encontrá las parejas de banderas.",
    beneficio: "Los juegos de memoria más largos, con más parejas para encontrar, entrenan la memoria de trabajo de una forma progresivamente más desafiante.",
    edadMin: 6, edadMax: 8, categoria: "memoria", tipo: "memoria", duracion: 5,
    contenido: {"pares": ["🇦🇷", "🇧🇷", "🇺🇾", "🇨🇱", "🇵🇾", "🇲🇽"]},
    activo: true, version: 1 },

  { id: "memoria-numeros", titulo: "Memoria de números", descripcion: "Encontrá las parejas de números iguales.",
    beneficio: "Los juegos de memoria más largos, con más parejas para encontrar, entrenan la memoria de trabajo de una forma progresivamente más desafiante.",
    edadMin: 6, edadMax: 8, categoria: "memoria", tipo: "memoria", duracion: 5,
    contenido: {"pares": ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"]},
    activo: true, version: 1 },

  { id: "memoria-emociones-caras", titulo: "Memoria de emociones", descripcion: "Encontrá las parejas de caras con la misma emoción.",
    beneficio: "Ampliar el vocabulario emocional en esta edad ayuda a los chicos a expresar con más precisión lo que sienten, en vez de quedarse solo con 'bien' o 'mal'.",
    edadMin: 6, edadMax: 8, categoria: "memoria", tipo: "memoria", duracion: 4,
    contenido: {"pares": ["😄", "😢", "😡", "😲", "😴"]},
    activo: true, version: 1 },

  { id: "memoria-frutas-y-verduras-grande", titulo: "Memoria grande de comidas", descripcion: "Un desafío de memoria más grande.",
    beneficio: "Los juegos de memoria más largos, con más parejas para encontrar, entrenan la memoria de trabajo de una forma progresivamente más desafiante.",
    edadMin: 6, edadMax: 8, categoria: "memoria", tipo: "memoria", duracion: 5,
    contenido: {"pares": ["🍎", "🍌", "🍇", "🥕", "🥦", "🌽", "🍓"]},
    activo: true, version: 1 },

  { id: "que-sigue-numeros", titulo: "¿Qué número sigue?", descripcion: "Descubrí el patrón y elegí el número que sigue.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "secuencias", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "2, 4, 6, 8, ¿qué sigue?", "opciones": ["10", "9", "12"], "correctaIdx": 0}, {"pregunta": "1, 3, 5, 7, ¿qué sigue?", "opciones": ["9", "8", "10"], "correctaIdx": 0}, {"pregunta": "5, 10, 15, 20, ¿qué sigue?", "opciones": ["25", "22", "30"], "correctaIdx": 0}, {"pregunta": "10, 9, 8, 7, ¿qué sigue?", "opciones": ["6", "5", "8"], "correctaIdx": 0}, {"pregunta": "3, 6, 9, 12, ¿qué sigue?", "opciones": ["15", "13", "14"], "correctaIdx": 0}, {"pregunta": "1, 2, 4, 8, ¿qué sigue?", "opciones": ["16", "10", "12"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "secuencia-de-la-manana", titulo: "La secuencia de la mañana", descripcion: "Ordená lo que pasa primero, después y al final.",
    beneficio: "Escuchar y recordar partes de una historia entrena la comprensión narrativa, una habilidad directamente relacionada con la comprensión lectora futura.",
    edadMin: 6, edadMax: 8, categoria: "secuencias", tipo: "secuencia", duracion: 4,
    contenido: {"instruccion": "Ordená lo que pasa en una mañana típica.", "items": ["Suena el despertador", "Te levantás de la cama", "Te lavás los dientes", "Desayunás", "Te vas a la escuela"]},
    activo: true, version: 1 },

  { id: "secuencia-del-ciclo-del-agua", titulo: "El ciclo del agua", descripcion: "Ordená los pasos del ciclo del agua.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "secuencias", tipo: "secuencia", duracion: 5,
    contenido: {"instruccion": "Ordená cómo funciona el ciclo del agua en la naturaleza.", "items": ["El sol calienta el agua del mar", "El agua se evapora y sube", "Se forman las nubes", "Llueve", "El agua vuelve al mar por los ríos"]},
    activo: true, version: 1 },

  { id: "la-mascota-perdida", titulo: "La mascota perdida", descripcion: "Una historia donde vos decidís qué hacer.",
    beneficio: "Ponerse en el lugar de un personaje y pensar qué haría en su lugar es una forma simple de empezar a desarrollar la empatía y la resolución de conflictos.",
    edadMin: 6, edadMax: 8, categoria: "historias", tipo: "historia", duracion: 4,
    contenido: {"inicio": "inicio", "nodos": {"inicio": {"texto": "Valentina no encuentra a su perrito Toby en el patio. Empieza a preocuparse. ¿Qué hace primero?", "opciones": [{"texto": "Buscar por todo el barrio sola", "siguiente": "sola"}, {"texto": "Avisarle a un adulto", "siguiente": "adulto"}, {"texto": "Quedarse llorando en su cuarto", "siguiente": "llorar"}]}, "sola": {"texto": "Valentina sale sola a buscar, pero se pierde un poco y se asusta. Por suerte encuentra el camino de vuelta. Aprendió que es mejor avisar a un adulto antes de salir.", "opciones": []}, "adulto": {"texto": "Valentina le avisa a su papá. Juntos salen a buscar y preguntan a los vecinos. Un vecino había visto a Toby jugando en la plaza. ¡Lo encuentran sano y salvo!", "opciones": []}, "llorar": {"texto": "Valentina llora un rato, pero después decide contarle a su mamá. Su mamá la ayuda a buscar con calma, y entre las dos encuentran a Toby debajo de un auto, asustado pero bien.", "opciones": []}}},
    activo: true, version: 1 },

  { id: "el-regalo-sorpresa", titulo: "El regalo sorpresa", descripcion: "Una historia donde vos decidís qué hacer.",
    beneficio: "Ponerse en el lugar de un personaje y pensar qué haría en su lugar es una forma simple de empezar a desarrollar la empatía y la resolución de conflictos.",
    edadMin: 6, edadMax: 8, categoria: "historias", tipo: "historia", duracion: 4,
    contenido: {"inicio": "inicio", "nodos": {"inicio": {"texto": "Es el cumpleaños de la abuela de Benja, y él quiere hacerle un regalo especial, pero no tiene mucho dinero. ¿Qué hace?", "opciones": [{"texto": "Hacerle un dibujo y una tarjeta", "siguiente": "dibujo"}, {"texto": "Pedirle plata a sus papás", "siguiente": "pedir"}, {"texto": "No hacerle nada", "siguiente": "nada"}]}, "dibujo": {"texto": "Benja hace un dibujo hermoso de él y su abuela juntos, con una tarjeta que dice 'te quiero mucho'. Cuando la abuela lo abre, se pone a llorar de la emoción: dice que es el mejor regalo que recibió.", "opciones": []}, "pedir": {"texto": "Benja les pide plata a sus papás para comprar un regalo. Ellos le sugieren que, además, le haga algo con sus propias manos. Benja termina combinando las dos ideas, y a la abuela le encanta.", "opciones": []}, "nada": {"texto": "Benja no le hace nada a su abuela ese día, y se siente un poco mal al verla feliz igual por tenerlo cerca. Al día siguiente, decide hacerle un dibujo tarde, y ella lo recibe con la misma alegría.", "opciones": []}}},
    activo: true, version: 1 },

  { id: "ordena-los-tres-cerditos", titulo: "Ordená los tres chanchitos", descripcion: "Poné en orden las partes del cuento.",
    beneficio: "Escuchar y recordar partes de una historia entrena la comprensión narrativa, una habilidad directamente relacionada con la comprensión lectora futura.",
    edadMin: 6, edadMax: 8, categoria: "historias", tipo: "secuencia", duracion: 4,
    contenido: {"instruccion": "Ordená lo que pasa en el cuento de los tres chanchitos.", "items": ["Los tres chanchitos construyen sus casas", "El lobo sopla la casa de paja", "El lobo sopla la casa de madera", "Los chanchitos se refugian en la casa de ladrillos", "El lobo no puede soplar la casa de ladrillos"]},
    activo: true, version: 1 },

  { id: "que-emocion-es-esta", titulo: "¿Qué emoción es esta?", descripcion: "Elegí la palabra que mejor describe la emoción.",
    beneficio: "Ampliar el vocabulario emocional en esta edad ayuda a los chicos a expresar con más precisión lo que sienten, en vez de quedarse solo con 'bien' o 'mal'.",
    edadMin: 6, edadMax: 8, categoria: "emociones", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "Sentís el corazón acelerado y las manos frías antes de hablar en público. ¿Qué emoción es?", "opciones": ["😰 Nervios", "😄 Alegría", "😴 Sueño"], "correctaIdx": 0}, {"pregunta": "Algo salió mejor de lo que esperabas y sonreís sin parar. ¿Qué emoción es?", "opciones": ["😄 Alegría", "😡 Enojo", "😨 Miedo"], "correctaIdx": 0}, {"pregunta": "Alguien te sacó algo sin pedirlo y sentís ganas de gritar. ¿Qué emoción es?", "opciones": ["😡 Enojo", "😴 Cansancio", "😄 Alegría"], "correctaIdx": 0}, {"pregunta": "Extrañás mucho a alguien que no ves hace tiempo. ¿Qué emoción es?", "opciones": ["😢 Nostalgia/tristeza", "😲 Sorpresa", "😄 Alegría"], "correctaIdx": 0}, {"pregunta": "No esperabas ese resultado para nada. ¿Qué emoción es?", "opciones": ["😲 Sorpresa", "😴 Cansancio", "😡 Enojo"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "como-ayudarias", titulo: "¿Cómo ayudarías?", descripcion: "Elegí la mejor forma de ayudar a un amigo.",
    beneficio: "Ponerse en el lugar de un personaje y pensar qué haría en su lugar es una forma simple de empezar a desarrollar la empatía y la resolución de conflictos.",
    edadMin: 6, edadMax: 8, categoria: "emociones", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "Tu amigo está triste porque perdió un partido. ¿Qué le decís?", "opciones": ["Está bien sentirse así, ¿jugamos otra cosa?", "No llores por eso", "Siempre perdés"], "correctaIdx": 0}, {"pregunta": "Tu amiga está nerviosa por un examen. ¿Qué le decís?", "opciones": ["Vas a estar bien, practicamos juntos", "No te va a ir bien", "No me importa"], "correctaIdx": 0}, {"pregunta": "Tu compañero está enojado porque lo molestaron. ¿Qué hacés?", "opciones": ["Le pregunto qué pasó y lo escucho", "Me río también", "Lo ignoro"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "dibuja-una-emocion-dificil", titulo: "Dibujá una emoción difícil", descripcion: "Dibujá cómo se ve por dentro una emoción que te cuesta.",
    beneficio: "Ampliar el vocabulario emocional en esta edad ayuda a los chicos a expresar con más precisión lo que sienten, en vez de quedarse solo con 'bien' o 'mal'.",
    edadMin: 6, edadMax: 8, categoria: "emociones", tipo: "dibujo", duracion: 4,
    contenido: {"texto": "Pensá en una emoción que a veces te cuesta sentir, y dibujá cómo te la imaginás, con colores y formas."},
    activo: true, version: 1 },

  { id: "resolver-un-conflicto", titulo: "Resolver un conflicto", descripcion: "Elegí la mejor forma de resolver cada situación.",
    beneficio: "Ponerse en el lugar de un personaje y pensar qué haría en su lugar es una forma simple de empezar a desarrollar la empatía y la resolución de conflictos.",
    edadMin: 6, edadMax: 8, categoria: "social", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "Dos amigos quieren jugar con el mismo juguete. ¿Qué es lo mejor?", "opciones": ["Turnarse con un tiempo para cada uno", "Pelear por él", "Que nadie juegue"], "correctaIdx": 0}, {"pregunta": "Un compañero dice algo que te molesta sin querer. ¿Qué es lo mejor?", "opciones": ["Decirle con calma que eso te molestó", "Gritarle", "Ignorarlo para siempre"], "correctaIdx": 0}, {"pregunta": "Dos equipos no se ponen de acuerdo en las reglas de un juego. ¿Qué es lo mejor?", "opciones": ["Hablarlo entre todos y votar", "Que gane el más fuerte", "No jugar más"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "el-nuevo-companero", titulo: "El nuevo compañero", descripcion: "Una historia sobre incluir a alguien nuevo.",
    beneficio: "Ponerse en el lugar de un personaje y pensar qué haría en su lugar es una forma simple de empezar a desarrollar la empatía y la resolución de conflictos.",
    edadMin: 6, edadMax: 8, categoria: "social", tipo: "historia", duracion: 4,
    contenido: {"inicio": "inicio", "nodos": {"inicio": {"texto": "Llega un compañero nuevo a la clase de Mora, y se lo ve solo en el recreo, sin hablar con nadie. ¿Qué hace Mora?", "opciones": [{"texto": "Se acerca a hablarle", "siguiente": "acerca"}, {"texto": "Lo mira de lejos, pero no hace nada", "siguiente": "lejos"}, {"texto": "Le dice a otros que no jueguen con él", "siguiente": "excluye"}]}, "acerca": {"texto": "Mora se acerca y le pregunta su nombre. El chico nuevo, que se llama Iván, se pone contento de tener con quién hablar. Se hacen amigos y juegan juntos toda la semana.", "opciones": []}, "lejos": {"texto": "Mora se queda mirando de lejos, sintiendo un poco de pena por él. Al día siguiente, junta valor y se acerca a hablarle. Iván le agradece mucho el gesto.", "opciones": []}, "excluye": {"texto": "Mora les dice a otros compañeros que no jueguen con Iván, y después se siente mal por eso. Decide pedirle disculpas e invitarlo a jugar, y entre todos terminan pasándola bien.", "opciones": []}}},
    activo: true, version: 1 },

  { id: "que-harias-si-situaciones", titulo: "¿Qué harías si...?", descripcion: "Pensá qué harías en cada situación.",
    beneficio: "Ponerse en el lugar de un personaje y pensar qué haría en su lugar es una forma simple de empezar a desarrollar la empatía y la resolución de conflictos.",
    edadMin: 6, edadMax: 8, categoria: "social", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "¿Qué harías si ves que un compañero está solo en el recreo?", "opciones": ["Invitarlo a jugar", "No hacer nada", "Reírme"], "correctaIdx": 0}, {"pregunta": "¿Qué harías si te equivocás delante de todos?", "opciones": ["Reírme un poco y seguir", "Esconderme para siempre", "Enojarme mucho"], "correctaIdx": 0}, {"pregunta": "¿Qué harías si un amigo te cuenta un secreto?", "opciones": ["Guardarlo si no es peligroso", "Contárselo a todos", "Reírme de él"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "adivina-el-patron", titulo: "Adiviná el patrón", descripcion: "Descubrí qué figura sigue en el patrón.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "logica", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "🔴🔵🔴🔵🔴, ¿qué sigue?", "opciones": ["🔵", "🔴", "🟢"], "correctaIdx": 0}, {"pregunta": "⭐🌙⭐🌙⭐, ¿qué sigue?", "opciones": ["🌙", "⭐", "☀️"], "correctaIdx": 0}, {"pregunta": "🟦🟦🟥🟦🟦🟥, ¿qué sigue?", "opciones": ["🟦", "🟥", "🟩"], "correctaIdx": 0}, {"pregunta": "🔺🔺🔵🔺🔺, ¿qué sigue?", "opciones": ["🔵", "🔺", "⭐"], "correctaIdx": 0}, {"pregunta": "1️⃣2️⃣1️⃣2️⃣1️⃣, ¿qué sigue?", "opciones": ["2️⃣", "1️⃣", "3️⃣"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "que-no-corresponde", titulo: "¿Cuál no corresponde?", descripcion: "Encontrá el que no pertenece al grupo.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "logica", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "🍎🍌🍇🚗 ¿Cuál no corresponde?", "opciones": ["🚗 (no es una fruta)", "🍎", "🍌"], "correctaIdx": 0}, {"pregunta": "🐶🐱🐭🚲 ¿Cuál no corresponde?", "opciones": ["🚲 (no es un animal)", "🐶", "🐱"], "correctaIdx": 0}, {"pregunta": "☀️🌙⭐🍕 ¿Cuál no corresponde?", "opciones": ["🍕 (no está en el cielo)", "☀️", "🌙"], "correctaIdx": 0}, {"pregunta": "🔴🔵🟢👟 ¿Cuál no corresponde?", "opciones": ["👟 (no es un color)", "🔴", "🔵"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "acertijos-simples", titulo: "Acertijos simples", descripcion: "Resolvé estos acertijos cortos.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "logica", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "Tengo hojas pero no soy un árbol, tengo tapa pero no soy una olla. ¿Qué soy?", "opciones": ["📖 Un libro", "🌳 Un árbol", "🍳 Una sartén"], "correctaIdx": 0}, {"pregunta": "Cuanto más me sacan, más grande me hago. ¿Qué soy?", "opciones": ["🕳️ Un pozo/hoyo", "🎈 Un globo", "🧊 Un hielo"], "correctaIdx": 0}, {"pregunta": "Tengo manecillas pero no puedo aplaudir. ¿Qué soy?", "opciones": ["⏰ Un reloj", "🧤 Un guante", "✋ Una mano"], "correctaIdx": 0}, {"pregunta": "Cuanto más caliente estoy, más frío me pongo. ¿Qué soy?", "opciones": ["🧊 El hielo derritiéndose", "🔥 El fuego", "☀️ El sol"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "completa-la-serie", titulo: "Completá la serie", descripcion: "Encontrá qué falta para completar el patrón.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "logica", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "🔺🔵🔺🔵___ ¿Qué va en el espacio?", "opciones": ["🔺", "🔵", "🟢"], "correctaIdx": 0}, {"pregunta": "🟢🟢🟡🟢🟢___ ¿Qué va en el espacio?", "opciones": ["🟡", "🟢", "🔴"], "correctaIdx": 0}, {"pregunta": "⭐⭐⭐🌙⭐⭐⭐___ ¿Qué va en el espacio?", "opciones": ["🌙", "⭐", "☀️"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "respiracion-del-globo-grande", titulo: "El globo grande", descripcion: "Inflá un globo imaginario bien grande.",
    beneficio: "Clasificar el mundo en categorías (sólido o líquido, qué flota o no) es una base del pensamiento científico temprano, antes de aprender las reglas formales.",
    edadMin: 6, edadMax: 8, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: {"texto": "Imaginá que inflás un globo enorme con tu respiración 🎈", "ciclos": 4, "fases": [{"nombre": "Inflá el globo", "segundos": 5}, {"nombre": "Soltalo despacito", "segundos": 5}]},
    activo: true, version: 1 },

  { id: "respiracion-cuadrada-para-chicos", titulo: "Respiración cuadrada", descripcion: "Seguí los cuatro lados de un cuadrado respirando.",
    beneficio: "Clasificar el mundo en categorías (sólido o líquido, qué flota o no) es una base del pensamiento científico temprano, antes de aprender las reglas formales.",
    edadMin: 6, edadMax: 8, categoria: "calma", tipo: "respiracion", duracion: 2,
    contenido: {"texto": "Imaginá que dibujás un cuadrado en el aire con tu respiración ⬜", "ciclos": 4, "fases": [{"nombre": "Inhalá", "segundos": 4}, {"nombre": "Sostené", "segundos": 4}, {"nombre": "Exhalá", "segundos": 4}, {"nombre": "Sostené", "segundos": 4}]},
    activo: true, version: 1 },

  { id: "sonidos-de-la-naturaleza", titulo: "Sonidos de la naturaleza", descripcion: "Adiviná qué hace ese sonido en la naturaleza.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "sonidos", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "\"¡Cuác, cuác!\" en la laguna. ¿Qué es?", "opciones": ["🦆 Un pato", "🐍 Una serpiente", "🐝 Una abeja"], "correctaIdx": 0}, {"pregunta": "El sonido del agua cayendo desde muy alto. ¿Qué es?", "opciones": ["💦 Una cascada", "🌵 Un cactus", "🪨 Una piedra"], "correctaIdx": 0}, {"pregunta": "Un ruido fuerte en el cielo después de un rayo. ¿Qué es?", "opciones": ["⚡ Un trueno", "🌈 Un arcoíris", "☁️ Una nube"], "correctaIdx": 0}, {"pregunta": "El sonido de las hojas cuando sopla fuerte. ¿Qué es?", "opciones": ["💨 El viento", "🔥 El fuego", "🌊 El mar"], "correctaIdx": 0}, {"pregunta": "El sonido de miles de gotas cayendo del cielo. ¿Qué es?", "opciones": ["🌧️ La lluvia", "❄️ La nieve", "☀️ El sol"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "memoria-sonidos-animales", titulo: "Memoria de sonidos animales", descripcion: "Encontrá las parejas de animales que hacen ese sonido.",
    beneficio: "Los juegos de memoria más largos, con más parejas para encontrar, entrenan la memoria de trabajo de una forma progresivamente más desafiante.",
    edadMin: 6, edadMax: 8, categoria: "sonidos", tipo: "memoria", duracion: 5,
    contenido: {"pares": ["🐮", "🐶", "🐱", "🐓", "🐑", "🦆"]},
    activo: true, version: 1 },

  { id: "clasificar-solido-o-liquido", titulo: "¿Sólido o líquido?", descripcion: "Clasificá cada cosa según su estado.",
    beneficio: "Clasificar el mundo en categorías (sólido o líquido, qué flota o no) es una base del pensamiento científico temprano, antes de aprender las reglas formales.",
    edadMin: 6, edadMax: 8, categoria: "clasificacion", tipo: "clasificar", duracion: 4,
    contenido: {"instruccion": "¿Es sólido o líquido?", "grupoA": {"nombre": "Sólido", "emoji": "🧊"}, "grupoB": {"nombre": "Líquido", "emoji": "💧"}, "items": [{"emoji": "🪨", "grupo": "A"}, {"emoji": "💧", "grupo": "B"}, {"emoji": "🧱", "grupo": "A"}, {"emoji": "🥛", "grupo": "B"}, {"emoji": "📚", "grupo": "A"}, {"emoji": "🧃", "grupo": "B"}, {"emoji": "🪵", "grupo": "A"}, {"emoji": "🍯", "grupo": "B"}, {"emoji": "🔑", "grupo": "A"}, {"emoji": "🌊", "grupo": "B"}]},
    activo: true, version: 1 },

  { id: "clasificar-objetos-que-flotan", titulo: "¿Flota o se hunde?", descripcion: "Clasificá cada objeto según si flota o se hunde en el agua.",
    beneficio: "Clasificar el mundo en categorías (sólido o líquido, qué flota o no) es una base del pensamiento científico temprano, antes de aprender las reglas formales.",
    edadMin: 6, edadMax: 8, categoria: "clasificacion", tipo: "clasificar", duracion: 4,
    contenido: {"instruccion": "¿Flota o se hunde en el agua?", "grupoA": {"nombre": "Flota", "emoji": "🛟"}, "grupoB": {"nombre": "Se hunde", "emoji": "⬇️"}, "items": [{"emoji": "🪵", "grupo": "A"}, {"emoji": "🪨", "grupo": "B"}, {"emoji": "⚽", "grupo": "A"}, {"emoji": "🔑", "grupo": "B"}, {"emoji": "🍎", "grupo": "A"}, {"emoji": "🔧", "grupo": "B"}, {"emoji": "🛶", "grupo": "A"}, {"emoji": "🪙", "grupo": "B"}, {"emoji": "🧊", "grupo": "A"}, {"emoji": "🪝", "grupo": "B"}]},
    activo: true, version: 1 },

  { id: "figuras-geometricas-lados", titulo: "Los lados de las figuras", descripcion: "Contá cuántos lados tiene cada figura.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "formas-colores", tipo: "seleccion", duracion: 4,
    contenido: {"rondas": [{"pregunta": "¿Cuántos lados tiene un triángulo? 🔺", "opciones": ["3", "4", "5"], "correctaIdx": 0}, {"pregunta": "¿Cuántos lados tiene un cuadrado? 🟦", "opciones": ["4", "3", "5"], "correctaIdx": 0}, {"pregunta": "¿Cuántos lados tiene un pentágono? ⬠", "opciones": ["5", "4", "6"], "correctaIdx": 0}, {"pregunta": "¿Cuántos lados tiene un hexágono? ⬡", "opciones": ["6", "5", "7"], "correctaIdx": 0}, {"pregunta": "¿Cuántos lados tiene un círculo? 🔵", "opciones": ["0, no tiene lados rectos", "1", "4"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "cuidando-una-mascota", titulo: "Cuidando una mascota", descripcion: "Elegí qué necesita una mascota para estar bien.",
    beneficio: "A esta edad los chicos empiezan a entender secuencias más largas y patrones lógicos, una habilidad de base para las matemáticas y la resolución de problemas.",
    edadMin: 6, edadMax: 8, categoria: "animales", tipo: "seleccion", duracion: 3,
    contenido: {"rondas": [{"pregunta": "¿Qué necesita un perro todos los días?", "opciones": ["Agua, comida y paseos", "Solo dormir", "Nada especial"], "correctaIdx": 0}, {"pregunta": "¿Qué hay que hacer si una mascota está enferma?", "opciones": ["Llevarla al veterinario", "Esperar a que se cure sola", "No hacer nada"], "correctaIdx": 0}, {"pregunta": "¿Cómo hay que tratar a una mascota?", "opciones": ["Con cuidado y cariño", "Con miedo", "Ignorándola"], "correctaIdx": 0}]},
    activo: true, version: 1 },

  { id: "dibuja-tu-superheroe", titulo: "Dibujá tu superhéroe", descripcion: "Inventá y dibujá tu propio superhéroe.",
    beneficio: "Escuchar y recordar partes de una historia entrena la comprensión narrativa, una habilidad directamente relacionada con la comprensión lectora futura.",
    edadMin: 6, edadMax: 8, categoria: "creatividad", tipo: "dibujo", duracion: 4,
    contenido: {"texto": "Inventá tu propio superhéroe: ¿qué poder tiene? Dibujalo con su traje y su poder."},
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
  { categoria: "emociones", icono: "❤️", consigna: "¿Qué hacés vos cuando estás enojado/a? ¿Y yo qué hago?" },
  { categoria: "creatividad", icono: "🎨", consigna: "Inventemos un animal imposible entre los dos: vos elegís la cabeza, yo el cuerpo." },
  { categoria: "logica", icono: "🧠", consigna: "¿Cuántas formas distintas se te ocurren de usar una caja de cartón vacía?" },
  { categoria: "social", icono: "🗣️", consigna: "Contame sobre un amigo o amiga tuyo: ¿qué es lo que más te gusta de él o ella?" },
  { categoria: "vinculo", icono: "🤝", consigna: "Hagamos un abrazo de oso contando hasta diez juntos." },
  { categoria: "creatividad", icono: "🎨", consigna: "Inventemos juntos una canción tonta sobre lo que comimos hoy." },
  { categoria: "emociones", icono: "❤️", consigna: "¿Hay algo que te dé un poco de miedo? No hace falta que sea grande." },
  { categoria: "logica", icono: "🧠", consigna: "Busquemos juntos cinco cosas en la casa que sean del mismo color." },
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
