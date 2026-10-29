// GENÉRICOS
//
// Un genérico <T> es un HUECO para un tipo, que se rellena cuando usas la función.
// Analogía: una caja con una etiqueta intercambiable: "Caja de ___".
// Caja<number> guarda números, Caja<string> guarda textos; la caja es la misma.
// Ya los usas: Array<number>, Promise<string>, Record<string, number>.
//
// Ejemplo (distinto de los ejercicios):
//   function primero<T>(lista: T[]): T | undefined { return lista[0] }
//   primero([1, 2, 3])   // T es number  -> devuelve number | undefined
//   primero(["a", "b"])  // T es string  -> devuelve string | undefined
// TS deduce T solo, a partir de lo que le pasas.
//
// Restricción: <T extends { id: number }> = "T puede ser cualquier cosa, siempre que tenga un id numérico".
//
// Utility types (tipos que transforman otros tipos):
//   Partial<T>       todos los campos pasan a ser opcionales
//   Required<T>      todos pasan a ser obligatorios
//   Readonly<T>      todos pasan a ser de solo lectura
//   Pick<T, "a"|"b"> te quedas solo con esos campos
//   Omit<T, "a">     quitas ese campo
//   Record<K, V>     objeto con claves K y valores V
//   ReturnType<typeof fn>   el tipo de lo que devuelve la función fn
//
// Comprobar los tipos: pnpm tsc

interface Usuario {
    id: number;
    nombre: string;
    email: string;
    telefono?: string;
}

// 1. `ultimo<T>(lista: T[]): T | undefined`. Pruébala con números y con strings.
//    Pasa el ratón por encima del resultado: ¿qué T ha deducido TS en cada caso?


// 2. `invertir<T>(lista: T[]): T[]` que devuelva una lista nueva invertida SIN modificar la original.


// 3. `contarPor<T>(lista: T[], clave: (x: T) => string): Record<string, number>`.
//    Es el ejercicio 9 del bloque 6, pero para cualquier tipo de lista.
//    Pruébala con una lista de palabras (clave: primera letra) y con números (clave: "par" / "impar").


// 4. `agruparPor<T>(lista: T[], clave: (x: T) => string): Record<string, T[]>`.
//    Pruébala con los libros del bloque 6 (copia el type Libro aquí) y con números.


// 5. Restricción: `buscarPorId<T extends { id: number }>(lista: T[], id: number): T | undefined`.
//    Pruébala con un array de Usuario y con un array de productos (otro type con id).
//    Intenta llamarla con una lista de objetos SIN id y lee el error.


// 6. Interface genérica: `interface Caja<T> { contenido: T }`.
//    Crea una Caja<number> y una Caja<string[]>.
//    Escribe `mapearCaja<T, U>(c: Caja<T>, fn: (x: T) => U): Caja<U>`.


// 7. Una pila (último en entrar, primero en salir) con funciones puras (sin mutar):
//    type Pila<T> = { items: T[] }
//    `apilar<T>(p: Pila<T>, x: T): Pila<T>`, `cima<T>(p: Pila<T>): T | undefined`,
//    `desapilar<T>(p: Pila<T>): Pila<T>`. Comprueba que la pila original no cambia.


// 8. Utility types con la interface Usuario de arriba:
//    a) `actualizarUsuario(u: Usuario, cambios: Partial<Usuario>): Usuario`  (con spread).
//    b) `type UsuarioPublico = Pick<Usuario, "id" | "nombre">` y una función que convierta Usuario en UsuarioPublico.
//    c) `type NuevoUsuario = Omit<Usuario, "id">` (un usuario que aún no tiene id) y
//       `crearUsuario(datos: NuevoUsuario, id: number): Usuario`.
//    d) `type UsuarioCongelado = Readonly<Usuario>`: intenta modificar un campo y lee el error.


// 9. `Record<"admin" | "editor" | "lector", string[]>`: permisos por rol.
//    Crea un objeto válido. Después quita un rol y lee el error. Añade un rol inventado y lee el error.


// 10. Escribe una función `construirUsuarioDemo()` que devuelva un objeto literal (sin anotar el retorno).
//     Obtén su tipo SIN escribirlo a mano: `type UsuarioDemo = ReturnType<typeof construirUsuarioDemo>`.
//     Pasa el ratón por encima de UsuarioDemo y comprueba qué ha deducido TS.
