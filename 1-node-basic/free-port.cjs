const net = require('node:net');

function findAvailablePort (desiredPort){
    return new Promise((resolve, reject) =>{
        const server = net.createServer()
        
        //escucha al puerto para revisar si esta vacio
        server.listen(desiredPort, () => {
            const { port } = server.address()
            server.close(() => {
                resolve( port )
            })
        })

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(0).then(port => resolve(port))
            }
            else{
                reject(err)
            }
        })
    }
)}

// module.exports = findAvailablePort()

const http = require('node:http')


const server = http.createServer((req,res) => {
    console.log('request recived')
    res.end('hola mundo')
})

findAvailablePort(3000).then(port => {
    server.listen(port, () =>{
        console.log(`server listening on port http://localhost:${port}`)
    })
})