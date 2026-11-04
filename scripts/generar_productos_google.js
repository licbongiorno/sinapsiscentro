// Genera las imágenes cuadradas de los Productos de la ficha de Google.
// Uso: node scripts/generar_productos_google.js  (lee google-perfil/productos.json)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const repo = path.resolve(__dirname, '..');
const out = repo + '/google-perfil/productos';
fs.mkdirSync(out, { recursive: true });
const data = JSON.parse(fs.readFileSync(repo + '/google-perfil/productos.json', 'utf8'));
const tpl = (p, svg) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Nunito:wght@600;700;800&display=swap" rel="stylesheet">
<style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:1200px;background:#f4efe4;position:relative;overflow:hidden;font-family:Nunito,sans-serif;color:#1f2a33}
.b1{position:absolute;width:760px;height:760px;border-radius:50%;background:#e3e9df;right:-260px;top:-240px}
.b2{position:absolute;width:560px;height:560px;border-radius:50%;background:#f1ddd3;left:-260px;bottom:-240px}
.logo{position:absolute;left:80px;top:72px;display:flex;align-items:center;gap:24px}
.mark{width:84px;height:84px;border-radius:22px;background:#08202e;color:#7ed6e4;font:44px Georgia,serif;display:grid;place-items:center}
.nm{font:700 34px 'Playfair Display',serif;letter-spacing:.14em;color:#1f2a33}
.sb{font:800 17px Nunito;letter-spacing:.24em;color:#a4593a;margin-top:4px}
.ilus{position:absolute;left:50%;top:205px;transform:translateX(-50%);width:500px;height:500px;border-radius:50%;background:#fbf8f2;box-shadow:0 20px 50px rgba(44,42,34,.12);display:grid;place-items:center;border:2px solid #d9d2c3}
.ilus svg{width:440px;height:440px}
.tx{position:absolute;left:80px;right:80px;top:760px;text-align:center}
h1{font:500 88px/1.05 'Playfair Display',serif;color:#1f2a33}
h2{font:italic 500 50px/1.15 'Playfair Display',serif;color:#46603f;margin-top:14px}
.chips{display:flex;justify-content:center;gap:18px;margin-top:38px}
.chip{background:#fffdf8;border:2px solid #ddd5c5;border-radius:999px;padding:14px 30px;font:700 27px Nunito;color:#4a4a3a}
.ft{position:absolute;bottom:40px;width:100%;text-align:center;font:700 22px Nunito;letter-spacing:.08em;color:#6b6a5a}
</style></head><body><div class="b1"></div><div class="b2"></div>
<div class="logo"><div class="mark">✦</div><div><div class="nm">CENTRO SINAPSIS</div><div class="sb">BERAZATEGUI · ZONA SUR</div></div></div>
<div class="ilus">${svg}</div>
<div class="tx"><h1>${p.t1}</h1><h2>${p.t2}</h2><div class="chips">${p.chips.map(c=>`<span class="chip">${c}</span>`).join('')}</div></div>
<div class="ft">SINAPSISCENTRO.COM.AR</div></body></html>`;
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
  for (const p of data) {
    let svg = fs.readFileSync(`${repo}/img/ilustraciones/${p.ilus}.svg`, 'utf8').replace(/ width="300" height="300"/, '');
    await pg.setContent(tpl(p, svg), { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.fonts.ready);
    const fits = await pg.evaluate(() => document.querySelector('.ft').getBoundingClientRect().top - document.querySelector('.chips').getBoundingClientRect().bottom);
    if (fits < 20) console.log('APRETADO', p.slug, fits);
    await pg.screenshot({ path: `${out}/${p.slug}.jpg`, type: 'jpeg', quality: 88 });
  }
  console.log(await pg.evaluate(() => document.fonts.check('500 40px "Playfair Display"')));
  await b.close();
})();
