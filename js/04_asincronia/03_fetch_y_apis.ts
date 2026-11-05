// FETCH, HTTP Y VALIDACIÓN EN LA FRONTERA DE TIPOS
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - API REST y códigos de estado HTTP (HTTP status codes)
//     Técnico: el cliente (tu programa) hace una petición (request) a una URL y el servidor devuelve una
//     respuesta (response) con un código: 2xx éxito, 3xx redirección, 4xx error del cliente (404 no
//     encontrado), 5xx error del servidor.
//     Para tontos: pedir algo en una ventanilla y recibir un papel con un número que dice si salió bien.
//
// - `fetch` y `Response.ok`
//     Técnico: fetch(url) devuelve Promise<Response>. La promesa solo se RECHAZA ante un fallo de red
//     (error de red); un 404 o un 500 NO la rechazan: hay que mirar `res.ok` (true si el código es 2xx)
//     o `res.status`.
//
// - Deserialización (deserialization) y `res.json()`
//     Técnico: res.json() parsea el cuerpo (texto JSON) a un objeto de JS y devuelve Promise<any>:
//     TS no puede saber qué forma tiene lo que llega del exterior.
//
// - Aserción de tipo (type assertion, `as`) frente a validación en tiempo de ejecución
//     Técnico: `as Album` NO comprueba nada: solo le dice al compilador "confía en mí". Los tipos se borran
//     al compilar, así que en la frontera con el mundo exterior (red, disco, entrada del usuario) hay que
//     validar con una guarda de tipo (type guard) sobre `unknown`.
//     Para tontos: `as` es poner una pegatina de "contiene discos" a una caja sin abrirla; validar es abrirla.
//
// - Query string y `URLSearchParams`
//     Técnico: los parámetros de una URL (?term=...&limit=5) deben codificarse (URL encoding: "d.c." con
//     espacios o símbolos). URLSearchParams lo hace por ti.
//
// - Serialización (serialization), cabeceras (headers) y cuerpo (body) en un POST
//     Técnico: para enviar un objeto: method: "POST", headers: { "Content-Type": "application/json" } y
//     body: JSON.stringify(objeto).
//
// - Cancelación y timeout con AbortController / AbortSignal
//     Técnico: AbortSignal.timeout(ms) devuelve una señal que aborta el fetch pasado ese tiempo
//     (rechaza la promesa con un error de aborto).
//
// - Variables de entorno (environment variables) y gestión de secretos
//     Técnico: las claves de API no se escriben en el código ni se suben a Git: se leen de
//     `process.env.NOMBRE`.
//
// API de ejemplo: la búsqueda de iTunes (pública, gratuita y sin registro):
//   https://itunes.apple.com/search?term=fontaines+d.c.&entity=album&limit=10
// Devuelve un JSON con esta forma: { resultCount: number, results: [ ... ] }
//
// Ejecutar:  pnpm tsx 04_asincronia/03_fetch_y_apis.ts      Comprobar tipos:  pnpm tsc

type Album = {
    collectionId: number;
    collectionName: string;
    artistName: string;
    releaseDate: string;      // "2022-04-22T07:00:00Z"
    trackCount: number;
    primaryGenreName: string;
};
type Respuesta<T> = { resultCount: number; results: T[] };

const BASE = "https://itunes.apple.com";

// 1. [GET + deserialización] `buscarAlbumes(artista: string): Promise<Album[]>` con GET a
//    `${BASE}/search?term=...&entity=album`. Búscalo con "Fontaines D.C." e imprime cuántos hay y el
//    nombre del primero. (Los datos llegan dentro de `results`.)


// 2. [Códigos de estado y genéricos] Comprueba `res.ok`: escribe el genérico `getJSON<T>(url: string): Promise<T>`
//    que lance un Error (con el status) si la respuesta no es correcta. Pruébalo con una búsqueda normal
//    y con una ruta que no exista en la API (por ejemplo `${BASE}/no-existe`): ¿qué status devuelve?


// 3. [Transformación de datos] Muestra los álbumes de Fontaines D.C. como "2019 - Dogrel", ordenados por año.
//    El año son los 4 primeros caracteres de `releaseDate`.
//    Ojo: la API puede devolver también ediciones deluxe o duplicados.


// 4. [URLSearchParams y URL encoding] Construye la query con `URLSearchParams` en vez de concatenar texto a mano:
//    term, entity=album, limit=5 y country=ES.


// 5. [Peticiones concurrentes + join en memoria] Busca EN PARALELO (Promise.all) los álbumes de Fontaines D.C.,
//    Deftones, Ethel Cain y The Murder Capital y muestra cuántos álbumes ha devuelto la API para cada uno:
//    { artista, albumes: n }.


// 6. [Agregación] Cuenta cuántos álbumes hay por año entre todos los resultados del ejercicio 5.
//    (Reutiliza `contarPor` de 02_funciones_y_tipos/04_genericos.ts o hazlo con reduce.)


// 7. [POST: serialización, headers y body] Envía una valoración con fetch a
//    `https://jsonplaceholder.typicode.com/posts`
//    (method, headers con Content-Type: application/json, body con JSON.stringify).
//    Esa API de pruebas simula la creación y te devuelve tu objeto con un id.
//    Tipa lo que envías: `type Valoracion = { disco: string; nota: number }`
//    (por ejemplo, { disco: "Skinty Fia", nota: 9 }).


// 8. [Error de red frente a error HTTP] Dentro de un try/catch, distingue:
//    a) fallo de red: pide `https://no-existe.invalid` (fetch rechaza),
//    b) respuesta con error HTTP: pide `${BASE}/no-existe` (fetch NO rechaza, hay que mirar res.ok).
//    Imprime un mensaje distinto para cada caso.


// 9. [Timeout con AbortSignal] Pasa `signal: AbortSignal.timeout(50)` a fetch. ¿Qué error obtienes?
//    Prueba con 50 ms y con 5000 ms.


// 10. [Type guard en vez de aserción] Reto: en vez de fiarte con `as Album`, escribe una guarda de tipo
//     `esAlbum(x: unknown): x is Album` que compruebe de verdad la forma del objeto (typeof de cada campo).
//     Úsala para filtrar `results` y quedarte solo con lo que sea realmente un álbum.
//     Explica en un comentario por qué `as` es peligroso (pista: tipos borrados en tiempo de ejecución).


// 11. [Secretos y variables de entorno] Reto final con TUS datos: Last.fm tiene API.
//     Crea una clave gratis en https://www.last.fm/api/account/create y guárdala en una variable de entorno
//     (NUNCA la escribas en el código):
//        LASTFM_KEY=tu_clave pnpm tsx 04_asincronia/03_fetch_y_apis.ts
//     (en el código se lee con `process.env.LASTFM_KEY`).
//     Pide tus artistas más escuchados con el método `user.gettopartists`
//     (parámetros: method, user, api_key, format=json, limit) y muestra tu top 10.
//     Mira la documentación de Last.fm para ver la forma de la respuesta y escribe tú los tipos.
