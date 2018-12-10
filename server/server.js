const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');


var app = express();
var port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.get('', function(req, res){
	res.send('hello world');
});






app.listen(port, function(){
	console.log(`Server is up on port ${port}`);
});
