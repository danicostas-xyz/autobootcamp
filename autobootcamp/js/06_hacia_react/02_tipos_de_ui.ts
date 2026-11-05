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
//   const LADOS = ["A", "B"] as const;                    // tipo: readonly ["A", "B"]
//   type Lado = typeof LADOS[number];                      // "A" | "B"
// `keyof T` = unión de las claves de T:  keyof { a: 1; b: 2 }  ->  "a" | "b"
//
// Comprobar los tipos: pnpm tsc      Ejecutar: pnpm tsx 06_hacia_react/02_tipos_de_ui.ts

const esperar = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

// 1. `interface BotonProps { texto: string; variante?: "primario" | "secundario"; deshabilitado?: boolean }`.
//    Escribe `renderBoton(props: BotonProps): string` que devuelva algo como
//    `<button class="primario">Reproducir</button>` (con `disabled` si procede).
//    La variante por defecto es "primario" (valor por defecto al desestructurar).


// 2. `interface TarjetaDiscoProps { titulo: string; artista: string; anio: number; pistas?: string[] }`
//    y `renderTarjeta(props: TarjetaDiscoProps): string` que pinte título, artista y año y, si hay pistas,
//    una lista con ellas (el equivalente a `children`).
//    Pruébala con "Skinty Fia" (Fontaines D.C., 2022) y con "Mulholland Drive" sin pistas
//    (¡no es un disco! ¿qué cambiarías en el tipo para que sirva para ambos?).


// 3. Manejadores de eventos: `type OnCambio = (nuevoValor: string) => void`.
//    `crearBuscador(onCambio: OnCambio)` devuelve un objeto con un método `escribir(texto: string)`
//    que llama al callback. Compruébalo escribiendo "fontaines" y mostrando cada cambio.


// 4. Define `type Carga<T>` como la unión discriminada de arriba (inactivo / cargando / ok / error).


// 5. `describirCarga<T>(c: Carga<T>): string` con un switch exhaustivo (truco del `never`).


// 6. Simula una carga: `cargarTopArtistas(render: (c: Carga<string[]>) => void): Promise<void>` que vaya
//    pasando por inactivo -> cargando -> ok (con tus 5 artistas más escuchados) o error ("Last.fm no responde")
//    llamando a `render` en cada cambio. Usa `esperar` para simular la espera
//    y haz que falle de forma aleatoria (Math.random).


// 7. Estados imposibles. Escribe el tipo con booleanos `{ cargando: boolean; datos?: string[]; error?: string }`
//    y crea un objeto IMPOSIBLE (cargando true y con error) que compile.
//    Intenta crear el mismo estado imposible con `Carga<string[]>` y comprueba que NO compila.


// 8. `renderLista<T extends { id: string }>(items: T[], renderItem: (item: T) => string): string`.
//    (En React, cada elemento de una lista necesita una `key` única: aquí es el `id`.)
//    Pruébala con dos tipos de elemento distintos: artistas ({ id, nombre }) y películas de Lynch
//    ({ id, titulo, anio }).


// 9. Tipos derivados de datos:
//    const GENEROS = ["post-punk", "grunge", "alt-metal", "ambient"] as const
//    type Genero = typeof GENEROS[number]
//    Escribe `esGenero(x: string): x is Genero`. ¿Qué tipo tendría `Genero` sin `as const`?


// 10. Formulario con validación (una valoración de disco):
//     type FormValoracion = { disco: string; nota: number; comentario: string }
//     type Errores = Partial<Record<keyof FormValoracion, string>>
//     `validar(v: FormValoracion): Errores`: disco no vacío, nota entre 0 y 10, comentario de máximo 200 caracteres.
//     Devuelve un objeto vacío si todo es válido. Pruébalo con { disco: "Skinty Fia", nota: 9, ... } y con datos inválidos.
