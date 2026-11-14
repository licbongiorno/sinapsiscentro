/**
 * CONSULTA.JS — Formulario de "primera consulta" + botón flotante de WhatsApp
 * ===========================================================================
 * 1) En cualquier elemento con [data-consulta] dibuja un formulario corto
 *    (para quién, edad, motivo, CUD, obra social) que NO envía nada a ningún
 *    servidor: arma el texto y abre WhatsApp con el mensaje ya escrito, para
 *    que la familia sólo tenga que tocar "enviar". Así se baja la barrera de
 *    "no sé qué escribir" y al centro le llega el caso ordenado.
 *    data-motivo="tea|cud|tdah|lenguaje|..." preselecciona el motivo.
 *
 * 2) Si la página no tiene ya un botón flotante (.fab), agrega uno con el
 *    mensaje de <body data-wa-mensaje="..."> (o uno genérico armado con el H1).
 *
 * Analytics: sólo envía el evento "generate_lead" con la ubicación del botón.
 * Nunca envía a Google Analytics el motivo, la edad ni ningún dato de salud.
 *
 * Se carga ANTES de analytics-eventos.js (ambos con defer, el orden se
 * respeta) para que el .fab agregado acá también quede instrumentado.
 */
(function () {
  var TEL = "5491168567160";

  var MOTIVOS = [
    ["tea", "Autismo / TEA"],
    ["lenguaje", "Lenguaje o habla"],
    ["aprendizaje", "Aprendizaje o escuela"],
    ["tdah", "Atención / TDAH"],
    ["emocional", "Emociones, ansiedad o conducta"],
    ["desarrollo", "Desarrollo de un bebé o niño pequeño"],
    ["cud", "Prestaciones por discapacidad / CUD"],
    ["evaluacion", "Evaluación o diagnóstico"],
    ["adultos-mayores", "Adultos mayores / kinesiología"],
    ["vocacional", "Orientación vocacional u ocupacional"],
    ["otro", "Otro motivo"]
  ];

  function waUrl(texto) {
    return "https://wa.me/" + TEL + "?text=" + encodeURIComponent(texto);
  }

  function evento(ubicacion) {
    if (window.gtag) window.gtag("event", "generate_lead", { ubicacion: ubicacion, metodo: "whatsapp" });
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (html != null) n.innerHTML = html;
    return n;
  }

  var contador = 0;
  function campo(label, control) {
    var id = "cq-" + (++contador);
    control.id = id;
    var wrap = el("div", { "class": "cq-campo" });
    wrap.appendChild(el("label", { "for": id }, label));
    wrap.appendChild(control);
    return wrap;
  }

  function select(nombre, opciones, valor) {
    var s = el("select", { name: nombre });
    opciones.forEach(function (o) {
      var op = el("option", { value: o[0] }, o[1]);
      if (o[0] === valor) op.selected = true;
      s.appendChild(op);
    });
    return s;
  }

  function armarFormulario(contenedor) {
    var motivoInicial = contenedor.getAttribute("data-motivo") || "";
    var form = el("form", { "class": "cq-form", novalidate: "" });
    form.appendChild(el("h2", { "class": "cq-titulo" }, "Armá tu consulta en 30 segundos"));
    form.appendChild(el("p", { "class": "cq-sub" }, "Completá lo que sepas y te abrimos WhatsApp con el mensaje listo. No guardamos ningún dato: lo que escribas va directo a tu chat con el centro."));

    var grid = el("div", { "class": "cq-grid" });
    var para = select("para", [["mi hijo/a", "Mi hijo o hija"], ["mí", "Para mí"], ["un familiar", "Otro familiar"]], "mi hijo/a");
    var edad = el("input", { name: "edad", type: "text", inputmode: "numeric", autocomplete: "off", placeholder: "Ej: 3 años", maxlength: "20" });
    var motivo = select("motivo", [["", "Elegí una opción"]].concat(MOTIVOS), motivoInicial);
    var cud = select("cud", [["", "Prefiero no decir / no sé"], ["sí", "Sí, tiene CUD"], ["en trámite", "Está en trámite"], ["no", "No tiene CUD"]], "");
    var obra = el("input", { name: "obra", type: "text", autocomplete: "off", placeholder: "Ej: OSDE, OSECAC, particular", maxlength: "60" });
    var nombre = el("input", { name: "nombre", type: "text", autocomplete: "given-name", placeholder: "Opcional", maxlength: "40" });

    grid.appendChild(campo("¿Para quién es la consulta?", para));
    grid.appendChild(campo("Edad", edad));
    grid.appendChild(campo("Motivo principal", motivo));
    grid.appendChild(campo("¿Tiene CUD?", cud));
    grid.appendChild(campo("Obra social o prepaga", obra));
    grid.appendChild(campo("Tu nombre", nombre));
    form.appendChild(grid);

    var boton = el("button", { type: "submit", "class": "svc-btn-main cq-enviar" }, "<span>Abrir WhatsApp con mi consulta</span><span class=\"arrow\" aria-hidden=\"true\">→</span>");
    form.appendChild(boton);
    form.appendChild(el("p", { "class": "cq-legal" }, "Respondemos de lunes a viernes de 9 a 20 hs y sábados de 9 a 13 hs. Primera entrevista habitualmente en menos de 48 hs."));
    // Transparencia sobre datos personales (Ley 25.326): el formulario no guarda ni envía nada
    // por su cuenta; sólo arma el texto que la persona decide mandar por WhatsApp.
    form.appendChild(el("p", { "class": "cq-legal" }, "Este formulario no guarda tus datos: solo prepara un mensaje de WhatsApp que vos revisás y decidís enviar. No hace falta contar detalles de salud por este medio. <a href=\"privacidad.html\">Política de privacidad</a>."));

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var motivoTxt = "";
      MOTIVOS.forEach(function (m) { if (m[0] === motivo.value) motivoTxt = m[1]; });
      var partes = ["Hola, Centro Sinapsis!" + (nombre.value.trim() ? " Soy " + nombre.value.trim() + "." : "")];
      partes.push("Quisiera pedir una primera consulta para " + para.value + (edad.value.trim() ? " (" + edad.value.trim() + ")" : "") + ".");
      if (motivoTxt) partes.push("Motivo: " + motivoTxt + ".");
      if (cud.value) partes.push("CUD: " + cud.value + ".");
      if (obra.value.trim()) partes.push("Obra social / prepaga: " + obra.value.trim() + ".");
      evento("formulario-consulta");
      var url = waUrl(partes.join("\n"));
      var w = window.open(url, "_blank", "noopener");
      if (!w) window.location.href = url;
    });

    contenedor.appendChild(form);
  }

  function agregarFab() {
    if (document.querySelector(".fab")) return;
    if (!document.querySelector(".svc-nav")) return; // sólo páginas de servicio
    var msg = document.body.getAttribute("data-wa-mensaje");
    if (!msg) {
      var h1 = document.querySelector("h1");
      msg = "Hola! Quisiera consultar" + (h1 ? " por " + h1.textContent.trim() : "") + ".";
    }
    var a = el("a", {
      href: waUrl(msg), target: "_blank", rel: "noopener", "class": "fab",
      title: "Consultar por WhatsApp", "aria-label": "Consultar por WhatsApp"
    }, '<svg viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" style="vertical-align:-0.125em"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg><span class="fab-txt">Consultar</span>');
    // Dentro de un <aside> con nombre: así el botón queda en una región
    // identificable para lectores de pantalla (WCAG / axe "region").
    var aside = el("aside", { "aria-label": "Contacto rápido por WhatsApp" }, "");
    aside.appendChild(a);
    document.body.appendChild(aside);

    var t;
    window.addEventListener("scroll", function () {
      a.classList.add("scroll-dim");
      clearTimeout(t);
      t = setTimeout(function () { a.classList.remove("scroll-dim"); }, 220);
    }, { passive: true });
    var footer = document.querySelector("footer");
    if (footer && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { a.classList.toggle("near-footer", en.isIntersecting); });
      }, { threshold: 0.05 }).observe(footer);
    }
  }

  /* ── 3) Selector de especialidad ──────────────────────────────────
   * Los enlaces con [data-wa-selector] (botones genéricos de la home) no
   * van directo a WhatsApp: abren un panel corto para elegir el área y el
   * mensaje sale ya con esa especialidad. "Escribir sin elegir" mantiene
   * el camino de siempre, así que nunca suma un paso obligatorio.
   * Sin JS, el enlace sigue funcionando como antes (href original).
   * Analytics recibe solo el área de servicio (dato institucional), nunca
   * el motivo de consulta ni datos de salud. */
  var AREAS = [
    ["psicologia", "Psicología"],
    ["psicopedagogia", "Psicopedagogía"],
    ["fonoaudiologia", "Fonoaudiología"],
    ["terapia-ocupacional", "Terapia ocupacional"],
    ["evaluaciones", "Evaluaciones (TEA, neurocognitiva, psicodiagnóstico)"],
    ["estimulacion", "Estimulación temprana o cognitiva"],
    ["kinesiologia", "Kinesiología para adultos mayores"],
    ["vocacional", "Orientación vocacional"],
    ["cud", "Atención con CUD"],
    ["orientacion", "No sé qué área necesito"]
  ];

  function estilosSelector() {
    if (document.getElementById("wa-sel-css")) return;
    var css = [
      ".wa-sel{position:fixed;z-index:100001;right:16px;bottom:88px;width:min(360px,calc(100vw - 32px));max-height:calc(100dvh - 120px);overflow:auto;",
      "background:#fff;color:#0d2a38;border-radius:20px;box-shadow:0 24px 60px rgba(8,32,46,.32);padding:18px 16px 14px;font-family:Nunito,system-ui,sans-serif;",
      "transform-origin:100% 100%;animation:waSelIn .22s cubic-bezier(.2,.8,.2,1) both}",
      "@keyframes waSelIn{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}",
      ".wa-sel h2{font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:500;margin:0 34px 4px 4px;line-height:1.25}",
      ".wa-sel p{font-size:.84rem;color:#4a6472;margin:0 4px 12px}",
      ".wa-sel ul{list-style:none;margin:0;padding:0;display:grid;gap:6px}",
      ".wa-sel li a{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 14px;border-radius:12px;background:#f1f7f9;color:#0d2a38;text-decoration:none;font-weight:600;font-size:.92rem;transition:background .15s,transform .15s}",
      ".wa-sel li a::after{content:'→';color:#1a7a8a;transition:transform .15s}",
      ".wa-sel li a:hover,.wa-sel li a:focus-visible{background:#dff0f3}.wa-sel li a:hover::after{transform:translateX(3px)}",
      ".wa-sel li a:active{transform:scale(.98)}",
      ".wa-sel a.wa-sel-libre{display:flex;align-items:center;gap:10px;padding:13px 14px;border-radius:12px;text-decoration:none;font-weight:700;font-size:.95rem;margin-top:10px;background:#0e7a35;color:#fff;justify-content:center}.wa-sel a.wa-sel-libre::after{color:#fff}",
      ".wa-sel a.wa-sel-libre:hover,.wa-sel a.wa-sel-libre:focus-visible{background:#0a5c2e}",
      ".wa-sel-cerrar{position:absolute;top:10px;right:10px;width:36px;height:36px;border:0;border-radius:50%;background:#f1f7f9;color:#0d2a38;font-size:1.2rem;cursor:pointer}",
      ".wa-sel-nota{font-size:.75rem!important;margin:10px 4px 0!important;text-align:center}",
      ".wa-sel-fondo{position:fixed;inset:0;z-index:100000;background:rgba(8,32,46,.35)}",
      "@media (max-width:520px){.wa-sel{left:12px;right:12px;width:auto;bottom:12px;border-radius:22px}}",
      "@media (prefers-reduced-motion:reduce){.wa-sel{animation:none}}"
    ].join("");
    var s = document.createElement("style");
    s.id = "wa-sel-css";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function minusculaInicial(t) { return t.charAt(0).toLowerCase() + t.slice(1); }

  var panelAbierto = null;

  function cerrarSelector() {
    if (!panelAbierto) return;
    var p = panelAbierto;
    panelAbierto = null;
    p.fondo.remove();
    p.panel.remove();
    document.removeEventListener("keydown", p.teclas);
    p.origen.setAttribute("aria-expanded", "false");
    p.origen.focus();
  }

  function abrirSelector(origen) {
    estilosSelector();
    var ubicacion = origen.getAttribute("data-wa-selector") || "selector";
    var fondo = el("div", { "class": "wa-sel-fondo" });
    var panel = el("div", { "class": "wa-sel", role: "dialog", "aria-modal": "true", "aria-labelledby": "wa-sel-titulo" });
    panel.appendChild(el("h2", { id: "wa-sel-titulo" }, "¿Sobre qué área querés consultar?"));
    panel.appendChild(el("p", {}, "Elegí una y te abrimos WhatsApp con el mensaje listo. Si no sabés, también está bien: te orientamos."));
    var lista = el("ul", {});
    AREAS.forEach(function (a) {
      var texto = a[0] === "orientacion"
        ? "Hola, Centro Sinapsis! Quisiera hacer una consulta y que me orienten sobre qué área es la indicada."
        : "Hola, Centro Sinapsis! Quisiera consultar por " + minusculaInicial(a[1].replace(/ \(.*\)$/, "")) + ".";
      var li = el("li", {});
      li.appendChild(el("a", {
        href: waUrl(texto), target: "_blank", rel: "noopener",
        "data-especialidad": a[0], "data-ubicacion": ubicacion
      }, a[1]));
      lista.appendChild(li);
    });
    panel.appendChild(lista);
    var libre = el("a", { href: origen.getAttribute("href"), target: "_blank", rel: "noopener", "class": "wa-sel-libre", "data-ubicacion": ubicacion }, "Escribir sin elegir");
    panel.appendChild(libre);
    panel.appendChild(el("p", { "class": "wa-sel-nota" }, "Lun a vie 9 a 20 · Sáb 9 a 13 · Calle 27 Nº3907 esq. 139"));
    var cerrar = el("button", { type: "button", "class": "wa-sel-cerrar", "aria-label": "Cerrar" }, "×");
    panel.appendChild(cerrar);

    function teclas(e) {
      if (e.key === "Escape") { e.preventDefault(); cerrarSelector(); return; }
      if (e.key !== "Tab") return;
      var focos = panel.querySelectorAll("a,button");
      var primero = focos[0], ultimo = focos[focos.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    }
    fondo.addEventListener("click", cerrarSelector);
    cerrar.addEventListener("click", cerrarSelector);
    // Después de elegir, se cierra (la pestaña de WhatsApp ya se abrió).
    panel.addEventListener("click", function (e) { if (e.target.closest("a")) setTimeout(cerrarSelector, 0); });
    document.addEventListener("keydown", teclas);
    document.body.appendChild(fondo);
    document.body.appendChild(panel);
    origen.setAttribute("aria-expanded", "true");
    panelAbierto = { panel: panel, fondo: fondo, origen: origen, teclas: teclas };
    panel.querySelector("a").focus();
  }

  document.querySelectorAll("[data-wa-selector]").forEach(function (a) {
    a.setAttribute("aria-haspopup", "dialog");
    a.setAttribute("aria-expanded", "false");
    a.addEventListener("click", function (e) {
      // Ctrl/Cmd+clic o clic medio: respetar la intención de abrir el enlace directo.
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      if (panelAbierto) cerrarSelector(); else abrirSelector(a);
    });
  });

  document.querySelectorAll("[data-consulta]").forEach(armarFormulario);
  agregarFab();
})();
