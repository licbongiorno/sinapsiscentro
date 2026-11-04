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
    related=["to", "tea", "selectividad", "senales", "temprana", "guias"],
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
    related=["neuro", "estcog", "estcog_casa", "talleres", "caidas", "guias"],
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

# ═════════════════════════ TANDA 2: cobertura por profesión ═════════════════════════

# ───────── PSICOLOGÍA 1: cuándo llevar a mi hijo al psicólogo ─────────
ART.append(dict(
    slug="cuando-llevar-a-mi-hijo-al-psicologo.html", ilu="psicologo-infantil", articulo=True,
    title="¿Cuándo llevar a mi hijo al psicólogo? | Centro Sinapsis",
    desc="Señales de que un niño o adolescente puede necesitar un psicólogo, cómo prepararlo para la primera consulta y cómo trabajamos en Berazategui y Zona Sur.",
    crumb_parent=GUIAS, crumb="¿Cuándo ir al psicólogo?", tag="Guía · Psicología",
    h1="¿Cuándo llevar a mi hijo al psicólogo?",
    lead="Señales que conviene mirar, cómo explicarle a tu hijo que va a ir a un psicólogo y qué pasa en la primera consulta.",
    cta="Consultar con psicología", motivo="emocional",
    wa="Hola! Quisiera consultar con psicología infantil para mi hijo/a.",
    about={"@type": "MedicalTherapy", "name": "Psicología infantil y adolescente"},
    body=
    sec("La respuesta corta",
        "<p>Conviene consultar con un psicólogo cuando un cambio en tu hijo o hija dura varias semanas y empieza a afectar su vida diaria: está más triste, irritable o con miedos que antes, cambió su forma de dormir o de comer, le va peor en la escuela, se aísla, o atraviesa una situación difícil (una separación, una mudanza, una pérdida). No hace falta que haya “un problema grave”: consultar a tiempo ayuda. En Centro Sinapsis, en Berazategui, atendemos a niños, adolescentes y sus familias sin derivación médica previa.</p>")
    + sec("Señales que conviene mirar",
          card("En las emociones", "Tristeza, enojo o miedo que se repiten y duran semanas; llanto fácil; preocupación constante; baja autoestima (“no sirvo para nada”).")
          + card("En la conducta", "Berrinches muy intensos para su edad, agresividad, aislamiento, dejar de jugar o de ver a sus amigos, conductas que preocupan en la escuela.")
          + card("En el cuerpo y la rutina", "Cambios en el sueño o el apetito, dolores de panza o de cabeza frecuentes sin causa médica, volver a hacerse pis cuando ya había dejado los pañales.")
          + card("Después de algo difícil", "Una separación, la muerte de un ser querido, una mudanza, un cambio de escuela, una situación de violencia o de bullying."))
    + '  <div class="svc-callout"><strong>Si tu hijo o hija habla de lastimarse o de no querer vivir</strong>, no esperes un turno: llamá al 911 o acercate a la guardia más cercana.</div>\n'
    + sec("Cómo contarle que va a ir al psicólogo",
          ul(["<b>Con palabras simples y sin dramatizar</b>: “Vamos a ir a charlar y jugar con alguien que ayuda a los chicos cuando algo les preocupa”.",
              "<b>Sin presentarlo como un castigo</b> ni como algo que “le pasa porque se porta mal”.",
              "<b>Contale que los adultos también van</b>, y que es un lugar donde puede decir lo que siente.",
              "<b>Con los adolescentes, involucralos en la decisión</b>: es más fácil sostener un espacio que eligieron."]))
    + sec("Cómo es la primera consulta",
          "<p>Con los más chicos, la primera entrevista suele ser con los padres o adultos a cargo, para conocer la historia y lo que preocupa. Después el psicólogo se encuentra con el chico, muchas veces a través del juego y el dibujo, que son su forma natural de expresarse. Con los adolescentes, se les da un espacio propio desde el principio. En Centro Sinapsis, si hace falta, sumamos a otros profesionales del equipo y articulamos con la escuela. Conocé más de nuestro servicio de <a href=\"psicologia-berazategui.html\">psicología</a>.</p>"),
    faqs=[
        ("¿Cómo sé si mi hijo necesita un psicólogo?", "Si notás cambios en sus emociones, su conducta, su sueño o su rendimiento escolar que duran varias semanas y afectan su vida diaria, o si atraviesa una situación difícil, es un buen momento para consultar."),
        ("¿A partir de qué edad puede ir un niño al psicólogo?", "Desde muy pequeños. Con los niños más chicos se trabaja mucho con los padres y a través del juego."),
        ("¿Los padres participan de la terapia?", "Sí. Sobre todo con niños, la familia tiene un rol central: hay entrevistas con los adultos y orientación para acompañar en casa."),
        ("¿Hay psicólogos infantiles en Berazategui?", "Sí. En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) atendemos a niños y adolescentes de toda la Zona Sur. Podés pedir una primera entrevista por WhatsApp, sin derivación."),
    ],
    sources=["medline_conducta", "medline_salud_mental", "medline_ansiedad"],
    related=["psico", "ansiedad", "rabietas", "atencion", "tdah", "guias"],
))

# ───────── PSICOLOGÍA 2: rabietas ─────────
ART.append(dict(
    slug="rabietas-berrinches-ninos.html", ilu="berrinche", articulo=True,
    title="Rabietas y berrinches: cuándo preocuparse | Centro Sinapsis",
    desc="Berrinches en niños: qué es esperable según la edad, cómo acompañarlos con calma y cuándo conviene consultar con psicología. Centro Sinapsis, Berazategui.",
    crumb_parent=GUIAS, crumb="Rabietas y berrinches", tag="Guía · Psicología",
    h1="Rabietas y berrinches: qué es esperable y cuándo consultar",
    lead="Los berrinches son parte del desarrollo, sobre todo entre los 1 y los 4 años. Te contamos cómo acompañarlos y qué señales merecen una consulta.",
    cta="Consultar con psicología", motivo="emocional",
    wa="Hola! Quisiera consultar por berrinches / conducta de mi hijo/a.",
    about={"@type": "MedicalCondition", "name": "Rabietas en la infancia"},
    body=
    sec("La respuesta corta",
        "<p>Las rabietas son frecuentes y esperables entre el año y los 4 años: el chico siente emociones muy intensas y todavía no tiene las palabras ni las herramientas para manejarlas. Conviene consultar si son muy frecuentes o muy largas, si siguen siendo intensas después de los 5 años, si incluyen golpes hacia otros o hacia sí mismo, o si la familia ya no sabe cómo manejarlas. En Centro Sinapsis, en Berazategui, la psicología infantil acompaña al chico y orienta a los padres.</p>")
    + sec("¿Por qué pasan?",
          "<p>En los primeros años el cerebro todavía está aprendiendo a regular las emociones. Cansancio, hambre, cambios de rutina, frustración o no poder expresar lo que quiere suelen desencadenarlas. No son “manipulación”: son una forma de comunicar algo que el chico no puede poner en palabras.</p>")
    + sec("Cómo acompañar una rabieta",
          ul(["<b>Mantené la calma</b>: tu tono tranquilo lo ayuda a regularse.",
              "<b>Cuidá que esté seguro</b> y quedate cerca, aunque no hable.",
              "<b>Poné en palabras lo que siente</b>: “Estás muy enojado porque querías seguir jugando”.",
              "<b>Sostené el límite</b> sin gritos ni castigos físicos: el “no” sigue siendo “no”.",
              "<b>Cuando se calme, hablen</b> y ofrecé alternativas para la próxima vez.",
              "<b>Anticipá</b> los momentos difíciles (salir de la plaza, apagar la pantalla) con avisos previos."]))
    + sec("Señales para consultar",
          ul(["Las rabietas son diarias, duran mucho tiempo o van en aumento.",
              "Siguen siendo frecuentes e intensas después de los 5 años.",
              "Se lastima o lastima a otros durante las crisis.",
              "Le traen problemas en el jardín o la escuela.",
              "Aparecen junto a otras señales: retraso en el habla, dificultades para relacionarse, reacciones muy intensas a ruidos o texturas (en ese caso conviene mirar también el <a href=\"senales-autismo-ninos.html\">desarrollo general</a> y la <a href=\"integracion-sensorial-senales.html\">integración sensorial</a>).",
              "Los adultos de la casa se sienten desbordados."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"psicologia-berazategui.html\">psicología</a> trabajamos con el chico a través del juego para que aprenda a reconocer y regular lo que siente, y con la familia para encontrar estrategias que funcionen en casa. Si aparecen otras señales, sumamos al equipo interdisciplinario.</p>"),
    faqs=[
        ("¿Hasta qué edad son normales los berrinches?", "Son muy frecuentes entre el año y los 4 años y suelen disminuir a medida que el chico aprende a hablar y a manejar sus emociones. Si siguen siendo frecuentes e intensos después de los 5 años, conviene consultar."),
        ("¿Hay que ignorar los berrinches?", "No se trata de ignorar al chico, sino de no ceder a lo que pide por el berrinche: quedate cerca, cuidá que esté seguro y sostené el límite con calma."),
        ("¿Los berrinches pueden ser señal de autismo o TDAH?", "Por sí solos, no. Pero si aparecen junto a otras señales del desarrollo, de la comunicación o de la atención, vale la pena una evaluación."),
        ("¿Dónde consultar por conducta infantil en Berazategui?", "En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) acompañamos a niños y familias de toda la Zona Sur desde la psicología infantil, sin derivación previa."),
    ],
    sources=["medline_conducta", "medline_preescolar"],
    related=["psico", "psi_infantil", "ansiedad", "sensorial", "senales", "guias"],
))

# ───────── PSICOLOGÍA 3: primera consulta (adultos) ─────────
ART.append(dict(
    slug="primera-consulta-psicologo.html", ilu="primera-consulta", articulo=True,
    title="Primera consulta con el psicólogo: cómo es | Centro Sinapsis",
    desc="Qué pasa en la primera consulta con un psicólogo, qué preguntar, cuánto dura la terapia y cómo empezar en Berazategui. Guía para adultos que nunca fueron.",
    crumb_parent=GUIAS, crumb="Primera consulta", tag="Guía · Psicología",
    h1="Tu primera consulta con el psicólogo: cómo es",
    lead="Si nunca fuiste a terapia, es normal tener dudas. Te contamos qué pasa en la primera entrevista y cómo saber si es el espacio indicado para vos.",
    cta="Pedir mi primera entrevista", motivo="emocional",
    wa="Hola! Quisiera pedir una primera entrevista con psicología para mí.",
    about={"@type": "MedicalTherapy", "name": "Psicoterapia para adultos"},
    body=
    sec("La respuesta corta",
        "<p>La primera consulta con un psicólogo es una charla para conocerse: contás qué te trae, qué te gustaría que cambie, y el profesional te pregunta sobre tu historia y tu momento actual. No hace falta tener todo claro ni saber “qué tenés”. Al final se acuerda cómo seguir: frecuencia, objetivos y si ese espacio es el indicado. En Centro Sinapsis, en Berazategui, podés pedir tu primera entrevista por WhatsApp, sin derivación médica.</p>")
    + sec("Motivos frecuentes para consultar",
          ul(["Ansiedad, nervios constantes, ataques de pánico.",
              "Tristeza o desgano que duran semanas.",
              "Problemas para dormir o mucho cansancio.",
              "Duelos, separaciones, cambios importantes.",
              "Dificultades en los vínculos, la pareja o el trabajo.",
              "Ganas de conocerse mejor, aunque no haya una crisis.",
              "Sospechar TDAH o autismo en la adultez: también hacemos <a href=\"autismo-tea-berazategui.html\">evaluación de diagnóstico tardío</a> y de <a href=\"tdah-berazategui.html\">TDAH</a>."]))
    + sec("Qué pasa en la primera entrevista",
          card("Contás lo que te trae", "Con tus palabras y a tu ritmo. Podés llevar anotado lo que no querés olvidarte de decir.")
          + card("El psicólogo pregunta y escucha", "Sobre tu historia, tu momento actual, lo que ya probaste. Todo lo que se habla es confidencial.")
          + card("Acuerdan cómo seguir", "Frecuencia de los encuentros, objetivos, modalidad y honorarios o cobertura. También podés preguntar cómo trabaja."))
    + sec("Preguntas que podés hacer",
          ul(["¿Cómo trabajás? ¿Qué enfoque usás?", "¿Con qué frecuencia nos veríamos?", "¿Cuánto suele durar un proceso como el mío?",
              "¿Atendés con mi obra social o por reintegro?", "¿Qué pasa si siento que no me sirve?"]))
    + '  <div class="svc-callout">Es normal sentir nervios antes de la primera consulta. <strong>Sentirse cómodo con el profesional es parte del proceso</strong>: si no es el caso, se puede hablar y buscar otra opción.</div>\n'
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"psicologia-berazategui.html\">psicología</a> atendemos a adultos principalmente de forma presencial en Berazategui, con seguimiento virtual en algunos casos. Conocé a nuestro <a href=\"equipo-profesional.html\">equipo de psicólogos</a>.</p>"),
    faqs=[
        ("¿Qué se hace en la primera sesión con el psicólogo?", "Se conversa sobre lo que te trae a consultar, tu historia y tu momento actual, y se acuerda cómo seguir: frecuencia, objetivos y modalidad."),
        ("¿Necesito derivación para ir al psicólogo?", "No. En Centro Sinapsis podés pedir una primera entrevista directamente por WhatsApp."),
        ("¿Cuánto dura una terapia?", "Depende de cada persona y de lo que la trae. Algunos procesos son breves y otros más largos; se va revisando junto con el profesional."),
        ("¿Atienden adultos en Berazategui?", "Sí. En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) atendemos adultos de Berazategui, Quilmes, Florencio Varela y toda la Zona Sur."),
    ],
    sources=["medline_salud_mental", "medline_ansiedad"],
    related=["psico", "tdah", "tea", "psi_infantil", "obras", "guias"],
))

# ───────── PSICOPEDAGOGÍA 1: qué hace un psicopedagogo ─────────
ART.append(dict(
    slug="que-hace-un-psicopedagogo.html", ilu="psicopedagogo", articulo=True,
    title="¿Qué hace un psicopedagogo? Cuándo consultar | Centro Sinapsis",
    desc="Qué hace un psicopedagogo, en qué casos conviene consultar (aprendizaje, atención, organización escolar) y cómo es el proceso en Berazategui y Zona Sur.",
    crumb_parent=GUIAS, crumb="¿Qué hace un psicopedagogo?", tag="Guía · Psicopedagogía",
    h1="¿Qué hace un psicopedagogo y cuándo consultar?",
    lead="La psicopedagogía acompaña la forma en que cada persona aprende. Te contamos qué hace, en qué casos ayuda y cómo es el proceso.",
    cta="Consultar con psicopedagogía", motivo="aprendizaje",
    wa="Hola! Quisiera consultar con psicopedagogía para mi hijo/a.",
    about={"@type": "MedicalTherapy", "name": "Psicopedagogía"},
    body=
    sec("La respuesta corta",
        "<p>Un psicopedagogo evalúa y acompaña los procesos de aprendizaje: cómo aprende un chico, qué le cuesta y por qué, y qué estrategias le sirven. Conviene consultar cuando hay dificultades persistentes con la lectura, la escritura o las matemáticas, problemas de atención u organización, bajo rendimiento escolar sin una causa clara, o rechazo a ir a la escuela por las tareas. En Centro Sinapsis, en Berazategui, la psicopedagogía trabaja junto a la familia y la escuela, sin derivación médica previa.</p>")
    + sec("¿En qué casos ayuda?",
          ul(["Dificultades para aprender a leer o escribir (por ejemplo, <a href=\"dislexia-senales-ninos.html\">dislexia</a> o <a href=\"dificultades-escritura-disgrafia.html\">dificultades en la escritura</a>).",
              "Dificultades con los números y el cálculo (<a href=\"discalculia-ninos.html\">discalculia</a>).",
              "Problemas de atención, concentración u organización con las tareas.",
              "Bajo rendimiento escolar o repitencia.",
              "Técnicas de estudio para adolescentes.",
              "Acompañamiento escolar de chicos con TEA, TDAH u otras condiciones."]))
    + sec("Cómo es el proceso",
          card("1. Entrevista inicial", "Con la familia, para conocer la historia escolar, lo que preocupa y lo que dice la escuela.")
          + card("2. Evaluación psicopedagógica", "Encuentros con el chico con actividades y pruebas para ver cómo lee, escribe, calcula, presta atención y se organiza.")
          + card("3. Devolución", "Una explicación clara de lo que se observó y un informe, con sugerencias para la casa y la escuela.")
          + card("4. Tratamiento", "Encuentros regulares con un plan a medida, revisado periódicamente, y articulación con la escuela cuando hace falta."))
    + sec("Psicopedagogía, psicología y fonoaudiología: ¿cuál es la diferencia?",
          "<p>La <b>psicopedagogía</b> se ocupa del aprendizaje; la <b>psicología</b>, de las emociones y la conducta; la <b>fonoaudiología</b>, del lenguaje, el habla y la comunicación. Muchas veces las dificultades se combinan: por eso en Centro Sinapsis trabajamos en equipo y definimos juntos qué profesional o combinación es la más indicada.</p>")
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>Conocé nuestro servicio de <a href=\"psicopedagogia-dificultades-aprendizaje.html\">psicopedagogía</a>, el espacio de <a href=\"alfabetizacion-berazategui.html\">alfabetización</a> y el <a href=\"talleres.html#taller-alfabetizacion\">taller de alfabetización</a>.</p>"),
    faqs=[
        ("¿Qué hace un psicopedagogo con un niño?", "Evalúa cómo aprende, qué le cuesta y por qué, y trabaja con él estrategias para leer, escribir, calcular, organizarse y estudiar, en coordinación con la familia y la escuela."),
        ("¿Cuándo llevar a un niño al psicopedagogo?", "Cuando las dificultades para aprender persisten a pesar del apoyo habitual de la escuela y la casa, o cuando la escuela sugiere una evaluación."),
        ("¿Cuál es la diferencia entre psicólogo y psicopedagogo?", "El psicopedagogo se especializa en los procesos de aprendizaje; el psicólogo, en las emociones, los vínculos y la conducta. A veces se trabaja con ambos."),
        ("¿Hay psicopedagogos en Berazategui?", "Sí. En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) hacemos evaluación y tratamiento psicopedagógico para familias de toda la Zona Sur."),
    ],
    sources=["medline_aprendizaje", "medline_lectura"],
    related=["psicoped", "dislexia", "discalculia", "disgrafia", "tdah", "guias"],
))

# ───────── PSICOPEDAGOGÍA 2: discalculia ─────────
ART.append(dict(
    slug="discalculia-ninos.html", ilu="discalculia", articulo=True,
    title="Discalculia: dificultades con los números | Centro Sinapsis",
    desc="¿A tu hijo le cuestan mucho los números y el cálculo? Señales de discalculia por edad, qué hacer y cómo acompaña la psicopedagogía en Berazategui.",
    crumb_parent=GUIAS, crumb="Discalculia", tag="Guía · Psicopedagogía",
    h1="Discalculia: cuando los números cuestan más de la cuenta",
    lead="Qué es la discalculia, cómo se diferencia de “no ser bueno en matemáticas” y qué señales conviene mirar.",
    cta="Consultar con psicopedagogía", motivo="aprendizaje",
    wa="Hola! Quisiera consultar con psicopedagogía porque a mi hijo/a le cuestan mucho las matemáticas.",
    about={"@type": "MedicalCondition", "name": "Discalculia", "alternateName": "Trastorno específico del aprendizaje de las matemáticas"},
    body=
    sec("La respuesta corta",
        "<p>La discalculia es una dificultad específica y persistente para entender los números, las cantidades y el cálculo, que no se explica por falta de enseñanza ni por la inteligencia del chico. Si a tu hijo o hija le cuesta mucho más que a sus compañeros contar, reconocer números, entender qué es “más” o “menos” o memorizar operaciones simples, y no mejora con la ayuda habitual, conviene una evaluación psicopedagógica. En Centro Sinapsis, en Berazategui, la hacemos sin derivación médica previa.</p>")
    + sec("Señales por etapa",
          card("En el jardín", "Le cuesta contar objetos uno a uno, reconocer números, entender qué grupo tiene más, o aprender secuencias como los días de la semana.")
          + card("En la primaria", "Sigue contando con los dedos cuando sus compañeros ya no; confunde signos (+ y −); no logra memorizar sumas o tablas simples; se pierde en problemas de varios pasos; invierte números (12 por 21).")
          + card("Más grande", "Le cuesta calcular el vuelto, leer la hora en un reloj de agujas, estimar distancias o tiempos; siente angustia ante las matemáticas."))
    + '  <div class="svc-callout">La discalculia <strong>muchas veces se confunde con falta de esfuerzo o con “ansiedad matemática”</strong>. Una evaluación permite entender qué está pasando y dejar de culpar al chico.</div>\n'
    + sec("Cómo ayudar en casa",
          ul(["<b>Usá objetos concretos</b>: contar fideos, repartir figuritas, medir ingredientes al cocinar.",
              "<b>Jueguen</b> con dados, cartas y juegos de mesa con números.",
              "<b>Valorá el esfuerzo</b>, no solo el resultado.",
              "<b>Hablá con la escuela</b> sobre apoyos posibles: más tiempo, tablas a mano, menos ejercicios pero más claros."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"psicopedagogia-dificultades-aprendizaje.html\">psicopedagogía</a> evaluamos el razonamiento numérico y el cálculo, y armamos un plan con material concreto, juegos y estrategias, en contacto con la escuela. Conocé también <a href=\"que-hace-un-psicopedagogo.html\">qué hace un psicopedagogo</a>.</p>"),
    faqs=[
        ("¿Qué es la discalculia?", "Es una dificultad específica del aprendizaje de las matemáticas: cuesta entender los números, las cantidades y el cálculo, más allá de lo esperable para la edad y la enseñanza recibida."),
        ("¿La discalculia es lo mismo que ser malo en matemáticas?", "No. Muchos chicos tienen dificultades puntuales que mejoran con práctica. En la discalculia las dificultades son persistentes y afectan las bases del sentido numérico."),
        ("¿A qué edad se detecta?", "Las señales pueden aparecer en el jardín, y suele hacerse más clara en los primeros años de la primaria, cuando se trabajan las operaciones básicas."),
        ("¿Dónde evalúan discalculia en Berazategui?", "En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) hacemos evaluación psicopedagógica para familias de Berazategui, Quilmes, Florencio Varela y alrededores."),
    ],
    sources=["medline_matematicas", "medline_aprendizaje"],
    related=["psicoped", "psicopedagogo", "dislexia", "disgrafia", "tdah", "guias"],
))

# ───────── PSICOPEDAGOGÍA 3: escritura ─────────
ART.append(dict(
    slug="dificultades-escritura-disgrafia.html", ilu="disgrafia", articulo=True,
    title="Mi hijo escribe mal: disgrafía y escritura | Centro Sinapsis",
    desc="Letra ilegible, mucho esfuerzo al escribir o muchos errores de ortografía: señales de disgrafía y disortografía, y cómo ayuda la psicopedagogía en Berazategui.",
    crumb_parent=GUIAS, crumb="Dificultades en la escritura", tag="Guía · Psicopedagogía",
    h1="Dificultades en la escritura: disgrafía y disortografía",
    lead="Cuando escribir cuesta mucho más de lo esperable: cómo reconocerlo y quiénes pueden ayudar.",
    cta="Consultar con psicopedagogía", motivo="aprendizaje",
    wa="Hola! Quisiera consultar con psicopedagogía porque a mi hijo/a le cuesta mucho escribir.",
    about={"@type": "MedicalCondition", "name": "Disgrafía", "alternateName": ["Trastorno de la expresión escrita", "Disortografía"]},
    body=
    sec("La respuesta corta",
        "<p>Algunos chicos tienen una dificultad persistente para escribir: la letra es muy difícil de leer, escriben muy lento y con mucho esfuerzo, o cometen muchos errores de ortografía aunque conocen las reglas. Puede deberse a dificultades en el trazo (disgrafía), en la ortografía (disortografía) o en organizar las ideas por escrito. Si no mejora con la práctica habitual, conviene consultar con psicopedagogía; a veces se suma terapia ocupacional. En Centro Sinapsis, en Berazategui, evaluamos sin derivación médica previa.</p>")
    + sec("Señales que conviene mirar",
          card("En el trazo", "Letra muy irregular en tamaño y forma; no respeta el renglón ni los espacios; agarra el lápiz con mucha fuerza o de forma incómoda; se cansa o le duele la mano enseguida.")
          + card("En la ortografía", "Omite, agrega o cambia letras; une o separa palabras de forma incorrecta (“lacasa”, “en contré”); comete errores que no corrige aunque se los marquen.")
          + card("En la expresión escrita", "Le cuesta mucho armar oraciones o textos aunque oralmente se expresa bien; evita escribir; copia del pizarrón muy lento."))
    + sec("¿Psicopedagogía o terapia ocupacional?",
          "<p>Si la dificultad está sobre todo en el <b>movimiento de la mano y el trazo</b>, la <a href=\"terapia-ocupacional-integracion-sensorial.html\">terapia ocupacional</a> trabaja la <a href=\"motricidad-fina-ninos.html\">motricidad fina</a>, la postura y el agarre del lápiz. Si está en la <b>ortografía y la organización del texto</b>, la <a href=\"psicopedagogia-dificultades-aprendizaje.html\">psicopedagogía</a> es la indicada. Muchas veces se combinan, y en Centro Sinapsis lo definimos en equipo.</p>")
    + sec("Cómo ayudar en casa",
          ul(["<b>Separá el contenido de la forma</b>: valorá lo que quiso decir aunque la letra no sea prolija.",
              "<b>Ofrecé lápices más gruesos</b> o adaptadores para el agarre.",
              "<b>Jueguen con la motricidad</b>: plastilina, encastres, recortar, dibujar en superficies verticales.",
              "<b>Hablá con la escuela</b> sobre apoyos: más tiempo, menos copia, evaluar también de forma oral."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>Evaluamos dónde está la dificultad y armamos un plan con la psicopedagoga y, si hace falta, la terapista ocupacional, en contacto con la escuela. Mirá también <a href=\"que-hace-un-psicopedagogo.html\">qué hace un psicopedagogo</a> y nuestra guía sobre <a href=\"dislexia-senales-ninos.html\">dislexia</a>.</p>"),
    faqs=[
        ("¿Qué es la disgrafía?", "Es una dificultad persistente en la escritura, que puede afectar el trazo de las letras, la ortografía o la organización del texto, más allá de lo esperable para la edad."),
        ("¿La letra fea es disgrafía?", "No necesariamente. La disgrafía implica una dificultad persistente que afecta la legibilidad y el ritmo de la escritura, y que no mejora con la práctica habitual."),
        ("¿Quién trata la disgrafía?", "La psicopedagogía trabaja la ortografía y la expresión escrita; la terapia ocupacional, el trazo y la motricidad fina. Muchas veces se trabaja en conjunto."),
        ("¿Dónde consultar en Berazategui?", "En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) tenemos psicopedagogía y terapia ocupacional en un mismo lugar, para familias de toda la Zona Sur."),
    ],
    sources=["medline_disgrafia", "medline_aprendizaje"],
    related=["psicoped", "motricidad", "dislexia", "psicopedagogo", "to", "guias"],
))

# ───────── TERAPIA OCUPACIONAL 1: qué hace ─────────
ART.append(dict(
    slug="que-hace-terapia-ocupacional-ninos.html", ilu="autonomia", articulo=True,
    title="¿Qué hace la terapia ocupacional en niños? | Centro Sinapsis",
    desc="Qué hace un terapista ocupacional con niños: autonomía, juego, motricidad e integración sensorial. Cuándo consultar y cómo es el proceso en Berazategui.",
    crumb_parent=GUIAS, crumb="¿Qué hace la terapia ocupacional?", tag="Guía · Terapia Ocupacional",
    h1="¿Qué hace la terapia ocupacional con los niños?",
    lead="Vestirse, comer, jugar, ir a la escuela: la terapia ocupacional ayuda a que los chicos puedan hacer las actividades de su día a día con más autonomía.",
    cta="Consultar con terapia ocupacional", motivo="desarrollo",
    wa="Hola! Quisiera consultar con terapia ocupacional para mi hijo/a.",
    about={"@type": "MedicalTherapy", "name": "Terapia ocupacional pediátrica"},
    body=
    sec("La respuesta corta",
        "<p>La terapia ocupacional ayuda a que los chicos puedan participar de las actividades de su vida diaria —jugar, vestirse, comer, asearse, aprender en la escuela— con la mayor autonomía posible. Trabaja la motricidad fina y gruesa, la coordinación, la organización del cuerpo y la forma de procesar los estímulos sensoriales. Conviene consultar si a tu hijo o hija le cuestan mucho estas actividades para su edad. En Centro Sinapsis, en Berazategui, la terapia ocupacional trabaja con enfoque de integración sensorial, sin derivación médica previa.</p>")
    + sec("¿En qué casos ayuda?",
          ul(["Le cuesta vestirse, abrocharse, atarse los cordones o usar los cubiertos más de lo esperable para su edad.",
              "Tiene dificultades con el lápiz, las tijeras o los encastres (<a href=\"motricidad-fina-ninos.html\">motricidad fina</a>).",
              "Se lo ve torpe, se cae seguido o evita juegos de movimiento.",
              "Reacciona de forma muy intensa a ruidos, texturas o alimentos (<a href=\"integracion-sensorial-senales.html\">integración sensorial</a>).",
              "Le cuesta organizarse con las rutinas o sostener la atención en una tarea.",
              "Chicos con TEA, TDAH, retrasos del desarrollo o discapacidad que necesitan apoyos para su autonomía."]))
    + sec("Cómo es una sesión",
          "<p>Para el chico, una sesión de terapia ocupacional se parece mucho a jugar: hamacas, circuitos, texturas, encastres, juegos de mesa. Detrás de cada actividad hay un objetivo concreto (equilibrio, coordinación de las manos, regulación sensorial, planificación). La familia recibe orientación para llevar lo trabajado a la casa y, si hace falta, se coordinan apoyos con la escuela.</p>")
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>Conocé nuestro servicio de <a href=\"terapia-ocupacional-integracion-sensorial.html\">terapia ocupacional e integración sensorial</a> y a nuestras <a href=\"equipo-profesional.html\">terapistas ocupacionales</a>. Trabajamos en equipo con psicología, fonoaudiología y psicopedagogía cuando el caso lo necesita.</p>"),
    faqs=[
        ("¿Qué hace un terapista ocupacional con un niño?", "Ayuda a que pueda realizar con más autonomía las actividades de su día a día (jugar, vestirse, comer, aprender), trabajando la motricidad, la coordinación y la forma en que procesa los estímulos sensoriales."),
        ("¿Cuándo llevar a un niño a terapia ocupacional?", "Cuando le cuestan mucho, para su edad, actividades como vestirse, usar el lápiz o los cubiertos, o cuando reacciona de forma muy intensa a ruidos, texturas o movimiento."),
        ("¿La terapia ocupacional es solo para chicos con discapacidad?", "No. Puede ayudar a cualquier chico con dificultades en su autonomía, su motricidad o su procesamiento sensorial, tenga o no un diagnóstico."),
        ("¿Hay terapia ocupacional infantil en Berazategui?", "Sí. En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) atendemos a niños de toda la Zona Sur, con y sin CUD."),
    ],
    sources=["medline_desarrollo", "medline_preescolar"],
    related=["to", "motricidad", "sensorial", "tea", "disc", "guias"],
))

# ───────── TERAPIA OCUPACIONAL 2: motricidad fina ─────────
ART.append(dict(
    slug="motricidad-fina-ninos.html", ilu="motricidad-fina", articulo=True,
    title="Motricidad fina en niños: señales y juegos | Centro Sinapsis",
    desc="Agarrar el lápiz, recortar, abrocharse: qué es la motricidad fina, qué es esperable a cada edad, juegos para estimularla y cuándo consultar en Berazategui.",
    crumb_parent=GUIAS, crumb="Motricidad fina", tag="Guía · Terapia Ocupacional",
    h1="Motricidad fina en niños: qué es esperable y cuándo consultar",
    lead="Los movimientos finos de las manos son la base para escribir, recortar, abrocharse o comer solos. Te contamos qué mirar y cómo estimularlos jugando.",
    cta="Consultar con terapia ocupacional", motivo="desarrollo",
    wa="Hola! Quisiera consultar con terapia ocupacional por la motricidad fina de mi hijo/a.",
    about={"@type": "MedicalTherapy", "name": "Estimulación de la motricidad fina"},
    body=
    sec("La respuesta corta",
        "<p>La motricidad fina son los movimientos pequeños y precisos de las manos y los dedos, coordinados con la vista: agarrar el lápiz, recortar, enhebrar, abrocharse, usar los cubiertos. Cada chico tiene sus tiempos, pero si a tu hijo o hija le cuestan mucho estas actividades para su edad, evita dibujar o se frustra con las tareas manuales, conviene consultar con terapia ocupacional. En Centro Sinapsis, en Berazategui, la evaluamos sin derivación médica previa.</p>")
    + sec("Qué es esperable a cada edad (como referencia)",
          card("Alrededor de los 2 años", "Hace garabatos, pasa páginas gruesas, apila algunos bloques, empieza a comer con cuchara.")
          + card("Alrededor de los 3 años", "Copia un círculo, enhebra cuentas grandes, abre y cierra frascos, usa la cuchara con más control.")
          + card("Alrededor de los 4 a 5 años", "Recorta siguiendo una línea, copia una cruz y un cuadrado, se abrocha botones grandes, dibuja una persona con varias partes, empieza a escribir algunas letras."))
    + sec("Señales para consultar",
          ul(["Agarra el lápiz con toda la mano o con mucha fuerza, más allá de los 4 o 5 años.",
              "Evita dibujar, pintar o recortar, o se frustra enseguida.",
              "Le cuesta mucho abrocharse, usar los cubiertos o manipular objetos chicos.",
              "Se le caen las cosas seguido o se lo ve muy torpe con las manos.",
              "En la escuela escribe muy lento o la letra es muy difícil de leer (mirá también <a href=\"dificultades-escritura-disgrafia.html\">dificultades en la escritura</a>)."]))
    + sec("Juegos para estimular la motricidad fina",
          ul(["Plastilina y masa: amasar, hacer bolitas, cortar con cuchillo de plástico.",
              "Enhebrar cuentas, fideos o botones.",
              "Recortar papel, primero libremente y después siguiendo líneas.",
              "Pinzas de ropa: colgar dibujos, pasar objetos de un recipiente a otro.",
              "Encastres, rompecabezas y bloques chicos.",
              "Ayudar en la cocina: untar, pelar, revolver, poner la mesa."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"terapia-ocupacional-integracion-sensorial.html\">terapia ocupacional</a> evaluamos la motricidad, la postura y la coordinación, y trabajamos con actividades de juego adaptadas a cada chico. Conocé más sobre <a href=\"que-hace-terapia-ocupacional-ninos.html\">qué hace la terapia ocupacional</a>.</p>"),
    faqs=[
        ("¿Qué es la motricidad fina?", "Son los movimientos pequeños y precisos de manos y dedos, coordinados con la vista, que permiten agarrar el lápiz, recortar, abrocharse o comer solos."),
        ("¿A qué edad un niño debe agarrar bien el lápiz?", "El agarre va madurando entre los 3 y los 6 años. Si después de los 4 o 5 años sigue tomándolo con toda la mano o con mucha fuerza, conviene consultar."),
        ("¿Qué profesional trabaja la motricidad fina?", "La terapia ocupacional. Si además hay dificultades con la lectura o la ortografía, se suma la psicopedagogía."),
        ("¿Dónde consultar en Berazategui?", "En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) tenemos terapia ocupacional infantil para familias de toda la Zona Sur."),
    ],
    sources=["medline_preescolar", "medline_desarrollo", "cdc_hitos"],
    related=["to", "to_ninos", "disgrafia", "sensorial", "talleres", "guias"],
))

# ───────── KINESIOLOGÍA: ejercicio en adultos mayores ─────────
ART.append(dict(
    slug="ejercicio-adultos-mayores.html", ilu="ejercicio-mayores", articulo=True,
    title="Ejercicio para adultos mayores: beneficios | Centro Sinapsis",
    desc="Por qué el ejercicio es clave después de los 65: fuerza, equilibrio, ánimo y autonomía. Recomendaciones y gimnasio terapéutico con kinesiología en Berazategui.",
    crumb_parent=GUIAS, crumb="Ejercicio en adultos mayores", tag="Guía · Kinesiología",
    h1="Ejercicio para adultos mayores: por qué y cómo empezar",
    lead="Moverse con regularidad es una de las mejores formas de sostener la fuerza, el equilibrio y la autonomía con los años. Nunca es tarde para empezar.",
    cta="Consultar por kinesiología", motivo="adultos-mayores",
    wa="Hola! Quisiera consultar por el gimnasio terapéutico / kinesiología para un adulto mayor.",
    about={"@type": "MedicalTherapy", "name": "Ejercicio terapéutico para adultos mayores"},
    body=
    sec("La respuesta corta",
        "<p>El ejercicio regular ayuda a los adultos mayores a mantener la fuerza muscular, el equilibrio y la movilidad, reduce el riesgo de caídas, mejora el ánimo y el sueño, y ayuda a sostener la autonomía. La Organización Mundial de la Salud recomienda que las personas mayores combinen actividad aeróbica, ejercicios de fuerza y ejercicios de equilibrio, adaptados a sus posibilidades. En Centro Sinapsis, en Berazategui, la kinesiología y el gimnasio terapéutico arman un plan seguro para cada persona.</p>")
    + sec("Beneficios del ejercicio con los años",
          ul(["<b>Fuerza</b>: para levantarse de una silla, subir escaleras o cargar las bolsas.",
              "<b>Equilibrio</b>: menos riesgo de caídas (mirá nuestra guía de <a href=\"prevencion-caidas-adultos-mayores.html\">prevención de caídas</a>).",
              "<b>Movilidad</b>: articulaciones más flexibles y menos rigidez.",
              "<b>Ánimo y sueño</b>: el movimiento ayuda a sentirse mejor y a descansar.",
              "<b>Memoria y atención</b>: la actividad física también cuida la mente (mirá <a href=\"olvidos-memoria-adultos-mayores.html\">olvidos en adultos mayores</a>).",
              "<b>Vida social</b>: hacer actividad acompañado suma encuentro y motivación."]))
    + sec("Qué tipo de ejercicio conviene",
          card("Aeróbico", "Caminar, bicicleta fija, bailar: actividades que aumentan un poco la respiración, adaptadas a cada persona.")
          + card("Fuerza", "Ejercicios con el propio peso, bandas elásticas o pesas livianas para piernas, brazos y tronco, algunas veces por semana.")
          + card("Equilibrio y coordinación", "Pararse en un pie con apoyo, caminar en línea, cambios de dirección: son clave para prevenir caídas."))
    + '  <div class="svc-callout"><strong>Antes de empezar</strong>, conviene consultar con el médico de cabecera, sobre todo si hay enfermedades del corazón, dolor, mareos o caídas recientes. Un kinesiólogo puede adaptar cada ejercicio para que sea seguro.</div>\n'
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"kinesiologia-adultos-mayores-berazategui.html\">kinesiología para adultos mayores</a> evaluamos fuerza, equilibrio y marcha y armamos un plan en nuestro gimnasio terapéutico, con progresión y acompañamiento. Consultanos por disponibilidad y horarios.</p>"),
    faqs=[
        ("¿Cuánto ejercicio necesita un adulto mayor?", "La OMS recomienda que las personas mayores hagan actividad física aeróbica a lo largo de la semana, ejercicios de fuerza varios días y ejercicios de equilibrio, siempre adaptados a sus posibilidades. Cualquier aumento de actividad ya trae beneficios."),
        ("¿Qué ejercicios son mejores para adultos mayores?", "Los que combinan actividad aeróbica suave, fuerza muscular y equilibrio. Lo ideal es que un profesional los adapte a cada persona."),
        ("¿Es tarde para empezar a hacer ejercicio a los 70 u 80 años?", "No. Con un plan adaptado y progresivo, las personas mayores mejoran su fuerza y su equilibrio a cualquier edad."),
        ("¿Hay gimnasio terapéutico para adultos mayores en Berazategui?", "Sí. En Centro Sinapsis (Calle 27 Nº3907 esq. 139, Berazategui) tenemos kinesiología y gimnasio terapéutico para adultos mayores de toda la Zona Sur."),
    ],
    sources=["oms_actividad", "medline_ejercicio_mayores", "medline_equilibrio"],
    related=["kine", "caidas", "olvidos", "estcog", "talleres", "guias"],
))


# ═════════════════════ GUÍAS DEL CUD (publicadas el 2026-11-04) ═════════════════════
# Publicadas a pedido del centro. Datos verificados el 2026-11-01 en fuentes oficiales
# (ver "sources"); sede de la junta y organismo nacional reconfirmados el 2026-11-04.
# No se publican días ni horarios de la junta (no confirmados). Pendiente: revisión
# de quien coordina la orientación sobre CUD en el centro (ver PLAN_EDITORIAL.md) y
# seguir el proyecto de nueva Ley de Discapacidad (media sanción el 22/10/2026).

# ───────── BORRADOR 1: cómo tramitar el CUD en Berazategui ─────────
ART.append(dict(
    slug="como-tramitar-cud-berazategui.html", ilu="discapacidad", articulo=True, fecha="2026-11-04",
    title="Cómo tramitar el CUD en Berazategui, paso a paso | Sinapsis",
    desc="Guía para sacar o renovar el Certificado Único de Discapacidad (CUD) en Berazategui: qué es, dónde se pide, qué documentación llevar y qué pasa después.",
    crumb_parent=GUIAS, crumb="Cómo tramitar el CUD", tag="Guía · Discapacidad",
    h1="Cómo tramitar el CUD en Berazategui, paso a paso",
    lead="Qué es el Certificado Único de Discapacidad, dónde se pide si vivís en Berazategui, qué documentación reunir y cómo sigue el trámite.",
    cta="Consultar por el CUD", motivo="cud",
    wa="Hola! Quisiera orientación sobre el trámite del CUD.",
    about={"@type": "GovernmentService", "name": "Certificado Único de Discapacidad (CUD)", "serviceType": "Certificación de discapacidad"},
    body=
    sec("La respuesta corta",
        "<p>El <strong>Certificado Único de Discapacidad (CUD)</strong> es un documento público, <strong>gratuito y voluntario</strong>, que lo otorga una <strong>Junta Evaluadora interdisciplinaria</strong> después de evaluar a la persona. "
        "Para pedirlo hay que hacer una consulta en <a href=\"https://www.argentina.gob.ar/servicio/como-obtener-el-certificado-unico-de-discapacidad-cud\" target=\"_blank\" rel=\"noopener\">argentina.gob.ar</a>, que indica qué documentación llevar y a qué junta ir. Con eso se saca turno, la persona se presenta a la evaluación y después se retira el certificado.</p>"
        "<p>No hace falta pagar a ningún gestor ni intermediario: el trámite es personal y sin costo.</p>")
    + sec("Paso a paso",
          card("1. Hacé la consulta personalizada", "En el sitio oficial del CUD respondés unas preguntas sobre la persona que va a tramitarlo. El sistema te indica qué certificados, planillas y estudios tenés que llevar y cuál es la junta evaluadora que te corresponde.")
          + card("2. Reuní la documentación con el equipo que atiende a la persona", "Certificados e informes de los profesionales tratantes, planillas completas y estudios complementarios. Este es el paso que más demora: conviene pedirlos con tiempo.")
          + card("3. Pedí turno en la junta y presentate", "Con la documentación lista, se pide turno en el lugar asignado. El día de la evaluación, un equipo interdisciplinario revisa la documentación y evalúa a la persona.")
          + card("4. Retirá el certificado", "El CUD (o la denegatoria) se retira en el mismo lugar, en la fecha que te indiquen. Puede retirarlo cualquier persona mayor de 18 años con el documento original de quien hizo el trámite."))
    + sec("¿Dónde se tramita si vivís en Berazategui?",
          "<p>La junta que corresponde depende del domicilio que figura en el DNI, y la consulta oficial te la indica. Según el listado de juntas evaluadoras de la Defensoría del Pueblo de la Provincia de Buenos Aires, la junta de Berazategui funciona en la <strong>Unidad Sanitaria Dr. Sabatto</strong>, que depende de la Dirección de Salud del Municipio.</p>"
          "<p><strong>Antes de ir, confirmá días, horarios y cómo se pide el turno:</strong> pueden cambiar, y el dato oficial actualizado es el que te da la consulta en argentina.gob.ar o el área de salud del Municipio de Berazategui.</p>")
    + '  <div class="svc-callout">El CUD <strong>no es un diagnóstico</strong>: certifica una discapacidad a partir de la documentación clínica y de la evaluación de la junta. Por eso es tan importante que los informes de los profesionales que atienden a la persona estén completos y actualizados.</div>\n'
    + sec("¿Para qué sirve?",
          ul(["<b>Cobertura del 100 %</b> de las prestaciones básicas por discapacidad (tratamientos de rehabilitación, apoyos educativos, entre otras), a cargo de la obra social o prepaga. Lo explicamos en <a href=\"prestaciones-discapacidad-ley-24901.html\">qué tiene que cubrir tu obra social</a>.",
              "<b>Transporte público nacional gratuito</b> (trenes, subtes, colectivos y micros de corta, media y larga distancia).",
              "Acceso al <b>Símbolo Internacional de Acceso</b> para estacionar, que se tramita aparte.",
              "<b>Asignaciones familiares</b> específicas y otros beneficios (por ejemplo, exención de algunas tasas municipales), según cada caso."]))
    + sec("Cambios recientes que conviene tener en cuenta",
          "<p>En los últimos meses cambió el organismo nacional a cargo: el trámite figura hoy bajo la <strong>Secretaría Nacional de Discapacidad</strong>, dentro del Ministerio de Salud. "
          "Además, en octubre de 2026 la Cámara de Diputados aprobó un proyecto de nueva ley de discapacidad que todavía debe tratar el Senado. "
          "Por eso, ante cualquier duda sobre vencimientos o renovaciones, la referencia es siempre el sitio oficial.</p>")
    + sec("Cómo te podemos acompañar desde Centro Sinapsis",
          "<p>Si la persona se atiende con nuestro equipo, podemos orientarte sobre qué informes hacen falta y prepararlos desde las áreas que la acompañan. "
          "Si todavía no tiene un tratamiento, una <a href=\"centro-discapacidad-zona-sur.html\">primera entrevista</a> sirve para ordenar los pasos. El trámite ante la junta, de todos modos, es siempre personal.</p>"),
    faqs=[
        ("¿Cuánto cuesta sacar el CUD?", "Nada. El trámite del Certificado Único de Discapacidad es gratuito y voluntario. Nadie puede cobrarte por iniciarlo ni por conseguir un turno."),
        ("¿Dónde se tramita el CUD si vivo en Berazategui?", "En la junta evaluadora que corresponde al domicilio de tu DNI. La consulta en argentina.gob.ar te indica cuál es y qué documentación llevar. Antes de ir, confirmá día y horario."),
        ("¿Qué documentación se necesita?", "Depende de cada situación: en general, el DNI, certificados e informes de los profesionales tratantes, planillas y estudios complementarios. La lista exacta la da la consulta personalizada del sitio oficial."),
        ("¿El CUD es lo mismo que un diagnóstico?", "No. El diagnóstico lo hacen los profesionales que atienden a la persona. El CUD lo otorga una junta interdisciplinaria y certifica una discapacidad a partir de esa documentación y de su propia evaluación."),
        ("¿Me pueden ayudar en Centro Sinapsis con el trámite?", "Podemos orientarte y, si la persona se atiende con nuestro equipo, preparar los informes de las áreas que la acompañan. La presentación ante la junta es personal."),
    ],
    sources=["cud", "cud_leysimple"],
    related=["disc", "ley24901", "obras", "ados", "tea", "guias"],
))

# ───────── BORRADOR 2: Ley 24.901, qué tiene que cubrir la obra social ─────────
ART.append(dict(
    slug="prestaciones-discapacidad-ley-24901.html", ilu="obras-sociales", articulo=True, fecha="2026-11-04",
    title="Qué cubre tu obra social con CUD: Ley 24.901 | Sinapsis",
    desc="Qué prestaciones por discapacidad tienen que cubrir las obras sociales y prepagas según la Ley 24.901, qué suelen pedir y a dónde reclamar si no cumplen.",
    crumb_parent=GUIAS, crumb="Qué cubre tu obra social", tag="Guía · Discapacidad",
    h1="Prestaciones por discapacidad: qué tiene que cubrir tu obra social",
    lead="Qué dice la Ley 24.901, qué prestaciones incluye, qué documentación suele pedirse y qué hacer si la cobertura se demora o se rechaza.",
    cta="Consultar por prestaciones con CUD", motivo="cud",
    wa="Hola! Quisiera consultar por prestaciones por discapacidad con CUD.",
    about={"@type": "Legislation", "name": "Ley 24.901 — Sistema de prestaciones básicas en habilitación y rehabilitación integral a favor de las personas con discapacidad", "legislationIdentifier": "Ley 24.901"},
    body=
    sec("La respuesta corta",
        "<p>La <strong>Ley 24.901</strong> crea un sistema de prestaciones básicas de atención integral para las personas con discapacidad. "
        "Establece que las obras sociales tienen a su cargo, <strong>con carácter obligatorio, la cobertura total</strong> de esas prestaciones (art. 2). "
        "Las personas que no tienen obra social también tienen derecho a acceder a ellas a través del Estado (arts. 3 y 4). Para acceder, la discapacidad se acredita con el <a href=\"como-tramitar-cud-berazategui.html\">Certificado Único de Discapacidad</a>.</p>")
    + sec("¿Qué prestaciones incluye?",
          ul(["<b>Preventivas</b>: controles y atención desde el embarazo y la primera infancia, con apoyo a la familia (art. 14).",
              "<b>De rehabilitación</b>: procesos continuos y coordinados para recuperar o desarrollar capacidades (art. 15).",
              "<b>Terapéuticas educativas</b> y <b>educativas</b>: apoyos para el aprendizaje y la autonomía (arts. 16 y 17).",
              "<b>Asistenciales</b>: cobertura de necesidades básicas como hábitat, alimentación y atención especializada (art. 18).",
              "<b>Servicios específicos</b>, entre ellos <b>estimulación temprana</b> (arts. 19 y 20).",
              "<b>Formación laboral</b>, para la preparación e inserción en el trabajo (art. 23).",
              "<b>Transporte especial</b> hacia la escuela o el centro de rehabilitación, cuando la persona no puede usar el transporte público (art. 13)."])
          + "<p>Antes de definir las prestaciones, la ley prevé una <strong>evaluación y orientación por equipos interdisciplinarios</strong> (art. 11).</p>")
    + sec("¿Qué suele pedir la obra social?",
          "<p>Cada obra social o prepaga tiene su propio circuito de autorización. En general se pide el <strong>CUD vigente</strong>, una <strong>indicación o prescripción</strong> del tratamiento, un <strong>plan de trabajo</strong> o informe de los profesionales y, en muchos casos, un <strong>presupuesto del prestador</strong>. Conviene consultar a tu cobertura cuáles son sus formularios y plazos.</p>"
          )
    + sec("Si la cobertura se demora o te la rechazan",
          ul(["<b>Pedí la respuesta por escrito</b>, con fecha y motivo, y guardá copia de todo lo que presentaste.",
              "<b>Reclamá primero en tu obra social o prepaga</b>, por los canales que tenga habilitados.",
              "Si tu cobertura es una <b>obra social nacional o una prepaga</b>, podés reclamar ante la <b>Superintendencia de Servicios de Salud</b>: línea gratuita <b>0800-222-SALUD (72583)</b> o el trámite en <a href=\"https://www.argentina.gob.ar/servicio/reclamar-por-prestaciones-de-discapacidad\" target=\"_blank\" rel=\"noopener\">argentina.gob.ar</a>.",
              "Si tu cobertura es <b>provincial (por ejemplo, IOMA)</b>, el reclamo sigue el circuito propio de esa obra social y de la Provincia; la Superintendencia no la controla.",
              "Ante situaciones urgentes o reiteradas, la <b>Defensoría del Pueblo</b> también recibe consultas."])
          + "<p class=\"svc-nota\">Esta guía es informativa y no reemplaza el asesoramiento legal de un profesional del derecho.</p>")
    + sec("Un contexto normativo en revisión",
          "<p>En 2025 se sancionó la <strong>Ley 27.793</strong>, que declara la emergencia en discapacidad hasta el 31 de diciembre de 2026 y establece que los aranceles de las prestaciones deben ser iguales para todas las obras sociales. "
          "El decreto que la promulgó (681/2025) suspendió su ejecución hasta que el Congreso defina su financiamiento. "
          "En octubre de 2026, además, Diputados aprobó un proyecto de nueva ley de discapacidad que todavía debe tratar el Senado. "
          "Actualizaremos esta guía cuando haya cambios definitivos.</p>")
    + sec("Prestaciones por discapacidad en Centro Sinapsis",
          "<p>Trabajamos con personas con CUD y sin CUD. Para pacientes con CUD, podés ver el <a href=\"obras-sociales-prepagas.html\">listado de coberturas por discapacidad</a> y la página de <a href=\"centro-discapacidad-zona-sur.html\">atención a personas con discapacidad</a>. "
          "Que una cobertura figure en el listado no implica un convenio confirmado para cada prestación: escribinos y lo revisamos para tu caso.</p>"),
    faqs=[
        ("¿La obra social tiene que cubrir el 100 % de las terapias con CUD?", "La Ley 24.901 establece que las obras sociales tienen a su cargo, con carácter obligatorio, la cobertura total de las prestaciones básicas que enumera la ley. Cada obra social define su circuito de autorización y la documentación que pide."),
        ("¿Qué pasa si no tengo obra social?", "La ley prevé que las personas con discapacidad sin obra social también accedan a las prestaciones básicas a través del Estado. Conviene consultar en el área de discapacidad del municipio o en los organismos nacionales."),
        ("¿Dónde reclamo si mi obra social no cubre una prestación?", "Primero, en la propia obra social o prepaga, pidiendo la respuesta por escrito. Si es una obra social nacional o una prepaga, podés reclamar ante la Superintendencia de Servicios de Salud (0800-222-72583). Las obras sociales provinciales, como IOMA, tienen su propio circuito."),
        ("¿Esta guía reemplaza a un abogado?", "No. Es información general para orientarte. Ante un conflicto con tu cobertura, conviene consultar a un profesional del derecho o a la Defensoría del Pueblo."),
    ],
    sources=["ley24901_texto", "cud_leysimple", "sss_reclamo", "ley27793"],
    related=["disc", "cud_guia", "obras", "tea", "temprana", "guias"],
))


# ═════════════════════ GUÍAS NUEVAS (plan editorial 6, 7, 9, 10, 11 y 12) ═════════════════════
# Publicadas el 2026-11-04 a pedido del centro. Contenido general basado en las fuentes
# citadas (CDC, MedlinePlus, OMS); no incluye datos institucionales pendientes.
# Pendiente: revisión del profesional indicado en PLAN_EDITORIAL.md para cada una.

# ───────── 6. Señales de alerta en el desarrollo del bebé (0 a 12 meses) ─────────
ART.append(dict(
    slug="senales-alerta-desarrollo-bebe.html", ilu="senales-bebe", articulo=True, fecha="2026-11-04",
    title="Señales de alerta en el desarrollo del bebé | Centro Sinapsis",
    desc="Qué hace la mayoría de los bebés a los 2, 4, 6, 9 y 12 meses, qué señales conviene consultar y cómo ayuda la estimulación temprana. Guía para familias.",
    crumb_parent=GUIAS, crumb="Señales de alerta en el bebé", tag="Guía · Estimulación temprana",
    h1="Señales de alerta en el desarrollo del bebé, de 0 a 12 meses",
    lead="Cada bebé tiene su ritmo. Te contamos qué hace la mayoría a cada edad y qué señales conviene consultar sin esperar.",
    cta="Consultar por estimulación temprana", motivo="desarrollo",
    wa="Hola! Quisiera consultar por el desarrollo de mi bebé.",
    about={"@type": "MedicalCondition", "name": "Retraso en el desarrollo infantil"},
    body=
    sec("La respuesta corta",
        "<p>Durante el primer año, los bebés van sumando habilidades en el movimiento, la comunicación, el juego y el vínculo. No todos lo hacen al mismo tiempo, pero hay <strong>referencias por edad</strong> que ayudan a saber si conviene consultar. "
        "Si tu bebé no alcanza algunas de las habilidades de su edad, si <strong>pierde algo que ya hacía</strong> o si a vos algo te preocupa, consultá con el pediatra y con un equipo de <a href=\"estimulacion-temprana-berazategui.html\">estimulación temprana</a>. Consultar temprano no es alarmarse: es acompañar a tiempo.</p>")
    + sec("Qué hace la mayoría de los bebés a cada edad",
          "<p>Estas referencias siguen los indicadores del CDC, que muestran lo que hace la mayoría de los bebés (3 de cada 4) a cada edad. Si nació prematuro, se toma su edad corregida.</p>"
          + card("Alrededor de los 2 meses", "Se calma cuando le hablan o lo alzan, mira las caras, sonríe cuando le hablan o le sonríen, hace sonidos además del llanto y, boca abajo, levanta un poco la cabeza.")
          + card("Alrededor de los 4 meses", "Sonríe para llamar tu atención, empieza a reírse bajito (todavía sin carcajadas), hace sonidos como “ooo” o “aaa”, sostiene la cabeza firme sin apoyo y se lleva las manos a la boca.")
          + card("Alrededor de los 6 meses", "Reconoce a las personas conocidas, se ríe, hace turnos de sonidos con vos, se da vuelta de boca abajo a boca arriba y se apoya en los brazos estando boca abajo.")
          + card("Alrededor de los 9 meses", "Muestra distintas expresiones, reacciona cuando lo llamás por su nombre, hace sonidos como “mamama” o “bababa”, se sienta sin ayuda y pasa objetos de una mano a la otra.")
          + card("Alrededor de los 12 meses", "Juega a juegos como las palmas, saluda con la mano, entiende el “no”, dice “mamá” o “papá” (o una palabra parecida), se para agarrándose de los muebles y busca cosas que ve que escondés."))
    + sec("Señales para consultar",
          ul(["<b>Pérdida de habilidades</b>: deja de hacer algo que ya hacía (sonreír, balbucear, sostener la cabeza, sentarse). Siempre conviene consultar pronto.",
              "No sigue con la mirada a las personas o los objetos, o no reacciona a los sonidos fuertes.",
              "Se lo nota <b>muy rígido o muy “blandito”</b>, o usa mucho más un lado del cuerpo que el otro.",
              "A los 6 meses, casi no sonríe ni hace sonidos para interactuar.",
              "A los 9 a 12 meses, no reacciona a su nombre, no balbucea o no usa gestos como saludar o señalar.",
              "Tiene dificultades persistentes para alimentarse (succión, deglución) o duerme y se calma con mucha dificultad."])
          + "<p class=\"svc-nota\">Una señal aislada no significa que haya un problema: lo que importa es el conjunto y que se mantenga en el tiempo. Ante la duda, consultá.</p>")
    + '  <div class="svc-callout">Si notás algo que te preocupa, <strong>no esperes al próximo control</strong>: anotá qué observás, desde cuándo y, si podés, grabá un video corto. Ayuda mucho en la consulta con el pediatra y con el equipo de estimulación temprana.</div>\n'
    + sec("Cómo acompañar el desarrollo en casa",
          ul(["<b>Hablale y cantale</b> durante el día, aunque todavía no responda con palabras.",
              "<b>Dale tiempo boca abajo</b> mientras está despierto y lo mirás, para fortalecer cuello, espalda y brazos.",
              "<b>Jugá cara a cara</b>: imitá sus sonidos y gestos, y esperá su respuesta.",
              "<b>Leé cuentos</b> con imágenes y nombrá lo que ven.",
              "<b>Limitá las pantallas</b>: en el primer año, lo que más estimula es la interacción con las personas."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"estimulacion-temprana-berazategui.html\">estimulación temprana</a> acompañamos a bebés y niños pequeños y a sus familias, con o sin diagnóstico previo. Si hace falta, sumamos a <a href=\"fonoaudiologia-berazategui.html\">fonoaudiología</a> o <a href=\"terapia-ocupacional-integracion-sensorial.html\">terapia ocupacional</a>. Podés pedir una primera entrevista por WhatsApp, sin derivación médica.</p>"),
    faqs=[
        ("¿A qué edad debería sentarse solo mi bebé?", "La mayoría de los bebés se sienta sin ayuda alrededor de los 9 meses. Si a esa edad todavía no lo logra, o si tenés dudas antes, conviene consultarlo con el pediatra."),
        ("¿Qué pasa si mi bebé fue prematuro?", "Se toma en cuenta su edad corregida: la edad que tendría si hubiera nacido a término. El seguimiento del desarrollo es especialmente importante en los bebés prematuros."),
        ("¿Cuándo conviene consultar por estimulación temprana?", "Cuando el bebé no alcanza algunas habilidades esperables para su edad, si pierde algo que ya hacía o si la familia nota algo que le preocupa. No hace falta tener un diagnóstico para empezar."),
        ("¿Una señal de alerta significa que mi bebé tiene un trastorno?", "No. Una señal aislada no alcanza para decir que hay un problema. Indica que conviene mirar con más atención y consultar a un profesional."),
    ],
    sources=["cdc_hitos", "cdc_actearly", "medline_desarrollo"],
    related=["temprana", "senales", "lenguaje", "to", "fono", "guias"],
))

# ───────── 7. ¿No presta atención en clase? ─────────
ART.append(dict(
    slug="no-presta-atencion-en-clase.html", ilu="atencion-clase", articulo=True, fecha="2026-11-04",
    title="Mi hijo no presta atención en clase: causas | Centro Sinapsis",
    desc="La falta de atención en la escuela puede deberse al TDAH, pero también al sueño, la ansiedad, la visión o una dificultad de aprendizaje. Cuándo consultar.",
    crumb_parent=GUIAS, crumb="No presta atención en clase", tag="Guía · Atención y aprendizaje",
    h1="¿No presta atención en clase? TDAH y otras causas posibles",
    lead="Cuando la escuela avisa que tu hijo “se distrae”, no siempre es TDAH. Te contamos qué otras causas hay y cómo se evalúa.",
    cta="Consultar por atención y aprendizaje", motivo="tdah",
    wa="Hola! Quisiera consultar porque en la escuela dicen que mi hijo/a no presta atención.",
    about={"@type": "MedicalCondition", "name": "Problemas de atención en la infancia"},
    body=
    sec("La respuesta corta",
        "<p>Que un chico “no preste atención en clase” es un motivo de consulta muy frecuente, pero <strong>no es un diagnóstico</strong>. Puede tener que ver con el <a href=\"tdah-berazategui.html\">TDAH</a>, y también con el sueño, la ansiedad, problemas de visión o audición, una dificultad específica de aprendizaje o lo que está pasando en su vida. "
        "Por eso lo importante es una <strong>evaluación integral</strong>, que mire al chico en casa y en la escuela, antes de ponerle un nombre.</p>")
    + sec("Causas posibles de la falta de atención",
          card("TDAH", "Le cuesta sostener la atención, organizarse y controlar los impulsos, en casa y en la escuela, desde hace tiempo y no solo en una materia.")
          + card("Dificultades de aprendizaje", "Si leer, escribir o calcular le cuesta mucho, es esperable que se desconecte de las tareas que le exigen eso. Pasa, por ejemplo, con la <a href=\"dislexia-senales-ninos.html\">dislexia</a> o la <a href=\"discalculia-ninos.html\">discalculia</a>.")
          + card("Sueño, visión y audición", "Dormir poco o mal, no ver bien el pizarrón o no escuchar bien a la maestra pueden parecer falta de atención. Conviene que el pediatra lo descarte.")
          + card("Lo emocional", "La <a href=\"ansiedad-en-ninos.html\">ansiedad</a>, la tristeza o situaciones difíciles en la familia ocupan la cabeza y dejan poco lugar para la clase.")
          + card("El contexto", "Cambios de escuela, de grado o de docente, grupos muy numerosos o tareas que no se ajustan a su nivel también influyen."))
    + sec("¿Cuándo pensar en TDAH?",
          "<p>El diagnóstico de TDAH es <strong>clínico</strong>: lo hace un profesional a partir de entrevistas, observación e información de la familia y la escuela. En general se tiene en cuenta que las dificultades:</p>"
          + ul(["aparezcan en <b>más de un ámbito</b> (casa, escuela, actividades);",
                "se mantengan en el tiempo, <b>durante varios meses</b>;",
                "hayan empezado <b>en la infancia</b>;",
                "afecten de verdad su aprendizaje, sus vínculos o su día a día;",
                "no se expliquen mejor por otra causa."])
          + "<p class=\"svc-nota\">Los cuestionarios que circulan en internet sirven para ordenar las dudas, pero no diagnostican.</p>")
    + sec("Qué podés hacer mientras tanto",
          ul(["<b>Hablá con la escuela</b>: preguntá en qué momentos se distrae, en qué materias y desde cuándo.",
              "<b>Cuidá el sueño</b> y los horarios de pantallas, sobre todo a la noche.",
              "<b>Pedí al pediatra</b> un control de visión y audición.",
              "<b>Dividí las tareas</b> en partes cortas, con pausas y un lugar ordenado para hacerlas.",
              "<b>Reconocé el esfuerzo</b>, no solo los resultados: muchos chicos con dificultades de atención se sienten “retados” todo el día."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>Hacemos una evaluación integral que puede incluir <a href=\"evaluacion-neurocognitiva-berazategui.html\">evaluación neurocognitiva</a>, <a href=\"psicodiagnostico-berazategui.html\">psicodiagnóstico</a> y <a href=\"psicopedagogia-dificultades-aprendizaje.html\">psicopedagogía</a>, con entrevistas a la familia e información de la escuela. Con eso se define qué está pasando y cómo acompañar. El centro no indica medicación: si hace falta, orientamos la consulta con el especialista.</p>"),
    faqs=[
        ("¿Si mi hijo se distrae en clase es TDAH?", "No necesariamente. La falta de atención puede deberse a muchas causas: sueño, ansiedad, problemas de visión o audición, dificultades de aprendizaje o el contexto escolar. Una evaluación profesional ayuda a entender qué está pasando."),
        ("¿Quién diagnostica el TDAH?", "Un profesional de la salud con formación específica, a partir de entrevistas, observación, información de la familia y de la escuela y, cuando corresponde, pruebas de evaluación. No se diagnostica con un cuestionario online."),
        ("¿La escuela puede diagnosticar TDAH?", "No. La escuela aporta información muy valiosa sobre cómo se desempeña el chico, pero el diagnóstico lo hace un profesional de la salud."),
        ("¿Qué evaluación hacen en Centro Sinapsis?", "Según el caso, evaluación neurocognitiva, psicodiagnóstico y psicopedagogía, con entrevistas a la familia e información de la escuela. Podés consultar por WhatsApp, sin derivación médica."),
    ],
    sources=["cdc_tdah", "medline_tdah", "medline_aprendizaje"],
    related=["tdah", "psicoped", "neuro", "dislexia", "ansiedad", "guias"],
))

# ───────── 9. Selectividad alimentaria ─────────
ART.append(dict(
    slug="selectividad-alimentaria-ninos.html", ilu="selectividad", articulo=True, fecha="2026-11-04",
    title="Mi hijo come pocos alimentos: cuándo consultar | Sinapsis",
    desc="Selectividad alimentaria en niños: qué es esperable, señales para consultar, cómo acompañar en casa y cómo ayudan la terapia ocupacional y la fonoaudiología.",
    crumb_parent=GUIAS, crumb="Selectividad alimentaria", tag="Guía · Terapia ocupacional",
    h1="Selectividad alimentaria: cuando comer es un problema para tu hijo",
    lead="Muchos chicos pasan por una etapa de comer pocas cosas. Te ayudamos a distinguir lo esperable de lo que conviene consultar.",
    cta="Consultar por alimentación", motivo="desarrollo",
    wa="Hola! Quisiera consultar porque mi hijo/a come muy pocos alimentos.",
    about={"@type": "MedicalCondition", "name": "Selectividad alimentaria infantil"},
    body=
    sec("La respuesta corta",
        "<p>Entre los 2 y los 6 años es muy común que los chicos desconfíen de los alimentos nuevos y prefieran siempre los mismos. En la mayoría de los casos es una etapa. "
        "Conviene consultar cuando la lista de alimentos que acepta es <strong>muy corta</strong>, cuando rechaza <strong>grupos enteros</strong> (por ejemplo, todas las verduras o todo lo que tenga cierta textura), cuando las comidas se vuelven un <strong>momento de mucha angustia</strong> o cuando afecta su <strong>crecimiento</strong>. Primero, siempre, el pediatra; después, según el caso, terapia ocupacional y fonoaudiología.</p>")
    + sec("¿Qué es esperable y qué no?",
          card("Suele ser parte de la etapa", "Desconfía de lo nuevo, pero de a poco prueba; come una variedad razonable de alimentos de distintos grupos; tiene días de comer más y días de comer menos; crece bien.")
          + card("Conviene consultar", "Acepta muy pocos alimentos y la lista se achica con el tiempo; tiene arcadas o vómitos con ciertas texturas; solo come una marca o una presentación; las comidas duran mucho o terminan en llanto; le cuesta masticar o tragar; baja de peso o no crece como se espera."))
    + sec("¿Por qué pasa?",
          "<p>Las causas pueden ser varias y combinarse: una <strong>sensibilidad sensorial</strong> marcada a texturas, olores o temperaturas (ver <a href=\"integracion-sensorial-senales.html\">integración sensorial</a>), dificultades en la <strong>masticación o la deglución</strong>, experiencias desagradables con la comida (atragantamientos, reflujo) o el miedo a probar. "
          "Es frecuente en chicos con <a href=\"autismo-tea-berazategui.html\">autismo</a>, aunque también aparece sin ningún diagnóstico. Cuando es muy restrictiva y afecta la salud, los profesionales pueden evaluar un trastorno de la alimentación llamado ARFID (trastorno de evitación o restricción de la ingesta de alimentos).</p>")
    + sec("Cómo acompañar en casa",
          ul(["<b>Sin presión, sin premios ni castigos</b> con la comida: aumentan el rechazo.",
              "<b>Ofrecé lo nuevo de a poco</b>, en una porción chica, junto a algo que ya acepta. Muchas veces hace falta ofrecer un alimento muchas veces antes de que lo pruebe.",
              "<b>Comé en familia</b> y mostrá que vos también comés esos alimentos.",
              "<b>Involucralo</b> en las compras y en la cocina: tocar, oler y preparar la comida acerca sin obligar.",
              "<b>Rutinas</b> de horarios y lugar para comer, sin pantallas en la mesa."]))
    + '  <div class="svc-callout"><strong>Si tu hijo baja de peso, se atraganta seguido, tiene vómitos frecuentes o deja de tomar líquidos</strong>, consultá con el pediatra cuanto antes.</div>\n'
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>La selectividad alimentaria se aborda mejor en equipo. En <a href=\"terapia-ocupacional-integracion-sensorial.html\">terapia ocupacional</a> trabajamos la parte sensorial y la tolerancia a nuevas texturas, y en <a href=\"fonoaudiologia-berazategui.html\">fonoaudiología</a>, la masticación y la deglución. Siempre en coordinación con el pediatra y, cuando hace falta, con nutrición.</p>"),
    faqs=[
        ("¿Es normal que mi hijo coma siempre lo mismo?", "Entre los 2 y los 6 años es común que los chicos prefieran pocos alimentos y desconfíen de lo nuevo. Conviene consultar si la lista es muy corta, rechaza grupos enteros, las comidas generan mucha angustia o afecta su crecimiento."),
        ("¿La selectividad alimentaria tiene que ver con el autismo?", "Es más frecuente en chicos con autismo, muchas veces por sensibilidad sensorial, pero también aparece en chicos sin ningún diagnóstico."),
        ("¿Quién trata la selectividad alimentaria?", "Depende de la causa: el pediatra evalúa el crecimiento y la salud general; la terapia ocupacional aborda la parte sensorial y la fonoaudiología la masticación y la deglución. Muchas veces se trabaja en equipo, junto con nutrición."),
        ("¿Sirve obligarlo a probar?", "No. La presión, los premios o los castigos con la comida suelen aumentar el rechazo. Ayuda más ofrecer los alimentos de a poco, sin obligar, y comer en familia."),
    ],
    sources=["medline_preescolar", "medline_desarrollo"],
    related=["to", "fono", "sensorial", "tea", "to_ninos", "guias"],
))

# ───────── 10. TDAH en adultos ─────────
ART.append(dict(
    slug="tdah-en-adultos.html", ilu="tdah-adultos", articulo=True, fecha="2026-11-04",
    title="TDAH en adultos: señales y cuándo consultar | Centro Sinapsis",
    desc="Desorganización, olvidos, postergación e impulsividad: cómo se manifiesta el TDAH en adultos, por qué hace falta una evaluación y cómo es en Berazategui.",
    crumb_parent=GUIAS, crumb="TDAH en adultos", tag="Guía · Psicología",
    h1="TDAH en adultos: señales y cuándo consultar",
    lead="Muchos adultos llegan a la consulta después de años de sentirse desorganizados o “a las corridas”. Te contamos cómo se manifiesta el TDAH en la adultez y cómo se evalúa.",
    cta="Consultar por TDAH en adultos", motivo="tdah",
    wa="Hola! Quisiera consultar por una evaluación de TDAH en adultos.",
    about={"@type": "MedicalCondition", "name": "Trastorno por déficit de atención e hiperactividad (TDAH) en adultos"},
    body=
    sec("La respuesta corta",
        "<p>El TDAH no es solo de la infancia: en muchas personas continúa en la adultez, a veces sin haber sido diagnosticado nunca. "
        "En los adultos suele verse como <strong>desorganización, olvidos, postergación, dificultad para terminar lo que se empieza, impulsividad e inquietud interna</strong>. "
        "Si eso te acompaña desde siempre y afecta tu trabajo, tus estudios o tus vínculos, vale la pena una evaluación profesional. Un cuestionario online puede ayudarte a ordenar las dudas, pero no diagnostica.</p>")
    + sec("Cómo se manifiesta en la adultez",
          card("Atención y organización", "Te cuesta sostener la atención en tareas largas o aburridas, perdés cosas, te olvidás de citas o pagos, y la planificación del tiempo es una lucha constante.")
          + card("Impulsividad", "Interrumpís, decidís o comprás sin pensarlo demasiado, te cuesta esperar y a veces decís cosas de las que después te arrepentís.")
          + card("Inquietud", "Más que moverte todo el tiempo, sentís una inquietud interna, te cuesta relajarte o quedarte quieto en reuniones largas.")
          + card("Consecuencias", "Cambios frecuentes de trabajo o de carrera, sensación de no rendir según tus capacidades, cansancio, frustración y baja autoestima."))
    + sec("¿Por qué hace falta una evaluación?",
          "<p>Muchas de estas dificultades también aparecen con la <strong>ansiedad</strong>, la <strong>depresión</strong>, la falta de sueño, el estrés o algunos problemas de salud. Por eso el diagnóstico lo hace un profesional y tiene en cuenta, entre otras cosas, que las dificultades:</p>"
          + ul(["estén presentes <b>desde la infancia</b>, aunque en ese momento no se hayan notado o diagnosticado;",
                "aparezcan en <b>más de un ámbito</b> de la vida;",
                "interfieran de verdad en tu día a día;",
                "no se expliquen mejor por otra causa."])
          + "<p>Es común que un adulto consulte después de que diagnostican a su hijo o hija, al reconocerse en lo que escucha.</p>")
    + sec("Qué podés hacer mientras tanto",
          ul(["<b>Anotá ejemplos concretos</b> de lo que te pasa y, si podés, cómo eras de chico (boletines, comentarios de la familia).",
              "<b>Usá apoyos externos</b>: agenda, alarmas, listas y recordatorios.",
              "<b>Dividí las tareas grandes</b> en pasos chicos, con fechas.",
              "<b>Cuidá el sueño y la actividad física</b>, que influyen mucho en la atención."]))
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>Hacemos <a href=\"evaluacion-neurocognitiva-berazategui.html\">evaluación neurocognitiva</a> (atención, memoria y funciones ejecutivas) y <a href=\"psicodiagnostico-berazategui.html\">psicodiagnóstico</a>, y acompañamos con <a href=\"psicologia-berazategui.html\">psicología</a>: estrategias de organización, manejo de la impulsividad y acompañamiento emocional. "
          "El centro <strong>no indica medicación</strong>; si se considera necesaria, orientamos la consulta con psiquiatría.</p>"),
    faqs=[
        ("¿El TDAH puede aparecer en la adultez?", "Las dificultades del TDAH empiezan en la infancia, pero muchas personas reciben el diagnóstico recién en la adultez, porque en su momento no se notaron o se interpretaron de otra forma."),
        ("¿Hay un test para saber si tengo TDAH?", "Existen cuestionarios de cribado, como el ASRS de la OMS, que ayudan a ordenar las dudas, pero no diagnostican. El diagnóstico lo hace un profesional a partir de entrevistas y, cuando corresponde, de una evaluación neurocognitiva."),
        ("¿El TDAH en adultos se trata solo con medicación?", "No necesariamente. La psicoterapia, las estrategias de organización y la psicoeducación ayudan mucho. Si se considera la medicación, la indica un médico psiquiatra; en Centro Sinapsis no se indica medicación."),
        ("¿Evalúan TDAH en adultos en Berazategui?", "Sí. En Centro Sinapsis hacemos evaluación neurocognitiva y psicodiagnóstico para adultos. Podés pedir una primera entrevista por WhatsApp, sin derivación médica."),
    ],
    sources=["medline_tdah", "cdc_tdah"],
    related=["tdah", "neuro", "psico", "psicodx", "primera", "guias"],
))

# ───────── 11. Anticipación en autismo ─────────
ART.append(dict(
    slug="anticipacion-autismo-cambios-rutina.html", ilu="anticipacion", articulo=True, fecha="2026-11-04",
    title="Cómo anticipar cambios a un niño con autismo | Centro Sinapsis",
    desc="Ideas prácticas para preparar a un niño con autismo para una consulta, un viaje o un cambio de rutina: anticipación, apoyos visuales y regulación sensorial.",
    crumb_parent=GUIAS, crumb="Anticipar cambios en el autismo", tag="Guía · Autismo / TEA",
    h1="Cómo preparar a un niño con autismo para una consulta o un cambio de rutina",
    lead="Saber qué va a pasar da tranquilidad. Estas herramientas ayudan a que los cambios sean más previsibles y menos estresantes.",
    cta="Consultar por autismo", motivo="tea",
    wa="Hola! Quisiera consultar por acompañamiento para mi hijo/a con autismo.",
    about={"@type": "MedicalCondition", "name": "Trastorno del espectro autista"},
    body=
    sec("La respuesta corta",
        "<p>Muchos chicos con <a href=\"autismo-tea-berazategui.html\">autismo</a> se sienten más seguros cuando saben qué va a pasar, en qué orden y cuándo termina. "
        "<strong>Anticipar</strong> con tiempo, usar <strong>apoyos visuales</strong> y planificar cómo cuidar su <strong>regulación sensorial</strong> ayuda a que una consulta médica, un viaje o un cambio en la rutina sea más llevadero para el chico y para la familia.</p>")
    + sec("Herramientas que suelen ayudar",
          card("Anticipar con tiempo", "Contale qué va a pasar unos días antes y recordalo el mismo día. Usá frases cortas y concretas: “Mañana vamos al médico. Te va a mirar los oídos. Después volvemos a casa”.")
          + card("Apoyos visuales", "Una agenda con dibujos o fotos de cada paso (salir, viajar, esperar, consulta, volver) le permite ver la secuencia y saber cuándo termina.")
          + card("Historias con imágenes", "Un relato corto, con fotos del lugar o de la persona que va a ver, ayuda a imaginar la situación antes de vivirla.")
          + card("Regulación sensorial", "Llevá lo que lo calma: auriculares, un juguete, un objeto preferido o algo para morder o apretar. Si el lugar es ruidoso, buscá un rincón más tranquilo.")
          + card("Un “después” claro", "Saber qué viene al terminar (ir a la plaza, su merienda preferida) ayuda a tolerar lo que cuesta."))
    + sec("Antes de una consulta médica",
          ul(["<b>Avisá al profesional</b> cómo se comunica tu hijo, qué le molesta (ruidos, luces, que lo toquen) y qué lo ayuda.",
              "<b>Pedí, si se puede, el primer turno</b> o un horario con menos espera.",
              "<b>Practicá en casa</b> con juegos: revisar los oídos a un muñeco, abrir la boca, subirse a una camilla.",
              "<b>Llevá algo para la espera</b> y preparate para salir un rato si lo necesita."]))
    + sec("Cuando el cambio es grande",
          "<p>Mudanzas, un nuevo integrante en la familia, el cambio de escuela o las vacaciones se pueden anticipar con más tiempo: visitar el lugar antes, mirar fotos, contar los días en un calendario y mantener todo lo que se pueda de la rutina de siempre (comidas, horarios de sueño, objetos conocidos).</p>")
    + '  <div class="svc-callout">Cada chico es distinto: lo que a uno lo calma, a otro lo puede alterar. Probá de a una herramienta y quedate con lo que funciona para tu hijo.</div>\n'
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"terapia-ocupacional-integracion-sensorial.html\">terapia ocupacional</a> trabajamos la regulación sensorial y la autonomía en la vida diaria, y en <a href=\"psicologia-berazategui.html\">psicología</a> acompañamos al chico y orientamos a la familia, también con estas herramientas de anticipación. Podés consultar por WhatsApp, con o sin CUD.</p>"),
    faqs=[
        ("¿Por qué a los chicos con autismo les cuestan tanto los cambios?", "Muchos chicos con autismo se sienten más seguros con la rutina y lo previsible. Un cambio inesperado puede generar mucha ansiedad. Anticipar qué va a pasar ayuda a que lo vivan con más tranquilidad."),
        ("¿Qué es una agenda visual?", "Es una secuencia de dibujos o fotos que muestra los pasos de una actividad o del día, en orden. Ayuda a que el chico sepa qué va a pasar y cuándo termina."),
        ("¿Cómo preparo a mi hijo con autismo para ir al médico?", "Anticipá la consulta con tiempo y con apoyos visuales, avisá al profesional qué le molesta y qué lo ayuda, practicá en casa con juegos y llevá algo que lo calme para la espera."),
        ("¿Quién puede ayudarme con estas estrategias?", "La terapia ocupacional y la psicología trabajan estas herramientas con el chico y la familia. En Centro Sinapsis podés consultar por WhatsApp, sin derivación médica."),
    ],
    sources=["oms_tea", "medline_tea"],
    related=["tea", "senales", "to", "psico", "disc", "guias"],
))

# ───────── 12. Estimulación cognitiva en casa ─────────
ART.append(dict(
    slug="estimulacion-cognitiva-en-casa-adultos-mayores.html", ilu="estimulacion-casa", articulo=True, fecha="2026-11-04",
    title="Ejercicios de memoria para adultos mayores en casa | Sinapsis",
    desc="Actividades simples para estimular la memoria y la atención de los adultos mayores en casa, hábitos que cuidan el cerebro y señales para consultar.",
    crumb_parent=GUIAS, crumb="Estimulación cognitiva en casa", tag="Guía · Adultos mayores",
    h1="Estimulación cognitiva en casa: actividades para adultos mayores",
    lead="Mantener la mente activa es parte de envejecer bien. Te compartimos actividades simples y los hábitos que más ayudan.",
    cta="Consultar por estimulación cognitiva", motivo="adultos-mayores",
    wa="Hola! Quisiera consultar por estimulación cognitiva para un adulto mayor.",
    about={"@type": "MedicalTherapy", "name": "Estimulación cognitiva en adultos mayores"},
    body=
    sec("La respuesta corta",
        "<p>Leer, conversar, jugar a las cartas, aprender algo nuevo y moverse todos los días ayuda a mantener activas la memoria y la atención. "
        "Ningún juego por sí solo previene la demencia, pero <strong>combinar actividad mental, actividad física y vida social</strong>, junto con el cuidado de la salud, es lo que más se recomienda. "
        "Si los olvidos empiezan a afectar la vida diaria, lo indicado es una consulta, no más ejercicios.</p>")
    + sec("Actividades para hacer en casa",
          card("Memoria", "Recordar la lista de las compras antes de leerla, contar qué se hizo ayer, repasar fotos y recuerdos con la familia, aprender una canción o un poema.")
          + card("Atención y concentración", "Sopas de letras, crucigramas, rompecabezas, encontrar diferencias, seguir una receta nueva paso a paso.")
          + card("Lenguaje", "Leer en voz alta, conversar sobre noticias o libros, nombrar palabras que empiecen con una letra, escribir cartas o un diario.")
          + card("Razonamiento y planificación", "Juegos de cartas y de mesa, organizar una salida o un presupuesto, juegos de estrategia como el dominó o el ajedrez.")
          + card("Algo nuevo", "Aprender un idioma, un instrumento, una manualidad o a usar el celular: lo nuevo exige más que lo que ya sale de memoria.")
          + '<p>También podés usar nuestros <a href="juegos.html">juegos</a> y <a href="ejercicios.html">ejercicios gratuitos</a>, pensados para hacer en casa.</p>')
    + sec("Hábitos que cuidan el cerebro",
          ul(["<b>Moverse todos los días</b>: la Organización Mundial de la Salud recomienda actividad física regular también para cuidar la salud cognitiva. Ver <a href=\"ejercicio-adultos-mayores.html\">ejercicio para adultos mayores</a>.",
              "<b>Mantener los vínculos</b>: la soledad y el aislamiento afectan la memoria y el ánimo.",
              "<b>Controlar la presión, el azúcar y el colesterol</b> con el médico de cabecera.",
              "<b>Revisar la audición y la vista</b>: oír y ver bien ayuda a participar y a recordar.",
              "<b>Dormir bien</b> y consultar si hay ronquidos fuertes o pausas al respirar.",
              "<b>No fumar y moderar el alcohol</b>."]))
    + '  <div class="svc-callout">Si los olvidos son frecuentes y afectan la vida diaria (repetir las mismas preguntas, perderse en lugares conocidos, no poder con tareas que antes resolvía), conviene consultar. Mirá <a href="olvidos-memoria-adultos-mayores.html">cuándo preocuparse por los olvidos</a>.</div>\n'
    + sec("Cómo trabajamos en Centro Sinapsis",
          "<p>En <a href=\"estimulacion-cognitiva-berazategui.html\">estimulación cognitiva</a> armamos actividades a medida de cada persona, y en el <a href=\"talleres.html\">taller de estimulación cognitiva para adultos</a> se trabaja en grupo, que además suma el encuentro con otros. Si hace falta, una <a href=\"evaluacion-neurocognitiva-berazategui.html\">evaluación neurocognitiva</a> ayuda a entender qué está pasando.</p>"),
    faqs=[
        ("¿Qué ejercicios ayudan a la memoria de los adultos mayores?", "Actividades que combinan memoria, atención y lenguaje, como recordar listas, leer y conversar, juegos de cartas y de mesa, crucigramas y aprender algo nuevo. Lo ideal es sumarles actividad física y vida social."),
        ("¿Los juegos de memoria previenen la demencia?", "Ningún juego por sí solo previene la demencia. Lo que más se recomienda es combinar actividad mental, actividad física, vínculos sociales y el control de la salud, como la presión arterial y la audición."),
        ("¿Cuándo conviene consultar por los olvidos?", "Cuando son frecuentes y afectan la vida diaria: repetir las mismas preguntas, perderse en lugares conocidos o tener dificultades nuevas con tareas que antes resolvía. En esos casos conviene una evaluación."),
        ("¿Tienen talleres de estimulación cognitiva para adultos en Berazategui?", "Sí. En Centro Sinapsis hay un taller de estimulación cognitiva para adultos y adultos mayores. Consultá días y horarios por WhatsApp."),
    ],
    sources=["oms_demencia", "medline_memoria", "oms_actividad"],
    related=["estcog", "olvidos", "ejercicio", "talleres", "neuro", "guias"],
))

# ───────────────────────── índice /guias.html ─────────────────────────
INDICE = [
    # Psicología
    ("tdah-en-adultos.html", "tdah-adultos", "TDAH en adultos", "Señales y cuándo consultar.", "Psicología"),
    ("cuando-llevar-a-mi-hijo-al-psicologo.html", "psicologo-infantil", "¿Cuándo llevar a mi hijo al psicólogo?", "Señales y cómo es la primera consulta.", "Psicología"),
    ("ansiedad-en-ninos.html", "ansiedad", "Ansiedad en niños y adolescentes", "Señales y cómo acompañar en casa.", "Psicología"),
    ("rabietas-berrinches-ninos.html", "berrinche", "Rabietas y berrinches", "Qué es esperable y cuándo consultar.", "Psicología"),
    ("primera-consulta-psicologo.html", "primera-consulta", "Tu primera consulta con el psicólogo", "Qué pasa y qué preguntar.", "Psicología"),
    ("tdah-berazategui.html", "tdah", "TDAH en niños y adultos", "Atención, inquietud e impulsividad.", "Psicología"),
    # Psicopedagogía
    ("no-presta-atencion-en-clase.html", "atencion-clase", "¿No presta atención en clase?", "TDAH y otras causas posibles.", "Psicopedagogía"),
    ("que-hace-un-psicopedagogo.html", "psicopedagogo", "¿Qué hace un psicopedagogo?", "Cuándo consultar y cómo es el proceso.", "Psicopedagogía"),
    ("dislexia-senales-ninos.html", "dislexia", "Dislexia en niños", "Señales en el jardín y la primaria.", "Psicopedagogía"),
    ("discalculia-ninos.html", "discalculia", "Discalculia", "Cuando los números cuestan más.", "Psicopedagogía"),
    ("dificultades-escritura-disgrafia.html", "disgrafia", "Dificultades en la escritura", "Disgrafía y disortografía.", "Psicopedagogía"),
    # Fonoaudiología
    ("retraso-lenguaje-ninos.html", "lenguaje", "Mi hijo no habla: ¿cuándo consultar?", "Qué es esperable a cada edad en el lenguaje.", "Fonoaudiología"),
    ("problemas-pronunciacion-ninos.html", "pronunciacion", "Mi hijo no pronuncia bien", "La erre, la ese y otros sonidos.", "Fonoaudiología"),
    ("tartamudez-ninos.html", "tartamudez", "Tartamudez en niños", "Cuándo es parte del desarrollo y cuándo consultar.", "Fonoaudiología"),
    # Terapia ocupacional
    ("selectividad-alimentaria-ninos.html", "selectividad", "Selectividad alimentaria", "Cuando comer es un problema.", "Terapia Ocupacional"),
    ("que-hace-terapia-ocupacional-ninos.html", "autonomia", "¿Qué hace la terapia ocupacional?", "Autonomía, juego y sentidos.", "Terapia Ocupacional"),
    ("integracion-sensorial-senales.html", "integracion-sensorial", "Integración sensorial", "Ruidos, texturas y movimiento: qué mirar.", "Terapia Ocupacional"),
    ("motricidad-fina-ninos.html", "motricidad-fina", "Motricidad fina", "Lápiz, tijeras y botones: qué es esperable.", "Terapia Ocupacional"),
    # Kinesiología y adultos mayores
    ("ejercicio-adultos-mayores.html", "ejercicio-mayores", "Ejercicio para adultos mayores", "Por qué y cómo empezar.", "Kinesiología"),
    ("prevencion-caidas-adultos-mayores.html", "caidas", "Cómo prevenir caídas", "Fuerza, equilibrio y una casa segura.", "Kinesiología"),
    ("estimulacion-cognitiva-en-casa-adultos-mayores.html", "estimulacion-casa", "Estimulación cognitiva en casa", "Actividades para la memoria.", "Adultos mayores"),
    ("olvidos-memoria-adultos-mayores.html", "olvidos", "Olvidos en adultos mayores", "Qué es esperable y cuándo preocuparse.", "Adultos mayores"),
    # Desarrollo y discapacidad
    ("senales-alerta-desarrollo-bebe.html", "senales-bebe", "Señales de alerta en el bebé", "Qué hace a cada edad, de 0 a 12 meses.", "Estimulación temprana"),
    ("senales-autismo-ninos.html", "senales-autismo", "¿Cómo saber si mi hijo tiene autismo?", "Señales por edad y cuándo consultar.", "Autismo / TEA"),
    ("anticipacion-autismo-cambios-rutina.html", "anticipacion", "Anticipar cambios en el autismo", "Consultas, viajes y cambios de rutina.", "Autismo / TEA"),
    ("como-tramitar-cud-berazategui.html", "discapacidad", "Cómo tramitar el CUD en Berazategui", "El trámite paso a paso, gratis y sin gestores.", "Discapacidad"),
    ("prestaciones-discapacidad-ley-24901.html", "obras-sociales", "Qué cubre tu obra social con CUD", "La Ley 24.901 y cómo reclamar.", "Discapacidad"),
    ("centro-discapacidad-zona-sur.html", "discapacidad", "Atención a personas con discapacidad", "Prestaciones con CUD en Zona Sur.", "Discapacidad"),
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
        <img src="img/ilustraciones/{ilu}.svg?v={P.ILU.VERSION}" alt="" width="120" height="120" loading="lazy" decoding="async">
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
    # Los borradores (borrador=True) sólo se generan con --borradores, para
    # revisarlos en local; así nunca llegan a producción por un merge.
    con_borradores = "--borradores" in sys.argv
    for a in ART:
        if a.get("borrador") and not con_borradores:
            print("borrador (no generado)", a["slug"])
            continue
        P.FECHA = a.get("fecha", "2026-10-31")
        with open(os.path.join(P.ROOT, a["slug"]), "w", encoding="utf-8") as f:
            f.write(P.page(a))
        print("ok", a["slug"], len(a["title"]), len(a["desc"]))
    P.FECHA = "2026-11-04"
    with open(os.path.join(P.ROOT, "guias.html"), "w", encoding="utf-8") as f:
        f.write(indice_html())
    print("ok guias.html")
