// PROMESAS (JavaScript puro)
//
// Una promesa es un "ticket" que te dan por algo que tardará: pides comida en un restaurante,
// te dan un número de pedido y sigues a lo tuyo. Más tarde pasa UNA de dos cosas:
//   - resolve(valor): la comida llega        -> la promesa se "cumple" (fulfilled)
//   - reject(error):  "lo siento, no hay"    -> la promesa se "rechaza" (rejected)
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

// Código de apoyo (no hay que tocarlo):
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function obtenerUsuario(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id <= 0) reject(new Error("id inválido"));
            else resolve({ id, nombre: `Usuario ${id}` });
        }, 300);
    });
}

// 1. Crea una promesa con `new Promise` que se resuelva con "hecho" tras 1 segundo.
//    Consúmela con .then e imprime el valor.


// 2. Usa `obtenerUsuario(1)` con .then para imprimir el nombre.
//    Después prueba `obtenerUsuario(0)` y captura el fallo con .catch.


// 3. Encadenamiento: obtén el usuario 1 y, cuando llegue, pide el usuario con id + 1.
//    Imprime el segundo. ¿Qué devuelve cada .then? Anótalo en un comentario.


// 4. Añade un .finally que imprima "terminado" y comprueba que se ejecuta tanto con éxito como con fallo.


// 5. Pide los usuarios 1, 2 y 3:
//    a) uno detrás de otro (secuencial),  b) a la vez con Promise.all.
//    Mide el tiempo de cada versión con console.time / console.timeEnd. ¿Por qué cambia?


// 6. `Promise.all` con los ids [1, 0, 3]: ¿qué pasa? Repítelo con `Promise.allSettled`
//    e imprime qué ocurrió con cada una.


// 7. Promise.race: compite `obtenerUsuario(1)` contra una promesa que rechace con "timeout" tras 100 ms.
//    ¿Quién gana? Cambia el tiempo a 500 ms y comprueba que cambia el resultado.


// 8. Escribe `reintentar(fn, intentos)`: `fn` devuelve una promesa; si se rechaza, vuelve a llamarla,
//    hasta `intentos` veces. Pruébala con una función que falle las dos primeras veces y acierte la tercera.


// 9. Orden de ejecución. Predice (SIN ejecutar) el orden en que se imprimirá esto y anótalo en un comentario:
//      console.log("A");
//      setTimeout(() => console.log("B"), 0);
//      Promise.resolve().then(() => console.log("C"));
//      console.log("D");
//    Ejecútalo y comprueba. Explica por qué (pista: microtareas frente a macrotareas).
