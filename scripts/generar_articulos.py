#!/usr/bin/env python3
"""
GENERAR_ARTICULOS.PY — Guías para familias (artículos de SEO/GEO)
==================================================================
Genera los artículos informativos de cada área (fonoaudiología,
psicopedagogía, psicología, terapia ocupacional, adultos mayores) y la página
índice /guias.html, con la plantilla compartida (scripts/plantilla_paginas.py)
y las ilustraciones de marca (scripts/ilustraciones.py).

Criterios de contenido: respuesta directa en el primer párrafo (nombra a
Centro Sinapsis y Berazategui, para buscadores e IA), señales concretas de
cuándo consultar, sin prometer resultados, sin reemplazar una evaluación, y
fuentes oficiales verificadas (MedlinePlus, OMS).

Uso: python3 scripts/generar_articulos.py
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import plantilla_paginas as P
from plantilla_paginas import sec, ul, card, esc

GUIAS = ("Guías para familias", "guias.html")
ART = []

# ───────────────────────── 1. DISLEXIA ─────────────────────────
ART.append(dict(
    slug="dislexia-senales-ninos.html", ilu="dislexia", articulo=True,
    title="Dislexia en niños: señales y cuándo consultar | Centro Sinapsis",
    desc="¿Tu hijo lee con mucho esfuerzo o confunde letras? Señales de dislexia por edad, qué hacer y cómo acompaña la psicopedagogía en Berazategui y Zona Sur.",
    crumb_parent=GUIAS, crumb="Dislexia", tag="Guía · Aprendizaje",
    h1="Dislexia en niños: señales y cuándo consultar",
    lead="Qué es la dislexia, qué señales conviene mirar en casa y en la escuela, y cómo se acompaña desde la psicopedagogía.",
    cta="Consultar por dificultades en la lectura", motivo="aprendizaje",
    wa="Hola! Quisiera consultar porque a mi hijo/a le cuesta mucho leer.",
    about={"@type": "MedicalCondition", "name": "Dislexia", "alternateName": "Trastorno específico del aprendizaje de la lectura"},
    body=
    sec("La respuesta corta",
        "<p>La dislexia es una dificultad específica para aprender a leer con fluidez y precisión, que no tiene que ver con la inteligencia ni con el esfuerzo del chico. Si tu hijo o hija lee mucho más lento que sus compañeros, confunde o saltea letras de forma persistente o sufre cada vez que tiene que leer, conviene consultar. En Centro Sinapsis, en Berazategui, la psicopedagogía evalúa y acompaña estos procesos, sin derivación médica previa.</p>"
        "<p>Cuanto antes se detecta, antes se puede ajustar la forma de enseñar y de apoyar al chico, en casa y en la escuela.</p>")
    + sec("Señales que conviene mirar",
          card("En el jardín (4 a 5 años)", "Le cuesta aprender el nombre y el sonido de las letras, reconocer rimas o separar palabras en sílabas jugando; olvida canciones o secuencias simples (días de la semana).")
          + card("En los primeros grados (6 a 8 años)", "Lee muy despacio y con mucho esfuerzo; adivina palabras por la primera letra; confunde letras parecidas (b/d, p/q) más allá de lo esperable para su grado; omite o agrega letras y sílabas; le cuesta escribir al dictado.")
          + card("Más grande", "Lee bien palabras conocidas pero se traba con las nuevas; entiende mejor cuando le leen que cuando lee solo; evita leer en voz alta; tiene muchos errores de ortografía; se cansa o se frustra con las tareas de lectura."))
    + '  <div class="svc-callout">Confundir la <b>b</b> con la <b>d</b> es esperable cuando un chico está aprendiendo a leer. Lo que llama la atención es que las dificultades <strong>persistan en el tiempo</strong> y no mejoren con la enseñanza habitual.</div>\n'
    + sec("¿Qué hacer si notás estas señales?",
          ul(["<b>Hablá con la escuela</b>: preguntá cómo lo ven en clase y si notan lo mismo.",
              "<b>No lo etiquetes de “vago” ni lo compares</b>: el chico con dislexia suele esforzarse más que el resto, y lo sabe.",
              "<b>Consultá con psicopedagogía</b>: una evaluación permite entender qué le cuesta exactamente (la conciencia de los sonidos, la decodificación, la memoria) y descartar otras causas.",
              "<b>Controlá la vista y la audición</b> con el pediatra, si no se hizo recientemente.",
              "<b>Leé con él por placer</b>: leerle en voz alta y compartir libros sin exigencia mantiene el vínculo con la lectura."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>Desde la <a href=\"psicopedagogia-dificultades-aprendizaje.html\">psicopedagogía</a> evaluamos el proceso de lectura y escritura y armamos un plan de trabajo a la medida del chico, con estrategias concretas y juegos para fortalecer la relación entre sonidos y letras. También ofrecemos un <a href=\"alfabetizacion-berazategui.html\">espacio de alfabetización</a> y, cuando hace falta, articulamos con la escuela para que los apoyos lleguen al aula.</p>"),
    faqs=[
        ("¿A qué edad se puede detectar la dislexia?", "Las primeras señales pueden aparecer en el jardín, y la dificultad suele hacerse más clara cuando el chico ya lleva un tiempo de enseñanza formal de la lectura, en los primeros grados de la primaria. No hace falta esperar para consultar: las señales se pueden acompañar desde el comienzo."),
        ("¿La dislexia tiene que ver con la inteligencia?", "No. La dislexia es una dificultad específica de la lectura. Muchos chicos con dislexia tienen una inteligencia promedio o alta y buenas capacidades en otras áreas."),
        ("¿La dislexia se cura?", "La dislexia no desaparece, pero con un acompañamiento adecuado y apoyos en la escuela los chicos aprenden estrategias para leer y escribir, y pueden avanzar en su escolaridad."),
        ("¿Dónde hacen evaluación psicopedagógica en Berazategui?", "En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) hacemos evaluación y tratamiento psicopedagógico. Recibimos familias de Quilmes, Florencio Varela y toda la Zona Sur, sin derivación médica previa."),
    ],
    sources=["medline_lectura", "medline_aprendizaje", "medline_disgrafia"],
    related=["psicoped", "alfa", "tdah", "talleres", "guias", "disc"],
))

# ───────────────────────── 2. PRONUNCIACIÓN ─────────────────────────
ART.append(dict(
    slug="problemas-pronunciacion-ninos.html", ilu="pronunciacion", articulo=True,
    title="Mi hijo no pronuncia la R: cuándo consultar | Centro Sinapsis",
    desc="Problemas de pronunciación en niños (dislalias): qué sonidos son esperables a cada edad, cuándo consultar y cómo ayuda la fonoaudiología en Berazategui.",
    crumb_parent=GUIAS, crumb="Pronunciación", tag="Guía · Fonoaudiología",
    h1="Mi hijo no pronuncia bien: ¿cuándo consultar?",
    lead="La erre, la ese, los grupos como “tr” o “bl”: qué es esperable a cada edad y cuándo conviene una evaluación fonoaudiológica.",
    cta="Consultar con fonoaudiología", motivo="lenguaje",
    wa="Hola! Quisiera consultar con fonoaudiología porque mi hijo/a no pronuncia bien algunos sonidos.",
    about={"@type": "MedicalCondition", "name": "Trastorno fonológico", "alternateName": ["Dislalia", "Trastorno de los sonidos del habla"]},
    body=
    sec("La respuesta corta",
        "<p>Es normal que los chicos pequeños cambien u omitan algunos sonidos mientras aprenden a hablar: la erre fuerte (“rr”) es de los últimos en aparecer y suele consolidarse alrededor de los 5 o 6 años. Conviene consultar si a los 4 años a las personas que no lo conocen les cuesta mucho entenderle, o si después de los 5 o 6 años sigue cambiando sonidos de forma persistente. En Centro Sinapsis, en Berazategui, la fonoaudiología evalúa y trata estas dificultades sin derivación médica previa.</p>")
    + sec("¿Qué es esperable a cada edad?",
          card("Alrededor de los 3 años", "Se le entiende buena parte de lo que dice. Es esperable que todavía simplifique palabras largas o grupos de consonantes (“tato” por “plato”).")
          + card("Alrededor de los 4 años", "Las personas que no lo conocen le entienden la mayor parte del tiempo. Todavía pueden costarle la “rr”, la “r” suave y grupos como “tr”, “bl” o “gr”.")
          + card("Entre los 5 y los 6 años", "La mayoría de los sonidos del español ya están adquiridos, incluida la “rr”. Si a esta edad persisten varios errores, es buen momento para consultar."))
    + sec("Señales para consultar",
          ul(["A los 4 años le cuesta mucho hacerse entender fuera de la familia.",
              "Después de los 5 o 6 años sigue reemplazando u omitiendo sonidos (por ejemplo, “lata” por “rata”, “pego” por “perro”).",
              "Se frustra, se avergüenza o evita hablar porque no le entienden.",
              "Hay errores que llaman la atención por cómo suenan: la “s” sale por los costados o con la lengua entre los dientes.",
              "Respira siempre por la boca, babea más de lo esperable para su edad o tiene dificultades para masticar.",
              "Además de pronunciar, le cuesta armar frases o entender consignas (en ese caso, mirá también nuestra guía sobre <a href=\"retraso-lenguaje-ninos.html\">retraso del lenguaje</a>)."]))
    + sec("Cómo ayudar en casa",
          ul(["<b>No lo corrijas haciéndolo repetir</b>: repetí vos la palabra bien dicha, con naturalidad (“¡Sí, un perro grande!”).",
              "<b>Hablale de frente y despacio</b>, para que vea cómo se mueven los labios y la lengua.",
              "<b>Jueguen con sonidos</b>: soplar, inflar los cachetes, imitar ruidos de animales y motores.",
              "<b>Evitá burlas o apodos</b> por cómo habla, aunque sean cariñosos."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"fonoaudiologia-berazategui.html\">fonoaudiología</a> evaluamos qué sonidos se ven afectados y por qué (cómo los produce, cómo los percibe, cómo funcionan los músculos de la boca), y armamos un plan con ejercicios y juegos que la familia también puede continuar en casa.</p>"),
    faqs=[
        ("¿A qué edad un niño tiene que pronunciar la erre?", "La “rr” es de los últimos sonidos en adquirirse en español y suele consolidarse alrededor de los 5 o 6 años. Antes de esa edad es esperable que la cambie por otro sonido."),
        ("¿Qué es una dislalia?", "Es una dificultad para pronunciar correctamente uno o varios sonidos del habla. Es una consulta muy frecuente en fonoaudiología infantil y suele responder bien al tratamiento."),
        ("¿Se corrige solo con el tiempo?", "Muchos errores desaparecen con la maduración, pero si persisten más allá de la edad esperable conviene consultar: cuanto antes se trabaja, más fácil es cambiar el hábito."),
        ("¿Hay fonoaudiología infantil en Berazategui?", "Sí. En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) hacemos evaluación y tratamiento fonoaudiológico infantil. Podés pedir turno por WhatsApp sin derivación."),
    ],
    sources=["medline_fonologico", "medline_habla_ninos", "cdc_hitos"],
    related=["fono", "lenguaje", "tarta", "temprana", "guias", "psicoped"],
))

# ───────────────────────── 3. TARTAMUDEZ ─────────────────────────
ART.append(dict(
    slug="tartamudez-ninos.html", ilu="tartamudez", articulo=True,
    title="Tartamudez en niños: qué es y cuándo consultar | Centro Sinapsis",
    desc="Tartamudez infantil: qué es esperable entre los 2 y 5 años, señales para consultar y cómo acompañar en casa. Fonoaudiología en Berazategui y Zona Sur.",
    crumb_parent=GUIAS, crumb="Tartamudez", tag="Guía · Fonoaudiología",
    h1="Tartamudez en niños: qué es y cuándo consultar",
    lead="Repetir sílabas o trabarse al hablar es común en la primera infancia. Te contamos cuándo es parte del desarrollo y cuándo conviene una evaluación.",
    cta="Consultar con fonoaudiología", motivo="lenguaje",
    wa="Hola! Quisiera consultar con fonoaudiología porque mi hijo/a tartamudea.",
    about={"@type": "MedicalCondition", "name": "Tartamudez", "alternateName": ["Disfemia", "Trastorno de la fluidez"]},
    body=
    sec("La respuesta corta",
        "<p>Entre los 2 y los 5 años muchos chicos repiten sílabas o palabras mientras aprenden a hablar, y en una buena parte de los casos se resuelve sola. Conviene consultar con fonoaudiología si la tartamudez dura más de 6 meses, si aparecen bloqueos o tensión al hablar, si el chico se frustra o evita hablar, o si empezó después de los 3 años y medio. En Centro Sinapsis, en Berazategui, evaluamos y acompañamos la fluidez del habla sin derivación médica previa.</p>")
    + sec("¿Cómo se manifiesta?",
          ul(["Repetición de sonidos, sílabas o palabras: “pe-pe-pelota”, “yo-yo-yo quiero”.",
              "Prolongación de sonidos: “ssssssol”.",
              "Bloqueos: se queda trabado sin que salga el sonido.",
              "Gestos de esfuerzo: parpadeo, tensión en la cara, movimientos de la cabeza.",
              "Cambiar palabras o evitar hablar para no trabarse."]))
    + sec("Señales para consultar",
          ul(["Dura más de 6 meses o va en aumento.",
              "Hay bloqueos, tensión o esfuerzo visible al hablar.",
              "El chico se da cuenta, se angustia o empieza a evitar hablar.",
              "Comenzó después de los 3 años y medio.",
              "Hay antecedentes de tartamudez en la familia.",
              "Además hay otras dificultades del habla o del lenguaje."]))
    + '  <div class="svc-callout"><strong>Lo que más ayuda en casa es el tiempo y la calma</strong>: escuchar sin apurar, sin terminar las palabras por el chico y sin pedirle que “respire” o “hable despacio”.</div>\n'
    + sec("Cómo acompañar en casa",
          ul(["<b>Escuchalo con atención</b> y mirándolo, aunque tarde en decir lo que quiere.",
              "<b>No completes sus palabras ni frases.</b>",
              "<b>Hablá vos más despacio y con pausas</b>: es más útil que pedirle a él que lo haga.",
              "<b>Bajá la presión</b>: menos preguntas seguidas y más momentos tranquilos para charlar.",
              "<b>Respetá los turnos</b> en la mesa familiar, para que no sienta que tiene que ganarse la palabra."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>Desde la <a href=\"fonoaudiologia-berazategui.html\">fonoaudiología</a> evaluamos cómo es la fluidez del chico y cómo vive el hecho de hablar, y trabajamos tanto con él como con la familia, que tiene un rol central. Si aparece ansiedad asociada, podemos sumar el acompañamiento de <a href=\"psicologia-berazategui.html\">psicología</a>.</p>"),
    faqs=[
        ("¿Es normal que mi hijo de 3 años tartamudee?", "Es frecuente que entre los 2 y los 5 años los chicos repitan sílabas o palabras mientras su lenguaje crece muy rápido. Si dura más de 6 meses, aparecen bloqueos o tensión, o el chico se angustia, conviene consultar."),
        ("¿La tartamudez es causada por los nervios?", "No es causada por los nervios ni por algo que los padres hayan hecho. Sí puede empeorar en momentos de cansancio, apuro o tensión, por eso ayuda un entorno tranquilo."),
        ("¿Sirve decirle que hable más despacio?", "En general no: suele aumentar la presión. Ayuda más que el adulto hable despacio y con pausas, y que escuche sin apurar."),
        ("¿Dónde tratar la tartamudez en Zona Sur?", "En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) hacemos evaluación y tratamiento fonoaudiológico de la fluidez, para familias de Berazategui, Quilmes, Florencio Varela y alrededores."),
    ],
    sources=["medline_tartamudez", "medline_habla_ninos"],
    related=["fono", "pronun", "lenguaje", "psico", "ansiedad", "guias"],
))

# ───────────────────────── 4. ANSIEDAD EN NIÑOS ─────────────────────────
ART.append(dict(
    slug="ansiedad-en-ninos.html", ilu="ansiedad", articulo=True,
    title="Ansiedad en niños: señales y cómo ayudar | Centro Sinapsis",
    desc="Miedos, dolores de panza, problemas para dormir: señales de ansiedad en niños y adolescentes, cómo acompañar y cuándo consultar. Psicología en Berazategui.",
    crumb_parent=GUIAS, crumb="Ansiedad en la infancia", tag="Guía · Psicología",
    h1="Ansiedad en niños y adolescentes: señales y cómo ayudar",
    lead="Los miedos y las preocupaciones son parte de crecer. Te ayudamos a reconocer cuándo empiezan a ocupar demasiado lugar.",
    cta="Consultar con psicología", motivo="emocional",
    wa="Hola! Quisiera consultar con psicología porque mi hijo/a está con mucha ansiedad.",
    about={"@type": "MedicalCondition", "name": "Ansiedad infantil"},
    body=
    sec("La respuesta corta",
        "<p>Sentir miedo o preocupación es normal en la infancia. La ansiedad se vuelve un problema cuando es muy intensa, dura semanas y empieza a interferir en la vida diaria: no quiere ir a la escuela, le cuesta dormir, tiene dolores de panza o de cabeza frecuentes sin una causa médica, o evita situaciones que antes disfrutaba. En esos casos conviene consultar con psicología. En Centro Sinapsis, en Berazategui, acompañamos a niños, adolescentes y a sus familias, sin derivación médica previa.</p>")
    + sec("Señales frecuentes",
          card("En el cuerpo", "Dolores de panza o de cabeza, náuseas, sensación de falta de aire, cansancio, dificultad para dormir o pesadillas frecuentes.")
          + card("En lo emocional", "Preocupación constante (“¿y si pasa algo?”), irritabilidad, llanto fácil, necesidad de que lo tranquilicen una y otra vez.")
          + card("En la conducta", "Evita la escuela, los cumpleaños o quedarse con otras personas; se aferra a un adulto; necesita que todo esté bajo control; se bloquea en las pruebas."))
    + sec("¿Qué es esperable y qué no?",
          "<p>Hay miedos típicos de cada edad: a separarse de los padres en los más chiquitos, a la oscuridad o los monstruos en el jardín, a hacer el ridículo o a la evaluación en la adolescencia. Lo que conviene mirar es la <b>intensidad</b>, la <b>duración</b> y cuánto <b>le impide hacer</b> lo que haría normalmente.</p>")
    + sec("Cómo acompañar en casa",
          ul(["<b>Validá lo que siente</b>: “Entiendo que te da miedo” ayuda más que “no pasa nada”.",
              "<b>No evites todo lo que le da miedo</b>: acompañalo a enfrentarlo de a pasos chicos.",
              "<b>Sostené rutinas</b> de sueño, comidas y pantallas: dan previsibilidad.",
              "<b>Mostrale cómo manejás vos tus nervios</b>: los chicos aprenden mirando.",
              'Podés practicar con él ejercicios de calma de nuestra <a href="ejercicios.html">biblioteca de ejercicios gratuitos</a>.']))
    + '  <div class="svc-callout"><strong>Si tu hijo o hija habla de lastimarse, de no querer vivir, o notás una situación de riesgo</strong>, no esperes un turno: llamá al 911 o acercate a la guardia más cercana.</div>\n'
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"psicologia-berazategui.html\">psicología</a> ofrecemos un espacio para que el chico o adolescente pueda poner en palabras lo que le pasa, con herramientas adaptadas a su edad (el juego, el dibujo, la conversación), y trabajamos junto a la familia y, cuando hace falta, con la escuela.</p>"),
    faqs=[
        ("¿Cómo sé si mi hijo tiene ansiedad?", "Si las preocupaciones o los miedos son muy intensos, duran varias semanas e interfieren en su día a día (escuela, sueño, juego, vínculos), es momento de consultar con un profesional de la salud mental."),
        ("¿Los dolores de panza pueden ser por ansiedad?", "Sí, la ansiedad muchas veces se expresa en el cuerpo. Igual conviene que el pediatra descarte otras causas antes de atribuirlo a la ansiedad."),
        ("¿Atienden adolescentes con ansiedad en Berazategui?", "Sí. En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) acompañamos a niños y adolescentes de toda la Zona Sur. Podés pedir una primera entrevista por WhatsApp, sin derivación."),
        ("¿Qué hago si mi hijo no quiere ir a la escuela por miedo?", "Evitá que deje de ir del todo, porque el miedo suele crecer. Hablá con la escuela para acordar apoyos graduales y consultá con psicología para entender qué le pasa."),
    ],
    sources=["medline_ansiedad", "medline_separacion"],
    related=["psico", "tarta", "tdah", "talleres", "guias", "psicodx"],
))

# ───────────────────────── 5. INTEGRACIÓN SENSORIAL ─────────────────────────
ART.append(dict(
    slug="integracion-sensorial-senales.html", ilu="integracion-sensorial", articulo=True,
    title="Integración sensorial: qué es y señales | Centro Sinapsis",
    desc="Molestias con ruidos, ropa o comidas, o necesidad de moverse todo el tiempo: qué es la integración sensorial y cómo ayuda la terapia ocupacional en Berazategui.",
    crumb_parent=GUIAS, crumb="Integración sensorial", tag="Guía · Terapia Ocupacional",
    h1="Integración sensorial: qué es y qué señales mirar",
    lead="Cómo el cuerpo procesa sonidos, texturas y movimiento, por qué a algunos chicos les cuesta más, y cómo se acompaña desde la terapia ocupacional.",
    cta="Consultar con terapia ocupacional", motivo="desarrollo",
    wa="Hola! Quisiera consultar con terapia ocupacional por temas sensoriales de mi hijo/a.",
    about={"@type": "MedicalTherapy", "name": "Terapia ocupacional con enfoque de integración sensorial"},
    body=
    sec("La respuesta corta",
        "<p>La integración sensorial es la forma en que el sistema nervioso organiza la información que llega por los sentidos (sonidos, texturas, movimiento, posición del cuerpo) para responder de manera adecuada. Algunos chicos reaccionan de más o de menos a esos estímulos: se tapan los oídos con ruidos comunes, no toleran ciertas ropas o comidas, o buscan moverse y chocarse todo el tiempo. Cuando eso dificulta su día a día, la terapia ocupacional puede evaluar y acompañar. En Centro Sinapsis, en Berazategui, lo hacemos sin derivación médica previa.</p>")
    + sec("Señales que pueden aparecer",
          card("Reacciona de más", "Le molestan mucho ruidos cotidianos (secador, licuadora, el recreo); no tolera etiquetas, costuras o ciertas telas; rechaza muchas texturas de comida; evita ensuciarse las manos; se asusta con el movimiento (hamacas, escaleras).")
          + card("Reacciona de menos o busca más", "Parece no registrar golpes o caídas; busca moverse, saltar y chocarse todo el tiempo; toca todo; se lleva objetos a la boca más allá de la edad esperable.")
          + card("En la organización del cuerpo", "Se lo ve torpe, se cae seguido, le cuestan las tareas finas como abrocharse, recortar o usar el lápiz, o se cansa enseguida al estar sentado."))
    + '  <div class="svc-callout">Las dificultades de procesamiento sensorial <strong>no son un diagnóstico médico por sí mismas</strong>: muchas veces aparecen junto a otras condiciones, como el <a href="autismo-tea-berazategui.html">autismo (TEA)</a> o el <a href="tdah-berazategui.html">TDAH</a>, y otras veces solas. Lo importante es cuánto afectan la vida diaria del chico.</div>\n'
    + sec("Cómo ayudar en casa",
          ul(["<b>Anticipá</b> los momentos que le cuestan (un lugar ruidoso, un corte de pelo) y avisale qué va a pasar.",
              "<b>Respetá lo que le molesta</b> sin forzarlo: ropa sin etiquetas, auriculares en lugares ruidosos.",
              "<b>Ofrecé movimiento</b> en momentos del día: saltar, trepar, jugar en la plaza, antes de las tareas que piden quietud.",
              "<b>Anotá qué situaciones lo desbordan</b>: es información muy útil para la evaluación."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"terapia-ocupacional-integracion-sensorial.html\">terapia ocupacional</a> evaluamos cómo el chico procesa la información sensorial y cómo eso impacta en el juego, la alimentación, el vestido y la escuela. A partir de ahí trabajamos con actividades de juego y movimiento, y le damos a la familia y a la escuela estrategias concretas para el día a día.</p>"),
    faqs=[
        ("¿Qué hace un terapista ocupacional con integración sensorial?", "Evalúa cómo el chico responde a los estímulos sensoriales y cómo eso afecta su vida diaria, y trabaja con actividades de juego y movimiento para que pueda regularse mejor, además de orientar a la familia y la escuela."),
        ("¿Las dificultades sensoriales son autismo?", "No necesariamente. Son frecuentes en personas con autismo, pero también aparecen en chicos con otras condiciones o sin ningún diagnóstico. Si además hay otras señales, conviene una evaluación del desarrollo."),
        ("¿Desde qué edad se puede consultar?", "Desde muy pequeños. Si notás que las reacciones a los estímulos le dificultan comer, dormir, vestirse o jugar, podés consultar."),
        ("¿Hay terapia ocupacional en Berazategui?", "Sí. En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) hacemos terapia ocupacional con enfoque de integración sensorial, para familias de toda la Zona Sur."),
    ],
    sources=[],
    related=["to", "tea", "senales", "tdah", "temprana", "guias"],
))

# ───────────────────────── 6. OLVIDOS EN ADULTOS MAYORES ─────────────────────────
ART.append(dict(
    slug="olvidos-memoria-adultos-mayores.html", ilu="olvidos", articulo=True,
    title="Olvidos en adultos mayores: cuándo preocuparse | Centro Sinapsis",
    desc="¿Olvidos normales de la edad o algo para consultar? Señales de alerta en la memoria de adultos mayores, evaluación neurocognitiva y estimulación en Berazategui.",
    crumb_parent=GUIAS, crumb="Olvidos y memoria", tag="Guía · Adultos mayores",
    h1="Olvidos en adultos mayores: ¿cuándo preocuparse?",
    lead="Qué cambios en la memoria son esperables con los años, cuáles conviene consultar, y cómo ayudan la evaluación y la estimulación cognitiva.",
    cta="Consultar por memoria", motivo="adultos-mayores",
    wa="Hola! Quisiera consultar por olvidos / memoria de un familiar mayor.",
    about={"@type": "MedicalCondition", "name": "Deterioro cognitivo", "alternateName": "Problemas de memoria en adultos mayores"},
    body=
    sec("La respuesta corta",
        "<p>Con los años es esperable tardar un poco más en recordar un nombre o dónde quedaron las llaves. Conviene consultar cuando los olvidos son frecuentes y empiezan a afectar la vida diaria: repetir la misma pregunta, perderse en lugares conocidos, olvidar conversaciones recientes, o tener dificultades nuevas para manejar el dinero, los remedios o tareas que antes resolvía sin problema. En Centro Sinapsis, en Berazategui, hacemos evaluación neurocognitiva y estimulación cognitiva, y trabajamos junto al médico de cabecera.</p>")
    + sec("Olvidos esperables y señales de alerta",
          card("Suele ser parte de la edad", "Olvidar dónde dejó algo y encontrarlo después; tardar en recordar un nombre que después aparece; distraerse más; necesitar anotar más cosas.")
          + card("Conviene consultar", "Repetir las mismas preguntas o historias en poco tiempo; olvidar hechos recientes importantes; perderse en el barrio; confundir fechas o no saber en qué día está; dejar de poder hacer tareas habituales (cocinar, pagar cuentas, tomar la medicación); cambios de ánimo o de carácter; que otras personas lo noten antes que él."))
    + '  <div class="svc-callout">Algunas causas de los problemas de memoria <strong>tienen tratamiento</strong>: la depresión, problemas de tiroides, déficit de vitaminas o efectos de medicamentos. Por eso siempre conviene que el médico de cabecera participe del proceso.</div>\n'
    + sec("Qué hacer si notás estos cambios",
          ul(["<b>Anotá qué cambios notás</b> y desde cuándo, con ejemplos concretos.",
              "<b>Consultá con el médico de cabecera</b> o con neurología para descartar causas tratables.",
              "<b>Pedí una evaluación neurocognitiva</b>: mide memoria, atención, lenguaje y funciones ejecutivas, y permite comparar en el tiempo.",
              "<b>Mantené la actividad</b>: la actividad física, el contacto social y los desafíos mentales hacen bien.",
              "<b>Cuidá la seguridad en casa</b>: pastilleros, recordatorios, buena iluminación (mirá también nuestra guía de <a href=\"prevencion-caidas-adultos-mayores.html\">prevención de caídas</a>)."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>Hacemos <a href=\"evaluacion-neurocognitiva-berazategui.html\">evaluación neurocognitiva</a> para conocer el perfil de cada persona, y ofrecemos <a href=\"estimulacion-cognitiva-berazategui.html\">estimulación cognitiva</a> individual y un <a href=\"talleres.html#taller-estimulacion-cognitiva-adultos\">taller de estimulación cognitiva para adultos</a>. También acompañamos a la familia, que muchas veces necesita orientación y sostén.</p>"),
    faqs=[
        ("¿Es normal perder memoria con la edad?", "Algunos cambios leves son esperables, como tardar más en recordar un nombre. Lo que no es esperable es que los olvidos sean frecuentes y afecten la vida diaria; en ese caso conviene consultar."),
        ("¿Qué es el deterioro cognitivo leve?", "Es un cambio en la memoria u otras funciones mentales mayor al esperable para la edad, pero que todavía permite a la persona manejarse en su vida diaria. Conviene evaluarlo y hacer un seguimiento."),
        ("¿La estimulación cognitiva sirve?", "La estimulación cognitiva ayuda a mantener activas la memoria, la atención y otras funciones, y a sostener la autonomía. No reemplaza el seguimiento médico, pero lo complementa."),
        ("¿Dónde hacen evaluación de memoria en Berazategui?", "En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) hacemos evaluación neurocognitiva y estimulación cognitiva para adultos mayores de Berazategui, Quilmes, Florencio Varela y alrededores."),
    ],
    sources=["medline_memoria", "medline_dcl", "oms_demencia"],
    related=["neuro", "estcog", "talleres", "caidas", "kine", "guias"],
))

# ───────────────────────── 7. PREVENCIÓN DE CAÍDAS ─────────────────────────
ART.append(dict(
    slug="prevencion-caidas-adultos-mayores.html", ilu="caidas", articulo=True,
    title="Prevención de caídas en adultos mayores | Centro Sinapsis",
    desc="Cómo prevenir caídas en adultos mayores: ejercicio de fuerza y equilibrio, casa segura y señales de riesgo. Kinesiología y gimnasio terapéutico en Berazategui.",
    crumb_parent=GUIAS, crumb="Prevención de caídas", tag="Guía · Kinesiología",
    h1="Cómo prevenir caídas en adultos mayores",
    lead="Fuerza, equilibrio y una casa preparada: lo que más ayuda a evitar caídas y a sostener la autonomía con los años.",
    cta="Consultar por kinesiología", motivo="adultos-mayores",
    wa="Hola! Quisiera consultar por kinesiología / prevención de caídas para un adulto mayor.",
    about={"@type": "MedicalCondition", "name": "Caídas en adultos mayores"},
    body=
    sec("La respuesta corta",
        "<p>Las caídas son una de las principales causas de lesiones en personas mayores, pero muchas se pueden prevenir. Lo que más ayuda es hacer ejercicio de fuerza y equilibrio de forma regular, revisar la medicación y la vista con el médico, y adaptar la casa (buena luz, sin alfombras sueltas, barandas y antideslizantes). En Centro Sinapsis, en Berazategui, la kinesiología y el gimnasio terapéutico para adultos mayores trabajan justamente fuerza, equilibrio y autonomía.</p>")
    + sec("Señales de mayor riesgo",
          ul(["Ya tuvo una caída en el último año, o miedo a caerse.",
              "Se siente inestable al caminar o necesita apoyarse en los muebles.",
              "Le cuesta levantarse de una silla sin usar los brazos.",
              "Toma varios medicamentos, en especial para dormir o la presión.",
              "Tiene problemas de visión, mareos o dolor en los pies.",
              "Camina menos o dejó de salir por inseguridad."]))
    + sec("Qué hacer para prevenir caídas",
          card("Moverse con un plan", "Ejercicios de fuerza de piernas, equilibrio y marcha, de forma regular y guiados por un profesional. Es la medida con mejores resultados.")
          + card("Revisar la salud", "Control de la vista, revisión de la medicación con el médico, cuidado de los pies y calzado cerrado y firme.")
          + card("Preparar la casa", "Buena iluminación (también de noche, camino al baño), sacar alfombras sueltas y cables, barandas en escaleras, agarraderas y antideslizante en el baño, y lo de uso diario a mano."))
    + '  <div class="svc-callout">Después de una caída, aunque no haya lesiones, <strong>conviene consultar</strong>: el miedo a volver a caerse lleva a moverse menos, y eso aumenta el riesgo.</div>\n'
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"kinesiologia-adultos-mayores-berazategui.html\">kinesiología para adultos mayores</a> evaluamos fuerza, equilibrio y marcha, y armamos un plan de ejercicios en nuestro gimnasio terapéutico, pensado para ganar seguridad y autonomía en el día a día.</p>"),
    faqs=[
        ("¿Qué ejercicios previenen caídas?", "Los que combinan fuerza de piernas, equilibrio y práctica de la marcha, hechos de forma regular y con progresión. Lo ideal es que un profesional los adapte a cada persona."),
        ("¿Cómo preparo la casa de un adulto mayor?", "Buena iluminación, sin alfombras sueltas ni cables en el paso, barandas en escaleras, agarraderas y antideslizante en el baño, y los objetos de uso diario al alcance."),
        ("¿Hay kinesiología para adultos mayores en Berazategui?", "Sí. En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) tenemos kinesiología y gimnasio terapéutico para adultos mayores de toda la Zona Sur."),
        ("¿Qué hacer después de una caída?", "Consultar con el médico aunque no haya lesiones visibles, y trabajar fuerza y equilibrio para recuperar la confianza al moverse."),
    ],
    sources=["oms_caidas", "medline_caidas"],
    related=["kine", "olvidos", "estcog", "talleres", "guias", "disc"],
))


# ───────────────────────── índice /guias.html ─────────────────────────
INDICE = [
    ("senales-autismo-ninos.html", "senales-autismo", "¿Cómo saber si mi hijo tiene autismo?", "Señales por edad y cuándo consultar.", "Autismo / TEA"),
    ("retraso-lenguaje-ninos.html", "lenguaje", "Mi hijo no habla: ¿cuándo consultar?", "Qué es esperable a cada edad en el lenguaje.", "Fonoaudiología"),
    ("problemas-pronunciacion-ninos.html", "pronunciacion", "Mi hijo no pronuncia bien", "La erre, la ese y otros sonidos: qué es esperable.", "Fonoaudiología"),
    ("tartamudez-ninos.html", "tartamudez", "Tartamudez en niños", "Cuándo es parte del desarrollo y cuándo consultar.", "Fonoaudiología"),
    ("dislexia-senales-ninos.html", "dislexia", "Dislexia en niños", "Señales en el jardín y la primaria.", "Psicopedagogía"),
    ("tdah-berazategui.html", "tdah", "TDAH en niños y adultos", "Atención, inquietud e impulsividad.", "Psicología"),
    ("ansiedad-en-ninos.html", "ansiedad", "Ansiedad en niños y adolescentes", "Señales y cómo acompañar en casa.", "Psicología"),
    ("integracion-sensorial-senales.html", "integracion-sensorial", "Integración sensorial", "Ruidos, texturas y movimiento: qué mirar.", "Terapia Ocupacional"),
    ("centro-discapacidad-zona-sur.html", "discapacidad", "¿Qué es el CUD y cómo se tramita?", "Prestaciones para personas con discapacidad.", "Discapacidad"),
    ("olvidos-memoria-adultos-mayores.html", "olvidos", "Olvidos en adultos mayores", "Qué es esperable y cuándo preocuparse.", "Adultos mayores"),
    ("prevencion-caidas-adultos-mayores.html", "caidas", "Cómo prevenir caídas", "Fuerza, equilibrio y una casa segura.", "Adultos mayores"),
]


def indice_html():
    url = P.BASE + "guias.html"
    title = "Guías para familias: desarrollo y salud mental | Centro Sinapsis"
    desc = "Guías claras sobre autismo, lenguaje, dislexia, TDAH, ansiedad, integración sensorial y adultos mayores, escritas por el equipo de Centro Sinapsis."
    assert len(desc) <= 160 and len(title) <= 65, (len(title), len(desc))
    ld = [
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Inicio", "item": P.BASE},
            {"@type": "ListItem", "position": 2, "name": "Guías para familias", "item": url}]},
        {"@context": "https://schema.org", "@type": "CollectionPage", "name": "Guías para familias", "url": url, "description": desc,
         "inLanguage": "es-AR", "dateModified": P.FECHA, "isPartOf": {"@id": P.BASE + "#website"}, "publisher": {"@id": P.BASE + "#organization"},
         "mainEntity": {"@type": "ItemList", "itemListElement": [
             {"@type": "ListItem", "position": i + 1, "url": P.BASE + s, "name": t} for i, (s, _, t, _, _) in enumerate(INDICE)]}},
    ]
    ld_html = "\n".join('<script type="application/ld+json">\n' + json.dumps(o, ensure_ascii=False, indent=2) + "\n</script>" for o in ld)
    tarjetas = "".join(f'''
      <a class="gu-card" href="{s}">
        <img src="img/ilustraciones/{ilu}.svg" alt="" width="120" height="120" loading="lazy" decoding="async">
        <div><span class="gu-tag">{esc(tag)}</span><h2>{esc(t)}</h2><p>{esc(d)}</p></div>
      </a>''' for s, ilu, t, d, tag in INDICE)
    # se reutiliza la página de un artículo como base visual (nav, hero, footer)
    base = P.page(dict(ART[0], slug="guias.html", title=title, desc=desc, crumb_parent=("Inicio", ""), crumb="Guías para familias",
                       tag="Guías para familias", h1="Guías para familias", ilu="guias", articulo=False, faqs=[("x", "x")], sources=[], related=[],
                       lead="Artículos claros, escritos por nuestro equipo, para entender qué es esperable en cada etapa y cuándo conviene consultar.",
                       body="@@CUERPO@@", cta="Consultar por WhatsApp", wa="Hola! Quisiera hacer una consulta.", motivo=""))
    # reemplazar el <head> estructurado y el cuerpo
    ini, fin = base.index('<script type="application/ld+json">'), base.index("<!-- Google Analytics 4 -->")
    base = base[:ini] + ld_html + "\n" + base[fin:]
    m_ini = base.index('<main id="main" class="svc-main">') + len('<main id="main" class="svc-main">')
    m_fin = base.index('<section class="svc-cta-final">')
    cuerpo = f'''
  <section class="svc-section">
    <p>En estas guías respondemos las preguntas que más nos hacen las familias de Berazategui, Quilmes, Florencio Varela y toda la Zona Sur. Son informativas y no reemplazan una evaluación: si algo de lo que leés te preocupa, escribinos y lo charlamos.</p>
  </section>
  <section class="gu-grid" aria-label="Artículos">{tarjetas}
  </section>
  <section class="svc-section" id="consulta">
    <div data-consulta data-motivo=""></div>
  </section>
'''
    base = base[:m_ini] + cuerpo + base[m_fin:]
    base = base.replace('<a href="/">Inicio</a><span>/</span><a href="/">Inicio</a><span>/</span>', '<a href="/">Inicio</a><span>/</span>')
    base = base.replace('<link rel="stylesheet" href="css/consulta.css">', '<link rel="stylesheet" href="css/consulta.css">\n<link rel="stylesheet" href="css/guias.css">')
    return base


if __name__ == "__main__":
    for a in ART:
        with open(os.path.join(P.ROOT, a["slug"]), "w", encoding="utf-8") as f:
            f.write(P.page(a))
        print("ok", a["slug"], len(a["title"]), len(a["desc"]))
    with open(os.path.join(P.ROOT, "guias.html"), "w", encoding="utf-8") as f:
        f.write(indice_html())
    print("ok guias.html")
