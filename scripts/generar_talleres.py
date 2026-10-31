#!/usr/bin/env python3
"""GENERAR_TALLERES.PY — Genera /talleres.html (talleres, enlaces de WhatsApp,
JSON-LD y FAQ). Uso: python3 scripts/generar_talleres.py"""
import json, urllib.parse, html, sys, re, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # raíz del repo
URL = "https://sinapsiscentro.com.ar/talleres.html"
FECHA = "2026-10-31"
TEL = "5491168567160"

def wa(msg): return f"https://wa.me/{TEL}?text=" + urllib.parse.quote(msg, safe="")
def esc(s): return html.escape(s, quote=True)

MSG_GENERAL = "Hola, quisiera información sobre los talleres de Centro Sinapsis."

WA_ICON = '<svg viewBox="0 0 448 512" width="17" height="17" fill="currentColor" aria-hidden="true" focusable="false"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>'
CHEVRON = '<span class="svc-faq-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg></span>'

# colores de las ilustraciones
SAGE, SAGED, OLIVE, TERRA, TERRAD, BEIGE, INK, PAPER = "#a4af91", "#46613f", "#677357", "#b46e50", "#96472a", "#e4ceb7", "#2c2a22", "#fffdf8"

def leaf(x, y, rot, s=1.0, fill=SAGE, op=1):
    return f'<use href="#tl-leaf" transform="translate({x} {y}) rotate({rot}) scale({s})" fill="{fill}" opacity="{op}"/>'

def svg(title, inner, vb="0 0 320 180"):
    tid = "t" + re.sub(r"\W", "", title)[:18]
    return (f'<svg viewBox="{vb}" role="img" aria-labelledby="{tid}" preserveAspectRatio="xMidYMid meet">'
            f'<title id="{tid}">{esc(title)}</title>{inner}</svg>')

# ── Ilustración 1: libro abierto del que brota una rama, con letras ──
ART_ALFA = svg("Ilustración de un libro abierto del que crece una rama con hojas, rodeado de letras",
    f'<ellipse cx="160" cy="150" rx="118" ry="9" fill="{OLIVE}" opacity=".12"/>'
    f'<path d="M58 142 Q108 126 160 142 L160 72 Q108 56 58 72 Z" fill="{PAPER}" stroke="{OLIVE}" stroke-width="2" stroke-linejoin="round"/>'
    f'<path d="M262 142 Q212 126 160 142 L160 72 Q212 56 262 72 Z" fill="{PAPER}" stroke="{OLIVE}" stroke-width="2" stroke-linejoin="round"/>'
    + "".join(f'<path d="M72 {y} Q108 {y-10} 146 {y}" stroke="{SAGE}" stroke-width="2" fill="none" stroke-linecap="round"/>' for y in (88, 102, 116))
    + "".join(f'<path d="M174 {y} Q212 {y-10} 248 {y}" stroke="{SAGE}" stroke-width="2" fill="none" stroke-linecap="round"/>' for y in (88, 102))
    + f'<path d="M160 72 C158 54 166 38 176 22" stroke="{SAGED}" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
    + leaf(162, 58, -55, .7, SAGE) + leaf(165, 46, 45, .72, SAGED, .85) + leaf(171, 33, -40, .6, SAGE) + leaf(176, 23, 20, .5, OLIVE, .8)
    + f'<circle cx="179" cy="18" r="4.5" fill="{TERRA}"/>'
    + f'<text x="84" y="44" font-family="Playfair Display, Georgia, serif" font-size="30" font-style="italic" fill="{TERRAD}">a</text>'
    + f'<text x="228" y="40" font-family="Playfair Display, Georgia, serif" font-size="26" fill="{OLIVE}">b</text>'
    + f'<text x="252" y="64" font-family="Playfair Display, Georgia, serif" font-size="18" font-style="italic" fill="{SAGED}">c</text>'
    + f'<text x="56" y="60" font-family="Playfair Display, Georgia, serif" font-size="16" fill="{SAGED}">m</text>')

# ── Ilustración 2: bloques de juego apilados con un brote ──
ART_INF = svg("Ilustración de bloques de juego apilados con un brote de hojas y una pelota",
    f'<ellipse cx="160" cy="154" rx="120" ry="9" fill="{OLIVE}" opacity=".12"/>'
    f'<rect x="96" y="108" width="52" height="44" rx="7" fill="{TERRA}" opacity=".85"/>'
    f'<rect x="150" y="108" width="52" height="44" rx="7" fill="{SAGE}"/>'
    f'<rect x="123" y="64" width="52" height="44" rx="7" fill="{BEIGE}" stroke="{OLIVE}" stroke-width="1.6"/>'
    f'<circle cx="122" cy="130" r="9" fill="none" stroke="{PAPER}" stroke-width="2.4"/>'
    f'<path d="M166 122 l10 16 l10 -16 z" fill="none" stroke="{PAPER}" stroke-width="2.4" stroke-linejoin="round"/>'
    f'<rect x="139" y="76" width="20" height="20" rx="3" fill="none" stroke="{OLIVE}" stroke-width="2"/>'
    f'<path d="M149 64 C149 50 146 40 150 28" stroke="{SAGED}" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
    + leaf(149, 52, -60, .62, SAGED) + leaf(149, 46, 55, .66, SAGE) + leaf(150, 31, 10, .5, OLIVE, .85)
    + f'<circle cx="240" cy="138" r="15" fill="{PAPER}" stroke="{TERRAD}" stroke-width="2"/>'
    f'<path d="M226 134 Q240 126 254 134 M228 145 Q240 152 252 145" stroke="{TERRA}" stroke-width="2" fill="none"/>'
    + f'<path d="M60 150 C62 132 54 118 60 100" stroke="{OLIVE}" stroke-width="1.8" fill="none" stroke-linecap="round" opacity=".7"/>'
    + leaf(60, 128, -50, .55, SAGE, .9) + leaf(59, 116, 45, .5, SAGED, .7) + leaf(60, 102, -15, .45, SAGE, .9)
    + "".join(f'<circle cx="{x}" cy="{y}" r="2.4" fill="{TERRA}" opacity=".55"/>' for x, y in ((214, 70), (230, 84), (250, 74), (266, 92))))

# ── Ilustración 3: rama de olivo con una grilla de juego mental ──
ART_ADU = svg("Ilustración de una rama de olivo junto a una grilla de palabras y un lápiz",
    f'<ellipse cx="160" cy="154" rx="120" ry="9" fill="{OLIVE}" opacity=".12"/>'
    f'<g transform="translate(176 58)">'
    + "".join(f'<rect x="{c*24}" y="{r*24}" width="24" height="24" fill="{PAPER if (r+c)%3 else BEIGE}" stroke="{OLIVE}" stroke-width="1.4"/>' for r in range(3) for c in range(3))
    + f'<text x="6" y="19" font-family="Playfair Display, Georgia, serif" font-size="16" fill="{TERRAD}">s</text>'
    f'<text x="30" y="19" font-family="Playfair Display, Georgia, serif" font-size="16" fill="{TERRAD}">o</text>'
    f'<text x="54" y="19" font-family="Playfair Display, Georgia, serif" font-size="16" fill="{TERRAD}">l</text>'
    f'<text x="30" y="43" font-family="Playfair Display, Georgia, serif" font-size="16" fill="{SAGED}">j</text>'
    f'<text x="30" y="67" font-family="Playfair Display, Georgia, serif" font-size="16" fill="{SAGED}">o</text></g>'
    + f'<g transform="translate(252 140) rotate(-35)"><rect x="-4" y="-42" width="8" height="40" rx="2" fill="{TERRA}"/><path d="M-4 -2 L0 8 L4 -2 Z" fill="{BEIGE}" stroke="{OLIVE}" stroke-width="1"/></g>'
    + f'<path d="M40 150 C70 120 100 96 150 66" stroke="{OLIVE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
    + leaf(62, 132, 20, .75, SAGE) + leaf(70, 126, 125, .72, SAGED, .85) + leaf(88, 112, 25, .78, SAGE)
    + leaf(96, 106, 130, .7, OLIVE, .7) + leaf(114, 92, 30, .72, SAGED, .85) + leaf(122, 86, 135, .66, SAGE) + leaf(140, 74, 40, .6, SAGE)
    + "".join(f'<ellipse cx="{x}" cy="{y}" rx="5" ry="6.5" fill="{c}"/>' for x, y, c in ((80, 128, OLIVE), (104, 110, TERRAD), (130, 92, OLIVE))))

# ── Ilustración 4: dos flores que se inclinan una hacia la otra ──
ART_SOC = svg("Ilustración de tres flores que nacen de una misma base y se inclinan unas hacia otras",
    f'<ellipse cx="160" cy="154" rx="120" ry="9" fill="{OLIVE}" opacity=".12"/>'
    f'<path d="M132 152 Q136 140 160 140 Q184 140 188 152 Z" fill="{BEIGE}" stroke="{OLIVE}" stroke-width="1.6"/>'
    f'<path d="M150 142 C140 110 112 88 104 58" stroke="{SAGED}" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
    f'<path d="M170 142 C180 110 208 88 216 58" stroke="{SAGED}" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
    f'<path d="M160 142 C160 116 160 96 160 80" stroke="{OLIVE}" stroke-width="2" fill="none" stroke-linecap="round"/>'
    + leaf(140, 116, -70, .7, SAGE) + leaf(124, 96, -40, .62, SAGED, .85) + leaf(180, 116, 70, .7, SAGE) + leaf(196, 96, 40, .62, SAGED, .85)
    + leaf(160, 112, -35, .5, SAGE, .9) + leaf(160, 104, 35, .5, SAGE, .9)
    + "".join(f'<ellipse cx="{104 + 9*__import__("math").cos(a*__import__("math").pi/3)}" cy="{52 + 9*__import__("math").sin(a*__import__("math").pi/3)}" rx="7" ry="7" fill="{TERRA}" opacity=".85"/>' for a in range(6))
    + f'<circle cx="104" cy="52" r="5" fill="{BEIGE}"/>'
    + "".join(f'<ellipse cx="{216 + 9*__import__("math").cos(a*__import__("math").pi/3)}" cy="{52 + 9*__import__("math").sin(a*__import__("math").pi/3)}" rx="7" ry="7" fill="{SAGE}"/>' for a in range(6))
    + f'<circle cx="216" cy="52" r="5" fill="{PAPER}"/>'
    + f'<path d="M160 80 C150 70 152 60 160 54 C168 60 170 70 160 80 Z" fill="{TERRAD}" opacity=".8"/>'
    + f'<path d="M124 46 Q160 26 196 46" stroke="{TERRA}" stroke-width="1.6" fill="none" stroke-dasharray="3 6" stroke-linecap="round" opacity=".7"/>')

ART_HERO = svg("Ilustración botánica de una rama con hojas de salvia y oliva y pequeñas flores terracota",
    f'<circle cx="150" cy="150" r="118" fill="#e4ebdf"/>'
    f'<circle cx="150" cy="150" r="118" fill="none" stroke="{OLIVE}" stroke-width="1" stroke-dasharray="2 7" opacity=".5"/>'
    f'<path d="M96 262 C112 200 132 150 190 50" stroke="{OLIVE}" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
    f'<path d="M130 172 C110 150 96 138 74 132" stroke="{OLIVE}" stroke-width="2" fill="none" stroke-linecap="round"/>'
    f'<path d="M156 118 C178 112 196 116 222 128" stroke="{OLIVE}" stroke-width="2" fill="none" stroke-linecap="round"/>'
    + leaf(108, 228, 20, 1.1, SAGE) + leaf(112, 222, 140, 1.05, SAGED, .85) + leaf(122, 196, 25, 1.1, SAGE)
    + leaf(128, 188, 145, 1, OLIVE, .75) + leaf(142, 160, 30, 1.05, SAGED, .9) + leaf(150, 152, 150, 1, SAGE)
    + leaf(164, 122, 35, 1, SAGE) + leaf(172, 110, 150, .95, SAGED, .85) + leaf(182, 76, 30, .9, SAGE) + leaf(188, 64, 160, .8, OLIVE, .75)
    + leaf(100, 146, -70, .9, SAGE) + leaf(86, 138, -110, .8, SAGED, .85) + leaf(196, 116, 75, .9, SAGE) + leaf(212, 122, 110, .8, SAGED, .85)
    + "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/>' for x, y, r, c in ((74, 132, 7, TERRA), (222, 128, 7, TERRA), (190, 50, 6, TERRAD), (64, 124, 4, TERRA), (232, 120, 4, TERRA))),
    vb="0 0 300 300")

ART_PROP = ('<svg viewBox="0 0 160 160" aria-hidden="true" focusable="false">'
            '<circle cx="80" cy="80" r="62" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="1.4" stroke-dasharray="2 6"/>'
            + "".join(leaf(round(80 + 62*__import__("math").cos(__import__("math").radians(a)), 1), round(80 + 62*__import__("math").sin(__import__("math").radians(a)), 1), a + 180 + (30 if i % 2 else -30), .55, "#f7f2eb" if i % 3 else "#f3d3c0", .9)
                      for i, a in enumerate(range(-200, 40, 20)))
            + '<circle cx="80" cy="80" r="6" fill="#f3d3c0"/></svg>')


# ── Ilustraciones del sistema de marca (scripts/ilustraciones.py): escenas
#    con personas que muestran cada taller, en vez de objetos sueltos. ──
sys.path.insert(0, os.path.join(ROOT, "scripts"))
import ilustraciones as ILU
def ilu(nombre, w=300, cls=""):
    alt = ILU.alt_de(nombre)
    return f'<img src="img/ilustraciones/{nombre}.svg" alt="{esc(alt)}" width="{w}" height="{w}" loading="lazy" decoding="async"{cls}>'
ART_ALFA = ilu("alfabetizacion")
ART_INF = ilu("taller-cognitiva-ninos")
ART_ADU = ilu("estimulacion-cognitiva")
ART_SOC = ilu("habilidades-sociales")
ART_HERO = ilu("talleres", 380).replace(' loading="lazy"', '')

TALLERES = [
    dict(id="taller-alfabetizacion", num="Taller 01", cls="tl-card--beige", art=ART_ALFA,
         titulo="Taller de Alfabetización",
         desc="Un espacio de aprendizaje para acompañar el desarrollo de la lectura y la escritura, respetando los tiempos y las necesidades de cada participante.",
         skills=["Reconocimiento de letras y sonidos", "Relación entre sonidos y grafías", "Lectura y escritura", "Comprensión lectora", "Producción y expresión escrita"],
         dirigido="Niños y niñas que necesitan acompañamiento en sus procesos de alfabetización.",
         msg="Hola, quisiera consultar por el Taller de Alfabetización."),
    dict(id="taller-estimulacion-cognitiva-ninos", num="Taller 02", cls="tl-card--terra", art=ART_INF,
         titulo="Estimulación Cognitiva para Niños",
         desc="Propuestas lúdicas y actividades especialmente pensadas para estimular diferentes habilidades cognitivas a través del juego y la exploración.",
         skills=["Atención y concentración", "Memoria", "Lenguaje", "Pensamiento y razonamiento", "Resolución de problemas", "Flexibilidad cognitiva"],
         dirigido="Niños y niñas, con actividades adaptadas a sus edades y necesidades.",
         msg="Hola, quisiera consultar por Estimulación Cognitiva Infantil."),
    dict(id="taller-estimulacion-cognitiva-adultos", num="Taller 03", cls="tl-card--olive", art=ART_ADU,
         titulo="Estimulación Cognitiva para Adultos",
         desc="Un espacio para mantener una mente activa, ejercitar habilidades cognitivas y compartir experiencias de aprendizaje.",
         skills=["Memoria", "Atención y concentración", "Lenguaje", "Planificación", "Razonamiento", "Actividades de agilidad mental"],
         dirigido="Personas adultas y adultos mayores interesados en ejercitar y estimular sus habilidades cognitivas.",
         msg="Hola, quisiera consultar por Estimulación Cognitiva para Adultos."),
    dict(id="taller-habilidades-sociales", num="Taller 04", cls="tl-card--sage", art=ART_SOC,
         titulo="Taller de Habilidades Sociales",
         desc="Un espacio de encuentro y aprendizaje para desarrollar recursos que favorezcan la comunicación, la expresión emocional y la interacción con otras personas.",
         skills=["Comunicación y escucha", "Expresión y reconocimiento de emociones", "Empatía", "Respeto por los demás", "Cooperación", "Resolución de situaciones sociales", "Construcción de vínculos"],
         dirigido="Niños, niñas y adolescentes, según los grupos y propuestas disponibles.",
         msg="Hola, quisiera consultar por el Taller de Habilidades Sociales."),
]

FAQS = [
    ("¿Qué días y horarios tienen los talleres?", "Los días, horarios y grupos dependen de cada propuesta y de la disponibilidad del momento. Consultanos por WhatsApp por disponibilidad, grupos y horarios, y te contamos las opciones vigentes."),
    ("¿Los talleres son un tratamiento?", 'No. Los talleres son espacios de aprendizaje, desarrollo de habilidades y encuentro con otros, coordinados por el equipo de Centro Sinapsis. No reemplazan una evaluación ni un tratamiento. Si lo que necesitás es un acompañamiento terapéutico, conocé nuestros <a href="/#servicios">servicios</a>.'),
    ("¿Cómo sé qué taller es el indicado?", "Escribinos por WhatsApp contándonos para quién es y qué te gustaría trabajar. Te orientamos según las características, intereses y necesidades de cada persona, y según los grupos disponibles."),
    ("¿Dónde se realizan?", "En Centro Sinapsis, Calle 27 Nº3907 esq. 139, Berazategui. Recibimos familias y personas de Quilmes, Florencio Varela y toda la Zona Sur. Consultanos por la modalidad de cada taller."),
]

TITLE = "Talleres en Berazategui: alfabetización y más | Centro Sinapsis"
DESC = "Talleres en Berazategui: alfabetización, estimulación cognitiva para niños y adultos y habilidades sociales. Centro interdisciplinario en Zona Sur."
assert len(DESC) <= 160 and len(TITLE) <= 65, (len(TITLE), len(DESC))

ld_bc = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://sinapsiscentro.com.ar/"},
    {"@type": "ListItem", "position": 2, "name": "Talleres", "item": URL}]}
ld_page = {"@context": "https://schema.org", "@type": "CollectionPage", "name": "Talleres en Centro Sinapsis",
    "url": URL, "description": DESC, "inLanguage": "es-AR", "dateModified": FECHA,
    "isPartOf": {"@id": "https://sinapsiscentro.com.ar/#website"}, "publisher": {"@id": "https://sinapsiscentro.com.ar/#organization"},
    "mainEntity": {"@type": "ItemList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "item": {
            "@type": "Service", "@id": f"{URL}#{t['id']}", "name": t["titulo"], "description": t["desc"],
            "serviceType": "Taller", "url": f"{URL}#{t['id']}",
            "provider": {"@id": "https://sinapsiscentro.com.ar/#organization"},
            "areaServed": [{"@type": "City", "name": n} for n in ("Berazategui", "Quilmes", "Florencio Varela")],
            "audience": {"@type": "PeopleAudience", "audienceType": t["dirigido"]}}}
        for i, t in enumerate(TALLERES)]}}
ld_faq = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
    {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub(r"<[^>]+>", "", a)}} for q, a in FAQS]}
LD = "\n".join('<script type="application/ld+json">\n' + json.dumps(o, ensure_ascii=False, indent=2) + "\n</script>" for o in (ld_bc, ld_page, ld_faq))

def card(t):
    skills = "".join(f"<li>{esc(s)}</li>" for s in t["skills"])
    return f'''      <article class="tl-card {t['cls']} tl-rv" id="{t['id']}" aria-labelledby="{t['id']}-h">
        <div class="tl-card-art">{t['art']}</div>
        <div class="tl-card-body">
          <p class="tl-card-num">{t['num']}</p>
          <h3 id="{t['id']}-h">{esc(t['titulo'])}</h3>
          <p class="tl-card-desc">{esc(t['desc'])}</p>
          <h4>Trabajamos</h4>
          <ul class="tl-skills">{skills}</ul>
          <p class="tl-dirigido"><b>Dirigido a:</b> {esc(t['dirigido'])}</p>
          <a class="tl-btn tl-btn-sage" href="{wa(t['msg'])}" target="_blank" rel="noopener" aria-label="Consultar por WhatsApp: {esc(t['titulo'])}">{WA_ICON}<span>Consultar por este taller</span></a>
        </div>
      </article>'''

faq_html = "".join(
    f'\n    <div class="svc-faq-item">\n      <button class="svc-faq-q" aria-expanded="false">{esc(q)}{CHEVRON}</button>\n      <div class="svc-faq-a"><p>{a}</p></div>\n    </div>'
    for q, a in FAQS)

PAGE = f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<script>try{{if(localStorage.getItem("sinapsis_modo_accesible")==="1")document.documentElement.classList.add("modo-accesible");}}catch(e){{}}</script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(TITLE)}</title>
<meta name="description" content="{esc(DESC)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="{URL}">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icon-192.png">
<meta name="theme-color" content="#08202e">
<meta property="og:type" content="website">
<meta property="og:title" content="{esc(TITLE)}">
<meta property="og:description" content="{esc(DESC)}">
<meta property="og:url" content="{URL}">
<meta property="og:site_name" content="Centro Sinapsis">
<meta property="og:locale" content="es_AR">
<meta property="og:image" content="https://sinapsiscentro.com.ar/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Talleres en Centro Sinapsis, Berazategui y Zona Sur.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(TITLE)}">
<meta name="twitter:description" content="{esc(DESC)}">
<meta name="twitter:image" content="https://sinapsiscentro.com.ar/og-image.jpg">
{LD}
<!-- Google Analytics 4 -->
<script>
(function () {{
  var GA_ID = "G-EMSJLNLRVJ";
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {{ dataLayer.push(arguments); }};
  gtag("js", new Date());
  gtag("config", GA_ID);
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(s);
}})();
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Nunito:wght@300;400;500;600;700;800&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"></noscript>
<link rel="stylesheet" href="css/servicios.css">
<link rel="stylesheet" href="css/talleres.css">
<link rel="stylesheet" href="css/accesibilidad.css">
<script>document.documentElement.classList.add("js-ready");</script>
</head>
<body class="tl-page" data-wa-mensaje="{esc(MSG_GENERAL)}">

<a href="#main" class="skip-link">Saltar al contenido</a>

<!-- hoja reutilizable de las ilustraciones botánicas -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs><path id="tl-leaf" d="M0 0 C7 -8 8 -21 0 -32 C-8 -21 -7 -8 0 0 Z"/></defs></svg>

<nav class="svc-nav">
  <a href="/" class="svc-brand">
    <span class="logo-symbol" aria-hidden="true">✦</span>
    <div><b>CENTRO SINAPSIS</b><small>Conexiones que importan</small></div>
  </a>
  <a href="{wa(MSG_GENERAL)}" target="_blank" rel="noopener" class="svc-nav-cta" aria-label="Consultar por los talleres por WhatsApp">
    {WA_ICON}
    <span class="txt">Consultar</span>
  </a>
</nav>

<header class="tl-hero">
  <div class="tl-hero-inner">
    <div>
      <div class="svc-breadcrumb"><a href="/">Inicio</a><span>/</span><em>Talleres</em></div>
      <p class="tl-eyebrow">Aprender · Crecer · Conectar</p>
      <h1 class="tl-title">Talleres en <em>Centro Sinapsis</em></h1>
      <p class="tl-sub">Espacios para aprender, desarrollar habilidades, estimular capacidades y conectar con otros.</p>
      <p class="tl-intro">En Centro Sinapsis creemos que cada persona tiene sus propios tiempos, capacidades y maneras de aprender. Por eso proponemos talleres con actividades diseñadas para acompañar diferentes etapas de la vida, favorecer el desarrollo de habilidades y generar nuevas experiencias de aprendizaje.</p>
      <div class="tl-hero-cta">
        <a class="tl-btn tl-btn-terra" href="{wa(MSG_GENERAL)}" target="_blank" rel="noopener">{WA_ICON}<span>Consultar por los talleres</span></a>
        <a class="tl-btn tl-btn-ghost" href="#talleres-lista">Ver los talleres</a>
      </div>
    </div>
    <div class="tl-hero-art">{ART_HERO}</div>
  </div>
</header>

<main id="main">
  <section class="tl-section" id="talleres-lista" aria-labelledby="talleres-lista-h">
    <div class="tl-section-head tl-rv">
      <h2 class="tl-h2" id="talleres-lista-h">Nuestros <em>talleres</em> en Berazategui</h2>
      <p>Cuatro propuestas para distintas etapas de la vida, coordinadas por nuestro equipo interdisciplinario, en un espacio cálido y seguro.</p>
    </div>
    <div class="tl-grid">
{chr(10).join(card(t) for t in TALLERES)}
    </div>
    <div class="tl-aviso tl-rv">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
      <p><b>Consultanos por disponibilidad, grupos y horarios.</b> Las propuestas se organizan según las características y necesidades de cada participante, por eso te contamos las opciones vigentes por WhatsApp.</p>
    </div>
  </section>

  <section class="tl-propuesta" aria-labelledby="propuesta-h">
    <div class="tl-propuesta-inner tl-rv">
      <div>
        <h2 class="tl-h2" id="propuesta-h">Cada proceso es único. <em>Cada aprendizaje también.</em></h2>
        <p>En Centro Sinapsis diseñamos propuestas que contemplan las características, intereses y necesidades de cada persona. Nuestro equipo interdisciplinario trabaja desde una mirada integral, promoviendo experiencias de aprendizaje significativas y espacios de participación.</p>
        <div class="tl-propuesta-cta">
          <a class="tl-btn tl-btn-terra" href="{wa(MSG_GENERAL)}" target="_blank" rel="noopener">{WA_ICON}<span>Quiero información sobre los talleres</span></a>
        </div>
      </div>
      <div class="tl-propuesta-art">{ART_PROP}</div>
    </div>
  </section>

  <section class="tl-faq" aria-labelledby="faq-h">
    <h2 class="tl-h2 tl-rv" id="faq-h" style="margin-bottom:22px;">Preguntas frecuentes</h2>{faq_html}
  </section>
</main>

<footer class="svc-footer">
  <p class="svc-footer-contacto"><a href="tel:+5491168567160">11 6856-7160</a> · <a href="mailto:sinapsiscentro@gmail.com">sinapsiscentro@gmail.com</a> · <a href="https://www.google.com/maps/search/?api=1&query=Calle+27+N%C2%BA3907+esq.+139%2C+Berazategui%2C+Buenos+Aires" target="_blank" rel="noopener">Calle 27 Nº3907 esq. 139, Berazategui (cómo llegar)</a> · Lun a Vie 9 a 20 hs, Sáb 9 a 13 hs</p>
  <p class="svc-footer-links"><a href="alfabetizacion-berazategui.html">Alfabetización</a> · <a href="estimulacion-cognitiva-berazategui.html">Estimulación cognitiva</a> · <a href="autismo-tea-berazategui.html">Autismo / TEA</a> · <a href="centro-discapacidad-zona-sur.html">Discapacidad y CUD</a> · <a href="centro-terapeutico-zona-sur.html">Zona Sur</a> · <a href="guias.html">Guías para familias</a></p>
  <p>© <span id="footYear">2026</span> Centro Sinapsis — Conexiones que importan · Berazategui, Quilmes y Zona Sur, Bs As. · <a href="/">Volver al inicio</a> · <a href="/#servicios">Servicios</a> · <a href="equipo-profesional.html">Equipo</a> · <a href="nuestra-historia.html">Nuestra historia</a> · <a href="privacidad.html">Privacidad</a> · <a href="terminos.html">Términos</a></p>
</footer>

<script>
document.getElementById("footYear").textContent = new Date().getFullYear();
document.querySelectorAll(".svc-faq-item").forEach(function (item, index) {{
  var boton = item.querySelector(".svc-faq-q");
  var respuesta = item.querySelector(".svc-faq-a");
  var answerId = "svc-faq-answer-" + (index + 1);
  respuesta.id = answerId;
  boton.setAttribute("aria-controls", answerId);
  boton.addEventListener("click", function () {{
    var abierto = item.classList.toggle("open");
    boton.setAttribute("aria-expanded", abierto ? "true" : "false");
  }});
}});
(function () {{
  // Revela con una animación sutil lo que entra en pantalla. Además de
  // IntersectionObserver, revisa en cada scroll (y al cargar con #ancla)
  // todo lo que ya quedó arriba o visible, para que un scroll muy rápido
  // o un salto a un taller nunca deje contenido oculto.
  var pend = [].slice.call(document.querySelectorAll(".tl-rv"));
  function revisar() {{
    var lim = window.innerHeight * 0.92;
    pend = pend.filter(function (e) {{
      if (e.getBoundingClientRect().top < lim) {{ e.classList.add("in"); return false; }}
      return true;
    }});
    if (!pend.length) window.removeEventListener("scroll", programar);
  }}
  var tic = false;
  function programar() {{ if (!tic) {{ tic = true; requestAnimationFrame(function () {{ tic = false; revisar(); }}); }} }}
  window.addEventListener("scroll", programar, {{ passive: true }});
  window.addEventListener("load", revisar);
  revisar();
}})();
</script>
<script src="js/consulta.js" defer></script>
<script src="js/analytics-eventos.js" defer></script>
<script src="js/accesibilidad.js" defer></script>
</body>
</html>
'''
open(os.path.join(ROOT, "talleres.html"), "w", encoding="utf-8").write(PAGE)
print("ok", len(TITLE), len(DESC))
