// OBJETOS EN JAVASCRIPT (archivo .js: sin tipos, JavaScript puro)
//
// Desestructurar = desempaquetar una caja sacando solo lo que necesitas:
//   const { nombre, edad } = persona          // en vez de persona.nombre, persona.edad
//   const [primero, segundo] = lista
// Spread (...) = "esparcir" el contenido de un objeto o array dentro de otro nuevo:
//   const copia = { ...persona, edad: 31 }    // copia con la edad cambiada
//   const masUno = [...lista, 4]
// Rest (...) = "recoger el resto":  const [cabeza, ...cola] = lista
//
// Operadores útiles:
//   a?.b      si `a` es null/undefined, para y devuelve undefined (en vez de romper)
//   a ?? b    usa b SOLO si a es null/undefined
//   a || b    usa b si a es "falsy" (0, "", false, null, undefined...)
//
// Ejecutar:  pnpm tsx 03_objetos_y_datos/01_objetos.js     (o:  node 03_objetos_y_datos/01_objetos.js)

const usuario = {
    nombre: "Ana",
    edad: 28,
    direccion: { ciudad: "Madrid", cp: "28001" },
    aficiones: ["leer", "correr", "cocinar"],
};

// 1. Desestructura `nombre` y `edad` de `usuario` en una sola línea e imprímelos.


// 2. Desestructura la ciudad (anidada en direccion) renombrándola a `ciudadUsuario`,
//    y un campo `pais` que no existe, con valor por defecto "España".


// 3. Desestructura el array de aficiones: la primera en `primera` y el resto en `otras`.


// 4. Crea una copia de `usuario` con la edad a 29 SIN modificar el original (spread).
//    Comprueba con console.log que usuario.edad sigue siendo 28.


// 5. Copia superficial: tu copia del ejercicio 4 comparte `direccion` con el original.
//    Demuéstralo: cambia copia.direccion.ciudad y mira qué pasa en el original.
//    Después arréglalo con `structuredClone(usuario)`.


// 6. Dado `const notas = { mates: 7, lengua: 5, ingles: 9 }`, con Object.keys / values / entries obtén:
//    a) la lista de asignaturas,  b) la nota media,  c) la asignatura con mejor nota.


// 7. Con Object.fromEntries, devuelve un objeto NUEVO con las notas subidas 1 punto (máximo 10).


// 8. `const config = { tema: { color: "" }, idioma: null, intentos: 0 }`
//    a) Lee `config.tema.fuente.tamano` sin que el programa rompa (`fuente` no existe).
//    b) Obtén el idioma, con "es" por defecto, usando `??`.
//    c) Haz lo mismo con `config.intentos` y con `config.tema.color` usando `??` y luego usando `||`.
//       Explica en un comentario la diferencia entre ambos.


// 9. Claves dinámicas:
//    a) `crearObjeto(clave, valor)` devuelve `{ [clave]: valor }`.
//    b) `contarLetras("hola mundo")` devuelve un objeto con las veces que aparece cada letra (sin espacios).


// 10. Desestructura en los parámetros: `presentar({ nombre, edad = 18 })` devuelve "Ana tiene 28 años".
//     Llámala con y sin edad.


// RETO TS: copia este archivo a `01_objetos.ts` y ejecuta `pnpm tsc`.
// ¿Qué errores aparecen? Añade los tipos necesarios hasta que desaparezcan.
