const http = require("http");
const port = 3000;
const hostname = "localhost";

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","text/html")
    res.end("<h1>Hello World</h1><p>This is a HTML response</p><ol><li>One</li><li>Two</li><li>Three</li></ol>");
});

server.listen(port,hostname,()=>{
    console.log("server dang hoat dong....")
});