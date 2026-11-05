// INMUTABILIDAD, REDUCER Y STORE (la base de useState y useReducer)
//
// VOCABULARIO (término técnico, y debajo, lo mismo "para tontos")
//
// - Inmutabilidad (immutability)
//     Técnico: no modificar un valor existente; crear uno NUEVO con los cambios.
//       MAL (mutación):  lista.push(x)              BIEN:  const nueva = [...lista, x]
//       MAL (mutación):  disco.anio = 2025          BIEN:  const nuevo = { ...disco, anio: 2025 }
//     Para tontos: en vez de tachar y corregir el papel original, fotocopias el papel con el cambio puesto.
//
// - Igualdad referencial (referential equality, ===) y detección de cambios
//     Técnico: para objetos y arrays, `===` compara la DIRECCIÓN en memoria (la referencia), no el contenido.
//     React decide si re-renderizar comparando referencias: si mutas el objeto, la referencia es la misma y React
//     "no ve" el cambio.
//     Para tontos: React es un cartero que solo mira la dirección de la casa. Si reformas la casa por dentro
//     pero la dirección es la misma, el cartero no se entera. Hay que entregarle una casa NUEVA, con otra dirección.
//
// - Compartición estructural (structural sharing)
//     Técnico: al crear la copia, las partes que NO cambian se reutilizan (misma referencia) y solo se crean
//     nuevas las del camino que cambió. Es barato y permite saber qué parte cambió comparando referencias.
//
// - Reducer (función reductora) y función pura
//     Técnico: función PURA con la forma (estado, acción) => nuevoEstado: sin efectos secundarios y con la misma
//     salida para la misma entrada. Es exactamente lo que le pasas a `useReducer` y también el mismo patrón que `Array.reduce`.
//
// - Acción (action) y unión discriminada
//     Técnico: objeto que describe QUÉ pasó (no cómo cambiar el estado), p. ej. { tipo: "sumar", cantidad: 5 }.
//     Se tipa como unión discriminada (mira 02_funciones_y_tipos/03_uniones_y_narrowing.ts), y `switch (accion.tipo)`
//     estrecha el tipo en cada caso. El truco del `never` en el default garantiza exhaustividad.
//
// - Selector (selector)
//     Técnico: función pura que DERIVA datos del estado (p. ej. las canciones visibles según el filtro) sin
//     guardarlos duplicados en el estado.
//
// - Store, despacho (dispatch) y patrón observador (observer / pub-sub)
//     Técnico: un store guarda el estado en un closure, expone getState(), dispatch(accion) (aplica el reducer) y
//     subscribe(fn) (registra un observador al que avisa en cada cambio). subscribe devuelve una función
//     para darse de baja (unsubscribe), un patrón que verás en useEffect.
//     Para tontos: la tienda de discos apunta quién quiere que le avisen cuando llegue novedad.
//
// - Solo lectura en tipos (readonly, Readonly<T>)
//     Técnico: marca propiedades como no asignables EN TIEMPO DE COMPILACIÓN (no congela el objeto en ejecución).
//
// Comprobar los tipos: pnpm tsc      Ejecutar: pnpm tsx 06_hacia_react/01_inmutabilidad_y_reducer.ts
//
// Aquí el estado es una playlist con canciones de las bandas sonoras de David Lynch y de tus grupos.

type Cancion = { id: number; titulo: string; artista: string; favorita: boolean };
type Filtro = "todas" | "favoritas" | "noFavoritas";
type Estado = { canciones: Cancion[]; filtro: Filtro };

const cancionesIniciales: Cancion[] = [
    { id: 1, titulo: "Falling", artista: "Julee Cruise", favorita: true },          // Twin Peaks
    { id: 2, titulo: "In Dreams", artista: "Roy Orbison", favorita: false },        // Blue Velvet
    { id: 3, titulo: "Wicked Game", artista: "Chris Isaak", favorita: false },      // Wild at Heart
    { id: 4, titulo: "Starburster", artista: "Fontaines D.C.", favorita: true },
];

// 1. [Actualizaciones inmutables de arrays] Sobre `cancionesIniciales` (sin modificarla):
//    a) añadir una canción,  b) borrar una por id,  c) alternar `favorita` de una por id,  d) editar el título de una.
//    (Pista: spread, filter y map; ninguno de ellos muta.)
//    Después de cada una comprueba con `===` que el array nuevo NO es el original
//    y que `cancionesIniciales` conserva su contenido.


// 2. [Actualización anidada y compartición estructural]
//    type PerfilLastFm = { usuario: string; topArtista: { nombre: string; scrobbles: number }; generos: string[] }
//    Crea un perfil (top artista: Fontaines D.C., 5626) y cambia el top artista a Deftones (3696)
//    creando un perfil nuevo. Comprueba que:
//      - nuevo.topArtista !== original.topArtista   (la ruta que cambió es nueva)
//      - nuevo.generos === original.generos         (lo que no cambió se COMPARTE, no se copia)
//    Explica en un comentario por qué compartir lo que no cambió es lo correcto.


// 3. [readonly en tipos] Marca el estado como solo lectura: `Readonly<Estado>` y `readonly Cancion[]`.
//    Intenta hacer `estado.canciones.push(...)` y lee el error de tsc.
//    ¿Impide `readonly` mutar en ejecución, o solo en compilación?


// 4. [Unión discriminada de acciones] Define `type Accion` con estas acciones:
//    añadir (con `titulo` y `artista`), alternarFavorita (con `id`), quitar (con `id`) y cambiarFiltro (con `filtro`).


// 5. [Reducer puro + exhaustividad con never] Escribe `reducer(estado: Estado, accion: Accion): Estado`
//    con un `switch (accion.tipo)` exhaustivo (usa el truco del `never` en el default).
//    Cada caso devuelve un estado NUEVO. Para el id de las canciones nuevas, usa el máximo id actual + 1.


// 6. [Reducer + Array.reduce] Aplica una secuencia de acciones con `reduce` y muestra el estado final:
//    const acciones: Accion[] = [ ...tus acciones... ]
//    const estadoFinal = acciones.reduce(reducer, estadoInicial)
//    (Es la misma idea que useReducer: un fold de acciones sobre un estado inicial.)


// 7. [Selectores] Funciones que "leen" y derivan datos del estado sin modificarlo:
//    `cancionesVisibles(estado: Estado): Cancion[]` según el filtro, y `contarFavoritas(estado: Estado): number`.
//    ¿Por qué es mejor derivar las "visibles" que guardarlas también en el estado?


// 8. [Store con closure, genéricos y patrón observador] `crearStore<E, A>(reducer: (e: E, a: A) => E, inicial: E)`
//    devuelve un objeto con `getState()`, `dispatch(accion)` y `subscribe(fn)` (llama a `fn` cada vez que
//    cambia el estado y devuelve una función para darse de baja). El estado vive en un closure.
//    Úsalo con tu reducer y comprueba que el suscriptor se entera de cada cambio, y que tras darse de baja ya no.


// 9. Reto: añade la acción "deshacer". Pista: guarda el historial de estados anteriores.
//    ¿Por qué la inmutabilidad hace esto casi trivial? (Pista: ¿qué pasa con los estados viejos si nunca se mutan?)
