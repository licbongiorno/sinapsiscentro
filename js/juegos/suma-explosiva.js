(function () {
  const contenedor = document.getElementById("jgContenedor");
  let objetivo = 0, elegidos = [];

  GameEngine.iniciar({ juegoId: "suma-explosiva", vidas: null, tiempoSegundos: 50 });

  function nuevaRonda() {
    elegidos = [];
    const cantidad = 6;
    const numeros = Array.from({ length: cantidad }, () => 1 + Math.floor(Math.random() * 9));
    const usados = numeros.slice(0, 2);
    objetivo = usados[0] + usados[1];
    render(numeros);
  }

  function render(numeros) {
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:10px;">Tocá dos números que sumen</p>
        <div style="font-size:2rem;font-weight:800;color:var(--navy);margin-bottom:20px;">${objetivo} 💥</div>
        <div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;">
          ${numeros.map((n, idx) => `<button data-idx="${idx}" data-v="${n}" style="width:54px;height:54px;border-radius:50%;border:none;background:linear-gradient(135deg,var(--teal),var(--teal-mid));color:white;font-weight:800;font-size:1.2rem;cursor:pointer;">${n}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll("[data-idx]").forEach(btn => btn.addEventListener("click", () => {
      if (elegidos.includes(btn)) return;
      btn.style.opacity = "0.4";
      elegidos.push(btn);
      if (elegidos.length === 2) {
        const suma = elegidos.reduce((a, b) => a + Number(b.dataset.v), 0);
        if (suma === objetivo) {
          GameEngine.sumarPuntos(10);
        }
        setTimeout(nuevaRonda, 250);
      }
    }));
  }

  nuevaRonda();
})();
