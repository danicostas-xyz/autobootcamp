// INTERFACE FRENTE A TYPE
//
// Los dos describen la FORMA de un objeto (qué campos tiene y de qué tipo):
//   type Persona = { nombre: string; edad: number }
//   interface Persona { nombre: string; edad: number }
// En el 95 % de los casos da igual cuál uses. Diferencias prácticas:
//   - interface se puede "extender" (extends) y "reabrir" (declarar dos veces el mismo nombre y se fusionan).
//   - type puede describir cosas que interface no: uniones (string | number), tuplas, alias de primitivos.
//   - Regla de la casa: interface para objetos, props de componentes y clases; type para uniones y utilidades.
//
// Modificadores de campo:
//   `?` = opcional (puede faltar).   `readonly` = solo lectura (no se puede reasignar).
//
// Extender:
//   con interface:  interface Empleado extends Persona { empresa: string }
//   con type:       type Empleado = Persona & { empresa: string }      // `&` = "y además"
//
// Index signature (diccionario con claves desconocidas):  { [clave: string]: number }
//
// Comprobar los tipos: pnpm tsc


// 1. Define `interface Usuario { id: number; nombre: string; email: string }`.
//    Crea un array con 3 usuarios.


// 2. Añade a Usuario un campo opcional `telefono?: string`.
//    Crea un usuario con teléfono y otro sin él.
//    Escribe `contacto(u: Usuario): string` que devuelva el teléfono o "sin teléfono".
//    Pista: `??` o un if.


// 3. Marca `id` como `readonly`. Intenta modificarlo (`usuario.id = 99`) y lee el error de tsc.


// 4. Crea `interface Admin extends Usuario { permisos: string[] }`.
//    Crea un admin y escribe `describir(a: Admin): string` ("Ana (ana@x.com) - permisos: leer, escribir").


// 5. Haz lo mismo que el 4 pero con `type` y la intersección `&`: `type AdminT = Usuario & { permisos: string[] }`.
//    ¿Notas alguna diferencia al usarlo?


// 6. Declaration merging: declara DOS veces `interface Config` con campos distintos
//    y crea un objeto que tenga los campos de ambas.
//    Intenta lo mismo con `type Config2` (dos veces) y lee el error.


// 7. Index signature: `interface Inventario { [producto: string]: number }`.
//    Crea un inventario de 4 productos y escribe `totalUnidades(inv: Inventario): number`.
//    Pista: Object.values.


// 8. Funciones dentro de una interface:
//    interface Calculadora { sumar(a: number, b: number): number; resetear(): void }
//    Crea un objeto que cumpla esa interface (puede llevar un acumulador interno).


// 9. Composición: crea `interface Direccion { ciudad: string; cp: string }` y un tipo de usuario
//    que tenga `direccion: Direccion`. Con un array de 5 usuarios, obtén las ciudades SIN repetir (Set).


// 10. Responde en un comentario: ¿cuándo usarías `type` en vez de `interface`? Da dos ejemplos de código
//     que SOLO se puedan escribir con type.
