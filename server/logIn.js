/** bcrypt */
var bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

/**  JWT Strategy */
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret'; /* to create a new secretOrKey */

var strategy = new JwtStrategy(opts, function(jwt_payload, next) {

  /** to have another random number for more security ? */
   var query = {userID: jwt_payload.userID,
                userRole: jwt_payload.userRole};

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

   db.collection('user').findOne(query, function(err, result) {
     if (result) {
       next(null, result);
     } else {
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

    // to check null to prevent crash; using email to log in
    if (doc && doc.userEmail && doc.userHashedPassword) {
      var hashedPassword = doc.userHashedPassword;

      bcrypt.compare(req.body.password, hashedPassword, function(err, pass) {

        if (pass) {
          var payload = { userID: doc.userID,
                          userRole: doc.userRole};
          var token = jwt.sign(payload, opts.secretOrKey);

          db.collection('loginHistory').insert({userID: doc.userID,
                                                  loginMethod: 'email',
                                                  loginTime: Date().toString()}, cb);

          function cb(err, result) {
            res.json({userName: doc.userName,
                      userID: doc.userID,
                      userRole: doc.userRole,
                      token: token,
                      activate: doc.activate,
                      message: 'login success'});
                    }
        }
        // use FB to log in before
        else if (doc && doc.fbID) {
          res.json({message: 'login fail:FB'})
        }
        else {
          res.json(doc);
        }
      });
    }
  });
}
