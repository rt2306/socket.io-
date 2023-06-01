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

var users = 0 ;     //for broadcasting to show how many users connected
io.on('connection',function(socket){   // io.on use to open socket and connection is use toh establish connection in socket.io
    console.log(`A user connected`);
    users++;
    // io.sockets.emit('broadcast',{message:users + 'users connected'})   //show to all users connected

socket.emit('newuserconnected',{message:'Hi welcome to Rohit World'})  //only show to new users


socket.broadcast.emit('newuserconnected',{message:users +' Users Connected' });  // show to connected users previous
// setTimeout(()=>{

    //     socket.send('It is a pre build function send of socket io',function(){
    //         console.log("Message send successfully");
    //     })

    //     socket.emit('mycustomCode',{info:"this is my custom emit message"});   //emit or send messgae from server to client side
    // },3000)

    // socket.on('mycustom_message_from_client_side',function(data){
    //     console.log(data);
    // })
  
socket.broadcast.emit('newuserconnected',{message:users +' Users Disconnected' });
  
    // socket.on('disconnect',function(){   // disconnect is to dissconnect user from socket.io show to all users
    //     console.log(`A user disconnected`)
    //     users--;
    //     io.sockets.emit('broadcast',{message:users + 'users disconnected'})
    // })
})

server.listen(port,function(){
    console.log(`YOUR APP IS LISTEN ON http://localhost:${port}`);
})