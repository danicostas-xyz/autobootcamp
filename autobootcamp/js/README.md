# Ejercicios de JS y TS

Cada archivo tiene una cabecera con los conceptos explicados y debajo los ejercicios como comentarios.
Escribe tu código justo debajo de cada enunciado. No hay soluciones: cuando acabes un archivo,
pídeme que lo corrija y te dejaré los comentarios dentro del propio código.

## Orden recomendado

| Carpeta | Archivo | Tema | Tipo |
|---|---|---|---|
| `01_basicos` | `01_arrays_basicos` | `push`, `pop`, `forEach`, `filter`, `map`, `reduce` | .ts |
| | `02_arrays_tipados_y_funciones` | `number[]`, funciones tipadas, `every`, `some`, `find`, `number \| undefined` | .ts |
| | `03_arrays_de_objetos` | `type`, arrays de objetos, `find`, `toSorted`, `some`/`every` | .ts |
| | `04_flat_agrupar_e_inmutabilidad` | `flat`, `flatMap`, `Record`, agrupar con `reduce`, copias con spread | .ts |
| `02_funciones_y_tipos` | `01_callbacks_tipados` | Funciones como valores, callbacks, tipos de función | .ts |
| | `02_type_vs_interface` | `interface`, `type`, `extends`, `readonly`, opcionales | .ts |
| | `03_uniones_y_narrowing` | Uniones, literales, type guards, uniones discriminadas | .ts |
| | `04_genericos` | `<T>`, restricciones, utility types | .ts |
| `03_objetos_y_datos` | `01_objetos` | Desestructurar, spread, `?.`, `??`, copia profunda | .js |
| | `02_strings_map_set` | Strings, regex, `Set`, `Map` | .js |
| `04_asincronia` | `01_promesas` | Promesas, `then`, `Promise.all`, orden de ejecución | .js |
| | `02_async_await` | `async`/`await`, errores, paralelo vs secuencial | .ts |
| | `03_fetch_y_apis` | `fetch`, tipado de respuestas, manejo de errores | .ts |
| `05_js_core` | `01_scope_y_closures` | Scope, closures, `memoize`, `debounce` | .js |
| | `02_clases_y_this` | Clases, `this`, herencia, prototipos | .js |
| | `03_modulos` | `import`/`export`, ESM, barriles | .ts |
| `06_hacia_react` | `01_inmutabilidad_y_reducer` | Actualizaciones inmutables, reducer, mini store | .ts |
| | `02_tipos_de_ui` | Props, estado de carga, validación de formularios | .ts |
| | `03_composicion_y_funciones_puras` | Funciones puras, `pipe`, currying | .ts |
| `07_mini_proyecto` | `01_biblioteca_musica_y_cine` | Proyecto final: biblioteca de discos y películas (dominio, persistencia y CLI) | .ts |

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
