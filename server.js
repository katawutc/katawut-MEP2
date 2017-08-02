// MEP2
// Katawut Chuasiripattana

var express = require('express');
var port = 5000; // set listening port
var app = express();

var bcrypt = require('bcrypt');
const saltRounds = 10;

// use plain html and angular js
// set static folder to render the page
app.use(express.static('app'));

// Body Parser Middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// MongoDB
var mongoClient = require('mongodb');
var objectID = require('mongodb').ObjectID;
// user: katawutc
var mlabDB = 'mongodb://katawut:AccessMongo@ds129023.mlab.com:29023/mep';
var db;
mongoClient.connect(mlabDB, function(err, database){
  if (err) console.log('Error, cannot connect to MongoDB');
  else {
    console.log('MongoDB MLab connected ...');
  }
  db = database;
});

app.listen(port, function(){
	console.log('Server starts on port '+ port);
});

/** sign up */
app.post('/signUp', function(req, res) {

  plainPassword = req.body.password;

  // use bcrypt to hash and store password
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(plainPassword, salt);

  // connect to the DB
  db.collection('user').insert({userName: req.body.name,
                               userEmail: req.body.email,
                               userHashedPassword: hash}, cb);
  function cb(err, result) {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
      // duplicate userEMail
      res.json({ success: false,
                 message: 'user Email already exist!' });
    }
      else {
        return res.status(500).send(err);
    }
  }
    else {

      var userID = result.insertedIds[0];

      db.collection('user').update({_id:userID}, {$set:{userID: userID}});

      res.json({success: true,
                message:'sign up success'});
              }
  }
});
/** */

/** test header */
app.get('/testHeader/:testID', function(req, res) {
  db.collection('unSubscribeTestHeader').findOne({testID: req.params.testID}, cb);
                                        /*function(err, docs) {*/
  function cb(err, doc) {
    if (err) console.log(err)
    else {
      res.json(doc);
    }
  }
})
/** */
