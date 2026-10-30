# Información real pendiente (NO inventada)

Este archivo lista cada lugar del sitio donde falta un dato real del negocio. Nada de esto se inventó — donde faltaba, se dejó una estructura lista para completar o un texto neutro que no afirma nada que no se pueda comprobar.

## 1. Equipo profesional

**Dónde:** `/equipo-profesional.html` (ya indexada desde el 2026-10-23, ver "Estado" abajo).

**Estado (2026-10-27):** 6 profesionales con datos confirmados por el centro: Nicolás Bongiorno, Thomas D'Alessandro y Sol Aylen López (Psicología — Bongiorno atiende online), Flavia Avellaneda y Rocío González (Terapia Ocupacional), e Ian Lautaro Guzmán (Kinesiología, M.P. 9372). La página salió de `noindex`, tiene tarjeta por profesional, `Person` en JSON-LD (referenciados también como `employee` en el `MedicalBusiness` de `index.html`) y ya está en `sitemap.xml`. Karen Morel se dio de baja del equipo (sacada de todas las páginas, JSON-LD y del sitemap de referencias).

**Qué sigue faltando:**
- Formación (universidad) de Flavia Avellaneda — no se publicó esa línea a pedido del centro hasta tener el dato confirmado.
- Formación, trayectoria y bio de Ian Lautaro Guzmán — su matrícula (M.P. 9372) y la propuesta de gimnasio terapéutico para adultos mayores vinieron de material de difusión del centro, pero no hay confirmación directa de su universidad ni antecedentes, así que esa línea no se publicó.
- Confirmar horarios y modalidad (grupal/individual) del gimnasio de Kinesiología — la página ya está creada (`kinesiologia-adultos-mayores-berazategui.html`) pero el FAQ de esa página deriva esa pregunta a WhatsApp porque todavía no está confirmado.
- Foto, bio corta y población atendida de los 6 profesionales (opcional, se puede sumar después).
- Profesionales de psicopedagogía, fonoaudiología y evaluaciones (ADOS-2/ADI-R, neurocognitiva) — la página ya aclara que esas áreas siguen pendientes.
- `reviewedBy` ya se agregó (2026-10-27) en `psicologia-berazategui.html`, `terapia-ocupacional-integracion-sensorial.html` y `kinesiologia-adultos-mayores-berazategui.html`, apuntando a los `Person` reales correspondientes. Falta en las otras 8 páginas de servicio (psicopedagogía, fonoaudiología, las 2 evaluaciones, y 3 de las páginas nuevas) porque no tienen un profesional confirmado de esa especialidad todavía — recién se puede agregar cuando ese dato llegue.

## 2. Fuentes clínicas para ADOS-2 / ADI-R

**Dónde:** `evaluacion-ados-2-adi-r-berazategui.html`, sección "Fuentes y referencias".

**Qué falta:** la edición/editorial exacta de los manuales de ADOS-2 y ADI-R que usa el centro (por ejemplo Western Psychological Services/WPS en su edición original, o la edición en español que corresponda — TEA Ediciones, Hogrefe u otra, según cuál use el equipo realmente).

**Qué se hizo mientras tanto:** se agregó como fuente el fact sheet de la OMS sobre trastornos del espectro autista (URL verificada de un fact sheet estable y de larga data: `who.int/news-room/fact-sheets/detail/autism-spectrum-disorders`), y se dejó un comentario HTML interno (`<!-- TODO DE CONTENIDO -->`) marcando qué falta.

## 3. Batería de evaluación neurocognitiva

**Dónde:** `evaluacion-neurocognitiva-berazategui.html`, sección "Fuentes y referencias".

**Qué falta:** qué batería/protocolo específico usa el centro (por ejemplo BANFE, ENI, NEUROPSI, WAIS, etc. — no se puede saber sin confirmación), y una fuente clínica verificable acorde (asociación de neuropsicología, manual del instrumento).

**Qué se hizo mientras tanto:** se dejó la sección con un texto visible honesto ("Estamos completando esta sección...") en vez de fuentes inventadas.

## 4. Modalidad de atención (presencial / virtual / híbrida)

**Estado (2026-10-27):** resuelto. `index.html` ahora afirma la modalidad explícitamente (hero-sub: "Atención principalmente presencial en nuestra sede..."; y una pregunta del FAQ: "Atendemos principalmente de forma presencial en nuestra sede de Berazategui. Para algunos casos podemos sumar seguimiento virtual..."). Esto llegó confirmado por el centro en una sesión posterior a la nota original de este ítem.

## 5. Datos legales para privacidad/términos

**Dónde:** `/privacidad.html`, `/terminos.html`.

**Qué falta:** son borradores prudentes basados en lo que el sitio realmente hace a nivel técnico (Firebase Auth, Google Analytics, localStorage, service worker) — **no son asesoramiento legal**. Antes de considerarlos definitivos, alguien responsable del negocio (idealmente con asesoría legal) debe revisarlos, en particular:
- Si corresponde inscribir la base de datos en la Dirección Nacional de Protección de Datos Personales (Ley 25.326, Argentina) dado que se procesan datos vinculados a consultas de salud.
- Si hace falta un consentimiento explícito adicional en el formulario/WhatsApp antes de coordinar una consulta.
- Razón social / CUIT del responsable, si se quiere incluir.

## 6. Obras sociales y prepagas — prestaciones por discapacidad

**Estado (2026-10-30):** la página `/obras-sociales-prepagas.html` se redefinió para ser exclusivamente sobre **prestaciones para personas con discapacidad** (no una cartilla general de obras sociales, y no la cobertura de consultas particulares de psicología/psicopedagogía/fonoaudiología/terapia ocupacional — el centro pidió explícitamente no confundir ambas cosas). Título, copy, FAQ y disclaimer se reescribieron en esa línea.

**Listado de coberturas (31), confirmado por el centro con correcciones puntuales:**
OSECAC, OSDO, OSPIP, APRES, GALENO, OSPOCE, DASUTEN, OSDEPYM, SANCOR SALUD, OSDE, SWISS MEDICAL, MEDIFÉ, UNIÓN PERSONAL, OSPE, OSPEDYC, OSPLAD, AVALIAN, OMINT, MEDICUS, JERÁRQUICOS SALUD, FEDERADA SALUD, BOREAL SALUD, OSPSA – SANIDAD, OSPECON, OSSEG, OSPRERA, OSFATUN, OSPIA, OSUTHGRA, OSCCPTAC.

- **OPSECOM**: sacada del listado — el centro pidió no publicarla hasta confirmar su denominación oficial.
- **OSPOSE → OSPOCE**: se reemplazó. Búsqueda externa (2026-10-30) confirma que OSPOCE es una obra social real y activa (ospoce.com.ar), con un manual propio de acceso a terapias de rehabilitación para personas con discapacidad — encaja con el tema de la página. No se encontró ningún rastro de "OSPOSE" como entidad real, lo que respalda que era un error de tipeo. Si el centro confirma que son dos entidades distintas, hay que agregar "OSPOSE" de nuevo por separado.
- **OSPI**: el centro pidió "identificar correctamente" esta entidad. Una búsqueda no encontró ninguna obra social registrada exactamente como "OSPI" — el resultado más cercano es OSPIF (Obra Social del Personal de la Industria del Fósforo, Encendido y Afines, actualmente en proceso de baja ante la Superintendencia), que no parece ser lo mismo. **Resuelto (2026-10-30): se sacó del listado público** hasta que el centro confirme el nombre exacto — no se publica un dato sin verificar. Si se confirma, se vuelve a agregar.

**Dónde se publicó:** `/obras-sociales-prepagas.html` (indexada, en `sitemap.xml` y `llms.txt`), con el listado de 30 tarjetas (31 menos "OSPI", sacada por no confirmar — ver abajo), un FAQ de 3 preguntas acotado al tema de discapacidad, el disclaimer pedido por el centro ("la inclusión... no implica que exista un convenio confirmado") y un botón flotante de WhatsApp propio de esa página.

**Resuelto (2026-10-30):** el centro aclaró cómo funciona la cobertura por obra social para pacientes **ambulatorios, no por discapacidad** (psicología, psicopedagogía, fonoaudiología, terapia ocupacional en consulta particular): se puede atender con **cualquier obra social o prepaga**, pero siempre **por reintegro** — el paciente abona la sesión, se le da la factura correspondiente, y la presenta en su obra social para que le reintegren el total o una parte, según las condiciones de su propio plan (no es convenio/facturación directa). Este dato no estaba documentado en ningún lado hasta ahora.

Con eso se corrigió el link desalineado: el badge de CUD y la FAQ "¿Atienden obras sociales y prepagas?" en `index.html` y las 11 páginas `*-berazategui.html` ya no prometen un listado de coberturas por discapacidad para consultas particulares — ahora explican el modelo de reintegro, y el link a `/obras-sociales-prepagas.html` quedó solo en el contexto correcto (pacientes con CUD).

## 7. Reseñas y menciones externas

**Dónde:** no aplica a ningún archivo del código — es una acción 100% externa.

**Qué falta:** reseñas genuinas en Google, respuestas a esas reseñas, menciones en directorios locales. Ver la lista completa de acciones externas en `SEO_GEO_AUDIT_AFTER.md`, sección "Acciones que debe realizar el dueño fuera del código".

## 8. Cuadrícula de Instagram en la home

**Dónde:** `index.html`, sección `#instagram-feed` (entre "Reseñas en Google" y "Horarios & Ubicación").

**Estado (2026-10-27):** resuelto. El centro conectó `@sinapsiscentro` en SnapWidget y armó el widget; la sección muestra la cuadrícula en vivo (`<iframe src="https://snapwidget.com/embed/57dfa61a-385c-40aa-a8e2-30028ec8e0ee">`) con un botón "Seguir a @sinapsiscentro" debajo. El widget depende de SnapWidget (servicio gratuito de terceros) — si en algún momento se da de baja esa cuenta o el widget, la cuadrícula deja de cargar y habría que rehacer este paso.

## 9. Páginas nuevas de servicio (de la revisión UX del index)

**Dónde:** `estimulacion-temprana-berazategui.html`, `estimulacion-cognitiva-berazategui.html`, `alfabetizacion-berazategui.html`, `psicodiagnostico-berazategui.html`, `kinesiologia-adultos-mayores-berazategui.html`.

**Por qué se crearon:** una revisión de UX del `index.html` encontró que 5 de las 11 tiles de la sección de Servicios no tenían link — eran `<div>` sin `href` con el mismo hover que las que sí linkean, prometiendo un click que no existía. Se armaron las 5 páginas que faltaban, siguiendo el mismo template que las demás páginas de servicio (`psicologia-berazategui.html`, etc.), y se linkearon desde `index.html`.

**Qué contienen y qué no:**
- Las 4 primeras (Estimulación Temprana, Estimulación Cognitiva, Alfabetización, Psicodiagnóstico) describen el servicio de forma genérica/estándar — qué es, para quién está indicado, cómo es la primera entrevista — sin atribuirle al centro ningún dato específico que no esté confirmado (no se nombra ningún profesional de esas áreas, no se inventan protocolos ni resultados).
- Kinesiología usa los datos reales confirmados de Ian Lautaro Guzmán (ver ítem 1) y agrega una tarjeta "¿Quién te atiende?" que linkea a su perfil en `equipo-profesional.html`.
- Las 5 quedaron en `index, follow` y se agregaron a `sitemap.xml`.
- **Actualización (2026-10-27):** las aperturas "¿Qué es?" de las 4 páginas genéricas se reescribieron para anclarlas a "Centro Sinapsis... Berazategui" (antes no nombraban ni el centro ni la ubicación — un gap de citabilidad por IA detectado en la auditoría GEO de ese día). Kinesiología ya tenía ese anclaje desde que se creó.

## 10. Plan SEO/GEO — ejecutado (2026-10-27)

**Dónde:** ver `/root/.claude/plans/clever-wobbling-shamir.md` para el plan completo con el detalle línea por línea de cada hallazgo.

**Qué se hizo (sin pedir datos nuevos al centro):**
- Recortadas las 3 meta descriptions que estaban fuera de rango (`index.html`, `estimulacion-temprana-berazategui.html`, `estimulacion-cognitiva-berazategui.html`) a ≤160 caracteres.
- Agregado `reviewedBy` en JSON-LD en las 3 páginas de servicio con profesional confirmado (psicología, terapia ocupacional, kinesiología) — ver ítem 1.
- Ancladas a "Centro Sinapsis... Berazategui" las 4 aperturas "¿Qué es?" que quedaban genéricas — ver ítem 9.
- Ampliados a 4 cards los 6 grids de "Otros servicios relacionados" de las páginas originales, agregando un link hacia cada una de las 5 páginas nuevas (antes esas 5 recibían muy pocos enlaces internos).
- Creado `/llms.txt` en la raíz (no existía) con el resumen estructurado del sitio para crawlers de IA.
- Sacado el badge duplicado "Obras sociales, prepagas y CUD" del promise-strip del home (quedaba repetido con la card de `#servicios`) — queda lugar libre para cuando llegue la lista real de obras sociales (ítem 6).
- Lazy-load agregado al iframe de Instagram del home.
- Borrado el código muerto del canvas animado del hero (estaba deshabilitado desde hacía tiempo, pero se seguía descargando igual).
- Re-corrida `scripts/validar_seo.py`: 0 errores, 0 avisos, 22 URLs en sitemap, 27 páginas auditadas (al 2026-10-27; al 2026-10-30, tras sumar la página de discapacidad y la de historia, son 24 URLs y 29 páginas — ver ítem 12).
- Sincronizados `SEO_GEO_AUDIT_AFTER.md` y `SEO_GEO_VALIDATION.md`, que tenían afirmaciones desactualizadas (ver ese mismo plan).

**Qué sigue pendiente (necesita un dato real del centro):** todo el Track B del plan — profesionales de psicopedagogía/fonoaudiología/evaluaciones, fuentes clínicas de ADOS-2/ADI-R y batería neurocognitiva, lista de obras sociales, formación de Flavia Avellaneda e Ian Guzmán, historia real del centro/fundador, permiso para reseñas reales, y fotos reales. Son los mismos ítems 1-7 de este mismo archivo.

**Verificación real pendiente:** correr a mano una muestra de las preguntas de `SEO_GEO_PROMPTS.md` contra ChatGPT/Perplexity/Google AI Overviews para confirmar si esto efectivamente mejoró las recomendaciones — no hay forma automática de medirlo.

## 11. Historia del centro/fundador

**Estado (2026-10-30):** resuelto. El centro confirmó la historia real: Centro Sinapsis nació en febrero de 2026, el origen del nombre (sinapsis = conexión), los cuatro valores que guían el trabajo (conexiones humanas, trabajo interdisciplinario, la persona en el centro, construir algo diferente) y la frase sello "Vos sos el centro. Nosotros conectamos con vos."

**Dónde se publicó:** página nueva `/nuestra-historia.html` (indexada, en `sitemap.xml` y `llms.txt`), con el texto completo que dio el centro casi textual, los 4 valores como tarjetas, y la frase sello destacada como cita. JSON-LD `AboutPage` + `BreadcrumbList`.

**Dónde se integró:** `index.html`, sección "Por qué elegirnos" (`.confianza-body`) — el párrafo genérico ("nació con un propósito claro") se reemplazó por un resumen con la fecha real y el origen del nombre, con link a la historia completa. Se agregó `"foundingDate": "2026-02"` al JSON-LD `MedicalBusiness` del home (dato real, no estaba declarado antes). Se agregó el link en el footer del home.

## 12. Checkpoint de mejora SEO/GEO — ejecutado (2026-10-30)

**Dónde:** ver `/root/.claude/plans/clever-wobbling-shamir.md` para el plan completo. Se volvió a auditar todo el sitio desde cero (no se asumió que los docs estaban al día) para ver qué quedaba pendiente después de todo lo hecho hasta acá.

**Resultado de la auditoría:** `validar_seo.py` en 0 errores/avisos, 29 páginas, 24 URLs en sitemap. JSON-LD válido en todo, `FAQPage` coincide con el texto visible en el 100% de las páginas (chequeado con script). Conclusión: la fruta más baja de SEO técnico ya estaba cosechada — lo que quedaba era arquitectura de información y mantenimiento de fechas.

**Qué se hizo:**
- `nuestra-historia.html` era la página peor enlazada del sitio (solo 2 links, los dos en `index.html`) a pesar de ser justo el tipo de contenido que más le sirve a una IA para citar con confianza. Se agregó un link a esa página en el footer de las 11 páginas de servicio + `equipo-profesional.html` + `obras-sociales-prepagas.html` + `uso-de-recursos.html`.
- La columna "Legal" del footer del home tenía "Equipo profesional" y "Nuestra historia" adentro, que no son documentos legales — se renombró a "Institucional".
- Sincronizadas las fechas `lastmod` de `sitemap.xml` y `dateModified` del JSON-LD que habían quedado desactualizadas en 14 páginas (editadas el 2026-10-30 pero con fecha vieja).
- Agregado a `scripts/validar_seo.py` un chequeo nuevo que compara el `lastmod` de cada URL del sitemap contra la fecha del último commit de git que tocó ese archivo, para que esta desincronización se detecte sola de ahora en más (no usa el mtime del filesystem, que no es confiable después de un `git clone`).

**Qué sigue pendiente (necesita un dato real del centro):** ver ítems 1-7 de este archivo. El ítem 6 ("OSPI") ya no es urgente — se sacó del listado público (ver arriba) hasta confirmarla; si el centro la confirma, se vuelve a agregar.
