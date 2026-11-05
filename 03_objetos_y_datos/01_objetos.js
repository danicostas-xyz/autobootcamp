// OBJETOS EN JAVASCRIPT (archivo .js: sin tipos, JavaScript puro)
// Desestructuración, spread/rest, copias (superficial y profunda), encadenamiento opcional y claves computadas.
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Asignación por desestructuración (destructuring assignment)
//     Técnico: sintaxis que extrae propiedades de un objeto o elementos de un array en variables:
//       const { titulo, anio } = disco        const [primero, segundo] = lista
//     Admite renombrado (alias) y valores por defecto:  const { titulo: t, sello = "independiente" } = disco
//     Para tontos: desempaquetar una caja sacando solo lo que necesitas.
//
// - Operador spread y parámetro rest (spread / rest)
//     Técnico: `...` tiene dos usos. Spread EXPANDE un iterable/objeto en otro literal: { ...disco, anio: 2025 }.
//     Rest RECOGE "el resto" en una variable: const [cabeza, ...cola] = lista.
//     Para tontos: spread = vaciar una caja sobre la mesa; rest = meter en una caja nueva lo que sobra.
//
// - Semántica de referencia (reference semantics), copia superficial (shallow copy) y profunda (deep copy)
//     Técnico: los objetos y arrays se asignan POR REFERENCIA. El spread hace una copia superficial: copia las
//     propiedades de primer nivel, pero los objetos anidados siguen compartidos. `structuredClone` hace
//     una copia profunda (copia también los anidados).
//     Para tontos: copiar una carpeta de accesos directos: la carpeta es nueva, pero los accesos
//     directos siguen apuntando a los mismos archivos.
//
// - Encadenamiento opcional (optional chaining) `a?.b`
//     Técnico: si `a` es null o undefined, la expresión se corta y vale undefined, en vez de lanzar TypeError.
//
// - Coalescencia nula (nullish coalescing) `a ?? b` frente a OR lógico `a || b`
//     Técnico: `??` usa b SOLO si a es null/undefined. `||` usa b si a es "falsy" (0, "", false, NaN, null, undefined),
//     lo que puede descartar valores legítimos como 0 o "".
//
// - Nombres de propiedad computados (computed property names)
//     Técnico: { [expresion]: valor } usa el RESULTADO de la expresión como nombre de la propiedad.
//
// - Object.keys / values / entries / fromEntries
//     Técnico: convierten un objeto en arrays de claves, valores o pares [clave, valor], y fromEntries hace
//     el camino inverso. Permiten usar las HOFs de Array (map, filter, reduce) sobre un objeto.
//
// Ejecutar:  pnpm tsx 03_objetos_y_datos/01_objetos.js     (o:  node 03_objetos_y_datos/01_objetos.js)

const artista = {
    nombre: "Fontaines D.C.",
    scrobbles: 5626,
    origen: { ciudad: "Dublín", pais: "Irlanda" },
    discos: ["Dogrel", "A Hero's Death", "Skinty Fia", "Romance"],
};

// 1. [Desestructuración de objeto] Extrae `nombre` y `scrobbles` de `artista` en una sola línea e imprímelos.


// 2. [Desestructuración anidada, alias y valor por defecto] Extrae la ciudad (anidada en origen)
//    renombrándola a `ciudadArtista`, y un campo `sello` que no existe, con valor por defecto "independiente".


// 3. [Desestructuración de array + rest] Extrae el array de discos: el primero en `debut` y el resto en `siguientes`.


// 4. [Spread: copia inmutable] Crea una copia de `artista` con los scrobbles a 5700 SIN modificar el original.
//    Comprueba con console.log que artista.scrobbles sigue siendo 5626.


// 5. [Copia superficial frente a profunda] Tu copia del ejercicio 4 comparte `origen` con el original.
//    Demuéstralo: cambia copia.origen.ciudad a "Londres" y mira qué pasa en el original (comparte referencia).
//    Después arréglalo con `structuredClone(artista)`.


// 6. [Object.keys / values / entries + HOFs] Dado
//      const scrobblesPorArtista = { "Fontaines D.C.": 5626, "Deftones": 3696, "Ethel Cain": 2978, "The Murder Capital": 2413 }
//    obtén:
//    a) la lista de artistas,  b) el total de scrobbles (reduce),  c) el artista más escuchado.


// 7. [Object.fromEntries] Devuelve un objeto NUEVO con los scrobbles en miles,
//    redondeados a un decimal (5626 -> 5.6). Pista: entries -> map -> fromEntries.


// 8. [Optional chaining y coalescencia nula] Una ficha de película con datos incompletos:
//      const ficha = { titulo: "Blue Velvet", detalles: { notaPersonal: "" }, secuela: null, vecesVista: 0 }
//    a) Lee `ficha.detalles.reparto.principal` sin que el programa rompa (`reparto` no existe).
//    b) Obtén la secuela, con "ninguna" por defecto, usando `??`.
//    c) Haz lo mismo con `ficha.vecesVista` y con `ficha.detalles.notaPersonal` usando `??` y luego usando `||`.
//       Explica en un comentario la diferencia entre ambos (valores falsy frente a nullish).


// 9. [Nombres de propiedad computados]
//    a) `crearObjeto(clave, valor)` devuelve `{ [clave]: valor }`. Pruébala con ("artista", "Deftones").
//    b) `contarLetras("twin peaks")` devuelve un objeto con las veces que aparece cada letra (sin espacios).


// 10. [Desestructuración en los parámetros] `presentarDisco({ titulo, artista, anio = "año desconocido" })`
//     devuelve "Skinty Fia - Fontaines D.C. (2022)". Llámala con y sin año.


// RETO TS: copia este archivo a `01_objetos.ts` y ejecuta `pnpm tsc`.
// ¿Qué errores aparecen? Añade los tipos necesarios hasta que desaparezcan.
