// INMUTABILIDAD Y REDUCER (la base de useState y useReducer)
//
// React NO mira el interior de tus datos: solo comprueba si la REFERENCIA cambió (===).
// Analogía: React es un cartero que solo mira la dirección de la casa. Si reformas la casa por dentro
// pero la dirección es la misma, el cartero no se entera de nada. Para que "se entere", tienes que
// entregarle una casa nueva con otra dirección: un objeto o array NUEVO, no el mismo modificado.
//   MAL:  lista.push(x)                BIEN:  const nueva = [...lista, x]
//   MAL:  obj.edad = 30                BIEN:  const nuevo = { ...obj, edad: 30 }
//
// Reducer = una función PURA que recibe el estado actual y una acción, y devuelve el estado NUEVO:
//   (estado, accion) => nuevoEstado
// Es exactamente lo que le pasas a `useReducer` en React.
//
// Una acción es un objeto que describe QUÉ pasó (no cómo cambiar el estado), por ejemplo
//   { tipo: "sumar", cantidad: 5 }
// y se tipa como unión discriminada (mira 02_funciones_y_tipos/03_uniones_y_narrowing.ts).
//
// Comprobar los tipos: pnpm tsc      Ejecutar: pnpm tsx 06_hacia_react/01_inmutabilidad_y_reducer.ts

type Tarea = { id: number; texto: string; hecha: boolean };
type Filtro = "todas" | "pendientes" | "hechas";
type Estado = { tareas: Tarea[]; filtro: Filtro };

const tareasIniciales: Tarea[] = [
    { id: 1, texto: "Aprender TypeScript", hecha: true },
    { id: 2, texto: "Hacer los ejercicios", hecha: false },
    { id: 3, texto: "Montar un portfolio", hecha: false },
];

// 1. Actualizaciones inmutables sobre `tareasIniciales` (sin modificarla):
//    a) añadir una tarea,  b) borrar una por id,  c) alternar `hecha` de una por id,  d) editar el texto de una.
//    Después de cada una comprueba con `===` que el array nuevo NO es el original
//    y que `tareasIniciales` conserva su contenido.


// 2. Actualización anidada:
//    type Perfil = { nombre: string; direccion: { ciudad: string; cp: string }; etiquetas: string[] }
//    Cambia la ciudad creando un perfil nuevo. Comprueba que:
//      - nuevo.direccion !== original.direccion   (la ruta que cambió es nueva)
//      - nuevo.etiquetas === original.etiquetas   (lo que no cambió se COMPARTE, no se copia)
//    Explica en un comentario por qué compartir lo que no cambió es lo correcto.


// 3. Marca el estado como solo lectura: `Readonly<Estado>` y `readonly Tarea[]`.
//    Intenta hacer `estado.tareas.push(...)` y lee el error de tsc.


// 4. Define `type Accion` como unión discriminada con estas acciones:
//    añadir (con `texto`), alternar (con `id`), borrar (con `id`) y cambiarFiltro (con `filtro`).


// 5. Escribe `reducer(estado: Estado, accion: Accion): Estado` con un `switch (accion.tipo)` exhaustivo
//    (usa el truco del `never` en el default). Cada caso devuelve un estado NUEVO.
//    Para el id de las tareas nuevas, usa el máximo id actual + 1.


// 6. Aplica una secuencia de acciones con `reduce` y muestra el estado final:
//    const acciones: Accion[] = [ ...tus acciones... ]
//    const estadoFinal = acciones.reduce(reducer, estadoInicial)


// 7. Selectores (funciones que "leen" del estado):
//    `tareasVisibles(estado: Estado): Tarea[]` según el filtro, y `contarPendientes(estado: Estado): number`.


// 8. Mini store, con closures y genéricos:
//    `crearStore<E, A>(reducer: (e: E, a: A) => E, inicial: E)` devuelve un objeto con
//    `getState()`, `dispatch(accion)` y `subscribe(fn)` (llama a `fn` cada vez que cambia el estado).
//    Úsalo con tu reducer y comprueba que el suscriptor se entera de cada cambio.


// 9. Reto: añade la acción "deshacer". Pista: guarda el historial de estados anteriores.
//    ¿Por qué la inmutabilidad hace esto casi trivial?
