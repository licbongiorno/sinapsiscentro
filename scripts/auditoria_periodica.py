#!/usr/bin/env python3
"""
AUDITORIA_PERIODICA.PY — Informe de salud del sitio (mensual / trimestral)
=========================================================================
Complementa a validar_seo.py (que revisa el código fuente) con chequeos
que necesitan mirar el sitio PUBLICADO y la frescura del contenido.

No modifica nada: sólo genera un informe en Markdown. Las mejoras que
surjan del informe se preparan en una rama aparte y se revisan antes de
publicarse (ver .github/workflows/auditoria-periodica.yml y
AUDITORIA_INTEGRAL_2026-11.md, sección "Sistema de mejora continua").

Uso:
  python3 scripts/auditoria_periodica.py                 # imprime el informe
  python3 scripts/auditoria_periodica.py --salida X.md   # además lo guarda
  python3 scripts/auditoria_periodica.py --sin-red       # sólo chequeos locales

Sale con código 1 si encontró problemas CRÍTICOS (sitio caído, URLs del
sitemap que no responden 200, sitemap publicado distinto del repo).
"""
import datetime as dt
import glob
import html
import json
import os
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
BASE = "https://sinapsiscentro.com.ar/"
HOY = dt.date.today()
DIAS_DESACTUALIZADO = 180
MIN_PALABRAS_SERVICIO = 600

criticos, altos, medios, info = [], [], [], []
args = sys.argv[1:]
SIN_RED = "--sin-red" in args
salida = args[args.index("--salida") + 1] if "--salida" in args else None


def get(url, metodo="GET"):
    req = urllib.request.Request(url, method=metodo, headers={"User-Agent": "SinapsisAuditoria/1.0"})

    class NoRedirect(urllib.request.HTTPRedirectHandler):
        def redirect_request(self, *a, **k):
            return None

    opener = urllib.request.build_opener(NoRedirect)
    try:
        r = opener.open(req, timeout=20)
        return r.status, dict(r.headers), r.read() if metodo == "GET" else b""
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), b""
    except Exception as e:  # red caída, DNS, timeout
        return None, {}, str(e).encode()


def texto(s):
    s = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", s, flags=re.S)
    return html.unescape(re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s))).strip()


# ── 1. Sitemap del repo ──
ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
urls = []
for u in ET.parse("sitemap.xml").getroot().findall("s:url", ns):
    urls.append((u.find("s:loc", ns).text.strip(), u.find("s:lastmod", ns).text.strip()))
info.append(f"El sitemap del repositorio lista {len(urls)} URLs.")

# ── 2. Frescura del contenido ──
viejas = [(loc, lm) for loc, lm in urls if (HOY - dt.date.fromisoformat(lm)).days > DIAS_DESACTUALIZADO]
for loc, lm in viejas:
    medios.append(f"Contenido sin revisar hace más de {DIAS_DESACTUALIZADO} días: {loc} (lastmod {lm}). Revisar vigencia y actualizar fecha.")

# ── 3. Profundidad de las páginas de servicio y coherencia FAQ visible / JSON-LD ──
for f in sorted(glob.glob("*.html")):
    s = open(f, encoding="utf-8").read()
    if 'name="robots" content="noindex' in s:
        continue
    main = s[s.find("<main"):s.find("</main>")] if "<main" in s else s
    palabras = len(texto(main).split())
    if (f.endswith("-berazategui.html") or f in ("psicopedagogia-dificultades-aprendizaje.html", "terapia-ocupacional-integracion-sensorial.html")) and palabras < MIN_PALABRAS_SERVICIO:
        medios.append(f"{f}: página de servicio con {palabras} palabras (objetivo ≥ {MIN_PALABRAS_SERVICIO}).")
    visibles = len(re.findall(r'class="(?:svc-faq-q|faq-q)"', s))
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
        try:
            o = json.loads(m.group(1))
        except Exception as e:
            criticos.append(f"{f}: JSON-LD inválido ({e}).")
            continue
        if o.get("@type") == "FAQPage" and len(o["mainEntity"]) != visibles:
            altos.append(f"{f}: el FAQPage tiene {len(o['mainEntity'])} preguntas y la página muestra {visibles} (deben coincidir).")
    if "TODO DE CONTENIDO" in s:
        info.append(f"{f}: tiene marcas TODO de contenido pendiente de confirmación.")

# ── 4. Afirmaciones que el centro todavía debe confirmar (ver SEO_GEO_CONTENT_NEEDED.md) ──
PENDIENTES = {"48 hs": "plazo de primera entrevista", "48 horas": "plazo de primera entrevista", "esta semana": "disponibilidad de turnos"}
for frase, que in PENDIENTES.items():
    n = sum(open(f, encoding="utf-8").read().count(frase) for f in glob.glob("*.html"))
    if n:
        info.append(f"«{frase}» aparece {n} veces ({que}): confirmar que sigue siendo cierto.")

# ── 5. Sitio publicado ──
if not SIN_RED:
    st, h, body = get(BASE)
    if st != 200:
        criticos.append(f"La home no responde 200 (respondió {st}).")
    else:
        if "max-age" not in h.get("strict-transport-security", h.get("Strict-Transport-Security", "")):
            altos.append("Falta la cabecera Strict-Transport-Security (HSTS).")
    st, h, _ = get("https://www.sinapsiscentro.com.ar/", "HEAD")
    if st not in (301, 308):
        medios.append(f"www → sin www responde {st}; lo ideal es una redirección permanente (301/308). Se configura en Vercel → Settings → Domains.")
    st, _, rob = get(BASE + "robots.txt")
    if st != 200 or b"Sitemap:" not in rob:
        criticos.append("robots.txt no responde o no declara el sitemap.")
    st, _, sm = get(BASE + "sitemap.xml")
    if st != 200:
        criticos.append("sitemap.xml publicado no responde 200.")
    elif sm.strip() != open("sitemap.xml", "rb").read().strip():
        altos.append("El sitemap publicado es distinto del repositorio (¿falta desplegar main?).")
    caidas = []
    for loc, _ in urls:
        st, _, cuerpo = get(loc)
        if st != 200:
            caidas.append(f"{loc} → {st}")
        elif b'content="noindex' in cuerpo:
            criticos.append(f"{loc} está en el sitemap pero tiene noindex.")
    for c in caidas:
        criticos.append(f"URL del sitemap que no responde 200: {c}")
    if not caidas:
        info.append(f"Las {len(urls)} URLs del sitemap responden 200 en producción.")
    st, _, _ = get(BASE + "pagina-que-no-existe-auditoria")
    if st != 404:
        altos.append(f"Una URL inexistente responde {st} en vez de 404 (soft 404).")

# ── Informe ──
def seccion(titulo, items):
    return f"\n### {titulo} ({len(items)})\n" + ("".join(f"- {i}\n" for i in items) if items else "- Sin hallazgos.\n")

informe = (f"# Auditoría periódica — Centro Sinapsis — {HOY.isoformat()}\n\n"
           "Informe automático. No aplica cambios: cualquier corrección se prepara en una rama aparte y se revisa antes de publicar.\n"
           + seccion("Crítico", criticos) + seccion("Alto", altos) + seccion("Medio", medios) + seccion("Información", info)
           + "\n### Revisión humana sugerida este mes\n"
             "- Search Console: cobertura, consultas nuevas con impresiones y páginas con CTR bajo.\n"
             "- Google Business Profile: responder reseñas nuevas, publicar una novedad, revisar horarios.\n"
             "- GA4: evolución de `generate_lead` por página y por canal.\n")
print(informe)
if salida:
    with open(salida, "w", encoding="utf-8") as fh:
        fh.write(informe)
sys.exit(1 if criticos else 0)
