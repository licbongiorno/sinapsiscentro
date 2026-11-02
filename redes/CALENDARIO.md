# Instagram @sinapsiscentro: calendario de 4 semanas

**Objetivos:** que haya más consultas y que más gente use los recursos gratuitos de la web.
**Públicos:** familias con chicos, docentes y familias de personas con discapacidad.
**Ritmo:** 3 posteos y 5 historias por semana.

## La fórmula de cada semana

| Día | Posteo | Público principal | Cierre (llamada a la acción) |
|---|---|---|---|
| Lunes | Carrusel educativo: una guía de la web | Familias | "Guía completa en la bio" + WhatsApp |
| Miércoles | Carrusel práctico: recursos o ideas para el aula | Docentes y familias | "Guardalo" / "Etiquetá a una docente" + link a los recursos |
| Viernes | Carrusel de servicio: discapacidad, coberturas o el centro | Familias con discapacidad | "Escribinos con tu obra social" |

Las historias de cada día: lunes **encuesta** sobre el tema del posteo · martes **link** a un recurso gratis · miércoles **quiz** · jueves **preguntas** (o las respuestas a las de la semana anterior) · viernes **contacto** o detrás de escena.

Cada posteo sale de una página de la web que ya existe. Así cada publicación lleva tráfico a la web, y la web lleva a WhatsApp.

## Semanas

| Semana | Lunes (familias) | Miércoles (docentes y familias) | Viernes (discapacidad / centro) | Estado |
|---|---|---|---|---|
| 1 | Dislexia: señales que conviene mirar | Recursos gratis para casa y el aula | CUD: qué es y cómo empezar las terapias | ✅ Lista (`semana-01/`) |
| 2 | ¿Cuándo llevar a mi hijo al psicólogo? (`cuando-llevar-a-mi-hijo-al-psicologo.html`) | Motricidad fina: juegos para el aula y para casa (`motricidad-fina-ninos.html`) | Señales tempranas de autismo (`senales-autismo-ninos.html`) | ✅ Lista (`semana-02/`) |
| 3 | Rabietas y berrinches: qué hacer en el momento (`rabietas-berrinches-ninos.html`) | Un ejercicio de calma para después del recreo (`ejercicios.html`) | ¿Mi obra social cubre las terapias? Las 30 coberturas (`obras-sociales-prepagas.html`) | Pendiente |
| 4 | Retraso del lenguaje: qué esperar a cada edad (`retraso-lenguaje-ninos.html`) | Integración sensorial: señales en el aula (`integracion-sensorial-senales.html`) | Conocé al equipo (`equipo-profesional.html`)* | Pendiente |

\* Para el posteo del equipo hacen falta fotos y el permiso de cada profesional. Si no están para esa fecha, se reemplaza por "Primera consulta: cómo es" (`primera-consulta-psicologo.html`).

## Ideas de reels (opcionales, para grabar con el celular)
1. **"3 juegos gratis para el aula en 30 segundos":** grabación de la pantalla de la web mientras se usan, con un texto encima.
2. **"Así es nuestro centro":** recorrido por el lugar, sin pacientes, con música tranquila y la dirección al final.
3. **"Mito o realidad":** una profesional responde mitos ("la dislexia es falta de inteligencia" → mito).

## Reglas para todas las piezas
- Nada de fotos ni datos de pacientes. Solo se usan las reseñas que tienen permiso.
- No prometer resultados ni plazos de mejora. Cada pieza educativa cierra con "no reemplaza una evaluación profesional".
- No responder casos personales en comentarios ni en historias: se los invita a escribir por WhatsApp.
- Los datos del CUD y de la ley se verifican en fuentes oficiales el mes en que se publica.

## Cómo se generan las imágenes
Cada semana tiene un archivo `piezas.js` con los textos de cada placa. Para cambiar un texto o crear una semana nueva:

```bash
node redes/_motor/generar.js semana-01
```

Esto vuelve a crear los PNG (1080×1350 para los carruseles y 1080×1920 para las historias) con los colores, las tipografías y las ilustraciones de la web.
La carpeta `redes/` no se publica en la web (está excluida en `.vercelignore`).
