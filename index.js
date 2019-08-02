var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var arrUser = [];
var countUser = 0;

io.on('connection', function(socket){
  socket.on('ketNoi', function(userN){
     var user = {id:socket.id,name:userN};
     arrUser.push(user);
     countUser++;
     io.emit('notiKetNoi', userN);
     io.emit('demNguoi', countUser);
  });
  socket.on('disconnect', function(){
    
    io.emit('notiMatKetNoi', arrUser.find(x=> x.id == socket.id).name);
    countUser--;
    io.emit('demNguoi', countUser);
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});