/**
 * PRUEBAS DE HUMO — Centro Sinapsis
 * ==================================
 * Abre las páginas del repositorio en Chromium (Playwright) y falla si:
 *  - alguna página lanza un error de JavaScript no capturado;
 *  - aparece desplazamiento horizontal en celular (390 px);
 *  - un enlace de WhatsApp no apunta al número del centro;
 *  - un juego del catálogo marcado como disponible no carga o rompe.
 *
 * No necesita servidor: sirve los archivos del repo desde disco
 * interceptando un dominio ficticio (http://sinapsis.test).
 *
 * Uso:  node tests/smoke.js            (todo)
 *       node tests/smoke.js --rapido   (páginas + 12 juegos)
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE = "http://sinapsis.test/";
const TEL = "5491168567160";
const MIME = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".json": "application/json",
  ".mp3": "audio/mpeg", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml",
};
const RAPIDO = process.argv.includes("--rapido");

const { JUEGOS } = require(path.join(ROOT, "data/juegos-catalogo.js"));

// Todas las páginas HTML indexables + las utilitarias con parámetros reales.
const paginas = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html") && f !== "juego.html");
paginas.push("ejercicio.html?id=" + primerId("data/ejercicios.js"));

function primerId(archivo) {
  const m = fs.readFileSync(path.join(ROOT, archivo), "utf8").match(/id:\s*"([^"]+)"/);
  return m ? m[1] : "";
}

async function servirDesdeDisco(ctx) {
  await ctx.route(BASE + "**", (r) => {
    let u = decodeURIComponent(new URL(r.request().url()).pathname);
    if (u.endsWith("/")) u += "index.html";
    const f = path.join(ROOT, u);
    if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) {
      return r.fulfill({ status: 404, body: "no encontrado" });
    }
    r.fulfill({ status: 200, body: fs.readFileSync(f), contentType: MIME[path.extname(f)] || "application/octet-stream" });
  });
  // Analytics y widgets de terceros no hacen falta para probar el sitio.
  await ctx.route(/googletagmanager|google-analytics|snapwidget/, (r) => r.abort());
}

async function revisar(ctx, url, { juego } = {}) {
  const p = await ctx.newPage();
  const errores = [];
  p.on("pageerror", (e) => errores.push("JS: " + e.message));
  p.on("console", (m) => {
    if (m.type() === "error" && (m.location().url || "").startsWith(BASE)) errores.push("consola: " + m.text());
  });
  try {
    await p.goto(BASE + url, { waitUntil: "load", timeout: 30000 });
    await p.waitForTimeout(600);
    if (juego) {
      const empezar = p.locator("#jgEmpezar");
      if (await empezar.count()) await empezar.click();
      await p.waitForTimeout(900);
      const vacio = await p.evaluate(() => {
        const c = document.getElementById("jgContenedor");
        const area = document.getElementById("juego-area");
        return !area || area.hidden || !c || c.children.length === 0;
      });
      if (vacio) errores.push("el juego no dibujó nada en #jgContenedor");
    }
    const ancho = await p.evaluate(() => document.documentElement.scrollWidth);
    if (ancho > 392) errores.push(`desborde horizontal: ${ancho}px en 390px`);
    const malos = await p.evaluate((tel) =>
      [...document.querySelectorAll('a[href*="wa.me/"]')].map((a) => a.href).filter((h) => !h.includes("wa.me/" + tel)), TEL);
    if (malos.length) errores.push("WhatsApp con otro número: " + malos[0]);
  } catch (e) {
    errores.push("carga: " + e.message.split("\n")[0]);
  }
  await p.close();
  return errores;
}

async function enParalelo(items, n, fn) {
  const out = [];
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const it = items[i++]; out.push(await fn(it)); }
  }));
  return out;
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
  await servirDesdeDisco(ctx);

  let juegos = JUEGOS.filter((j) => j.disponible && !j.necesita);
  if (RAPIDO) juegos = juegos.filter((_, i) => i % Math.ceil(juegos.length / 12) === 0);

  const fallas = [];
  const resPaginas = await enParalelo(paginas, 4, async (pg) => [pg, await revisar(ctx, pg)]);
  const resJuegos = await enParalelo(juegos, 4, async (j) => ["juego " + j.id, await revisar(ctx, "juego.html?id=" + j.id, { juego: true })]);

  for (const [nombre, errs] of [...resPaginas, ...resJuegos]) if (errs.length) fallas.push([nombre, errs]);

  // Integridad del catálogo: cada juego disponible tiene su archivo.
  for (const j of JUEGOS.filter((j) => j.disponible)) {
    if (!j.archivo || !fs.existsSync(path.join(ROOT, j.archivo))) fallas.push(["catálogo " + j.id, ["falta " + j.archivo]]);
  }

  await browser.close();
  console.log(`Páginas revisadas: ${paginas.length} · juegos revisados: ${juegos.length}`);
  if (fallas.length) {
    console.log(`\nFALLAS (${fallas.length}):`);
    for (const [n, e] of fallas) console.log(`- ${n}\n    ${e.join("\n    ")}`);
    process.exit(1);
  }
  console.log("OK: sin errores.");
})();
