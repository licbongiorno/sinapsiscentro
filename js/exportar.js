/**
 * EXPORTAR.JS — Descarga en TXT e impresión/PDF, compartido entre secciones
 * ============================================================================
 * Antes esta lógica vivía sólo dentro de ejercicios.html (para las
 * reflexiones guardadas). Se extrae acá para que cualquier sección
 * (Ejercicios, Creatividad, y lo que venga después) use el mismo sistema
 * en vez de reinventarlo cada vez — ver REGLA Nº 4 del prompt de
 * Creatividad: "no crear un exportador paralelo".
 *
 * "PDF" en SINAPSIS es el diálogo nativo de impresión del navegador
 * (el usuario elige "Guardar como PDF"): no hay ninguna librería de
 * generación de PDF instalada en el proyecto, así que no se agrega una
 * sólo para esto — se sigue el mismo patrón liviano que ya funcionaba.
 *
 * Depende de `escapeHtml` (definida en js/perfil.js), así que este
 * archivo debe cargarse después de perfil.js.
 */

const Exportar = {
  /**
   * Nombre de archivo consistente en todo el sitio:
   * SINAPSIS_Tipo_Titulo_YYYY-MM-DD.ext
   */
  nombreArchivo({ tipo, titulo = "", extension }) {
    const fecha = new Date().toISOString().slice(0, 10);
    const limpio = (s) => String(s || "")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "")
      .slice(0, 40);
    const partes = ["SINAPSIS", limpio(tipo)];
    if (titulo) partes.push(limpio(titulo));
    partes.push(fecha);
    return `${partes.join("_")}.${extension}`;
  },

  /** Descarga texto plano como archivo .txt */
  descargarTxt({ contenido, nombreArchivo }) {
    if (!contenido) return false;
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    return true;
  },

  /**
   * Abre una ventana con el contenido formateado y dispara el diálogo de
   * impresión. `bloques` es un array de { titulo, fecha, texto }, cada
   * uno se muestra como un párrafo separado (una reflexión, un poema,
   * una historia, etc.).
   */
  imprimir({ tituloPagina, bloques }) {
    if (!bloques || !bloques.length) return false;
    const filas = bloques.map(b => `<div style="margin-bottom:26px;">
      ${b.titulo ? `<p style="font-weight:700;margin-bottom:6px;">${escapeHtml(b.titulo)}${b.fecha ? ` — ${escapeHtml(b.fecha)}` : ""}</p>` : ""}
      <p style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(b.texto)}</p>
    </div>`).join("");
    const ventana = window.open("", "_blank");
    if (!ventana) {
      alert("Tu navegador bloqueó la ventana de impresión. Permití los pop-ups para esta página e intentá de nuevo.");
      return false;
    }
    ventana.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
      <title>${escapeHtml(tituloPagina)} — SINAPSIS</title>
      <style>body{font-family:Georgia,serif;max-width:640px;margin:40px auto;padding:0 20px;color:#0d2535;}
      h1{margin-bottom:24px;}</style></head>
      <body><h1>${escapeHtml(tituloPagina)}</h1>${filas}</body></html>`);
    ventana.document.close();
    ventana.focus();
    ventana.print();
    return true;
  },

  /** Descarga una imagen (dataURL, típicamente de un <canvas>) como archivo. */
  descargarImagen({ dataUrl, nombreArchivo }) {
    if (!dataUrl) return false;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    a.remove();
    return true;
  },
};
