const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3001
const http = require('http');// we need http to start the websocket protocol .


const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

app.use(cors());
const server = http.createServer(app)// We Are connceting express app to http


const io = require("socket.io")(server , {
  cors:{
    origin: "*",   //the server
    methods: ["GET", "POST"],          //the methodes we call
    
  }
})

;

app.get('/', (req, res) => {
  res.send("working")
});

/*

Now we going to start the conncetion with socket.io using 'io.on' Methode
the documentation : https://socket.io/docs/v4/server-initialization/


*/

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join',({name , room},callback)=>{   
     const {error , user } = addUser({id : socket.id , name , room});

       if(error) return callback(error);
     

       socket.join(user.room);

       socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
       socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
   
       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
   
      //  callback();
    });

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      // callback();
    });
  
  

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      console.log('user is disconnected')
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});