// FETCH Y APIs
//
// `fetch(url)` pide datos a un servidor y devuelve una promesa. Node 18+ lo trae incorporado.
// Usaremos la API de búsqueda de iTunes: es pública, gratuita y no necesita registro.
//   https://itunes.apple.com/search?term=fontaines+d.c.&entity=album&limit=10
// Devuelve un JSON con esta forma: { resultCount: number, results: [ ... ] }
//
// Tres cosas que conviene saber:
//   1. `fetch` solo RECHAZA la promesa si falla la red. Un 404 o un 500 NO la rechaza:
//      hay que mirar `res.ok` (true si el código es 2xx) o `res.status`.
//   2. `res.json()` devuelve `Promise<any>`: TS no sabe qué forma tiene lo que llega.
//      Escribir `as Album` es "decirle al compilador lo que quiere oír", no comprobarlo.
//   3. Para enviar datos: fetch(url, { method: "POST", headers: {...}, body: JSON.stringify(datos) }).
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

// 1. `buscarAlbumes(artista: string): Promise<Album[]>` con GET a `${BASE}/search?term=...&entity=album`.
//    Búscalo con "Fontaines D.C." e imprime cuántos hay y el nombre del primero.
//    (Los datos llegan dentro de `results`.)


// 2. Comprueba `res.ok`: escribe el genérico `getJSON<T>(url: string): Promise<T>` que lance un Error
//    (con el status) si la respuesta no es correcta. Pruébalo con una búsqueda normal
//    y con una ruta que no exista en la API (por ejemplo `${BASE}/no-existe`): ¿qué status devuelve?


// 3. Muestra los álbumes de Fontaines D.C. como "2019 - Dogrel", ordenados por año.
//    El año son los 4 primeros caracteres de `releaseDate`.
//    Ojo: la API puede devolver también ediciones deluxe o duplicados.


// 4. Construye la query con `URLSearchParams` en vez de concatenar texto a mano:
//    term, entity=album, limit=5 y country=ES.


// 5. Busca EN PARALELO (Promise.all) los álbumes de Fontaines D.C., Deftones, Ethel Cain y The Murder Capital
//    y muestra cuántos álbumes ha devuelto la API para cada uno: { artista, albumes: n }.


// 6. Cuenta cuántos álbumes hay por año entre todos los resultados del ejercicio 5.
//    (Reutiliza `contarPor` de 02_funciones_y_tipos/04_genericos.ts o hazlo con reduce.)


// 7. POST: envía una valoración con fetch a `https://jsonplaceholder.typicode.com/posts`
//    (method, headers con Content-Type: application/json, body con JSON.stringify).
//    Esa API de pruebas simula la creación y te devuelve tu objeto con un id.
//    Tipa lo que envías: `type Valoracion = { disco: string; nota: number }`
//    (por ejemplo, { disco: "Skinty Fia", nota: 9 }).


// 8. Dos tipos de error distintos. Dentro de un try/catch, distingue:
//    a) fallo de red: pide `https://no-existe.invalid` (fetch rechaza),
//    b) respuesta con error HTTP: pide `${BASE}/no-existe` (fetch NO rechaza, hay que mirar res.ok).
//    Imprime un mensaje distinto para cada caso.


// 9. Timeout: pasa `signal: AbortSignal.timeout(50)` a fetch. ¿Qué error obtienes?
//    Prueba con 50 ms y con 5000 ms.


// 10. Reto: en vez de fiarte con `as Album`, escribe un type guard `esAlbum(x: unknown): x is Album`
//     que compruebe de verdad la forma del objeto (typeof de cada campo).
//     Úsalo para filtrar `results` y quedarte solo con lo que sea realmente un álbum.
//     Explica en un comentario por qué `as` es peligroso.


// 11. Reto final con TUS datos: Last.fm tiene API. Crea una clave gratis en https://www.last.fm/api/account/create
//     y guárdala en una variable de entorno (NUNCA la escribas en el código):
//        LASTFM_KEY=tu_clave pnpm tsx 04_asincronia/03_fetch_y_apis.ts
//     (en el código se lee con `process.env.LASTFM_KEY`).
//     Pide tus artistas más escuchados con el método `user.gettopartists`
//     (parámetros: method, user, api_key, format=json, limit) y muestra tu top 10.
//     Mira la documentación de Last.fm para ver la forma de la respuesta y escribe tú los tipos.
