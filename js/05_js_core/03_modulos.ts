// MÓDULOS (import / export)
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Módulo ES (ESM, ECMAScript module)
//     Técnico: archivo con su propio scope que comparte símbolos con `export` y los consume con `import`.
//     Las variables NO son globales: solo existen fuera de él si se exportan.
//     Para tontos: cada archivo es una habitación cerrada con llave; lo único que sale es lo que pones en la ventanilla.
//
// - Exportación con nombre (named export) frente a exportación por defecto (default export)
//     export const LIMITE = 50;                      // named: puede haber muchas
//     export default function reproducir() {}        // default: solo UNA por archivo
//     import { LIMITE } from "./config.js";          // named: con llaves y el nombre exacto
//     import reproducir from "./player.js";          // default: sin llaves, el nombre lo eliges tú
//     import * as config from "./config.js";         // objeto "namespace" con todo el módulo
//     import { LIMITE as MAX } from "./config.js";   // alias
//
// - `import type`
//     Técnico: importación solo de TIPOS. Desaparece al compilar (type erasure), así que no genera código
//     en tiempo de ejecución ni dependencias circulares. Con `verbatimModuleSyntax` es obligatoria para tipos.
//       import type { Disco } from "./tipos.js";
//
// - Resolución de módulos (module resolution) y la extensión `.js`
//     Técnico: este proyecto es ESM ("type": "module") con "module": "nodenext". Node exige la extensión
//     EXACTA en los imports relativos, y como el archivo final sería .js, se escribe `.js` incluso si el
//     archivo real es `.ts` (TS entiende que `./config.js` es `./config.ts`).
//
// - Módulo barril (barrel)
//     Técnico: un `index.ts` que reexporta (`export * from ...`) varios módulos para importarlos desde un
//     único punto.
//
// - Caché de módulos (module cache) y estado compartido (singleton)
//     Técnico: un módulo se evalúa UNA sola vez, la primera que se importa; todos los demás
//     importadores reciben el MISMO objeto. Las importaciones son enlaces vivos (live bindings) a lo exportado.
//
// - Importación dinámica (dynamic import) y top-level await
//     Técnico: `await import("./x.js")` carga un módulo bajo demanda y devuelve una Promise del módulo
//     (útil para carga perezosa, lazy loading).
//
// - ESM frente a CommonJS (CJS)
//     CJS (`require`, `module.exports`): sistema antiguo de Node, síncrono. ESM (`import`/`export`): estándar del
//     lenguaje, estático (se analiza antes de ejecutar) y asíncrono, lo que permite tree-shaking.
//
// Este archivo solo contiene los enunciados: tú creas los archivos auxiliares dentro de `05_js_core/modulos/`.
// Ejecutar:  pnpm tsx 05_js_core/03_modulos.ts      Comprobar tipos:  pnpm tsc

// 1. [Named exports] Crea `modulos/formato.ts` con dos exportaciones con nombre:
//    `formatearScrobbles(n: number): string` (5626 -> "5,626", como lo muestra Last.fm)
//    y `ordinal(posicion: number): string` (1 -> "#1").
//    Impórtalas aquí y úsalas.


// 2. [Default export] Crea `modulos/presentar.ts` con un `export default function presentar(nombre: string, scrobbles: number)`
//    ("Fontaines D.C. - 5,626 scrobbles"; reutiliza `formatearScrobbles`).
//    Impórtala SIN llaves, con otro nombre distinto, y comprueba que funciona.
//    Anota en un comentario la diferencia entre exportar con nombre y por defecto.


// 3. [Alias y namespace import] Importa `formatearScrobbles` renombrándola a `fmt`, e importa todo el módulo
//    con `import * as formato`.


// 4. [import type] En `modulos/tipos.ts` exporta `export type Pelicula = { titulo: string; anio: number; director: string }`.
//    Impórtalo con `import type { Pelicula }` y crea un array con tres películas de David Lynch.
//    ¿Para qué sirve el `type` en el import? (Pista: ¿qué queda de un tipo después de compilar?)


// 5. [Barrel] Crea un módulo barril: `modulos/index.ts` que reexporte todo lo anterior con
//    `export * from "./formato.js"`. Impórtalo todo desde `./modulos/index.js`.


// 6. [Caché de módulos / singleton] En `modulos/historial.ts` exporta una función `registrarEscucha(artista: string)`
//    que guarde las escuchas en un array del módulo, y otra `escuchas()` que lo devuelva.
//    Impórtalas desde DOS archivos distintos y comprueba que comparten el mismo historial.
//    ¿Por qué? (Pista: un módulo se evalúa una sola vez y se cachea.)


// 7. [Importación dinámica] `const m = await import("./modulos/formato.js")`.
//    ¿Qué tipo tiene `m`? ¿Cuándo tiene sentido cargar un módulo así? (Pista: código que solo se necesita a veces.)


// 8. [I/O con módulos de Node] Lee un archivo del disco: crea `modulos/artistas.json` con 5 artistas de tu Last.fm
//    (nombre y scrobbles) y léelo con `readFile` de `node:fs/promises`,
//    usando `import.meta.dirname` para construir la ruta al lado de este archivo (en ESM no existe `__dirname`).
//    Parséalo con JSON.parse. Recuerda: JSON.parse devuelve `any`, así que te toca validar la forma (como
//    en 04_asincronia/03_fetch_y_apis.ts, ejercicio 10).


// 9. [Con tus palabras] Explica en un comentario, en 3 líneas, la diferencia entre ESM (`import`) y CommonJS (`require`),
//    y por qué el package.json de este proyecto tiene `"type": "module"`.
