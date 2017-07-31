// MEP2
// Katawut Chuasiripattana

var express = require('express');

// set listening port
var port = 5000;

var app = express();

// use plain html and angular js
// set static folder to render the page
app.use(express.static('app'));

app.listen(port, function(){
	console.log('Server starts on port '+ port);
});
