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


module.exports = function fbLogIn(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  console.log(req.body.fbID);

  var query = {fbID: req.body.fbID};
  var loginSuccess;

  // connect to the DB
  db.collection('user').findOne(query, function(err, doc) {
    if (err) throw err;

    // to check null to prevent crash
    console.log(doc);

    if (doc) {

      // set the userID
      console.log(doc._id);
      db.collection('user').update(query,
                                  {$set: {userID: doc._id }});

        var payload = { userID: doc._id,
                        userRole: doc.userRole};
        var token = jwt.sign(payload, opts.secretOrKey);

        res.json({userName: doc.userName,
                  userID: doc.userID,
                  userRole: doc.userRole,
                  token: token,
                  message: 'login success'});
                }
    else {res.json('error happens');}
    })
}
