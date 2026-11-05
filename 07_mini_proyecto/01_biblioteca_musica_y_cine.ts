// MINI PROYECTO: BIBLIOTECA PERSONAL DE MÚSICA Y CINE EN TERMINAL
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Arquitectura por capas (layered architecture) y separación de responsabilidades (separation of concerns)
//     Técnico: el código se divide en tres capas: DOMINIO (reglas del negocio, funciones puras sin I/O),
//     INFRAESTRUCTURA (persistencia, I/O: leer/escribir el archivo) y PRESENTACIÓN (la CLI que lee argumentos e
//     imprime). El dominio no importa nada de las otras capas.
//     Para tontos: la cocina (dominio) no sabe si el plato lo comerán en sala o para llevar; el camarero (CLI) y el
//     almacén (disco) son cosa aparte. En React harás exactamente esta separación.
//
// - Modelo de dominio (domain model) y unión discriminada
//     Técnico: `Elemento` es una unión discriminada por `tipo` ("disco" | "pelicula") con campos comunes en `Base`.
//     Comparten interfaz pero tienen campos propios.
//
// - Funciones puras e inmutables en el dominio
//     Técnico: cada función de dominio recibe la biblioteca y devuelve una NUEVA, sin mutar la original.
//
// - Validación en la frontera: "parse, don't validate" y guardas de tipo
//     Técnico: todo lo que llega del exterior (JSON del disco, argumentos de la CLI) es `unknown`; se convierte a un
//     tipo fiable con un type guard (`esElemento(x: unknown): x is Elemento`) en vez de con `as`.
//
// - Argumentos de proceso (process.argv) y código de salida (exit code)
//     Técnico: `process.argv` es el array de argumentos (los dos primeros son `node` y la ruta del script).
//     `process.exitCode = 1` indica error al sistema operativo (0 = éxito), útil para scripts y CI.
//
// - Pruebas con aserciones (assertions) y pureza comprobable
//     Técnico: `node:assert/strict` lanza un error si una comprobación falla. Las funciones puras son fáciles de
//     probar porque no necesitan preparar nada externo.
//
// IDEA: una biblioteca con discos que quieres escuchar o ya has escuchado (Skinty Fia, White Pony,
// Preacher's Daughter...) y películas de David Lynch que quieres ver o ya has visto
// (Eraserhead, Mulholland Drive, Twin Peaks: The Return...), guardada en un archivo JSON.
//
// REGLAS
//   - Nada de `any`. Si dudas del tipo de algo, usa `unknown` y compruébalo (narrowing).
//   - Las funciones de dominio son PURAS e inmutables (no tocan el array que reciben).
//   - Entrada/salida (disco, terminal) separada del dominio.
//   - Divídelo en archivos (módulos) dentro de `07_mini_proyecto/biblioteca/` (tipos.ts, dominio.ts, almacen.ts, cli.ts...).
//
// HITOS (hazlos en este orden y comprueba con `pnpm tsc` en cada uno)
//
// 1. TIPOS (tipos.ts): modelo de dominio con unión discriminada
//    type Estado = "pendiente" | "en curso" | "terminado"
//    type Base = { id: number; titulo: string; anio: number; estado: Estado; nota?: number; etiquetas: string[]; anadido: string /* ISO */ }
//    type Elemento =
//      | (Base & { tipo: "disco"; artista: string })
//      | (Base & { tipo: "pelicula"; director: string; duracionMin: number })
//
// 2. DOMINIO PURO (dominio.ts), todo inmutable (spread, map, filter, toSorted...):
//    anadir(biblioteca, datos): Elemento[]          (id = máximo + 1; `anadido` con new Date().toISOString())
//    cambiarEstado(biblioteca, id, estado): Elemento[]
//    puntuar(biblioteca, id, nota): Elemento[]      (la nota va de 0 a 10; error si no)
//    borrar(biblioteca, id): Elemento[]
//    filtrar(biblioteca, { tipo?, estado?, etiqueta?, artistaODirector? }): Elemento[]
//    ordenar(biblioteca, por: "anio" | "nota" | "titulo"): Elemento[]
//    estadisticas(biblioteca): { total; porTipo: Record<"disco" | "pelicula", number>; porEstado: Record<Estado, number>;
//                                notaMedia: number | null }
//    describir(e: Elemento): string                 (switch sobre `e.tipo`, con comprobación exhaustiva con never)
//    Nota: `anadir` usa la fecha actual, lo que la hace impura; piensa cómo recibir la fecha como parámetro
//    para que lo sea (y poder probarla).
//
// 3. PRUEBAS: con `node:assert` (import assert from "node:assert/strict") escribe al menos
//    una comprobación por cada función de dominio, incluyendo "no modifica el array original".
//
// 4. PERSISTENCIA / INFRAESTRUCTURA (almacen.ts), con async/await y `node:fs/promises`:
//    cargar(): Promise<Elemento[]>      (si el archivo no existe devuelve []; valida el JSON con un type guard
//                                        `esElemento(x: unknown): x is Elemento`, no con `as`)
//    guardar(biblioteca: Elemento[]): Promise<void>      (guarda en `biblioteca.json`)
//
// 5. PRESENTACIÓN: CLI (cli.ts): lee `process.argv.slice(2)` (el array empieza tras "node" y la ruta del script)
//    y admite estos comandos:
//      disco "Skinty Fia" --artista "Fontaines D.C." --anio 2022 --etiqueta post-punk
//      pelicula "Mulholland Drive" --director "David Lynch" --anio 2001 --duracion 147
//      listar [--tipo disco] [--estado pendiente] [--orden anio]
//      estado <id> <pendiente|en curso|terminado>
//      puntuar <id> <nota>
//      borrar <id>
//      stats
//    Parsea los argumentos a mano, sin librerías (todo llega como string: conviértelo y valídalo). Si el comando no
//    existe o falta un argumento, imprime un mensaje de uso y pon `process.exitCode = 1`.
//    Ejecutar:  pnpm tsx 07_mini_proyecto/biblioteca/cli.ts disco "Skinty Fia" --artista "Fontaines D.C." --anio 2022
//
// 6. EXTRAS (opcional)
//    - Importar tu top de artistas desde la API de Last.fm (mira el ejercicio 11 de 04_asincronia/03_fetch_y_apis.ts)
//      y añadirlos como "pendientes de explorar discos".
//    - Deshacer la última acción (acuérdate del reducer de 06_hacia_react/01_inmutabilidad_y_reducer.ts).
//    - Siguiente gran paso: exponer este dominio como API con Express y consumirla desde un
//      componente React (la carpeta `express-react-typescript-autobootcamp` va por ahí).
