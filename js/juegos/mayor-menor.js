(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "mayor-menor", vidas: null, tiempoSegundos: 45 });

  function ronda() {
    const a = 1 + Math.floor(Math.random() * 99);
    let b = 1 + Math.floor(Math.random() * 99);
    while (b === a) b = 1 + Math.floor(Math.random() * 99);
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:16px;">Tocá el número más grande</p>
        <div style="display:flex;justify-content:center;gap:16px;">
          <button data-v="${a}" style="width:110px;height:110px;border-radius:20px;border:none;background:linear-gradient(135deg,var(--teal),var(--teal-mid));color:white;font-size:2.2rem;font-weight:800;cursor:pointer;">${a}</button>
          <button data-v="${b}" style="width:110px;height:110px;border-radius:20px;border:none;background:linear-gradient(135deg,var(--teal),var(--teal-mid));color:white;font-size:2.2rem;font-weight:800;cursor:pointer;">${b}</button>
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-v]").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.v) === Math.max(a, b)) GameEngine.sumarPuntos(6);
      ronda();
    }));
  }

  ronda();
})();
