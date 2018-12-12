const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', function(socket){
	console.log('new user connected');

	//socket.emit from Admin text Welcom to the chat app
	socket.emit('newMessage', {
		from: "Admin",
		text: "Welcom to the chat",
		createdAt : new Date().getTime()
	});

	//socket.broadcast.emit from Admin text New user joined
	socket.broadcast.emit('newMessage', {
		from : "Admin",
		text : "New user joined",
		createdAt : new Date().getTime()
	});

	socket.on('createMessage', function(message){
		console.log('createMessage', message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt : new Date().getTime()
		});

		// socket.broadcast.emit('newMessage', {
		// 		from: message.from,
		// 		text: message.text,
		// 		createdAt : new Date().getTime()
		// });
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

server.listen(port, function(){
	console.log(`Server is up on port ${port}`);
});
