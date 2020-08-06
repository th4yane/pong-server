let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  
  socket.on('disconnect', function(){
    io.emit('users-changed', {user: socket.username, event: 'left'});   
  });
 
  socket.on('set-direction', (direction) => {
    io.emit('racket-moved', {user: socket.username, direction: direction});    
  });

  socket.on('set-user', (username) => {
    socket.username = username;
    io.emit('user-logged', {user: username});    
  });

  socket.on('ball', (position) => {
    io.emit('ball-moved', {user: socket.username, position: position});    
  });
});
 
var port = process.env.PORT || 3001;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});