var http = require('http')
var url = require('url')
var StringDecoder = require('string_decoder').StringDecoder

var server = http.createServer(function(req, res){

    var parsedUrl = url.parse(req.url, true)

    var method = req.method.toLowerCase();

    var queryStringObject = parsedUrl.query

    var headers = req.headers

    var decoder = new StringDecoder('utf-8')
    var buffer = ''

    req.on('data', function(data){
        buffer += decoder.write(data);
    })

    req.on('end', function(){
        buffer += decoder.end();

        var choosenHandler = typeof(router[trimmedPath]) !== "undefined" ? router[trimmedPath] : handlers.notFound

        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'headers': headers,
            'method': method,
            'payload': buffer

        }

        choosenHandler(data, function(statusCode, payload){
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            payload = typeof(payload) == 'object' ? payload : {};

            var payloadString = JSON.stringify(payload);

            res.setHeader('Content-Type', 'application/json')
            res.writeHead(statusCode)
            res.end(payloadString)
            console.log('Request is received on headers: ', statusCode, payloadString)

        })
    })

    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '')
})


var handlers = {
}

handlers.sample = function(data, callback){
    callback(406, {'name' : 'sample handler'});
}

handlers.notFound = function(data, callback){
    callback(404)
}

var router = {
    'sample': handlers.sample,
};


server.listen(3000, function(){
    console.log("This server is listening on port 3000 now")
})