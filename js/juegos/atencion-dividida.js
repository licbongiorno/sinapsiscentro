(function () {
  const contenedor = document.getElementById("jgContenedor");
  let ronda = 0;
  const TOTAL = 5;

  GameEngine.iniciar({ juegoId: "atencion-dividida", vidas: 3, tiempoSegundos: null });

  function nuevaRonda() {
    ronda += 1;
    if (ronda > TOTAL) { GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Completaste el desafío!" }); return; }
    const tam = 16;
    let conteoAzul = 0;
    const items = Array.from({ length: tam }, () => {
      const tipo = Math.random() < 0.35 ? "azul" : (Math.random() < 0.5 ? "rojo" : "verde");
      if (tipo === "azul") conteoAzul += 1;
      return tipo;
    });
    const colores = { azul: "#2aaec2", rojo: "#e06060", verde: "#4caf6a" };
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:6px;">Ronda ${ronda} de ${TOTAL}</p>
        <p style="font-weight:700;color:var(--navy);margin-bottom:14px;">Tocá todos los cuadrados ROJOS y, en paralelo, contá cuántos círculos AZULES hay.</p>
        <div class="jg-grilla-simbolos" style="grid-template-columns:repeat(4,1fr);">
          ${items.map((t, i) => `<div data-i="${i}" style="aspect-ratio:1;border-radius:${t === "azul" ? "50%" : "10px"};background:${colores[t]};cursor:${t === "rojo" ? "pointer" : "default"};opacity:${t === "rojo" ? "1" : "0.85"};"></div>`).join("")}
        </div>
        <p id="txtRojos" style="margin-top:14px;color:var(--text-soft);font-size:0.85rem;">Rojos tocados: 0</p>
        <button id="btnListoAD" class="ge-btn ge-btn-principal" style="margin-top:10px;">Ya toqué todos, preguntame</button>
      </div>`;
    let tocados = 0;
    const totalRojos = items.filter(t => t === "rojo").length;
    contenedor.querySelectorAll("[data-i]").forEach(el => {
      if (items[Number(el.dataset.i)] !== "rojo") return;
      el.addEventListener("click", () => {
        if (el.dataset.tocado) return;
        el.dataset.tocado = "1"; el.style.opacity = "0.25";
        tocados += 1;
        document.getElementById("txtRojos").textContent = `Rojos tocados: ${tocados} / ${totalRojos}`;
      });
    });
    document.getElementById("btnListoAD").addEventListener("click", () => {
      const opciones = new Set([conteoAzul]);
      while (opciones.size < 3) opciones.add(Math.max(0, conteoAzul + (Math.floor(Math.random() * 4) - 2)));
      contenedor.innerHTML = `
        <div style="text-align:center;">
          <p style="color:var(--text-mid);margin-bottom:14px;">¿Cuántos círculos azules había?</p>
          <div class="jg-opciones">${[...opciones].sort(() => Math.random() - 0.5).map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;">${o}</button>`).join("")}</div>
        </div>`;
      contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
        const bien = Number(btn.dataset.v) === conteoAzul && tocados === totalRojos;
        if (bien) GameEngine.sumarPuntos(20); else GameEngine.restarVida();
        nuevaRonda();
      }));
    });
  }

  nuevaRonda();
})();
