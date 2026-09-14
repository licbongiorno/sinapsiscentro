/**
 * AUDIO-ENGINE.JS — Motor de la Biblioteca Sonora
 * =====================================================
 * La mayor parte de lo que produce acá se genera en tiempo real con
 * Web Audio API — ningún archivo de audio. Esto es lo que permite que
 * "ruido", "campanas", "binaurales", los ambientes sintetizados
 * (lluvia, viento, olas, arroyo, fuego, tormenta) y la música
 * generativa (pads de notas en escala, ver PRESETS_PAD) funcionen de
 * verdad, sin necesitar mp3.
 *
 * Las pistas de tipo "archivo" (ver data/sonidos-datos.js) SÍ son
 * grabaciones reales con licencia libre (Pixabay Content License,
 * ver audio/README.md), reproducidas en loop con `iniciarArchivo()`
 * — un <audio> real enrutado al mismo masterGain que las pistas
 * sintetizadas, para que el mezclador, el fade y el temporizador les
 * funcionen igual. Una pista con `audioUrl: null` todavía no tiene
 * archivo conseguido; `disponible()` en sonidos.html la muestra como
 * "Próximamente" hasta que lo tenga.
 */

const AudioEngine = (() => {
  let ctx = null;
  let masterGain = null;
  const pistasActivas = {}; // id -> { gain, source?, osciladores?, tipo }
  let timerFadeId = null, timerStopId = null;

  // ── Escalas y presets para la música generativa (pads) ──
  const ESCALAS = {
    pentaMayor: [0, 2, 4, 7, 9],
    pentaMenor: [0, 3, 5, 7, 10],
    mayor: [0, 2, 4, 5, 7, 9, 11],
    lidio: [0, 2, 4, 6, 7, 9, 11],
  };

  function notaAFrecuencia(semitono, octava) {
    const midi = (octava + 1) * 12 + semitono; // C0 = MIDI 12
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  const PRESETS_PAD = {
    relajante: { escala: "pentaMayor", octavaBase: 4, voces: 2, onda: "sine", notaMin: 3, notaMax: 6, gapMin: 1, gapMax: 3, ataque: 1.5, nivel: 0.15, filtro: 3000 },
    meditacion: { escala: "pentaMenor", octavaBase: 3, voces: 3, onda: "sine", notaMin: 5, notaMax: 9, gapMin: 3, gapMax: 6, ataque: 2.5, nivel: 0.12, filtro: 1500 },
    concentracion: { escala: "pentaMayor", octavaBase: 4, voces: 1, onda: "sine", notaMin: 4, notaMax: 7, gapMin: 0.5, gapMax: 1.5, ataque: 1, nivel: 0.08, filtro: 1200 },
    sueno: { escala: "pentaMenor", octavaBase: 2, voces: 2, onda: "sine", notaMin: 6, notaMax: 10, gapMin: 4, gapMax: 8, ataque: 3, nivel: 0.12, filtro: 900 },
    piano: { escala: "mayor", octavaBase: 4, voces: 1, onda: "triangle", notaMin: 1.5, notaMax: 3, gapMin: 1, gapMax: 2.5, ataque: 0.02, nivel: 0.18, filtro: 4000 },
    ambient: { escala: "lidio", octavaBase: 4, voces: 3, onda: "sine", notaMin: 4, notaMax: 8, gapMin: 2, gapMax: 4, ataque: 2, nivel: 0.1, filtro: 2500 },
  };

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
    // "gris" y "verde" parten de ruido blanco y le dan forma con filtros,
    // en vez de generarse con su propio algoritmo de buffer.
    const bufferTipo = (tipo === "gris" || tipo === "verde") ? "blanco" : tipo;
    const buffer = crearBufferRuido(bufferTipo);
    const source = c.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const gain = c.createGain();
    gain.gain.value = 0;

    if (tipo === "gris") {
      // Aproximación de ruido gris: realza graves y agudos, atenúa medios (curva en V).
      const bajos = c.createBiquadFilter(); bajos.type = "lowshelf"; bajos.frequency.value = 200; bajos.gain.value = 8;
      const medios = c.createBiquadFilter(); medios.type = "peaking"; medios.frequency.value = 1500; medios.Q.value = 0.7; medios.gain.value = -10;
      const agudos = c.createBiquadFilter(); agudos.type = "highshelf"; agudos.frequency.value = 6000; agudos.gain.value = 6;
      source.connect(bajos).connect(medios).connect(agudos).connect(gain).connect(masterGain);
    } else if (tipo === "verde") {
      // Aproximación de ruido verde: realza el rango medio, alrededor de 500 Hz.
      const medio = c.createBiquadFilter(); medio.type = "peaking"; medio.frequency.value = 500; medio.Q.value = 0.6; medio.gain.value = 12;
      const corteAgudos = c.createBiquadFilter(); corteAgudos.type = "lowpass"; corteAgudos.frequency.value = 4000;
      source.connect(medio).connect(corteAgudos).connect(gain).connect(masterGain);
    } else {
      source.connect(gain).connect(masterGain);
    }

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
    if (tipoSonido === "platillos") {
      // Tingsha / platillos: dos tonos agudos y muy cercanos, para que se
      // note un ligero "batido" entre ambos, como el brillo real del metal.
      [1800, 1830].forEach(freq => {
        const o = c.createOscillator(); const g = c.createGain();
        o.type = "sine"; o.frequency.value = freq;
        g.gain.value = 0.0001;
        o.connect(g).connect(masterGain);
        o.start();
        g.gain.exponentialRampToValueAtTime(0.18, c.currentTime + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 1.8);
        o.stop(c.currentTime + 1.9);
      });
      return true;
    }
    const FREqS = { campana: 880, gong: 196, cuenco: 330, tibetano: 250 };
    const DURACIONES = { campana: 2.5, gong: 4.5, cuenco: 3.5, tibetano: 5 };
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

  function iniciarOlas(id) {
    const c = getCtx();
    if (!c) return false;
    detenerPista(id, true);
    const fuente = c.createBufferSource();
    fuente.buffer = crearBufferRuido("blanco", 4); fuente.loop = true;
    const filtro = c.createBiquadFilter(); filtro.type = "lowpass"; filtro.frequency.value = 700; filtro.Q.value = 0.8;
    const gainOla = c.createGain(); gainOla.gain.value = 0.5;
    const lfo = c.createOscillator(); lfo.type = "sine"; lfo.frequency.value = 0.09; // vaivén lento, tipo oleaje
    const lfoEscala = c.createGain(); lfoEscala.gain.value = 0.35;
    lfo.connect(lfoEscala).connect(gainOla.gain);
    const gainMaestro = c.createGain(); gainMaestro.gain.value = 0;
    fuente.connect(filtro).connect(gainOla).connect(gainMaestro).connect(masterGain);
    fuente.start(); lfo.start();
    pistasActivas[id] = { source: fuente, osciladores: [lfo], gain: gainMaestro, tipo: "olas" };
    return true;
  }

  function iniciarArroyo(id) {
    const c = getCtx();
    if (!c) return false;
    detenerPista(id, true);
    const fuente = c.createBufferSource();
    fuente.buffer = crearBufferRuido("blanco", 4); fuente.loop = true;
    const filtro = c.createBiquadFilter(); filtro.type = "bandpass"; filtro.frequency.value = 1800; filtro.Q.value = 1.3;
    const gainBurbujas = c.createGain(); gainBurbujas.gain.value = 0.5;
    const lfo = c.createOscillator(); lfo.type = "sine"; lfo.frequency.value = 4.5; // burbujeo rápido
    const lfo2 = c.createOscillator(); lfo2.type = "sine"; lfo2.frequency.value = 1.7; // segunda capa, para irregularidad
    const lfoEscala = c.createGain(); lfoEscala.gain.value = 0.2;
    const lfo2Escala = c.createGain(); lfo2Escala.gain.value = 0.15;
    lfo.connect(lfoEscala).connect(gainBurbujas.gain);
    lfo2.connect(lfo2Escala).connect(gainBurbujas.gain);
    const gainMaestro = c.createGain(); gainMaestro.gain.value = 0;
    fuente.connect(filtro).connect(gainBurbujas).connect(gainMaestro).connect(masterGain);
    fuente.start(); lfo.start(); lfo2.start();
    pistasActivas[id] = { source: fuente, osciladores: [lfo, lfo2], gain: gainMaestro, tipo: "arroyo" };
    return true;
  }

  function iniciarFuego(id) {
    const c = getCtx();
    if (!c) return false;
    detenerPista(id, true);
    // Cama base: un crepitar grave y constante.
    const base = c.createBufferSource();
    base.buffer = crearBufferRuido("marron", 4); base.loop = true;
    const filtroBase = c.createBiquadFilter(); filtroBase.type = "lowpass"; filtroBase.frequency.value = 800;
    const gainBase = c.createGain(); gainBase.gain.value = 0.5;
    base.connect(filtroBase).connect(gainBase);

    const gainMaestro = c.createGain(); gainMaestro.gain.value = 0;
    gainBase.connect(gainMaestro);
    gainMaestro.connect(masterGain);
    base.start();

    // "Chispas": estallidos agudos y breves, a intervalos aleatorios.
    let activo = true;
    const timeouts = [];
    function programarChispa() {
      if (!activo) return;
      const espera = 80 + Math.random() * 260;
      const t = setTimeout(() => {
        if (!activo) return;
        const chispa = c.createBufferSource();
        chispa.buffer = crearBufferRuido("blanco", 0.15);
        const filtroChispa = c.createBiquadFilter(); filtroChispa.type = "highpass"; filtroChispa.frequency.value = 2500 + Math.random() * 2000;
        const gainChispa = c.createGain(); gainChispa.gain.value = 0.0001;
        chispa.connect(filtroChispa).connect(gainChispa).connect(gainMaestro);
        chispa.start();
        const nivel = 0.15 + Math.random() * 0.3;
        gainChispa.gain.exponentialRampToValueAtTime(nivel, c.currentTime + 0.005);
        gainChispa.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.09);
        chispa.stop(c.currentTime + 0.12);
        programarChispa();
      }, espera);
      timeouts.push(t);
    }
    programarChispa();

    pistasActivas[id] = {
      source: base, gain: gainMaestro, tipo: "fuego",
      detener: () => { activo = false; timeouts.forEach(t => clearTimeout(t)); },
    };
    return true;
  }

  function iniciarTormenta(id) {
    const c = getCtx();
    if (!c) return false;
    detenerPista(id, true);
    // Capa de lluvia de base (siseo + goteo), igual que iniciarLluvia.
    const fuenteBase = c.createBufferSource();
    fuenteBase.buffer = crearBufferRuido("blanco", 4); fuenteBase.loop = true;
    const filtroBase = c.createBiquadFilter(); filtroBase.type = "highpass"; filtroBase.frequency.value = 1200;
    const gainBase = c.createGain(); gainBase.gain.value = 0.5;
    fuenteBase.connect(filtroBase).connect(gainBase);

    const fuenteGotas = c.createBufferSource();
    fuenteGotas.buffer = crearBufferRuido("blanco", 4); fuenteGotas.loop = true;
    const filtroGotas = c.createBiquadFilter(); filtroGotas.type = "bandpass"; filtroGotas.frequency.value = 3500; filtroGotas.Q.value = 0.7;
    const gainGotas = c.createGain(); gainGotas.gain.value = 0.35;
    const lfoGotas = c.createOscillator(); lfoGotas.type = "sine"; lfoGotas.frequency.value = 3.6;
    const lfoGotasEscala = c.createGain(); lfoGotasEscala.gain.value = 0.2;
    lfoGotas.connect(lfoGotasEscala).connect(gainGotas.gain);
    fuenteGotas.connect(filtroGotas).connect(gainGotas);

    const gainMaestro = c.createGain(); gainMaestro.gain.value = 0;
    gainBase.connect(gainMaestro); gainGotas.connect(gainMaestro);
    gainMaestro.connect(masterGain);
    fuenteBase.start(); fuenteGotas.start(); lfoGotas.start();

    // Truenos: estallidos graves y prolongados, a intervalos largos y aleatorios.
    let activo = true;
    const timeouts = [];
    function programarTrueno() {
      if (!activo) return;
      const espera = 9000 + Math.random() * 18000;
      const t = setTimeout(() => {
        if (!activo) return;
        const trueno = c.createBufferSource();
        trueno.buffer = crearBufferRuido("marron", 2.5);
        const filtroTrueno = c.createBiquadFilter(); filtroTrueno.type = "lowpass"; filtroTrueno.frequency.value = 180;
        const gainTrueno = c.createGain(); gainTrueno.gain.value = 0.0001;
        trueno.connect(filtroTrueno).connect(gainTrueno).connect(gainMaestro);
        trueno.start();
        const nivel = 0.5 + Math.random() * 0.4;
        gainTrueno.gain.exponentialRampToValueAtTime(nivel, c.currentTime + 0.3);
        gainTrueno.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 2.3);
        trueno.stop(c.currentTime + 2.5);
        programarTrueno();
      }, espera);
      timeouts.push(t);
    }
    programarTrueno();

    pistasActivas[id] = {
      source: fuenteBase, extraSources: [fuenteGotas], osciladores: [lfoGotas], gain: gainMaestro, tipo: "tormenta",
      detener: () => { activo = false; timeouts.forEach(t => clearTimeout(t)); },
    };
    return true;
  }

  // ── Música generativa: notas sueltas en una escala, superpuestas como un pad.
  // No es una grabación ni una canción fija: cada vez que suena, la secuencia
  // de notas es distinta (aleatoria dentro de la escala y el registro del preset). ──
  function iniciarPad(id, preset) {
    const c = getCtx();
    if (!c || !preset) return false;
    detenerPista(id, true);
    const gainMaestro = c.createGain(); gainMaestro.gain.value = 0;
    const filtro = c.createBiquadFilter(); filtro.type = "lowpass"; filtro.frequency.value = preset.filtro;
    filtro.connect(gainMaestro).connect(masterGain);

    let activo = true;
    const timeouts = [];
    const escala = ESCALAS[preset.escala] || ESCALAS.pentaMayor;

    function tocarNota() {
      if (!activo) return;
      const grado = escala[Math.floor(Math.random() * escala.length)];
      const desvioOctava = Math.random() < 0.6 ? 0 : (Math.random() < 0.5 ? -1 : 1);
      const freq = notaAFrecuencia(grado, preset.octavaBase + desvioOctava);
      const dur = preset.notaMin + Math.random() * (preset.notaMax - preset.notaMin);

      const gainNota = c.createGain(); gainNota.gain.value = 0.0001;
      const osciladoresNota = [];
      for (let i = 0; i < preset.voces; i++) {
        const o = c.createOscillator();
        o.type = preset.onda;
        o.frequency.value = freq * (1 + (i - (preset.voces - 1) / 2) * 0.004); // leve detune, calidez
        o.connect(gainNota);
        o.start();
        osciladoresNota.push(o);
      }
      gainNota.connect(filtro);
      const nivel = preset.nivel * (0.7 + Math.random() * 0.3);
      gainNota.gain.exponentialRampToValueAtTime(nivel, c.currentTime + preset.ataque);
      gainNota.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      osciladoresNota.forEach(o => o.stop(c.currentTime + dur + 0.2));

      const espera = (preset.gapMin + Math.random() * (preset.gapMax - preset.gapMin)) * 1000;
      timeouts.push(setTimeout(tocarNota, espera));
    }
    tocarNota();

    pistasActivas[id] = {
      gain: gainMaestro, tipo: "pad",
      detener: () => { activo = false; timeouts.forEach(t => clearTimeout(t)); },
    };
    return true;
  }

  // ── Pistas de archivo real (grabaciones), reproducidas con <audio> en loop
  // y enrutadas al mismo masterGain que las pistas sintetizadas, para que
  // el mezclador, el fade y el temporizador les funcionen igual. ──
  function iniciarArchivo(id, audioUrl) {
    const c = getCtx();
    if (!c || !audioUrl) return false;
    detenerPista(id, true);
    const el = new Audio(audioUrl);
    el.loop = true;
    el.crossOrigin = "anonymous";
    const source = c.createMediaElementSource(el);
    const gain = c.createGain();
    gain.gain.value = 0;
    source.connect(gain).connect(masterGain);
    el.play().catch(() => {});
    pistasActivas[id] = {
      gain, tipo: "archivo",
      detener: () => { try { el.pause(); el.src = ""; } catch (e) {} },
    };
    return true;
  }

  /** Punto de entrada único para pistas proceduales en loop (ruido, ambientes y música generativa). */
  function iniciarPistaProcedural(id, generador) {
    if (generador === "lluvia") return iniciarLluvia(id);
    if (generador === "viento") return iniciarViento(id);
    if (generador === "olas") return iniciarOlas(id);
    if (generador === "arroyo") return iniciarArroyo(id);
    if (generador === "fuego") return iniciarFuego(id);
    if (generador === "tormenta") return iniciarTormenta(id);
    if (generador && generador.startsWith("pad-")) return iniciarPad(id, PRESETS_PAD[generador.slice(4)]);
    return iniciarRuido(id, generador); // blanco | rosa | marron | gris | verde
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
        if (p.detener) p.detener(); // limpieza de scheduling propio (chispas, truenos, etc.)
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
    iniciarPistaProcedural, iniciarArchivo,
    estaActiva, pistasEnReproduccion, detenerPista, detenerTodo,
    iniciarTemporizador, cancelarTemporizador,
  };
})();
