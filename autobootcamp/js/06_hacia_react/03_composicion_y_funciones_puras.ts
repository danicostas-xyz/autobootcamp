// FUNCIONES PURAS Y COMPOSICIÓN
//
// Una función es PURA si:
//   1. con los mismos argumentos devuelve siempre el mismo resultado, y
//   2. no tiene efectos secundarios (no modifica nada de fuera, no imprime, no lee del disco ni de la red).
// Analogía: una calculadora es pura (2 + 2 siempre da 4). Un reproductor que además apunta la escucha en Last.fm,
// baja el volumen y cambia la playlist tiene efectos secundarios.
// Los componentes de React deben ser puros: así React puede volver a pintarlos cuando quiera sin sorpresas.
//
// Composición: construir funciones grandes encadenando funciones pequeñas.
//   pipe(f, g, h)(x)  ==  h(g(f(x)))      (de izquierda a derecha)
//
// Currying: convertir `(a, b) => a + b` en `a => b => a + b`. Se usa así: suma(1)(2).
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

// 1. ¿Pura o impura? Anótalo en un comentario junto a cada función y explica el motivo:
//      let escuchas = 0;
//      function a(n: number) { escuchas += n; return escuchas; }
//      function b(scrobbles: number) { return scrobbles * 2; }
//      function c(lista: string[]) { lista.push("Deftones"); return lista; }
//      function d() { return Math.random(); }
//      function e(f: Date) { return f.getFullYear(); }
//      function g(artista: string) { console.log(artista); return artista.length; }


// 2. Reescribe como PURAS las que se puedan (a y c, por ejemplo). Explica por qué otras no se pueden
//    convertir sin cambiar lo que hacen.


// 3. `pipe(...fns: ((x: number) => number)[])` devuelve una función que aplica las funciones de izquierda
//    a derecha. Pruébala con los scrobbles de Fontaines D.C.: pipe(sumarUno, doble, alCuadrado)(5626),
//    o con una cadena que los convierta a miles y los redondee.


// 4. `compose`: igual que pipe pero de derecha a izquierda. Comprueba que
//    compose(f, g)(x) da lo mismo que pipe(g, f)(x).


// 5. Currying:
//    a) `suma = (a: number) => (b: number) => a + b`,
//    b) un `curry3` que convierta una función `(a, b, c) => number` en `a => b => c => number`
//       (tipa los parámetros y el retorno).


// 6. Aplicación parcial: `parcial(fn, ...argsFijos)` devuelve una función que ya lleva esos primeros
//    argumentos puestos. Úsala con `esDeAnioMinimo(minimo: number, d: Disco): boolean`
//    para crear `esPosteriorA2010 = parcial(esDeAnioMinimo, 2010)`.


// 7. Pipeline de datos sobre `discos` (sin modificarlo), encadenando funciones pequeñas:
//    solo los favoritos -> ordenar por año ascendente -> quedarte con los 3 más antiguos ->
//    formatear cada uno como "1992 - Dirt (Alice in Chains)".


// 8. Función de orden superior con `keyof`: `porCampo<T>(campo: keyof T)` devuelve un comparador
//    para `sort`. Úsala como `discos.toSorted(porCampo("anio"))` y con "titulo".
//    Intenta pasar un campo que no existe y lee el error.
//    (Reto: ¿cómo harías el orden descendente?)


// 9. Reto: `memoize` con tipos genéricos: `memoize<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R`.
//    Usa JSON.stringify(args) como clave de un Map. Pruébala con una función lenta.


// 10. Explica en un comentario por qué React exige que renderizar un componente sea una función pura
//     y qué tipo de errores aparecerían si no lo fuera.
