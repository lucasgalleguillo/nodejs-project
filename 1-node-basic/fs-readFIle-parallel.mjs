
import { promises } from 'node:dns'
import { readFile } from 'node:fs/promises'


//mas rapido por que es en paralelo
Promise.all([
    readFile('./archivo1.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
]).then(([text1, text2]) => {
    console.log('primer texto: ', text1)
    console.log('segundo texto: ', text2)
})


