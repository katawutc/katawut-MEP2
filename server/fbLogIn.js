var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

/**  JWT Strategy */
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';

var strategy = new JwtStrategy(opts, function(jwt_payload, next) {

   // Need to refactor to userID
   /** to refactor to have user role in here */
   var query = {userID: jwt_payload.userID,
                userRole: jwt_payload.userRole};

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

   db.collection('user').findOne(query, function(err, result) {
     if (result) {
       console.log(result);
       next(null, result);
     } else {
       console.log('Fail Fail Fail');
       next(null, false);
     }
   });
});

passport.use(strategy);

module.exports = function fbLogIn(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var query = {fbID: req.body.fbID};
  var loginSuccess;

  // connect to the DB
  db.collection('user').findOne(query, function(err, doc) {
    if (err) throw err;

    if (doc) {
      // to check if not 1st time log in
      if (doc.userID) {

        var payload = { userID: doc.userID,
                        userRole: doc.userRole};
        var token = jwt.sign(payload, opts.secretOrKey);

        db.collection('loginHistory').insert({userID: doc.userID,
                                                loginMethod: 'fb',
                                                loginTime: Date().toString()}, cb);

        function cb(err, result) {
          if (err) throw err;
          else {
            res.json({userName: doc.userName,
                      userID: doc.userID,
                      userRole: doc.userRole,
                      token: token,
                      activate: doc.activate, // to check 1st time setting
                      message: 'login success'});
          }
        }
      }
      else {
      // need to refactor more when understand async
      // set the userID
      db.collection('user').update(query,
                                  {$set: {userID: doc._id.toString() }}, cb);

        function cb(err, count, obj) {

        var payload = { userID: doc._id.toString(),
                        userRole: doc.userRole};
        var token = jwt.sign(payload, opts.secretOrKey);

        db.collection('userSetting').insert({userID: doc._id.toString(),
                                              userRole: doc.userRole},
        function(err, setting) {
          if (err) throw err;

          console.log('fb 1st time log in');

          res.json({userName: doc.userName,
                    userID: doc._id.toString(),
                    userRole: doc.userRole,
                    token: token,
                    activate: doc.activate, // to check 1st time setting
                    message: 'login success'});
                  });
                }
        }
      }
    else {res.json('error happens');}
    })
}
