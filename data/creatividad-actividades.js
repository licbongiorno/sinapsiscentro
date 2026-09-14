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

  { id: "la-valija-invisible", titulo: "La valija invisible", descripcion: "Armá una valija imaginaria eligiendo qué llevar y cómo entra cada cosa.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá una valija abierta en el piso. Elegí, uno por uno, tres objetos imaginarios para guardar: notá el tamaño y el peso de cada uno antes de acomodarlo. Si algo no entra, mostralo con el cuerpo — empujar, doblar, reacomodar. Cerrá la valija al final y notá si pesa mucho o poco al levantarla.",
    objetivo: "La cognición corporeizada (embodied cognition) sostiene que el pensamiento no ocurre sólo en la cabeza: mover el cuerpo de una manera específica activa circuitos motores que refuerzan la imaginación de una forma que sólo pensarlo no logra.",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "cocinar-sin-ingredientes", titulo: "Cocinar sin ingredientes", descripcion: "Prepará una comida imaginaria completa, con gestos precisos de cada paso.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un plato simple que conozcas bien. Cocinalo entero con las manos vacías: cortar, mezclar, prender el fuego, probar la sal. Tomate tu tiempo en cada paso — la precisión del gesto es lo que hace creíble el objeto invisible. Al final, serví el plato y probalo.",
    objetivo: "El psicólogo Lev Vygotsky señaló que el juego simbólico y el 'como si' —hacer de cuenta que algo es otra cosa— es uno de los motores principales del desarrollo cognitivo en la infancia, y sigue ejercitando la misma capacidad de abstracción en la adultez.",
    edadMin: 4, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "la-pared-invisible", titulo: "La pared invisible", descripcion: "Encontrá con las manos los límites de una pared que no existe.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que hay una pared justo frente a vos. Explorala con las manos: dónde empieza, qué tan alta es, si tiene una textura particular. Caminá pegado a ella buscando una puerta o un borde. El objetivo no es 'actuar' sorpresa, sino realmente construir con el tacto algo que el cuerpo pueda creer.",
    objetivo: "Estudios sobre entrenamiento improvisacional (Felsman y colegas, entre otros) encontraron que practicar la improvisación teatral se asocia con menor incomodidad frente a la incertidumbre y mayor tolerancia a equivocarse en público.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "tocar-un-instrumento-invisible", titulo: "Tocar un instrumento invisible", descripcion: "Elegí un instrumento y tocalo con la precisión de gesto que pide de verdad.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un instrumento: guitarra, batería, piano, lo que se te ocurra. Antes de 'tocarlo', pensá cómo se sostiene y dónde van exactamente las manos. Tocá una canción imaginaria completa, prestando atención al ritmo del cuerpo, no sólo de las manos.",
    objetivo: "Representar físicamente una idea —no sólo describirla— obliga a tomar decisiones concretas (¿cómo se mueve?, ¿qué gesto hace?) que el pensamiento abstracto puede evitar, y esa concreción es en sí misma un entrenamiento de creatividad.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "abrir-un-regalo-imaginario", titulo: "Abrir un regalo imaginario", descripcion: "Recibí y abrí un regalo que no existe, con la sorpresa genuina del contenido.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que te entregan una caja envueltas. Sentí su peso y su tamaño antes de abrirla. Abrila despacio — el papel, la cinta — y decidí recién en el momento de abrirla qué hay adentro, dejando que la cara reaccione de verdad a lo que 'encontrás'.",
    objetivo: "La creatividad no es un talento aislado: la investigación la describe cada vez más como una meta-habilidad que combina flexibilidad cognitiva, tolerancia a la ambigüedad y disposición a arriesgarse a equivocarse — las mismas capacidades que después se usan para resolver problemas en cualquier área.",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "la-caja-invisible", titulo: "La caja invisible", descripcion: "El clásico ejercicio de mimo: una caja cuyo tamaño y peso cambian.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá una caja frente a vos y levantala. Después, sin avisar, hacé que la próxima caja sea mucho más pesada, y la siguiente mucho más liviana. El desafío es que el cuerpo entero —no sólo los brazos— muestre el cambio de peso: las piernas, la espalda, la respiración.",
    objetivo: "El coreógrafo Rudolf Laban describió el movimiento humano según cualidades como el peso, el tiempo, el espacio y la fluidez; explorar conscientemente esas cualidades amplía el repertorio expresivo disponible, tanto en el cuerpo como en la forma de resolver problemas.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "pescar-en-el-aire", titulo: "Pescar en el aire", descripcion: "Mimá una sesión de pesca completa, desde el lanzamiento hasta el pique.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá una caña de pescar. Lanzá la línea, esperá con paciencia, y en algún momento decidí que picó algo — puede ser algo chiquito o algo enorme que casi te tira al agua. Dejá que la lucha por sacarlo se note en todo el cuerpo.",
    objetivo: "El método de Konstantin Stanislavski propone la pregunta '¿qué haría yo si esto fuera real?' como disparador de una reacción física genuina, en vez de una actuación genérica — la misma pregunta sirve para pensar problemas reales desde ángulos nuevos.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "armar-un-rompecabezas-invisible", titulo: "Armar un rompecabezas invisible", descripcion: "Encontrá y encajá piezas imaginarias, con la precisión de las manos como protagonista.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá un rompecabezas desparramado frente a vos. Elegí piezas de a una, girálas buscando dónde encajan, y encajalas con un gesto preciso cuando la encuentres. La actividad está en la atención de las manos, no en la velocidad.",
    objetivo: "La dramaterapia utiliza la representación física de emociones como una forma de procesarlas con cierta distancia segura: encarnar una emoción en un personaje o un animal permite explorarla sin la intensidad de vivirla en primera persona.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 6, activo: true, version: 1 },

  { id: "ser-un-insecto", titulo: "Ser un insecto", descripcion: "Un cuerpo chico, movimientos rápidos y angulares, muy distinto a moverse como mamífero.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un insecto: una hormiga, una araña, una mariposa. Hacé el cuerpo lo más chico posible y probá movimientos rápidos, cortos y angulares —nada de curvas largas—. Notá cómo cambia todo cuando el espacio alrededor se siente enorme en comparación con vos.",
    objetivo: "La pionera del teatro Viola Spolin diseñó juegos teatrales basados en la idea de que la espontaneidad —responder de verdad al momento, no ensayar una respuesta— es una habilidad que se entrena, no un talento innato.",
    edadMin: 4, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "ser-un-elefante", titulo: "Ser un elefante", descripcion: "Todo el peso, la lentitud y el tamaño de un animal enorme.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Convertite en un elefante: cada paso es lento y pesado, con todo el peso del cuerpo cayendo despacio. Movete por el espacio como si desplazaras mucho aire a tu alrededor. Probá también un gesto con el 'tronco' — un brazo largo que se mueve solo.",
    objetivo: "Observar o imaginar una acción activa parcialmente las mismas áreas motoras del cerebro que ejecutarla (simulación motora); por eso 'convertirse' físicamente en algo entrena la imaginación de una forma distinta —y más profunda— que sólo describirlo con palabras.",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "ser-una-serpiente", titulo: "Ser una serpiente", descripcion: "Movimiento ondulante, sin brazos ni piernas diferenciados.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Tirate al piso (si podés) o quedate de pie, pero movete sin usar brazos y piernas como partes separadas: todo el cuerpo ondula de una vez, como una sola onda que viaja de la cabeza a los pies. Es un movimiento muy distinto al caminar habitual — tomate tu tiempo para encontrarlo.",
    objetivo: "La cognición corporeizada (embodied cognition) sostiene que el pensamiento no ocurre sólo en la cabeza: mover el cuerpo de una manera específica activa circuitos motores que refuerzan la imaginación de una forma que sólo pensarlo no logra.",
    edadMin: 6, edadMax: 99, dificultad: 3, duracion: 6, activo: true, version: 1 },

  { id: "ser-un-pajaro-que-aprende-a-volar", titulo: "Un pájaro que aprende a volar", descripcion: "La torpeza inicial y la progresión hasta encontrar el vuelo.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Empezá siendo un pájaro muy chico que todavía no sabe volar bien: aleteos torpes, saltos cortos, caídas. De a poco, andá encontrando más control — aleteos más largos, más altura, hasta que el movimiento se sienta como un vuelo real. No apures la transición.",
    objetivo: "El psicólogo Lev Vygotsky señaló que el juego simbólico y el 'como si' —hacer de cuenta que algo es otra cosa— es uno de los motores principales del desarrollo cognitivo en la infancia, y sigue ejercitando la misma capacidad de abstracción en la adultez.",
    edadMin: 4, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "ser-un-gato", titulo: "Ser un gato", descripcion: "Sigilo, elegancia y momentos de pereza absoluta, todo en el mismo animal.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Convertite en un gato: movete con sigilo, cada paso cuidadoso y silencioso. En algún momento, decidí estirarte entero como hacen los gatos, y después quedate completamente quieto y relajado, como si te tiraras a dormir al sol.",
    objetivo: "Estudios sobre entrenamiento improvisacional (Felsman y colegas, entre otros) encontraron que practicar la improvisación teatral se asocia con menor incomodidad frente a la incertidumbre y mayor tolerancia a equivocarse en público.",
    edadMin: 3, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "la-manada", titulo: "La manada", descripcion: "Un animal que reacciona a un grupo imaginario a su alrededor.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un animal que viva en grupo: lobos, elefantes, pájaros. Movete como si el resto de la manada estuviera cerca tuyo, aunque no la veas — reaccioná a sonidos que 'hacen' los demás, seguí una dirección como si te movieras con ellos. La manada está en tu imaginación, pero tiene que sentirse presente.",
    objetivo: "Representar físicamente una idea —no sólo describirla— obliga a tomar decisiones concretas (¿cómo se mueve?, ¿qué gesto hace?) que el pensamiento abstracto puede evitar, y esa concreción es en sí misma un entrenamiento de creatividad.",
    edadMin: 6, edadMax: 99, dificultad: 3, duracion: 6, activo: true, version: 1 },

  { id: "animal-que-se-esconde", titulo: "Animal que se esconde", descripcion: "El sigilo y el miedo de un animal que necesita pasar desapercibido.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un animal pequeño que suele esconderse de otros más grandes. Movete por el espacio buscando refugio, atento a cualquier señal de peligro imaginario. Notá cómo cambia la respiración y la postura cuando un animal necesita no ser visto.",
    objetivo: "La creatividad no es un talento aislado: la investigación la describe cada vez más como una meta-habilidad que combina flexibilidad cognitiva, tolerancia a la ambigüedad y disposición a arriesgarse a equivocarse — las mismas capacidades que después se usan para resolver problemas en cualquier área.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "caminar-el-orgullo", titulo: "Caminar el orgullo", descripcion: "La misma caminata, pero llevada por el pecho en vez de por los pies.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá por el espacio dejando que el orgullo lidere: el pecho un poco más adelante, la mirada alta, pasos seguros. No hace falta exagerar como caricatura — buscá la versión más real que puedas encontrar en tu propio cuerpo.",
    objetivo: "El coreógrafo Rudolf Laban describió el movimiento humano según cualidades como el peso, el tiempo, el espacio y la fluidez; explorar conscientemente esas cualidades amplía el repertorio expresivo disponible, tanto en el cuerpo como en la forma de resolver problemas.",
    edadMin: 6, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "caminar-la-verguenza", titulo: "Caminar la vergüenza", descripcion: "El cuerpo que quiere ocupar menos espacio y no ser visto.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá como si sintieras mucha vergüenza: los hombros que se encogen un poco, la mirada que busca el piso, pasos más cortos y dudosos. Notá qué partes del cuerpo se achican primero.",
    objetivo: "El método de Konstantin Stanislavski propone la pregunta '¿qué haría yo si esto fuera real?' como disparador de una reacción física genuina, en vez de una actuación genérica — la misma pregunta sirve para pensar problemas reales desde ángulos nuevos.",
    edadMin: 6, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "caminar-la-euforia", titulo: "Caminar la euforia", descripcion: "Una alegría tan grande que el cuerpo no puede contenerla en un paso normal.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá como si acabaras de recibir la mejor noticia posible. Dejá que la euforia se escape por donde quiera: un salto extra, los brazos que se abren, un ritmo más rápido de lo normal. El objetivo es que el cuerpo entero cuente la alegría, no sólo la cara.",
    objetivo: "La dramaterapia utiliza la representación física de emociones como una forma de procesarlas con cierta distancia segura: encarnar una emoción en un personaje o un animal permite explorarla sin la intensidad de vivirla en primera persona.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "caminar-cargando-un-peso-invisible", titulo: "Caminar cargando un peso invisible", descripcion: "Un peso que no se ve, pero que cambia por completo la forma de moverse.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que cargás algo muy pesado — una mochila, una bolsa, lo que sea — aunque tus manos estén vacías. Notá cómo cambia el centro de gravedad, la velocidad del paso, la respiración. Después, 'soltá' el peso de golpe y notá la diferencia inmediata.",
    objetivo: "La pionera del teatro Viola Spolin diseñó juegos teatrales basados en la idea de que la espontaneidad —responder de verdad al momento, no ensayar una respuesta— es una habilidad que se entrena, no un talento innato.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "caminar-con-una-pierna-lastimada", titulo: "Caminar con una pierna lastimada", descripcion: "Un pequeño cambio físico que obliga a reinventar todo el paso.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá como si una pierna te doliera un poco, sin exagerar hasta la caricatura. Notá cómo el resto del cuerpo compensa ese cambio — los brazos, la espalda, el ritmo. Es un buen ejercicio para ver cuántas partes del cuerpo participan en algo tan simple como caminar.",
    objetivo: "Observar o imaginar una acción activa parcialmente las mismas áreas motoras del cerebro que ejecutarla (simulación motora); por eso 'convertirse' físicamente en algo entrena la imaginación de una forma distinta —y más profunda— que sólo describirlo con palabras.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "caminar-en-puntas-de-pie", titulo: "Caminar en puntas de pie", descripcion: "Todo el peso reorganizado hacia arriba y hacia adelante.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá en puntas de pie por un rato, prestando atención a cómo se reorganiza el equilibrio: las piernas, los brazos que buscan balance, la respiración más contenida. Después volvé a apoyar el pie entero y notá el contraste inmediato.",
    objetivo: "La cognición corporeizada (embodied cognition) sostiene que el pensamiento no ocurre sólo en la cabeza: mover el cuerpo de una manera específica activa circuitos motores que refuerzan la imaginación de una forma que sólo pensarlo no logra.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "caminar-hacia-atras", titulo: "Caminar hacia atrás", descripcion: "El mismo espacio, pero sin ver hacia dónde vas.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá hacia atrás por un rato, con cuidado. Notá cómo cambian los otros sentidos cuando la vista no puede anticipar el camino — el tacto de los pies, el oído, la sensación de inseguridad. Es un buen disparador para pensar distinto: literalmente mirás de dónde venís, no hacia dónde vas.",
    objetivo: "El psicólogo Lev Vygotsky señaló que el juego simbólico y el 'como si' —hacer de cuenta que algo es otra cosa— es uno de los motores principales del desarrollo cognitivo en la infancia, y sigue ejercitando la misma capacidad de abstracción en la adultez.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 4, activo: true, version: 1 },

  { id: "caminar-como-si-flotaras", titulo: "Caminar como si flotaras", descripcion: "El peso del cuerpo casi desaparece.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá imaginando que tu cuerpo pesa mucho menos de lo normal, casi como si flotaras un poco en cada paso. Buscá que las rodillas y los tobillos absorban menos impacto, como en la gravedad de la luna.",
    objetivo: "Estudios sobre entrenamiento improvisacional (Felsman y colegas, entre otros) encontraron que practicar la improvisación teatral se asocia con menor incomodidad frente a la incertidumbre y mayor tolerancia a equivocarse en público.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "caminar-contra-el-viento", titulo: "Caminar contra el viento", descripcion: "Un viento imaginario muy fuerte que empuja en contra de cada paso.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá como si un viento fuerte soplara justo en contra tuyo. Inclinate hacia adelante, hacé que cada paso cueste un esfuerzo real. En algún momento, el viento puede parar de golpe — notá cómo reacciona el cuerpo al esfuerzo que de repente ya no hace falta.",
    objetivo: "Representar físicamente una idea —no sólo describirla— obliga a tomar decisiones concretas (¿cómo se mueve?, ¿qué gesto hace?) que el pensamiento abstracto puede evitar, y esa concreción es en sí misma un entrenamiento de creatividad.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "caminar-recien-desperto", titulo: "Caminar recién despierto", descripcion: "El cuerpo todavía medio dormido, antes del primer café.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá como si te acabaras de despertar: los movimientos más lentos, los ojos entrecerrados, el equilibrio un poco torpe todavía. De a poco, dejá que el cuerpo 'despierte' completamente, hasta volver a tu forma habitual de caminar.",
    objetivo: "La creatividad no es un talento aislado: la investigación la describe cada vez más como una meta-habilidad que combina flexibilidad cognitiva, tolerancia a la ambigüedad y disposición a arriesgarse a equivocarse — las mismas capacidades que después se usan para resolver problemas en cualquier área.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "fotografia-congelada", titulo: "Fotografía congelada", descripcion: "Congelá un momento de una historia como si fuera una foto.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Pensá en un momento concreto de una historia (real o inventada): el instante justo antes de un gol, el momento de abrir una puerta importante. Armá con el cuerpo esa 'foto' exacta y sostenela unos segundos, como si alguien la fuera a mirar después.",
    objetivo: "El coreógrafo Rudolf Laban describió el movimiento humano según cualidades como el peso, el tiempo, el espacio y la fluidez; explorar conscientemente esas cualidades amplía el repertorio expresivo disponible, tanto en el cuerpo como en la forma de resolver problemas.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "estatuas-que-cambian", titulo: "Estatuas que cambian", descripcion: "Pasar de una estatua a otra sin pensarlo de antemano.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Armá una primera estatua con el cuerpo, la que se te ocurra. Sostenela unos segundos, y después dejá que el cuerpo encuentre solo la siguiente estatua, sin planearla antes. Repetilo varias veces, dejando que una forma lleve naturalmente a la otra.",
    objetivo: "El método de Konstantin Stanislavski propone la pregunta '¿qué haría yo si esto fuera real?' como disparador de una reacción física genuina, en vez de una actuación genérica — la misma pregunta sirve para pensar problemas reales desde ángulos nuevos.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "el-museo-de-esculturas", titulo: "El museo de esculturas", descripcion: "Varias estatuas distintas unidas por un mismo tema.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un tema simple: el trabajo, la familia, el deporte. Armá tres estatuas distintas relacionadas con ese tema, sosteniendo cada una unos segundos antes de pasar a la siguiente. Al final, pensá cuál de las tres te costó más encontrar.",
    objetivo: "La dramaterapia utiliza la representación física de emociones como una forma de procesarlas con cierta distancia segura: encarnar una emoción en un personaje o un animal permite explorarla sin la intensidad de vivirla en primera persona.",
    edadMin: 6, edadMax: 99, dificultad: 3, duracion: 7, activo: true, version: 1 },

  { id: "congelar-al-sonido", titulo: "Congelar al sonido", descripcion: "Moverse libremente y congelarse ante una señal imaginaria.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Movete libremente por el espacio, sin rumbo fijo. Elegí un número —por ejemplo, contar mentalmente hasta diez— y en ese momento congelate por completo, como si la música se hubiera detenido de golpe. Quedate en esa postura exacta unos segundos antes de volver a moverte.",
    objetivo: "La pionera del teatro Viola Spolin diseñó juegos teatrales basados en la idea de que la espontaneidad —responder de verdad al momento, no ensayar una respuesta— es una habilidad que se entrena, no un talento innato.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "la-postura-opuesta", titulo: "La postura opuesta", descripcion: "Encontrar la postura físicamente opuesta a la que tenés ahora mismo.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Fijate en cómo está tu cuerpo en este momento: la postura, la tensión, la posición de los brazos. Ahora armá la postura más opuesta que puedas imaginar — si estás encorvado, buscá lo más erguido posible; si estás cerrado, buscá lo más abierto. Notá qué se siente distinto, no sólo visualmente.",
    objetivo: "Observar o imaginar una acción activa parcialmente las mismas áreas motoras del cerebro que ejecutarla (simulación motora); por eso 'convertirse' físicamente en algo entrena la imaginación de una forma distinta —y más profunda— que sólo describirlo con palabras.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 4, activo: true, version: 1 },

  { id: "el-objeto-cobra-vida", titulo: "El objeto cobra vida", descripcion: "Un objeto cotidiano se anima y tiene su propia personalidad.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí un objeto de tu casa: una silla, una lámpara, un reloj de pared. Imaginá que tiene personalidad propia y movete como si fueras ese objeto cobrando vida por primera vez — ¿es tímido, curioso, cascarrabias? Dejá que la personalidad se note en cómo se mueve, no sólo en cómo se ve.",
    objetivo: "La cognición corporeizada (embodied cognition) sostiene que el pensamiento no ocurre sólo en la cabeza: mover el cuerpo de una manera específica activa circuitos motores que refuerzan la imaginación de una forma que sólo pensarlo no logra.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "el-reloj-humano", titulo: "El reloj humano", descripcion: "El cuerpo se convierte en las agujas de un reloj.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Con los brazos, representá las agujas de un reloj marcando distintas horas. Después, hacé que todo el cuerpo se convierta en el mecanismo: un movimiento repetitivo y preciso, como un tic-tac que nunca se detiene del todo.",
    objetivo: "El psicólogo Lev Vygotsky señaló que el juego simbólico y el 'como si' —hacer de cuenta que algo es otra cosa— es uno de los motores principales del desarrollo cognitivo en la infancia, y sigue ejercitando la misma capacidad de abstracción en la adultez.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "la-marioneta", titulo: "La marioneta", descripcion: "Moverse como si hilos invisibles tiraran de cada parte del cuerpo.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que tenés hilos invisibles atados a las muñecas, la cabeza y las rodillas. Movete como si alguien más tirara de esos hilos desde arriba — el movimiento no nace de vos, nace de afuera. Probá qué pasa si un solo hilo (por ejemplo, el de la cabeza) tira más fuerte que los demás.",
    objetivo: "Estudios sobre entrenamiento improvisacional (Felsman y colegas, entre otros) encontraron que practicar la improvisación teatral se asocia con menor incomodidad frente a la incertidumbre y mayor tolerancia a equivocarse en público.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "cortar-los-hilos", titulo: "Cortar los hilos", descripcion: "De marioneta rígida a cuerpo completamente suelto, técnica de relajación.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Empezá como una marioneta, con el cuerpo tenso y controlado desde afuera por hilos imaginarios. De a uno, 'cortá' cada hilo (los brazos, después las piernas, después la cabeza) y dejá que esa parte caiga suelta, sin control. Al final, todo el cuerpo debería quedar completamente relajado.",
    objetivo: "Representar físicamente una idea —no sólo describirla— obliga a tomar decisiones concretas (¿cómo se mueve?, ¿qué gesto hace?) que el pensamiento abstracto puede evitar, y esa concreción es en sí misma un entrenamiento de creatividad.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "el-robot-y-el-humano", titulo: "El robot y el humano", descripcion: "Alternar entre movimiento mecánico y movimiento fluido, sin transición gradual.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Movete como un robot: articulaciones marcadas, movimientos rectos y cortados. En un momento elegido por vos, cambiá de golpe a movimiento completamente humano y fluido, sin transición. Alterná varias veces entre los dos extremos.",
    objetivo: "La creatividad no es un talento aislado: la investigación la describe cada vez más como una meta-habilidad que combina flexibilidad cognitiva, tolerancia a la ambigüedad y disposición a arriesgarse a equivocarse — las mismas capacidades que después se usan para resolver problemas en cualquier área.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "la-persecucion-imaginaria", titulo: "La persecución imaginaria", descripcion: "Mimar una persecución completa, con tensión creciente y resolución.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que alguien o algo te persigue. Armá la escena completa: el momento en que lo notás, la huida, algún obstáculo en el camino, y un final —lográs escapar, o te alcanzan, lo que se te ocurra. Marcá bien el cambio de ritmo entre el susto inicial y la resolución.",
    objetivo: "El coreógrafo Rudolf Laban describió el movimiento humano según cualidades como el peso, el tiempo, el espacio y la fluidez; explorar conscientemente esas cualidades amplía el repertorio expresivo disponible, tanto en el cuerpo como en la forma de resolver problemas.",
    edadMin: 6, edadMax: 99, dificultad: 3, duracion: 7, activo: true, version: 1 },

  { id: "la-entrada-a-la-fiesta", titulo: "La entrada a la fiesta", descripcion: "Entrar al mismo lugar imaginario como tres personajes distintos.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá la puerta de una fiesta. Entrá como una persona tímida que no conoce a nadie. Volvé a la puerta y entrá de nuevo, esta vez como alguien muy seguro de sí mismo. Una tercera vez, entrá como alguien que llega tarde y apurado. Notá cuánto cambia solamente la forma de entrar.",
    objetivo: "El método de Konstantin Stanislavski propone la pregunta '¿qué haría yo si esto fuera real?' como disparador de una reacción física genuina, en vez de una actuación genérica — la misma pregunta sirve para pensar problemas reales desde ángulos nuevos.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "el-objeto-perdido", titulo: "El objeto perdido", descripcion: "Buscar algo importante con desesperación creciente hasta encontrarlo.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que perdiste algo importante —las llaves, algo de mucho valor— justo antes de salir. Actuá la búsqueda completa: revisar bolsillos, mover cosas, la desesperación que va creciendo, y el alivio final de encontrarlo (o la frustración de no encontrarlo).",
    objetivo: "La dramaterapia utiliza la representación física de emociones como una forma de procesarlas con cierta distancia segura: encarnar una emoción en un personaje o un animal permite explorarla sin la intensidad de vivirla en primera persona.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "cruzar-un-lugar-peligroso", titulo: "Cruzar un lugar peligroso", descripcion: "Atravesar un espacio imaginario lleno de obstáculos, con cuidado extremo.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que tenés que cruzar un lugar lleno de obstáculos peligrosos: un puente que se tambalea, un piso con trampas, lava imaginaria. Cruzalo con el cuidado real que la situación pediría, prestando atención a dónde apoyás cada paso.",
    objetivo: "La pionera del teatro Viola Spolin diseñó juegos teatrales basados en la idea de que la espontaneidad —responder de verdad al momento, no ensayar una respuesta— es una habilidad que se entrena, no un talento innato.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "la-pelea-en-camara-lenta", titulo: "La pelea en cámara lenta", descripcion: "Una secuencia de acción coreografiada en cámara lenta, sin contacto real.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá una escena de acción —esquivar algo, saltar, reaccionar a un golpe imaginario— y actuala entera en cámara lenta extrema, como en las películas. La clave es mantener el control del movimiento incluso yendo despacio: nada se cae por accidente, todo es una decisión.",
    objetivo: "Observar o imaginar una acción activa parcialmente las mismas áreas motoras del cerebro que ejecutarla (simulación motora); por eso 'convertirse' físicamente en algo entrena la imaginación de una forma distinta —y más profunda— que sólo describirlo con palabras.",
    edadMin: 8, edadMax: 99, dificultad: 3, duracion: 7, activo: true, version: 1 },

  { id: "el-encuentro-inesperado", titulo: "El encuentro inesperado", descripcion: "Reaccionar físicamente a encontrarte con alguien que no esperabas ver.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que caminás tranquilo y de repente te encontrás con alguien que hace mucho no veías —puede ser alguien que extrañás o alguien con quien tenés un conflicto sin resolver—. Dejá que el cuerpo reaccione primero, antes de decidir qué 'dirías'.",
    objetivo: "La cognición corporeizada (embodied cognition) sostiene que el pensamiento no ocurre sólo en la cabeza: mover el cuerpo de una manera específica activa circuitos motores que refuerzan la imaginación de una forma que sólo pensarlo no logra.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "bajo-el-agua", titulo: "Bajo el agua", descripcion: "El cuerpo entero se mueve con la resistencia y la lentitud del agua.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Movete como si estuvieras completamente bajo el agua: cada movimiento encuentra resistencia, todo es más lento y flotante de lo normal. Probá 'nadar' de un lado al otro del espacio, y notá cómo hasta girar la cabeza se siente distinto.",
    objetivo: "El psicólogo Lev Vygotsky señaló que el juego simbólico y el 'como si' —hacer de cuenta que algo es otra cosa— es uno de los motores principales del desarrollo cognitivo en la infancia, y sigue ejercitando la misma capacidad de abstracción en la adultez.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "en-el-espacio", titulo: "En el espacio", descripcion: "Gravedad cero: el cuerpo flota sin control total sobre sus movimientos.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que estás flotando en gravedad cero. Cada empujón que le das al aire te mueve en una dirección; no podés simplemente 'caminar'. Explorá el espacio empujándote desde distintas partes del cuerpo, como haría un astronauta.",
    objetivo: "Estudios sobre entrenamiento improvisacional (Felsman y colegas, entre otros) encontraron que practicar la improvisación teatral se asocia con menor incomodidad frente a la incertidumbre y mayor tolerancia a equivocarse en público.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "en-el-desierto", titulo: "En el desierto", descripcion: "El calor extremo y la sed transformando cada movimiento.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que caminás por un desierto muy caluroso, con mucha sed. Dejá que el calor pese en el cuerpo: los movimientos más lentos, la búsqueda de sombra, el esfuerzo de seguir caminando. Notá qué gesto usarías para pedir o buscar agua.",
    objetivo: "Representar físicamente una idea —no sólo describirla— obliga a tomar decisiones concretas (¿cómo se mueve?, ¿qué gesto hace?) que el pensamiento abstracto puede evitar, y esa concreción es en sí misma un entrenamiento de creatividad.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "en-la-selva", titulo: "En la selva", descripcion: "Abrirse paso entre vegetación imaginaria muy densa.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que caminás por una selva espesa. Abrite paso con los brazos entre ramas y hojas imaginarias, prestando atención a dónde pisás por si hay raíces o barro. Agregá algún sonido lejano de animal que te haga girar la cabeza con curiosidad o alerta.",
    objetivo: "La creatividad no es un talento aislado: la investigación la describe cada vez más como una meta-habilidad que combina flexibilidad cognitiva, tolerancia a la ambigüedad y disposición a arriesgarse a equivocarse — las mismas capacidades que después se usan para resolver problemas en cualquier área.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "la-ciudad-con-apuro", titulo: "La ciudad con apuro", descripcion: "Moverse como parte de una multitud apurada, sin chocar con nadie imaginario.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que caminás por una vereda muy concurrida, todos con apuro. Movete rápido pero esquivando gente imaginaria, cambiando de dirección, revisando la hora. Notá cómo se siente el cuerpo cuando el ritmo lo marca el entorno y no vos.",
    objetivo: "El coreógrafo Rudolf Laban describió el movimiento humano según cualidades como el peso, el tiempo, el espacio y la fluidez; explorar conscientemente esas cualidades amplía el repertorio expresivo disponible, tanto en el cuerpo como en la forma de resolver problemas.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "derretirse-como-el-hielo", titulo: "Derretirse como el hielo", descripcion: "De un cuerpo completamente rígido y congelado a uno líquido y fluido.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Empezá parado, completamente rígido, como un bloque de hielo. De a poco, empezá a 'derretirte': primero se afloja una parte (los hombros, por ejemplo), después otra, hasta que todo el cuerpo termina en el piso, líquido y sin tensión. Hacelo lo más despacio que puedas.",
    objetivo: "El método de Konstantin Stanislavski propone la pregunta '¿qué haría yo si esto fuera real?' como disparador de una reacción física genuina, en vez de una actuación genérica — la misma pregunta sirve para pensar problemas reales desde ángulos nuevos.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "la-voz-gigante", titulo: "La voz gigante", descripcion: "Un personaje enorme, con una voz y un cuerpo que ocupan mucho espacio.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Inventá un personaje gigante — un gigante de cuento, un monstruo amigable. Encontrá primero cómo se mueve algo tan grande: pasos lentos y pesados. Después agregale una voz grave y potente, y decí una frase simple con esa voz y ese cuerpo.",
    objetivo: "La dramaterapia utiliza la representación física de emociones como una forma de procesarlas con cierta distancia segura: encarnar una emoción en un personaje o un animal permite explorarla sin la intensidad de vivirla en primera persona.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "la-voz-diminuta", titulo: "La voz diminuta", descripcion: "Un personaje muy pequeño, con una voz y movimientos a su medida.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Inventá un personaje diminuto — un hada, un ratón con personalidad, un duende. Encontrá cómo se mueve algo tan chico: pasos cortos y rápidos, quizás con miedo a ser pisado. Sumale una voz aguda y rápida, y probá una frase con ese personaje.",
    objetivo: "La pionera del teatro Viola Spolin diseñó juegos teatrales basados en la idea de que la espontaneidad —responder de verdad al momento, no ensayar una respuesta— es una habilidad que se entrena, no un talento innato.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "el-acento-inventado", titulo: "El acento inventado", descripcion: "Un acento completamente nuevo que no existe en ningún idioma real.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Inventá un acento que no exista: una forma particular de estirar las vocales, cortar las palabras, o cambiar el ritmo al hablar. Decí una frase corta con ese acento varias veces, hasta que se sienta consistente, como si fuera de verdad.",
    objetivo: "Observar o imaginar una acción activa parcialmente las mismas áreas motoras del cerebro que ejecutarla (simulación motora); por eso 'convertirse' físicamente en algo entrena la imaginación de una forma distinta —y más profunda— que sólo describirlo con palabras.",
    edadMin: 8, edadMax: 99, dificultad: 3, duracion: 5, activo: true, version: 1 },

  { id: "hablar-en-idioma-inventado", titulo: "Hablar en idioma inventado", descripcion: "Gibberish: sonidos inventados que igual comunican una emoción clara.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí una emoción simple: alegría, enojo, sorpresa. 'Hablá' usando sólo sonidos inventados, sin palabras reales, pero manteniendo esa emoción bien clara en el tono y el cuerpo. El desafío es que se entienda el sentimiento aunque no se entienda ni una palabra.",
    objetivo: "La cognición corporeizada (embodied cognition) sostiene que el pensamiento no ocurre sólo en la cabeza: mover el cuerpo de una manera específica activa circuitos motores que refuerzan la imaginación de una forma que sólo pensarlo no logra.",
    edadMin: 6, edadMax: 99, dificultad: 3, duracion: 5, activo: true, version: 1 },

  { id: "el-personaje-que-siempre-tiene-apuro", titulo: "El personaje que siempre tiene apuro", descripcion: "Un personaje entero construido alrededor de una sola característica.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Inventá un personaje que siempre, en todo momento, tiene apuro. Encontrá cómo camina, cómo habla (rápido, cortando palabras), y cómo reacciona si algo lo hace esperar. Sostené ese personaje mientras hacés alguna tarea simple imaginaria, como buscar algo en una cartera.",
    objetivo: "El psicólogo Lev Vygotsky señaló que el juego simbólico y el 'como si' —hacer de cuenta que algo es otra cosa— es uno de los motores principales del desarrollo cognitivo en la infancia, y sigue ejercitando la misma capacidad de abstracción en la adultez.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "el-personaje-muy-formal", titulo: "El personaje muy formal", descripcion: "Un personaje excesivamente correcto y ceremonioso en todo lo que hace.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Inventá un personaje extremadamente formal y ceremonioso — habla despacio, elige bien las palabras, hace reverencias pequeñas. Saludá a alguien imaginario con ese personaje, y notá cómo hasta un gesto simple como sentarse cambia por completo.",
    objetivo: "Estudios sobre entrenamiento improvisacional (Felsman y colegas, entre otros) encontraron que practicar la improvisación teatral se asocia con menor incomodidad frente a la incertidumbre y mayor tolerancia a equivocarse en público.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 6, activo: true, version: 1 },

  { id: "cambiar-de-personaje-en-un-segundo", titulo: "Cambiar de personaje en un segundo", descripcion: "Una transición instantánea entre dos personajes muy distintos.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Elegí dos personajes bien distintos —por ejemplo, alguien muy tímido y alguien muy seguro—. Armá el primero con cuerpo y voz. Contá mentalmente 'tres, dos, uno' y cambiá de golpe al segundo personaje, sin transición gradual. Repetí el cambio varias veces, cada vez más rápido.",
    objetivo: "Representar físicamente una idea —no sólo describirla— obliga a tomar decisiones concretas (¿cómo se mueve?, ¿qué gesto hace?) que el pensamiento abstracto puede evitar, y esa concreción es en sí misma un entrenamiento de creatividad.",
    edadMin: 7, edadMax: 99, dificultad: 3, duracion: 6, activo: true, version: 1 },

  { id: "la-entrevista-imaginaria", titulo: "La entrevista imaginaria", descripcion: "Responder preguntas imaginarias completamente en personaje.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Inventá un personaje con una profesión o característica particular —un explorador, un chef famoso, un superhéroe jubilado. Imaginá que alguien te hace preguntas ('¿cómo fue tu día?', '¿qué es lo más difícil de tu trabajo?') y respondé en voz alta, entero en personaje, con su forma de hablar y moverse.",
    objetivo: "La creatividad no es un talento aislado: la investigación la describe cada vez más como una meta-habilidad que combina flexibilidad cognitiva, tolerancia a la ambigüedad y disposición a arriesgarse a equivocarse — las mismas capacidades que después se usan para resolver problemas en cualquier área.",
    edadMin: 7, edadMax: 99, dificultad: 3, duracion: 7, activo: true, version: 1 },

  { id: "crecer-como-una-planta", titulo: "Crecer como una planta", descripcion: "El clásico ejercicio de teatro: de semilla enterrada a planta en flor.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Empezá hecho un ovillo en el piso (o lo más encogido posible si estás sentado), como una semilla. De a poco, empezá a 'crecer': primero un brote pequeño que se asoma, después un tallo que se estira, hasta terminar completamente abierto, como una planta en flor estirándose hacia el sol.",
    objetivo: "El coreógrafo Rudolf Laban describió el movimiento humano según cualidades como el peso, el tiempo, el espacio y la fluidez; explorar conscientemente esas cualidades amplía el repertorio expresivo disponible, tanto en el cuerpo como en la forma de resolver problemas.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 6, activo: true, version: 1 },

  { id: "el-globo-que-se-infla", titulo: "El globo que se infla", descripcion: "Inflar y desinflar el cuerpo entero con la respiración.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Empezá con el cuerpo lo más 'desinflado' posible — encogido, sin aire. Con cada inhalación, dejá que el cuerpo se vaya 'inflando' un poco más: se estira, ocupa más espacio, se pone tenso como un globo lleno. Con la exhalación, desinflate de nuevo, hasta quedar otra vez chiquito.",
    objetivo: "El método de Konstantin Stanislavski propone la pregunta '¿qué haría yo si esto fuera real?' como disparador de una reacción física genuina, en vez de una actuación genérica — la misma pregunta sirve para pensar problemas reales desde ángulos nuevos.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "la-ola-en-el-cuerpo", titulo: "La ola en el cuerpo", descripcion: "Un impulso físico que viaja de una punta del cuerpo a la otra.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Iniciá un movimiento pequeño en una mano, como una ola que empieza ahí. Dejá que ese impulso viaje: de la mano al brazo, al hombro, al torso, hasta salir por el otro lado del cuerpo. Repetilo iniciando la ola desde distintos lugares: un pie, la cabeza, la cadera.",
    objetivo: "La dramaterapia utiliza la representación física de emociones como una forma de procesarlas con cierta distancia segura: encarnar una emoción en un personaje o un animal permite explorarla sin la intensidad de vivirla en primera persona.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "de-bebe-a-anciano", titulo: "De bebé a anciano", descripcion: "Una secuencia continua que atraviesa todas las edades de la vida en un solo movimiento.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Empezá en el piso, moviéndote como un bebé que recién aprende a moverse. De a poco andá 'creciendo': gateá, después caminá como un niño, después con la seguridad de un adulto, hasta terminar caminando despacio y con cuidado como una persona muy mayor. Tomate el tiempo que necesites entre cada etapa.",
    objetivo: "La pionera del teatro Viola Spolin diseñó juegos teatrales basados en la idea de que la espontaneidad —responder de verdad al momento, no ensayar una respuesta— es una habilidad que se entrena, no un talento innato.",
    edadMin: 6, edadMax: 99, dificultad: 3, duracion: 8, activo: true, version: 1 },

  { id: "despertar-en-camara-lenta", titulo: "Despertar en cámara lenta", descripcion: "De dormido profundo a completamente despierto, en etapas bien marcadas.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Empezá acostado o lo más relajado posible, como si durmieras profundo. Despertate en etapas bien diferenciadas: primero un pequeño movimiento involuntario, después abrir los ojos de a poco, después estirar el cuerpo, hasta terminar completamente despierto y de pie.",
    objetivo: "Observar o imaginar una acción activa parcialmente las mismas áreas motoras del cerebro que ejecutarla (simulación motora); por eso 'convertirse' físicamente en algo entrena la imaginación de una forma distinta —y más profunda— que sólo describirlo con palabras.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 5, activo: true, version: 1 },

  { id: "caminar-con-autoridad", titulo: "Caminar con autoridad", descripcion: "El status alto: ocupar espacio como si el lugar te perteneciera.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá por el espacio como si fueras la persona más importante del lugar: pasos seguros, la mirada al frente, sin apuro porque nadie te va a apurar. Notá cómo cambia la relación con el espacio cuando el cuerpo asume que tiene derecho a estar ahí.",
    objetivo: "La cognición corporeizada (embodied cognition) sostiene que el pensamiento no ocurre sólo en la cabeza: mover el cuerpo de una manera específica activa circuitos motores que refuerzan la imaginación de una forma que sólo pensarlo no logra.",
    edadMin: 7, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "caminar-pidiendo-permiso", titulo: "Caminar pidiendo permiso", descripcion: "El status bajo: moverse como si ocupar espacio fuera una molestia.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Caminá como si sintieras que estás de más en cualquier lugar donde estás: pasos más pequeños, el cuerpo que busca ocupar menos espacio, la mirada que evita cruzarse con otras. Notá qué parte del cuerpo se encoge primero.",
    objetivo: "El psicólogo Lev Vygotsky señaló que el juego simbólico y el 'como si' —hacer de cuenta que algo es otra cosa— es uno de los motores principales del desarrollo cognitivo en la infancia, y sigue ejercitando la misma capacidad de abstracción en la adultez.",
    edadMin: 7, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "cambiar-de-status", titulo: "Cambiar de status", descripcion: "Pasar de un extremo de status al otro en la misma caminata.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Empezá caminando con el status más alto que puedas encontrar (ver 'Caminar con autoridad'). En algún punto del recorrido, cambiá de golpe al status más bajo posible. Notá qué gestos concretos tuviste que cambiar para que se note la diferencia.",
    objetivo: "Estudios sobre entrenamiento improvisacional (Felsman y colegas, entre otros) encontraron que practicar la improvisación teatral se asocia con menor incomodidad frente a la incertidumbre y mayor tolerancia a equivocarse en público.",
    edadMin: 8, edadMax: 99, dificultad: 3, duracion: 6, activo: true, version: 1 },

  { id: "el-jefe-y-el-empleado", titulo: "El jefe y el empleado", descripcion: "Interpretar dos roles de una misma escena, alternando cuerpo y voz.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá una escena corta entre un jefe y un empleado —por ejemplo, pedir un aumento—. Actuá primero el papel del jefe: postura, tono de voz, forma de moverse. Después, la misma escena desde el papel del empleado. Notá qué tuviste que cambiar en el cuerpo, no sólo en lo que 'decís'.",
    objetivo: "Representar físicamente una idea —no sólo describirla— obliga a tomar decisiones concretas (¿cómo se mueve?, ¿qué gesto hace?) que el pensamiento abstracto puede evitar, y esa concreción es en sí misma un entrenamiento de creatividad.",
    edadMin: 8, edadMax: 99, dificultad: 3, duracion: 7, activo: true, version: 1 },

  { id: "cuerpo-de-gelatina", titulo: "Cuerpo de gelatina", descripcion: "Cada movimiento sigue temblando un poco después de terminar.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Movete como si tu cuerpo fuera de gelatina: blando, sin huesos firmes. Cada vez que te detengas después de un movimiento, dejá que el cuerpo siga 'temblando' un poco más, como haría la gelatina de verdad.",
    objetivo: "La creatividad no es un talento aislado: la investigación la describe cada vez más como una meta-habilidad que combina flexibilidad cognitiva, tolerancia a la ambigüedad y disposición a arriesgarse a equivocarse — las mismas capacidades que después se usan para resolver problemas en cualquier área.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "cuerpo-de-piedra", titulo: "Cuerpo de piedra", descripcion: "Rigidez total: cada movimiento cuesta un esfuerzo enorme.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Movete como si tu cuerpo fuera de piedra sólida: cada movimiento, por chico que sea, requiere mucho esfuerzo y sale con lentitud. Notá qué se siente distinto en la respiración cuando hasta girar la cabeza es un trabajo grande.",
    objetivo: "El coreógrafo Rudolf Laban describió el movimiento humano según cualidades como el peso, el tiempo, el espacio y la fluidez; explorar conscientemente esas cualidades amplía el repertorio expresivo disponible, tanto en el cuerpo como en la forma de resolver problemas.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "cuerpo-de-globo", titulo: "Cuerpo de globo", descripcion: "Liviano, ingrávido, como si el aire adentro te llevara de un lado a otro.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Movete como si fueras un globo lleno de aire, muy liviano: cada movimiento tiene un poco de flote, como si el aire te empujara de a poco de un lado a otro. Dejá que un 'viento' imaginario te lleve suavemente por el espacio.",
    objetivo: "El método de Konstantin Stanislavski propone la pregunta '¿qué haría yo si esto fuera real?' como disparador de una reacción física genuina, en vez de una actuación genérica — la misma pregunta sirve para pensar problemas reales desde ángulos nuevos.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "cuerpo-de-goma", titulo: "Cuerpo de goma", descripcion: "Elástico: el cuerpo se estira mucho más de lo normal antes de volver a su forma.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Movete como si tu cuerpo fuera de goma elástica: los brazos y el torso se estiran mucho más de lo habitual antes de volver a su lugar, como una banda elástica. Probá estirar despacio una parte del cuerpo bien lejos y dejarla 'rebotar' de vuelta.",
    objetivo: "La dramaterapia utiliza la representación física de emociones como una forma de procesarlas con cierta distancia segura: encarnar una emoción en un personaje o un animal permite explorarla sin la intensidad de vivirla en primera persona.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "la-noticia-inesperada", titulo: "La noticia inesperada", descripcion: "El cuerpo reacciona antes que las palabras a una noticia imaginaria.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que recibís una noticia muy inesperada —puede ser muy buena o muy mala, elegís vos—. Dejá que el cuerpo reaccione primero: ¿se congela?, ¿se cae?, ¿salta? Recién después de esa reacción física, imaginá qué dirías.",
    objetivo: "La pionera del teatro Viola Spolin diseñó juegos teatrales basados en la idea de que la espontaneidad —responder de verdad al momento, no ensayar una respuesta— es una habilidad que se entrena, no un talento innato.",
    edadMin: 6, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "llegar-tarde", titulo: "Llegar tarde", descripcion: "La urgencia física completa de llegar tarde a algo importante.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que vas muy tarde a algo importante. Actuá los últimos minutos antes de salir: buscar cosas con desesperación, vestirte rápido, la carrera hacia la puerta. Dejá que la urgencia se note en todo el cuerpo, no sólo en la velocidad.",
    objetivo: "Observar o imaginar una acción activa parcialmente las mismas áreas motoras del cerebro que ejecutarla (simulación motora); por eso 'convertirse' físicamente en algo entrena la imaginación de una forma distinta —y más profunda— que sólo describirlo con palabras.",
    edadMin: 5, edadMax: 99, dificultad: 2, duracion: 5, activo: true, version: 1 },

  { id: "probar-algo-muy-picante", titulo: "Probar algo muy picante", descripcion: "Una reacción sensorial exagerada frente a algo imaginario.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que probás algo extremadamente picante, mucho más de lo que esperabas. Dejá que la reacción se tome su tiempo: la sorpresa inicial, buscar agua desesperadamente, el alivio final. Cuanto más específica la reacción sensorial, más creíble se siente.",
    objetivo: "La cognición corporeizada (embodied cognition) sostiene que el pensamiento no ocurre sólo en la cabeza: mover el cuerpo de una manera específica activa circuitos motores que refuerzan la imaginación de una forma que sólo pensarlo no logra.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "el-frio-extremo", titulo: "El frío extremo", descripcion: "El cuerpo entero reacciona a un frío imaginario muy intenso.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que hace un frío intensísimo. Dejá que el cuerpo se encoja, los brazos se crucen buscando calor, los dientes 'castañeteen'. Buscá un gesto para 'soplarte' las manos o frotarlas buscando calor.",
    objetivo: "El psicólogo Lev Vygotsky señaló que el juego simbólico y el 'como si' —hacer de cuenta que algo es otra cosa— es uno de los motores principales del desarrollo cognitivo en la infancia, y sigue ejercitando la misma capacidad de abstracción en la adultez.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "el-calor-extremo", titulo: "El calor extremo", descripcion: "El cuerpo entero reacciona a un calor imaginario agobiante.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá un calor agobiante. Dejá que el cuerpo se mueva más lento, busque sombra, se abanique con la mano. Notá qué gesto usarías para secarte el sudor de la frente.",
    objetivo: "Estudios sobre entrenamiento improvisacional (Felsman y colegas, entre otros) encontraron que practicar la improvisación teatral se asocia con menor incomodidad frente a la incertidumbre y mayor tolerancia a equivocarse en público.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },

  { id: "ganar-la-loteria", titulo: "Ganar la lotería", descripcion: "La explosión física completa de una alegría repentina y enorme.",
    seccion: "cuerpo", tipo: "prompt", salida: "texto",
    consigna: "Imaginá que te acabás de enterar que ganaste algo enorme e inesperado. Dejá que la alegría explote en el cuerpo entero: saltos, gritos silenciosos, correr sin dirección. No la mimas de a poco — dejá que sea inmediata y completa.",
    objetivo: "Representar físicamente una idea —no sólo describirla— obliga a tomar decisiones concretas (¿cómo se mueve?, ¿qué gesto hace?) que el pensamiento abstracto puede evitar, y esa concreción es en sí misma un entrenamiento de creatividad.",
    edadMin: 4, edadMax: 99, dificultad: 1, duracion: 4, activo: true, version: 1 },
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
