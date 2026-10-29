// FETCH Y APIs
//
// `fetch(url)` pide datos a un servidor y devuelve una promesa. Node 18+ lo trae incorporado.
// Usaremos una API pública de pruebas, gratuita y sin registro: https://jsonplaceholder.typicode.com
//   /posts   /posts/1   /posts?userId=1   /users   /todos
//
// Tres cosas que conviene saber:
//   1. `fetch` solo RECHAZA la promesa si falla la red. Un 404 o un 500 NO la rechaza:
//      hay que mirar `res.ok` (true si el código es 2xx) o `res.status`.
//   2. `res.json()` devuelve `Promise<any>`: TS no sabe qué forma tiene lo que llega.
//      Escribir `as Post` es "decirle al compilador lo que quiere oír", no comprobarlo.
//   3. Para enviar datos: fetch(url, { method: "POST", headers: {...}, body: JSON.stringify(datos) }).
//
// Ejecutar:  pnpm tsx 04_asincronia/03_fetch_y_apis.ts      Comprobar tipos:  pnpm tsc

type Post = { userId: number; id: number; title: string; body: string };
type User = { id: number; name: string; email: string; company: { name: string } };

const BASE = "https://jsonplaceholder.typicode.com";

// 1. `obtenerPosts(): Promise<Post[]>` con GET a /posts.
//    Imprime cuántos hay y el título del primero.


// 2. Comprueba `res.ok`: escribe el genérico `getJSON<T>(url: string): Promise<T>` que lance un Error
//    (con el status) si la respuesta no es correcta. Pruébalo con `${BASE}/posts/1` (OK)
//    y con `${BASE}/posts/99999` (¿qué status devuelve?).


// 3. Obtén los usuarios y muestra "nombre - empresa" de cada uno.


// 4. Posts de un usuario: `/posts?userId=1`. Construye la query con `URLSearchParams`
//    en vez de concatenar texto a mano.


// 5. Pide /users y /posts EN PARALELO (Promise.all) y únelos en memoria:
//    para cada post, `{ titulo, autor }` con el nombre de su usuario. Muestra los 5 primeros.


// 6. Cuenta cuántos posts tiene cada usuario. (Reutiliza `contarPor` de 04_genericos.ts
//    o hazlo con reduce.)


// 7. POST: crea un post con fetch (method, headers con Content-Type: application/json, body con JSON.stringify).
//    La API simula la creación y devuelve el post con id 101. Tipa lo que envías como `Omit<Post, "id">`.


// 8. Dos tipos de error distintos. Dentro de un try/catch, distingue:
//    a) fallo de red: pide `https://no-existe.invalid` (fetch rechaza),
//    b) respuesta con error HTTP: pide `${BASE}/posts/99999` (fetch NO rechaza, hay que mirar res.ok).
//    Imprime un mensaje distinto para cada caso.


// 9. Timeout: pasa `signal: AbortSignal.timeout(50)` a fetch. ¿Qué error obtienes?
//    Prueba con 50 ms y con 5000 ms.


// 10. Reto: en vez de fiarte con `as Post`, escribe un type guard `esPost(x: unknown): x is Post`
//     que compruebe de verdad la forma del objeto (typeof de cada campo).
//     Úsalo para validar la respuesta de /posts/1. Explica en un comentario por qué `as` es peligroso.
