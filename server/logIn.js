/** bcrypt */
var bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'secret'; /* to create a new secretOrKey */

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
          var token = jwt.sign(payload, opts.secretOrKey, {expiresIn: 60*60*3});

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
