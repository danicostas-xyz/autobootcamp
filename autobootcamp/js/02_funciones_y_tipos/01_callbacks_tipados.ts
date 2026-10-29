// CALLBACKS TIPADOS
//
// Un callback es una función que le pasas a otra función para que la ejecute "cuando le toque".
// Analogía: dejas tu teléfono en una tienda diciendo "llámame cuando llegue mi pedido".
// Tu número es el callback; la tienda decide cuándo llamar. Tú no llamas, te llaman.
// Ya los usas: en [1, 2, 3].map(n => n * 2), la función `n => n * 2` es el callback
// que map ejecuta una vez por cada elemento.
//
// Cómo se escribe el tipo de una función:  (parámetros) => tipoQueDevuelve
//   type Operacion = (a: number, b: number) => number
//   const sumar: Operacion = (a, b) => a + b      // TS deduce solo que a y b son number
//
// Una función que RECIBE un callback:
//   function repetir(veces: number, accion: (i: number) => void) { ... }
//   `void` significa "no devuelve nada útil".
//
// Comprobar los tipos:  pnpm tsc      Ejecutar:  pnpm tsx 02_funciones_y_tipos/01_callbacks_tipados.ts


// 1. Define un type `Operacion` = (a: number, b: number) => number.
//    Crea tres funciones de ese tipo: sumar, restar y multiplicar.


// 2. Escribe `aplicar(a, b, op: Operacion): number`, que ejecute `op` con a y b.
//    Pruébala con las tres anteriores y con una función anónima nueva (por ejemplo, potencia).


// 3. Escribe `repetir(veces: number, accion: (i: number) => void): void`, que llame a `accion`
//    con 0, 1, 2... hasta veces - 1. Úsala para imprimir "vuelta 0", "vuelta 1", ...


// 4. Escribe tu propio `miMap(lista: number[], fn: (n: number) => number): number[]`
//    SIN usar el .map nativo (usa un for...of). Comprueba que da lo mismo que [1, 2, 3].map(...).


// 5. Escribe tu propio `miFilter(lista: number[], condicion: (n: number) => boolean): number[]`.


// 6. Parámetros opcionales y por defecto:
//    - `saludar(nombre: string, saludo?: string)`: si no hay saludo, usa "Hola".
//    - `saludar2(nombre: string, saludo = "Hola")`: misma idea con valor por defecto.
//    Pasa el ratón por encima de `saludo` en la segunda: ¿qué tipo ha deducido TS?


// 7. Callback que puede fallar: `intentar(accion: () => number, alFallar: (error: unknown) => void): void`.
//    Ejecuta `accion` dentro de un try/catch y llama a `alFallar` si lanza un error.
//    Pruébala con una acción que haga `throw new Error("boom")`.
//    Pista: `unknown` significa "no sé qué es"; hay que comprobarlo antes de usarlo
//    (por ejemplo con `error instanceof Error`).


// 8. Una función que DEVUELVE otra función:
//    `multiplicadorPor(n: number): (x: number) => number`.
//    Crea `doble` y `triple` con ella y pruébalas.


// 9. Predice (sin ejecutar) y luego comprueba con tsc: ¿qué error da pasar a `aplicar`
//    una función con TRES parámetros obligatorios? ¿Y una con UN solo parámetro?
//    Explica en un comentario por qué una sí da error y la otra no.
