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
