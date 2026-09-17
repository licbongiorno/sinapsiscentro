# Información real pendiente (NO inventada)

Este archivo lista cada lugar del sitio donde falta un dato real del negocio. Nada de esto se inventó — donde faltaba, se dejó una estructura lista para completar o un texto neutro que no afirma nada que no se pueda comprobar.

## 1. Equipo profesional

**Dónde:** `/equipo-profesional.html` (página creada en esta tanda, en `noindex` a propósito).

**Qué falta:** por cada profesional — nombre, foto, especialidad, formación, matrícula, población atendida, servicios que realiza.

**Qué se hizo mientras tanto:** la página explica cómo funciona el proceso (primera entrevista → se define el profesional según el caso) sin nombrar a nadie, y aclara visiblemente que la sección de perfiles está en preparación. Cuando existan los datos reales:
1. Reemplazar el bloque `.svc-callout` de "en preparación" por una tarjeta por profesional.
2. Cambiar `<meta name="robots" content="noindex, follow">` a `<meta name="robots" content="index, follow">`.
3. Agregar cada profesional también como `Person` en el JSON-LD (`employee` de la organización, o `author`/`reviewedBy` en las páginas de servicio donde corresponda).
4. Agregarlos a `sitemap.xml`.

## 2. Fuentes clínicas para ADOS-2 / ADI-R

**Dónde:** `evaluacion-ados-2-adi-r-berazategui.html`, sección "Fuentes y referencias".

**Qué falta:** la edición/editorial exacta de los manuales de ADOS-2 y ADI-R que usa el centro (por ejemplo Western Psychological Services/WPS en su edición original, o la edición en español que corresponda — TEA Ediciones, Hogrefe u otra, según cuál use el equipo realmente).

**Qué se hizo mientras tanto:** se agregó como fuente el fact sheet de la OMS sobre trastornos del espectro autista (URL verificada de un fact sheet estable y de larga data: `who.int/news-room/fact-sheets/detail/autism-spectrum-disorders`), y se dejó un comentario HTML interno (`<!-- TODO DE CONTENIDO -->`) marcando qué falta.

## 3. Batería de evaluación neurocognitiva

**Dónde:** `evaluacion-neurocognitiva-berazategui.html`, sección "Fuentes y referencias".

**Qué falta:** qué batería/protocolo específico usa el centro (por ejemplo BANFE, ENI, NEUROPSI, WAIS, etc. — no se puede saber sin confirmación), y una fuente clínica verificable acorde (asociación de neuropsicología, manual del instrumento).

**Qué se hizo mientras tanto:** se dejó la sección con un texto visible honesto ("Estamos completando esta sección...") en vez de fuentes inventadas.

## 4. Modalidad de atención (presencial / virtual / híbrida)

**Dónde:** ninguna página lo afirma explícitamente hoy.

**Qué falta:** confirmar si la atención es 100% presencial, si hay telesalud disponible para algún servicio, o ambas.

**Qué se hizo mientras tanto:** ninguna página nueva ni editada afirma la modalidad — se evitó deliberadamente, incluso cuando el ejemplo de GEO provisto en el pedido la mencionaba ("atención principalmente presencial"), porque no hay confirmación en el proyecto de que sea así.

## 5. Datos legales para privacidad/términos

**Dónde:** `/privacidad.html`, `/terminos.html`.

**Qué falta:** son borradores prudentes basados en lo que el sitio realmente hace a nivel técnico (Firebase Auth, Google Analytics, localStorage, service worker) — **no son asesoramiento legal**. Antes de considerarlos definitivos, alguien responsable del negocio (idealmente con asesoría legal) debe revisarlos, en particular:
- Si corresponde inscribir la base de datos en la Dirección Nacional de Protección de Datos Personales (Ley 25.326, Argentina) dado que se procesan datos vinculados a consultas de salud.
- Si hace falta un consentimiento explícito adicional en el formulario/WhatsApp antes de coordinar una consulta.
- Razón social / CUIT del responsable, si se quiere incluir.

## 6. Obras sociales y prepagas específicas

**Dónde:** todas las páginas dicen genéricamente "obras sociales y prepagas" / "con y sin CUD", sin listar nombres.

**Qué falta:** el listado real de obras sociales y prepagas con las que se trabaja (si existe), para reemplazar el texto genérico por algo más específico y con más señal para búsquedas tipo "¿atienden [nombre de obra social]?".

**Qué se hizo mientras tanto:** no se inventó ningún nombre de obra social ni prepaga — se mantuvo el texto genérico ya existente.

## 7. Reseñas y menciones externas

**Dónde:** no aplica a ningún archivo del código — es una acción 100% externa.

**Qué falta:** reseñas genuinas en Google, respuestas a esas reseñas, menciones en directorios locales. Ver la lista completa de acciones externas en `SEO_GEO_AUDIT_AFTER.md`, sección "Acciones que debe realizar el dueño fuera del código".
