// FUNCIONES PURAS Y COMPOSICIÓN
//
// Una función es PURA si:
//   1. con los mismos argumentos devuelve siempre el mismo resultado, y
//   2. no tiene efectos secundarios (no modifica nada de fuera, no imprime, no lee del disco ni de la red).
// Analogía: una calculadora es pura (2 + 2 siempre da 4). Un cajero que además imprime un ticket,
// abre la caja y cambia el stock tiene efectos secundarios.
// Los componentes de React deben ser puros: así React puede volver a pintarlos cuando quiera sin sorpresas.
//
// Composición: construir funciones grandes encadenando funciones pequeñas.
//   pipe(f, g, h)(x)  ==  h(g(f(x)))      (de izquierda a derecha)
//
// Currying: convertir `(a, b) => a + b` en `a => b => a + b`. Se usa así: suma(1)(2).
//
// Comprobar los tipos: pnpm tsc      Ejecutar: pnpm tsx 06_hacia_react/03_composicion_y_funciones_puras.ts

type Producto = { nombre: string; precio: number; activo: boolean };

const productos: Producto[] = [
    { nombre: "Teclado", precio: 45, activo: true },
    { nombre: "Ratón", precio: 20, activo: true },
    { nombre: "Monitor", precio: 180, activo: false },
    { nombre: "Webcam", precio: 60, activo: true },
    { nombre: "Auriculares", precio: 35, activo: true },
];

// 1. ¿Pura o impura? Anótalo en un comentario junto a cada función y explica el motivo:
//      let total = 0;
//      function a(n: number) { total += n; return total; }
//      function b(n: number) { return n * 2; }
//      function c(lista: number[]) { lista.push(1); return lista; }
//      function d() { return Math.random(); }
//      function e(f: Date) { return f.getFullYear(); }
//      function g(s: string) { console.log(s); return s.length; }


// 2. Reescribe como PURAS las que se puedan (a y c, por ejemplo). Explica por qué otras no se pueden
//    convertir sin cambiar lo que hacen.


// 3. `pipe(...fns: ((x: number) => number)[])` devuelve una función que aplica las funciones de izquierda
//    a derecha. Pruébala: pipe(sumarUno, doble, alCuadrado)(3).


// 4. `compose`: igual que pipe pero de derecha a izquierda. Comprueba que
//    compose(f, g)(x) da lo mismo que pipe(g, f)(x).


// 5. Currying:
//    a) `suma = (a: number) => (b: number) => a + b`,
//    b) un `curry3` que convierta una función `(a, b, c) => number` en `a => b => c => number`
//       (tipa los parámetros y el retorno).


// 6. Aplicación parcial: `parcial(fn, ...argsFijos)` devuelve una función que ya lleva esos primeros
//    argumentos puestos. Úsala para crear `descuento10 = parcial(aplicarDescuento, 10)`.


// 7. Pipeline de datos sobre `productos` (sin modificarlo), encadenando funciones pequeñas:
//    solo los activos -> aplicar un 10 % de descuento -> ordenar por precio ascendente ->
//    quedarte con los 3 más baratos -> formatear cada uno como "Nombre: 00.00 €".


// 8. Función de orden superior con `keyof`: `porCampo<T>(campo: keyof T)` devuelve un comparador
//    para `sort`. Úsala como `productos.toSorted(porCampo("precio"))` y con "nombre".
//    Intenta pasar un campo que no existe y lee el error.
//    (Reto: ¿cómo harías el orden descendente?)


// 9. Reto: `memoize` con tipos genéricos: `memoize<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R`.
//    Usa JSON.stringify(args) como clave de un Map. Pruébala con una función lenta.


// 10. Explica en un comentario por qué React exige que renderizar un componente sea una función pura
//     y qué tipo de errores aparecerían si no lo fuera.
