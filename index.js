const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const cors = require('cors')


const app= express();
app.use(cors())


const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
});

// io connected on server side
io.on("connection", (socket) => {
    console.log(socket.id)

    // frontend mai emit kiye aur backend mai listen kiye
    socket.on("joinRoom", room => {
		socket.join(room)
  })

//new massage get kar rhe hai
  socket.on("newMessage", ({newMessage, room}) => {
    io.in(room).emit("getLatestMessage", newMessage)
  })
}) 



app.get('/',(req,res)=>{
    res.send('socket chat backend is started....!')
})

server.listen(8000,()=>{
    console.log('app started at port 8000');
})