// OBJETOS EN JAVASCRIPT (archivo .js: sin tipos, JavaScript puro)
//
// Desestructurar = desempaquetar una caja sacando solo lo que necesitas:
//   const { titulo, anio } = disco            // en vez de disco.titulo, disco.anio
//   const [primero, segundo] = lista
// Spread (...) = "esparcir" el contenido de un objeto o array dentro de otro nuevo:
//   const copia = { ...disco, anio: 2025 }    // copia con el año cambiado
//   const masUno = [...lista, "otro"]
// Rest (...) = "recoger el resto":  const [cabeza, ...cola] = lista
//
// Operadores útiles:
//   a?.b      si `a` es null/undefined, para y devuelve undefined (en vez de romper)
//   a ?? b    usa b SOLO si a es null/undefined
//   a || b    usa b si a es "falsy" (0, "", false, null, undefined...)
//
// Ejecutar:  pnpm tsx 03_objetos_y_datos/01_objetos.js     (o:  node 03_objetos_y_datos/01_objetos.js)

const artista = {
    nombre: "Fontaines D.C.",
    scrobbles: 5626,
    origen: { ciudad: "Dublín", pais: "Irlanda" },
    discos: ["Dogrel", "A Hero's Death", "Skinty Fia", "Romance"],
};

// 1. Desestructura `nombre` y `scrobbles` de `artista` en una sola línea e imprímelos.


// 2. Desestructura la ciudad (anidada en origen) renombrándola a `ciudadArtista`,
//    y un campo `sello` que no existe, con valor por defecto "independiente".


// 3. Desestructura el array de discos: el primero en `debut` y el resto en `siguientes`.


// 4. Crea una copia de `artista` con los scrobbles a 5700 SIN modificar el original (spread).
//    Comprueba con console.log que artista.scrobbles sigue siendo 5626.


// 5. Copia superficial: tu copia del ejercicio 4 comparte `origen` con el original.
//    Demuéstralo: cambia copia.origen.ciudad a "Londres" y mira qué pasa en el original.
//    Después arréglalo con `structuredClone(artista)`.


// 6. Dado
//      const scrobblesPorArtista = { "Fontaines D.C.": 5626, "Deftones": 3696, "Ethel Cain": 2978, "The Murder Capital": 2413 }
//    con Object.keys / values / entries obtén:
//    a) la lista de artistas,  b) el total de scrobbles,  c) el artista más escuchado.


// 7. Con Object.fromEntries, devuelve un objeto NUEVO con los scrobbles en miles,
//    redondeados a un decimal (5626 -> 5.6).


// 8. Una ficha de película con datos incompletos:
//      const ficha = { titulo: "Blue Velvet", detalles: { notaPersonal: "" }, secuela: null, vecesVista: 0 }
//    a) Lee `ficha.detalles.reparto.principal` sin que el programa rompa (`reparto` no existe).
//    b) Obtén la secuela, con "ninguna" por defecto, usando `??`.
//    c) Haz lo mismo con `ficha.vecesVista` y con `ficha.detalles.notaPersonal` usando `??` y luego usando `||`.
//       Explica en un comentario la diferencia entre ambos.


// 9. Claves dinámicas:
//    a) `crearObjeto(clave, valor)` devuelve `{ [clave]: valor }`. Pruébala con ("artista", "Deftones").
//    b) `contarLetras("twin peaks")` devuelve un objeto con las veces que aparece cada letra (sin espacios).


// 10. Desestructura en los parámetros: `presentarDisco({ titulo, artista, anio = "año desconocido" })`
//     devuelve "Skinty Fia - Fontaines D.C. (2022)". Llámala con y sin año
//     (por ejemplo, con un disco al que no le pongas año).


// RETO TS: copia este archivo a `01_objetos.ts` y ejecuta `pnpm tsc`.
// ¿Qué errores aparecen? Añade los tipos necesarios hasta que desaparezcan.
