// STRINGS, EXPRESIONES REGULARES, SET Y MAP (JavaScript puro)
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Inmutabilidad de los strings (immutable primitives)
//     Técnico: los strings son valores primitivos inmutables: ningún método los modifica, todos devuelven
//     un string NUEVO.  "  hola ".trim() devuelve "hola" y deja el original intacto.
//     Para tontos: un texto es como una frase grabada en piedra; para "cambiarla" tallas otra piedra.
//
// - Métodos de string habituales
//     trim, toUpperCase/toLowerCase, split(separador) -> array, join(separador) -> string, slice, includes,
//     padStart/padEnd (relleno para alinear), replace/replaceAll, normalize.
//
// - Plantilla de texto (template literal)
//     Técnico: `Hola ${nombre}` interpola expresiones en un string delimitado por acentos graves.
//
// - Expresión regular (regular expression, regex) y banderas (flags)
//     Técnico: patrón para buscar texto. /\d+/g = "una o más cifras", con la bandera `g` (global) = todas las
//     coincidencias.  "a1b22".match(/\d+/g) -> ["1", "22"]    /hola/.test("hola mundo") -> true
//     Para tontos: un buscador con comodines mucho más potente que Ctrl+F.
//
// - Normalización Unicode (NFD)
//     Técnico: "á" puede representarse como una letra o como "a" + una marca de acento. normalize("NFD")
//     las separa, y así se pueden quitar las marcas con una regex.
//
// - Set (conjunto)
//     Técnico: colección de valores ÚNICOS (sin repetidos) con búsqueda `has` muy rápida (tiempo constante
//     amortizado). new Set([1, 1, 2]) tiene 2 elementos. Operaciones de conjuntos: unión, intersección, diferencia.
//     Para tontos: una bolsa en la que no caben dos cosas iguales.
//
// - Map (diccionario clave-valor)
//     Técnico: como un objeto, pero admite claves de CUALQUIER tipo, conserva el orden de inserción y conoce
//     su tamaño con `.size`. API: set, get, has, delete.
//     Para tontos: una agenda: buscas por el nombre (clave) y te da el teléfono (valor).
//
// Ejecutar:  pnpm tsx 03_objetos_y_datos/02_strings_map_set.js

// ---------- STRINGS Y REGEX ----------

// 1. [split / trim / HOFs] `const frase = "  Fontaines D.C. suena a Dublín, Deftones a Sacramento y Lynch a Missoula  "`.
//    Quita los espacios sobrantes, pásala a minúsculas y cuenta cuántas palabras tiene.


// 2. [split + map + join] `capitalizar("twin peaks fire walk with me")` devuelve "Twin Peaks Fire Walk With Me".


// 3. [Normalización y comparación con la inversa] `esPalindromo(texto)` ignorando mayúsculas, espacios y signos:
//    "Anita lava la tina" -> true,  "Dábale arroz a la zorra el abad" -> true,  "Mulholland Drive" -> false.
//    (Cuidado con las tildes: "Dábale" ≠ "dabale" para JavaScript.)


// 4. [Regex o filter sobre caracteres] Cuenta las vocales de "Mulholland Drive" y de "Queens of the Stone Age".
//    Bonus: que "á" o "ü" cuenten como vocales
//    (pista: `texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "")` quita los acentos).


// 5. [slice + condicional] `truncar(texto, max)`: si el texto pasa de `max` caracteres, lo corta y añade "…".
//    Pruébalo con "Change (In the House of Flies)" y max = 15.


// 6. [padStart / padEnd + plantillas de texto] Con esta lista, imprime una tabla alineada:
//    const top = [["Fontaines D.C.", 5626], ["Deftones", 3696], ["Ethel Cain", 2978], ["The Murder Capital", 2413]]
//    1  Fontaines D.C. ........ 5626
//    (posición, nombre alineado a la izquierda, scrobbles alineados a la derecha)


// 7. [Regex] a) extrae todos los números de "Fontaines D.C.: 5,626 scrobbles; Deftones: 3,696 scrobbles"
//       y conviértelos en números de verdad (5626, 3696);
//    b) valida un nombre de usuario con `.test()`: entre 2 y 15 caracteres, empieza por letra y solo
//       tiene letras, números, "_" y "-" (regla de ejemplo). Prueba con "dani_90" y con "1dani!".


// ---------- SET Y MAP ----------

// 8. [Set para deduplicar] Quita los artistas duplicados de una lista, sin distinguir mayúsculas:
//    ["Deftones", "deftones", "Mitski", "MITSKI", "Ethel Cain"]  ->  3 artistas.


// 9. [Operaciones de conjuntos] Con dos Sets, calcula la intersección (lo que tienen en común) y la diferencia
//    (lo que está en A y no en B):
//    tú = ["Fontaines D.C.", "Deftones", "Radiohead", "Mitski", "Aphex Twin"]
//    otra persona = ["Radiohead", "Aphex Twin", "Boards of Canada", "David Bowie"]


// 10. [Map como contador de frecuencias] Con un Map, cuenta cuántas veces aparece cada artista en este historial
//     y muestra los 3 primeros:
//     const historial = ["Fontaines D.C.", "Deftones", "Fontaines D.C.", "Ethel Cain", "Deftones",
//                        "Fontaines D.C.", "Mitski", "Ethel Cain", "Fontaines D.C."]
//     Explica en un comentario cuándo usarías un Map y cuándo un objeto normal.
