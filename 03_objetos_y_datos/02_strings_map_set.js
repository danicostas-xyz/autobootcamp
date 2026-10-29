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

// 1. `const frase = "  El veloz murciélago hindú comía feliz cardillo y kiwi  "`.
//    Quita los espacios sobrantes, pásala a minúsculas y cuenta cuántas palabras tiene.


// 2. `capitalizar("hola mundo cruel")` devuelve "Hola Mundo Cruel".


// 3. `esPalindromo(texto)` ignorando mayúsculas, espacios y signos:
//    "Anita lava la tina" -> true,  "Hola" -> false.


// 4. Cuenta las vocales de un texto. Bonus: que "á" o "ü" cuenten como vocales
//    (pista: `texto.normalize("NFD").replace(/[̀-ͯ]/g, "")` quita los acentos).


// 5. `truncar(texto, max)`: si el texto pasa de `max` caracteres, lo corta y añade "…".


// 6. Con esta lista, imprime una tabla alineada usando padEnd y padStart:
//    const productos = [["Teclado", 45], ["Ratón", 20], ["Monitor", 180]]
//    Teclado ......  45 €


// 7. Regex:
//    a) extrae todos los números de "Pedido 123, 45 unidades, total 1999 euros";
//    b) valida un email sencillo con `.test()` (prueba con "ana@x.com" y "ana@x").


// ---------- SET Y MAP ----------

// 8. Quita los emails duplicados de una lista, sin distinguir mayúsculas:
//    ["Ana@x.com", "ana@x.com", "luis@x.com"]  ->  2 emails.


// 9. Con dos Sets, calcula la intersección (lo que tienen en común) y la diferencia (lo que está en A y no en B).


// 10. Con un Map, cuenta la frecuencia de cada palabra de un texto y muestra las 3 más frecuentes.
//     Explica en un comentario cuándo usarías un Map y cuándo un objeto normal.
