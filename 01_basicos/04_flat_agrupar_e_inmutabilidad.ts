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


// 7. Dado ["rojo,verde", "azul", "negro,blanco,gris"], obtén un array con todos los colores sueltos.
//    Pista: "a,b".split(",") da ["a", "b"].


// 8. Con reduce, agrupa los libros por género para obtener { "ciencia ficción": [...], "fantasía": [...] }.
//    El tipo del resultado es Record<string, Libro[]>.


// 9. Con reduce, cuenta cuántos libros hay por género: { "ciencia ficción": 3, "fantasía": 2 }.
//    Esta vez el tipo es Record<string, number>.


// 10. Sin modificar libros ni sus objetos:
//     - Crea un array nuevo con un libro más.
//     - Crea otro array donde "Fundación" aparezca como leído y todo lo demás quede igual.
//     Comprueba al final con console.log que el array original no ha cambiado.

