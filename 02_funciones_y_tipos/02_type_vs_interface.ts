// INTERFACE FRENTE A TYPE (ALIAS DE TIPO) Y TIPADO ESTRUCTURAL
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Tipado estructural (structural typing)
//     Técnico: TS decide si un valor encaja en un tipo mirando su FORMA (los campos que tiene y sus tipos),
//     no el nombre del tipo ni de dónde viene. Es "duck typing" comprobado en compilación.
//     Para tontos: si camina como un pato y suena como un pato, para TS es un pato, aunque no se llame "Pato".
//
// - Alias de tipo (type alias) e interfaz (interface)
//     Técnico: ambos nombran la forma de un objeto.  type Disco = { titulo: string }   interface Disco { titulo: string }
//     En la práctica casi siempre dan igual. Regla de la casa: interface para objetos, props y clases;
//     type para uniones, tuplas, intersecciones y tipos derivados.
//
// - Propiedad opcional (optional property) y `readonly`
//     Técnico: `campo?: T` equivale a `T | undefined` y puede faltar. `readonly` impide reasignar la propiedad,
//     pero SOLO en compilación: en tiempo de ejecución no protege nada.
//     Para tontos: `?` = "este campo puede no venir". `readonly` = un cartel de "no tocar" que ve el
//     compilador, pero no un candado real.
//
// - Herencia de interfaces (extends) e intersección de tipos (&)
//     Técnico: dos formas de componer tipos. interface B extends A { ... }   frente a   type B = A & { ... }
//     Si una propiedad aparece con tipos incompatibles, `extends` da error y `&` deja esa propiedad como `never`.
//     Para tontos: "una Banda es un Artista y además tiene miembros".
//
// - Fusión de declaraciones (declaration merging)
//     Técnico: dos `interface` con el mismo nombre se fusionan en una sola. Un `type` repetido da error.
//
// - Firma de índice (index signature)
//     Técnico: { [clave: string]: number } describe un diccionario con claves arbitrarias del mismo tipo de valor.
//
// - Firma de método (method signature)
//     Técnico: una interface puede declarar funciones:  reproducir(cancion: string): string
//
// - Composición de tipos (type composition)
//     Técnico: un tipo puede contener a otro como propiedad (`origen: Origen`).
//
// Comprobar los tipos: pnpm tsc


// 1. [interface] Define `interface Artista { id: number; nombre: string; scrobbles: number }`.
//    Crea un array con 3 artistas de tu Last.fm (Fontaines D.C. 5626, Deftones 3696, Ethel Cain 2978).


// 2. [Propiedad opcional] Añade a Artista un campo opcional `sello?: string` (por ejemplo "Partisan Records"
//    para Fontaines D.C.). Crea un artista con sello y otro sin él.
//    Escribe `ficha(a: Artista): string` que devuelva "Fontaines D.C. - Partisan Records" o "Deftones - sin sello".
//    Pista: el tipo de `a.sello` es `string | undefined`; usa `??` o un if (narrowing).


// 3. [readonly] Marca `id` como `readonly`. Intenta modificarlo (`artista.id = 99`) y lee el error de tsc.
//    Pregunta: ¿se cumpliría esa protección si ejecutaras el JS compilado? ¿Por qué?


// 4. [Herencia de interfaces] Crea `interface Banda extends Artista { miembros: string[] }`.
//    Crea Fontaines D.C. con sus miembros (Grian Chatten, Carlos O'Connell, Conor Curley, Conor Deegan III, Tom Coll)
//    y escribe `describir(b: Banda): string` ("Fontaines D.C. (5626 scrobbles) - 5 miembros: Grian Chatten, ...").


// 5. [Intersección de tipos] Haz lo mismo que el 4 pero con un alias de tipo y la intersección `&`:
//    `type BandaT = Artista & { miembros: string[] }`. ¿Notas alguna diferencia al usarlo?


// 6. [Declaration merging] Declara DOS veces `interface Cancion` (una con `titulo` y `artista`,
//    otra con `anio` y `album`) y crea un objeto que tenga los campos de ambas
//    (por ejemplo "Starburster", Fontaines D.C., 2024, "Romance").
//    Intenta lo mismo con `type Cancion2` (dos veces) y lee el error.


// 7. [Firma de índice] `interface Scrobbles { [artista: string]: number }`.
//    Crea un objeto con 5 artistas de tu Last.fm y escribe `totalScrobbles(s: Scrobbles): number`.
//    Pista: Object.values.


// 8. [Firma de método + tipado estructural]
//    interface Reproductor { reproducir(cancion: string): string; parar(): void }
//    Crea un objeto literal que cumpla esa interface (puede recordar cuál es la canción actual).
//    Pruébalo con "Jackie Down the Line" o con "Falling" (el tema de Twin Peaks).
//    Pregunta: ¿tu objeto "declara" que implementa Reproductor? ¿Por qué TS lo acepta igualmente?


// 9. [Composición de tipos] Crea `interface Origen { ciudad: string; pais: string }` y un tipo de artista
//    que tenga `origen: Origen`. Con un array de 5 artistas
//    (Fontaines D.C. - Dublín, The Murder Capital - Dublín, Deftones - Sacramento,
//    Alice in Chains - Seattle, Radiohead - Abingdon), obtén las ciudades SIN repetir (Set).


// 10. [Tipo de retorno con `undefined`] Las películas de David Lynch.
//     Define `interface Pelicula { titulo: string; anio: number; duracionMin: number }`
//     (duraciones aproximadas, valen para practicar) y crea un array con:
//     Eraserhead (1977, 89), Blue Velvet (1986, 120), Lost Highway (1997, 134),
//     Mulholland Drive (2001, 147), Inland Empire (2006, 180).
//     Escribe `masLarga(peliculas: Pelicula[]): Pelicula | undefined`.
//     ¿Por qué el tipo de retorno incluye `undefined`? (Piensa en un array vacío.)
//     Después responde en un comentario: ¿cuándo usarías `type` en vez de `interface`?
//     Da dos ejemplos de código que SOLO se puedan escribir con type.
