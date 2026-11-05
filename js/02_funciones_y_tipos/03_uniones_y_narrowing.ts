// TIPOS UNIÓN, NARROWING, TYPE GUARDS Y UNIONES DISCRIMINADAS
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Tipo unión (union type)
//     Técnico: `A | B` = el valor es de tipo A O de tipo B. Solo puedes usar lo que A y B tienen en común,
//     hasta que estreches el tipo.
//     Para tontos: una caja que puede contener un vinilo O un casete. Hasta que no mires dentro, solo
//     puedes hacer lo que sirve para los dos.
//
// - Tipo literal (literal type)
//     Técnico: un tipo cuyo único valor posible es uno concreto:  type Cara = "A" | "B"
//
// - Estrechamiento de tipos (type narrowing) y análisis de flujo de control (control flow analysis)
//     Técnico: dentro de un `if`, TS reduce el tipo de la variable según la comprobación hecha.
//     Para tontos: miras dentro de la caja y, a partir de ahí, TS "sabe" qué hay.
//
// - Guarda de tipo (type guard)
//     Técnico: expresión que provoca el narrowing: typeof x === "string", Array.isArray(x), "campo" in x,
//     x instanceof Clase, x === null, igualdad con un literal.
//     Una guarda definida por el usuario usa un predicado de tipo (type predicate):  (x): x is string => ...
//
// - Unión discriminada (discriminated union, tagged union)
//     Técnico: unión de objetos que comparten una propiedad "etiqueta" (el discriminante) con un literal
//     distinto en cada variante. Comprobar el discriminante estrecha a la variante concreta.
//       type Forma = { tipo: "circulo"; radio: number } | { tipo: "cuadrado"; lado: number }
//       function area(f: Forma) { if (f.tipo === "circulo") { /* aquí TS sabe que f tiene `radio` */ } }
//     Para tontos: cada variante lleva una pegatina con su nombre; mirando la pegatina sabes qué contiene.
//
// - Comprobación de exhaustividad (exhaustiveness checking) y tipo `never`
//     Técnico: `never` es el tipo vacío (bottom type): ningún valor lo habita. Asignar la variable del
//     `default` de un switch a `never` hace que TS avise si falta tratar alguna variante.
//
// - `unknown` frente a `any`
//     Técnico: `unknown` es el tipo "cualquier valor" pero seguro: hay que estrecharlo antes de usarlo.
//     `any` desactiva la comprobación de tipos.
//
// - Patrón Result
//     Técnico: representar éxito/fallo como una unión discriminada en vez de lanzar excepciones.
//
// Comprobar los tipos: pnpm tsc


// 1. [Guarda `typeof`] `describir(valor: string | number): string`:
//    si es string (el nombre de un artista) devuélvelo en mayúsculas;
//    si es number (sus scrobbles), con separador de miles estilo Last.fm: 5626 -> "5,626".
//    Pista: toLocaleString("en-US").


// 2. [Guarda `Array.isArray`] `longitud(x: string | string[]): number`: la longitud del texto o el nº de elementos del array.
//    Pruébala con "Fontaines D.C." y con ["Dogrel", "A Hero's Death", "Skinty Fia", "Romance"].


// 3. [Tipos literales] `type Genero = "post-punk" | "grunge" | "alt-metal" | "shoegaze" | "ambient" | "hip-hop" | "pop"`.
//    Escribe `esPesado(genero: Genero): boolean` (true para grunge y alt-metal).
//    Intenta llamarla con "reggaeton" y lee el error.


// 4. [Unión con null y narrowing por igualdad] `type Resultado = number | null`.
//    Escribe `mediaPorDia(scrobbles: number, dias: number): Resultado` (null si dias es 0).
//    Calcula cuántos scrobbles al día son 5626 en 365 días.
//    Imprime un mensaje distinto según sea null o no.
//    Intenta usar `r * 2` sin comprobar y lee el error (strictNullChecks).


// 5. [Guarda con el operador `in`]
//    type Disco = { titulo: string; artista: string }
//    type Pelicula = { titulo: string; director: string }
//    Escribe `describirObra(obra: Disco | Pelicula): string` usando `"artista" in obra`.
//    Pruébala con "Skinty Fia" (Fontaines D.C.) y con "Mulholland Drive" (David Lynch).


// 6. [Unión discriminada + switch] Define:
//    type Formato =
//      | { tipo: "vinilo"; rpm: 33 | 45 }
//      | { tipo: "cd"; discos: number }
//      | { tipo: "streaming"; plataforma: string }
//    Escribe `describirFormato(f: Formato): string` con un `switch (f.tipo)`.
//    Pruébala con un vinilo de Deftones a 33 rpm, un CD doble y Spotify.


// 7. [Exhaustividad con `never`] Añade a Formato la variante `{ tipo: "casete"; cara: "A" | "B" }`.
//    Añade al switch un `default` con:   const _comprobacion: never = f
//    ¿Qué dice tsc si te olvidas de tratar un caso? Explícalo con tus palabras en un comentario.


// 8. [Patrón Result + genérico] type Res<T> = { ok: true; valor: T } | { ok: false; error: string }
//    (El <T> es un parámetro de tipo, como en Array<number>; lo verás a fondo en 04_genericos.ts.)
//    Escribe `parsearScrobbles(texto: string): Res<number>` que convierta "5,626" en 5626
//    (quita las comas) y devuelva un error si el texto no es un número ("muchos", "").
//    Úsala estrechando por el discriminante: `if (r.ok) { ... r.valor } else { ... r.error }`.


// 9. [Guardas definidas por el usuario con filter] Dado:
//    const historial: (string | number | boolean)[] = ["Fontaines D.C.", 5626, true, "Deftones", 3696, false]
//    Sepáralo en tres arrays por tipo. Prueba con un predicado de tipo explícito:
//      (x): x is string => typeof x === "string"
//    `x is string` le dice a TS: "si devuelvo true, x es un string".
//    Mira (pasando el ratón) el tipo de cada array resultante, con y sin el predicado explícito.


// 10. [`unknown` + narrowing exhaustivo] Reto: escribe `describirCualquiera(x: unknown): string`.
//     Debe devolver una descripción distinta para string, number, boolean, null, array y objeto.
//     Pruébala con "Twin Peaks", 1990, true, null, ["Laura", "Dale"] y { director: "David Lynch" }.
//     Pista: typeof null es "object", ¡cuidado con el orden de las comprobaciones!
