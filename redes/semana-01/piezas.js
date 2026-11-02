// Semana 1 — contenido de cada pieza. Los textos salen de las páginas de la web.
// Para cambiar un texto: editá acá y volvé a correr  node redes/_motor/generar.js semana-01
module.exports = [
  // ───────────── LUNES · Carrusel · Familias y docentes ─────────────
  {
    id: "1-lunes-carrusel-dislexia",
    tipo: "post",
    placas: ({ ilus }) => [
      {
        clase: "dark",
        html: `<div class="kicker">Guía para familias y docentes</div>
          <h1>Dislexia:<br><em>señales</em> que conviene mirar</h1>
          <p class="sub">Del jardín a la primaria, y qué hacer si las notás.</p>
          ${ilus("dislexia")}`,
      },
      {
        html: `<div class="kicker">Primero, lo importante</div>
          <h2>No es falta de <em>inteligencia</em> ni de esfuerzo</h2>
          <div class="body"><p>La dislexia es una <strong>dificultad específica para aprender a leer</strong> con fluidez y precisión.</p>
          <p>Muchos chicos con dislexia tienen una inteligencia promedio o alta, y suelen esforzarse <strong>más</strong> que el resto.</p></div>
          ${ilus("psicopedagogo", "chica")}`,
      },
      {
        html: `<div class="kicker">En el jardín · 4 a 5 años</div>
          <h2>Le cuesta…</h2>
          <ul class="lista">
            <li>aprender el <strong>nombre y el sonido</strong> de las letras;</li>
            <li>reconocer <strong>rimas</strong>;</li>
            <li>separar palabras en <strong>sílabas</strong> jugando;</li>
            <li>recordar canciones o secuencias simples, como los <strong>días de la semana</strong>.</li>
          </ul>`,
      },
      {
        html: `<div class="kicker">Primeros grados · 6 a 8 años</div>
          <h2>Puede pasar que…</h2>
          <ul class="lista">
            <li>lea <strong>muy despacio</strong> y con mucho esfuerzo;</li>
            <li><strong>adivine palabras</strong> por la primera letra;</li>
            <li>confunda letras parecidas (b/d, p/q) más de lo esperable;</li>
            <li><strong>omita o agregue</strong> letras y sílabas;</li>
            <li>le cueste escribir al <strong>dictado</strong>.</li>
          </ul>`,
      },
      {
        html: `<div class="kicker">Más grande</div>
          <h2>Otras señales</h2>
          <ul class="lista">
            <li>Lee bien palabras conocidas, pero <strong>se traba con las nuevas</strong>.</li>
            <li><strong>Entiende mejor cuando le leen</strong> que cuando lee solo.</li>
            <li>Evita leer en voz alta.</li>
            <li>Tiene muchos errores de ortografía.</li>
            <li>Se cansa o se frustra con las tareas de lectura.</li>
          </ul>`,
      },
      {
        clase: "pale",
        html: `<div class="kicker">Ojo con esto</div>
          <h2>Confundir la <em>b</em> con la <em>d</em> es esperable…</h2>
          <div class="nota">…cuando un chico está aprendiendo a leer. Lo que llama la atención es que las dificultades <b>persistan en el tiempo</b> y no mejoren con la enseñanza habitual.</div>`,
      },
      {
        html: `<div class="kicker">¿Qué hacer si las notás?</div>
          <ol class="pasos">
            <li><div><div class="t">Hablá con la escuela</div><div class="d">Preguntá cómo lo ven en clase.</div></div></li>
            <li><div><div class="t">No lo etiquetes de “vago”</div><div class="d">Ni lo compares: él ya lo sabe.</div></div></li>
            <li><div><div class="t">Consultá con psicopedagogía</div><div class="d">Una evaluación muestra qué le cuesta exactamente.</div></div></li>
            <li><div><div class="t">Controlá vista y audición</div><div class="d">Con el pediatra, si no se hizo hace poco.</div></div></li>
            <li><div><div class="t">Leé con él por placer</div><div class="d">Sin exigencia, para cuidar el vínculo con la lectura.</div></div></li>
          </ol>`,
      },
      {
        clase: "dark",
        html: `<div class="kicker">Centro Sinapsis · Berazategui</div>
          <h2>Cuanto antes se detecta, <em>antes</em> se puede acompañar</h2>
          <div class="body"><p>Evaluamos y acompañamos desde la psicopedagogía, sin derivación médica previa. Con y sin CUD.</p></div>
          <span class="boton">Guía completa: link en la bio</span>
          <p class="fuente">Información general: no reemplaza una evaluación profesional.</p>`,
      },
    ],
  },

  // ───────────── MIÉRCOLES · Carrusel · Recursos gratis (familias + docentes) ─────────────
  {
    id: "2-miercoles-carrusel-recursos-gratis",
    tipo: "post",
    placas: ({ ilus }) => [
      {
        clase: "teal",
        html: `<div class="kicker">Gratis · Sin descargar nada</div>
          <h1>Recursos para usar en <em>casa</em> o en el <em>aula</em></h1>
          <p class="sub">Todo está en nuestra web. Guardá este posteo 📌</p>
          ${ilus("guias")}`,
      },
      {
        html: `<div class="kicker">1 · Juegos</div>
          <h2>Más de 200 juegos <em>breves</em></h2>
          <div class="tarjetas">
            <div class="tarjeta"><b>Memoria</b>y atención</div>
            <div class="tarjeta"><b>Palabras</b>y números</div>
            <div class="tarjeta"><b>Emociones</b>y vínculos</div>
            <div class="tarjeta"><b>Lógica</b>y flexibilidad</div>
          </div>
          <div class="body" style="margin-top:44px"><p>Hay una categoría pensada <strong>especialmente para chicos</strong>.</p></div>`,
      },
      {
        html: `<div class="kicker">2 · Zona Infantil</div>
          <h2>Actividades para cada <em>etapa</em></h2>
          <div class="body"><p>Juegos para <strong>explorar, descubrir y desafiar</strong>, pensados según la edad.</p>
          <p>Ideales para un rato compartido en casa o para un momento tranquilo en el aula.</p></div>
          ${ilus("estimulacion-temprana", "chica")}`,
      },
      {
        html: `<div class="kicker">3 · Calma y emociones</div>
          <h2>Ejercicios para <em>frenar</em> unos minutos</h2>
          <ul class="lista">
            <li><strong>Ejercicios guiados</strong> de calma, regulación emocional y autoconocimiento.</li>
            <li><strong>Mindfulness</strong> paso a paso.</li>
            <li><strong>Sonidos</strong> de naturaleza para relajarse o concentrarse.</li>
          </ul>`,
      },
      {
        html: `<div class="kicker">4 · Guías para familias</div>
          <h2>Respuestas claras, sin <em>tecnicismos</em></h2>
          <div class="body"><p>Dislexia, tartamudez, rabietas, señales de autismo, retraso del lenguaje, integración sensorial, cuándo ir al psicólogo… y más.</p>
          <p>Cada guía dice <strong>qué mirar</strong> y <strong>cuándo consultar</strong>.</p></div>`,
      },
      {
        clase: "pale",
        html: `<div class="kicker">¿Sos docente?</div>
          <h2>Llevalos a tu <em>clase</em></h2>
          <ul class="lista">
            <li>Proyectá un juego al empezar la jornada.</li>
            <li>Usá un ejercicio de calma después del recreo.</li>
            <li>Compartí una guía con las familias que te consultan.</li>
          </ul>
          <div class="nota" style="margin-top:50px">Funciona en celular, tablet y compu.</div>`,
      },
      {
        clase: "teal",
        html: `<div class="kicker">Centro Sinapsis · Berazategui</div>
          <h2>Entrá y <em>probalos</em></h2>
          <div class="body"><p>sinapsiscentro.com.ar/recursos</p></div>
          <span class="boton">Link en la bio</span>
          <p class="fuente">Compartilo con alguien a quien le pueda servir 💙</p>`,
      },
    ],
  },

  // ───────────── VIERNES · Carrusel · Familias con discapacidad ─────────────
  {
    id: "3-viernes-carrusel-cud",
    tipo: "post",
    placas: ({ ilus }) => [
      {
        clase: "dark",
        html: `<div class="kicker">Discapacidad · Zona Sur</div>
          <h1>CUD: qué es y cómo <em>empezar</em> las terapias</h1>
          <p class="sub">Una guía corta para familias.</p>
          ${ilus("discapacidad")}`,
      },
      {
        html: `<div class="kicker">¿Qué es el CUD?</div>
          <h2>Certificado Único de <em>Discapacidad</em></h2>
          <ul class="lista">
            <li>Es un documento público, <strong>válido en todo el país</strong>.</li>
            <li>Lo emite una <strong>junta evaluadora</strong> interdisciplinaria.</li>
            <li>El trámite es <strong>gratuito</strong>.</li>
          </ul>`,
      },
      {
        clase: "pale",
        html: `<div class="kicker">¿Para qué sirve?</div>
          <h2>Para acceder a las <em>prestaciones</em></h2>
          <div class="nota"><span class="big">Ley 24.901</span>Establece prestaciones básicas de atención integral para personas con discapacidad, a cargo de las <b>obras sociales y prepagas</b>.</div>
          <div class="body" style="margin-top:44px"><p>En la práctica: las terapias indicadas pueden quedar cubiertas por tu obra social, siguiendo los pasos que pide cada una.</p></div>`,
      },
      {
        html: `<div class="kicker">El trámite, en resumen</div>
          <h2>5 <em>pasos</em></h2>
          <ol class="pasos">
            <li><div><div class="t">Pedí turno con la junta evaluadora</div><div class="d">Cada municipio de Zona Sur tiene la suya.</div></div></li>
            <li><div><div class="t">Reuní la documentación</div><div class="d">DNI, certificado médico y estudios recientes.</div></div></li>
            <li><div><div class="t">Asistí a la evaluación</div></div></li>
            <li><div><div class="t">Retirá el certificado</div><div class="d">Indica su vigencia.</div></div></li>
            <li><div><div class="t">Presentalo en tu obra social</div><div class="d">Con la prescripción y el plan de tratamiento.</div></div></li>
          </ol>
          <p class="fuente">Los requisitos pueden cambiar: verificá en la guía oficial (argentina.gob.ar).</p>`,
      },
      {
        html: `<div class="kicker">En Centro Sinapsis</div>
          <h2>Un equipo <em>interdisciplinario</em></h2>
          <div class="tarjetas">
            <div class="tarjeta"><b>Psicología</b>niños, adolescentes y adultos</div>
            <div class="tarjeta"><b>Fonoaudiología</b>lenguaje y comunicación</div>
            <div class="tarjeta"><b>Terapia ocupacional</b>e integración sensorial</div>
            <div class="tarjeta"><b>Psicopedagogía</b>y articulación escolar</div>
            <div class="tarjeta"><b>Estimulación temprana</b>bebés y niños pequeños</div>
            <div class="tarjeta"><b>Kinesiología</b>y gimnasio terapéutico</div>
          </div>
          <div class="body" style="margin-top:40px"><p>Y <strong>evaluaciones</strong>: neurocognitiva, psicodiagnóstico, ADOS-2 y ADI-R.</p></div>`,
      },
      {
        clase: "pale",
        html: `<div class="kicker">¿Todavía no tenés el CUD?</div>
          <h2>Podés <em>consultar</em> igual</h2>
          <div class="body"><p>Te orientamos con el trámite y, si hace falta, hacemos las <strong>evaluaciones o informes</strong> que suelen pedirse.</p>
          <p>Mientras tanto se puede empezar por <strong>reintegro</strong> o de forma particular.</p></div>`,
      },
      {
        clase: "dark",
        html: `<div class="kicker">Centro Sinapsis · Berazategui</div>
          <h2>Escribinos con el nombre de tu <em>obra social</em></h2>
          <div class="body"><p>Verificamos tu cobertura y coordinamos una primera entrevista. Sin derivación médica previa.</p></div>
          <span class="boton">WhatsApp: 11 6856-7160</span>
          <p class="fuente">Calle 27 Nº3907 esq. 139, Berazategui · Lun a vie 9 a 20, sáb 9 a 13</p>`,
      },
    ],
  },

  // ───────────── HISTORIAS ─────────────
  {
    id: "4-lunes-historia-encuesta-lectura",
    tipo: "story",
    placas: () => [
      {
        clase: "dark",
        html: `<div class="kicker">Encuesta</div>
          <h1>¿Tu hijo o hija lee más <em>lento</em> que sus compañeros?</h1>
          <div class="zona-sticker">⬇ Acá va el sticker de ENCUESTA<br>Opciones: “Sí” · “No” · “No sé”</div>
          <p class="sub">Hoy publicamos las señales de dislexia que conviene mirar 👀</p>`,
      },
    ],
  },
  {
    id: "5-martes-historia-link-juegos",
    tipo: "story",
    placas: ({ ilus }) => [
      {
        clase: "teal",
        html: `<div class="kicker">Gratis en nuestra web</div>
          <h1>Juegos para entrenar la <em>memoria</em> y la atención</h1>
          <p class="sub">Para chicos y grandes. Sin descargar nada.</p>
          <div class="zona-sticker">⬇ Acá va el sticker de LINK<br>sinapsiscentro.com.ar/juegos.html</div>
          ${ilus("estimulacion-cognitiva", "chica")}`,
      },
    ],
  },
  {
    id: "6-miercoles-historia-quiz-cud",
    tipo: "story",
    placas: () => [
      {
        clase: "pale",
        html: `<div class="kicker">Quiz</div>
          <h1>¿El trámite del <em>CUD</em> tiene costo?</h1>
          <div class="zona-sticker">⬇ Acá va el sticker de QUIZ<br>Opciones: “Sí, se paga” · “No, es gratuito” ✔</div>
          <p class="sub">El viernes publicamos una guía corta del CUD. Activá las notificaciones 🔔</p>`,
      },
    ],
  },
  {
    id: "7-jueves-historia-caja-preguntas",
    tipo: "story",
    placas: () => [
      {
        clase: "dark",
        html: `<div class="kicker">Preguntanos</div>
          <h1>¿Qué te gustaría saber sobre el <em>desarrollo</em> de los chicos?</h1>
          <div class="zona-sticker">⬇ Acá va el sticker de PREGUNTAS</div>
          <p class="sub">Respondemos las más elegidas en próximas historias y posteos.</p>
          <p class="fuente">Respuestas generales: no reemplazan una consulta profesional.</p>`,
      },
    ],
  },
  {
    id: "8-viernes-historia-donde-estamos",
    tipo: "story",
    placas: ({ ilus }) => [
      {
        clase: "teal",
        html: `<div class="kicker">Centro Sinapsis</div>
          <h1>Dónde <em>estamos</em></h1>
          <div class="datos">
            <div><small>Dirección</small>Calle 27 Nº3907 esq. 139, Berazategui</div>
            <div><small>Horarios</small>Lunes a viernes de 9 a 20<br>Sábados de 9 a 13</div>
            <div><small>WhatsApp</small>11 6856-7160</div>
          </div>
          <div class="zona-sticker">⬇ Sticker de LINK a WhatsApp o de UBICACIÓN</div>`,
      },
    ],
  },
];
