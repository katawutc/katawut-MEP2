/** bcrypt */
var bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var objectID = require('mongodb').ObjectID;

/**  JWT Strategy */
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret';

var strategy = new JwtStrategy(opts, function(jwt_payload, next) {
   console.log('payload received', jwt_payload);

   console.log(jwt_payload.userID);
   console.log(jwt_payload.userRole);

   // Need to refactor to userID
   /** to refactor to have user role in here */
   var query = {userID: objectID(jwt_payload.userID),
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

module.exports = function logIn(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var query = {userEmail: req.body.email};
  var loginSuccess;

  // connect to the DB
  db.collection('user').findOne(query, function(err, doc) {
    if (err) throw err;

    // to check null to prevent crash
    if (doc) {
    var hashedPassword = doc.userHashedPassword;

    bcrypt.compare(req.body.password, hashedPassword, function(err, pass) {

      if (pass) {
        // need to refactor to _id instead of result.userName
        /** to add user role in the payload to check the authorization logic */
        var payload = { userID: doc.userID,
                        userRole: doc.userRole};
        var token = jwt.sign(payload, opts.secretOrKey);

        res.json({userName: doc.userName,
                  userID: doc.userID,
                  userRole: doc.userRole,
                  token: token,
                  message: 'login success'});
                } else {
                  res.json({message: 'login fail'});
                }
              });
          }
          else {
            res.json(doc);
          }
        });
}
