
module.exports = function getLastLoginAdmin(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var lastLogin = {};

  if (!req.mepAdminAccess) {
    res.json({errorMessage: 'no authority'});
  }


  function getLastLogin(err, doc) {
    if (err) throw err;

    console.log(doc[0]);

    if(doc[0] !== null && doc[0] !== undefined) {

      console.log(doc);

      lastLogin.userLastLoginMethod = doc[0].loginMethod;
      lastLogin.userLastLoginTime = doc[0].loginTime;

      res.json(lastLogin);
    }
    else if (doc[0] === null || doc[0] === undefined) {

      console.log('doc is null or undefined');

      res.json('doc not found, null or undefined');
    }
  }

  if (req.mepAdminAccess) {

    db.collection('loginHistory')
    .find({'userID': req.params.userID})
    .sort({'_id': -1})
    .limit(1).toArray(getLastLogin);
  }

}
