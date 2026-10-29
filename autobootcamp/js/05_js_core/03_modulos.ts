// MÓDULOS (import / export)
//
// Un módulo es un archivo que comparte cosas con otros archivos. Sin módulos, todo viviría en un único archivo.
//   export const PI2 = 6.28;                       // exportación con nombre ("named")
//   export default function saludar() {}           // exportación por defecto (solo UNA por archivo)
//   import { PI2 } from "./mates.js";              // named: con llaves y el nombre exacto
//   import saludar from "./saludo.js";             // default: sin llaves, el nombre lo eliges tú
//   import * as mates from "./mates.js";           // todo el módulo bajo un nombre
//   import { sumar as add } from "./mates.js";     // renombrando
//   import type { Punto } from "./mates.js";       // solo importa el TIPO (desaparece al ejecutar)
//
// OJO con la extensión: este proyecto es ESM ("type": "module") con "module": "nodenext".
// Los imports de archivos locales llevan extensión `.js`, ¡incluso aunque el archivo real sea `.ts`!
// (TS entiende que `./mates.js` es `./mates.ts`.) Es raro al principio, pero así funcionan tsx y tsc.
//
// Este archivo solo contiene los enunciados: tú creas los archivos auxiliares dentro de `05_js_core/modulos/`.
// Ejecutar:  pnpm tsx 05_js_core/03_modulos.ts      Comprobar tipos:  pnpm tsc

// 1. Crea `modulos/matematicas.ts` con `export const PI2`, `sumar` y `restar` (exportaciones con nombre).
//    Impórtalas aquí y úsalas.


// 2. Crea `modulos/saludo.ts` con un `export default function saludar(nombre: string)`.
//    Impórtala SIN llaves, con otro nombre distinto, y comprueba que funciona.
//    Anota en un comentario la diferencia entre exportar con nombre y por defecto.


// 3. Importa `sumar` renombrándola a `add`, e importa todo el módulo con `import * as mates`.


// 4. En `modulos/tipos.ts` exporta `export type Punto = { x: number; y: number }`.
//    Impórtalo con `import type { Punto }`. ¿Para qué sirve el `type`?


// 5. Crea un "barril" (barrel): `modulos/index.ts` que reexporte todo lo anterior con `export * from "./matematicas.js"`.
//    Impórtalo todo desde `./modulos/index.js`.


// 6. Estado compartido: en `modulos/contador.ts` exporta una función `incrementar()` que use una variable del módulo.
//    Impórtala desde DOS archivos distintos y comprueba que comparten el mismo contador.
//    ¿Por qué? (Pista: un módulo se evalúa una sola vez.)


// 7. Import dinámico: `const m = await import("./modulos/matematicas.js")`.
//    ¿Cuándo tiene sentido cargar un módulo así? (Pista: código que solo se necesita a veces.)


// 8. Lee un archivo del disco: crea `modulos/datos.json` y léelo con `readFile` de `node:fs/promises`,
//    usando `import.meta.dirname` para construir la ruta al lado de este archivo. Parséalo con JSON.parse.


// 9. Explica en un comentario, en 3 líneas, la diferencia entre ESM (`import`) y CommonJS (`require`),
//    y por qué el package.json de este proyecto tiene `"type": "module"`.
