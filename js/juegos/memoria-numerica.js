(function () {
  const contenedor = document.getElementById("jgContenedor");
  let nivel = 3;
  const NIVEL_MAX = 8;

  GameEngine.iniciar({ juegoId: "memoria-numerica", vidas: 3, tiempoSegundos: null });

  function nuevoNivel() {
    if (nivel > NIVEL_MAX) {
      GameEngine.terminar({ puntaje: GameEngine.puntosActuales(), exito: true, mensaje: "¡Llegaste al nivel máximo!" });
      return;
    }
    const numero = Array.from({ length: nivel }, () => Math.floor(Math.random() * 10)).join("");
    contenedor.innerHTML = `
      <div style="text-align:center;">
        <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">Memorizá el número</p>
        <div style="font-size:2.4rem;font-weight:800;letter-spacing:0.1em;color:var(--navy);">${numero}</div>
      </div>`;
    setTimeout(() => {
      contenedor.innerHTML = `
        <div style="text-align:center;">
          <p style="color:var(--text-mid);font-size:0.85rem;margin-bottom:14px;">Escribí el número que viste</p>
          <input id="inputNumero" type="tel" inputmode="numeric" maxlength="${nivel}"
            style="font-size:1.8rem;text-align:center;letter-spacing:0.1em;width:min(80vw,260px);border:2px solid var(--teal-pale);border-radius:var(--r);padding:12px;font-family:inherit;">
          <br><button id="btnConfirmarNumero" class="ge-btn ge-btn-principal" style="margin-top:18px;">Confirmar</button>
        </div>`;
      const input = document.getElementById("inputNumero");
      input.focus();
      const confirmar = () => {
        if (input.value === numero) {
          GameEngine.sumarPuntos(nivel * 5);
          nivel += 1;
        } else {
          GameEngine.restarVida();
          nivel = 3;
        }
        setTimeout(nuevoNivel, 400);
      };
      document.getElementById("btnConfirmarNumero").addEventListener("click", confirmar);
      input.addEventListener("keydown", (e) => { if (e.key === "Enter") confirmar(); });
    }, 1000 + nivel * 400);
  }

  nuevoNivel();
})();
