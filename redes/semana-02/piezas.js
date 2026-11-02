// Semana 2: contenido de cada pieza. Los textos salen de las páginas de la web.
// Para cambiar un texto: editá acá y volvé a correr  node redes/_motor/generar.js semana-02
module.exports = [
  // ───────────── LUNES · Carrusel · Familias ─────────────
  {
    id: "1-lunes-carrusel-cuando-ir-al-psicologo",
    tipo: "post",
    placas: ({ ilus }) => [
      {
        clase: "dark",
        html: `<div class="kicker">Guía para familias</div>
          <h1>¿Cuándo llevar a mi hijo al <em>psicólogo</em>?</h1>
          <p class="sub">Señales para mirar y cómo contárselo.</p>
          ${ilus("psicologo-infantil")}`,
      },
      {
        html: `<div class="kicker">La respuesta corta</div>
          <h2>Cuando un cambio <em>dura semanas</em> y afecta su día a día</h2>
          <div class="body"><p>No hace falta que haya “un problema grave”. <strong>Consultar a tiempo ayuda.</strong></p></div>
          ${ilus("primera-consulta", "chica")}`,
      },
      {
        html: `<div class="kicker">Señales que conviene mirar</div>
          <h2>En las <em>emociones</em> y la conducta</h2>
          <ul class="lista">
            <li>Tristeza, enojo o miedo que <strong>se repiten y duran semanas</strong>.</li>
            <li>Preocupación constante o baja autoestima (“no sirvo para nada”).</li>
            <li>Berrinches muy intensos para su edad o agresividad.</li>
            <li><strong>Se aísla</strong>: deja de jugar o de ver a sus amigos.</li>
          </ul>`,
      },
      {
        html: `<div class="kicker">Señales que conviene mirar</div>
          <h2>En el <em>cuerpo</em> y la rutina</h2>
          <ul class="lista">
            <li>Cambios en el <strong>sueño</strong> o el <strong>apetito</strong>.</li>
            <li>Dolores de panza o de cabeza frecuentes, sin causa médica.</li>
            <li>Volver a hacerse pis cuando ya había dejado los pañales.</li>
            <li>Le va peor en la escuela.</li>
          </ul>`,
      },
      {
        clase: "pale",
        html: `<div class="kicker">Después de algo difícil</div>
          <h2>También es un buen <em>momento</em> para consultar</h2>
          <div class="tarjetas">
            <div class="tarjeta"><b>Separación</b>de los padres</div>
            <div class="tarjeta"><b>Una pérdida</b>de un ser querido</div>
            <div class="tarjeta"><b>Mudanza</b>o cambio de escuela</div>
            <div class="tarjeta"><b>Bullying</b>o situaciones de violencia</div>
          </div>`,
      },
      {
        html: `<div class="kicker">¿Cómo se lo cuento?</div>
          <ol class="pasos">
            <li><div><div class="t">Con palabras simples</div><div class="d">“Vamos a charlar y jugar con alguien que ayuda a los chicos cuando algo les preocupa”.</div></div></li>
            <li><div><div class="t">Nunca como un castigo</div><div class="d">Ni como algo que “le pasa porque se porta mal”.</div></div></li>
            <li><div><div class="t">Contale que los adultos también van</div><div class="d">Es un lugar para decir lo que siente.</div></div></li>
            <li><div><div class="t">Con adolescentes, que participen</div><div class="d">Es más fácil sostener un espacio que eligieron.</div></div></li>
          </ol>`,
      },
      {
        html: `<div class="kicker">Importante</div>
          <h2>Si habla de <em>lastimarse</em> o de no querer vivir</h2>
          <div class="nota"><span class="big">No esperes un turno.</span>Llamá al <b>911</b> o acercate a la guardia más cercana.</div>`,
      },
      {
        clase: "dark",
        html: `<div class="kicker">Centro Sinapsis · Berazategui</div>
          <h2>Atendemos a niños, adolescentes y sus <em>familias</em></h2>
          <div class="body"><p>Con los más chicos, el juego y el dibujo son su forma de expresarse. Sin derivación médica previa.</p></div>
          <span class="boton">WhatsApp: 11 6856-7160</span>
          <p class="fuente">Información general: no reemplaza una consulta profesional.</p>`,
      },
    ],
  },

  // ───────────── MIÉRCOLES · Carrusel · Docentes y familias ─────────────
  {
    id: "2-miercoles-carrusel-motricidad-fina",
    tipo: "post",
    placas: ({ ilus }) => [
      {
        clase: "teal",
        html: `<div class="kicker">Para el aula y para casa</div>
          <h1>Motricidad fina: <em>6 juegos</em> para estimularla</h1>
          <p class="sub">Con materiales que ya tenés. Guardalo 📌</p>
          ${ilus("motricidad-fina")}`,
      },
      {
        html: `<div class="kicker">¿Qué es?</div>
          <h2>Los movimientos <em>pequeños</em> de manos y dedos</h2>
          <div class="body"><p>Coordinados con la vista: <strong>agarrar el lápiz, recortar, enhebrar, abrocharse, usar los cubiertos</strong>.</p>
          <p>Es la base de muchas tareas de la escuela, empezando por la escritura.</p></div>`,
      },
      {
        html: `<div class="kicker">Juegos 1 a 3</div>
          <ol class="pasos">
            <li><div><div class="t">Plastilina y masa</div><div class="d">Amasar, hacer bolitas, cortar con cuchillo de plástico.</div></div></li>
            <li><div><div class="t">Enhebrar</div><div class="d">Cuentas, fideos o botones.</div></div></li>
            <li><div><div class="t">Recortar papel</div><div class="d">Primero libremente, después siguiendo líneas.</div></div></li>
          </ol>`,
      },
      {
        html: `<div class="kicker">Juegos 4 a 6</div>
          <ol class="pasos" style="counter-reset: p 3">
            <li><div><div class="t">Pinzas de ropa</div><div class="d">Colgar dibujos o pasar objetos de un recipiente a otro.</div></div></li>
            <li><div><div class="t">Encastres y rompecabezas</div><div class="d">También bloques chicos.</div></div></li>
            <li><div><div class="t">Ayudar en la cocina</div><div class="d">Untar, pelar, revolver, poner la mesa.</div></div></li>
          </ol>`,
      },
      {
        clase: "pale",
        html: `<div class="kicker">Como referencia</div>
          <h2>Qué es esperable a cada <em>edad</em></h2>
          <div class="nota"><span class="big">~3 años</span>Copia un círculo, enhebra cuentas grandes, abre y cierra frascos.</div>
          <div class="nota"><span class="big">4 a 5 años</span>Recorta siguiendo una línea, copia una cruz y un cuadrado, se abrocha botones grandes.</div>
          <p class="fuente" style="margin-top:40px">Cada chico tiene sus tiempos.</p>`,
      },
      {
        html: `<div class="kicker">Señales para consultar</div>
          <ul class="lista">
            <li>Agarra el lápiz <strong>con toda la mano</strong> o con mucha fuerza, después de los 4 o 5 años.</li>
            <li><strong>Evita</strong> dibujar, pintar o recortar, o se frustra enseguida.</li>
            <li>Le cuesta mucho abrocharse o usar los cubiertos.</li>
            <li>Escribe muy lento o su letra es muy difícil de leer.</li>
          </ul>`,
      },
      {
        clase: "teal",
        html: `<div class="kicker">Centro Sinapsis · Berazategui</div>
          <h2>La <em>terapia ocupacional</em> acompaña con juego</h2>
          <div class="body"><p>Evaluamos la motricidad, la postura y la coordinación, sin derivación médica previa.</p></div>
          <span class="boton">Guía completa: link en la bio</span>
          <p class="fuente">💬 Etiquetá a una docente de nivel inicial.</p>`,
      },
    ],
  },

  // ───────────── VIERNES · Carrusel · Familias / discapacidad ─────────────
  {
    id: "3-viernes-carrusel-senales-autismo",
    tipo: "post",
    placas: ({ ilus }) => [
      {
        clase: "dark",
        html: `<div class="kicker">Autismo (TEA) · Guía para familias</div>
          <h1>Señales <em>tempranas</em> que conviene mirar</h1>
          <p class="sub">Y qué hacer si notás alguna.</p>
          ${ilus("senales-autismo")}`,
      },
      {
        clase: "pale",
        html: `<div class="kicker">Antes de empezar</div>
          <h2>Una señal sola <em>no significa</em> que haya autismo</h2>
          <div class="nota">Cada chico tiene sus tiempos. Lo que importa es <b>el conjunto</b> de señales, y que se sostenga en el tiempo. Sólo una evaluación profesional puede confirmarlo.</div>`,
      },
      {
        html: `<div class="kicker">Alrededor de los 12 meses</div>
          <ul class="lista">
            <li>No responde cuando lo llaman <strong>por su nombre</strong>.</li>
            <li>Casi no balbucea.</li>
            <li>No usa <strong>gestos</strong> como saludar con la mano o señalar.</li>
          </ul>
          ${ilus("estimulacion-temprana", "chica")}`,
      },
      {
        html: `<div class="kicker">De los 18 meses a los 2 años</div>
          <ul class="lista">
            <li>No <strong>señala</strong> para mostrarte algo que le interesa.</li>
            <li>No imita ni juega a “hacer como si” (dar de comer a un muñeco).</li>
            <li>Dice muy pocas palabras o no arma frases de dos.</li>
            <li>Repite frases que escucha en lugar de usarlas para comunicarse.</li>
            <li>Parece no interesarse en otros chicos.</li>
          </ul>`,
      },
      {
        html: `<div class="kicker">A cualquier edad</div>
          <ul class="lista">
            <li>Poco <strong>contacto visual</strong>; prefiere jugar solo.</li>
            <li>Alinea u ordena objetos en lugar de jugar con ellos.</li>
            <li>Se altera mucho con <strong>cambios pequeños</strong> en la rutina.</li>
            <li>Movimientos repetitivos: aletear las manos, balancearse, girar.</li>
            <li>Reacciones muy intensas (o muy escasas) a <strong>sonidos, olores o texturas</strong>.</li>
          </ul>`,
      },
      {
        html: `<div class="kicker">Siempre conviene consultar</div>
          <h2>Si <em>pierde</em> palabras o habilidades que ya tenía</h2>
          <div class="body"><p>A cualquier edad. Es una señal que <strong>siempre</strong> conviene evaluar pronto.</p>
          <p>En niñas y adolescentes las señales suelen ser más sutiles: cuesta sostener amistades, mucho cansancio después de situaciones sociales, sensación de “no encajar”.</p></div>`,
      },
      {
        html: `<div class="kicker">¿Qué hacer?</div>
          <ol class="pasos">
            <li><div><div class="t">Anotá lo que observás</div><div class="d">Qué hace, desde cuándo y en qué situaciones. Un video corto ayuda mucho.</div></div></li>
            <li><div><div class="t">No esperes a que “se le pase”</div><div class="d">Consultar temprano tiene más impacto.</div></div></li>
            <li><div><div class="t">Consultá sin derivación</div><div class="d">La primera entrevista se pide directo por WhatsApp.</div></div></li>
            <li><div><div class="t">Mientras tanto, se puede empezar</div><div class="d">Estimulación temprana o fonoaudiología, antes de tener un diagnóstico.</div></div></li>
          </ol>`,
      },
      {
        clase: "dark",
        html: `<div class="kicker">Centro Sinapsis · Berazategui</div>
          <h2>Acompañamos a las familias <em>desde la primera duda</em></h2>
          <div class="body"><p>Evaluación y terapias con un equipo interdisciplinario. Con y sin CUD.</p></div>
          <span class="boton">WhatsApp: 11 6856-7160</span>
          <p class="fuente">Información general: no reemplaza una evaluación profesional.</p>`,
      },
    ],
  },

  // ───────────── HISTORIAS ─────────────
  {
    id: "4-lunes-historia-encuesta-psicologo",
    tipo: "story",
    placas: () => [
      {
        clase: "dark",
        html: `<div class="kicker">Encuesta</div>
          <h1>¿Alguna vez dudaste si tu hijo necesitaba <em>ayuda</em>?</h1>
          <div class="zona-sticker"></div>
          <p class="sub">Hoy publicamos las señales que conviene mirar y cómo contárselo 💬</p>`,
      },
    ],
  },
  {
    id: "5-martes-historia-link-zona-infantil",
    tipo: "story",
    placas: ({ ilus }) => [
      {
        clase: "teal",
        html: `<div class="kicker">Gratis en nuestra web</div>
          <h1>Zona <em>Infantil</em>: jugar y aprender</h1>
          <p class="sub">Actividades para explorar, descubrir y desafiar, según la edad.</p>
          <div class="zona-sticker"></div>
          ${ilus("estimulacion-temprana", "chica")}`,
      },
    ],
  },
  {
    id: "6-miercoles-historia-quiz-motricidad",
    tipo: "story",
    placas: () => [
      {
        clase: "pale",
        html: `<div class="kicker">Quiz</div>
          <h1>¿Cuál estimula más la <em>motricidad fina</em>?</h1>
          <div class="zona-sticker"></div>
          <p class="sub">Hoy en el feed: 6 juegos con materiales que ya tenés en casa o en la sala ✂️</p>`,
      },
    ],
  },
  {
    id: "7-jueves-historia-respuestas",
    tipo: "story",
    placas: () => [
      {
        clase: "dark",
        html: `<div class="kicker">Respondemos</div>
          <h1>Tus <em>preguntas</em> de la semana pasada</h1>
          <div class="zona-sticker" style="height:520px"></div>
          <p class="sub">¿Te quedó otra duda? Escribinos por mensaje directo 💬</p>
          <p class="fuente">Respuestas generales: no reemplazan una consulta profesional.</p>`,
      },
    ],
  },
  {
    id: "8-viernes-historia-mito-realidad",
    tipo: "story",
    placas: () => [
      {
        clase: "teal",
        html: `<div class="kicker">¿Mito o realidad?</div>
          <h1>“El autismo siempre se nota de <em>chiquito</em>”</h1>
          <div class="zona-sticker"></div>
          <p class="sub">Votá y pasá a la siguiente historia para ver la respuesta 👉</p>`,
      },
      {
        clase: "dark",
        html: `<div class="kicker">La respuesta</div>
          <h1><em>Mito.</em></h1>
          <p class="sub">En algunas personas, sobre todo niñas y quienes tienen buen desarrollo del lenguaje, las señales son más sutiles y el diagnóstico llega en la adolescencia o la adultez.</p>
          <div class="zona-sticker"></div>
          <p class="fuente">Hoy en el feed: las señales tempranas para mirar.</p>`,
      },
    ],
  },
];
