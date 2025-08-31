const fs = require('node:fs')

console.log('Leyendo archivo 1...')
const text =  fs.readFileSync('./archivo1.txt', 'utf-8')
console.log('primer texto: ', text)


console.log('mientras tantoooooooooooo')

console.log('Leyendo archivo 2...')
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')
console.log('segundo texto: ', text2)

