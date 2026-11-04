"""
Páginas de los enfoques de psicología que el centro ofrece en su ficha de
Google (productos de la categoría "Psicología", noviembre 2026):

  - psicoanalisis-berazategui.html
  - terapia-gestalt-berazategui.html
  - terapia-cognitivo-conductual-berazategui.html
  - terapia-sistemica-familiar-berazategui.html
  - terapia-junguiana-berazategui.html

Además agrega a psicologia-berazategui.html la sección "Enfoques de trabajo"
con enlaces a las cinco (bloque idempotente entre <!-- SINAPSIS:ENFOQUES -->).

PENDIENTE DE CONFIRMACIÓN (no se publica hasta tenerlo): qué profesional del
equipo trabaja con cada enfoque, su formación en ese enfoque y si atiende
niños, adolescentes, adultos, parejas o familias. Hasta entonces las páginas
explican el enfoque y derivan la elección del profesional a la primera
entrevista, sin nombrar a nadie.

Reglas: no se prometen resultados, no se comparan enfoques como "mejores" o
"peores", no se inventan duraciones ni frecuencias.

Uso: python3 scripts/generar_enfoques_psicologia.py
"""
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import plantilla_paginas as P  # noqa: E402
from plantilla_paginas import sec, ul, card  # noqa: E402

FECHA = "2026-11-04"
ENFOQUES = ["psicoanalisis", "gestalt", "tcc", "sistemica", "junguiana"]


def como(items):
    return '<div class="svc-como">' + "".join(
        f'<div class="svc-como-item"><h3>{h}</h3><p>{t}</p></div>' for h, t in items) + "</div>"


def otros_enfoques(actual):
    enlaces = [f'<a href="{P.REL[k][0]}">{P.REL[k][1].lower() if k != "psicoanalisis" else "psicoanálisis"}</a>'
               for k in ENFOQUES if k != actual]
    lista = ", ".join(enlaces[:-1]) + " y " + enlaces[-1]
    return sec("¿Cómo elegir un enfoque?",
               "<p>Todos los enfoques de la psicología buscan aliviar el malestar y ayudarte a vivir mejor; cambian el camino. "
               "Las investigaciones muestran que, más allá del enfoque, pesa mucho la relación de confianza con el profesional y que los objetivos se acuerden entre los dos.</p>"
               f"<p>En Centro Sinapsis el equipo de psicología trabaja desde distintas orientaciones: además de esta, {lista}. "
               "Si ya sabés qué enfoque preferís, decínoslo al escribirnos. Si no lo sabés, no hace falta: en la primera entrevista "
               "escuchamos qué te pasa y te orientamos hacia el profesional y el enfoque que mejor se ajusten a tu situación.</p>")


COMUN_FAQ_DERIVACION = ("¿Necesito derivación médica para empezar?",
                        "No. Podés escribirnos directamente por WhatsApp y coordinamos una primera entrevista.")
COMUN_FAQ_ELEGIR = ("¿Puedo pedir un profesional que trabaje con este enfoque?",
                    "Sí. Contanos al escribirnos que te interesa este enfoque y te indicamos qué profesional del equipo trabaja desde esa orientación.")

BASE = dict(crumb_parent=("Psicología", "psicologia-berazategui.html"), motivo="emocional",
            audience={"@type": "PeopleAudience", "audienceType": "Adolescentes, adultos y familias de Berazategui, Quilmes, Florencio Varela y Zona Sur"})

PAGINAS = []

# ─────────────────────────── Psicoanálisis ───────────────────────────
PAGINAS.append(dict(BASE,
    slug="psicoanalisis-berazategui.html", ilu="psicoanalisis",
    title="Psicoanálisis en Berazategui | Centro Sinapsis",
    desc="Psicoanálisis en Berazategui y Zona Sur: un espacio de palabra para entender lo que se repite en tu vida y aliviar la angustia. Sin derivación previa.",
    crumb="Psicoanálisis", tag="Psicología · Enfoques",
    h1="Psicoanálisis en Berazategui",
    lead="Un espacio para hablar con libertad, escucharte de otra manera y entender lo que se repite en tu vida.",
    cta="Consultar por psicoanálisis",
    wa="Hola! Quisiera consultar por terapia con enfoque psicoanalítico.",
    about={"@type": "MedicalTherapy", "name": "Psicoanálisis",
           "description": "Psicoterapia basada en la palabra y la escucha, que trabaja sobre los aspectos inconscientes que intervienen en el malestar, los síntomas y las repeticiones de la vida de una persona."},
    body=
    sec("¿Qué es el psicoanálisis?",
        "<p>El psicoanálisis es una forma de psicoterapia creada por Sigmund Freud a fines del siglo XIX y desarrollada después por muchos autores, como Melanie Klein, Donald Winnicott y Jacques Lacan. "
        "En la Argentina tiene una tradición muy fuerte: es una de las orientaciones más extendidas entre los psicólogos del país.</p>"
        "<p>Parte de una idea central: no todo lo que nos pasa es consciente. Hay deseos, temores y marcas de nuestra historia que influyen en cómo sentimos, elegimos y nos vinculamos, aunque no nos demos cuenta. "
        "Hablar de eso en un espacio cuidado permite entender el sentido de los síntomas y abrir otras posibilidades.</p>")
    + sec("Ideas clave",
          card("La palabra", "El trabajo se hace hablando. La persona dice lo que se le ocurre, aunque parezca sin importancia o sin orden (lo que se llama asociación libre).")
          + card("Lo inconsciente", "Los sueños, los olvidos, los actos fallidos y lo que se repite son pistas de aquello que no sabemos de nosotros mismos.")
          + card("La historia de cada persona", "Lo que te pasa hoy se entiende mejor a la luz de tu historia, sin buscar culpables.")
          + card("El vínculo con el analista", "La relación con el profesional es parte del trabajo: lo que aparece ahí también se escucha."))
    + sec("¿En qué situaciones puede ayudar?",
          ul(["Angustia, ansiedad o síntomas que no se terminan de entender.",
              "Situaciones que se repiten: en la pareja, el trabajo o los vínculos.",
              "Duelos, separaciones y momentos de cambio.",
              "Inhibiciones, dudas constantes o dificultad para decidir.",
              "Preguntas sobre la propia historia, el deseo o qué hacer con la propia vida."])
          + '<p class="svc-nota">Con niños y niñas, el psicoanálisis trabaja a través del juego y el dibujo, y con entrevistas a la familia.</p>')
    + sec("Cómo es una sesión",
          como([("Hablar con libertad", "No hay un temario: se habla de lo que surge. El profesional escucha y, en ciertos momentos, interviene para señalar algo o hacer una pregunta."),
                ("Un proceso sin apuro", "No tiene una cantidad de sesiones fijada de antemano. La frecuencia se acuerda en la primera entrevista."),
                ("Con confidencialidad", "Lo que se dice en sesión está protegido por el secreto profesional.")]))
    + otros_enfoques("psicoanalisis"),
    faqs=[("¿Qué es el psicoanálisis?", "Es una forma de psicoterapia basada en la palabra y la escucha, que trabaja sobre los aspectos inconscientes que intervienen en el malestar, los síntomas y lo que se repite en la vida de una persona."),
          ("¿Hay que acostarse en un diván?", "No necesariamente. Muchas sesiones se hacen cara a cara. Si en algún momento se propone el diván, se conversa con la persona."),
          ("¿Cuánto dura un tratamiento psicoanalítico?", "No tiene una duración fija: depende de cada persona y de lo que vaya necesitando. La frecuencia de las sesiones se acuerda en la primera entrevista."),
          ("¿Sirve para niños?", "Sí. Con niños y niñas se trabaja a través del juego y el dibujo, y con entrevistas a la familia."),
          COMUN_FAQ_ELEGIR, COMUN_FAQ_DERIVACION],
    related=["psico", "gestalt", "tcc", "sistemica", "junguiana", "primera"],
))

# ─────────────────────────── Gestalt ───────────────────────────
PAGINAS.append(dict(BASE,
    slug="terapia-gestalt-berazategui.html", ilu="gestalt",
    title="Terapia Gestalt en Berazategui | Centro Sinapsis",
    desc="Terapia Gestalt en Berazategui y Zona Sur: trabajar con lo que sentís aquí y ahora, darte cuenta y gestionar tus emociones. Sin derivación previa.",
    crumb="Terapia Gestalt", tag="Psicología · Enfoques",
    h1="Terapia Gestalt en Berazategui",
    lead="Un enfoque centrado en lo que sentís aquí y ahora, para darte cuenta de lo que te pasa y elegir cómo responder.",
    cta="Consultar por terapia Gestalt",
    wa="Hola! Quisiera consultar por terapia Gestalt.",
    about={"@type": "MedicalTherapy", "name": "Terapia Gestalt",
           "description": "Psicoterapia humanista y experiencial centrada en el presente, la toma de conciencia (darse cuenta) y la integración de pensamientos, emociones y sensaciones corporales."},
    body=
    sec("¿Qué es la terapia Gestalt?",
        "<p>La terapia Gestalt es un enfoque humanista desarrollado en la década de 1950 por Fritz Perls, Laura Perls y Paul Goodman. "
        "\"Gestalt\" es una palabra alemana que se refiere a una forma o a un todo: la persona se entiende como una unidad de pensamientos, emociones, sensaciones del cuerpo y vínculos.</p>"
        "<p>En lugar de centrarse sobre todo en explicar el pasado, pone el foco en cómo vivís hoy lo que te pasa: qué sentís, qué hacés y qué evitás. "
        "A partir de ese \"darse cuenta\", la persona puede hacerse cargo de sus elecciones y encontrar formas más satisfactorias de vincularse consigo misma y con los demás.</p>")
    + sec("Ideas clave",
          card("El aquí y ahora", "Lo que pasa en la sesión, en este momento, es el punto de partida del trabajo.")
          + card("Darse cuenta", "Tomar conciencia de lo que sentís, pensás y hacés es lo que abre la posibilidad de cambiar.")
          + card("Emociones y cuerpo", "Las emociones se registran también en el cuerpo: la postura, la respiración o la tensión dan información valiosa.")
          + card("Responsabilidad", "No como culpa, sino como capacidad de responder: reconocer qué parte de la situación depende de vos."))
    + sec("¿En qué situaciones puede ayudar?",
          ul(["Dificultad para reconocer, expresar o regular las emociones.",
              "Ansiedad, estrés o sensación de estar desconectado de uno mismo.",
              "Duelos y asuntos que quedaron \"pendientes\" o sin cerrar.",
              "Problemas en los vínculos o para poner límites.",
              "Ganas de conocerte mejor y crecer a nivel personal."]))
    + sec("Cómo es una sesión",
          como([("Conversar y registrar", "Se habla de lo que te pasa, prestando atención también a lo que sentís en el momento y a cómo lo decís."),
                ("Experimentar", "El profesional puede proponer ejercicios o \"experimentos\": por ejemplo, hablarle a alguien ausente como si estuviera (la técnica de la silla vacía), o explorar una sensación del cuerpo. Siempre con tu acuerdo."),
                ("Integrar", "Al final se pone en palabras lo que apareció y qué podés llevarte para tu vida cotidiana.")]))
    + otros_enfoques("gestalt"),
    faqs=[("¿Qué es la terapia Gestalt?", "Es un enfoque humanista de psicoterapia centrado en el presente y en darse cuenta de lo que uno siente, piensa y hace, integrando las emociones y el cuerpo."),
          ("¿Qué es la silla vacía?", "Es una técnica de la terapia Gestalt en la que la persona habla con alguien o algo ausente, imaginando que está en una silla frente a ella. Ayuda a expresar lo que quedó sin decir. Nunca se hace sin tu acuerdo."),
          ("¿Tengo que hacer ejercicios en voz alta?", "No es obligatorio. Los ejercicios se proponen y se respeta siempre si preferís no hacerlos."),
          ("¿Cuánto dura una terapia Gestalt?", "Depende de cada persona y de lo que quiera trabajar. Se conversa en la primera entrevista y se revisa a lo largo del proceso."),
          COMUN_FAQ_ELEGIR, COMUN_FAQ_DERIVACION],
    related=["psico", "psicoanalisis", "tcc", "sistemica", "junguiana", "primera"],
))

# ─────────────────────────── TCC ───────────────────────────
PAGINAS.append(dict(BASE,
    slug="terapia-cognitivo-conductual-berazategui.html", ilu="tcc",
    title="Terapia cognitivo conductual (TCC) en Berazategui | Sinapsis",
    desc="Terapia cognitivo conductual (TCC) en Berazategui y Zona Sur: herramientas concretas para la ansiedad, el ánimo y los hábitos. Sin derivación previa.",
    crumb="Terapia cognitivo conductual", tag="Psicología · Enfoques",
    h1="Terapia cognitivo conductual (TCC) en Berazategui",
    lead="Un enfoque práctico y con objetivos claros, para entender cómo se conectan tus pensamientos, emociones y conductas, y cambiar lo que te hace mal.",
    cta="Consultar por TCC",
    wa="Hola! Quisiera consultar por terapia cognitivo conductual (TCC).",
    about={"@type": "MedicalTherapy", "name": "Terapia cognitivo conductual (TCC)",
           "description": "Psicoterapia estructurada y orientada a objetivos que trabaja sobre la relación entre pensamientos, emociones y conductas, con técnicas como la reestructuración cognitiva y la exposición gradual."},
    body=
    sec("¿Qué es la terapia cognitivo conductual?",
        "<p>La terapia cognitivo conductual (TCC) es un enfoque desarrollado a partir de los trabajos de Aaron Beck y Albert Ellis en las décadas de 1950 y 1960, que integra los aportes de la psicología del aprendizaje.</p>"
        "<p>Parte de una idea simple: lo que pensamos sobre lo que nos pasa influye en cómo nos sentimos y en lo que hacemos, y eso a su vez refuerza lo que pensamos. "
        "La terapia ayuda a identificar esos círculos y a cambiarlos con herramientas concretas. Es uno de los enfoques con más investigación científica, sobre todo en ansiedad y depresión.</p>")
    + sec("Ideas clave",
          card("Pensamientos, emociones y conductas", "Se trabaja cómo se conectan entre sí en las situaciones concretas que te generan malestar.")
          + card("Objetivos claros", "Desde el inicio se acuerdan qué querés cambiar y cómo se va a medir el avance.")
          + card("Herramientas prácticas", "Registros, técnicas de respiración y relajación, resolución de problemas y exposición gradual a lo que se evita.")
          + card("Trabajo entre sesiones", "Se proponen pequeñas tareas para practicar en la vida cotidiana lo que se trabaja en sesión."))
    + sec("¿En qué situaciones puede ayudar?",
          ul(["Ansiedad, ataques de pánico, preocupación constante y fobias.",
              "Tristeza, desgano o depresión.",
              "Pensamientos o conductas repetitivas (por ejemplo, en el trastorno obsesivo compulsivo).",
              "Problemas de sueño, estrés y manejo de la frustración o el enojo.",
              "Hábitos que se quieren cambiar.",
              "En niños y adolescentes: miedos, ansiedad, conducta y organización, con participación de la familia."]))
    + sec("Cómo es el proceso",
          como([("Evaluación", "En las primeras sesiones se entiende qué te pasa, en qué situaciones y qué lo mantiene."),
                ("Plan y herramientas", "Se acuerdan los objetivos y se aprenden técnicas concretas, explicadas paso a paso."),
                ("Práctica y revisión", "Se practica en la vida diaria y se revisan los avances en cada sesión para ajustar el plan.")]))
    + otros_enfoques("tcc"),
    faqs=[("¿Qué es la terapia cognitivo conductual?", "Es un enfoque de psicoterapia estructurado y orientado a objetivos que trabaja sobre la relación entre pensamientos, emociones y conductas, con herramientas prácticas para el día a día."),
          ("¿La TCC sirve para la ansiedad?", "La terapia cognitivo conductual es uno de los enfoques con más investigación en ansiedad, ataques de pánico y fobias. Igual, cada caso se evalúa en la primera entrevista."),
          ("¿Cuánto dura una TCC?", "Suele ser un tratamiento de duración más acotada que otros enfoques, pero depende de cada persona y de los objetivos. Se conversa al inicio y se revisa durante el proceso."),
          ("¿Hay tareas para hacer en casa?", "Sí, en general se proponen ejercicios breves entre sesiones para practicar lo trabajado. Se adaptan a tus tiempos."),
          COMUN_FAQ_ELEGIR, COMUN_FAQ_DERIVACION],
    related=["psico", "ansiedad", "psicoanalisis", "gestalt", "sistemica", "junguiana"],
))

# ─────────────────────────── Sistémica ───────────────────────────
PAGINAS.append(dict(BASE,
    slug="terapia-sistemica-familiar-berazategui.html", ilu="sistemica",
    title="Terapia sistémica y familiar en Berazategui | Sinapsis",
    desc="Terapia sistémica y familiar en Berazategui y Zona Sur: trabajar el malestar desde los vínculos, con la persona, la pareja o la familia. Sin derivación.",
    crumb="Terapia sistémica y familiar", tag="Psicología · Enfoques",
    h1="Terapia sistémica y familiar en Berazategui",
    lead="Un enfoque que mira el malestar en el contexto de los vínculos: la familia, la pareja, la escuela o el trabajo.",
    cta="Consultar por terapia sistémica",
    wa="Hola! Quisiera consultar por terapia sistémica / familiar.",
    about={"@type": "MedicalTherapy", "name": "Terapia sistémica y familiar",
           "description": "Psicoterapia que entiende los problemas en el contexto de las relaciones y los sistemas de los que forma parte la persona, y que puede trabajar de forma individual, con parejas o con familias."},
    body=
    sec("¿Qué es la terapia sistémica?",
        "<p>La terapia sistémica surgió a mediados del siglo XX a partir de los trabajos del grupo de Palo Alto (Gregory Bateson, Paul Watzlawick, Don Jackson) y de terapeutas familiares como Salvador Minuchin y Virginia Satir.</p>"
        "<p>Propone mirar a cada persona como parte de sistemas más amplios: la familia, la pareja, la escuela, el trabajo. "
        "Lo que le pasa a uno influye en los demás, y al revés. Por eso, en lugar de buscar un \"culpable\", se trabaja sobre la forma en que se comunican y se organizan esos vínculos, y sobre los recursos que ya tienen.</p>")
    + sec("Ideas clave",
          card("El contexto", "Un problema se entiende mejor cuando se mira en qué relaciones y en qué momento aparece.")
          + card("La comunicación", "Se presta atención a cómo se dicen las cosas, a los roles y a las reglas no escritas de cada familia.")
          + card("Recursos y fortalezas", "Se buscan las capacidades que la familia o la persona ya tienen para resolver lo que les pasa.")
          + card("Distintas modalidades", "Puede ser terapia individual, de pareja o familiar, según lo que se necesite."))
    + sec("¿En qué situaciones puede ayudar?",
          ul(["Conflictos familiares o de pareja, peleas que se repiten y problemas de comunicación.",
              "Separaciones, nuevas familias ensambladas, mudanzas y otros cambios.",
              "Dificultades en la crianza, límites y convivencia con hijos adolescentes.",
              "Cuando un hijo o hija tiene un síntoma o un diagnóstico y la familia necesita reorganizarse.",
              "Duelos que afectan a toda la familia.",
              "Personas que quieren entender su lugar en la propia historia familiar."]))
    + sec("Cómo es el proceso",
          como([("Quiénes participan", "Se define en la primera entrevista: puede venir una sola persona, la pareja o varios miembros de la familia, según lo que se quiera trabajar."),
                ("Mapa de la familia", "Se pueden usar herramientas como el genograma, un dibujo del árbol familiar que ayuda a ver vínculos e historias."),
                ("Cambios concretos", "Se buscan pequeños cambios en la forma de relacionarse que alivien el malestar de todos.")]))
    + otros_enfoques("sistemica"),
    faqs=[("¿Qué es la terapia sistémica?", "Es un enfoque de psicoterapia que entiende los problemas en el contexto de las relaciones de la persona —familia, pareja, escuela o trabajo— y trabaja sobre la comunicación y la organización de esos vínculos."),
          ("¿Tiene que venir toda la familia?", "No. La terapia sistémica puede ser individual, de pareja o familiar. En la primera entrevista se define quiénes conviene que participen."),
          ("¿Hacen terapia de pareja?", "Contanos tu situación por WhatsApp y te indicamos qué profesional del equipo trabaja con parejas desde este enfoque."),
          ("¿Sirve cuando un hijo tiene un diagnóstico, como TEA o TDAH?", "Sí, puede ayudar a la familia a reorganizarse y acompañar mejor. En Centro Sinapsis se puede articular con el resto del equipo que atiende al niño o la niña."),
          COMUN_FAQ_DERIVACION],
    related=["psico", "tea", "tdah", "psicoanalisis", "gestalt", "tcc", "junguiana"],
))

# ─────────────────────────── Junguiana ───────────────────────────
PAGINAS.append(dict(BASE,
    slug="terapia-junguiana-berazategui.html", ilu="junguiana",
    title="Terapia junguiana en Berazategui | Centro Sinapsis",
    desc="Terapia junguiana (psicología analítica) en Berazategui y Zona Sur: sueños, símbolos y autoconocimiento para atravesar crisis y cambios. Sin derivación.",
    crumb="Terapia junguiana", tag="Psicología · Enfoques",
    h1="Terapia junguiana en Berazategui",
    lead="La psicología analítica de Carl Jung: un trabajo con los sueños, los símbolos y la propia historia para conocerte en profundidad.",
    cta="Consultar por terapia junguiana",
    wa="Hola! Quisiera consultar por terapia junguiana.",
    about={"@type": "MedicalTherapy", "name": "Terapia junguiana (psicología analítica)",
           "description": "Psicoterapia basada en la psicología analítica de Carl Gustav Jung, que trabaja con los sueños, los símbolos y las imágenes para favorecer el autoconocimiento y el proceso de individuación."},
    body=
    sec("¿Qué es la terapia junguiana?",
        "<p>La terapia junguiana se basa en la psicología analítica de Carl Gustav Jung, psiquiatra suizo que trabajó con Freud y luego desarrolló su propia mirada a comienzos del siglo XX.</p>"
        "<p>Jung entendía que, además de la historia personal, en cada persona actúan imágenes y temas que se repiten en toda la humanidad y aparecen en los mitos, los cuentos y los sueños (lo que llamó arquetipos). "
        "La terapia busca establecer un diálogo con esas imágenes interiores para comprender lo que nos pasa y avanzar hacia una vida más propia y completa: lo que Jung llamó el proceso de individuación.</p>")
    + sec("Ideas clave",
          card("Los sueños", "Se consideran mensajes del inconsciente que vale la pena escuchar e interpretar junto al profesional.")
          + card("Los símbolos", "Las imágenes que aparecen en sueños, fantasías o creaciones ayudan a poner en forma lo que todavía no tiene palabras.")
          + card("La sombra", "Aspectos de uno mismo que se rechazan o no se ven, y que conviene reconocer e integrar.")
          + card("La individuación", "Un camino de autoconocimiento para llegar a ser quien uno es, más allá de lo que se espera de nosotros."))
    + sec("¿En qué situaciones puede ayudar?",
          ul(["Crisis vitales: cambios de etapa, de la mitad de la vida o pérdida de sentido.",
              "Angustia, desánimo o sensación de vacío.",
              "Sueños que se repiten o que inquietan.",
              "Duelos y transiciones importantes.",
              "Búsqueda de autoconocimiento y crecimiento personal."]))
    + sec("Cómo es una sesión",
          como([("Conversación", "Se habla de lo que te pasa en tu vida actual y en tu historia."),
                ("Sueños e imágenes", "Si querés, se trabaja con tus sueños o con imágenes que te resulten significativas."),
                ("Recursos expresivos", "En algunos casos se pueden usar el dibujo, la escritura u otras formas expresivas para explorar lo que aparece.")]))
    + otros_enfoques("junguiana"),
    faqs=[("¿Qué es la terapia junguiana?", "Es una psicoterapia basada en la psicología analítica de Carl Jung, que trabaja con los sueños, los símbolos y la historia personal para favorecer el autoconocimiento y atravesar crisis y cambios."),
          ("¿Tengo que recordar mis sueños para hacer terapia junguiana?", "No. Los sueños son una herramienta más; si no los recordás, se trabaja con lo que te pasa en la vida cotidiana y con tu historia."),
          ("¿En qué se diferencia del psicoanálisis?", "Comparten la importancia de lo inconsciente, pero Jung puso el acento en los símbolos, los arquetipos y el proceso de individuación, mientras que el psicoanálisis freudiano se centra más en la historia personal y el deseo."),
          ("¿Cuánto dura?", "No tiene una duración fija: depende de cada persona y de lo que quiera trabajar. Se conversa en la primera entrevista."),
          COMUN_FAQ_ELEGIR, COMUN_FAQ_DERIVACION],
    related=["psico", "psicoanalisis", "gestalt", "tcc", "sistemica", "primera"],
))


def seccion_en_psicologia():
    """Agrega 'Enfoques de trabajo' a la página de Psicología (idempotente)."""
    ruta = os.path.join(P.ROOT, "psicologia-berazategui.html")
    s = open(ruta, encoding="utf-8").read()
    s = re.sub(r"<!-- SINAPSIS:ENFOQUES -->.*?<!-- /SINAPSIS:ENFOQUES -->\n", "", s, flags=re.S)
    tarjetas = "".join(f'<a class="svc-rel-card" href="{P.REL[k][0]}"><b>{P.REL[k][1]}</b><span>Conocé el enfoque</span></a>' for k in ENFOQUES)
    bloque = ('<!-- SINAPSIS:ENFOQUES -->\n'
              '  <section class="svc-section svc-relacionados" id="enfoques">\n'
              '    <h2>Enfoques de trabajo</h2>\n'
              '    <p>El equipo de psicología trabaja desde distintas orientaciones. Si ya sabés cuál preferís, contanos al escribirnos; si no, te orientamos en la primera entrevista.</p>\n'
              f'    <div class="svc-rel-grid">{tarjetas}</div>\n'
              '  </section>\n'
              '<!-- /SINAPSIS:ENFOQUES -->\n')
    marca = "<!-- /SINAPSIS:ESTRUCTURA -->\n"
    assert marca in s
    s = s.replace(marca, marca + "\n" + bloque, 1)
    open(ruta, "w", encoding="utf-8").write(s)


if __name__ == "__main__":
    P.FECHA = FECHA
    for p in PAGINAS:
        html = P.page(p)
        with open(os.path.join(P.ROOT, p["slug"]), "w", encoding="utf-8") as f:
            f.write(html)
        print("ok", p["slug"], len(p["title"]), len(p["desc"]))
    seccion_en_psicologia()
    print("ok psicologia-berazategui.html (sección Enfoques de trabajo)")
