// ASYNC / AWAIT
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - async/await (azúcar sintáctico sobre promesas, syntactic sugar)
//     Técnico: una función `async` SIEMPRE devuelve una Promise. `await expr` SUSPENDE esa función hasta que la
//     promesa se resuelva y devuelve su valor (o lanza el error si se rechaza). No bloquea el hilo: mientras
//     tanto el event loop sigue atendiendo otras tareas.
//     Para tontos: en vez de dejar tu número en la tienda de discos y seguir con tu vida, te quedas en el
//     mostrador hasta que te traen el vinilo... pero la tienda sigue atendiendo a los demás.
//
//       async function f(): Promise<number> {
//         const valor = await otraPromesa;     // `await` solo vale dentro de una función async
//         return valor + 1;                    // (o en el nivel superior de un módulo ESM: top-level await)
//       }
//
// - Manejo de errores con try/catch
//     Técnico: un `await` sobre una promesa rechazada lanza una excepción que se captura con try/catch,
//     como en código síncrono. En el catch, `error` es de tipo `unknown`: hay que estrecharlo (narrowing).
//
// - Ejecución secuencial frente a concurrente
//     Técnico: varios `await` seguidos esperan uno tras otro (el tiempo total es la SUMA). `await Promise.all([...])`
//     lanza todas las operaciones a la vez (el tiempo total es el del MÁS LENTO).
//
// - Callbacks `async` en HOFs como forEach
//     Técnico: forEach ignora el valor de retorno de su callback, así que NO espera a las promesas que
//     devuelve un callback async. Para esperar, usa un bucle for...of con await, o Promise.all con map.
//
// - Limitación de concurrencia (concurrency limiting) y procesamiento por lotes (batching)
//     Técnico: lanzar miles de peticiones a la vez puede saturar al servidor; se procesan en lotes de tamaño fijo.
//
// - Tipos genéricos en promesas
//     Técnico: Promise<T> es el tipo de una promesa que, al cumplirse, da un T. Una HOF genérica como
//     conTimeout<T> conserva el T de la promesa que recibe.
//
// Ejecutar:  pnpm tsx 04_asincronia/02_async_await.ts      Comprobar tipos:  pnpm tsc

type Artista = { id: number; nombre: string; scrobbles: number };

// Código de apoyo (no hay que tocarlo): simula una consulta a Last.fm que tarda 300 ms.
const esperar = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

const ranking: Artista[] = [
    { id: 1, nombre: "Fontaines D.C.", scrobbles: 5626 },
    { id: 2, nombre: "Deftones", scrobbles: 3696 },
    { id: 3, nombre: "Ethel Cain", scrobbles: 2978 },
    { id: 4, nombre: "The Murder Capital", scrobbles: 2413 },
    { id: 5, nombre: "Alice in Chains", scrobbles: 2241 },
    { id: 6, nombre: "Oklou", scrobbles: 2063 },
    { id: 7, nombre: "Salem", scrobbles: 1871 },
    { id: 8, nombre: "Snow Strippers", scrobbles: 1837 },
    { id: 9, nombre: "My Chemical Romance", scrobbles: 1810 },
    { id: 10, nombre: "Loathe", scrobbles: 1724 },
];

function obtenerArtista(id: number): Promise<Artista> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const artista = ranking.find((a) => a.id === id);
            if (artista) resolve(artista);
            else reject(new Error(`No hay ningún artista con id ${id}`));
        }, 300);
    });
}

// 1. [Función async + await] Escribe `mostrarArtista(id: number): Promise<void>` con async/await:
//    obtiene el artista e imprime "Fontaines D.C.: 5626 scrobbles".


// 2. [try/catch + narrowing de `unknown`] Llámala con un id inexistente (-1) y captura el error con try/catch,
//    mostrando un mensaje. Pista para el catch: `error instanceof Error ? error.message : String(error)`.


// 3. [Secuencial frente a concurrente] Obtén los artistas 1, 2 y 3
//    a) con tres `await` seguidos,  b) con `await Promise.all([...])`.
//    Mide cada versión con console.time / console.timeEnd.


// 4. [Bucle for...of con await frente a forEach async] Procesa los ids [1, 2, 3] EN ORDEN, imprimiendo cada artista.
//    Después prueba lo mismo con `[1, 2, 3].forEach(async (id) => { ... await ... })`.
//    ¿Espera el programa a que terminen? Explica en un comentario por qué (pista: ¿qué hace forEach
//    con el valor que devuelve su callback?).


// 5. [HOF genérica + Promise.race] `conTimeout<T>(promesa: Promise<T>, ms: number): Promise<T>`:
//    que falle con "timeout" si la promesa tarda más de `ms`.
//    Pruébala con obtenerArtista(1) y 100 ms / 1000 ms.


// 6. [Patrón retry genérico] `reintentar<T>(fn: () => Promise<T>, intentos: number): Promise<T>` con async/await
//    y un bucle. Pruébala con una función que falle las dos primeras veces ("Last.fm no responde").


// 7. [Procesamiento por lotes] Procesa los 10 artistas del ranking en lotes de 3 a la vez
//    (cada lote con Promise.all; un lote no empieza hasta que acabe el anterior).


// 8. [Inferencia del tipo de retorno de una async] Escribe `async function totalScrobbles(ids: number[]) { ... }`
//    que sume los scrobbles de varios artistas, SIN anotar el tipo de retorno.
//    Pasa el ratón por encima: ¿qué tipo infiere TS? Anótalo después de forma explícita.


// 9. [Top-level await] Llama a `await obtenerArtista(1)` directamente en el nivel superior
//    (fuera de cualquier función). ¿Por qué funciona aquí? (Pista: "type": "module" en el package.json.)


// 10. [allSettled + uniones discriminadas] `Promise.all([1, -1, 3].map(obtenerArtista))` dentro de un try/catch:
//     ¿qué captura? Haz una versión con `Promise.allSettled` que separe éxitos y fallos en dos arrays.
//     Pista: cada resultado tiene `status: "fulfilled" | "rejected"` (¡es una unión discriminada!).
