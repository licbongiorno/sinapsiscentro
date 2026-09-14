/**
 * CREATIVIDAD-ACTIVIDADES.JS — Catálogo de actividades curadas
 * ==================================================================
 * Dos fuentes conviven en Creatividad (REGLA 26 del diseño):
 *  - CURADAS: las que están acá, escritas/revisadas a mano.
 *  - GENERATIVAS: las que usan CreatividadMotor para combinar bancos
 *    de data/creatividad-elementos.js al vuelo (animales imposibles,
 *    personajes, mundos, historias) — acá sólo hay UNA entrada de
 *    catálogo por motor (ej. "animal-imposible"), no una por cada
 *    combinación posible.
 *
 * Cada actividad es uno de dos `tipo`:
 *  - "generador": abre CreatividadMotor[motor](edad) y muestra el
 *    resultado antes de invitar a escribir/dibujar sobre él.
 *  - "prompt": consigna fija (opcionalmente con `inspiracion`, que son
 *    N elementos al azar de ciertos bancos para usar como disparador,
 *    y/o `restriccionAleatoria` para sumar un desafío de RESTRICCIONES).
 *
 * `salida` dice qué puede hacer el usuario con el resultado:
 *  "texto" | "dibujo" | "eleccion" (el usuario elige entre las dos).
 *
 * edadMin/edadMax/dificultad(1-5)/duracion(min) siguen el mismo
 * esquema que ejercicios.js/mindfulness-datos.js.
 */

const CATEGORIAS_CREATIVIDAD = [
  { id: "escribir", nombre: "Escribir", icono: "✍️", color: "#7ed6e4" },
  { id: "dibujar", nombre: "Dibujar", icono: "🎨", color: "#e0a8d0" },
  { id: "imaginar", nombre: "Imaginar", icono: "💭", color: "#a98ac9" },
  { id: "combinar", nombre: "Combinar", icono: "🧩", color: "#8ac9a9" },
  { id: "mirar-diferente", nombre: "Mirar diferente", icono: "🪞", color: "#f0c14b" },
  { id: "personajes", nombre: "Personajes", icono: "🎭", color: "#e08a8a" },
  { id: "mundos", nombre: "Mundos", icono: "🌎", color: "#2aaec2" },
  { id: "sonidos", nombre: "Crear con sonidos", icono: "🎧", color: "#c98ac2" },
  { id: "cuerpo", nombre: "Cuerpo y actuación", icono: "🤸", color: "#e0954a" },
];

const CREATIVIDAD_ACTIVIDADES = [
  // ═══════ 🧩 COMBINAR (generativas) ═══════
  { id: "animal-imposible", titulo: "Animales imposibles", descripcion: "Combiná cabeza, cuerpo y cola de animales distintos y creá uno que no existe.",
    seccion: "combinar", tipo: "generador", motor: "animal-imposible", salida: "eleccion",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "combinar-objetos", titulo: "Objeto imposible", descripcion: "Dos objetos al azar se combinan en uno nuevo: inventá qué es y para qué sirve.",
    seccion: "combinar", tipo: "generador", motor: "combinar", bancos: ["objetos", "objetos"], salida: "eleccion",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "profesion-inesperada", titulo: "La profesión y el lugar", descripcion: "Una profesión en un lugar donde no tendría sentido: imaginá cómo se las arregla.",
    seccion: "combinar", tipo: "generador", motor: "combinar", bancos: ["profesiones", "lugares"], salida: "eleccion",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "que-pasaria-animal-accion", titulo: "El animal y la acción", descripcion: "Un animal al azar tiene que hacer una acción muy poco típica de su especie.",
    seccion: "combinar", tipo: "generador", motor: "combinar", bancos: ["animales", "acciones"], salida: "eleccion",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "receta-imposible", titulo: "Receta imposible", descripcion: "Elegí tres objetos al azar e inventá la receta de un plato con ellos.",
    seccion: "combinar", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que estos tres objetos son ingredientes. Escribí la receta de un plato (real o disparatado) que los use.",
    inspiracion: { bancos: ["objetos", "naturaleza", "colores"], cantidad: 3 },
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "mapa-de-lugares", titulo: "El mapa imposible", descripcion: "Tres lugares al azar están conectados por un solo camino: dibujá o contá cómo es ese viaje.",
    seccion: "combinar", tipo: "prompt", salida: "eleccion",
    consigna: "Imaginá un mapa donde estos tres lugares están conectados por un solo camino. ¿Cómo es el viaje de uno a otro?",
    inspiracion: { bancos: ["lugares"], cantidad: 3 },
    edadMin: 8, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "restriccion-sorpresa", titulo: "Desafío con restricción", descripcion: "Escribí algo corto respetando una restricción elegida al azar.",
    seccion: "combinar", tipo: "prompt", salida: "texto",
    consigna: "Escribí un texto breve (unas pocas líneas alcanzan) respetando esta restricción:",
    restriccionAleatoria: true,
    edadMin: 12, edadMax: 99, dificultad: 4, duracion: 8, activo: true, version: 1 },

  // ═══════ 🎭 PERSONAJES (generativas + prompts) ═══════
  { id: "personaje-generador", titulo: "Creá un personaje", descripcion: "El motor arma los ingredientes de un personaje; vos le das su historia.",
    seccion: "personajes", tipo: "generador", motor: "personaje", salida: "eleccion",
    edadMin: 3, edadMax: 99, dificultad: 2, duracion: 8, activo: true, version: 1 },

  { id: "carta-al-personaje", titulo: "Cartas a un desconocido", descripcion: "Elegí un personaje al azar y escribile una carta como si lo conocieras.",
    seccion: "personajes", tipo: "prompt", salida: "texto",
    consigna: "Este es tu personaje. Escribile una carta corta como si ya lo conocieras de toda la vida.",
    inspiracion: { bancos: ["personajes"], cantidad: 1 },
    edadMin: 9, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "el-secreto-del-personaje", titulo: "¿Qué esconde?", descripcion: "Un personaje y un secreto al azar: contá cómo lo descubrieron.",
    seccion: "personajes", tipo: "prompt", salida: "texto",
    consigna: "Este personaje tiene un secreto. Contá, en pocas líneas, cómo alguien lo descubrió.",
    inspiracion: { bancos: ["personajes", "secretos"], cantidad: 1 },
    edadMin: 10, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "retrato-de-personaje", titulo: "Retrato del personaje", descripcion: "Dibujá cómo te imaginás a un personaje al azar.",
    seccion: "personajes", tipo: "generador", motor: "personaje", salida: "dibujo",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 8, activo: true, version: 1 },

  // ═══════ 🌎 MUNDOS (generativas + prompts) ═══════
  { id: "mundo-generador", titulo: "Construí un mundo", descripcion: "El motor combina lugar, clima y más; vos lo hacés tuyo.",
    seccion: "mundos", tipo: "generador", motor: "mundo", salida: "eleccion",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 10, activo: true, version: 1 },

  { id: "mapa-de-mundo", titulo: "Dibujá tu mundo", descripcion: "Un lugar y un ambiente al azar: dibujá cómo se ve ese mundo desde arriba.",
    seccion: "mundos", tipo: "generador", motor: "mundo", salida: "dibujo",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 10, activo: true, version: 1 },

  { id: "regla-del-mundo", titulo: "Una regla muy rara", descripcion: "Imaginá un lugar donde rige esta regla especial.",
    seccion: "mundos", tipo: "prompt", salida: "texto",
    consigna: "En el lugar que imagines, rige esta regla especial. Contá cómo es la vida ahí.",
    inspiracion: { bancos: ["reglasMundo"], cantidad: 1 },
    edadMin: 9, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "recurso-unico", titulo: "El recurso que lo cambia todo", descripcion: "Un mundo entero gira en torno a un recurso poco común.",
    seccion: "mundos", tipo: "prompt", salida: "texto",
    consigna: "Imaginá un pueblo entero que depende de este recurso para vivir. ¿Cómo organizan su vida alrededor de él?",
    inspiracion: { bancos: ["recursosMundo"], cantidad: 1 },
    edadMin: 10, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  // ═══════ ✍️ ESCRIBIR ═══════
  { id: "historia-generador", titulo: "Inventá una historia", descripcion: "Protagonista, lugar y objeto al azar: armá tu propia historia.",
    seccion: "escribir", tipo: "generador", motor: "historia", salida: "texto",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 10, activo: true, version: 1 },

  { id: "haiku", titulo: "Haiku", descripcion: "Un poema de tres versos (5-7-5 sílabas) sobre algo simple.",
    seccion: "escribir", tipo: "prompt", salida: "texto",
    consigna: "Escribí un haiku (tres versos, tradicionalmente de 5, 7 y 5 sílabas) sobre este elemento:",
    inspiracion: { bancos: ["naturaleza"], cantidad: 1 },
    edadMin: 10, edadMax: 99, dificultad: 3, duracion: 6, activo: true, version: 1 },

  { id: "poema-cinco-lineas", titulo: "Poema de cinco líneas", descripcion: "Cinco líneas, un tema, total libertad de forma.",
    seccion: "escribir", tipo: "prompt", salida: "texto",
    consigna: "Escribí un poema de exactamente cinco líneas sobre este tema:",
    inspiracion: { bancos: ["abstractos"], cantidad: 1 },
    edadMin: 9, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "poema-objeto", titulo: "Poema sobre un objeto", descripcion: "Mirá un objeto al azar como si nunca lo hubieras visto, y escribile un poema.",
    seccion: "escribir", tipo: "prompt", salida: "texto",
    consigna: "Escribile un poema corto a este objeto, como si lo vieras por primera vez.",
    inspiracion: { bancos: ["objetos"], cantidad: 1 },
    edadMin: 8, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "poema-ventana", titulo: "Poema desde una ventana", descripcion: "Imaginá qué se ve desde la ventana de un lugar al azar.",
    seccion: "escribir", tipo: "prompt", salida: "texto",
    consigna: "Imaginá una ventana en este lugar. Escribí un poema o un párrafo corto sobre lo que se ve desde ahí.",
    inspiracion: { bancos: ["lugares"], cantidad: 1 },
    edadMin: 9, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "poema-sonido", titulo: "Poema sobre un sonido", descripcion: "Elegí un sonido de la Biblioteca Sonora y escribile un poema.",
    seccion: "escribir", tipo: "prompt", salida: "texto",
    consigna: "Escuchá el sonido y escribí un poema o un párrafo corto sobre lo que te hace sentir o imaginar.",
    sonido: "lluvia",
    edadMin: 9, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "dialogo-inesperado", titulo: "Diálogo inesperado", descripcion: "Dos personajes que no tendrían motivo para hablarse, conversando.",
    seccion: "escribir", tipo: "prompt", salida: "texto",
    consigna: "Escribí un diálogo breve entre estos dos personajes. No hace falta explicar por qué se encontraron.",
    inspiracion: { bancos: ["personajes", "personajes"], cantidad: 2 },
    edadMin: 10, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "final-alternativo-clasico", titulo: "Cambiale el final", descripcion: "Elegí un cuento que conozcas de memoria y cambiale el final.",
    seccion: "escribir", tipo: "prompt", salida: "texto",
    consigna: "Pensá en un cuento que te sepas de memoria (el que quieras) y escribí un final distinto para él.",
    edadMin: 8, edadMax: 99, dificultad: 2, duracion: 8, activo: true, version: 1 },

  { id: "escritura-libre-creativa", titulo: "Escritura libre", descripcion: "Sin consigna: escribí lo primero que se te ocurra durante unos minutos.",
    seccion: "escribir", tipo: "prompt", salida: "texto",
    consigna: "Escribí sin parar durante unos minutos, sin corregirte ni pensar demasiado. No importa si no tiene sentido.",
    edadMin: 12, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  // ═══════ 💭 IMAGINAR ═══════
  { id: "que-pasaria-si", titulo: "¿Qué pasaría si...?", descripcion: "Una situación imposible al azar: imaginá las consecuencias.",
    seccion: "imaginar", tipo: "prompt", salida: "eleccion",
    consigna: "¿Qué pasaría si de golpe fuera verdad que un/a {elemento} pudiera hacer esto?",
    inspiracion: { bancos: ["fantasticas"], cantidad: 1 },
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "futuro-imaginado", titulo: "Un futuro posible", descripcion: "Imaginá cómo será un lugar conocido dentro de cien años.",
    seccion: "imaginar", tipo: "prompt", salida: "texto",
    consigna: "Elegí un lugar que conozcas bien (tu casa, tu barrio, tu ciudad) e imaginá cómo va a ser dentro de cien años.",
    edadMin: 9, edadMax: 99, dificultad: 2, duracion: 8, activo: true, version: 1 },

  { id: "universo-alternativo", titulo: "Un mundo al revés", descripcion: "Imaginá un mundo donde algo cotidiano funciona completamente al revés.",
    seccion: "imaginar", tipo: "prompt", salida: "eleccion",
    consigna: "Imaginá un mundo donde esto funciona completamente al revés de como lo conocés:",
    inspiracion: { bancos: ["naturaleza"], cantidad: 1 },
    edadMin: 8, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "si-fueras-invisible", titulo: "Si fueras invisible un día", descripcion: "Un poder fantástico por un día: ¿qué harías?",
    seccion: "imaginar", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que por un solo día tenés este poder. Contá qué harías con él.",
    inspiracion: { bancos: ["fantasticas"], cantidad: 1 },
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "objeto-que-habla", titulo: "Si los objetos hablaran", descripcion: "Imaginá lo que diría un objeto cotidiano si pudiera hablar.",
    seccion: "imaginar", tipo: "prompt", salida: "eleccion",
    consigna: "Imaginá que este objeto pudiera hablar. ¿Qué diría sobre su día?",
    inspiracion: { bancos: ["objetos"], cantidad: 1 },
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "ciudad-imaginaria", titulo: "Diseñá una ciudad", descripcion: "Imaginá cómo sería una ciudad construida alrededor de una sola idea.",
    seccion: "imaginar", tipo: "prompt", salida: "eleccion",
    consigna: "Imaginá una ciudad entera construida alrededor de esta idea. ¿Cómo se llama? ¿Cómo es un día ahí?",
    inspiracion: { bancos: ["abstractos"], cantidad: 1 },
    edadMin: 9, edadMax: 99, dificultad: 3, duracion: 10, activo: true, version: 1 },

  { id: "otro-planeta", titulo: "Vida en otro planeta", descripcion: "Imaginá cómo sería un ser vivo adaptado a un ambiente muy distinto.",
    seccion: "imaginar", tipo: "prompt", salida: "eleccion",
    consigna: "Imaginá un ser vivo adaptado a vivir en este ambiente. ¿Cómo es? ¿Qué necesita para sobrevivir ahí?",
    inspiracion: { bancos: ["ambientes"], cantidad: 1 },
    edadMin: 8, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "maquina-imaginaria", titulo: "Inventá una máquina", descripcion: "Una máquina que resuelve algo que nunca nadie pensó en resolver.",
    seccion: "imaginar", tipo: "prompt", salida: "eleccion",
    consigna: "Inventá una máquina rarísima que sirva para algo relacionado con esto. ¿Cómo funciona?",
    inspiracion: { bancos: ["abstractos"], cantidad: 1 },
    edadMin: 8, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "si-los-animales-mandaran", titulo: "Si los animales gobernaran", descripcion: "Imaginá cómo sería el mundo si este animal estuviera a cargo.",
    seccion: "imaginar", tipo: "prompt", salida: "eleccion",
    consigna: "Imaginá que este animal gobierna un país entero. ¿Qué reglas pondría? ¿Cómo sería la vida ahí?",
    inspiracion: { bancos: ["animales"], cantidad: 1 },
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 6, activo: true, version: 1 },

  { id: "invento-del-futuro", titulo: "El invento que todavía no existe", descripcion: "Imaginá un invento que resolvería un problema cotidiano.",
    seccion: "imaginar", tipo: "prompt", salida: "eleccion",
    consigna: "Pensá en algo que te molesta un poquito todos los días. Inventá algo que lo solucione, por más raro que sea.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  // ═══════ 🪞 MIRAR DIFERENTE ═══════
  { id: "otros-usos", titulo: "Otros usos", descripcion: "Un objeto cotidiano: pensá tres usos que nunca le diste.",
    seccion: "mirar-diferente", tipo: "prompt", salida: "texto",
    consigna: "Pensá en tres usos para este objeto que nunca se te habían ocurrido antes.",
    inspiracion: { bancos: ["objetos"], cantidad: 1 },
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "otro-punto-de-vista", titulo: "Otro punto de vista", descripcion: "Contá una situación cotidiana desde el punto de vista de alguien inesperado.",
    seccion: "mirar-diferente", tipo: "prompt", salida: "texto",
    consigna: "Contá cómo se ve un día cualquiera desde el punto de vista de este personaje.",
    inspiracion: { bancos: ["personajes"], cantidad: 1 },
    edadMin: 9, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "explicacion-alternativa", titulo: "Otra explicación", descripcion: "Inventá una explicación fantástica para algo que tiene explicación científica.",
    seccion: "mirar-diferente", tipo: "prompt", salida: "texto",
    consigna: "Elegí algo de la naturaleza que te guste y escribí una explicación fantástica (no la científica) de por qué es así.",
    inspiracion: { bancos: ["naturaleza"], cantidad: 1 },
    edadMin: 8, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "desde-el-objeto", titulo: "Desde adentro del objeto", descripcion: "Contá una escena cotidiana desde el punto de vista de un objeto.",
    seccion: "mirar-diferente", tipo: "prompt", salida: "texto",
    consigna: "Contá algo que pasó (real o inventado) desde el punto de vista de este objeto, como si él lo narrara.",
    inspiracion: { bancos: ["objetos"], cantidad: 1 },
    edadMin: 10, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "el-antes-y-el-despues", titulo: "El antes y el después", descripcion: "Dibujá o contá cómo era un lugar antes de un cambio que imagines.",
    seccion: "mirar-diferente", tipo: "prompt", salida: "eleccion",
    consigna: "Imaginá cómo era este lugar mucho tiempo atrás, antes de convertirse en lo que es ahora.",
    inspiracion: { bancos: ["lugares"], cantidad: 1 },
    edadMin: 8, edadMax: 99, dificultad: 2, duracion: 8, activo: true, version: 1 },

  { id: "metafora-visual", titulo: "Metáfora visual", descripcion: "Completá una metáfora de forma original y después dibujala.",
    seccion: "mirar-diferente", tipo: "prompt", salida: "eleccion",
    consigna: "Completá esta idea de la forma más original que se te ocurra: \"El tiempo es como...\" (podés cambiar \"el tiempo\" por otra cosa si querés).",
    edadMin: 10, edadMax: 99, dificultad: 3, duracion: 6, activo: true, version: 1 },

  // ═══════ 🎨 DIBUJAR ═══════
  { id: "dibuja-tu-emocion", titulo: "Dibujá lo que sentís", descripcion: "Representá con formas y colores cómo te sentís ahora.",
    seccion: "dibujar", tipo: "prompt", salida: "dibujo",
    consigna: "Sin dibujar caras ni personas: representá con formas y colores cómo te sentís ahora mismo.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 6, activo: true, version: 1 },

  { id: "dibuja-lugar-imaginario", titulo: "Dibujá un lugar imaginario", descripcion: "Dibujá un lugar al azar como te lo imagines.",
    seccion: "dibujar", tipo: "prompt", salida: "dibujo",
    consigna: "Dibujá cómo te imaginás este lugar.",
    inspiracion: { bancos: ["lugares"], cantidad: 1 },
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 8, activo: true, version: 1 },

  { id: "dibuja-objeto-fantastico", titulo: "Objeto con poder", descripcion: "Dibujá un objeto que tenga un poder mágico y contá cuál es.",
    seccion: "dibujar", tipo: "generador", motor: "combinar", bancos: ["objetos", "objetos"], salida: "dibujo",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 8, activo: true, version: 1 },

  { id: "autoretrato-fantastico", titulo: "Tu versión fantástica", descripcion: "Dibujate a vos mismo con un poder o característica fantástica.",
    seccion: "dibujar", tipo: "prompt", salida: "dibujo",
    consigna: "Dibujate a vos mismo, pero con esta característica fantástica.",
    inspiracion: { bancos: ["fantasticas"], cantidad: 1 },
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 8, activo: true, version: 1 },

  { id: "dibuja-secuencia", titulo: "Historia en tres dibujos", descripcion: "Contá una pequeña historia usando sólo tres dibujos, sin palabras.",
    seccion: "dibujar", tipo: "prompt", salida: "dibujo",
    consigna: "Pensá una historia muy corta (algo que pasa, con un principio y un final) y contala con dibujos, sin usar palabras.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 10, activo: true, version: 1 },

  { id: "dibuja-criatura-ambiente", titulo: "Criatura de un ambiente", descripcion: "Dibujá una criatura adaptada a vivir en un ambiente al azar.",
    seccion: "dibujar", tipo: "prompt", salida: "dibujo",
    consigna: "Dibujá una criatura inventada que esté hecha para vivir en este ambiente.",
    inspiracion: { bancos: ["ambientes"], cantidad: 1 },
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 8, activo: true, version: 1 },

  { id: "mandala-libre", titulo: "Patrón repetido", descripcion: "Dibujá un patrón que se repita, como un mandala, sin planearlo demasiado.",
    seccion: "dibujar", tipo: "prompt", salida: "dibujo",
    consigna: "Empezá por el centro del lienzo y dibujá formas que se repitan hacia afuera, sin planearlo mucho.",
    edadMin: 6, edadMax: 99, dificultad: 1, duracion: 10, activo: true, version: 1 },

  { id: "dibuja-textura", titulo: "Cómo se ve una textura", descripcion: "Dibujá algo usando sólo una textura como inspiración.",
    seccion: "dibujar", tipo: "prompt", salida: "dibujo",
    consigna: "Pensá en algo que tenga esta textura y dibujalo.",
    inspiracion: { bancos: ["texturas"], cantidad: 1 },
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 6, activo: true, version: 1 },

  { id: "dibuja-mundo-generador", titulo: "El mapa de tu mundo", descripcion: "Dibujá el mapa de un mundo generado al azar.",
    seccion: "dibujar", tipo: "generador", motor: "mundo", salida: "dibujo",
    edadMin: 4, edadMax: 99, dificultad: 2, duracion: 10, activo: true, version: 1 },

  // ═══════ 🎧 CREAR CON SONIDOS ═══════
  { id: "inspirado-lluvia", titulo: "Inspirado en la lluvia", descripcion: "Escuchá el sonido de lluvia generado por la Biblioteca Sonora y creá algo.",
    seccion: "sonidos", tipo: "prompt", salida: "eleccion",
    consigna: "Escuchá el sonido y creá algo (escribí o dibujá) inspirado en lo que te hace sentir o imaginar.",
    sonido: "lluvia",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 6, activo: true, version: 1 },

  { id: "inspirado-viento", titulo: "Inspirado en el viento", descripcion: "Escuchá el sonido de viento y creá algo a partir de él.",
    seccion: "sonidos", tipo: "prompt", salida: "eleccion",
    consigna: "Escuchá el sonido y creá algo (escribí o dibujá) inspirado en lo que te hace sentir o imaginar.",
    sonido: "viento",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 6, activo: true, version: 1 },

  { id: "inspirado-campana", titulo: "Inspirado en una campana", descripcion: "Escuchá el sonido de una campana y creá algo a partir de él.",
    seccion: "sonidos", tipo: "prompt", salida: "eleccion",
    consigna: "Escuchá el sonido y creá algo (escribí o dibujá) inspirado en lo que te hace sentir o imaginar.",
    sonido: "campana",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "banda-sonora-de-tu-historia", titulo: "La banda sonora de tu historia", descripcion: "Elegí un sonido de fondo y escribí mientras lo escuchás.",
    seccion: "sonidos", tipo: "prompt", salida: "texto",
    consigna: "Elegí escuchar de fondo mientras escribís lo primero que se te ocurra.",
    sonido: "ruido-rosa",
    edadMin: 9, edadMax: 99, dificultad: 2, duracion: 8, activo: true, version: 1 },

  { id: "sonido-y-color", titulo: "¿De qué color es este sonido?", descripcion: "Escuchá un sonido e inventá qué color, forma y textura tendría si pudieras verlo.",
    seccion: "sonidos", tipo: "prompt", salida: "eleccion",
    consigna: "Escuchá el sonido. Si pudiera verse, ¿de qué color, forma y textura sería? Escribilo o dibujalo.",
    sonido: "gong",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 6, activo: true, version: 1 },

  // ═══════ Migradas de Juegos (categoría "creatividad", ver commit de
  // migración) — motor "juego": usan GameEngine igual que en Juegos,
  // reproducidas desde acá vía mindfulness-item.html/creatividad-item.html
  // con window.__geVolverA. No se duplicó ni reescribió ningún archivo
  // js/juegos/*.js, sólo se movió la entrada de catálogo. ═══════
  { id: "tres-palabras", titulo: "Tres palabras", descripcion: "Creá algo (una frase, una idea) con tres palabras al azar.",
    seccion: "combinar", motor: "juego", archivo: "js/juegos/tres-palabras.js", puntuable: false,
    edadMin: 8, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "dibujo-libre", titulo: "Dibujo libre (lienzo clásico)", descripcion: "Pintá o dibujá libremente en la pantalla.",
    seccion: "dibujar", motor: "juego", archivo: "js/juegos/dibujo-libre.js", puntuable: false,
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 10, activo: true, version: 1 },

  { id: "dibuja-emocion", titulo: "Dibujá una emoción", descripcion: "Representá una emoción con formas y colores.",
    seccion: "dibujar", motor: "juego", archivo: "js/juegos/dibuja-emocion.js", puntuable: false,
    edadMin: 6, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "historia-infinita", titulo: "Historia infinita", descripcion: "Continuá una historia que nunca termina.",
    seccion: "escribir", motor: "juego", archivo: "js/juegos/historia-infinita.js", puntuable: false,
    edadMin: 8, edadMax: 99, dificultad: 1, duracion: 7, activo: true, version: 1 },

  { id: "objeto-imposible", titulo: "Objeto imposible", descripcion: "Diseñá un objeto absurdo que no podría existir.",
    seccion: "combinar", motor: "juego", archivo: "js/juegos/objeto-imposible.js", puntuable: false,
    edadMin: 8, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "collage-mental", titulo: "Collage mental", descripcion: "Combiná imágenes y conceptos sin relación aparente.",
    seccion: "imaginar", motor: "juego", archivo: "js/juegos/collage-mental.js", puntuable: false,
    edadMin: 10, edadMax: 99, dificultad: 3, duracion: 5, activo: true, version: 1 },

  { id: "metafora", titulo: "Metáfora", descripcion: "Completá metáforas de forma original.",
    seccion: "mirar-diferente", motor: "juego", archivo: "js/juegos/metafora.js", puntuable: true,
    edadMin: 12, edadMax: 99, dificultad: 3, duracion: 4, activo: true, version: 1 },

  { id: "que-ves", titulo: "¿Qué ves?", descripcion: "Interpretá formas abstractas.",
    seccion: "mirar-diferente", motor: "juego", archivo: "js/juegos/que-ves.js", puntuable: false,
    edadMin: 6, edadMax: 99, dificultad: 1, duracion: 3, activo: true, version: 1 },

  { id: "garabato", titulo: "Garabato", descripcion: "Convertí un garabato al azar en algo reconocible.",
    seccion: "dibujar", motor: "juego", archivo: "js/juegos/garabato.js", puntuable: false,
    edadMin: 6, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "final-alternativo", titulo: "Final alternativo", descripcion: "Cambiá el final de una historia conocida.",
    seccion: "escribir", motor: "juego", archivo: "js/juegos/final-alternativo.js", puntuable: false,
    edadMin: 10, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  // ═══════ 🤸 CUERPO Y ACTUACIÓN ═══════
  // Creatividad expresada con el cuerpo, no sólo en el papel: mímica,
  // juego simbólico y técnicas básicas de improvisación teatral. La
  // reflexión final (salida "texto") no reemplaza la actividad física
  // en sí —eso pasa fuera de la pantalla— sino que invita a poner en
  // palabras lo que se notó al hacerla.
  { id: "objeto-imaginario", titulo: "El objeto imaginario", descripcion: "Sostené, usá y transformá un objeto que no existe, sólo con el cuerpo.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un objeto imaginario: una pelota, una taza caliente, una cuerda pesada. Primero sostenelo con las manos, prestando atención a su peso, su tamaño y su textura — ¿es liviano o pesado? ¿frío o caliente? ¿liso o áspero? Usalo como se usaría de verdad: tomá un sorbo de la taza, tirá la pelota, tensá la cuerda. Después transformalo en otra cosa distinta sin avisar: que la pelota se vuelva un huevo a punto de romperse, que la taza se vuelva una lupa. Dejá que el cuerpo reaccione a cada cambio antes de pensarlo. Cuando termines, escribí qué objeto elegiste y en qué se transformó.",
    objetivo: "La cognición corporeizada (embodied cognition) sostiene que el pensamiento no ocurre sólo en la cabeza: mover el cuerpo de una manera específica activa circuitos motores que refuerzan la imaginación de una forma que sólo pensarlo no logra.",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "hacer-de-animal", titulo: "Convertite en un animal", descripcion: "Elegí un animal y probá moverte, mirar y reaccionar como él, no sólo imitar su sonido.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un animal — un león, un pájaro, una tortuga, lo que se te ocurra. Antes de moverte, pensá: ¿cómo pesa su cuerpo? ¿camina en cuatro patas, vuela, repta? Probá su forma de moverse por el espacio, despacio al principio. Después sumá cómo mira: ¿mira de a poco y con calma, o gira la cabeza rápido y alerta? Por último, imaginá que aparece algo que lo sorprende —un ruido, otro animal— y dejá que tu animal reaccione a su manera, no a la tuya. Cuando termines, escribí qué animal elegiste y qué fue lo más difícil de encontrarle el movimiento.",
    objetivo: "El psicólogo Lev Vygotsky señaló que el juego simbólico y el 'como si' —hacer de cuenta que algo es otra cosa— es uno de los motores principales del desarrollo cognitivo en la infancia, y sigue ejercitando la misma capacidad de abstracción en la adultez.",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 6, activo: true, version: 1 },

  { id: "caminar-como-si", titulo: "Caminar como si...", descripcion: "El mismo paseo por la habitación, pero con una condición imaginaria distinta cada vez.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá por el lugar donde estás como si el piso fuera de otra cosa: hielo resbaladizo, arena caliente, un pantano que te agarra los pies. Notá qué cambia en tu cuerpo — el largo del paso, dónde ponés el peso, la velocidad. Cuando te salga natural, cambiá la condición: ahora caminás como si tuvieras mucho apuro y no pudieras correr, o como si algo invisible te empujara desde atrás. Cuando termines, escribí cuál de las formas de caminar te resultó más fácil de sentir en el cuerpo.",
    objetivo: "Representar físicamente una idea —no sólo describirla— obliga a tomar decisiones concretas (¿cómo se mueve?, ¿qué gesto hace?) que el pensamiento abstracto puede evitar, y esa concreción es en sí misma un entrenamiento de creatividad.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "estatua-viviente", titulo: "Estatua viviente", descripcion: "Congelá el cuerpo en una pose que represente una emoción o una idea, sin usar la cara.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí una palabra: orgullo, cansancio, sorpresa, calma. Armá con todo el cuerpo —no sólo la cara— una estatua que la represente: la postura, la altura de los brazos, dónde está el peso. Sostenela unos segundos como si fuera de verdad una escultura. Después probá una segunda estatua con la palabra opuesta, y notá qué tuviste que cambiar para pasar de una a otra. Cuando termines, escribí las dos palabras que elegiste y qué fue lo que más cambió entre una estatua y la otra.",
    objetivo: "La creatividad no es un talento aislado: la investigación la describe cada vez más como una meta-habilidad que combina flexibilidad cognitiva, tolerancia a la ambigüedad y disposición a arriesgarse a equivocarse — las mismas capacidades que después se usan para resolver problemas en cualquier área.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "transformarse-en-objeto", titulo: "Transformate en un objeto", descripcion: "Tu cuerpo se convierte en un objeto que no se mueve solo, como un reloj o una fuente.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un objeto que tenga algún tipo de movimiento propio: un reloj, una fuente de agua, una puerta que se abre y cierra con el viento. Con el cuerpo entero, encontrá el movimiento característico de ese objeto — su ritmo, si es repetitivo o único, rápido o lento. No hace falta parecerse literalmente: alcanza con encontrar la lógica del movimiento y repetirla un rato. Cuando termines, escribí qué objeto elegiste y cómo describirías su ritmo en una palabra.",
    objetivo: "La cognición corporeizada (embodied cognition) sostiene que el pensamiento no ocurre sólo en la cabeza: mover el cuerpo de una manera específica activa circuitos motores que refuerzan la imaginación de una forma que sólo pensarlo no logra.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "el-gesto-sin-palabras", titulo: "El gesto sin palabras", descripcion: "Contá algo que te pasó hoy usando sólo el cuerpo y la cara, sin decir una sola palabra.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Pensá en algo breve que te haya pasado hoy: te sorprendió algo, te costó levantarte, te gustó algo que comiste. Ahora contalo entero sin usar palabras — sólo gestos, cara y movimiento. Exagerá un poco más de lo que harías normalmente: el cuerpo tiene que hacer el trabajo que suele hacer la voz. Cuando termines, escribí qué fue lo que contaste y si te costó no usar palabras.",
    objetivo: "Estudios sobre entrenamiento improvisacional (Felsman y colegas, entre otros) encontraron que practicar la improvisación teatral se asocia con menor incomodidad frente a la incertidumbre y mayor tolerancia a equivocarse en público.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "historia-sin-palabras", titulo: "Contá una historia sin palabras", descripcion: "Un inicio, un problema y un final, actuados con el cuerpo, sin decir nada.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Inventá una historia muy breve con tres partes: algo empieza bien, aparece un problema, se resuelve de alguna forma. Actuala entera con el cuerpo, sin palabras: puede ser buscar algo que se perdió, cruzar un lugar peligroso, o cualquier otra cosa que se te ocurra. Marcá bien el cambio entre las tres partes con la postura y el ritmo del movimiento. Cuando termines, escribí en una frase la historia que actuaste.",
    objetivo: "Representar físicamente una idea —no sólo describirla— obliga a tomar decisiones concretas (¿cómo se mueve?, ¿qué gesto hace?) que el pensamiento abstracto puede evitar, y esa concreción es en sí misma un entrenamiento de creatividad.",
    edadMin: 6, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "el-clima-en-el-cuerpo", titulo: "El clima en el cuerpo", descripcion: "Convertite en el clima: viento, lluvia, tormenta, y notá cómo cambia el movimiento.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un tipo de clima. Empezá siendo el viento suave: movimientos largos y livianos. Cuando quieras, subí la intensidad — el viento se vuelve tormenta, tu cuerpo se mueve más brusco y más rápido. Después bajá de nuevo, despacio, hasta quedar completamente quieto, como el silencio después de que pasó la tormenta. Cuando termines, escribí en qué momento —suave o tormenta— te resultó más fácil moverte.",
    objetivo: "El psicólogo Lev Vygotsky señaló que el juego simbólico y el 'como si' —hacer de cuenta que algo es otra cosa— es uno de los motores principales del desarrollo cognitivo en la infancia, y sigue ejercitando la misma capacidad de abstracción en la adultez.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "inventar-una-voz", titulo: "Inventá una voz y un modo de hablar", descripcion: "Un personaje inventado tiene su propia forma de moverse y de hablar: probala en voz alta.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Inventá un personaje breve: puede ser alguien muy tímido, alguien que siempre tiene apuro, un robot, un rey. Antes de decir palabras, encontrá primero cómo se mueve ese personaje — rápido o lento, con pasos grandes o chicos. Recién después agregale una forma de hablar: el tono, la velocidad, si hace pausas. Decí en voz alta alguna frase simple ('hola, ¿cómo estás?') con esa voz y ese cuerpo. Cuando termines, escribí qué personaje inventaste.",
    objetivo: "Estudios sobre entrenamiento improvisacional (Felsman y colegas, entre otros) encontraron que practicar la improvisación teatral se asocia con menor incomodidad frente a la incertidumbre y mayor tolerancia a equivocarse en público.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "cambiar-de-edad", titulo: "Caminar con otra edad", descripcion: "El mismo cuerpo, pero moviéndose como si tuviera 5 años o 90.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá por el espacio con tu edad normal un momento, notando cómo caminás habitualmente. Después probá caminar como si tuvieras 5 años: la curiosidad, la energía, las ganas de tocar todo. Cuando quieras, cambiá al otro extremo: caminá como si tuvieras 90 años, con el cuidado y el ritmo que eso pide. Notá qué tan distinto se siente ocupar el mismo espacio con otra edad en el cuerpo. Cuando termines, escribí cuál de las dos edades te resultó más fácil de encontrar.",
    objetivo: "La creatividad no es un talento aislado: la investigación la describe cada vez más como una meta-habilidad que combina flexibilidad cognitiva, tolerancia a la ambigüedad y disposición a arriesgarse a equivocarse — las mismas capacidades que después se usan para resolver problemas en cualquier área.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },
];

const CatalogoCreatividad = {
  todos: () => CREATIVIDAD_ACTIVIDADES.filter(a => a.activo),
  porId: (id) => CREATIVIDAD_ACTIVIDADES.find(a => a.id === id),
  secciones: () => CATEGORIAS_CREATIVIDAD,
  seccionPorId: (id) => CATEGORIAS_CREATIVIDAD.find(s => s.id === id),
  porSeccion: (seccionId) => CatalogoCreatividad.todos().filter(a => a.seccion === seccionId),

  /** Filtra por edad: la actividad debe solapar con el rango pedido. */
  porEdad(edad) {
    if (edad == null) return CatalogoCreatividad.todos();
    return CatalogoCreatividad.todos().filter(a => edad >= a.edadMin && edad <= a.edadMax);
  },

  filtrar({ edad, duracionMax, dificultad, seccion, estado } = {}) {
    let lista = CatalogoCreatividad.porEdad(edad);
    if (duracionMax) lista = lista.filter(a => a.duracion <= duracionMax);
    if (dificultad) lista = lista.filter(a => a.dificultad === dificultad);
    if (seccion) lista = lista.filter(a => a.seccion === seccion);
    if (estado === "favoritos") lista = lista.filter(a => Storage.esFavoritoEjercicio(a.id));
    if (estado === "realizados") lista = lista.filter(a => Storage.getProgresoEjercicio(a.id).vecesCompletado > 0);
    if (estado === "no-realizados") lista = lista.filter(a => Storage.getProgresoEjercicio(a.id).vecesCompletado === 0);
    return lista;
  },

  buscar(query, edad) {
    const q = query.trim().toLowerCase();
    const base = CatalogoCreatividad.porEdad(edad);
    if (!q) return base;
    return base.filter(a =>
      a.titulo.toLowerCase().includes(q) ||
      a.descripcion.toLowerCase().includes(q) ||
      a.seccion.toLowerCase().includes(q));
  },

  aleatorio({ edad, duracionMax } = {}) {
    const lista = CatalogoCreatividad.filtrar({ edad, duracionMax });
    const pool = lista.length ? lista : CatalogoCreatividad.porEdad(edad);
    return pool[Math.floor(Math.random() * pool.length)];
  },

  /** Actividad del día: determinística según la fecha, no cambia en cada visita. */
  delDia(edad) {
    const lista = CatalogoCreatividad.porEdad(edad);
    const hoy = new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < hoy.length; i++) hash = (hash * 31 + hoy.charCodeAt(i)) >>> 0;
    return lista[hash % lista.length];
  },
};

if (typeof module !== "undefined") module.exports = { CATEGORIAS_CREATIVIDAD, CREATIVIDAD_ACTIVIDADES, CatalogoCreatividad };
