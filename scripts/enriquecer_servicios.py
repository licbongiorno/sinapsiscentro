"""
Completa las páginas de servicio con la estructura editorial acordada en la
auditoría integral (noviembre 2026):

  1. Qué es                      (ya existía)
  2. A quién está dirigido       (ya existía)
  3. Situaciones que acompañamos (NUEVO)
  4. Cómo trabaja el área        (NUEVO)
  5. Qué podés esperar           (NUEVO)
  6. Cómo pedir una consulta     (renombra "Cómo es la primera entrevista")
  7. Preguntas frecuentes        (se suman preguntas propias del servicio,
                                  en el HTML visible y en el JSON-LD FAQPage)

Reglas de contenido (no negociables):
  - No se inventan duraciones, precios, frecuencias, profesionales,
    matrículas ni instrumentos que el centro no confirmó.
  - No se prometen resultados terapéuticos.
  - Se distingue evaluación / observación / orientación / diagnóstico.
  - Lenguaje centrado en la persona, sin términos estigmatizantes.

Es idempotente: cada bloque nuevo queda entre comentarios
<!-- SINAPSIS:ESTRUCTURA --> ... <!-- /SINAPSIS:ESTRUCTURA --> y se reemplaza
si el script se vuelve a correr.

Uso: python3 scripts/enriquecer_servicios.py
"""
import html
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FECHA = "2026-11-01"
CHEVRON = '<span class="svc-faq-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg></span>'

# Cada servicio: situaciones (lista), como (lista de (título, texto)),
# esperar (lista), faqs (lista de (pregunta, respuesta))
S = {}

S["psicologia-berazategui.html"] = dict(
    situaciones=[
        "Ansiedad, preocupaciones constantes, miedos o ataques de pánico.",
        "Tristeza que se prolonga, desgano o pérdida de interés por lo que antes disfrutabas.",
        "Duelos, separaciones, mudanzas y otros cambios difíciles de atravesar.",
        "Conflictos en la familia, la pareja, la escuela o el trabajo.",
        "En la infancia: rabietas intensas, dificultades para dormir, miedos o cambios de conducta que preocupan.",
        "En la adolescencia: aislamiento, problemas en los vínculos, la autoestima o la identidad.",
        "Acompañamiento a personas con TEA, TDAH u otras formas de neurodivergencia, y a sus familias.",
    ],
    como=[
        ("Escucha primero", "Las primeras sesiones sirven para entender qué te pasa, desde cuándo y en qué contexto. No hay apuro por poner nombres."),
        ("Objetivos acordados", "Con esa información se definen, junto a vos (o a la familia, si es un niño o niña), qué se quiere trabajar y cómo."),
        ("Un proceso que se revisa", "El tratamiento se ajusta a medida que avanza. Si hace falta, se suma a otro profesional del equipo o se orienta hacia otra especialidad, como psiquiatría, cuando corresponde."),
    ],
    esperar=[
        "Un espacio confidencial, sin juicios, donde podés hablar con tus palabras.",
        "Explicaciones claras sobre cómo se va a trabajar y por qué.",
        "Con niños y niñas, el juego como herramienta y encuentros periódicos con la familia.",
        "Honestidad: si otro tipo de abordaje es más adecuado para tu situación, te lo vamos a decir.",
    ],
    faqs=[
        ("¿El centro receta medicación?", "No. En Centro Sinapsis no hay atención psiquiátrica ni se indica medicación. Si en algún momento se considera necesaria una evaluación psiquiátrica, te orientamos para que puedas hacer esa consulta."),
        ("¿La terapia es confidencial?", "Sí. Lo que se habla en sesión está protegido por el secreto profesional. Con niños, niñas y adolescentes se comparte con la familia lo necesario para acompañar el proceso, cuidando siempre su intimidad."),
    ],
)

S["psicopedagogia-dificultades-aprendizaje.html"] = dict(
    situaciones=[
        "Dificultades para leer, escribir o comprender lo que se lee.",
        "Problemas con los números, el cálculo o la resolución de problemas.",
        "Dificultades para sostener la atención, organizarse o terminar las tareas.",
        "Bajo rendimiento escolar que preocupa a la familia o a la escuela.",
        "Chicos y chicas que se frustran, evitan la tarea o sienten que “no les da la cabeza”.",
        "Señales compatibles con dislexia, discalculia o disgrafía que conviene evaluar.",
    ],
    como=[
        ("Evaluación psicopedagógica", "Antes de intervenir, se evalúa cómo aprende el chico o la chica: qué le resulta fácil, dónde se traba y qué estrategias usa."),
        ("Plan de trabajo individual", "Con esa información se arma un plan con objetivos concretos, que se trabajan en sesiones adaptadas a su edad y sus intereses."),
        ("Articulación con la escuela", "Cuando la familia lo autoriza, el equipo puede comunicarse con la escuela para que el acompañamiento sea coherente en los dos espacios."),
    ],
    esperar=[
        "Una mirada que va más allá de las notas: cómo aprende, qué lo motiva, qué lo frustra.",
        "Devoluciones periódicas a la familia, con sugerencias para acompañar en casa.",
        "Un informe escrito cuando la escuela u otra institución lo necesita.",
        "Respeto por los tiempos de cada chico o chica.",
    ],
    faqs=[
        ("¿Psicopedagogía es lo mismo que una maestra particular?", "No. La maestra particular ayuda con los contenidos de la escuela. La psicopedagogía trabaja sobre cómo aprende la persona: atención, memoria, lectura, escritura, organización y las estrategias que necesita para aprender mejor."),
        ("¿Pueden comunicarse con la escuela?", "Sí, cuando la familia lo autoriza. La articulación con la escuela suele ser una parte importante del acompañamiento."),
    ],
)

S["fonoaudiologia-berazategui.html"] = dict(
    situaciones=[
        "Niños y niñas que hablan poco o empezaron a hablar más tarde de lo esperado.",
        "Dificultades para pronunciar algunos sonidos (dislalias) o para que se les entienda.",
        "Dificultades para comprender consignas o para armar frases.",
        "Tartamudez o bloqueos al hablar.",
        "Personas que necesitan sistemas de comunicación aumentativa o alternativa.",
        "Cambios en la voz, cansancio vocal o dificultades para tragar.",
    ],
    como=[
        ("Evaluación del lenguaje y el habla", "Se observa cómo se comunica la persona: comprensión, expresión, pronunciación, voz y, si corresponde, deglución."),
        ("Objetivos funcionales", "El trabajo apunta a que la comunicación sirva en la vida real: en casa, en la escuela y con otras personas."),
        ("La familia como parte del proceso", "Con los más chicos, se dan pautas concretas para estimular el lenguaje en la rutina diaria."),
    ],
    esperar=[
        "Sesiones dinámicas, con juego en el caso de los niños y niñas.",
        "Pautas claras para acompañar en casa entre sesión y sesión.",
        "Coordinación con otras áreas del equipo cuando la situación lo requiere, por ejemplo terapia ocupacional o psicopedagogía.",
    ],
    faqs=[
        ("¿A qué edad conviene consultar si mi hijo no habla?", "No hace falta esperar. Si a los 18 meses no dice ninguna palabra, o a los 2 años no combina dos palabras, vale la pena consultar. Una evaluación temprana permite saber si es parte de su ritmo o si necesita acompañamiento."),
        ("¿Trabajan comunicación aumentativa?", "Sí. Para personas que no usan el lenguaje oral, o que lo usan de forma limitada, se trabaja con sistemas de comunicación aumentativa o alternativa adaptados a cada persona."),
    ],
)

S["terapia-ocupacional-integracion-sensorial.html"] = dict(
    situaciones=[
        "Reacciones muy intensas a ruidos, texturas, luces o al contacto físico.",
        "Búsqueda constante de movimiento, o rechazo a columpios, toboganes y juegos de movimiento.",
        "Dificultades para vestirse, comer, higienizarse o con otras actividades de la vida diaria.",
        "Dificultades de motricidad fina: agarrar el lápiz, recortar, abrocharse.",
        "Torpeza motriz, dificultades de coordinación o de planificación del movimiento.",
        "Personas con discapacidad que buscan ganar autonomía en su día a día.",
    ],
    como=[
        ("Evaluación funcional y sensorial", "Se observa cómo la persona participa de sus actividades cotidianas y cómo procesa la información sensorial."),
        ("Intervención a través de la actividad", "El trabajo se hace con actividades significativas: juego, tareas de la vida diaria, propuestas sensoriales y motrices."),
        ("Adaptaciones en casa y en la escuela", "Se sugieren ajustes del entorno y de las rutinas para que la persona pueda participar con mayor autonomía."),
    ],
    esperar=[
        "Sesiones en las que el juego y el movimiento son herramientas de trabajo.",
        "Orientación concreta para la familia y, si hace falta, para la escuela.",
        "Objetivos pensados para la vida diaria, no para el consultorio.",
    ],
    faqs=[
        ("¿Qué es la integración sensorial?", "Es la forma en que el sistema nervioso organiza la información que llega por los sentidos (tacto, movimiento, sonidos, posición del cuerpo) para responder al entorno. Cuando ese proceso no funciona de manera eficiente, pueden aparecer reacciones exageradas, búsqueda de estímulos o dificultades en la vida diaria."),
        ("¿La terapia ocupacional es solo para niños?", "No. También acompaña a adolescentes y adultos cuando la autonomía en las actividades cotidianas necesita apoyo."),
    ],
)

S["kinesiologia-adultos-mayores-berazategui.html"] = dict(
    situaciones=[
        "Miedo a caerse, inseguridad al caminar o caídas recientes.",
        "Pérdida de fuerza o de equilibrio con los años.",
        "Rigidez articular o dificultad para moverse con comodidad.",
        "Ganas de mantenerse activo con un acompañamiento profesional y adaptado.",
        "Personas que, después de una indicación médica, necesitan sostener la actividad física de forma segura.",
    ],
    como=[
        ("Valoración inicial", "Antes de empezar, el kinesiólogo conoce tu estado de salud, tus antecedentes y tus objetivos."),
        ("Plan de ejercicios adaptado", "Se trabaja fuerza, equilibrio y movilidad, siempre dentro de tus posibilidades y con progresión gradual."),
        ("Seguimiento", "El plan se revisa con el tiempo para ajustarlo a cómo te vas sintiendo."),
    ],
    esperar=[
        "Un espacio cuidado, a tu ritmo, con supervisión profesional.",
        "Ejercicios que se pueden trasladar a la vida diaria.",
        "Consejos para prevenir caídas en casa.",
    ],
    faqs=[
        ("¿Necesito una indicación médica para empezar?", "Para coordinar la primera consulta no hace falta. Igual, si tenés alguna condición de salud, es recomendable que tu médico de cabecera esté al tanto de que vas a empezar actividad física, y en la valoración inicial lo conversamos."),
    ],
)

S["estimulacion-temprana-berazategui.html"] = dict(
    situaciones=[
        "Bebés que no alcanzan algunos hitos esperados para su edad (sostener la cabeza, sentarse, gatear, caminar).",
        "Niños y niñas pequeños que hablan poco, no responden a su nombre o interactúan poco.",
        "Bebés que nacieron prematuros o tuvieron complicaciones al nacer.",
        "Niños y niñas con una condición ya identificada, como TEA o síndrome de Down, entre otras.",
        "Familias que quieren orientación sobre cómo acompañar el desarrollo en casa.",
    ],
    como=[
        ("Observación del desarrollo", "Se observa al bebé o niño pequeño en juego, en las áreas motora, cognitiva, del lenguaje y social."),
        ("Trabajo con la familia", "En esta etapa la familia es protagonista: muchas propuestas se piensan para que puedan repetirse en la rutina diaria."),
        ("Coordinación interdisciplinaria", "Si aparecen necesidades específicas, se suma la mirada de fonoaudiología, terapia ocupacional o psicología."),
    ],
    esperar=[
        "Sesiones a través del juego, respetando el ritmo y el estado de ánimo del niño o la niña.",
        "Pautas concretas para la casa.",
        "Un espacio para que la familia pueda hacer preguntas y compartir lo que le preocupa.",
    ],
    faqs=[
        ("¿Hace falta un diagnóstico para empezar estimulación temprana?", "No. Se puede empezar ante una alerta en el desarrollo, sin esperar a tener un diagnóstico. Esperar suele ser lo menos recomendable en los primeros años."),
    ],
)

S["estimulacion-cognitiva-berazategui.html"] = dict(
    situaciones=[
        "Olvidos frecuentes que generan preocupación en la persona o en su familia.",
        "Dificultades de atención o concentración en la vida diaria, el estudio o el trabajo.",
        "Dificultades para planificar, organizarse o resolver problemas.",
        "Cambios cognitivos asociados al envejecimiento que se quieren acompañar.",
        "Niños y niñas con dificultades de atención que afectan su desempeño escolar.",
    ],
    como=[
        ("Parte de una evaluación", "El trabajo parte de conocer qué funciones conviene fortalecer, a partir de una evaluación previa o de los informes que ya tengas."),
        ("Ejercicios personalizados", "Se usan actividades y ejercicios pensados para cada persona, con dificultad progresiva."),
        ("Llevarlo a la vida diaria", "Se buscan estrategias que sirvan fuera de la sesión: agendas, rutinas, recordatorios y otros apoyos."),
    ],
    esperar=[
        "Propuestas adaptadas a tu edad, tus intereses y tu nivel de cansancio.",
        "Un seguimiento que permite ver cómo responde cada persona al trabajo.",
        "Orientación a la familia sobre cómo acompañar.",
    ],
    faqs=[
        ("¿La estimulación cognitiva cura una demencia?", "No. La estimulación cognitiva no cura enfermedades neurodegenerativas. Su objetivo es acompañar, sostener las capacidades y la autonomía el mayor tiempo posible y mejorar la calidad de vida, siempre en coordinación con el seguimiento médico de cada persona."),
    ],
)

S["alfabetizacion-berazategui.html"] = dict(
    situaciones=[
        "Niños y niñas que avanzan en la escuela sin haber consolidado la lectura o la escritura.",
        "Dificultades para reconocer letras, unir sonidos o leer palabras.",
        "Lectura muy lenta o con muchos errores, que dificulta comprender lo que se lee.",
        "Escritura con omisiones, inversiones o que cuesta entender.",
        "Chicos y chicas que empiezan a rechazar la lectura porque les resulta muy difícil.",
    ],
    como=[
        ("Saber desde dónde se parte", "Se evalúa qué sabe el chico o la chica sobre el sistema de escritura y en qué parte del proceso aparecen las dificultades."),
        ("Intervención específica", "Se trabaja de forma sistemática sobre los procesos de lectura y escritura, con materiales adaptados a su edad."),
        ("En diálogo con la escuela", "El trabajo complementa al del aula, y cuando la familia lo autoriza se articula con los docentes."),
    ],
    esperar=[
        "Un espacio donde equivocarse no es un problema, sino parte de aprender.",
        "Actividades lúdicas para que la lectura deje de ser una fuente de frustración.",
        "Devoluciones a la familia sobre los avances y las dificultades.",
    ],
    faqs=[
        ("¿Alfabetización es lo mismo que psicopedagogía?", "La alfabetización es una intervención específica sobre la lectura y la escritura. Puede ser parte de un abordaje psicopedagógico más amplio, o indicarse de forma puntual cuando la dificultad está concentrada en esos procesos."),
    ],
)

S["psicodiagnostico-berazategui.html"] = dict(
    situaciones=[
        "Un pedido de la escuela, de otro profesional o de una institución para conocer el funcionamiento psicológico de una persona.",
        "Dudas sobre el origen de dificultades emocionales, de conducta o de aprendizaje.",
        "La necesidad de orientar un tratamiento con más información.",
        "Trámites o situaciones que requieren un informe psicológico.",
    ],
    como=[
        ("Entrevistas iniciales", "Se conversa con la persona y, en el caso de niños y adolescentes, con su familia, para entender el motivo de consulta."),
        ("Administración de pruebas", "Se usan técnicas y pruebas psicológicas elegidas según la edad y lo que se necesita evaluar."),
        ("Integración y devolución", "El profesional integra toda la información y la explica en una entrevista de devolución, con un informe escrito."),
    ],
    esperar=[
        "Saber desde el principio para qué se hace la evaluación y qué pasos tiene.",
        "Un informe con lenguaje claro, que también se explica en persona.",
        "Recomendaciones concretas sobre cómo seguir.",
    ],
    faqs=[
        ("¿El psicodiagnóstico siempre termina en un diagnóstico?", "No necesariamente. El objetivo es comprender cómo funciona la persona y responder la pregunta que motivó la consulta. A veces eso permite arribar a un diagnóstico, y otras veces el resultado es una descripción de fortalezas y dificultades con recomendaciones para seguir."),
    ],
)

S["evaluacion-ados-2-adi-r-berazategui.html"] = dict(
    situaciones=[
        "Familias que notan diferencias en la comunicación, el juego o la interacción social de su hijo o hija.",
        "Pedidos de evaluación del desarrollo por parte de la escuela, el pediatra u otro profesional.",
        "Adolescentes y adultos que se preguntan si el autismo podría explicar dificultades que tuvieron toda la vida.",
        "Personas que necesitan un informe para iniciar el trámite del CUD u organizar apoyos.",
    ],
    como=[
        ("Entrevista inicial", "Se conversa sobre el motivo de consulta y la historia del desarrollo, para decidir qué evaluación es la más adecuada."),
        ("Observación estandarizada (ADOS-2)", "El profesional propone actividades, juegos y conversaciones que permiten observar la comunicación, la interacción social, el juego y los intereses."),
        ("Entrevista a la familia (ADI-R)", "Una entrevista estructurada con padres o cuidadores sobre el desarrollo temprano y la vida diaria actual."),
        ("Integración clínica y devolución", "Los resultados se integran con el resto de la información clínica. El diagnóstico es una conclusión del profesional, no el puntaje de un test. Todo se explica en la devolución y en un informe escrito."),
    ],
    esperar=[
        "Información clara sobre cada etapa antes de empezar.",
        "Un trato respetuoso y adaptado a la persona evaluada: con niños, a través del juego.",
        "Una devolución en la que se explica qué se observó, qué significa y qué opciones hay para seguir.",
        "Orientación sobre los próximos pasos: terapias, apoyos escolares o trámite del CUD, según cada caso.",
    ],
    faqs=[
        ("¿El ADOS-2 diagnostica autismo?", "No por sí solo. El ADOS-2 es una herramienta de observación estandarizada que aporta información muy valiosa, pero el diagnóstico de TEA es clínico: lo realiza un profesional al integrar la observación, la historia del desarrollo, las entrevistas y, cuando hace falta, otras evaluaciones."),
        ("¿Se puede evaluar a un adulto?", "Sí. El ADOS-2 tiene un módulo para adolescentes y adultos con lenguaje fluido. En el caso del ADI-R, se necesita que participe alguien que conozca la historia temprana de la persona, como un familiar."),
    ],
)

S["evaluacion-neurocognitiva-berazategui.html"] = dict(
    situaciones=[
        "Dificultades de atención, memoria u organización que afectan el estudio, el trabajo o la vida diaria.",
        "Sospecha de TDAH en niños, adolescentes o adultos.",
        "Olvidos o cambios cognitivos en adultos mayores que preocupan a la persona o a su familia.",
        "La necesidad de conocer el perfil cognitivo de una persona para planificar apoyos o un tratamiento.",
    ],
    como=[
        ("Entrevista clínica", "Se recoge la historia de la persona y el motivo de consulta, y se definen las áreas a evaluar."),
        ("Pruebas estandarizadas", "Se administran pruebas reconocidas que miden funciones como atención, memoria, lenguaje y funciones ejecutivas, elegidas según la edad y la consulta."),
        ("Informe y recomendaciones", "Se integran los resultados en un informe que describe fortalezas y dificultades, con recomendaciones concretas."),
    ],
    esperar=[
        "Sesiones de evaluación con pausas, adaptadas a la edad y al cansancio de cada persona.",
        "Una devolución en persona, además del informe escrito.",
        "Si corresponde, la posibilidad de continuar con estimulación cognitiva en el centro.",
    ],
    faqs=[
        ("¿La evaluación neurocognitiva sirve para diagnosticar TDAH?", "Aporta información muy útil sobre la atención y las funciones ejecutivas, pero el diagnóstico de TDAH es clínico: se basa en la historia de la persona, la observación en distintos contextos y la evaluación profesional integral. Ninguna prueba aislada lo confirma o descarta."),
    ],
)

# Correcciones puntuales de texto (de la auditoría): (archivo, viejo, nuevo)
CORRECCIONES = [
    ("evaluacion-neurocognitiva-berazategui.html",
     "Para quienes buscan una evaluación neuropsicológica o estimulación cognitiva, incluido un diagnóstico tardío de TEA o TDAH.",
     "Para quienes buscan una evaluación neuropsicológica o estimulación cognitiva, también cuando la pregunta por el TEA o el TDAH aparece recién en la adultez."),
    ("psicodiagnostico-berazategui.html",
     "Que necesitan un diagnóstico claro: por una inquietud personal, un pedido escolar o laboral, o como parte de un proceso terapéutico.",
     "Que necesitan comprender con claridad lo que les pasa: por una inquietud personal, un pedido escolar o laboral, o como parte de un proceso terapéutico."),
]


def lista(items):
    return '<ul class="svc-lista-check">' + "".join(f"<li>{html.escape(i)}</li>" for i in items) + "</ul>"


def bloque(d):
    como = "".join(
        f'<div class="svc-como-item"><h3>{html.escape(t)}</h3><p>{html.escape(p)}</p></div>' for t, p in d["como"]
    )
    return f'''<!-- SINAPSIS:ESTRUCTURA -->
  <section class="svc-section">
    <h2>Situaciones que acompañamos</h2>
    {lista(d["situaciones"])}
    <p class="svc-nota">Si lo que te pasa no aparece en la lista, escribinos igual: en la primera entrevista vemos juntos qué conviene.</p>
  </section>

  <section class="svc-section">
    <h2>Cómo trabajamos</h2>
    <div class="svc-como">{como}</div>
  </section>

  <section class="svc-section">
    <h2>Qué podés esperar</h2>
    {lista(d["esperar"])}
  </section>
<!-- /SINAPSIS:ESTRUCTURA -->
'''


def faq_html(q, a):
    return (f'<div class="svc-faq-item" data-faq-extra>\n      <button class="svc-faq-q" aria-expanded="false">{html.escape(q)}{CHEVRON}</button>\n'
            f'      <div class="svc-faq-a"><p>{html.escape(a)}</p></div>\n    </div>')


def procesar(nombre, d):
    ruta = os.path.join(ROOT, nombre)
    s = open(ruta, encoding="utf-8").read()

    # 1) bloque estructural (idempotente)
    s = re.sub(r"<!-- SINAPSIS:ESTRUCTURA -->.*?<!-- /SINAPSIS:ESTRUCTURA -->\n", "", s, flags=re.S)
    ancla = re.search(r'  <section class="svc-section">\n    <h2>(Cómo es la primera entrevista|Cómo pedir una consulta)</h2>', s)
    assert ancla, nombre
    s = s[:ancla.start()] + bloque(d) + "\n" + s[ancla.start():]
    s = s.replace("<h2>Cómo es la primera entrevista</h2>", "<h2>Cómo pedir una consulta</h2>")

    # 2) preguntas frecuentes visibles (idempotente)
    s = re.sub(r'<div class="svc-faq-item" data-faq-extra>.*?</div>\n    </div>', "", s, flags=re.S)
    i = s.find("<h2>Preguntas frecuentes</h2>")
    j = s.find("</section>", i)
    extra = "".join(faq_html(q, a) for q, a in d["faqs"])
    s = s[:j].rstrip() + extra + "\n  " + s[j:]

    # 3) JSON-LD FAQPage y fecha de modificación
    def reemplazar_ld(m):
        obj = json.loads(m.group(1))
        if obj.get("@type") == "FAQPage":
            existentes = {q["name"] for q in obj["mainEntity"]}
            for q, a in d["faqs"]:
                if q not in existentes:
                    obj["mainEntity"].append({"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}})
        elif "dateModified" in obj:
            obj["dateModified"] = FECHA
        else:
            return m.group(0)
        return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False, indent=2) + "\n</script>"

    s = re.sub(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', reemplazar_ld, s, flags=re.S)
    open(ruta, "w", encoding="utf-8").write(s)


if __name__ == "__main__":
    for archivo, viejo, nuevo in CORRECCIONES:
        ruta = os.path.join(ROOT, archivo)
        t = open(ruta, encoding="utf-8").read()
        if viejo in t:
            open(ruta, "w", encoding="utf-8").write(t.replace(viejo, nuevo))
    for nombre, d in S.items():
        procesar(nombre, d)
    print(f"{len(S)} páginas de servicio completadas")
