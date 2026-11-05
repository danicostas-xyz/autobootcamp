// GENÉRICOS, RESTRICCIONES Y TIPOS DE UTILIDAD
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Genérico / parámetro de tipo (generic, type parameter)
//     Técnico: <T> es una variable a nivel de TIPOS: se instancia con un tipo concreto en cada uso, de modo que
//     una misma función o tipo sirve para muchos tipos sin perder información (a diferencia de `any`).
//     Para tontos: una caja de discos con una etiqueta intercambiable: "Caja de ___". Caja<Disco> guarda
//     discos y Caja<string> guarda textos; la caja es la misma, solo cambia la etiqueta.
//     Ya los usas: Array<number>, Promise<string>, Record<string, number>.
//
// - Inferencia de tipos (type inference)
//     Técnico: normalmente no escribes <T> a mano: TS lo deduce de los argumentos.
//       function primero<T>(lista: T[]): T | undefined { return lista[0] }
//       primero([1, 2, 3])    // T = number
//       primero(["a", "b"])   // T = string
//
// - Restricción de genérico (generic constraint)
//     Técnico: <T extends { id: number }> limita T a tipos que tengan, como mínimo, esa forma.
//     Para tontos: "la caja admite cualquier objeto, siempre que tenga una etiqueta `id`".
//
// - Tipos de utilidad (utility types) y tipos mapeados (mapped types)
//     Técnico: tipos genéricos del lenguaje que transforman otros tipos (la mayoría son tipos mapeados que
//     recorren las claves del tipo original):
//       Partial<T>        todas las propiedades pasan a ser opcionales
//       Required<T>       todas pasan a ser obligatorias
//       Readonly<T>       todas pasan a ser de solo lectura
//       Pick<T, "a"|"b">  te quedas solo con esas propiedades
//       Omit<T, "a">      quitas esa propiedad
//       Record<K, V>      objeto con claves K y valores V
//       ReturnType<typeof fn>   el tipo que devuelve la función fn (tipo condicional con `infer`)
//     Para tontos: filtros que se ponen sobre una plantilla ("hazlo todo opcional", "quítale esto"...).
//
// - Cola (FIFO) frente a pila (LIFO)
//     Técnico: FIFO = first in, first out (sale primero lo que entró primero). LIFO = el último en entrar
//     es el primero en salir.
//
// Comprobar los tipos: pnpm tsc

interface Artista {
    id: number;
    nombre: string;
    genero: string;
    scrobbles: number;
    web?: string;
}

const artistas: Artista[] = [
    { id: 1, nombre: "Fontaines D.C.", genero: "post-punk", scrobbles: 5626 },
    { id: 2, nombre: "Deftones", genero: "alt-metal", scrobbles: 3696 },
    { id: 3, nombre: "Ethel Cain", genero: "art pop", scrobbles: 2978 },
    { id: 4, nombre: "The Murder Capital", genero: "post-punk", scrobbles: 2413 },
    { id: 5, nombre: "Alice in Chains", genero: "grunge", scrobbles: 2241 },
];

// 1. [Función genérica + inferencia] `ultimo<T>(lista: T[]): T | undefined`.
//    Pruébala con los nombres de `artistas` (strings) y con sus scrobbles (numbers).
//    Pasa el ratón por encima del resultado: ¿qué T ha inferido TS en cada caso?


// 2. [Genérico + operación inmutable] `invertir<T>(lista: T[]): T[]` que devuelva una lista nueva invertida
//    SIN modificar la original. Úsala para ver tu ranking de abajo arriba.


// 3. [HOF genérica con callback] `contarPor<T>(lista: T[], clave: (x: T) => string): Record<string, number>`.
//    `clave` es un callback "selector de clave". Pruébala con `artistas` (clave: género; debe salir
//    post-punk: 2) y con los números [1977, 1986, 1990, 1997, 2001, 2006] (clave: la década, "1970s", "1980s"...),
//    que son los años de varias películas de David Lynch.


// 4. [HOF genérica: agrupar] `agruparPor<T>(lista: T[], clave: (x: T) => string): Record<string, T[]>`.
//    Pruébala con `artistas` agrupados por género y con una lista de películas de Lynch
//    (copia aquí el type Pelicula de 02_type_vs_interface.ts) agrupadas por década.


// 5. [Restricción de genérico] `buscarPorId<T extends { id: number }>(lista: T[], id: number): T | undefined`.
//    Pruébala con `artistas` y con un array de discos (otro type con id: titulo, artista, anio).
//    Intenta llamarla con una lista de objetos SIN id y lee el error.


// 6. [Interface genérica + HOF] `interface Caja<T> { contenido: T }`.
//    Crea una Caja<number> (los scrobbles de Fontaines D.C.) y una Caja<string[]>
//    (sus discos: Dogrel, A Hero's Death, Skinty Fia, Romance).
//    Escribe `mapearCaja<T, U>(c: Caja<T>, fn: (x: T) => U): Caja<U>` (dos parámetros de tipo:
//    T de entrada, U de salida; es el `map` de un "functor" muy simple).


// 7. [Estructura de datos genérica e inmutable: cola FIFO] Una cola de reproducción con funciones puras (sin mutar):
//    type Cola<T> = { items: T[] }
//    `encolar<T>(c: Cola<T>, x: T): Cola<T>`, `proxima<T>(c: Cola<T>): T | undefined`,
//    `avanzar<T>(c: Cola<T>): Cola<T>` (quita la primera).
//    Úsala con canciones: "Starburster", "Change (In the House of Flies)", "Falling".
//    Comprueba que la cola original no cambia.


// 8. [Utility types / tipos mapeados] Con la interface Artista de arriba:
//    a) `actualizarArtista(a: Artista, cambios: Partial<Artista>): Artista`  (con spread).
//       Por ejemplo, sube los scrobbles de Deftones.
//    b) `type ArtistaPublico = Pick<Artista, "id" | "nombre">` y una función que convierta Artista en ArtistaPublico.
//    c) `type NuevoArtista = Omit<Artista, "id">` (un artista que aún no tiene id) y
//       `crearArtista(datos: NuevoArtista, id: number): Artista`.
//    d) `type ArtistaCongelado = Readonly<Artista>`: intenta modificar un campo y lee el error.


// 9. [Record con claves literales] `Record<"voz" | "guitarra" | "bajo" | "bateria", string[]>`:
//    quién toca qué en Fontaines D.C. (Grian Chatten, Carlos O'Connell, Conor Curley, Conor Deegan III, Tom Coll).
//    Crea un objeto válido. Después quita un instrumento y lee el error.
//    Añade un instrumento inventado ("teclado") y lee el error (comprobación de propiedades sobrantes,
//    excess property check).


// 10. [`ReturnType` + `typeof`] Escribe una función `construirDiscoDemo()` que devuelva un objeto literal
//     (por ejemplo `{ titulo: "Skinty Fia", artista: "Fontaines D.C.", anio: 2022 }`) sin anotar el retorno.
//     Obtén su tipo SIN escribirlo a mano: `type DiscoDemo = ReturnType<typeof construirDiscoDemo>`.
//     Pasa el ratón por encima de DiscoDemo y comprueba qué ha inferido TS.
