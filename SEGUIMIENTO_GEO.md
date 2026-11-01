# Seguimiento GEO: presencia de Centro Sinapsis en buscadores con IA

Este documento sirve para medir, con datos observados y no supuestos, si los motores de respuesta con IA mencionan, enlazan o citan a Centro Sinapsis cuando alguien busca atención en Berazategui y Zona Sur.

**Registro:** `seguimiento-geo.csv`, en esta misma carpeta. Se abre con Excel o con Google Sheets (Archivo → Importar).

> **Estado al 2026-11-01: todavía no se hizo ninguna medición.** La planilla tiene las 20 consultas preparadas, con las columnas de resultado vacías. No hay que completar ninguna celda sin haber hecho la prueba.

---

## 1. Las 20 consultas

Se agrupan por intención de búsqueda. Cada consulta se escribe **tal cual**, como la escribiría una familia, sin agregar "Centro Sinapsis" (salvo las consultas de marca, que miden otra cosa).

| ID | Consulta | Intención | Servicio relacionado |
|---|---|---|---|
| G01 | centro interdisciplinario en Berazategui | Local, genérica | Todos |
| G02 | centro para personas con discapacidad en Berazategui | Local, discapacidad | Discapacidad / CUD |
| G03 | dónde hacer una evaluación de autismo en Zona Sur | Local, TEA | ADOS-2 / TEA |
| G04 | evaluación ADOS-2 en Berazategui o Quilmes | Local, instrumento | ADOS-2 |
| G05 | psicólogo infantil en Berazategui | Local, psicología | Psicología |
| G06 | psicopedagoga en Berazategui | Local, aprendizaje | Psicopedagogía |
| G07 | fonoaudióloga para niños en Berazategui | Local, lenguaje | Fonoaudiología |
| G08 | terapia ocupacional e integración sensorial en Zona Sur | Local, TO | Terapia ocupacional |
| G09 | kinesiología para adultos mayores en Berazategui | Local, kinesiología | Kinesiología |
| G10 | estimulación temprana en Berazategui | Local, bebés | Estimulación temprana |
| G11 | orientación vocacional en Berazategui | Local, vocacional | Orientación vocacional |
| G12 | evaluación neuropsicológica para adultos en Zona Sur | Local, evaluación | Evaluación neurocognitiva |
| G13 | centros que atienden con CUD en Berazategui | Local, cobertura | Discapacidad / CUD |
| G14 | dónde tratar el TDAH de mi hijo en Quilmes o Berazategui | Local, TDAH | TDAH |
| G15 | mi hijo de 2 años no habla, a quién consulto en Zona Sur | Problema + local | Fonoaudiología |
| G16 | terapias para niños con autismo en Florencio Varela | Local (localidad vecina) | TEA |
| G17 | talleres de habilidades sociales para niños en Berazategui | Local, talleres | Talleres |
| G18 | psicólogo que atienda por reintegro de obra social en Berazategui | Local, cobertura | Psicología |
| G19 | ¿qué es Centro Sinapsis de Berazategui? | Marca | Entidad |
| G20 | Centro Sinapsis Berazategui: dirección, horarios y servicios | Marca | Entidad |

**Plataformas a medir** (las mismas en todas las rondas):

1. ChatGPT, con búsqueda web activada.
2. Google, con AI Overview y AI Mode.
3. Gemini.
4. Perplexity.
5. Microsoft Copilot.

20 consultas × 5 plataformas = **100 registros por ronda**. Si no hay tiempo, se puede hacer una ronda reducida con G01, G02, G03, G05, G08, G13, G19 y G20 (40 registros).

## 2. Cómo hacer cada prueba (para que sea comparable)

1. **Navegador en modo incógnito**, sin sesión iniciada cuando la plataforma lo permita. Así se evita que el historial personal cambie la respuesta.
2. Si la plataforma pide ubicación, no la des. La consulta ya incluye la localidad.
3. Pegá la consulta **exactamente** como figura en la tabla. No hagas preguntas de seguimiento.
4. Guardá una **captura de pantalla** de la respuesta completa, con el nombre `AAAA-MM-DD_plataforma_GXX.png`, en una carpeta compartida.
5. Completá una fila del CSV por cada consulta y plataforma.
6. Hacé la ronda completa **en el mismo día**.

## 3. Qué se registra (columnas del CSV)

| Columna | Valores posibles | Qué significa |
|---|---|---|
| `id` | G01…G20 | Consulta de la tabla |
| `consulta` | texto | Copia exacta de la consulta |
| `fecha` | AAAA-MM-DD | Día de la prueba |
| `plataforma` | chatgpt / google_ai / gemini / perplexity / copilot | Dónde se probó |
| `aparece_centro` | si / no | El texto de la respuesta nombra a "Centro Sinapsis" |
| `aparece_sitio` | si / no | Aparece un enlace a sinapsiscentro.com.ar (en el texto o en las fuentes) |
| `citado_como_fuente` | si / no | La plataforma muestra una página de sinapsiscentro.com.ar como fuente o referencia de la respuesta |
| `url_citada` | URL o vacío | Qué página del sitio citó |
| `posicion` | número o vacío | Si la respuesta es una lista de centros, en qué lugar aparece Sinapsis |
| `competidores_mencionados` | texto separado por `;` | Otros centros o profesionales nombrados, tal como aparecen |
| `datos_correctos` | si / no / parcial / n-a | Si menciona al centro: dirección, teléfono, horario y servicios son correctos |
| `observaciones` | texto | Errores, confusiones con otros "Sinapsis", fuentes usadas (Doctoralia, Google Maps, Instagram…) |
| `captura` | nombre de archivo | Nombre de la captura guardada |

**Regla:** si no se hizo la prueba, la fila queda vacía. Nunca se completa con suposiciones.

## 4. Cómo leer los resultados

Por cada ronda se calculan tres indicadores:

- **Tasa de mención** = filas con `aparece_centro = si` / filas medidas.
- **Tasa de cita** = filas con `citado_como_fuente = si` / filas medidas.
- **Exactitud** = filas con `datos_correctos = si` / filas con mención.

Lectura práctica:

- **Mencionan al centro pero con datos incorrectos:** revisar la consistencia de nombre, dirección y teléfono en Google Business Profile, directorios e Instagram.
- **Citan directorios (Doctoralia, Google Maps) y no la web:** la entidad existe, pero falta autoridad del sitio. Hacen falta más contenido útil y enlaces locales.
- **Confunden a Sinapsis con centros de otros países:** reforzar "Centro Sinapsis · Berazategui" en todos los perfiles y agregar los perfiles a `sameAs`.
- **No aparece en ninguna:** es esperable en los primeros meses. Lo que importa es la tendencia entre rondas.

## 5. Frecuencia

| Momento | Qué se hace |
|---|---|
| **Línea de base** | Primera ronda completa, apenas se publique el PR #12 y se complete Google Business Profile. |
| **Trimestral** (enero, abril, julio, octubre) | Ronda completa. El workflow "Auditoría periódica" lo recuerda en el issue del mes. |
| **Después de un cambio grande** | Ronda reducida 4 a 6 semanas después (por ejemplo: GBP verificado, nuevas guías publicadas, alta en Doctoralia). |

## 6. Límites (para no sacar conclusiones equivocadas)

- Las respuestas de IA **cambian** entre días, cuentas y versiones del modelo. Una sola prueba no es una tendencia.
- Aparecer en una respuesta no implica ser recomendado, y no aparecer no implica que el sitio esté mal posicionado en Google.
- Este seguimiento mide **visibilidad**. Las consultas y los turnos se miden en GA4 (`generate_lead`) y preguntando "¿cómo nos conociste?" en la primera entrevista.
