// Genera las imágenes PNG de una semana de Instagram.
// Uso: node redes/_motor/generar.js semana-01
// Lee redes/<semana>/piezas.js y deja los PNG en redes/<semana>/<pieza>/.
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");

const semana = process.argv[2] || "semana-01";
const raiz = path.resolve(__dirname, "..", "..");
const dirSemana = path.join(raiz, "redes", semana);
const piezas = require(path.join(dirSemana, "piezas.js"));
const css = fs.readFileSync(path.join(__dirname, "estilos.css"), "utf8");

// Las ilustraciones de la web se insertan inline para que no dependan de rutas.
function ilus(nombre, clase = "") {
  const svg = fs.readFileSync(path.join(raiz, "img", "ilustraciones", nombre + ".svg"), "utf8");
  return `<div class="ilus ${clase}">${svg.replace("<svg ", '<svg width="100%" height="100%" ')}</div>`;
}

function pie(i, total, esStory) {
  const marca = `<span class="marca"><i>✦</i>@sinapsiscentro</span>`;
  if (esStory) return `<div class="pie">${marca}<span>sinapsiscentro.com.ar</span></div>`;
  const der = i < total - 1 ? `<span class="desliza">${i + 1}/${total} · Deslizá →</span>` : `<span>${i + 1}/${total}</span>`;
  return `<div class="pie">${marca}${der}</div>`;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  for (const pieza of piezas) {
    const esStory = pieza.tipo === "story";
    const placas = pieza.placas({ ilus });
    const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,700&display=swap" rel="stylesheet">
      <style>${css}</style></head><body>
      ${placas.map((p, i) => `<section class="slide ${esStory ? "story" : ""} ${p.clase || ""}">${p.html}${pie(i, placas.length, esStory)}</section>`).join("\n")}
      </body></html>`;
    await page.setContent(html, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(dirSemana, pieza.id);
    fs.rmSync(out, { recursive: true, force: true });
    fs.mkdirSync(out, { recursive: true });
    const slides = await page.$$(".slide");
    for (let i = 0; i < slides.length; i++) {
      // Aviso si el contenido se sale de la placa
      const desborda = await slides[i].evaluate((el) => el.scrollHeight > el.clientHeight + 2);
      if (desborda) console.warn(`  ⚠ ${pieza.id} placa ${i + 1} desborda`);
      await slides[i].screenshot({ path: path.join(out, `${String(i + 1).padStart(2, "0")}.png`) });
    }
    console.log(`✓ ${pieza.id}: ${slides.length} imagen(es)`);
  }
  await browser.close();
})();
