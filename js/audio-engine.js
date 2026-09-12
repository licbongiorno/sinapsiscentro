/**
 * AUDIO-ENGINE.JS — Motor de la Biblioteca Sonora
 * =====================================================
 * TODO lo que produce acá es generado en tiempo real con Web Audio
 * API — ningún archivo de audio. Esto es deliberado y es lo que
 * permite que "ruido", "campanas" y "binaurales" funcionen de
 * verdad, sin necesitar mp3.
 *
 * Lo que este motor NO PUEDE hacer: sintetizar sonidos ambientales
 * realistas (lluvia, bosque, mar) ni música — eso necesita archivos
 * de audio reales. Las pistas de tipo "archivo" (ver
 * data/sonidos-datos.js) están preparadas para recibir una URL de
 * audio real el día que existan; hasta entonces, el motor las
 * reconoce pero avisa que no están disponibles todavía (ver
 * `disponible()`).
 */

const AudioEngine = (() => {
  let ctx = null;
  let masterGain = null;
  const pistasActivas = {}; // id -> { gain, source?, osciladores?, tipo }
  let timerFadeId = null, timerStopId = null;

  function disponible() {
    return !!(window.AudioContext || window.webkitAudioContext);
  }

  function getCtx() {
    if (!disponible()) return null;
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = ctx.createGain();
      masterGain.gain.value = 1;
      masterGain.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }

  // ── Generación de ruido (buffer de algunos segundos, en loop) ──
  function crearBufferRuido(tipo, duracionSeg = 4) {
    const c = getCtx();
    const bufferSize = Math.floor(c.sampleRate * duracionSeg);
    const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
    const data = buffer.getChannelData(0);

    if (tipo === "blanco") {
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    } else if (tipo === "rosa") {
      // Algoritmo de Paul Kellet (aproximación estándar de ruido rosa)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    } else if (tipo === "marron") {
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
    } else {
      for (let i = 0; i < bufferSize; i++) data[i] = 0;
    }
    return buffer;
  }

  function iniciarRuido(id, tipo) {
    const c = getCtx();
    if (!c) return false;
    detenerPista(id, true);
    const buffer = crearBufferRuido(tipo);
    const source = c.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const gain = c.createGain();
    gain.gain.value = 0;
    source.connect(gain).connect(masterGain);
    source.start();
    pistasActivas[id] = { source, gain, tipo: "ruido" };
    return true;
  }

  // ── Beats binaurales: un oscilador por oído, paneados a izquierda/derecha ──
  function iniciarBinaural(id, frecuenciaBase, beatHz) {
    const c = getCtx();
    if (!c) return false;
    detenerPista(id, true);
    const oscIzq = c.createOscillator();
    const oscDer = c.createOscillator();
    oscIzq.type = "sine"; oscDer.type = "sine";
    oscIzq.frequency.value = frecuenciaBase;
    oscDer.frequency.value = frecuenciaBase + beatHz;

    let panIzq, panDer;
    if (typeof StereoPannerNode !== "undefined") {
      panIzq = c.createStereoPanner(); panIzq.pan.value = -1;
      panDer = c.createStereoPanner(); panDer.pan.value = 1;
    } else {
      panIzq = c.createGain(); panDer = c.createGain(); // navegador viejo: sin paneo, sigue sonando
    }
    const gain = c.createGain();
    gain.gain.value = 0;
    oscIzq.connect(panIzq).connect(gain);
    oscDer.connect(panDer).connect(gain);
    gain.connect(masterGain);
    oscIzq.start(); oscDer.start();
    pistasActivas[id] = { osciladores: [oscIzq, oscDer], gain, tipo: "binaural" };
    return true;
  }

  // ── Sonidos cortos tipo campana (no quedan en loop, sólo suenan una vez) ──
  function tocarCampana(tipoSonido = "campana") {
    const c = getCtx();
    if (!c) return false;
    const FREqS = { campana: 880, gong: 196, cuenco: 330 };
    const DURACIONES = { campana: 2.5, gong: 4.5, cuenco: 3.5 };
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = FREqS[tipoSonido] || 440;
    g.gain.value = 0.0001;
    o.connect(g).connect(masterGain);
    o.start();
    const dur = DURACIONES[tipoSonido] || 2.5;
    g.gain.exponentialRampToValueAtTime(0.35, c.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    o.stop(c.currentTime + dur + 0.1);
    return true;
  }

  // ── Aproximaciones sintetizadas de ambientes (NO son grabaciones reales,
  // son técnicas de síntesis: ruido filtrado + modulación. Se etiquetan como
  // tal en la interfaz para no generar expectativas de un sonido grabado.) ──

  function iniciarLluvia(id) {
    const c = getCtx();
    if (!c) return false;
    detenerPista(id, true);
    // Capa base: siseo constante (ruido agudo filtrado)
    const fuenteBase = c.createBufferSource();
    fuenteBase.buffer = crearBufferRuido("blanco", 4); fuenteBase.loop = true;
    const filtroBase = c.createBiquadFilter(); filtroBase.type = "highpass"; filtroBase.frequency.value = 1200;
    const gainBase = c.createGain(); gainBase.gain.value = 0.6;
    fuenteBase.connect(filtroBase).connect(gainBase);

    // Capa de "gotas": banda más aguda, modulada para dar textura de goteo
    const fuenteGotas = c.createBufferSource();
    fuenteGotas.buffer = crearBufferRuido("blanco", 4); fuenteGotas.loop = true;
    const filtroGotas = c.createBiquadFilter(); filtroGotas.type = "bandpass"; filtroGotas.frequency.value = 3500; filtroGotas.Q.value = 0.7;
    const gainGotas = c.createGain(); gainGotas.gain.value = 0.4;
    const lfoGotas = c.createOscillator(); lfoGotas.type = "sine"; lfoGotas.frequency.value = 3.3;
    const lfoGotasEscala = c.createGain(); lfoGotasEscala.gain.value = 0.25;
    lfoGotas.connect(lfoGotasEscala).connect(gainGotas.gain);
    fuenteGotas.connect(filtroGotas).connect(gainGotas);

    const gainMaestro = c.createGain(); gainMaestro.gain.value = 0;
    gainBase.connect(gainMaestro); gainGotas.connect(gainMaestro);
    gainMaestro.connect(masterGain);

    fuenteBase.start(); fuenteGotas.start(); lfoGotas.start();
    pistasActivas[id] = { source: fuenteBase, extraSources: [fuenteGotas], osciladores: [lfoGotas], gain: gainMaestro, tipo: "lluvia" };
    return true;
  }

  function iniciarViento(id) {
    const c = getCtx();
    if (!c) return false;
    detenerPista(id, true);
    const fuente = c.createBufferSource();
    fuente.buffer = crearBufferRuido("marron", 4); fuente.loop = true;
    const filtro = c.createBiquadFilter(); filtro.type = "lowpass"; filtro.frequency.value = 600; filtro.Q.value = 1.1;
    const lfo = c.createOscillator(); lfo.type = "sine"; lfo.frequency.value = 0.15; // ráfagas lentas
    const lfoEscala = c.createGain(); lfoEscala.gain.value = 320;
    lfo.connect(lfoEscala).connect(filtro.frequency);
    const gain = c.createGain(); gain.gain.value = 0;
    fuente.connect(filtro).connect(gain).connect(masterGain);
    fuente.start(); lfo.start();
    pistasActivas[id] = { source: fuente, osciladores: [lfo], gain, tipo: "viento" };
    return true;
  }

  /** Punto de entrada único para pistas proceduales en loop (ruido y ambientes sintetizados). */
  function iniciarPistaProcedural(id, generador) {
    if (generador === "lluvia") return iniciarLluvia(id);
    if (generador === "viento") return iniciarViento(id);
    return iniciarRuido(id, generador); // blanco | rosa | marron
  }

  function setVolumen(id, valor01) {
    const p = pistasActivas[id];
    if (!p) return;
    const c = getCtx();
    p.gain.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, valor01)), c.currentTime + 0.15);
  }

  function estaActiva(id) { return !!pistasActivas[id]; }
  function pistasEnReproduccion() { return Object.keys(pistasActivas); }

  function detenerPista(id, inmediato = false) {
    const p = pistasActivas[id];
    if (!p) return;
    const c = getCtx();
    const parar = () => {
      try {
        if (p.source) p.source.stop();
        if (p.extraSources) p.extraSources.forEach(s => s.stop());
        if (p.osciladores) p.osciladores.forEach(o => o.stop());
      } catch (e) {}
      delete pistasActivas[id];
    };
    if (inmediato || !c) { parar(); return; }
    p.gain.gain.linearRampToValueAtTime(0, c.currentTime + 0.25);
    setTimeout(parar, 300);
  }

  function detenerTodo() {
    Object.keys(pistasActivas).forEach(id => detenerPista(id));
    clearTimeout(timerFadeId); clearTimeout(timerStopId);
  }

  /** Arranca un temporizador que hace fade-out suave y para todo al llegar a 0. */
  function iniciarTemporizador(minutos, alTerminar) {
    clearTimeout(timerFadeId); clearTimeout(timerStopId);
    if (!minutos) return;
    const ms = minutos * 60000;
    const fadeMs = Math.min(9000, ms * 0.3);
    timerFadeId = setTimeout(() => {
      const c = getCtx();
      if (!c) return;
      Object.values(pistasActivas).forEach(p => p.gain.gain.linearRampToValueAtTime(0, c.currentTime + fadeMs / 1000));
    }, Math.max(0, ms - fadeMs));
    timerStopId = setTimeout(() => { detenerTodo(); if (alTerminar) alTerminar(); }, ms);
  }
  function cancelarTemporizador() { clearTimeout(timerFadeId); clearTimeout(timerStopId); }

  return {
    disponible, iniciarRuido, iniciarBinaural, tocarCampana, setVolumen,
    iniciarPistaProcedural,
    estaActiva, pistasEnReproduccion, detenerPista, detenerTodo,
    iniciarTemporizador, cancelarTemporizador,
  };
})();
