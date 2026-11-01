# Plan de crecimiento de 90 días: Centro Sinapsis

**Cuándo empieza:** el "día 0" es cuando se cumplen las 3 condiciones de arranque:

1. El PR #12 está mergeado y publicado.
2. Están respondidas las preguntas 🔴 de `DATOS_PENDIENTES_CENTRO_SINAPSIS.md`.
3. Están hechas las configuraciones externas X1 a X5 (Vercel 308, Search Console, GA4, Google Business Profile, Doctoralia).

Hasta entonces no conviene producir contenido nuevo. Escribir sobre servicios con datos sin confirmar es el riesgo principal.

**Objetivo del ciclo:** que más familias de Berazategui y Zona Sur encuentren el centro, entiendan qué ofrece y escriban por WhatsApp. El foco está en Google local (Maps y búsqueda) y en ser una fuente citable por la IA.

---

## Indicadores (se miden el día 0 y el día 90)

| Indicador | Fuente | Cómo se mide |
|---|---|---|
| Consultas por WhatsApp, email y teléfono desde la web | GA4: evento `generate_lead` | Total mensual y por página de origen |
| Clics desde Google | Search Console | Clics e impresiones de las páginas de servicio y guías |
| Consultas locales en Google Maps | Google Business Profile → Rendimiento | Llamadas, solicitudes de ruta y clics al sitio |
| Reseñas en Google | Google Business Profile | Cantidad y respuestas del centro |
| Visibilidad en IA | `seguimiento-geo.csv` | Tasa de mención, tasa de cita y exactitud |
| Origen de pacientes nuevos | Pregunta "¿cómo nos conociste?" en la primera entrevista | Planilla interna (sin datos de salud) |

No se fijan metas numéricas sin la línea de base del día 0. Las metas se definen en la semana 2 con los datos reales.

---

## Fase 1 · Semanas 1 a 4: base local y medición

| Semana | Acción | Quién | Resultado esperado |
|---|---|---|---|
| 1 | Registrar la línea de base: exportar Search Console (3 meses), GA4 y GBP, y hacer la primera ronda completa de `SEGUIMIENTO_GEO.md` | Centro, con guía de Claude | Punto de partida documentado |
| 1 | Actualizar la web con las respuestas de `DATOS_PENDIENTES` (equipo, orientación vocacional, ADOS-2, kinesiología, promesas comerciales) | Claude, en un PR, con aprobación del centro | Páginas sin datos pendientes |
| 2 | Agregar los perfiles nuevos (GBP, Doctoralia) a `sameAs` del schema y a `llms.txt` | Claude, en un PR | Entidad consolidada para Google y la IA |
| 2 | Definir las metas de 90 días con los datos de la línea de base | Centro + Claude | Metas realistas |
| 2–3 | Subir las fotos reales a la web (home, equipo, talleres) y a GBP | Centro (fotos) + Claude (optimización) | Más confianza y mejor ficha local |
| 3–4 | Empezar un circuito de reseñas: pedirlas a familias satisfechas al cerrar un proceso, sin incentivos, y responder todas | Centro | Reseñas nuevas y constantes |

## Fase 2 · Semanas 5 a 8: contenido con validación clínica

| Semana | Acción | Quién |
|---|---|---|
| 5 | Artículo 1 de `PLAN_EDITORIAL.md`: cómo tramitar el CUD en Berazategui | Claude redacta → revisión del centro → PR |
| 6 | Artículo 4: prestaciones por discapacidad y Ley 24.901 | Ídem |
| 7 | Artículo 2: qué es el ADOS-2 (requiere el bloque C respondido) | Ídem, con revisión del profesional que lo administra |
| 8 | Artículo 3: psicología con reintegro (requiere el bloque F respondido) | Ídem |
| 5–8 | Una publicación semanal en GBP enlazando a una página de servicio o guía (puede ser la misma pieza que se sube a Instagram) | Centro |

## Fase 3 · Semanas 9 a 12: ajuste con datos

| Semana | Acción | Quién |
|---|---|---|
| 9 | Leer el issue "Auditoría periódica" del mes y corregir lo que marque | Claude, en un PR |
| 9–10 | En Search Console, buscar páginas con impresiones y CTR bajo y ajustar título y descripción | Claude, en un PR |
| 10 | Artículos 5 y 6 del plan editorial (autismo en adultos y alertas del desarrollo del bebé), o los que marque Search Console | Claude redacta → revisión → PR |
| 11 | Segunda ronda de `SEGUIMIENTO_GEO.md` y comparación con la línea de base | Centro |
| 12 | Informe del ciclo: indicadores del día 0 contra el día 90, qué funcionó y qué no, y plan del ciclo siguiente | Claude, con los datos que pase el centro |

---

## Reglas del ciclo

- **Nada se publica sin PR y sin el control "Calidad del sitio" en verde.** El centro aprueba cada merge.
- **Ningún contenido clínico se publica sin la revisión del profesional del área**, registrada en el PR.
- **No se agregan servicios, profesionales, coberturas ni promesas sin confirmación escrita del centro.**
- **No se compran reseñas, enlaces ni menciones.** Tampoco se crean perfiles falsos.
- **Una sola fuente de verdad:** cuando cambia un dato institucional (horario, equipo, cobertura), se actualiza a la vez en la web, `llms.txt`, el schema, GBP y los directorios.

## Fuera de este ciclo (evaluar después del día 90)
- Campañas pagas en Google Ads para búsquedas locales de alta intención. Requieren presupuesto y tener primero bien la ficha y las páginas.
- Autoalojar las tipografías y otras mejoras menores de rendimiento.
- URLs sin `.html`. Implica cambiar todas las canónicas y conviene hacerlo en un momento tranquilo.
- Contenido en video (Instagram o YouTube) enlazado desde las guías.
