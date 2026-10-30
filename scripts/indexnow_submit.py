#!/usr/bin/env python3
"""
INDEXNOW_SUBMIT.PY — Avisa a los buscadores que soportan IndexNow (Bing,
Yandex, Seznam.cz, Naver, etc. — Google todavía no) que las URLs del sitio
cambiaron, en vez de esperar a que las rastreen por su cuenta.
==========================================================================
No reemplaza el sitemap ni Search Console/Bing Webmaster Tools — es un
aviso activo además de eso. Un 200/202 de respuesta confirma que el aviso
llegó, no que la página ya esté indexada.

Convención: correr este script a mano después de cualquier tanda de
cambios de contenido en el sitio (mismo momento en que se corre
scripts/validar_seo.py), no automáticamente en cada commit — el sitio
es estático, sin CI.

Uso: python3 scripts/indexnow_submit.py
Sale con código 0 si el envío fue aceptado, 1 si no.
"""
import json
import os
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

HOST = "sinapsiscentro.com.ar"
KEY = "b1889cf6fd6ed4c31db894bb5827fc6d"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"

# ── Leer las URLs del sitemap (misma lógica que scripts/validar_seo.py) ──
tree = ET.parse("sitemap.xml")
ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
urls = [url.find("s:loc", ns).text.strip() for url in tree.getroot().findall("s:url", ns)]

if not urls:
    print("sitemap.xml no tiene URLs — nada para enviar.")
    sys.exit(1)

print(f"Enviando {len(urls)} URLs a IndexNow ({ENDPOINT})...")

payload = json.dumps({
    "host": HOST,
    "key": KEY,
    "keyLocation": KEY_LOCATION,
    "urlList": urls,
}).encode("utf-8")

req = urllib.request.Request(
    ENDPOINT,
    data=payload,
    headers={"Content-Type": "application/json; charset=utf-8"},
    method="POST",
)

try:
    with urllib.request.urlopen(req, timeout=20) as resp:
        print(f"Respuesta: {resp.status} {resp.reason}")
        if resp.status in (200, 202):
            print("OK — el aviso fue aceptado (200: procesado, 202: aceptado, clave en verificación).")
            sys.exit(0)
        sys.exit(1)
except urllib.error.HTTPError as e:
    body = e.read().decode("utf-8", errors="replace")
    print(f"ERROR: {e.code} {e.reason}\n{body}")
    if e.code == 403:
        print(f"→ probablemente la clave todavía no es accesible en {KEY_LOCATION} (¿ya se deployó?).")
    sys.exit(1)
except urllib.error.URLError as e:
    print(f"ERROR de conexión: {e.reason}")
    sys.exit(1)
