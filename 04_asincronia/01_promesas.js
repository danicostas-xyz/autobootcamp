// PROMESAS Y BUCLE DE EVENTOS (JavaScript puro)
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Programación asíncrona (asynchronous programming)
//     Técnico: operaciones que tardan (red, disco, temporizadores) no bloquean el hilo: se lanzan y su
//     resultado se gestiona más tarde mediante callbacks o promesas.
//
// - Promesa (Promise) y sus estados
//     Técnico: objeto que representa el resultado FUTURO de una operación asíncrona. Estados: pending
//     (pendiente), fulfilled (cumplida, con un valor) o rejected (rechazada, con un error). Fulfilled y
//     rejected se llaman "settled" (resuelta) y ya no cambian.
//     Para tontos: un ticket de pedido en una tienda de vinilos por encargo. Más tarde llega el disco
//     (resolve) o te dicen "agotado" (reject).
//
// - Consumir una promesa: .then, .catch, .finally
//     promesa.then(valor => ...)    se ejecuta al cumplirse
//     promesa.catch(error => ...)   se ejecuta al rechazarse
//     promesa.finally(() => ...)    se ejecuta siempre
//     Cada uno devuelve OTRA promesa: eso permite el encadenamiento (promise chaining). Un error no
//     capturado se propaga por la cadena hasta el primer .catch.
//
// - Combinadores de promesas (promise combinators)
//     Promise.all([p1, p2])         espera a todas; falla en cuanto una falla (fail-fast)
//     Promise.allSettled([p1, p2])  espera a todas y devuelve el estado de cada una (nunca rechaza)
//     Promise.race([p1, p2])        la primera en terminar (bien o mal) decide el resultado
//     Promise.any([p1, p2])         la primera que se CUMPLA gana
//
// - Bucle de eventos (event loop), pila de llamadas (call stack), cola de macrotareas y de microtareas
//     Técnico: JS ejecuta en un solo hilo. El event loop saca tareas de las colas cuando la pila está vacía.
//     Los callbacks de las promesas (.then) van a la cola de MICROTAREAS, que se vacía por completo antes de
//     pasar a la siguiente MACROTAREA (setTimeout, I/O...).
//     Para tontos: un camarero con una sola mano: atiende un pedido, y entre pedido y pedido revisa primero
//     la lista de "urgentes" (microtareas) y solo después la de "normales" (macrotareas).
//
// - Concurrencia frente a paralelismo
//     Técnico: Promise.all lanza las operaciones a la vez (concurrencia de E/S); no ejecuta tu código JS en
//     paralelo, solo solapa las esperas.
//
// Ejecutar:  pnpm tsx 04_asincronia/01_promesas.js

// Código de apoyo (no hay que tocarlo): simula una consulta a Last.fm que tarda 300 ms.
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ranking = [
    { id: 1, nombre: "Fontaines D.C.", scrobbles: 5626 },
    { id: 2, nombre: "Deftones", scrobbles: 3696 },
    { id: 3, nombre: "Ethel Cain", scrobbles: 2978 },
    { id: 4, nombre: "The Murder Capital", scrobbles: 2413 },
    { id: 5, nombre: "Alice in Chains", scrobbles: 2241 },
];

function obtenerArtista(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const artista = ranking.find((a) => a.id === id);
            if (artista) resolve(artista);
            else reject(new Error(`No hay ningún artista con id ${id}`));
        }, 300);
    });
}

// 1. [Crear una promesa] Crea una promesa con `new Promise` que se resuelva con "Skinty Fia" tras 1 segundo.
//    Consúmela con .then e imprime el valor.


// 2. [.then y .catch] Usa `obtenerArtista(1)` con .then para imprimir su nombre y sus scrobbles.
//    Después prueba `obtenerArtista(0)` y captura el rechazo con .catch.


// 3. [Encadenamiento] Obtén el artista 1 y, cuando llegue, pide el artista con id + 1.
//    Imprime el segundo. ¿Qué devuelve cada .then? Anótalo en un comentario
//    (pista: lo que devuelves en un .then se "envuelve" en una promesa nueva).


// 4. [.finally] Añade un .finally que imprima "consulta terminada" y comprueba que se ejecuta
//    tanto si la promesa se cumple como si se rechaza.


// 5. [Secuencial frente a concurrente] Pide los artistas 1, 2 y 3:
//    a) uno detrás de otro (secuencial),  b) a la vez con Promise.all.
//    Mide el tiempo de cada versión con console.time / console.timeEnd. ¿Por qué cambia?


// 6. [Fail-fast frente a allSettled] `Promise.all` con los ids [1, 99, 3]: ¿qué pasa?
//    Repítelo con `Promise.allSettled` e imprime qué ocurrió con cada una.


// 7. [Patrón timeout con Promise.race] Compite `obtenerArtista(1)` contra una promesa que rechace con
//    "timeout" tras 100 ms. ¿Quién gana? Cambia el tiempo a 500 ms y comprueba que cambia el resultado.


// 8. [Patrón retry, HOF] Escribe `reintentar(fn, intentos)`: `fn` es un callback que devuelve una promesa;
//    si se rechaza, vuelve a invocarla, hasta `intentos` veces. Pruébala con una función que simule
//    "Last.fm no responde" las dos primeras veces y devuelva datos la tercera.


// 9. [Event loop: microtareas frente a macrotareas] Predice (SIN ejecutar) el orden en que se imprimirá esto
//    y anótalo en un comentario:
//      console.log("Pongo el disco");
//      setTimeout(() => console.log("Suena la cara B"), 0);
//      Promise.resolve().then(() => console.log("Suena la cara A"));
//      console.log("Subo el volumen");
//    Ejecútalo y comprueba. Explica por qué usando los términos de la cabecera.
