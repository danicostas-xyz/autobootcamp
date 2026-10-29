// MINI PROYECTO: GESTOR DE TAREAS EN TERMINAL
//
// Junta todo lo aprendido: tipos, genéricos, funciones puras, inmutabilidad, async/await y módulos.
// Es la mejor práctica antes de saltar a React: la lógica del "dominio" (tareas) está separada de
// cómo se muestra, y en React harás exactamente esa separación.
//
// REGLAS
//   - Nada de `any`. Si dudas del tipo de algo, usa `unknown` y compruébalo.
//   - Las funciones de dominio son PURAS e inmutables (no tocan el array que reciben).
//   - Entrada/salida (disco, terminal) separada del dominio.
//   - Divídelo en archivos dentro de `07_mini_proyecto/gestor/` (tipos.ts, dominio.ts, almacen.ts, cli.ts...).
//
// HITOS (hazlos en este orden y comprueba con `pnpm tsc` en cada uno)
//
// 1. TIPOS (tipos.ts)
//    type Prioridad = "baja" | "media" | "alta"
//    type Tarea = { id: number; texto: string; hecha: boolean; creada: string /* ISO */;
//                   etiquetas: string[]; prioridad: Prioridad }
//
// 2. DOMINIO PURO (dominio.ts), todo inmutable:
//    anadir(tareas, datos): Tarea[]            (id = máximo + 1; `creada` con new Date().toISOString())
//    alternar(tareas, id): Tarea[]
//    borrar(tareas, id): Tarea[]
//    editar(tareas, id, cambios: Partial<Omit<Tarea, "id">>): Tarea[]
//    filtrar(tareas, { hecha?, etiqueta?, prioridad? }): Tarea[]
//    ordenar(tareas, por: "prioridad" | "creada" | "texto"): Tarea[]
//    estadisticas(tareas): { total; hechas; pendientes; porPrioridad: Record<Prioridad, number> }
//
// 3. PRUEBAS: con `node:assert` (import assert from "node:assert/strict") escribe al menos
//    una comprobación por cada función de dominio, incluyendo "no modifica el array original".
//
// 4. PERSISTENCIA (almacen.ts), con async/await y `node:fs/promises`:
//    cargar(): Promise<Tarea[]>      (si el archivo no existe devuelve []; valida el JSON con un type guard
//                                     `esTarea(x: unknown): x is Tarea`, no con `as`)
//    guardar(tareas: Tarea[]): Promise<void>      (guarda en `tareas.json`)
//
// 5. CLI (cli.ts): lee `process.argv.slice(2)` (el array empieza tras "node" y la ruta del script)
//    y admite estos comandos:
//      anadir "Comprar pan" --prioridad alta --etiqueta casa
//      listar [--pendientes] [--etiqueta casa] [--orden prioridad]
//      hecha <id>
//      borrar <id>
//      stats
//    Parsea los argumentos a mano, sin librerías. Si el comando no existe o falta un argumento,
//    imprime un mensaje de uso y pon `process.exitCode = 1`.
//    Ejecutar:  pnpm tsx 07_mini_proyecto/gestor/cli.ts anadir "Comprar pan" --prioridad alta
//
// 6. EXTRAS (opcional)
//    - Fecha límite en las tareas y un comando `vencidas`.
//    - Deshacer la última acción (acuérdate del reducer del bloque 06).
//    - Siguiente gran paso: exponer este dominio como API con Express y consumirla desde un
//      componente React (la carpeta `express-react-typescript-autobootcamp` va por ahí).
