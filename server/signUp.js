module.exports = function signUp(req, res) {

  var md5 = require('md5');

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

  // create hashActivate to insert to DB
  var hashActivate = md5(  Math.floor(Math.random() * (1000)) );

  db.collection('user').insert({userName: null,
                               userEmail: req.body.email,
                               userHashedPassword: null,
                               userRole: 'su', /* subscribed user by default */
                               hashActivate: hashActivate,
                               activate: false},
                               cb);
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

        // activate url to have userID and hashActivate
        var activateUrl = 'http://localhost:5000/#!/signUpActivate/'+
                            userID+'/'+hashActivate;

        var mailOptions = {
          from: 'modernedu17@gmail.com',
          to: req.body.email,
          subject: 'Sign up to MEP',
          html: '<h1>Welcome</h1><p>Please click this <a href='+activateUrl+'>link</a> to activate your account</p>'
        };

        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);

            res.json({success: true,
                      signUpEmail: req.body.email,
                      message:'sign up success'});
          }
        });
    }
  }
}
