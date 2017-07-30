// MEP2
// Katawut Chuasiripattana

var express = require('express');

// set listening port
var port = 3000;

var app = express();

app.listen(port, function(){
	console.log('Server starts on port '+ port);
});
