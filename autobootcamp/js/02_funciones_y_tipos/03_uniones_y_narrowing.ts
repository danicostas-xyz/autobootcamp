// UNIONES Y NARROWING
//
// Un tipo unión dice "este valor es una cosa O la otra":  string | number
// Analogía: una caja que puede contener un vinilo o un casete. Antes de usar lo que hay dentro
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
// Tipos literales: un tipo que es un valor concreto.  type Cara = "A" | "B"
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
//    si es string (el nombre de un artista) devuélvelo en mayúsculas;
//    si es number (sus scrobbles), con separador de miles estilo Last.fm: 5626 -> "5,626".
//    Pista: toLocaleString("en-US").


// 2. `longitud(x: string | string[]): number`: la longitud del texto o el nº de elementos del array.
//    Pruébala con "Fontaines D.C." y con ["Dogrel", "A Hero's Death", "Skinty Fia", "Romance"].
//    Pista: Array.isArray.


// 3. Literales: `type Genero = "post-punk" | "grunge" | "alt-metal" | "shoegaze" | "ambient" | "hip-hop" | "pop"`.
//    Escribe `esPesado(genero: Genero): boolean` (true para grunge y alt-metal).
//    Intenta llamarla con "reggaeton" y lee el error.


// 4. `type Resultado = number | null`. Escribe `mediaPorDia(scrobbles: number, dias: number): Resultado`
//    (null si dias es 0). Calcula cuántos scrobbles al día son 5626 en 365 días.
//    Imprime un mensaje distinto según sea null o no.
//    Intenta usar `r * 2` sin comprobar y lee el error.


// 5. Operador `in`:
//    type Disco = { titulo: string; artista: string }
//    type Pelicula = { titulo: string; director: string }
//    Escribe `describirObra(obra: Disco | Pelicula): string` usando `"artista" in obra`.
//    Pruébala con "Skinty Fia" (Fontaines D.C.) y con "Mulholland Drive" (David Lynch).


// 6. Unión discriminada. Define:
//    type Formato =
//      | { tipo: "vinilo"; rpm: 33 | 45 }
//      | { tipo: "cd"; discos: number }
//      | { tipo: "streaming"; plataforma: string }
//    Escribe `describirFormato(f: Formato): string` con un `switch (f.tipo)`.
//    Pruébala con un vinilo de Deftones a 33 rpm, un CD doble y Spotify.


// 7. Exhaustividad. Añade a Formato la variante `{ tipo: "casete"; cara: "A" | "B" }`.
//    Añade al switch un `default` con:   const _comprobacion: never = f
//    ¿Qué dice tsc si te olvidas de tratar un caso? Explícalo con tus palabras en un comentario.


// 8. Resultado de una operación que puede fallar:
//    type Res<T> = { ok: true; valor: T } | { ok: false; error: string }
//    (El <T> es un genérico, como en Array<number>; lo verás a fondo en 04_genericos.ts.)
//    Escribe `parsearScrobbles(texto: string): Res<number>` que convierta "5,626" en 5626
//    (quita las comas) y devuelva un error si el texto no es un número ("muchos", "").
//    Úsala con `if (r.ok) { ... r.valor } else { ... r.error }`.


// 9. Type guards con filter. Dado:
//    const historial: (string | number | boolean)[] = ["Fontaines D.C.", 5626, true, "Deftones", 3696, false]
//    Sepáralo en tres arrays por tipo. Prueba con una función con predicado explícito:
//      (x): x is string => typeof x === "string"
//    `x is string` le dice a TS: "si devuelvo true, x es un string".
//    Mira (pasando el ratón) el tipo de cada array resultante, con y sin el predicado explícito.


// 10. Reto con `unknown`: escribe `describirCualquiera(x: unknown): string`.
//     Debe devolver una descripción distinta para string, number, boolean, null, array y objeto.
//     Pruébala con "Twin Peaks", 1990, true, null, ["Laura", "Dale"] y { director: "David Lynch" }.
//     Pista: typeof null es "object", ¡cuidado con el orden de las comprobaciones!
