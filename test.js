const http = require('http')

const server = http.createServer((req, res) =>{
    if(req.url === '/'){
        res.end("Your are on the Home Page")
    }

    if(req.url === '/about'){
        res.end("You are on the about me page")
    }

    res.end('Hello World')
})

server.listen(5000)