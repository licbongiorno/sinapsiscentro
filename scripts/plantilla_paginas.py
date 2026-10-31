#!/usr/bin/env python3
"""PLANTILLA_PAGINAS.PY — Plantilla compartida de las páginas de contenido
(servicio/guía) de Centro Sinapsis: misma nav, hero con ilustración, FAQ con
FAQPage, fuentes, formulario de consulta y footer que el resto del sitio.
La usa scripts/generar_articulos.py."""
import html, json, sys, urllib.parse, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'scripts'))
import ilustraciones as ILU
BASE = "https://sinapsiscentro.com.ar/"
FECHA = "2026-10-31"
WA = "5491168567160"

WA_SVG = '<svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor" aria-hidden="true" focusable="false"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>'
CHEVRON = '<span class="svc-faq-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m6 9 6 6 6-6"/></svg></span>'

FUENTES = {
    "oms_tea": ("Organización Mundial de la Salud (OMS) — Autismo", "https://www.who.int/es/news-room/fact-sheets/detail/autism-spectrum-disorders"),
    "cdc_actearly": ("CDC — Aprenda los signos. Reaccione pronto.", "https://www.cdc.gov/ncbddd/spanish/actearly/index.html"),
    "cdc_hitos": ("CDC — Indicadores del desarrollo por edad", "https://www.cdc.gov/ncbddd/spanish/actearly/milestones/index.html"),
    "medline_tea": ("MedlinePlus (Biblioteca Nacional de Medicina de EE.UU.) — Trastorno del espectro autista", "https://medlineplus.gov/spanish/autismspectrumdisorder.html"),
    "medline_tdah": ("MedlinePlus — Trastorno por déficit de atención e hiperactividad", "https://medlineplus.gov/spanish/attentiondeficithyperactivitydisorder.html"),
    "cdc_tdah": ("CDC — TDAH", "https://www.cdc.gov/adhd/es/index.html"),
    "medline_lectura": ("MedlinePlus — Trastorno del desarrollo de la lectura (dislexia)", "https://medlineplus.gov/spanish/ency/article/001406.htm"),
    "medline_aprendizaje": ("MedlinePlus — Problemas de aprendizaje", "https://medlineplus.gov/spanish/learningdisabilities.html"),
    "medline_disgrafia": ("MedlinePlus — Disgrafía", "https://medlineplus.gov/spanish/ency/article/001543.htm"),
    "medline_fonologico": ("MedlinePlus — Trastorno fonológico", "https://medlineplus.gov/spanish/ency/article/001541.htm"),
    "medline_habla_ninos": ("MedlinePlus — Problemas del habla y lenguaje en niños", "https://medlineplus.gov/spanish/speechandlanguageproblemsinchildren.html"),
    "medline_tartamudez": ("MedlinePlus — Tartamudez", "https://medlineplus.gov/spanish/stuttering.html"),
    "medline_ansiedad": ("MedlinePlus — Ansiedad", "https://medlineplus.gov/spanish/anxiety.html"),
    "medline_separacion": ("MedlinePlus — Ansiedad por la separación en los niños", "https://medlineplus.gov/spanish/ency/article/001542.htm"),
    "medline_memoria": ("MedlinePlus — Memoria", "https://medlineplus.gov/spanish/memory.html"),
    "medline_dcl": ("MedlinePlus — Deterioro cognitivo leve", "https://medlineplus.gov/spanish/mildcognitiveimpairment.html"),
    "oms_demencia": ("Organización Mundial de la Salud (OMS) — Demencia", "https://www.who.int/es/news-room/fact-sheets/detail/dementia"),
    "medline_caidas": ("MedlinePlus — Caídas", "https://medlineplus.gov/spanish/falls.html"),
    "oms_caidas": ("Organización Mundial de la Salud (OMS) — Caídas", "https://www.who.int/es/news-room/fact-sheets/detail/falls"),
    "medline_habla": ("MedlinePlus — Trastornos del habla y la comunicación", "https://medlineplus.gov/spanish/speechandcommunicationdisorders.html"),
    "ley24901": ("Ley 24.901 — Sistema de prestaciones básicas para personas con discapacidad (Argentina.gob.ar)", "https://www.argentina.gob.ar/normativa/nacional/ley-24901-47677"),
    "cud": ("Argentina.gob.ar — Cómo obtener el Certificado Único de Discapacidad (CUD)", "https://www.argentina.gob.ar/servicio/como-obtener-el-certificado-unico-de-discapacidad-cud"),
}

REL = {
    "tea": ("autismo-tea-berazategui.html", "Autismo / TEA", "Acompañamiento integral"),
    "senales": ("senales-autismo-ninos.html", "Señales de autismo", "Guía para familias"),
    "disc": ("centro-discapacidad-zona-sur.html", "Discapacidad y CUD", "Prestaciones"),
    "tdah": ("tdah-berazategui.html", "TDAH", "Atención e impulsividad"),
    "lenguaje": ("retraso-lenguaje-ninos.html", "Mi hijo no habla", "Lenguaje"),
    "ados": ("evaluacion-ados-2-adi-r-berazategui.html", "Evaluación ADOS-2 y ADI-R", "Diagnóstico de TEA"),
    "fono": ("fonoaudiologia-berazategui.html", "Fonoaudiología", "Lenguaje y habla"),
    "to": ("terapia-ocupacional-integracion-sensorial.html", "Terapia Ocupacional", "Integración sensorial"),
    "psico": ("psicologia-berazategui.html", "Psicología", "Salud mental"),
    "psicoped": ("psicopedagogia-dificultades-aprendizaje.html", "Psicopedagogía", "Aprendizaje"),
    "temprana": ("estimulacion-temprana-berazategui.html", "Estimulación Temprana", "Bebés y niños pequeños"),
    "neuro": ("evaluacion-neurocognitiva-berazategui.html", "Evaluación Neurocognitiva", "Neuropsicología"),
    "psicodx": ("psicodiagnostico-berazategui.html", "Psicodiagnóstico", "Diagnóstico"),
    "obras": ("obras-sociales-prepagas.html", "Coberturas por discapacidad", "Obras sociales y prepagas"),
    "zona": ("centro-terapeutico-zona-sur.html", "Zona Sur", "Quilmes, Varela y alrededores"),
    "kine": ("kinesiologia-adultos-mayores-berazategui.html", "Kinesiología", "Adultos mayores"),
    "estcog": ("estimulacion-cognitiva-berazategui.html", "Estimulación Cognitiva", "Memoria y atención"),
    "alfa": ("alfabetizacion-berazategui.html", "Alfabetización", "Lectura y escritura"),
    "talleres": ("talleres.html", "Talleres", "Aprender y conectar"),
    "guias": ("guias.html", "Guías para familias", "Todos los artículos"),
    "dislexia": ("dislexia-senales-ninos.html", "Dislexia", "Lectura"),
    "pronun": ("problemas-pronunciacion-ninos.html", "Pronunciación", "Dislalias"),
    "tarta": ("tartamudez-ninos.html", "Tartamudez", "Fluidez del habla"),
    "ansiedad": ("ansiedad-en-ninos.html", "Ansiedad en la infancia", "Emociones"),
    "sensorial": ("integracion-sensorial-senales.html", "Integración sensorial", "Sentidos"),
    "olvidos": ("olvidos-memoria-adultos-mayores.html", "Olvidos y memoria", "Adultos mayores"),
    "caidas": ("prevencion-caidas-adultos-mayores.html", "Prevención de caídas", "Adultos mayores"),
}


def ilu_img(p):
    n = p["ilu"]
    alt = "Ilustración: " + ILU.ILUSTRACIONES[n][1][0].lower() + ILU.ILUSTRACIONES[n][1][1:]
    return f'<img class="svc-hero-art" src="img/ilustraciones/{n}.svg" alt="{esc(alt)}" width="260" height="260" decoding="async">'


def strip_tags(s):
    import re
    return re.sub(r"<[^>]+>", "", s)


def wa_link(msg):
    return f"https://wa.me/{WA}?text=" + urllib.parse.quote(msg, safe="")


def esc(s):
    return html.escape(s, quote=True)


def page(p):
    url = BASE + p["slug"]
    title = p["title"]
    desc = p["desc"]
    assert len(desc) <= 160, (p["slug"], len(desc))
    wa = wa_link(p["wa"])
    breadcrumb = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Inicio", "item": BASE},
            {"@type": "ListItem", "position": 2, "name": p["crumb_parent"][0], "item": BASE + p["crumb_parent"][1]},
            {"@type": "ListItem", "position": 3, "name": p["crumb"], "item": url},
        ],
    }
    webpage = {
        "@context": "https://schema.org", "@type": "MedicalWebPage",
        "name": p["h1"], "url": url, "description": desc, "inLanguage": "es-AR",
        "isPartOf": {"@id": BASE + "#website"},
        "about": p["about"],
        "audience": p.get("audience", {"@type": "PeopleAudience", "audienceType": "Familias y pacientes de Berazategui, Quilmes, Florencio Varela y Zona Sur"}),
        "publisher": {"@id": BASE + "#organization"},
        "provider": {"@id": BASE + "#organization"},
        "dateModified": FECHA,
    }
    if p.get("articulo"):
        webpage.update({"headline": p["h1"], "datePublished": FECHA, "author": {"@id": BASE + "#organization"},
                        "image": BASE + "og-image.jpg", "isAccessibleForFree": True, "lastReviewed": FECHA})
    if p.get("sources"):
        webpage["citation"] = [FUENTES[k][1] for k in p["sources"]]
    faq = {
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": strip_tags(a)}}
            for q, a in p["faqs"]
        ],
    }
    ld = "\n".join(
        '<script type="application/ld+json">\n' + json.dumps(o, ensure_ascii=False, indent=2) + "\n</script>"
        for o in (breadcrumb, webpage, faq)
    )
    faq_html = "".join(
        f'<div class="svc-faq-item">\n      <button class="svc-faq-q" aria-expanded="false">{esc(q)}{CHEVRON}</button>\n      <div class="svc-faq-a"><p>{a}</p></div>\n    </div>'
        for q, a in p["faqs"]
    )
    fuentes_html = ""
    if p.get("sources"):
        items = "".join(f'<li><a href="{FUENTES[k][1]}" target="_blank" rel="noopener">{esc(FUENTES[k][0])}</a></li>' for k in p["sources"])
        fuentes_html = f'''
  <section class="svc-section">
    <h2>Fuentes y referencias</h2>
    <ul>{items}</ul>
    <p class="svc-nota-fuentes">Esta página es informativa y no reemplaza una evaluación profesional. Si algo de lo que leíste te preocupa, lo mejor es consultar.</p>
  </section>'''
    rel_html = "".join(
        f'<a class="svc-rel-card" href="{REL[k][0]}"><b>{esc(REL[k][1])}</b><span>{esc(REL[k][2])}</span></a>'
        for k in p["related"]
    )
    og_alt = f"{p['crumb']} — Centro Sinapsis, Berazategui, Quilmes y Zona Sur."
    return f'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<script>try{{if(localStorage.getItem("sinapsis_modo_accesible")==="1")document.documentElement.classList.add("modo-accesible");}}catch(e){{}}</script>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="{url}">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="manifest" href="manifest.json">
<link rel="apple-touch-icon" href="icon-192.png">
<meta name="theme-color" content="#08202e">
<meta property="og:type" content="{'article' if p.get('articulo') else 'website'}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:site_name" content="Centro Sinapsis">
<meta property="og:locale" content="es_AR">
<meta property="og:image" content="https://sinapsiscentro.com.ar/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{esc(og_alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="https://sinapsiscentro.com.ar/og-image.jpg">
{ld}
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
<link rel="stylesheet" href="css/consulta.css">
<link rel="stylesheet" href="css/accesibilidad.css">
</head>
<body data-wa-mensaje="{esc(p['wa'])}">

<a href="#main" class="skip-link">Saltar al contenido</a>

<nav class="svc-nav">
  <a href="/" class="svc-brand">
    <span class="logo-symbol" aria-hidden="true">✦</span>
    <div><b>CENTRO SINAPSIS</b><small>Conexiones que importan</small></div>
  </a>
  <a href="{wa}" target="_blank" rel="noopener" class="svc-nav-cta" aria-label="Consultar por WhatsApp">
    {WA_SVG}
    <span class="txt">Consultar</span>
  </a>
</nav>


<header class="svc-hero svc-hero--ilustrada">
  <div class="svc-hero-inner">
   <div class="svc-hero-texto">
    <div class="svc-breadcrumb"><a href="/">Inicio</a><span>/</span><a href="{p['crumb_parent'][1] if p['crumb_parent'][1] else '/'}">{esc(p['crumb_parent'][0])}</a><span>/</span><em>{esc(p['crumb'])}</em></div>
    <div class="svc-tag">{esc(p['tag'])}</div>
    <h1 class="svc-title">{esc(p['h1'])}</h1>
    <p class="svc-lead">{p['lead']}</p>
    <div class="svc-hero-cta">
      <a href="{wa}" target="_blank" rel="noopener" class="svc-btn-main">
        <span>{esc(p.get('cta', 'Consultar por WhatsApp'))}</span><span class="arrow" aria-hidden="true">→</span>
      </a>
      <a href="#consulta" class="svc-btn-ghost">Armar mi consulta</a>
    </div>
    <ul class="svc-hero-promesas" aria-label="Lo que ofrecemos">
      <li>Sin derivación médica previa</li>
      <li>Con y sin CUD</li>
      <li>Primera entrevista en menos de 48 hs</li>
    </ul>
   </div>
    {ilu_img(p)}
  </div>
</header>


<main id="main" class="svc-main">
{p['body']}

  <section class="svc-section">
    <h2>Cómo empezamos</h2>
    <div class="svc-pasos"><div class="svc-paso"><div class="svc-paso-num">1</div><div><h3>Nos escribís</h3><p>Por WhatsApp, con tus palabras. No hace falta tener un diagnóstico ni una derivación: alcanza con contarnos qué te preocupa.</p></div></div><div class="svc-paso"><div class="svc-paso-num">2</div><div><h3>Primera entrevista</h3><p>Nos conocemos, escuchamos la historia completa y te explicamos qué opciones hay. Sin apuro y sin etiquetas apresuradas.</p></div></div><div class="svc-paso"><div class="svc-paso-num">3</div><div><h3>Plan de trabajo</h3><p>Definimos juntos qué profesionales del equipo intervienen, con qué frecuencia y cómo se articula con la familia y la escuela.</p></div></div></div>
  </section>

  <div class="svc-cud-strip">
    <svg viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>
    <div>
      <h3>Trabajamos con y sin CUD</h3>
      <p>Con CUD, mirá cómo funcionan las <a href="centro-discapacidad-zona-sur.html">prestaciones por discapacidad</a> y el <a href="obras-sociales-prepagas.html">listado de coberturas</a>. Sin CUD, atendemos por reintegro con cualquier obra social, según tu plan.</p>
    </div>
  </div>

  <section class="svc-section" id="consulta">
    <div data-consulta data-motivo="{esc(p['motivo'])}"></div>
  </section>

  <section class="svc-section">
    <h2>Preguntas frecuentes</h2>
    {faq_html}
  </section>
{fuentes_html}

  <section class="svc-section svc-relacionados">
    <h2>También te puede servir</h2>
    <div class="svc-rel-grid">{rel_html}</div>
  </section>
<section class="svc-cta-final">
  <h2>{esc(p.get('cta_final_h', '¿Empezamos?'))}</h2>
  <p>{esc(p.get('cta_final_p', 'Contanos tu situación por WhatsApp y coordinamos la primera entrevista, sin derivación previa.'))}</p>
  <a href="{wa}" target="_blank" rel="noopener" class="svc-btn-main" style="display:inline-flex;">
    <span>{esc(p.get('cta', 'Consultar por WhatsApp'))}</span><span class="arrow" aria-hidden="true">→</span>
  </a>
</section>
</main>

<footer class="svc-footer">
  <p class="svc-footer-contacto"><a href="tel:+5491168567160">11 6856-7160</a> · <a href="mailto:sinapsiscentro@gmail.com">sinapsiscentro@gmail.com</a> · <a href="https://www.google.com/maps/search/?api=1&query=Calle+27+N%C2%BA3907+esq.+139%2C+Berazategui%2C+Buenos+Aires" target="_blank" rel="noopener">Calle 27 Nº3907 esq. 139, Berazategui (cómo llegar)</a> · Lun a Vie 9 a 20 hs, Sáb 9 a 13 hs</p>
  <p class="svc-footer-links"><a href="autismo-tea-berazategui.html">Autismo / TEA</a> · <a href="centro-discapacidad-zona-sur.html">Discapacidad y CUD</a> · <a href="senales-autismo-ninos.html">Señales de autismo</a> · <a href="tdah-berazategui.html">TDAH</a> · <a href="retraso-lenguaje-ninos.html">Retraso del lenguaje</a> · <a href="centro-terapeutico-zona-sur.html">Zona Sur</a> · <a href="talleres.html">Talleres</a> · <a href="guias.html">Guías para familias</a></p>
  <p>© <span id="footYear">2026</span> Centro Sinapsis — Conexiones que importan · Berazategui, Quilmes y Zona Sur, Bs As. · <a href="/">Volver al inicio</a> · <a href="equipo-profesional.html">Equipo</a> · <a href="nuestra-historia.html">Nuestra historia</a> · <a href="privacidad.html">Privacidad</a> · <a href="terminos.html">Términos</a></p>
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
</script>
<script src="js/consulta.js" defer></script>
<script src="js/analytics-eventos.js" defer></script>
<script src="js/accesibilidad.js" defer></script>
</body>
</html>
'''


def sec(h2, inner):
    return f'''  <section class="svc-section">
    <h2>{h2}</h2>
    {inner}
  </section>
'''


def ul(items):
    return "<ul>" + "".join(f"<li>{i}</li>" for i in items) + "</ul>"


def card(h3, p):
    return f'<div style="margin-bottom:18px;"><h3 style="font-size:1rem;font-weight:700;color:var(--navy);margin-bottom:6px;">{h3}</h3><p style="margin:0;">{p}</p></div>'


