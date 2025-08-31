const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 3000

app.use((req, res, next) => {
    console.log('middleware')
    //resvisar si el usuriao tiene cokies, etc
    next()
} )

app.get('/', (req, res) => {
    res.send('<h1> Mi pagina de cracks </h1>')
})

app.post('/', (req, res) => {
    let body =''
                    
    req.on('data', chunk =>{
        body += chunk.toString() // Se convierte a string porque chunk es un buffer
    })

    req.on('end', ()=>{ //para cuando termine convertir el string en json. Aca se llama a la bd para guardar la info
        const data = JSON.parse(body)
        res.status(200).json(data)
    })
})

//Es a la ultima a la que llega
app.use((req, res) => { // el use es como un * no importa si es un get post o put
    res.status(404).send('<h1>Page Not Found</h1>')
})

app.listen(PORT, () => {
    console.log('server listening on port http://localhost:3000/')
})
