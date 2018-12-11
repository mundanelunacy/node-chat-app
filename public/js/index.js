var socket = io();

socket.on('connect', function(){
	console.log('connected to server');

	socket.emit('createEmail', {
		to : 'jen@xample.com', 
		text : 'Hey. this is toshi"'
	});

	socket.emit('createMessage', {
		from: 'jen',
		text: 'hey this is jen'
	});
	
});

socket.on('disconnect', function(){
	console.log('disconnected from server');
});

socket.on('newEmail', function(email){
	console.log('New email', email);
});

socket.on('newMessage', function(message){
	console.log('New message', message);
});



