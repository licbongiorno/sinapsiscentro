#!/usr/bin/env python3
"""
ILUSTRACIONES.PY — Sistema de ilustraciones e íconos de Centro Sinapsis
=========================================================================
Genera las ilustraciones de cada página (img/ilustraciones/*.svg) y los
íconos de la home, con la paleta que usa la marca en Instagram (medida sobre
las publicaciones reales del feed):

  crema #f4efe4 · beige #e8e0d1 · salvia #7b9476 / #a4af91 · salvia oscuro
  #3f5839 · oliva #677357 · terracota #b46e50 · durazno #d89f6d · azul #1c2534

SISTEMA (estilo "ilustración editorial", como el de las marcas de salud):
  · la base es un ícono profesional de Phosphor Icons (MIT, ver
    scripts/phosphor/): relleno suave de la variante "duotone" + trazo de la
    variante "thin" (fino y elegante en tamaño grande), con la paleta de la marca;
  · cada ilustración combina un ícono principal grande (el tema de la página)
    con uno secundario en una insignia (lo que lo completa), sobre un disco
    crema con formas orgánicas suaves y una rama botánica de trazo fino;
  · nada de personajes dibujados a mano: se busca algo sobrio y profesional,
    a la altura de un centro de salud.

Criterio: cada imagen tiene que representar el título y el contenido de su
página (por ejemplo, Psicología = diálogo + corazón; Kinesiología = persona
caminando + pesa).

Uso: python3 scripts/ilustraciones.py   (regenera todos los SVG)
"""
import math
import os
import random
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "img", "ilustraciones")
PH = os.path.join(ROOT, "scripts", "phosphor")

CREAM, PAPER = "#f4efe4", "#fffdf8"
SAGE, SAGE_L, SAGE_P, SAGE_D = "#7b9476", "#a4af91", "#e3e9da", "#3f5839"
OLIVE, TERRA, PEACH, PEACH_P = "#677357", "#b46e50", "#d89f6d", "#f3e0d4"
TERRA_P = "#f1d6c7"

# acentos que se alternan entre ilustraciones: (fondo orgánico, capa suave del ícono)
ACENTOS = {
    "salvia": (SAGE_P, SAGE_L),
    "durazno": (PEACH_P, PEACH),
}


def phosphor(nombre):
    """Devuelve (capa_suave, capa_trazo) del ícono duotone, como paths en 256×256."""
    s = open(os.path.join(PH, nombre + ".svg"), encoding="utf-8").read()
    cuerpo = re.search(r"<svg[^>]*>(.*)</svg>", s, re.S).group(1)
    suave = "".join(re.findall(r'<[^>]*opacity="0\.2"[^>]*/>', cuerpo))
    trazo = re.sub(r'<[^>]*opacity="0\.2"[^>]*/>', "", cuerpo)
    return suave, trazo


def trazo_light(nombre):
    """Trazo de la variante "thin" (la más fina) del mismo ícono, para tamaños grandes."""
    s = open(os.path.join(PH, "thin", nombre + ".svg"), encoding="utf-8").read()
    return re.search(r"<svg[^>]*>(.*)</svg>", s, re.S).group(1)


def icono_en(nombre, cx, cy, tam, color, color_suave, op_suave=1.0, fino=False):
    suave, trazo = phosphor(nombre)
    if fino:
        trazo = trazo_light(nombre)
    k = tam / 256
    suave = suave.replace('opacity="0.2"', f'fill="{color_suave}" opacity="{op_suave}"')
    return (f'<g transform="translate({cx - tam / 2:.1f} {cy - tam / 2:.1f}) scale({k:.4f})">'
            f'{suave}<g fill="{color}">{trazo}</g></g>')


def blob(cx, cy, r, semilla, fill, puntos=7, var=0.13):
    """Forma orgánica suave (curva cerrada), fija para cada ilustración."""
    rnd = random.Random(semilla)
    pts = []
    for i in range(puntos):
        a = 2 * math.pi * i / puntos
        rr = r * (1 + rnd.uniform(-var, var))
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    d = ""
    n = len(pts)
    for i in range(n):
        p0, p1, p2, p3 = pts[i - 1], pts[i], pts[(i + 1) % n], pts[(i + 2) % n]
        if i == 0:
            d += f"M{p1[0]:.1f} {p1[1]:.1f} "
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        d += f"C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f} "
    return f'<path d="{d}Z" fill="{fill}"/>'


def rama(x, y, largo, angulo, escala=1.0, espejo=False):
    """Rama botánica de trazo fino: tallo curvo con hojas delineadas."""
    s = escala
    sg = -1 if espejo else 1
    out = (f'<g transform="translate({x} {y}) rotate({angulo}) scale({sg * s} {s})" fill="none" stroke="{OLIVE}" '
           f'stroke-width="{1.3 / s:.2f}" stroke-linecap="round" stroke-linejoin="round">')
    out += f'<path d="M0 0 C6 {-largo * .35:.1f} 4 {-largo * .7:.1f} 14 {-largo:.1f}"/>'
    for t, lado in [(.22, -1), (.4, 1), (.58, -1), (.76, 1)]:
        out += (f'<path d="M0 0 C5 -4 6 -12 0 -18 C-6 -12 -5 -4 0 0 Z" '
                f'transform="translate({12 * t:.1f} {-largo * t:.1f}) rotate({-38 * lado})" fill="{SAGE_P}"/>')
    out += f'<path d="M0 0 C5 -4 6 -12 0 -18 C-6 -12 -5 -4 0 0 Z" transform="translate(14 {-largo:.1f}) rotate(18)" fill="{SAGE_P}"/>'
    return out + "</g>"


SOMBRA = ('<filter id="sombra" x="-40%" y="-40%" width="180%" height="180%">'
          '<feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#2c2a22" flood-opacity=".14"/></filter>')


def spot(principal, secundario, acento="salvia", semilla=1, badge_lado="der"):
    fondo, suave = ACENTOS[acento]
    der = badge_lado == "der"
    bx = 214 if der else 86
    otra = PEACH_P if acento == "salvia" else SAGE_P
    return (
        f'<defs>{SOMBRA}<clipPath id="disco"><circle cx="150" cy="150" r="138"/></clipPath></defs>'
        f'<circle cx="150" cy="150" r="138" fill="{CREAM}"/>'
        '<g clip-path="url(#disco)">'
        + blob(146, 140, 92, semilla, fondo)
        + blob(bx + (8 if der else -8), 214, 40, semilla + 7, otra, 6, .18)
        + rama(52 if der else 248, 246, 92, -14 if der else 14, 1.0, espejo=not der)
        + rama(238 if der else 62, 104, 46, 32 if der else -32, .8, espejo=der)
        + icono_en(principal, 146, 140, 128, SAGE_D, suave, .55, fino=True)
        + f'<circle cx="{bx}" cy="206" r="33" fill="{PAPER}" filter="url(#sombra)"/>'
        + f'<circle cx="{bx}" cy="206" r="33" fill="none" stroke="{TERRA}" stroke-opacity=".25" stroke-width="1"/>'
        + icono_en(secundario, bx, 206, 38, TERRA, TERRA_P, 1)
        + f'<circle cx="{74 if der else 226}" cy="78" r="3.2" fill="{TERRA}" opacity=".7"/>'
        + f'<circle cx="{86 if der else 214}" cy="66" r="2" fill="{PEACH}" opacity=".8"/>'
        + "</g>"
        + f'<circle cx="150" cy="150" r="138" fill="none" stroke="{OLIVE}" stroke-opacity=".28" stroke-width="1"/>'
    )


# archivo → (ícono principal, ícono secundario, acento, texto alternativo)
ILUSTRACIONES = {
    # servicios
    "psicologia": ("chats-circle", "heart", "salvia", "Ilustración de psicología: globos de diálogo y un corazón"),
    "psicopedagogia": ("book-open-text", "pencil-simple-line", "durazno", "Ilustración de psicopedagogía: un libro abierto y un lápiz"),
    "fonoaudiologia": ("ear", "waveform", "salvia", "Ilustración de fonoaudiología: un oído y una onda de sonido"),
    "terapia-ocupacional": ("hand-heart", "shapes", "durazno", "Ilustración de terapia ocupacional: una mano que cuida y figuras de encastre"),
    "evaluacion-ados": ("clipboard-text", "shapes", "salvia", "Ilustración de evaluación del desarrollo: una planilla y figuras de juego"),
    "evaluacion-neurocognitiva": ("head-circuit", "clock", "durazno", "Ilustración de evaluación neurocognitiva: una cabeza con conexiones y un reloj"),
    "psicodiagnostico": ("file-magnifying-glass", "seal-check", "salvia", "Ilustración de psicodiagnóstico: un informe con una lupa y un sello de verificación"),
    "estimulacion-temprana": ("baby", "plant", "durazno", "Ilustración de estimulación temprana: un bebé y un brote"),
    "estimulacion-cognitiva": ("brain", "lightbulb", "salvia", "Ilustración de estimulación cognitiva: un cerebro y una lamparita"),
    "alfabetizacion": ("text-aa", "pencil-simple", "durazno", "Ilustración de alfabetización: letras y un lápiz"),
    "kinesiologia": ("person-simple-walk", "barbell", "salvia", "Ilustración de kinesiología: una persona caminando y una pesa"),
    "equipo": ("users-three", "handshake", "durazno", "Ilustración del equipo profesional: tres personas y un apretón de manos"),
    "historia": ("plant", "calendar-check", "salvia", "Ilustración de nuestra historia: una planta que crece y un calendario"),
    "obras-sociales": ("identification-card", "shield-check", "durazno", "Ilustración de coberturas: una credencial y un escudo de protección"),
    "discapacidad": ("certificate", "wheelchair", "salvia", "Ilustración de prestaciones por discapacidad: un certificado y el símbolo de accesibilidad"),
    "autismo": ("infinity", "headphones", "durazno", "Ilustración de autismo: el símbolo de infinito de la neurodiversidad y auriculares"),
    "senales-autismo": ("baby", "list-checks", "salvia", "Ilustración de señales de autismo: un bebé y una lista de señales para observar"),
    "tdah": ("target", "brain", "durazno", "Ilustración de TDAH: un objetivo que representa la atención y un cerebro"),
    "lenguaje": ("chat-teardrop-dots", "baby", "salvia", "Ilustración de retraso del lenguaje: un globo de diálogo y un bebé"),
    "zona-sur": ("map-pin", "house-line", "durazno", "Ilustración de Zona Sur: un marcador de ubicación y una casa"),
    # talleres
    "talleres": ("users-four", "palette", "salvia", "Ilustración de talleres: un grupo de personas y una paleta de colores"),
    "taller-cognitiva-ninos": ("shapes", "brain", "durazno", "Ilustración del taller de estimulación cognitiva infantil: figuras de encastre y un cerebro"),
    "habilidades-sociales": ("users-three", "chats-circle", "salvia", "Ilustración del taller de habilidades sociales: un grupo de personas conversando"),
    # guías
    "guias": ("books", "plant", "durazno", "Ilustración de guías para familias: libros y una planta"),
    "dislexia": ("book-open", "arrows-left-right", "salvia", "Ilustración de dislexia: un libro abierto y flechas que indican letras que se invierten"),
    "pronunciacion": ("speaker-high", "text-aa", "durazno", "Ilustración de problemas de pronunciación: sonido y letras"),
    "tartamudez": ("chat-circle-dots", "waveform", "salvia", "Ilustración de tartamudez: un globo de diálogo y una onda de sonido"),
    "ansiedad": ("cloud-rain", "hand-heart", "durazno", "Ilustración de ansiedad: una nube de lluvia y una mano que acompaña"),
    "integracion-sensorial": ("hand-palm", "ear", "salvia", "Ilustración de integración sensorial: una mano y un oído"),
    "olvidos": ("brain", "clock", "durazno", "Ilustración de olvidos en adultos mayores: un cerebro y un reloj"),
    "caidas": ("footprints", "shield-check", "salvia", "Ilustración de prevención de caídas: pisadas y un escudo de protección"),
    "psicologo-infantil": ("smiley", "chats-circle", "durazno", "Ilustración de psicología infantil: una carita sonriente y globos de diálogo"),
    "berrinche": ("smiley-sad", "hand-heart", "salvia", "Ilustración de rabietas: una carita triste y una mano que contiene"),
    "primera-consulta": ("armchair", "chats-circle", "durazno", "Ilustración de la primera consulta: un sillón de consultorio y globos de diálogo"),
    "psicopedagogo": ("student", "backpack", "salvia", "Ilustración de psicopedagogía: un estudiante y una mochila"),
    "discalculia": ("math-operations", "calculator", "durazno", "Ilustración de discalculia: signos matemáticos y una calculadora"),
    "disgrafia": ("pencil-line", "scribble-loop", "salvia", "Ilustración de dificultades en la escritura: un lápiz y un trazo"),
    "autonomia": ("t-shirt", "hand-heart", "durazno", "Ilustración de terapia ocupacional infantil: una remera y una mano que acompaña"),
    "motricidad-fina": ("scissors", "pencil-simple", "salvia", "Ilustración de motricidad fina: una tijera y un lápiz"),
    "ejercicio-mayores": ("person-simple-tai-chi", "heart", "durazno", "Ilustración de ejercicio en adultos mayores: una persona haciendo ejercicio y un corazón"),
}


def svg_file(nombre):
    principal, secundario, acento, alt = ILUSTRACIONES[nombre]
    semilla = sum(ord(c) for c in nombre)
    lado = "der" if semilla % 2 == 0 else "izq"
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300" role="img" aria-label="{alt}">'
            f'<title>{alt}</title>{spot(principal, secundario, acento, semilla, lado)}</svg>\n')


def alt_de(nombre):
    return ILUSTRACIONES[nombre][3]


# ───────────────────────── íconos de la home ─────────────────────────
# Phosphor duotone: trazo en currentColor (lo define el CSS) y capa suave (.ic-suave) en durazno.
ICONOS = {
    # tarjetas de servicios
    "psicopedagogia": "book-open-text", "psicologia": "chats-circle", "terapia-ocupacional": "hand-heart",
    "fonoaudiologia": "ear", "estimulacion-temprana": "baby", "estimulacion-cognitiva": "brain",
    "alfabetizacion": "text-aa", "kinesiologia": "person-simple-walk", "psicodiagnostico": "file-magnifying-glass",
    "evaluacion-ados": "clipboard-text", "evaluacion-neurocognitiva": "head-circuit",
    # "Para quién"
    "ninos": "baby", "adolescentes": "student", "adultos": "person", "familias": "users-three",
    # "El centro que necesitabas"
    "escuela": "chalkboard-teacher", "mente": "brain", "espectro": "infinity",
    # "Por qué elegirnos"
    "profesionales": "certificate", "equipo": "users-three", "calendario": "calendar-check", "integral": "hand-heart",
}


def icono_inline(nombre):
    suave, trazo = phosphor(ICONOS[nombre])
    suave = suave.replace('opacity="0.2"', 'class="ic-suave"')
    return (f'<svg viewBox="0 0 256 256" width="1em" height="1em" fill="currentColor" aria-hidden="true" '
            f'focusable="false" class="ic-sinapsis">{suave}{trazo}</svg>')


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    vigentes = set()
    for nombre in ILUSTRACIONES:
        with open(os.path.join(OUT, nombre + ".svg"), "w", encoding="utf-8") as f:
            f.write(svg_file(nombre))
        vigentes.add(nombre + ".svg")
    sobrantes = [f for f in os.listdir(OUT) if f.endswith(".svg") and f not in vigentes]
    print(f"{len(vigentes)} ilustraciones en img/ilustraciones/" + (f" — sin uso: {sobrantes}" if sobrantes else ""))
