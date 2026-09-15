/**
 * RECORDATORIO-RACHA.JS — Botón flotante para avisar cuando la racha
 * está por cortarse.
 * ==========================================================================
 * OJO: esto NO es un push real — no llega si el navegador está cerrado.
 * Usa la Notification API mientras el sitio está abierto en alguna
 * pestaña: si hoy todavía no hay actividad registrada y hay una racha
 * en juego, muestra un aviso (como máximo uno por día). El permiso del
 * navegador sólo se pide cuando la persona toca el botón 🔕 — nunca
 * apenas carga la página.
 */
(function () {
  const CLAVE_ACTIVO = "sinapsis_recordatorio_racha";
  const CLAVE_ULTIMA_NOTIF = "sinapsis_recordatorio_ultima_notif";
  const soportado = typeof window !== "undefined" && "Notification" in window;

  function activo() {
    if (!soportado) return false;
    try { return localStorage.getItem(CLAVE_ACTIVO) === "1" && Notification.permission === "granted"; }
    catch (e) { return false; }
  }

  function actualizarBoton(btn) {
    const on = activo();
    btn.textContent = on ? "🔔" : "🔕";
    btn.setAttribute("aria-pressed", String(on));
    btn.title = on
      ? "Recordatorio de racha activado — tocá para desactivar"
      : "Avisame acá si mi racha está por cortarse";
    btn.setAttribute("aria-label", btn.title);
  }

  function alternar(btn) {
    if (activo()) {
      try { localStorage.setItem(CLAVE_ACTIVO, "0"); } catch (e) {}
      actualizarBoton(btn);
      return;
    }
    if (!soportado) { alert("Tu navegador no soporta notificaciones."); return; }
    Notification.requestPermission().then((permiso) => {
      if (permiso === "granted") {
        try { localStorage.setItem(CLAVE_ACTIVO, "1"); } catch (e) {}
        new Notification("¡Listo! 🔥", {
          body: "Te vamos a avisar acá (con el sitio abierto) si tu racha está por cortarse.",
          icon: "icon-192.png",
        });
      } else if (permiso === "denied") {
        alert("Bloqueaste las notificaciones para este sitio. Para activarlas, cambiá el permiso desde la configuración del navegador.");
      }
      actualizarBoton(btn);
    });
  }

  function crearBoton() {
    if (!soportado) return;
    if (document.getElementById("btnRecordatorioRacha")) return;
    const btn = document.createElement("button");
    btn.id = "btnRecordatorioRacha";
    btn.type = "button";
    actualizarBoton(btn);
    btn.addEventListener("click", () => alternar(btn));
    document.body.appendChild(btn);
  }

  function verificarYNotificar() {
    if (!activo() || typeof Storage === "undefined" || !Storage.getRacha) return;
    const hoy = new Date().toISOString().slice(0, 10);
    let ultimaNotif = null;
    try { ultimaNotif = localStorage.getItem(CLAVE_ULTIMA_NOTIF); } catch (e) {}
    if (ultimaNotif === hoy) return; // ya avisamos hoy
    const racha = Storage.getRacha();
    if (!racha || !racha.dias || racha.ultimoDia === hoy) return; // sin racha en juego, o ya cumplida hoy
    new Notification("¡No pierdas tu racha! 🔥", {
      body: `Llevás ${racha.dias} día${racha.dias === 1 ? "" : "s"} seguidos. Entrá un ratito hoy para no perderla.`,
      icon: "icon-192.png",
    });
    try { localStorage.setItem(CLAVE_ULTIMA_NOTIF, hoy); } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", crearBoton);
  } else {
    crearBoton();
  }

  // Storage puede terminar de cargar después que este script (el orden
  // exacto de los <script defer> varía según la página) — le damos un
  // margen antes de leer la racha.
  setTimeout(verificarYNotificar, 800);
})();
