// CLASES, HERENCIA Y `this` (JavaScript puro)
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Clase (class), instancia (instance) y constructor
//     Técnico: `class` es sintaxis moderna sobre la herencia por PROTOTIPOS de JS. `new Disco("Dogrel")` crea
//     una instancia y ejecuta el `constructor`, que inicializa su estado.
//     Para tontos: la clase es el molde de las galletas; las instancias son las galletas.
//       class Disco {
//         constructor(titulo) { this.titulo = titulo; }
//         presentar() { return `Sonando: ${this.titulo}`; }
//       }
//       const dogrel = new Disco("Dogrel");
//
// - `this` (vinculación dinámica, dynamic binding)
//     Técnico: en una función normal, `this` se decide en el momento de la LLAMADA: es el objeto a la izquierda
//     del punto. En dogrel.presentar(), this es dogrel. Si la función se separa de su objeto
//     (const f = dogrel.presentar; f()), `this` se pierde (undefined en módulos/strict).
//     Una función flecha NO tiene `this` propio: usa el del scope donde se escribió (`this` léxico).
//     Para tontos: `this` es "yo": depende de quién diga la frase, no de quién la escribió.
//
// - Métodos de instancia, estáticos (static), getters/setters (accessors)
//     get scrobbles() { ... }   getter: se lee como una propiedad (artista.scrobbles) pero ejecuta código
//     static total = 0          pertenece a la CLASE, no a cada instancia (Artista.total)
//
// - Campos privados (private fields) `#campo`
//     Técnico: solo accesibles desde dentro de la clase; acceder desde fuera es un SyntaxError. Es privacidad
//     real en tiempo de ejecución (no como `private` de TypeScript, que solo existe al compilar).
//
// - Herencia (inheritance): `extends`, `super`, sobrescritura (override) y polimorfismo
//     Técnico: `class B extends A` hereda de A. `super(...)` llama al constructor del padre (obligatorio antes
//     de usar this). Redefinir un método en la hija lo SOBRESCRIBE. Polimorfismo: tratar objetos de
//     clases distintas a través de la misma interfaz (todos tienen toString()) y que cada uno se comporte a su manera.
//     Para tontos: Banda y Solista son tipos de Artista: heredan lo común y cambian lo suyo.
//
// - Prototipo (prototype) y cadena de prototipos (prototype chain)
//     Técnico: cada objeto tiene un enlace interno a otro objeto (su prototipo). Si una propiedad no está en el
//     objeto, JS la busca en su prototipo, luego en el del prototipo... hasta null.
//
// - `bind`
//     Técnico: fn.bind(obj) devuelve una NUEVA función con `this` fijado a obj.
//
// Ejecutar:  pnpm tsx 05_js_core/02_clases_y_this.js

// 1. [Clase, constructor, métodos] Clase `Artista` con `nombre` y `scrobbles` (empieza en 0).
//    Métodos: `escuchar(n)` (suma n scrobbles), `corregir(n)` (resta n; lanza un Error si quedaría por debajo de 0)
//    y `toString()` ("Fontaines D.C. (5626 scrobbles)").
//    Crea a Fontaines D.C. y súmale 5626.


// 2. [Campo privado + getter] Haz los scrobbles privados (`#scrobbles`) y expón su lectura con un getter
//    `scrobbles`. Comenta una línea que intente `artista.#scrobbles` desde fuera y anota qué error da.


// 3. [Validación de argumentos] `escuchar` y `corregir` deben lanzar un Error si `n` no es un número
//    entero mayor que 0 (pista: Number.isInteger).


// 4. [Miembro estático] Lleva la cuenta de cuántos artistas se han creado en `static total`, accesible
//    como `Artista.total`. ¿Por qué no se puede leer desde una instancia?


// 5. [Herencia: extends y super] `Banda extends Artista` con una lista de `miembros` y un método `fichar(nombre)`.
//    Usa `super(...)` en el constructor. Crea Fontaines D.C. con sus cinco miembros
//    (Grian Chatten, Carlos O'Connell, Conor Curley, Conor Deegan III, Tom Coll).


// 6. [Sobrescritura (override)] `Solista extends Artista` que SOBRESCRIBE `toString` para añadir su nombre real
//    (por ejemplo, Ethel Cain: "Ethel Cain (Hayden Silas Anhedönia) ..."). Haz lo mismo en Banda
//    para que `toString` muestre cuántos miembros tiene. Pista: puedes reutilizar el del padre con `super.toString()`.


// 7. [Polimorfismo] Crea un array con una banda y un solista, recórrelo y llama a `toString()` en cada uno.
//    ¿Qué versión de toString se ejecuta en cada caso y quién lo decide?


// 8. [Pérdida de `this`: dynamic binding] Qué pasa aquí:
//      const deftones = new Artista("Deftones");
//      const escuchar = deftones.escuchar;
//      escuchar(10);
//    Arréglalo de tres formas: con `.bind(deftones)`, con una función flecha envolvente (this léxico),
//    y con un método definido como campo flecha dentro de la clase. Explica cuál prefieres y por qué.
//    (Relaciónalo con React: ¿por qué pasar `this.metodo` como callback a un botón rompía los componentes de clase?)


// 9. [`this` en literales de objeto: normal frente a flecha] Crea un objeto `lynch` con `nombre: "David Lynch"`
//    y dos métodos, uno normal y otro con función flecha, que imprimen `this.nombre`. ¿Cuál funciona? ¿Por qué?
//    (Pista: una flecha no tiene `this` propio, usa el del scope exterior.)


// 10. [Cadena de prototipos] Comprueba que `Object.getPrototypeOf(unaBanda) === Banda.prototype`
//     y recorre toda la cadena de prototipos hasta llegar a null, imprimiendo cada eslabón.


// RETO TS: reescribe `Artista` en un archivo `02_clases_y_this.ts` con `private`, `readonly`
// y una `interface Escuchable` que la clase `implements`. Comprueba con `pnpm tsc`.
// ¿En qué se diferencia `private` de TS de `#privado` de JS? (Pista: ¿cuándo existe cada uno?)
