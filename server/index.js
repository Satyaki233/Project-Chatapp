const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3001
const http = require('http');


const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

app.use(cors());
const server = http.createServer(app)
const io = require("socket.io")(server , {
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    // credentials: true
  }
})

;

app.get('/', (req, res) => {
  res.send("working")
});

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