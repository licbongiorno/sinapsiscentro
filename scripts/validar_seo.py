#!/usr/bin/env python3
"""
VALIDAR_SEO.PY — Script de validación reutilizable para SEO/GEO técnico.
==========================================================================
Corre sobre el código fuente real del sitio (no sobre nada desplegado).
No necesita conexión a internet: valida estructura, no accesibilidad
HTTP en vivo. Pensado para correrse de nuevo cada vez que se toquen
títulos, meta descriptions, canonicals, JSON-LD, el sitemap o los
enlaces internos.

Uso: python3 scripts/validar_seo.py
Sale con código 0 si todo pasó, 1 si encontró algún error.
"""
import glob
import json
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

errores = []
avisos = []

def err(msg):
    errores.append(msg)

def warn(msg):
    avisos.append(msg)


# ── 1. Cargar sitemap.xml ──
sitemap_path = "sitemap.xml"
sitemap_locs = []
try:
    tree = ET.parse(sitemap_path)
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    for url in tree.getroot().findall("s:url", ns):
        loc = url.find("s:loc", ns).text.strip()
        lastmod = url.find("s:lastmod", ns)
        sitemap_locs.append(loc)
        if "www.sinapsiscentro" in loc:
            err(f"sitemap.xml: URL con www (debe ser sin www): {loc}")
        if "?" in loc or "#" in loc:
            err(f"sitemap.xml: URL con parámetros/fragmento (no debería estar en el sitemap): {loc}")
        if lastmod is None or not re.match(r"^\d{4}-\d{2}-\d{2}$", lastmod.text.strip()):
            err(f"sitemap.xml: lastmod inválido o ausente en {loc}")
except Exception as e:
    err(f"sitemap.xml no es XML válido: {e}")

print(f"sitemap.xml: {len(sitemap_locs)} URLs listadas")

# cada URL del sitemap debe mapear a un archivo local real
for loc in sitemap_locs:
    path = loc.replace("https://sinapsiscentro.com.ar/", "")
    local = path if path else "index.html"
    if not os.path.isfile(local):
        err(f"sitemap.xml: {loc} no corresponde a ningún archivo local ({local})")

# ── 2. robots.txt ──
with open("robots.txt", encoding="utf-8") as f:
    robots = f.read()
if "www.sinapsiscentro" in robots:
    err("robots.txt: referencia con www (debe ser sin www)")
if "sinapsiscentro.com.ar/sitemap.xml" not in robots:
    err("robots.txt: no referencia el sitemap correctamente")
if re.search(r"^Disallow:\s*/(css|js)/?\s*$", robots, re.M):
    err("robots.txt: bloquea /css/ o /js/ (rompería el renderizado)")
print("robots.txt: OK (sin bloqueos de CSS/JS, referencia sitemap sin www)")

# ── 3. Auditoría por página HTML ──
PAGINAS_INDEXABLES = sorted(set(
    p for p in glob.glob("*.html")
    if p not in ("404.html", "offline.html", "buscar.html")
))

titles_vistos = {}
descs_vistos = {}

for pagina in PAGINAS_INDEXABLES:
    with open(pagina, encoding="utf-8") as f:
        html = f.read()

    es_noindex = bool(re.search(r'<meta\s+name="robots"\s+content="noindex', html))

    # título
    m = re.search(r"<title>(.*?)</title>", html, re.S)
    if not m:
        err(f"{pagina}: falta <title>")
    else:
        title = m.group(1).strip()
        if not es_noindex:
            if title in titles_vistos:
                err(f"{pagina}: <title> duplicado con {titles_vistos[title]}: \"{title}\"")
            titles_vistos[title] = pagina
        if not es_noindex and len(title) > 65:
            warn(f"{pagina}: title largo ({len(title)} caracteres): \"{title}\"")

    # las páginas noindex son shells dinámicos (juego.html, ejercicio.html, etc.):
    # su title/meta description/H1 reales los pone JS según el ?id=, así que no
    # tiene sentido pedirles metadata estática — sólo se valida que existan y
    # los shells de HTML válido, no su contenido.
    if es_noindex:
        continue

    # meta description
    m = re.search(r'<meta\s+name="description"\s+content="(.*?)"', html, re.S)
    if not m:
        err(f"{pagina}: falta meta description")
    else:
        desc = m.group(1).strip()
        if desc in descs_vistos:
            err(f"{pagina}: meta description duplicada con {descs_vistos[desc]}")
        descs_vistos[desc] = pagina
        if not (120 <= len(desc) <= 165):
            warn(f"{pagina}: meta description fuera de 120-165 caracteres ({len(desc)}): \"{desc[:60]}...\"")

    # canonical
    m = re.search(r'<link\s+rel="canonical"\s+href="(.*?)"', html)
    if not m:
        err(f"{pagina}: falta <link rel=\"canonical\">")
    else:
        canon = m.group(1)
        if "www." in canon:
            err(f"{pagina}: canonical apunta a www: {canon}")
        if "?" in canon or (canon.endswith("index.html")):
            err(f"{pagina}: canonical con parámetros o apuntando a index.html: {canon}")
        esperado = f"https://sinapsiscentro.com.ar/{pagina if pagina != 'index.html' else ''}"
        if canon != esperado:
            err(f"{pagina}: canonical ({canon}) no coincide con la URL esperada ({esperado})")

    # H1 único
    h1s = re.findall(r"<h1[ >]", html)
    if len(h1s) == 0:
        err(f"{pagina}: no tiene H1")
    elif len(h1s) > 1:
        err(f"{pagina}: tiene {len(h1s)} H1 (debería ser 1)")

    # lang
    if 'lang="es"' not in html[:200]:
        warn(f"{pagina}: <html> no tiene lang=\"es\" al principio del archivo")

    # og:url sin www
    m = re.search(r'<meta\s+property="og:url"\s+content="(.*?)"', html)
    if m and "www." in m.group(1):
        err(f"{pagina}: og:url apunta a www: {m.group(1)}")

    # href="#" sueltos (excluyendo los que abren un acordeón con JS legítimo, ej botones con role=button)
    hrefs_vacios = re.findall(r'<a\s+[^>]*href="#"[^>]*>', html)
    if hrefs_vacios:
        warn(f"{pagina}: {len(hrefs_vacios)} <a href=\"#\"> (revisar si deberían ser <button>)")

    # JSON-LD válido
    bloques = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
    for i, b in enumerate(bloques):
        try:
            json.loads(b)
        except json.JSONDecodeError as e:
            err(f"{pagina}: bloque JSON-LD #{i} inválido: {e}")

print(f"{len(PAGINAS_INDEXABLES)} páginas HTML auditadas (title/description/canonical/H1/JSON-LD)")

# ── 4. Enlaces internos rotos (href locales, sin # ni protocolo externo) ──
for pagina in PAGINAS_INDEXABLES:
    with open(pagina, encoding="utf-8") as f:
        html = f.read()
    hrefs = re.findall(r'href="([^"]+)"', html)
    for href in hrefs:
        if href.startswith(("http://", "https://", "mailto:", "tel:", "#", "javascript:")):
            continue
        target = href.split("#")[0].split("?")[0]
        if not target or target == "/":
            continue  # la raíz "/" la sirve index.html (ver vercel.json)
        target = target.lstrip("/")
        if not os.path.isfile(target):
            err(f"{pagina}: enlace interno roto → {href}")

print("Enlaces internos verificados (archivos locales referenciados por href)")

# ── Resumen ──
print()
print(f"AVISOS ({len(avisos)}):")
for a in avisos:
    print(f"  - {a}")
print()
print(f"ERRORES ({len(errores)}):")
for e in errores:
    print(f"  - {e}")

if errores:
    sys.exit(1)
sys.exit(0)
