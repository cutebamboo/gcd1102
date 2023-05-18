const http = require("http");
const dt = require('./mymodule');
const port = 3000;
const hostname = "localhost";
const fobj= require('fs');



const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","text/html")
    
    switch (req.url){
        case "/home":
            res.writeHead(200);
            res.end("<h1> This is Home page</h1>");
            break;
        case "/about":
            res.writeHead(200);
            res.end("<h1> This is About page</h1>");
            break;
        case "/compute":
            res.writeHead(200);
            res.end(`<h1> This is About page ${dt.congtrunhanchia(10,200,"+")} <h1>`)
            break;
        case "/literature":
            res.writeHead(200,"Content-Type","text/plain");
            const fcontent = fobj.readFileSync('./alice.txt');
            res.end(`${fcontent.toString()}`);
        default:
            res.end("<h1>Hello World</h1><p>This is a HTML response</p><ol><li>One</li><li>Two</li><li>Three</li></ol>");
            break;
    }

});

server.listen(port,hostname,()=>{
    console.log("server dang hoat dong....")
});