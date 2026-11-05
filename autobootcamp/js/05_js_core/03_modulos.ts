// MÓDULOS (import / export)
//
// Un módulo es un archivo que comparte cosas con otros archivos. Sin módulos, todo viviría en un único archivo.
//   export const LIMITE = 50;                      // exportación con nombre ("named")
//   export default function reproducir() {}        // exportación por defecto (solo UNA por archivo)
//   import { LIMITE } from "./config.js";          // named: con llaves y el nombre exacto
//   import reproducir from "./player.js";          // default: sin llaves, el nombre lo eliges tú
//   import * as config from "./config.js";         // todo el módulo bajo un nombre
//   import { LIMITE as MAX } from "./config.js";   // renombrando
//   import type { Disco } from "./tipos.js";       // solo importa el TIPO (desaparece al ejecutar)
//
// OJO con la extensión: este proyecto es ESM ("type": "module") con "module": "nodenext".
// Los imports de archivos locales llevan extensión `.js`, ¡incluso aunque el archivo real sea `.ts`!
// (TS entiende que `./config.js` es `./config.ts`.) Es raro al principio, pero así funcionan tsx y tsc.
//
// Este archivo solo contiene los enunciados: tú creas los archivos auxiliares dentro de `05_js_core/modulos/`.
// Ejecutar:  pnpm tsx 05_js_core/03_modulos.ts      Comprobar tipos:  pnpm tsc

// 1. Crea `modulos/formato.ts` con dos exportaciones con nombre:
//    `formatearScrobbles(n: number): string` (5626 -> "5,626", como lo muestra Last.fm)
//    y `ordinal(posicion: number): string` (1 -> "#1").
//    Impórtalas aquí y úsalas.


// 2. Crea `modulos/presentar.ts` con un `export default function presentar(nombre: string, scrobbles: number)`
//    ("Fontaines D.C. - 5,626 scrobbles"; reutiliza `formatearScrobbles`).
//    Impórtala SIN llaves, con otro nombre distinto, y comprueba que funciona.
//    Anota en un comentario la diferencia entre exportar con nombre y por defecto.


// 3. Importa `formatearScrobbles` renombrándola a `fmt`, e importa todo el módulo con `import * as formato`.


// 4. En `modulos/tipos.ts` exporta `export type Pelicula = { titulo: string; anio: number; director: string }`.
//    Impórtalo con `import type { Pelicula }` y crea un array con tres películas de David Lynch.
//    ¿Para qué sirve el `type` en el import?


// 5. Crea un "barril" (barrel): `modulos/index.ts` que reexporte todo lo anterior con `export * from "./formato.js"`.
//    Impórtalo todo desde `./modulos/index.js`.


// 6. Estado compartido: en `modulos/historial.ts` exporta una función `registrarEscucha(artista: string)`
//    que guarde las escuchas en un array del módulo, y otra `escuchas()` que lo devuelva.
//    Impórtalas desde DOS archivos distintos y comprueba que comparten el mismo historial.
//    ¿Por qué? (Pista: un módulo se evalúa una sola vez.)


// 7. Import dinámico: `const m = await import("./modulos/formato.js")`.
//    ¿Cuándo tiene sentido cargar un módulo así? (Pista: código que solo se necesita a veces.)


// 8. Lee un archivo del disco: crea `modulos/artistas.json` con 5 artistas de tu Last.fm
//    (nombre y scrobbles) y léelo con `readFile` de `node:fs/promises`,
//    usando `import.meta.dirname` para construir la ruta al lado de este archivo. Parséalo con JSON.parse.


// 9. Explica en un comentario, en 3 líneas, la diferencia entre ESM (`import`) y CommonJS (`require`),
//    y por qué el package.json de este proyecto tiene `"type": "module"`.
