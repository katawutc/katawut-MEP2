/** bcrypt */
var bcrypt = require('bcrypt');
const saltRounds = 10;
/** */

var objectID = require('mongodb').ObjectID

module.exports = function activateAccount(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var plainPassword = req.body.password;

  // use bcrypt to hash and store password
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(plainPassword, salt);

  db.collection('user').update({userID: objectID(req.params.userID),
                                hashActivate: req.params.hashActivate},
                                {$set: { userName: req.body.userName,
                                          userHashedPassword: hash,
                                          activate: true,
                                          hashActivate: null}}, cb);

  function cb(err, count, status) {
    if (err) throw err;
    else {

      userSettingUp1stTime(req.params.userID, res);

      }
    }
  }

  function userSettingUp1stTime(uID, res) {

    var mongo = require('./mongoDBConnect');
    var db = mongo.getDB();

    db.collection('userSetting').insert({userID: uID,
                                          userRole: 'su'}, cb);

    function cb() {
      res.json('account is activated and 1st setting is up');
    }
  }
