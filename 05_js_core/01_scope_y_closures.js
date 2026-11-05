// SCOPE, CLOSURES Y FUNCIONES QUE DEVUELVEN FUNCIONES (JavaScript puro)
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Ámbito (scope) y ámbito léxico (lexical scope)
//     Técnico: el scope es la región del código donde una variable es visible. En JS el scope es LÉXICO:
//     se decide por DÓNDE está escrita la función, no por desde dónde se llama.
//       var       -> ámbito de función.     let / const -> ámbito de bloque { }.
//     Usa const por defecto, let si vas a reasignar, y evita var.
//     Para tontos: una variable es como un cartel pegado en una habitación: solo lo ves si estás dentro
//     de esa habitación (o en una habitación interior).
//
// - Cadena de ámbitos (scope chain)
//     Técnico: si JS no encuentra una variable en el scope actual, la busca en el scope que lo contiene, y así
//     hasta el global. Siempre hacia fuera, nunca hacia dentro.
//
// - Elevación (hoisting) y zona muerta temporal (TDZ, temporal dead zone)
//     Técnico: las declaraciones se registran al entrar en el scope, antes de ejecutar nada. `var` se eleva y se
//     inicializa a undefined; `let`/`const` se elevan pero NO se inicializan hasta su línea: acceder antes
//     lanza ReferenceError (eso es la TDZ).
//
// - Clausura (closure)
//     Técnico: una función junto con una referencia a su entorno léxico, es decir, a las variables del
//     scope donde fue creada. Esas variables siguen vivas mientras la función exista, aunque la función
//     externa ya haya terminado.
//     Para tontos: cuando una función nace dentro de otra se lleva una MOCHILA con las variables de su
//     entorno. Aunque la de fuera ya haya acabado, la de dentro sigue teniendo su mochila.
//
//       function crearSaludo(saludo) {
//         return (nombre) => `${saludo}, ${nombre}`;   // la función de dentro recuerda `saludo`
//       }
//       const hola = crearSaludo("Hola");
//       hola("Dani");   // "Hola, Dani"
//
// - Encapsulación mediante closures (encapsulation) y patrón módulo (module pattern)
//     Técnico: una variable declarada dentro de la función externa y no devuelta es PRIVADA: solo se puede
//     tocar a través de las funciones que la capturan.
//
// - Función de fábrica (function factory) y función de orden superior (HOF)
//     Técnico: una función que DEVUELVE otra función es una HOF (igual que una que la recibe) y suele usar un
//     closure para "configurar" la función devuelta.
//
// - Memoización (memoization) y función pura
//     Técnico: cachear el resultado de una función pura para cada argumento y no recalcularlo.
//
// - Debounce
//     Técnico: técnica que retrasa ejecutar una función hasta que pasan N ms sin nuevas llamadas
//     (útil con buscadores que consultan mientras el usuario escribe). Usa un closure para guardar el
//     identificador del temporizador.
//
// Los closures están por todas partes en React (useState, useEffect, manejadores de eventos).
//
// Ejecutar:  pnpm tsx 05_js_core/01_scope_y_closures.js

// 1. [Hoisting y TDZ] Predice qué pasa (SIN ejecutar) con cada caso y luego pruébalos por separado:
//      console.log(disco); var disco = "Dogrel";
//      console.log(cancion); let cancion = "Big";
//    Explica en un comentario qué es el hoisting y la TDZ, con tus palabras.


// 2. [Closure en un bucle: var frente a let] Predice la salida de los dos bucles y luego ejecútalos.
//    ¿Por qué son distintas? (Pista: ¿cuántas variables `i` existen en cada caso?)
//      for (var i = 0; i < 3; i++) { setTimeout(() => console.log("var, pista", i), 0); }
//      for (let j = 0; j < 3; j++) { setTimeout(() => console.log("let, pista", j), 0); }


// 3. [Function factory + closure] `crearContador()` devuelve una función que, cada vez que la llamas, suma
//    un scrobble a un contador PRIVADO y lo devuelve. Crea dos contadores (uno para Fontaines D.C. y otro para
//    Deftones) y comprueba que son independientes (cada closure tiene su propia mochila).


// 4. [Encapsulación] `crearContadorAvanzado()` devuelve un objeto `{ incrementar, decrementar, valor, reiniciar }`
//    cuyos métodos comparten (por closure) una variable que nadie de fuera puede tocar directamente.


// 5. [HOF que devuelve función, aplicación parcial] `multiplicadorPor(n)` devuelve una función `x => x * n`.
//    Crea `doble` y `triple` (cuántas canciones suenan si escuchas un disco de 12 pistas dos o tres veces).


// 6. [HOF que envuelve a otra: decorador] `once(fn)`: devuelve una función que ejecuta `fn` solo la PRIMERA vez;
//    las siguientes devuelve el resultado de la primera sin volver a ejecutarla.
//    Pruébala con una función que imprima "Pongo el disco" y devuelva "Skinty Fia".


// 7. [Memoización] `memoize(fn)`: guarda en un Map los resultados por argumento para no recalcular.
//    Pruébala con un `fibonacci(35)` recursivo (lento): mide con console.time antes y después de memoizarlo.
//    Ojo: ¿por qué solo es seguro memoizar funciones PURAS?


// 8. [Debounce] `debounce(fn, ms)`: devuelve una función que solo ejecuta `fn` si pasan `ms` milisegundos
//    sin que la vuelvan a llamar (pista: setTimeout / clearTimeout, y el id del temporizador guardado
//    en el closure). Pruébala simulando a alguien escribiendo "fontaines" letra a letra en un buscador
//    de artistas: solo debe "buscar" una vez, al terminar.


// 9. [Patrón módulo] Crea con una función un objeto `playlist` con canciones PRIVADAS y los métodos
//    `anadir(titulo)` y `cantidad()`. Añade "Starburster" y "Falling".
//    Comprueba que no se puede acceder a las canciones directamente.


// 10. [Con tus palabras] Explica, en un comentario, qué es un closure (usa los términos "entorno léxico" y
//     "scope") y en qué parte de React lo has visto (pista: cuando un useState te "recuerda" el valor
//     entre renderizados).
