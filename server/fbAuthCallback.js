

var passport = require('passport');

var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: '948325255322737',
    clientSecret: '615b50da6a3f4c61c48bcd75f79ac1cb',
    callbackURL: "http://localhost:5000/auth/facebook/callback",
    //callbackURL: "https://sheltered-anchorage-14909.herokuapp.com/auth/facebook/callback",
    //passReqToCallback : true, /* what is this? */
    profileFields: ['id', 'emails', 'name', 'displayName'] //This
  },
  function(accessToken, refreshToken, profile, cb) {

      var mongo = require('./mongoDBConnect');
      var db = mongo.getDB();

      /** need to check if (profile) here */
      db.collection('user')
      .findOne({'fbID': profile.id}, function(err, doc) {
        if (err) throw err;
        if (doc) {
          cb(err, doc);
        }
        else {
          // no fbID in the DB before; now insert it
          db.collection('user')
          .insert({'fbID': profile.id,
                   'userName': profile.displayName,
                   'userEmail': profile.emails[0].value,
                   'userRole': 'su',
                   'activate': false}, insertCallback);

          function insertCallback(err, doc) {
            if (err) throw err;

            db.collection('user')
            .findOne({'fbID': profile.id}, function(err, doc2) {

            if (err) throw err;
            if (doc2) {
              cb(err, doc2);
            }
          })
        }
        // need to understand more on fb log in callback
      }
    })
    }));

module.exports = function fbAuthCallback(req, res) {

  res.redirect('/#!/fbLogIn/'+req.user.fbID);

}
