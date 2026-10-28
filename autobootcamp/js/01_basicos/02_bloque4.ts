const nombres: string[] = Array.of("Dani", "Costas", "Manolo")
const numeros: number[] = Array.of(1,4,7,87, -1)

// numeros.push("Daniel")

const sumar: (...nums: number[]) => number = (...nums: number[]): number =>{
    return nums.reduce((pv,cv) => {
        return pv + cv
    })
}

function sumar2 (...nums: number[]) : number {
     return nums.reduce((pv,cv) => {
        return pv + cv
    })
}

function todosPositivos (nums: number[]): boolean {

    return nums.every(e => e >= 0)
}

function hayNegativos (nums: number[]): boolean {

    return nums.some(e => e < 0)
}

function primerPar(nums: number[]) : number | undefined {

    for (let n of nums) {
        // if (n % 2 == 0) return n
        console.log(n)
    }
    return undefined
}

function primerPar2(nums: number[]) : number | undefined{

    return nums.find(e => e % 2 == 0)
}

// console.log(todosPositivos(numeros))
// console.log(hayNegativos(numeros))
console.log(primerPar(numeros))
console.log(primerPar2(numeros))

