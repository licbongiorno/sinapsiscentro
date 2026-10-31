#!/usr/bin/env python3
"""
ILUSTRACIONES.PY — Sistema de ilustraciones e íconos de Centro Sinapsis
=========================================================================
Genera las ilustraciones de cada página (img/ilustraciones/*.svg) y el set
de íconos de la home, con la paleta que usa la marca en Instagram (medida
sobre las publicaciones reales del feed, 2026-10-31):

  crema #f4efe4 · beige #e8e0d1 · arena #e4ceb7 · salvia #7b9476 ·
  salvia clara #a4af91 · oliva #677357 · terracota #b46e50 ·
  durazno #d89f6d · marrón #6f4b39 · azul marino #1c2534

CRITERIO (lo más importante): cada imagen tiene que mostrar de qué trata la
página — su título y su contenido — y no una metáfora que haya que explicar.
Si la página habla de personas (un niño en terapia, un adulto mayor haciendo
ejercicio), la ilustración muestra a esas personas haciendo eso. Las hojas
botánicas quedan como detalle de marca, no como tema.

Estilo: personas simples y cálidas (como las de las publicaciones de
Instagram), rellenos planos, trazo oliva, todo sobre un disco crema. Sin
fotos de stock, sin íconos médicos innecesarios, sin símbolos controvertidos
(no se usa la pieza de rompecabezas para el autismo).

Uso: python3 scripts/ilustraciones.py   (regenera todos los SVG)
"""
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "img", "ilustraciones")

CREAM, BEIGE, SAND, PAPER = "#f4efe4", "#e8e0d1", "#e4ceb7", "#fffdf8"
SAGE, SAGE_L, SAGE_XL, OLIVE = "#7b9476", "#a4af91", "#ccd3bd", "#677357"
TERRA, PEACH, BROWN, NAVY = "#b46e50", "#d89f6d", "#6f4b39", "#1c2534"
SLATE = "#4b5d68"          # pantalones / ropa oscura, derivado del azul marino
SAGE_D = "#46613f"
PIEL = ["#f1d3bd", "#e3b48f", "#c98e68", "#9a6446"]
PELO = {"castaño": "#5a3a2a", "oscuro": "#2f2622", "cobrizo": "#8a4b2f", "canoso": "#cfc8bd", "rubio": "#c99b5e"}
LEAF_D = "M0 0 C7 -8 8 -21 0 -32 C-8 -21 -7 -8 0 0 Z"
SERIF = "Georgia, 'Times New Roman', serif"
G = 232   # línea de piso


# ───────────────────────── primitivas ─────────────────────────

def leaf(x, y, rot, s=1.0, fill=SAGE, op=1.0):
    return f'<path d="{LEAF_D}" transform="translate({x:.1f} {y:.1f}) rotate({rot:.0f}) scale({s})" fill="{fill}" opacity="{op}"/>'


def stem(d, color=OLIVE, w=2.4, extra=""):
    return f'<path d="{d}" stroke="{color}" stroke-width="{w}" fill="none" stroke-linecap="round" stroke-linejoin="round" {extra}/>'


def dot(x, y, r, fill=TERRA, op=1.0):
    return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r:.1f}" fill="{fill}" opacity="{op}"/>'


def rect(x, y, w, h, fill, rx=0, extra=""):
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx:.1f}" fill="{fill}" {extra}/>'


def text(x, y, t, size=16, fill=BROWN, italic=True, anchor="middle", weight="normal"):
    st = ' font-style="italic"' if italic else ""
    return f'<text x="{x:.1f}" y="{y:.1f}" text-anchor="{anchor}" font-family="{SERIF}" font-size="{size}" font-weight="{weight}"{st} fill="{fill}">{t}</text>'


def sprig(x, y, length, angle, s=0.7, pares=2):
    a = math.radians(angle)
    x2, y2 = x + length * math.sin(a), y - length * math.cos(a)
    out = stem(f"M{x:.1f} {y:.1f} L{x2:.1f} {y2:.1f}", OLIVE, 2)
    for i in range(pares):
        t = (i + 1) / (pares + 1)
        px, py = x + (x2 - x) * t, y + (y2 - y) * t
        out += leaf(px, py, angle - 50, s * (1 - t * .3), SAGE) + leaf(px, py, angle + 50, s * (1 - t * .3), SAGE_L)
    return out + leaf(x2, y2, angle, s * .75, SAGE)


def maceta(x, y=G, s=1.0):
    return (f'<path d="M{x - 12 * s:.1f} {y - 22 * s:.1f} h{24 * s:.1f} l-3 {22 * s:.1f} h{-18 * s:.1f} z" fill="{TERRA}"/>'
            + sprig(x, y - 22 * s, 34 * s, -10, .55 * s) + sprig(x, y - 22 * s, 28 * s, 22, .5 * s))


def burbuja(x, y, w, h, cola_x, cola_dir=1, fill=PAPER, borde=OLIVE):
    """Globo de diálogo con la cola apuntando hacia abajo, a quien habla."""
    cx = cola_x
    return (f'<path d="M{x + 10} {y} h{w - 20} a10 10 0 0 1 10 10 v{h - 20} a10 10 0 0 1 -10 10 '
            f'H{cx + 6 * cola_dir if cola_dir > 0 else cx + 10} l{-6 * cola_dir if cola_dir > 0 else -4} 10 l{-4 if cola_dir > 0 else -6} -10 '
            f'H{x + 10} a10 10 0 0 1 -10 -10 v{-(h - 20)} a10 10 0 0 1 10 -10 z" fill="{fill}" stroke="{borde}" stroke-width="1.8" stroke-linejoin="round"/>')


def silla(x, dir=1, s=1.0, color=SAND, y=G):
    """Silla vista de costado. `dir` = hacia dónde mira quien se sienta."""
    asiento = y - 44 * s
    respaldo_x = x - dir * 18 * s
    return (stem(f"M{x - 16 * s:.1f} {y} V{asiento:.1f} M{x + 16 * s:.1f} {y} V{asiento:.1f}", BROWN, 2.4 * s)
            + rect(x - 20 * s, asiento - 5 * s, 40 * s, 7 * s, color, 3 * s)
            + rect(respaldo_x - 3.5 * s, asiento - 52 * s, 7 * s, 54 * s, color, 3 * s))


def mesa(x1, x2, alto=62, y=G, color=SAND):
    top = y - alto
    return (rect(x1, top, x2 - x1, 8, color, 3) + stem(f"M{x1 + 10} {top + 8} V{y} M{x2 - 10} {top + 8} V{y}", BROWN, 2.6))


def base(inner, fondo=""):
    """Disco crema con anillo punteado y sombra de piso: el marco común."""
    return (f'<circle cx="150" cy="150" r="136" fill="{CREAM}"/>'
            f'<circle cx="150" cy="150" r="136" fill="none" stroke="{OLIVE}" stroke-width="1.2" stroke-dasharray="2 8" opacity=".45"/>'
            '<clipPath id="disco"><circle cx="150" cy="150" r="135"/></clipPath><g clip-path="url(#disco)">'
            + fondo + f'<ellipse cx="150" cy="{G + 4}" rx="110" ry="9" fill="{OLIVE}" opacity=".12"/>' + inner + '</g>')


# ───────────────────────── personas ─────────────────────────

def pelo_atras(hx, hy, r, pelo, estilo, dir=0):
    c = PELO.get(pelo, pelo)
    if estilo == "largo":
        return rect(hx - r - 1.5, hy - r * .6, 2 * r + 3, r * 1.75, c, r * .9)
    if estilo == "rodete":
        return dot(hx - dir * r * .6, hy - r * 1.0, r * .5, c)
    if estilo == "colita":
        return f'<ellipse cx="{hx - (dir or 1) * r * 1.05:.1f}" cy="{hy - r * .2:.1f}" rx="{r * .32:.1f}" ry="{r * .55:.1f}" fill="{c}"/>'
    return ""


def cabeza(hx, hy, r, piel, pelo, estilo, dir=0, expresion="sonrisa", gafas=False, auriculares=False, sin_atras=False):
    c = PELO.get(pelo, pelo)
    out = pelo_atras(hx, hy, r, pelo, estilo, dir) if not sin_atras else ""
    out += dot(hx, hy, r, piel)
    if estilo == "rulos":
        out += "".join(dot(hx + r * .95 * math.cos(math.radians(a)), hy + r * .95 * math.sin(math.radians(a)), r * .36, c) for a in range(185, 360, 25))
    elif estilo != "pelado":
        sx = dir * r * .15
        out += (f'<path d="M{hx - r:.1f} {hy + r * .1:.1f} A{r:.1f} {r:.1f} 0 0 1 {hx + r:.1f} {hy + r * .1:.1f} '
                f'Q{hx + r * .55 + sx:.1f} {hy - r * .38:.1f} {hx + sx:.1f} {hy - r * .42:.1f} '
                f'Q{hx - r * .6 + sx:.1f} {hy - r * .3:.1f} {hx - r:.1f} {hy + r * .1:.1f} Z" fill="{c}"/>')
    ex = dir * r * .28
    ojo = max(1.2, r * .085)
    out += dot(hx - r * .33 + ex, hy + r * .12, ojo, NAVY) + dot(hx + r * .33 + ex, hy + r * .12, ojo, NAVY)
    if expresion == "sonrisa":
        out += stem(f"M{hx - r * .22 + ex:.1f} {hy + r * .45:.1f} Q{hx + ex:.1f} {hy + r * .62:.1f} {hx + r * .22 + ex:.1f} {hy + r * .45:.1f}", BROWN, max(1, r * .08))
    elif expresion == "preocupado":
        out += stem(f"M{hx - r * .2 + ex:.1f} {hy + r * .58:.1f} Q{hx + ex:.1f} {hy + r * .44:.1f} {hx + r * .2 + ex:.1f} {hy + r * .58:.1f}", BROWN, max(1, r * .08))
    elif expresion == "habla":
        out += f'<ellipse cx="{hx + ex:.1f}" cy="{hy + r * .52:.1f}" rx="{r * .13:.1f}" ry="{r * .1:.1f}" fill="{BROWN}"/>'
    out += dot(hx - r * .5 + ex, hy + r * .4, r * .13, PEACH, .55) + dot(hx + r * .5 + ex, hy + r * .4, r * .13, PEACH, .55)
    if gafas:
        out += (f'<circle cx="{hx - r * .33 + ex:.1f}" cy="{hy + r * .12:.1f}" r="{r * .24:.1f}" fill="none" stroke="{BROWN}" stroke-width="{r * .07:.1f}"/>'
                f'<circle cx="{hx + r * .33 + ex:.1f}" cy="{hy + r * .12:.1f}" r="{r * .24:.1f}" fill="none" stroke="{BROWN}" stroke-width="{r * .07:.1f}"/>')
    if auriculares:
        out += stem(f"M{hx - r * 1.02:.1f} {hy + r * .1:.1f} A{r * 1.08:.1f} {r * 1.08:.1f} 0 0 1 {hx + r * 1.02:.1f} {hy + r * .1:.1f}", SLATE, r * .2)
        out += rect(hx - r * 1.2, hy - r * .15, r * .42, r * .7, SAGE_D, r * .18) + rect(hx + r * .78, hy - r * .15, r * .42, r * .7, SAGE_D, r * .18)
    return out


def brazo(sx, sy, hx, hy, ropa, piel, w):
    mx, my = (sx + hx) / 2, max(sy, hy) + w * .6
    return (f'<path d="M{sx:.1f} {sy:.1f} Q{mx:.1f} {my:.1f} {hx:.1f} {hy:.1f}" stroke="{ropa}" stroke-width="{w:.1f}" fill="none" stroke-linecap="round"/>'
            + dot(hx, hy, w * .5, piel))


def persona(x, y=G, s=1.0, piel=0, pelo="castaño", estilo="corto", ropa=SAGE, pantalon=SLATE,
            sentado=False, dir=0, manos=None, nino=False, expresion="sonrisa", gafas=False,
            auriculares=False, pollera=False, delante="", asiento=None, asiento_color=SAGE_L):
    """Persona simple. `manos` = ((dx, dy), (dx, dy)) desde cada hombro, en unidades de s.
    `delante` = SVG que va entre el cuerpo y los brazos (un libro sostenido, etc.)."""
    p = PIEL[piel] if isinstance(piel, int) else piel
    k = s * (.68 if nino else 1)
    r = 15 * s * (1.0 if nino else 1)            # los chicos: cabeza proporcionalmente grande
    torso_h, torso_w = 46 * k, 34 * k
    out = ""
    if sentado:
        cadera = y - 44 * k
        d = dir or 1
        if asiento == "puf":
            out += rect(x - 22 * k, cadera - 2 * k, 40 * k, y - cadera + 2 * k, asiento_color, 9 * k)
        largo = 36 * k
        out += stem(f"M{x:.1f} {cadera:.1f} H{x + d * largo:.1f}", pantalon, 17 * k)
        out += stem(f"M{x + d * largo:.1f} {cadera:.1f} V{y - 4:.1f}", pantalon, 13 * k)
        out += f'<ellipse cx="{x + d * (largo + 5 * k):.1f}" cy="{y - 2:.1f}" rx="{8 * k:.1f}" ry="{3.6 * k:.1f}" fill="{BROWN}"/>'
        top = cadera - torso_h + 4 * k
    else:
        pierna = 54 * k
        if pollera:
            out += f'<path d="M{x - 15 * k:.1f} {y - pierna:.1f} h{30 * k:.1f} l{5 * k:.1f} {26 * k:.1f} h{-40 * k:.1f} z" fill="{pantalon}"/>'
            out += stem(f"M{x - 6 * k:.1f} {y - pierna + 24 * k:.1f} V{y - 3:.1f} M{x + 6 * k:.1f} {y - pierna + 24 * k:.1f} V{y - 3:.1f}", p, 6 * k)
        else:
            out += rect(x - 12 * k, y - pierna, 10.5 * k, pierna - 2, pantalon, 4 * k) + rect(x + 1.5 * k, y - pierna, 10.5 * k, pierna - 2, pantalon, 4 * k)
        out += (f'<ellipse cx="{x - 7 * k + dir * 3 * k:.1f}" cy="{y - 1:.1f}" rx="{8 * k:.1f}" ry="{3.6 * k:.1f}" fill="{BROWN}"/>'
                f'<ellipse cx="{x + 7 * k + dir * 3 * k:.1f}" cy="{y - 1:.1f}" rx="{8 * k:.1f}" ry="{3.6 * k:.1f}" fill="{BROWN}"/>')
        top = y - pierna - torso_h + 6 * k
    hy = top - 8 * k - r * .82
    out = pelo_atras(x, hy, r, pelo, estilo, dir) + out
    out += rect(x - torso_w / 2, top, torso_w, torso_h, ropa, 13 * k)
    out += rect(x - 4 * k, top - 8 * k, 8 * k, 10 * k, p, 2)
    out += cabeza(x, hy, r, p, pelo, estilo, dir, expresion, gafas, auriculares, sin_atras=True)
    out += delante
    sy = top + 9 * k
    m = manos or ((-6, 40), (6, 40))
    for i, (dx, dy) in enumerate(m):
        sx = x + (-1 if i == 0 else 1) * (torso_w / 2 - 4 * k)
        out += brazo(sx, sy, sx + dx * k, sy + dy * k, ropa, p, 9 * k)
    return out


def bebe(x, y=G, s=1.0, piel=1, ropa=PEACH, manos=((-14, 14), (16, 10))):
    """Bebé sentado en el piso."""
    p = PIEL[piel]
    out = f'<ellipse cx="{x:.1f}" cy="{y - 6 * s:.1f}" rx="{20 * s:.1f}" ry="{8 * s:.1f}" fill="{ropa}"/>'
    out += f'<ellipse cx="{x:.1f}" cy="{y - 22 * s:.1f}" rx="{14 * s:.1f}" ry="{17 * s:.1f}" fill="{ropa}"/>'
    out += cabeza(x, y - 50 * s, 15 * s, p, "castaño", "pelado", 0, "sonrisa")
    out += stem(f"M{x - 4 * s:.1f} {y - 63 * s:.1f} q4 -6 8 -2", PELO["castaño"], 2 * s)
    for i, (dx, dy) in enumerate(manos):
        sx = x + (-1 if i == 0 else 1) * 9 * s
        out += brazo(sx, y - 30 * s, sx + dx * s, y - 30 * s + dy * s, ropa, p, 7 * s)
    return out


# ───────────────────────── ilustraciones por página ─────────────────────────

def psicologia():
    # sesión de psicología: dos personas sentadas conversando
    return base(
        rect(40, 60, 54, 70, PAPER, 4, f'stroke="{SAND}" stroke-width="3"') + stem("M67 60 V130 M40 95 H94", SAND, 2)
        + maceta(150, G, 1.0)
        + silla(92, 1, 1, SAGE_L) + persona(92, G, 1, piel=1, pelo="cobrizo", estilo="largo", ropa=TERRA, sentado=True, dir=1, manos=((14, 30), (22, 26)), expresion="habla")
        + silla(208, -1, 1, SAGE_L) + persona(208, G, 1, piel=0, pelo="oscuro", estilo="corto", ropa=SAGE, sentado=True, dir=-1, gafas=True,
                                              manos=((-24, 26), (-16, 30)), delante=rect(178, 168, 20, 14, PAPER, 2, f'stroke="{OLIVE}" stroke-width="1.2"'))
        + burbuja(72, 50, 64, 34, 98, 1) + dot(92, 67, 3.5, TERRA) + dot(104, 67, 3.5, PEACH) + dot(116, 67, 3.5, SAGE))


def psicopedagogia():
    # apoyo al aprendizaje: una niña escribe en el cuaderno y la psicopedagoga la acompaña
    return base(
        rect(184, 56, 70, 50, SAGE_D, 4) + text(219, 88, "a b c", 17, PAPER)
        + mesa(70, 236, 66)
        + rect(122, 160, 46, 6, PAPER, 1, f'stroke="{OLIVE}" stroke-width="1"') + stem("M128 162 h14 M148 162 h14", SAGE_L, 1.6)
        + rect(176, 150, 16, 16, TERRA, 2) + rect(194, 154, 14, 12, SAGE, 2)
        + silla(104, 1, .68, SAND) + persona(104, G, 1.0, piel=2, pelo="oscuro", estilo="colita", ropa=PEACH, sentado=True, dir=1, nino=True,
                                            manos=((24, 12), (30, 10)))
        + persona(60, G, .98, piel=0, pelo="castaño", estilo="rodete", ropa=SAGE, pantalon=SLATE, dir=1, manos=((8, 40), (52, 22))))


def fonoaudiologia():
    # fonoaudióloga muestra una tarjeta, el niño pronuncia: globo con "ma"
    return base(
        mesa(96, 204, 52)
        + silla(76, 1, .82, SAGE_L) + persona(76, G, 1.0, piel=1, pelo="cobrizo", estilo="largo", ropa=TERRA, sentado=True, dir=1,
                                              manos=((20, -6), (26, 16)),
                                              delante=rect(96, 118, 30, 38, PAPER, 3, f'stroke="{OLIVE}" stroke-width="1.6"') + text(111, 145, "m", 22, TERRA))
        + silla(224, -1, .68, SAND) + persona(224, G, 1.0, piel=0, pelo="rubio", estilo="corto", ropa=SAGE, sentado=True, dir=-1, nino=True,
                                               manos=((-20, 12), (-14, 16)), expresion="habla")
        + burbuja(186, 70, 58, 38, 216, -1) + text(215, 97, "ma", 22, SAGE_D)
        + stem("M190 120 q-8 6 0 12", PEACH, 2) + stem("M182 116 q-12 10 0 20", PEACH, 2))


def terapia_ocupacional():
    # integración sensorial: niña en la hamaca terapéutica, la terapeuta la acompaña
    return base(
        rect(40, 56, 220, 8, BROWN, 3)
        + stem("M126 64 L120 172 M174 64 L180 172", OLIVE, 2)
        + rect(108, 168, 84, 10, TERRA, 5)
        + persona(150, 178, .9, piel=1, pelo="castaño", estilo="colita", ropa=SAGE_L, pantalon=SLATE, sentado=True, dir=1, nino=True,
                  manos=((-10, -26), (10, -26)))
        + persona(230, G, 1.0, piel=3, pelo="oscuro", estilo="rodete", ropa=SAGE, dir=-1, manos=((-38, -6), (-30, 4)))
        + dot(78, 216, 16, PEACH) + stem("M64 210 Q78 202 92 210 M64 222 Q78 230 92 222", PAPER, 2)
        + rect(52, 222, 120, 8, SAGE_XL, 4))


def ados():
    # evaluación del desarrollo: evaluadora con planilla, niño jugando con un encastre de aros
    return base(
        mesa(96, 216, 54)
        + stem("M150 178 V140", BROWN, 3) + "".join(f'<ellipse cx="150" cy="{y}" rx="{w}" ry="5" fill="{c}"/>' for y, w, c in ((172, 18, TERRA), (163, 15, PEACH), (155, 12, SAGE), (148, 9, SAGE_L)))
        + rect(170, 160, 16, 16, BEIGE, 2, f'stroke="{OLIVE}" stroke-width="1.4"')
        + silla(80, 1, .68, SAND) + persona(80, G, 1.0, piel=1, pelo="castaño", estilo="corto", ropa=PEACH, sentado=True, dir=1, nino=True,
                                             manos=((40, 2), (46, -4)))
        + silla(232, -1, 1, SAGE_L) + persona(232, G, 1.0, piel=0, pelo="cobrizo", estilo="largo", ropa=SAGE, sentado=True, dir=-1, gafas=True,
                                              manos=((-22, 24), (-14, 30)), delante=rect(196, 150, 22, 28, PAPER, 2, f'stroke="{OLIVE}" stroke-width="1.4"')
                                              + stem("M200 158 h14 M200 164 h10 M200 170 h12", SAGE_L, 1.4)))


def neurocognitiva():
    # evaluación neurocognitiva: un adulto resuelve una prueba con cubos; la profesional registra
    cubos = "".join(rect(122 + (i % 3) * 14, 152 + (i // 3) * 0, 13, 13, c, 2) for i, c in enumerate((TERRA, PAPER, TERRA)))
    return base(
        dot(222, 86, 22, PAPER) + f'<circle cx="222" cy="86" r="22" fill="none" stroke="{OLIVE}" stroke-width="2"/>' + stem("M222 86 V72 M222 86 L232 92", BROWN, 2)
        + mesa(96, 214, 56)
        + cubos + rect(168, 154, 24, 22, PAPER, 2, f'stroke="{OLIVE}" stroke-width="1.2"') + rect(172, 158, 7, 7, TERRA) + rect(181, 167, 7, 7, TERRA)
        + silla(74, 1, 1, SAND) + persona(74, G, 1.0, piel=2, pelo="oscuro", estilo="corto", ropa=TERRA, sentado=True, dir=1, manos=((40, 6), (48, 4)))
        + silla(236, -1, 1, SAGE_L) + persona(236, G, 1.0, piel=0, pelo="castaño", estilo="rodete", ropa=SAGE, sentado=True, dir=-1,
                                              manos=((-22, 26), (-16, 30)), delante=rect(200, 152, 22, 28, PAPER, 2, f'stroke="{OLIVE}" stroke-width="1.4"')))


def psicodiagnostico():
    # psicodiagnóstico: la psicóloga muestra una lámina de prueba proyectiva; informe sobre la mesa
    mancha = (f'<path d="M150 70 c-10 4 -22 -2 -28 8 c-6 10 6 16 0 24 c8 2 14 -6 20 2 c4 6 6 12 8 12 c2 0 4 -6 8 -12 c6 -8 12 0 20 -2 c-6 -8 6 -14 0 -24 c-6 -10 -18 -4 -28 -8 z" fill="{SAGE_D}" opacity=".85"/>')
    return base(
        rect(110, 56, 80, 74, PAPER, 6, f'stroke="{OLIVE}" stroke-width="1.8"') + mancha
        + mesa(70, 230, 54)
        + rect(132, 168, 36, 8, PAPER, 1, f'stroke="{OLIVE}" stroke-width="1"') + rect(176, 166, 30, 10, SAGE_L, 2)
        + silla(60, 1, 1, SAND) + persona(60, G, 1.0, piel=3, pelo="oscuro", estilo="rulos", ropa=PEACH, sentado=True, dir=1, manos=((34, 8), (40, 6)))
        + silla(248, -1, 1, SAGE_L) + persona(248, G, 1.0, piel=0, pelo="castaño", estilo="largo", ropa=SAGE, sentado=True, dir=-1, gafas=True,
                                              manos=((-30, -30), (-20, 22))))


def estimulacion_temprana():
    # estimulación temprana: bebé en la alfombra jugando con un sonajero; la mamá/papá y la profesional
    return base(
        f'<ellipse cx="150" cy="{G - 2}" rx="104" ry="14" fill="{SAGE_XL}"/>'
        + bebe(150, G - 4, 1.05, piel=1, ropa=PEACH, manos=((-16, -14), (18, 6)))
        + dot(126, 184, 7, TERRA) + stem("M126 191 v10", BROWN, 2.4)
        + stem("M170 206 V182", BROWN, 2.6) + "".join(f'<ellipse cx="170" cy="{y}" rx="{w}" ry="4" fill="{c}"/>' for y, w, c in ((214, 14, TERRA), (207, 11, SAGE), (201, 8, SAGE_L)))
        + persona(72, G, 1.0, piel=2, pelo="oscuro", estilo="largo", ropa=SAGE, sentado=True, dir=1, manos=((26, 26), (34, 22)), asiento="puf", asiento_color=BEIGE)
        + persona(232, G, 1.0, piel=0, pelo="castaño", estilo="rodete", ropa=TERRA, sentado=True, dir=-1, manos=((-30, 10), (-24, 24)), asiento="puf", asiento_color=SAGE_L))


def estimulacion_cognitiva():
    # estimulación cognitiva: una persona mayor juega a la memoria con tarjetas
    cartas = ""
    for i in range(6):
        cx, cy = 104 + (i % 3) * 34, 150 + (i // 3) * 0
        if i in (1, 4):
            cartas += rect(cx, cy - 18 * (i // 3), 26, 18, PAPER, 3, f'stroke="{OLIVE}" stroke-width="1.4"') + leaf(cx + 13, cy - 18 * (i // 3) + 15, 0, .45, SAGE)
        else:
            cartas += rect(cx, cy - 18 * (i // 3), 26, 18, TERRA if i % 2 == 0 else PEACH, 3)
    return base(
        dot(226, 80, 20, PAPER) + stem("M226 64 v-6 M214 70 l-4 -4 M238 70 l4 -4", PEACH, 2.4)
        + f'<path d="M218 84 a10 10 0 1 1 16 0 c-3 3 -3 6 -3 9 h-10 c0 -3 0 -6 -3 -9z" fill="{PEACH}"/>' + rect(221, 94, 10, 5, OLIVE, 2)
        + mesa(80, 230, 70)
        + cartas.replace(f'y="{132:.1f}"', 'y="132.0"')
        + silla(60, 1, 1, SAND)
        + persona(60, G, 1.0, piel=1, pelo="canoso", estilo="corto", ropa=SAGE, sentado=True, dir=1, gafas=True, manos=((40, -6), (48, -10))))


def alfabetizacion():
    # alfabetización: un niño escribe sus primeras letras en el cuaderno
    return base(
        rect(40, 56, 92, 54, SAGE_D, 4) + text(86, 92, "m a", 22, PAPER) + stem("M48 116 H124", BROWN, 3)
        + mesa(92, 248, 66)
        + rect(150, 158, 62, 8, PAPER, 1, f'stroke="{OLIVE}" stroke-width="1.2"') + text(166, 156, "a", 14, TERRA) + text(186, 156, "e", 14, SAGE_D)
        + f'<g transform="translate(206 150) rotate(30)">' + rect(-2.5, -24, 5, 22, PEACH, 1) + '</g>'
        + "".join(rect(x, 150, 14, 14, c, 2) + text(x + 7, 161, l, 10, PAPER, False) for x, c, l in ((222, TERRA, "a"), (236, SAGE, "b")))
        + silla(126, 1, .8, SAND)
        + persona(126, G, 1.0, piel=3, pelo="oscuro", estilo="rulos", ropa=PEACH, sentado=True, dir=1, nino=True, manos=((44, 0), (58, -4))))


def kinesiologia():
    # kinesiología para adultos mayores: un señor camina entre barras paralelas con la kinesióloga al lado
    return base(
        stem("M70 170 H230 M70 184 H230", BROWN, 3.4) + stem("M78 170 V232 M222 170 V232", BROWN, 3)
        + persona(140, G, 1.0, piel=1, pelo="canoso", estilo="corto", ropa=TERRA, dir=1, gafas=True, manos=((-6, 30), (12, 30)))
        + persona(214, G, .98, piel=3, pelo="oscuro", estilo="colita", ropa=SAGE, dir=-1, manos=((-42, 12), (-10, 40)))
        + dot(60, 216, 15, SAGE_L) + rect(98, 222, 22, 9, PEACH, 3))


def equipo():
    # equipo interdisciplinario: varias profesionales y profesionales juntos
    return base(
        persona(70, G, .92, piel=2, pelo="oscuro", estilo="corto", ropa=SAGE_D)
        + persona(112, G, .98, piel=0, pelo="cobrizo", estilo="largo", ropa=TERRA, pollera=True, pantalon=BROWN)
        + persona(152, G, 1.04, piel=1, pelo="castaño", estilo="corto", ropa=SAGE, gafas=True, manos=((-6, 40), (14, 30)),
                  delante=rect(150, 158, 16, 20, PAPER, 2, f'stroke="{OLIVE}" stroke-width="1.2"'))
        + persona(192, G, .96, piel=3, pelo="oscuro", estilo="rodete", ropa=PEACH)
        + persona(232, G, .92, piel=1, pelo="rubio", estilo="colita", ropa=SAGE_L, pantalon=SLATE))


def historia():
    # nuestra historia: la fachada del centro, con su cartel, la puerta abierta y plantas
    return base(
        rect(60, 98, 180, 134, BEIGE) + f'<path d="M50 102 L150 54 L250 102 Z" fill="{TERRA}"/>'
        + rect(96, 108, 108, 26, SAGE_D, 4) + text(150, 127, "Sinapsis", 16, PAPER)
        + rect(128, 158, 44, 74, SAGE, 4) + dot(164, 196, 2.6, CREAM)
        + rect(78, 150, 36, 34, PAPER, 3, f'stroke="{OLIVE}" stroke-width="2"') + stem("M96 150 V184 M78 167 H114", OLIVE, 1.6)
        + rect(186, 150, 36, 34, PAPER, 3, f'stroke="{OLIVE}" stroke-width="2"') + stem("M204 150 V184 M186 167 H222", OLIVE, 1.6)
        + maceta(110, G, .9) + maceta(190, G, .9) + text(150, 92, "2026", 11, PAPER, False))


def obras_sociales():
    # coberturas: credencial de obra social y planilla de prestaciones con tildes
    return base(
        rect(110, 64, 112, 150, PAPER, 10, f'stroke="{OLIVE}" stroke-width="2"') + rect(142, 56, 48, 18, TERRA, 5)
        + "".join(f'<circle cx="130" cy="{y}" r="7" fill="none" stroke="{SAGE_D}" stroke-width="2"/><path d="M126.5 {y} l2.5 2.5 l5 -5" stroke="{SAGE_D}" stroke-width="2" fill="none"/>'
                  + stem(f"M144 {y} h{w}", SAGE_L, 4) for y, w in ((104, 60), (130, 48), (156, 56), (182, 40)))
        + f'<g transform="rotate(-10 92 186)">' + rect(42, 160, 100, 60, SAGE, 8) + rect(52, 172, 22, 16, CREAM, 3)
        + stem("M84 176 h44 M84 186 h30 M52 204 h76", CREAM, 3) + "</g>"
        + sprig(244, G, 44, 12, .6))


def discapacidad():
    # prestaciones por discapacidad: certificado CUD y una familia que se acerca
    return base(
        rect(150, 58, 98, 128, PAPER, 6, f'stroke="{OLIVE}" stroke-width="2"') + text(199, 92, "CUD", 22, SAGE_D, False, weight="bold")
        + stem("M166 108 h66 M166 122 h52 M166 136 h60 M166 150 h40", SAGE_L, 3.4)
        + dot(226, 166, 11, TERRA) + f'<path d="M220 174 l-4 14 l10 -6 l10 6 l-4 -14" fill="{TERRA}"/>'
        + persona(78, G, 1.0, piel=1, pelo="castaño", estilo="largo", ropa=SAGE, manos=((-6, 40), (20, 38)))
        + persona(124, G, 1.0, piel=1, pelo="castaño", estilo="corto", ropa=PEACH, nino=True, dir=-1, manos=((-16, 20), (6, 26))))


def autismo():
    # TEA: un niño con auriculares que reducen el ruido alinea bloques; una adulta juega a su lado
    bloques = "".join(rect(x, G - 16, 15, 15, c, 2) for x, c in ((118, TERRA), (135, SAGE), (152, PEACH), (169, SAGE_L), (186, TERRA)))
    return base(
        f'<ellipse cx="150" cy="{G - 1}" rx="112" ry="12" fill="{SAGE_XL}"/>' + bloques
        + persona(86, G, 1.0, piel=0, pelo="rubio", estilo="corto", ropa=SAGE, sentado=True, dir=1, nino=True, auriculares=True,
                  manos=((28, 22), (36, 20)), asiento="puf", asiento_color=BEIGE)
        + persona(238, G, 1.0, piel=2, pelo="oscuro", estilo="rodete", ropa=TERRA, sentado=True, dir=-1, manos=((-30, 22), (-22, 26)), asiento="puf", asiento_color=SAGE_L)
        + "".join(leaf(x, y, r, .5, SAGE_L) for x, y, r in ((40, 120, -30), (262, 126, 30))))


def senales():
    # señales por edad: un bebé, un niño pequeño y un niño, con las edades de referencia
    return base(
        stem("M50 232 H250", BROWN, 1.4)
        + bebe(80, G, .8, piel=1, ropa=PEACH, manos=((-12, -10), (12, -10)))
        + persona(152, G, .72, piel=2, pelo="oscuro", estilo="rulos", ropa=SAGE, nino=True, dir=0, manos=((-10, 20), (20, -6)))
        + persona(222, G, .9, piel=0, pelo="castaño", estilo="colita", ropa=TERRA, nino=True, manos=((-6, 28), (8, 28)))
        + text(80, 166, "12 m", 15, BROWN) + text(152, 132, "18 m", 15, BROWN) + text(222, 112, "2 años", 15, BROWN)
        + stem("M80 176 v8 M152 142 v8 M222 122 v8", PEACH, 2, 'stroke-dasharray="2 4"'))


def tdah():
    # TDAH: un niño en el escritorio, con la atención yéndose hacia muchos lados a la vez
    return base(
        mesa(110, 250, 66) + rect(150, 158, 50, 8, PAPER, 1, f'stroke="{OLIVE}" stroke-width="1.2"')
        + silla(98, 1, .8, SAND)
        + persona(98, G, 1.0, piel=2, pelo="castaño", estilo="corto", ropa=PEACH, sentado=True, dir=-1, nino=True, manos=((30, 4), (46, 0)), expresion="preocupado")
        + stem("M110 92 q-6 -10 2 -16", OLIVE, 1.6, 'stroke-dasharray="2 4"') + stem("M132 100 q14 -12 30 -10", OLIVE, 1.6, 'stroke-dasharray="2 4"')
        + stem("M84 98 q-14 -12 -24 -6", OLIVE, 1.6, 'stroke-dasharray="2 4"')
        + dot(50, 98, 11, TERRA) + stem("M41 94 Q50 88 59 94", PAPER, 1.6)
        + f'<path d="M108 60 l26 -10 l-10 24 l-4 -10 z" fill="{PAPER}" stroke="{OLIVE}" stroke-width="1.4"/>'
        + f'<g transform="translate(176 84) rotate(25)">' + rect(-3, -18, 6, 30, SAGE, 1) + '</g>'
        + stem("M210 70 q8 -8 16 0 q8 8 16 0", PEACH, 2.4) + dot(234, 104, 6, SAGE_L))


def lenguaje():
    # "mi hijo no habla": la mamá le habla al bebé, que todavía responde con gestos
    return base(
        f'<ellipse cx="150" cy="{G - 1}" rx="108" ry="12" fill="{SAGE_XL}"/>'
        + persona(92, G, 1.0, piel=3, pelo="oscuro", estilo="largo", ropa=SAGE, sentado=True, dir=1, manos=((30, 18), (40, 10)), expresion="habla", asiento="puf", asiento_color=BEIGE)
        + bebe(198, G - 2, 1.0, piel=3, ropa=PEACH, manos=((-20, -16), (16, 8)))
        + burbuja(60, 60, 80, 38, 96, 1) + text(100, 86, "ma - má", 16, SAGE_D)
        + burbuja(170, 82, 56, 32, 196, -1) + dot(186, 98, 3.4, OLIVE) + dot(198, 98, 3.4, OLIVE) + dot(210, 98, 3.4, OLIVE))


def zona_sur():
    casas = ""
    for x, w, h, c in ((62, 34, 30, BEIGE), (100, 30, 40, SAND), (192, 34, 34, BEIGE), (230, 28, 26, SAND)):
        casas += rect(x, G - h, w, h, c, 0, f'stroke="{OLIVE}" stroke-width="1.4"')
        casas += f'<path d="M{x - 4} {G - h} L{x + w / 2} {G - h - 16} L{x + w + 4} {G - h}" fill="{TERRA}" opacity=".85"/>'
        casas += rect(x + w / 2 - 4, G - 12, 8, 12, SAGE)
    return base(
        f'<path d="M30 {G} Q100 192 160 210 T280 200 V{G} Z" fill="{SAGE_XL}"/>' + casas
        + f'<path d="M150 210 C118 166 112 146 112 124 a38 38 0 0 1 76 0 C188 146 182 166 150 210 Z" fill="{SAGE}"/>'
        + dot(150, 124, 18, CREAM) + text(150, 131, "S", 20, TERRA, False, weight="bold"))


def talleres():
    # talleres: un grupo trabaja junto alrededor de una mesa
    return base(
        persona(150, G, 1.0, piel=0, pelo="cobrizo", estilo="largo", ropa=SAGE, manos=((-24, 30), (24, 30)))
        + mesa(70, 230, 60)
        + rect(96, 164, 30, 8, PAPER, 1, f'stroke="{OLIVE}" stroke-width="1"') + rect(170, 160, 24, 12, TERRA, 2) + dot(140, 166, 6, SAGE)
        + silla(52, 1, .68, SAND) + persona(52, G, 1.0, piel=2, pelo="oscuro", estilo="rulos", ropa=PEACH, sentado=True, dir=1, nino=True, manos=((30, 0), (38, -4)))
        + silla(248, -1, .68, SAND) + persona(248, G, 1.0, piel=1, pelo="castaño", estilo="colita", ropa=TERRA, sentado=True, dir=-1, nino=True, manos=((-30, 0), (-38, -4))))


def habilidades_sociales():
    # habilidades sociales: tres chicos de la mano, en ronda
    return base(
        persona(92, G, 1.0, piel=2, pelo="oscuro", estilo="rulos", ropa=TERRA, nino=True, manos=((-8, 26), (26, 10)))
        + persona(150, G, 1.05, piel=0, pelo="castaño", estilo="colita", ropa=SAGE, nino=True, manos=((-26, 10), (26, 10)))
        + persona(208, G, 1.0, piel=1, pelo="rubio", estilo="corto", ropa=PEACH, nino=True, manos=((-26, 10), (8, 26)))
        + burbuja(118, 64, 64, 30, 150, 1) + f'<path d="M150 86 c-6 -6 -14 -2 -14 -8 a5 5 0 0 1 14 -2 a5 5 0 0 1 14 2 c0 6 -8 2 -14 8z" fill="{TERRA}"/>')


def taller_cognitiva_ninos():
    # taller de estimulación cognitiva infantil: dos chicos juegan a encastrar figuras y a la memoria
    fichas = (rect(118, 160, 18, 12, TERRA, 2) + rect(140, 160, 18, 12, PAPER, 2, f'stroke="{OLIVE}" stroke-width="1.2"')
              + rect(162, 160, 18, 12, PEACH, 2) + dot(149, 166, 3, SAGE))
    tablero = (rect(132, 110, 40, 40, PAPER, 4, f'stroke="{OLIVE}" stroke-width="1.6"') + dot(144, 122, 5, TERRA)
               + rect(155, 117, 10, 10, SAGE, 1) + f'<path d="M139 145 l6 -10 l6 10 z" fill="{PEACH}"/>' + rect(155, 136, 10, 8, SAGE_L, 4))
    return base(
        tablero + mesa(80, 222, 58) + fichas
        + silla(70, 1, .68, SAND) + persona(70, G, 1.0, piel=2, pelo="oscuro", estilo="rulos", ropa=PEACH, sentado=True, dir=1, nino=True, manos=((36, -4), (44, -8)))
        + silla(232, -1, .68, SAND) + persona(232, G, 1.0, piel=0, pelo="rubio", estilo="colita", ropa=SAGE, sentado=True, dir=-1, nino=True, manos=((-36, -4), (-44, -8)))
        + leaf(56, 110, -30, .6, SAGE_L) + leaf(246, 104, 30, .6, SAGE_L))


# — artículos —

def dislexia():
    # dislexia: un niño lee un libro y las letras parecen moverse (b, d, p, q)
    letras = "".join(f'<g transform="translate({x} {y}) rotate({r})">' + text(0, 0, l, 22, c, False) + "</g>"
                     for x, y, r, l, c in ((168, 80, -12, "b", TERRA), (196, 66, 14, "d", SAGE_D), (222, 92, -8, "p", BROWN), (186, 106, 20, "q", TERRA)))
    return base(
        letras
        + persona(118, G, 1.0, piel=1, pelo="castaño", estilo="corto", ropa=SAGE, sentado=True, dir=1, nino=True, manos=((22, -4), (34, -8)), asiento="puf", asiento_color=SAGE_L,
                  expresion="preocupado",
                  delante=f'<path d="M136 150 l20 -6 l20 6 v26 l-20 -6 l-20 6 z" fill="{PAPER}" stroke="{OLIVE}" stroke-width="1.6" stroke-linejoin="round"/>'
                  + stem("M156 144 V170", OLIVE, 1.2))
        + rect(214, 210, 40, 10, TERRA, 3) + rect(218, 200, 32, 10, SAGE, 3))


def pronunciacion():
    # problemas de pronunciación: la fonoaudióloga y el niño practican la "rr" frente al espejo
    return base(
        f'<ellipse cx="150" cy="104" rx="46" ry="58" fill="{SAGE_XL}" stroke="{BROWN}" stroke-width="4"/>'
        + f'<ellipse cx="150" cy="104" rx="36" ry="47" fill="{PAPER}" opacity=".55"/>'
        + persona(112, G, 1.0, piel=3, pelo="oscuro", estilo="corto", ropa=PEACH, nino=True, dir=1, expresion="habla", manos=((-8, 26), (6, 26)))
        + persona(196, G, 1.0, piel=0, pelo="cobrizo", estilo="rodete", ropa=SAGE, dir=-1, manos=((-22, -6), (8, 40)))
        + burbuja(56, 58, 58, 34, 96, 1) + text(85, 82, "rrr", 18, TERRA))


def tartamudez():
    # tartamudez: el niño habla y repite sílabas; el adulto lo escucha con calma, sin apurarlo
    return base(
        silla(84, 1, .68, SAND) + persona(84, G, 1.0, piel=1, pelo="castaño", estilo="corto", ropa=TERRA, sentado=True, dir=1, nino=True, expresion="habla",
                                          manos=((14, 16), (24, 12)))
        + silla(214, -1, 1, SAGE_L) + persona(214, G, 1.0, piel=2, pelo="oscuro", estilo="largo", ropa=SAGE, sentado=True, dir=-1,
                                              manos=((-16, 30), (-24, 26)))
        + burbuja(46, 64, 124, 38, 92, 1) + text(108, 89, "pe-pe-pelota", 15, SAGE_D)
        + maceta(150, G, .8))


def ansiedad():
    # ansiedad en la infancia: una niña preocupada abraza sus rodillas; una adulta la acompaña
    nube = (f'<path d="M86 84 a14 14 0 0 1 24 -10 a18 18 0 0 1 32 6 a12 12 0 0 1 2 24 h-56 a12 12 0 0 1 -2 -20 z" fill="{SAGE_XL}" stroke="{OLIVE}" stroke-width="1.4"/>'
            + stem("M100 112 l-4 10 M116 112 l-4 10 M132 112 l-4 10", SAGE, 2))
    return base(
        nube
        # niña sentada en el piso con las rodillas recogidas
        + pelo_atras(118, 140, 15, "castaño", "largo")
        + f'<path d="M96 {G} q4 -34 26 -36 q20 0 24 36 z" fill="{SLATE}"/>'
        + rect(100, 154, 36, 46, PEACH, 14)
        + cabeza(118, 140, 15, PIEL[0], "castaño", "largo", 0, "preocupado", sin_atras=True)
        + brazo(104, 166, 128, 196, PEACH, PIEL[0], 8) + brazo(132, 166, 140, 194, PEACH, PIEL[0], 8)
        + persona(206, G, 1.0, piel=3, pelo="oscuro", estilo="rodete", ropa=SAGE, sentado=True, dir=-1, manos=((-44, -8), (-24, 26)), asiento="puf", asiento_color=SAGE_L)
        + sprig(254, G, 40, 14, .55))


def integracion_sensorial():
    # integración sensorial: un niño explora texturas con las manos en una bandeja sensorial
    granos = "".join(dot(160 + (i * 37) % 66, 182 + (i * 13) % 8, 2.2, c) for i, c in enumerate([PEACH, TERRA, SAGE, PEACH, SAGE_L] * 5))
    return base(
        rect(140, G - 40, 112, 8, SAND, 3) + stem(f"M150 {G - 32} V{G} M242 {G - 32} V{G}", BROWN, 2.4)
        + f'<path d="M150 {G - 56} h90 l-6 16 h-78 z" fill="{BEIGE}" stroke="{BROWN}" stroke-width="1.6"/>' + granos
        + persona(104, G, 1.0, piel=2, pelo="oscuro", estilo="rulos", ropa=SAGE, sentado=True, dir=1, nino=True,
                  manos=((44, 12), (54, 10)), asiento="puf", asiento_color=BEIGE)
        + dot(60, 218, 13, PEACH) + "".join(dot(60 + 8 * math.cos(math.radians(a)), 218 + 8 * math.sin(math.radians(a)), 2.2, PAPER) for a in range(0, 360, 60))
        + rect(176, 110, 54, 40, SAGE_L, 6) + "".join(dot(186 + (i % 4) * 11, 120 + (i // 4) * 11, 2.8, OLIVE if i % 3 else TERRA) for i in range(12))
        + leaf(250, 118, 30, .6, SAGE_L) + leaf(56, 124, -30, .6, SAGE_L))


def olvidos():
    # olvidos en adultos mayores: una señora consulta notas y el calendario; llaves sobre la mesa
    cal = rect(176, 58, 72, 64, PAPER, 4, f'stroke="{OLIVE}" stroke-width="1.6"') + rect(176, 58, 72, 14, TERRA, 4)
    cal += "".join(rect(182 + (i % 4) * 16, 78 + (i // 4) * 13, 11, 9, SAGE_L if i != 5 else PEACH, 2) for i in range(12))
    return base(
        cal
        + rect(66, 70, 30, 30, PEACH, 2) + rect(100, 82, 28, 28, SAGE_L, 2) + stem("M72 82 h18 M72 90 h12 M106 94 h16 M106 102 h10", BROWN, 1.6)
        + mesa(130, 252, 62)
        + dot(206, 162, 6, "none") + f'<circle cx="206" cy="162" r="6" fill="none" stroke="{BROWN}" stroke-width="2.4"/>' + stem("M211 165 l14 6 m-4 -2 v6", BROWN, 2.4)
        + rect(150, 162, 34, 8, PAPER, 1, f'stroke="{OLIVE}" stroke-width="1"')
        + silla(108, 1, 1, SAND)
        + persona(108, G, 1.0, piel=0, pelo="canoso", estilo="rodete", ropa=SAGE, sentado=True, dir=1, gafas=True, expresion="preocupado", manos=((30, -8), (46, 2)),
                  delante=rect(128, 128, 18, 22, PAPER, 2, f'stroke="{OLIVE}" stroke-width="1.2"')))


def caidas():
    # prevención de caídas: un señor camina con bastón, con baranda, buena luz y alfombra antideslizante
    return base(
        stem("M40 150 H260", BROWN, 3) + stem("M60 150 V232 M150 150 V232 M240 150 V232", BROWN, 2)
        + dot(76, 74, 16, PEACH, .9) + stem("M76 52 v-10 M58 60 l-6 -6 M94 60 l6 -6", PEACH, 2.4) + stem("M60 74 h32", BROWN, 2)
        + rect(96, 224, 120, 8, SAGE, 4) + stem("M104 228 h104", PAPER, 1.4, 'stroke-dasharray="3 4"')
        + persona(156, G - 6, 1.0, piel=1, pelo="canoso", estilo="corto", ropa=TERRA, dir=1, gafas=True, manos=((-4, 32), (22, 34)))
        + stem("M188 162 V226", BROWN, 3.2) + stem("M182 162 q6 -8 12 0", BROWN, 3.2)
        + maceta(236, G, .8))


def guias():
    # guías para familias: un libro abierto con señalador y hojas de artículos
    return base(
        rect(70, 70, 70, 92, PAPER, 4, f'stroke="{OLIVE}" stroke-width="1.6" transform="rotate(-8 105 116)"')
        + rect(162, 66, 70, 92, PAPER, 4, f'stroke="{OLIVE}" stroke-width="1.6" transform="rotate(8 197 112)"')
        + f'<path d="M58 206 Q104 186 150 206 V150 Q104 130 58 150 Z" fill="{PAPER}" stroke="{OLIVE}" stroke-width="2" stroke-linejoin="round"/>'
        + f'<path d="M242 206 Q196 186 150 206 V150 Q196 130 242 150 Z" fill="{PAPER}" stroke="{OLIVE}" stroke-width="2" stroke-linejoin="round"/>'
        + "".join(stem(f"M70 {y} Q104 {y - 10} 140 {y}", SAGE_L, 2) for y in (164, 176, 188))
        + "".join(stem(f"M160 {y} Q196 {y - 10} 230 {y}", SAGE_L, 2) for y in (164, 176))
        + f'<path d="M206 146 v40 l8 -6 l8 6 v-44" fill="{TERRA}"/>'
        + sprig(150, 146, 42, 0, .6))


ILUSTRACIONES = {
    "psicologia": (psicologia, "Una sesión de psicología: dos personas sentadas conversando"),
    "psicopedagogia": (psicopedagogia, "Una niña escribe en su cuaderno mientras la psicopedagoga la acompaña"),
    "fonoaudiologia": (fonoaudiologia, "La fonoaudióloga muestra una tarjeta con una letra y el niño pronuncia la sílaba"),
    "terapia-ocupacional": (terapia_ocupacional, "Una niña en la hamaca de integración sensorial, acompañada por la terapista ocupacional"),
    "evaluacion-ados": (ados, "Un niño juega con un encastre de aros mientras la evaluadora registra en su planilla"),
    "evaluacion-neurocognitiva": (neurocognitiva, "Un adulto resuelve una prueba con cubos mientras la profesional registra y controla el tiempo"),
    "psicodiagnostico": (psicodiagnostico, "La psicóloga muestra una lámina de una prueba psicológica a la persona evaluada"),
    "estimulacion-temprana": (estimulacion_temprana, "Un bebé juega con un sonajero sobre la alfombra, acompañado por su mamá y la profesional"),
    "estimulacion-cognitiva": (estimulacion_cognitiva, "Una persona mayor juega a la memoria con tarjetas para ejercitar la mente"),
    "alfabetizacion": (alfabetizacion, "Un niño escribe sus primeras letras en el cuaderno, con un pizarrón de fondo"),
    "kinesiologia": (kinesiologia, "Un adulto mayor camina entre barras paralelas acompañado por la kinesióloga"),
    "equipo": (equipo, "El equipo de profesionales del centro, juntos"),
    "historia": (historia, "La fachada de Centro Sinapsis, con su cartel, la puerta y plantas"),
    "obras-sociales": (obras_sociales, "Una credencial de obra social junto a una planilla de prestaciones con tildes"),
    "discapacidad": (discapacidad, "El Certificado Único de Discapacidad y una mamá que llega con su hijo"),
    "autismo": (autismo, "Un niño con auriculares que reducen el ruido alinea bloques, acompañado por una adulta"),
    "senales-autismo": (senales, "Un bebé, un niño pequeño y un niño, con las edades de referencia: 12 meses, 18 meses y 2 años"),
    "tdah": (tdah, "Un niño en su escritorio, con la atención yéndose hacia muchas cosas a la vez"),
    "lenguaje": (lenguaje, "Una mamá le habla a su bebé, que todavía responde sin palabras"),
    "zona-sur": (zona_sur, "Un marcador de ubicación de Sinapsis sobre las casas de la Zona Sur"),
    "talleres": (talleres, "Un grupo de chicos trabaja junto alrededor de una mesa, con una coordinadora"),
    "taller-cognitiva-ninos": (taller_cognitiva_ninos, "Dos chicos juegan con un tablero de encastre y fichas de memoria"),
    "habilidades-sociales": (habilidades_sociales, "Tres chicos de la mano, compartiendo un momento juntos"),
    "dislexia": (dislexia, "Un niño lee un libro mientras las letras b, d, p y q parecen moverse"),
    "pronunciacion": (pronunciacion, "Un niño practica la erre frente al espejo junto a la fonoaudióloga"),
    "tartamudez": (tartamudez, "Un niño habla repitiendo sílabas y una adulta lo escucha con calma"),
    "ansiedad": (ansiedad, "Una niña preocupada abraza sus rodillas y una adulta la acompaña"),
    "integracion-sensorial": (integracion_sensorial, "Un niño explora texturas con las manos en una bandeja sensorial"),
    "olvidos": (olvidos, "Una señora mayor revisa sus notas y el calendario, con las llaves sobre la mesa"),
    "caidas": (caidas, "Un señor mayor camina con bastón en un pasillo con baranda, buena luz y alfombra antideslizante"),
    "guias": (guias, "Un libro abierto con señalador y hojas de artículos"),
}


def svg_file(fn, alt):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300" role="img" aria-label="{alt}">'
            f'<title>{alt}</title>{fn()}</svg>\n')


# ───────────────────────── íconos (24×24) ─────────────────────────
# Trazo con currentColor (lo define el CSS) + un acento durazno. Cada ícono
# muestra el tema de la tarjeta, no una metáfora.
A = 'fill="#d89f6d" opacity=".6"'
CABEZA_PERFIL = "M15 21v-3h2.2a1.6 1.6 0 0 0 1.6-1.6v-2.6l1.7-.6-1.7-3.4A7 7 0 1 0 8 15.6V21"
ICONOS = {
    # tarjetas de servicios
    "psicopedagogia": f'<path d="M3 6.5c3-1 6-1 9 1 3-2 6-2 9-1v12c-3-1-6-1-9 1-3-2-6-2-9-1z" {A} stroke="none"/><path d="M3 6.5c3-1 6-1 9 1 3-2 6-2 9-1v12c-3-1-6-1-9 1-3-2-6-2-9-1z"/><path d="M12 7.5v12"/><path d="m15 14 4-4 1.5 1.5-4 4H15z"/>',
    "psicologia": f'<path d="M3.5 6.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H9l-3 2.5V13h-.5a2 2 0 0 1-2-2z" {A} stroke="none"/><path d="M3.5 6.5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4.5a2 2 0 0 1-2 2H9l-3 2.5V13h-.5a2 2 0 0 1-2-2z"/><path d="M18 9.5h.5a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2H18v2.5L15 18h-3.5a2 2 0 0 1-2-2v-.5"/>',
    "terapia-ocupacional": f'<path d="M3 3h18"/><path d="M8 3v12M16 3v12"/><rect x="6" y="15" width="12" height="2.6" rx="1.3" {A} stroke="none"/><rect x="6" y="15" width="12" height="2.6" rx="1.3"/><circle cx="12" cy="9.5" r="2.2"/><path d="M10.2 15v-1.5a1.8 1.8 0 0 1 3.6 0V15"/>',
    "fonoaudiologia": f'<path d="{CABEZA_PERFIL}" transform="translate(-2 0)"/><path d="M19 7.5a4 4 0 0 1 0 5" /><path d="M21.3 5.2a7.5 7.5 0 0 1 0 9.6" /><circle cx="9.5" cy="9" r="2" {A} stroke="none"/>',
    "estimulacion-temprana": f'<circle cx="10" cy="11" r="6.5"/><path d="M8 12.5c1 1 3 1 4 0"/><circle cx="8" cy="10" r=".6" fill="currentColor"/><circle cx="12" cy="10" r=".6" fill="currentColor"/><path d="M9.5 4.6c.6-1.2 2-1.4 2.6-.4"/><circle cx="19" cy="15" r="2.6" {A}/><path d="M17.3 17 14.5 20.5"/>',
    "estimulacion-cognitiva": f'<rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.5"/><rect x="13" y="3.5" width="7.5" height="7.5" rx="1.5" {A}/><rect x="3.5" y="13" width="7.5" height="7.5" rx="1.5" {A}/><rect x="13" y="13" width="7.5" height="7.5" rx="1.5"/><path d="M7.25 6v2.5M16.75 15.5V18"/>',
    "alfabetizacion": f'<path d="M3 20.5h18"/><text x="8" y="17" text-anchor="middle" font-family="Georgia, serif" font-size="13" font-style="italic" fill="currentColor" stroke="none">a</text><path d="m14 17 6.5-11 2 1.2-6.5 11-2.6 1z" {A}/><path d="m14 17 6.5-11 2 1.2-6.5 11-2.6 1z"/>',
    "kinesiologia": f'<circle cx="10" cy="4.5" r="2.3"/><path d="M10 7.5v7l-2.5 6.5M10 14.5l3 6.5M10 9.5l-3.5 3M10 9.5l4 2.5"/><path d="M15.5 11.5V21" stroke-width="2"/><path d="M14 11.5c0-1.4 3-1.4 3 0" {A}/>',
    "psicodiagnostico": f'<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2.5" width="6" height="3" rx="1" {A} stroke="none"/><rect x="9" y="2.5" width="6" height="3" rx="1"/><path d="M8.5 10h7M8.5 13.5h4.5"/><path d="m12.5 17 1.5 1.5 3-3"/>',
    "evaluacion-ados": f'<path d="M3 20.5h18"/><path d="M8 20.5V6"/><ellipse cx="8" cy="18" rx="4.5" ry="1.6" {A} stroke="none"/><ellipse cx="8" cy="18" rx="4.5" ry="1.6"/><ellipse cx="8" cy="14.5" rx="3.5" ry="1.3"/><ellipse cx="8" cy="11.2" rx="2.5" ry="1.1"/><rect x="14" y="14.5" width="6" height="6" rx="1"/>',
    "evaluacion-neurocognitiva": f'<path d="{CABEZA_PERFIL}"/><circle cx="9" cy="8" r="1.3" {A}/><circle cx="13" cy="7" r="1.3"/><circle cx="11.5" cy="11.5" r="1.3" {A}/><path d="M10.2 8.3 11 10.4M12.4 8.1l-.6 2.2M10 7.6l1.8-.4"/>',
    # "Para quién": personas de cada etapa
    "ninos": f'<circle cx="10" cy="7" r="2.8"/><path d="M6 20.5V16a4 4 0 0 1 8 0v4.5"/><circle cx="18" cy="18" r="2.5" {A}/>',
    "adolescentes": f'<circle cx="11" cy="5.5" r="2.9"/><path d="M6.5 21v-6.5a4.5 4.5 0 0 1 9 0V21"/><rect x="15.5" y="11.5" width="4" height="6.5" rx="1.2" {A}/><path d="M15.5 13h-1"/>',
    "adultos": f'<circle cx="12" cy="5" r="3"/><path d="M7 21v-7.5a5 5 0 0 1 10 0V21"/><path d="M10 12.5h4v4h-4z" {A} stroke="none"/>',
    "familias": f'<circle cx="6.5" cy="5.5" r="2.3"/><circle cx="17.5" cy="5.5" r="2.3"/><circle cx="12" cy="11" r="1.9" {A}/><path d="M3 20.5v-7a3.5 3.5 0 0 1 7 0M14 13.5a3.5 3.5 0 0 1 7 0v7"/><path d="M9.5 20.5v-3a2.5 2.5 0 0 1 5 0v3"/>',
    # "El centro que necesitabas"
    "escuela": f'<path d="M3.5 20.5V10l8.5-5 8.5 5v10.5z" {A} stroke="none"/><path d="M3.5 20.5V10l8.5-5 8.5 5v10.5"/><path d="M2 20.5h20"/><path d="M10 20.5v-5h4v5"/><path d="M12 5V1.5l3 1-3 1"/>',
    "mente": f'<path d="{CABEZA_PERFIL}"/><path d="M11 13.2c-2.6-1.6-3.6-2.8-3.6-4a1.8 1.8 0 0 1 3.6-.4 1.8 1.8 0 0 1 3.6.4c0 1.2-1 2.4-3.6 4z" {A}/>',
    "espectro": f'<circle cx="12" cy="9" r="4"/><path d="M7 9.5a5 5 0 0 1 10 0"/><rect x="5.5" y="8.5" width="2.2" height="3.6" rx="1" {A}/><rect x="16.3" y="8.5" width="2.2" height="3.6" rx="1" {A}/><path d="M6.5 21v-2.5a5.5 5.5 0 0 1 11 0V21"/>',
    # "Por qué elegirnos"
    "profesionales": f'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M7 8.5h10M7 12h6"/><circle cx="16.5" cy="15.5" r="2.6" {A}/><path d="m15.2 17.7-.7 3.8 2-1 2 1-.7-3.8"/>',
    "equipo": f'<circle cx="12" cy="6" r="2.5" {A}/><circle cx="5" cy="8.5" r="2"/><circle cx="19" cy="8.5" r="2"/><path d="M8 20v-4.5a4 4 0 0 1 8 0V20M1.8 18v-2.5a3.2 3.2 0 0 1 5-2.6M22.2 18v-2.5a3.2 3.2 0 0 0-5-2.6"/>',
    "calendario": f'<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 9.5h17" /><rect x="3.5" y="5" width="17" height="4.5" rx="2" {A} stroke="none"/><path d="M8 3v4M16 3v4"/><path d="m9 15 2 2 4-4"/>',
    "integral": f'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="9" r="2.3" {A}/><path d="M8 17a4 4 0 0 1 8 0"/><circle cx="12" cy="3" r="1.1" fill="currentColor"/><circle cx="21" cy="12" r="1.1" fill="currentColor"/><circle cx="3" cy="12" r="1.1" fill="currentColor"/>',
}


def icono_inline(nombre):
    return (f'<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="ic-sinapsis">{ICONOS[nombre]}</svg>')


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for nombre, (fn, alt) in ILUSTRACIONES.items():
        with open(os.path.join(OUT, nombre + ".svg"), "w", encoding="utf-8") as f:
            f.write(svg_file(fn, alt))
    print(f"{len(ILUSTRACIONES)} ilustraciones en img/ilustraciones/")
