(function () {
  const contenedor = document.getElementById("jgContenedor");
  const INICIOS = ["Todo empezó una noche de tormenta, cuando", "Nadie recuerda cómo llegó ahí, pero", "El mapa mostraba un lugar que no existía, hasta que",
    "En el fondo del cajón más viejo de la casa apareció", "La última persona en salir del pueblo fue",
    "Cuando el reloj de la plaza dejó de andar, todos notaron que", "El barco llegó sin nadie a bordo, salvo",
    "Cada vez que alguien mencionaba ese nombre, algo cambiaba: por ejemplo", "La carta nunca llegó a destino porque",
    "En esa casa, las puertas se abrían solas cuando", "Nadie sabía por qué el bosque crecía más rápido cada",
    "El día que se fue la luz de todo el barrio, alguien vio", "La última página del diario decía sólo",
    "Todos los relojes de la ciudad marcaban una hora distinta, excepto", "El tren fantasma volvió a pasar la noche que",
    "El único testigo de lo que pasó fue", "Nadie quiso volver a ese lugar después de", "La leyenda del pueblo empezó cuando",
    "En el fondo del lago apareció algo que nadie esperaba:", "Cada vez que llovía, en esa casa se escuchaba",
    "El forastero que llegó esa tarde traía", "Todos los años, en la misma fecha, el pueblo entero", "La puerta trasera del teatro llevaba a",
    "En el último cajón de su escritorio guardaba", "Cuando por fin abrieron la caja fuerte, encontraron"];
  let oraciones = [INICIOS[Math.floor(Math.random() * INICIOS.length)]];
  const LIMITE = 8;

  GameEngine.iniciar({ juegoId: "historia-infinita", vidas: null, tiempoSegundos: null });

  function render() {
    contenedor.innerHTML = `
      <div style="width:min(94vw,480px);margin:0 auto;">
        <div style="background:white;border:2px solid var(--teal-pale);border-radius:var(--r);padding:20px;min-height:140px;font-size:1rem;line-height:1.7;color:var(--text);">
          ${oraciones.join(" ")}<span style="opacity:0.3;">▌</span>
        </div>
        <p style="text-align:center;font-size:0.78rem;color:var(--text-soft);margin:10px 0 16px;">${oraciones.length - 1} / ${LIMITE} aportes</p>
        <textarea class="jg-caja-texto" id="inputHistoriaInf" placeholder="Continuá la historia…" style="min-height:70px;"></textarea>
        <div style="display:flex;gap:10px;margin-top:12px;">
          <button id="btnAgregarHistInf" class="ge-btn ge-btn-principal" style="flex:1;">Agregar</button>
          <button id="btnTerminarHistInf" class="ge-btn ge-btn-secundario" style="flex:1;">Terminar acá</button>
        </div>
      </div>`;
    document.getElementById("btnAgregarHistInf").addEventListener("click", () => {
      const val = document.getElementById("inputHistoriaInf").value.trim();
      if (!val) return;
      oraciones.push(val);
      GameEngine.sumarPuntos(4);
      if (oraciones.length - 1 >= LIMITE) { terminar(); return; }
      render();
    });
    document.getElementById("btnTerminarHistInf").addEventListener("click", terminar);
  }

  function terminar() { GameEngine.terminar({ puntaje: 0, exito: true, mensaje: "¡Historia construida entre todos!" }); }

  render();
})();
