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

	socket.emit('newEmail', {
		from : 'mike@example.com', 
		text : "hey what's going on",
		createdAt: 123
	});

	socket.emit('newMessage', {
		from : 'mundanelunacy',
		text : 'Got new message',
		createdAt : new Date().getTime()
	});

	socket.on('createEmail', function(newEmail){
		console.log('createEmail', newEmail);
	});

	socket.on('createMessage', function(message){
		console.log('createMessage', message);
	});



	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});




server.listen(port, function(){
	console.log(`Server is up on port ${port}`);
});
