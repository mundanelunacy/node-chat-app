const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage} = require('./utils/message');



var app = express();
var server = http.createServer(app);
var io = socketIO(server);

var port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', function(socket){
	console.log('new user connected');

	socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat"));
	socket.broadcast.emit('newMessage', generateMessage('Admin', "New user joined"));

	socket.on('createMessage', function(message, callback){
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('this is from the server');
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

server.listen(port, function(){
	console.log(`Server is up on port ${port}`);
});
