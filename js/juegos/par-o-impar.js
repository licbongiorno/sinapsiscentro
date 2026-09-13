(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "par-o-impar", vidas: null, tiempoSegundos: 40 });

  function ronda() {
    const n = 1 + Math.floor(Math.random() * 98);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;">¿Par o impar?</p>
        <div style="font-size:3.2rem;font-weight:800;color:var(--navy);margin-bottom:28px;">${n}</div>
        <div style="display:flex;justify-content:center;gap:16px;">
          <button data-v="par" class="jg-opcion" style="text-align:center;">PAR</button>
          <button data-v="impar" class="jg-opcion" style="text-align:center;">IMPAR</button>
        </div>
      </div>`;
    const correcta = n % 2 === 0 ? "par" : "impar";
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (btn.dataset.v === correcta) GameEngine.sumarPuntos(6);
      ronda();
    }));
  }

  ronda();
})();
