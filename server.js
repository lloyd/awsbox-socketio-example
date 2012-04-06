var app = require('express').createServer(),
     io = require('socket.io').listen(app);

app.listen(process.env['PORT'] || 3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var clients = [];

function broadcast(msg) {
  clients.forEach(function(socket) {
    socket.emit('chat', msg);
  });
}

io.sockets.on('connection', function (socket) {
  clients.push(socket);
  socket.on('chat', function (data) {
    broadcast(data);
  });
  socket.on('disconnect', function (data) {
    clients.splice(clients.indexOf(socket), 1);
  });
});
