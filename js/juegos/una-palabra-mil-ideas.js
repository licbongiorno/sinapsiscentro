(function () {
  const contenedor = document.getElementById("jgContenedor");
  const PALABRAS = ["Libertad","Fuego","Puente","Espejo","Camino","Tiempo","Semilla",
    "Hogar","Coraje","Distancia","Raíz","Horizonte","Silencio","Cambio",
    "Confianza","Música","Infancia","Tormenta","Refugio","Despertar",
    "Equilibrio","Ternura","Frontera","Memoria","Vértigo","Cosecha",
    "Origen","Umbral","Latido","Asombro","Constancia","Abismo","Resiliencia","Vínculo","Presencia"];
  const palabra = PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
  let ideas = [];

  GameEngine.iniciar({ juegoId: "una-palabra-mil-ideas", vidas: null, tiempoSegundos: 60 });

  contenedor.innerHTML = `
    <div style="width:min(94vw,440px);margin:0 auto;text-align:center;">
      <p style="color:var(--text-mid);margin-bottom:6px;font-size:0.9rem;">Escribí todas las ideas que se te ocurran para:</p>
      <p style="font-family:'Playfair Display',serif;font-size:1.8rem;color:var(--navy);margin-bottom:18px;">${palabra}</p>
      <div style="display:flex;gap:8px;">
        <input id="inputIdea" type="text" placeholder="Una idea…" maxlength="30" style="flex:1;border:2px solid var(--teal-pale);border-radius:50px;padding:12px 18px;font-family:inherit;font-size:1rem;">
        <button id="btnAgregarIdea" style="border:none;border-radius:50px;padding:0 22px;background:linear-gradient(135deg,var(--teal),var(--teal-mid));color:white;font-weight:800;cursor:pointer;">＋</button>
      </div>
      <div id="listaIdeas" style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-top:16px;"></div>
    </div>`;

  const input = document.getElementById("inputIdea");
  input.focus();
  const agregar = () => {
    const val = input.value.trim();
    if (!val) return;
    ideas.push(val);
    GameEngine.sumarPuntos(5);
    document.getElementById("listaIdeas").innerHTML = ideas.map(i => `<span style="background:var(--teal-pale);color:var(--teal-deep);padding:6px 12px;border-radius:50px;font-size:0.82rem;font-weight:700;">${i}</span>`).join("");
    input.value = ""; input.focus();
  };
  document.getElementById("btnAgregarIdea").addEventListener("click", agregar);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") agregar(); });
})();
