/**
 * INFANTIL-ENGINE.JS — Motor de actividades de la Zona Infantil
 * ===================================================================
 * Cada actividad es sólo datos (ver data/infantil-datos.js). Nunca hay
 * "juego terminado" por error ni cuenta de vidas: las respuestas
 * incorrectas se acompañan con aliento ("¡Casi! Probemos de nuevo")
 * en vez de penalizarse. El objetivo es explorar, no fallar.
 */

const InfantilEngine = (() => {
  let actividad = null;
  let contenedor = null;
  let estrellasGanadas = 0;
  let timers = [];

  function limpiarTimers() { timers.forEach(clearTimeout); timers = []; }

  // beep() vive en js/beep.js (compartido con exercise-engine.js/game-engine.js).
  function vibrar(patron = 20) {
    if (navigator.vibrate) navigator.vibrate(patron);
  }

  function crearBarra() {
    let barra = document.getElementById("ieBarra");
    if (barra) return barra;
    barra = document.createElement("div");
    barra.id = "ieBarra";
    barra.className = "ie-barra";
    barra.innerHTML = `<button class="ie-volver" id="ieVolver" aria-label="Volver">←</button><div class="ie-estrellas" id="ieEstrellas">⭐ 0</div>`;
    document.body.prepend(barra);
    document.getElementById("ieVolver").addEventListener("click", () => { window.location.href = "infantil.html"; });
    return barra;
  }
  function actualizarEstrellas() {
    const el = document.getElementById("ieEstrellas");
    if (el) el.textContent = `⭐ ${estrellasGanadas}`;
  }
  function sumarEstrella(n = 1) {
    estrellasGanadas += n;
    actualizarEstrellas();
    beep(880, 90, "triangle", 0.05);
    vibrar(15);
  }

  function iniciar(datosActividad) {
    actividad = datosActividad;
    estrellasGanadas = 0;
    contenedor = document.getElementById("ieContenedor");
    crearBarra();
    pantallaInicio();
  }

  function pantallaInicio() {
    contenedor.innerHTML = `
      <div class="ie-intro">
        <div class="ie-intro-emoji">${(CatalogoInfantil.categoriaPorId(actividad.categoria) || {}).icono || "🧸"}</div>
        <h1 class="ie-intro-titulo">${actividad.titulo}</h1>
        <div class="rh-acciones">
          ${Lector.boton(`${actividad.titulo}. ${actividad.descripcion}`)}
          <button class="compartir-btn compartir-icono" id="ieCompartir" aria-label="Compartir" title="Compartir">🔗</button>
        </div>
        <p class="ie-intro-desc">${actividad.descripcion}</p>
        ${actividad.beneficio ? `
        <details class="ie-porque">
          <summary>🌱 ¿Qué desarrolla?</summary>
          <p>${actividad.beneficio}</p>
        </details>` : ""}
        <button class="ie-btn ie-btn-principal" id="ieComenzar">¡Jugar!</button>
      </div>`;
    Lector.conectar(contenedor);
    document.getElementById("ieBarra").style.display = "none";
    document.getElementById("ieComenzar").addEventListener("click", () => {
      document.getElementById("ieBarra").style.display = "flex";
      arrancarTipo();
    });
    document.getElementById("ieCompartir").addEventListener("click", () => {
      Compartir.compartir({
        titulo: actividad.titulo,
        texto: `${actividad.titulo} — una actividad gratuita de Sinapsis, Centro de Salud Integral.`,
        url: window.location.href,
      });
    });
  }

  function arrancarTipo() {
    const handlers = {
      memoria: iniciarMemoria, seleccion: iniciarSeleccion, clasificar: iniciarClasificar,
      secuencia: iniciarSecuencia, historia: iniciarHistoria, dibujo: iniciarDibujo,
      respiracion: iniciarRespiracion, escritura: iniciarEscritura,
    };
    (handlers[actividad.tipo] || iniciarSeleccion)();
  }

  function pantallaFinal(mensaje) {
    limpiarTimers();
    if (typeof Dictado !== "undefined") Dictado.detener();
    beep(660, 110, "triangle", 0.05);
    timers.push(setTimeout(() => beep(880, 180, "triangle", 0.06), 130));
    vibrar([30, 40, 30]);
    InfantilStorage.registrarActividadCompletada(actividad.id);
    InfantilStorage.sumarEstrellas(estrellasGanadas || 1);
    const nuevosLogros = InfantilStorage.evaluarLogros();
    contenedor.innerHTML = `
      <div class="ie-final">
        <div class="ie-final-emoji">🎉</div>
        <h1 class="ie-final-titulo">${mensaje || "¡Muy bien!"}</h1>
        <p class="ie-final-estrellas">⭐ Ganaste ${estrellasGanadas || 1} estrella${(estrellasGanadas || 1) === 1 ? "" : "s"}</p>
        ${nuevosLogros.length ? `<div class="ie-logros-nuevos">${nuevosLogros.map(l => `<div class="ie-logro-chip">${l.icono} ${l.nombre}</div>`).join("")}</div>` : ""}
        <div class="ie-final-botones">
          <button class="ie-btn ie-btn-principal" id="ieJugarDeNuevo">Jugar de nuevo</button>
          <button class="ie-btn ie-btn-secundario" id="ieOtraActividad">Otra actividad</button>
        </div>
      </div>`;
    document.getElementById("ieJugarDeNuevo").addEventListener("click", () => { estrellasGanadas = 0; arrancarTipo(); });
    document.getElementById("ieOtraActividad").addEventListener("click", () => { window.location.href = "infantil.html"; });
  }

  // ── MEMORIA ──
  function iniciarMemoria() {
    const pares = actividad.contenido.pares;
    let cartas = [];
    pares.forEach((p, g) => cartas.push({ g, s: p }, { g, s: p }));
    cartas = cartas.map((c, id) => ({ ...c, id, volteada: false, encontrada: false })).sort(() => Math.random() - 0.5);
    let primera = null, bloqueado = false, aciertos = 0;

    function render() {
      contenedor.innerHTML = `<div class="ie-tablero">
        ${cartas.map(c => `<div class="ie-carta ${c.volteada || c.encontrada ? "volteada" : ""}" data-id="${c.id}">${c.volteada || c.encontrada ? c.s : "❓"}</div>`).join("")}
      </div>`;
      contenedor.querySelectorAll(".ie-carta").forEach(el => el.addEventListener("click", () => voltear(Number(el.dataset.id))));
    }
    function voltear(id) {
      if (bloqueado) return;
      const c = cartas.find(x => x.id === id);
      if (!c || c.volteada || c.encontrada) return;
      c.volteada = true; render();
      if (!primera) { primera = c; return; }
      if (primera.g === c.g) {
        primera.encontrada = true; c.encontrada = true; primera = null; aciertos += 1;
        sumarEstrella();
        if (aciertos === pares.length) timers.push(setTimeout(() => pantallaFinal("¡Encontraste todos los pares!"), 500));
      } else {
        bloqueado = true;
        beep(300, 90, "sine", 0.03);
        timers.push(setTimeout(() => { primera.volteada = false; c.volteada = false; primera = null; bloqueado = false; render(); }, 900));
      }
    }
    render();
  }

  // ── SELECCIÓN (preguntas de opción múltiple, amable con los errores) ──
  function iniciarSeleccion() {
    const rondas = actividad.contenido.rondas;
    let i = 0;
    function render() {
      if (i >= rondas.length) { pantallaFinal("¡Completaste la actividad!"); return; }
      const r = rondas[i];
      contenedor.innerHTML = `
        <div class="ie-paso">
          ${r.emoji ? `<div class="ie-pregunta-emoji">${r.emoji}</div>` : ""}
          <div class="ie-pregunta-fila"><p class="ie-pregunta">${r.pregunta}</p>${Lector.boton(r.pregunta)}</div>
          <div class="ie-opciones">${r.opciones.map((o, idx) => `<button class="ie-opcion" data-i="${idx}">${o}</button>`).join("")}</div>
          <p class="ie-progreso">${i + 1} / ${rondas.length}</p>
        </div>`;
      Lector.conectar(contenedor);
      contenedor.querySelectorAll(".ie-opcion").forEach(btn => btn.addEventListener("click", () => {
        const acierto = Number(btn.dataset.i) === r.correctaIdx;
        if (acierto) { btn.classList.add("ie-correcta"); sumarEstrella(); timers.push(setTimeout(() => { i += 1; render(); }, 600)); }
        else {
          beep(300, 90, "sine", 0.03);
          btn.classList.add("ie-intenta-de-nuevo");
          btn.disabled = true;
          timers.push(setTimeout(() => { btn.classList.remove("ie-intenta-de-nuevo"); }, 700));
        }
      }));
    }
    render();
  }

  // ── CLASIFICAR (arrastrar/tocar para elegir grupo) ──
  function iniciarClasificar() {
    const { instruccion, grupoA, grupoB, items } = actividad.contenido;
    let restantes = [...items];
    let aciertos = 0;
    function render() {
      if (!restantes.length) { pantallaFinal("¡Clasificaste todo!"); return; }
      const item = restantes[0];
      contenedor.innerHTML = `
        <div class="ie-paso">
          <div class="ie-pregunta-fila"><p class="ie-pregunta">${instruccion}</p>${Lector.boton(instruccion)}</div>
          <div class="ie-item-clasificar">${item.emoji || item.texto}</div>
          <div class="ie-grupos">
            <button class="ie-grupo-btn" data-g="A">${grupoA.emoji} ${grupoA.nombre}</button>
            <button class="ie-grupo-btn" data-g="B">${grupoB.emoji} ${grupoB.nombre}</button>
          </div>
          <p class="ie-progreso">${items.length - restantes.length + 1} / ${items.length}</p>
        </div>`;
      Lector.conectar(contenedor);
      contenedor.querySelectorAll(".ie-grupo-btn").forEach(btn => btn.addEventListener("click", () => {
        if (btn.dataset.g === item.grupo) { sumarEstrella(); aciertos += 1; restantes.shift(); render(); }
        else { beep(300, 90, "sine", 0.03); btn.classList.add("ie-intenta-de-nuevo"); timers.push(setTimeout(() => btn.classList.remove("ie-intenta-de-nuevo"), 500)); }
      }));
    }
    render();
  }

  // ── SECUENCIA (ordenar tocando en orden) ──
  function iniciarSecuencia() {
    const { instruccion, items } = actividad.contenido;
    const mezclado = [...items].sort(() => Math.random() - 0.5);
    let elegidos = [];
    function render() {
      contenedor.innerHTML = `
        <div class="ie-paso">
          <div class="ie-pregunta-fila"><p class="ie-pregunta">${instruccion}</p>${Lector.boton(instruccion)}</div>
          <div class="ie-secuencia-elegidos">${elegidos.map((t, i) => `<div class="ie-secuencia-item">${i + 1}. ${t}</div>`).join("") || "<span style='color:var(--text-soft)'>Tocá en orden…</span>"}</div>
          <div class="ie-secuencia-disponibles">${mezclado.map((t, idx) => elegidos.includes(t) ? "" : `<button class="ie-secuencia-btn" data-idx="${idx}">${t}</button>`).join("")}</div>
          <p class="ie-progreso">${elegidos.length} / ${items.length}</p>
        </div>`;
      Lector.conectar(contenedor);
      contenedor.querySelectorAll(".ie-secuencia-btn").forEach(btn => btn.addEventListener("click", () => {
        const elegido = mezclado[Number(btn.dataset.idx)];
        const esElSiguiente = elegido === items[elegidos.length];
        if (esElSiguiente) {
          elegidos.push(elegido);
          sumarEstrella();
          if (elegidos.length === items.length) timers.push(setTimeout(() => pantallaFinal("¡Ordenaste todo!"), 500));
          else render();
        } else {
          beep(300, 90, "sine", 0.03);
          btn.classList.add("ie-intenta-de-nuevo");
          btn.disabled = true;
          timers.push(setTimeout(() => { btn.classList.remove("ie-intenta-de-nuevo"); btn.disabled = false; }, 650));
        }
      }));
    }
    render();
  }

  // ── HISTORIA (ramificada, elige tu propia aventura) ──
  function iniciarHistoria() {
    const { inicio, nodos } = actividad.contenido;
    function render(nodoId) {
      const nodo = nodos[nodoId];
      if (!nodo.opciones || !nodo.opciones.length) {
        sumarEstrella(2);
        contenedor.innerHTML = `<div class="ie-paso"><div class="ie-pregunta-fila"><p class="ie-pregunta" style="font-family:'Playfair Display',serif;font-size:1.2rem;">${nodo.texto}</p>${Lector.boton(nodo.texto)}</div></div>`;
        Lector.conectar(contenedor);
        timers.push(setTimeout(() => pantallaFinal("¡Terminaste la historia!"), 1800));
        return;
      }
      contenedor.innerHTML = `
        <div class="ie-paso">
          <div class="ie-pregunta-fila"><p class="ie-pregunta" style="font-family:'Playfair Display',serif;font-size:1.15rem;line-height:1.6;">${nodo.texto}</p>${Lector.boton(nodo.texto)}</div>
          <div class="ie-opciones">${nodo.opciones.map((o, idx) => `<button class="ie-opcion" data-idx="${idx}">${o.texto}</button>`).join("")}</div>
        </div>`;
      Lector.conectar(contenedor);
      contenedor.querySelectorAll(".ie-opcion").forEach(btn => btn.addEventListener("click", () => {
        sumarEstrella();
        render(nodo.opciones[Number(btn.dataset.idx)].siguiente);
      }));
    }
    render(inicio);
  }

  // ── DIBUJO ──
  function iniciarDibujo() {
    const COLORES = ["#0d2535", "#e08a8a", "#2aaec2", "#f0c14b", "#8ac9a9", "#c98ac2"];
    const NOMBRE_COLOR = { "#0d2535": "Azul oscuro", "#e08a8a": "Rosa", "#2aaec2": "Celeste", "#f0c14b": "Amarillo", "#8ac9a9": "Verde agua", "#c98ac2": "Violeta" };
    contenedor.innerHTML = `
      <div class="ie-paso" style="text-align:center;">
        <div class="ie-pregunta-fila"><p class="ie-pregunta">${actividad.contenido.texto}</p>${Lector.boton(actividad.contenido.texto)}</div>
        <canvas id="ieLienzo" width="290" height="270" class="ie-lienzo"></canvas>
        <div class="ie-lienzo-colores">${COLORES.map(c => `<button data-c="${c}" style="background:${c}" aria-label="${NOMBRE_COLOR[c] || "Color"}"></button>`).join("")}<button data-limpiar="1" class="ie-lienzo-limpiar">Borrar</button></div>
        <button class="ie-btn ie-btn-principal" id="ieListoDibujo" style="margin-top:16px;">¡Listo!</button>
      </div>`;
    Lector.conectar(contenedor);
    const canvas = document.getElementById("ieLienzo");
    const lienzo = crearLienzoDibujable(canvas, { colorInicial: COLORES[0], grosor: 6 });
    contenedor.querySelectorAll("[data-c]").forEach(btn => btn.addEventListener("click", () => lienzo.setColor(btn.dataset.c)));
    contenedor.querySelector("[data-limpiar]").addEventListener("click", () => lienzo.limpiar());
    document.getElementById("ieListoDibujo").addEventListener("click", () => { sumarEstrella(2); pantallaFinal("¡Qué lindo dibujo!"); });
  }

  // ── RESPIRACIÓN ──
  function iniciarRespiracion() {
    const { texto, ciclos = 3, fases } = actividad.contenido;
    let ciclo = 0, fase = 0;
    contenedor.innerHTML = `
      <div class="ie-paso" style="text-align:center;">
        <div class="ie-pregunta-fila"><p class="ie-pregunta">${texto}</p>${Lector.boton(texto)}</div>
        <div class="ie-circulo"><span id="ieFaseTexto">…</span></div>
        <p class="ie-progreso" id="ieCicloTexto">1 / ${ciclos}</p>
      </div>`;
    Lector.conectar(contenedor);
    function siguienteFase() {
      if (ciclo >= ciclos) { sumarEstrella(2); pantallaFinal("¡Qué bien respiraste!"); return; }
      const f = fases[fase];
      const circulo = document.querySelector(".ie-circulo");
      const t = document.getElementById("ieFaseTexto");
      if (!circulo) return;
      t.textContent = f.nombre;
      circulo.style.transition = `transform ${f.segundos}s ease-in-out`;
      circulo.style.transform = `scale(${f.nombre.toLowerCase().includes("solt") || f.nombre.toLowerCase().includes("exhal") ? 1 : 1.3})`;
      timers.push(setTimeout(() => {
        fase = (fase + 1) % fases.length;
        if (fase === 0) { ciclo += 1; const ct = document.getElementById("ieCicloTexto"); if (ct) ct.textContent = `${Math.min(ciclo + 1, ciclos)} / ${ciclos}`; }
        siguienteFase();
      }, f.segundos * 1000));
    }
    timers.push(setTimeout(siguienteFase, 400));
  }

  // ── ESCRITURA (para los más grandes; se guarda sólo localmente, nunca a la nube) ──
  function iniciarEscritura() {
    contenedor.innerHTML = `
      <div class="ie-paso">
        <div class="ie-pregunta-fila"><p class="ie-pregunta">${actividad.contenido.pregunta}</p>${Lector.boton(actividad.contenido.pregunta)}</div>
        <div class="dictado-fila">
          <textarea class="ie-textarea" id="ieTextarea" placeholder="${actividad.contenido.placeholder || "Escribí lo que quieras…"}"></textarea>
          ${Dictado.boton("ieTextarea")}
        </div>
        <button class="ie-btn ie-btn-principal" id="ieListoEscritura" style="margin-top:14px;">¡Listo!</button>
      </div>`;
    Lector.conectar(contenedor);
    Dictado.conectar(contenedor);
    document.getElementById("ieListoEscritura").addEventListener("click", () => {
      const texto = document.getElementById("ieTextarea").value.trim();
      if (texto.length > 2) sumarEstrella(2);
      pantallaFinal("¡Muy buena idea!");
    });
  }

  return { iniciar };
})();
