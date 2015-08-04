var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

var server = app.listen(port);
console.log('magic happens on port '+port+'.');

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  console.log('new connection: ' + socket.id);
  
  socket.emit('init_client', {
  	socket_id: socket.id
  });

  socket.on('init_server', function(data) {
  	socket.join(data.room_id);
  	console.log('socket '+socket.id+' joined '+data.room_id);
  	socket.broadcast.to(data.room_id).emit('new_device', {
  		device_id: socket.id
  	});
  });

  socket.on('update_value_to_server', function(data) {
  	console.log('socket '+socket.id+' sent new value '+data.value+' for room '+data.room_id);
  	socket.broadcast.to(data.room_id).emit('update_value_from_server', {
  		value: data.value
  	});
  });

  socket.on('disconnect', function() {
  	console.log('lost connection: ' + socket.id);
  });
});

