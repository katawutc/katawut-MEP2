var async = require('async');

module.exports = function getAccountAdmin(req, res) {

  var mongo = require('./mongoDBConnect');
  var db = mongo.getDB();

  var account = {};

  if (req.mepAdminAccess){

    // get user name
    db.collection('user').findOne({userID: req.params.userID,
                                    userRole: req.params.userRole}, getAccount);
  }

  function getAccount(err, doc) {
    if (err) throw err;
    if(doc) {
      account.userName = doc.userName;
      account.userID = doc.userID;
      account.userRole = doc.userRole;
    }
      res.json(account);
  }
}
