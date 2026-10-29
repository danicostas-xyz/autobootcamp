// UNIONES Y NARROWING
//
// Un tipo unión dice "este valor es una cosa O la otra":  string | number
// Analogía: una caja que puede contener zapatos o botas. Antes de usar lo que hay dentro
// tienes que MIRAR qué es. Esa mirada se llama narrowing ("estrechar" el tipo):
// dentro del if, TS ya sabe cuál de las dos posibilidades es.
//
// Herramientas para estrechar:
//   typeof x === "string"     para primitivos (string, number, boolean...)
//   Array.isArray(x)          para arrays
//   "campo" in x              ¿el objeto tiene este campo?
//   x instanceof Clase        ¿viene de esta clase?
//   x === null, x !== undefined, igualdad con literales
//
// Tipos literales: un tipo que es un valor concreto.  type Lado = "izquierda" | "derecha"
//
// Unión discriminada: cada variante lleva un campo etiqueta (por convención `tipo` o `kind`)
// con un literal distinto. Al comprobar la etiqueta, TS sabe qué variante tienes:
//   type Forma = { tipo: "circulo"; radio: number } | { tipo: "cuadrado"; lado: number }
//   function area(f: Forma) {
//     if (f.tipo === "circulo") { /* aquí TS sabe que f tiene `radio` */ }
//   }
//
// Comprobar los tipos: pnpm tsc


// 1. `describir(valor: string | number): string`:
//    si es string devuélvelo en mayúsculas; si es number, con dos decimales (toFixed(2)).


// 2. `longitud(x: string | string[]): number`: la longitud del texto o el nº de elementos del array.
//    Pista: Array.isArray.


// 3. Literales: `type Dia = "lunes" | "martes" | "miércoles" | "jueves" | "viernes" | "sábado" | "domingo"`.
//    Escribe `esFinDeSemana(dia: Dia): boolean`.
//    Intenta llamarla con "funday" y lee el error.


// 4. `type Resultado = number | null`. Escribe `dividir(a: number, b: number): Resultado`
//    (null si b es 0). Imprime el resultado con un mensaje distinto según sea null o no.
//    Intenta usar `r * 2` sin comprobar y lee el error.


// 5. Operador `in`:
//    type Perro = { ladrar(): string }
//    type Gato = { maullar(): string }
//    Escribe `hacerSonido(animal: Perro | Gato): string` usando `"ladrar" in animal`.


// 6. Unión discriminada. Define:
//    type Pago =
//      | { tipo: "tarjeta"; numero: string }
//      | { tipo: "bizum"; telefono: string }
//      | { tipo: "efectivo" }
//    Escribe `describirPago(p: Pago): string` con un `switch (p.tipo)`.


// 7. Exhaustividad. Añade a Pago la variante `{ tipo: "transferencia"; iban: string }`.
//    Añade al switch un `default` con:   const _comprobacion: never = p
//    ¿Qué dice tsc si te olvidas de tratar un caso? Explícalo con tus palabras en un comentario.


// 8. Resultado de una operación que puede fallar:
//    type Res<T> = { ok: true; valor: T } | { ok: false; error: string }
//    (El <T> es un genérico, como en Array<number>; lo verás a fondo en 04_genericos.ts.)
//    Escribe `parsearEntero(texto: string): Res<number>`. Si no es un número válido, devuelve el error.
//    Úsala con `if (r.ok) { ... r.valor } else { ... r.error }`.


// 9. Type guards con filter. Dado:
//    const datos: (string | number | boolean)[] = ["a", 1, true, "b", 2, false]
//    Sepáralos en tres arrays por tipo. Prueba con una función con predicado explícito:
//      (x): x is string => typeof x === "string"
//    `x is string` le dice a TS: "si devuelvo true, x es un string".
//    Mira (pasando el ratón) el tipo de cada array resultante, con y sin el predicado explícito.


// 10. Reto con `unknown`: escribe `describirCualquiera(x: unknown): string`.
//     Debe devolver una descripción distinta para string, number, boolean, null, array y objeto.
//     Pista: typeof null es "object", ¡cuidado con el orden de las comprobaciones!
