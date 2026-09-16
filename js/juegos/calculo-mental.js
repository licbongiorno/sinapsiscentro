(function () {
  const contenedor = document.getElementById("jgContenedor");
  GameEngine.iniciar({ juegoId: "calculo-mental", vidas: null, tiempoSegundos: 60 });

  function generar() {
    const ops = ["+", "-", "×"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, resultado;
    if (op === "+") { a = rnd(2, 50); b = rnd(2, 50); resultado = a + b; }
    else if (op === "-") { a = rnd(10, 60); b = rnd(1, a); resultado = a - b; }
    else { a = rnd(2, 12); b = rnd(2, 12); resultado = a * b; }

    const opciones = new Set([resultado]);
    while (opciones.size < 4) {
      const ruido = resultado + (rnd(1, 9)) * (Math.random() < 0.5 ? -1 : 1);
      if (ruido >= 0) opciones.add(ruido);
    }
    return { texto: `${a} ${op} ${b}`, resultado, opciones: [...opciones].sort(() => Math.random() - 0.5) };
  }
  function rnd(min, max) { return min + Math.floor(Math.random() * (max - min + 1)); }

  function render() {
    const { texto, resultado, opciones } = generar();
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <div style="font-size:2.2rem;font-weight:800;color:var(--navy);margin:10px 0 26px;">${texto}</div>
        <div class="jg-opciones">
          ${opciones.map(o => `<button class="jg-opcion" data-v="${o}" style="text-align:center;font-size:1.1rem;">${o}</button>`).join("")}
        </div>
      </div>`;
    contenedor.querySelectorAll(".jg-opcion").forEach(btn => btn.addEventListener("click", () => {
      if (Number(btn.dataset.v) === resultado) {
        btn.classList.add("correcta");
        GameEngine.sumarPuntos(10);
      } else {
        btn.classList.add("incorrecta");
      }
      setTimeout(render, 500);
    }));
  }

  render();
})();
