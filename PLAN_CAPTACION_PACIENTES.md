# Plan de captación de pacientes — qué se hizo y qué falta hacer a mano

Fecha: 2026-10-31. Objetivo: aparecer en Google, Bing y las IA (ChatGPT, Gemini, Copilot, Perplexity) cuando alguien de Zona Sur busca autismo/TEA, centro de discapacidad, TDAH, retraso del lenguaje o psicología, y convertir esa visita en una consulta por WhatsApp.

## 1. Cambios hechos en el sitio

### Páginas nuevas (indexadas, en `sitemap.xml` y `llms.txt`)
| Página | Búsquedas a las que apunta |
|---|---|
| `/autismo-tea-berazategui.html` | autismo Berazategui, centro TEA zona sur, terapia para niños con autismo Quilmes |
| `/centro-discapacidad-zona-sur.html` | centro de discapacidad zona sur, prestaciones con CUD, cómo sacar el CUD |
| `/senales-autismo-ninos.html` | cómo saber si mi hijo tiene autismo, señales de autismo en bebés |
| `/tdah-berazategui.html` | TDAH Berazategui, evaluación TDAH adultos zona sur |
| `/retraso-lenguaje-ninos.html` | mi hijo no habla, retraso del lenguaje, fonoaudióloga infantil zona sur |
| `/centro-terapeutico-zona-sur.html` | centro terapéutico Quilmes / Florencio Varela / Hudson / Ranelagh |

Cada una tiene: una respuesta directa en el primer párrafo que nombra a Sinapsis y Berazategui (para las IA), preguntas frecuentes visibles con datos estructurados `FAQPage` que coinciden 1 a 1, `MedicalWebPage` con `citation`, fuentes oficiales verificadas (OMS, CDC, MedlinePlus, Ley 24.901, guía oficial del CUD), los 3 pasos de "Cómo empezamos" y enlaces cruzados.

### Conversión
- **Formulario "Armá tu consulta en 30 segundos"** (`js/consulta.js` + `css/consulta.css`) en la home, las 6 páginas nuevas y 12 páginas de servicio. Pregunta para quién es, la edad, el motivo, si tiene CUD y la obra social, y abre WhatsApp con el mensaje ya escrito. No guarda datos en ningún servidor.
- **Botón flotante de WhatsApp** en todas las páginas de servicio, con un mensaje propio de cada página (por ejemplo "Quisiera consultar por TEA / autismo").
- **Promesas visibles en el hero** de las páginas nuevas: sin derivación, con y sin CUD, primera entrevista en menos de 48 hs.
- **Analytics**: los clics en WhatsApp, teléfono y email, y el envío del formulario, mandan el evento `generate_lead` (con la ubicación del botón, nunca datos de salud).

### SEO on-page
- Títulos reescritos para nombrar el servicio y la zona en la home y 10 páginas (todos de 65 caracteres o menos).
- Home: franja con accesos a TEA, Discapacidad/CUD, Señales de autismo y TDAH; columna nueva en el footer; JSON-LD con `knowsAbout`, `hasOfferCatalog` (14 servicios) y más localidades en `areaServed`.
- Enlaces cruzados: las páginas de servicio enlazan a TEA, TDAH, lenguaje y discapacidad según corresponda, y todas tienen la fila de enlaces nueva en el footer.
- `scripts/validar_seo.py`: 0 errores y 0 avisos.

## 2. Lo que tenés que hacer vos (en orden de impacto)

### 2.1 Publicar y avisar a los buscadores (5 minutos, después del deploy)
1. Mergear esta rama a `main` para que Vercel la publique.
2. Con el sitio ya publicado, correr `python3 scripts/indexnow_submit.py` (avisa a Bing y otros buscadores).
3. En **Google Search Console** → Sitemaps → reenviar `https://sinapsiscentro.com.ar/sitemap.xml`. Después, en "Inspección de URLs", pegar cada una de las 6 páginas nuevas y tocar "Solicitar indexación".
4. En **Bing Webmaster Tools**: reenviar el sitemap.

### 2.2 Google Analytics: marcar la conversión (2 minutos)
GA4 → Administrar → Eventos → buscar `generate_lead` (aparece cuando alguien lo dispare por primera vez) → activar **"Marcar como evento clave"**. Desde ahí vas a ver cuántas consultas trae cada página.

### 2.3 Perfil de Empresa de Google (lo que más mueve las búsquedas "cerca de mí")
- **Categoría principal:** Centro de salud mental (o Psicólogo).
- **Categorías secundarias:** Logopeda / Fonoaudiólogo, Terapeuta ocupacional, Psicopedagogo, Centro de rehabilitación, Fisioterapeuta.
- **Descripción** (pegar tal cual, unos 650 caracteres):

> Centro Sinapsis es un centro de salud interdisciplinario en Berazategui que acompaña a bebés, niños, adolescentes y adultos de toda la Zona Sur (Quilmes, Florencio Varela, Hudson, Ranelagh). Trabajamos con autismo (TEA), discapacidad y CUD, TDAH, retrasos del lenguaje y dificultades de aprendizaje: evaluación ADOS-2 y ADI-R, psicología, psicopedagogía, fonoaudiología, terapia ocupacional e integración sensorial, estimulación temprana y kinesiología para adultos mayores. No hace falta derivación médica: escribinos por WhatsApp y coordinamos la primera entrevista, habitualmente en menos de 48 horas. Atendemos con y sin CUD.

- **Servicios** (cargar cada uno con su enlace a la página correspondiente): Evaluación de autismo ADOS-2 y ADI-R · Terapias para TEA · Prestaciones por discapacidad (CUD) · Evaluación de TDAH · Psicología infantil · Psicología para adultos · Fonoaudiología infantil · Terapia ocupacional e integración sensorial · Psicopedagogía · Estimulación temprana · Psicodiagnóstico · Evaluación neurocognitiva · Kinesiología para adultos mayores.
- **Atributos:** "Cita previa obligatoria", "Accesible para sillas de ruedas" (sólo si es cierto).
- **Fotos:** fachada (para que te reconozcan al llegar), la sala de espera, los consultorios y el equipo. Subir 2 o 3 fotos nuevas por mes.
- **Publicaciones:** una por semana. Ideas: "¿Cómo saber si mi hijo tiene autismo?" con enlace a la guía; "¿Qué es el CUD y cómo se tramita?"; "Mi hijo no habla: ¿cuándo consultar?".
- **Preguntas y respuestas:** cargar vos mismo las preguntas frecuentes de las páginas nuevas (¿atienden con CUD?, ¿necesito derivación?, ¿hacen diagnóstico de autismo?).
- **Enlace del botón "Sitio web":** `https://sinapsiscentro.com.ar/`. Si Google te deja un enlace de "Citas", poné el WhatsApp.

### 2.4 Reseñas (el factor local número uno después de la cercanía)
Mensaje para mandar por WhatsApp a familias contentas, unas 2 semanas después de empezar:

> ¡Hola! Gracias por confiar en Centro Sinapsis 💙 Si sentís que te estamos ayudando, nos sería de mucha ayuda que dejes una reseña en Google contando tu experiencia (por ejemplo, por qué consultaste y cómo te sentiste). Así otras familias de la zona nos pueden encontrar: [ENLACE DE RESEÑAS DE GOOGLE]. ¡Gracias!

El enlace se saca del Perfil de Empresa → "Pedir reseñas". Contestá todas las reseñas, nombrando el servicio con naturalidad ("¡Gracias! Nos alegra que la fonoaudiología esté ayudando a Tomi").
No ofrezcas descuentos a cambio de reseñas: Google lo prohíbe.

### 2.5 Más lugares donde aparecer
- **Bing Places**: importar el perfil desde Google (5 minutos).
- **Apple Business Connect** (Apple Maps).
- Doctoralia y directorios de prestadores de discapacidad.
- Grupos de Facebook y WhatsApp de madres y padres de chicos con TEA de Zona Sur (compartir la guía de señales de autismo, no publicidad directa).
- Contactar a las escuelas y jardines de la zona con la guía "¿Cómo saber si mi hijo tiene autismo?". Los gabinetes escolares derivan mucho.

### 2.6 Datos para mejorar las páginas (pasármelos cuando los tengas)
- Profesionales de fonoaudiología, psicopedagogía y evaluaciones, para sumarlos al equipo y como revisores de las páginas (`reviewedBy`): las IA y Google valoran mucho saber quién escribió o revisó el contenido.
- Fotos reales del centro, para las páginas de TEA y discapacidad.
- Si atienden a grupos (habilidades sociales, talleres para padres): cada uno merece una página propia.
- Si el centro tiene acompañantes terapéuticos o maestras de apoyo/integración: son búsquedas muy frecuentes con CUD.
- Lo que sigue pendiente en `SEO_GEO_CONTENT_NEEDED.md`.

## 3. Qué esperar
Las páginas nuevas suelen tardar entre 4 y 12 semanas en posicionarse. El Perfil de Empresa con reseñas y fotos mueve más rápido las búsquedas "cerca de mí". Revisar cada mes en Search Console qué búsquedas traen visitas y en GA4 qué página genera más `generate_lead`, y reforzar esas páginas.

## 4. Sistema visual y guías (2026-10-31)

- **Ilustraciones** (`img/ilustraciones/*.svg`, 32 en total) e **íconos** de la home: se generan con `python3 scripts/ilustraciones.py`. Paleta medida sobre el Instagram de la marca (crema, beige, salvia, oliva, terracota, durazno, azul marino). Criterio: cada imagen muestra de qué trata su página, con personas cuando la página habla de personas.
- **Guías para familias** (`/guias.html` + 7 artículos nuevos: dislexia, pronunciación, tartamudez, ansiedad infantil, integración sensorial, olvidos en adultos mayores y prevención de caídas): `python3 scripts/generar_articulos.py`, con la plantilla compartida `scripts/plantilla_paginas.py`.
- **Talleres**: `python3 scripts/generar_talleres.py`.
- Para sumar un artículo: agregar un `dict` a `ART` en `scripts/generar_articulos.py` (y su ilustración en `scripts/ilustraciones.py`), correr ambos scripts, sumar la URL a `sitemap.xml` y `llms.txt`, correr `scripts/validar_seo.py` y, ya publicado, `scripts/indexnow_submit.py`.
- Ideas de próximos artículos según lo que más se busca: "¿A qué edad se habla?", "Hitos del desarrollo del bebé", "Dificultades de atención en el aula", "Diagnóstico de autismo en adultos", "Qué hace un psicopedagogo", "Terapia ocupacional en adultos mayores".
