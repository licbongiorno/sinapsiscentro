/**
 * CREATIVIDAD-MOTOR.JS — Combinador de elementos + anti-repetición
 * ======================================================================
 * Toma los bancos de data/creatividad-elementos.js y arma combinaciones
 * al azar (animales imposibles, personajes, mundos, historias). No
 * guarda combinaciones precalculadas: con bancos de ~100-150 elementos
 * por categoría, las combinaciones posibles ya se cuentan en cientos de
 * miles o millones (ver REGLA 24 del diseño), así que se generan al
 * vuelo cada vez.
 *
 * Anti-repetición: antes de aceptar una combinación, se arma una
 * "clave" con los elementos elegidos y se compara contra el historial
 * reciente (Storage.getHistorialGeneraciones()). Si ya salió hace poco,
 * se reintenta unas pocas veces — no es una garantía matemática, es
 * una heurística simple que alcanza para el tamaño de estos bancos.
 */

const CreatividadMotor = (() => {
  function elegir(array, n = 1) {
    const copia = [...array];
    const elegidos = [];
    for (let i = 0; i < n && copia.length; i++) {
      const idx = Math.floor(Math.random() * copia.length);
      elegidos.push(copia.splice(idx, 1)[0]);
    }
    return n === 1 ? elegidos[0] : elegidos;
  }

  /** Aplana cualquier resultado (con arrays u objetos anidados, como `combinar`) en una clave de texto estable para comparar contra el historial. */
  function claveDe(valor) {
    if (Array.isArray(valor)) return valor.map(claveDe).join(",");
    if (valor && typeof valor === "object") return Object.values(valor).map(claveDe).join("|");
    return String(valor);
  }

  /**
   * Reintenta `generador()` hasta MAX_INTENTOS veces si la clave
   * resultante está en el historial reciente. Registra la clave
   * aceptada para la próxima vez.
   */
  function conAntiRepeticion(generador) {
    const MAX_INTENTOS = 6;
    const historial = (typeof Storage !== "undefined") ? Storage.getHistorialGeneraciones() : [];
    let resultado = generador();
    let intentos = 0;
    while (historial.includes(claveDe(resultado)) && intentos < MAX_INTENTOS) {
      resultado = generador();
      intentos += 1;
    }
    if (typeof Storage !== "undefined") Storage.registrarGeneracion(claveDe(resultado));
    return resultado;
  }

  /** Banco de animales según edad: 3-5 usa sólo especies muy reconocibles. */
  function bancoAnimales(edad) {
    return (edad && edad <= 5) ? ANIMALES_COMUNES : ANIMALES;
  }

  return {
    elegir,

    /** REGLA 19: cabeza + cuerpo + cola de animales distintos, + color/textura/habilidad para edades mayores. */
    generarAnimalImposible({ edad = 99 } = {}) {
      return conAntiRepeticion(() => {
        const banco = bancoAnimales(edad);
        const [cabeza, cuerpo, cola] = elegir(banco, 3);
        const base = { tipo: "animal-imposible", cabeza, cuerpo, cola };
        if (edad > 5) {
          base.color = elegir(COLORES);
          base.textura = elegir(TEXTURAS);
        }
        if (edad >= 8) {
          base.habilidad = elegir(FANTASTICAS);
          base.habitat = elegir(LUGARES);
        }
        return base;
      });
    },

    /** REGLA 27: personaje con más o menos ingredientes según edad. */
    generarPersonaje({ edad = 99 } = {}) {
      return conAntiRepeticion(() => {
        const base = {
          tipo: "personaje",
          semilla: elegir(PERSONAJES),
          objeto: elegir(OBJETOS),
        };
        if (edad >= 6) {
          base.lugar = elegir(LUGARES);
          base.deseo = elegir(DESEOS);
        }
        if (edad >= 9) {
          base.problema = elegir(PROBLEMAS);
          base.companero = elegir(COMPANEROS);
        }
        if (edad >= 12) {
          base.secreto = elegir(SECRETOS);
          base.limitacion = elegir(LIMITACIONES);
        }
        return base;
      });
    },

    /** REGLA 28: mundo — lugar, clima, regla especial, recurso, conflicto según edad. */
    generarMundo({ edad = 99 } = {}) {
      return conAntiRepeticion(() => {
        const base = {
          tipo: "mundo",
          lugar: elegir(LUGARES),
          ambiente: elegir(AMBIENTES),
        };
        if (edad >= 6) {
          base.habitante = elegir(PERSONAJES);
          base.recurso = elegir(RECURSOS_MUNDO);
        }
        if (edad >= 9) {
          base.regla = elegir(REGLAS_MUNDO);
          base.conflicto = elegir(CONFLICTOS);
        }
        return base;
      });
    },

    /** REGLA 29: historia — protagonista, lugar, objeto, problema, y más ingredientes cuanto más grande. */
    generarHistoria({ edad = 99, genero = null } = {}) {
      return conAntiRepeticion(() => {
        const base = {
          tipo: "historia",
          genero: genero || elegir(GENEROS),
          protagonista: elegir(PERSONAJES),
          lugar: elegir(LUGARES),
          objeto: elegir(OBJETOS),
        };
        if (edad >= 6) {
          base.problema = elegir(PROBLEMAS);
          base.aliado = elegir(COMPANEROS);
        }
        if (edad >= 9) {
          base.obstaculo = elegir(CONFLICTOS);
          base.secreto = elegir(SECRETOS);
        }
        if (edad >= 12) {
          base.giro = elegir(ABSTRACTOS);
          base.restriccion = elegir(RESTRICCIONES);
        }
        return base;
      });
    },

    /**
     * REGLA 23: combinador genérico — mezcla cualquier lista de bancos
     * por nombre. Devuelve `elementos` como array (no objeto keyeado)
     * para poder pedir el mismo banco más de una vez (ej. dos objetos
     * distintos) sin que un resultado pise al otro.
     */
    combinar(bancos) {
      const TODOS_LOS_BANCOS = { animales: ANIMALES, objetos: OBJETOS, lugares: LUGARES, personajes: PERSONAJES,
        profesiones: PROFESIONES, acciones: ACCIONES };
      return conAntiRepeticion(() => {
        const elementos = bancos.map(nombreBanco => {
          const banco = TODOS_LOS_BANCOS[nombreBanco];
          return { banco: nombreBanco, valor: banco ? elegir(banco) : null };
        });
        return { tipo: "combinacion", elementos };
      });
    },

    /**
     * Todos los bancos por nombre, para que creatividad-item.html pueda
     * resolver el campo `inspiracion` de una actividad-prompt sin
     * tener que duplicar esta tabla.
     */
    bancos: {
      animales: ANIMALES, objetos: OBJETOS, lugares: LUGARES, personajes: PERSONAJES,
      profesiones: PROFESIONES, acciones: ACCIONES, emociones: EMOCIONES, fisicas: FISICAS,
      fantasticas: FANTASTICAS, ambientes: AMBIENTES, conflictos: CONFLICTOS, naturaleza: NATURALEZA,
      abstractos: ABSTRACTOS, generos: GENEROS, restricciones: RESTRICCIONES, colores: COLORES,
      texturas: TEXTURAS, deseos: DESEOS, problemas: PROBLEMAS, secretos: SECRETOS,
      limitaciones: LIMITACIONES, companeros: COMPANEROS, reglasMundo: REGLAS_MUNDO, recursosMundo: RECURSOS_MUNDO,
    },
  };
})();
