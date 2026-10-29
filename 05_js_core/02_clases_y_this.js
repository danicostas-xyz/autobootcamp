// CLASES Y `this` (JavaScript puro)
//
// Una clase es un MOLDE para crear objetos que llevan datos y funciones propias.
//   class Perro {
//     constructor(nombre) { this.nombre = nombre; }    // se ejecuta al hacer `new Perro("Rex")`
//     ladrar() { return `${this.nombre}: guau`; }
//   }
//   const rex = new Perro("Rex");
//
// `this` = "el objeto sobre el que se ha llamado al método". En rex.ladrar(), this es rex.
//
// Más piezas:
//   get saldo() { ... }        getter: se lee como una propiedad (cuenta.saldo)
//   #saldo = 0                 campo PRIVADO: solo accesible desde dentro de la clase
//   static total = 0           pertenece a la clase, no a cada objeto
//   class B extends A { constructor() { super(); } }    herencia
//
// Ejecutar:  pnpm tsx 05_js_core/02_clases_y_this.js

// 1. Clase `CuentaBancaria` con `titular` y `saldo` (empieza en 0).
//    Métodos: `ingresar(cantidad)`, `retirar(cantidad)` (lanza un Error si no hay saldo) y `toString()`.


// 2. Haz el saldo privado (`#saldo`) y expón su lectura con un getter `saldo`.
//    Comenta una línea que intente `cuenta.#saldo` desde fuera y anota qué error da.


// 3. Validaciones: `ingresar` y `retirar` deben lanzar un Error si la cantidad no es un número mayor que 0.


// 4. `static`: lleva la cuenta de cuántas cuentas se han creado en `CuentaBancaria.total`.


// 5. Herencia: `CuentaAhorro extends CuentaBancaria` con un `interes` y un método `aplicarInteres()`.
//    Usa `super(...)` en el constructor.


// 6. `CuentaCorriente extends CuentaBancaria` que SOBRESCRIBE `retirar` permitiendo un descubierto máximo.


// 7. Polimorfismo: crea un array con cuentas de los tres tipos, recórrelo y llama a `toString()` en cada una.


// 8. Pérdida de `this`:
//      const cuenta = new CuentaBancaria("Ana");
//      const ingresar = cuenta.ingresar;
//      ingresar(10);
//    ¿Qué pasa? Arréglalo de tres formas: con `.bind(cuenta)`, con una función flecha envolvente,
//    y con un método definido como campo flecha dentro de la clase. Explica cuál prefieres y por qué.


// 9. `this` en objetos literales: crea un objeto con `nombre` y dos métodos, uno normal y otro con función flecha,
//    que imprimen `this.nombre`. ¿Cuál funciona? ¿Por qué?


// 10. Prototipos: comprueba que `Object.getPrototypeOf(unaCuentaAhorro) === CuentaAhorro.prototype`
//     y recorre toda la cadena de prototipos hasta llegar a null, imprimiendo cada eslabón.


// RETO TS: reescribe `CuentaBancaria` en un archivo `02_clases_y_this.ts` con `private`, `readonly`
// y una `interface Cuenta` que la clase `implements`. Comprueba con `pnpm tsc`.
