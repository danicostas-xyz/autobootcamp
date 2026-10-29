// ASYNC / AWAIT
//
// async/await es una forma más cómoda de escribir promesas: en vez de encadenar .then,
// escribes el código como si fuera normal y dices "ESPERA AQUÍ hasta que llegue el resultado".
// Analogía: en vez de dejar tu número y seguir con tu vida, te quedas en el mostrador hasta que te lo dan.
//
//   async function f(): Promise<number> {      // una función async SIEMPRE devuelve una promesa
//     const valor = await otraPromesa;          // `await` solo vale dentro de una función async
//     return valor + 1;                         // (o en el nivel superior de un módulo, como el nuestro)
//   }
//
// Errores: se capturan con try/catch, igual que en código síncrono.
// En un catch, `error` es `unknown`: hay que comprobar qué es antes de usarlo.
//
// Ejecutar:  pnpm tsx 04_asincronia/02_async_await.ts      Comprobar tipos:  pnpm tsc

type Usuario = { id: number; nombre: string };

// Código de apoyo (no hay que tocarlo):
const esperar = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

function obtenerUsuario(id: number): Promise<Usuario> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id <= 0) reject(new Error("id inválido"));
            else resolve({ id, nombre: `Usuario ${id}` });
        }, 300);
    });
}

// 1. Escribe `mostrarUsuario(id: number): Promise<void>` con async/await: obtiene el usuario e imprime su nombre.


// 2. Llámala con un id inválido (-1) y captura el error con try/catch, mostrando un mensaje.
//    Pista para el catch: `error instanceof Error ? error.message : String(error)`.


// 3. Secuencial frente a paralelo: obtén los usuarios 1, 2 y 3
//    a) con tres `await` seguidos,  b) con `await Promise.all([...])`.
//    Mide cada versión con console.time / console.timeEnd.


// 4. `for...of` con await dentro: procesa los ids [1, 2, 3] EN ORDEN, imprimiendo cada usuario.
//    Después prueba lo mismo con `[1, 2, 3].forEach(async (id) => { ... await ... })`.
//    ¿Espera el programa a que terminen? Explica en un comentario por qué.


// 5. `conTimeout<T>(promesa: Promise<T>, ms: number): Promise<T>`: usa Promise.race para que falle con
//    "timeout" si la promesa tarda más de `ms`. Pruébala con obtenerUsuario(1) y 100 ms / 1000 ms.


// 6. `reintentar<T>(fn: () => Promise<T>, intentos: number): Promise<T>` con async/await y un bucle.
//    Pruébala con una función que falle las dos primeras veces.


// 7. Limitar la concurrencia: procesa los ids del 1 al 10 en lotes de 3 a la vez
//    (cada lote con Promise.all; un lote no empieza hasta que acabe el anterior).


// 8. Escribe `async function sumarAsync(a: number, b: number) { return a + b }` SIN anotar el tipo de retorno.
//    Pasa el ratón por encima: ¿qué tipo deduce TS? Anótalo después de forma explícita.


// 9. Top-level await: llama a `await obtenerUsuario(1)` directamente en el nivel superior (fuera de cualquier función).
//    ¿Por qué funciona aquí? (Pista: "type": "module" en el package.json.)


// 10. `Promise.all([1, -1, 3].map(obtenerUsuario))` dentro de un try/catch: ¿qué captura?
//     Haz una versión con `Promise.allSettled` que separe éxitos y fallos en dos arrays.
//     Pista: cada resultado tiene `status: "fulfilled" | "rejected"` (¡es una unión discriminada!).
