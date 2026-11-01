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

if __name__ == "__main__":
    for p in PAGINAS:
        html = P.page(p).replace(P.BASE + "/#servicios", P.BASE + "#servicios")
        with open(os.path.join(P.ROOT, p["slug"]), "w", encoding="utf-8") as f:
            f.write(html)
        print("ok", p["slug"], len(p["title"]), len(p["desc"]))
