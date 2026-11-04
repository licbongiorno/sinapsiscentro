// Genera las imágenes de las publicaciones de la ficha de Google (1200 x 900).
// Todo el contenido queda dentro del cuadrado central (x 150-1050), que es lo
// que muestra Google en el celular. Lee google-perfil/publicaciones/publicaciones.json.
// Uso: node scripts/generar_publicaciones_google.js
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const REPO = path.resolve(__dirname, '..');
const DIR = REPO + '/google-perfil/publicaciones';
const data = JSON.parse(fs.readFileSync(DIR + '/publicaciones.json', 'utf8'));
const logo = 'data:image/png;base64,' + fs.readFileSync(REPO + '/google-perfil/logo-sinapsis-extraido.png').toString('base64');

const FONDOS = {
  crema: { bg: '#f6f1ea', blob: '#e2f1f1', txt: '#0d2535', acento: '#1a7a8a', suave: '#3a5a6a', marca: '#0d2535' },
  celeste: { bg: '#d5f0f6', blob: '#e8f7fb', txt: '#0d2535', acento: '#1a7a8a', suave: '#3a5a6a', marca: '#0d2535' },
  noche: { bg: '#08202e', blob: '#0e3644', txt: '#ffffff', acento: '#7ed6e4', suave: '#c4dce2', marca: '#ffffff' },
};
const STAR = c => `<svg viewBox="0 0 24 24" width="24" height="24" style="flex:none;margin-top:8px"><path d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0Z" fill="${c}"/></svg>`;

function html(p) {
  const f = FONDOS[p.fondo];
  const ilu = fs.readFileSync(`${REPO}/img/ilustraciones/${p.tema}.svg`, 'utf8').replace(/ width="300" height="300"/, '');
  const lista = p.items
    ? `<ul style="list-style:none;display:grid;gap:18px;margin-top:30px">${p.items.map(i => `<li style="display:flex;gap:16px;font:400 33px/1.3 Nunito;color:${f.txt}">${STAR(f.acento)}<span>${i}</span></li>`).join('')}</ul>`
    : `<div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:30px">${p.chips.map(c => `<span style="padding:10px 20px;border-radius:999px;border:2px solid ${f.acento};font:700 27px Nunito;color:${f.txt}">${c}</span>`).join('')}</div>`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
<style>*{margin:0;box-sizing:border-box}
body{width:1200px;height:900px;background:${f.bg};position:relative;overflow:hidden;font-family:Nunito}
b{font-weight:800;color:${f.acento === '#7ed6e4' ? '#fff' : '#0e4d5c'}}
h1{font:700 68px/1.08 'Playfair Display',serif;color:${f.txt};margin-top:14px}
h1 em{font-style:italic;color:${f.acento}}
.wrap{position:absolute;left:170px;right:170px;top:40px;bottom:130px;display:flex;align-items:center;gap:34px}
.foot{position:absolute;left:170px;right:170px;bottom:36px;display:flex;align-items:center;justify-content:space-between}
</style></head><body>
<div style="position:absolute;width:620px;height:620px;border-radius:50%;background:${f.blob};right:-190px;top:-300px"></div>
<div class="wrap"><div style="flex:1;min-width:0">
 <div style="font:800 21px Nunito;letter-spacing:.2em;text-transform:uppercase;color:${f.acento}">${p.eyebrow}</div>
 <h1>${p.titulo}</h1>${lista}
 <p style="font:600 25px/1.35 Nunito;color:${f.suave};margin-top:28px">${p.nota}</p>
</div><div style="width:250px;height:250px;flex:none">${ilu}</div></div>
<div class="foot">
 <div style="display:flex;align-items:center;gap:14px">
  <div style="width:66px;height:66px;border-radius:50%;background:#fbf8f1;display:grid;place-items:center;box-shadow:0 2px 8px rgba(0,0,0,.1)"><img src="${logo}" style="width:56px;height:56px"></div>
  <div><div style="font:700 25px 'Playfair Display',serif;letter-spacing:.08em;color:${f.marca}">CENTRO SINAPSIS</div>
  <div style="font:800 15px Nunito;letter-spacing:.22em;text-transform:uppercase;color:${f.acento};margin-top:2px">Conexiones que importan</div></div>
 </div>
 <div style="font:700 21px Nunito;color:${f.acento}">sinapsiscentro.com.ar</div>
</div></body></html>`;
}

(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1200, height: 900 } });
  for (const p of data) {
    await pg.setContent(html(p), { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.fonts.ready);
    const problema = await pg.evaluate(() => {
      const r = []; const pie = document.querySelector('.foot').getBoundingClientRect().top;
      document.querySelectorAll('.wrap *, .foot *').forEach(e => {
        const q = e.getBoundingClientRect();
        if (!e.children.length && q.width && (q.left < 150 || q.right > 1050 || q.top < 30 || (e.closest('.wrap') && q.bottom > pie - 6))) r.push(e.textContent.slice(0, 25));
      });
      return r;
    });
    if (problema.length) console.log('REVISAR', p.slug, problema);
    await pg.screenshot({ path: `${DIR}/${p.slug}.jpg`, type: 'jpeg', quality: 92 });
  }
  await b.close();
  console.log(data.length, 'imágenes en google-perfil/publicaciones/');
})();
