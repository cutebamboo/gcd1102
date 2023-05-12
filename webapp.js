const http = require("http");
const port = 3000;
const hostname = "localhost";

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","application/json")
    res.end('{"message" : "hello world"}');
});

server.listen(port,hostname,()=>{
    console.log("server dang hoat dong....")
});