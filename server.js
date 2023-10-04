const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = socket(server);

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection',(socket)=>{
    console.log("A user connected");

    socket.on('disconnect',()=>{
         console.log("A user disconnected");
    });

    socket.on('chat message',(message)=>{
       io.emit('chat message',message);
    });
});

server.listen(3000,()=>{
   console.log("server is running on port 3000");
});

