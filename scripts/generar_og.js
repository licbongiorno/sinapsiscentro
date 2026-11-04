// Genera una imagen para compartir (Open Graph, 1200 x 630) para cada página de
// servicio o guía que tiene ilustración, y actualiza og:image / twitter:image
// (y el "image" del JSON-LD) en esa página. Es idempotente.
// La plantilla (scripts/plantilla_paginas.py) usa img/og/<página>.jpg si existe,
// así que regenerar las páginas no pierde la imagen.
// Uso: node scripts/generar_og.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE = 'https://sinapsiscentro.com.ar/';
const OUT = path.join(ROOT, 'img', 'og');
fs.mkdirSync(OUT, { recursive: true });

const limpiar = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/\s+/g, ' ').trim();

function datos(html) {
  const ilu = html.match(/class="svc-hero-art" src="img\/ilustraciones\/([a-z0-9-]+)\.svg/);
  const h1 = html.match(/<h1 class="svc-title">([\s\S]*?)<\/h1>/);
  const tag = html.match(/<div class="svc-tag">([\s\S]*?)<\/div>/);
  if (!ilu || !h1) return null;
  return { ilu: ilu[1], titulo: limpiar(h1[1]), tag: tag ? limpiar(tag[1]) : '' };
}

const tpl = (d, svg) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Nunito:wght@700;800&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#f4efe4;position:relative;overflow:hidden;font-family:Nunito,sans-serif}
.b1{position:absolute;width:640px;height:640px;border-radius:50%;background:#e3e9df;right:-180px;top:-120px}
.b2{position:absolute;width:420px;height:420px;border-radius:50%;background:#f1ddd3;left:-210px;bottom:-230px}
.marca{position:absolute;left:84px;top:64px;display:flex;align-items:center;gap:18px}
.mk{width:64px;height:64px;border-radius:18px;background:#08202e;color:#7ed6e4;font:34px Georgia,serif;display:grid;place-items:center}
.nm{font:700 26px 'Playfair Display',serif;letter-spacing:.14em;color:#1f2a33}
.sb{font:800 13px Nunito;letter-spacing:.24em;color:#a4593a;margin-top:3px}
.tx{position:absolute;left:84px;top:178px;width:640px}
.tag{font:800 17px Nunito;letter-spacing:.18em;text-transform:uppercase;color:#46603f}
h1{font:700 52px/1.12 'Playfair Display',serif;color:#1f2a33;margin-top:14px}
.chips{position:absolute;left:84px;bottom:56px;display:flex;gap:12px}
.chip{background:#fffdf8;border:2px solid #ddd5c5;border-radius:999px;padding:9px 20px;font:700 19px Nunito;color:#4a4a3a}
.ilu{position:absolute;right:70px;top:115px;width:400px;height:400px;border-radius:50%;background:#fbf8f2;border:2px solid #d9d2c3;box-shadow:0 18px 44px rgba(44,42,34,.12);display:grid;place-items:center}
.ilu svg{width:350px;height:350px}
</style></head><body><div class="b1"></div><div class="b2"></div>
<div class="marca"><div class="mk">✦</div><div><div class="nm">CENTRO SINAPSIS</div><div class="sb">CONEXIONES QUE IMPORTAN</div></div></div>
<div class="tx"><div class="tag">${d.tag}</div><h1 id="t">${d.titulo}</h1></div>
<div class="chips"><span class="chip">Berazategui · Zona Sur</span><span class="chip">sinapsiscentro.com.ar</span></div>
<div class="ilu">${svg}</div></body></html>`;

(async () => {
  const archivos = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1200, height: 630 } });
  let n = 0;
  for (const f of archivos) {
    const ruta = path.join(ROOT, f);
    let html = fs.readFileSync(ruta, 'utf8');
    const d = datos(html);
    if (!d) continue;
    const svg = fs.readFileSync(path.join(ROOT, 'img/ilustraciones', d.ilu + '.svg'), 'utf8').replace(/ width="300" height="300"/, '');
    await pg.setContent(tpl(d, svg), { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.fonts.ready);
    // achica el título hasta que entre en 3 líneas y no pise los chips
    await pg.evaluate(() => {
      const t = document.getElementById('t'); let s = 52;
      while ((t.getBoundingClientRect().bottom > 500 || t.scrollWidth > 640) && s > 34) { s -= 2; t.style.fontSize = s + 'px'; }
    });
    const stem = f.replace(/\.html$/, '');
    await pg.screenshot({ path: path.join(OUT, stem + '.jpg'), type: 'jpeg', quality: 84 });
    const url = `${BASE}img/og/${stem}.jpg`;
    html = html
      .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${url}$2`)
      .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${url}$2`)
      .replace(/"image": "https:\/\/sinapsiscentro\.com\.ar\/og-image\.jpg"/g, `"image": "${url}"`);
    fs.writeFileSync(ruta, html);
    n++;
  }
  await b.close();
  console.log(n, 'imágenes para compartir en img/og/');
})();
