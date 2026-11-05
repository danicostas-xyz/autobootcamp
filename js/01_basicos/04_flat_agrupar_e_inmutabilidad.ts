// BLOQUE 6: aplanar, agrupar y no mutar
//
// Herramientas nuevas (con ejemplos que NO son los de los ejercicios):
// - flat(): "desenvuelve" arrays anidados. [[1], [2, 3]].flat() da [1, 2, 3]
// - flatMap(fn): es un map seguido de un flat(). Útil cuando cada elemento se transforma en VARIOS elementos.
// - Record<string, X>: un diccionario. Una caja con etiquetas (las claves, que son texto) donde cada etiqueta guarda un X.
//     const edades: Record<string, number> = { ana: 30, luis: 25 }  ->  edades["ana"] es 30
// - reduce<T>(...): cuando el valor inicial es {}, TS no sabe qué contendrá. Se lo dices con el genérico:
//     reduce<Record<string, number>>((acc, x) => ..., {})
// - Inmutabilidad: no cambias el array u objeto original, creas uno nuevo. Para eso sirve el spread:
//     [...lista, extra]            copia un array y le añade un elemento
//     { ...obj, campo: nuevo }     copia un objeto cambiando solo ese campo

type Libro = {
    titulo: string,
    autor: string,
    paginas: number,
    leido: boolean,
    genero: string
}

const libros: Libro[] = [
  { titulo: "Dune", autor: "Frank Herbert", paginas: 688, leido: true, genero: "ciencia ficción" },
  { titulo: "Fundación", autor: "Isaac Asimov", paginas: 255, leido: false, genero: "ciencia ficción" },
  { titulo: "El Hobbit", autor: "J. R. R. Tolkien", paginas: 310, leido: true, genero: "fantasía" },
  { titulo: "Mistborn", autor: "Brandon Sanderson", paginas: 544, leido: false, genero: "fantasía" },
  { titulo: "Neuromante", autor: "William Gibson", paginas: 271, leido: false, genero: "ciencia ficción" },
];

// 6. Aplana [["a", "b"], ["c"], []] para obtener ["a", "b", "c"].

const arrayA = [["a", "b", ["z", "y"]], ["c"], []]
const arrayB = arrayA.flat(3)

// console.log(arrayB)
// ✅ EJERCICIO 6: funciona, pero has cambiado el enunciado. Pedía aplanar [["a", "b"], ["c"], []] y tú has
//    metido un nivel extra (["z", "y"]). Está bien para experimentar: `flat(n)` aplana n niveles (por defecto, 1).
//    Tu array tiene 2 niveles de anidación, así que flat(2) ya basta; flat(3) funciona igual. Si no sabes la
//    profundidad, flat(Infinity) lo aplana todo.
//    Con el array del enunciado:   [["a", "b"], ["c"], []].flat()   ->   ["a", "b", "c"]   (el [] vacío desaparece).
//    Descomenta el console.log para ver el resultado.

// 7. Dado ["rojo,verde", "azul", "negro,blanco,gris"], obtén un array con todos los colores sueltos.

const colores = ["rojo,verde", "azul", "negro,blanco,gris"]
const coloresSueltos = colores.flatMap(e => e.split(","))
// que es lo mismo que hacer
// console.log(colores.map(e => e.split(",")).flat(1))

// console.log(colores)
// console.log(coloresSueltos)
// ✅ EJERCICIO 7: correcto, y la equivalencia que has escrito (map + flat(1)) es exacta.
//    Detalle: flatMap solo aplana UN nivel, igual que flat(1); no admite profundidad.
//    Descomenta los console.log para comprobar el resultado.

// 8. Con reduce, agrupa los libros por género para obtener { "ciencia ficción": [...], "fantasía": [...] }.
//    El tipo del resultado es Record<string, Libro[]>.

const librosAgrupadosPorGenero : Record<string, Libro[]> = libros.reduce<Record<string,Libro[]>>((acc,libro) => {
  return {
    ...acc,
    [libro.genero]: [...(acc[libro.genero] ?? []), libro]
  }

}, {})

// console.log(librosAgrupadosPorGenero)

// const a: Record<string, Libro[]> = libros.reduce((acc,e) => )
// ❓ AYUDA EJERCICIO 8 (agrupar con reduce)
//
// Primero la idea, sin código. Piensa en `reduce` como una HUCHA (`acc`) que empieza vacía y a la que cada libro
// le añade algo. Aquí la hucha es un diccionario: una caja con una etiqueta por género. Empieza vacía: {}
//
// Lo que tiene `acc` DESPUÉS de procesar cada libro:
//   Dune (ciencia ficción)       { "ciencia ficción": [Dune] }
//   Fundación (ciencia ficción)  { "ciencia ficción": [Dune, Fundación] }
//   El Hobbit (fantasía)         { "ciencia ficción": [Dune, Fundación], "fantasía": [El Hobbit] }
//   ... y así hasta el último.
//
// En cada vuelta hay que hacer TRES cosas:
//   a) mirar la etiqueta del libro:                                        e.genero
//   b) coger lo que ya hay en esa etiqueta (o [] si es la primera vez):    acc[e.genero] ?? []
//   c) devolver una hucha NUEVA con esa etiqueta actualizada: la lista de antes + el libro nuevo.
//
// Las piezas que te faltaban:
//   - Clave dinámica: { [e.genero]: valor } crea un objeto cuya clave es el CONTENIDO de e.genero ("fantasía"),
//     no la palabra "genero". Los corchetes significan "usa el valor de esto como nombre de la clave".
//   - `??` significa "si lo de la izquierda es undefined, usa lo de la derecha". La primera vez que aparece un
//     género, acc[e.genero] es undefined, así que usamos [].
//   - Spread: { ...acc, [clave]: nuevo } copia todo lo que había en acc y sobrescribe solo esa clave.
//
// Inténtalo primero tú con estas piezas. Solución para comparar:
//   const librosAgrupados = libros.reduce<Record<string, Libro[]>>((acc, e) => {
//     return { ...acc, [e.genero]: [...(acc[e.genero] ?? []), e] }
//   }, {})
//   // resultado: { "ciencia ficción": [Dune, Fundación, Neuromante], "fantasía": [El Hobbit, Mistborn] }
//
// Cómo leer la línea del return, de dentro hacia fuera:
//   acc[e.genero] ?? []              lo que ya había en ese género (o vacío)
//   [...(eso), e]                    copia de esa lista + el libro nuevo
//   { ...acc, [e.genero]: (eso) }    hucha nueva con ese género actualizado y los demás intactos
//
// Variante equivalente que muta `acc` (es válido porque `acc` lo has creado tú dentro del reduce y no es el
// array original, pero para React conviene acostumbrarse a la versión inmutable de arriba):
//   libros.reduce<Record<string, Libro[]>>((acc, e) => { (acc[e.genero] ??= []).push(e); return acc }, {})
//   (`??=` significa "asigna solo si ahora es undefined").


// 9. Con reduce, cuenta cuántos libros hay por género: { "ciencia ficción": 3, "fantasía": 2 }.
//    Esta vez el tipo es Record<string, number>

const librosPorGenero: Record<string, number> = libros.reduce<Record<string, number>>((acc, libro) => {
  return {...acc, [libro.genero]: (acc[libro.genero] ?? 0)+1}
}, {})

// console.log(librosPorGenero)

// console.log(librosPorGenero)
// ❌ CORRECCIÓN EJERCICIO 9: hay tres problemas en tu intento.
//
// 1. `return {...acc, e}`: `e` suelto es una abreviatura de `e: e`, así que crea una clave llamada "e" cuyo valor
//    es el libro entero. Por eso tsc da error ("Type 'Libro' is not assignable to type 'number'") y por eso, al
//    ejecutarlo, sale `{ "ciencia ficción": 3, e: { ...Neuromante } }`: en cada vuelta se sobrescribe la misma
//    clave "e" y solo sobrevive el último libro. Lo que necesitas es una clave DINÁMICA con el género: [e.genero]
//    (mira la ayuda del ejercicio 8).
// 2. El valor inicial `{"ciencia ficción": 3}` es la respuesta del enunciado escrita a mano. El reduce debe
//    CALCULARLA, así que tiene que empezar vacío: {}
// 3. El valor de cada clave debe ser un NÚMERO (el contador), no el libro: lo que había antes + 1.
//
// Es el mismo patrón del 8, pero en vez de acumular una lista acumulas un número. Solución para comparar:
//   const librosPorGenero: Record<string, number> = libros.reduce<Record<string, number>>((acc, e) => {
//     return { ...acc, [e.genero]: (acc[e.genero] ?? 0) + 1 }
//   }, {})
//   // resultado: { "ciencia ficción": 3, "fantasía": 2 }
//
// Lo que tiene `acc` tras cada libro:
//   Dune         { "ciencia ficción": 1 }
//   Fundación    { "ciencia ficción": 2 }
//   El Hobbit    { "ciencia ficción": 2, "fantasía": 1 }
//   Mistborn     { "ciencia ficción": 2, "fantasía": 2 }
//   Neuromante   { "ciencia ficción": 3, "fantasía": 2 }
// Nota: `pnpm tsc` seguirá dando error en tu archivo mientras no corrijas este ejercicio.


// 10. Sin modificar libros ni sus objetos:
//     - Crea un array nuevo con un libro más.
//     - Crea otro array donde "Fundación" aparezca como leído y todo lo demás quede igual.
//     Comprueba al final con console.log que el array original no ha cambiado.

const libros2 = [...libros, {
  titulo: "Ensayo sobre la ceguera", autor: "José Saramago", paginas: 370, leido: true, genero: "ciencia ficción social"
}]
// ✅ EJERCICIO 10 (primera parte): correcto. `[...libros, nuevo]` crea un array nuevo y `libros` no cambia.
// ⚠️ Mejora: `libros2` no lleva tipo. Anótalo (`const libros2: Libro[] = ...`) y TS comprobará que el libro nuevo
//    tiene todos los campos con el tipo correcto (si te olvidas de `leido`, te avisa).
// console.log(libros2)

const libros3: Libro[] = libros.map(e => {
  return (e.titulo == "Fundación") ? {...e, leido: true} : e
})
// ✅ EJERCICIO 10 (segunda parte): correcto. `{ ...e, leido: true }` copia el libro cambiando solo `leido`, y el
//    resto de libros se devuelven tal cual (comparten la misma referencia que en `libros`, y está bien porque
//    no los has modificado).
// ⚠️ Usa `===` en vez de `==` (compara sin conversiones de tipo). Además puedes quitar las llaves y el `return`:
//    libros.map(e => e.titulo === "Fundación" ? { ...e, leido: true } : e)

// console.log(libros3)
// console.log(libros)
// ❌ Falta lo que pedía el enunciado: "Comprueba al final con console.log que el array original no ha cambiado".
//    Tienes los console.log comentados. Descoméntalos y añade comprobaciones más claras, por ejemplo:
//      console.log(libros.length, libros2.length)                   // 5 y 6
//      console.log(libros[1].leido, libros3[1].leido)               // false y true
//      console.log(libros === libros3, libros[0] === libros3[0])    // false (array nuevo) y true (mismo objeto, no se tocó)

