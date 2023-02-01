const http = require('http');
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;
const db = require('./dataBase/dataBase')
const express = require('express');
const app = express();
const router = require('./router/router');
const bodyParser = require('body-parser');
var cors = require('cors');
const path  = require('path');


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.get('/hello',(req,res)=>{
//     res.send("hello from the server");
// })





const server = http.createServer(function(req,res){
    res.writeHead(200,{'content/type':'text-plain'});
    res.write ('server created successfully');
    res.end("server end");
})
app.listen(port,()=>{
    console.log(`Server successfully created with ${host}${port}`);
});

// app.listen(8080,(req,res)=>{
//     console.log("server is running on 8080")
// })

app.use('/static',express.static(path.join(__dirname, 'uploads')));


app.use('/', router);