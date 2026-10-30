// SCOPE Y CLOSURES (JavaScript puro)
//
// Scope (alcance) = dónde "vive" una variable.
//   var   -> vive en toda la función.   let / const -> viven solo en su bloque { }.
//   Usa const por defecto y let si vas a reasignar. Evita var.
//
// Closure = una función que RECUERDA las variables del sitio donde nació, aunque ese sitio ya haya terminado.
// Analogía: cuando una función nace dentro de otra, se lleva una MOCHILA con las variables de su entorno.
// Aunque la función de fuera ya haya acabado, la de dentro sigue teniendo su mochila.
//
//   function crearSaludo(saludo) {
//     return (nombre) => `${saludo}, ${nombre}`;   // la función de dentro recuerda `saludo`
//   }
//   const hola = crearSaludo("Hola");
//   hola("Dani");   // "Hola, Dani"
//
// Los closures están por todas partes en React (useState, useEffect, manejadores de eventos).
//
// Ejecutar:  pnpm tsx 05_js_core/01_scope_y_closures.js

// 1. Hoisting. Predice qué pasa (SIN ejecutar) con cada caso y luego pruébalos por separado:
//      console.log(disco); var disco = "Dogrel";
//      console.log(cancion); let cancion = "Big";
//    Explica en un comentario qué es el hoisting y la "zona muerta temporal" (TDZ).


// 2. Predice la salida de los dos bucles y luego ejecútalos. ¿Por qué son distintas?
//      for (var i = 0; i < 3; i++) { setTimeout(() => console.log("var, pista", i), 0); }
//      for (let j = 0; j < 3; j++) { setTimeout(() => console.log("let, pista", j), 0); }


// 3. `crearContador()` devuelve una función que, cada vez que la llamas, suma un scrobble a un contador PRIVADO
//    y lo devuelve. Crea dos contadores (uno para Fontaines D.C. y otro para Deftones)
//    y comprueba que son independientes.


// 4. `crearContadorAvanzado()` devuelve un objeto `{ incrementar, decrementar, valor, reiniciar }`
//    que manipula una variable que nadie de fuera puede tocar directamente.


// 5. `multiplicadorPor(n)` devuelve una función `x => x * n`.
//    Crea `doble` y `triple` (cuántas canciones suenan si escuchas un disco de 12 pistas dos o tres veces).


// 6. `once(fn)`: devuelve una función que ejecuta `fn` solo la PRIMERA vez;
//    las siguientes veces devuelve el resultado de la primera sin volver a ejecutarla.
//    Pruébala con una función que imprima "Pongo el disco" y devuelva "Skinty Fia".


// 7. `memoize(fn)`: guarda en un Map los resultados por argumento para no recalcular.
//    Pruébala con un `fibonacci(35)` recursivo (lento): mide con console.time antes y después de memoizarlo.


// 8. `debounce(fn, ms)`: devuelve una función que solo ejecuta `fn` si pasan `ms` milisegundos
//    sin que la vuelvan a llamar. Pruébala simulando a alguien escribiendo "fontaines" letra a letra
//    en un buscador de artistas: solo debe "buscar" una vez, al terminar.
//    (En React se usa para buscar mientras el usuario escribe.)


// 9. Patrón módulo: crea con una función un objeto `playlist` con canciones PRIVADAS y los métodos
//    `anadir(titulo)` y `cantidad()`. Añade "Starburster" y "Falling".
//    Comprueba que no se puede acceder a las canciones directamente.


// 10. Explica con tus palabras, en un comentario, qué es un closure y en qué parte de React lo has visto
//     (pista: cuando un useState te "recuerda" el valor entre renderizados).
