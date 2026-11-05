// GENÉRICOS
//
// Un genérico <T> es un HUECO para un tipo, que se rellena cuando usas la función.
// Analogía: una caja de discos con una etiqueta intercambiable: "Caja de ___".
// Caja<Disco> guarda discos, Caja<string> guarda textos; la caja es la misma.
// Ya los usas: Array<number>, Promise<string>, Record<string, number>.
//
// Ejemplo:
//   function primero<T>(lista: T[]): T | undefined { return lista[0] }
//   primero([1, 2, 3])   // T es number  -> devuelve number | undefined
//   primero(["a", "b"])  // T es string  -> devuelve string | undefined
// TS deduce T solo, a partir de lo que le pasas.
//
// Restricción: <T extends { id: number }> = "T puede ser cualquier cosa, siempre que tenga un id numérico".
//
// Utility types (tipos que transforman otros tipos):
//   Partial<T>       todos los campos pasan a ser opcionales
//   Required<T>      todos pasan a ser obligatorios
//   Readonly<T>      todos pasan a ser de solo lectura
//   Pick<T, "a"|"b"> te quedas solo con esos campos
//   Omit<T, "a">     quitas ese campo
//   Record<K, V>     objeto con claves K y valores V
//   ReturnType<typeof fn>   el tipo de lo que devuelve la función fn
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

// 1. `ultimo<T>(lista: T[]): T | undefined`. Pruébala con los nombres de `artistas` (strings)
//    y con sus scrobbles (numbers).
//    Pasa el ratón por encima del resultado: ¿qué T ha deducido TS en cada caso?


// 2. `invertir<T>(lista: T[]): T[]` que devuelva una lista nueva invertida SIN modificar la original.
//    Úsala para ver tu ranking de abajo arriba.


// 3. `contarPor<T>(lista: T[], clave: (x: T) => string): Record<string, number>`.
//    Pruébala con `artistas` (clave: género; debe salir post-punk: 2) y con los números
//    [1977, 1986, 1990, 1997, 2001, 2006] (clave: la década, "1970s", "1980s"...), que son los años
//    de varias películas de David Lynch.


// 4. `agruparPor<T>(lista: T[], clave: (x: T) => string): Record<string, T[]>`.
//    Pruébala con `artistas` agrupados por género y con una lista de películas de Lynch
//    (copia aquí el type Pelicula de 02_type_vs_interface.ts) agrupadas por década.


// 5. Restricción: `buscarPorId<T extends { id: number }>(lista: T[], id: number): T | undefined`.
//    Pruébala con `artistas` y con un array de discos (otro type con id: titulo, artista, anio).
//    Intenta llamarla con una lista de objetos SIN id y lee el error.


// 6. Interface genérica: `interface Caja<T> { contenido: T }`.
//    Crea una Caja<number> (los scrobbles de Fontaines D.C.) y una Caja<string[]>
//    (sus discos: Dogrel, A Hero's Death, Skinty Fia, Romance).
//    Escribe `mapearCaja<T, U>(c: Caja<T>, fn: (x: T) => U): Caja<U>`.


// 7. Una cola de reproducción (el primero en entrar es el primero en sonar) con funciones puras (sin mutar):
//    type Cola<T> = { items: T[] }
//    `encolar<T>(c: Cola<T>, x: T): Cola<T>`, `proxima<T>(c: Cola<T>): T | undefined`,
//    `avanzar<T>(c: Cola<T>): Cola<T>` (quita la primera).
//    Úsala con canciones: "Starburster", "Change (In the House of Flies)", "Falling".
//    Comprueba que la cola original no cambia.


// 8. Utility types con la interface Artista de arriba:
//    a) `actualizarArtista(a: Artista, cambios: Partial<Artista>): Artista`  (con spread).
//       Por ejemplo, sube los scrobbles de Deftones.
//    b) `type ArtistaPublico = Pick<Artista, "id" | "nombre">` y una función que convierta Artista en ArtistaPublico.
//    c) `type NuevoArtista = Omit<Artista, "id">` (un artista que aún no tiene id) y
//       `crearArtista(datos: NuevoArtista, id: number): Artista`.
//    d) `type ArtistaCongelado = Readonly<Artista>`: intenta modificar un campo y lee el error.


// 9. `Record<"voz" | "guitarra" | "bajo" | "bateria", string[]>`: quién toca qué en Fontaines D.C.
//    (Grian Chatten, Carlos O'Connell, Conor Curley, Conor Deegan III, Tom Coll).
//    Crea un objeto válido. Después quita un instrumento y lee el error.
//    Añade un instrumento inventado ("teclado") y lee el error.


// 10. Escribe una función `construirDiscoDemo()` que devuelva un objeto literal
//     (por ejemplo `{ titulo: "Skinty Fia", artista: "Fontaines D.C.", anio: 2022 }`) sin anotar el retorno.
//     Obtén su tipo SIN escribirlo a mano: `type DiscoDemo = ReturnType<typeof construirDiscoDemo>`.
//     Pasa el ratón por encima de DiscoDemo y comprueba qué ha deducido TS.
