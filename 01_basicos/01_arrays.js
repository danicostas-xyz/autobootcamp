// const frutas = ["manzana", "pera", "uva", "kiwi"];

// // console.log(frutas[1])

// // frutas.push("Mango")

// // console.log(frutas)

// // console.log(frutas.pop())
// // console.log(frutas)

// // frutas.shift()
// // console.log(frutas)

// // frutas.unshift("Piña", "Papaya", "Sandía")
// // console.log(frutas)


// const personas = ["Dani", "Everlyn", "Giulia","Pedro", "Ango"]
// const personas2 = ["Paula", "Brais", "Ana"]


// personas2.unshift(...personas)

// // console.log(personas2)

// const personas3 = new Array()

// personas2.forEach((value, index, array) => {
//     personas3.push(value.toUpperCase())
// })

// console.log(personas2)
// console.log(personas3)

// const personas2filtered = personas2.filter((e,i) =>  {
//     console.log(i)
//     return e.toLowerCase().includes("an")
// })

// console.log(personas2filtered)

const numeros = new Array

for (let i = 1; i <=10; i++) {
    numeros.push(i)
}

console.log(numeros)


const suma = numeros.reduce((pv, cv) => {
    
    console.log(`${cv} x ${pv} = ${cv*pv}`)
    return cv * pv
})






console.log(suma)