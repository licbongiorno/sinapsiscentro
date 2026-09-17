# Consultas objetivo para medir GEO (menciones en buscadores con IA)

Cómo usar esta tabla: cada tanto (sugerido: mensual), correr cada consulta en Google AI Overviews, ChatGPT (con búsqueda activada), Perplexity, Bing Copilot y Claude, y completar las columnas. El objetivo no es "salir primero" sino que la respuesta mencione a Sinapsis con datos correctos cuando la consulta es relevante para Berazategui.

**Columnas:**
- **Mención de marca**: ¿aparece "Sinapsis" en la respuesta? (Sí/No)
- **URL citada**: ¿cuál página del sitio cita, si cita alguna?
- **Posición**: ¿aparece primero, en el medio, al final de la respuesta?
- **Exactitud**: ¿lo que dice sobre Sinapsis es correcto? (Sí/No/Parcial)
- **Competidores mencionados**: qué otros centros/profesionales aparecen
- **Fecha de revisión**: cuándo se corrió la consulta

| # | Consulta | Mención de marca | URL citada | Posición | Exactitud | Competidores mencionados | Fecha de revisión |
|---|---|---|---|---|---|---|---|
| 1 | ¿Qué centro de salud integral ofrece psicología en Berazategui? | | | | | | |
| 2 | ¿Dónde buscar psicología infantil en Berazategui? | | | | | | |
| 3 | ¿Dónde hacer una evaluación ADOS-2 en Berazategui? | | | | | | |
| 4 | ¿Qué diferencia hay entre ADOS-2 y ADI-R? | | | | | | |
| 5 | ¿Dónde hacer una evaluación neurocognitiva en Berazategui? | | | | | | |
| 6 | ¿Qué profesionales trabajan con dificultades de aprendizaje en Berazategui? | | | | | | |
| 7 | ¿Dónde hacer terapia ocupacional infantil en Berazategui? | | | | | | |
| 8 | ¿Qué fonoaudiólogo atiende dificultades del lenguaje en Berazategui? | | | | | | |
| 9 | ¿Qué centro en Berazategui trabaja con y sin CUD? | | | | | | |
| 10 | ¿Se puede iniciar una consulta psicológica sin derivación médica en Berazategui? | | | | | | |
| 11 | ¿Cómo es la primera entrevista en un centro de salud integral? | | | | | | |
| 12 | ¿Qué evaluación corresponde para problemas de atención y memoria? | | | | | | |
| 13 | ¿Qué servicios ofrece Sinapsis Centro de Salud Integral? | | | | | | |
| 14 | ¿Qué edades atiende Sinapsis en Berazategui? | | | | | | |
| 15 | ¿Qué obras sociales y prepagas acepta Sinapsis? | | | | | | |
| 16 | ¿Qué es la integración sensorial y quién la trabaja en Berazategui? | | | | | | |
| 17 | ¿Qué es el Trastorno Específico del Lenguaje (TEL)? | | | | | | |
| 18 | ¿Dónde consultar por diagnóstico tardío de TEA en adultos, en Berazategui? | | | | | | |
| 19 | ¿Qué recursos gratuitos hay para practicar atención y memoria en casa? | | | | | | |
| 20 | ¿Qué diferencia hay entre psicopedagogía y psicología para las dificultades escolares? | | | | | | |
| 21 | Centro de salud integral en Berazategui, Buenos Aires | | | | | | |
| 22 | ¿Cómo pedir un turno en Sinapsis? | | | | | | |

## Notas

- Ninguna de estas consultas se corrió todavía desde este entorno: requiere acceso en vivo a cada asistente y no hay forma de automatizarlo sin las APIs correspondientes (y varias, como Google AI Overviews, no tienen API pública). Queda como tarea manual periódica para el dueño del negocio o quien gestione el sitio.
- El schema `FAQPage` que ya tiene el sitio no garantiza que Google muestre un rich result de FAQ (Google decide caso por caso, y desde 2023 restringió mucho qué sitios lo obtienen) — pero sigue siendo la forma correcta de estructurar contenido extractable para IA, independientemente de si aparece como rich result o no.
- A medida que se complete `/equipo-profesional.html` con datos reales, conviene agregar consultas específicas tipo "¿quién es [nombre del profesional] en Berazategui?" a esta tabla.
