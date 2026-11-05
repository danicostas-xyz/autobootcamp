// CALLBACKS, FUNCIONES DE ORDEN SUPERIOR (HOF) Y TIPOS DE FUNCIÓN
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Función de primera clase (first-class function)
//     Técnico: en JS/TS una función es un VALOR más: se asigna a una variable, se pasa como argumento
//     y se devuelve desde otra función, igual que un número o un string.
//     Para tontos: una función es una hoja con instrucciones. La puedes archivar en una carpeta (variable),
//     dársela a otra persona (argumento) o recibirla de vuelta (return).
//
// - Callback
//     Técnico: función que se pasa como argumento a otra función, que se encarga de invocarla (de forma
//     síncrona o asíncrona). El código que la recibe decide CUÁNDO y CUÁNTAS veces se ejecuta.
//     Para tontos: dejas tu teléfono en la tienda de discos: "llámame cuando llegue el vinilo".
//     Tu número es el callback; la tienda decide cuándo llamar. Tú no llamas, te llaman.
//
// - Función de orden superior (HOF, higher-order function)
//     Técnico: función que RECIBE una o más funciones como parámetros y/o DEVUELVE una función.
//     Array.prototype.map, filter, reduce, forEach, sort o find son HOFs.
//     Para tontos: un cocinero al que le das una receta (callback) y los ingredientes (datos):
//     él decide cuándo y cuántas veces aplica la receta.
//
// - Firma de tipo de función (function type signature)
//     Técnico: describe parámetros y tipo de retorno SIN implementación:  (a: number, b: number) => number
//     Para tontos: la etiqueta de una máquina: "entran dos números, sale un número".
//
// - Predicado (predicate)
//     Técnico: callback que devuelve boolean (lo usan filter, some, every, find).
//     Para tontos: una pregunta de sí/no que se hace a cada elemento: "¿supera los 3000 scrobbles?".
//
// - Aridad (arity) y compatibilidad de asignación
//     Técnico: aridad = número de parámetros. TS permite asignar a un tipo de función una función con
//     MENOS parámetros (los argumentos sobrantes se ignoran), pero no con más parámetros obligatorios.
//     Para tontos: a una cocina que ignora el postre del pedido no le pasa nada; una cocina que exige un
//     ingrediente que nadie le da, sí tiene un problema.
//
// - Fábrica de funciones (function factory)
//     Técnico: HOF que devuelve una función nueva configurada; la función devuelta es un closure
//     (lo verás en 05_js_core/01_scope_y_closures.js).
//     Para tontos: una máquina que fabrica máquinas ya ajustadas a un número concreto.
//
// - `void` y `unknown`
//     Técnico: `void` = el retorno no se usa; `unknown` = tipo seguro de "no sé qué es" (obliga a hacer
//     narrowing antes de usarlo, a diferencia de `any`, que desactiva la comprobación).
//
// Ejemplo de un alias de tipo de función y una HOF:
//   type Operacion = (a: number, b: number) => number
//   const sumar: Operacion = (a, b) => a + b          // TS infiere el tipo de a y b (inferencia contextual)
//   function repetir(veces: number, accion: (i: number) => void) { ... }
//
// Comprobar los tipos:  pnpm tsc      Ejecutar:  pnpm tsx 02_funciones_y_tipos/01_callbacks_tipados.ts
//
// Datos de ejemplo (scrobbles de tu Last.fm):
//   Fontaines D.C. 5626 · Deftones 3696 · Ethel Cain 2978 · The Murder Capital 2413 · Alice in Chains 2241


// 1. [Alias de tipo de función] Define `type Operacion = (a: number, b: number) => number`.
//    Crea tres funciones de ese tipo (sin anotar sus parámetros: observa la inferencia contextual):
//    sumar, restar y multiplicar.

type Operacion = (a: number, b: number, c: number) => number
const sumar: Operacion = (a,b) => a + b // un parámetro de menos (arity)
// function sumar2 : Operacion = (a,b) => a+b esto no funciona
const restar: Operacion = (a,b) => a - b // un parámetro de menos (arity)
const multiplicar: Operacion = (a,b,c) => a * b * c

console.log(sumar(1,4,1))


// 2. [HOF + callback] Escribe `aplicar(a, b, op: Operacion): number`, que invoque el callback `op` con a y b.
//    Pruébala con los scrobbles de Fontaines D.C. (5626) y Deftones (3696):
//    su suma, su diferencia y un callback anónimo nuevo (por ejemplo, la media).


// 3. [HOF con callback que recibe un índice] Escribe `repetir(veces: number, accion: (i: number) => void): void`,
//    que invoque `accion` con 0, 1, 2... hasta veces - 1.
//    Úsala para imprimir "Skinty Fia, escucha 0", "Skinty Fia, escucha 1", ...


// 4. [Reimplementar una HOF de Array: map] Escribe tu propio `miMap(lista: number[], fn: (n: number) => number): number[]`
//    SIN usar el .map nativo (usa un for...of). `fn` es el callback de transformación (mapper).
//    Pásale los scrobbles [5626, 3696, 2978, 2413, 2241] y una función que los convierta a miles (5.6, 3.7, ...).
//    Comprueba que da lo mismo que el .map nativo.


// 5. [Reimplementar una HOF de Array: filter] Escribe tu propio `miFilter(lista: number[], condicion: (n: number) => boolean): number[]`.
//    `condicion` es un predicado. Quédate con los artistas que superen los 3000 scrobbles.


// 6. [Parámetro opcional frente a parámetro por defecto]
//    - `presentar(artista: string, genero?: string)`: "Fontaines D.C. (post-punk)", o solo el nombre si no hay género.
//      (`genero` es de tipo `string | undefined`.)
//    - `presentar2(artista: string, genero = "sin género")`: misma idea con valor por defecto.
//    Pasa el ratón por encima de `genero` en la segunda: ¿qué tipo ha inferido TS?


// 7. [Callback de manejo de errores + narrowing de `unknown`]
//    `intentar(accion: () => number, alFallar: (error: unknown) => void): void`.
//    Ejecuta `accion` dentro de un try/catch y, si lanza, invoca el callback `alFallar`.
//    Pruébala con una acción que haga `throw new Error("Last.fm no responde")`.
//    Pista: `error` es `unknown`; estréchalo antes de usarlo (por ejemplo con `error instanceof Error`).


// 8. [HOF que devuelve una función = fábrica de funciones]
//    `multiplicadorPor(n: number): (x: number) => number`.
//    Crea `doble` y `triple` con ella (por ejemplo, para calcular cuántas canciones suenan
//    si escuchas un disco de 12 canciones dos o tres veces) y pruébalas.
//    Pregunta: ¿qué variable "recuerdan" `doble` y `triple` aunque `multiplicadorPor` ya haya terminado?


// 9. [Aridad y asignabilidad] Predice (sin ejecutar) y luego comprueba con tsc: ¿qué error da pasar a `aplicar`
//    una función con TRES parámetros obligatorios? ¿Y una con UN solo parámetro?
//    Explica en un comentario, con los términos de la cabecera, por qué una sí da error y la otra no.
