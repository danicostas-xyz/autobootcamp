// FUNCIONES PURAS, COMPOSICIÓN Y CURRYING
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Función pura (pure function) y transparencia referencial (referential transparency)
//     Técnico: una función es PURA si
//       1. con los mismos argumentos devuelve siempre el mismo resultado (determinista), y
//       2. no tiene efectos secundarios (side effects): no modifica nada de fuera, no imprime, no lee del disco ni de la red.
//     Transparencia referencial: puedes sustituir la llamada por su resultado sin cambiar el programa.
//     Para tontos: una calculadora es pura (2 + 2 siempre da 4). Un reproductor que además apunta la escucha en
//     Last.fm, baja el volumen y cambia la playlist tiene efectos secundarios.
//     Los componentes de React deben ser puros: así React puede volver a pintarlos cuando quiera sin sorpresas.
//
// - Efecto secundario (side effect)
//     Técnico: cualquier cosa observable además del valor devuelto: mutar un argumento o una variable externa,
//     console.log, Math.random(), Date.now(), I/O, red.
//
// - Composición de funciones (function composition): pipe y compose
//     Técnico: construir funciones grandes encadenando funciones pequeñas, donde la salida de una es la entrada
//     de la siguiente.
//       pipe(f, g, h)(x)    ==  h(g(f(x)))     (de izquierda a derecha)
//       compose(f, g, h)(x) ==  f(g(h(x)))     (de derecha a izquierda, como en matemáticas)
//     Para tontos: una cadena de montaje: cada operario hace una cosa pequeña y pasa la pieza al siguiente.
//
// - Currying y aplicación parcial (partial application)
//     Técnico: currying convierte `(a, b) => a + b` en `a => b => a + b` (una función de un argumento que devuelve
//     otra). Se usa así: suma(1)(2). Aplicación parcial: fijar los primeros argumentos de una función y obtener
//     otra que espera el resto. Ambas se apoyan en closures y devuelven funciones (HOF).
//     Para tontos: una plantilla con algunos huecos ya rellenos.
//
// - HOF genérica con `keyof`
//     Técnico: `porCampo<T>(campo: keyof T)` recibe el NOMBRE de una propiedad y devuelve un comparador para `sort`
//     (una función con (a, b) => number). `keyof T` impide pasar un campo que no existe.
//
// - Memoización genérica
//     Técnico: `memoize<A extends unknown[], R>(fn: (...args: A) => R)` conserva los tipos de los parámetros (A) y del
//     resultado (R) de `fn`: el parámetro rest `...args: A` tipa una tupla de argumentos. Solo es segura con funciones puras.
//
// Comprobar los tipos: pnpm tsc      Ejecutar: pnpm tsx 06_hacia_react/03_composicion_y_funciones_puras.ts

type Disco = { titulo: string; artista: string; anio: number; favorito: boolean };

const discos: Disco[] = [
    { titulo: "Dogrel", artista: "Fontaines D.C.", anio: 2019, favorito: true },
    { titulo: "Skinty Fia", artista: "Fontaines D.C.", anio: 2022, favorito: true },
    { titulo: "White Pony", artista: "Deftones", anio: 2000, favorito: true },
    { titulo: "Preacher's Daughter", artista: "Ethel Cain", anio: 2022, favorito: false },
    { titulo: "When I Have Fears", artista: "The Murder Capital", anio: 2019, favorito: false },
    { titulo: "Dirt", artista: "Alice in Chains", anio: 1992, favorito: true },
    { titulo: "Low", artista: "David Bowie", anio: 1977, favorito: false },
];

// 1. [Pura o impura] Anótalo en un comentario junto a cada función y explica el motivo
//    (nombra el efecto secundario concreto si lo hay):
//      let escuchas = 0;
//      function a(n: number) { escuchas += n; return escuchas; }
//      function b(scrobbles: number) { return scrobbles * 2; }
//      function c(lista: string[]) { lista.push("Deftones"); return lista; }
//      function d() { return Math.random(); }
//      function e(f: Date) { return f.getFullYear(); }
//      function g(artista: string) { console.log(artista); return artista.length; }


// 2. [Convertir impura en pura] Reescribe como PURAS las que se puedan (a y c, por ejemplo). Explica por qué otras
//    no se pueden convertir sin cambiar lo que hacen.


// 3. [HOF de composición: pipe] `pipe(...fns: ((x: number) => number)[])` devuelve una función que aplica las funciones de
//    izquierda a derecha. Pruébala con los scrobbles de Fontaines D.C.: pipe(sumarUno, doble, alCuadrado)(5626),
//    o con una cadena que los convierta a miles y los redondee.


// 4. [compose] Igual que pipe pero de derecha a izquierda. Comprueba que
//    compose(f, g)(x) da lo mismo que pipe(g, f)(x).


// 5. [Currying]
//    a) `suma = (a: number) => (b: number) => a + b`,
//    b) un `curry3` que convierta una función `(a, b, c) => number` en `a => b => c => number`
//       (tipa los parámetros y el retorno).


// 6. [Aplicación parcial] `parcial(fn, ...argsFijos)` devuelve una función que ya lleva esos primeros
//    argumentos puestos. Úsala con `esDeAnioMinimo(minimo: number, d: Disco): boolean`
//    para crear `esPosteriorA2010 = parcial(esDeAnioMinimo, 2010)` y úsala como predicado de `filter`.


// 7. [Pipeline de datos con HOFs] Sobre `discos` (sin modificarlo), encadenando funciones pequeñas:
//    solo los favoritos (filter) -> ordenar por año ascendente (toSorted) -> quedarte con los 3 más antiguos (slice) ->
//    formatear cada uno (map) como "1992 - Dirt (Alice in Chains)".


// 8. [HOF que devuelve comparador + keyof] `porCampo<T>(campo: keyof T)` devuelve un comparador
//    para `sort`. Úsala como `discos.toSorted(porCampo("anio"))` y con "titulo".
//    Intenta pasar un campo que no existe y lee el error.
//    (Reto: ¿cómo harías el orden descendente?)


// 9. [Reto: memoización genérica] `memoize<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R`.
//    Usa JSON.stringify(args) como clave de un Map. Pruébala con una función lenta.
//    ¿Por qué solo debes memoizar funciones puras?


// 10. [Con tus palabras] Explica en un comentario por qué React exige que renderizar un componente sea una función pura
//     y qué tipo de errores aparecerían si no lo fuera (pista: si React puede renderizar dos veces o en cualquier
//     orden, ¿qué ocurre con un efecto secundario dentro del render?).
