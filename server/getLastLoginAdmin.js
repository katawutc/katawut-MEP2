
module.exports = function getLastLoginAdmin(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var lastLogin = {};

  if (!req.mepAdminAccess) {
    res.json({errorMessage: 'no authority'});
  }

  if (req.mepAdminAccess){

    db.collection('loginHistory').find({userID: req.params.userID},
                                    {sort:{$natural:-1}, limit: 1}).toArray(getLastLogin);


  function getLastLogin(err, doc) {
    if (err) throw err;

    if(doc) {
      lastLogin.userLastLoginMethod = doc[0].loginMethod;
      lastLogin.userLastLoginTime = doc[0].loginTime;
      }
      res.json(lastLogin);
    }
  }
}
