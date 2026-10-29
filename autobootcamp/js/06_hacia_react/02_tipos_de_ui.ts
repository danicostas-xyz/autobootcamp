// TIPOS PARA INTERFACES DE USUARIO (lo que tiparás en React, sin instalar React todavía)
//
// En React los componentes reciben "props" (un objeto), y se tipan con una interface:
//   interface SaludoProps { nombre: string; entusiasta?: boolean }
//   function Saludo({ nombre, entusiasta = false }: SaludoProps) { ... }
// Aquí simulamos los componentes con funciones que devuelven texto (un "HTML" muy simple).
//
// Estado de carga: en vez de varios booleanos sueltos, usa una UNIÓN DISCRIMINADA.
// Con booleanos { cargando: boolean; error?: string; datos?: T } es posible un estado imposible
// (cargando Y con error a la vez). Con una unión, cada situación es exactamente UNA:
//   type Estado<T> =
//     | { status: "inactivo" }
//     | { status: "cargando" }
//     | { status: "ok"; datos: T }
//     | { status: "error"; mensaje: string }
//
// `as const` congela un literal y le da el tipo MÁS estrecho posible:
//   const LADOS = ["izquierda", "derecha"] as const;      // tipo: readonly ["izquierda", "derecha"]
//   type Lado = typeof LADOS[number];                      // "izquierda" | "derecha"
// `keyof T` = unión de las claves de T:  keyof { a: 1; b: 2 }  ->  "a" | "b"
//
// Comprobar los tipos: pnpm tsc      Ejecutar: pnpm tsx 06_hacia_react/02_tipos_de_ui.ts

const esperar = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

// 1. `interface BotonProps { texto: string; variante?: "primario" | "secundario"; deshabilitado?: boolean }`.
//    Escribe `renderBoton(props: BotonProps): string` que devuelva algo como
//    `<button class="primario">Texto</button>` (con `disabled` si procede).
//    La variante por defecto es "primario" (valor por defecto al desestructurar).


// 2. `interface TarjetaProps { titulo: string; hijos?: string[] }` y `renderTarjeta(props: TarjetaProps): string`
//    que pinte el título y, dentro, los hijos (el equivalente a `children`).


// 3. Manejadores de eventos: `type OnCambio = (nuevoValor: string) => void`.
//    `crearInput(onCambio: OnCambio)` devuelve un objeto con un método `escribir(texto: string)`
//    que llama al callback. Compruébalo con un callback que imprima.


// 4. Define `type Carga<T>` como la unión discriminada de arriba (inactivo / cargando / ok / error).


// 5. `describirCarga<T>(c: Carga<T>): string` con un switch exhaustivo (truco del `never`).


// 6. Simula una carga: `cargarDatos(render: (c: Carga<string[]>) => void): Promise<void>` que vaya
//    pasando por inactivo -> cargando -> ok (o error) llamando a `render` en cada cambio.
//    Usa `esperar` para simular la espera y haz que falle de forma aleatoria (Math.random).


// 7. Estados imposibles. Escribe el tipo con booleanos `{ cargando: boolean; datos?: string[]; error?: string }`
//    y crea un objeto IMPOSIBLE (cargando true y con error) que compile.
//    Intenta crear el mismo estado imposible con `Carga<string[]>` y comprueba que NO compila.


// 8. `renderLista<T extends { id: string }>(items: T[], renderItem: (item: T) => string): string`.
//    (En React, cada elemento de una lista necesita una `key` única: aquí es el `id`.)
//    Pruébala con dos tipos de elemento distintos.


// 9. Tipos derivados de datos:
//    const COLORES = ["rojo", "verde", "azul"] as const
//    type Color = typeof COLORES[number]
//    Escribe `esColor(x: string): x is Color`. ¿Qué tipo tendría `Color` sin `as const`?


// 10. Formulario con validación:
//     type FormValores = { nombre: string; email: string; edad: number }
//     type Errores = Partial<Record<keyof FormValores, string>>
//     `validar(v: FormValores): Errores`: nombre no vacío, email con "@", edad >= 18.
//     Devuelve un objeto vacío si todo es válido. Pruébalo con datos válidos e inválidos.
