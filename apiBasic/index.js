const http = require('node:http') // protocolo http sirve para transmitir info, protocolo de hipertecto

const desirePort = process.env.PORT ?? 3000 // le podemos pasar el port como varialble

const processRequest = (req, res) => {

    res.setHeader('Content-Type', 'text/html')

    if(req.url === '/'){
        res.statusCode = 200
        res.end('<h1>Hola crack<h1/>')
    } else if(req.url === '/about'){
        res.statusCode = 200
        res.end('<h1>About Us</h1>')
    } else {
        res.statusCode = 404
        res.end('<h1>404 Not Found</h1>')
    }
}

const server = http.createServer(processRequest)

server.listen(desirePort, ()=>{
    console.log(`port: http://localhost:${desirePort}`)
})
// HEDEARS dan contexto a la peticion