var app = require('express')();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.get('/', function(req, res){
res.sendfile('index.html');
});

io.on('connection', function (socket) {
  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('add user', function (username) {

    socket.username = username;
    
    socket.broadcast.emit('user joined', {
      username: socket.username
    });
  });


});

server.listen(3000);