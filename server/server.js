const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


var port = process.env.PORT || 3000;
app.use(express.static(publicPath));

io.on('connection', function(socket){
	console.log('new user connected');



	socket.on('join', function(params, callback){
		

		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Name and room name are required');
		}
		
		socket.join(params.room);
		// socket.leave(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));

		socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

		callback();
	});

	socket.on('createMessage', function(message, callback){
		var user = users.getUser(socket.id);
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
		
		callback();
	});

	socket.on('createLocationMessage', function(coords){
		var user = users.getUser(socket.id);
		if(user){
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));	
		}
		
	});

	socket.on('disconnect', function(){
		var user = users.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
		}
	});
});

server.listen(port, function(){
	console.log(`Server is up on port ${port}`);
});



// three types of emits

// io.emit - send to everyone
// socket.broadcast.emit - send to everyone except connection
// socket.emit - send to connection 
// io.to('The office fans').emit - send event to everyone connected to room 'the office fans'
// socket.broadcast.to('the office fans').emit - send to everyone connected to room 'the office fans' excet connection
