/**
 * PERFIL-MODAL.JS — Modal de perfil compartido (juegos.html y ejercicios.html)
 * =================================================================================
 * Antes esta misma lógica (~90 líneas: abrir el modal, login/logout con
 * Google, selector de avatar, barra de nivel, guardar nombre) estaba
 * copiada en las dos páginas. Ahora vive una sola vez acá.
 *
 * Requiere que la página tenga, con esos IDs exactos, el modal de
 * `<!-- MODAL PERFIL -->` (ver juegos.html) y los botones `btnPerfil`
 * / `btnGuardarPerfil`, y que ya estén cargados Auth, Storage, Perfil
 * y escapeHtml (perfil.js).
 *
 * Uso, al final del script de cada página:
 *   PerfilModal.iniciar(render); // render = la función que refresca esa página
 */
const PerfilModal = (() => {
  let modalPerfil, onCambioCallback, disparador;

  function elementosFocables() {
    return [...modalPerfil.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.disabled && el.offsetParent !== null);
  }

  function atraparFoco(e) {
    if (e.key === "Escape") { e.preventDefault(); cerrar(); return; }
    if (e.key !== "Tab") return;
    const focables = elementosFocables();
    if (!focables.length) return;
    const primero = focables[0], ultimo = focables[focables.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  }

  function cerrar() {
    modalPerfil.hidden = true;
    modalPerfil.removeEventListener("keydown", atraparFoco);
    if (disparador) disparador.focus();
  }

  function actualizarBotonPerfil(user) {
    const btn = document.getElementById("btnPerfil");
    if (user && user.photoURL) {
      btn.innerHTML = `<img src="${escapeHtml(user.photoURL)}" alt="" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else {
      btn.textContent = "👤";
    }
  }

  function abrir() {
    const perfil = Storage.getPerfil();
    const user = Auth.usuarioActual();
    const cuentaDiv = document.getElementById("modalCuentaGoogle");
    if (user) {
      cuentaDiv.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;background:var(--bg);border-radius:var(--r);padding:10px 14px;">
          <img src="${escapeHtml(user.photoURL || "")}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:cover;background:var(--teal-pale);">
          <div style="flex:1;min-width:0;">
            <div style="font-weight:700;font-size:0.85rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(user.displayName || "Tu cuenta")}</div>
            <div style="font-size:0.72rem;color:var(--text-soft);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(user.email || "")}</div>
          </div>
          <button id="btnCerrarSesion" style="border:none;background:none;color:var(--teal);font-weight:700;font-size:0.78rem;cursor:pointer;">Salir</button>
        </div>`;
      document.getElementById("btnCerrarSesion").addEventListener("click", () => {
        Auth.cerrarSesion().then(() => { Storage.desvincularUsuario(); cerrar(); onCambioCallback(); });
      });
    } else {
      cuentaDiv.innerHTML = `
        <button id="btnLoginGoogle" style="width:100%;display:flex;align-items:center;justify-content:center;gap:10px;border:2px solid var(--teal-pale);background:white;border-radius:50px;padding:12px;font-weight:700;color:var(--text);cursor:pointer;">
          <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.9v2.33A9 9 0 0 0 9 18z"/><path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.03l3.05-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z"/></svg>
          Iniciar sesión con Google
        </button>
        <p style="font-size:0.72rem;color:var(--text-soft);text-align:center;margin-top:8px;">Tu progreso ya se está guardando en este dispositivo. Iniciá sesión para no perderlo si cambiás de celular o navegador.</p>`;
      document.getElementById("btnLoginGoogle").addEventListener("click", () => {
        Auth.iniciarSesion().then(() => {
          const u = Auth.usuarioActual();
          if (u) Storage.vincularUsuario(u).then(() => { onCambioCallback(); abrir(); });
        }).catch((err) => {
          // Sin este catch, cualquier error acá (Firebase nunca inicializado,
          // dominio no autorizado, lo que sea) quedaba completamente en
          // silencio y el click no hacía nada visible. Ahora se loguea y se
          // avisa SIEMPRE, no sólo para el caso de "Firebase no configurado".
          console.error("Auth: no se pudo iniciar sesión", err);
          if (err && err.message === "Firebase no configurado") {
            alert("No se pudo conectar con Google en este momento (puede ser un bloqueador de scripts o un problema de conexión). Podés seguir usando la app sin iniciar sesión: tu progreso se sigue guardando en este dispositivo.");
          } else {
            alert("No se pudo iniciar sesión con Google" + (err && err.code ? " (" + err.code + ")" : "") + ". Probá de nuevo.");
          }
        });
      });
    }

    document.getElementById("inputNombre").value = perfil.nombre || "";
    const avataresLista = document.getElementById("avataresLista");
    avataresLista.innerHTML = AVATARES.map(a => `<button class="jp-avatar-opcion ${a === perfil.avatar ? "activo" : ""}" data-av="${a}">${a}</button>`).join("");
    avataresLista.querySelectorAll("[data-av]").forEach(el => el.addEventListener("click", () => {
      Perfil.actualizarAvatar(el.dataset.av);
      avataresLista.querySelectorAll(".jp-avatar-opcion").forEach(x => x.classList.remove("activo"));
      el.classList.add("activo");
    }));
    const info = Perfil.progresoNivelActual(perfil.xp);
    document.getElementById("modalNivel").textContent = info.nivel;
    document.getElementById("modalXpTexto").textContent = `${info.xpEnNivel} / ${info.xpParaSiguiente} XP`;
    document.getElementById("modalNivelFill").style.width = `${Math.min(100, (info.xpEnNivel / info.xpParaSiguiente) * 100)}%`;
    modalPerfil.hidden = false;
    modalPerfil.addEventListener("keydown", atraparFoco);
    const focables = elementosFocables();
    if (focables.length) focables[0].focus();
  }

  return {
    /** onCambio(fn) se llama cada vez que cambia algo del perfil (login, logout, guardar nombre) — normalmente la función render() de la página. */
    iniciar(onCambio) {
      onCambioCallback = onCambio || (() => {});
      modalPerfil = document.getElementById("modalPerfil");
      document.getElementById("btnPerfil").addEventListener("click", (e) => { disparador = e.currentTarget; abrir(); });
      modalPerfil.addEventListener("click", (e) => { if (e.target === modalPerfil) cerrar(); });
      document.getElementById("btnGuardarPerfil").addEventListener("click", () => {
        Perfil.actualizarNombre(document.getElementById("inputNombre").value);
        cerrar();
        onCambioCallback();
      });
      Auth.onCambio((user) => {
        actualizarBotonPerfil(user);
        if (user) Storage.vincularUsuario(user).then(onCambioCallback);
        else onCambioCallback();
      });
    },
  };
})();
