"""
Páginas de servicio nuevas, generadas con la plantilla compartida.

- orientacion-vocacional-ocupacional-berazategui.html (auditoría nov. 2026:
  el servicio figuraba en la información institucional pero no tenía página).

PENDIENTE DE CONFIRMACIÓN (no se publica hasta tenerlo): qué profesional del
equipo realiza la orientación, edades exactas, cantidad de encuentros,
modalidad (individual / grupal / online) e instrumentos que se usan.

Uso: python3 scripts/generar_servicios_nuevos.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import plantilla_paginas as P  # noqa: E402
from plantilla_paginas import sec, ul, card  # noqa: E402

P.FECHA = "2026-11-01"

PAGINAS = [dict(
    slug="orientacion-vocacional-ocupacional-berazategui.html", ilu="orientacion-vocacional",
    title="Orientación vocacional y ocupacional en Berazategui | Sinapsis",
    desc="Orientación vocacional y ocupacional en Berazategui y Zona Sur: elegir qué estudiar, cambiar de rumbo o planificar tu vida laboral, también con discapacidad.",
    crumb_parent=("Servicios", "/#servicios"), crumb="Orientación vocacional", tag="Servicio · Orientación",
    h1="Orientación vocacional y ocupacional en Berazategui",
    lead="Un espacio para pensar qué querés estudiar o de qué querés trabajar, con acompañamiento profesional y a tu ritmo.",
    cta="Consultar por orientación vocacional", motivo="vocacional",
    wa="Hola! Quisiera consultar por orientación vocacional / ocupacional.",
    about={"@type": "MedicalTherapy", "name": "Orientación vocacional y ocupacional",
           "description": "Proceso de acompañamiento profesional para la elección de estudios, el cambio de rumbo y la planificación de la inserción laboral."},
    body=
    sec("¿Qué es?",
        "<p>La orientación vocacional y ocupacional es un proceso de acompañamiento para tomar decisiones sobre el estudio y el trabajo. "
        "No se trata de un test que da una respuesta mágica: es un recorrido en el que la persona se conoce mejor, explora opciones reales y construye un proyecto propio.</p>"
        "<p>En Centro Sinapsis lo pensamos de forma amplia: para adolescentes que terminan la secundaria, para adultos que quieren cambiar de rumbo, "
        "y también para personas con discapacidad que buscan un proyecto de formación o de trabajo acorde a sus intereses y a sus apoyos.</p>")
    + sec("¿A quién está dirigido?",
          card("Adolescentes", "Que están por terminar la secundaria y no saben qué estudiar, o dudan entre varias opciones.")
          + card("Jóvenes y adultos", "Que empezaron una carrera y no se sienten a gusto, quieren volver a estudiar o buscan reorientar su vida laboral.")
          + card("Personas con discapacidad", "Que quieren pensar un proyecto de formación, de taller o de trabajo, con los apoyos que necesiten.")
          + card("Familias", "Que quieren acompañar ese proceso sin decidir por la otra persona."))
    + sec("Situaciones que acompañamos",
          ul(["No saber qué estudiar al terminar la secundaria.",
              "Dudar entre varias carreras u oficios.",
              "Haber abandonado o querer dejar una carrera.",
              "Querer cambiar de trabajo o de rumbo profesional.",
              "Buscar un primer empleo o una actividad formativa después de la escuela.",
              "Pensar la inclusión educativa o laboral de una persona con discapacidad."])
          + '<p class="svc-nota">Si tu situación es otra, escribinos igual: en la primera entrevista vemos juntos qué conviene.</p>')
    + sec("Cómo trabajamos",
          '<div class="svc-como">'
          '<div class="svc-como-item"><h3>Conocerte</h3><p>Intereses, habilidades, valores, experiencias y lo que te gustaría para tu vida.</p></div>'
          '<div class="svc-como-item"><h3>Explorar opciones</h3><p>Información concreta sobre carreras, oficios, instituciones y salidas laborales, para decidir con datos reales.</p></div>'
          '<div class="svc-como-item"><h3>Construir un proyecto</h3><p>Pasos posibles y realistas, con los apoyos que cada persona necesite.</p></div>'
          '</div>')
    + sec("Qué podés esperar",
          ul(["Un espacio sin presiones, donde la decisión sigue siendo tuya.",
              "Herramientas para conocerte mejor y para buscar información por tu cuenta.",
              "Si la familia participa, encuentros pensados para acompañar sin decidir por la otra persona.",
              "Con personas con discapacidad, un trabajo coordinado con el resto del equipo cuando hace falta."])),
    faqs=[
        ("¿La orientación vocacional es un test?", "No. Algunas herramientas o cuestionarios pueden ayudar, pero la orientación es un proceso de reflexión y exploración acompañado por un profesional. Ningún test decide por vos."),
        ("¿Es solo para adolescentes?", "No. También acompañamos a jóvenes y adultos que quieren volver a estudiar, cambiar de carrera o reorientar su vida laboral."),
        ("¿Trabajan orientación con personas con discapacidad?", "Sí. Acompañamos a personas con discapacidad y a sus familias a pensar un proyecto de formación o de trabajo acorde a sus intereses y a los apoyos que necesitan."),
        ("¿Cuántos encuentros dura?", "Depende de cada persona y de lo que necesite. En la primera entrevista te contamos cómo se organiza el proceso en tu caso."),
        ("¿Necesito derivación para consultar?", "No. Podés escribirnos directamente por WhatsApp y coordinar una primera entrevista."),
    ],
    related=["psico", "psicoped", "disc", "neuro"],
)]

PAGINAS.append(dict(
    # Servicio confirmado por el centro (flyer institucional + mensaje del 2026-11-02):
    # licencias de conducir, aptos laborales y aptos para carreras que lo piden.
    # NO publicar armas ni fuerzas de seguridad hasta que el centro lo confirme.
    slug="aptos-psicologicos-psicotecnicos-berazategui.html", ilu="aptos", fecha="2026-11-02",
    title="Aptos psicológicos y psicotécnicos en Berazategui | Sinapsis",
    desc="Apto psicológico y evaluación psicotécnica en Berazategui: licencia de conducir, ingreso laboral y carreras que lo piden. Informe de psicólogo matriculado.",
    crumb_parent=("Servicios", "/#servicios"), crumb="Aptos psicológicos", tag="Servicio · Evaluaciones",
    h1="Aptos psicológicos y evaluaciones psicotécnicas en Berazategui",
    lead="Para la licencia de conducir, un ingreso laboral o una carrera que lo pide: evaluación con psicólogos matriculados e informe firmado.",
    cta="Pedir turno para un apto", motivo="evaluacion",
    wa="Hola! Quisiera turno para un apto psicológico / psicotécnico.",
    about={"@type": "MedicalProcedure", "name": "Evaluación psicotécnica y apto psicológico",
           "procedureType": "https://schema.org/NoninvasiveProcedure",
           "description": "Evaluación psicológica breve, con entrevista y pruebas psicotécnicas, que concluye en un informe firmado por un psicólogo matriculado para un trámite específico."},
    body=
    sec("¿Qué es un apto psicológico?",
        "<p>Es una evaluación psicológica breve que se hace para un trámite concreto: sacar o renovar la licencia de conducir, ingresar a un trabajo o inscribirse en una carrera que lo pide. "
        "Combina una entrevista con pruebas psicotécnicas, y termina en un <strong>informe firmado por un psicólogo o una psicóloga matriculados</strong>.</p>"
        "<p>No es un tratamiento ni un psicodiagnóstico completo: responde a lo que pide la institución que lo solicita.</p>")
    + sec("¿Para qué trámites?",
          card("Licencia de conducir", "Evaluación psicotécnica para obtener o renovar la licencia, cuando el trámite pide un informe psicológico.")
          + card("Aptos laborales", "Exámenes psicotécnicos de ingreso que piden empresas e instituciones como parte de la selección o del examen preocupacional.")
          + card("Carreras y estudios", "Algunas carreras, profesorados e institutos piden un apto psicológico para la inscripción. Lo hacemos según el pedido de cada institución."))
    + '  <div class="svc-callout"><strong>Antes de sacar turno, confirmá qué te piden.</strong> Cada organismo, empresa o institución define qué tipo de informe acepta: algunos tienen un formulario propio o piden que la evaluación se haga en un lugar determinado. Si te dieron una nota, un formulario o un modelo de informe, traelo el día de la evaluación.</div>\n'
    + sec("Cómo es la evaluación",
          '<div class="svc-como">'
          '<div class="svc-como-item"><h3>Entrevista</h3><p>Una conversación breve sobre para qué necesitás el apto y algunos datos personales y de salud relevantes.</p></div>'
          '<div class="svc-como-item"><h3>Pruebas psicotécnicas</h3><p>Pruebas elegidas según el trámite: pueden incluir tareas de atención, razonamiento y técnicas psicológicas habituales en este tipo de evaluación.</p></div>'
          '<div class="svc-como-item"><h3>Informe firmado</h3><p>El profesional redacta el informe con su firma y matrícula. El plazo de entrega se acuerda al pedir el turno.</p></div>'
          '</div>')
    + sec("Qué podés esperar",
          ul(["Turno coordinado por WhatsApp, en nuestra sede de Berazategui.",
              "Un trato respetuoso y una explicación clara de cada paso.",
              "Un informe que refleja la evaluación profesional realizada: no se emiten aptos sin evaluar a la persona.",
              "Si en la evaluación aparece algo que conviene acompañar, te lo decimos y te orientamos."]))
    + sec("Apto psicológico y psicodiagnóstico: la diferencia",
          "<p>El apto responde a una pregunta puntual para un trámite. El <a href=\"psicodiagnostico-berazategui.html\">psicodiagnóstico</a> es un proceso más amplio, con varias entrevistas y pruebas, para comprender en profundidad lo que le pasa a una persona. Si no sabés cuál necesitás, escribinos y te orientamos.</p>"),
    faqs=[
        ("¿Qué es un apto psicológico o psicotécnico?", "Es una evaluación psicológica breve, con entrevista y pruebas psicotécnicas, que termina en un informe firmado por un psicólogo matriculado. Se pide para trámites como la licencia de conducir, el ingreso a un trabajo o la inscripción en algunas carreras."),
        ("¿Me sirve para la licencia de conducir en Berazategui?", "Hacemos la evaluación psicotécnica para obtener o renovar la licencia. Antes de sacar turno, confirmá en la oficina de licencias de tu municipio qué informe aceptan y si tienen un formulario propio."),
        ("¿Cuánto tarda la entrega del informe?", "El plazo se acuerda al momento de pedir el turno, según el tipo de apto y para cuándo lo necesitás."),
        ("¿Qué tengo que llevar?", "Tu DNI y, si la empresa, la institución o el organismo te dio una nota, un formulario o un modelo de informe, traelo también."),
        ("¿Se puede obtener el apto sin hacer la evaluación?", "No. El informe refleja una evaluación profesional real: siempre se evalúa a la persona antes de firmarlo."),
    ],
    related=["psicodx", "psico", "vocacional", "neuro"],
))

if __name__ == "__main__":
    for p in PAGINAS:
        P.FECHA = p.get("fecha", "2026-11-01")
        html = P.page(p).replace(P.BASE + "/#servicios", P.BASE + "#servicios")
        with open(os.path.join(P.ROOT, p["slug"]), "w", encoding="utf-8") as f:
            f.write(html)
        print("ok", p["slug"], len(p["title"]), len(p["desc"]))
