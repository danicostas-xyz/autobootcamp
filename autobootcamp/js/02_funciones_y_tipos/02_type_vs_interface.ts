// INTERFACE FRENTE A TYPE
//
// Los dos describen la FORMA de un objeto (qué campos tiene y de qué tipo):
//   type Disco = { titulo: string; anio: number }
//   interface Disco { titulo: string; anio: number }
// En el 95 % de los casos da igual cuál uses. Diferencias prácticas:
//   - interface se puede "extender" (extends) y "reabrir" (declarar dos veces el mismo nombre y se fusionan).
//   - type puede describir cosas que interface no: uniones (string | number), tuplas, alias de primitivos.
//   - Regla de la casa: interface para objetos, props de componentes y clases; type para uniones y utilidades.
//
// Modificadores de campo:
//   `?` = opcional (puede faltar).   `readonly` = solo lectura (no se puede reasignar).
//
// Extender:
//   con interface:  interface Album extends Disco { pistas: number }
//   con type:       type Album = Disco & { pistas: number }      // `&` = "y además"
//
// Index signature (diccionario con claves desconocidas):  { [clave: string]: number }
//
// Comprobar los tipos: pnpm tsc


// 1. Define `interface Artista { id: number; nombre: string; scrobbles: number }`.
//    Crea un array con 3 artistas de tu Last.fm (Fontaines D.C. 5626, Deftones 3696, Ethel Cain 2978).


// 2. Añade a Artista un campo opcional `sello?: string` (por ejemplo "Partisan Records" para Fontaines D.C.).
//    Crea un artista con sello y otro sin él.
//    Escribe `ficha(a: Artista): string` que devuelva "Fontaines D.C. - Partisan Records" o "Deftones - sin sello".
//    Pista: `??` o un if.


// 3. Marca `id` como `readonly`. Intenta modificarlo (`artista.id = 99`) y lee el error de tsc.


// 4. Crea `interface Banda extends Artista { miembros: string[] }`.
//    Crea Fontaines D.C. con sus miembros (Grian Chatten, Carlos O'Connell, Conor Curley, Conor Deegan III, Tom Coll)
//    y escribe `describir(b: Banda): string` ("Fontaines D.C. (5626 scrobbles) - 5 miembros: Grian Chatten, ...").


// 5. Haz lo mismo que el 4 pero con `type` y la intersección `&`: `type BandaT = Artista & { miembros: string[] }`.
//    ¿Notas alguna diferencia al usarlo?


// 6. Declaration merging: declara DOS veces `interface Cancion` (una con `titulo` y `artista`,
//    otra con `anio` y `album`) y crea un objeto que tenga los campos de ambas
//    (por ejemplo "Starburster", Fontaines D.C., 2024, "Romance").
//    Intenta lo mismo con `type Cancion2` (dos veces) y lee el error.


// 7. Index signature: `interface Scrobbles { [artista: string]: number }`.
//    Crea un objeto con 5 artistas de tu Last.fm y escribe `totalScrobbles(s: Scrobbles): number`.
//    Pista: Object.values.


// 8. Funciones dentro de una interface:
//    interface Reproductor { reproducir(cancion: string): string; parar(): void }
//    Crea un objeto que cumpla esa interface (puede recordar cuál es la canción actual).
//    Pruébalo con "Jackie Down the Line" o con "Falling" (el tema de Twin Peaks).


// 9. Composición: crea `interface Origen { ciudad: string; pais: string }` y un tipo de artista
//    que tenga `origen: Origen`. Con un array de 5 artistas
//    (Fontaines D.C. - Dublín, The Murder Capital - Dublín, Deftones - Sacramento,
//    Alice in Chains - Seattle, Radiohead - Abingdon), obtén las ciudades SIN repetir (Set).


// 10. Las películas de David Lynch. Define `interface Pelicula { titulo: string; anio: number; duracionMin: number }`
//     (duraciones aproximadas, valen para practicar) y crea un array con:
//     Eraserhead (1977, 89), Blue Velvet (1986, 120), Lost Highway (1997, 134),
//     Mulholland Drive (2001, 147), Inland Empire (2006, 180).
//     Escribe `masLarga(peliculas: Pelicula[]): Pelicula | undefined`.
//     ¿Por qué el tipo de retorno incluye `undefined`?
//     Después responde en un comentario: ¿cuándo usarías `type` en vez de `interface`?
//     Da dos ejemplos de código que SOLO se puedan escribir con type.
