// MEP2
// Katawut Chuasiripattana

var express = require('express');

// set listening port
var port = 5000;

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(port, function(){
	console.log('Server starts on port '+ port);
});
