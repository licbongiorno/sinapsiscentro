# Visibilidad de Centro Sinapsis en Zona Sur: investigación, estrategia y plan (noviembre 2026)

Rama: `claude/great-ride-cxp0wn`. Complementa a:

- `AUDITORIA_INTEGRAL_2026-11.md` (SEO técnico);
- `TRANSFORMACION_DIGITAL_2026-11.md` (UX y conversión);
- `SEGUIMIENTO_GEO.md` (medición en motores de IA);
- `PLAN_EDITORIAL.md`;
- `DATOS_PENDIENTES_CENTRO_SINAPSIS.md`.

---

## 0. Límites de esta investigación (leer primero)

| Qué se pidió | Qué se pudo hacer | Qué falta |
|---|---|---|
| Posiciones reales en Google y Bing por localidad | **No medible desde acá.** La búsqueda disponible no está localizada en Argentina y no hay acceso a Search Console ni a Bing Webmaster Tools. Automatizar búsquedas en Google o Bing va contra sus condiciones de uso. | Medición manual con la planilla `seguimiento-posiciones.csv` (§3) y datos de Search Console y Bing WMT |
| Google Maps, Bing Maps y paquete local | No medible: requiere ubicación real | Ídem, con la ubicación del celular en cada localidad o con una herramienta de rank tracking local (pagas, por ejemplo BrightLocal o Local Falcon) |
| Copilot, AI Overviews, ChatGPT, Perplexity | No consultados en esta sesión | Protocolo y planilla ya armados en `SEGUIMIENTO_GEO.md` y `seguimiento-geo.csv` |
| Volúmenes de búsqueda | **No hay datos.** Ninguna herramienta de volumen estuvo disponible | Search Console (impresiones reales) y Google Ads Keyword Planner (rangos) |
| Fichas de Google Business Profile de los competidores | No accesibles desde acá | Revisión manual (§4.3) |

Las 14 búsquedas que **sí** se hicieron (con un buscador no localizado, 14/11/2026) sirven para saber **qué tipo de páginas** compiten por estas consultas y **quiénes aparecen**. No sirven para conocer posiciones. Ningún dato de este informe es un ranking inventado.

---

## 1. Hallazgo central

En las búsquedas de discapacidad, centros terapéuticos y especialidades en Zona Sur, **los resultados no son webs de centros**. Aparecen:

1. **Directorios**, sobre todo **Doctoralia** (`doctoraliar.com`). Tiene una página por servicio y por localidad: "Atención a personas con discapacidad en Florencio Varela", "en Temperley", "en Rafael Calzada", "en Adrogué", "en Quilmes Oeste"; "Estimulación temprana del lenguaje en Berazategui", "en Quilmes", "en Villa Elisa", etc. Esas páginas listan centros que **no están en esa localidad**: por ejemplo, Promed Berazategui aparece en las páginas de Florencio Varela y de Rafael Calzada.
2. **Cartillas de obras sociales en PDF**, como la red de discapacidad de OSPOCE (diciembre 2024), que lista centros de Zona Sur con dirección y teléfono.
3. **Páginas oficiales** sobre el trámite del CUD: municipio de Berazategui (eregulations), Lomas de Zamora, Defensoría bonaerense.
4. **Noticias del Estado:** el nuevo Centro de Atención Integral de Rehabilitación de Florencio Varela (provincial) y la evaluación de autismo en hospitales públicos.

**Consecuencia:**

- La competencia por "la mejor página" es débil. Pocos centros de la zona tienen webs con contenido propio por servicio, y Sinapsis ya tiene más contenido temático que cualquier competidor observado.
- La competencia por **presencia** es fuerte. Los buscadores muestran directorios, cartillas y mapas, y ahí **Sinapsis no apareció en ninguna búsqueda**. Ni siquiera la búsqueda del dominio `sinapsiscentro.com.ar` ni de "Centro Sinapsis" Berazategui devolvió el sitio en ese índice. Aparecen homónimos: Instituto Sinapsis de Rosario y Sinapsis Consultora.

> **La palanca principal no es crear más páginas, sino estar donde los buscadores ya muestran resultados:** ficha de Google, Bing Places, Doctoralia y, si corresponde legalmente, las cartillas de obras sociales.

---

## 2. Matriz de palabras clave (entregable 2)

La intención la deduje del texto de la consulta. El tipo de resultado es lo que se **observó** el 14/11/2026 con un buscador no localizado, y la página de Sinapsis es la que debería responder esa consulta.

| Grupo | Consulta (ejemplos) | Intención | Tipo de resultado observado | Página de Sinapsis | Estado de la página |
|---|---|---|---|---|---|
| A | centro de discapacidad zona sur · centro para personas con discapacidad · centro interdisciplinario discapacidad | Local, comercial | Directorios (Doctoralia por localidad), cartillas PDF, normativa | `centro-discapacidad-zona-sur.html` | ✅ Fortalecida hoy (recorridos por situación) |
| A | centro interdisciplinario Berazategui · centro terapéutico Berazategui | Local, de entidad | No observado | `index.html` · `centro-terapeutico-zona-sur.html` | ✅ Título de la home cambiado a "Centro interdisciplinario en Berazategui" |
| A | centro de rehabilitación discapacidad / infantil | Local | Cartillas, Servicio Nacional de Rehabilitación, centros categorizados (centros de día, CET) | — | ⚠️ **No conviene apuntar a esta consulta**: "rehabilitación" y "centro de día" son categorías habilitadas por el Registro Nacional de Prestadores. Solo si el centro tiene esa categorización (§5.3) |
| B | prestadores de discapacidad Berazategui / Quilmes / Varela | Local, administrativa | Cartillas de obras sociales, instructivos de discapacidad | `centro-discapacidad-zona-sur.html`, `obras-sociales-prepagas.html` | ⚠️ El sitio **no dice ser "prestador"**, y está bien así hasta confirmar la inscripción (§5.3) |
| B | terapias con CUD · fonoaudiología / TO / psicopedagogía por discapacidad | Local + cobertura | Doctoralia ("foniatría para discapacidad"), instructivos | Páginas de servicio + `obras-sociales-prepagas.html` | ✅ Mencionan CUD |
| B | OSDE / OSECAC / IOMA + discapacidad + zona | Cobertura | Cartillas de cada obra social | `obras-sociales-prepagas.html` (30 coberturas listadas) | ✅ Desambiguada hoy. IOMA y PAMI pendientes de confirmar (DATOS #34) |
| B | cómo empezar un tratamiento con CUD · cómo tramitar el CUD | Informativa | Municipio, Defensoría, ANDIS | `como-tramitar-cud-berazategui.html`, `prestaciones-discapacidad-ley-24901.html` | ✅ Existen |
| C | centro para niños con TEA · terapias para autismo zona sur | Local | Doctoralia ("diagnóstico y tratamiento TEA" por localidad), noticias municipales | `autismo-tea-berazategui.html` | ✅ Existe |
| C | evaluación ADOS-2 zona sur | Local | **Sin prestadores locales con contenido propio**; aparecen publicaciones académicas, hospitales públicos y cursos | `evaluacion-ados-2-adi-r-berazategui.html` | 🔒 Bloqueada por datos (quién la administra, formación) |
| C | estimulación temprana Berazategui / Quilmes | Local | Doctoralia por localidad, cartilla OSPOCE (CETIB) | `estimulacion-temprana-berazategui.html` | ✅ Existe |
| C | centro para niños con discapacidad intelectual | Local | No medido | — | No se recomienda una página nueva sin un servicio específico confirmado |
| D | psicólogo infantil / psicopedagoga / fonoaudióloga / TO / kinesiología + Berazategui | Local | Doctoralia, Psychology Today, centros médicos (Promed, GME Salud Integral) | Páginas de servicio | ✅ Existen |
| E | ¿dónde puedo llevar a mi hijo con autismo en Berazategui? · ¿qué centro de discapacidad queda cerca de Quilmes? | Conversacional / IA | No medido | Preguntas frecuentes de TEA, discapacidad y centro terapéutico, y `llms.txt` | Medir con `SEGUIMIENTO_GEO.md` |

**Oportunidades no incluidas en tu lista** (son hipótesis; hay que confirmarlas con Search Console):

- **Villa Elisa, City Bell y Hudson-Pereyra** (La Plata limita con Berazategui): Doctoralia tiene páginas para Villa Elisa.
- **"Fonoaudiología para discapacidad"** y **"atención del desarrollo infantil temprano"**: así nombra Doctoralia sus servicios y así las indexa.
- **Consultas por obra social + discapacidad + zona**, que la página de coberturas ya puede captar.

---

## 3. Ranking por localidad y buscador (entregable 3)

**Estado: sin medir.** La planilla `seguimiento-posiciones.csv` tiene 84 filas listas:

- 18 consultas prioritarias × Google y Bing, en celular;
- 4 consultas × 6 localidades × Google Maps y Bing Maps.

Columnas:

- posición orgánica;
- posición en el mapa;
- los 3 primeros resultados;
- anuncios;
- paquete local;
- directorios en el top 10;
- respuesta de IA;
- tipo de contenido;
- observaciones.

**Cómo medir sin distorsiones:**

1. Usar una ventana privada, sin sesión iniciada, en el celular.
2. Para resultados locales, medir **desde la localidad** o con un navegador con ubicación simulada.
3. No hacer clic en anuncios. Si hay anuncios arriba, se anotan en `hay_anuncios` y **no cuentan como posición**.
4. Un resultado del mapa va en `pos_sinapsis_mapa`, nunca en la posición orgánica.
5. Anotar fecha y localidad. Si no aparece en los primeros 20 resultados, poner "no" (no inventar números).
6. Medir una vez por mes, mismo día y misma persona.

**Selección de localidades.** Las terapias con CUD suelen ser semanales, así que la **distancia a la sede pesa más que cualquier otra variable**:

| Prioridad | Localidades | Motivo |
|---|---|---|
| 1 (núcleo) | Todo Berazategui: centro, Ranelagh, Hudson, Plátanos, Villa España, Sourigues, Gutiérrez, El Pato, Pereyra | Partido de la sede |
| 2 (limítrofes) | Quilmes (centro, Bernal, Ezpeleta, Quilmes Oeste, Solano) · Florencio Varela (centro, Bosques, Villa Vatteone, Santa Rosa, Ingeniero Allan) · La Plata norte (Villa Elisa, City Bell): por confirmar | Partidos vecinos de Berazategui |
| 3 (evaluaciones y consultas puntuales) | Avellaneda, Almirante Brown, Lanús | Es razonable viajar para una **evaluación** (ADOS-2, neurocognitiva) o una primera consulta, menos para terapias semanales |
| 4 (no prioritarias) | Lomas de Zamora, Esteban Echeverría, Ezeiza, Canning, San Vicente | Lejos para un tratamiento regular. No invertir en contenido local hasta que Search Console muestre demanda |

---

## 4. Competidores (entregables 1 y 4)

### 4.1 Quiénes aparecen

Observados el 14/11/2026, no localizado. Son datos de directorios y cartillas: **no están verificados con cada centro**.

| Nombre | Dónde | Cómo aparece | Qué muestra la fuente | Por qué probablemente aparece (hipótesis) |
|---|---|---|---|---|
| **Doctoralia** (doctoraliar.com) | Todas las localidades | Página por servicio × localidad | Perfiles de profesionales y centros, filtro por obra social | Dominio con mucha autoridad y páginas programáticas por localidad. **Domina las consultas por especialidad + localidad** |
| **CETIB** | Calle 15 Nº 5125, Berazategui | Cartilla OSPOCE; resolución del Servicio Nacional de Rehabilitación (2008) | Inscripto en el Registro Nacional de Prestadores (rehabilitación) | Antigüedad y presencia en cartillas. Es el competidor institucional más directo en el partido |
| **Promed Berazategui** | Calle 148 Nº 1015 | Doctoralia (Florencio Varela, Rafael Calzada: "atención a personas con discapacidad") | Centro médico multiespecialidad con psicología | Perfil de centro en Doctoralia con el servicio "discapacidad" |
| **GME Salud Integral** | Av. 21 entre 144 y 144a, Berazategui | Doctoralia (fonoaudiología) | Pediatría y fonoaudiología | Perfil de centro en Doctoralia |
| **Centro Ciqo** | Av. 12 de Octubre 3200, Quilmes Oeste | Doctoralia | TO, psicología, fonoaudiología, psicopedagogía | Ídem |
| **Integrar Quilmes / Centro Integrar** | Quilmes (Humberto Primo 366) | Doctoralia | TO, fonoaudiología, psicopedagogía | Ídem |
| **Atención Terapéutica Pediátrica** | Humberto Primo 366, Quilmes | Doctoralia | Psicología, TO, psicopedagogía, fonoaudiología | Ídem |
| **Equipo Interdisciplinario en Trastornos de la Infancia** | Ortiz de Ocampo 600, Quilmes | Doctoralia | Fonoaudiología, psicología, TO | Ídem |
| **EITI** (equipo interdisciplinario para el tratamiento infantil) | Lomas de Zamora y Lanús | Doctoralia | Interdisciplinario infantil | Ídem |
| Red OSPOCE: CPI Lomas, Centro Creciendo, Centir, Assistire, Centro Betania, Consultorios Integrales del Sur | Lomas, Lanús, Banfield, Turdera, Quilmes | Cartilla PDF | Centros de día, CET y rehabilitación | Convenio con la obra social; la cartilla está indexada |
| **Centro de Atención Integral de Rehabilitación** (provincial) | Florencio Varela | Noticias de gba.gob.ar | Rehabilitación pública | Autoridad del dominio del gobierno y cobertura de prensa |
| **Hospitales públicos** (por ejemplo José Jorge, Almirante Brown) | Zona Sur | Noticias de gba.gob.ar | Evaluación de autismo sin costo | Ídem |

### 4.2 Ventajas de los competidores frente a Sinapsis

Separo lo observado de las hipótesis.

- **Observado:** tienen perfil en Doctoralia, están en cartillas de obras sociales o en el Registro Nacional de Prestadores, y tienen años de antigüedad (CETIB desde 2008). Sinapsis abrió en febrero de 2026.
- **Hipótesis:** reseñas acumuladas en Google y menciones externas. No se verificó: hay que revisar sus fichas de Google a mano.
- **Ventaja de Sinapsis (observada):**
  - páginas propias por servicio, con preguntas frecuentes, fuentes y datos estructurados;
  - guías para familias;
  - matrículas publicadas;
  - recursos gratuitos.

  Ningún competidor observado aparece con ese nivel de contenido propio.

### 4.3 Revisión manual pendiente

Unos 30 minutos por competidor. Para CETIB, Ciqo, Integrar, Atención Terapéutica Pediátrica y Promed, anotar:

- categoría principal y secundarias de la ficha de Google;
- cantidad de reseñas, calificación y si responden;
- fotos y publicaciones;
- web propia (sí/no);
- si figuran en Doctoralia como centro.

Con eso se completa el "por qué aparecen" con datos y no con hipótesis.

---

## 5. Auditoría de Sinapsis (entregables 5 y 6)

### 5.1 SEO técnico y rastreo

| Punto | Estado |
|---|---|
| `robots.txt` | Permite todo; declara el sitemap ✅ |
| Sitemap | 63 URLs, válido. Las fichas y los recursos utilitarios llevan noindex y no figuran en el sitemap (correcto) ✅ |
| Verificación en Bing | `BingSiteAuth.xml` presente ✅. IndexNow implementado (`scripts/indexnow_submit.py`) ✅ |
| Validador propio | 0 errores. 55 avisos de `lastmod` por cambios no de contenido; se dejaron así a propósito |
| Rendimiento | Medido en esta sesión con red 4G simulada: FCP/LCP de unos 770 ms en local. Producción: lo mide el informe mensual |
| Móvil | Sin desborde a 390 px en 75 páginas; botón de turno en la primera pantalla ✅ |
| `www` | Redirección **307** (temporal). Hay que pasarla a 308 en Vercel ⚠️ manual |

### 5.2 Canibalización y metadatos (corregidos hoy)

| Problema | Corrección |
|---|---|
| `centro-discapacidad-zona-sur` y `obras-sociales-prepagas` respondían lo mismo ("prestaciones/coberturas por discapacidad con CUD") | Discapacidad = página del **centro**. Coberturas = página de **obras sociales y prepagas** (nuevo título, H1 y sección "Cómo se cubre la atención") |
| El título de la home ("Psicología y TEA…") no nombraba la entidad | "Centro interdisciplinario en Berazategui, Zona Sur \| Sinapsis" |
| La descripción de la home prometía "turnos esta semana" (sin confirmar) | Reemplazada por un resumen de servicios y "con y sin CUD" |
| Psicología y neurocognitiva decían "Obras sociales y prepagas" (sugiere convenio) | "Con o sin CUD; sin CUD, por reintegro" |

### 5.3 Afirmaciones comerciales y asistenciales

| Afirmación | Estado | Acción |
|---|---|---|
| Con y sin CUD | ✅ Confirmada (DATOS) | — |
| Sin CUD: por reintegro | ✅ Confirmada | — |
| 30 coberturas listadas | ✅ Confirmadas, con la aclaración "no implica convenio" | Revisar altas y bajas (DATOS #33) |
| "Primera entrevista en menos de 48 hs" (45 apariciones) | ⚠️ Sin confirmar | **Confirmar o quitar** (DATOS #9) |
| "Turnos esta semana" en el bloque de confianza de la home | ⚠️ Sin confirmar | Ídem |
| "Muchas familias de Quilmes eligen el centro" | ❌ No verificable | **Suavizado hoy** |
| Seguimiento virtual en cualquier área | ⚠️ Solo está confirmada la psicología online | Suavizado en la página de centro terapéutico; preguntas frecuentes prudentes ("lo charlamos") |
| ADOS-2 en adultos, quién administra | 🔒 Sin datos | DATOS #15–18 |
| "Prestador de discapacidad" o centro categorizado | El sitio **no lo afirma** ✅ | **Decisión del centro (alto impacto):** consultar si corresponde la inscripción en el Registro Nacional de Prestadores (ANDIS) para los módulos que se quieran facturar a obras sociales. Muchas obras sociales la exigen para prestaciones institucionales, y es lo que hace aparecer en cartillas. Hasta tenerla, **no usar "prestador" ni "centro de rehabilitación"** |
| Alcance geográfico | Sede única en Berazategui, dicho explícitamente ✅ | — |

### 5.4 GEO (entregable 6)

- **Bien:**
  - `llms.txt` completo y preciso;
  - `MedicalBusiness` con `sameAs` (Maps, Instagram, Facebook), `employee` con matrículas, preguntas frecuentes en HTML y JSON-LD;
  - fuentes citadas en cada guía.
- **Falta:**
  - **Menciones externas.** Las IA citan lo que encuentran en varias fuentes; hoy no hay ninguna fuente externa sobre Sinapsis indexada (ver §1).
  - **Desambiguación del nombre:** existen Instituto Sinapsis (Rosario) y Sinapsis Consultora. Usar siempre "Centro Sinapsis · Berazategui".
  - **Autoría con nombre** en las guías ("Revisado por Lic. … M.P. …"). Hoy figuran como "equipo de Centro Sinapsis", y requiere aprobación de cada profesional.

---

## 6. Arquitectura recomendada (entregable 7)

```
/ (Centro interdisciplinario en Berazategui)                ← entidad
├── centro-discapacidad-zona-sur      (centro + atención con CUD)   ← hub de discapacidad
│   ├── obras-sociales-prepagas       (coberturas, reintegro)
│   ├── prestaciones-discapacidad-ley-24901 (qué cubre la obra social)
│   ├── como-tramitar-cud-berazategui (trámite)
│   └── autismo-tea-berazategui ── evaluacion-ados-2-adi-r · senales-autismo-ninos · anticipacion…
├── centro-terapeutico-zona-sur       (desde dónde vienen; acceso a la sede)
├── Servicios: psicologia (+5 enfoques) · psicopedagogia · fonoaudiologia · terapia-ocupacional ·
│   kinesiologia · estimulacion-temprana · estimulacion-cognitiva · alfabetizacion ·
│   orientacion-vocacional · psicodiagnostico · evaluacion-neurocognitiva · aptos
└── guias (28) + fichas imprimibles (4) + recursos interactivos
```

**No se crean páginas por localidad por ahora.** Hay una sola sede, y una página "Centro de discapacidad en Quilmes" que solo cambie el nombre sería una página puerta (doorway), contraria a las políticas de Google y Bing.

Criterio para crear una, por ejemplo `centro-terapeutico-quilmes-bernal.html`, si se cumplen las **tres** condiciones:

1. Search Console muestra más de unas 100 impresiones por mes de consultas con esa localidad.
2. El centro aporta información **verificada y propia** de esa zona: cómo llegar en colectivo o tren, tiempos, estacionamiento, qué conviene hacer en la sede y qué a distancia.
3. Hay al menos un contenido útil propio de esa localidad: por ejemplo, dónde funciona su junta evaluadora del CUD, con fuente oficial.

Hasta entonces, la página `centro-terapeutico-zona-sur` concentra esa información.

---

## 7. Calendario de contenidos, 6 meses (entregable 8)

Una guía cada dos semanas, con el formato de las guías publicadas (respuesta corta, señales, cómo trabajamos, preguntas frecuentes y fuentes). Las marcadas con 🔒 esperan datos del centro (letra de `DATOS_PENDIENTES`).

| Mes | Guía | Consulta objetivo | Enlaza a |
|---|---|---|---|
| Dic | Evaluación y diagnóstico: qué diferencia hay | diferencia entre evaluación y diagnóstico | ADOS-2, neurocognitiva, psicodiagnóstico |
| Dic | Cómo elegir un centro terapéutico: 10 preguntas para hacer (matrículas, coordinación, informes, coberturas) | cómo elegir un centro terapéutico | Discapacidad, equipo |
| Ene | Qué documentación pide la obra social para terapias con CUD (orden médica, plan de tratamiento, presupuesto, informes) | documentación terapias CUD obra social | Coberturas, Ley 24.901 |
| Ene | Reintegro de terapias sin CUD: cómo pedirlo 🔒 F | reintegro psicólogo obra social | Psicología, coberturas |
| Feb | Qué es un abordaje interdisciplinario (y cuándo conviene) | qué es un tratamiento interdisciplinario | Home, discapacidad |
| Feb | ¿Qué es el ADOS-2 y cómo es la evaluación? 🔒 C | qué es el ADOS-2 | ADOS-2 |
| Mar | Centro de día, CET o consultorios interdisciplinarios: diferencias | qué es un centro educativo terapéutico | Discapacidad (aclara qué **no** es Sinapsis) |
| Mar | Autismo en adultos: señales y evaluación 🔒 C | autismo en adultos | TEA, ADOS-2 |
| Abr | Terapia ocupacional en adultos: qué trabaja | terapia ocupacional adultos | TO |
| Abr | Qué estudiar después de la secundaria: orientación vocacional 🔒 B | orientación vocacional qué estudiar | Vocacional |
| May | Renovar el CUD: cuándo y cómo | renovación CUD | Trámite CUD |
| May | Volver a la escuela con apoyos: el rol de la psicopedagogía y la articulación escolar | integración escolar apoyos | Psicopedagogía |

Además, cada mes: dos o tres fichas imprimibles nuevas generadas desde guías existentes (`scripts/generar_fichas.py`), sin texto nuevo.

---

## 8. Reputación local (entregable 9)

### 8.1 Google Business Profile y Bing Places (manual, centro)

- **Nombre:** "Centro Sinapsis", exactamente igual en todas partes. **No** agregar palabras clave al nombre, porque eso viola las pautas de Google.
- **Categorías:**
  - principal: la más específica que exista en la lista de Google para un centro interdisciplinario de salud (verificar opciones como "Centro de salud" o "Centro de salud mental");
  - secundarias, solo las que se prestan: psicólogo, logopeda o fonoaudiólogo, terapeuta ocupacional, kinesiólogo, psicopedagogo, según disponibilidad.
  - No elegir "Centro de rehabilitación" ni "Centro de día" sin la habilitación correspondiente.
- **Servicios:** cargar los 13 servicios de la web, con el mismo nombre.
- **Fotos reales:** fachada, recepción, consultorios y gimnasio. Ya existen en `google-perfil/fotos/`.
- **Publicaciones:** una por semana, usando las guías y las fichas (hay un generador en `scripts/generar_publicaciones_google.js`).
- **Preguntas y respuestas:** cargar las 5 preguntas más frecuentes de la web (CUD, derivación, reintegro, horarios, edades).
- **Bing Places:** importar desde Google Business Profile (opción oficial de Bing) y verificar.
- **NAP idéntico** en web, Google, Bing, Instagram, Facebook y Doctoralia: "Centro Sinapsis · Calle 27 Nº3907 esq. 139, Berazategui · 11 6856-7160".

### 8.2 Directorios (de mayor a menor impacto)

1. **Doctoralia, perfil de centro.** Es lo que más aparece. Cargar los servicios con los nombres que usa Doctoralia: "Atención a personas con discapacidad", "Estimulación temprana del lenguaje", "Diagnóstico y tratamiento de niños con TEA", "Rehabilitación…" solo si corresponde. Sumar los perfiles de cada profesional, vinculados al centro.
2. Psychology Today (psicólogos), Top Doctors y páginas de colegios profesionales, si cada profesional lo desea.
3. **Cartillas de obras sociales:** solo si hay convenio real (§5.3).
4. **Guía de recursos del municipio** de Berazategui (área de discapacidad o salud): pedir la inclusión, con datos verificables.

Después de cada alta, agregar la URL al `sameAs` del JSON-LD de la home.

### 8.3 Menciones institucionales legítimas

- **Charlas abiertas o talleres para familias**, en escuelas, en la biblioteca o con el municipio. Generan notas en medios locales (por ejemplo, El Quilmeño o portales de Berazategui) con enlace.
- Jornadas con colegios profesionales.
- Materiales para escuelas: las fichas imprimibles, con el nombre del centro.
- **No comprar enlaces** ni intercambiar reseñas.

### 8.4 Protocolo ético de reseñas

1. **Cuándo:** al cierre de una etapa (alta, fin de una evaluación, aniversario de tratamiento), nunca en una sesión difícil ni a personas en crisis.
2. **Cómo:** un mensaje por WhatsApp con el enlace directo a la ficha. Por ejemplo: *"Si te sirvió nuestra atención y querés contarlo, podés dejar una reseña en Google: [enlace]. No es obligatorio y no cambia nada en tu atención."*
3. **A todos por igual:** no elegir solo a quienes se cree que están conformes (eso es review gating, prohibido por Google).
4. **Sin incentivos** de ningún tipo: descuentos, sorteos ni turnos preferenciales.
5. **Nadie del equipo escribe reseñas** ni pide a familiares que lo hagan.
6. **Responder sin confirmar que alguien es paciente.** Es un dato de salud.
   - **Bien:** "Gracias por tu comentario. Si querés, escribinos por WhatsApp."
   - **Nunca:** "Gracias, fue un gusto acompañar a tu hijo en su tratamiento de TEA."
7. **Reseñas negativas:** responder con calma, sin datos clínicos, e invitar a seguir la conversación por privado.

---

## 9. Conversión (entregable 10)

Lo ya implementado en el sitio (ver `TRANSFORMACION_DIGITAL_2026-11.md`):

- selector de especialidad en la home;
- caja de consulta después de "Señales…" en 16 guías;
- formulario corto que arma el mensaje de WhatsApp;
- botón flotante;
- fichas imprimibles.

**Nuevo hoy:** recorridos según la situación, en `centro-discapacidad-zona-sur`:

| Situación | Recorrido |
|---|---|
| Ya tengo CUD | Coberturas → Ley 24.901 → WhatsApp con la obra social |
| Todavía no tengo CUD | Atención particular o por reintegro → cómo tramitar el CUD |
| Necesito una evaluación | ADOS-2 / neurocognitiva / psicodiagnóstico, con la diferencia entre evaluación y diagnóstico |
| Adulto con discapacidad | Psicología, TO, fonoaudiología, orientación vocacional y ocupacional, kinesiología |
| Especialidad puntual | Enlace directo a cada servicio |

---

## 10. Plan de 90 días (entregable 11)

| Período | Acción | Responsable | Recursos | Métrica de éxito |
|---|---|---|---|---|
| **Días 1–15** | Mergear el PR y publicar | Centro (aprobar) | — | Sitio actualizado en producción |
| | Redirección `www` a 308 (Vercel) | Centro | 5 min | `curl -I` devuelve 308 |
| | Search Console y Bing WMT: enviar el sitemap, pedir la indexación de la home, discapacidad y coberturas | Centro (acceso) / Claude (guía) | 30 min | Las 63 URLs "indexadas" |
| | Ficha de Google completa (§8.1) e importación a Bing Places | Centro | 2–3 h | Ficha 100 % completa; Bing verificada |
| | Confirmar "48 hs", "turnos esta semana" e IOMA/PAMI | Centro | 15 min | Afirmaciones verificadas |
| **Días 16–30** | Perfil de centro en Doctoralia, con servicios y profesionales | Centro | 2 h | El perfil aparece en las páginas de localidad de Doctoralia |
| | Decidir la inscripción en el Registro Nacional de Prestadores | Dirección | Asesoría | Decisión documentada |
| | Guías de diciembre (§7) | Claude + revisión profesional | — | Publicadas e indexadas |
| | `sameAs` con los nuevos perfiles | Claude | 10 min | JSON-LD actualizado |
| **Días 31–60** | Pedir reseñas con el protocolo (§8.4) | Equipo | 5 min por familia | Reseñas nuevas por mes, sin picos artificiales |
| | Una charla o taller abierto con difusión local | Centro | — | Una mención externa con enlace |
| | Autoría con nombre y matrícula en las guías | Profesionales (aprobar) / Claude | — | Guías firmadas |
| | Datos de ADOS-2 y neurocognitiva para completar páginas | Centro | — | Marcas TODO eliminadas |
| **Días 61–90** | Primera medición completa: `seguimiento-posiciones.csv` + `seguimiento-geo.csv` + Search Console | Centro / Claude | 2 h | Línea de base registrada |
| | Detectar consultas con impresiones y sin página propia, y evaluar páginas locales con el criterio de §6 | Claude | — | Lista priorizada |
| | Repetir la revisión de competidores (§4.3) | Claude / Centro | 2 h | Matriz actualizada |

---

## 11. Tablero de indicadores (entregable 12)

**Accesos necesarios:**

- Google Search Console;
- Bing Webmaster Tools;
- Google Analytics 4;
- Google Business Profile (estadísticas);
- Bing Places.

Pueden compartirse por usuario o volcarse una vez por mes a una planilla. Instrucciones de GA4: `TRANSFORMACION_DIGITAL_2026-11.md` §5.

| Indicador | Fuente | Frecuencia | Nota |
|---|---|---|---|
| Posición orgánica Google / Bing por consulta y localidad | `seguimiento-posiciones.csv` (manual) + posición media en Search Console y Bing WMT | Mensual | La posición media de Search Console es un promedio de todas las búsquedas; no mezclar con la medición manual |
| Visibilidad en Maps | GBP: búsquedas directas y de descubrimiento, vistas en Maps; Bing Places | Mensual | "Descubrimiento" = quienes no buscaron el nombre: **es el indicador principal de esta misión** |
| Impresiones, clics, CTR | Search Console y Bing WMT | Mensual | Más impresiones ≠ más pacientes |
| Consultas sin marca | Search Console filtrando las que no contienen "sinapsis" | Mensual | Mide si descubren el centro sin conocerlo |
| Tráfico por localidad | GA4 (ciudad, aproximada) + consultas con localidad en Search Console | Mensual | La ubicación de GA4 es imprecisa en el conurbano |
| Tráfico por especialidad | GA4: vistas por página de servicio | Mensual | — |
| Consultas por WhatsApp | GA4 `generate_lead` (por `ubicacion` y `especialidad`) + **planilla del centro con mensajes nuevos reales por semana** | Semanal | El clic es intención; el mensaje real es el dato |
| Primeras entrevistas concretadas | Registro interno del centro | Mensual | Es el indicador de negocio. No se envía a ninguna plataforma |
| Reseñas | GBP: cantidad, promedio y respondidas | Mensual | — |
| Menciones externas | Lista manual (directorios, notas, instituciones) | Mensual | — |
| Visibilidad en IA | `seguimiento-geo.csv` (20 consultas × plataformas) | Trimestral | Solo lo observado |

---

## 12. Modificaciones de código (entregable 13)

**Hechas en esta etapa** (commit "SEO de discapacidad…"):

1. `index.html`: título, descripción, OG y Twitter centrados en la entidad; se quita "turnos esta semana" de los metadatos.
2. `centro-discapacidad-zona-sur.html`: nuevo título y descripción; sección "¿Por dónde empiezo? Según tu situación" con 5 recorridos y 20 enlaces internos; sede única explícita.
3. `obras-sociales-prepagas.html`: título, H1, descripción y JSON-LD distintos de la página de discapacidad; nueva sección "Cómo se cubre la atención" (con CUD / sin CUD por reintegro).
4. `psicologia-berazategui.html`, `evaluacion-neurocognitiva-berazategui.html`: cobertura expresada sin sugerir convenios.
5. `centro-terapeutico-zona-sur.html`: afirmaciones no verificadas suavizadas.
6. `llms.txt`, `sitemap.xml` y `dateModified`: actualizados.
7. `seguimiento-posiciones.csv` (nuevo): planilla de medición.

**Verificación:**

- validador SEO: 0 errores;
- pruebas de humo (75 páginas + juegos): OK;
- axe WCAG 2.2 AA en las 3 páginas modificadas, a 390 y 1280 px: 0 fallas;
- sin desborde a 390 px;
- enlaces internos validados.

**Pendientes, en cuanto el centro confirme datos:**

- Agregar los perfiles nuevos a `sameAs` en el JSON-LD de la home.
- Quitar o confirmar "48 hs" y "turnos esta semana" en 45 lugares. Es un reemplazo automático en los scripts generadores, no a mano.
- Autoría con nombre en el JSON-LD de las guías (`author` → `Person` con matrícula).
- Si el centro obtiene la categorización como prestador: mencionarla en discapacidad, coberturas, `llms.txt` y schema.

---

## Fuentes de la investigación

Consultadas el 14/11/2026:

- [Doctoralia, atención a personas con discapacidad en Florencio Varela](https://www.doctoraliar.com/tratamientos-servicios/atencion-a-personas-con-discapacidad/florencio-varela)
- [Doctoralia, en Quilmes Oeste](https://www.doctoraliar.com/tratamientos-servicios/atencion-a-personas-con-discapacidad/quilmes-oeste)
- [Doctoralia, en Rafael Calzada](https://www.doctoraliar.com/tratamientos-servicios/atencion-a-personas-con-discapacidad/rafael-calzada)
- [Doctoralia, en Temperley](https://www.doctoraliar.com/tratamientos-servicios/atencion-a-personas-con-discapacidad/temperley)
- [Doctoralia, estimulación temprana del lenguaje en Berazategui](https://www.doctoraliar.com/tratamientos-servicios/estimulacion-temprana-del-lenguaje/berazategui)
- [Doctoralia, centros de fonoaudiología en Berazategui](https://www.doctoraliar.com/clinicas/foniatria-y-fonoaudiologia/berazategui)
- [Doctoralia, TO en Bernal](https://www.doctoraliar.com/clinicas/terapia-ocupacional/bernal)
- [Doctoralia, TEA en Florencio Varela](https://www.doctoraliar.com/tratamientos-servicios/diagnostico-y-tratamiento-de-ninos-con-tea-espectro-autista/florencio-varela)
- [Red de discapacidad OSPOCE (dic. 2024)](https://ospoce.com.ar/images/discapacidad/redesdiscapacidad122024.pdf)
- [Resolución SNR, categorización CETIB](https://e-legis-ar.msal.gov.ar/htdocs/legisalud/migration/pdf/11606.pdf)
- [Municipio de Berazategui, trámite del certificado de discapacidad](https://berazategui.eregulations.org/procedure/191/147?l=es)
- [Juntas evaluadoras del CUD en la Provincia de Buenos Aires (Defensoría)](https://www.defensorba.org.ar/pdfs/Juntas-Evaluadoras-donde-tramitar-el-Certificado-Unico-de-Discapacidad-CUD-provincia-de-Buenos-Aires.pdf)
- [Centro de Atención Integral de Rehabilitación, Florencio Varela (GBA)](https://gba.gob.ar/comunicacion_publica/gacetillas/kicillof_inaugur%C3%B3_un_centro_de_atenci%C3%B3n_integral_de_rehabilitaci%C3%B3n)
- [Evaluación de autismo en hospitales públicos (GBA)](https://gba.gob.ar/saludprovincia/noticias/el_hospital_belgrano_realiza_evaluaciones_para_detectar_y_tratar_el_autismo)
- [Psychology Today, psicólogos en Berazategui](https://www.psychologytoday.com/ar/psicologos/ba/berazategui)
