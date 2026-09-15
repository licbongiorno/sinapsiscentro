/**
 * BUSCADOR.JS — Búsqueda global entre todas las secciones de recursos.
 * ==========================================================================
 * Sólo lo usa buscar.html, que es la única página que carga los 6
 * catálogos de datos a la vez. Reutiliza el .buscar(query) que ya
 * tiene cada catálogo cuando existe (Juegos/Ejercicios/Mindfulness);
 * para Creatividad/Infantil/Sonidos (que no lo tienen) filtra acá
 * mismo por título/descripción/categoría, con el mismo criterio
 * (texto plano, minúsculas).
 */
const BuscadorGlobal = (() => {
  function buscarTodo(query) {
    const q = String(query || "").trim().toLowerCase();
    if (!q) return [];
    const resultados = [];

    if (typeof CatalogoJuegos !== "undefined") {
      CatalogoJuegos.buscar(query).forEach((j) => resultados.push({
        titulo: j.nombre,
        descripcion: j.descripcion,
        seccion: "Juegos",
        seccionIcono: "🎮",
        categoria: (CatalogoJuegos.categoriaPorId(j.categoria) || {}).nombre || "",
        href: `juego.html?id=${encodeURIComponent(j.id)}`,
      }));
    }

    if (typeof CatalogoEjercicios !== "undefined") {
      CatalogoEjercicios.buscar(query).forEach((e) => resultados.push({
        titulo: e.titulo,
        descripcion: e.descripcion,
        seccion: "Ejercicios",
        seccionIcono: "🌱",
        categoria: (CatalogoEjercicios.categoriaPorId(e.categoria) || {}).nombre || "",
        href: `ejercicio.html?id=${encodeURIComponent(e.id)}`,
      }));
    }

    if (typeof CatalogoMindfulness !== "undefined") {
      CatalogoMindfulness.buscar(query).forEach((m) => resultados.push({
        titulo: m.titulo,
        descripcion: m.descripcion,
        seccion: "Mindfulness",
        seccionIcono: "🧘",
        categoria: (CatalogoMindfulness.categoriaPorId(m.categoria) || {}).nombre || "",
        href: `mindfulness-item.html?id=${encodeURIComponent(m.id)}`,
      }));
    }

    if (typeof CatalogoCreatividad !== "undefined") {
      CatalogoCreatividad.todos()
        .filter((a) => {
          const catNombre = (CatalogoCreatividad.seccionPorId(a.seccion) || {}).nombre || "";
          return a.titulo.toLowerCase().includes(q)
            || (a.descripcion || a.consigna || "").toLowerCase().includes(q)
            || catNombre.toLowerCase().includes(q);
        })
        .forEach((a) => resultados.push({
          titulo: a.titulo,
          descripcion: a.descripcion || a.consigna || "",
          seccion: "Creatividad",
          seccionIcono: "🎨",
          categoria: (CatalogoCreatividad.seccionPorId(a.seccion) || {}).nombre || "",
          href: `creatividad-item.html?id=${encodeURIComponent(a.id)}`,
        }));
    }

    if (typeof CatalogoInfantil !== "undefined") {
      CatalogoInfantil.todos()
        .filter((a) => {
          const catNombre = (CatalogoInfantil.categoriaPorId(a.categoria) || {}).nombre || "";
          return a.titulo.toLowerCase().includes(q)
            || a.descripcion.toLowerCase().includes(q)
            || catNombre.toLowerCase().includes(q);
        })
        .forEach((a) => resultados.push({
          titulo: a.titulo,
          descripcion: a.descripcion,
          seccion: "Zona Infantil",
          seccionIcono: "🧸",
          categoria: (CatalogoInfantil.categoriaPorId(a.categoria) || {}).nombre || "",
          href: `infantil-actividad.html?id=${encodeURIComponent(a.id)}`,
        }));
    }

    if (typeof CatalogoSonidos !== "undefined") {
      CatalogoSonidos.disponibles()
        .filter((p) => {
          const catNombre = (CatalogoSonidos.categoriaPorId(p.categoria) || {}).nombre || "";
          return p.titulo.toLowerCase().includes(q) || catNombre.toLowerCase().includes(q);
        })
        .forEach((p) => resultados.push({
          titulo: p.titulo,
          descripcion: (CatalogoSonidos.categoriaPorId(p.categoria) || {}).nombre || "",
          seccion: "Biblioteca Sonora",
          seccionIcono: "🎧",
          categoria: (CatalogoSonidos.categoriaPorId(p.categoria) || {}).nombre || "",
          href: "sonidos.html",
        }));
    }

    return resultados;
  }

  return { buscarTodo };
})();
