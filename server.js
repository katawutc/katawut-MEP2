// MEP2
// Katawut Chuasiripattana

var express = require('express');

// set listening port
var port = 5000;

var app = express();

// use plain html and angular js
// set static folder to render the page
app.use(express.static('app'));

/** mongoose */
var mongoose = require('mongoose');

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var localDBuri = 'mongodb://localhost:27017/MEP';
var mlabDBuri = 'mongodb://katawut:1!MongoMongoose@ds129023.mlab.com:29023/mep';


mongoose.connect(mlabDBuri, options);
//mongoose.connect(localDBuri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose mongodb <1!MongoMongoose> connected...');
});
/** */

app.listen(port, function(){
	console.log('Server starts on port '+ port);
});
