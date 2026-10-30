// STRINGS, MAP Y SET (JavaScript puro)
//
// Los strings son INMUTABLES: sus métodos no modifican el texto, devuelven uno nuevo.
//   "  hola ".trim()  "Hola".toUpperCase()  "a,b".split(",")  ["a","b"].join("-")
//   "hola".slice(1)  "hola".padStart(6, "*")  "hola".includes("ol")  "aaa".replaceAll("a", "b")
//
// Set = colección SIN repetidos.   new Set([1, 1, 2]) tiene 2 elementos.
// Map = diccionario con claves de cualquier tipo, que recuerda el orden de inserción y conoce su tamaño.
//   const m = new Map(); m.set("a", 1); m.get("a"); m.has("a"); m.size
//
// Regex básicos (expresiones regulares):  /\d+/g  = "uno o más dígitos, todas las veces"
//   "a1b22".match(/\d+/g)  ->  ["1", "22"]        /hola/.test("hola mundo")  ->  true
//
// Ejecutar:  pnpm tsx 03_objetos_y_datos/02_strings_map_set.js

// ---------- STRINGS ----------

// 1. `const frase = "  Fontaines D.C. suena a Dublín, Deftones a Sacramento y Lynch a Missoula  "`.
//    Quita los espacios sobrantes, pásala a minúsculas y cuenta cuántas palabras tiene.


// 2. `capitalizar("twin peaks fire walk with me")` devuelve "Twin Peaks Fire Walk With Me".


// 3. `esPalindromo(texto)` ignorando mayúsculas, espacios y signos:
//    "Anita lava la tina" -> true,  "Dábale arroz a la zorra el abad" -> true,  "Mulholland Drive" -> false.
//    (Cuidado con las tildes: "Dábale" ≠ "dabale" para JavaScript.)


// 4. Cuenta las vocales de "Mulholland Drive" y de "Queens of the Stone Age".
//    Bonus: que "á" o "ü" cuenten como vocales
//    (pista: `texto.normalize("NFD").replace(/[̀-ͯ]/g, "")` quita los acentos).


// 5. `truncar(texto, max)`: si el texto pasa de `max` caracteres, lo corta y añade "…".
//    Pruébalo con "Change (In the House of Flies)" y max = 15.


// 6. Con esta lista, imprime una tabla alineada usando padEnd y padStart:
//    const top = [["Fontaines D.C.", 5626], ["Deftones", 3696], ["Ethel Cain", 2978], ["The Murder Capital", 2413]]
//    1  Fontaines D.C. ........ 5626
//    (posición, nombre alineado a la izquierda, scrobbles alineados a la derecha)


// 7. Regex:
//    a) extrae todos los números de "Fontaines D.C.: 5,626 scrobbles; Deftones: 3,696 scrobbles"
//       y conviértelos en números de verdad (5626, 3696);
//    b) valida un nombre de usuario con `.test()`: entre 2 y 15 caracteres, empieza por letra y solo
//       tiene letras, números, "_" y "-" (regla de ejemplo). Prueba con "dani_90" y con "1dani!".


// ---------- SET Y MAP ----------

// 8. Quita los artistas duplicados de una lista, sin distinguir mayúsculas:
//    ["Deftones", "deftones", "Mitski", "MITSKI", "Ethel Cain"]  ->  3 artistas.


// 9. Con dos Sets, calcula la intersección (lo que tienen en común) y la diferencia (lo que está en A y no en B):
//    tú = ["Fontaines D.C.", "Deftones", "Radiohead", "Mitski", "Aphex Twin"]
//    otra persona = ["Radiohead", "Aphex Twin", "Boards of Canada", "David Bowie"]


// 10. Con un Map, cuenta cuántas veces aparece cada artista en este historial y muestra los 3 primeros:
//     const historial = ["Fontaines D.C.", "Deftones", "Fontaines D.C.", "Ethel Cain", "Deftones",
//                        "Fontaines D.C.", "Mitski", "Ethel Cain", "Fontaines D.C."]
//     Explica en un comentario cuándo usarías un Map y cuándo un objeto normal.
