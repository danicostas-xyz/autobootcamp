// CLASES Y `this` (JavaScript puro)
//
// Una clase es un MOLDE para crear objetos que llevan datos y funciones propias.
//   class Disco {
//     constructor(titulo) { this.titulo = titulo; }    // se ejecuta al hacer `new Disco("Dogrel")`
//     presentar() { return `Sonando: ${this.titulo}`; }
//   }
//   const dogrel = new Disco("Dogrel");
//
// `this` = "el objeto sobre el que se ha llamado al método". En dogrel.presentar(), this es dogrel.
//
// Más piezas:
//   get scrobbles() { ... }    getter: se lee como una propiedad (artista.scrobbles)
//   #scrobbles = 0             campo PRIVADO: solo accesible desde dentro de la clase
//   static total = 0           pertenece a la clase, no a cada objeto
//   class B extends A { constructor() { super(); } }    herencia
//
// Ejecutar:  pnpm tsx 05_js_core/02_clases_y_this.js

// 1. Clase `Artista` con `nombre` y `scrobbles` (empieza en 0).
//    Métodos: `escuchar(n)` (suma n scrobbles), `corregir(n)` (resta n; lanza un Error si quedaría por debajo de 0)
//    y `toString()` ("Fontaines D.C. (5626 scrobbles)").
//    Crea a Fontaines D.C. y súmale 5626.


// 2. Haz los scrobbles privados (`#scrobbles`) y expón su lectura con un getter `scrobbles`.
//    Comenta una línea que intente `artista.#scrobbles` desde fuera y anota qué error da.


// 3. Validaciones: `escuchar` y `corregir` deben lanzar un Error si `n` no es un número entero mayor que 0.


// 4. `static`: lleva la cuenta de cuántos artistas se han creado en `Artista.total`.


// 5. Herencia: `Banda extends Artista` con una lista de `miembros` y un método `fichar(nombre)`.
//    Usa `super(...)` en el constructor. Crea Fontaines D.C. con sus cinco miembros
//    (Grian Chatten, Carlos O'Connell, Conor Curley, Conor Deegan III, Tom Coll).


// 6. `Solista extends Artista` que SOBRESCRIBE `toString` para añadir su nombre real
//    (por ejemplo, Ethel Cain: "Ethel Cain (Hayden Silas Anhedönia) ..."). Haz lo mismo en Banda
//    para que `toString` muestre cuántos miembros tiene.


// 7. Polimorfismo: crea un array con una banda y un solista, recórrelo y llama a `toString()` en cada uno.


// 8. Pérdida de `this`:
//      const deftones = new Artista("Deftones");
//      const escuchar = deftones.escuchar;
//      escuchar(10);
//    ¿Qué pasa? Arréglalo de tres formas: con `.bind(deftones)`, con una función flecha envolvente,
//    y con un método definido como campo flecha dentro de la clase. Explica cuál prefieres y por qué.


// 9. `this` en objetos literales: crea un objeto `lynch` con `nombre: "David Lynch"` y dos métodos,
//    uno normal y otro con función flecha, que imprimen `this.nombre`. ¿Cuál funciona? ¿Por qué?


// 10. Prototipos: comprueba que `Object.getPrototypeOf(unaBanda) === Banda.prototype`
//     y recorre toda la cadena de prototipos hasta llegar a null, imprimiendo cada eslabón.


// RETO TS: reescribe `Artista` en un archivo `02_clases_y_this.ts` con `private`, `readonly`
// y una `interface Escuchable` que la clase `implements`. Comprueba con `pnpm tsc`.
