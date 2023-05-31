import express, { urlencoded } from 'express'
import http from 'http'
import path from 'path'
import { Server } from "socket.io";

import { fileURLToPath } from 'url';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
import cors from 'cors'
app.use(cors())
const port = 5500

const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);


app.get('/',function(req,res){
    var options = {
        root: path.join(__dirname)
    }

    console.log(options,"optionsoptions");
    var fileName = 'index.html';
    res.sendFile(fileName,options) 
})


const server = http.createServer(app);
const io = new Server(server);

io.on('connection',function(socket){
    console.log(`A user connected`);
    socket.on('disconnect',function(){
        console.log(`A user disconnected`)
    })
})

server.listen(port,function(){
    console.log(`YOUR APP IS LISTEN ON http://localhost:${port}`);
})