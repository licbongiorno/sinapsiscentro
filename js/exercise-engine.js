/**
 * EXERCISE-ENGINE.JS — Motor de ejercicios guiados
 * ====================================================
 * Igual que game-engine.js para los juegos, cada ejercicio es sólo
 * datos (ver data/ejercicios.js): una lista de "pasos" con un tipo
 * (mensaje, temporizador, respiración, escala, selección, escritura,
 * ordenar). Este motor se ocupa de todo lo demás: navegación entre
 * pasos, temporizadores, pantalla de inicio, pantalla final con
 * feedback, guardado de progreso/favoritos/reflexiones (vía Storage,
 * el mismo módulo que usan los juegos) y XP.
 */

const ExerciseEngine = (() => {
  let ejercicio = null;
  let pasoActual = 0;
  let inicioMs = 0;
  let pausado = false;
  let timers = [];
  let contenedor = null;

  function limpiarTimers() { timers.forEach(clearTimeout); timers.forEach(clearInterval); timers = []; }

  // beep() vive en js/beep.js (compartido con game-engine.js).

  /**
   * Este motor reproduce ejercicios de dos secciones distintas
   * (Biblioteca de Ejercicios y Mindfulness), cada una con su propio
   * catálogo y sus propias páginas de portal/reproductor. Un ítem
   * vive en un solo catálogo, así que resolvemos a cuál pertenece el
   * ejercicio en curso para saber a dónde "volver" y de dónde sacar
   * "otro ejercicio al azar".
   */
  function _destino() {
    if (typeof CatalogoMindfulness !== "undefined" && CatalogoMindfulness.porId(ejercicio.id)) {
      return { lista: "mindfulness.html", item: "mindfulness-item.html", catalogo: CatalogoMindfulness };
    }
    return { lista: "ejercicios.html", item: "ejercicio.html", catalogo: typeof CatalogoEjercicios !== "undefined" ? CatalogoEjercicios : null };
  }

  function crearBarra() {
    let barra = document.getElementById("eeBarra");
    if (barra) return barra;
    barra = document.createElement("div");
    barra.id = "eeBarra";
    barra.className = "ee-barra";
    barra.innerHTML = `
      <button class="ee-volver" id="eeVolver" aria-label="Volver">←</button>
      <div class="ee-puntos" id="eePuntos"></div>
      <div style="width:38px;"></div>`;
    document.body.prepend(barra);
    document.getElementById("eeVolver").addEventListener("click", () => { window.location.href = _destino().lista; });
    return barra;
  }

  function actualizarPuntos() {
    const cont = document.getElementById("eePuntos");
    if (!cont) return;
    cont.innerHTML = ejercicio.pasos.map((_, i) =>
      `<span class="ee-punto ${i === pasoActual ? "activo" : i < pasoActual ? "hecho" : ""}"></span>`).join("");
  }

  function iniciar(datosEjercicio) {
    ejercicio = datosEjercicio;
    pasoActual = 0;
    pausado = false;
    contenedor = document.getElementById("eeContenedor");
    crearBarra();
    pantallaInicio();
  }

  function pantallaInicio() {
    // ExerciseEngine también reproduce los ítems "ejercicio" de Mindfulness
    // (mindfulness.html), que usan sus propias categorías — probamos ambos
    // catálogos para mostrar la etiqueta correcta en cualquiera de los dos.
    const catInfo = (typeof CatalogoEjercicios !== "undefined" && CatalogoEjercicios.categoriaPorId(ejercicio.categoria))
      || (typeof CatalogoMindfulness !== "undefined" && CatalogoMindfulness.categoriaPorId(ejercicio.categoria))
      || {};
    contenedor.innerHTML = `
      <div class="ee-intro">
        <p class="ee-intro-cat">${catInfo.nombre || ""}</p>
        <h1 class="ee-intro-titulo">${ejercicio.titulo}</h1>
        <p class="ee-intro-duracion">${ejercicio.duracion} min · ${etiquetaDificultad(ejercicio.dificultad)}</p>
        <p class="ee-intro-desc">${ejercicio.mensajeInicial || ejercicio.descripcion}</p>
        ${ejercicio.objetivo ? `
        <details class="ee-porque">
          <summary>🔬 ¿Por qué funciona?</summary>
          <p>${ejercicio.objetivo}</p>
        </details>` : ""}
        ${ejercicio.advertencia ? `<p class="ee-aviso">${ejercicio.advertencia}</p>` : ""}
        <button class="ee-btn ee-btn-principal" id="eeComenzar">Comenzar</button>
      </div>`;
    document.getElementById("eeBarra").style.display = "none";
    document.getElementById("eeComenzar").addEventListener("click", () => {
      document.getElementById("eeBarra").style.display = "flex";
      inicioMs = Date.now();
      renderPaso();
    });
  }

  function etiquetaDificultad(d) {
    return { facil: "Fácil", intermedio: "Intermedio", profundo: "Profundo" }[d] || d;
  }

  function renderPaso() {
    limpiarTimers();
    actualizarPuntos();
    const paso = ejercicio.pasos[pasoActual];
    const renderers = {
      mensaje: renderMensaje, temporizador: renderTemporizador, respiracion: renderRespiracion,
      escala: renderEscala, seleccion: renderSeleccion, escritura: renderEscritura, ordenar: renderOrdenar,
      dibujo: renderDibujo,
    };
    (renderers[paso.tipo] || renderMensaje)(paso);
  }

  function marcoPaso(contenidoHtml, mostrarSiguiente = true, textoBoton = "Continuar") {
    contenedor.innerHTML = `
      <div class="ee-paso">
        ${contenidoHtml}
        ${mostrarSiguiente ? `<button class="ee-btn ee-btn-principal" id="eeSiguiente" style="margin-top:24px;">${textoBoton}</button>` : ""}
      </div>`;
    const btn = document.getElementById("eeSiguiente");
    if (btn) btn.addEventListener("click", avanzar);
  }

  function avanzar() {
    limpiarTimers();
    pasoActual += 1;
    if (pasoActual >= ejercicio.pasos.length) { pantallaFinal(); return; }
    renderPaso();
  }

  // ── Tipos de paso ──

  function renderMensaje(paso) {
    marcoPaso(`<p class="ee-texto-grande">${paso.texto}</p>`);
    if (paso.duracionSeg) {
      const btn = () => document.getElementById("eeSiguiente");
      if (btn()) btn().style.opacity = "0.4";
      timers.push(setTimeout(() => { if (btn()) { btn().style.opacity = "1"; } avanzar(); }, paso.duracionSeg * 1000));
    }
  }

  function renderTemporizador(paso) {
    let restante = paso.duracionSeg;
    contenedor.innerHTML = `
      <div class="ee-paso" style="text-align:center;">
        <p class="ee-texto-grande">${paso.texto || ""}</p>
        <div class="ee-tiempo" id="eeTiempo">${formatoTiempo(restante)}</div>
        <div class="ee-controles-tiempo">
          <button class="ee-btn ee-btn-secundario" id="eePausarTiempo">Pausar</button>
          <button class="ee-btn ee-btn-principal" id="eeFinalizarTiempo">Finalizar</button>
        </div>
      </div>`;
    let corriendo = true;
    const intervalo = setInterval(() => {
      if (!corriendo) return;
      restante -= 1;
      const el = document.getElementById("eeTiempo");
      if (el) el.textContent = formatoTiempo(Math.max(0, restante));
      if (restante <= 0) { clearInterval(intervalo); beep(880, 250); avanzar(); }
    }, 1000);
    timers.push(intervalo);
    document.getElementById("eePausarTiempo").addEventListener("click", (e) => {
      corriendo = !corriendo;
      e.target.textContent = corriendo ? "Pausar" : "Continuar";
    });
    document.getElementById("eeFinalizarTiempo").addEventListener("click", () => { clearInterval(intervalo); avanzar(); });
  }

  function formatoTiempo(seg) {
    const m = Math.floor(seg / 60), s = seg % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function renderRespiracion(paso) {
    const fases = paso.fases || [{ nombre: "Inhalá", segundos: 4 }, { nombre: "Sostené", segundos: 4 }, { nombre: "Exhalá", segundos: 5 }];
    const ciclos = paso.ciclos || 4;
    let ciclo = 0, fase = 0, detenido = false;
    contenedor.innerHTML = `
      <div class="ee-paso" style="text-align:center;">
        ${paso.texto ? `<p class="ee-texto-grande" style="margin-bottom:18px;">${paso.texto}</p>` : ""}
        <div class="ee-circulo" id="eeCirculo"><span id="eeFaseTexto">…</span></div>
        <p class="ee-ciclo-texto" id="eeCicloTexto">Ciclo 1 de ${ciclos}</p>
        <button class="ee-btn ee-btn-secundario" id="eeSaltarRespiracion" style="margin-top:18px;">Continuar</button>
      </div>`;
    document.getElementById("eeSaltarRespiracion").addEventListener("click", () => { detenido = true; avanzar(); });

    function siguienteFase() {
      if (detenido) return;
      if (ciclo >= ciclos) { avanzar(); return; }
      const f = fases[fase];
      const circulo = document.getElementById("eeCirculo");
      const texto = document.getElementById("eeFaseTexto");
      if (!circulo) return;
      texto.textContent = f.nombre;
      circulo.style.transition = `transform ${f.segundos}s ease-in-out`;
      circulo.style.transform = `scale(${f.nombre.toLowerCase().includes("exhal") ? 1 : 1.35})`;
      timers.push(setTimeout(() => {
        fase = (fase + 1) % fases.length;
        if (fase === 0) {
          ciclo += 1;
          const ct = document.getElementById("eeCicloTexto");
          if (ct) ct.textContent = `Ciclo ${Math.min(ciclo + 1, ciclos)} de ${ciclos}`;
        }
        siguienteFase();
      }, f.segundos * 1000));
    }
    timers.push(setTimeout(siguienteFase, 400));
  }

  function renderEscala(paso) {
    marcoPaso(`
      <p class="ee-texto-grande">${paso.pregunta}</p>
      <div class="ee-escala">
        <span class="ee-escala-extremo">${paso.etiquetaMin || "Nada"}</span>
        <input type="range" min="${paso.min ?? 0}" max="${paso.max ?? 10}" value="${Math.round(((paso.max ?? 10) - (paso.min ?? 0)) / 2)}" id="eeSlider">
        <span class="ee-escala-extremo">${paso.etiquetaMax || "Mucho"}</span>
      </div>
      <div class="ee-escala-valor" id="eeSliderValor">${Math.round(((paso.max ?? 10) - (paso.min ?? 0)) / 2)}</div>
    `);
    const slider = document.getElementById("eeSlider");
    slider.addEventListener("input", () => { document.getElementById("eeSliderValor").textContent = slider.value; });
  }

  function renderSeleccion(paso) {
    contenedor.innerHTML = `
      <div class="ee-paso">
        <p class="ee-texto-grande">${paso.pregunta}</p>
        <div class="ee-opciones-seleccion">
          ${paso.opciones.map((o, i) => `<button class="ee-opcion-sel" data-i="${i}">${o.emoji ? `<span class="ee-opcion-emoji">${o.emoji}</span>` : ""}${o.texto}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".ee-opcion-sel").forEach(btn => btn.addEventListener("click", () => avanzar()));
  }

  function renderEscritura(paso) {
    contenedor.innerHTML = `
      <div class="ee-paso">
        <p class="ee-texto-grande">${paso.pregunta}</p>
        <textarea class="ee-textarea" id="eeTextarea" placeholder="${paso.placeholder || "Escribí lo que quieras…"}"></textarea>
        <div class="ee-fila-botones">
          <button class="ee-btn ee-btn-secundario" id="eeContinuarSinGuardar">Continuar sin guardar</button>
          <button class="ee-btn ee-btn-principal" id="eeGuardarReflexion">Guardar y continuar</button>
        </div>
      </div>`;
    document.getElementById("eeContinuarSinGuardar").addEventListener("click", avanzar);
    document.getElementById("eeGuardarReflexion").addEventListener("click", (e) => {
      const texto = document.getElementById("eeTextarea").value.trim();
      if (!texto) { avanzar(); return; }
      Storage.guardarReflexion(ejercicio.id, texto);
      e.target.textContent = "Guardado ✓";
      e.target.disabled = true;
      document.getElementById("eeContinuarSinGuardar").disabled = true;
      timers.push(setTimeout(avanzar, 500));
    });
  }

  function renderOrdenar(paso) {
    const correcto = paso.items;
    const mezclado = [...correcto].sort(() => Math.random() - 0.5);
    let elegidos = [];
    function pintar() {
      contenedor.innerHTML = `
        <div class="ee-paso">
          <p class="ee-texto-grande">${paso.instruccion}</p>
          <div class="ee-orden-elegidos">${elegidos.map((t, i) => `<div class="ee-orden-item hecho">${i + 1}. ${t}</div>`).join("")}</div>
          <div class="ee-orden-disponibles">
            ${mezclado.map((t, i) => elegidos.includes(t) ? "" : `<button class="ee-orden-btn" data-t="${i}">${t}</button>`).join("")}
          </div>
        </div>`;
      contenedor.querySelectorAll(".ee-orden-btn").forEach(btn => btn.addEventListener("click", () => {
        elegidos.push(mezclado[Number(btn.dataset.t)]);
        if (elegidos.length === correcto.length) { setTimeout(avanzar, 400); }
        pintar();
      }));
    }
    pintar();
  }

  function renderDibujo(paso) {
    const COLORES = ["#0d2535", "#2aaec2", "#e08a8a", "#8ac9a9", "#c9a97e"];
    contenedor.innerHTML = `
      <div class="ee-paso" style="text-align:center;">
        <p class="ee-texto-grande">${paso.texto}</p>
        <canvas id="eeLienzo" width="300" height="280" class="ee-lienzo"></canvas>
        <div class="ee-lienzo-colores">
          ${COLORES.map(c => `<button data-c="${c}" style="background:${c}"></button>`).join("")}
          <button data-limpiar="1" class="ee-lienzo-limpiar">Limpiar</button>
        </div>
        <button class="ee-btn ee-btn-principal" id="eeSiguiente" style="margin-top:18px;">Continuar</button>
      </div>`;
    const canvas = document.getElementById("eeLienzo");
    const lienzo = crearLienzoDibujable(canvas, { colorInicial: COLORES[0] });
    contenedor.querySelectorAll("[data-c]").forEach(btn => btn.addEventListener("click", () => lienzo.setColor(btn.dataset.c)));
    contenedor.querySelector("[data-limpiar]").addEventListener("click", () => lienzo.limpiar());
    document.getElementById("eeSiguiente").addEventListener("click", avanzar);
  }

  // ── Pantalla final ──

  function pantallaFinal() {
    limpiarTimers();
    document.getElementById("eeBarra").style.display = "none";
    const minutos = Math.max(1, Math.round((Date.now() - inicioMs) / 60000));
    const yaEsFavorito = Storage.esFavoritoEjercicio(ejercicio.id);
    contenedor.innerHTML = `
      <div class="ee-final">
        <p class="ee-final-emoji">🌱</p>
        <h1 class="ee-final-titulo">Terminaste</h1>
        <p class="ee-final-sub">Tomate unos segundos antes de seguir.</p>
        <p class="ee-final-meta">✓ Ejercicio completado · ⏱ ${ejercicio.duracion} min</p>
        <p class="ee-final-pregunta">¿Cómo te resultó?</p>
        <div class="ee-final-feedback" id="eeFeedback">
          ${["😌", "🙂", "😐", "😣"].map(e => `<button class="ee-feedback-btn" data-e="${e}">${e}</button>`).join("")}
        </div>
        <div class="ee-final-botones">
          <button class="ee-btn ee-btn-secundario" id="eeRepetir">Repetir</button>
          <button class="ee-btn ee-btn-secundario" id="eeFavorito">${yaEsFavorito ? "❤️ Guardado" : "🤍 Guardar"}</button>
        </div>
        <div class="ee-final-botones">
          <button class="ee-btn ee-btn-texto" id="eeVolverLista">← Volver</button>
          <button class="ee-btn ee-btn-texto" id="eeOtro">Otro ejercicio 🎲</button>
        </div>
      </div>`;

    const resultado = Storage.registrarEjercicioCompletado(ejercicio.id, { minutos });
    const xp = { facil: 10, intermedio: 20, profundo: 30 }[ejercicio.dificultad] || 15;
    Storage.sumarXP(xp);
    const nuevos = Logros.evaluarTrasEjercicio ? Logros.evaluarTrasEjercicio() : [];

    document.getElementById("eeFeedback").addEventListener("click", (e) => {
      const btn = e.target.closest(".ee-feedback-btn");
      if (!btn) return;
      Storage.guardarFeedbackEjercicio(ejercicio.id, btn.dataset.e);
      document.querySelectorAll(".ee-feedback-btn").forEach(b => b.classList.remove("activo"));
      btn.classList.add("activo");
    });
    document.getElementById("eeRepetir").addEventListener("click", () => { pasoActual = 0; inicioMs = Date.now(); document.getElementById("eeBarra").style.display = "flex"; renderPaso(); });
    document.getElementById("eeFavorito").addEventListener("click", (e) => {
      const ahora = Storage.toggleFavoritoEjercicio(ejercicio.id);
      e.target.textContent = ahora ? "❤️ Guardado" : "🤍 Guardar";
    });
    document.getElementById("eeVolverLista").addEventListener("click", () => { window.location.href = _destino().lista; });
    document.getElementById("eeOtro").addEventListener("click", () => {
      const destino = _destino();
      const otro = destino.catalogo.aleatorio();
      window.location.href = `${destino.item}?id=${otro.id}`;
    });

    if (nuevos.length) {
      const banner = document.createElement("div");
      banner.className = "ee-logros-nuevos";
      banner.innerHTML = nuevos.map(l => `<div class="ee-logro-chip">${l.icono} ${l.nombre}</div>`).join("");
      contenedor.querySelector(".ee-final").appendChild(banner);
    }
  }

  return { iniciar };
})();
