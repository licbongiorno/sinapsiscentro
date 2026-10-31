#!/usr/bin/env python3
"""
ILUSTRACIONES.PY — Sistema de ilustraciones e íconos de Centro Sinapsis
=========================================================================
Genera las ilustraciones botánicas de cada página (img/ilustraciones/*.svg)
y el set de íconos de la home, todo con la misma paleta que usa la marca
en Instagram (medida sobre las publicaciones reales del feed, 2026-10-31):

  crema #f4efe4 · beige #e8e0d1 · arena #e4ceb7 · salvia #7b9476 ·
  salvia clara #a4af91 · oliva #677357 · terracota #b46e50 ·
  durazno #d89f6d · marrón #6f4b39 · azul marino #1c2534

Estilo: trazo fino oliva, rellenos planos suaves, hojas de salvia y
pequeños acentos terracota sobre un disco crema. Sin texto médico, sin
fotos de stock, sin símbolos controvertidos (por ejemplo, no se usa la
pieza de rompecabezas para el autismo).

Uso: python3 scripts/ilustraciones.py   (regenera todos los SVG)
Para agregar una ilustración: sumar una función a ILUSTRACIONES y correr.
"""
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "img", "ilustraciones")

CREAM, BEIGE, SAND, PAPER = "#f4efe4", "#e8e0d1", "#e4ceb7", "#fffdf8"
SAGE, SAGE_L, SAGE_XL, OLIVE = "#7b9476", "#a4af91", "#ccd3bd", "#677357"
TERRA, PEACH, BROWN, NAVY = "#b46e50", "#d89f6d", "#6f4b39", "#1c2534"
LEAF_D = "M0 0 C7 -8 8 -21 0 -32 C-8 -21 -7 -8 0 0 Z"


def leaf(x, y, rot, s=1.0, fill=SAGE, op=1.0):
    return f'<path d="{LEAF_D}" transform="translate({x:.1f} {y:.1f}) rotate({rot:.0f}) scale({s})" fill="{fill}" opacity="{op}"/>'


def stem(d, color=OLIVE, w=2.4):
    return f'<path d="{d}" stroke="{color}" stroke-width="{w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'


def dot(x, y, r, fill=TERRA, op=1.0):
    return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{fill}" opacity="{op}"/>'


def flower(cx, cy, r, petal=TERRA, center=BEIGE, n=6):
    out = "".join(dot(cx + r * math.cos(2 * math.pi * i / n), cy + r * math.sin(2 * math.pi * i / n), r * 0.78, petal, .9) for i in range(n))
    return out + dot(cx, cy, r * 0.55, center)


def sprig(x, y, length, angle, color=SAGE, s=0.8, pares=3):
    """Rama recta con pares de hojas alternadas, hacia `angle` (0 = arriba)."""
    a = math.radians(angle)
    x2, y2 = x + length * math.sin(a), y - length * math.cos(a)
    out = stem(f"M{x:.1f} {y:.1f} L{x2:.1f} {y2:.1f}", OLIVE, 2)
    for i in range(pares):
        t = (i + 1) / (pares + 1)
        px, py = x + (x2 - x) * t, y + (y2 - y) * t
        out += leaf(px, py, angle - 50, s * (1 - t * 0.3), color) + leaf(px, py, angle + 50, s * (1 - t * 0.3), SAGE_L if color == SAGE else SAGE)
    return out + leaf(x2, y2, angle, s * 0.75, color)


def base(inner, extra_bg=""):
    """Disco crema con anillo punteado y sombra de piso: marco común de todas."""
    return (f'<circle cx="150" cy="150" r="136" fill="{CREAM}"/>'
            f'<circle cx="150" cy="150" r="136" fill="none" stroke="{OLIVE}" stroke-width="1.2" stroke-dasharray="2 8" opacity=".45"/>'
            + '<clipPath id="disco"><circle cx="150" cy="150" r="135"/></clipPath><g clip-path="url(#disco)">'
            + extra_bg +
            f'<ellipse cx="150" cy="236" rx="96" ry="9" fill="{OLIVE}" opacity=".12"/>' + inner + '</g>')


# ───────────────────────── ilustraciones por página ─────────────────────────

def psicologia():
    return base(
        f'<path d="M70 92 h112 a18 18 0 0 1 18 18 v46 a18 18 0 0 1 -18 18 h-62 l-26 22 v-22 h-24 a18 18 0 0 1 -18 -18 v-46 a18 18 0 0 1 18 -18 z" fill="{SAGE_L}" opacity=".9"/>'
        f'<path d="M130 132 h96 a16 16 0 0 1 16 16 v40 a16 16 0 0 1 -16 16 h-14 v20 l-24 -20 h-58 a16 16 0 0 1 -16 -16 v-40 a16 16 0 0 1 16 -16 z" fill="{PAPER}" stroke="{TERRA}" stroke-width="2.4" stroke-linejoin="round"/>'
        + "".join(dot(x, 168, 5, c) for x, c in ((152, TERRA), (176, PEACH), (200, SAGE)))
        + stem("M92 114 h56 M92 130 h40", PAPER, 4)
        + sprig(96, 236, 50, -18, SAGE, .75, 2) + sprig(228, 236, 40, 20, SAGE, .65, 2))


def psicopedagogia():
    return base(
        f'<rect x="78" y="196" width="150" height="34" rx="5" fill="{TERRA}"/>'
        f'<rect x="88" y="164" width="132" height="32" rx="5" fill="{SAGE}"/>'
        f'<rect x="80" y="134" width="140" height="30" rx="5" fill="{BEIGE}" stroke="{OLIVE}" stroke-width="1.6"/>'
        + stem("M92 213 h120 M100 180 h104 M92 149 h116", PAPER, 2)
        + stem("M150 134 C148 110 156 92 166 72", SAGE, 2.4)
        + leaf(150, 116, -55, .8, SAGE) + leaf(153, 102, 50, .8, SAGE_L) + leaf(160, 86, -35, .7, SAGE) + leaf(166, 74, 15, .6, OLIVE, .85)
        + dot(168, 68, 5, TERRA)
        + f'<g transform="translate(236 222) rotate(-28)"><rect x="-5" y="-78" width="10" height="72" rx="2" fill="{PEACH}"/><rect x="-5" y="-86" width="10" height="10" rx="2" fill="{TERRA}"/><path d="M-5 -6 L0 8 L5 -6 Z" fill="{SAND}" stroke="{BROWN}" stroke-width="1"/></g>')


def fonoaudiologia():
    arcs = "".join(f'<path d="M{150 + r*0.2:.0f} {150 - r:.0f} A{r} {r} 0 0 1 {150 + r*0.2:.0f} {150 + r:.0f}" stroke="{c}" stroke-width="3" fill="none" stroke-linecap="round" transform="translate(-30 0)"/>'
                   for r, c in ((26, TERRA), (46, PEACH), (66, SAGE)))
    return base(
        f'<path d="M66 116 a34 34 0 0 1 34 -34 h4 a34 34 0 0 1 34 34 v20 a34 34 0 0 1 -34 34 h-10 l-22 18 v-22 a34 34 0 0 1 -6 -16 z" fill="{SAGE_L}" opacity=".85"/>'
        + dot(88, 124, 5, PAPER) + dot(104, 124, 5, PAPER) + dot(120, 124, 5, PAPER)
        + arcs
        + leaf(196, 92, 30, .7, SAGE) + leaf(212, 150, 90, .7, SAGE_L) + leaf(196, 208, 150, .7, SAGE)
        + sprig(84, 236, 42, -12, SAGE, .6, 2))


def terapia_ocupacional():
    return base(
        stem("M58 70 C110 56 190 56 244 76", OLIVE, 3.2)
        + "".join(leaf(x, y, r, .8, c) for x, y, r, c in ((76, 66, -120, SAGE), (96, 62, -70, SAGE_L), (204, 62, 70, SAGE_L), (226, 68, 120, SAGE), (150, 58, 0, SAGE)))
        + stem("M116 62 L112 182 M186 62 L190 182", BROWN, 2)
        + f'<rect x="100" y="180" width="102" height="14" rx="7" fill="{TERRA}"/>'
        + f'<circle cx="90" cy="222" r="16" fill="{PEACH}"/><path d="M76 216 Q90 208 104 216 M76 228 Q90 236 104 228" stroke="{PAPER}" stroke-width="2" fill="none"/>'
        + f'<rect x="196" y="206" width="30" height="30" rx="6" fill="{SAGE_L}" stroke="{OLIVE}" stroke-width="1.6"/>'
        + "".join(dot(x, y, 2.2, OLIVE) for x, y in ((204, 214), (218, 214), (211, 221), (204, 228), (218, 228))))


def ados():
    return base(
        f'<rect x="64" y="214" width="172" height="16" rx="8" fill="{SAND}"/>'
        + stem("M120 214 V118", BROWN, 4)
        + f'<ellipse cx="120" cy="204" rx="36" ry="10" fill="{TERRA}"/>'
        + f'<ellipse cx="120" cy="186" rx="29" ry="9" fill="{PEACH}"/>'
        + f'<ellipse cx="120" cy="169" rx="22" ry="8" fill="{SAGE}"/>'
        + f'<ellipse cx="120" cy="153" rx="16" ry="7" fill="{SAGE_L}"/>'
        + dot(120, 116, 7, TERRA)
        + f'<rect x="168" y="176" width="38" height="38" rx="6" fill="{BEIGE}" stroke="{OLIVE}" stroke-width="1.8"/>'
        + f'<circle cx="187" cy="195" r="9" fill="none" stroke="{TERRA}" stroke-width="2.2"/>'
        + f'<path d="M210 214 l12 -24 l12 24 z" fill="{SAGE}"/>'
        + sprig(214, 176, 46, 18, SAGE, .6, 2))


def neurocognitiva():
    def rama(x, y, ang, largo, nivel):
        if nivel == 0:
            return dot(x, y, 6, TERRA if (x + y) % 3 < 1.5 else PEACH)
        a = math.radians(ang)
        x2, y2 = x + largo * math.sin(a), y - largo * math.cos(a)
        out = stem(f"M{x:.1f} {y:.1f} Q{(x + x2) / 2 + 6:.1f} {(y + y2) / 2:.1f} {x2:.1f} {y2:.1f}", OLIVE, 1.2 + nivel)
        if nivel == 2:
            out += leaf((x + x2) / 2, (y + y2) / 2, ang + 60, .55, SAGE_L)
        return out + rama(x2, y2, ang - 28, largo * .72, nivel - 1) + rama(x2, y2, ang + 30, largo * .72, nivel - 1)
    return base(rama(150, 236, 0, 58, 4) + leaf(150, 236, -70, .7, SAGE) + leaf(150, 236, 70, .7, SAGE))


def psicodiagnostico():
    return base(
        f'<rect x="84" y="78" width="132" height="158" rx="10" fill="{PAPER}" stroke="{OLIVE}" stroke-width="2"/>'
        f'<rect x="124" y="68" width="52" height="20" rx="6" fill="{SAGE}"/>'
        + "".join(stem(f"M104 {y} h{w}", SAGE_L, 4) for y, w in ((116, 86), (136, 70), (156, 90), (176, 58), (196, 76)))
        + f'<path d="M180 192 l8 8 l16 -18" stroke="{TERRA}" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
        + sprig(64, 236, 70, -14, SAGE, .7, 3)
        + f'<g transform="translate(232 226) rotate(-20)"><rect x="-5" y="-84" width="10" height="76" rx="2" fill="{TERRA}"/><path d="M-5 -8 L0 6 L5 -8 Z" fill="{SAND}"/></g>')


def estimulacion_temprana():
    return base(
        dot(206, 92, 24, PEACH, .9)
        + "".join(stem(f"M{206 + 32 * math.cos(math.radians(a)):.1f} {92 + 32 * math.sin(math.radians(a)):.1f} L{206 + 42 * math.cos(math.radians(a)):.1f} {92 + 42 * math.sin(math.radians(a)):.1f}", PEACH, 2.4) for a in range(0, 360, 45))
        + f'<path d="M84 236 Q150 192 216 236 Z" fill="{SAND}"/>'
        + stem("M150 216 C150 186 146 160 152 134", OLIVE, 3)
        + leaf(150, 168, -65, 1.35, SAGE) + leaf(151, 152, 62, 1.25, SAGE_L) + leaf(152, 136, 6, .8, SAGE)
        + dot(98, 226, 4, TERRA, .6) + dot(196, 228, 3.5, TERRA, .6))


def estimulacion_cognitiva():
    s, x0, y0 = 30, 90, 90
    lineas = ["M90 90 h150", "M90 90 v120", "M240 90 v150 h-150", "M90 240 v-30",
              "M120 120 h90 v60", "M120 120 v90 h60", "M150 150 h30 v30 h-30 z", "M210 210 h-30"]
    return base(
        f'<rect x="90" y="90" width="150" height="150" rx="10" fill="{PAPER}" opacity=".7"/>'
        + "".join(stem(d, OLIVE, 3) for d in lineas)
        + leaf(165, 178, -25, .75, SAGE) + leaf(165, 178, 30, .7, SAGE_L)
        + dot(104, 225, 6, TERRA)
        + stem("M104 225 C104 210 108 200 104 190", TERRA, 1.6).replace('stroke-width="1.6"', 'stroke-width="1.6" stroke-dasharray="2 5"')
        + sprig(62, 236, 56, -10, SAGE, .65, 2))


def alfabetizacion():
    out = ""
    for x, h, letra, col in ((96, 92, "a", TERRA), (150, 122, "b", OLIVE), (204, 84, "c", BROWN)):
        out += stem(f"M{x} 236 C{x - 4} {236 - h * .5} {x + 4} {236 - h * .8} {x} {236 - h}", OLIVE, 2.4)
        out += leaf(x, 236 - h * .4, -55, .7, SAGE) + leaf(x, 236 - h * .55, 55, .65, SAGE_L)
        out += f'<circle cx="{x}" cy="{236 - h - 22}" r="24" fill="{PAPER}" stroke="{col}" stroke-width="2"/>'
        out += (f'<text x="{x}" y="{236 - h - 13}" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" '
                f'font-size="30" font-style="italic" fill="{col}">{letra}</text>')
    return base(out)


def kinesiologia():
    return base(
        f'<path d="M64 236 h48 v-30 h44 v-30 h44 v-30 h44 v90 z" fill="{SAND}"/>'
        + stem("M64 236 h48 v-30 h44 v-30 h44 v-30 h44", BROWN, 2.4)
        + sprig(222, 146, 58, 8, SAGE, .7, 3)
        + dot(222, 84, 7, TERRA)
        + "".join(dot(x, y, 4, PEACH) for x, y in ((92, 228), (134, 198), (178, 168)))
        + leaf(76, 236, -40, .7, SAGE_L) + leaf(76, 236, -5, .6, SAGE))


def equipo():
    pos = ((150, 96, 0, SAGE), (118, 120, -40, TERRA), (182, 120, 40, SAGE_L), (104, 158, -70, SAGE), (196, 158, 70, PEACH), (128, 190, -100, SAGE_L), (172, 190, 100, SAGE))
    return base(
        stem("M150 236 V92", OLIVE, 3.2)
        + "".join(leaf(150, y + 14, r, 1.25, c) for _, y, r, c in pos[1:])
        + leaf(150, 96, 0, 1.15, SAGE)
        + dot(150, 64, 6, TERRA))


def historia():
    return base(
        stem("M60 222 H240", BROWN, 1.6).replace('stroke-width="1.6"', 'stroke-width="1.6" stroke-dasharray="3 6"')
        + f'<ellipse cx="86" cy="214" rx="10" ry="7" fill="{BROWN}"/>'
        + stem("M150 222 C150 208 148 196 152 186", OLIVE, 2.4) + leaf(151, 200, -60, .8, SAGE) + leaf(151, 196, 60, .75, SAGE_L)
        + stem("M216 222 C214 186 222 150 214 110", OLIVE, 2.8)
        + leaf(216, 190, -60, 1.0, SAGE) + leaf(217, 170, 60, 1.0, SAGE_L) + leaf(219, 146, -55, .9, SAGE) + leaf(217, 128, 55, .85, SAGE_L)
        + flower(214, 100, 9, TERRA, BEIGE)
        + stem("M100 196 Q118 186 132 194", PEACH, 1.8) + stem("M168 166 Q184 150 200 156", PEACH, 1.8))


def obras_sociales():
    return base(
        f'<rect x="92" y="76" width="116" height="152" rx="12" fill="{PAPER}" stroke="{OLIVE}" stroke-width="2"/>'
        f'<rect x="124" y="66" width="52" height="20" rx="6" fill="{TERRA}"/>'
        + "".join(f'<circle cx="114" cy="{y}" r="8" fill="none" stroke="{SAGE}" stroke-width="2"/><path d="M110 {y} l3 3 l6 -6" stroke="{SAGE}" stroke-width="2" fill="none"/>' + stem(f"M130 {y} h{w}", SAGE_L, 4) for y, w in ((118, 58), (148, 46), (178, 54)))
        + sprig(232, 236, 60, 10, SAGE, .7, 3) + flower(68, 210, 8, PEACH, BEIGE) + stem("M68 236 V218", OLIVE, 2))


def discapacidad():
    return base(
        f'<path d="M92 236 V138 a58 58 0 0 1 116 0 V236 z" fill="{SAGE_XL}"/>'
        + stem("M92 236 V138 a58 58 0 0 1 116 0 V236", OLIVE, 2.6)
        + f'<path d="M58 236 L92 222 H150" stroke="{TERRA}" stroke-width="4" fill="none" stroke-linecap="round"/>'
        + stem("M150 222 C150 196 146 176 152 150", OLIVE, 2.6)
        + leaf(150, 200, -60, 1.0, SAGE) + leaf(151, 186, 60, .95, SAGE) + leaf(152, 166, -50, .8, SAGE_L) + leaf(152, 154, 10, .7, SAGE)
        + flower(152, 132, 9, TERRA, BEIGE)
        + leaf(232, 236, 30, .8, SAGE_L) + leaf(236, 236, 70, .7, SAGE))


def autismo():
    # flor de pétalos todos distintos: cada forma de ser, una flor entera
    petalos = [
        f'<ellipse cx="0" cy="-36" rx="14" ry="23" fill="{TERRA}"/>',
        f'<circle cx="0" cy="-38" r="17" fill="{SAGE_L}"/>',
        f'<path d="M0 -14 C20 -26 18 -58 0 -60 C-18 -58 -20 -26 0 -14 Z" fill="{PEACH}"/>',
        f'<ellipse cx="0" cy="-34" rx="10" ry="21" fill="{SAGE}"/>',
        f'<rect x="-14" y="-56" width="28" height="38" rx="14" fill="{SAND}" stroke="{OLIVE}" stroke-width="1.4"/>',
        f'<path d="M0 -14 C16 -30 22 -50 6 -60 C-4 -54 -14 -34 0 -14 Z" fill="{BROWN}" opacity=".75"/>',
        f'<ellipse cx="0" cy="-38" rx="16" ry="19" fill="{OLIVE}" opacity=".7"/>',
    ]
    flor = "".join(f'<g transform="translate(150 118) rotate({i * 360 / len(petalos):.1f})">{p}</g>' for i, p in enumerate(petalos))
    return base(
        stem("M150 236 C146 200 154 170 150 140", OLIVE, 3)
        + leaf(149, 206, -60, 1.1, SAGE) + leaf(151, 190, 60, 1.0, SAGE_L)
        + flor + dot(150, 118, 14, CREAM) + dot(150, 118, 8, TERRA))


def senales():
    out = ""
    for x, h, et in ((96, 58, "12 m"), (150, 92, "18 m"), (204, 126, "2 años")):
        out += stem(f"M{x} 236 V{236 - h}", OLIVE, 2.4)
        out += leaf(x, 236 - h * .5, -55, .75, SAGE) + leaf(x, 236 - h * .5, 55, .7, SAGE_L)
        out += dot(x, 236 - h - 8, 8, TERRA if x != 150 else PEACH)
        out += (f'<text x="{x}" y="{236 - h - 26}" text-anchor="middle" font-family="Georgia, \'Times New Roman\', serif" '
                f'font-size="14" font-style="italic" fill="{BROWN}">{et}</text>')
    return base(stem("M70 236 H230", BROWN, 1.4) + out)


def tdah():
    cx, cy = 128, 120
    rayos = "".join(stem(f"M{cx} {cy} L{cx + 30 * math.cos(math.radians(a)):.1f} {cy + 30 * math.sin(math.radians(a)):.1f}", SAGE_L, 1.4)
                    + dot(cx + 30 * math.cos(math.radians(a)), cy + 30 * math.sin(math.radians(a)), 3, BEIGE)
                    for a in range(0, 360, 24) if not 300 < a < 360 and not 0 <= a < 30)
    semillas = ""
    for i, (x, y, r) in enumerate(((176, 92, 20), (200, 74, -10), (222, 104, 35), (236, 70, 10), (196, 122, 50))):
        semillas += (f'<g transform="translate({x} {y}) rotate({r})">' + stem("M0 0 V14", OLIVE, 1.2)
                     + "".join(stem(f"M0 0 L{7 * math.cos(math.radians(a)):.1f} {7 * math.sin(math.radians(a)):.1f}", SAGE_L, 1.2) for a in range(200, 345, 28))
                     + dot(0, 15, 2.4, TERRA) + "</g>")
    return base(
        stem(f"M{cx} 236 C{cx + 6} 200 {cx - 6} 160 {cx} {cy}", OLIVE, 2.6)
        + leaf(cx, 214, -65, 1.1, SAGE) + leaf(cx + 1, 198, 60, 1.0, SAGE_L)
        + rayos + dot(cx, cy, 9, PEACH) + semillas
        + stem("M168 104 Q190 84 214 90", PEACH, 1.4).replace('stroke-width="1.4"', 'stroke-width="1.4" stroke-dasharray="2 6"'))


def lenguaje():
    return base(
        stem("M50 196 C110 184 170 182 250 196", BROWN, 3)
        + leaf(70, 192, -120, .8, SAGE) + leaf(214, 188, 120, .8, SAGE_L) + leaf(236, 192, 80, .7, SAGE)
        # pajarito
        + f'<ellipse cx="128" cy="160" rx="34" ry="26" fill="{TERRA}"/>'
        + f'<circle cx="154" cy="138" r="17" fill="{TERRA}"/>'
        + f'<path d="M98 152 C80 146 72 134 70 124 C86 132 96 136 104 140 Z" fill="{BROWN}"/>'
        + f'<path d="M120 154 C130 146 146 150 150 164 C138 170 126 166 120 154 Z" fill="{PEACH}"/>'
        + f'<path d="M170 136 l14 4 l-14 4 z" fill="{PEACH}"/>' + dot(158, 134, 2.8, NAVY)
        + stem("M120 184 v10 M134 184 v10", BROWN, 2)
        + "".join(f'<path d="M{196 + i * 16} {120 - i * 14} q8 -8 0 -16" stroke="{c}" stroke-width="2.6" fill="none" stroke-linecap="round"/>' for i, c in enumerate((SAGE, OLIVE, SAGE_L)))
        + leaf(240, 76, 40, .55, SAGE))


def zona_sur():
    casas = ""
    for x, w, h, c in ((70, 34, 30, BEIGE), (108, 30, 40, SAND), (196, 34, 34, BEIGE), (234, 26, 26, SAND)):
        casas += f'<rect x="{x}" y="{236 - h}" width="{w}" height="{h}" fill="{c}" stroke="{OLIVE}" stroke-width="1.4"/>'
        casas += f'<path d="M{x - 4} {236 - h} L{x + w / 2} {236 - h - 16} L{x + w + 4} {236 - h}" fill="{TERRA}" opacity=".85"/>'
    return base(
        f'<path d="M40 236 Q100 196 160 214 T268 206 V236 Z" fill="{SAGE_XL}"/>' + casas
        + f'<path d="M150 214 C118 170 112 150 112 128 a38 38 0 0 1 76 0 C188 150 182 170 150 214 Z" fill="{SAGE}"/>'
        + dot(150, 128, 18, CREAM) + leaf(150, 140, -30, .65, SAGE) + leaf(150, 140, 30, .6, TERRA))


ILUSTRACIONES = {
    "psicologia": (psicologia, "Dos globos de diálogo, uno de ellos con una rama que crece"),
    "psicopedagogia": (psicopedagogia, "Una pila de libros de la que brota una planta, junto a un lápiz"),
    "fonoaudiologia": (fonoaudiologia, "Un globo de diálogo del que salen ondas de sonido que terminan en hojas"),
    "terapia-ocupacional": (terapia_ocupacional, "Una hamaca colgada de una rama, una pelota sensorial y un cubo con texturas"),
    "evaluacion-ados": (ados, "Juguetes sobre una alfombra: un encastre de aros, un cubo y una rama"),
    "evaluacion-neurocognitiva": (neurocognitiva, "Una rama que se divide en ramitas con puntos de conexión, como una red de neuronas"),
    "psicodiagnostico": (psicodiagnostico, "Un cuaderno de notas con una tilde, un lápiz y una rama"),
    "estimulacion-temprana": (estimulacion_temprana, "Un brote con sus primeras hojas bajo un sol cálido"),
    "estimulacion-cognitiva": (estimulacion_cognitiva, "Un laberinto con una hoja en el centro"),
    "alfabetizacion": (alfabetizacion, "Las letras a, b y c como flores sobre tallos"),
    "kinesiologia": (kinesiologia, "Escalones que suben hacia una rama en flor"),
    "equipo": (equipo, "Un tallo con hojas de distintos colores, como un equipo"),
    "historia": (historia, "Una semilla, un brote y una planta en flor: el crecimiento en el tiempo"),
    "obras-sociales": (obras_sociales, "Una planilla con tildes junto a una rama y una flor"),
    "discapacidad": (discapacidad, "Un arco de entrada con una rampa que lleva a una planta en flor"),
    "autismo": (autismo, "Una flor con pétalos de formas y colores distintos"),
    "senales-autismo": (senales, "Tres tallos que crecen a distintas alturas, marcados 12 meses, 18 meses y 2 años"),
    "tdah": (tdah, "Un diente de león cuyas semillas vuelan con el viento"),
    "lenguaje": (lenguaje, "Un pajarito que canta posado sobre una rama"),
    "zona-sur": (zona_sur, "Un marcador de ubicación con una hoja, sobre casas y colinas"),
}


def svg_file(nombre, fn, alt):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300" role="img" aria-label="{alt}">'
            f'<title>{alt}</title>{fn()}</svg>\n')


# ───────────────────────── íconos de la home (24×24) ─────────────────────────
# Trazo con currentColor (lo define el CSS) + un acento terracota/durazno.
A = 'fill="#d89f6d" opacity=".55"'
ICONOS = {
    "psicopedagogia": f'<rect x="4" y="15" width="14" height="5" rx="1"/><rect x="5.5" y="10" width="12" height="5" rx="1" {A} stroke="none"/><rect x="5.5" y="10" width="12" height="5" rx="1"/><path d="M11.5 10V7c0-2 1-3.5 3-4.5"/><path d="M11.5 7.5c-1.8 0-3-1-3.3-2.7 1.8 0 3 1 3.3 2.7z"/>',
    "psicologia": f'<path d="M3.5 6.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H9l-3 2.5V13h-.5a2 2 0 0 1-2-2z" {A} stroke="none"/><path d="M3.5 6.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H9l-3 2.5V13h-.5a2 2 0 0 1-2-2z"/><path d="M18 9.5h.5a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2H18v2.5L15 18h-3.5a2 2 0 0 1-2-2v-.5"/>',
    "terapia-ocupacional": f'<path d="M3 4c5-1.5 13-1.5 18 0"/><path d="M8 4.2 7.5 15M16 4.2l.5 10.8"/><rect x="5.5" y="15" width="13" height="2.6" rx="1.3" {A} stroke="none"/><rect x="5.5" y="15" width="13" height="2.6" rx="1.3"/><path d="M12 3.5c0 2-1 3-2.5 3.2"/>',
    "fonoaudiologia": f'<path d="M3.5 9a4 4 0 0 1 4-4 4 4 0 0 1 4 4v1.5a4 4 0 0 1-4 4H6l-2.5 2v-3A4 4 0 0 1 3.5 10.5z" {A} stroke="none"/><path d="M3.5 9a4 4 0 0 1 4-4 4 4 0 0 1 4 4v1.5a4 4 0 0 1-4 4H6l-2.5 2v-3A4 4 0 0 1 3.5 10.5z"/><path d="M14.5 7.5a4 4 0 0 1 0 5"/><path d="M17.5 5a7.5 7.5 0 0 1 0 10"/><path d="M20.5 3a11 11 0 0 1 0 14"/>',
    "estimulacion-temprana": f'<path d="M5 20.5h14"/><path d="M12 20.5v-8"/><path d="M12 13C8 13 6 10.5 6 7c3.5 0 6 2 6 6z" {A}/><path d="M12 13c3.5 0 5.5-2.2 5.5-5.5-3.3 0-5.5 2-5.5 5.5z"/><circle cx="18.5" cy="4.5" r="1.4"/>',
    "estimulacion-cognitiva": f'<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M3.5 9.5h11v5M9.5 9.5v8M14.5 14.5h3"/><circle cx="17.5" cy="6.5" r="1.6" {A} stroke="none"/>',
    "alfabetizacion": f'<circle cx="9" cy="9.5" r="5.5" {A} stroke="none"/><text x="9" y="13" text-anchor="middle" font-family="Playfair Display, Georgia, serif" font-size="11" font-style="italic" fill="currentColor" stroke="none">a</text><path d="M16.5 20.5c0-4 .8-7 3.5-9"/><path d="M18.6 15.2c-1.8-.2-2.8-1.4-2.8-3.2 1.8.2 2.8 1.4 2.8 3.2z"/><path d="M4 20.5h16"/>',
    "kinesiologia": f'<path d="M3.5 20.5h4v-4h4v-4h4v-4h5" /><path d="M3.5 20.5h4v-4h4v-4h4v-4h5v12z" {A} stroke="none"/><path d="M19 8.5V5"/><path d="M19 5.5c-1.6 0-2.6-1-2.6-2.6 1.6 0 2.6 1 2.6 2.6z"/>',
    "psicodiagnostico": f'<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2.5" width="6" height="3" rx="1" {A} stroke="none"/><rect x="9" y="2.5" width="6" height="3" rx="1"/><path d="M8.5 10h7M8.5 13.5h4.5"/><path d="m12.5 17 1.5 1.5 3-3"/>',
    "evaluacion-ados": f'<path d="M3 20.5h18"/><path d="M8 20.5V6"/><ellipse cx="8" cy="18" rx="4.5" ry="1.6" {A} stroke="none"/><ellipse cx="8" cy="18" rx="4.5" ry="1.6"/><ellipse cx="8" cy="14.5" rx="3.5" ry="1.3"/><ellipse cx="8" cy="11.2" rx="2.5" ry="1.1"/><rect x="14" y="14.5" width="6" height="6" rx="1"/>',
    "evaluacion-neurocognitiva": f'<path d="M12 21V14M12 14l-4.5-4.5M12 14l4.5-4.5M7.5 9.5 5 5.5M7.5 9.5l2-4.5M16.5 9.5l-2-4.5M16.5 9.5 19 5.5"/><circle cx="5" cy="4.5" r="1.4" {A}/><circle cx="9.5" cy="4" r="1.4"/><circle cx="14.5" cy="4" r="1.4" {A}/><circle cx="19" cy="4.5" r="1.4"/>',
    # "Para quién": etapas de una misma planta
    "ninos": f'<path d="M5 20.5h14"/><path d="M12 20.5v-6"/><path d="M12 15c-3 0-4.6-1.9-4.6-4.6 2.8 0 4.6 1.6 4.6 4.6z" {A}/><path d="M12 15c2.8 0 4.4-1.7 4.4-4.4-2.6 0-4.4 1.5-4.4 4.4z"/>',
    "adolescentes": f'<path d="M5 20.5h14"/><path d="M12 20.5V5"/><path d="M12 14c-3 0-4.6-1.9-4.6-4.6 2.8 0 4.6 1.6 4.6 4.6z" {A}/><path d="M12 10.5c2.8 0 4.4-1.7 4.4-4.4-2.6 0-4.4 1.5-4.4 4.4z"/><path d="M12 17.5c2.2 0 3.6-1.3 3.6-3.4-2 0-3.6 1.2-3.6 3.4z"/>',
    "adultos": f'<path d="M5 20.5h14"/><path d="M12 20.5V12"/><circle cx="12" cy="8" r="5.5" {A} stroke="none"/><path d="M12 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/><path d="M12 12 9.5 9.5M12 10.5l2.5-2.5"/>',
    "familias": f'<path d="M3.5 20.5h17"/><path d="M12 20.5V8M12 20.5c0-4-2.5-6.5-6-7.5M12 20.5c0-4 2.5-6.5 6-7.5"/><circle cx="12" cy="6" r="2.2" {A}/><circle cx="5" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8" {A}/>',
}


def icono_inline(nombre):
    return (f'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="ic-sinapsis">{ICONOS[nombre]}</svg>')


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for nombre, (fn, alt) in ILUSTRACIONES.items():
        with open(os.path.join(OUT, nombre + ".svg"), "w", encoding="utf-8") as f:
            f.write(svg_file(nombre, fn, alt))
    print(f"{len(ILUSTRACIONES)} ilustraciones en img/ilustraciones/")
