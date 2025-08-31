console.log('Hola mundo')
// no se puede usar window, en vez de window se utiliza globalThis(varibla golbal en toda nuesta app)
// en el navegar apunta a Window y en node apunta a global

/* 
-- PATRON DE DISENO DE MODULOS --

COMMONJS(clasica)

module.exports = funcion
module.exports = {
    funcion
}

cost funcion = require('./archivo')
cost { funcion }  = require('./archivo')


cjs/js -> CommonJs
mjs -> Es Modules


ES MODULES(Recomendado)

import { funcion } from './archivo,mjs'

export function nombre (a, b){
    a - b
}



-- MODULO NATIVOS --

con mjs: import nombremodulo from 'node:nombremodulo'
sin mjs: const nombremodulo = require('node:nombremodulo')

- os, obtenemos toda la info sobre nuesteo sist operativo 

-file system(fs)

-path, contruye rutas, une rutas (Al escribir ruta nunca hacerlos con / debido a que en windows cambia, es \)
---------------------

OBJETO GLOBAL process
- Información sobre el proceso en ejecución
- process.env: Variables de entorno
- process.pid: ID del proceso
- process.exit(): Finaliza el proceso

--------------

SIEMPRE ES MEJOR TRABAJR DE FORMA ASINCRONA DEBIDO A QUE NO TE BLOQUEAS TAREAS SINO  QUE EL FLUJO SIGUE
*/