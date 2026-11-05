# Ejercicios de JS y TS

Cada archivo tiene una cabecera **VOCABULARIO**: cada término técnico (HOF, closure, type guard...) va junto a
su explicación "para tontos". Debajo están los ejercicios como comentarios, cada uno etiquetado con el concepto
técnico que practica, por ejemplo `[HOF + callback]`.
Escribe tu código justo debajo de cada enunciado. No hay soluciones: cuando acabes un archivo,
pídeme que lo corrija y te dejaré los comentarios dentro del propio código.

## Orden recomendado

| Carpeta | Archivo | Tema (vocabulario técnico) | Tipo |
|---|---|---|---|
| `01_basicos` | `01_arrays_basicos` | `push`, `pop`, `forEach`, `filter`, `map`, `reduce` | .ts |
| | `02_arrays_tipados_y_funciones` | `number[]`, funciones tipadas, `every`, `some`, `find`, `number \| undefined` | .ts |
| | `03_arrays_de_objetos` | `type`, arrays de objetos, `find`, `toSorted`, `some`/`every` | .ts |
| | `04_flat_agrupar_e_inmutabilidad` | `flat`, `flatMap`, `Record`, agrupar con `reduce`, copias con spread | .ts |
| `02_funciones_y_tipos` | `01_callbacks_tipados` | Funciones de primera clase, callbacks, HOF, predicados, tipos de función, aridad, function factory | .ts |
| | `02_type_vs_interface` | Tipado estructural, `interface` frente a `type`, `extends`, `readonly`, declaration merging, index signature | .ts |
| | `03_uniones_y_narrowing` | Uniones, literales, narrowing, type guards, uniones discriminadas, `never`, patrón Result | .ts |
| | `04_genericos` | Genéricos, restricciones (`extends`), utility types (`Partial`, `Pick`, `Omit`, `Record`), `ReturnType` | .ts |
| `03_objetos_y_datos` | `01_objetos` | Desestructuración, spread/rest, copia superficial y profunda, `?.`, `??`, claves computadas | .js |
| | `02_strings_map_set` | Strings inmutables, regex, normalización Unicode, `Set`, `Map` | .js |
| `04_asincronia` | `01_promesas` | Promesas y sus estados, encadenamiento, combinadores, event loop (micro/macrotareas), retry, timeout | .js |
| | `02_async_await` | `async`/`await`, `try/catch`, secuencial vs concurrente, `forEach` async, lotes, top-level await | .ts |
| | `03_fetch_y_apis` | `fetch`, códigos HTTP, `Response.ok`, `as` vs type guard, `URLSearchParams`, POST, `AbortSignal`, secretos | .ts |
| `05_js_core` | `01_scope_y_closures` | Scope léxico, hoisting/TDZ, closures, function factory, `memoize`, `debounce`, patrón módulo | .js |
| | `02_clases_y_this` | Clases, `#privados`, `static`, herencia, polimorfismo, `this` dinámico vs léxico, `bind`, prototipos | .js |
| | `03_modulos` | ESM vs CJS, named/default, `import type`, barril, caché de módulos, import dinámico | .ts |
| `06_hacia_react` | `01_inmutabilidad_y_reducer` | Igualdad referencial, structural sharing, reducer puro, selectores, store (observer) | .ts |
| | `02_tipos_de_ui` | Props, callbacks como props, estados imposibles, `as const`, `keyof`, `Record`, genéricos con restricción | .ts |
| | `03_composicion_y_funciones_puras` | Funciones puras, efectos secundarios, `pipe`/`compose`, currying, aplicación parcial, `memoize` genérico | .ts |
| `07_mini_proyecto` | `01_biblioteca_musica_y_cine` | Arquitectura por capas (dominio puro / infraestructura / CLI), parse-don't-validate, tests con `assert` | .ts |

Los archivos `.js` son JavaScript puro, sin tipos. Algunos terminan con un "reto TS" para pasarlos a TypeScript.

Los ejemplos y datos de prueba usan tu música (artistas de tu Last.fm, sus discos y canciones) y el cine de David Lynch.
Los datos de ejemplo (géneros, duraciones aproximadas...) sirven para practicar, no son una fuente de referencia.

## Cómo ejecutar y comprobar

Siempre desde la carpeta `js/` (donde está el `package.json`):

```bash
pnpm tsx 02_funciones_y_tipos/01_callbacks_tipados.ts   # ejecuta el archivo (.js o .ts)
pnpm tsc                                                  # comprueba los tipos de todo el proyecto

# o con npm:
npx tsx 02_funciones_y_tipos/01_callbacks_tipados.ts
npx tsc
```

`tsx` ejecuta el archivo borrando los tipos, sin comprobarlos. `tsc` solo comprueba los tipos y no ejecuta nada.
