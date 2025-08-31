const http = require('node:http')


const processRequest = (req, res) => {
    const{ method, url } = req

    switch(method){
        case 'GET':
            switch(url){
                case '/':
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/html')
                    return res.end('<h1>Hola crack<h1/>')
                case '/about':
                    res.statusCode = 200
                     return res.end('<h1>About Us</h1>')
                default:
                    res.statusCode = 404
                    res.end('<h1>404 Not Found</h1>') 
            }
        case 'POST':
            switch(url){
                case '/':
                    let body =''
                    
                    req.on('data', chunk =>{
                        body += chunk.toString() // Se convierte a string porque chunk es un buffer
                    })

                    req.on('end', ()=>{ //para cuando termine convertir el string en json. Aca se llama a la bd para guardar la info
                        const data = JSON.parse(body)
                        res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'})
                        res.end(JSON.stringify(data))
                    })
                    break

                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/plain')
                    res.end('<h1>404 Not Found</h1>') 
            }

}}

const server = http.createServer(processRequest)

server.listen(3000, ()=>{
    console.log(`port: http://localhost:3000`)

}) 