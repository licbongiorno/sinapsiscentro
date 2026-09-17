# Login con Google — guía paso a paso

Esto conecta la plataforma de juegos a un proyecto real de Firebase
para que cada persona entre con su cuenta de Google y su perfil
(XP, nivel, racha, logros, progreso por juego) se guarde en la nube,
no sólo en ese dispositivo.

El código ya está armado (ver "Qué se agregó" al final). Lo que
falta son los pasos en la consola de Firebase, que solo los podés
hacer vos porque requieren tu cuenta de Google.

## ⚠️ Importante antes de empezar: cómo vas a abrir la página

El login con Google **no funciona abriendo el archivo directo desde
el disco** (una URL que empieza con `file:///C:/Users/...`, como
tenías hasta ahora). Necesita que la página se sirva por `http://`
o `https://`. Dos formas fáciles de lograrlo:

- **Para probar en tu compu**: instalá la extensión "Live Server" en
  VS Code y abrí `juegos.html` con ella (botón derecho → "Open with
  Live Server"), o corré `npx serve` desde la carpeta del proyecto.
  Ambas te dan una URL tipo `http://localhost:5500`.
- **Para que lo use gente real**: subí la carpeta a un hosting (ver
  el paso 6, que incluye cómo agregar ese dominio a Firebase).

## Paso 1 — Crear el proyecto en Firebase

1. Entrá a [console.firebase.google.com](https://console.firebase.google.com)
   con tu cuenta de Google.
2. "Agregar proyecto" (o "Crear un proyecto").
3. Ponele un nombre, por ejemplo `sinapsis-juegos`.
4. Podés desactivar Google Analytics si no lo vas a usar (no hace
   falta para esto). Crear proyecto.

## Paso 2 — Registrar la app web y copiar la configuración

1. En la pantalla principal del proyecto, hacé clic en el ícono
   `</>` ("Web") para agregar una app web.
2. Ponele un apodo, por ejemplo `sinapsis-juegos-web`. No hace falta
   tildar "Firebase Hosting" a menos que lo vayas a usar.
3. Firebase te va a mostrar un bloque de código con `firebaseConfig
   = { apiKey: ..., authDomain: ..., ... }`. **Copiá ese objeto
   completo** — lo vas a pegar en el Paso 7.

## Paso 3 — Habilitar el login con Google

1. En el menú de la izquierda: **Build → Authentication**.
2. "Get started" / "Comenzar".
3. Pestaña "Sign-in method" → elegí **Google** de la lista de
   proveedores.
4. Activalo (toggle "Enable"), elegí un nombre público para el
   proyecto y un mail de soporte (te va a pedir uno), Guardar.

## Paso 4 — Habilitar Firestore Database

1. Menú izquierdo: **Build → Firestore Database**.
2. "Create database" / "Crear base de datos".
3. Elegí la ubicación del servidor (cualquiera de Sudamérica está
   bien si te la ofrece, si no la más cercana disponible).
4. Empezá en **modo de producción** (no en modo de prueba) — las
   reglas del Paso 5 son las que realmente van a proteger los datos.

## Paso 5 — Pegar las reglas de seguridad

1. Dentro de Firestore Database, pestaña **"Rules" / "Reglas"**.
2. Borrá lo que haya y pegá el contenido completo del archivo
   `firestore.rules` que está en la raíz de este proyecto.
3. **Publicar**.

Esas reglas garantizan que cada usuario sólo puede leer y escribir
su propio perfil — nadie puede ver ni tocar los datos de otra
persona, ni siquiera con las herramientas de desarrollador del
navegador.

## Paso 6 — Agregar los dominios autorizados

Firebase sólo permite el login de Google desde dominios que vos
autorices explícitamente.

1. **Authentication → Settings → Authorized domains**.
2. `localhost` ya suele venir agregado por defecto (sirve para Live
   Server / `npx serve`).
3. Si vas a publicar el sitio en un dominio propio (por ejemplo
   `sinapsiscentro.com.ar`) o en un hosting (Netlify, Vercel, Firebase
   Hosting, etc.), agregá ese dominio acá con "Add domain" — si no,
   el botón de login va a fallar en producción con un error de
   dominio no autorizado.

## Paso 7 — Completar firebase-config.js

Abrí `js/firebase-config.js` en este proyecto y reemplazá los
valores de ejemplo por los que copiaste en el Paso 2:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",                       // ← el tuyo
  authDomain: "sinapsis-juegos.firebaseapp.com",
  projectId: "sinapsis-juegos",
  storageBucket: "sinapsis-juegos.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
};
```

Guardá el archivo. No hace falta tocar nada más.

## Paso 8 — Probar

1. Abrí `juegos.html` con Live Server (o donde lo hayas publicado).
2. Tocá el ícono de perfil (arriba a la derecha) → "Iniciar sesión
   con Google".
3. Elegí tu cuenta → debería aparecer tu foto en el botón de perfil
   y tu nombre en el modal.
4. Jugá algo y volvé a entrar desde **otro navegador o el celular**,
   con la misma cuenta de Google: el progreso debería estar ahí.

Si algo falla, abrí la consola del navegador (F12 → pestaña
"Console") — Firebase suele mostrar ahí un mensaje bastante claro
sobre qué paso falta (dominio no autorizado, reglas, etc.).

**Si el selector de cuenta de Google aparece, elegís la cuenta, pero
después no pasa nada** (no aparece error, y tampoco aparece el
usuario en Authentication → Users de la consola de Firebase): eso
pasaba con el flujo anterior (`signInWithRedirect`) en navegadores
que bloquean cookies/storage de terceros por defecto (Chrome, Safari
y Firefox actuales) — el viaje de ida y vuelta a Google se cortaba en
silencio. Ya se cambió a `signInWithPopup` (con `signInWithRedirect`
sólo como respaldo si el navegador bloquea directamente la ventana
emergente), que no depende de eso. Si después de este cambio te sigue
pasando lo mismo, lo más probable es que falte agregar el dominio
real (por ejemplo `sinapsiscentro.com.ar`, sin `www`) en
**Authentication → Settings → Authorized domains** — ver Paso 6.

## Qué se agregó al código (por si querés entender cómo funciona)

- **`js/auth.js`** (nuevo): maneja el login/logout con Google usando
  el SDK de Firebase. Expone el objeto global `Auth`.
- **`js/firebase-config.js`**: ahora inicializa Firebase de verdad
  con tus credenciales (antes era sólo un comentario explicativo).
- **`js/storage.js`**: sigue leyendo y escribiendo en localStorage de
  forma instantánea, exactamente como antes — nada de `game-engine.js`
  ni de los 120 juegos cambió. Lo nuevo es que, si hay sesión
  iniciada, además programa un guardado en Firestore cada vez que se
  actualiza algo (con un pequeño retraso para no saturar), y al
  iniciar sesión trae el perfil de la nube (o sube el progreso local
  si es la primera vez que esa cuenta entra).
- **`juegos.html`** y **`juego.html`**: cargan el SDK de Firebase y
  `auth.js`; el portal muestra el botón de login/logout dentro del
  modal de perfil y la foto de Google en el ícono de perfil cuando
  hay sesión.
- **`firestore.rules`**: las reglas de seguridad del Paso 5.

## Modo invitado sigue funcionando

Si alguien no quiere iniciar sesión, la plataforma funciona
exactamente igual que antes: todo se guarda en el localStorage de
ese dispositivo. El login es un extra para no perder el progreso al
cambiar de dispositivo, no un requisito para jugar.
