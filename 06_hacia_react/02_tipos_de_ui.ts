// TIPOS PARA INTERFACES DE USUARIO (lo que tiparás en React, sin instalar React todavía)
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Props (propiedades de un componente) y tipado con interface
//     Técnico: un componente recibe un único objeto de entrada, las props. Se tipan con una interface:
//       interface SaludoProps { nombre: string; entusiasta?: boolean }
//       function Saludo({ nombre, entusiasta = false }: SaludoProps) { ... }
//     Aquí simulamos los componentes con funciones que devuelven texto (un "HTML" muy simple).
//     Para tontos: las props son el formulario que rellenas para pedirle a un componente que se pinte.
//
// - Composición y `children`
//     Técnico: un componente puede recibir contenido anidado (children) en vez de configurarlo todo con props.
//     Aquí lo simulamos con una lista opcional de pistas.
//
// - Callbacks como props (event handlers)
//     Técnico: el padre pasa una función al hijo (`onCambio`) y el hijo la invoca cuando ocurre algo. Es una HOF
//     en su uso más típico de React: los datos bajan por props y los eventos suben por callbacks.
//
// - "Hacer irrepresentables los estados imposibles" (make illegal states unrepresentable)
//     Técnico: en vez de varios booleanos sueltos { cargando: boolean; error?: string; datos?: T }, que permiten
//     combinaciones imposibles (cargando Y con error a la vez), usa una UNIÓN DISCRIMINADA: cada situación es
//     exactamente UNA.
//       type Carga<T> =
//         | { status: "inactivo" }
//         | { status: "cargando" }
//         | { status: "ok"; datos: T }
//         | { status: "error"; mensaje: string }
//     Para tontos: un semáforo solo puede estar en un color a la vez; con tres booleanos podrías tener rojo y verde
//     a la vez.
//
// - Aserción constante (`as const`), tipos indexados (indexed access) y `typeof`
//     const LADOS = ["A", "B"] as const;                    // tipo: readonly ["A", "B"] (literales, solo lectura)
//     type Lado = typeof LADOS[number];                      // "A" | "B" (T[number] = tipo de cualquier elemento)
//
// - `keyof T`, `Record<K, V>` y `Partial<T>`
//     keyof { a: 1; b: 2 }  ->  "a" | "b" (unión de las claves de T)
//     Record<"a" | "b", string> = { a: string; b: string }       Partial<T> = todas las props opcionales
//
// - Genérico con restricción (constraint)
//     Técnico: `<T extends { id: string }>` acepta cualquier T que, como mínimo, tenga `id`. Así una misma función
//     pinta listas de cosas distintas. En React cada elemento de una lista necesita una `key` única, aquí es el `id`.
//
// - Guarda de tipo (type predicate) `x is T`
//     Técnico: función que devuelve boolean y le dice al compilador que, si es true, `x` es de tipo T.
//
// Comprobar los tipos: pnpm tsc      Ejecutar: pnpm tsx 06_hacia_react/02_tipos_de_ui.ts

const esperar = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

// 1. [Props con opcionales y valores por defecto] `interface BotonProps { texto: string; variante?: "primario" | "secundario"; deshabilitado?: boolean }`.
//    Escribe `renderBoton(props: BotonProps): string` que devuelva algo como
//    `<button class="primario">Reproducir</button>` (con `disabled` si procede).
//    La variante por defecto es "primario" (valor por defecto al desestructurar).


// 2. [Props + children opcionales] `interface TarjetaDiscoProps { titulo: string; artista: string; anio: number; pistas?: string[] }`
//    y `renderTarjeta(props: TarjetaDiscoProps): string` que pinte título, artista y año y, si hay pistas,
//    una lista con ellas (el equivalente a `children`).
//    Pruébala con "Skinty Fia" (Fontaines D.C., 2022) y con "Mulholland Drive" sin pistas
//    (¡no es un disco! ¿qué cambiarías en el tipo para que sirva para ambos?).


// 3. [Callback como prop / event handler] `type OnCambio = (nuevoValor: string) => void`.
//    `crearBuscador(onCambio: OnCambio)` devuelve un objeto con un método `escribir(texto: string)`
//    que llama al callback. Compruébalo escribiendo "fontaines" y mostrando cada cambio.
//    ¿Qué tipo de función es `crearBuscador` según el vocabulario de 01_callbacks_tipados.ts?


// 4. [Unión discriminada genérica] Define `type Carga<T>` como la unión discriminada de arriba
//    (inactivo / cargando / ok / error).


// 5. [Exhaustividad con never] `describirCarga<T>(c: Carga<T>): string` con un switch exhaustivo (truco del `never`).


// 6. [Máquina de estados + async] Simula una carga: `cargarTopArtistas(render: (c: Carga<string[]>) => void): Promise<void>`
//    que vaya pasando por inactivo -> cargando -> ok (con tus 5 artistas más escuchados) o error ("Last.fm no responde")
//    llamando a `render` en cada cambio. Usa `esperar` para simular la espera
//    y haz que falle de forma aleatoria (Math.random).


// 7. [Estados imposibles] Escribe el tipo con booleanos `{ cargando: boolean; datos?: string[]; error?: string }`
//    y crea un objeto IMPOSIBLE (cargando true y con error) que compile.
//    Intenta crear el mismo estado imposible con `Carga<string[]>` y comprueba que NO compila.


// 8. [Genérico con restricción] `renderLista<T extends { id: string }>(items: T[], renderItem: (item: T) => string): string`.
//    (Recibe un callback: ¡es otra HOF!)
//    Pruébala con dos tipos de elemento distintos: artistas ({ id, nombre }) y películas de Lynch
//    ({ id, titulo, anio }). Intenta pasarle elementos sin `id` y lee el error.


// 9. [as const, typeof, type predicate] Tipos derivados de datos:
//    const GENEROS = ["post-punk", "grunge", "alt-metal", "ambient"] as const
//    type Genero = typeof GENEROS[number]
//    Escribe `esGenero(x: string): x is Genero`. ¿Qué tipo tendría `Genero` sin `as const`?


// 10. [Record, keyof, Partial] Formulario con validación (una valoración de disco):
//     type FormValoracion = { disco: string; nota: number; comentario: string }
//     type Errores = Partial<Record<keyof FormValoracion, string>>
//     `validar(v: FormValoracion): Errores`: disco no vacío, nota entre 0 y 10, comentario de máximo 200 caracteres.
//     Devuelve un objeto vacío si todo es válido. Pruébalo con { disco: "Skinty Fia", nota: 9, ... } y con datos inválidos.
//     ¿Por qué `Errores` usa Partial? (Pista: ¿tiene que haber un error para cada campo?)
