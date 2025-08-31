// Crear un programa en Node.js que funcione desde la terminal y permita gestionar tareas (una especie de mini to-do list) guardadas en un archivo JSON. No vas a usar base de datos ni librerías externas, solo módulos nativos de Node.

import * as fs from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Obtiene los argumentos pasados desde la línea de comandos
const cmd = process.argv[2];
const arg = process.argv[3];

//Obtiene la url del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const jsonPath = join(__dirname, 'tareas.json') 


if (cmd === 'add'){
    agregar(arg)
} else if(cmd === 'delete'){
    eliminar(Number(arg))
} else if(cmd === 'read'){
    leer()
} else if(cmd === 'done'){
    modificar(Number(arg))
}else{
    console.log("Comandos disponibles: add, read, done, delete");
}


//FUNCION LEER
async function leer() {
  try {
    const raw = await fs.readFile(jsonPath, 'utf-8');
    const data = raw.trim() ? JSON.parse(raw) : []
   
    console.log('------- TAREAS --------');
    
    if (data.length === 0) {
      console.log('No hay tareas.');
      return;
    }
    for (const t of data) {
      console.log(`${t.id}. ${t.title} [${t.done ? '✔' : ' '}]`);
    }


  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('El archivo no existe.');
    } else {
      console.error('Error leyendo el archivo:', err);
    }
  }
}
//FUNCION AGREGAR
async function agregar(task){
    if (!task) {
    console.log('Uso: add "descripcion de la tarea"');
    return;
    }

    try {
        const data = await fs.readFile(jsonPath, 'utf-8');
        const tasks = JSON.parse(data)
        const newTask = {
            id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
            title : task,
            done: false
        };
        tasks.push(newTask)
        await fs.writeFile(jsonPath, JSON.stringify(tasks, null, 2), 'utf-8');
        console.log('¡Archivo escrito correctamente!');

    } catch (err) {
        if (err.code === 'ENOENT') {
        console.log('El archivo no existe.');
        } else {
        console.error('Error escribiendo el archivo:', err);
        }
  }
}


//FUNCION ELIMINAR
async function eliminar(idTask){
    if (!Number.isInteger(idTask)) {
    console.log('Uso: delete <id>');
    return;
    }

    try {
        const data = await fs.readFile(jsonPath, 'utf-8');
        const tasks = JSON.parse(data)
        
        const newTasks = tasks.filter(task => task.id !== idTask)

        await fs.writeFile(jsonPath, JSON.stringify(newTasks, null, 2), 'utf-8');
        console.log('¡Archivo escrito correctamente!');

    } catch (err) {
        if (err.code === 'ENOENT') {
        console.log('El archivo no existe.');
        } else {
        console.error('Error eliminar el objeto:', err);
        }
  }
}

//FUNCION MODIFICAS
async function modificar(idTask){
    if (!Number.isInteger(idTask)) {
        console.log('Uso: done <id>');
        return;
    }

    try {
        const data = await fs.readFile(jsonPath, 'utf-8');
        const tasks = JSON.parse(data)
        
        const task = tasks.find(t => t.id === idTask);
        if (task) {
            task.done = true;
            await fs.writeFile(jsonPath, JSON.stringify(tasks, null, 2), 'utf-8');
            console.log(`Tarea ${idTask} completada.`);
        } else {
            console.log(`No existe la tarea ${idTask}.`);
        }

    } catch (err) {
        if (err.code === 'ENOENT') {
        console.log('El archivo no existe.');
        } else {
        console.error('Error modificar el objeto:', err);
        }
  }

}