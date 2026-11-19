#!/usr/bin/env python3
"""
Genera las fichas imprimibles (ficha-*.html) a partir de las guías publicadas.

Cada ficha copia secciones de una guía que ya está en el sitio (mismo texto,
sin agregados), con las fuentes de esa guía y el aviso de que es material
informativo. Así nunca se publica en una ficha algo que no esté en una guía
revisada, y si la guía cambia, se vuelve a correr este script.

Las fichas llevan noindex: son una versión para imprimir, no contenido nuevo.

Uso:  python3 scripts/generar_fichas.py
"""
import html
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://sinapsiscentro.com.ar/"
TEL_WA = "5491168567160"

FICHAS = [
    dict(slug="ficha-senales-lenguaje.html", guia="retraso-lenguaje-ninos.html",
         titulo="Lenguaje: señales para consultar según la edad",
         para="Familias con niñas y niños de 1 a 3 años",
         secciones=["Señales para consultar según la edad"]),
    dict(slug="ficha-desarrollo-bebe.html", guia="senales-alerta-desarrollo-bebe.html",
         titulo="Desarrollo del bebé: qué es esperable y cuándo consultar",
         para="Familias con bebés de 0 a 12 meses",
         secciones=["Qué hace la mayoría de los bebés a cada edad", "Señales para consultar"]),
    dict(slug="ficha-anticipar-cambios-tea.html", guia="anticipacion-autismo-cambios-rutina.html",
         titulo="Autismo: cómo anticipar consultas y cambios de rutina",
         para="Familias de niñas, niños y adolescentes con TEA",
         secciones=["Herramientas que suelen ayudar", "Antes de una consulta médica"]),
    dict(slug="ficha-prevencion-caidas.html", guia="prevencion-caidas-adultos-mayores.html",
         titulo="Adultos mayores: cómo prevenir caídas",
         para="Adultos mayores y sus familias",
         secciones=["Señales de mayor riesgo", "Qué hacer para prevenir caídas"]),
]


def leer(nombre):
    with open(os.path.join(ROOT, nombre), encoding="utf-8") as f:
        return f.read()


def seccion(doc, titulo):
    m = re.search(r'<section class="svc-section">\s*<h2>' + re.escape(titulo) + r"</h2>(.*?)</section>", doc, re.S)
    if not m:
        raise SystemExit(f"No encontré la sección «{titulo}»: ¿cambió la guía?")
    cuerpo = re.sub(r'\sstyle="[^"]*"', "", m.group(1))           # estilos en línea de la web
    cuerpo = re.sub(r'\sclass="svc-nota-fuentes"', "", cuerpo)
    return cuerpo.strip()


def h1_de(doc):
    m = re.search(r"<h1[^>]*>(.*?)</h1>", doc, re.S)
    return html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip()


def ficha_html(f):
    doc = leer(f["guia"])
    bloques = "\n".join(f"<section>\n  <h2>{t}</h2>\n  {seccion(doc, t)}\n</section>" for t in f["secciones"])
    fuentes = seccion(doc, "Fuentes y referencias")
    fuentes = re.sub(r"<p>.*?</p>", "", fuentes, flags=re.S)  # el aviso va en el pie de la ficha
    guia_titulo = html.escape(h1_de(doc))
    url_guia = BASE + f["guia"]
    titulo = html.escape(f["titulo"])
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Ficha para imprimir: {titulo} | Centro Sinapsis</title>
<meta name="description" content="Versión imprimible de la guía «{guia_titulo}» de Centro Sinapsis, Berazategui.">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="{url_guia}">
<link rel="icon" href="favicon.ico" sizes="32x32">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<meta name="theme-color" content="#08202e">
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
  var cargar = function () {{ document.head.appendChild(s); }};
  if (document.readyState === "complete") cargar(); else window.addEventListener("load", function () {{ setTimeout(cargar, 1200); }});
}})();
</script>
<link rel="stylesheet" href="css/ficha.css">
</head>
<body>
<div class="fi-acciones">
  <a href="{f['guia']}">← Volver a la guía</a>
  <button type="button" id="fiImprimir">Imprimir o guardar como PDF</button>
</div>
<main class="fi-hoja">
  <header class="fi-cabecera">
    <img src="logo-sinapsis.svg" alt="" width="54" height="54">
    <div>
      <p class="fi-marca">Centro Sinapsis · Ficha para familias</p>
      <h1>{titulo}</h1>
      <p class="fi-para">{html.escape(f['para'])}</p>
    </div>
  </header>
{bloques}
  <section class="fi-fuentes">
    <h2>Fuentes</h2>
    {fuentes}
    <p>Resumen de la guía «{guia_titulo}»: {url_guia}</p>
  </section>
  <footer class="fi-pie">
    <p class="fi-aviso">Material informativo: no reemplaza una evaluación profesional. Cada persona tiene sus tiempos; una señal aislada no alcanza para sacar conclusiones. Ante la duda, consultá.</p>
    <p><b>Centro Sinapsis</b> · Calle 27 Nº3907 esq. 139, Berazategui · WhatsApp 11 6856-7160 · Lun a vie 9 a 20, sáb 9 a 13 · sinapsiscentro.com.ar</p>
  <!-- Crédito de diseño web: Lic. Nicolás Bongiorno -->
<div class="nb-credit-wrap">
  <a class="nb-credit" href="https://wa.me/5493516575261?text=Hola%20Nicol%C3%A1s%2C%20vi%20la%20web%20de%20Sinapsis%20y%20me%20gustar%C3%ADa%20una%20p%C3%A1gina%20web%20para%20mi%20proyecto." target="_blank" rel="noopener" aria-label="Diseño y desarrollo web por Lic. Nicolás Bongiorno. ¿Querés una web así? Escribile por WhatsApp al 351 657-5261">
    <span class="nb-credit__badge" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg></span>
    <span class="nb-credit__text"><span class="nb-credit__small">Diseño y desarrollo web</span><span class="nb-credit__name">Lic. Nicolás Bongiorno</span></span>
    <span class="nb-credit__cta" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm4.52 11.99c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg><span>¿Querés una web así? <strong>351 657-5261</strong></span></span>
  </a>
</div>
<style id="nb-credit-css">
.nb-credit-wrap{{display:flex;justify-content:center;width:100%;flex-basis:100%;grid-column:1/-1;margin:18px 0 6px;padding:0 12px;box-sizing:border-box}}
.nb-credit-strip{{padding:14px 12px 18px;margin:0;background:transparent}}
.nb-credit{{all:unset;box-sizing:border-box;position:relative;display:inline-flex;align-items:center;gap:12px;max-width:100%;padding:7px 18px 7px 7px;border-radius:999px;cursor:pointer;
  font:500 14px/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#F8FAFC;text-align:left;
  background:rgba(15,23,42,.92);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14),0 6px 18px -10px rgba(0,0,0,.45);
  transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s,background .4s}}
.nb-credit:hover,.nb-credit:focus-visible{{transform:translateY(-2px);background:rgba(15,23,42,.98);color:#F8FAFC;
  box-shadow:inset 0 0 0 1.5px #6CF0D0,0 12px 28px -12px rgba(108,240,208,.6)}}
.nb-credit:focus-visible{{outline:2px solid #22A6E8;outline-offset:3px}}
.nb-credit__badge{{flex:none;display:grid;place-items:center;width:36px;height:36px;border-radius:50%;color:#0B2427;
  background:linear-gradient(135deg,#6CF0D0,#9EEF1A);transition:transform .6s cubic-bezier(.34,1.56,.64,1)}}
.nb-credit:hover .nb-credit__badge{{transform:rotate(-12deg) scale(1.08)}}
.nb-credit__badge svg,.nb-credit__cta svg{{display:block;width:17px;height:17px}}
.nb-credit__text{{display:grid;gap:1px;min-width:0}}
.nb-credit__small{{font-size:10.5px;letter-spacing:.09em;text-transform:uppercase;color:#94A3B8}}
.nb-credit__name{{font-weight:700;font-size:14.5px;color:#F8FAFC}}
.nb-credit__cta{{display:inline-flex;align-items:center;gap:6px;max-width:0;opacity:0;overflow:hidden;white-space:nowrap;font-size:13px;
  transition:max-width .6s cubic-bezier(.22,1,.36,1),opacity .4s,margin .6s}}
.nb-credit__cta svg{{color:#25D366}}.nb-credit__cta{{color:#6CF0D0}}.nb-credit__cta strong{{color:#F8FAFC;font-weight:700}}
.nb-credit:hover .nb-credit__cta,.nb-credit:focus-visible .nb-credit__cta{{max-width:260px;opacity:1;margin-left:4px}}
@media (hover:none){{.nb-credit{{flex-wrap:wrap;border-radius:20px;padding-right:14px}}.nb-credit__cta{{max-width:none;opacity:1;flex-basis:100%;padding:2px 0 2px 48px;white-space:normal}}}}
@media (prefers-reduced-motion:reduce){{.nb-credit,.nb-credit *{{transition:none!important}}}}
</style>
</footer>
</main>
<script>
document.getElementById("fiImprimir").addEventListener("click", function () {{
  if (window.gtag) gtag("event", "ficha_imprimir", {{ ficha: "{f['slug'][:-5]}" }});
  window.print();
}});
</script>
</body>
</html>
"""


if __name__ == "__main__":
    for f in FICHAS:
        with open(os.path.join(ROOT, f["slug"]), "w", encoding="utf-8") as out:
            out.write(ficha_html(f))
        print("ok", f["slug"])
