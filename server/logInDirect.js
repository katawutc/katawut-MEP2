
/** bcrypt */
var bcrypt = require('bcrypt');
const saltRounds = 10;

//var objectID = require('mongodb').ObjectID;

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

   var query = {userID: jwt_payload.userID,
                userRole: jwt_payload.userRole};

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

   db.collection('user').findOne(query, function(err, result) {
     if (result) {

       next(null, result);
     } else {
       console.log('Fail Fail Fail');
       next(null, false);
     }
   });
});

passport.use(strategy);

module.exports = function logInDirect(req, res) {

  var query = {userID: req.body.userID};

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var loginSuccess;

  // connect to the DB
  db.collection('user').findOne(query, function(err, result) {
    if (err) throw err;

    var hashedPassword = result.userHashedPassword;

    bcrypt.compare(req.body.password, hashedPassword, function(err, pass) {

      if (pass) {

        var payload = { userID: result.userID,
                        userRole: result.userRole};
        var token = jwt.sign(payload, opts.secretOrKey);

        res.json({userName: result.userName,
                  userID: result.userID,
                  userRole: result.userRole,
                  token: token,
                  message: 'login success'});
                } else {
                  res.json({message: 'login fail'});
                }
              });
            });
          }
