// modulos nativos con promesas, cambiamos de callback a promesas por es ma utilizado en la actualidad
import { readFile } from 'node:fs/promises'

/*
en caso que el modulo no tenga la vrsion de promises

const {promisify} = require('node:util')
const readFilePromises = promisify(fs.readFile)
*/

console.log('Leyendo archivo 1...')
const text = await readFile('./archivo1.txt', 'utf-8')
console.log('primer texto: ', text)

/*
CON CALLBACK
fs.readFile('./archivo1.txt', 'utf-8', (err, text) => { //Esto es un callback . es decir la funcion inicia y ejecutas otras cosas, hasta que tiene la info que pidio y recien ahi devuelve el callback
    console.log('primer texto: ', text)
})
    CON PROMISES

    console.log('Leyendo archivo 1...')
readFile('./archivo1.txt', 'utf-8')
    .then(text => {
        console.log('primer texto: ', text)
    })
    
*/

console.log('mientras tantoooooooooooo')

console.log('Leyendo archivo 2...')
const text2 = await readFile('./archivo2.txt', 'utf-8')
console.log('segundo texto: ', text2)


/*
CON CALLBACK
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => { 
    console.log('segundo texto: ', text)
})
    CON PROMISES
    console.log('Leyendo archivo 2...')
readFile('./archivo2.txt', 'utf-8')
    .then(text => {
        console.log('tecto segundo: ', text)
    })
*/