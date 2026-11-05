
// definición tipo
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

// 1. Obtén los títulos de los libros no leídos.
const librosNoLeidos = libros.filter(e => !e.leido)
// ❌ CORRECCIÓN 1: esto devuelve los LIBROS no leídos (objetos completos) y el ejercicio pedía los TÍTULOS.
//    Falta un .map para quedarte solo con el título, y falta imprimirlo:
//    const titulosNoLeidos = libros.filter(e => !e.leido).map(e => e.titulo)
//    console.log(titulosNoLeidos)

// 2. Calcula el total de páginas de los libros leídos.
// const totalPaginasLibrosLeidos = libros.reduce((acc,e) => {
//     if (e.leido) return acc + e.paginas
// },0)
// ❌ CORRECCIÓN 2 (sobre el reduce comentado): fallaba con razón. Cuando e.leido es false la función no devuelve
//    nada (undefined), y ese undefined pasa a ser el acc de la vuelta siguiente. tsc lo marca con
//    "No overload matches this call". Hay que devolver siempre un número:
//    const total = libros.reduce((acc, e) => e.leido ? acc + e.paginas : acc, 0)

// 2. Calcula el total de páginas de los libros leídos.
let totalPaginasLibrosLeidos = 0

libros.filter(e => e.leido).forEach(e => totalPaginasLibrosLeidos += e.paginas)
console.log(totalPaginasLibrosLeidos)
// ⚠️ CORRECCIÓN 2 (sobre la versión con forEach): el resultado es correcto, pero modificas una variable externa (let)
//    desde dentro de la función. Mejor que reduce devuelva el valor directamente, sin mutar nada:
//    const totalPaginasLeidos = libros
//      .filter(e => e.leido)
//      .reduce((acc, e) => acc + e.paginas, 0)

// 3. Escribe buscarPorTitulo(titulo), que devuelva el libro o undefined si no existe. Pruébala con "Dune" y con "Ulises". Después intenta leer .autor directamente del resultado, mira el error y arréglalo.

function buscarPorTitulo (titulo: string): Libro | undefined {
    return libros.filter(e => e.titulo == titulo)[0]
}
// ⚠️ CORRECCIÓN 3: funciona, pero hay herramientas más adecuadas:
//    - find devuelve el primer elemento que cumple, o undefined si no hay ninguno (justo lo que dice el tipo de retorno).
//      filter recorre todo el array y crea uno intermedio solo para quedarte con el [0].
//    - === en vez de == (compara sin conversiones de tipo).
//    return libros.find(e => e.titulo === titulo)

console.log(buscarPorTitulo("Dune")?.autor)
// ✅ Usar ?.autor es la solución correcta: si el resultado es undefined, se detiene y devuelve undefined en vez de romper.
// ❌ Falta probar el caso "Ulises" que pedía el ejercicio:
//    console.log(buscarPorTitulo("Ulises")?.autor) // undefined

// 4. Obtén los libros ordenados por páginas, de mayor a menor, sin modificar el array original. Comprueba que libros sigue igual.

const librosSorted = libros.toSorted((a, b) => -1)
console.log(librosSorted)
// ❌ CORRECCIÓN 4: (a, b) => -1 NO ordena por páginas: el comparador siempre responde "a va antes que b" sin mirar los datos.
//    Solo parece funcionar porque acaba invirtiendo el orden del array original (mira tu salida: 271, 544, 310, 255, 688).
//    Para ordenar de mayor a menor por páginas:
//    const librosSorted = libros.toSorted((a, b) => b.paginas - a.paginas)
//    (b.paginas - a.paginas es negativo si a tiene más páginas, así que a va primero. De menor a mayor: a.paginas - b.paginas)
// ❌ Falta comprobar que el original no ha cambiado, como pedía el enunciado:
//    console.log(libros.map(e => e.titulo))

// 5. Averigua si hay algún libro de más de 600 páginas y si todos tienen más de 200. Usa los métodos del bloque 4.

const bookMoreThan600Pages = libros.some(e => e.paginas > 600)
const everyBookMoreThan200 = libros.every(e => e.paginas > 200)
// ✅ EJERCICIO 5 correcto: some = "¿alguno cumple?", every = "¿todos cumplen?".

// ⚠️ CORRECCIÓN (impresión): .toString().replaceAll(",", "") quita TODAS las comas, también las que sean parte de los datos
//    (con un título como "a, b" saldría "a b"). Para unir elementos usa join, que no toca el contenido:
//    const lista = (l: Libro[]) => l.map(e => `* ${e.titulo} (${e.autor}) - ${e.paginas}`).join("\n")
//    console.log(lista(libros))
//    console.log(lista(librosSorted))
console.log(`
    ${everyBookMoreThan200 ? "Todos los libros tienen más de 200 páginas": "No todos los libros tienen más de 200 páginas"}, ${bookMoreThan600Pages ? "Hay un libro de más de 600 páginas" : "No hay ningún libro de más de 600 páginas."}.\n
    - Lista de libros: \n
    ${libros.map(e => `* ${e.titulo} (${e.autor}) - ${e.paginas} \n`).toString().replaceAll("\,","")} \n
    - Ordenados por número de páginas:
    ${librosSorted.map(e => `* ${e.titulo} (${e.autor}) - ${e.paginas}\n`).toString().replaceAll("\,","")} \n
    `)