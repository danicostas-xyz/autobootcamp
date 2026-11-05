// PROMESAS (JavaScript puro)
//
// Una promesa es un "ticket" que te dan por algo que tardará: pides un vinilo por encargo en una tienda,
// te dan un número de pedido y sigues a lo tuyo. Más tarde pasa UNA de dos cosas:
//   - resolve(valor): el disco llega           -> la promesa se "cumple" (fulfilled)
//   - reject(error):  "lo siento, está agotado" -> la promesa se "rechaza" (rejected)
// Mientras tanto está "pendiente" (pending).
//
// Cómo se consume:
//   promesa.then(valor => ...)      cuando se cumple
//   promesa.catch(error => ...)     cuando se rechaza
//   promesa.finally(() => ...)      pase lo que pase
// Cada .then devuelve OTRA promesa, por eso se pueden encadenar.
//
// Combinadores:
//   Promise.all([p1, p2])         espera a todas; si UNA falla, falla todo
//   Promise.allSettled([p1, p2])  espera a todas y te dice qué pasó con cada una
//   Promise.race([p1, p2])        la primera que termine (bien o mal) gana
//   Promise.any([p1, p2])         la primera que se CUMPLA gana
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

// 1. Crea una promesa con `new Promise` que se resuelva con "Skinty Fia" tras 1 segundo.
//    Consúmela con .then e imprime el valor.


// 2. Usa `obtenerArtista(1)` con .then para imprimir su nombre y sus scrobbles.
//    Después prueba `obtenerArtista(0)` y captura el fallo con .catch.


// 3. Encadenamiento: obtén el artista 1 y, cuando llegue, pide el artista con id + 1.
//    Imprime el segundo. ¿Qué devuelve cada .then? Anótalo en un comentario.


// 4. Añade un .finally que imprima "consulta terminada" y comprueba que se ejecuta tanto con éxito como con fallo.


// 5. Pide los artistas 1, 2 y 3:
//    a) uno detrás de otro (secuencial),  b) a la vez con Promise.all.
//    Mide el tiempo de cada versión con console.time / console.timeEnd. ¿Por qué cambia?


// 6. `Promise.all` con los ids [1, 99, 3]: ¿qué pasa? Repítelo con `Promise.allSettled`
//    e imprime qué ocurrió con cada una.


// 7. Promise.race: compite `obtenerArtista(1)` contra una promesa que rechace con "timeout" tras 100 ms.
//    ¿Quién gana? Cambia el tiempo a 500 ms y comprueba que cambia el resultado.


// 8. Escribe `reintentar(fn, intentos)`: `fn` devuelve una promesa; si se rechaza, vuelve a llamarla,
//    hasta `intentos` veces. Pruébala con una función que simule "Last.fm no responde"
//    las dos primeras veces y devuelva datos la tercera.


// 9. Orden de ejecución. Predice (SIN ejecutar) el orden en que se imprimirá esto y anótalo en un comentario:
//      console.log("Pongo el disco");
//      setTimeout(() => console.log("Suena la cara B"), 0);
//      Promise.resolve().then(() => console.log("Suena la cara A"));
//      console.log("Subo el volumen");
//    Ejecútalo y comprueba. Explica por qué (pista: microtareas frente a macrotareas).
