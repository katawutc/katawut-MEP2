

var passport = require('passport');

var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '141198316480017',
    clientSecret: 'dbb7f9659805b136d28f5b576a246c1c',
    //callbackURL: "http://localhost:5000/fbLogIn",
    callbackURL: "http://localhost:5000/auth/facebook/callback",
  },
  function(accessToken, refreshToken, profile, cb) {

      var mongo = require('./mongoDBConnect');
      var db = mongo.getDB();

      db.collection('user').findOne({fbID: profile.id}, function(err, doc) {
        if (err) throw err;
        if (doc) {
          cb(err, doc);
        }
        else {

          /*** use async to insert userSetting data here ***/


          db.collection('user').insert({fbID: profile.id,
                                          userName: profile.displayName,
                                          userRole: 'su',
                                          activate: false}, insertCallback);

          function insertCallback(err, doc) {
            if (err) throw err;

            db.collection('user').findOne({fbID: profile.id}, function(err, doc2) {
            if (err) throw err;
            if (doc2) {
            console.log('insert success: ');
            console.log(doc2);
            }

            cb(err, doc2);
          })
        }
        // need to understand more on fb log in callback
      }
    })
    }));

module.exports = function fbAuthCallback(req, res) {
  // Successful authentication, redirect home.
  //res.redirect('/');
  console.log(req.user);
  res.redirect('/#!/fbLogIn/'+req.user.fbID);
}
